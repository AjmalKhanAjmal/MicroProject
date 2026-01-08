const { db } = require("../config/sql_bd_con")

const { practice_table_schema } = require("../model/practice_model_sql")


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



const findPracticeTable = async ( req, res) => {
    try {
        await db.sync();
        let create_table = await practice_table_schema.findAll({  attributes: ["id", "name", "description"],limit : 10, offset : 1,raw: true })

        console.log("dataaa",create_table);

//         limit,
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

findPracticeTable()


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
