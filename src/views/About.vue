<template>
  <div>

   
    <el-row :gutter="20">
      顶部
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        1
 <div v-katex="expression"></div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="12">
        <div>
          <el-form ref="elForm" label-position="right" :model="formData" :rules="rules" size="medium" label-width="69px">
            <el-form-item label="题目:" prop="timu">
              <el-input v-model="formData.timu" type="textarea" placeholder="请输入题目:" :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="选项:" prop="xuanxiang">
              <el-input v-model="formData.xuanxiang" type="textarea" placeholder="请输入选项:" :autosize="{minRows: 2, maxRows: 4}"
                :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="类型:" prop="leixing">
              <el-select v-model="formData.leixing" placeholder="请选择类型:" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in leixingOptions" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="难度:" prop="nandu">
              <el-rate  v-model="formData.nandu" show-text  :max="6" :texts="['非常简单','简单','一般或典型','典型或难','很难','难或偏']"></el-rate>
            </el-form-item>
            <el-form-item label="答案1:" prop="daan1">
              <el-input v-model="formData.daan1" type="textarea" placeholder="请输入答案1:" :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="答案2:" prop="daan2">
              <el-input v-model="formData.daan2" type="textarea" placeholder="请输入答案2:" :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="解析:" prop="jiexi">
              <el-input v-model="formData.jiexi" type="textarea" placeholder="请输入解析:" :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="来源:" prop="laiyuan">
              <el-input v-model="formData.laiyuan" placeholder="请输入来源:" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">保存</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

  </div>

</template>
<script>

import _ from 'lodash'  // lodash工具库
export default {
  name: 'App',
  components: {

  },
  props: [],
  data() {
    return {
      formData: {
        timu: '',
        xuanxiang: '',
        leixing: '选择题',
        nandu: 3,
        daan1: '',
        daan2: '',
        jiexi: '',
        laiyuan: '',
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
    expression() {
      return this.formData.timu + this.formData.daan1 + this.formData.daan2;
    }
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>

</style>

