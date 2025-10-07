const { Menu_organizer } = require("../model/menu_organizer")
const create_menu_organizer = async (name, description, category_ids, store_id, application_id) => {
    try {
        console.log("application : ", application_id);

        let results = await Menu_organizer.create({ name, description, category_ids, store_id, application_id })
        return results
    } catch (error) {
        throw error
    }
}




const getMenuById = async (req) => {
    try {
        if (req) {
            const results = await Menu_organizer.findOne({
                where: {
                    id: req
                }
            })

            if (!results) {
                return null
            }


            return results
        }
    }
    catch (error) {
        throw new Error(error.message)
    }
}


const update_menu_organizer = async (id, name, description, category_ids, store_id) => {
    try {
        let filter = {
            _id: id
        }
        let update = { id, name, description, category_ids, store_id }
        results = await Menu_organizer.updateOne(filter, update)
        if (results[0] === 0) {
            return null
        }
        return results

    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteMenu = async (id) => {
    try {
        // let results = await Menu_organizer.deleteOne({_id : id})
        const results = await Menu_organizer.findByIdAndDelete(id);
        if (!results) {
            let error = new Error("category not found ")
            error.status = 404
            throw error
        }
        return results
    }
    catch (error) {
        throw error
    }
}

const getMenuCategory = async (store_id, offset, limit, sort, sort_type, application_id) => {
    try {
        console.log("executed -- 1 ");

        let filter = {
            store_id: store_id,
            application_id: application_id
        }
        let menu_sort = "updatedAt"
        let menu_sort_type = 1

        if (sort) {
            menu_sort = sort
        }
        if (sort_type && sort_type == "desc") {
            menu_sort_type = -1
        }


        //formula for page --->   const skip = (page - 1) * limit;


        //     const sortDirection = sortType === 'desc' ? -1 : 1; // default to ascending if not 'desc'

        //   // Create a dynamic sort object
        //   const sort = { [sortBy]: sortDirection };

        let menu_offset = offset || 0
        let menu_limit = limit || 15
        let sort_direction = {
            [menu_sort]: menu_sort_type
        }
        let results = await Menu_organizer.find(filter)
            .skip(menu_offset)
            .limit(menu_limit)
            .sort(sort_direction)

            console.log("results , " ,results);
            
        if (!results.length > 0) {
           
            
            return null
        }
        return results
    } catch (error) {
        throw error
    }


}
module.exports = { create_menu_organizer, update_menu_organizer, getMenuCategory, deleteMenu }
