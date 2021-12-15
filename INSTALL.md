## Installing OpenMed

This document describe how to configure and install OpenMed.

- Before going on, check you have the [prerequisites](PREREQ.md)
- Create a [configuration](#configuration) file: `openmed.json` in the top level as described below
- Perform the [installation](#installation) steps described
- Launch it either in [development](#development) or [production](#production) mode.

<a name="configuration"/>

# Configuration

Now you are ready to configure.

For development, just copy `openmed.dev.sample` to `openmed.json`. 

For production, copy the `openmed.prod.sample` to `openmed.json` and replace *all* the following strings in it with the correct values:

- `<your-public-ip>` with the public IP address of your server 
- `<your-host-name>` with the fully qualified hostname you generate the the SSL for 
- `<your-gmail-address>` with your Gmail email address
- `<your-gmail-app-password>` with your Gmail app password
- `<your-mongo-username>` and `<your-mongo-password>` with MongoDB username and passwords
- `<your-mongo-host-name>` and `<your-mongo-database-name>` with MongoDB hostname and database
- replace also `<your-host-name>` for `ssl` keys and 
- check that the `ssl.cert` and `ssl.key` points to the correct files for your SSL certificates

The server can be further configured in many ways, changing the mailer, tuning the conferences and much more, editing manually the `./server/config.js`.

<a name="installation"/>

# Installation

Run all the steps with the script `./install.sh` 

Otherwise, run all the step manually:


```
#Install and build the app
cd app
npm install --legacy-peer-deps
npm run build
cd ..
# Install and build client libraries:
cd client
npm install
npm run build
cd ..
# Install server libraries and setup the database:
cd server
npm install
npm run setup
cd ...
```

<a name="production"/>

# Production Launch

Before all, to use port below 4443 you have to enable capability to bind ports:

```
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/bin/node
```

To start the full server:

```
cd server
npm run start
```

You may want to install it as a system service. You can then edit the sample [openmed service](openmed.service) for systemd to select the correct directories and install on the sistem with:

```
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/bin/node
sudo cp openmed.service /etc/systemd/system/
sudo systemctl enable openmed
sudo systemctl start openmed
```

<a name="development"/>

# Development Launch

For development, you can start quickly **without conferencing** with:

```
cd client
npm run dev
```

It will put both node and svelte in development mode: if your change the code it will reload. You can change with reload only code under `client/src` and `server/api`.

You can get a node cli able to run access to your configured database (database accessible in the `db` object) with:

```
npm run mongo
```

Also if you modify the `setup.js` script, you can update the database with: 

```
npm run setup
```
