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
        if (create_hours && create_hours.length > 0 && create_hours[0].id && store_hours_options && store_hours_options.length > 0) {
            let hour_options = []
            for (let i = 0; i < store_hours_options.length > 0; i++) {
                x = store_hours_options[i]
                let obj = {
                    day_of_week: x.day_of_week,
                    label: x.label,
                    store_hour_id: create_hours[0].id,
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
                response["id"] = create_hours[0].id
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




module.exports = { createStoreHours, getStoreHours }