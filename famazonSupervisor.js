var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

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

function ask() {
    inquirer.prompt([{
        type: "list",
        name: "command",
        message: "Supervisor Terminal Options: ",
        choices: ["View Product Sales by Department", "Create New Department", "Exit Supervisor Terminal"]
    }, ]).then(function (user) {
        if (user.command === "View Product Sales by Department") {
            viewSales();
        } else if(user.command === "Create New Department"){
            createDept();
        }else if(user.command === "Exit Supervisor Terminal"){
        connection.end();
        }
    });
};

function viewSales(){
    var sql = 
    "SELECT  departments.department_id, departments.department_name, SUM(products.product_sales) AS Total_Revenue ,departments.over_head_costs,  SUM(products.product_sales) - departments.over_head_costs AS Total_Profit FROM products RIGHT JOIN departments ON (products.department_name = departments.department_name) GROUP BY departments.department_id, departments.department_name ORDER BY departments.department_id";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        var table = new Table({
            chars: {
              'top': '═'
              , 'top-mid': '╤'
              , 'top-left': '╔'
              , 'top-right': '╗'
              , 'bottom': '═'
              , 'bottom-mid': '╧'
              , 'bottom-left': '╚'
              , 'bottom-right': '╝'
              , 'left': '║'
              , 'left-mid': '╟'
              , 'right': '║'
              , 'right-mid': '╢'
            },
            head: ["Department ID", "Department Name", "Total Revenue", "Over Head Cost", "Total Profit"],
            style: {
              border: [],
              
            }
          });
    for (var i in results){
        table.push([results[i].department_id, results[i].department_name, results[i].Total_Revenue, results[i].over_head_costs, results[i].Total_Profit],);
        
    }
    console.log(table.toString());   
    
    ask();
    });
}

function createDept(){
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What department would you like to create a row for?"
    },
    {
        name: "overhead",
        type: "input",
        validate: function (value) {
            if (isNaN(value) === false && parseInt(value) > 0) {
                return true;
            }
            return false;
        },
        message: "What is the total overhead for this department?",
    },
    ]).then(function (ans) {
        connection.query(
            "INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)", [
                ans.department, ans.overhead
            ],
            function (err) {
                //if error then it will report, if not then success message prompts
                if (err) throw err;
                console.log("\n🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷\n");
                console.log("Successfully created " + ans.department + " deparment!!!");
                console.log("\nTotal Overhead: $"+ ans.overhead);
                console.log("\n🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷🇰🇷\n");
                //goes back to home screen to do more work
                ask();
            }
        )
    });

}