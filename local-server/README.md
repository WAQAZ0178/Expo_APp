# local-server

This is mainly for quickly testing content without involving AWS. Node/Express server will read from the `content.json` that will be created when you following section and serving the `/version` and `/content` endpoints.

**Note: make sure to set the react native environment to local using `npm run env:local` in the root directory (not this one)**

## Install dependencies

```
$ npm install
```


## Add local content.json to debug locally

1. Download csv file from google sheets
1. Move csv file into this directory
1. Rename csv to `content.csv`
1. Run `npm run csvtojson`

## Start server

```
$ npm run dev
```
