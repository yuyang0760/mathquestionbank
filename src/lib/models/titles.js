const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('titles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    timu: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    leixing: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    daan1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    daan2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jiexi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nandu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    laiyuan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    xuanxiang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    biaoqian: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fenlei1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fenlei2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fenlei3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fenlei4: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tianjiashijian: {
      type: DataTypes.DATE,
      allowNull: true
    },
    xiugaishijian: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'titles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
