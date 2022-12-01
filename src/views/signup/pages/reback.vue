<template>
  <!-- 账密登录 -->
  <el-form :model="restoreForm" status-icon size="medium" ref="restoreForm">
    <el-form-item>
      <div class="header">
        <el-image :src="require('@/assets/image/logo.png')" alt=""></el-image>
        <span class="tip">重置密码</span>
      </div>
    </el-form-item>

    <el-form-item prop="phone">
      <el-input
        type="text"
        v-model="restoreForm.phone"
        placeholder="请输入手机号"
        ref="inputRePhone"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        type="text"
        v-model="restoreForm.code"
        autocomplete="off"
        placeholder="请输入6位数验证码"
        ref="inputReCode"
      >
        <span
          slot="suffix"
          :class="
            'code ' + (sendCodeTime === 0 ? 'code-link' : 'code-disabled')
          "
          @click="getPhoneCode()"
        >
          {{ sendCodeTime === 0 ? "发送验证码" : sendCodeTime + "s后再次发送" }}
        </span>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="restoreForm.newPassword"
        placeholder="请输入新密码"
        ref="inputRePassword"
        show-password
        v-show="isSend"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button :class="'btn-submit ' + (restoreForm.phone ? '' : 'not-allowed')" type="primary" @click="submitForm()"
        >修改密码</el-button
      >
    </el-form-item>

    <el-form-item>
      <el-link
        :underline="false"
        type="primary"
        @click="$router.push({ name: 'login' })"
        >返回登录</el-link
      >
    </el-form-item>

  </el-form>
</template>

<script>
// import { mapMutations, mapActions } from "vuex";
import { validatePhTelNumber } from "@/utils/reg";
export default {
  name: "login",
  data() {
    return {
      restoreForm: {
        phone: "",
        code: "",
        newPassword: "",
      },
      sendCodeTime: 0, //是否在一分钟内发送过验证码,验证码发送倒计时
      isSend: false,
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 发送验证码
    async getPhoneCode() {
      if (this.sendCodeTime === 0) {
        if (!this.restoreForm.phone)
          this.$notify({
            message: "请输入手机号",
            type: "warning",
            duration: 2000,
          });

        if (!validatePhTelNumber(this.restoreForm.phone))
          return this.$notify({
            message: "手机号格式不正确",
            type: "warning",
            duration: 2000,
          });

        // const {data:res} = await this.sendPhoneCode({
        //   phone: this.restoreForm.phone,
        //   sendType
        // })
        // if(res.code !== 200) return this.$message.error(res.msg);

        this.$message.success("验证码已发送！");
        this.isSend = true;
        this.sendCodeTime = 60;
        const timer = setInterval(() => {
          this.sendCodeTime--;
          if (this.sendCodeTime === 0) clearInterval(timer);
        }, 1000);
      } else {
        this.$message.warning("操作过于频繁！");
      }
    },
    // 请求：手机重置密码
    async updateByPhone() {
      //   const { data: res } = await this.retrievePasswordByPhone(
      //     this.restoreForm
      //   );
      //   if (res.code !== 200) this.$message.error(res.msg);
      this.$message.success("重置成功！自动跳转到登录！");
      this.resetForm("restoreForm");
      setTimeout(() => {
        this.$router.push({ name: "login" });
      }, 1000);
    },
    submitForm() {
      if (!this.restoreForm.phone) {
        this.$notify({
          message: "请输入手机号",
          type: "warning",
          duration: 2000,
        });
        return this.$refs.inputRePhone.focus();
      }

      if (!validatePhTelNumber(this.restoreForm.phone)) {
        this.$notify({
          message: "手机号格式不正确",
          type: "warning",
          duration: 2000,
        });
        return this.$refs.inputRePhone.focus();
      }
      if (this.restoreForm.code === "" || this.restoreForm.code.length !== 6) {
        this.$notify({
          message:
            this.restoreForm.code === "" ? "请输入验证码" : "验证码位数不正确",
          type: "warning",
          duration: 2000,
        });
        this.$refs.inputReCode.focus();
        return;
      }
      if (
        this.restoreForm.newPassword === "" ||
        this.restoreForm.newPassword.length < 6
      ) {
        this.$notify({
          message:
            this.restoreForm.newPassword === ""
              ? "请输入新密码"
              : "密码长度不低于6位",
          type: "warning",
          duration: 2000,
        });
        this.$refs.inputRePassword.focus();
        return;
      }
      this.updateByPhone();
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


.btn-submit {
  width: 100%;
  height: 3rem;
  font-size: 1.2rem;
}

.not-allowed {
  cursor: not-allowed;
  background-color: var(--bgc-clr3);
}

.icon {
  height: 3rem;
  width: 3rem;
}

.code {
  padding: 0 5px 0 10px;
  background-color: #fff;
  z-index: 2;
  font-size: 0.8rem;
}

.code-link {
  color: #63b0ff;
  cursor: pointer;
  font-size: 0.8rem;
}

.code-link:hover {
  color: skyblue;
}

.code-disabled {
  color: #777;
  cursor: default;
}
</style>