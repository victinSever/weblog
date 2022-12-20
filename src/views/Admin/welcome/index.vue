<template>
  <div class="welcome">
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎</el-breadcrumb-item>
    </el-breadcrumb>

    <!---->
    <el-row :gutter="20">
      <el-col :span="13">
        <el-card class="userInfo">
          <div class="userInfo-top">
            <span>管理员信息</span>
            <el-button
              type="primary"
              class="el-icon-s-custom"
              size="mini"
              plain
              @click="openUserCenter"
              >用户中心</el-button
            >
            <el-button
              type="primary"
              class="el-icon-share"
              size="mini"
              plain
              @click="getCode"
              >获取源码</el-button
            >
          </div>
          <el-divider></el-divider>
          <div class="userInfo-bottom">
            <el-image
              style="width: 80px; height: 80px"
              :src="user.headshot || '#'"
            ></el-image>
            <el-table
              :data="tableInfo"
              align="center"              
              border
            >
              <el-table-column
                prop="phone"
                align="center"
                label="管理员账号"
                
              ></el-table-column>
              <el-table-column
                prop="userName"
                align="center"
                label="管理员昵称"
              ></el-table-column>
              <el-table-column prop="role" align="center" label="管理员等级"></el-table-column>
            </el-table>
          </div>
        </el-card>

        <!--用户登录报表-->
        <el-card class="userEcharts">
          <div
            id="loginReport"
            style="width: 600px; height: 250px; margin: 10px auto"
          ></div>
        </el-card>
      </el-col>

      <!-- 日历 -->
      <el-col :span="11">
        <el-card class="rili">
          <el-calendar v-model="rili"></el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  name: "Welcome",
  data() {
    return {
      userInfo: [],
      tableInfo: [],
      rili: new Date()
    };
  },
  computed: {
    user() {
      return this.$store.state.user.token ? this.$store.state.user.userInfo : false
    }
  },
  mounted() {
    this.tableInfo.push(this.user)
  },
  methods: {
    
    //获取源码
    getCode() {
      let win = window.open("", "", "");
      win.document.write(document.documentElement.outerText);
      win.document.title = "页面文本";
      win.focus();
    },

    //用户中心
    openUserCenter() {
      this.$message.warning("暂时未开放用户个人模块！");
    },
  
  },
};
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 15px;
}

.userInfo-top {
  span {
    float: left;
  }

  .el-button {
    float: right;
    margin-right: 10px;
  }
}
.userInfo-top {
  overflow: hidden;
}

.userInfo-bottom {
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-table {
    margin-left: 50px;
    border-radius: 10px;
  }
}
.grid-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.grid-content div {
  font-size: 12px;
  margin-top: 10px;
}
.materMan {
  margin-top: 15px;


  .el-col:hover {
    background-color: aliceblue;
  }
}

.is-selected {
  color: #1989fa;
}

</style>