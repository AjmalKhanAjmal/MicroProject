const {mongoose} =  require('mongoose')
// require('dotenv').config()


// require('dotenv').config({ path: '../.env' });
let mongo_driver = `${process.env.MONGO_HOST_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
mongoose.connect(mongo_driver).then(()=>{
    console.log("connected to mongo dv");
    
}).catch((err)=>{
    console.log("error message ",err.message);
    
})