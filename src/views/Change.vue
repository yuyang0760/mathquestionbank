<template>
  <div>
    <el-row>
      <el-col :span="13">

        <yytitledescription_change v-bind="formData" :isShowMini="true">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="isShowBianji=!isShowBianji"></el-button>
          <!-- 一般不删除题目,都是修改 -->
          <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTimu(chaXunID)"></el-button> -->

        </yytitledescription_change>
      </el-col>
      <el-col :span="11">

        <div>
          <el-button @click="chaXunTimu(chaXunID)">查询题目ID</el-button>
          <el-input-number v-model="chaXunID" :min="1" label="题库ID"></el-input-number>
          <!-- {{this.biaoqianOptions}} -->
          <el-button @click="saveTitle()">保存</el-button>
          <el-rate v-model="formData.nandu" show-text :max="6" style="display:inline;"></el-rate>
        </div>
        <div style="display:inline;">
          <el-input style="width:300px;margin:2px 2px 2px 20px;" v-model="input_添加分类" placeholder="请输入分类"></el-input>
          <el-button @click="bt_添加分类()">添加分类</el-button>
          <!-- <el-tooltip    content="把题目中的图片地址存到数据库图片字段中" hide-after='2500' placement="top-start"> -->
          <el-button @click="bt_添加题目图片()">添加题目中的图片</el-button>
          <!-- </el-tooltip> -->
        </div>
        <div>

          <div style="display:inline;">
            <el-input style="width:300px;margin:2px 2px 2px 20px;" v-model="input_添加标签" placeholder="请输入标签"></el-input>
            <el-button @click="bt_添加标签()">添加标签</el-button>
            <el-button @click="clearBiaoQian()">重置标签</el-button>
          </div>
          <!-- <div>快速添加标签:</div> -->
          <div style="margin:0px 0px 0px 10px;">
            <el-button style="margin:1px 0px 1px 2px;" type="primary" round size="small" @click="快速添加标签(tag.value)" :key="index"
              v-for="(tag,index) in biaoqianOptions[this.select_当前选中的分类[0]]">
              {{tag['value']}}
            </el-button>
          </div>
        </div>
        <div style="margin:5px 5px 20px 10px;">
          <el-button type="success" @click="saveTitleandNextTitle()">保存并下一题</el-button>
          <el-button @click="chaXunTimu(chaXunID+1)">下一题</el-button>
          <el-button @click="chaXunTimu(chaXunID-1)">上一题</el-button>
          <el-select v-model="formData.leixing" placeholder="请选择类型:">
            <el-option v-for="(item, index) in leixingOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div v-show="isShowBianji">
            <el-input v-model="formData.laiyuan" placeholder="请输入来源:"></el-input>
            <el-input v-model="formData.beizhu" type="textarea" placeholder="请输入备注:" :autosize="{minRows: 1}"></el-input>
            <el-input v-model="formData.timu" type="textarea" placeholder="请输入题目:" :autosize="{minRows: 4 }"></el-input>
            <el-input v-model="formData.daan2" type="textarea" placeholder="请输入答案2:" :autosize="{minRows: 4 }"></el-input>
            <el-input v-model="formData.daan1" type="text" placeholder="请输入答案1:" :autosize="{minRows: 1 }"></el-input>
            <el-input v-model="formData.jiexi" type="textarea" placeholder="请输入解析:" :autosize="{minRows: 1 }"> </el-input>
          </div>
        </div>
        <!-- <el-cascader-panel class="el-cascader-panel" :props="{ checkStrictly: true }" :options="fenleiOptions"
          v-model="formData.fenlei" @change="fenleiHandleChange">
        </el-cascader-panel> -->
        <yy-cascader height="400" :pcurrentSelectFenlei="select_当前选中的分类" v-if="fenleiOptions" :options="fenleiOptions"
          @change="fenleiHandleChange"></yy-cascader>
        <!-- </el-drawer> -->
      </el-col>
    </el-row>

  </div>
</template>

<script>
import _ from 'lodash'  // lodash工具库
import Vue from 'vue'
import yytitledescription_change from '../components/yytitledescription_change.vue'
import yyCascader from '../components/yyCascader.vue'
import { titlesCopy } from '../tools/mytools'
import { clipboard } from 'electron';
import fs from 'fs';
import config from '/extraResources/config.json'
import miment from 'miment'
const { Op } = require("sequelize");

export default {
  name: "Change",
  components: {
    yytitledescription_change,
    yyCascader,
  },
  data() {
    return {
      chaXunID: 1,
      titles: null,  // 题目类 ,数据库查询用
      isShowBianji: false,   // 是否显示编辑题目
      input_添加标签: "",         // 添加标签
      input_添加分类: "",         // 添加分类
      select_当前选中的分类: [],     // 当前选中的分类
      biaoqianOptions: [],
      fenleiSelectIsShow: false,
      fenleiOptions: null,   // 题目分类json数据,导数->切线 等等
      tag: {                        // 标签
        inputVisible: false,
        inputValue: ''
      },
      leixingOptions: [{
        "label": "选择题",
        "value": "选择题"
      }, {
        "label": "填空题",
        "value": "填空题"
      }, {
        "label": "解答题",
        "value": "解答题"
      }],
      formData: {
        id: null,
        timu: '',
        leixing: '选择题',
        daan1: '',
        daan2: '',
        jiexi: '',
        beizhu: '',
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
    // 删除题目 id是数据库id,index是显示数组的index
    deleteTimu() {

      this.$confirm(`确定删除这道题吗 ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {

          // 删除数据库
          console.log(`删除id${this.chaXunID}的题目`);
          await this.titles.destroy({
            where: {
              id: this.chaXunID
            }
          });
          // 删除数组 TimuList
          this.TimuList.splice(0, 1);
        })
        .catch(() => { })
    },
    // 重填标签
    clearBiaoQian() {
      // 修改id=xxx的数据库的值
      // console.log("我要修改了", this.formData.daan1);
      this.formData.biaoqian = [];
    },
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
          id: { [Op.gte]: chaXunID }
        },
        limit: 1
      });
      // console.log(titles, "titles")
      if (titles.length > 0) {
        this.formData = titlesCopy(this.formData, titles)[0];
        // this.formData=titles;
        console.log(this.formData, "this.formData")
        this.chaXunID = this.formData.id;
        this.input_添加分类 = this.formData.fenlei.join('▲');
        // 更新当前选中的分类可以更新显示的标签
        this.select_当前选中的分类 = this.formData.fenlei;
      }
    },
    // 分类改变
    fenleiHandleChange(fenlei) {
      console.log("你点击了分类:", fenlei);
      this.input_添加分类 = fenlei.join('▲');
      this.select_当前选中的分类 = fenlei;
      this.formData.fenlei = fenlei;
    },
    // 分析题目中的图片,并添加到数据库
    bt_添加题目图片() {
      // 如果题目中存在图片,就提取出来
      if (this.formData.timu.includes('includegraphics')) {
        var pattern = /(?<=includegraphics{).*?(?=})/;
        const lintimupic = pattern.exec(this.formData.timu);
        // 添加到数据库
        this.formData.timupicfilename = lintimupic[0];
        console.log(this.formData.timupicfilename)
        this.saveTitle();
      };
    },
    bt_添加分类() {
      // 读取文件
      if (this.input_添加分类.trim() == '') {
        console.log("不能为空")
        return;
      }
      var filepath = config.fenleiPath;
      const fenleiJsonFile = fs.readFileSync(filepath);
      const fenleiJsonFileObj = JSON.parse(fenleiJsonFile);
      console.log("分类", fenleiJsonFileObj);
      var _fenlei = this.input_添加分类.trim().split('▲');
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

      // 在标签文件中添加相应分类
      const biaoqianJsonFile = fs.readFileSync(config.biaoqianPath);
      const biaoqianJsonFileObj = JSON.parse(biaoqianJsonFile);
      // 如果没有,就添加
      if (biaoqianJsonFileObj[this.select_当前选中的分类[0]] == undefined) {
        // 添加
        biaoqianJsonFileObj[_fenlei[0]] = []
        // 保存到文件
        fs.writeFileSync(config.biaoqianPath, JSON.stringify(biaoqianJsonFileObj, null, 4));
        // console.log('写入成功！')
        this.biaoqianOptions = biaoqianJsonFileObj;
      }
      // 清除分类
      this.input_添加分类 = "";
    },
    // 在json文件中添加标签
    bt_添加标签() {
      // console.log("你点击了添加标签,start");
      const biaoqianJsonFile = fs.readFileSync(config.biaoqianPath);
      const biaoqianJsonFileObj = JSON.parse(biaoqianJsonFile);

      // 如果在主分类中没找到,就提示一下
      if (biaoqianJsonFileObj[this.select_当前选中的分类[0]] == undefined) {
        console.log("标签文件中没有【", this.select_当前选中的分类[0], "】分类");
        return;
      }
      var biaoqianIndex0 = _.findKey(biaoqianJsonFileObj[this.select_当前选中的分类[0]], { 'value': this.input_添加标签 });

      if (biaoqianIndex0 == undefined) {
        // 如果没找到就添加标签
        biaoqianJsonFileObj[this.select_当前选中的分类[0]].push({ 'value': this.input_添加标签 })
      }
      // 保存到文件
      fs.writeFileSync(config.biaoqianPath, JSON.stringify(biaoqianJsonFileObj, null, 4));
      // console.log('写入成功！')
      this.biaoqianOptions = biaoqianJsonFileObj;
      this.input_添加标签 = "";
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
      dialectModule: require("sqlite3"),
      // timezone: '+08:00' // sqlite不支持...慢几小时就加几小时，快则减
    });
    console.log("数据库已连接")
    this.connect = sequelize;
    let u = initModels(sequelize);
    this.titles = u.titles;
    this.fenleitable = u.fenleitable;
  },
  destroyed() {
    // 断开数据库
    console.log("change页面_About_destroyed")
    // this.connect.close();
    // console.log("数据库已关闭")
  },
};
</script>
<style scoped>
/* 选择分类的高度 */
.el-cascader-menu__wrap {
  height: 200px;
}

/* .timuShowcontent {
} */
</style>
