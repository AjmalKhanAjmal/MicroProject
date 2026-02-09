const fs = require("fs")
const path = require("path")
const Handlebars = require("handlebars");

let data= {
    "customerName":"john",
    "brandName":"AMPN",
    "orderNumber":"398493klm",
    "total":89
}

const template_render = (template_name, data) => {
    try {
        console.log("__dirname", __dirname);

        const file_path = path.join(__dirname, `${template_name}.hbs`)
        // const source = fs.readFileSync(file_path)
        const source = fs.readFileSync(file_path, "utf8");

        const template = Handlebars.compile(source);
        let htmll = template(data);
        console.log("htmll", htmll);
    } catch (error) {
        console.log("error", error.message);

    }

}
template_render('order-created',data)