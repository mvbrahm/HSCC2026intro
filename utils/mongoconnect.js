const { MongoClient, ServerApiVersion } = require('mongodb');

function testconnect(){
const uri = "mongodb+srv://"+ process.env.MONGO_LOGIN + "@hsccvote2026.mmucnxx.mongodb.net/?appName=HSCCVote2026";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
serverApi: {
version: ServerApiVersion.v1,
strict: true,
deprecationErrors: true,
}
});
async function run() {
try {
// Connect the client to the server (optional starting in v4.7)
await client.connect();
// Send a ping to confirm a successful connection
await client.db("ElectionIRV").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
// Ensures that the client will close when you finish/error
await client.close();
}
}
run().catch(console.dir);
}
