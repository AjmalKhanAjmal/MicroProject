const express = require('express')
const app = express()
require('dotenv').config()

let db_connection = require("./config/mongo_db_Con")
let { practice_table } = require("./model/practice_model")
const { db } = require("./config/sql_bd_con")

const axios = require('axios')

app.listen(9000, () => {
    console.log("server listening on 9000");
})
app.use(express.json());







// class OrderService {
//   createOrder() {
//     console.log("Order created");
//   }
// }

// class OrderController {
//   constructor(service) {
//     this.service = service;
//   }

//   create(req, res) {
//     this.service.createOrder();
//     res.send("OK");
//   }
// }

// const service = new OrderService();
// const controller = new OrderController(service);

// // app.post("/orders", controller.create.bind(controller));
// app.post("/orders", controller.create.bind(controller));






  function createOrder() {
    console.log("Order created");
  }



  function create(req, res) {
    createOrder();
    res.send("OK");
  }


// const service = new OrderService();
// const controller = new OrderController(service);

// app.post("/orders", controller.create.bind(controller));
app.post("/orders",create);

































app.post('/api/practice_table/intt', async (req, res) => {

    try {


        let payload = {
            "name": req.body.name,
            "details": req.body.details,
            "ids": req.body.ids
        }
        let results = await fetch(
            "http://localhost:9000/api/practice_table",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
        // let results = await practice_table.find()
        const data = await results.json();
        res.status(200).json(data)
    }


    //     try {
    //     const payload = {
    //       name: req.body.name,
    //       details: req.body.details,
    //       ids: req.body.ids
    //     };

    //     const response = await fetch("http://localhost:9000/api/practice_table", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(payload)
    //     });

    //     const data = await response.json();

    //     res.status(200).json(data);

    //   } 

    catch (error) {
        res.status(500).json({
            "status": "error",
            "mesasage": error.message
        })
    }
})






app.get('/api/practice_table', async (req, res) => {
    try {
        let results = await practice_table.find()
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "mesasage": error.message
        })
    }
})




app.post('/api/practice_table', async (req, res) => {
    try {

        // const url = "http://localhost:9000/api/practice_table";

        // const response = await axios.get(url); // 👈 wait here

        // res.status(200).json(response.data);   // 👈 send actual data


        let results = await practice_table.create({ name: req.body.name, details: req.body.details, ids: req.body.ids })
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