<template>
  <div class="root">
    <div class="user-title">
      <el-image
        :src="user.headshot || '#'"
        class="title-image"
        @click="$router.push({ name: 'user' })"
      ></el-image>
      <div class="title-box">
        <span class="title">{{ user.username }}</span>
        <p>
          <span>成长等级：{{ user.ranking }}</span>
          <span class="iconfont icon-arrow-right"></span>
        </p>
      </div>
    </div>
    <div class="user-level"></div>
    <div class="user-info">
      <span>
        <span>{{ user.concernAmount || 0 }}</span>
        <span>关注</span>
      </span>
      <span>
        <span>{{ user.likedAmount || 0 }}</span>
        <span>赞过</span>
      </span>
      <span>
        <span>{{ user.collectedAmount || 0 }}</span>
        <span>收藏</span>
      </span>
    </div>
    <div class="user-menu">
      <div
        class="menu-item"
        v-for="item in menus"
        :key="item.id"
        @click="handleGoto(item)"
      >
        <span :class="'iconfont ' + item.icon">
          <span v-if="item.message !== 0" class="message"></span>
        </span>
        <span class="title">{{ item.title }}</span>
      </div>
    </div>
    <div class="user-signOut">
      <span class="setting" v-text="'个人信息'" @click="$router.push({ name: 'change' })"></span>
      <span class="signOut" @click="signOut" v-text="'退出登录'"></span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
const menus = [
  {
    icon: "icon-person",
    title: "我的主页",
    urlname: "user",
    id: 1,
    message: 0,
  },
  {
    icon: "icon-activity",
    title: "我的动态",
    urlname: "active",
    id: 2,
    message: 0,
  },
  {
    icon: "icon-coursera",
    title: "创作管理",
    urlname: "essays",
    id: 3,
    message: 2,
  },
  {
    icon: "icon-columns",
    title: "我的专栏",
    urlname: "columns",
    id: 4,
    message: 0,
  },
  {
    icon: "icon-3501shuju",
    title: "成长中心",
    urlname: "data",
    id: 5,
    message: 0,
  },
  {
    icon: "icon-setting",
    title: "主题配置",
    urlname: 'setting',
    id: 6,
    message: 0,
  },
];

export default {
  name: "userBaseInfo",
  data() {
    return {
      menus
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user
      return user.token ? user.userInfo : false
    }
  },
  methods: {
    ...mapMutations("user", ["SignOut"]),

    handleGoto(item) {
      if (this.$route.path !== item.path) {
        if (item.urlname) {
          this.$router.push({
            name: item.urlname,
          });
        }
      }
    },

    // 退出登录
    signOut() {
      let con = window.confirm(
        "确认退出吗，每个博文都是开发者辛勤劳动的结果~~"
      );
      if (con) {
        this.SignOut();
        this.$message.success("退出成功！");
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.root {
  cursor: pointer;
}
.user-title {
  display: flex;
  align-items: center;

  .title-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .title-box {
    .title {
      font-size: 16px;
    }

    p {
      margin-top: 5px;
    }

    p,
    .iconfont {
      font-size: 12px;
    }

    p:hover {
      color: rgb(141, 138, 138);
    }
  }
}

.user-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(204, 201, 201, 0.3);

  & > span {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.user-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid rgba(204, 201, 201, 0.3);

  .menu-item {
    width: 40%;
    line-height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;

    .iconfont {
      padding-left: 5px;
      font-size: 20px;
      position: relative;

      .message {
        position: absolute;
        top: 8px;
        right: 0;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: red;
        z-index: 2;
      }
    }

    .title {
      font-size: 14px;
      margin-left: 5px;
    }
  }

  .menu-item:hover {
    background-color: #eee;
  }
}

.user-signOut {
  padding-top: 10px;
  color: rgb(161, 157, 157);
  font-size: 12px;

  .signOut {
    float: right;
  }
}
</style>