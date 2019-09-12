const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')


const connectDB = async () => {
    try{
        
        if(process.env.MONGODB_URI ){
            mongoose.connect(process.env.MONGODB_URI , {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
        }
        else{
            mongoose.connect(db, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
        }
        console.log('mongoDB Connected')
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }

}

module.exports = connectDB;