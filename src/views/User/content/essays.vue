<template>
  <div>
    <div class="header">
      <div class="header-menu">
        <div class="menu-item" v-for="item in menu" :key="item.id">
          <el-link
            :class="activeManu === item.id ? 'active' : ''"
            :underline="false"
            @click="handleChangeMenu(item.id)"
          >
            <span v-text="item.label"></span>
            <!-- <span v-text="'(' + item.num + ')'"></span> -->
          </el-link>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="passage-list" v-if="passageList.length !== 0">
        <div
          class="passage-item"
          v-for="item in passageList"
          :key="item.id"
          @click="handleGotoPassage(item)"
        >
          <div class="left">
            <h2 class="title" v-text="item.title"></h2>
            <p class="info">
              <span class="publishTime" v-text="item.createTime"></span>
              <span class="view" v-text="item.view || 0 + '浏览'"></span>
              <span class="comment" v-text="item.comment || 0 + '评论'"></span>
              <span class="dianzan" v-text="item.dianzan || 0 + '点赞'"></span>
              <span class="colloct" v-text="item.colloct || 0 + '收藏'"></span>
            </p>
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "essaysPage",
  data() {
    const menu = [
      { label: "已发布", id: 1, num: 0 },
      { label: "审核中", id: 2, num: 0 },
      { label: "未通过", id: 3, num: 0 },
    ];
    return {
      menu,
      activeManu: 1,

      isLoading: false,
      passageList: [],
      pageMap: {
        page: 1,
        size: 100,
      },
      total: 0,
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  watch: {
    activeManu: {
      handler() {
        this.getData();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("person", [
      "selectOwnBlog",
      "selectOwnFailBlog",
      "selectOwnNotAuditFailBlog",
    ]),
    ...mapActions("passage", ["deleteBlogByBlogId"]),

    async getData() {
      try {
        let data = {},
          params = { ...this.pageMap, userId: this.user.id };
        this.isLoading = true;
        switch (this.activeManu) {
          case 1:
            data = await this.selectOwnBlog(params);
            break;
          case 2:
            data = await this.selectOwnNotAuditFailBlog(params);
            break;
          case 3:
            data = await this.selectOwnFailBlog(params);
            break;
        }
        this.isLoading = false;
        this.passageList = data.data.data;
        this.total = data.data.map.total;
      } catch (e) {
        this.$message.error(e);
      }
    },

    async deletePassage(obj) {
      try {
        const { data: res } = await this.deleteBlogByBlogId({
          userId: this.user.id,
          blogId: obj.blogId,
          id: obj.id,
        });
        if (res.code === 200) {
          this.getData()
          this.$message.success(res.msg);
        }
        console.log(res);
      } catch (e) {
        this.$message.error(e);
      }
    },

    //删除文章
    handleDelete(blog) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletePassage(blog);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //跳转到文章详情
    handleGotoPassage(item) {
      this.$router.push({
        name: "post",
        params: { ...item },
      });
    },

    // 改变菜单
    handleChangeMenu(id) {
      this.activeManu = id;
      this.getData();
    },
  },
};
</script>

<style scoped lang='scss'>
.header-menu {
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .menu-item {
    padding: 0 1rem;
    border-right: 1px solid var(--bgc-3);

    .el-link{
      color: var(--bgc-7);
    }

    .active{
      color: var(--bgc-clr2)
    }
  }

  .menu-item:last-child {
    border-right: none;
  }

  .menu-item:hover .el-link {
    color: var(--bgc-clr2);
  }
}

.main {
  .passage-list {
    .passage-item {
      padding: 1rem 0;
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
        color: var(--bgc-7);
      }

      .info {
        color: var(--bgc-7);

        span {
          padding-right: 1rem;
        }

        .publishTime {
          border-right: 1px solid var(--bgc-3);
        }

        .view {
          margin-left: 1rem;
        }
      }
    }

    .right .iconfont {
      font-size: 1.5rem;
    }
  }

  .passage-item:hover {
    background-color: var(--bgc-2);
  }
}
</style>