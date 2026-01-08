const express = require('express')
const app = express()
require('dotenv').config()
let db_connection = require("./config/mongo_db_Con")
let { practice_table} = require("./model/practice_model")
const {db} = require("./config/sql_bd_con")

app.listen(9000, () => {
    console.log("server listening on 9000");
})
app.use(express.json());

app.get('/api/practice_table', async (req,res)=>{
    let results =  await practice_table.find()
    res.status(200).json(results)
})

app.post('/api/practice_table', async (req, res) => {
    try {
        console.log("entererf");

        let results = await practice_table.create({name :req.body.name, details:req.body.details,ids: req.body.ids})
        res.status(200).json(results)
       
    }
    catch (error) {
        res.status(500).json({
            "status": "error",
            "mesasage": error.message 
        })
    }
})









// curl --location 'http://localhost:9000/api/practice_table' \
// --header 'Content-Type: application/json' \
// --data '{
//     "name": "abcc",
//     "details": {
//         "type": "anbdna",
//         "required": "kndknk"
//     },
//     "ids": [
//         7483,
//         23,
//         54
//     ]
// }'


// curl --location 'http://localhost:9000/api/practice_table'