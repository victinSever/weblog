<template>
  <div>
    <el-divider content-position="center">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold"
        >专栏管理（{{ total || "0" }}）</span
      >
    </el-divider>

    <div class="create-header">
      <el-link type="primary" class="create-btns" v-text="showCreateBox ? '保存' : '新建专栏'" @click="handleCreateColumn"></el-link>
      <el-link type="primary" class="create-btns qvxiao" v-text="'取消'" v-if="showCreateBox" @click="showCreateBox = false"></el-link>
    </div>

    <el-card class="create-box" v-if="showCreateBox">
      <el-form :model="columnForm" :rules="columnRules" label-width="100px">
        <el-form-item prop="column" label="专栏名称">
          <el-input placeholder="请输入专栏名称" v-model="columnForm.column" style="max-width: 20rem"></el-input>
        </el-form-item>
        <el-form-item prop="discription" label="专栏描述">
          <el-input placeholder="请输入专栏描述" v-model="columnForm.discription"></el-input>
        </el-form-item>
        <el-form-item prop="cover" label="专栏封面">
          <el-upload
              class="avatar-uploader"
              :action="$upload_path"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-image v-if="columnForm.cover" :src="columnForm.cover || '#'" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="container">
      <div class="drop" v-for="item in columnList" :key="item.id">
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
      total: 0,
      dialogVisible: false,
      columnForm: {
        column: '',
        discription: '',
        cover: ''
      },
      columnRules: {
        column: [{ required: true, message: '请输入专栏名称', trigger: 'blur' }],
        discription: [{ required: true, message: '请输入专栏描述', trigger: 'blur' }],
        cover: [{ required: true, message: '请上传专栏封面', trigger: 'change' }],
      },
      showCreateBox: false
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
    ...mapActions("person", ["selectColumnByUserId", 'insertColumn']),

    handleCreateColumn() {
      if(!this.showCreateBox) this.showCreateBox = true
      else {
        this.createColumn()
      }
    },

    async createColumn() {
      try {
        const {data: res} = await this.insertColumn({userId: this.user.id, ...this.columnForm})
        console.log(res);
        if(res.code === 200) {
          this.showCreateBox = false
          this.$message.success('专栏创建成功！')
          this.getData()
        } else this.$message.error(res.msg)
      }catch(e) {
        this.$message.error(e)
      }
    },

    handleAvatarSuccess(res, file) {
      console.log(res);
      this.columnForm.cover = res.data.minIoUrl;
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt5M;
    },

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
        query: item,
      });
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/user-data/css/style.css";

.create-header{
  margin-bottom: 2rem;
}

.create-header .create-btns{
  color: var(--bgc-clr2);
  margin-right: 2rem;
}
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
</style>