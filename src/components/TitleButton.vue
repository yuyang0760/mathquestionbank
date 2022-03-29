<template>
  <div style="display: flex;  width: 138px; height:30px">
    <div class="titlebtn el-icon-minus" @click="click('min')"></div>
    <div class="titlebtn el-icon-plus" @click="click('max')"></div>
    <div class="titlebtn el-icon-close" @click="click('close')"></div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'TitleButton',
  props: [],
  computed: {
  },
  methods: {
    click(typeStr) {
      // min max close
      // console.log(`你点击了${typeStr}`)
      ipcRenderer.send(typeStr);
    }
  }
}
</script>
    
<style scoped>
.titlebtn {
  display: flex;
  width: 46px;
  height: 100%;
  align-items: center; /* 上下居中*/
  justify-content: center; /* 左右居中*/
  background-color: rgb(255, 255, 255);
}
.titlebtn:hover {
  background-color: rgb(208, 199, 216);
  cursor: default;
}
</style>
