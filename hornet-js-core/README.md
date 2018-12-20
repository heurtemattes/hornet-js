# hornet-js-core


Le framework `Hornet` est conçu selon le principe d'`isomorphisme`, c'est à dire que le code d'une application Hornet s'exécute aussi bien dans un navigateur web que sur un serveur d'application Node.js.

Les composants techniques du framework :

* `Node.js` : plateforme logiciel d'exécution du code JavaScript côté serveur
* `Express` : bibliothèque de base pour l'écriture d'application web sur Node.js
* `Director` : composant de gestion du routage des urls sur le serveur
* `React` : bibliothèque de création d'IHM html selon une logique orientée composants
* `Superagent` : composant JavaScript pour l'exécution d'appels http
* `Webpack` : outil de création de paquetages (JavaScript, CSS, ...) pour les navigateurs web
* `Gulp` : outil pour la création de tâches de développement

## Prérequis #

* NodeJS 8.X
* hornet-js-builder 1.X installé en global:

```shell
npm install -g hornet-js-builder
```

## Initialisation #

Récupérer les sources sur projet.

Compiler les sources typescript de `hornet.js`

```shell
hb compile
```

## Utilisation dans un projet #

Ajouter au package.json

```shell
  "tsDefinitionDependencies": {
    "hornet-js-ts-typings": "5.X.X"
  }
  "appDependencies": {
    "hornet-js-core": "5.X.X"
  }
```

Puis lancer la commande :

```shell
hb install
```


### Actions

Les actions sont exécutées côté serveur et portent les traitements de l’application. Les services externes sont appelés depuis les actions afin d’effectuer les traitements demandés par l’utilisateur.

Chaque **action** doit être une fonction retournant une `Promise` effectuant l’action à proprement parler (au sens métier). Ce fonctionnement est nécessaire afin de permettre au `routeur` :

* de savoir quand effectuer le rendu de la page côté serveur.
* de pouvoir désactiver les actions lors du premier affichage de la page côté client pour éviter un double appel des API externes (serveur puis client).


#### Routeur

Ce composant est le point central de la navigation. Il permet de gérer de manière identique la navigation au sein de l’application que ce soit côté client (avec ou sans JavaScript) ou côté serveur.

Ce composant est configuré à partir d’un ensemble de « routes » qui viennent faire le lien entre une URL et les actions du pattern (dans son implémentation isomorphe).

Le routeur d'Hornet s'appuie sur le composant [Director](http://github.com/flatiron/director).

Les particularités :

* Transmission des données `POST` par une méthode spécifique afin de ne pas modifier l’url du navigateur
* Utilisation du mode « historique » html5 (mode `pushState` à la place de la notation `!#`) afin d’uniformiser les urls entre la partie client et serveur.

### Vues

Les vues sont les composants servant à produire le code html affiché à l'utilisateur.

Les composants de cette brique utilisent le moteur de rendu [React](http://facebook.github.io/react/) :

## Licence

`hornet-js-core` est sous [licence cecill 2.1](./LICENSE.md).

Site web : [http://www.cecill.info](http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html)
