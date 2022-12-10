<template>
  <div>
    <el-divider content-position="center">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold"
        >个人动态</span
      >
    </el-divider>
    <el-empty></el-empty>
  </div>
</template>

<script>
export default {
    name: 'activePage',
    mounted() {
      this.$message.warning('敬请期待！')
    },
}
</script>

<style>

</style>