module.exports = function(app, sequelize) {

    var models = "hi"

    require("./services/services.server.js")(app, models, sequelize);
    
}
