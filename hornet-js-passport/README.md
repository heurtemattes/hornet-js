# hornet-js-passport

hornet-js-passport fournit un module pour la gestion des droits d'accès pour les applications HornetJS.

Ce module est basé sur *PassportJs* qui est un Middleware d'authentification pour NodeJs, il propose donc des stratégies, ainsi que des middlewares Express pour simplifier son utilisation.


## Prérequis #

* NodeJS 8.X
* hornet-js-builder 1.X installé en global:

```shell
npm install -g hornet-js-builder
```

## Initialisation #

Récupérer les sources sur le projet.

Compiler les sources typescript de `hornet-js-passport`

```shell
hb compile
```

## Utilisation dans un projet #

Ajouter au package.json

```shell
  "tsDefinitionDependencies": {
    "hornet-js-ts-typings": "5.1.X"
  }
  "appDependencies": {
    "hornet-js-passport": "5.1.X",
  }

```

Puis lancer la commande :

```shell
hb install
```

## PassportJs et Stratégies

PassportJS s'appuie sur des stratégies d'authentification. Une même instance de ce Middleware peut gérer plusieurs stratégies, dès qu'une a pû permettre de s'authentifier, les suivantes ne sont pas exécutées.

### Présentation et mise en place

Tout d'abord il faut instancier PassportJs et lui fournir les méthodes de sérialisation et désérialisation :

```javascript

import passport = require('passport');
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

```

Dans cet exemple aucune sérialisation/désérialisation est faite, le user est complet dans la session, mais nous aurions pu, par exemple, sauvegarder l'utilisateur en base et ne mettre que son id dans la session lors de la sérialisation, et le récupérer de la base pour le mettre dans la session lors de la désérialisation.

Ensuite il faut préciser la ou les stratégies à utiliser, exemple :

```javascript

passport.use(new authentication.StrategySaml());

```

A l'appel de la méthode *authenticate*, 'PassportJs' appelle la méthode *authenticate* sur la stratégie, tout en ayant auparavant ajouté dynamiquement sur cette dernière les méthodes suivantes :
* succes
* fail
* redirect
* pass
* error

Maintenant, nous avons une instance de PassPortJs prête à être utilisée, mais attention, elle peut avoir besoin de s'appuyer sur d'autres middlewares suivant les cas (LocalStrategy utilise Flash pour échanger les erreurs entre les Middlewares ou les requêtes).
La position des Middlewares est importante, elle induit l'ordre d'exécution. Dans la plus part des cas l'utilisateur sera sauvegardé en session, donc l'ajout des Middlewares devra se faire apprès celui gérant la session, exemple :

```javascript

server.use(flash()); // middleware d'échange d'information (passe par la session)
server.use(passport.session()); // charge le user présent dans la session
server.get(utils.buildContextPath('/logout'), function (req, res, next) { //déconnexion
    req.logout();
    res.redirect(307, utils.buildContextPath('/'));
});
server.use(function ensureAuthenticated(req, res, next) { // test si l'utilisateur est déjà connecté, sinon demande une authentification
    if (req.isAuthenticated()) {
        return next();
    }
    passport.authenticate('saml')(req, res, next);
});

```

## Surcouches

Afin de simplifier toute cette mise en place et l'instanciation des différents middlewares, une surcouche a été mise en place. Elle s'appuie sur un objet static pour la configuration et un middleware unique gérant les différentes phases de connexion.

La couche d'authentification s'appuie sur un objet de configuration simple pour gérer les phases de connexion, contenant l'url de connexion et de déconnexion :

* appLoginPath : url relative de l'application déclenchant le process de connexion.
* appLogoutPath : url relative de l'application déclenchant le process de déconnexion.
* idpSessionTimeout : paramètre optionel de type boolean pour tenir compte du timeout de la session idp ( par défaut c'est `true`, donc activé).

On instancie le module d'authentification et on lui ajoute les stratégies d'authentification.

### Les Stratégies

#### SAML

Cette stratégie s'appuie sur la classe de configuration *hornet-js-passport/src/strategy/saml/saml-configuration*, et l'initialisation des différents attributs est faite lors de l'instanciation de l'objet de configuration :

- **`callbackUrl`**: Page de connexion de l'application (en général "/login")
- **`logoutCallbackUrl`**: Page de déconnexion de l'application (en général "/logout")
- **`hostUrlReturnTo`**: Nom du serveur applicatif par défaut (en environnement de DEV: "http://localhost:8888")
- **`issuer`**: Chaîne permettant à l'application d'être identifiée par l'IDP (url de l'application)
- **`certSignature`**: Clé publique de l'application
- **`privateCert`**: clé privée de l'application
- **`availableIdp`**: IDPs déclarés au sein de l'application: objet de type `IdentityProviderProps` ou tableau d'objet de type `IdentityProviderProps`
- **`verifyFunction`**: Fonction de callback permettant de traiter la réponse du flux SAML
- **`isMetadataAccessible`**: Détermine si le metadata de l'application est accessible via la route `/metadata-saml`

##### Propriétés de l'/des IDP(s): `availableIdp`

Le module `passport-saml` permet la gestion d'un ou plusieurs IDP. Lors de sa déclaration, il peut être de la forme d'un objet ou d'un tableau d'objets:

- **`name`**: Nom de l'IDP
- **`shibbolethUrl`**: URL pointant vers le fichier des metadata liés à l'IDP
- **`httpsCert`**: Certificat de l'IDP

La propriété `httpsCert` n'est pas nécessaire dans le cas où le fichier metadata de l'idp (renseigné via la propriété `shibbolethUrl`) n'est pas une Url dynamique sécurisée (https).

Un Parser SAML permet ensuite de récupérer les informations utiles à la connexion/déconnexion auprès de l'IDP. Ces informations sont présentes dans le fichier metadata mis à disposition depuis l'url `shibbolethUrl`. Le parser permet alors de récupérer:

- **`entryPoint`**: adresse de redirection vers l'IDP lors de l'authentification
- **`logoutUrl`**: adresse de redirection vers l'IDP lors de la déconnexion
- **`certSignature`**: Certificat de chiffrement pour la signature de l'IDP
- **`certChiffrement`**: Certificat de chiffrement de l'IDP

##### Certificat (`certSignature`) et clé applicatifs (`privateCert`)

ils peuvent être générés via la commande:

```shell

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -days 900

```

##### Exemple d'utilisation pour une application

Dans le fichier de configuration de l'application **default.json** :

```javascript

"authentication": {
    "loginUrl": "/login",
    "logoutUrl": "/logout",
    "saml": {
      "enabled": true,
      "configuration": {
        "hostUrlReturnTo": "http://localhost:8888",
        "callbackUrl": "/login",
        "logoutCallbackUrl": "/logout",
        "issuer": "http://localhost:8888/applitutoriel",
        "idp": [
          {
            "name": "toto",
            "shibbolethUrl": "{metadata-idp.xml}",
          }
        ,{
            "name": "titi",
            "shibbolethUrl": "{metadata-idp.xml}",
          }
        ],
        "cert": "{chemin}/{cer.pem}",
        "key": ".{chemin}/{key.pem}"
      }
    }
}

```

il faut rajouter également au niveau de la sécurité csp, la configuration suivante:

```js
"formAction": [
  "'self'",
  "{hostName de l'IDP}"
],

```

Dans le fichier **server.ts** :

```javascript

// Authent passport
import { PassportAuthentication } from "hornet-js-passport/src/passport-authentication";
import { AuthenticationtConfiguration } from "hornet-js-passport/src/authentication-configuration";
// Cas
import { SamlConfiguration } from "hornet-js-passport/src/strategy/saml/saml-configuration";
import { SamlStrategy } from "hornet-js-passport/src/strategy/saml/saml-strategy";

let configAuth = new AuthenticationtConfiguration(
Utils.config.get("authentication.loginUrl"),
Utils.config.get("authentication.logoutUrl"));

let authent = new PassportAuthentication(configAuth);

// Ajout du middleware d'authentification (passport-saml)
let configuration = new SamlConfiguration(
    Utils.config.get("authentication.saml.configuration.callbackUrl"),
    Utils.config.get("authentication.saml.configuration.logoutCallbackUrl"),
    // Page de retour par défaut
    Utils.config.get("authentication.saml.configuration.hostUrlReturnTo"),
    // Usually specified as `/shibboleth` from site root
    Utils.config.get("authentication.saml.configuration.issuer"),
    // Certificat applicatif
    fs.readFileSync(Utils.config.get("authentication.saml.configuration.cert"), "utf8"),
    // Clé privée de décryptage
    fs.readFileSync(Utils.config.get("authentication.saml.configuration.key"), "utf8"),

    Utils.config.get("authentication.saml.configuration.idp")
);

authent.initStrategy(new SamlStrategy(configuration));


var server = new Server(configServer, hornetMiddlewareList);
server.start();

```


##### Génération du fichier metadata.xml de l'application

Afin d'être référencé auprès de l'IDP, il faut au préalable fournir un fichier metadata auprès de ce dernier. Une fois les certificats générés et l'application paramétrée,
le `metadata` applicatif sera accessible depuis la route: ${urlDeMonApplication}/metadata-saml


## Licence


`hornet-js-passport` est sous [licence cecill 2.1](./LICENSE.md).

Site web : [http://www.cecill.info](http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html)
