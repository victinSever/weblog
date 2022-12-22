<template>
  <div class="postBtns">
    <div
      :class="'item' + (index === 0 && haveLiked ? ' active' : '')"
      v-for="(item, index) in btns"
      :key="item.id"
      @click="handleClick(item.id)"
    >
      <span :class="'iconfont ' + item.icon"></span>
      <span class="bar" v-if="item.num" v-text="item.num"></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "postBtns",
  props: {
    blog: Object,
  },
  data() {
    const btns = [
      { icon: "icon-31dianzan", id: 0, num: 0 },
      { icon: "icon-pinglun", id: 1, num: 0 },
      { icon: "icon-shoucang", id: 2 },
      { icon: "icon-jubao", id: 3 },
    ];
    return {
      btns,
      haveLiked: false
    };
  },
  mounted() {
    this.haveLiked = this.blog.haveLiked
    this.btns[0].num = this.blog.likeAmount
    this.btns[1].num = this.blog.commentAmount
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  methods: {
    ...mapActions("passage", ["likeBlog"]),

    // 点赞文章
    async handleLikeBlog() {
      if (!this.user) return this.$message.info('该功能需要登录后操作')

      try {
        const { data: res } = await this.likeBlog({
          userId: this.user.id,
          blogId: this.blog.blogId,
          blogUserId: this.blog.userId
        });
        if (res.code == 200) {
          if (this.haveLiked) this.btns[0].num--;
          else this.btns[0].num++;
          this.haveLiked = !this.haveLiked;
          this.$message.success(res.msg);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    HandleGotoComment() {
      this.$emit('HandleGotoComment')
    },

    handleCollet() {
        this.$message.warning('该接口暂时未开放')
    },

    handleClick(id) {
      switch (id) {
        case 0:
          this.handleLikeBlog();
          break;
          case 1:
          this.HandleGotoComment();
          break;
          case 2: this.handleCollet(); break;
          case 3: this.handleCollet(); break;
      }
    },

    
  },
};
</script>

<style scoped lang='scss'>
.postBtns {
  // width: 100px;
  display: flex;
  flex-direction: column;

  .item {
    padding: 0.8rem 1rem;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    margin-bottom: 20px;
    position: relative;
    transition: 0.4s;
    border: 1px solid var(--bgc-clr5);

    .iconfont {
      color: rgb(175, 170, 170);
      transition: 0.4s;
    }

    .bar {
      position: absolute;
      top: 0;
      right: -10px;
      height: 15px;
      width: 15px;
      text-align: center;
      line-height: 15px;
      border-radius: 10px;
      padding: 0 5px;
      font-size: 0.6rem;
      background-color: var(--bgc-clr3);
      color: #fff;
    }
  }

  .item:hover .iconfont {
    color: rgb(26, 23, 23);
  }

  .active {
    .iconfont {
      color: var(--bgc-clr2);
    }

    .bar {
      background-color: var(--bgc-clr2);
    }
  }
}
</style>