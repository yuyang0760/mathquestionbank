<template>
  <div>
    <el-container>
      <el-aside>
        <div style="height:100%">
          <el-scrollbar style="height:100%">
            1
            <div v-for="(item,index) in TimuList" :key="item.id" class="timu">
              <div v-katex="listShowtimu(item,index)">
              </div>
              <el-button @click="bianji(item.formData.id,index)">编辑</el-button>
              <el-button @click="deleteTimu(item.formData.id,index)">删除</el-button>
            </div>
          </el-scrollbar>
        </div>
      </el-aside>
      <!-- 右边 -->
      <el-main>
        <div>
          <el-button @click="addTimu()">添加题目</el-button>
        </div>
      </el-main>
    </el-container>
    <el-dialog top="0" :show-close="false" :visible.sync="isShowNewTimu" fullscreen v-bind="$attrs" v-on="$listeners" @open="onOpen"
      @close="onClose">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="65px" class="elform">
        <el-row>
          <el-col :span="9">
            <div v-katex="{content:newTimuExpression}" class="style1"></div>
            <el-form-item label="id:" prop="id" v-show="true">
              {{formData.id}}
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型:" prop="leixing" class="formitem">
                  <el-select v-model="formData.leixing" placeholder="请选择类型:" clearable>
                    <el-option v-for="(item, index) in leixingOptions" :key="index" :label="item.label" :value="item.value"
                      :disabled="item.disabled"></el-option>
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
              <el-input v-model="formData.timu" type="textarea" placeholder="请输入题目:" :autosize="{minRows: 5, maxRows: 5}"></el-input>
            </el-form-item>
            <el-form-item label="选项:" prop="xuanxiang" class="formitem">
              <el-input v-model="formData.xuanxiang" type="textarea" placeholder="请输入选项:" :autosize="{minRows: 3, maxRows: 3}">
              </el-input>
            </el-form-item>
            <el-row>

              <el-form-item label=" 答案1:" prop="daan1" class="formitem">
                <el-input v-model="formData.daan1" type="text" placeholder="请输入答案1:"></el-input>
              </el-form-item>

            </el-row>
          </el-col>
          <el-col :span="15">

            <el-form-item label="答案2:" prop="daan2" class="formitem">
              <el-input v-model="formData.daan2" type="textarea" placeholder="请输入答案2:" :autosize="{minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item label="解析:" prop="jiexi" class="formitem">
              <el-input v-model="formData.jiexi" type="textarea" placeholder="请输入解析:" :autosize="{minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
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
              <el-cascader-panel class="el-cascader-panel" :options="fenleiOptions" v-model="formData.fenlei"
                @change="fenleiHandleChange">
              </el-cascader-panel>
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
    </el-dialog>
  </div>
</template>
<script>

import _ from 'lodash'  // lodash工具库
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import leixingjson from '../lib/models/fenlei-json'
export default {
  name: 'About',
  components: {

  },
  props: [],
  data() {
    return {
      fenleiOptions: leixingjson,   // 题目分类json数据,导数->切线 等等
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
        timu: '$a^2+1=?$',
        leixing: '选择题',
        daan1: 'A',
        daan2: '因为$a^2=4$',
        jiexi: '这就是解析$a^3$',
        nandu: 4,
        laiyuan: '全国二卷',
        xuanxiang: '选项',
        biaoqian: [],   // 标签
        fenlei: [],        // 分类 和数据库中的fenlei1,fenlei2,fenlei3,fenlei4同步

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
    // 新题字符串格式
    newTimuExpression() {
      console.log("newTimuExpression");
      console.log("formdata", this.formData);

      let ID = this.formData.id === null ? '' : `ID:${this.formData.id}`;
      // let fenleiStr=this.formData.fenlei===undefined?
      return `
      ( ${this.formData.laiyuan} ${"★".repeat(this.formData.nandu)})   (${this.formData.fenlei.join('>')})
      (${this.formData.biaoqian})
      $\\\\$
      ${this.formData.timu}$\\\\$
      答案1:${this.formData.daan1}$\\\\\\\\$
      答案2:${this.formData.daan2}$\\\\\\\\$
      解析:${this.formData.jiexi}$\\\\\\\\\\\\$
      `
    }


  },
  watch: {

  },
  methods: {
    addTimu(){
      // if(this.$refs['elForm']!==undefined){
      // this.$refs['elForm'].resetFields()
      // }
      this.isShowNewTimu = true
    },
    // 显示左边题目
    listShowtimu(item, index) {
      console.log("listshowtimu",item.formData);
     
      return `
      ( ${item.formData.laiyuan} ${"★".repeat(item.formData.nandu)})   (${item.formData.fenlei.join('>')})
      (${item.formData.biaoqian})
      $\\\\$
      第${index}题 ${item.formData.timu}$\\\\$
      答案1:${item.formData.daan1}$\\\\\\\\$
      答案2:${item.formData.daan2}$\\\\\\\\$
      解析:${item.formData.jiexi}$\\\\\\\\\\\\$
      `
    },
    // 删除题目 id是数据库id,index是显示数组的index
    async deleteTimu(id, index) {
      // 根据id删除数据库
      console.log("删除id", id);
      await this.titles.destroy({
        where: {
          id: id
        }
      });
      // 删除数组中的内容
      this.TimuList.splice(index, 1);
    },
    // 编辑题目
    async bianji(id, index) {
      // 根据id从数据库中查询
      var title = await this.titles.findAll({ where: { id: id } });
      // 显示题目
      _.forOwn(this.formData, (value, key) => {
        this.formData[key] = title[0][key];
      });
      // this.formData = title[0];
      console.log("bianji", this.formData);
      this.isShowNewTimu = true;
      // 把index传过去
      this.selectIndex = index;
    },
    // 分类改变
    fenleiHandleChange(Value) {
      console.log("分类", Value);
      // this.formData.fenlei1=fenlei[0]?fenlei[0]:'';
      // this.formData.fenlei2=fenlei[1]?fenlei[1]:'';
      // this.formData.fenlei3=fenlei[2]?fenlei[2]:'';
      // this.formData.fenlei4=fenlei[3]?fenlei[3]:'';
    },
    onOpen() {
      console.log("onOpen", this.formData);
      this.baocunButtonDisabled = false
    },
    onClose() {
      // this.$refs['elForm'].resetFields()   需要注释掉,不然会出错
    },
    close() { this.isShowNewTimu = false; this.$emit('update:visible', false) },
    // 保存按钮
    handelConfirm() {
      console.log("刚点击保存按钮", this.formData);
      this.baocunButtonDisabled = true; // 保存按钮不能按,防止数据还没返回已经按了两次
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        console.log("保存", this.formData.id);
        if (this.formData.id === null || this.formData.id === undefined) {
          // 储存到数据库
          const _timu = await this.titles.create(this.formData)
          this.formData.id = _timu.id;
          console.log("NullID:" + _timu.id);
          // 添加到 TimuList
          this.TimuList.unshift({ formData: _.cloneDeep(this.formData) });
        } else {
          // 修改id=xxx的数据库的值
          console.log("我要修改了", this.formData.daan1);
          await this.titles.update(this.formData, {
            where: {
              id: this.formData.id
            }
          });
          console.log("seleindex",this.selectIndex);
          console.log(this.formData);
          this.TimuList.splice(this.selectIndex, 1, _.cloneDeep(this.formData))
          console.log(this.TimuList)
          console.log("notNullID:");
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
  created() { },
  mounted() {
    console.log("About_mounted")

    // 连接数据库
    const Sequelize = require("sequelize");
    const initModels = require("../lib/models/init-models").initModels;
    const connect = new Sequelize({
      host: 'localhost',
      username: 'root',
      password: '123456',
      database: 'electron_math_db',
      dialect: 'mysql',
      dialectModule: require('mysql2'), // 重要,不然会出错
      benchmark: true
    })
    console.log("数据库已连接")
    this.connect = connect;
    this.titles = initModels(connect).titles;
  },
  destroyed() {
    // 断开数据库
    console.log("About_destroyed")
    this.connect.close();
    console.log("数据库已关闭")
  },
}

</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}
.timu {
  border: 1px solid #000;
  height: 200px;
}
.style1 {
  height: 300px;
  margin: 0px;
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid #96c2f1;
  background-color: #eff7ff;
  font-family: "微软雅黑";
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
</style>

