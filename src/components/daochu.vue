<template>
  <div>
    <div v-for="element in daochurule" :key="element.id">
      {{element.name}}:<el-input v-model="element.timuqian" placeholder="element.placeholderqian"></el-input>
      <el-input v-model="element.timuhou" placeholder="element.placeholderhou"></el-input>
    </div>
    <div>
      <el-button @click="daochutimu()" type="success">导出</el-button>
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
      daochurule: [
        { name: '题目', timuqian: '', timuhou: '', placeholderqian: '请输入题目前缀', placeholderhou: '请输入题目后缀' },
        { name: '答案', daan2qian: '', daan2hou: '', placeholderqian: '请输入答案前缀', placeholderhou: '请输入题目后缀' },
        { name: '解析', jiexiqian: '', jiexihou: '', placeholderqian: '请输入解析前缀', placeholderhou: '请输入题目后缀' }
      ],
    }

  },
  computed: {

  },
  methods: {
    daochutimu() {
      console.log('daochu.vue');
      //   //   console.log(this.timulist);
      //   let outstr = '';
      //   // 导出过程,再优化
      //   for (let index = 0; index < this.timulist.length; index++) {
      //     const timu = this.timulist[index];
      //     outstr += '\r\n' + timu.id + '\r\n' + timu.timu + '\r\n' + timu.daan2 + '\r\n';
      //   }
      //   // 触发事件
      //   //   this.$emit('daochustr', outstr);
    }

  },
  mounted() {
  },
};
</script>
<style scoped>
</style>