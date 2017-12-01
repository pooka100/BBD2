module.exports = function(app, models, sequelize){

	require("./all/allHandling.js")(app, models.entityModels, sequelize)
    
}
