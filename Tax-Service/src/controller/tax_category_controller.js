const tax_category_service = require("../services/tax_category_services")


const insertTaxCategory = async (req, res) => {
  try {
    if (req && req.body && req.body.name) {
      let results = await tax_category_service.createTaxCategory(req.body.name, req.body.description)
      return res.status(200).json({
        status: "success",
        data: results
      })

    }
    else {
      return res.status(400).json({
        status: "error",
        message: "bad request"
      })
    }
  } catch (error) {

  }
}



const editTaxCategory = async (req, res) => {
  try {
    if (req && req.body && req.params.id && (req.body.name || req.body.descritpion)) {
      let results = await tax_category_service.updateTaxCategory(req.params.id, req.body.name, req.body.descritpion)
     if(results == null){
      res.status(404).json({
        status: "error",
        message: "data not foundc"
      })
     }
     
      res.status(200).json({
        status: "success",
        data: results
      })
    } else {
      return res.status(400).json({
        status: "error",
        message: "bad request"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}


const getAllTaxCategory = async (req, res) => {
  try {
    let limit = req.query.limit
    let offset = req.query.offset
    let sort = req.query.sort
    let sort_type = req.query.sort_type
    let search = req.query.search
    let results = await tax_category_service.getTaxCategory(limit, offset, sort, sort_type, search)
  
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({
      "status": "error",
      "message": error.message
    })
  }
}



const getTaxCategById = async (req,res)=>{
  try{
    if(req && req.params.id){
    let results = await tax_category_service.getTaxCategoryById(req.params.id)
    return res.status(200).json({
      "status": "success",
      data : results
    })
  }
  }catch(error){
    res.status(500).json({
      status : "success",
      message : error.message
    })
  }
}

module.exports = { insertTaxCategory, editTaxCategory, getAllTaxCategory ,getTaxCategById}
