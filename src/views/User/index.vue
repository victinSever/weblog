<template>
  <div class="userPage">
    <!-- 头部 -->
    <UserHeader :username="user.userName" @handleSearch="handleSearch" />

    <!-- 轮播图 -->
    <div class="top-bgc">
      <el-carousel height="600px" :autoplay="true" :interval="8000">
        <el-carousel-item v-for="(item, index) in bgcList" :key="index">
          <div class="item-box">
            <el-image :src="item" alt="" fit="cover"></el-image>
          </div>
          <div class="info">
            <span class="username" v-text="user.userName || '☺'"></span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="main">
      <div :class="'main-box' + (menuPlace == 'right' ? ' reverse' : '')">
        <!-- 左侧内容区 -->
        <div class="left-box">
          <!-- 首页文章显示 -->
          <div
            class="session"
            v-if="showPassageList"
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
            <UserPassageList :passageList="passageList" :keyword="keyword" v-if="passageList.length !== 0"/>

            <div class="pagination-box">
              <el-pagination
                background
                :page-size="pageMap.size"
                :current-page="pageMap.page"
                layout="prev, pager, next"
                :total="total"
                @current-change="handleChangePageNum"
                class="pagination"
              >
              </el-pagination>
            </div>
          </div>

          <router-view></router-view>
        </div>

        <!-- 右侧信息和按钮区 -->
        <div class="right-box">
          <UserControl v-if="showUserInfo" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from "@/components/user/user-header.vue";
import UserPassageList from "@/components/user/user-passage-list.vue";
import UserControl from "@/components/user/user-control.vue";
import { mapActions } from "vuex";

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
export default {
  name: "userPage",
  components: { UserHeader, UserPassageList, UserControl },
  data() {
    return {
      passageList,
      keyword: "",

      // 文章分页，默认10条
      pageMap: {
        size: 5,
        page: 1,
      },
      total: 100,
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
    showPassageList() {
      return this.$route.name === "user";
    },
    showUserInfo() {
      return this.$route.name !== "setting" && this.$route.name !== "change";
    },
    menuPlace(){
      return this.$store.state.config.config.menuPlace
    },
    bgcList(){
      return this.$store.state.config.config.backgroundImageList
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    ...mapActions("person", ["selectOwnBlog"]),

    async getData() {
      try {
        const { data: res } = await this.selectOwnBlog({
          userId: this.user.id,
          ...this.pageMap,
        });
        if (res.code == 200) {
          this.passageList = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    handleChangePageNum(page) {
      this.pageMap.page = page;
      this.getData()
    },

    // 搜索文章(此处传值给两个组件)
    handleSearch(keyword) {
      this.keyword = keyword;
      if (this.$route.name.includes("user")) return;
      this.$router.push({ name: "user" });
    },
  },
};
</script>

<style scoped lang='scss'>
.userPage {
  width: 100%;
  overflow: hidden;
}

.top-bgc {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: -5;
  // overflow: hidden;

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

.top-bgc::after {
  content: "";
  width: 150vw;
  height: 250px;
  border-radius: 50%;
  position: absolute;
  left: -75vw;
  bottom: -10rem;
  background-color: var(--white-a3);
  z-index: 2;
  animation: move1 18s linear infinite;
}

.main {
  position: relative;
  margin-top: calc(600px - 4rem);
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: 5;
  padding-top: 3rem;

  .main-box {
    width: 93rem;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .left-box {

      width: calc(100% - 24rem);
      box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
      padding: 0 2rem;
      min-height: 75vh;
    }

    .right-box {
      position: sticky;
      top: 0rem;
      width: 20rem;
      z-index: 30;
    }
  }

  .reverse{
    flex-direction: row-reverse;
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
  background-color: var(--white-a1);
  z-index: -2;
  animation: move1 12s linear infinite;
}

.main::after {
  content: "";
  width: 90vw;
  height: 280px;
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: 40vw;
  background-color: var(--white-a2);
  z-index: -2;
  animation: move1 15s linear infinite;
}

@media screen and (max-width: 1500px) {
  .main .main-box {
    width: 95%;
  }
}

@media screen and (max-width: 1300px) {
  .main .main-box {
    .left-box {
      width: 100%;
      float: none;
    }

    .right-box {
      display: none;
    }
  }
}
</style>