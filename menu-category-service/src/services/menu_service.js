const Menu_organizer = require("../model/menu_organizer")
const { route } = require("../routes/menu_category_routes")

const db = require("../config/db")
const createMenu = async (req) => {
    try {
        if (req) {
            const { name, description, category_ids, store_id } = req
            let results = await Menu_organizer.create({ name: name, description: description, category_ids: category_ids, store_id: store_id })
            return results
        }
    }
    catch (error) {
        throw new Error(error.message)
    }
}

const getAllMenu = async (limit, offset, sort, sort_type) => {

    try {
        let final_limit = limit || "15"
        let final_offset = offset || "0"
        let final_sort = sort || "updatedAt"
        let final_sort_type = sort_type || "asc"
        let get_all_query = `select id,name,description,store_id from shop.menuorganizers order by ${final_sort}  ${final_sort_type} limit ? offset ? `

        let results = await db.query(get_all_query,
            {
                replacements: [parseInt(final_limit), parseInt(final_offset)]
            }
        )
        console.log(get_all_query);

        return results[0]
    }
    catch (error) {
        throw new Error(error.message)
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
const updateMenu = async (req) => {
    try {
        if (req) {
            const { id, name, description, category_ids, store_id } = req
            results = await Menu_organizer.update(
                { name: name, description: description, category_ids: category_ids, store_id: store_id },
                {
                    where: { id: id }
                }
            )
            if (results[0] === 0) {
                return null
            }
            return "menu updated successfully"
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteMenu = async (req) => {
    try {
        if (req) {
            const results = await Menu_organizer.destroy({
                where: {
                    id: req
                }
            })
            if (!results) {
                return null
            }


            return "menu deleted successfully"
        }
    }
    catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { createMenu, getAllMenu, updateMenu, getMenuById, deleteMenu }






