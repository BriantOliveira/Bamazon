var mysql = require('mysql'); 
var prompt = require('prompt'); 
var inquirer = require('inquirer');


// starting database connection 

var connectionCommence = mysql.createConnection({
			host: "localhost", 
			port: 3306, 
			user: "root",
			password:"root",
			database:"Bmazon"

});  

// checking if the database is activated 

connectionCommence.connect(function(err) {
	if (err) {
		console.log(err); 
		return; 
	}
		console.log('Connection to Bamazon...Chack!');
}); 

connectionCommence.query('SELECT * from Products', function(err, rows){
	// print product 
	for (var i = 0; i < rows.length; i++) {
		console.log(rows[i].itemID + "\t" + rows[i].productName + "\t\t" + rows[i].price); 
		rows[i]
	}
	//callingback the userInput 
}); 

	//prompt question to the user 

inquirer.prompt([
{
	name: "id", 
	type: "input", 
	message: "Product ID for the item you would like to buy:", 
	validate: function(value) {
		// validation for answer not a number
		if (isNaN(value) === false) {
			return true; 		}
			} else {
				console.log("\nNot aa valid ID, provide the product ID for idem you'd like to purchase: ");
				return false;
			}
	}
}, 
{
	name: "quantity"
	type: "input"
	message: "How many do you ant to buy?:",
	validate: function(value){
		//validadtion 
		if (isNaN(value) === false){
			return true; 
		} else {
			console.log("\n Please enter a correct quantity:"); 
			return false; 
		}
	}
}
]).then(function(answer){
	//query
	connectionCommence.query("SELECT * FROM Products WHERE?", [{itemID: answer.id}], function(err, data){
		if (err) throw err; 
		if (data[0].stockQuantity < answer.quantity) {
			console.log("Insufficient Quantity \n");
			console.log("Please pick another ID or try lower quantity \n");

			userInputBuy();
		} else {
			var newQuantity = data[0].stockQuantity - answer.quantity;
			var totalCost = data[0].price * answer.id;
			connectionCommence.query('UPDATE products SET stockQuantity = ? WHERE itemID = ?', [newQuantity, answer.id], function(err, results){
				if (err) {
					throw err; 
				} else
					console.log('new quantity:' + newQuantity);
					connectionCommence.end();
			}
		});
	
