<template>
  <div :class="'header' + (hiddenHeader ? ' hidden' : ' show')">
    <div class="header-center">
      <div class="center-left">
        <span class="username" v-text="username || '☺'"></span>
        <div class="menu">
          <div
            class="menu-item iconfont icon-coursera"
            @click="$router.push({ name: 'passage' })"
          >
            <span>&nbsp;博客大厅</span>
          </div>
          <div class="menu-item iconfont icon-home no-underline">
            <span @click="goToPage('user')">&nbsp;个人主页</span>
            <div class="menu-list-children">
              <div
                class="menu-item iconfont icon-Category"
                @click="goToPage('cate')"
              >
                <span>&nbsp;分类</span>
              </div>
              <div class="menu-item iconfont icon-tag" @click="goToPage('tag')">
                <span>&nbsp;标签</span>
              </div>
            </div>
          </div>

          <div class="menu-item iconfont icon-aboutshare">
            <span>&nbsp;关于</span>
          </div>
        </div>
      </div>
      <div class="center-right">
        <el-input
          type="text"
          placeholder="输入文章关键词"
          class="input-box"
          v-if="inputOpen"
          ref="input"
          v-model="keyword"
          @blur="inputOpen = false"
          @keyup.enter.native="handleSearch"
        />
        <span
          class="icon iconfont icon-search"
          v-else
          @click="openInputBox"
        ></span>
        <span
          class="icon iconfont icon-setting"
          @click="goToPage('setting')"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userHeaderComponent",
  props: ["username"],
  data() {
    return {
      inputOpen: false,
      keyword: '',
      oldScrollTop: 0,
      hiddenHeader: false
    };
  },
  mounted() {
    // 添加头部监听和销毁监听
    window.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true)
  },
  methods: {
    // 监听鼠标事件：用来控制头部的隐藏或显示
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      if(scrollTop > this.oldScrollTop) {
        if(scrollTop > 300 && !this.hiddenHeader) this.hiddenHeader = true
      } else {
        if(this.hiddenHeader) this.hiddenHeader = false
      }
      this.oldScrollTop = scrollTop
    },

    // 搜索文章事件
    handleSearch() {
      if(!this.keyword.trim()) return
      this.$emit('handleSearch', this.keyword)
      this.keyword = ''
    },

    // 打开搜索框特效
    openInputBox() {
      this.inputOpen = true;
      
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    goToPage(urlName) {
      if (this.$route.name.includes(urlName)) return;
      this.$router.push({ name: urlName });
    },
  },
};
</script>

<style scoped lang='scss'>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  height: 4rem;
  width: 100%;
  background-color: transparent;
  min-width: 780px;
  animation: hiddenHeaderAnimate 1s ease-in-out 0s;

  .header-center {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;

    .center-left {
      display: flex;
      align-items: center;

      .username {
        font-size: 1.5rem;
        margin-right: 2rem;
        cursor: pointer;
      }

      .menu {
        display: flex;

        .menu-item {
          font-size: 1.2rem;
          margin-right: 1.5rem;
          padding-left: 0.2rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid transparent;
          transition: 0.4s;
          cursor: pointer;
        }

        .menu-item:hover {
          border-bottom: 1px solid var(--bgc-1);

          .menu-list-children {
            visibility: visible;
          }
        }

        .no-underline:hover {
          border-bottom: 1px solid transparent;
        }

        .menu-list-children {
          position: absolute;
          top: 4rem;
          visibility: hidden;
          transition: 0.4s ease-in;
          background-color: var(--bgc-6);
          border-top-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          transform: translateX(-1rem);

          .menu-item {
            padding: 0.75rem 1.5rem;
            border-radius: 0.25rem;
            margin-right: 0;
            font-size: 1.1rem;
            border-bottom: 1px solid transparent;
          }

          .menu-item:first-child {
            border-top-left-radius: 1.5rem;
          }

          .menu-item:last-child {
            border-bottom-right-radius: 1.5rem;
          }

          .menu-item:hover {
            background: linear-gradient(90deg, var(--pink-1), var(--pink-2));
            font-size: 1.2rem;

            span {
              transform: translateX(1rem);
            }
          }
        }
      }
    }

    .center-right {
      display: flex;
      align-items: center;

      .input-box {   
        width: 20rem;
        animation: extend 1s ease-in-out;

        /deep/input {
          background-color: transparent;
          border-radius: 1rem;
          color: #fff;
        }

        /deep/input::placeholder {
          color: #fff;
        }
      }

      .icon {
        font-size: 1.6rem;
        cursor: pointer;
        margin-left: 1rem;
      }

      .icon-setting {
        font-size: 2rem;
      }
    }
  }
}

.header:hover {
  background-color: var(--white-a4);
}

.hidden {
  visibility: hidden;
  background-color: var(--white-a2);
  color: #000;
}

.show {
  visibility: visible;
}

@keyframes hiddenHeaderAnimate {
  100% {
    opacity: 100;
    transform: translate(0);   
    background-color: var(--white-a2);
    color: #000;
  }

  0% {
    opacity: 0;
    
    transform: translateY(-4rem); 
  }
}

</style>