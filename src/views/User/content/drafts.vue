<template>
  <div class="drafts">
    <div class="drafts-list" v-if="draftsList.length !== 0">
      <div
        class="drafts-item"
        v-for="item in draftsList"
        :key="item.id"
        @click="handleGotoEditor(item)"
      >
        <div class="left">
          <h2 class="title" v-text="item.title"></h2>
          <p class="publishTime" v-text="item.createTime"></p>
        </div>
        <div class="right">
          <span
            class="iconfont icon-shanchu"
            @click.stop="handleDelete(item)"
          ></span>
        </div>
      </div>
    </div>
    <div class="drafts-loading" v-else-if="isLoading">
      <el-skeleton />
    </div>
    <div class="drafts-empty" v-else>
      <el-empty :image-size="150" description="内容空空如也！"></el-empty>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "draftsPage",
  data() {
    return {
      draftsList: [],
      total: 0,
      pageMap: {
        page: 1,
        size: 100,
      },
      isLoading: false,
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    ...mapActions("person", ["selectOwnDraftFailBlog"]),
    ...mapActions("passage", ["deleteBlogByBlogId"]),

    async getData() {
      try {
        this.isLoading = true;
        const { data: res } = await this.selectOwnDraftFailBlog({
          ...this.pageMap,
          userId: this.user.id,
        });
        this.isLoading = false;
        this.draftsList = res.data;
        this.total = res.map.total;
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 点击进入指定编辑文章-
    handleGotoEditor(obj) {
      if (this.$route.path === "/editor") return;
      let routeData = this.$router.resolve({
        name: "editor",
        params: obj,
      });
      window.open(routeData.href, "_blank");
    },

    // 删除草稿
    handleDelete(obj) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteDrafts(obj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    async deleteDrafts(obj) {
      try {
        const { data: res } = await this.deleteBlogByBlogId({
          userId: this.user.id,
          blogId: obj.blogId,
          id: obj.id,
        });
        if (res.code === 200) {
          this.getData();
          this.$message.success(res.msg);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.drafts {
  .drafts-list {
    .drafts-item {
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid #e4dfdf;
    }

    .left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .title {
        font-weight: normal;
        font-size: 1.2rem;
      }

      .publishTime {
        color: #777;
      }
    }

    .right .iconfont {
      font-size: 1.5rem;
    }
  }

  .drafts-item:hover {
    background-color: #fcfcfc;
  }
}
</style>