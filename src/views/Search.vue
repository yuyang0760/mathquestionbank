<template>
  <div>

    <el-container style="border: 1px solid #eee;">
      <el-aside width="53%">
        <div :style="{height:window_innerheight+'px'}">
          <happy-scroll size="12" resize>
            <div>
              <div v-for="(item,index) in TimuCurrentPageList" :key="item.id" style="margin:0px 30px 0px 0px">
                <yytitledescription_search v-bind="item" :tihao="index" :isShowMini="true">
                  <el-button type="danger" icon="el-icon-star-off" size="mini" @click="addDaoChuTimuID(item)"></el-button>
                </yytitledescription_search>
              </div>
            </div>
          </happy-scroll>
        </div>
      </el-aside>

      <el-container width="40%">
        <div>
          <div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :page-sizes="[1,3,4, 5, 50,200,TimuALlCount]" :current-page.sync="currentPage" :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper" :total="TimuALlCount">
            </el-pagination>

          </div>
          <el-cascader-panel class="el-cascader-panel" :props="{ checkStrictly: true }" :options="fenleiOptions"
            v-model="chaxunData.fenlei" @change="fenleiHandleChange">
          </el-cascader-panel>
          <div style="margin:0px 0px 0px 0px;border: 2px solid #eee;">
            <el-switch v-model="biaoqian_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="and" inactive-text="or">
            </el-switch>
            <el-button style="margin-left:10px" type="danger" round size="mini" @click="chaxunData.biaoqian=[]">
              清空标签
            </el-button>
            {{chaxunData.biaoqian}}
            <div>
              <el-button style="margin:1px 0px 1px 2px;" type="primary" round size="small" @click="快速添加标签(tag.value)" :key="index"
                v-for="(tag,index) in biaoqianOptions[this.select_当前选中的分类[0]]">
                {{tag['value']}}
              </el-button>
            </div>
          </div>
          <div>
            <div>
              <div style="display:inline;">
                <el-switch v-model="timu_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="and" inactive-text="or">
                </el-switch>
                <el-input style="width:350px;margin-left:10px" placeholder="请输入题目关键词,用逗号分割" v-model="chaxunData.timu">
                  <template slot="prepend">题目:</template>
                </el-input>
                高度:
                <el-input-number style="margin-left:10px" size="small" v-model="window_innerheight" :min="1" :precision="0">
                </el-input-number>
              </div>
            </div>
            <div>
              <div style="display:inline;">
                <el-switch v-model="daan2_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="and" inactive-text="or">
                </el-switch>
                <el-input style="width:350px;margin-left:10px" placeholder="请输入答案关键词,用逗号分割" v-model="chaxunData.daan2">
                  <template slot="prepend">答案:</template>
                </el-input>
              </div>
            </div>

          </div>
          <div style="margin:2px 0px">
            <el-button type="success" size="small" @click="chaxunButton(1,false)">查询</el-button>
            <el-button type="success" size="small" @click="chaxunButton(currentPage+1,false)"
              :disabled="currentPage>=Math.ceil(TimuALlCount/pagesize)">下一页</el-button>
            <el-button size="small" type="danger" @click="clearAllTimu()">清空所有题目</el-button>
            <el-button size="small" type="danger" @click="chaxunData.fenlei=[]">清空分类</el-button>
            <el-button type="success" size="small" @click="chaxunButton_ByID(chaxun_ByID_word)">查询ID</el-button>
            <el-input-number style="margin-left:10px" size="small" v-model="chaxun_ByID_word" :min="1" label="题库ID" :precision="0">
            </el-input-number>
          </div>

          <div style="margin:2px 2px 2px 2px" v-show="TimuDaoChuList.length!=0">试题篮:
            <!-- <span :key="index" v-for="(item,index) in TimuDaoChuList"> {{item.id}}</span> -->
            <el-button style="margin:0px 2px 0px 2px" type="success" size="small" @click="removeDaoChuList(item)" :key="index"
              v-for="(item,index) in TimuDaoChuList">
              {{item.id}}</el-button>
          </div>

          <div style="margin-top:5px">
            <el-button type="primary" size="small" @click="chaxunButton(currentPage,'all')">导出所有题目</el-button>
            <el-button type="primary" size="small" @click="chaxunButton(currentPage,'currentPage')">导出此页题目</el-button>
            <el-button type="primary" size="small" @click="chaxunButton(currentPage,'shitilan')">导出试题篮</el-button>
            <el-button size="small" @click="addCurrentPageTimuToShitilan()">添加本页到试题篮</el-button>
            <el-button type="danger" size="small" @click="TimuDaoChuList=[]">清空试题篮</el-button>
          </div>

          <draggable v-model="daochurule" @start="drag=true" @end="drag=false" v-bind="{animation: 200}">
            <transition-group tag="div">
              <div v-for="(element,index) in daochurule" :key="element.id">
                <el-switch v-model="element.isout" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <span style="width:60px;display:inline-block;"> {{index+1}}. {{element.name}}:</span>

                <el-input v-model="element.qian" size="small" style="width:250px" :placeholder="element.placeholderqian"></el-input>
                <el-input v-model="element.hou" size="small" style="width:250px" :placeholder="element.placeholderhou"></el-input>
              </div>
            </transition-group>
          </draggable>
          <el-button type="danger" size="small" @click="daochuruleSave()">保存导出规则</el-button>
          <el-input v-model="ruleSaveName" size="small" style="width:150px" placeholder="请输入"></el-input>
          <el-button type="danger" size="small" @click="daochuruleRead()">读取导出规则</el-button>
          <el-select v-model="currentRule" placeholder="请选择">
            <el-option v-for="(item,index) in daochurulesOptions" :key="index" :label="index" :value="item">
            </el-option>
          </el-select>
        </div>
      </el-container>
    </el-container>

  </div>
</template>
<script>

import _ from 'lodash'  // lodash工具库
import Vue from 'vue'
import draggable from 'vuedraggable'
import yytitledescription_search from '../components/yytitledescription_search.vue'
import { titlesCopy } from '../tools/mytools'
import { clipboard } from 'electron';
import fs from 'fs';
import config from '/extraResources/config.json'
import miment from 'miment'
import { time } from 'console'
const { remote } = require('electron')
const { Op } = require("sequelize");

export default {
  name: 'Search',
  components: {
    yytitledescription_search,
    draggable,
  },
  props: [],
  data() {
    return {
      biaoqian_switch: false, // 查询题目时,标签或,且
      daan2_switch: false, // 查询题目时,标签或,且
      timu_switch: false, // 查询题目时,标签或,且
      TimuALlCount: 0,     // 总共的题目个数
      currentPage: 1,      // 分页中的当前页
      pagesize: 3,         // 每页多少个题    
      select_当前选中的分类: [],     // 当前选中的分类
      window_innerheight: 795,    // 初始innerheight
      currentRule: '',         // 当前规则的名字
      daochurulesOptions: [],    // 导出规则的文件存到这里
      biaoqianOptions: [],    // 一开始读取的标签文件中所有标签放在这里
      fenleiOptions: null,   // 一开始读取的题目分类json数据,导数->切线 等等
      TimuDaoChuList: [],   // 储存需要导出的题目
      TimuCurrentPageList: [],   // 储存了当前页显示的所有题目
      titles: null,  // 题目类 ,数据库查询用
      connect: null,  // 数据库连接,销毁用
      chaxun_ByID_word: 1,    // 以ID查询
      chaxun_Bytimu_word: '',  // 以题目关键词查询
      ruleSaveName: '',
      daochurule: [           // 导出规则
        { id: 1, name: 'ID', value: 'id', isout: true, qian: '', hou: '', placeholderqian: '请输入ID前缀', placeholderhou: '请输入ID后缀' },
        { id: 2, name: '分类', value: 'fenlei', isout: true, qian: '', hou: '', placeholderqian: '请输入分类前缀', placeholderhou: '请输入分类后缀' },
        { id: 3, name: '标签', value: 'biaoqian', isout: true, qian: '', hou: '', placeholderqian: '请输入标签前缀', placeholderhou: '请输入标签后缀' },
        { id: 4, name: '题目', value: 'timu', isout: true, qian: '', hou: '', placeholderqian: '请输入题目前缀', placeholderhou: '请输入题目后缀' },
        { id: 5, name: '答案', value: 'daan2', isout: true, qian: '', hou: '', placeholderqian: '请输入答案前缀', placeholderhou: '请输入答案后缀' },
        { id: 6, name: '解析', value: 'jiexi', isout: true, qian: '', hou: '', placeholderqian: '请输入解析前缀', placeholderhou: '请输入解析后缀' },
        { id: 7, name: '备注', value: 'beizhu', isout: false, qian: '', hou: '', placeholderqian: '请输入备注前缀', placeholderhou: '请输入备注后缀' },
      ],
      chaxunData: {         // 查询数据
        fenlei: [],
        biaoqian: [],
        // nandu: [],
        timu: '',
        daan1: '',
        daan2: '',
        jiexi: ''
      },
      formData: {
        id: null,
        timu: '',
        leixing: '选择题',
        daan1: '',
        daan2: '',
        jiexi: '',
        beizhu: '',  // 备注
        nandu: 2,
        laiyuan: '',
        xuanxiang: ['', '', '', ''],
        biaoqian: [],   // 标签
        fenlei: [],        // 分类 和数据库中的fenlei1,fenlei2,fenlei3,fenlei4同步
        timupicfilename: '',
        daan2picfilename: '',
        jiexipicfilename: ''

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
    dragOptions() {
      return {
        animation: 200,
      };
    },
    timupicfilePath() {
      if (this.formData.timupicfilename != '') {
        return config.imagesPath + "/" + this.formData.timupicfilename + ".jpg"
      } else {
        return "";
      }
    },
    jiexipicfilePath() {
      if (this.formData.jiexipicfilename != '') {
        return config.imagesPath + "/" + this.formData.jiexipicfilename + ".jpg"
      } else {
        return "";
      }
    },
    daan2picfilePath() {
      if (this.formData.daan2picfilename != '') {
        return config.imagesPath + "/" + this.formData.daan2picfilename + ".jpg"
      } else {
        return "";
      }
    },
    xuanxiang1filePath() {
      if (this.formData.xuanxiang[0] != '' && this.formData.xuanxiang[0].startsWith("xuanxiang")) {
        return config.imagesPath + "/" + this.formData.xuanxiang[0] + ".jpg"
      } else {
        return "";
      }
    },
    xuanxiang2filePath() {
      if (this.formData.xuanxiang[1] != '' && this.formData.xuanxiang[1].startsWith("xuanxiang")) {
        return config.imagesPath + "/" + this.formData.xuanxiang[1] + ".jpg"
      } else {
        return "";
      }
    },
    xuanxiang3filePath() {
      if (this.formData.xuanxiang[2] != '' && this.formData.xuanxiang[2].startsWith("xuanxiang")) {
        return config.imagesPath + "/" + this.formData.xuanxiang[2] + ".jpg"
      } else {
        return "";
      }
    },
    xuanxiang4filePath() {
      if (this.formData.xuanxiang[3] != '' && this.formData.xuanxiang[3].startsWith("xuanxiang")) {
        return config.imagesPath + "/" + this.formData.xuanxiang[3] + ".jpg"
      } else {
        return "";
      }
    }
  },
  watch: {
  },
  methods: {
    // 读取导出规则
    daochuruleRead() {
      console.log('你点击了读取导出规则按钮');
      if (!(this.currentRule)) {
        console.log("当前规则为空,初始化规则");
        this.daochurule = [           // 导出规则
          { id: 1, name: 'ID', value: 'id', isout: true, qian: '', hou: '', placeholderqian: '请输入ID前缀', placeholderhou: '请输入ID后缀' },
          { id: 2, name: '分类', value: 'fenlei', isout: true, qian: '', hou: '', placeholderqian: '请输入分类前缀', placeholderhou: '请输入分类后缀' },
          { id: 3, name: '标签', value: 'biaoqian', isout: true, qian: '', hou: '', placeholderqian: '请输入标签前缀', placeholderhou: '请输入标签后缀' },
          { id: 4, name: '题目', value: 'timu', isout: true, qian: '', hou: '', placeholderqian: '请输入题目前缀', placeholderhou: '请输入题目后缀' },
          { id: 5, name: '答案', value: 'daan2', isout: true, qian: '', hou: '', placeholderqian: '请输入答案前缀', placeholderhou: '请输入答案后缀' },
          { id: 6, name: '解析', value: 'jiexi', isout: true, qian: '', hou: '', placeholderqian: '请输入解析前缀', placeholderhou: '请输入解析后缀' },
          { id: 7, name: '备注', value: 'beizhu', isout: false, qian: '', hou: '', placeholderqian: '请输入备注前缀', placeholderhou: '请输入备注后缀' },
        ];
      } else {
        // 设置当前规则
        this.daochurule = this.currentRule;
      }
    },
    // 保存导出规则
    daochuruleSave() {
      if (this.ruleSaveName.trim() == '') { console.log('不能为空!'); return; };
      // 名字不能重复
      if (_.has(this.daochurulesOptions, this.ruleSaveName)) {
        console.log('存在重复的名字');
        return;
      };
      // 添加名称,给对象动态添加属性,要这样添加才行
      this.$set(this.daochurulesOptions, this.ruleSaveName, this.daochurule)
      // 重新写入文件
      fs.writeFileSync(config.daochurulesPath, JSON.stringify(this.daochurulesOptions, null, 2));
      this.ruleSaveName = '';
      console.log('保存了' + this.ruleSaveName);
    },
    // 添加本页试题到试题栏
    addCurrentPageTimuToShitilan() {
      // _.unionBy取两个数组的并集,相当于去除重复元素,以id为标准.
      this.TimuDaoChuList = _.unionBy(this.TimuDaoChuList, this.TimuCurrentPageList, 'id');
    },
    // 移除导出列表中的某一项
    removeDaoChuList(timuItem) {
      let itemPos = this.TimuDaoChuList.indexOf(timuItem);
      if (itemPos > -1) {
        this.TimuDaoChuList.splice(itemPos, 1);
      }
    },
    // 添加导出题目到TimuDaoChuList,timuItem代表每一个题目
    addDaoChuTimuID(timuItem) {
      // 看看是否有重复的
      if (this.TimuDaoChuList.indexOf(timuItem) > -1) {
        return;
      }
      this.TimuDaoChuList.push(timuItem);
    },
    // 关闭标签
    handleClose(tag) {
      let index = this.chaxunData.biaoqian.indexOf(tag);
      if (index > -1) {
        this.chaxunData.biaoqian.splice(index, 1)
      }
    },
    快速添加标签(val) {
      let index = this.chaxunData.biaoqian.indexOf(val);
      if (index > -1) {
        this.chaxunData.biaoqian.splice(index, 1)
      } else {

        this.chaxunData.biaoqian.push(val);
      }
    },
    // 按照ID查询
    async chaxunButton_ByID(chaxun_ByID_word) {
      // 查询数据库
      const { count, rows } = await this.titles.findAndCountAll({
        where: {
          id: chaxun_ByID_word
        },
        offset: (this.currentPage - 1) * this.pagesize,
        limit: this.pagesize
      });
      this.TimuALlCount = count;
      this.TimuCurrentPageList = titlesCopy(this.formData, rows);

    },
    // 点击题目关键词查询   val是要查询的页
    async chaxunButton(val, isdaochu) {
      console.log("你点击了查询按钮");
      // 如果是导出试题篮,则不用查询,直接导出,导出后直接返回
      if (isdaochu == 'shitilan') {
        this.daochutimu(this.TimuDaoChuList);
        // this.TimuDaoChuList = [];   // 导出后,清空,避免混乱
        let daochulog = [];
        for (let index = 0; index < this.TimuDaoChuList.length; index++) {
          const element = this.TimuDaoChuList[index];
          daochulog.push(element.id);
        }
        fs.appendFileSync('导出题目log.txt', '【' + miment().format() + '】' + '\t导出的题目ID:\t' + daochulog + '\r\n');
        return;
      }
      // 如果不是导出试题篮,则查询数据库
      this.currentPage = val;
      // 拼接标签
      let pinjie_biaoqian = [];
      if (this.chaxunData.biaoqian.length > 0) {
        for (let index = 0; index < this.chaxunData.biaoqian.length; index++) {
          const element = this.chaxunData.biaoqian[index];
          let every = { biaoqian: { [Op.like]: ['%' + element + '%'] } };
          pinjie_biaoqian.push(every);
        }
      }
      // 拼接 分类
      let pinjie_fenlei = []
      if (this.chaxunData.fenlei[0]) {
        pinjie_fenlei.push({ fenlei1: this.chaxunData.fenlei[0] });
      }
      if (this.chaxunData.fenlei[1]) {
        pinjie_fenlei.push({ fenlei2: this.chaxunData.fenlei[1] });
      }
      if (this.chaxunData.fenlei[2]) {
        pinjie_fenlei.push({ fenlei3: this.chaxunData.fenlei[2] });
      }
      if (this.chaxunData.fenlei[3]) {
        pinjie_fenlei.push({ fenlei4: this.chaxunData.fenlei[3] });
      }
      // 拼接题目
      let pinjie_timu = [];
      if (this.chaxunData.timu.trim() != '') {
        let timusplit = this.chaxunData.timu.split(',');
        for (let index = 0; index < timusplit.length; index++) {
          const element = timusplit[index];
          let every = { timu: { [Op.like]: ['%' + element + '%'] } };
          pinjie_timu.push(every);
        }
      }
      // 拼接答案
      let pinjie_daan2 = [];
      if (this.chaxunData.daan2.trim() != '') {
        let daan2split = this.chaxunData.daan2.split(',');
        for (let index = 0; index < daan2split.length; index++) {
          const element = daan2split[index];
          let every = { daan2: { [Op.like]: ['%' + element + '%'] } };
          pinjie_daan2.push(every);
        }
      }
      // 最后的拼接
      let pinjie_zuihou = [];
      if (pinjie_fenlei.length > 0) {
        pinjie_zuihou.push({ [Op.and]: pinjie_fenlei });
      }
      if (pinjie_biaoqian.length > 0) {
        pinjie_zuihou.push({ [this.biaoqian_switch ? Op.and : Op.or]: pinjie_biaoqian });
      }
      if (pinjie_timu.length > 0) {
        pinjie_zuihou.push({ [this.timu_switch ? Op.and : Op.or]: pinjie_timu });
      }
      if (pinjie_daan2.length > 0) {
        pinjie_zuihou.push({ [this.daan2_switch ? Op.and : Op.or]: pinjie_daan2 });
      }
      let offset1 = 0;
      let limit1 = 1000000;
      if (isdaochu) {
        // 如果是导出所有
        if (isdaochu == 'all') {
          offset1 = 0;
          limit1 = 1000000;
        }// 如果是导出此页题目
        if (isdaochu == 'currentPage') {
          offset1 = (this.currentPage - 1) * this.pagesize;
          limit1 = this.pagesize;
        }

      }
      else {
        // 如果不是导出所有
        offset1 = (this.currentPage - 1) * this.pagesize;
        limit1 = this.pagesize;
      }
      const { count, rows } = await this.titles.findAndCountAll({
        where: {
          [Op.and]: pinjie_zuihou
        },
        offset: offset1,
        limit: limit1
      });
      this.TimuALlCount = count;
      // 如果不导出就放到 TimuCurrentPageList 显示出来
      if (!isdaochu) {
        this.TimuCurrentPageList = titlesCopy(this.formData, rows);
      }
      else {
        // 如果导出就放到 TimuDaoChuList 用于导出   前面查出来啥,这里就导出啥,rows代表查出来的数据
        this.TimuDaoChuList = titlesCopy(this.formData, rows);
        this.daochutimu(this.TimuDaoChuList);
        this.TimuDaoChuList = [];   // 导出后,清空,避免混乱
      }
    },
    // 导出题目
    daochutimu(timulist) {
      // console.log(timulist,'timulist');
      let outstr = '';
      // 导出过程 遍历题目
      for (let index = 0; index < timulist.length; index++) {
        // 得到导出list中的每一个题目
        const timu = timulist[index];
        // 遍历导出规则
        for (let index1 = 0; index1 < this.daochurule.length; index1++) {
          // 获取每一条导出规则 id,分类,题目,答案,等等
          const daochuruleElement = this.daochurule[index1];
          // 如果此条规则可以被导出
          if (daochuruleElement.isout) {
            // 就组织字符串,准备导出
            // 如果是[分类]规则,需要特殊处理一下
            if (daochuruleElement.value == 'fenlei') {
              outstr += daochuruleElement.qian
                + timu[daochuruleElement.value].join('>')
                + daochuruleElement.hou;
            }
            if (daochuruleElement.value == 'timu' || daochuruleElement.value == 'daan2' || daochuruleElement.value == 'jiexi') {
              outstr += '\r\n\r\n' + daochuruleElement.qian + '\r\n\r\n'
                + timu[daochuruleElement.value] + '\r\n\r\n'
                + daochuruleElement.hou + '\r\n\r\n';
            }
          }
        }

        let qian = '\r\n' + '\\begin{timu1}{}' + '\r\n';
        let hou = '\\end{timu1}' + '\r\n\r\n' + '\\newpage' + '\r\n';
        let laststr = qian + outstr + hou;
        laststr = laststr.replace(/\$\\\\\$/g, '\r\n\r\n').replace(/ {2,}/g, ' ').replace(/^ {1,}/gm, '').replace(/(\r|\n){3,}/g, '\r\n\r\n');
        // 存到文件
        fs.writeFileSync('导出的latex题目字符串.tex', laststr);
        console.log(`导出了${timulist.length}个题目`);
      }
    },
    //清空所有题目
    clearAllTimu() {
      this.TimuCurrentPageList = [];
    },

    handleSizeChange(val) {
      console.log(`每页${val}条`);
      this.pagesize = val;
      console.log(this.pagesize);
    },
    handleCurrentChange(val) {
      console.log(`当前第${val}页`);
      this.chaxunButton(val, false);

    },
    fenleiHandleChange(fenlei) {
      console.log("你选择了分类:", fenlei);
      this.input_添加分类 = fenlei.join('▲');
      this.select_当前选中的分类 = fenlei;
      // 读取当前分类下的标签
    },

  },

  created() {
    console.log("About_created");
    // let len
    // remote.getCurrentWindow().on('resize', (a) => {
    //   // 获取window窗口的高度，减去需要计算的内容以外的高度，得出内容实际高度
    //   len = Math.floor((window.innerHeight) - 40)
    //   this.window_innerheight = len
    //   // console.log(len);
    // })
  },
  mounted() {
    console.log("About_mounted")

    // 开始就读取分类
    // 读取文件
    this.fenleiOptions = JSON.parse(fs.readFileSync(config.fenleiPath));
    this.biaoqianOptions = JSON.parse(fs.readFileSync(config.biaoqianPath));
    this.daochurulesOptions = JSON.parse(fs.readFileSync(config.daochurulesPath));
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
      // timezone: '+08:00' //  sqlite不支持!,慢几小时就加几小时，快则减
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
<style scoped>
</style>

