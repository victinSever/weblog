<template>
  <div class="post">
    <div class="post-innerbox">
      <div class="post-left">
        <div class="article card">
          <!-- 文章标题 -->
          <h1 v-text="data.title"></h1>

          <!-- 发布信息 -->
          <div class="publishInfo">
            <div class="left-box">
              <el-image :src="data.headshot" v-if="data.headshot"></el-image>
            </div>
            <div class="right-box">
              <!-- 一般信息 -->
              <div class="top">
                <span v-text="data.userName || 'weblog游客'"></span>
              </div>
              <div class="bottom">
                <span class="publishTime" v-text="data.updateTime"></span>
                <span v-if="data.readAmount" v-text="' · 阅读'"></span>
                <span class="views" v-if="data.readAmount" v-text="data.readAmount"></span>
              </div>
            </div>
          </div>

          <!-- 文章封面 -->
          <div class="article-image" v-if="data.publishImage">
            <el-image
              :src="data.publishImage"
              style="max-height: 30rem"
              fit="fill"
            ></el-image>
          </div>

          <!-- 文章内容：md渲染器和样式融入 -->
          <div class="article-content markdown-body">
            <VueMarkdown :source="data.content" v-highlight></VueMarkdown>
          </div>

          <!-- 文章分类 -->
          <div class="article-sort">
            <!-- 分类 -->
            <span class="article-cate">分类：</span>
            <el-tag
              v-if="data.category"
              v-text="data.category"
              type="danger"
            ></el-tag>
            <el-tag v-else v-text="'暂无'"></el-tag>
            <span class="article-tags">标签：</span>
            <span v-if="data.tag">
              <el-tag
                v-for="item in stringToArray(data.tag)"
                :key="item"
                v-text="item"
              ></el-tag>
            </span>
            <el-tag v-else v-text="'暂无'"></el-tag>
          </div>
        </div>
        <div class="comment card" id="comment-box">
          <PostComment :blog="data" :blogId="blogId" v-if="blog.blogId"/>
        </div>
      </div>
      <div class="post-right card">
        <PostDir :article="data.content"/>
      </div>

      <div class="article-suspended-panel">
        <PostBtns v-if="blog.blogId" :blog="blog" @HandleGotoComment="HandleGotoComment"/>
      </div>
    </div>
  </div>
</template>

<script>
import PostDir from '@/components/post/post-dir.vue';
import PostBtns from "@/components/post/post-btns.vue";
import PostComment from "@/components/post/post-comment.vue";
import VueMarkdown from "vue-markdown";
import { mapActions } from 'vuex'

export default {
  name: "postPage",
  components: { PostDir, PostBtns, PostComment, VueMarkdown },
  data() {
    return {
      data: {},
      map: {},
      blogId: ''
    }
  },
  computed: {
    user() {
      const user = this.$store.state.user
      return user.token ? user.userInfo : false
    },
    blog() {
      return this.data
    }
  },
  mounted() {
    this.blogId = this.$route.params.blogId
    this.getData()
    this.addReadAmount()
  },
  methods: {
    ...mapActions('passage',['getPassageInfo', 'blogReadAmountAddOne']),

    // 标签转
    stringToArray(str) {
      return str.split(' ')
    },

    async addReadAmount() {
      try{       
        const {data: res} = await this.blogReadAmountAddOne({blogId: this.blogId})
        if(res.code === 200) {}       
      }catch(e){
        this.$message.error(e)
      }
    },

    async getData(){
      try{
        const {data: res} = await this.getPassageInfo({
          blogId: this.blogId,
          userId: this.user.id || 0
        })
        this.data = res.data
        this.map = res.map
      }catch(e){
        this.$message.error(e)
      }
    },

    HandleGotoComment() {
      console.log(window.location.hash);
      window.location.hash = "#comment-box"
    }
  }
};
</script>

<style lang='scss' scoped>
.post {
  width: 100%;

  .post-innerbox {
    margin: 0 auto;
    margin-top: 1.5rem;
    width: 1100px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .card {
      border-radius: 0.5rem;
      background-color: #fff;
    }

    .post-left {
      width: 75%;
      overflow: hidden;
      box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow-hover);

      .article {
        padding: 2.67rem;

        .publishInfo {
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;

          .left-box {
            width: 3rem;

            .el-image {
              height: 2.5rem;
              width: 2.5rem;
              border-radius: 1.5rem;
            }
          }

          .right-box {
            width: 92%;
            font-size: 0.9rem;
            color: #8a919f;

            .top {
              height: 1.2rem;
              font-size: 1rem;
              color: #252933;
            }

            .bottom {
              margin-top: 0.5rem;

              .iconfont {
                font-size: 0.9rem;
                margin-right: 1rem;
              }
            }

            .reply-list {
              margin-top: 1rem;
              padding: 1.5rem;
              border-radius: 1rem;
            }
          }
        }

        .article-image {
          margin-bottom: 1rem;
          

          .el-image{
            height: 100%;
            width: 100%;
          }
        }

        .article-sort {
          font-size: 0.8rem;
          margin: 1rem 0;

          .el-tag {
            margin-right: 0.5rem;
          }
        }
      }

      .comment {
        min-height: 20vh;
        margin-top: 20px;
        padding: 2.67rem;
      }
    }

    .post-right {
      width: 23%;
      border-radius: 0.5rem;
    }

    .article-suspended-panel {
      position: fixed;
      margin-left: -7rem;
      top: 140px;
      z-index: 2;
    }
  }
}

@media screen and (max-width: 1350px) {
  .post .post-innerbox {
    width: 95%;

    .post-left {
      width: 100%;
    }
    .post-right {
      display: none;
    }
  }
}
</style>