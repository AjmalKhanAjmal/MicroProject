const joi = require("joi")

let productSchema = joi.object({
    name: joi.string().min(3).required(),
    application_id: joi.number().required(),
    // price : joi.number().positive()
    price: joi.number().precision(2).required(),
    category_id: joi.number().optional(),
    status: joi.string().optional(),
    store_id: joi.number().optional(),
    service_type: joi.array().optional(),
    description: joi.string().optional()
})

module.exports = { productSchema }



/*
Here’s a concise list of the most commonly used Joi validation methods:

string() - Validates that the value is a string.

.min(length), .max(length), .email(), .valid(values), .pattern(regex), .required(), .optional()

number() - Validates that the value is a number.

.integer(), .positive(), .min(value), .max(value), .precision(digits), .required(), .optional()

boolean() - Validates that the value is a boolean (true or false).

.required(), .optional()

array() - Validates that the value is an array.

.items(joiType), .min(length), .max(length), .required(), .optional()

object() - Validates that the value is an object.

.keys(schema), .required(), .optional()

date() - Validates that the value is a valid date.

.iso(), .min(date), .max(date), .required(), .optional()

valid() - Validates that the value matches one of the specified values.

.valid(value1, value2, ...)

email() - Validates that the value is a valid email address.

.required(), .optional()

min() - Specifies a minimum value for a string, number, or array.

.min(value)

max() - Specifies a maximum value for a string, number, or array.

.max(value)

pattern() - Validates that the value matches a regex pattern.

.pattern(regex)

when() - Conditional validation based on another field's value.

.when('field', { is: value, then: joiSchema })

optional() - Specifies that the field is optional (can be undefined or missing).

.optional()

default() - Sets a default value if the field is not provided.

.default(value)

empty() - Allows a value to be empty (for strings or arrays).

.empty(value) (e.g., .empty(''))

any() - Accepts any value type.

.any()
 */