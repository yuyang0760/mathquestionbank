<template>
<div>
    <el-button @click="ceshi()"></el-button>
    <br>
    <br>
  <div style=" display: flex;">
    <div style="yy-cascader-menu__list">
      <div v-for="(item,index) in fenlei1s" :key="index" :style="item.style" @click="clickfenlei1(item.item,index)">
        {{item.item}}</div>
    </div>
    <div style="yy-cascader-menu__list">
      <div v-for="(item,index) in fenlei2s" :key="index" :style="item.style" @click="clickfenlei2(item.item,index)">{{item.item}}</div>
    </div>
    <div style="yy-cascader-menu__list">
      <div v-for="(item,index) in fenlei3s" :key="index" :style="item.style" @click="clickfenlei3(item.item,index)">{{item.item}}</div>
    </div>
    <div style="yy-cascader-menu__list">
      <div v-for="(item,index) in fenlei4s" :key="index" :style="item.style" @click="clickfenlei4(item.item,index)">{{item.item}}</div>
    </div>
  </div>
  </div>
</template>

<script>
import config from '../../extraResources/config.json'
const { Op } = require("sequelize");
import _ from 'lodash'  // lodash工具库

export default {
  // 级联控件
  name: "yyCascader",
  //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
  props:
    ['fenleirows', 'sequelize', 'fenleitable'],
  data() {
    return {
      style1: { color: 'red', fontSize: '13px' },
      style2: { color: 'blue', fontSize: '13px' },
      fenlei1s: [],         // 每一个分类
      fenlei2s: [],
      fenlei3s: [],
      fenlei4s: [],

      currentClickFenlei1: '',      // 当前点击了选项
      currentClickFenlei2: '',
      currentClickFenlei3: '',
      currentClickFenlei4: '',

      currentSelectFenlei1: '',      // 当前选中的选项
      currentSelectFenlei2: '',
      currentSelectFenlei3: '',
      currentSelectFenlei4: '',
    }
  },
  computed: {

  },
  methods: {
    clickfenlei4(clickfenlei4,xuhao) {
      console.log(`你点击了${clickfenlei4}`)
      this.currentClickFenlei4 = clickfenlei4;

      // 改变样式
      for (let index = 0; index < this.fenlei4s.length; index++) {
        this.fenlei4s[index]['style'] = this.style1;
      }
      this.fenlei4s[xuhao]['style'] = this.style2;
    },
    async clickfenlei3(clickfenlei3,xuhao) {
      console.log(`你点击了${clickfenlei3}`)
      // 先清空分类
      this.fenlei4s = []
      this.currentClickFenlei3 = '';
      this.currentClickFenlei4 = '';
      let linfenlei = [];
      // 根据fenlei1查询fenlei2
      let res = await this.fenleitable.findAll({
        attributes: [
          this.sequelize.fn('distinct', this.sequelize.col('fenlei4')), 'fenlei4',
        ],
        where: {
          fenlei1: this.currentClickFenlei1,
          fenlei2: this.currentClickFenlei2,
          fenlei3: clickfenlei3
        }
      });
      for (let index = 0; index < res.length; index++) {
        // 添加到fenlei1s 格式: {'item':'圆锥曲线','class':''}
        linfenlei.push({ 'item': res[index]['fenlei4'], 'style': this.style1 })
      }
      this.fenlei4s = linfenlei;
      this.currentClickFenlei3 = clickfenlei3;
      // 改变样式
      for (let index = 0; index < this.fenlei3s.length; index++) {
        this.fenlei3s[index]['style'] = this.style1;
      }
      this.fenlei3s[xuhao]['style'] = this.style2;

    },
    async clickfenlei2(clickfenlei2,xuhao) {
      console.log(`你点击了${clickfenlei2}`)
      // 先清空分类
      this.fenlei3s = []
      this.fenlei4s = []
      this.currentClickFenlei2 = '';
      this.currentClickFenlei3 = '';
      this.currentClickFenlei4 = '';
      let linfenlei = [];
      // 根据fenlei1查询fenlei2
      let res = await this.fenleitable.findAll({
        attributes: [
          this.sequelize.fn('distinct', this.sequelize.col('fenlei3')), 'fenlei3',
        ],
        where: {
          fenlei1: this.currentClickFenlei1,
          fenlei2: clickfenlei2
        }
      });
      for (let index = 0; index < res.length; index++) {
        // 添加到fenlei1s 格式: {'item':'圆锥曲线','class':''}
        linfenlei.push({ 'item': res[index]['fenlei3'], 'style': this.style1 })
      }
      this.fenlei3s = linfenlei;
      this.currentClickFenlei2 = clickfenlei2;
      // 改变样式
      for (let index = 0; index < this.fenlei2s.length; index++) {
        this.fenlei2s[index]['style'] = this.style1;
      }
      this.fenlei2s[xuhao]['style'] = this.style2;
    },
    async clickfenlei1(clickfenlei1, xuhao) {
      console.log(`你点击了${clickfenlei1}`)
      // 先清空分类
      this.fenlei2s = []
      this.fenlei3s = []
      this.fenlei4s = []
      this.currentClickFenlei1 = '';
      this.currentClickFenlei2 = '';
      this.currentClickFenlei3 = '';
      this.currentClickFenlei4 = '';

      let linfenlei = [];
      // 根据fenlei1查询fenlei2
      let res = await this.fenleitable.findAll({
        attributes: [
          this.sequelize.fn('distinct', this.sequelize.col('fenlei2')), 'fenlei2',
        ],
        where: {
          fenlei1: clickfenlei1
        }
      });
      for (let index = 0; index < res.length; index++) {
        // 添加到fenlei1s 格式: {'item':'圆锥曲线','class':''}
        linfenlei.push({ 'item': res[index]['fenlei2'], 'style': this.style1 })
      }
      this.fenlei2s = linfenlei;
      this.currentClickFenlei1 = clickfenlei1;
      // 改变样式
      for (let index = 0; index < this.fenlei1s.length; index++) {
        this.fenlei1s[index]['style'] = this.style1;
      }
      this.fenlei1s[xuhao]['style'] = this.style2;

    },
    ceshi() {

    }
  },
  watch: {
    // {"item":'',"class":''}
  },
  mounted() {
    console.log('mounted')
    // 查询 fenlei1,去重查询
    this.fenleitable.findAll({
      attributes: [
        this.sequelize.fn('distinct', this.sequelize.col('fenlei1')), 'fenlei1',
      ]
    }).then(res => {
      this.fenlei1s = [];
      for (let index = 0; index < res.length; index++) {
        // 添加到fenlei1s 格式: {'item':'圆锥曲线','class':''}
        this.fenlei1s.push({ 'item': res[index]['fenlei1'], 'style': this.style1 })
      }
    })
  },
};
</script>
<style scoped>
.yy-cascader-menu__list {
  border: 1px;
}
</style>

