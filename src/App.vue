<template>
  <div
    id="app"
    :class=" (config.isGrey ? 'grayscale' : '')"
  >
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    config() {
      return this.$store.state.config.config;
    },
    user() {
      return this.$store.state.user.userInfo
    }
  },
  mounted() {
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