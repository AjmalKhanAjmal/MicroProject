const { search } = require("../routes/tax_routes")
const tax_service = require("../services/tax_rates_service")


async function insertTaxRates(req, res) {
    try {
        if (!req.body || !req.body.name) {
            res.status(400).json({
                status: "error",
                message: "must name contain"
            })
        } else {
            let tax_name = req.body.name
            let tax_description = req.body.description
            let tax_category_id = req.body.tax_category_id
            let tax_rate = req.body.rate
            let results = await tax_service.createTaxRates(tax_name, tax_description, tax_category_id, tax_rate)
            res.status(200).json({
                status: "success",
                data: results
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}





const taxByid = async (req, res) => {
    try {
        if (req.params && req.params.id) {
            let results = await tax_service.getTaxRatesById(req.params.id)
            if (results === null) {
                return res.status(404).json({
                    status: "error",
                    message: "tax rates not found"
                })
            }
            return res.status(200).json(results)
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}



async function fetchTaxRates(req, res) {
    try {
        let tax_limit = req.query.limit
        let tax_offset = req.query.offset
        let tax_sort = req.query.sort
        let tax_sort_type = req.query.sort_type
        let tax_search = req.query.search
        let results = await tax_service.getTaxRates(tax_limit, tax_offset, tax_sort, tax_sort_type, tax_search)
        res.status(200).json(
            results
        )
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message

        })
    }
}


const removeTaxRates = async (req, res) => {
    try {
        if (req && req.params) {
            let id = req.params.id
            let results = await tax_service.deleteTaxById(id)
            if (results === null) {
                return res.status(404).json({
                    status: "error",
                    message: "tax_rate not found "
                })
            }
            return res.status(200).json(results)
        }
    } catch (error) {
        return res.status(200).json({
            status: "error",
            message: error.message
        })
    }
}
module.exports = { insertTaxRates, fetchTaxRates, taxByid,removeTaxRates }
