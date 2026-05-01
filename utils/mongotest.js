
const { MongoClient, ServerApiVersion } = require('mongodb');


   
function CreateMongoClient() {
        
        
        const uri = "mongodb+srv://"+ process.env.MONGO_LOGIN + 
        "@hsccvote2026.mmucnxx.mongodb.net/?appName=HSCCVote2026";
        console.log("Test #1")
        const client = new MongoClient(uri, {
            serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            }
        });
        console.log(uri)
        return client;
    } // End CreateMongoClient function


module.exports ={
    CreateMongoClient
}