import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://YatriTest:Test123456@cluster0.hwi4g6w.mongodb.net/YatriPadhiyarDB?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        family: 4 // Force IPv4 only
    });
    
    try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        console.log('📍 Target:', 'cluster0.hwi4g6w.mongodb.net');
        console.log('👤 User: YatriTest');
        console.log('💾 DB: YatriPadhiyarDB');
        console.log('---');
        
        await client.connect();
        console.log('✅ CONNECTION SUCCESSFUL!');
        
        const db = client.db('YatriPadhiyarDB');
        
        // Test insert
        const testCollection = db.collection('connection_test');
        const result = await testCollection.insertOne({
            testUser: 'YatriPadhiyar',
            timestamp: new Date(),
            message: 'Exam connection test'
        });
        console.log(`✅ Document inserted with ID: ${result.insertedId}`);
        
        // Test read
        const count = await testCollection.countDocuments();
        console.log(`✅ Connection test passed! Total docs: ${count}`);
        
        await client.close();
        console.log('🔌 Connection closed');
        
    } catch (error) {
        console.error('❌ Connection FAILED');
        console.error('Error type:', error.name);
        console.error('Error message:', error.message);
        
        if (error.message.includes('Authentication failed')) {
            console.error('\n🔑 Password issue: Check YatriTest password is "Test123456"');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
            console.error('\n🌐 Network issue: Try switching to mobile hotspot or different WiFi');
        }
    }
}

testConnection();