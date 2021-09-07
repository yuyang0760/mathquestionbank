var DataTypes = require("sequelize").DataTypes;
var _titles = require("./titles");

function initModels(sequelize) {
  var titles = _titles(sequelize, DataTypes);

  return {
    titles, //表就是题目,改个名字
  };
}
// 创建titles表格
async function createTable(sequelize){
  var titles = _titles(sequelize, DataTypes);
  await titles.sync({ alter: true  })
}


module.exports.initModels = initModels;

module.exports.createTable = createTable;