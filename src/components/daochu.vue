<template>
  <div>
    <table width="100%" class="yy-descriptions-table">
      <tr class="yy-descriptions-row">
        <th class="yy-descriptions-th">题目前:</th>
        <td colspan="5" class="yy-descriptions-td">
          <el-input v-model="timuqian" placeholder="请输入题目前缀"></el-input>
        </td>
        <th class="yy-descriptions-th">题目后:</th>
        <td colspan="5" class="yy-descriptions-td">
          <el-input v-model="timuhou" placeholder="请输入题目后缀"></el-input>
        </td>
      </tr>
      <tr class="yy-descriptions-row">
        <th class="yy-descriptions-th">答案前:</th>
        <td colspan="5" class="yy-descriptions-td">
          <el-input v-model="daanqian" placeholder="请输入答案前缀"></el-input>
        </td>
        <th class="yy-descriptions-th">答案后:</th>
        <td colspan="5" class="yy-descriptions-td">
          <el-input v-model="daanhou" placeholder="请输入答案后缀"></el-input>
        </td>
      </tr>
      <tr class="yy-descriptions-row">
        <th class="yy-descriptions-th">解析前:</th>
        <td colspan="5" class="yy-descriptions-td">
          <el-input v-model="jiexiqian" placeholder="请输入解析前缀"></el-input>
        </td>
        <th class="yy-descriptions-th">解析后:</th>
        <td colspan="5" class="yy-descriptions-td">
          <el-input v-model="jiexihou" placeholder="请输入解析后缀"></el-input>

        </td>
      </tr>
    </table>
    <el-button  type="success" size="small"  @click="daochutimu">导出题目</el-button>
  </div>
</template>

<script>
export default {
  name: "daochu",
  props: {
    timulist: {
      type: Array
    }
  },
  data() {
    return {
      timuqian: '',
      timuhou: '',
      daanqian: '',
      daanhou: '',
      jiexiqian: '',
      jiexihou: '',
    }

  },
  computed: {

  },
  methods: {
    daochutimu() {
    //   console.log(this.timulist);
      let outstr = '';
      // 导出过程,再优化
      for (let index = 0; index < this.timulist.length; index++) {
        const timu = this.timulist[index];
        outstr +='\r\n'+ timu.id + '\r\n' + timu.timu + '\r\n' + timu.daan2+'\r\n';
      }
      // 触发事件
      this.$emit('daochustr', outstr);
    }

  },
  mounted() {
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
  width: 68px;
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
  font-size: 15px;

  /*******************************/
}
</style>

