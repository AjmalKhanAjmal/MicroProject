const { db } = require("../config/sql_bd_con")
const axios = require("axios")
const { practice_table_schema } = require("../model/practice_model_sql")



 






class OrderService {
  createOrder() {
    console.log("Order created");
  }
}

class OrderController {
  constructor(service) {
    this.service = service;
  }

  create(req, res) {
    this.service.createOrder();
    res.send("OK");
  }
}

const service = new OrderService();
const controller = new OrderController(service);

app.post("/orders", controller.create.bind(controller));










const createPracticeTable = async (name, description, req, res) => {
  try {
    // if (req && req.body) {

    // }
    await db.sync();
    let create_table = await practice_table_schema.create({
      name, description
    })

    console.log(create_table);

  } catch (error) {
    console.log(error.message);

    // res.status(500).json({
    //     'status': "error",
    //     'message': error.message
    // })
  }

}



const findPracticeTable = async (req, res) => {
  try {
    let limit = 10;
    let offset = 0
    await db.sync();
    let create_table = await practice_table_schema.findAll({ order: [["id", "asc"]], raw: true, offset, limit })

    let ApiResponse = {
      total_count: create_table.count,
      data: create_table
    }
    console.log("dataaa", ApiResponse);

    //   limit,
    //   offset,
    //   order: [["createdAt", "DESC"]],
    //   raw: true,

  } catch (error) {
    console.log(error.message);

    // res.status(500).json({
    //     'status': "error",
    //     'message': error.message
    // })
  }

}
// createPracticeTable("John", 'john bhai')

// findPracticeTable()







const updatePracticeTable = async (req, res) => {
  let data = {
    name: "joseph",
    description: "sdd"
  }
  let results = await practice_table_schema.update(data, {
    where: { id: 1 }
  })


  console.log(results);

}



const deletePracticeTable = async (req, res) => {
  let data = {
    name: "joseph",
    description: "sdd"
  }

  id = 1
  let results = await practice_table_schema.destroy({
    where: { id }
  })



  console.log(results);

}

// (async () => {

//   await updatePracticeTable()
//   await findPracticeTable()
// }
// )()

// deletePracticeTable()
// findPracticeTable()





// axios
// =======

// axios.post(url, payload, { headers })

let url = 'http://localhost:9000/api/practice_table'
// let payload ={
//   "name": "abcc",
//   "details": {
//     "type": "anbdna",
//     "required": "kndknk"
//   },
//   "ids": [
//     7483,
//     23,
//     54
//   ]
// }




// GET :
// ===========================
//   const url = "http://localhost:9000/api/practice_table"
//   const response = await axios.get(url); // 👈 wait here
//    res.status(200).json(response.data);

  //  console.log({
  //   data : JSON.stringify(data.data, null, 2)
  // });
  
  
// })
// response.then((data)=>{
//   console.log(data);
  
// })






//==================
//  findByPk

// const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return ApiResponse.error(res, 404, "User not found");
//     }
//==================
//     await user.update({ name, email });


// const user = await User.findByPk(req.params.id);

//     if (!user) {
//       return ApiResponse.error(res, 404, "User not found");
//     }

//     await user.destroy();
// ============
//  let results = await Product.destroy({
//         where: {
//           id: id
//         }
//       })
//==================
// findOne({ where: { id } })
//==================
// limit,
//   offset,
//   order: [["createdAt", "DESC"]],
//   raw: true,


/*

============================

sequelize.define("User", {...})

await sequelize.authenticate();
await sequelize.sync();
Model.create(data)
Model.findAll()
Model.findByPk(id)
Model.findOne({ where })
Model.update(data, { where })
instance.update(data)
Model.destroy({ where })
instance.destroy()
{ where: { status: "active" } }
const { Op } = require("sequelize");

where: {
  age: { [Op.gt]: 18 }
}

attributes: ["id", "name"]
attributes: { exclude: ["password"] }

limit: 10,
offset: 20

order: [["createdAt", "DESC"]]

Model.findAndCountAll()

Model.findAll({ raw: true })

instance.toJSON()

logging: false




  const result = await practice_table_schema.findAndCountAll({
      attributes: ["id", "name", "description"],
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      raw: true,
    });

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        totalRecords: result.count,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(result.count / limit),
      },
    });

*/


