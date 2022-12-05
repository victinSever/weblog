<template>
  <div>
    <el-divider content-position="left">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold;"
        >所有文章分类</span
      >
    </el-divider>
    <div class="cate-item" v-for="item in 10" :key="item">
      <h3>这是一个分类</h3>
    </div>
  </div>
</template>

<script>
export default {
    name: 'catePage'
}
</script>

<style scoped lang='scss'>
.el-divider {
  margin-bottom: 4rem;
}
.cate-item {
  margin: 2rem 0;
}
</style>