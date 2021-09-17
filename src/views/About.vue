<template>
  <div>
    <el-row>
      <!-- 左边 -->
      <el-col :span="12">
        <div>
          <el-button size="small" @click="addTimu()">添加题目</el-button>
          <el-button size="small" @click="selectAllTimu()">查询所有题目</el-button>
          <el-button size="small" @click="clearAllTimu()">清空所有题目</el-button>
        </div>
        <div :style="conheight">
          <happy-scroll size="10" resize>
            <div style="margin-right:28px;margin-bottom:20px">
              <ul>
                <li v-for="(item,index) in TimuList" :key="item.id">
                  <yytitledescription v-bind="item" :tihao="index" :isShowMini="true" style="margin:5px 5px">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="bianji(item.id,index)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTimu(item.id,index)"></el-button>
                  </yytitledescription>
                </li>
              </ul>
            </div>
          </happy-scroll>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="12"> </el-col>
    </el-row>

    <el-dialog top="0" :modal="false" :show-close="false" :visible.sync="isShowNewTimu" fullscreen v-bind="$attrs" v-on="$listeners"
      @open="onOpen" @close="onClose">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="65px" class="elform">
        <el-row>
          <el-col :span="10">

            <el-row>
              <el-col :span="12">
                <el-form-item label="类型:" prop="leixing" class="formitem">
                  <el-select v-model="formData.leixing" placeholder="请选择类型:" @change="leixingChange(formData.leixing)">
                    <el-option v-for="(item, index) in leixingOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="难度:" prop="nandu" class="formitem">
                  <el-rate v-model="formData.nandu" show-text :max="6" :texts="['非常简单','简单','一般或典型','典型或难','很难','难或偏']"></el-rate>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="题目:" prop="timu" class="formitem">
              <el-input v-model="formData.timu" type="textarea" placeholder="请输入题目:" :autosize="{minRows: 4, maxRows: 5}"></el-input>
              <el-button size="small" @click="jieTu('timu')">截图 {{timujietuShortCut}}</el-button>
              <el-button size="small" @click="jieTuDelete('timu')" type="danger" v-show="formData.timupicfilename">删除</el-button>
              <el-button size="small" @click="pasteTimu()">粘贴</el-button>
              <el-image :src="timupicfilePath" style="width:100%;height:100%" v-show="formData.timupicfilename"></el-image>

            </el-form-item>
            <el-form-item label="选项:" class="formitem" v-show="isShowXuanxiang">
              <yytitlexuanxiang v-show="!isShowXuanxiangpic" :xuanxiang="formData.xuanxiang"></yytitlexuanxiang>
              <div v-show="isShowXuanxiangpic" class="hengxiangbuju">
                <div class="shuxiangbuju">
                  <el-button type="success" round size="small" @click="jieTu('xuanxiang1')">A</el-button>
                  <el-button type="danger" round size="small" @click="jieTuDelete('xuanxiang1')"
                    v-show="isShowXuanxiangimage(formData.xuanxiang[0])">删除
                  </el-button>
                  <el-image :src="xuanxiang1filePath" class="image" v-show="isShowXuanxiangimage(formData.xuanxiang[0])"></el-image>
                </div>
                <div class="shuxiangbuju">
                  <el-button type="success" round size="small" @click="jieTu('xuanxiang2')">B</el-button>
                  <el-button type="danger" round size="small" @click="jieTuDelete('xuanxiang2')"
                    v-show="isShowXuanxiangimage(formData.xuanxiang[1])">删除
                  </el-button>
                  <el-image :src="xuanxiang2filePath" class="image" v-show="isShowXuanxiangimage(formData.xuanxiang[1])"></el-image>
                </div>
              </div>
              <div v-show="isShowXuanxiangpic" class="hengxiangbuju">
                <div class="shuxiangbuju">
                  <el-button type="success" round size="small" @click="jieTu('xuanxiang3')">C</el-button>
                  <el-button type="danger" round size="small" @click="jieTuDelete('xuanxiang3')"
                    v-show="isShowXuanxiangimage(formData.xuanxiang[2])">删除
                  </el-button>
                  <el-image :src="xuanxiang3filePath" class="image" v-show="isShowXuanxiangimage(formData.xuanxiang[2])"></el-image>
                </div>
                <div class="shuxiangbuju">
                  <el-button type="success" round size="small" @click="jieTu('xuanxiang4')">D</el-button>
                  <el-button type="danger" round size="small" @click="jieTuDelete('xuanxiang4')"
                    v-show="isShowXuanxiangimage(formData.xuanxiang[3])">删除
                  </el-button>
                  <el-image :src="xuanxiang4filePath" class="image" v-show="isShowXuanxiangimage(formData.xuanxiang[3])"></el-image>
                </div>
              </div>
              <div class="hengxiangbuju">
                <el-switch v-model="isShowXuanxiangpic" active-color="#ff4949" inactive-color="#13ce66"> </el-switch>
                <el-button size="small" @click="autopasteTimu()" type="primary">自动粘贴题目和选项</el-button>
              </div>
            </el-form-item>
            <el-row>
              <el-form-item label=" 答案1:" prop="daan1" class="formitem">
                <el-input v-model="formData.daan1" type="text" placeholder="请输入答案1:"></el-input>
              </el-form-item>
              <el-form-item label="答案2:" prop="daan2" class="formitem">
                <el-input v-model="formData.daan2" type="textarea" placeholder="请输入答案2:" :autosize="{minRows: 4, maxRows: 4}">
                </el-input>
                <el-button size="small" @click="jieTu('daan2')">截图</el-button>
                <el-button size="small" @click="jieTuDelete('daan2')" type="danger" v-show="formData.daan2picfilename">删除</el-button>
                <el-image :src="daan2picfilePath" style="width:100%;height:100%" v-show="formData.daan2picfilename"></el-image>

              </el-form-item>
              <el-form-item label="解析:" prop="jiexi" class="formitem">
                <el-input v-model="formData.jiexi" type="textarea" placeholder="请输入解析:" :autosize="{minRows: 4, maxRows: 4}">
                </el-input>
                <el-button size="small" @click="jieTu('jiexi')">截图</el-button>
                <el-button size="small" @click="jieTuDelete('jiexi')" type="danger" v-show="formData.jiexipicfilename">删除</el-button>
                <el-image :src="jiexipicfilePath" style="width:100%;height:100%" v-show="formData.jiexipicfilename"></el-image>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="14">
            <!-- 题目 -->
            <div style="margin:20px 20px">
              <yytitledescription v-bind="formData" :isShowMini="false"></yytitledescription>

            </div>
            <el-form-item label="标签:" prop="biaoqian" class="formitem">
              <el-tag :key="tag" v-for="tag in formData.biaoqian" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="tag.inputVisible" v-model="tag.inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
            <el-form-item label="分类:" prop="fenlei" class="formitem">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item,index) in formData.fenlei" :key="index" class="el-breadcrumb-item">{{item}}
                </el-breadcrumb-item>
              </el-breadcrumb>

              <el-button @click="fenleiSelectIsShow = true" type="primary" style="margin-left: 16px;">
                分类
              </el-button>

            </el-form-item>
            <el-form-item label="来源:" prop="laiyuan" class="formitem">
              <el-input v-model="formData.laiyuan" placeholder="请输入来源:" style="width:40%;" class="elitem"></el-input>
              <el-button @click="close()">返回</el-button>
              <el-button @click="resetForm">重置</el-button>
              <el-button type="primary" @click="handelConfirm" :disabled="baocunButtonDisabled">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 弹出的分类页 -->
      <el-drawer size="43%" :withHeader="false" :modal="false" :show-close="false" :visible.sync="fenleiSelectIsShow" direction="ltr">
        <el-cascader-panel class="el-cascader-panel" :options="fenleiOptions" v-model="formData.fenlei" @change="fenleiHandleChange">
        </el-cascader-panel>
        <div style="display:inline;">
          <el-input style="width:480px;margin:10px" v-model="input_添加分类" placeholder="请输入分类"></el-input>
          <el-button @click="bt_添加分类()">添加分类</el-button>
        </div>
        <!-- <el-divider></el-divider> -->
        <div>

          <div>快速添加标签:</div>

          <el-button type="primary" round size="small" @click="快速添加标签(tag.value)" :key="index" v-for="(tag,index) in biaoqianOptions">
            {{tag.value}}
          </el-button>
        </div>
        <div style="display:inline;">
          <el-input style="width:480px;margin:10px" v-model="input_添加标签" placeholder="请输入标签"></el-input>
          <el-button @click="bt_添加标签()">添加标签</el-button>
        </div>
      </el-drawer>
    </el-dialog>
  </div>
</template>
<script>

import _ from 'lodash'  // lodash工具库
import Vue from 'vue'
import yytitledescription from '../components/yytitledescription.vue'
import yytitlexuanxiang from '../components/yytitlexuanxiang.vue'
import { titlesCopy } from '../tools/mytools'
import { clipboard } from 'electron';
import fs from 'fs';
import config from '/extraResources/config.json'
import miment from 'miment'
import key from 'keymaster'

export default {
  name: 'About',
  components: {
    yytitledescription,
    yytitlexuanxiang
  },
  props: [],
  data() {
    return {
      isShowXuanxiangpic: false,   // 是否显示选项ABCD的图片
      timujietuShortCut: "",      // 题目截图快捷键
      input_添加标签: "",         // 添加标签
      input_添加分类: "",         // 添加分类
      isShowXuanxiang: true,      // 当""选择题"时显示选项,填空题和解答题不显示选项
      conheight: {           // 高度自适应
        height: ''
      },
      biaoqianOptions: null,
      fenleiSelectIsShow: false,
      fenleiOptions: null,   // 题目分类json数据,导数->切线 等等
      tag: {                        // 标签
        inputVisible: false,
        inputValue: ''
      },
      baocunButtonDisabled: false,  // 保存按钮
      isShowNewTimu: false,         // 是否显示添加题目
      TimuList: [],   // 储存了当前页显示的所有题目
      selectIndex: -1, // 当前正在编辑的TimuList中的index, 以后可以改成题号
      titles: null,  // 题目类 ,数据库查询用
      connect: null,  // 数据库连接,销毁用
      formData: {
        id: null,
        timu: '',
        leixing: '选择题',
        daan1: '',
        daan2: '',
        jiexi: '',
        nandu: 2,
        laiyuan: '',
        xuanxiang: ['', '', '', ''],
        biaoqian: [],   // 标签
        fenlei: [],        // 分类 和数据库中的fenlei1,fenlei2,fenlei3,fenlei4同步
        timupicfilename: '',
        daan2picfilename: '',
        jiexipicfilename: ''

      },
      rules: {
        timu: [{
          required: true,
          message: '请输入题目:',
          trigger: 'blur'
        }],
        xuanxiang: [],
        leixing: [{
          required: true,
          message: '请选择类型:',
          trigger: 'change'
        }],
        nandu: [{
          required: true,
          message: '难度不能为空',
          trigger: 'change'
        }],
        daan1: [],
        daan2: [],
        jiexi: [],
        laiyuan: [],
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


    }
  },
  computed: {
    timupicfilePath() {
      if (this.formData.timupicfilename != '') {
        return config.pngsPath + "/" + this.formData.timupicfilename + ".png"
      } else {
        return "";
      }
    },
    jiexipicfilePath() {
      if (this.formData.jiexipicfilename != '') {
        return config.pngsPath + "/" + this.formData.jiexipicfilename + ".png"
      } else {
        return "";
      }
    },
    daan2picfilePath() {
      if (this.formData.daan2picfilename != '') {
        return config.pngsPath + "/" + this.formData.daan2picfilename + ".png"
      } else {
        return "";
      }
    },
    xuanxiang1filePath() {
      if (this.formData.xuanxiang[0] != '' && this.formData.xuanxiang[0].startsWith("xuanxiang")) {
        return config.pngsPath + "/" + this.formData.xuanxiang[0] + ".png"
      } else {
        return "";
      }
    },
    xuanxiang2filePath() {
      if (this.formData.xuanxiang[1] != '' && this.formData.xuanxiang[1].startsWith("xuanxiang")) {
        return config.pngsPath + "/" + this.formData.xuanxiang[1] + ".png"
      } else {
        return "";
      }
    },
    xuanxiang3filePath() {
      if (this.formData.xuanxiang[2] != '' && this.formData.xuanxiang[2].startsWith("xuanxiang")) {
        return config.pngsPath + "/" + this.formData.xuanxiang[2] + ".png"
      } else {
        return "";
      }
    },
    xuanxiang4filePath() {
      if (this.formData.xuanxiang[3] != '' && this.formData.xuanxiang[3].startsWith("xuanxiang")) {
        return config.pngsPath + "/" + this.formData.xuanxiang[3] + ".png"
      } else {
        return "";
      }
    }
  },
  watch: {
  },
  methods: {
    // 是否显示选项图片 如果不以选项开头,就不显示选项图片了
    isShowXuanxiangimage(t) {
      if (t.startsWith("xuanxiang")) {
        return true;
      } else {
        return false;
      }
    },
    // 删除截图
    jieTuDelete(t) {
      if (t == 'timu') {
        fs.unlinkSync(this.timupicfilePath);
        this.formData.timupicfilename = "";
      }
      if (t == 'jiexi') {
        fs.unlinkSync(this.jiexipicfilePath);
        this.formData.jiexipicfilename = "";
      }
      if (t == 'daan2') {
        fs.unlinkSync(this.daan2picfilePath);
        this.formData.daan2picfilename = "";
      }
      if (t == 'xuanxiang1') {
        console.log(this.xuanxiang1filePath)
        fs.unlinkSync(this.xuanxiang1filePath);
        this.formData.xuanxiang.splice(0, 1, "")
      }
      if (t == 'xuanxiang2') {
        fs.unlinkSync(this.xuanxiang2filePath);
        this.formData.xuanxiang.splice(1, 1, "")
      }
      if (t == 'xuanxiang3') {
        fs.unlinkSync(this.xuanxiang3filePath);
        this.formData.xuanxiang.splice(2, 1, "")
      }
      if (t == 'xuanxiang4') {
        fs.unlinkSync(this.xuanxiang4filePath);
        this.formData.xuanxiang.splice(3, 1, "")
      }

    },
    // 截图
    jieTu(t) {
      const cp = require('child_process');
      var screen_window = cp.execFile('./extraResources/PrintScr.exe');
      screen_window.on('exit', (code) => {
        // 执行成功返回 1，返回 0 没有截图
        if (code) {

          var fileName = t + '_' + miment().format("YYYYMMDDhhmmss");
          // 剪贴板图片保存起来
          fs.writeFileSync(config.pngsPath + "/" + fileName + ".png", clipboard.readImage().toPNG());
          // 显示图片
          if (t == 'timu') {
            this.formData.timupicfilename = fileName;
          }
          if (t == 'jiexi') {
            this.formData.jiexipicfilename = fileName;
          }
          if (t == 'daan2') {
            this.formData.daan2picfilename = fileName;
          }
          if (t == 'xuanxiang1') {
            this.formData.xuanxiang.splice(0, 1, fileName)
          }
          if (t == 'xuanxiang2') {
            this.formData.xuanxiang.splice(1, 1, fileName)

          }
          if (t == 'xuanxiang3') {
            this.formData.xuanxiang.splice(2, 1, fileName)
          }
          if (t == 'xuanxiang4') {
            this.formData.xuanxiang.splice(3, 1, fileName)
          }
        }
      })

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
    leixingChange(leixingvalue) {
      console.log("leixingchange")
      if (leixingvalue == '选择题') {
        this.isShowXuanxiang = true
      } else {
        this.isShowXuanxiang = false;
        this.formData.xuanxiang = ['', '', '', ''];
      }
    },
    // 粘贴题目
    pasteTimu() {
      this.formData.timu = clipboard.readText();
    },
    // 自动粘贴题目按钮
    autopasteTimu() {
      var text = clipboard.readText();
      text = text.replace(/[\n\r]/g, '★');
      console.log(text);
      var patt1 = new RegExp(`(.*)A.?(.*)B.?(.*)C.?(.*)D.?(.*)`);
      var a = patt1.exec(text);
      console.log(a);
      if (a) {
        this.formData.timu = a[1].replace(/★/g, '');
        this.formData.xuanxiang = [a[2].replace(/★/g, ''), a[3].replace(/★/g, ''), a[4].replace(/★/g, ''), a[5].replace(/★/g, '')];
      }
    },
    // 自动高度
    getHeight() {
      this.conheight.height = window.innerHeight - 60 + 'px';
    },
    //清空所有题目
    clearAllTimu() {
      this.TimuList = [];
    },
    // 查询所有题目
    async selectAllTimu() {
      // 查询数据库
      var titles = await this.titles.findAll();
      // console.log(titles)
      // 显示
      this.TimuList = titlesCopy(this.formData, titles);
    },
    // 添加题目
    addTimu() {
      this.formData.id = null;
      this.isShowNewTimu = true
    },

    // 删除题目 id是数据库id,index是显示数组的index
    deleteTimu(id, index) {

      this.$confirm(`确定删除这道题吗 ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {

          // 删除数据库
          console.log("删除id", id);
          await this.titles.destroy({
            where: {
              id: id
            }
          });
          // 删除数组 TimuList
          this.TimuList.splice(index, 1);
        })
        .catch(() => { })
    },
    // 编辑题目
    async bianji(id, index) {
      // 根据id从数据库中查询
      var title = await this.titles.findAll({ where: { id: id } });
      // 显示题目
      _.forOwn(this.formData, (value, key) => {
        this.formData[key] = title[0][key];
      });
      // 把index传过去
      this.selectIndex = index;
      // 打开编辑
      this.isShowNewTimu = true;
    },
    // 分类改变
    fenleiHandleChange(fenlei) {
      // console.log(fenlei);
      this.input_添加分类 = fenlei.join('▲');
    },
    onOpen() {
      // console.log("onOpen", this.formData);
      this.baocunButtonDisabled = false
    },
    onClose() {
      // this.$refs['elForm'].resetFields()   // 需要注释掉,不然会出错
      this.formData.id = null;
      this.formData.timu = "";
      // this.formData.leixing = '选择题';
      this.formData.daan1 = "";
      this.formData.daan2 = "";
      this.formData.jiexi = "";
      // this.formData.nandu = 2;
      this.formData.laiyuan = "";
      this.formData.xuanxiang = ['', '', '', ''];
      // this.formData.biaoqian=[];
      // this.formData.fenlei=[];

    },
    close() { this.isShowNewTimu = false; this.$emit('update:visible', false) },
    // 保存按钮
    handelConfirm() {
      // console.log("刚点击保存按钮", this.formData);
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        this.baocunButtonDisabled = true; // 保存按钮不能按,防止数据还没返回已经按了两次
        // console.log("保存", this.formData.id);
        if (this.formData.id === null || this.formData.id === undefined) {
          // 储存到数据库
          const _timu = await this.titles.create(this.formData)
          this.formData.id = _timu.id;
          // console.log("NullID:" + _timu.id);
          // 添加到 TimuList
          this.TimuList.unshift(_.cloneDeep(this.formData));
        } else {
          // 修改id=xxx的数据库的值
          // console.log("我要修改了", this.formData.daan1);
          await this.titles.update(this.formData, {
            where: {
              id: this.formData.id
            }
          });
          // console.log("seleindex",this.selectIndex);
          // console.log(this.formData);
          this.TimuList.splice(this.selectIndex, 1, _.cloneDeep(this.formData))

          // console.log(this.TimuList)
          // console.log("notNullID:");
        }
        // 返回数据后再隐藏
        this.isShowNewTimu = false;

      })
    },
    // 重置按钮
    resetForm() {
      this.$refs['elForm'].resetFields()
    },

    // #region 标签
    handleClose(tag) {
      this.formData.biaoqian.splice(this.formData.biaoqian.indexOf(tag), 1);
    },

    showInput() {
      this.tag.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.tag.inputValue;
      if (inputValue) {
        this.formData.biaoqian.push(inputValue);
      }
      this.tag.inputVisible = false;
      this.tag.inputValue = '';
    }
    // #endregion

  },
  created() {
    console.log("About_created");
    window.addEventListener('resize', this.getHeight);
    this.getHeight()
  },
  mounted() {
    console.log("About_mounted")
    // 绑定快捷键
    // 回调函数返回 false 以阻止浏览器默认事件行为
    this.timujietuShortCut = config.timujietuShortCut;
    key(config.timujietuShortCut, () => { this.jieTu('timu'); return false });
    // key('ctrl+alt+a',  ()=> { this.jieTu('daan2'); return false });
    // key('ctrl+alt+a',  ()=> { this.jieTu('jiexi'); return false });

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
    console.log("About_destroyed")
    // this.connect.close();
    // console.log("数据库已关闭")
  },
}

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
  height: 350px;
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

