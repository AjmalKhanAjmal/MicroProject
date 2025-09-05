

// function createStore(req, res) {

//     console.log("Heloo Controller -- 1 ");
//     try {
//         if (req && req.body) {

//             let { name, description } = req.body


//             Store.create({ name, description }).then((create_store) => {
//                 return res.status(200).json({
//                     status: "success",
//                     id: create_store.id
//                 }

//                 )
//             })
//             // console.log(create_store);

//         } else {
//             return res.status(400).json({
//                 status: "error",
//                 message: "payload not exists"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             status: "error",
//             message: error.message
//         })
//     }
// }

// const updateStore = async (req, res) => {
//     try {
//         if (req && req.body) {
//             let { id, name, description } = req.body
//             let update_store = await Store.update({ name, description }, { where: { id } })
//             console.log(update_store);
//             return res.status(200).json({
//                 status: "success",
//                 id: id,
//                 updated_data: update_store
//             })

//         }
//     } catch (error) {
//         console.log("error" + error.message);

//     }
// }

// const getStoreById = async (req, res) => {
//     try {
//         if (req) {
//             console.log((req.body) ? req.body : "--");

//             let id = req.params.id
//             console.log("idd ss", id);

//             let get_store_by_id = await Store.findOne({ where: { id } })
//             // console.log(getStoreById);
//             res.status(200).json({
//                 status: "success",
//                 data: get_store_by_id
//             })

//         } else {
//             return res.status(400).json({
//                 status: "error",
//                 message: "bad request"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({

//             status: "error",
//             message: error.message
//         })
//     }
// }

// const getAllStores = async (req, res) => {
//     try {
//         // if (req) {
//         let offset = parseInt(req.query.offset) || 0
//         let limit = parseInt(req.query.limit) || 10

//         let get_stores_query = `SELECT id,name,description from shop.stores order by updatedAt DESC limit ? offset ?`
//         console.log(get_stores_query);
//         let get_all_stores = `SELECT COUNT(*) AS total_count FROM shop.stores`

//         //console.log(db);

//         let [users, metadata] = await sqlize.query(get_stores_query, {
//             replacements: [limit, offset]
//         })
//         console.log("resultrs : ", metadata);
//         console.log("dataaa : ", users);
//         let get_count = await sqlize.query(get_all_stores)
//         console.log(get_count);

//         let record_total_count = 0
//         record_total_count = (get_count && get_count[0] && get_count[0].length > 0 && get_count[0][0].total_count) ? get_count[0][0].total_count : 0
//         return res.status(200).json({
//             status: "success",
//             data: users,
//             pagination: {
//                 total_count: record_total_count
//             }
//         })
//         // }
//         // else {
//         //     return res.status(400).json({
//         //         status: "error",
//         //         message: "bad request"
//         //     })
//         // }
//     } catch (error) {
//         return res.json({
//             status: "error",
//             error: error.message
//         })
//     }
// }


// module.exports = { createStore, updateStore, getStoreById, getAllStores }






const { createStore, updateStore, getStoreById, getAllStores } = require("../Services/storeCrud")

const insertStore = async (req, res) => {
    try {
        const store = await createStore(req)//send req.body 
        res.status(200).json(store)
    } catch (error) {
        return res.status(500).json(
            {
                status: "error",
                message: error.message
            }
        )
    }
}

const editStore = async(req,res)=>{
   try{
     if(req && req.body){
        let results = await updateStore(req.body)
        return res.status(200).json(results)
    }
   }catch(error){
    res.status(500).json({
        status : "error",
        message : error.message
    })
   }
}



const stores = async (req, res) => {
    try {
        const store = await getAllStores(req)//send req.body 
        res.status(200).json(store)
    } catch (error) {
        return res.status(500).json(
            {
                status: "error",
                message: error.message
            }
        )
    }
}
console.log(" insert werwe" , stores);
module.exports = {insertStore,stores,editStore}






















