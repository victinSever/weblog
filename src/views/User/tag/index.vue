<template>
  <div>
    <el-divider content-position="left">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold"
        >所有文章标签</span
      >
    </el-divider>
    <div class="tag-list">
      <div class="tag-item" v-for="item in 10" :key="item" @click="tip">
        <span>标签</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tagPage",
  methods: {
    tip() {
      this.$message.warning('敬请期待！')
    }
  }
};
</script>

<style scoped lang='scss'>
.el-divider {
  margin-bottom: 4rem;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;

  .tag-item {
    margin: 0 2rem;

    span {
        cursor: pointer;
        font-size: 1.2rem;
        color: var(--tag-clr);
    }

    span:hover {
        color: var(--tag-clr-h);
    }
  }
}
</style>