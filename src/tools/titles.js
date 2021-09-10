const Sequelize = require('sequelize');
const _ = require('lodash');
module.exports = function (sequelize, DataTypes) {
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
      allowNull: true,
      set(value) {
        if (value === null || value === undefined) {
          this.setDataValue('biaoqian', '');
        } else {
          this.setDataValue('biaoqian', value.join(','));
        }
      },
      get() {
        const rawValue = this.getDataValue('biaoqian');
        if (rawValue === null || rawValue === undefined || rawValue === '') {
          return [];
        } else {
          return rawValue.split(',');
        }
      }
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
    fenlei: {
      type: DataTypes.VIRTUAL,      // 自己创造出来的属性,类型用这个
      set(value) {
        // throw new Error('不要尝试设置 `fullName` 的值!');
        // console.log("fenleiset")
        this.fenlei1 = value[0] ? value[0] : '';
        this.fenlei2 = value[1] ? value[1] : '';
        this.fenlei3 = value[2] ? value[2] : '';
        this.fenlei4 = value[3] ? value[3] : '';
      },
      get() {
        // console.log("fenleiget")
        return _.compact([this.fenlei1, this.fenlei2, this.fenlei3, this.fenlei4]);
      }
    }
  }, {
    sequelize,
    paranoid: true,  // 软删除
    tableName: 'titles',
    timestamps: true,
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
