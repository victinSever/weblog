<template>
  <!-- 账密登录 -->
  <el-form :model="passForm" status-icon size="medium" ref="passForm">
    <el-form-item>
      <div class="header">
        <el-image :src="require('@/assets/image/logo.png')" alt=""></el-image>
        <span class="tip">登录</span>
      </div>
    </el-form-item>

    <el-form-item prop="phone">
      <el-input
        type="text"
        v-model="passForm.phone"
        autocomplete="off"
        placeholder="请输入手机号 新手机号登录即注册"
        ref="inputphone"
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
      <div class="base">
        <el-link
        :underline="false"
        type="primary"
        @click="$message.warning('暂未上线该功能！')"
        >手机登录</el-link
      >
      <!-- <el-link  @click="$router.push({ name: 'admin' })" :underline="false" v-text="'管理员登录'" type="primary"></el-link> -->
      <el-link
        :underline="false"
        type="primary"
        @click="$router.push({ name: 'reback' })"
        >忘记密码</el-link
      >
      </div>
    </el-form-item>

    <el-form-item style="display: flex; justify-content: space-around">
      <el-button
        circle
        type="danger"
        class="icon iconfont icon-weibo"
        @click="$message.warning('暂未上线该功能！')"
      >
      </el-button>
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
        phone: "17815369295",
        password: "12345678",
      },
    };
  },
  methods: {
    ...mapMutations("user", ["UpdateUserInfo", "UpdateToken"]),
    ...mapActions("user", ["getLoginByPass"]),

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 请求：账密登录，并处理信息
    async loginByPass() {
      try {
        const { data: res } = await this.getLoginByPass(this.passForm);
        console.log(res);
        if (res.code === 200 || res.data) {
          this.$message.success("登录成功！");
          this.UpdateUserInfo(res.data.user);
          this.UpdateToken(res.data.token);
          this.resetForm("passForm");
          if(res.data.user.role === 'admin') {
            this.$router.push({name: 'admin'})
          } else
          this.$router.push({name: 'passage'})
        } else this.$message.warning(res.msg);
      } catch (e) {
        this.$message.error("抱歉，服务器跑丢了哦~~");
      }
      // this.$message.success("登录成功！");
      // this.UpdateToken("123");
      // this.UpdateUserInfo({
      //   headshot:
      //     "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
      //   userName: "狂徒张三",
      //   phone: "15730363265",
      //   email: 'victinzhong@163.com',
      //   role: 'user',
      //   id: '1'
      // });
      // this.resetForm("passForm");
      // this.$router.push({name: 'passage'})
    },
    submitForm() {
      if (this.passForm.phone === "") {
        this.$notify({
          message: "请输入用户名",
          type: "warning",
          duration: 2000,
        });
        this.$refs.inputphone.focus();
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

.base{
  display: flex;
  justify-content: space-between;
}
</style>