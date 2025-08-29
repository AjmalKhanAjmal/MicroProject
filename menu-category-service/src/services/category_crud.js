const category = require("../model/category")
const createCategory = async (req) => {
    try {
        if (req) {
            console.log(req);

            let { name, description, store_id } = req
            let results = await category.create({ name: name, description: description, store_id: store_id })
            return {
                status: "success",
                data: results
            }
        }

    } catch (error) {
        // return {
        //     status:"error",
        //     message : error.message
        // }
        console.error('Error in createCategory service:', error); // Log for debugging
        throw new Error('Failed to create category: ' + error.message);
    }
}


const updateCategory = async (req) => {
    try {
        if (req) {
            const { id: id, name, description } = req
            let results = await category.update({
                name: name, description: description
            }, {
                where: {
                    id: id
                }
            })

            //console.log("results" , results);
            

            if(results[0] === 0 ){ // type safe
                return null
            }

            return {
                status : "success",
                message: "Category updated successfully"
            };
        }
    } catch (error) {
        console.error(error.messsage);
        throw new Error('Failed to create category: ', error.message)
    }
}


const getCategoryById = async (req) => {
    try {
        if (req) {
            let results = await category.findOne({ where: { id: req } })
            return results
        }
    }
    catch (error) {
        console.error(error.message);
        // throw new Error("Error at get category By Id : ", error.message )    
        throw new Error(`Error at getCategoryById: ${error.message}`);
    }
}

const getAllCategories = async () => {
    try {
        let results = await category.findAll();  // Await the asynchronous operation
        // return results.map(category => category.get());  // Convert sequelize instances to plain objects
        return results

    } catch (error) {
        throw new Error('Failed to fetch categories: ' + error.message);  // Corrected the error message (fetch vs fetching)
    }
};

const deleteCategories = async (req) => {
    try {
        if (req && req.id) {
            const results = await category.destroy({ where: { id: req.id } })
            return results;
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = { createCategory, getAllCategories, updateCategory, getCategoryById, deleteCategories }