# OpenMed

Welcome to OpenMed.

- Check [this website](https://openmed.faisitalia.it/) for documentation (in italian).
- Check [this document](PREREQ.md) for prerequisites before installing.
- Check [this document](INSTALL.md) for installation, either for development and production.

# TL;DR

Install nodejs v14.x.y and Mongodb v5.x, locally accessible.

```
cp openmed.dev.sample openmed.json
cd OpenMed/server
npm install
npm setup
cd ../client
npm install
npm run dev
```

You will get a locally running OpenMed server *without conferencing* 

To get conferencing to work and have it to send email, you have to read the [installation instructions](INSTALL.md).
