<template>
  <div>
    <el-divider content-position="center">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold"
        >专栏管理（{{total || '0'}}）</span
      >
    </el-divider>

        <div class="container">
      <div class="drop"  v-for="item in columnList" :key="item.id">
        <div class="content">
          <h2 v-text="item.column_name"></h2>
          <p v-text="item.discription"></p>
          <a href="#" @click="gotoColumn(item)">Read More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "columnPage",
  data() {
    return {
      columnList: [],
      total: 0
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  methods: {
    ...mapActions("person", ["selectColumnByUserId"]),

    async getData() {
      try {
        const { data: res } = await this.selectColumnByUserId({
          userId: this.user.id,
        });
        if (res.code == 200) {
          this.columnList = res.data;
          this.total = res.map.total;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    // 跳转到文章详情
    gotoColumn(item) {
      this.$router.push({
        path: `/user/column/${item.columnId}`,
        query: item
      });
    },
  }
};
</script>

<style scoped>
@import "@/assets/css/user-data/css/style.css";
</style>