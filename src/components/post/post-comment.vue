<template>
  <div class="commentComponent">
    <div class="comment">
      <div class="input-header header" v-if="showTitle">
        <h3>评论</h3>
      </div>
      <div class="input-box">
        <div class="left-box">
          <el-image :src="user.headshot" v-if="user.headshot"></el-image>
          <div class="empty" v-else>
            <span class="iconfont icon-person"></span>
          </div>
        </div>
        <div class="right-box" v-if="user">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="输入评论，发表自己的见解（Enter换行）"
            v-model="commentText"
          >
          </el-input>
          <div class="edit-btns">
            <el-button
              :class="commentText ? '' : 'unpublish'"
              size="medium"
              round
              type="primary"
              @click="HandlePublishComment"
              >发表评论</el-button
            >
          </div>
        </div>
        <div class="right-box-empty" @click="handleLogin" v-else>
          <p><el-link type="primary">登录</el-link> 后发表自己的看法！</p>
        </div>
      </div>
    </div>
    <div class="allComment" v-if="showComment">
      <div class="comment-header header" v-if="showTitle">
        <h3>全部评论</h3>
      </div>
      <div class="comment-list" v-if="comments.length !== 0">
        <PostCommentItem :blog="blog" :data="item" v-for="item in comments" :key="item.id" />
      </div>
      <div class="comment-empty" v-else>
        <el-empty
          :image-size="150"
          description="该文章暂未有评论，快去发表自己的看法吧！"
        ></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import PostCommentItem from "@/components/post/post-comment-item.vue";
import { mapActions } from "vuex";
import { throttle } from "@/utils";

export default {
  name: "commentComponent",
  components: { PostCommentItem },
  data() {
    return {
      commentText: "",
      comments: [],
      pageMap: {
        page: 1,
        size: 10,
      },
      isLoading: false
    };
  },
  props: {
    blog: Object,
    blogId: String,
    showTitle: {
      type: Boolean,
      default: true
    },
    showComment: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, false);
    this.getData();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    ...mapActions("passage", ["publishComment", "getCommentList"]),

    async getData() {
      try {
        if(this.isLoading) return
        this.isLoading = true
        const { data: res } = await this.getCommentList({
          blogId: this.blogId,
          userId: this.user.id,
          ...this.pageMap,
        });
        console.log(res);
        this.isLoading = false
        if(res.data.length === 0 && this.comments.length !== 0) return this.$message.warning("没有更多数据了！")
        if (res.code === 200) {
          this.comments = this.comments.concat(res.data);
        } else this.$message.warning("评论出错了！");
      } catch (e) {
        this.$message.error(e);
      }
    },

    addPage() {
      this.pageMap.page++;
      this.getData();
    },

    // 监听鼠标位置，在到达地步150px长度触底，进行数据懒加载
    handleScroll() {
      const dis =
        document.body.offsetHeight - window.pageYOffset - window.innerHeight;
      if (dis <= 5) {
        if (this.isLoading) return; //节流
        let that = this;
        throttle(that.addPage(), 500); //节流函数，每500ms触发一次
      }
    },

    // 发布评论
    async HandlePublishComment() {
      try {
        const { data: res } = await this.publishComment({
          userId: this.user.id,
          blogId: this.blog.blogId,
          content: this.commentText,
          blogUserId: this.blog.userId,
        });
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.commentText = "";
        } else this.$message.warning("评论出错了！");
      } catch (e) {
        this.$message.error(e);
      }
    },

    handleLogin() {
      this.$bus.$emit("handleLogin", true);
    },
  },
};
</script>

<style scoped lang='scss'>
.commentComponent {
  .header {
    margin-bottom: 2rem;

    h3 {
      color: #252933;
    }
  }

  .comment {
    margin-bottom: 2rem;
    .input-box {
      display: flex;
      justify-content: space-between;

      .left-box {
        width: 4rem;

        .el-image,
        .empty {
          height: 3rem;
          width: 3rem;
          border-radius: 1.5rem;
          cursor: pointer;
        }

        .empty {
          align-items: center;
          display: flex;
          justify-content: center;
          background-color: #eff0f3;

          span {
            font-size: 2.8rem;
            color: #c7c8ca;
          }
        }
      }

      .right-box {
        width: 90%;
        // background-color: #f2f3f5;

        /deep/.el-textarea__inner {
          background-color: #f2f3f5;
          border: 1px solid transparent;
          color: #252933;
          font-family: "微软雅黑";
        }

        /deep/.el-textarea__inner::placeholder {
          color: #8a919f;
        }

        /deep/.el-textarea__inner:focus {
          background-color: #fff;
          border: 1px solid #409eff;
        }

        .edit-btns {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;

          .unpublish {
            background-color: #ccc;
            border: #ccc;
          }
        }
      }

      .right-box-empty {
        cursor: pointer;
        background-color: #f2f3f5;
        width: 90%;
        height: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        align-items: center;
      }
    }
  }
}
</style>