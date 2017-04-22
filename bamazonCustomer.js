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

//customers questions
var questions = [{
    type: "input",
    name: "id",
    message: "What is the ID of product?"
}, {
    type: "input",
    name: "product",
    message: "WHow many would you like to buy?"
}];

var collection;
// Displays tabel content
var showProduct = function() {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;

         collection = data;

        data.map(function(el) {
            console.log("Item ID: " + el.item_id + "|| Product Name: " + el.product_name + "|| Price$ " + el.price);
        })
    })
}

showProduct();
// Alters table content and diplay result in console
var updateInventory = function(quantity,id) {
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?; ",
            [ quantity, id], 
            function(err, data) {
                if (err) throw err;
            });
        }

        setTimeout(function() {

            inquirer.prompt(customer.customerQuestions())
                .then(function(data) {
                    var msg = {};

                    collection.map(function(val) {

                        if (Number(data.id) === val.item_id) {

                            if (Number(data.product) > val.stock_quantity) {
                                msg.result = "Insufficient quantity";
                            } else {
                                msg.price = val.price * Number(data.product);
                                msg.remaining = val.stock_quantity - Number(data.product);
                                updateInventory(msg.remaining, data.id);
                            }
                        }
                    });

                    return msg;
                })
                .then(function(data) {
                    console.log(data);

                })
                .catch(function(err) {

                    console.log(err);

                });

        }, 1000);
 