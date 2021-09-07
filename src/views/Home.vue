<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <button @click="createTable()">创建tables表格</button> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    // #region 创建tables表格
    // // 创建tables表格
    // async createTable() {
    //   // 连接数据库
    //   const Sequelize = require("sequelize");
    //   const createTable = require("../lib/models/init-models").createTable;
    //   const connect = new Sequelize({
    //     host: 'localhost',
    //     username: 'root',
    //     password: '123456',
    //     database: 'electron_math_db',
    //     dialect: 'mysql',
    //     dialectModule: require('mysql2'), // 重要,不然会出错
    //     benchmark: true
    //   })
    //   console.log("连接数据库")
    //   this.connect = connect;
    //   await createTable(connect)

    // }
    // #endregion 

  },
}
</script>
