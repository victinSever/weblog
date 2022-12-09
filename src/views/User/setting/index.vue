<template>
  <div class="root">
    <h1 class="title">个性化配置</h1>

    <el-divider content-position="left">
      <span class="session-title">主题设置</span>
    </el-divider>

    <div class="session">
      <div class="session-item">
        <div class="item-title">
          <span>页面主题：</span>
        </div>
        <div class="item-main">
          <el-select v-model="config.theme" filterable placeholder="请选择">
            <el-option
              v-for="item in themes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              default="#ec8c69"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="session-item">
        <div class="item-title">
          <span>灰度页面：</span>
        </div>
        <div class="item-main">
          <el-switch
            v-model="config.grayscale"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
      </div>
    </div>

    <el-divider content-position="left">
      <span class="session-title">背景设置</span>
    </el-divider>

    <div class="session">
      <div class="session-item">
        <div class="item-title">
          <span>轮播图：</span>
        </div>
        <div class="item-main">
          <el-upload
            :action="$upload_path"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="handleBeforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <el-image width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
      </div>
    </div>

    <el-divider content-position="left">
      <span class="session-title">布局设置</span>
    </el-divider>

    <div class="session">
      <div class="session-item">
        <div class="item-title">
          <span>菜单布局：</span>
        </div>
        <div class="item-main">
          <el-radio v-model="config.menu_pos" label="0">左侧</el-radio>
          <el-radio v-model="config.menu_pos" label="1">右侧</el-radio>
        </div>
      </div>
    </div>

    <el-divider content-position="left">
      <span class="session-title">动画设置</span>
    </el-divider>

    <div class="session">
      <div class="session-item">
        <div class="item-title">
          <span>头像动画：</span>
        </div>
        <div class="item-main">
          <el-switch
            v-model="config.userImageAnimation"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
      </div>
      <div class="session-item">
        <div class="item-title">
          <span>波浪动画：</span>
        </div>
        <div class="item-main">
          <el-switch
            v-model="config.waveAnimation"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
      </div>

      <div
      class="btn-save"
      :style="'visibility: ' + (isChange ? 'visible' : 'hidden')"
      @click="handleSave"
    >
      <span class="iconfont icon-save-fill"></span>
      <span v-text="'保存'"></span>
    </div>
    </div>

    
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "settingPage",
  data() {
    const themes = [
      { id: "0", label: "默认", value: "#ec8c69" },
      { id: "1", label: "蔚蓝", value: "#1e80ff" },
      { id: "2", label: "浅绿", value: "lightgreen" },
      { id: "3", label: "浅紫", value: "rgb(183, 140, 247)" },
    ];
    return {
      config: {
        grayscale: false, //灰度
        theme: "", //主题：目前默认有四种
        menu_pos: "0", //个人信息显示位置：0,1
        swiperList: [], //轮播图列表
        userImageAnimation: true, //头像动画
        waveAnimation: true, //波浪动画
      },
      dialogImageUrl: "",
      dialogVisible: false,
      themes,
      isChange: false,
    };
  },
  watch: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    config: {
      deep: true,
      handler() {
        this.isChange = true;
      },
    },
  },
  created() {
    this.config = JSON.parse(sessionStorage.getItem("config")) || {};
  },
  methods: {
    ...mapMutations("config", ["UpdateConfig"]),

    // 点击保存按钮事件
    handleSave() {
      this.UpdateConfig(this.config);
        // this.$forceUpdate()
      location.reload()

      setTimeout(() => {
        
        this.$nextTick(() => {
          this.$message.success("保存成功！");
          this.$router.push({ name: "user" });
        })
      }, 500);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("handlePictureCardPreview", file);
    },
    handleSuccess(response, file, fileList) {
      console.log("handleSuccess", response, file, fileList);
    },
    handleBeforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!");
      }
      if (!isLt8M) {
        this.$message.error("上传头像图片大小不能超过 8MB!");
      }
      return isJPG && isLt8M;
    },
  },
};
</script>

<style scoped lang='scss'>
.title {
  margin-bottom: 2rem;
  text-align: center;
  color: var(--bgc-clr4);
}
.el-divider {
  margin: 3rem 0;

  .session-title {
    color: var(--bgc-clr6);
    font-size: 2em;
    font-weight: bold;
  }
}

.session {
  padding-left: 3rem;
  padding-bottom: 1rem;
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);

  .session-item {
    display: flex;
    margin-bottom: 2rem;

    .item-title {
      margin-right: 2rem;
      font-size: 1.2rem;
      span {
        color: var(--bgc-clr4);
      }
    }
  }
}
.root {
  position: relative;
}

.btn-save {
  position: absolute;
  right: -10rem;
  bottom: 10%;
  z-index: 20;
  width: 6rem;
  height: 3rem;
  transition: 2s;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: linear-gradient(90deg, var(--pink-1), var(--pink-2));
  cursor: pointer;

  span {
    font-size: 1.2rem;
  }

  .iconfont {
    font-size: 1.5rem;
  }
}

.btn-save:hover {
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--pink-1);
}
</style>