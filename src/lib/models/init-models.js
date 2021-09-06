var DataTypes = require("sequelize").DataTypes;
var _titles = require("./titles");

function initModels(sequelize) {
  var titles = _titles(sequelize, DataTypes);

  return {
    titles, //表就是题目,改个名字
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
