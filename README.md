# OpenMed

In this repository there is a completely unstable code drop of OpenMed, as it is in development.

At the moment there are no guarantee at all.

At some point there will be a release that will give some more hopes it works.

Here some notes hopefully not too outdated to *try* run it (no promises it works). 

# Prequisites

You can run the client only for development. But conferencing won't work as it needs also the server.

Unfortunately this is a webrtc server, so you need a public DNS name and a TLS certificate for https.

So the server will not work unless you have:

- a server on internet with a public IP
- a DNS name that points to it, 
- the certificates for this DNS name 

You need to run whatever operating system supports `node`.
We are using for development Ubuntu 20.x and node v14, managed with `nvm`.

Note that you have also to install gcc the build chain in the servers since when you run the `npm install` it will try to build some C++ code.

## Client only


You can also do `npm run dev` to put it in continous development mode.

Note that the `localhost:5000` works for local development but not for conferencing.

To enable conferencing you have to run also the server from a website with a DNS name and SSL certificates, providing also Websockets.

## Client and Server

First, build and setup the client.

```
cd client
npm install
npm run build
cd ..
```

Once you have those, edit the `server/config.js` and change the keys `listenIPs` to the IP of your server.

Then you have to put the SSL certificate files `fullchain.pem` and `privkey.pem` in the folder `server/cert`.

Then you can start the server with:

```
cd server
node server.js
```

And access the service with:

`https://<your-dns-name>:4443`
