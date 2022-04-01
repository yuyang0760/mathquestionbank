const Sequelize = require('sequelize');
// const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('fenleitable', {
    fenleiid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fenlei1: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
    fenlei2: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
    fenlei3: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
    fenlei4: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
  }, {
    sequelize,
    paranoid: false,  // 软删除
    tableName: 'fenleitable',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fenleiid" },
        ]
      },
    ]
  });
};
