<template>
  <div
    id="app"
    :class=" (config.grayscale ? 'grayscale' : '')"
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
      return JSON.parse(sessionStorage.getItem("config")) || {};
    },
  },
  mounted() {
    // 获取配置信息并更新
    this.getConfig();
  },
  methods: {
    ...mapActions("config", ["getConfig"]),

  },
};
</script>

<style>
@import "@/style/global.css";
</style>