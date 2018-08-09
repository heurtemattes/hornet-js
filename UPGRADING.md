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
