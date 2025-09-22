const Store_hours = require("../model/store_hours")
const Store_hours_options = require("../model/store_hours_options")


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
//                     "is_closed": false
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


const updateStoreHours = async (id, name, time_zone, is_special_hour_enabled, special_hour_data, store_hours_options) => {
    try {
        let response = {}
        let results = await Store_hours.update({
            name, time_zone
        }, {
            where: { id: id }
        })
        if (results[0] == "1") {
            response["store_data"] = "store data updated successfully "
        } else return null
        let hour_options = []
        for (let i = 0; i < store_hours_options.length > 0; i++) {
            x = store_hours_options[i]
            let obj = {
                id: x.id,
                day_of_week: x.day_of_week,
                label: x.label,
                // store_hour_id: String(create_hours.dataValues.id),
                json_data: x.json_data,
                is_special_hour_enabled: is_special_hour_enabled,
                special_hour_data: special_hour_data
            }
            hour_options.push(obj)
        }

        let hour_options_results = (hour_options.length > 0) ? await store_hours_options.update(hour_options) : null
        if (hour_options_results[0] == "1") {
            response["store_hour_options"] = "store hour options data updated successfully "
        }

        return response

    } catch (error) {
        throw new Error(error.message)
    }

}




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




module.exports = { createStoreHours, getStoreHours, updateStoreHours }