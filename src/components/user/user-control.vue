<template>
  <!-- 右侧信息和按钮区 -->
  <div class="control">
    <div class="userInfo">
      <!-- 头像 -->
      <div class="userImage" @click="gotoChangeInfo">
        <el-image v-if="user.headshot" :src="user.headshot || '#'" alt=""></el-image>
        <el-image
          v-else
          src="https://tva2.sinaimg.cn/large/008cs7isly8h88i9ec08sj30u00u379u.jpg"
          alt=""
        ></el-image>
        <span class="icon person-change iconfont icon-setting"></span>
      </div>

      <div class="username">
        <span v-text="user.userName || '☺'"></span>
      </div>
    </div>

    <!-- 链接 -->
    <div class="userLink" v-if="linkList && linkList.length !== 0">
      <div class="link-list">
        <div class="link-item" v-for="item in linkList" :key="item.id">
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.url"
            placement="top-end"
          >
            <span :class="'iconfont ' + item.icon" :style="'color: ' + item.color || ''" @click="gotoUrl(item.url)"></span>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- 创作按钮 -->
    <div class="btn-edit" @click="gotoEdit">
      <div class="btn-box"><button v-text="'写文章'"></button></div>
    </div>

    <!-- 菜单 -->
    <div class="userMenu">
      <UserMenu ref="userMenu" />
    </div>
  </div>
</template>

<script>
import UserMenu from "@/components/user/user-menu.vue";

const linkList = [
  { id: "0", label: "github", url: "https://github.com/victinSever", icon: "icon-github-fill", color: '#161b22' },
  { id: "1", label: "gitee", url: "https://gitee.com/victin", icon: "icon-gitee-fill-round", color: '#c71d23' },
  { id: "2", label: "csdn", url: "https://blog.csdn.net/qq_54353631?spm=1000.2115.3001.5343", icon: "icon-csdn", color: '#fc5531' },
  { id: "3", label: "blog", url: "https://victinzhong.asia", icon: "icon-blog" },
  { id: "4", label: "weibo", url: "#", icon: "icon-weibo1", color: '#e32529' },
  { id: "5", label: "QQ", url: "#", icon: "icon-QQ", color:'#121212' },
  { id: "6", label: "wechat", url: "#", icon: "icon-wechat-fill" , color: '#00dd69'},
  { id: "7", label: "gitlab", url: "#", icon: "icon-Gitlab", color: '#ff7231' },
];
export default {
  name: "userControlComponent",
  props: ["user"],
  data() {
    return {
      linkList: [],
    };
  },
  components: { UserMenu },
  methods: {
    // 前往链接
    gotoUrl(url) {
      window.open(url, '_blank')
    },

    goToPage(urlName) {
      if (this.$route.name.includes(urlName)) return;
      this.$router.push({ name: urlName });
    },
    // 前往写作页面
    gotoEdit() {
      let routeData = this.$router.resolve({
        name: "editor",
        params: { blogId: 'new' },
      });
      window.open(routeData.href, "_blank");
    },
    // 进入用户信息修改
    gotoChangeInfo() {
      this.goToPage("change");
      this.$refs.userMenu.changeMenuByParent("-1");
    },
  },
};
</script>

<style scoped lang='scss'>
.control {
  // position: fixed;
  // top: 0rem;
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

  // 链接
  .userLink {
    width: 100%;
    display: flex;
    justify-content: center;

    .link-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 65%;
    }

    .link-item {
      margin: 0.5rem 0.75rem;

      .iconfont {
        cursor: pointer;
        font-size: 1.2rem;
        color: var(--clr);
      }

      .iconfont:hover {
        color: var(--bgc-clr4);
      }
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
        background: linear-gradient(90deg, var(--bgc-clr2), var(--bgc-clr1));
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
      animation: rotate360 4s linear infinite;
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
</style>