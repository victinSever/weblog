<template>
  <div class="home">
    <el-container>
      <el-header class="home-header">
        <div class="home-header-logo">
          <h1>
            WeBlog
          </h1>
        </div>
        <div class="home-header-Info">
          <div class="user_avatar_search user_avatar_i"  @click="$router.push('/products')">
            <i class="el-icon-search"></i>
          </div>
          <div class="user_avatar_bell user_avatar_i"  @click="$router.push('/logs')">
            <el-tooltip
              class="item"
              effect="light"
              transition="el-fade-in-linear"
              placement="bottom"
            >
              <div slot="content">
                <span v-if="messageNum != 0">你有{{ messageNum }}则新的消息未查看哦！</span>
                <span v-else>暂时没有需要查阅的邮件！</span>
              </div>
              <el-badge v-if="messageNum!=0" :value="emailNum" class="item" type="primary">
                <i class="el-icon-bell"></i>
              </el-badge>
              <el-badge v-else is-dot class="item">
                <i class="el-icon-bell"></i>
              </el-badge>
            </el-tooltip>
          </div>
          <div class="user_avatar_message user_avatar_i" @click="$router.push('/loginLog')">
            <el-tooltip
              class="item"
              effect="light"
              transition="el-fade-in-linear"
              placement="bottom"
            >
              <div slot="content">
                <span v-if="emailNum != 0">你有{{ emailNum }}封未读邮件！</span>
                <span v-else>暂时没有需要查阅的邮件！</span>
              </div>
              <el-badge v-if="emailNum!=0" :value="emailNum" class="item" type="primary">
                <i class="el-icon-message"></i>
              </el-badge>
              <el-badge v-else is-dot class="item" type="primary">
                <i class="el-icon-message"></i>
              </el-badge>
            </el-tooltip>
          </div>
          <el-dropdown>
            <el-avatar class="user_avatar_img" style="cursor: pointer">
              <el-image :src="user.headhot" alt="" />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span
                  class="el-icon-s-home"
                  @click="handleGotoWeclome"
                  >系统首页</span
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="el-icon-s-tools" @click="systemSetting"
                  >系统设置</span
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="loginout" class="el-icon-caret-right"
                  >退出登录</span
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside
          :width="isCollapse ? '64px' : '200px'"
          style="min-height: 100vh; background-color: #272c33"
        >
          <!--展开/收起-->
          <div class="toggle_box" @click="toggleCollapse">|||</div>
          <!--@open="handleOpen"
              @close="handleClose"-->
          <!-- :default-active="activePath" -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            :router="true"
          >
            <!--菜单树（组件）-->
            <MenuTree :menuList="this.MenuList"></MenuTree>
          </el-menu>
        </el-aside>
        <el-main class="mainRouter">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuTree from "./homeChild/MenuTree";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      isCollapse: false, //控制左侧导航展开和伸缩
      MenuList: [
        {
          id: 1,
          parentId: 0,
          menuName: "系统管理",
          url: "",
          icon: "el-icon-setting",
          orderNum: 1,
          open: 1,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 253,
              parentId: 1,
              menuName: "首页",
              url: "/admin/welcome",
              icon: "el-icon-star-off",
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: "welcome:view",
              type: 0,
              children: [],
            },
            {
              id: 226,
              parentId: 1,
              menuName: "审核",
              url: "/admin/check",
              icon: "el-icon-user",
              orderNum: 2,
              open: 0,
              disabled: false,
              perms: "users",
              type: 0,
              children: [],
            },
          ],
        },
      ], //菜单栏数据
      activepath: "", //点击二级菜单获取的下标
      messageNum: 0, //消息数量
      emailNum: 0, //邮件数量
    };
  },
  computed: {
    user() {
        const user = this.$store.state.user
      return user.token ? user.userInfo : false
    }
  },
  components: {
    MenuTree,
  },
  created() {
    // this.getMenuLists();
    // this.activepath = window.sessionStorage.getItem("activepath");
  },
  methods: {
    ...mapMutations("user", ["SignOut"]),

    handleGotoWeclome() {
      if(this.$route.name.includes('welcome')) return
      this.$router.push({name: 'welcome'})
    },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出登录
    loginout() {
      let con = window.confirm(
        "确认退出管理员页面吗~~"
      );
      if (con) {
        this.SignOut();
        this.$message.success("退出成功！");
        this.$router.push({name: 'login'})      
      }
    },
    //系统设置
    systemSetting() {
      this.$message.warning("该功能未开放！");
    },
  },
};
</script>

<style scoped>
@keyframes animate {
  0% {
    background-size: 100% 100%;
  }
  20% {
    background-size: 110% 110%;
  }
  40% {
    background-size: 130% 100%;
  }
  80% {
    background-size: 150% 130%;
  }
  90% {
    background-size: 150% 130%;
  }
  100% {
    background-size: 115% 125%;
  }
}

.mainRouter {
  background: #fff url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  background-size: 150% 150%;
  animation: animate 5s linear 0 infinite alternate;
}

.home-header {
  background-color: #272c33;
  overflow: hidden;
}
.home-header-logo {
  float: left;
}

.home-header-logo h1 {
  font-family: "";
  letter-spacing: 2px;
}
.home-header-Info {
  float: right;
  display: flex;
  align-items: center;
  height: 60px;
  padding-right: 30px;
}
.home-header-logo h1 {
  color: blanchedalmond;
  height: 60px;
  line-height: 60px;
  padding: 0;
  margin: 0;
}

.el-aside {
  transition: 0.4s;
}
.el-menu {
  border-right: none !important;
  background: #272c33 !important;
}
.el-submenu__title {
  background: #272c33 !important;
}
.collapse_button {
  background: #28283b;
  color: white;
  text-align: center;
  letter-spacing: 2px;
  padding: 5px 0;
  cursor: pointer;
}
.collapse_button span {
  padding-left: 12px;
}
.user_avatar_i {
  width: 50px;
  font-size: 23px;
  color: #fff;
  cursor: pointer;
}

.user_avatar_i:hover {
  color: skyblue;
}
.user_avatar_i span {
  color: red;
  font-size: 10px;
  position: absolute;
  text-align: center;
  display: inline-grid;
  font-weight: 900;
}

/*侧边栏*/
.el-aside {
  background-color: #001529;
  color: #333;
  line-height: 200px;
}

.el-aside .el-menu {
  border-right: none;
}

/*展开/收起*/

.toggle_box {
  background-color: #001529;
  font-size: 15px;
  font-weight: bold;
  line-height: 24px;
  color: #ffffff;
  letter-spacing: 0.2em;
  text-align: center;
  cursor: pointer;
}
.el-aside .collage {
  text-align: center;
  background: #2d3436;
  color: white;
}
</style>