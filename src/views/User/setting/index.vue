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
          <el-select v-model="config.color" filterable placeholder="请选择">
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
            v-model="config.isGrey"
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
          <div class="bgc-list">
            <div
              class="bgc-item"
              v-for="(item, index) in config.backgroundImageList"
              :key="item + index"
            >
              <el-image class="image" :src="item || '#'" alt=""></el-image>
              <span
                class="iconfont icon-quxiao"
                @click="handleQvxiao(item, index)"
              ></span>
            </div>
          </div>
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
            <el-image width="100%" :src="dialogImageUrl || '#'" alt="" />
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
          <el-radio v-model="config.menuPlace" label="left">左侧</el-radio>
          <el-radio v-model="config.menuPlace" label="right">右侧</el-radio>
        </div>
      </div>
    </div>

    <el-divider content-position="left">
      <span class="session-title">个人链接设置</span>
    </el-divider>

    <div class="session">
      敬请期待
    </div>

    <el-divider content-position="left">
      <span class="session-title">动画设置</span>
    </el-divider>

    <div class="session">
      敬请期待
      <!-- <div class="session-item">
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
      </div> -->
    </div>
    <div class="session">
      <div
        class=" btn-save"
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
import { mapMutations, mapActions } from "vuex";
export default {
  name: "settingPage",
  data() {
    const themes = [
      { id: "0", label: "默认", value: "#1e80ff" },
      { id: "1", label: "棕黄", value: "#ec8c69" },
      { id: "2", label: "浅绿", value: "lightgreen" },
      { id: "3", label: "浅紫", value: "rgb(183, 140, 247)" },
      { id: "3", label: "粉色", value: "#ed6ea0" },
    ];
    return {
      config: {
        isGrey: 0, //灰度
        color: "blue", //主题：目前默认有四种
        menuPlace: "left", //个人信息显示位置：left,right
        backgroundImageList: [], //轮播图列表
        // userImageAnimation: true, //头像动画
        // waveAnimation: true, //波浪动画
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
        console.log(this.config);
        this.isChange = true;
      },
    },
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  mounted() {
    this.getConfig(this.user.id);
    this.config = this.$store.state.config.config;
    console.log(this.config);
  },
  methods: {
    ...mapMutations("config", ["UpdateConfig"]),
    ...mapActions("config", ["setUserTheme", "getConfig"]),

    handleQvxiao(obj) {
      this.config.backgroundImageList = this.config.backgroundImageList.filter(item => {
          return !(obj === item);
        }
      );
    },

    // 点击保存按钮事件
    async handleSave() {
      try {
        const params = {
          userId: this.user.id || 0,
          ...this.config,
        }
        params.isGrey = params.isGrey ? 1 : 0
        const { data: res } = await this.setUserTheme(params);
        console.log(res);
        if (res.code === 200) {
          this.UpdateConfig(this.config);
          this.$message.success("保存成功！");
        } else this.$message.warning(res.msg)
      } catch (e) {
        this.$message.error(e);
      }
    },

    handleRemove(file, fileList) {
      this.handleQvxiao(file.response.data.minIoUrl)
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("handlePictureCardPreview", file);
    },
    handleSuccess(response, file, fileList) {
      if(this.config.backgroundImageList.length >= 6) return this.$message.warning('背景图限制6张哦！')
      this.config.backgroundImageList.push(response.data.minIoUrl)
      console.log("handleSuccess", response, file, fileList);
    },
    handleBeforeUpload(file) {
      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isLt8M) {
        this.$message.error("上传头像图片大小不能超过 8MB!");
      }
      return isLt8M;
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

.bgc-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  .bgc-item {
    margin-right: 1rem;
    border-radius: 1rem;
    overflow: hidden;
    height: 10rem;
    width: 15rem;
    position: relative;
    margin-bottom: 1rem;

    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      transition: 0.4s;
    }

    .iconfont {
      position: absolute;
      transition: 0.4s;
      font-size: 1.2rem;
      color: #000;
      z-index: 2;
      border-radius: 0.5rem;
      padding: 0.5rem;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }

    .iconfont:hover {
      background-color: var(--pink-1);
      color: #fff;
    }
  }

  .bgc-item:hover {
    .el-image {
      transform: scale(110%) rotate(5deg);
    }

    .iconfont {
      top: 0.5rem;
      right: 0.5rem;
    }
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
      min-width: 5rem;
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
  margin-top: 2rem;
  margin-bottom: 5rem;
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