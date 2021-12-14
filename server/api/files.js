const config = require("../config.js")
const AWS = require('aws-sdk');

module.exports = (app) => {

    AWS.config.getCredentials(function (err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
          console.log("Access key:", AWS.config.credentials.accessKeyId);
        }
    });
    

    /**  Ottieni la lista files relativa ad un utente
     * Method: GET
     * Path: /api/files/:userId
     * Params:
     * - userId: id univoco dell'utente 
    */
    app.get("/api/files/:userId", async(req, res) => {
        console.log("GET /api/files");

        const s3 = new AWS.S3();

        let dir = req.params.userId + '/';
        //let dir = '';

        console.log('dir: ', dir);

        const listParams = {
            Bucket: config.aws.s3Bucket,
            Prefix: dir,
            Delimiter: '/'
        };

        console.log('listParams: ', listParams);

        try{
            const listedObjects = await s3.listObjectsV2(listParams).promise();
            console.log('listedObjects:', listedObjects);
            if(!listedObjects.Contents || listedObjects.Contents.length === 0)
                res.status(500).send({err: 'empty folder'});
            else
                res.send(listedObjects.Contents);
        }catch(e){
            res.status(500).send(e);
        }

    })

    /**  Ottieni il link per scaricare un file relativo ad un utente
     * Method: GET
     * Path: /api/files/url/:userId/:fileName
     * Params:
     * - userId: id univoco dell'utente 
     * - fileName: nome file da recuperare
    */
    app.get("/api/files/url/:userId/:fileName", async(req, res) => {

        console.log("GET /api/files/url");
        console.log("params: ", req.params);
        
        let s3 = new AWS.S3({
            endpoint: 's3-eu-central-1.amazonaws.com',
            signatureVersion: 'v4',
            region: 'eu-central-1'
        });
        const path = req.params.userId + '/' +req.params.fileName;
        const signedUrlExpireSeconds = 60 * 25;

        try {
            ///GET
            const url = s3.getSignedUrl('getObject', {
                Bucket: config.aws.s3Bucket,
                Key: path,
                // 'Content-Type': 'application/pdf',
                Expires: signedUrlExpireSeconds
            });

            console.log('Object Url:' , url);
            res.status(200).send({url: url});

        } catch (e) {
            console.log('ERROR: '+e);
            res.status(500).send(e);;
        }
    })

    /**  Carica un file relativo ad un utente
     * Method: PUT
     * Path: /api/files/:userId/:fileName
     * Params:
     * - userId: id univoco dell'utente
    */
    app.put("/api/files/:userId/:fileName", async(req, res) => {
        console.log("PUT /api/files")
        let s3 = new AWS.S3();
        // const path = 'tests.json';
        const path = req.params.userId + '/';
        const fileName = req.params.fileName;
        const body = {msg: 'ciao'};

        let putparams = {
            Bucket: config.aws.s3Bucket,
            Key: path + fileName,
            Body: body.toString()
        };

        // Put object into S3
        s3.putObject(putparams, (error, data) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }
            console.log(data);
            res.status(200).send(path + fileName);
        });
    })

}