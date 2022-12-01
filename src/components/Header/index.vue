<template>
  <div>
    <!-- 头部 -->
    <el-row
      class="header"
      v-if="isHidden"
    >
      <el-row class="header-top">
        <el-col :span="18" :offset="3" class="header-top-in">
          <div class="header-top-left">
            <div class="header-logo">
              <el-image :src="require('@/assets/image/logo_weblog.png')" alt=""></el-image>
            </div>
            <transition name="el-fade-in-linear">
              <el-input
                :class="'user-input' + (isInputFocus ? ' focus' : '')"
                v-model="keyword"
                size="medium"
                placeholder="检索法律信息"
                @focus="isInputFocus = true"
                @blur="isInputFocus = false"
                @keyup.enter.native="searchHandler"
              >
                <div
                  slot="suffix"
                  class="user-input-suffix el-icon-search"
                  @click="searchHandler"
                ></div
              ></el-input>
            </transition>
          </div>
          <div class="header-top-right">
            
            <transition name="el-fade-in-linear">
              <el-button
                class="user-create"
                type="primary"
                size="medium"
                icon="el-icon-user-solid"
                @click="gotoCreator"
                >创作者中心</el-button
              >
            </transition>
            <el-button
              class="user-message"
              icon="el-icon-bell"
              circle
              v-if="isLogin"
            ></el-button>

            <el-popover
              placement="bottom-end"
              width="250"
              trigger="click"
              v-if="isLogin"
            >
              <BaseInfo />
              <div class="user-img" slot="reference">
                <img v-if="user.userImage" :src="user.userImage" />
              </div>
            </el-popover>
            <el-button
              type="primary"
              plain
              size="medium"
              class="user-login-register"
              @click="$router.push({name: 'login'})"
              v-else
            >
              <span>登录</span>
              <span>|</span>
              <span>注册</span>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-row>

    <!-- 登录 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="300px"
      :top="(loginWay === 1 ? 25 : 26) + 'vh'"
    >
      <template slot="title">
        <h3>
          {{
            loginWay === 1
              ? "账密登录"
              : loginWay === 2
              ? "手机登录"
              : "手机重置密码"
          }}
        </h3>
      </template>
      <Login
        :loginWay="loginWay"
        @closeDialog="closeDialog"
        @changeLoginWay="changeLoginWay"
      />
    </el-dialog>
  </div>
</template>

<script>
import Login from "@/components/user/user-login.vue";
import BaseInfo from "@/components/user/user-baseInfo.vue";
export default {
  name: "headerCompontent",
  components: { Login, BaseInfo },
  data() {
    return {
      url: "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
      messageNum: 1,
      keyword: "",
      dialogVisible: false, //是否显示登录组件
      loginWay: 1, //登录方式，1账密登录，2手机号登录,3重置密码
      isInputFocus: false,
    };
  },
  created() {
    // 挂载一个bus，触发登录组件的出现
    let that = this
    this.$bus.$on('handleLogin',function(type = true) {
      console.log(that.dialogVisible);
      that.dialogVisible = type;
    }) 
  },
    beforeDestroy() {
   this.$bus.$off('handleLogin');
  },
  computed: {
    //是否登录
    isLogin() {
      return JSON.parse(sessionStorage.getItem('token')) || false;
    },
    user() {
      return JSON.parse(sessionStorage.getItem('userInfo')) || {};
    },
    // 是否隐藏头部
    isHidden() {
      return !this.$route.meta.hiddenHeader
    }
  },
  methods: {
    // 搜索事件- 
    searchHandler() {
      const keyword = this.keyword.trim()
      const { query } = this.$route
      if(query.query === keyword) return //节流

      if(!keyword) return

      this.$router.push({
        path: '/search',
        query: {
          query: keyword,
          type: 0
        }
      })
    },

    gotoCreator: function() {
        if(!this.isLogin) {
          this.handleLogin()
          return
        }
        if (this.$route.path.includes('/creator')) return
        this.$router.push('/creator/home')
    },
    // 点击登录按钮
    handleLogin() {
      this.dialogVisible = true;
    },

    closeDialog() {
      this.dialogVisible = false;
    },

    //改变登录方式时，调整dialog的高度
    changeLoginWay(type) {
      this.loginWay = type;
    },
  },

};
</script>

<style scoped lang='scss'>
.header {
  width: 100%;
  height: 60px; 
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #fff;

  .header-top {
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeecec;
  }

  .header-top-in {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .header-top-left {
    display: flex;
    align-items: center;
    height: 100%;

    .header-logo {
      margin-right: 60px;
      font-family: "华文行楷";
      color: var(--bgc-clr2);
      font-size: 40px;
      cursor: pointer;
      transition: 0.4s;

      .el-image {
        height: 3rem;
      }
    }

    .header-logo:hover {
      transform: translateX(5px);
    }

        .user-input {
      border: 1px solid #dcdfe6;
      border-radius: 0.5rem;
      transition: 0.4s;
      width: 40rem;

      .el-icon-search {
        font-size: 25px;
        height: 100%;
        text-align: center;
        transform: translateY(5px);
        cursor: pointer;
      }
    }

    .user-input input:focus {
      width: 500px;
      background-color: #000;
      animation: inputFocusAnimate 1s linear 0s;
    }

    .user-input:hover {
      border: 1px solid #409eff;

      .el-icon-search {
        color: #a1a1a7;
      }
    }
  }

  .header-top-right {
    display: flex;
    align-items: center;

    .user-create,
    .user-message {
      margin-right: 20px;
    }



    .user-message {
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .user-img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        transition: 0.8s;
      }

      border: 1px solid #efefef;
      cursor: pointer;
    }

    .user-img img:hover {
      transform: scale(130%);
    }

    .user-login-register {
      display: flex;
      align-items: center;
      span:nth-child(2) {
        margin: 5px;
      }
    }
  }
}

// 聚焦的动画
@keyframes inputFocusAnimate {
  from {
    background-color: #ccc;
  }
  to {
    background-color: #777;
  }
}

@media screen and (max-width: 1500px) {
  .header .header-top-right .user-create {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .header .header-top-left {
    .header-logo {
      font-size: 30px;
      margin-right: 30px;
    }

    .header-menu {
      display: none;
    }

    .header-menus2 {
      display: inline-block;
    }

    .user-login-register {

    }
  }
}

@media screen and (max-width: 750px) {
  .header .header-top-left {
    .header-logo {
      font-size: 20px;
    }
  }
  .header .header-top-right {
    .user-input{
      width: 80%;
      // height: 25px;
    }
    
    .user-message{
      display: none;
    }
  }
}

</style>