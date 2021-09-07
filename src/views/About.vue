<template>
  <div>

    <el-row :gutter="10">

      <button @click="dianwo()">asdf</button>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        1
        <div v-for="item in TimuList" :key="item.id" class="timu">
          <div v-katex="item.formData.id+item.formData.timu">
          </div>
          <el-button>编辑</el-button>
          <el-button>删除</el-button>
        </div>

      </el-col>
      <!-- 右边 -->
      <el-col :span="12">
        <div>
          <el-button @click="isShowNewTimu = true">添加题目</el-button>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="添加题目" :visible.sync="isShowNewTimu" fullscreen v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="65px" class="elform">
        <el-row>
          <el-col :span="12">
            <div v-katex="{content:newTimuExpression}" class="style1"></div>
            <el-form-item label="id:" prop="id" v-show="false">
              {{formData.id}}
            </el-form-item>
            <el-form-item label="题目:" prop="timu" class="formitem">
              <el-input v-model="formData.timu" type="textarea" placeholder="请输入题目:" :autosize="{minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item label="选项:" prop="xuanxiang" class="formitem">
              <el-input v-model="formData.xuanxiang" type="textarea" placeholder="请输入选项:" :autosize="{minRows: 3, maxRows: 4}">
              </el-input>
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
          </el-col>
          <el-col :span="12">

            <el-form-item label=" 答案1:" prop="daan1" class="formitem">
              <el-input v-model="formData.daan1" type="text" placeholder="请输入答案1:"></el-input>
            </el-form-item>
            <el-form-item label="答案2:" prop="daan2" class="formitem">
              <el-input v-model="formData.daan2" type="textarea" placeholder="请输入答案2:" :autosize="{minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item label="解析:" prop="jiexi" class="formitem">
              <el-input v-model="formData.jiexi" type="textarea" placeholder="请输入解析:" :autosize="{minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item label="标签:" prop="biaoqian" class="formitem">
              <el-tag :key="tag" v-for="tag in formData.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="tag.inputVisible" v-model="tag.inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
export default {
  name: 'About',
  components: {

  },
  props: [],
  data() {
    return {
      tag: {
        
        inputVisible: false,
        inputValue: ''
      },

      baocunButtonDisabled: false,
      isShowNewTimu: false,
      TimuList: [],   // 储存了当前页显示的所有题目
      titles: null,  // 题目类 ,数据库查询用
      connect: null,  // 数据库连接,销毁用
      formData: {
        id: null,
        dynamicTags: ['标签一', '标签二', '标签三'],   // 标签
        timu: '题目',
        leixing: '选择题',
        daan1: '答案1',
        daan2: '答案2',
        jiexi: '解析',
        nandu: 3,
        laiyuan: '全国二卷',
        xuanxiang: '选项',
        biaoqian: '',
        fenlei1: '',
        fenlei2: '',
        fenlei3: '',
        fenlei4: '',
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
      return `id:${this.formData.id},$\\\\$,题目:${this.formData.timu},$\\\\$,
      答案1:${this.formData.daan1},$\\\\$,
      答案2:${this.formData.daan2},$\\\\$`
    }
  },
  watch: {},
  methods: {

    onOpen() { this.baocunButtonDisabled = false },
    onClose() { this.$refs['elForm'].resetFields() },
    close() { this.isShowNewTimu = false; this.$emit('update:visible', false) },
    // 保存按钮
    handelConfirm() {
      // 保存按钮可以按
      this.baocunButtonDisabled = true;
      this.$refs['elForm'].validate(async valid => {
        if (!valid) return
        // 储存到数据库
        const _timu = await this.titles.create(this.formData)
        this.formData.id = _timu.id;
        console.log("ID:" + _timu.id);
        // 添加到 TimuList
        this.TimuList.unshift({ formData: _.cloneDeep(this.formData) });
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
      this.formData.dynamicTags.splice(this.formData.dynamicTags.indexOf(tag), 1);
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
        this.formData.dynamicTags.push(inputValue);
      }
      this.tag.inputVisible = false;
      this.tag.inputValue = '';
    }
    // #endregion

  },
  created() { },
  mounted() {
    console.log("mounted")

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
    console.log("连接数据库")
    this.connect = connect;
    this.titles = initModels(connect).titles;
  },
  destroyed() {
    // 断开数据库
    console.log("destroyed")
    this.connect.close();
    console.log("关闭数据库")
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
</style>

