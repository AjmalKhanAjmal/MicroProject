const mongoose = require("mongoose")
const argon2 = require('argon2')
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    }, password: {
        type: String,
        required: false,
    }
})



userSchema.pre("save", async function () { // async function (next) { 
    if (this.isModified("password")) {
        try {
            this.password = await argon2.hash(this.password);
        } catch (error) {
            // return next(error);
            throw error
        }
    }
});

userSchema.methods.comparePassword = async function (compare_password) {  // documentation is below
    try {
        return await argon2.verify(this.password, compare_password)
    } catch (error) {
        throw error
    }
}
// Create a model using the schema
const User = mongoose.model('User', userSchema);


module.exports = { User }




//Example object

// {
//   "_id": "60d5f7bc4f1a4b4c5c3a5e4d",
//   "email": "user@example.com",
//   "password": "$argon2i$...",
//   "__v": 0,  // Mongoose version key
//   "comparePassword": [Function: comparePassword]  // Instance method added to the user document
// }



// Here's a concise definition you can use to explain **`userSchema.methods`** in an interview:

// ---

// **"In Mongoose, `userSchema.methods` is an object where we define custom **instance methods** for a schema. These methods are attached to individual documents (or instances) created from the model. This means that the method can be called on a specific document, and it has access to the document’s data (like fields such as `email` and `password`). For example, we can define a `comparePassword` method that compares a given password with the stored hashed password on the instance."**

// ---

// You can also follow up with a simple example:

// **"For instance, if we have a `User` model with a `comparePassword` method, it would be available on each `User` document, and you could call it like this: `user.comparePassword('inputPassword')`, where `user` is an instance of the model."**

// ---

// This explanation is simple and focuses on the core idea: **instance methods** attached to each **individual document** in a Mongoose model.
