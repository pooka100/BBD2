module.exports = function(app,models,sequelize){

	Sequelize = require('sequelize')
	
	app.post("/api/query/query", showQuery);
	app.post("/api/checkExists", checkExists);
	app.post("/api/add/user", addUser);
	app.post("/api/gen1", generateBeers1);
	app.post("/api/gen2", generateBeers2);
	app.post("/api/gen3", generateBeers3);
	app.post("/api/gen4", generateBeers4);
	app.post("/api/gen5", generateBeers5);

	function showQuery(req, res){
		var query = req.body
		console.log(query);
		console.log(query["Query"]);
		sequelize.query(query["Query"], {type: sequelize.QueryTypes.SELECT}).then(query =>{
			return query;
		}).then(
			function(query){
				res.json(query);
			},
			function(error){
				res.status(500).send({error: error.toString()});
			}
		)

	}
	
	function checkExists(req,res){
		var person = req.body;
		console.log(person);
		var name = person["First_name"];
		var credit = person["_Number"];
		console.log(name);
		console.log(credit);
		
		var BarSchemaProject = sequelize.query(
			"SELECT * FROM Drinkers, Cards WHERE Drinkers.First_name = '" + name + "' AND Cards._Number = '" + credit + "' AND Drinkers.User_ID = Cards.User_ID"
		, { type: sequelize.QueryTypes.SELECT}).then(Bars => {
			return Bars;
		});
		BarSchemaProject
				.then(
					function(Bars){
						res.json(Bars);
						
					},
					function(error){
						res.status(500).send({error: error.toString()});
					}
				);

	}

	function addUser(req,res){
		var usrData = req.body;
		var First_name = usrData["First_name"];
		var City = usrData["City"];
		var Address = usrData["Address"];
		var Phone = usrData["Phone"];
		var _Number = usrData["_Number"];
		
		var query = "SELECT * FROM Drinkers";

		var query =
		 "INSERT INTO Drinkers(First_name, City, Address, Phone) VALUES ('" + First_name + "','" + City + "','" + Address + "','" + Phone + "')";
		sequelize.query(query, {type: sequelize.QueryTypes.INSERT })
		.then(query =>{
			var User_ID = query[0];
			query = "INSERT INTO Cards(_Number, _Type, User_ID) VALUES ('" + _Number + "','0','" + User_ID + "')";
			sequelize.query(query, {type: sequelize.QueryTypes.INSERT})
			.then(query2 => {
				
				
				console.log(User_ID);
				var copyPersonFriend = Math.round((Math.random()*1000));
				var copyPersonDrinks = Math.round((Math.random()*1000));
				var copyPersonFrequents = Math.round((Math.random()*1000))

				query = "INSERT INTO Fbook_friends_with SELECT '" + User_ID + "' as User_ID_1, User_ID_2 FROM Fbook_friends_with WHERE Fbook_friends_with.User_ID_1 = '" + copyPersonFriend + "'";
				sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
				query = "INSERT INTO Drinks SELECT Rating, '" + User_ID + "' as User_ID, Beer_ID FROM Drinks WHERE Drinks.User_ID = '" + copyPersonDrinks + "'";
				sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
				query = "INSERT INTO Frequents SELECT '" + User_ID +"' as User_ID, Bar_License FROM Frequents WHERE Frequents.User_ID = '" + copyPersonFrequents + "'";
				sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
			})
			
		});
	}

	function generateBeers1(req, res){
		
		var userData = req.body;
		var Low_ABV = userData["Low_ABV"];
		var High_ABV = userData["High_ABV"];
		var Style1 = userData["Style1"];
		var Style2 = userData["Style2"];
		var Style3 = userData["Style3"];
		var Low_IBU = userData["Low_IBU"];
		var High_IBU = userData["High_IBU"];
		var Low_SRM = userData["Low_SRM"];
		var High_SRM = userData["High_SRM"];
		var Opinion = userData["Opinion"];
		var _Number = userData["_Number"];

		var query = "SELECT User_ID FROM Cards WHERE Cards._Number = '" + _Number +"' LIMIT 1"
		sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
		.then(usrID => {
			var userID = usrID["0"]["User_ID"];
			console.log("DID I GET THE User_ID?: " + usrID["0"]["User_ID"]);

			var query =	"SELECT Beers.Beer_ID, Beers._Name as BeerName, Beers.ABV, Beers.Rating, "
			+	"Beers.Image_location, Beers.Manu_License, Beers.Num_reviews, "
			+	"Manufacturer._Name as ManuName, Manufacturer.City, Manufacturer.Website, "
			+	"Manufacturer.Phone, Manufacturer.Priority "
			+	"FROM(SELECT Beer_ID , COUNT(Drinks.User_ID) as cnt FROM (SELECT f.User_ID_2 as User_ID FROM Fbook_friends_with as f "
			+	"WHERE f.User_ID_1 = '" + userID + "') as fNum, Drinks "
			+	"WHERE Drinks.User_ID = fNum.User_ID "
			+	"GROUP BY Beer_ID "
			+	"ORDER BY cnt DESC "
			+	"LIMIT 5) as toplist, Beers, Manufacturer "
			+	"WHERE toplist.Beer_ID = Beers.Beer_ID "
			+	"AND Manufacturer.Manu_License = Beers.Manu_License "
			+	"ORDER BY Beers.Rating DESC "
			+	"LIMIT 3"

			sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
			.then(tmp2 => {
				console.log("This is it...: " + tmp2.length)


				return tmp2;
			}).then(
				function(tmp2){
					res.json(tmp2);
				},
				function(error){

				}
			)

		})
		
	}
	function generateBeers2(req, res){
		console.log("BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANSAA");
		var userData = req.body;
		var Low_ABV = userData["Low_ABV"];
		var High_ABV = userData["High_ABV"];
		var Style1 = userData["Style1"];
		var Style2 = userData["Style2"];
		var Style3 = userData["Style3"];
		var Low_IBU = userData["Low_IBU"];
		var High_IBU = userData["High_IBU"];
		var Low_SRM = userData["Low_SRM"];
		var High_SRM = userData["High_SRM"];
		var Opinion = userData["Opinion"];
		var _Number = userData["_Number"];

		var query = "SELECT User_ID FROM Cards WHERE Cards._Number = '" + _Number +"' LIMIT 1"
		sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
		.then(usrID => {
			var userID = usrID["0"]["User_ID"];
			console.log("DID I GET THE User_ID?: " + usrID["0"]["User_ID"]);


			var query = "SELECT Beers.Beer_ID, Beers._Name as BeerName, Beers.ABV, Beers.Rating, "
			+	"Beers.Image_location, Beers.Manu_License, Beers.Num_reviews, "
			+	"Manufacturer._Name as ManuName, Manufacturer.City, Manufacturer.Website, "
			+	"Manufacturer.Phone, Manufacturer.Priority  FROM Beers, Manufacturer "
			+	"WHERE Beers.Beer_ID IN "
			+			"(SELECT Beer_ID FROM Has_style "
			+			"WHERE Has_style._Name IN "
			+				"(SELECT Style._Name FROM Style "
			+				"WHERE Style.Low_IBU >= '" + Low_IBU + "' "
			+				"AND Style.High_IBU <= '" + High_IBU + "' "
			+				"AND Style.Low_SRM >= '" + Low_SRM + "' "
			+				"AND Style.High_SRM <= '" + High_SRM + "')) "
			+	"AND Beers.Manu_License = Manufacturer.Manu_License "
			+	"AND Beers.Num_reviews >= '200' "
			+	"ORDER BY Beers.Rating DESC "
			+	"LIMIT 3";

			console.log("GOT HEREZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZzz");
			sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
			.then(tmp2 => {
				console.log("WHY DID I NOT GET HERE");
				console.log("This is it...: " + tmp2.length);


				return tmp2;
			}).then(
				function(tmp2){
					res.json(tmp2);
				},
				function(error){

				}
			)

		})
		
	}
	
	function generateBeers3(req, res){
		
		var userData = req.body;
		var Low_ABV = userData["Low_ABV"];
		var High_ABV = userData["High_ABV"];
		var Style1 = userData["Style1"];
		var Style2 = userData["Style2"];
		var Style3 = userData["Style3"];
		var Low_IBU = userData["Low_IBU"];
		var High_IBU = userData["High_IBU"];
		var Low_SRM = userData["Low_SRM"];
		var High_SRM = userData["High_SRM"];
		var Opinion = userData["Opinion"];
		var _Number = userData["_Number"];

		var query = "SELECT User_ID FROM Cards WHERE Cards._Number = '" + _Number +"' LIMIT 1"
		sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
		.then(usrID => {
			var userID = usrID["0"]["User_ID"];
			console.log("DID I GET THE User_ID?: " + usrID["0"]["User_ID"]);

			var query = "SELECT Beers.Beer_ID, Beers._Name as BeerName, Beers.ABV, Beers.Rating, "
			+	"Beers.Image_location, Beers.Manu_License, Beers.Num_reviews, "
			+	"Manufacturer._Name as ManuName, Manufacturer.City, Manufacturer.Website, "
			+	"Manufacturer.Phone, Manufacturer.Priority FROM Drinkers, Beers, Manufacturer "
			+	"WHERE Drinkers.User_ID = '" + userID + "' "
			+	"AND Beers.Manu_License = Manufacturer.Manu_License "
			+	"AND Drinkers.City != Manufacturer.City "
			+	"AND Beers.Num_reviews > '200' "
			+	"AND Beers.Rating < '4.7' "
			+	"AND Beers.Beer_ID NOT IN(SELECT Sells.Beer_ID FROM Bars, Sells "
			+							 "WHERE Bars.City = Drinkers.City "
			+							 "AND Sells.Bar_License = Bars.Bar_License) "
			+	"AND Beers.Beer_ID NOT IN(SELECT Drinks.Beer_ID FROM Drinks "
			+							 "WHERE Drinks.User_ID = Drinkers.User_ID) "
			+	"ORDER BY Beers.Rating DESC "
			+	"LIMIT 2"

			sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
			.then(tmp2 => {
				console.log("This is it...: " + tmp2.length)


				return tmp2;
			}).then(
				function(tmp2){
					res.json(tmp2);
				},
				function(error){

				}
			)

		})
		
	}
	function generateBeers4(req, res){
		
		var userData = req.body;
		var Low_ABV = userData["Low_ABV"];
		var High_ABV = userData["High_ABV"];
		var Style1 = userData["Style1"];
		var Style2 = userData["Style2"];
		var Style3 = userData["Style3"];
		var Low_IBU = userData["Low_IBU"];
		var High_IBU = userData["High_IBU"];
		var Low_SRM = userData["Low_SRM"];
		var High_SRM = userData["High_SRM"];
		var Opinion = userData["Opinion"];
		var _Number = userData["_Number"];

		var query = "SELECT User_ID FROM Cards WHERE Cards._Number = '" + _Number +"' LIMIT 1"
		sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
		.then(usrID => {
			var userID = usrID["0"]["User_ID"];
			console.log("DID I GET THE User_ID?: " + usrID["0"]["User_ID"]);

			var query = "SELECT Beers.Beer_ID, Beers._Name as BeerName, Beers.ABV, Beers.Rating, "
			+	"Beers.Image_location, Beers.Manu_License, Beers.Num_reviews, "
			+	"Manufacturer._Name as ManuName, Manufacturer.City, Manufacturer.Website, "
			+	"Manufacturer.Phone, Manufacturer.Priority FROM Beers, Manufacturer "
			+	"WHERE Manufacturer.Priority >= '8' "
			+	"AND Beers.Manu_License = Manufacturer.Manu_License "
			+	"AND Beers.ABV >= '0' "
			+	"AND Beers.Num_reviews > '100' "
			+	"LIMIT 2"
			
			sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
			.then(tmp2 => {
				console.log("This is it...: " + tmp2.length)


				return tmp2;
			}).then(
				function(tmp2){
					res.json(tmp2);
				},
				function(error){

				}
			)

		})
		
	}
	function generateBeers5(req, res){
		
		var userData = req.body;
		var Low_ABV = userData["Low_ABV"];
		var High_ABV = userData["High_ABV"];
		var Style1 = userData["Style1"];
		var Style2 = userData["Style2"];
		var Style3 = userData["Style3"];
		var Low_IBU = userData["Low_IBU"];
		var High_IBU = userData["High_IBU"];
		var Low_SRM = userData["Low_SRM"];
		var High_SRM = userData["High_SRM"];
		var Opinion = userData["Opinion"];
		var _Number = userData["_Number"];

		var query = "SELECT User_ID FROM Cards WHERE Cards._Number = '" + _Number +"' LIMIT 1"
		sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
		.then(usrID => {
			var userID = usrID["0"]["User_ID"];
			console.log("DID I GET THE User_ID?: " + usrID["0"]["User_ID"]);

			
			var query = "SELECT Beers.Beer_ID, Beers._Name as BeerName, Beers.ABV, Beers.Rating, "
			+	"Beers.Image_location, Beers.Manu_License, Beers.Num_reviews, "
			+	"Manufacturer._Name as ManuName, Manufacturer.City, Manufacturer.Website, "
			+	"Manufacturer.Phone, Manufacturer.Priority FROM (SELECT ROUND(RAND()*22137)as a) as a, "
			+	"(SELECT ROUND(RAND()*22137) as b) as b, Beers, Manufacturer "
			+	"WHERE Beers.Beer_ID = a.a "
			+	"OR Beers.Beer_ID = b.b "
			+	"AND Beers.Manu_License = Manufacturer.Manu_License "
			+	"LIMIT 2"
			sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
			.then(tmp2 => {
				console.log("This is it...: " + tmp2.length)


				return tmp2;
			}).then(
				function(tmp2){
					res.json(tmp2);
				},
				function(error){

				}
			)

		})
		
	}

};
