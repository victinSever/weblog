<template>
  <div>
    <el-divider content-position="center">
      <span
        class="session-title divider-title"
        >文章管理</span
      >
    </el-divider>
    <div class="header">
      <div class="left">
        <div class="menu-list">
          <div
            :class="'menu-item' + (item.id === activeIndex ? ' active' : '')"
            v-for="item in tag"
            :key="item.id"
            @click="handleChange(item)"
          >
            <span v-text="item.label"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const tag = [
      { label: "文章", id: 0, value: "essays" },
      { label: "草稿箱", id: 1, value: "drafts" },
    ];
    return {
      tag,
      activeIndex: 0,
    };
  },
  created() {
    this.activeIndex = this.$route.name.includes('drafts') ? 1 : 0
  },
  methods: {
    handleChange(item) {
      this.activeIndex = item.id;
      if (this.$route.name !== item.value)
        this.$router.push({name: item.value})
    },
  },
};
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  
  box-sizing: border-box;

  .left {
    height: 100%;
    box-sizing: border-box;
  }

  .menu-list {
    display: flex;
    height: 100%;
    box-sizing: border-box;

    .menu-item {
      margin: 0 1rem;
      display: flex;
      align-items: center;
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;
      font-size: 1.2rem;
      color: var(--bgc-7);
      border-bottom: 3px solid transparent;
    }

    .menu-item:hover {
      color: #1e80ff;
    }

    .active {
      border-bottom: 3px solid #1e80ff;
    }
  }
}

.main {
  padding: 1rem 0;
}
</style>