const { mongoose, Schema } = require("mongoose")

const product_schema = new Schema({
    product__name: {
        type: String,
        required: true,
        index: true
    },
    product__descritpion: {
        type: String,
        required: false
    },
    product__category_id: {
        type: Number,
        required: false
    }
    ,
    product__tax_category_id: {
        type: Number,
        required: false
    },
    // product__price: {
    //     type: Schema.Types.Decimal128,
    //     required: false
    // },
    product__price: {
        type: Number,
        required: false
    },
    product__status: {
        type: String,
        required: false
    },
    product__store_id: {
        type: Number,
        required: false
    },
    products__service_type: {
        type: [String], // Array of strings (e.g., tags or keywords),//[mongoose.Schema.Types.Mixed]
        required: false
    },
    application_id: {
        type: Number,
        required: false
    },
    product__id: {
        type: Number,
        required: false
    },
    variant__id: {
        type: Number,
        required: false
    }
},
    {
        timestamps: true

    })


// searchPostSchema.index({ content: "text" });
// product_schema.index({ product__name: 'text' });
const Product = mongoose.model("products", product_schema)

module.exports = { Product }












