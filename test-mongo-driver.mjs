import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// Direct connection without SRV DNS lookup
const uri = "mongodb://YatriTest:Test123456@cluster0.hwi4g6w.mongodb.net:27017/?ssl=true&authSource=admin&directConnection=true";

async function testConnection() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        family: 4 // Force IPv4
    });
    
    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        console.log('Using direct connection (non-SRV)');
        
        await client.connect();
        console.log('✅ Connected successfully to MongoDB!');
        
        const db = client.db('YatriPadhiyarDB');
        const collections = await db.listCollections().toArray();
        console.log(`📊 Database: YatriPadhiyarDB`);
        console.log(`📊 Available collections: ${collections.length}`);
        
        await client.close();
        console.log('🔌 Connection closed successfully');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.log('\n💡 Troubleshooting steps:');
        console.log('1. Verify password for YatriTest is "Test123456"');
        console.log('2. Check if 0.0.0.0/0 is still in IP Access List');
        console.log('3. Try using mobile hotspot instead of current WiFi');
    }
}

testConnection();