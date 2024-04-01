const mongoose = require('mongoose'); 

const connectDB = async ()=> { 
    try{ 
        const conn = await mongoose.connect(`mongodb+srv://rockellegardner:Abc123321@sba319.byijayw.mongodb.net/?retryWrites=true&w=majority&appName=SBA319`, { 
        // useNewUrlParser: true,
        // useUnifiedTopology:true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) { 
        console.error(error); 
        process.exit(1);
    }
};

module.exports = connectDB; 