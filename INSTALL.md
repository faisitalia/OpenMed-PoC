## Installing OpenMed

This document describe how to configure and install OpenMed.

- Before going on, check you have the [prerequisites](PREREQ.md)
- Create a [configuration](#configuration) file: `config.json` in the top level as described below
- Perform the [installation](#installation) steps described
- Launch it either in [development](#development) or [production](#production) mode.

# Configuration
<a name="configuration"/>

Now you are ready to configure.

For development, just copy `config.json-development-sample` to `config.json`. 

For production, copy the `config.json.production-sample` to `config.json` and replace the following:

- `<your-host-name>` with the fully qualified hostname you generate the the SSL for 
- `<your-gmail-address>` with your Gmail email address
- `<your-gmail-app-password>` with your Gmail app password
- `<your-mongo-username>` and `<your-mongo-password>` with MongoDB username and passwords
- `<your-mongo-host-name>` and `<your-mongo-database-name>` with MongoDB hostname and database
- replace also `<your-host-name>` for `ssl` keys and 
- check that the `ssl.cert` and `ssl.key` points to the correct files for your SSL certificates

# Installation
<a name="installation"/>


Install and build client libraries:

```
cd client
npm install
npm run build
cd ..
```

Install server libraries and setup the database:

```
cd server
npm install
npm run setup
cd ...
```

# Production Launch
<a name="production"/>

To start the full server:

```
cd server
npm run start
```

# Development Launch
<a name="development"/>

You can start quickly without conferencing with:

```
cd client
npm run dev
```

You can get a node cli able to run access to your configured database (database accessible in the `db` object) with:

```
npm run mongo
```

Also if you modify the `setup.js` script, you can update the database with: 

```
npm run setup
```
