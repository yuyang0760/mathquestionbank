<template>
  <div>
    <!-- <el-button @click="connectDbButtonsqlite3">创建数据库表</el-button> -->
  </div>
</template>

<script>
import config from '/extraResources/config.json'

export default {
  name: "Home",
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    // 创建数据库表
    async connectDbButtonsqlite3() {
      const { Sequelize, Op, Model, DataTypes } = require("sequelize");
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: config.mathdbPath,
        dialectModule: require("sqlite3")
      });
      var create = require("../tools/init-models").createTable;
      create(sequelize);
    },
  }
};
</script>
<style>
</style>
