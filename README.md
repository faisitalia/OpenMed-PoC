# OpenMed

*Warning* this repo contains code under heavy development.

So keep in mind:

- the code is not yet feature complete
- the code may not even compile or work at all 
- the code WILL certainly contains bug
- if you run it, because of the previous facts, it may destroy your machine, or even the entire universe...

Here some notes hopefully not too outdated to *try* run it (no promises it works) in development mode

(there are not yet instructions for a production mode)

## Prequisites

Unfortunately this is a webrtc server, so even for development you need a public DNS name and a TLS certificate for https.

So if you want to develop you need:

- a server on internet with a public IP (a virtul machine is fine)
- a DNS name that points to it
- the certificates for this DNS name 

You need to run whatever operating system supports `node`, although the underlying library for conferencing (mediasoup) may not compile on all the systems.

Also you need a locally available  `mongodb`

We are using for development Ubuntu 20.x and node v12

Note that you have also to install gcc the build chain in the servers since when you run the `npm install` it will try to build some C++ code.

## Installation (for development)

First, get the SSL certificates.

On Ubuntu, shut down any server can be running on port 80 and do this:

```
sudo snap install certbot --classic
certbot standalone -d <yourdomain>
```

then copy the files in `/etc/letsencrypt/live/<yourdomain>/*.pem` in `server/conf` folder

Then install prerequisites:

```
cd client
npm install
cd ../server
npm install
cd ..
```

## Launch (for development)

You can launch in two modes: without and with conferencing support

To launch without conferencing support:

```
cd client
npm run dev
```

Then access to `https://<yourdomain>:4443` to see the user interface.


Client code is under `client/src`.

Server code for the API is under `server/api`

You can change everything under those folders and both server and client will reload. *But conferencing wont't work*

To run also in conferencing mode:

```
cd client
npm run conf 
```

In this mode conferencing will work, and you can change client code and it will reload.

Server won't reload automatically as it takes a long time to start the conferencing. If you change the code you have to manually stop and restart.

However you can connect to the server with an interactive prompt with `cd server ; npm run connect`.

