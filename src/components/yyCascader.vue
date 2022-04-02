<template>

  <div style="display:flex;" class="yycascader">
    <!-- {{fenlei2s}} -->
    <!-- <div v-show="fenlei2s==[]">你好</div> -->

    <div class="yycascader_fenleis_view" :style="{height:height+'px'}" v-show="true">
      <el-scrollbar style="height:100%">
        <div class="yycascader_fenlei_view" v-for="(item,index) in fenlei1s" :key="item.value+'f1'" :style="item.style"
          @click="clickfenlei1(item.value,index)">
          <input class="yy_radio radio_type" type="radio" name="fenlei1name" v-model="currentSelectFenlei[0]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei1s[index]['children']"></span>
        </div>
      </el-scrollbar>
    </div>
    <div class="yycascader_fenleis_view" :style="{height:height+'px'}" v-show="fenlei2s.length>0">
      <el-scrollbar style="height:100%">
        <div class="yycascader_fenlei_view" v-for="(item,index) in fenlei2s" :key="item.value+'f2'" :style="item.style"
          @click="clickfenlei2(item.value,index)">
          <input class="yy_radio radio_type" type="radio" name="fenlei2name" v-model="currentSelectFenlei[1]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei2s[index]['children']"></span>
        </div>
      </el-scrollbar>
    </div>
    <div class="yycascader_fenleis_view" :style="{height:height+'px'}" v-show="fenlei3s.length>0">
      <el-scrollbar style="height:100%">
        <div class="yycascader_fenlei_view" v-for="(item,index) in fenlei3s" :key="item.value+'f3'" :style="item.style"
          @click="clickfenlei3(item.value,index)">
          <input class="yy_radio radio_type" type="radio" name="fenlei3name" v-model="currentSelectFenlei[2]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei3s[index]['children']"></span>

        </div>
      </el-scrollbar>
    </div>
    <div class="yycascader_fenleis_view yycascader_fenleis_view_last" :style="{height:height+'px'}" v-show="fenlei4s.length>0">
      <el-scrollbar style="height:100%">
        <div class="yycascader_fenlei_view" v-for="(item,index) in fenlei4s" :key="item.value+'f4'" :style="item.style"
          @click="clickfenlei4(item.value,index)">
          <input class="yy_radio radio_type" type="radio" name="fenlei4name" v-model="currentSelectFenlei[3]" :value="item.value" />
          <span class="yy_value">{{item.value}}</span>
          <span class="el-icon-arrow-right yy_arrow_right" v-show="fenlei4s[index]['children']"></span>

        </div>
      </el-scrollbar>
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
    height: {
      type: Number
    }
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
.yycascader {
  border: solid 1px #e4e7ed;
}
.yycascader_fenleis_view {
  height: 200px;
  min-width: 170px;
  flex-direction: column;
  border-right: solid 1px #e4e7ed;
  display: flex;
}
.yycascader_fenleis_view_last{
  border-right: solid 0px #e4e7ed;
}
.yycascader_fenlei_view {
  display: flex;
  padding: 0px 10px 0px 10px;
  line-height: 34px;
  justify-content: center; /* 子元素水平居中 */
  align-items: center; /* 子元素垂直居中 */
}
.yycascader_fenlei_view:hover {
  background-color: #f6f7fb;
}
.yy_radio {
  cursor: pointer;
  width: 14px;
  height: 14px;
}
.yy_value {
  cursor: pointer;
  flex: 1;
  color: #606266;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: "Microsoft YaHei";
}
.yy_arrow_right {
  cursor: pointer;
  width: 14px;
  height: 14px;
  color: #606266;
}

.radio_type {
  width: 14px;
  height: 14px;
  appearance: none;
  position: relative;
  outline: none;
  line-height: 0.9px;
}
.radio_type:before {
  content: "";
  width: 12px;
  height: 12px;
  border: 1px solid #e1e4ea;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
}
.radio_type:checked:before {
  content: "";
  width: 14px;
  height: 14px;
  border: 0px solid #409eff;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
  background: #409eff;
}
.radio_type:checked:after {
  content: "";
  width: 6px;
  height: 6px;
  text-align: center;
  background: #409eff;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 5px;
  left: 5px;
}
.radio_type:checked + span {
  color: #409eff;
  font-weight: bold;
  font-size: 14px;
}
</style>

