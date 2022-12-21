<template>
  <div id="app" :class="config.isGrey ? 'grayscale' : ''">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    config() {
      return this.$store.state.config.config || {};
    },
    user() {
      return this.$store.state.user.userInfo || {};
    },
  },
  watch: {
    config: {
      handler(val) {
        // 修改主题色调
        if (val.color !== "dark") {
          document.documentElement.style.setProperty(`--bgc-clr2`, val.color);
        } else {
          const ele = document.documentElement;
          ele.style.setProperty(`--bgc-1`, "#000");
          ele.style.setProperty(`--bgc-2`, "#112434");
          ele.style.setProperty(`--bgc-3`, "#c1c1c1");
          ele.style.setProperty(`--bgc-4`, "rgba(0, 0, 0, 0.1)");
          ele.style.setProperty(`--bgc-5`, "rgba(0, 0, 0, 0.3)");
          ele.style.setProperty(`--bgc-6`, "rgba(0, 0, 0, 0.7)");
          ele.style.setProperty(`--bgc-7`, "#f7f8fa");
        }
      },
    },
  },
  created() {
    // 获取配置信息并更新
    this.getConfig(this.user.id);
  },

  methods: {
    ...mapActions("config", ["getConfig"]),
  },
};
</script>

<style>
@import "@/style/global.css";
</style>