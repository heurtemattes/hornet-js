Hornet.js  :honeybee:
====================


Le framework `Hornet.js` est un framework open-source conçu pour développer des applications web basé sur le language `typescript`.

Il permet de répondre aux besoins posés par les référentiels généraux de l'état Français pour les administrations :
* [RGS](http://references.modernisation.gouv.fr/securite) : Référentiel Général de Sécurité
* [RGI](http://references.modernisation.gouv.fr/interoperabilite) : Référentiel Général d'Interopérabilité
* [RGAA](https://references.modernisation.gouv.fr/rgaa-accessibilite/) : Référentiel Général d'Accessibilité pour les Administrations 

Il se distingue par la mise en place de deux filières  :
* hornet.js
* hornet.js-lite

`Hornet.js` est utilisé pour les applications demandant une forte sollicitation
`hornet.js-lite` s'oriente vers les plus petites applications : faible volumétrie, peu d'utilisateur, ..

Cette dernière offre en terme d'architecture technique un cadre de développement complet sous javascript.
Tandis que `hornet.js` possède une partie service REST en JAVA.

D'un point de vue technique, il est lui-même composé de briques open-source orientées javascript :
* `Node.js` : plateforme logiciel d'exécution du code JavaScript côté serveur
* `Express` : bibliothèque de base pour l'écriture d'application web sur Node.js
* `Director` : composant de gestion du routage des urls sur le serveur
* `React` : bibliothèque de création d'IHM html selon une logique orientée composants
* `Ajv` : bibliothèque JavaScript de validation de formulaires
* `Superagent` : composant JavaScript pour l'exécution d'appels http
* `Webpack` : outil de création de paquetages (JavaScript, CSS, ...) pour les navigateurs web


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
  "appDependencies": {
    "hornet-js-components": "5.3.X",
    "hornet-js-core": "5.3.X",
    "hornet-js-ts-typings": "5.3.X",
    "hornet-js-utils": "5.3.X"
  }
```

Puis lancer la commande :

```shell
hb install
```
## Hornet.js

## Architecture

### Fonctionnement

Principe de fonctionnement du framework en mode isomorphique.

1. Rendu Serveur :
  * L’utilisateur accède à la première page par un appel serveur, le serveur génère une vue de l'application (sans les data).
  * L'utilisateur peut commencer à utiliser l'application
2. Single Page Application (SPA) :
  * Lorsque tous les élements JavaScript sont bien reçus, le client bascule automatiquement en mode SPA.
  * Dans le mode SPA, tout se passe principalement dans le navigateur client (action/mise à jour de l'état de l'écran). Il n’y a alors plus de chargement complet de page (excepté via l'utilisation du `F5` du clavier). Seules les interactions avec le serveur nécessitent des échanges via des flux de type `AJAX` .
  * Ce mode permet une grande interactivité et réactivité des applications web vis à vis de l'utilisateur final.

Les paragraphes suivants présentent de façon plus détaillée les caractéristiques essentielles de la solution.

### Fonctionnement détaillé

Dans le mode SPA, seuls les éléments impactés par un changement de fonction sont modifiés à l’aide de traitements JavaScript, les autres parties, comme l’entête ou le menu, restent inchangées).

Dans ce mode, les traitements sont majoritairement exécutés dans le navigateur client en JavaScript. Les appels aux serveurs servent à interagir avec les données stockées sur le serveur distant (création, consultation, modification, suppression). Ces échanges sont réalisés à l’aide d’appels Ajax.

Cinématique de rendu serveur / SPA :

1. L’utilisateur demande la première page de l'application.
2. L’application retourne un document HTML complet (entête, menu, corps, bas de page). Le mode SPA s’initialise dans le navigateur par l'exécution automatique de JavaScript (initialisation du court-circuit des clics...).
3. En mode SPA, les liens vers les autres écrans (navigation) sont court-circuités et remplacés par des navigations internes avec du code JavaScript. L'accès aux données se fait par la déclaration de routes dites **Data**
  * L’utilisateur demande à accéder à la page suivante en cliquant sur le lien hypertexte correspondant. Le clic ayant été détourné par le mode SPA, le code JavaScript émet un changement de route interne.<br>
  * L’utilisateur demande à accéder à des données, c'est une route *Data* qui est sollicitée. Ce qui soumet un appel AJAX pour récupérer un flux JSON. On met à jour le DataSource ou l'état du composant page, ce qui provoque le rafraîchissement de certains composants de la page grâce à l'utilisation de `Vues`.

Chaque fragment HTML, correspondant aux éléments de page, est conçu sous forme de composant pour être indépendant de son conteneur.

## Architecture technique

Le module applicatif de présentation a pour fonction de fournir l'IHM de l'application.

Ce module est développé en technologie JavaScript/TypeScript et s'exécute grâce à Node.js.

Les principaux composants techniques intervenant dans le module applicatif de présentation sont :

* `Node.js` : plateforme logicielle d'exécution du code JavaScript côté serveur
* `Express` : bibliothèque de base pour l'écriture d'applications web sur Node.js
* `Director` : composant de gestion du routage des urls sur le serveur
* `React` : bibliothèque de création d'IHM html selon une logique orientée composants
* `Superagent` : composant JavaScript pour l'exécution d'appels http
* `Webpack` : outil de création de paquetages (JavaScript, CSS, ...) pour les navigateurs web
* `Gulp` : outil pour la création de tâches de développement

### Navigateur web

Dans Node.js les interactions proviennent de requêtes http. Celles-ci sont prises en charge par le framework `Express` avant d'intégrer le déroulement du pattern Hornet.

### Architecture Hornet

Ci-dessous les composants qui permettent de remplir les différentes responsabilités définies dans le pattern.

#### Actions

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

#### Vues

Les vues sont les composants servant à produire le code html affiché à l'utilisateur.

Les composants de cette brique utilisent le moteur de rendu [React](https://reactjs.org/ ou https://github.com/facebook/react/) :

## Licence

`hornet-js` est sous [licence cecill 2.1](./LICENSE.md).

Site web : [http://www.cecill.info](http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html)
