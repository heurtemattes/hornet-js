# Le module 'ts-typings'

## Présentation

Ce module reproupe tous les fichiers de definition .d.ts nous permettant d'utiliser les librairies js.

## Prérequis #

* NodeJS 8.X
* hornet-js-builder 1.X installé en global:

```shell
npm install -g hornet-js-builder
```

## Initialisation #

Récupérer les sources sur projet.

Compiler les sources typescript de `hornet-js-ts-typings`

```shell
hb compile
```

## Utilisation dans un projet #

Ajouter au package.json

```shell

  "tsDefinitionDependencies": {
    "hornet-js-ts-typings": "5.1.X"
  }
  
```

Puis lancer la commande :

```shell
hb install
```