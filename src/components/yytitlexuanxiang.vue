<template>
  <div>
    <table class="yy-descriptions-table">
      <tr class="yy-descriptions-row">
        <th colspan="1" class="yy-descriptions-th">A:</th>
        <td colspan="1" class="yy-descriptions-td">
          <el-input v-model="xuanxiang[0]"></el-input>
        </td>
      </tr>
      <tr class="yy-descriptions-row">
        <th colspan="1" class="yy-descriptions-th">B:</th>
        <td colspan="1" class="yy-descriptions-td">
          <el-input v-model="xuanxiang[1]"></el-input>
        </td>
      </tr>
      <tr class="yy-descriptions-row">
        <th colspan="1" class="yy-descriptions-th">C:</th>
        <td colspan="1" class="yy-descriptions-td">
          <el-input v-model="xuanxiang[2]">1</el-input>
        </td>
      </tr>
      <tr class="yy-descriptions-row">
        <th colspan="1" class="yy-descriptions-th">D:</th>
        <td colspan="1" class="yy-descriptions-td">
          <el-input v-model="xuanxiang[3]">2</el-input>
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  name: "yytitlexuanxiang",
  //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
  props: {
    xuanxiang: {
      type: Array
    },
  },
  data() {
    return {
    }

  },
  methods: {
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
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
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
  width: 10px;
  /*******************************/
  word-break: break-all;
  font-size: 14px;
  border-collapse: collapse;
  color: #909399;
  /* background: #fafafa; */
  box-sizing: border-box;
  text-align: center;
  font-weight: 400;
  line-height: 1.5;
  /* border: 1px solid #ebeef5; */
  /* 自己修改的 */
  padding: 5px;
  /*******************************/
}
.yy-descriptions-td {
  word-break: break-all;
  font-size: 14px;
  /* color: #606266; */
  border-collapse: collapse;
  box-sizing: border-box;
  text-align: left;
  /* font-weight: 400; */
  line-height: 1.5;
  /* border: 1px solid #ebeef5; */
  padding: 5px;
  /* 自己修改的 */
  /* width: 27%; */
  font-weight: bold;
  color: #409eff;
  cursor: text;

  /*******************************/
}
</style>

