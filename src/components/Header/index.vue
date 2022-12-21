<template>
  <div>
    <!-- 头部 -->
    <el-row class="header" v-if="isHidden">
      <el-row class="header-top">
        <div class="header-top-in">
          <div class="header-top-left">
            <div class="header-logo" @click="handleGotoHome">
              <el-image
                :src="require('@/assets/image/logo_weblog.png') || '#'"
                alt=""
              ></el-image>
            </div>
              <el-input
                class="user-input"
                size="medium"
                placeholder="输入博客标题、描述的关键词"
                v-model="keyword"
                @keyup.enter.native="handleSearch"
              >
                <div
                  slot="prefix"
                  class="iconfont icon-search"
                  @click="handleSearch"
                ></div
              ></el-input>
          </div>
          <div class="header-top-right">
              <el-button
                class="user-create"
                type="primary"
                size="medium"
                icon="el-icon-user-solid"
                @click="gotoEditor"
                >去创作</el-button
              >
            <el-button
              class="user-message"
              icon="el-icon-bell"
              circle
              v-if="user"
              @click="handleClickMessage"
            ></el-button>

            <el-popover
              placement="bottom-end"
              width="250"
              trigger="click"
              v-if="user"
            >
              <BaseInfo />
              <div class="user-img" slot="reference">
                <img v-if="user.headshot" :src="user.headshot || '#'" />
              </div>
            </el-popover>
            <el-button
              type="primary"
              plain
              size="medium"
              class="user-login-register"
              @click="$router.push({ name: 'login' })"
              v-else
            >
              <span>登录</span>
              <span>|</span>
              <span>注册</span>
            </el-button>
          </div>
        </div>
      </el-row>
    </el-row>
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
      messageNum: 1,
      keyword: "",
      inputOpen: false,
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user
      return user.token ? user.userInfo : false
    },
    // 是否隐藏头部
    isHidden() {
      return !this.$route.meta.hiddenHeader;
    },
  },
  methods: {
    handleGotoHome() {
      if(this.$route.name == 'passage') return
      this.$router.push({name: 'passage'})
    },

    // 点击消息事件
    handleClickMessage() {
      this.$message.success('敬请期待！');
    },
    // 搜索事件-
    handleSearch() {
      const keyword = this.keyword.trim();
      const { query } = this.$route;
      if (query.key === keyword || !keyword) return; //节流

      this.$router.push(`/search?key=${keyword}`)
    },

    gotoEditor: function () {
      if (!this.user) {
        this.handleLogin();
        return;
      }
      this.$router.push('/user/content/drafts');
    },
    // 点击登录按钮
    handleLogin() {
      window.open(this.$router.resolve({name: "login"}).href, "_blank");
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
  height: 4rem;
  background-color: var(--bgc-2);
  min-width: 700px;

  .header-top {
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--bgc-1);
  }

  .header-top-in {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 70%;
    margin: 0 auto;
  }

  .header-top-left {
    display: flex;
    align-items: center;
    height: 100%;

    .header-logo {
      margin-right: 2rem;
      font-family: "华文行楷";
      color: var(--bgc-clr2);
      font-size: 40px;
      cursor: pointer;
      transition: 0.4s;
      display: flex;
      align-items: center;

      .el-image {
        height: 3rem;
        width: 8rem;
      }
    }

    .header-logo:hover {
      transform: translateX(5px);
    }

    .icon-search {
      font-size: 1.5rem;
    }

    .user-input {
      transition: 0.4s;
      width: 18rem;

      /deep/input {
        border-radius: 1rem;
        padding-left: 3rem;
      }

      .icon-search {
        font-size: 1.5rem;
        padding: 0 0.25rem;
        height: 100%;
        text-align: center;
        transform: translateY(0.33rem);
        cursor: pointer;
      }

      .icon-search:hover {
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

    .user-create {
      background-color: var(--bgc-clr2);
      border: none;
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

      border: 1px solid var(--bgc-clr5);
      cursor: pointer;
    }

    .user-img img:hover {
      transform: scale(130%);
    }

    .user-login-register {
      display: flex;
      align-items: center;
      background-color: var(--bgc-clr2);
      color: var(--bgc-1);
      
      span:nth-child(2) {
        margin: 5px;
      }
    }
  }
}


@media screen and (max-width: 1350px) {
  .header .header-top-in{
    width: 90%;
  }
}

@media screen and (max-width: 850px) {
  .header .header-top-in{
    width: 95%;
  }
  .header .header-top-left {
    .header-logo {
     margin-right: 1rem;
    }
  }
  .header .header-top-right {
    .user-create,
    .user-message {
      display: none;
    }
  }
}
</style>