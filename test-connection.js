const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected Successfully!`);
        console.log(`📊 Host: ${conn.connection.host}`);
        console.log(`💾 Database Name: ${conn.connection.name}`);
        
        await mongoose.connection.close();
        console.log('🔌 Connection closed successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed!');
        console.error('Error details:', error.message);
        process.exit(1);
    }
};

testConnection();