# Montée de version vers Hornet.js 5.4.0

# NPM

Il faut au minimum en npm  version 6

# Package.json

- passer les éventuelles dépendences de typage de `tsDefinitionDependencies` vers `devDependencies` sauf pour les projets hornet-js-* qui sont embarquées dans chacuns des projets, il faut ensuite adapter la configuration du transpilateur typescript (exemple [ci après](#tsconfig.json)).
- `appDependencies` devient `dependencies`
- `buildDependencies` et `testDependencies` sont à tranférer dans `devDependencies`.


# Logger

La partie logger a été déplacé dans son propre module, donc :

remplacer les imports<br>
- `import { Logger } from 'hornet-js-utils/src/logger';`<br>par<br>
- `import { Logger } from 'hornet-js-logger/src/logger';`

remplacer l'instanciation du logger exemple :<br>
- `const logger: Logger = Utils.getLogger(`<br>par<br>
- `const logger: Logger = Logger.getLogger(`

# Sequelize (montée de version)

Ce qu'on a identifié :

remplacer<br>
- `Sequelize.DefineAttributes`<br>par<br>
- `Sequelize.ModelAttributes`

remplacer<br>
- `findById`<br>par<br>
- `findByPk`

remplacer<br>
- `find`<br>par<br>
- `findOne`

# Gestion de icone (taille et couleur paramétrable)

Le composant Picto a été remplacé par le composant SvgSprites, prenant directement en paramètre la taille et la couleur.

remplacer<br>
- `import { Picto } from 'hornet-js-react-components/src/img/picto';<br>par<br>
- `import { SvgSprites } from 'hornet-js-react-components/src/widget/icon/svg-sprites';`

remplacer les utilisations dans les menuAcion<br>
- `Picto.white.ajouter`<br>par<br>
`<SvgSprites icon="add" height="1.5em" width="1.5em" color="#FFF" />`

remplacer les utilisations dans les Action column<br>
- `Picto.blue.supprimer`<br>par<br>
- `<SvgSprites icon="delete" height="2em" width="2em" color="#0579be" />`

NB: Si le pictogramme n'est pas focusable, il faudra ajouter la props tabIndex au composant `SvgSprites` et la valoriser à -1.

# dépendances 

ajout dépendances  de dev manquantes (node, react,...), exemple :
- "@types/node": "10.14.10",
- "@types/react": "16.7.22",
- "chai": "4.2.0",
- "mocha": "5.2.0",
- "tslib": "1.9.3"
- "@types/lodash": "4.14.134",
- "sequelize": "5.8.9",
- "pg": "7.11.0",
- "classnames": "2.2.6",

# default.json

Retirez l'information themeName présente dans le fichier de config

```json
"themeName": "hornet-themes-intranet",
```

# index.ts

```javascript
// Bootstrap de lancement de l'application
// permet la résolution de modules dans des répertoires autres que "node_modules"
var Module = require("module").Module;
import * as fs from "fs";
import * as path from "path";


const appDirectory = process.cwd();
// On conserve la méthode originale pour rétablir le fonctionnement normal en cas d'un requireGlobal
Module._oldNodeModulePaths = Module._nodeModulePaths;

const NODE_MODULES = "node_modules";

Module.prototype._oldCompile = Module.prototype._compile;
Module.prototype._compile = function(content, filename) {
    if ((path.extname(filename) === ".scss") || (path.extname(filename) === ".svg")) {
        content = "module.exports = {};";
    }
    return this._oldCompile(content, filename);
};


// on surcharge la méthode de résolution interne nodejs pour gérer d'autres répertoires
Module._newNodeModulePaths = function(from) {
    var paths = Module._oldNodeModulePaths.call(this, from);
    paths.push(path.join(appDirectory));
    paths.push(path.join(appDirectory, NODE_MODULES));

    let modulePath = from
    do {
        if (fs.existsSync(path.join(modulePath, NODE_MODULES))) {
            paths.push(path.join(modulePath, NODE_MODULES));
        }
        modulePath = path.dirname(modulePath)
    } while (modulePath.length > 1)
    return paths;
};
Module._nodeModulePaths = Module._newNodeModulePaths;


////////////////////////////////////////////////////////////////////////////////////////////////////
// Gestion du cas particulier du main (car nodejs le considère différent des autres modules ...)  //
require.main.paths = [];
require.main.paths.push(path.join(process.cwd()));
require.main.paths.push(path.join(process.cwd(), NODE_MODULES));

////////////////////////////////////////////////////////////////////////////////////////////////////
// gestion des sourcemap dans les stack nodejs
require("source-map-support").install();

// autorise le format json5 dans les extensions .json
import { JSONLoader } from "hornet-js-utils/src/json-loader";
JSONLoader.allowJSON5();

// auto configuration des logs server
import { ServerLogConfigurator } from "hornet-js-core/src/log/server-log-configurator";
ServerLogConfigurator.configure();


// ================================================
// Configuration de L'appli selon l'environnement
// ================================================
const environnement = process.env.NODE_CONFIG_ENV || 'development';
console.info(`Starting prevoirh in [${ environnement }] mode`);
const configsPath = `_onePoint/configs/${ environnement }`;
if (fs.existsSync(configsPath)) {
    // Installation des certificats selon l'environnement
    fs.copyFileSync(`${ configsPath }/cert.pem`, `config/idp/cert.pem`);
    fs.copyFileSync(`${ configsPath }/key.pem`, `config/idp/key.pem`);
}

// initialisation des infos de l'application courante
import { AppSharedProps } from "hornet-js-utils/src/app-shared-props";
import { Utils } from "hornet-js-utils";

var packageJson = require("./package");
AppSharedProps.set("appName", packageJson.name);
AppSharedProps.set("appVersion", packageJson.version);
AppSharedProps.set("appDescription", packageJson.description);
AppSharedProps.set("appAuthor", packageJson.author);
AppSharedProps.set("sessionTimeout", Utils.config.get("server.sessionTimeout"));
AppSharedProps.set("notifSessionTimeout", Utils.config.get("server.notifications.sessionTimeoutDelay"));

// ==============================
// Configuration de Moment
// ==============================

import moment = require('moment');

// On configure le serveur sur l'heure de Paris
(moment as any).tz.setDefault('Europe/Paris');

import { Server } from "src/server";
Server.startApplication();
```

# builder.js

variabilisez la configuration clientContext et remplacez le:

```javascript
const clientContext = [
    [/moment[\/\\]locale$/, /fr|en/],
    [/intl[\/\\]locale-data[\/\\]jsonp$/, /fr|en/],
    [/^\.$/, (context) => {
        if (!/\/locale-data\//.test(context.context)) console.log("locale-daa", context);
        if (!/\/log4js\/lib$/.test(context.context)) return;
        context.regExp = /^\.\/appenders\/console.*$/;
        context.request = ".";
    }]
];
[...]
clientContext: clientContext,
```

Retirez : helper.excludeNodeModulesFromWebpack et dev

Pour plus de clareté, il est possible et conseillé de déplacer la configuration webpack et karma en dehors du fchier `builder.js`, dans des fichiers séparés (cf documentation builder chapitre 'Configuration webpack' et 'Configuration karma'), voici un exemple possible :

ficher `webpack.addons.config.js` à la racine du projet, avec le contenu suivant :

```javascript
const path = require("path");

const clientContext = [
    [/moment[\/\\]locale$/, /fr|en/],
    [/intl[\/\\]locale-data[\/\\]jsonp$/, /((fr)|(en))$/],
    [/^\.$/, (context) => {
        if (!/\/log4js\/lib\/appenders$/.test(context.context)) return;
        Object.assign(context, {
            regExp: /^console.*$/,
            request: "."
        });
        
    }]
];

const dev = {
    dllEntry: {
        vendor: ["hornet-js-react-components", "hornet-js-components", "hornet-js-utils", "hornet-js-core"]
    }
}

const externals = [
        new RegExp(path.join("src", "services", "data") + "/.*"),
        new RegExp(path.join("src", "dao") + "/.*"),
        /src\/middleware\/.*/,
        new RegExp(path.join("src", "services", "data") + "/.*-data-\.*"),
        "hornet-js-database",
        "config",
        "continuation-local-storage",
        "sequelize",
        "pdfmake",
        "carbone",
        "csv-parser",
        "nodemailer",
        "tls",
        "child_process",
        "net",
        "fs",
        "dns"
]

module.exports = (project, conf, helper, webpackConfigPart, configuration, webpack) => {
    const projectPlugins = [...webpackConfigPart.addContextReplacement(clientContext).plugins];
    if (helper.isDevMode()) {
        conf.dev = dev;
        const dllReference =  webpackConfigPart.addDllReferencePlugins(project, "static", "js", "dll");
        if(dllReference && dllReference.plugins) {
            projectPlugins.push(...dllReference.plugins);
        }
    }
    return {
        ...configuration,
        plugins: [...configuration.plugins, ...projectPlugins,
        ],
        externals : (context, request, callback) => {
                if(/log4js\/lib\/appenders/.test(context) && (!/console/.test(request)) && (/^\.\//.test(request))) {
                    return callback(null, "{}");
                } 
                for (let i = 0; i < externals.length; i++) {
                    let extern = externals[i];
                    if (extern.test) { // c'est une regexp'
                        if (extern.test(request)) {
                            return callback(null, "{}");
                        }
                    } else if (request == extern) {
                        return callback(null, "{}");
                    }
                }

                return callback();
            },
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    minChunks: 3,
                    minSize: 3000000
                },
            },
            watchOptions: {
                aggregateTimeout: 3000
            }
    }

}
```

<a name="#tsconfig.json"></a>
# tsconfig.json

``` JSON
{
  "compilerOptions": {
    "baseUrl": "./",
    "emitDecoratorMetadata": true,    
    "esModuleInterop": false,
    "experimentalDecorators": true,
    "importHelpers": true,
    "jsx": "react",
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "target": "ES5",
    "preserveSymlinks": true
  },
  "include": [
    "index.ts",
    "src/**/*.ts*",
    "test/**/*.ts*",
    "./node_modules/hornet-js-bean/index.d.ts",
    "./node_modules/hornet-js-components/index.d.ts",
    "./node_modules/hornet-js-core/index.d.ts",
    "./node_modules/hornet-js-database/index.d.ts",
    "./node_modules/hornet-js-logger/index.d.ts",
    "./node_modules/hornet-js-utils/index.d.ts",
    "./node_modules/hornet-js-passport/index.d.ts",
    "./node_modules/hornet-js-react-components/index.d.ts",
    "./node_modules/hornet-js-test/index.d.ts"
  ],
  "exclude": [
    "istanbul"
  ]
}
```
# hornet-layout.tsx

remplacer<br>
- `<link rel="stylesheet" type="text/css" href={HornetLayout.genUrlTheme(this.state.fwkTheme)} />`<br>par<br>
- `<link rel="stylesheet" type="text/css" href={this.genUrlStatic("/css/appli.min.css")} />`
- 
# hornet-app.tsx

dans le fichier 'hornet-app.tsx', ajouter:
- `import "hornet-js-react-components/src/widget/sass/gen.scss";`

qui est le template des styles de base du placement du layout applicatif.

# client.ts

ajouter l'import des fonts utilisées :
```
let context = require["context"]("hornet-js-react-components/src/widget/component/fonts", true, /\.ttf$/);
context.keys().forEach(context);
```

# Utilisation d'une classe css hornet pour les composants customs

Ne pas oublier d'importer le fichier scss nécessaire.


# Montée de version vers Hornet.js 5.3.0

## Reprise accéssibilité props hasPopup

Un audit d'accéssibilité a révélé qu'il n'était pas pertinent d'utiliser la balise aria-haspopup hors de l'ouverture d'un menu. Les composants suivant n'ont plus de raisons d'utiliser la props hasPopUp :
- Button
- Icon
- ActionColumn

Si vous utilisez cette props dans vos projets pour ces composants ou des composants issus de ceux-ci, vous rencontrerez une erreur de compilation jusqu'à retrait de la valorisation de la props.

# Montée de version vers Hornet.js 5.2.2

## prototypage de la localisation des logs

La nomenclature des log node.js répondant aux normes syslogae impose de modifier les variables du fichier `log4s-instance.json`. En effet, le filename devient:

```

"filename":"#{NODE_LOG_DIR}-#{INSTANCE}/#{APPLICATION_CONTEXT_ROOT}/#{APPLICATION_CONTEXT_ROOT}.log",

```


# Montée de version vers Hornet.js 5.2.0

## Injection de service dans l'injector context

ATTENTION : Breaking change silencieux !!!

Pour fonctionner, l'injector doit maintenant retourner des services data ou services pages instanciés. Ce ne sont plus le middleware et hornet-page qui prennent en charge l'instanciation.

Il devient nécessaire lors de l'ajout dans l'injector de soit instancier le service avant de l'enregistrer avec un scope VALUE, soit d'utiliser les scopes SINGLETON ou PROTOTYPE qui se chargeront de gérer l'instanciation. Dans l'applitutoriel nous avons défini le scope sur SINGLETON pour nos services pages et services data.

exemple 5.1.1 :

```
Injector.register(AdministrationSecteurServiceData, SecteurServiceImpl);
```

exemple 5.2.0 :

```
Injector.register(AdministrationSecteurServiceData, SecteurServiceImpl, Scope.SINGLETON);
```

En laissant le scope VALUE (explicite ou par défaut), le service ne sera pas instancié.

## Appel de services

L'attribut **manageBusiness** a été supprimé du type `HornetRequest` et remplacé par l'attribut **manageError** qui peut prendre plusieurs valeurs:
```JavaScript
ErrorManagementType.None
ErrorManagementType.Business
ErrorManagementType.Technical
ErrorManagementType.All
```

## hornet-js-react-components

### CustomColumn

les méthodes `getHeaderCell` et `getBodyCell` ont changé de signature, et sont devenues des méthodes static. Elle renvoient directement le composant `HeaderCell`/`BodyCell`.

```Javascript

    public static getHeaderCell(props): Class<AbstractHeaderCell<AbstractHeaderCellProps, any>> {
        return HeaderCell;
    }

    public static getBodyCell(props): Class<AbstractBodyCell<AbstractBodyCellProps, any>> {
        return BodyCell;
    }

```


# Montée de version vers Hornet.js 5.1.1

# Configuration d'un projet

## Le cache

Dans les fichiers de configuration json des applications basées sur hornet, le noeud de définition du cache a été modifié.

5.1.0 :
```Json
    "cache": {
      "client": {
        "enabled": false,
        "timetolive": 60
      },
      "server": {
        "enabled": false,
        "timetolive": 120
      }
    }
```

5.1.1 :
```Json
    "request": {
        "cache": {
          "client": {
            "enabled": false,
            "timetolive": 60
          },
          "server": {
            "enabled": false,
            "timetolive": 120
          }
        }
    }
```


## hornet-js-react-components

### Form

La version 5.1.1 d `hornet-js-react-components` apporte un nouveau props pour le composant Form : id

Il est obligatoire de renseigner un id pour les formulaires. Ce props est une chaine de caractère.

5.1.0 :
```JavaScript
/**
 * Propriétés du formulaire hornet.
 */
export interface FormProps extends AbstractFormProps {
    /** Nom du formulaire */
    name?: string;
    /** Fonction déclenchée lors de la soumission du formulaire, lorsque celui-ci est valide */
    onSubmit?: (data: any) => void;
    /** Fonction déclenchée lors de la modification d'un champ du formulaire */
    onFormChange?: __React.FormEventHandler<HTMLElement>;
    /** Lorsque mis à true, le message d'information concernant les champs obligatoires est masqué.
     * Ignoré lorsque markRequired est à false car le message n'a pas lieu d'être affiché. */
    isMandatoryFieldsHidden?: boolean;
    /** Sous-titre éventuel */
    subTitle?: string;
    /** Texte descriptif éventuel */
    text?: string;
    /** Nom de la classe CSS à affecter au formulaire. */
    className?: string;
    /** Lorsqu'égal à false, les libellés des champs obligatoires ne sont pas marqués avec un astérisque */
    markRequired?: boolean;
    /** Path permettant de surcharger les pictogrammes/images **/
    imgFilePath?: string;
    /** Schema JSON de validation */
    schema?: any;
    /** Options de validation ajv (cf. http://epoberezkin.github.io/ajv/#options) */
    validationOptions?: ajv.Options;
    /** Messages spécifiques à ce formulaire : utilisés pour la génération des messages d'erreur de validation */
    formMessages?: any;
    /**
     * Valideurs customisés : permettent d'implémenter et de chaîner des règles de validation difficiles à mettre
     * en oeuvre simplement avec un schéma json-schema. Ils sont appliqués après la validation basée sur le schéma
     * de validation, donc les données du formulaire ont déjà éventuellement bénéficié de la coercition de types. */
    customValidators?: ICustomValidation[];
    /** Données initiales du formulaire */
    defaultValues?: any;
    /** Identifiant du groupe de notifications auquel seront rattachées les notifications d'erreurs de validation
     * de ce formulaire */
    notifId?: string;
    /** Lorsqu'égal à true, les boutons de validation ne sont pas affichés */
    hideButtons?: boolean;
}
```

5.1.1 :
```JavaScript
/**
 * Propriétés du formulaire hornet.
 */
export interface FormProps extends AbstractFormProps {
    /** Identifiant du formulaire */
    id: string;
    /** Nom du formulaire */
    name?: string;
    /** Fonction déclenchée lors de la soumission du formulaire, lorsque celui-ci est valide */
    onSubmit?: (data: any) => void;
    /** Fonction déclenchée lors de la modification d'un champ du formulaire */
    onFormChange?: __React.FormEventHandler<HTMLElement>;
    /** Lorsque mis à true, le message d'information concernant les champs obligatoires est masqué.
     * Ignoré lorsque markRequired est à false car le message n'a pas lieu d'être affiché. */
    isMandatoryFieldsHidden?: boolean;
    /** Sous-titre éventuel */
    subTitle?: string;
    /** Texte descriptif éventuel */
    text?: string;
    /** Nom de la classe CSS à affecter au formulaire. */
    className?: string;
    /** Lorsqu'égal à false, les libellés des champs obligatoires ne sont pas marqués avec un astérisque */
    markRequired?: boolean;
    /** Path permettant de surcharger les pictogrammes/images **/
    imgFilePath?: string;
    /** Schema JSON de validation */
    schema?: any;
    /** Options de validation ajv (cf. http://epoberezkin.github.io/ajv/#options) */
    validationOptions?: ajv.Options;
    /** Messages spécifiques à ce formulaire : utilisés pour la génération des messages d'erreur de validation */
    formMessages?: any;
    /**
     * Valideurs customisés : permettent d'implémenter et de chaîner des règles de validation difficiles à mettre
     * en oeuvre simplement avec un schéma json-schema. Ils sont appliqués après la validation basée sur le schéma
     * de validation, donc les données du formulaire ont déjà éventuellement bénéficié de la coercition de types. */
    customValidators?: ICustomValidation[];
    /** Données initiales du formulaire */
    defaultValues?: any;
    /** Identifiant du groupe de notifications auquel seront rattachées les notifications d'erreurs de validation
     * de ce formulaire */
    notifId?: string;
    /** Lorsqu'égal à true, les boutons de validation ne sont pas affichés */
    hideButtons?: boolean;
}
```

### AutocompleteField & autocompleteMutiple
Changements liés à la sélection des items dans un autocomplete. Lorsqu'un ou plusieurs éléments sont sélectionnés
le composant ne se contente plus de mettre uniquement la value dans la selection datasource mais il met tout l'objet
5.1.0 :
```JavaScript
  datasource.on('select', (value)=>{
    //ici, la value retournée est la valeur selectionne du composant autocomplete
  })
```

5.1.1 :
```JavaScript
    datasource.on('select', (object)=>{
    //ici, l'object retourné est l'enregistrement complet dans le datasource qui correspond à la valeur selectionnée du composant autocomplete
  })
```

### SelectField
Changements lié à la sélection des items d'un selectField.
5.1.0 :
```JavaScript
  datasource.on('select', (value)=>{
    //n'était jamais lancé par le composant
  })
```

5.1.1 :
```JavaScript
    datasource.on('select', (object)=>{
    //ici, l'object retourné est l'enregistrement complet dans le datasource qui correspond à la valeur selectionnée du composant selectField
  })
```

### Alert

le composant Alert a été renommé pour devenir Confirm.
Le Alert existe encore mais ne dispose que d'un seul bouton OK ( à l'instar d'un Alert à la sauce javascript)
Le composant Confirm prend en guise de props la possibilité de configurer un bouton "valider" et un bouton "annuler"


## hornet-js-core

### NotificationManager

La méthode statique du NotificationManager notify voit son interface changer avec l'apparition d'un nouveau paramètre.

5.1.0 :
```JavaScript
/**
 * Déclenche un évènement d'ajout de notification contenant les détails indiqués
 * @param id identifiant de notification
 * @param errors détail des erreurs éventuelles
 * @param infos informations éventuelles détail des informations éventuelles
 * @param exceptions exceptions détail des exceptions éventuelles
 * @param warnings détail des warnings éventuelles
 */
static notify(id: string, errors: any, infos?: any, exceptions?: BaseError[], warnings?: any, personnals?: any): void;
```

5.1.1 :
```JavaScript
/**
 * Déclenche un évènement d'ajout de notification contenant les détails indiqués
 * @param id identifiant de notification
 * @param idComponent identifiant du composant déclenchant la notification
 * @param errors détail des erreurs éventuelles
 * @param infos informations éventuelles détail des informations éventuelles
 * @param exceptions exceptions détail des exceptions éventuelles
 * @param warnings détail des warnings éventuelles
 */
static notify(id: string, idComponent: string, errors: any, infos?: any, exceptions?: BaseError[], warnings?: any, personnals?: any): void;
```

### SuperAgent
Ajout d'un paramètre supplémentaire manageBusiness (optionnal) qui permet de surcharger la gestion des erreurs business par rapport au framework
Par défaut, c'est le framework qui gère les business exceptions.


### Datasource

Ajout d'une méthode findAll qui permet de recupérer certains items dans un datasource
```JavaScript
    public findAll(criteria: any): any
```

La méthode sort prend en paramètre un objet de type DatasourceSortOption et non plus SortData

```javascript
    public sort(options: DatasourceSortOption): void {
```


### I18nServiceApi

I18nServiceApi à été supprimé, pour le changeLanguage utiliser:
```javascript
import * as ChangeLanguageService from "hornet-js-core/src/services/default/change-language";

new ChangeLanguageService.ChangeLanguage();
```

## Gestion des logs gzip

### log serveur et client

Support du gzip pour la production sur les fichiers de logs.
Montée de version de log4js : log4js@2.3.12

Impact sur la configuration des loggers.

Deprecated : DateRollingFileSync (hornet-js-utils).
Remplacement par la méthode `dateFile` de Log4js.

Cette modification impact le fichier de production.json (/environment/template)

Configuration du logger server : /config/log4js.json

```json
{
  "appenders": {
    "console": {
      "type": "console",
      "layout": {
        "type": "pattern",
        "pattern": "%[%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m%]"
      }
    }
    "dateFile": {
      "type": "dateFile",
      "pattern": ".yyyy-MM-dd",
      "filename": "log/applitutorieljslite.log", //DEV
      //"filename": "/var/log/nodejs/applitutorieljs/applitutorieljs.log", //PROD
      "layout": {
        "type": "pattern",
        "pattern": "%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m"
      },
      "compress": true,
      "keepFileExt": true
    }
  },
  "categories": {
    "default": { "appenders": ["console" , "dateFile", "level": "INFO" }
  }
}
```

Configuration du logger client : /config/default.json

```json
  "logClient": {
    "remote": false,
    "level": "TRACE",
    "appenders": {
      "BrowserConsole": {
        "type": "BrowserConsole",
        //        "layout": {
        //          "type": "pattern",
        //          "pattern": "%p|%c|%m%"
        //        },
        "layout": {
          "type": "THIN"
        }
      },
      "Ajax": {
        "type": "Ajax",
        "layout": {
          "type": "BASIC"
        },
        "threshold": 100,
        "timeout": 3000,
        "url": "/log"
      }
    }
  },
```

### Gzip des loggc nodejs

Modification apportée dans le fichier de configuration systemd. (/environment/template/application.service)
Ajout d'un "ExecStartPre" pour le gzip.

```
[Service]
WorkingDirectory=/var/lib/nodejs/#{INSTANCE_NAME}
ExecStartPre=/bin/echo "Demarrage de l'application #{INSTANCE_NAME}"
ExecStartPre=/bin/bash -c "/bin/tar -zcf /var/log/nodejs/#{INSTANCE_NAME}/log-gc-#{INSTANCE}-$$(date +%%Y-%%m-%%d_%%H%%M%%S).tar.gz -C /var/log/nodejs/#{INSTANCE_NAME} log-gc-#{INSTANCE}.log --remove-files --ignore-failed-read"
ExecStart=/bin/bash -c "#{NODE_BIN_DIR}/node --harmony --stack-size=1024 --trace_gc --trace_gc_verbose index.js > /var/log/nodejs/#{INSTANCE_NAME}/log-gc-#{INSTANCE}.log 2>&1"
ExecStopPost=/bin/echo "Arret de l'application #{INSTANCE_NAME}"
Restart=no
StandardOutput=inherit
StandardError=inherit
SyslogIdentifier=#{INSTANCE_NAME}
User=nodejs
Group=nodejs
EnvironmentFile=/etc/nodejs/#{INSTANCE_NAME}/environnement
Environment='NODE_APP_INSTANCE=#{INSTANCE}'
 
[Install]
WantedBy=multi-user.target 
```

## hornet-js-database

### SequelizeUtils

Reprise des paramètres des méthodes utilitaires remplacés par une interface commune. Plus besoin de passer x paramètres d'entrée, un objet options suffit.

```Javascript
/**
 * Interface HornetSequelizeOptions
 * Structure les différentes options pour sequelize-utils
 */
export interface HornetSequelizeAssociationOptions {
    /** fromEntity Entité correspondant au model portant la clé étrangère */
    fromEntity: Sequelize.Model<any, any>;
    /** toEntity Entité ciblée la clé étrangère */
    toEntity: Sequelize.Model<any, any>;
    /** alias Nom à donner à l'attribut au sein de l'entité fromEntity portant la clé étrangère */
    alias: string;
    /** nom du champs de la base de donnée portant la clé étrangère */
    foreignKey: string;
    /** Nom de la table issue de la relation multiple, portant une référence vers fromEntiy et une vers toEntity */
    throughTable?: string;
    /** otherKey Nom de l'attribut au sein de l'entité cible référence à l'entité courante (optionnel) */
    otherKey?: string
    /** Cible de clé primaire autre que celle par défaut */
    targetKey?: string;
}

/**
 * Initialise une relation entre deux entités de la modélisation connectées par une clé étrangère
 * @param {HornetSequelizeAssociationOptions} options
 */
static initRelationBelongsTo(options: HornetSequelizeAssociationOptions): void {
    if (!(options.fromEntity as any).associations || ((options.fromEntity as any).associations && !(options.fromEntity as any).associations[options.alias])) {
        options.fromEntity.belongsTo(options.toEntity,
            {
                as: options.alias,
                foreignKey: options.foreignKey,
                targetKey: options.targetKey
            }
        );
    }
}
```

Exemple d'utilisation :
```Javascript
SequelizeUtils.initRelationBelongsTo({fromEntity: this.villeEntity, toEntity: this.paysEntity, alias: "lePays", foreignKey: "id_pays"});
```
