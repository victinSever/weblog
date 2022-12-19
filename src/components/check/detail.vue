<template>
  <div>
    <el-card shadow="never">
      <el-form :model="data" size="mini" label-width="100px">
        <el-form-item label="博客ID" prop="blogId">{{
          data.blogId
        }}</el-form-item>
        <el-form-item label="发布时间" prop="createTime">{{
          data.createTime
        }}</el-form-item>
        <el-form-item label="用户">{{ blog.userName }}</el-form-item>
        <el-form-item label="内容" prop="activeData">
          <el-card class="content">
            <div class="article card">
              <!-- 文章标题 -->
              <h1 v-text="data.title"></h1>

              <!-- 发布信息 -->
              <div class="publishInfo">
                <div class="left-box">
                  <el-image
                    :src="data.headshot"
                    v-if="data.headshot"
                  ></el-image>
                </div>
                <div class="right-box">
                  <!-- 一般信息 -->
                  <div class="top">
                    <span v-text="data.userName || 'weblog游客'"></span>
                  </div>
                  <div class="bottom">
                    <span class="publishTime" v-text="data.updateTime"></span>
                    <span v-if="data.readAmount" v-text="' · 阅读'"></span>
                    <span
                      class="views"
                      v-if="data.readAmount"
                      v-text="data.readAmount"
                    ></span>
                  </div>
                </div>
              </div>

              <!-- 文章封面 -->
              <div class="article-image" v-if="data.publishImage">
                <el-image
                  :src="data.publishImage"
                  style="max-height: 30rem"
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
          </el-card>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { mapActions } from "vuex";
export default {
  props: {
    blogId: String,
    userId: String,
  },
  components: { VueMarkdown },
  name: "checkBlogDetail",
  mounted() {
    this.getData();
  },
  data() {
    return {
      data: {},
      map: {}
    }
  },
  methods: {
    ...mapActions("passage", ["getPassageInfo"]),
    stringToArray(str) {
      return str.split(" ");
    },
    async getData() {
      try {
        this.blogId = this.$route.params.blogId;
        const { data: res } = await this.getPassageInfo({
          blogId: this.blogId,
          userId: this.userId,
        });
        this.data = res.data;
        this.map = res.map;
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.content {
  .imgs {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    img {
      width: 300px;
      box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.8);
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }

  span {
    font-weight: bold;
  }
}

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
  }

  .article-sort {
    font-size: 0.8rem;
    margin: 1rem 0;

    .el-tag {
      margin-right: 0.5rem;
    }
  }
}
</style>