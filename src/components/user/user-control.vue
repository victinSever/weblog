<template>
  <!-- 右侧信息和按钮区 -->
  <div class="control">
    <div class="userInfo">
      <!-- 头像 -->
      <div class="userImage" @click="gotoChangeInfo">
        <el-image v-if="user.userImage" :src="user.userImage" alt=""></el-image>
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
      <UserMenu ref="userMenu" />
    </div>
  </div>
</template>

<script>
import UserMenu from "@/components/user/user-menu.vue";
import { getUUID } from "@/utils/index";
export default {
  name: "userControlComponent",
  props: ["user"],
  components: { UserMenu },
  methods: {
    goToPage(urlName) {
      if (this.$route.name.includes(urlName)) return;
      this.$router.push({ name: urlName });
    },
    // 前往写作页面
    gotoEdit() {
      let routeData = this.$router.resolve({
        name: "editor",
        params: { id: getUUID() },
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