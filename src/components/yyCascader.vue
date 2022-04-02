<template>
  <div>
    <div style="display:flex;">
      <div>
        <div v-for="(item,index) in fenlei1s" :key="item.value+'f1'" :style="item.style" @click="clickfenlei1(item.value,index)">
          <input class="yy_radio" type="radio" name="fenlei1name" v-model="currentSelectFenlei[0]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei1s[index]['children']"></span>
        </div>
      </div>
      <div>
        <div v-for="(item,index) in fenlei2s" :key="item.value+'f2'" :style="item.style" @click="clickfenlei2(item.value,index)">
          <input class="yy_radio" type="radio" name="fenlei2name" v-model="currentSelectFenlei[1]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei2s[index]['children']"></span>
        </div>
      </div>
      <div>
        <div v-for="(item,index) in fenlei3s" :key="item.value+'f3'" :style="item.style" @click="clickfenlei3(item.value,index)">
          <input class="yy_radio" type="radio" name="fenlei3name" v-model="currentSelectFenlei[2]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei3s[index]['children']"></span>

        </div>
      </div>
      <div>
        <div v-for="(item,index) in fenlei4s" :key="item.value+'f4'" :style="item.style" @click="clickfenlei4(item.value,index)">
          <input class="yy_radio" type="radio" name="fenlei4name" v-model="currentSelectFenlei[3]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei4s[index]['children']"></span>

        </div>
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

  props: {
    options: {
      type: Array,
    },
  },
  watch: {

  },
  // ['options','currentSelectFenlei'],
  data() {
    return {
      style1: { color: 'red', fontSize: '13px' },
      style2: { color: 'blue', fontSize: '13px' },
      fenlei1s: this.options,         // 每一个分类
      fenlei2s: [],
      fenlei3s: [],
      fenlei4s: [],
      currentSelectFenlei: ['', '', '', ''],    // 当前点击了选项
      currentSelectFenleiIndex: [-1, -1, -1, -1],      // 当前点击了选项
    }
  },

  methods: {
    clickfenlei1(value, index) {
      this.currentSelectFenlei[1] = '';
      this.currentSelectFenlei[2] = '';
      this.currentSelectFenlei[3] = '';
      this.currentSelectFenleiIndex[1] = -1;
      this.currentSelectFenleiIndex[2] = -1;
      this.currentSelectFenleiIndex[3] = -1;
      this.$set(this.currentSelectFenlei, 0, value);
      this.$set(this.currentSelectFenleiIndex, 0, index);
      this.fenlei2s = this.fenlei1s[index]['children'];
      this.fenlei3s = [];
      this.fenlei4s = [];
      // 触发change事件 输出数组,空的去掉
      this.$emit('change', _.compact(this.currentSelectFenlei))
    },
    clickfenlei2(value, index) {
      this.currentSelectFenlei[2] = '';
      this.currentSelectFenlei[3] = '';
      this.currentSelectFenleiIndex[2] = -1;
      this.currentSelectFenleiIndex[3] = -1;
      this.$set(this.currentSelectFenlei, 1, value);
      this.$set(this.currentSelectFenleiIndex, 1, index);
      this.fenlei3s = this.fenlei2s[index]['children'];
      this.fenlei4s = [];
      // 触发change事件 输出数组,空的去掉
      this.$emit('change', _.compact(this.currentSelectFenlei))
    },
    clickfenlei3(value, index) {
      this.currentSelectFenlei[3] = '';
      this.currentSelectFenleiIndex[3] = -1;
      this.$set(this.currentSelectFenlei, 2, value);
      this.$set(this.currentSelectFenleiIndex, 2, index);
      this.fenlei4s = this.fenlei3s[index]['children'];
      // 触发change事件 输出数组,空的去掉
      this.$emit('change', _.compact(this.currentSelectFenlei))
    },
    clickfenlei4(value, index) {
      this.$set(this.currentSelectFenlei, 3, value);
      this.$set(this.currentSelectFenleiIndex, 3, index);
      // this.fenlei4s = this.fenlei4s[index]['children'];
      // 触发change事件 输出数组,空的去掉
      this.$emit('change', _.compact(this.currentSelectFenlei))
    },
    clear() {
      this.currentSelectFenlei[0] = '';
      this.currentSelectFenlei[1] = '';
      this.currentSelectFenlei[2] = '';
      this.currentSelectFenlei[3] = '';
      this.currentSelectFenleiIndex[0] = -1;
      this.currentSelectFenleiIndex[1] = -1;
      this.currentSelectFenleiIndex[2] = -1;
      this.currentSelectFenleiIndex[3] = -1;
      // this.fenlei1s = [];
      this.fenlei2s = [];
      this.fenlei3s = [];
      this.fenlei4s = [];
    }
  },

  mounted() {

  },
};
</script>
<style scoped>
.yy_radio {
  cursor: pointer;
}
.yy_value {
  cursor: pointer;
}
.yy_arrow_right {
  cursor: pointer;
}
</style>

