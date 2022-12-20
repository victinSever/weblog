<template>
  <div>
    <mavon-editor
      v-model="editData"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      class="mavon-editor"
      :placeholder="placeholder"
      ref="md"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入内容..",
    },
  },
  data() {
    return {
      editData: this.content,
      imgFile: [],
    };
  },
  mounted() {
    console.log(this.editData);
  },
  methods: {
    ...mapActions("image", ["getImageUrl"]),

    // 绑定@imgAdd event
    async imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      this.imgFile[pos] = $file;
      try {
        const {data:res} = await this.getImageUrl(formdata);
        this.$refs.md.$img2Url(pos, res.data.minIoUrl)
      } catch (err) {
        this.$message.error(err);
      }
    },
    imgDel(pos) {
      delete this.imgFile[pos];
    },
  },
};
</script>

<style scoped lang='scss'>
.mavon-editor {
    height: 92vh;
  }
</style>