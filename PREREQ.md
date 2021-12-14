# Prerequisites 

Since OpenMed is a WebRTC server and generates email, to run it in production you need:
- a server on internet with a public IP (a virtul machine is fine)
- a DNS name that points to it
- a SSL certificates for this DNS name 
- a proper email configuration, which means to have either:
  - a password (or an app password if you've activated 2FA) for a Gmail account if you're using GMAIL as a email provider;
  - or the full email configuration for your custom email provider.

You can run locally for development but conferencing will not work.

Essential prerequisites for a development environment: 
- node v14
- mongodb

See below for installation instructions.

## Installing Node v.14

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

Note that since to install libraries it will try to build some native libraries (most notably [mediasoup](https://mediasoup.org/), you have also to install [the  appropriate C compiler](https://github.com/nodejs/node-gyp) for your platform, and the Python PIP tool.


Hints for the more common cases: 

- on Debian and Ubuntu you need to run `sudo apt-get update` and then `sudo apt-get install build-essential python3-pip`;
- on RedHat and CentOS you need `sudo yum groupinstall 'Development Tools'`
- on OSX you need to install XCode command line tools.



## Installing or provisioninig a mongodb

The application uses [MongoDB](https://www.mongodb.com/) to store data. Hence, this prerequisite is essential both for development and production. You need  either to install mongodb on your platform or provision a cloud-based instance.

Instructions to install a local community edition are [here](https://docs.mongodb.com/manual/administration/install-community/)

Many cloud companies also offers Mongodb hosted in cloud. You need to get from them credentials to access it.

Once you got the credentials, either local or in cloud, take note of the server host, user, password and database to use, since those informations are required to connect to the database.

## Provisioning an SSL certificate

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

## Mail config
You can either use Gmail or your custom mail account.

### Get a Gmail api key
To use Gmail as your current provider, follow these instructions.
You need to put your account and your password.

IF you have 2FA enabled you need to generate an app password to be able to use their SMTP server.

To get an app password, go to:
1. Go to Google Account
2. Click on Security
3. Click on Passwords under Signing to Google
4. Enable 2 step verifications if you do not have it
5. Generate an app password for "Mail" with a custom name "OpenMed"
6. Write it down 

### Get your custom config
OpenMed assumes you can configure your custom e-mailer inside the `json` configuration file as described in the install instructions.

Here a quick example:

```
"mailConfig": {
        "provider": "<provider name other than `google`>",
        "smtp": "<your-provider-host>",
        "port": <your-provider-host>,
        "username": "<user>@<mail-provider-host>",
        "password": "<your password>"
    },
```