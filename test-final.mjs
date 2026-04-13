import { MongoClient } from 'mongodb';

// Use the SRV string but with force IPv4
const uri = "mongodb+srv://YatriTest:Test123456@cluster0.hwi4g6w.mongodb.net/YatriPadhiyarDB?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        family: 4, // Force IPv4
        useUnifiedTopology: true,
        directConnection: false
    });
    
    try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        console.log('Username: YatriTest');
        console.log('Database: YatriPadhiyarDB');
        
        await client.connect();
        console.log('✅ CONNECTION SUCCESSFUL!');
        
        const db = client.db('YatriPadhiyarDB');
        console.log(`✅ Connected to database: ${db.databaseName}`);
        
        // Test write operation
        const testCollection = db.collection('test');
        await testCollection.insertOne({ test: true, timestamp: new Date(), user: 'YatriPadhiyar' });
        console.log('✅ Successfully wrote to database!');
        
        const count = await testCollection.countDocuments();
        console.log(`📊 Test collection has ${count} document(s)`);
        
        await client.close();
        console.log('🔌 Connection closed');
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('Full error:', error);
    }
}

testConnection();