<template>
  <div class="commentItem" v-if="data">
    <div class="left-box">
      <el-image :src="obj.headshot || '#'" alt=""></el-image>
    </div>
    <div class="right-box">
      <!-- 一般信息 -->
      <div class="top">
        <span v-text="obj.userName"></span>
        <span class="createTime" v-text="obj.createTime"></span>
      </div>
      <div class="main">
        <p v-text="obj.content"></p>
      </div>
      <div class="bottom">
        <span
          class="iconfont icon-31dianzan"
          :style="obj.haveLiked ? 'color: var(--bgc-clr2)' : ''"
          @click="handleLikeComment"
          >{{
            " " + (showCommentBtn ? (obj.commentLikeAmount ? obj.commentLikeAmount : "点赞") : (obj.likeAmount ? obj.likeAmount : '点赞')) 
          }}</span
        >
        <span class="iconfont icon-pinglun" @click="handleReplyList" v-if="showCommentBtn">{{
          " " + (obj.commentReplyAmount ? obj.commentReplyAmount : "回复")
        }}</span>
      </div>

      <!-- 子评论 -->
      <div
        class="reply-list"
        :style="'backgroundColor: ' + (bgcColor ? '#fff' : '#f9fafb')"
        v-if="showChidren"
      >
        <el-input
          placeholder="输入回复 Enter发布"
          @keyup.enter.native="handlePublishReply"
          v-model="reply"
          class="reply-input"
        ></el-input>
        <div v-if="obj.children">
          <PostCommentItem
            :data="item"
            :bgcColor="!bgcColor"
            :showCommentBtn="false"
            v-for="item in obj.children"
            :key="item.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostComment from "@/components/post/post-comment.vue";
import PostCommentItem from "./post-comment-item.vue";
import { mapActions } from "vuex";

export default {
  name: "PostCommentItem",
  components: { PostCommentItem, PostComment },
  props: {
    data: Object || null,
    blog: Object,
    bgcColor: {
      type: Boolean,
      default: false,
    },
    showCommentBtn: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  data() {
    return {
      pageMap: {
        page: 1,
        size: 5,
      },
      obj: {},
      showChidren: false,
      reply: "",
    };
  },
  mounted() {  
    this.obj = this.data;
  },
  methods: {
    ...mapActions("passage", ["likeComment", "getReplyList", "publishReply",'likeReply']),

    // 回复评论
    async handlePublishReply() {
      if (!this.user) return this.$message.info('该功能需要登录后操作')
      try {
        const { data: res } = await this.publishReply({
          blogId: this.obj.blogId,
          replyUserId: this.user.id,
          commentUserId: this.obj.userId,
          commentId: this.obj.commentId,
          content: this.reply,
          blogUserId: this.blog.userId,
        });
        if (res.code === 200) {
          this.reply = ''
          this.$message.success(res.msg)
          this.handleReplyList()
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 查询回复列表
    async handleReplyList() {
      if (!this.user) return this.$message.info('该功能需要登录后操作')
      
      this.showChidren = !this.showChidren;
      if(!this.showChidren) return

      try {
        const { data: res } = await this.getReplyList({
          ...this.pageMap,
          userId: this.user.id,
          commentId: this.obj.commentId,
        })
        if (res.code == 200) {
          this.$set(this.obj, 'children', res.data)    
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 点赞评论
    async handleLikeComment() {
      if (!this.user) return this.$message.info('该功能需要登录后操作')

      try {
        console.log(this.obj);
        const { data: res } = await this.likeComment({
          userId: this.user.id,
          commentId: this.showCommentBtn ? this.obj.commentId : this.obj.replyId,
          p: this.showCommentBtn ? 1 : 2
        });
        if (res.code == 200) {
          if (this.obj.haveLiked) this.showCommentBtn ? this.obj.commentLikeAmount-- : this.obj.likeAmount--
          else this.showCommentBtn ? this.obj.commentLikeAmount++ : this.obj.likeAmount++
          this.obj.haveLiked = !this.obj.haveLiked;
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
.commentItem {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  .left-box {
    width: 3rem;

    .el-image {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 1.5rem;
      cursor: pointer;
    }
  }

  .right-box {
    width: 92%;
    font-size: 0.9rem;
    color: #8a919f;

    .top {
      height: 2.2rem;
      font-size: 1rem;
      color: var(--bgc-7);

      .createTime{
        margin-left: 2rem;
        color: var(--bgc-clr4);
        font-size: 0.8rem;
      }
    }

    .main {
      line-height: 1.5rem;
      overflow: hidden;
    }

    .bottom {
      margin-top: 0.5rem;

      .iconfont {
        font-size: 0.9rem;
        margin-right: 1rem;
        cursor: pointer;
      }
    }

    .reply-list {
      margin-top: 1rem;
      padding: 1.5rem;
      border-radius: 1rem;

      .reply-input {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>