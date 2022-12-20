<template>
  <div class="root">
    <h2 class="publish-title" v-text="'文章发布'"></h2>
    <el-form
      ref="publishForm"
      :model="publishForm"
      :rules="publishFormRules"
      label-width="100px"
      class="publishForm"
    >
      <el-form-item label="分类" prop="category">
        <div class="category-list">
          <span
            v-for="item in categoryList"
            :key="item.label"
            v-text="item.label"
            :class="
              'category-item' +
              (publishForm.category == item.label ? ' active' : '')
            "
            @click="handleChangeCategory(item.label)"
          ></span>
        </div>
      </el-form-item>
      <el-form-item label="选择标签" prop="tag">
        <el-select v-model="publishForm.tag" multiple placeholder="请选择">
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="publishImage">
        <el-upload
          class="avatar-uploader"
          :action="$upload_path"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <el-image v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="收录专栏" prop="column">
        <el-select
          v-model="publishForm.column"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="输入专栏名称，未同名自动创建专栏"
        >
          <el-option
            v-for="item in columnList"
            :key="item.id"
            :label="item.column_name"
            :value="item.column_name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编辑摘要" prop="discription">
        <el-input
          type="textarea"
          :rows="3"
          v-model="publishForm.discription"
          placeholder="请输入摘要内容，描述文章主要信息"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-text="'保存并发布'"
          type="primary"
          @click="handlePublish"
        ></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const categoryList = [
  { id: "1", label: "前端", parentId: "" },
  { id: "2", label: "后端", parentId: "" },
  { id: "3", label: "Andriod", parentId: "" },
  { id: "4", label: "IOS", parentId: "" },
  { id: "5", label: "人工智能", parentId: "" },
  { id: "6", label: "阅读", parentId: "" },
  { id: "7", label: "杂谈", parentId: "" },
];
const tagList = [
  { id: "1", label: "前端", parentId: "" },
  { id: "2", label: "后端", parentId: "" },
  { id: "3", label: "Andriod", parentId: "" },
  { id: "4", label: "IOS", parentId: "" },
  { id: "5", label: "人工智能", parentId: "" },
  { id: "6", label: "阅读", parentId: "" },
  { id: "7", label: "杂谈", parentId: "" },
];

const rules = {
  category: [{ required: true, message: "请选择文章种类", trigger: "change" }],
  tag: [{ required: true, message: "请选择文章标签", trigger: "blur" }],
  discription: [{ required: true, message: "请输入文章摘要", trigger: "blur" }],
  column: [{ required: true, message: "请选择专栏", trigger: "blur" }],
};

import { mapActions } from "vuex";
export default {
  name: "editPublishComponent",
  props: {
    // 内容正文
    content: String,
    // 文章标题
    title: String,
  },
  data() {
    return {
      publishForm: {
        category: "", //种类
        tag: "", //标签
        publishImage: "", //文章封面
        column: "", //专栏
        discription: "", //摘要
      },
      publishFormRules: rules,

      categoryList,
      tagList,
      imageUrl: "",
      columnList: [],
      blogId: "",
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  mounted() {
    this.blogId = this.$route.params.blogId;
    this.getColumn();
  },
  methods: {
    ...mapActions("passage", ["publishBlog", "updateBlogByBlogId"]),
    ...mapActions("person", ["selectColumnByUserId"]),

    async getColumn() {
      try {
        const { data: res } = await this.selectColumnByUserId({
          userId: this.user.id,
        });
        if (res.code == 200) {
          this.columnList = res.data;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    //发布
    async handlePublish() {
      if (!this.isLegal()) return;

      console.log(this.publishForm);

      try {
        const params = {
          userId: this.user.id,
          blogId: this.blogId.includes("new") ? "" : this.blogId,
          title: this.title,
          publishImage: this.publishForm.publishImage,
          discription: this.publishForm.discription,
          content: this.content,
          tag: this.publishForm.tag.join(" "),
          ableLook: 1,
          status: 2,
          columnIdList: this.publishForm.column,
        };
        console.log(params);
        const { data: res } = await this.publishBlog(params);
        console.log(res);
        if (res.code == 200) {
          this.$message.success("发布成功！文章正在审核中...");
          this.$router.push({ name: "essays" });
        }
      } catch (e) {
        this.$message.error(e);
      }

      setTimeout(() => {}, 1000);
    },

    // 点击类别标签事件
    handleChangeCategory(label) {
      this.publishForm.category = label;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error("文件上传失败！");
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isLt5M) {
        this.$message.error("上传封面图片大小不能超过 5MB!");
      }
      return isLt5M;
    },

    // 二次封装notice，警告
    warnNotice(text) {
      this.$notify({
        title: "警告",
        message: text,
        type: "warning",
        offset: 120,
        duration: 2000,
      });
    },

    // 检验数据合法性
    isLegal() {
      // 检验发布内容的合法性
      if (!this.publishForm.category) return this.warnNotice("请选择文章类别");
      if (!this.publishForm.tag || this.publishForm.tag.length == 0)
        return this.warnNotice("请选择文章标签，不少于一个");
      if (
        !this.publishForm.discription ||
        this.publishForm.discription.length < 10
      )
        return this.warnNotice("请输入文章摘要且大于10个字符");
      // 检验文章内容和标题合法性
      if (!this.title) return this.warnNotice("你还没有输入文章标题");
      console.log(this.content);
      if (this.content.length < 10)
        return this.warnNotice("你的文章字数不足，继续丰富你的内容吧！");
      return true;
    },
  },
};
</script>

<style scoped lang='scss'>
.root {
  width: 30rem;
  min-width: 30rem;

  .publish-title {
    margin-bottom: 2rem;
    color: var(--bgc-clr4);
  }

  .category-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .category-item {
      display: block;
      margin: 0 0.25rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      padding: 0rem 0.6rem;
      background-color: var(--bgc-clr5);
      width: 4rem;
      text-align: center;
      height: 1.8rem;
      line-height: 1.8rem;
    }

    .active {
      color: var(--bgc-clr2);
      background-color: var(--bgc-clr7);
    }
  }
}

.avatar-uploader {
  .el-upload {
    border: 1px dashed var(--bgc-clr6);
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload:hover {
    border-color: var(--bgc-clr2);
  }

  .avatar {
    width: 8rem;
    height: 8rem;
    display: block;
  }

  .avatar-uploader-icon {
    font-size: 1.5rem;
    color: var(--bgc-clr4);
    width: 8rem;
    height: 8rem;
    line-height: 8rem;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px dashed var(--bgc-clr4);
  }
}

// .avatar-uploader .el-upload {
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>