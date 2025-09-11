const Tax_rates = require("../model/tax_rates")
const db = require("../config/db")

function createTaxRates(name, description, tax_category_id, rate) {
    try {
        let results = Tax_rates.create({
            name, description, tax_category_id, rate
        })
        return results
    } catch (error) {
        throw new Error(error.message
        )
    }
}

async function getTaxRatesById(id) {
  try {
    if (id) {
      results = await Tax_rates.findOne({
        where: {
          id: id
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

async function getTaxRates(limit, offset, sort, sort_type, search) {
    try {

        let tax_limit = parseInt(limit) || 15
        let tax_offset = parseInt(offset) || 0
        let tax_sort = sort || 'createdAt'
        let tax_sort_type = sort_type || "asc"

        let replacements = []

        let tax_query = ""
        let pagination = ""
        if (search) {
            tax_query = `SELECT* FROM shop.tax_rates WHERE NAME LIKE ? OR description LIKE ? limit ? offset ?`
            pagination = `SELECT count(*) AS total_count FROM shop.tax_rates WHERE name LIKE ? OR description LIKE ?`
            replacements.push(`%${search}%`, `%${search}%`)
        }
        else {
            tax_query = `SELECT* FROM shop.tax_rates order by ${tax_sort} ${tax_sort_type} limit ? offset ?`
            pagination = `SELECT count(*) AS total_count FROM shop.tax_rates`
        }


        let resultsss = [...replacements, tax_limit, tax_offset]
        console.log("resultssss : ",resultsss);
        

        let results = await db.query(tax_query, {
            replacements: [...replacements, tax_limit, tax_offset]
        })


        let total_count = await db.query(pagination, {
            replacements
        })
        let final_resonse = {
            status: "success",
            data: results[0],
            pagination: {
                total_count: total_count[0][0].total_count
            }
        }
        return final_resonse
    } catch (error) {
        throw new Error(error.message)
    }
}


const deleteTaxById = async (id) => {
  try {
    if (id) {
      let results = await Tax_rates.destroy({
        where: {
          id: id
        }
      })
      if (results == 0) {
        return null
      }
      return {
        status: "success",
        message: "tax rate deleted successfully"
      }

    }
  } catch (error) {
    throw new Error(error.message)
  }
}





module.exports = { createTaxRates, getTaxRates,getTaxRatesById ,deleteTaxById}