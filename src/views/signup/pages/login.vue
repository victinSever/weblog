<template>
  <!-- 账密登录 -->
  <el-form :model="passForm" status-icon size="medium" ref="passForm">
    <el-form-item>
      <div class="header">
        <el-image :src="require('@/assets/image/logo.png')" alt=""></el-image>
        <span class="tip">登录</span>
      </div>
    </el-form-item>

    <el-form-item prop="username">
      <el-input
        type="text"
        v-model="passForm.username"
        autocomplete="off"
        placeholder="请输入用户名/手机号"
        ref="inputUsername"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="passForm.password"
        autocomplete="off"
        placeholder="请输入密码"
        ref="inputPassword"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()" style="width: 100%"
        >登录</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-link
        :underline="false"
        type="primary"
        @click="$message.warning('暂未上线该功能！')"
        >手机登录</el-link
      >
      <el-link
        :underline="false"
        type="primary"
        style="float: right"
        @click="$router.push({ name: 'reback' })"
        >忘记密码</el-link
      >
    </el-form-item>

    <el-form-item style="display: flex; justify-content: space-around">
      <el-button circle type="danger" class="icon iconfont icon-weibo" @click="$message.warning('暂未上线该功能！')"> </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      passForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations("user", ["UpdateUserInfo", "UpdateToken"]),

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 请求：账密登录，并处理信息
    async loginByPass() {
      // this.passForm.ip = this.ip;
      // const { data: res } = await this.getLoginByPass(this.passForm);
      // if (res.code === 200) {
      //   this.$message.success("登录成功！");
      //   this.UpdateUserInfo(res.data);
      //   this.UpdateToken(res.data.token);
      //   this.$emit("closeDialog");
      //   this.resetForm('passForm')
      // }
      // else this.$message.warning(res.msg);
      this.$message.success("登录成功！");
      this.UpdateToken("123");
      this.UpdateUserInfo({
        userImage:
          "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
        username: "狂徒张三",
        userLevel: 7,
        phone: "15730363265",
      });
      this.resetForm("passForm");
      this.$router.push("/user");
    },
    submitForm() {
      if (this.passForm.username === "") {
        this.$notify({
          message: "请输入用户名",
          type: "warning",
          duration: 2000,
        });
        this.$refs.inputUsername.focus();
        return;
      }
      if (this.passForm.password === "") {
        this.$notify({
          message: "请输入密码",
          type: "warning",
          duration: 2000,
        });
        this.$refs.inputPassword.focus();
        return;
      }
      this.loginByPass();
    },
  },
};
</script>

<style scoped lang='scss'>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-image {
    height: 5rem;
  }

  .tip {
    font-family: qiantu;
    font-size: 1.5rem;
  }
  margin-bottom: 1rem;
}
/deep/.el-input {
  border-radius: 1rem;
  height: 2.5rem;
  font-size: 1.2rem;

  input {
    height: 100%;
    border-radius: 0.5rem;
  }
}

.el-button {
  height: 3rem;
  font-size: 1.2rem;
}

.icon {
  height: 3rem;
  width: 3rem;
}
</style>