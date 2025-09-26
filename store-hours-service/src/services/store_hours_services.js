const Store_hours = require("../model/store_hours")
const Store_hours_options = require("../model/store_hours_options")
const db = require("../config/db")
const { response } = require("express")

//Payload 

// {
//     "store_hour_id": "0",
//     "name": "Mountain",
//     "time_zone": "US/Mountain",
//     "is_special_hour_enabled": true,
//     "special_hour_data": [],
//     "store_hours_options": [
//         {
//             "day_of_week": 1,
//             "label": "Mon",
//             "json_data": [
//                 {
//                     "start_time": "09:00:00",
//                     "end_time": "17:00:00",
//                     "is_closed": false
//                 }
//             ]
//         },
//         {
//             "day_of_week": 2,
//             "label": "Tue",
//             "json_data": [
//                 {
//                     "start_time": "09:00:00",
//                     "end_time": "17:00:00",
//                     "is_closed": false
//                 }
//             ]
//         },
//         {
//             "day_of_week": 3,
//             "label": "Wed",
//             "json_data": [
//                 {
//                     "start_time": "09:00:00",
//                     "end_time": "17:00:00",
//                     "is_closed": false
//                 }
//             ]
//         },
//         {
//             "day_of_week": 4,
//             "label": "Thu",
//             "json_data": [
//                 {
//                     "start_time": "09:00:00",
//                     "end_time": "17:00:00",
//                     "is_closed": fal
//                 },
//                 {
//                     "start_time": "20:00",
//                     "end_time": "23:00",
//                     "is_closed": false
//                 }
//             ]
//         },
//         {
//             "day_of_week": 5,
//             "label": "Fri",
//             "json_data": [
//                 {
//                     "start_time": "09:00:00",
//                     "end_time": "17:00:00",
//                     "is_closed": false
//                 }
//             ]
//         },
//         {
//             "day_of_week": 6,
//             "label": "Sat",
//             "json_data": [
//                 {
//                     "start_time": "09:00:00",
//                     "end_time": "17:00:00",
//                     "is_closed": false
//                 }
//             ]
//         },
//         {
//             "day_of_week": 7,
//             "label": "Sun",
//             "json_data": [
//                 {
//                     "start_time": "09:00:00",
//                     "end_time": "17:00:00",
//                     "is_closed": false
//                 }
//             ]
//         }
//     ],
//     "buffer_time": "none"
// }

const createStoreHours = async (name, time_zone, is_special_hour_enabled, special_hour_data, store_hours_options) => {
    try {
        let response = {}
        const create_hours = await Store_hours.create({
            name,
            time_zone
        })
        console.log("store hours : ", create_hours);
        //         store hours :  store_hour {
        //   dataValues: {
        //     id: 1,
        //     name: 'Mountain',
        //     time_zone: 'US/Mountain',
        //     updatedAt: 2025-09-18T13:51:33.469Z,
        //     createdAt: 2025-09-18T13:51:33.469Z
        //   },
        let create_hour_options = []
        if (create_hours && create_hours.dataValues.id && store_hours_options && store_hours_options.length > 0) {
            let hour_options = []
            for (let i = 0; i < store_hours_options.length > 0; i++) {
                x = store_hours_options[i]
                let obj = {
                    day_of_week: x.day_of_week,
                    label: x.label,
                    store_hour_id: String(create_hours.dataValues.id),
                    json_data: x.json_data,
                    is_special_hour_enabled: is_special_hour_enabled,
                    special_hour_data: special_hour_data
                }
                hour_options.push(obj)
            }
            create_hour_options = await Store_hours_options.bulkCreate(hour_options)

            console.log(create_hour_options);

        }

        if (create_hours) {
            response["status"] = "success",
                response["id"] = create_hours.dataValues.id
            response["store_hours"] = "created"
        }
        if (create_hour_options && create_hour_options.length > 0) {
            response["store_hours_options"] = "created"
        }
        return response
    } catch (error) {
        throw new Error(error.message)
    }

}


// const updateStoreHours = async (id, name, time_zone, is_special_hour_enabled, special_hour_data, store_hours_options) => {
//     try {
//         let response = {}
//         let results = await Store_hours.update({
//             name, time_zone
//         }, {
//             where: { id: id }
//         })
//         if (results[0] == "1") {
//             response["store_data"] = "store data updated successfully "
//         } else return null
//         let hour_options = []
//         let batch_size = 20



//         let store_hours_length = store_hours_options.length
//         let remaining_data = store_hours_options.length
//         if(store_hours_length.length > 0){
//             let count = 0
//             let options = []

//             for(let i = count ;i<store_hours_length > 0 ; i++){
//                  options.push(store_hours_options[i])
//                 if(store_hours_length == batch_size ){
//                    let results =  batchExecution(store_hours_options)
//                    remaining_data -= 20
//                    count += batch_size + 1
//                    batch_size +=20
//                    options =[]

//                 }
//             }
//             for(let i = 0 ;i<options.length > 0 ; i++){

//             }
//         }




//         async function batchExecution(store_hours_options) {

//             for (let i = 0; i < store_hours_options.length > 0; i++) {

//                 x = store_hours_options[i]
//                 let obj = {
//                     id: x.id,
//                     day_of_week: x.day_of_week,
//                     label: x.label,
//                     // store_hour_id: String(create_hours.dataValues.id),
//                     json_data: x.json_data,
//                     is_special_hour_enabled: is_special_hour_enabled,
//                     special_hour_data: special_hour_data
//                 }
//                 let results = await Store_hours_options.update(obj, {
//                     where: {
//                         id: obj.id
//                     }
//                 })
//                 hour_options.push(results)
//                 // hour_options.push(obj)

//             }
//         }



//         if (hour_options.length > 0) {
//             response["store_hour_options"] = hour_options
//         }

//         return response

//     } catch (error) {
//         throw new Error(error.message)
//     }

// }




// const updates = [
//   { id: 1, name: 'Store A Updated', status: 'open' },
//   { id: 2, name: 'Store B Updated', status: 'closed' },
//   { id: 3, name: 'Store C Updated', status: 'open' }
// ];

// const fields = ['name', 'status'];
// const primaryKey = 'id';



// async function bulkUpdate(tableName, primaryKey, data, fields, transaction) {
//   if (!data || data.length === 0) return;

//   const ids = data.map(row => row[primaryKey]);

//   const setClauses = fields.map(field => {
//     const cases = data.map(row => {
//       const value = row[field];
//       const formattedValue = typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value;
//       return `WHEN ${row[primaryKey]} THEN ${formattedValue}`;
//     }).join(' ');

//     return `\`${field}\` = CASE \`${primaryKey}\` ${cases} END`;
//   });

//   const query = `
//     UPDATE \`${tableName}\`
//     SET ${setClauses.join(', ')}
//     WHERE \`${primaryKey}\` IN (${ids.join(', ')});
//   `;

//   return sequelize.query(query, { transaction });
// }


// UPDATE `Stores`
// SET 
//   `name` = CASE `id` 
//     WHEN 1 THEN 'Store A Updated' 
//     WHEN 2 THEN 'Store B Updated' 
//     WHEN 3 THEN 'Store C Updated' 
//   END,
//   `status` = CASE `id` 
//     WHEN 1 THEN 'open' 
//     WHEN 2 THEN 'closed' 
//     WHEN 3 THEN 'open' 
//   END
// WHERE `id` IN (1, 2, 3);







const updateStoreHours = async (id, name, time_zone, is_special_hour_enabled, special_hour_data, store_hours_options) => {
    try {
        let response = {};

        // Step 1: Update store main data
        const [storeUpdateCount] = await Store_hours.update(
            { name, time_zone },
            { where: { id } }
        );

        if (storeUpdateCount === 1) {
            response["store_data"] = "Store data updated successfully";
        } else {
            return null; // store not updated
        }

        // Step 2: Batch update store hours options
        const batchSize = 20;
        const total = store_hours_options.length;
        const hourOptionsResults = [];

        // Split into batches and process
        for (let i = 0; i < total; i += batchSize) {
            const batch = store_hours_options.slice(i, i + batchSize);

            // Process each item in the batch sequentially (or you could do Promise.all for parallel)
            for (const item of batch) {
                const obj = {
                    id: item.id,
                    day_of_week: item.day_of_week,
                    label: item.label,
                    json_data: item.json_data,
                    is_special_hour_enabled,
                    special_hour_data
                };

                const [updateCount] = await Store_hours_options.update(obj, {
                    where: { id: obj.id }
                });

                hourOptionsResults.push({ id: obj.id, updated: updateCount === 1 });
            }
        }

        if (hourOptionsResults.length > 0) {
            response["store_hour_options"] = hourOptionsResults;
        }

        return response;

    } catch (error) {
        throw new Error(error.message);
    }
};






const getStoreHours = async () => {
    try {
        let response = {}
        let store_hours = await Store_hours.findAll()
        let store_hours_options = await Store_hours_options.findAll()
        response["store_hours"] = store_hours
        response["store_hours_options"] = store_hours_options

        return response
    } catch (error) {
        throw new Error(error.message)
    }
}


const getStoreHoursById = async (id) => {
    let response = {}
    let get_query = `
SELECT 
    sh.name,    
    sh.time_zone,
    sho.store_hour_id,
    sho.day_of_week,
    sho.label,
    sho.json_data 
FROM
    shop.store_hours sh 
INNER JOIN 
    shop.store_hours_options sho ON
    sh.id = sho.store_hour_id
WHERE
    sh.id = ?`


    let results = await db.query(get_query, {
        replacements: [id]
    })

    // return (results[0].length > 0) ? ( response.data = results[0]) : null

    if (results[0].length > 0) {
        response.data = results[0]
        return response
    } else {
        return null
    }
}



const deleteStoreHours = async (id) => {
    const response = {
        data: {
            store_hours_destroyed: null,
            store_hour_option_destroyed: null
        }
    };

    try {

        const destroyedOptionsCount = await Store_hours_options.destroy({
            where: { store_hour_id: id }
        });

        if (destroyedOptionsCount) {
            response.data.store_hour_option_destroyed = `Store hours options destroyed, count: ${destroyedOptionsCount}`;
        } else {
            response.data.store_hour_option_destroyed = 'No store hours options found to delete';
        }


        const destroyedHoursCount = await Store_hours.destroy({
            where: { id }
        });

        if (destroyedHoursCount) {
            response.data.store_hours_destroyed = `Store hours destroyed, count: ${destroyedHoursCount}`;
        } else {
            response.data.store_hours_destroyed = 'No store hours found to delete';
        }

        if (response.data.store_hours_destroyed === null && response.data.store_hour_option_destroyed === null) return null

    } catch (error) {

        throw error;
    }
};


module.exports = { createStoreHours, getStoreHours, updateStoreHours, getStoreHoursById, deleteStoreHours }



