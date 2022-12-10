<template>
  <div class="passage-list">
    <div
      v-for="(item, index) in passageList"
      :key="item.id"
      :class="'passage-item' + (index % 2 ? ' even' : ' odd')"
      @click="gotoPost(item)"
    >
    <!-- 封面 -->
      <div class="publishImage" v-if="item.publishImage">
        <el-image :src="item.publishImage" alt=""></el-image>
      </div>
      <!-- 信息 -->
      <div :class="'publishInfo ' + (item.publishImage ? '' : 'full')">
        <div class="item-top">
          <span>{{ item.publishTime }}</span>
        </div>

        <div class="item-main">
          <h4 class="title" v-html="highlight(item.title)"></h4>
          <p class="discription" v-html="highlight(item.content)"></p>
        </div>
        <div class="item-bottom">
          <span class="iconfont icon-view"> {{ " " + item.view }}</span>
          <span class="iconfont icon-31dianzan"> {{ " " + item.dianzan }}</span>
          <span class="iconfont icon-pinglun"> {{ " " + item.comment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "passageItem",
  props: {
    passageList: {
      type: Array,
      default: () => [],
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 添加高亮
    highlight(str) {
      if (!this.keyword) return str;
      const arr = str.split(this.keyword);
      return arr.join(`<span class="highlight">${this.keyword}</span>`);
    },

    // 跳转到文章详情
    gotoPost(item) {
      this.$router.push({
        name: "post",
        params: {
          ...item,
        },
      });
    },
  },
};
</script>

<style scoped lang='scss'>


.passage-item {
  padding: 20px 0;
  min-width: 780px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);

  .publishImage {
    width: 40%;
    height: 100%;
    border-radius: 1rem;
    overflow: hidden;

    .el-image {
      border-radius: 1rem;
      transition: .4s;
      // width: 120%;
      // height: 120%;
    }

    .el-image:hover {
      transform: rotate(5deg) scale(115%);
    }
  }

  .publishInfo {
    width: 60%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-top,
  .item-bottom {
    span {
      padding-right: 10px;
    }
  }

  .item-top {
    display: flex;
    justify-content: flex-end;
    color: var(--bgc-clr4);
    font-weight: bold;
  }

  .item-main {
    margin-bottom: 1rem;

    .title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--bgc-clr2);
    }

    .discription {
      color: var(--bgc-clr4);
      max-height: 4rem;
      // 多行文字超出
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  .item-bottom {
    color: #2f3133;
    display: flex;
    align-items: flex-end;

    .iconfont {
      font-size: 14px;
    }
  }
}

.even {
  flex-direction: row-reverse;

  .item-top {
    justify-content: flex-start;
  }
}

.odd {
  flex-direction: row;
}

.passage-item .full {
    width: 100%;

    .item-top {
      justify-content: flex-start;
      margin-bottom: 1rem;
    }
}

.passage-item:hover {
  box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow-hover);
}


</style>