const { client } = require("../Config/redis")

async function storeDataInRedis(key, value) {
    try {
        const key_name = key;
        const data_value = JSON.stringify(value);
        let results = await client.set(key_name, data_value)
        return { message: "Data stored in Redis successfully", key_name, value: JSON.parse(data_value) };
    } catch (error) {
        throw error
    }
}
// app.post("/cache/:storeName", async (req, res) => {

// })

async function getDataFromRedis(key) {
    try {
        const key_name = key;
        // const data_value = JSON.stringify(value);
        let results = await client.get(key_name)
        return { data: JSON.parse(results) };
    } catch (error) {
        throw error
        // return res.status(500).json({ message: "Error storing data in Redis", error: error.message });
    }
}




// async function deleteKey(key) {
//     try {

//         return new Promise((resolve, reject) => {
//              console.log("step -- 0 ");
//             client.del(key, (err, reply) => {
//                 if (err) {
//                     // Reject the promise if there is an error (e.g., Redis connection issue)
//                     return reject(`Error deleting key: ${err}`);
//                 }
//                 console.log("step --1 ");
                
//                 if (reply === 1) {
//                 console.log("step --2 ");

//                     let data = `Key ${key} was deleted successfully.`
//                     return resolve({ data })
//                 } else {
//                     let data = `Key ${key} does not exist`
//                      return reject({ data })
//                 }
//             });
//         })

//         // let response = await client.del(key)
//         // console.log(response);

//         // let data = `Key ${key} was deleted successfully.`
//         // return { data }
//         // return 
//     } catch (error) {
//         throw error
//     }
// }



async function deleteKey(key) {
  try {
    console.log("step -- 0");

    // return new Promise((resolve, reject) => {
    //   console.log("step -- 1");

    //   client.del(key, (err, reply) => {
    //     console.log("Inside del callback");

    //     if (err) {
    //       // Reject the promise if there is an error (e.g., Redis connection issue)
    //       return reject(`Error deleting key: ${err}`);
    //     }

    //     console.log("step --2");

    //     if (reply === 1) {
    //       let data = `Key ${key} was deleted successfully.`;
    //       return resolve({ data });
    //     } else {
    //       let data = `Key ${key} does not exist`;
    //       return reject({ data });
    //     }
    //   });
    // });


        let response = await client.del(key)
        console.log(response);

        let data = `Key ${key} was deleted successfully.`
        return { data }

  } catch (error) {
    console.error('Error in deleteKey:', error);
    throw error;
  }
}

module.exports = { storeDataInRedis, getDataFromRedis, deleteKey }