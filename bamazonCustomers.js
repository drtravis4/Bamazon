var mysql = require("mysql");

require("console.table");

var inquirer = require("inquirer");
var totalPurchases = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "bamazon_db"
});

connection.connect(function(error) {
  if (error) {
    console.log(error);
  }
  console.log("connection id" + connection.threadId);
  displayProducts();
});
function displayProducts() {
  connection.query("select * from products", function(error, results) {
    console.table(results);

    inquirer
      .prompt([
        {
          type: "input",
          message: "please select an item number",
          name: "itemID"
        },
        {
          type: "input",
          message: "how many units to buy?",
          name: "quantity"
        }
      ])
      .then(function(userInput) {
        var statement = connection.query(
          "select * from ?? where ?? = ? ",
          ["products", "item_id", userInput.itemID],
          function(error, results) {
            console.table(results);

            var getQuantitydb = results[0].stock_quantity;
            var newquantity = getQuantitydb - userInput.quantity;

            if (newquantity >= 0) {
            
              totalPurchases =
                totalPurchases + userInput.quantity * results[0].price;
              console.log("total purchases: $" + totalPurchases.toFixed(2));
              connection.query(
                "update ?? set ?? = ? where ?? = ? ",
                [
                  "products",
                  "stock_quantity",
                  newquantity,
                  "item_id",
                  userInput.itemID
                ],
                function(error, results) {
                  displayProducts();
                }
              );
            } else {
              console.log("insufficent funds");
              displayProducts()
            }
          
          }
        );

        console.log(statement.sql);
      });
  });
}
