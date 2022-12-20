<template>
  <div>
    <div>
      <div class="session">
        <el-divider content-position="left">
          <span class="session-title" v-text="'数据概览'"></span>
        </el-divider>

        <div class="session-content">
          <div class="session-list">
            <div class="session-item">
              <span class="label" v-text="'总访问量'"></span>
              <span class="count" v-text="user.viewedAmount || 0"></span>
            </div>
            <div class="session-item">
              <span class="label" v-text="'文章总数'"></span>
              <span class="count" v-text="user.blogAmount || 0"></span>
            </div>
            <div class="session-item">
              <span class="label" v-text="'热度排名'"></span>
              <span class="count" v-text="user.ranking || 0"></span>
            </div>
            <div class="session-item">
              <span class="label" v-text="'粉丝数'"></span>
              <span class="count" v-text="user.fansAmount || 0"></span>
            </div>
            <div class="session-item">
              <span class="label" v-text="'总访问量'"></span>
              <span class="count" v-text="user.likedAmount || 0"></span>
            </div>
            <div class="session-item">
              <span class="label" v-text="'总评论数'"></span>
              <span class="count" v-text="user.commentAmount || 0"></span>
            </div>
            <div class="session-item">
              <span class="label" v-text="'总收藏数'"></span>
              <span class="count" v-text="user.collectedAmount || 0"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="session echats">
        <el-divider content-position="left">
          <span class="session-title" v-text="'数据视图'"></span>
        </el-divider>

        <div class="session-content">
          <el-empty />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataPage",
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    }
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
.session {
  width: 100%;

  .session-title {
    margin-bottom: 1rem;
    color: var(--bgc-clr6);
    font-size: 2em;
    font-weight: bold;
  }
  .session-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  .session-item {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--bgc-clr8);
    margin: 1rem 0;
    padding: 0.5rem 0;
    border-radius: 0.5rem;

    .label {
      line-height: 1.5;
    }

    .count {
      font-size: 2rem;
      line-height: 2;
      font-weight: bolid;
    }
  }
}

.echats {
  margin-top: 5rem;
}
</style>