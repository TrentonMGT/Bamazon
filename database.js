console.log("Hello Customer")

class Customer {
    constructor() {}
    customerQuestions(){
        var questions = [{
            type: "input",
            name: "id",
            message: "What is the ID of product?"
        }, {
            type: "input",
            name: "product",
            message: "WHow many would you like to buy?"
        }];
    }

    showProduct() {
        connection.query("SELECT * FROM products", function(err, data) {
            if (err) throw err;

            var collection = data;

            data.map(function(el) {
                console.log("Item ID: " + el.item_id + "|| Product Name: " + el.product_name + "|| Price$ " + el.price);
            })
        })
    }

    updateInventory(quantity, id) {
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?; ", [quantity, id],
            function(err, data) {
                if (err) throw err;
            });
    }
};

module.exports = Customer;
