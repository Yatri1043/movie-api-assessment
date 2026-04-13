const { MongoClient } = require('mongodb');
require('dotenv').config();

// Force IPv4 and disable DNS SRV lookup issues
const uri = "mongodb://YatriTest:Test123456@cluster0.hwi4g6w.mongodb.net:27017/?ssl=true&authSource=admin&directConnection=true";

async function testConnection() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        family: 4 // Force IPv4
    });
    
    try {
        console.log('🔄 Attempting to connect...');
        await client.connect();
        console.log('✅ Connected successfully to MongoDB!');
        
        const db = client.db('YatriPadhiyarDB');
        const collections = await db.listCollections().toArray();
        console.log(`📊 Available collections: ${collections.length}`);
        
        await client.close();
        console.log('🔌 Connection closed');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.log('\n💡 This error means your network is blocking MongoDB connections.');
        console.log('Possible solutions:');
        console.log('1. Try using a different WiFi network (mobile hotspot)');
        console.log('2. Disable VPN/firewall temporarily');
        console.log('3. Contact your network administrator about MongoDB Atlas access');
    }
}

testConnection();