// getStoreHours.js

const  db  = require('./src/config/db');  // Make sure you require your DB config
const getStoreHoursById = async (id) => {
    let get_query = `
    SELECT 
        sh.name,
        sh.time_zone,
        sho.store_hour_id,
        sho.day_of_week,
        sho.label,
        sho.json_data FROM
    sh.store_hours INNER JOIN 
    store_hours_options ON
    sh.id = sho.store_hour_id
    WHERE
    sh.id = ?`;

    let results = await db.query(get_query, {
        replacements: [id],
    });
    return results;
};

// Call the function with a sample ID (replace with actual ID)
const id = 1;  // Example store ID
getStoreHoursById(id)
    .then((data) => {
        console.log('Store hours data:', data);
    })
    .catch((error) => {
        console.error('Error fetching store hours:', error);
    });
