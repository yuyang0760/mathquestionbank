<template>
  <div>
    <el-cascader-panel class="el-cascader-panel" :options="options" v-model="value" @change="handleChange"></el-cascader-panel>
  </div>
</template>

<script>
import leixingjson from '../lib/models/fenlei-json'
export default {
  name: "Home",
  data() {
    return {
      value: [],
      options: leixingjson
    }

  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style>
 
.el-cascader-menu__wrap{
  height: 400px;
}
</style>
