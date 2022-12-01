<template>
  <div class="userPage">
    <div class="header">
      <div class="header-center">
        <div class="center-left">
          <span class="username" v-text="user.username || '☺'"></span>
          <div class="menu">
            <span
              class="menu-item iconfont icon-coursera"
              @click="$router.push({ name: 'passage' })"
              >&nbsp;博客大厅</span
            >
            <span class="menu-item iconfont icon-home" @click="gotoUserHome"
              >&nbsp;首页</span
            >
            <span class="menu-item iconfont icon-aboutshare">&nbsp;关于</span>
          </div>
        </div>
        <div class="center-right">
          <span class="icon iconfont icon-search"></span>
          <span class="icon iconfont icon-setting" @click="gotoSetting"></span>
        </div>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="top-bgc">
      <el-carousel height="600px" :autoplay="true" :interval="8000">
        <el-carousel-item v-for="(item, index) in bgcList" :key="index">
          <div class="item-box">
            <el-image :src="item.imageUrl" alt="" fit="cover"></el-image>
          </div>
          <div class="info">
            <span class="username" v-text="user.username || '☺'"></span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="main">
      <div class="model">
        <div class="main-box">
          <!-- 左侧内容区 -->
          <div class="left-box">
            <!-- 首页文章显示 -->
            <div
              class="session"
              v-if="passageList.length !== 0 && showPassageList"
            >
              <el-divider content-position="center">
                <span
                  class="session-title"
                  style="
                    color: var(--bgc-clr6);
                    font-size: 2em;
                    font-weight: bold;
                  "
                  >文章列表</span
                >
              </el-divider>
              <UserPassageItem :passageList="passageList" />
            </div>

            <router-view></router-view>
          </div>

          <!-- 右侧信息和按钮区 -->
          <div class="right-box" v-if="showUserInfo">
            <div class="userInfo">
              <!-- 头像 -->
              <div class="userImage" @click="gotoChangeInfo">
                <el-image
                  v-if="user.userImage"
                  :src="user.userImage"
                  alt=""
                ></el-image>
                <el-image
                  v-else
                  src="https://tva2.sinaimg.cn/large/008cs7isly8h88i9ec08sj30u00u379u.jpg"
                  alt=""
                ></el-image>
                <span class="icon person-change iconfont icon-setting"></span>
              </div>

              <div class="username">
                <span v-text="user.username || '☺'"></span>
              </div>
            </div>

            <!-- 链接 -->
            <div class="userLink"></div>

            <!-- 创作按钮 -->
            <div class="btn-edit" @click="gotoEdit">
              <div class="btn-box"><button v-text="'写文章'"></button></div>
            </div>

            <!-- 菜单 -->
            <div class="userMenu">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPassageItem from "@/components/user/user-passage-list.vue";
import UserMenu from "@/components/user/user-menu.vue";
import { getUUID } from "@/utils/index";

export default {
  name: "userPage",
  components: { UserPassageItem, UserMenu },
  data() {
    const bgcList = [
      {
        imageUrl: require("@/assets/image/user-bgc/1.png"),
      },
      {
        imageUrl: require("@/assets/image/user-bgc/2.png"),
      },
      {
        imageUrl: require("@/assets/image/user-bgc/3.png"),
      },
    ];
    const passageList = [
      {
        id: "12",
        username: "暴徒张三",
        userImage: "",
        publishImage: require("@/assets/image/user-bgc/1.png"),
        publishTime: "2022-11-12 20:20:20",
        title: "测试标题",
        content:
          "测试内容dfuikghdfsugn  uds tios ofyuosdh ld utiaseru gbdxhgh  fsfhdfhsd bfb sfd hfdfb hgbug fbffuy gfuiagfparo goghjdf.g hdfgefdgdf jgdf jdf  ibguef gfdgfghuijfdgu gbfdigbrdfgbfgh byugygy er gbbgyre yugbyrege",
        view: 12,
        dianzan: 52,
        comment: 20,
      },
      {
        id: "212",
        username: "暴徒张三",
        userImage: "",
        publishImage: require("@/assets/image/user-bgc/1.png"),
        publishTime: "2022-11-12 20:20:20",
        title: "测试标题",
        content: "测试内容",
        view: 12,
        dianzan: 52,
        comment: 20,
      },
      {
        id: "21654632",
        username: "暴徒张三",
        userImage: "",
        // publishImage: require("@/assets/image/user-bgc/1.png"),
        publishTime: "2022-11-12 20:20:20",
        title: "测试标题",
        content:
          "测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，测试内容信息很长放不下怎么办，",
        view: 12,
        dianzan: 52,
        comment: 20,
      },
      {
        id: "123214",
        username: "暴徒张三",
        userImage: "",
        publishImage: require("@/assets/image/user-bgc/1.png"),
        publishTime: "2022-11-12 20:20:20",
        title: "测试标题",
        content: "测试内容",
        view: 12,
        dianzan: 52,
        comment: 20,
      },
      {
        id: "5345",
        username: "暴徒张三",
        userImage: "",
        publishImage: require("@/assets/image/user-bgc/1.png"),
        publishTime: "2022-11-12 20:20:20",
        title: "测试标题",
        content: "测试内容",
        view: 12,
        dianzan: 52,
        comment: 20,
      },
    ];
    return {
      bgcList,
      passageList,
    };
  },
  computed: {
    user() {
      return JSON.parse(sessionStorage.getItem("userInfo")) || {};
    },
    showPassageList() {
      return this.$route.name === "user";
    },
    showUserInfo() {
      return this.$route.name !== "setting";
    },
  },
  methods: {
    // 前往写作页面
    gotoEdit() {
      let routeData = this.$router.resolve({
        name: "editor",
        params: { id: getUUID() },
      });
      window.open(routeData.href, "_blank");
    },
    gotoSetting() {
      if (this.$route.name === "setting") return;
      this.$router.push({ name: "setting" });
    },
    gotoUserHome() {
      if (this.$route.name === "user") return;
      this.$router.push({ name: "user" });
    },
    gotoChangeInfo() {
      if (this.$route.name === "change") return;
      this.$router.push({ name: "change" });
    },
  },
};
</script>

<style scoped lang='scss'>
.userPage {
  width: 100%;
  overflow: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  height: 4rem;
  width: 100%;
  background-color: transparent;

  .header-center {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;

    .center-left {
      display: flex;
      align-items: center;

      .username {
        font-size: 1.5rem;
        margin-right: 2rem;
        cursor: pointer;
      }

      .menu {
        .menu-item {
          font-size: 1.2rem;
          margin-right: 1.5rem;
          padding-left: 0.2rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid transparent;
          transition: 0.4s;
          cursor: pointer;
        }

        .menu-item:hover {
          border-bottom: 1px solid #fff;
        }
      }
    }

    .center-right {
      display: flex;
      align-items: center;

      .icon {
        font-size: 1.6rem;
        cursor: pointer;
        margin-left: 1rem;
      }

      .icon-setting {
        font-size: 2rem;
      }
    }
  }
}

.top-bgc {
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 2;

  .item-box {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
      animation: skewBgc 8s linear infinite;
    }
  }

  .info {
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-8vw);
    top: 300px;
    color: #fff;
    font-size: 4rem;
  }
}

.top-bgc::before {
  content: "";
  width: 150vw;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  bottom: -200px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 15;
  animation: move1 10s linear infinite;
}

.top-bgc::after {
  content: "";
  width: 150vw;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  left: 75vw;
  bottom: -200px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 15;
  animation: move2 15s linear infinite;
}

@keyframes skewBgc {
  0% {
    transform: scale(100%);
  }

  100% {
    transform: scale(130%);
  }
}

@keyframes move1 {
  0% {
    transform: translateX(0vw);
  }
  100% {
    transform: translateX(50vw);
  }
}

@keyframes move2 {
  0% {
    transform: translateX(-50vw);
  }
  100% {
    transform: translateX(100vw);
  }
}

.main {
  position: relative;
  margin-top: calc(600px - 4rem);
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: 3;
  padding-top: 3rem;

  .model {
    width: 100%;
    background-color: #fff;
    .main-box {
      width: 70%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .left-box {
        width: 75%;
      }

      .right-box {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > div {
          margin-bottom: 1rem;
        }

        .userInfo {
          display: flex;
          align-items: center;
          flex-direction: column;

          .username {
            font-size: 1.5rem;
            margin-top: 1rem;
          }
        }

        .userImage {
          width: 9rem;
          height: 9rem;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          position: relative;       

          .el-image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transition: 0.8s;
          }

          .person-change {
            transition: all 0.8s ease-in-out 0s;
            position: absolute;
            bottom: -1.5rem;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .userImage:hover {
          .el-image {
            transform: scale(120%) rotate(360deg);
            filter: blur(5px);
          }

          .person-change {
            font-size: 3rem;
            bottom: 0;
            color: #fff;
          }
        }

        .btn-edit {
          height: 3rem;
          width: 10rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          border-radius: 1rem;

          .btn-box {
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            display: flex;
            align-items: center;

            button {
              display: block;
              width: calc(100% - 4px);
              height: calc(100% - 4px);
              background: linear-gradient(
                90deg,
                var(--bgc-clr2),
                var(--bgc-clr1)
              );
              z-index: 21;
              border: none;
              color: #fff;
              font-size: 1.2rem;
              border-radius: 1rem;
              cursor: pointer;
              transition: all 0.4s ease-in-out 0s;
            }
          }
        }

        .btn-edit:hover {
          box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--pink-1);
          button {
            background: linear-gradient(90deg, var(--pink-1), var(--pink-2));
          }

          .btn-box::before {
            content: "";
            width: 100%;
            height: 100%;
            background: var(--pink-1);
            position: absolute;
            top: 50%;
            left: -50%;
            z-index: 5;
            animation: myAnimate 4s linear infinite;
            transform-origin: top right;
          }

          .btn-box::after {
            content: "";
            width: 100%;
            height: 100%;
            background: var(--pink-1);
            position: absolute;
            top: -50%;
            left: 50%;
            z-index: 5;
            animation: myAnimate 4s linear infinite;
            transform-origin: bottom left;
          }
        }
      }
    }
  }
}

.main::before {
  content: "";
  width: 130vw;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: -50vw;
  background-color: rgba(255, 255, 255, 1);
  z-index: -2;
  animation: move1 15s linear infinite;
}

.main::after {
  content: "";
  width: 100vw;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: 40vw;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: -2;
  animation: move1 15s linear infinite;
}

@keyframes myAnimate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>