<template>
  <div>
    <table width="100%" class="yy-descriptions-table">
      <tr class="yy-descriptions-row">
        <th colspan="1" class="yy-descriptions-th">{{tihao+1}}:</th>
        <td colspan="5" class="yy-descriptions-td fenleiclass">
          {{fenlei.join(' ➣ ')}}
        </td>
        <th colspan="1" class="yy-descriptions-th">标签:</th>
        <td  class="yy-descriptions-td-biaoqian" style="width:300px">
          {{biaoqian.join('&emsp;')}}
        </td>
        <td class="yy-descriptions-td" style="text-align: right;width:140px">

          ID:{{id}} {{'★'.repeat(nandu)}}
          <!-- <slot  v-bind:id="id" v-bind:tihao="tihao"></slot> -->
          <el-button @click="miniShow()" type="success" :icon="!isMini?'el-icon-remove-outline':'el-icon-circle-plus-outline'"
            size="mini"></el-button>
          <!-- <span  @click="miniShow()">切换</span> -->
          <slot></slot>
        </td>
      </tr>

      <!-- <tr class="yy-descriptions-row">
        <th colspan="1" class="yy-descriptions-th">ID:</th>
        <td colspan="1" class="yy-descriptions-td" style="width:120px">{{id}}</td>
        <th colspan="1" class="yy-descriptions-th">题号:</th>
        <td colspan="1" class="yy-descriptions-td" style="width:120px">{{tihao+1?'第'+(tihao+1)+'题':null}}</td>
        <th colspan="1" class="yy-descriptions-th">难度:</th>
        <td colspan="1" class="yy-descriptions-td">{{'★'.repeat(nandu)}}</td>

      </tr> -->
      <tr class="yy-descriptions-row">
      </tr>
      <tr class="yy-descriptions-row">
        <th colspan="1" class="yy-descriptions-th">题目:</th>
        <td colspan="12" class="yy-descriptions-td">
          <div v-katex="showTimuStr()" class="timu"></div>
          <el-image style="width:35%;" :src="timupicfilePath_computed" fit="fill" @error="imageLoad('error')"
            @load="imageLoad('success')" v-show="imageshow"></el-image>
        </td>
      </tr>

      <tr class="yy-descriptions-row" v-show="!isMini">
        <th colspan="1" class="yy-descriptions-th">答案:</th>
        <td colspan="12" class="yy-descriptions-td">
          <div v-katex="daan2===null?'':daan2"  class="daan2"></div>
        </td>
      </tr>
      <tr class="yy-descriptions-row" v-show="!isMini">
        <th colspan="1" class="yy-descriptions-th">解析</th>
        <td colspan="12" class="yy-descriptions-td">
          <div v-katex="jiexi===null?'':jiexi"   class="daan2"></div>
        </td>
      </tr>
      <tr class="yy-descriptions-row" v-show="!isMini">
        <th colspan="1" class="yy-descriptions-th">备注:</th>
        <td colspan="12" class="yy-descriptions-td">
          <div>{{beizhu}}</div>
        </td>

      </tr>
      <tr class="yy-descriptions-row" v-show="!isMini">
        <th colspan="1" class="yy-descriptions-th">来源:</th>
        <td colspan="12" class="yy-descriptions-td">{{laiyuan}}</td>
      </tr>
      <tr class="yy-descriptions-row" v-show="!isMini">

        <th colspan="1" class="yy-descriptions-th">答案:</th>
        <td colspan="12" class="yy-descriptions-td-daan1">
          <div v-katex="daan1===null?'':daan1"></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import config from '../../extraResources/config.json'
export default {
  name: "yytitledescription_search",
  //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
  props: {
    isShowMini: {       // 是否迷你显示
      type: Boolean,
      default: true
    },
    id: {
      type: Number
    },
    tihao: {
      type: Number
    },
    timu: {
      type: String, //name的类型是字符串
      // required: true, //name是必要的
    },
    xuanxiang: {
      type: Array
    },
    beizhu: {       // 备注
      type: String
    },
    daan1: {
      type: String,
    },
    daan2: {
      type: String,
    },
    jiexi: {
      type: String,
    },
    laiyuan: {
      type: String,
    },
    nandu: {
      type: Number,
    },
    biaoqian: {
      type: Array,
    },
    fenlei: {
      type: Array,
    },
    daan2picfilename: {
      type: String,
    },
    timupicfilename: {
      type: String,
    },
    jiexipicfilename: {
      type: String,
    },
  },
  data() {
    return {
      isMini: true,
      imageshow: true
    }

  },
  computed: {
    // 当前
    timupicfilePath_computed() {
      // `this` 指向 vm 实例
      return config.imagesPath + '/' + this.timupicfilename + '.jpg';
    }
  },
  methods: {

    imageLoad(v) {
      if (v == 'success') {
        this.imageshow = true;
      } else {
        this.imageshow = false;
      }
    },
    showTimuStr() {
      var timu = this.timu === null ? '' : this.timu;
      var xuanxiang0 = this.xuanxiang[0] == false ? '' : '$\\\\$A. ' + this.xuanxiang[0];
      var xuanxiang1 = this.xuanxiang[1] == false ? '' : '$\\\\$B. ' + this.xuanxiang[1];
      var xuanxiang2 = this.xuanxiang[2] == false ? '' : '$\\\\$C. ' + this.xuanxiang[2];
      var xuanxiang3 = this.xuanxiang[3] == false ? '' : '$\\\\$D. ' + this.xuanxiang[3];

      return timu + xuanxiang0 + xuanxiang1 + xuanxiang2 + xuanxiang3;
    },
    miniShowHeaderRight() {
      if (this.isMini) {
        // if (this.id !== null && this.id !== undefined) {
        //   return "难度:" + '★'.repeat(this.nandu) + " ID:" + this.id;
        // } else {
        return '★'.repeat(this.nandu);
        // }
      }
    },

    miniShow() {
      this.isMini = !this.isMini;
    }
  },
  mounted() {
    this.isMini = this.isShowMini;
  },
};
</script>
<style scoped>
.yy-descriptions-table {
  line-height: 1.15;
  word-break: break-all;
  font-size: 14px;
  color: #606266;
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.yy-descriptions-row {
  line-height: 1.15;
  word-break: break-all;
  font-size: 14px;
  color: #606266;
  border-collapse: collapse;
}
.yy-descriptions-th {
  /* 自己修改的 */
  width: 55px;
  /*******************************/
  word-break: break-all;
  border-collapse: collapse;
  color: #909399;
  background: #fafafa;
  box-sizing: border-box;
  text-align: center;
  font-weight: 400;
  line-height: 1.5;
  border: 1px solid #ebeef5;
  /* 自己修改的 */
  padding: 10px;
  /*******************************/
}
.yy-descriptions-td {
  word-break: break-all;
  /* color: #606266; */
  border-collapse: collapse;
  box-sizing: border-box;
  text-align: left;
  /* font-weight: 400; */
  border: 1px solid #ebeef5;
  padding: 5px;
  /* 自己修改的 */
  /* width: 27%; */
  line-height: 2;
  font-weight: normal;
  cursor: text;
  color: black;
   letter-spacing: 0.5px;

  /*******************************/
}
/* 答案1 */
.yy-descriptions-td-daan1 {
  width: 200px;
}
/* 标签 */
.yy-descriptions-td-biaoqian {
  width: 237px;
  color: #409eff;
}
/* 题目 */
.timu {
  color: hsl(0, 0%, 0%);
}
/* 答案2 */
.daan2{
  color: rgb(0, 0, 0);
}
</style>

