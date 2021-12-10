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
    

    // Get all files
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

        
        const listedObjects = await s3.listObjectsV2(listParams).promise();

        console.log('listedObjects:', listedObjects);

        res.send(listedObjects);
    })

    // Put a file
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
            res.status(200).send(path);
        });
    })

}
