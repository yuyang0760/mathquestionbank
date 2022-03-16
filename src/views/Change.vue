<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button @click="chaXunTimu(chaXunID)">查询题目</el-button>
        <el-input-number v-model="chaXunID" :min="1" label="题库ID"></el-input-number>

        <el-button @click="saveTitle()">保存</el-button>
        <yytitledescription_change v-bind="formData" :isShowMini="true"></yytitledescription_change>

        <el-image :src="timupicfilePath_computed" fit="fill"></el-image>
        <!-- {{timupicfilePath_computed}} -->
      </el-col>
      <el-col :span="12">

        <div style="display:inline;">
          来源: <el-input v-model="formData.laiyuan" placeholder="请输入来源:" style="width:40%;" class="elitem"></el-input>
          <el-rate v-model="formData.nandu" show-text :max="6"></el-rate>
        </div>
        <div style="display:inline;">
          <el-input style="width:480px;margin:2px 2px 2px 20px;" v-model="input_添加分类" placeholder="请输入分类"></el-input>
          <el-button @click="bt_添加分类()">添加分类</el-button>
        </div>
        <div>

        <div style="display:inline;">
          <el-input style="width:480px;margin:2px 2px 2px 20px;" v-model="input_添加标签" placeholder="请输入标签"></el-input>
          <el-button @click="bt_添加标签()">添加标签</el-button>
        </div>
          <!-- <div>快速添加标签:</div> -->
          <div style="margin:0px 0px 0px 20px;">
            <el-button type="primary" round size="small" @click="快速添加标签(tag.value)" :key="index"
              v-for="(tag,index) in biaoqianOptions">
              {{tag.value}}
            </el-button>
          </div>
        </div>
        <div style="margin:5px 5px 20px 10px;">
          <el-button type="success" @click="saveTitleandNextTitle()">保存并下一题</el-button>
          <el-button @click="chaXunTimu(chaXunID+1)">下一题</el-button>
          <el-button @click="chaXunTimu(chaXunID-1)">上一题</el-button>
        </div>
        <el-cascader-panel class="el-cascader-panel" :options="fenleiOptions" v-model="formData.fenlei" @change="fenleiHandleChange">
        </el-cascader-panel>
        <!-- </el-drawer> -->
      </el-col>
    </el-row>

  </div>
</template>

<script>
import _ from 'lodash'  // lodash工具库
import Vue from 'vue'
import yytitledescription_change from '../components/yytitledescription_change.vue'
import { titlesCopy } from '../tools/mytools'
import { clipboard } from 'electron';
import fs from 'fs';
import config from '/extraResources/config.json'
import miment from 'miment'
import { title } from 'process'
export default {
  name: "Change",
  components: {
    yytitledescription_change,
  },
  data() {
    return {
      chaXunID: 1,
      titles: null,  // 题目类 ,数据库查询用
      input_添加标签: "",         // 添加标签
      input_添加分类: "",         // 添加分类
      biaoqianOptions: [],
      fenleiSelectIsShow: false,
      fenleiOptions: null,   // 题目分类json数据,导数->切线 等等
      tag: {                        // 标签
        inputVisible: false,
        inputValue: ''
      },
      formData: {
        id: null,
        timu: '',
        leixing: '选择题',
        daan1: '',
        daan2: '',
        jiexi: '',
        nandu: 3,
        laiyuan: '',
        xuanxiang: ['', '', '', ''],
        biaoqian: [],   // 标签
        fenlei: [],        // 分类 和数据库中的fenlei1,fenlei2,fenlei3,fenlei4同步
        timupicfilename: '',
        daan2picfilename: '',
        jiexipicfilename: ''

      },
    }
  },
  computed: {
    // 当前
    timupicfilePath_computed() {
      // `this` 指向 vm 实例
      return config.imagesPath + '/' + this.formData.timupicfilename + '.jpg';
    }
  },
  methods: {
    // 保存并下一题
    saveTitleandNextTitle() {
      this.saveTitle();
      this.chaXunTimu(this.chaXunID + 1);
    },
    // 保存题目
    async saveTitle() {
      // 修改id=xxx的数据库的值
      // console.log("我要修改了", this.formData.daan1);
      await this.titles.update(this.formData, {
        where: {
          id: this.formData.id
        }
      });
    },
    // 查询题目
    async chaXunTimu(chaXunID) {

      console.log("你点击了查询题目", chaXunID)
      // 根据ID查询题目
      var titles = await this.titles.findAll({
        where: {
          id: chaXunID
        }
      });
      console.log(titles, 123)
      if (titles.length > 0) {
        this.formData = titlesCopy(this.formData, titles)[0];
        // this.formData=titles;
        console.log(this.formData, 456)
        this.chaXunID = chaXunID;
      }
    },
    // 分类改变
    fenleiHandleChange(fenlei) {
      // console.log(fenlei);
      this.input_添加分类 = fenlei.join('▲');
    },
    bt_添加分类() {
      // 读取文件
      var filepath = config.fenleiPath;
      const fenleiJsonFile = fs.readFileSync(filepath);
      const fenleiJsonFileObj = JSON.parse(fenleiJsonFile);
      console.log("分类", fenleiJsonFileObj);
      var _fenlei = this.input_添加分类.split('▲');
      var fenleiIndex0;
      var fenleiIndex1;
      var fenleiIndex2;
      var fenleiIndex3;
      if (_fenlei[0]) {
        fenleiIndex0 = _.findKey(fenleiJsonFileObj, { 'value': _fenlei[0] });
        if (fenleiIndex0 == undefined) {
          fenleiJsonFileObj.push({ 'value': _fenlei[0], 'label': _fenlei[0] });
          fenleiIndex0 = fenleiIndex0 == undefined ? fenleiJsonFileObj.length - 1 : fenleiIndex0;
        }
        // console.log("fenleiIndex0:", fenleiIndex0);
        // console.log("分类", fenleiJsonFileObj);
      }
      if (_fenlei[1]) {
        if (fenleiJsonFileObj[fenleiIndex0]['children'] == undefined) {
          // 如果没有children,就创建一个
          fenleiJsonFileObj[fenleiIndex0]['children'] = [];
          fenleiIndex1 = 0;
          fenleiJsonFileObj[fenleiIndex0]['children'].push({ 'value': _fenlei[1], 'label': _fenlei[1] });
        } else {
          fenleiIndex1 = _.findKey(fenleiJsonFileObj[fenleiIndex0]['children'], { 'value': _fenlei[1] });
          if (fenleiIndex1 == undefined) {
            fenleiJsonFileObj[fenleiIndex0]['children'].push({ 'value': _fenlei[1], 'label': _fenlei[1] });
            fenleiIndex1 = fenleiIndex1 == undefined ? fenleiJsonFileObj[fenleiIndex0]['children'].length - 1 : fenleiIndex1;
          }
        }
        // console.log("fenleiIndex1:", fenleiIndex1);
        // console.log("分类", fenleiJsonFileObj);
      }
      if (_fenlei[2]) {
        if (fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'] == undefined) {
          // 如果没有children,就创建一个
          fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'] = [];
          fenleiIndex2 = 0;
          fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'].push({ 'value': _fenlei[2], 'label': _fenlei[2] });
        } else {
          fenleiIndex2 = _.findKey(fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'], { 'value': _fenlei[2] });
          if (fenleiIndex2 == undefined) {
            fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'].push({ 'value': _fenlei[2], 'label': _fenlei[2] });
            fenleiIndex2 = fenleiIndex2 == undefined ? fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'].length - 1 : fenleiIndex2;
          }
        }
        // console.log("fenleiIndex2:", fenleiIndex2);
        // console.log("分类", fenleiJsonFileObj);
      }
      if (_fenlei[3]) {
        if (fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'][fenleiIndex2]['children'] == undefined) {
          // 如果没有children,就创建一个
          fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'][fenleiIndex2]['children'] = [];
          fenleiIndex3 = 0;
          fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'][fenleiIndex2]['children'].push({ 'value': _fenlei[3], 'label': _fenlei[3] });
        } else {
          fenleiIndex3 = _.findKey(fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'][fenleiIndex2]['children'], { 'value': _fenlei[3] });
          if (fenleiIndex3 == undefined) {
            fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'][fenleiIndex2]['children'].push({ 'value': _fenlei[3], 'label': _fenlei[3] });
            fenleiIndex3 = fenleiIndex3 == undefined ? fenleiJsonFileObj[fenleiIndex0]['children'][fenleiIndex1]['children'][fenleiIndex2]['children'].length - 1 : fenleiIndex3;
          }
        }
        // console.log("fenleiIndex3:", fenleiIndex3);
        // console.log("分类", fenleiJsonFileObj);
      }
      // 写入文件
      fs.writeFileSync(filepath, JSON.stringify(fenleiJsonFileObj, null, 2));
      // console.log('写入成功！')
      this.fenleiOptions = fenleiJsonFileObj;
    },
    // 在json文件中添加标签
    bt_添加标签() {
      const fenleiJsonFile = fs.readFileSync(config.biaoqianPath);
      const fenleiJsonFileObj = JSON.parse(fenleiJsonFile);

      var fenleiIndex0 = _.findKey(fenleiJsonFileObj, { 'value': this.input_添加标签 });

      if (fenleiIndex0 == undefined) {
        // 如果没找到就添加标签
        fenleiJsonFileObj.push({ 'value': this.input_添加标签 })
      }
      // 保存到文件
      fs.writeFileSync(config.biaoqianPath, JSON.stringify(fenleiJsonFileObj, null, 4));
      // console.log('写入成功！')
      this.biaoqianOptions = fenleiJsonFileObj;
    },
    快速添加标签(value) {
      console.log(value);
      // 不包含,就添加标签
      if (!(this.formData.biaoqian.includes(value))) {
        this.formData.biaoqian.push(value);
      }
    },
  },
  mounted() {
    console.log("change页面_About_mounted")
    // 开始就读取分类
    // 读取文件
    this.fenleiOptions = JSON.parse(fs.readFileSync(config.fenleiPath));
    this.biaoqianOptions = JSON.parse(fs.readFileSync(config.biaoqianPath));
    // 连接数据库
    const Sequelize = require("sequelize");
    const initModels = require("../tools/init-models").initModels;
    // const connect = new Sequelize({
    //   host: 'localhost',
    //   username: 'root',
    //   password: '123456',
    //   database: 'electron_math_db',
    //   dialect: 'mysql',
    //   dialectModule: require('mysql2'), // 重要,不然会出错
    //   benchmark: true
    // })
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: config.mathdbPath,
      // dialect
      dialectModule: require("sqlite3")
    });
    console.log("数据库已连接")
    this.connect = sequelize;
    this.titles = initModels(sequelize).titles;
  },
  destroyed() {
    // 断开数据库
    console.log("change页面_About_destroyed")
    // this.connect.close();
    // console.log("数据库已关闭")
  },
};
</script>
<style>
.hengxiangbuju {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.shuxiangbuju {
  display: flex;
  flex-direction: column;
  width: 49%;
  margin: 5px;
}
.image {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

.formitem {
  width: 100%;
}
el-dialog {
  width: 800px;
  height: 600px;
}
.elitem {
  margin-right: 10px;
}
/* .elform {
  flex-direction: row; row | row-reverse | column | column-reverse;
  flex-wrap: wrap; nowrap | wrap | wrap-reverse;
} */

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-cascader-menu__wrap {
  height: 300px;
}
.el-dialog__header {
  padding: 0px 0px 0px;
}
.el-breadcrumb__inner {
  font-weight: bold;
  color: #409eff;
}
.el-dialog__body {
  padding: 10px;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: bold;
  color: #409eff;
  cursor: text;
}
.el-breadcrumb-item1 {
  color: #ff5640;
}
/* 选择分类的高度 */
.el-cascader-menu__wrap {
  height: 200px;
}
.timuShowlabel {
  width: 60px;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
/* .timuShowcontent {
} */
</style>
