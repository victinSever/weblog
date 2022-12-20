<template>
  <div>
    <div v-if="categoryList.length !== 0">
      <div
        class="cate-item"
        v-for="item in categoryList"
        :key="item.id"
        @click="handleGotoPost(item)"
      >
        <span class="iconfont icon-pointer"></span>
        <span
          class="publiushTime"
          v-text="dateToMonthAndDay(item.updateTime || new Date())"
        ></span>
        <span class="title" v-text="item.title"></span>
      </div>
    </div>
    <el-empty description="该分类暂时没有文章哦，快去创作吧" v-else></el-empty>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getDate } from "@/utils";
export default {
  name: "categoryDetailPage",
  data() {
    return {
      categoryList: [],
      pageMap: {
        page: 1,
        size: 50
      },
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
    ...mapActions("passage", ["searchLatestBlog"]),

    async getData() {
      try {
        const { data: res } = await this.searchLatestBlog({
          userId: this.user.id,
          categoryId: this.$route.query.categoryId || '',
          ...this.pageMap
        });
        this.categoryList = res.data
        this.total = res.map.total
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleGotoPost(item) {
      this.$router.push({
        name: "post",
        params: item,
      });
    },
    dateToMonthAndDay(date) {
      return getDate(date);
    },
  },
};
</script>

<style scoped lang='scss'>
.cate-item {
  margin-bottom: 4rem;
  cursor: pointer;

  .iconfont {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1rem;
    color: var(--pink-1);
  }

  .publiushTime {
    font-size: 0.7rem;
    margin-right: 0.5rem;
    color: var(--bgc-clr4);
  }

  .title {
    color: var(--pink-1);
    font-size: 1.2rem;
  }
}

.cate-item:hover {
  .iconfont {
    color: var(--bgc-clr2);
  }
}
</style>