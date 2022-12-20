<template>
  <div>
    <el-divider content-position="left">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold"
        >文章分类</span
      >
    </el-divider>
    <div v-if="isShow">
      <div
        class="cate-item"
        v-for="item in categoryList"
        :key="item.id"
        @click="handleGotoDetail(item)"
      >
        <span class="iconfont icon-Category"></span>
        <span class="label" v-text="item.label"></span>
        <span class="num" v-text="item.num ? '(' + item.num + ')' : ''"></span>
      </div>
    </div>
    <div class="detail" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const categoryList = [
  { id: "1", label: "前端", parentId: "", num: 0 },
  { id: "2", label: "后端", parentId: "", num: 0 },
  { id: "3", label: "Andriod", parentId: "", num: 0 },
  { id: "4", label: "IOS", parentId: "", num: 0 },
  { id: "5", label: "人工智能", parentId: "", num: 0 },
  { id: "6", label: "阅读", parentId: "", num: 0 },
  { id: "7", label: "杂谈", parentId: "", num: 0 },
];
export default {
  name: "catePage",
  data() {
    return {
      categoryList,
    };
  },
  computed: {
    isShow() {
      return !this.$route.name.includes("detail");
    },
  },
  methods: {
    handleGotoDetail(item) {
      this.$router.push({
        name: "detail",
        query: {
          type: item.label,
          categoryId: item.id
        },
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.el-divider {
  margin-bottom: 4rem;
}
.cate-item {
  margin-bottom: 4rem;
  cursor: pointer;

  .iconfont {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1rem;
    color: var(--pink-1);
  }

  .label {
    font-size: 1.6rem;
    margin-right: 0.5rem;
    font-weight: bold;
  }

  .num {
    color: var(--bgc-clr4);
    font-size: 1.2rem;
  }
}

.cate-item:hover {
  .iconfont {
    color: var(--bgc-clr2);
  }
}
</style>