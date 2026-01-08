const { mongoose, Schema } = require("mongoose")
// const { mongoose, Schema } = require("mongoose"
try{
    
let practice_table_schema = new Schema({
    name: {
        type: String,
        required: false
    },
    details: {
        type: Object,
        required: false
    },
    ids :{
        type : [Number],
        required : false
    }//ype: mongoose.Schema.Types.Mixed,  it can store string, array, object


}, {
    timestamps: true
})


var practice_table = mongoose.model('practice_table',practice_table_schema)


}catch(error){
    console.log("error while creating object ", error.message );
    
    throw error
}

module.exports = { practice_table}