# OpenMed

Welcome to OpenMed.


- Check [this website](https://openmed.faisitalia.it/) for documentation (in italian).
- Check [this document](PREREQ.md) for prerequisites before installing.
- Check [this document](INSTALL.md) for installation, either for development and production.

# TL;DR

How to start in development mode (without conferencing!):

- Install nodejs v14.x.y and Mongodb v5.x.
- Ensure node is available on the path.
- Ensure mongodb is accessible on localhost without authorization.

```
cp openmed.dev.sample openmed.json
cd OpenMed/server
npm install
npm setup
cd ../client
npm install
npm run dev
```

Wait a bit (it needs to preprocess css) then you will get a locally running OpenMed server *without conferencing* but with live reload of both the client and the server.

To get conferencing to work and have it to send email, you have to follow the [installation instructions](INSTALL.md).
