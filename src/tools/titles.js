const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('titles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timu: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
      // set是往数据库添加内容
      set(value) {
        if (value === null || value === undefined) {
          this.setDataValue('timu', '');
        } else {
          // 去掉 /n
          this.setDataValue('timu', value.replace(/\n/g, ''));
        }
      },
      // get是从数据库获取内容
      get() {
        const rawValue = this.getDataValue('timu');
        // 从数据库获取内容,加上'/n'
        if (rawValue === null || rawValue === undefined || rawValue === '') {
          return ''
        } else {
          return rawValue.replace(/\$\\\\\$/g, '$\\\\$ \n').replace(/ {2,}/g, ' ')
        }
      }
    },
    leixing: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "选择题"
    },
    daan1: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    daan2: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
      // set是往数据库添加内容
      set(value) {
        if (value === null || value === undefined) {
          this.setDataValue('daan2', '');
        } else {
          // 去掉 /n
          this.setDataValue('daan2', value.replace(/\n/g, ''));
        }
      },
      // get是从数据库获取内容
      get() {
        const rawValue = this.getDataValue('daan2');
        // 从数据库获取内容,加上'/n'
        if (rawValue === null || rawValue === undefined || rawValue === '') {
          return ''
        } else {
          return rawValue.replace(/\$\\\\\$/g, '$\\\\$ \n').replace(/ {2,}/g, ' ')
        }
      }
    },
    jiexi: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
      // set是往数据库添加内容
      set(value) {
        if (value === null || value === undefined) {
          this.setDataValue('jiexi', '');
        } else {
          // 去掉 /n
          this.setDataValue('jiexi', value.replace(/\n/g, ''));
        }
      },
      // get是从数据库获取内容
      get() {
        const rawValue = this.getDataValue('jiexi');
        // 从数据库获取内容,加上'/n'
        if (rawValue === null || rawValue === undefined || rawValue === '') {
          return ''
        } else {
          return rawValue.replace(/\$\\\\\$/g, '$\\\\$ \n').replace(/ {2,}/g, ' ')
        }
      }
    },
    nandu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    laiyuan: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    beizhu: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    xuanxiang: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
      set(value) {
        if (value === null || value === undefined) {
          this.setDataValue('xuanxiang', '');
        } else {
          this.setDataValue('xuanxiang', value.join('★'));
        }
      },
      get() {
        const rawValue = this.getDataValue('xuanxiang');
        if (rawValue === null || rawValue === undefined || rawValue === '') {
          return [];
        } else {
          return rawValue.split('★');
        }
      }
    },
    biaoqian: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
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
    timupicfilename: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    daan2picfilename: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    jiexipicfilename: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    fenlei1: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    fenlei2: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    fenlei3: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    fenlei4: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
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
