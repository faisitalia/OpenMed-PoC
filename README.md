# OpenMed

In this repository there is a completely unstable code drop of OpenMed, as it is in development.

At the moment there are no guarantee at all.

At some point there will be a release that will give some more hopes it works.

Here some notes hopefully not too outdated to *try* run it (no promises it works). 


# Prequisites

Unfortunately this is a webrtc server, so you need a public DNS name and a TLS certificate for https.

So the server will not work unless you have:

- a server on internet with a public IP
- a DNS name that points to it, 
- the certificates for this DNS name 

You need to run whatever operating system supports `node`.
We are using for development Ubuntu 20.x and node v14, managed with `nvm`.

Note that you have also to install gcc the build chain in the servers since when you run the `npm install` it will try to build some C++ code.

Also you need root access: the server binds to port `443` so you have to run it with `sudo`.

## Client

First, build and setup the client.

```
cd client
npm install
npm run build
cd ..
```

You can also do `npm run dev` to put it in continous development mode.

However do not use the `localhost:5000` it does not work because you need to serve the generated bundle from the server, that provides the required services (websocket and media services).

## Server

Once you have those, edit the `server/config.js` and change the keys:

- `sslCrt` and `sslKeys` to the paths to the certificate files
- `listenIPs` to the IP of your server

Then you can start the server with:

```
cd server
sudo node server.js
```

And access the service with:

`https://<your-dns-name>`

```
cd node
