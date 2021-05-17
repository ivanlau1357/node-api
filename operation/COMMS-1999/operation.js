const { MongoClient } = require('mongodb');
const connectionURL = "mongodb://hktv-comms:hktv-comms@localhost:27017/hktv-comms?authSource=hktv-comms"; // replace with connection string
const databaseName = "hktv-comms";

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('error connecting to mongodb');
    }

    const db = client.db(databaseName);

    async function countHealth() {
        return await db.collection('health').countDocuments();
    }

    async function countUser() {
        return await db.collection('user').countDocuments();
    }
    
    async function run() {
        try{
            const healthcount = await countHealth();
            const userCount = await countUser();
            console.log('userCount----', userCount);
            console.log('healthcount----', healthcount);


        } catch(e) {
            console.log('error--------', e);
        }
    }

    run();

});
