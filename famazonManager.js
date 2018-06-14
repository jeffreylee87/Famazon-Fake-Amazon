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
    console.log("You are connected to the Famazon Manager Terminal");
    // run the start function after the connection is made to prompt the user
    ask();
});

function ask(){
    inquirer.prompt([{
        type: "list",
        name: "command",
        message: "Manager Terminal Options: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Manager Terminal"]
    }, ]).then(function (user) {
        switch(user.command){
            case "View Products for Sale":
            viewProd();
            break;
            case "View Low Inventory":
            lowInventory();
            break;
            case "Add to Inventory":
            addInventory();
            break;
            case "Add New Product":
            addNewItem();
            break;
            case "Exit Manager Terminal":
            connection.end();
            break;
        }
    });
}

function viewProd() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n");
        for (var i in results) {
            console.log("ID " + results[i].item_id + ": " + results[i].product_name + ", Price: $" + results[i].price + ", Quantity: " + results[i].stock_quantity);
            console.log(`\n     ${results[i].image}\n`);
        }
        console.log("\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n");
        //ends connection, can change it to go to home screen
        ask();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function (err, results) {
        if (err) throw err;
        console.log("\n❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗");
        for (var i in results) {
            console.log("\n" + parseInt(i) + 1 + `. ${results[i].product_name} is low on inventory. Quantity: ` + results[i].stock_quantity);
            console.log(`\n${results[i].image}`);
        };
        console.log("\n❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗\n");
        ask();
    });
}

function addInventory() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([{
                    name: "command",
                    type: "list",
                    message: "Which item did you want to update?",
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
                    message: "How many units do you want to add to inventory? Please enter number",
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

                var updatedQ = parseInt(answer.units) + chosenItem.stock_quantity;

                //updates quanitity
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: updatedQ
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (error) {
                        //if error then it will report, if not then success message prompts
                        if (error) throw err;
                        console.log("\n🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆\n");
                        console.log("Successfully updated inventory for " + chosenItem.product_name + "!!!");
                        console.log("\nNew Inventory: " + updatedQ);
                        console.log("\n" + chosenItem.image);
                        console.log("\n🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆🔆\n");
                        //ends connection, can change it to go back to the home screen
                        ask();
                    }
                );
            });
    });
}

function addNewItem() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What product are you adding to the store?"
        },
        {
            type: "input",
            name: "department",
            message: "What department does the item belong to?"
        },
        {
            name: "price",
            type: "input",
            validate: function (value) {
                if (isNaN(value) === false && parseInt(value) > 0) {
                    return true;
                }
                return false;
            },
            message: "How much does the product cost? Please only enter numbers, no dollar sign",
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
            message: "How many units do you want to add to inventory? Please enter number",
        },
        {
            type: "input",
            name: "image",
            message: "Please feel free to add any one line ascii art representing the item",
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products (product_name, department_name, price, stock_quantity, image) VALUES (?, ?, ?, ?, ?)", [
                answer.name, answer.department, answer.price, answer.units, answer.image
            ],
            function (err) {
                //if error then it will report, if not then success message prompts
                if (err) throw err;
                console.log("\n🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕\n");
                console.log("Successfully added item " + answer.name + "!!!");
                console.log("\nPrice: $" + answer.price);
                console.log("\nInventory: " + answer.units);
                console.log("\n" + answer.image);
                console.log("\n🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕🆕\n");
                //goes back to home screen to do more work
                ask();
            }
        )
    });
}