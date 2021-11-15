# Installing OpenMed

This document describes how to install OpenMed

Unfortunately, OpenMed is a webrtc server and generates email, so to run it you need to run it 

- a server on internet with a public IP (a virtul machine is fine)
- a DNS name that points to it
- the certificates for this DNS name 
- the app password for a gmail account to send emails

You can run locally for development but conferencing will not work.

## Prerequisites

Essential prerequisites for development: 

- node v14
- mongodb

Essential prerequisites for production, optional for development: 

- a public server with a DNS name 
- an SSL certificate for that domain name
- a gmail account with an app password

### Installing Node v.14

You need node to run everything. This prerequesite is essential both for development and production.

You can install in many ways. Since the version is important and the version available on your distribution may not be up to date, I recoomend using a package manager. I recommend [`nvm`](https://github.com/nvm-sh/nvm). 

Instructions follows:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

now, logoff and then logon again to add `nvm` to the path, then

```
nvm install v14
nvm use v14
node -v
```

Check you have a `v14.x.y`

Note that since to install libraries it will try to build some native libraries (most notably [mediasoup](https://mediasoup.org/), you have also to install [the  appropriate C compiler](https://github.com/nodejs/node-gyp) for your platform.

### Installing mongodb

The application stores data on Mongodb, this prerequisite is essential both for development and production.

You need to install mongodb on your platform or use a cloud version.

Instructions to install a local community edition are [here](https://docs.mongodb.com/manual/administration/install-community/)

Many cloud companies also offers Mongodb hosted in cloud. You need to get the credentials to access it

Take note of the server host, user, password and database to use, since those informations are essential to connect to the database.

### Provision an SSL certificate

In order to use WebRTC, on which OpenMed is based, you need to run SSL, hence you need to obtain an SSL certificate. This step is not required for development, but conferencing won't work.

Before you can provision an SSL certificate, you need to get a server exposed to the internet with a public IP and a DNS name pointing to it (just the IP is not enough). We won't discuss here how to get this as there are plenty of resources 

You can provision an SSL certfificate in many ways. We show here how to provision using [CertBot](https://certbot.eff.org/). Instructions to install certbot are [here](https://certbot.eff.org/instructions).

Once you have installed `certbot`, if you have root access to a server exposed to the internet without any web server running, just type:

```
sudo certbot certonly --standalone
```

And enter your email address and the DNS name of your servers.

The certificates will be then stored in: 

- `/etc/letsencrypt/live/<your-domain-name>/fullchain.pem` 
- `/etc/letsencrypt/live/<your-domain-name>/privkey.pem` 

where `<your-domain-name>` is, of course, your domain name.

### Get a gmail api key

For sending emails OpenMed currently uses Gmail.

You need to put your account and an app password to be able to use their SMTP server.

To get an app password, go to:
1. Go to Google Account
2. Click on Security
3. Click on Passwords under Signing to Google
4. Enable 2 step verifications if you do not have it
5. Generate an app password for "Mail" with a custom name "OpenMed"
6. Write it down 

# Configuration

Now you are reado to configure.

Copy the `config.json.sample` to `config.json` and replace the following:

- `<your-host-name>` with the fully qualified hostname you generate the the SSL for 
- `<your-gmail-address>` with your Gmail email address
- `<your-gmail-app-password>` with your Gmail app password
- `<your-mongo-username>` and `<your-mongo-password>` with MongoDB username and passwords
- `<your-mongo-host-name>` and `<your-mongo-database-name>` with MongoDB hostname and database
- replace also `<your-host-name>` for `ssl` keys and 
- check that the `ssl.cert` and `ssl.key` points to the correct files for your SSL certificates

# Installation

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

# Production Start

To start the full server:

```
cd server
npm run start
```

# Development Start

You can start quickly without conferencing with

```
cd client
npm run dev
````


