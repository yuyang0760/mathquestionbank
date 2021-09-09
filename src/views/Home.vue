<template>
  <div>
    <yytitledescription :timu="timu" :laiyuan="laiyuan" :jiexi="jiexi" :daan1="daan1" :daan2="daan2" :nandu="nandu" :fenlei="fenlei"
      :biaoqian="biaoqian"></yytitledescription>
  </div>
</template>

<script>
import yytitledescription from '../components/yytitledescription.vue'
export default {
  name: "Home",
  components: {
    yytitledescription
  },
  data() {
    return {
      laiyuan: "这里是来源",
      timu: "这里是题目$a^2 \\\\ aaa$ $\\\\$ ",
      jiexi: "这里是解析$a^2$",
      daan1: "这里是答案1$a^2$",
      daan2: "这里是答案2$a^2$",
      nandu: 5,
      fenlei: ['函数', '导数', '二次函数'],
      biaoqian: ['标签1', '标签2', '标签3']
    }
  },
  methods: {

  }
};
</script>
<style>
</style>
