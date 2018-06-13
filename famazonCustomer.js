var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "famazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("You are connected to the Famazon Store");
  // run the start function after the connection is made to prompt the user
  famazonPage();
});

function famazonPage() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    // once you have the items, prompt the user for which they'd like to bid on
    inquirer.prompt([{
          name: "command",
          type: "list",
          message: "Which item would you like to purchase?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {

              choiceArray.push(results[i].product_name);

            }
            return choiceArray;

          },

        },
        {
          name: "units",
          type: "input",
          validate: function (value) {
            if (isNaN(value) === false && parseInt(value) > 0) {
              return true;
            }
            return false;
          },
          message: "How many units do you want? Please enter number",
        }
      ])
      .then(function (answer) {


        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.command) {
            chosenItem = results[i];
          }
        }

        // determine if quantity was enough

        if (chosenItem.stock_quantity > parseInt(answer.units)) {
          // quantity was enough, so update db, let the user know, and start over
          //runs the math to get updated quantity
          var mathProb = chosenItem.stock_quantity - parseInt(answer.units);
          var receipt = parseInt(answer.units) * chosenItem.price;

          //updates quanitity
          connection.query(
            "UPDATE products SET ? WHERE ?", [{
                stock_quantity: mathProb
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("\n[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]\n");
              console.log("Purchased Successfully!");
              console.log("Your are now the proud owner of a " + chosenItem.product_name + "\n\n" + chosenItem.image + "\n\n");
              console.log("Total: $" + receipt);
              console.log("\n[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅][̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]\n");
              connection.end();

            }
          );
        } else {
          // bid wasn't high enough, so apologize and start over
          console.log("Not enough quantities try again");
          famazonPage();
        }
      });
  });
}