var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "localhost123",
    database: "Bamazon"
});

connection.connect();

var questions = [{
    type: "list",
    name: "view",
    message: "Please select..",
    choices: ["View Products", "Add inventory", "Add new product", "Add new products"]
}];

var viewInventory = function(){
    connection.query("SELECT * FROM products WHERE stock_quantity <= 10", function(err, data) {
        if (err) throw err;
        console.log(data);
        // data.map(function(el) {
        //     console.log("Item ID: " + el.item_id + "|| Product Name " + el.product_name + "|| Price$ " + el.price);
        // })
    })
}

 inquirer.prompt(questions)
                .then(function(data) {
                   switch(data.view){
                    case "View Products"
                    break;
                     case "Add inventory"
                    break;
                     case "View low inventory"
                    break;
                     case "Add new products"
                    break;

                    default:
                        return "You messed up darn";
                   }
                })
                .then(function(data) {
                    console.log(data);

                })
                .catch(function(data) {

                    console.log(err);

                });
            }
