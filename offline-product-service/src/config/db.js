const  {mongoose} = require("mongoose")

let driver_mongo_url = `${process.env.MONGO_HOST_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`

new Promise((resolve,reject)=>{
    mongoose.connect(driver_mongo_url).then(function(){
    resolve(console.log("db connected succefully " )
    )
    }).catch((error)=>{
        reject(console.log("error -- : ", error.message)
        )
    })
})
