<template>
  <div>
    <div class="container">
      <div>
        <div cols="12" md="3" class="link">
          <el-card>
            <div class="py-4 links">
              <h3 class="pl-3 pb-3">目录</h3>
              <ul>
                <li
                  v-for="(nav, index) in navList"
                  :key="index"
                  :class="{ on: activeIndex === index }"
                  @click="currentClick(index)"
                >
                  <a href="javascript:;" @click="pageJump(nav.index)">{{
                    nav.title
                  }}</a>
                  <div
                    v-if="nav.children.length > 0"
                    class="menu-children-list"
                  >
                    <ul class="nav-list">
                      <li
                        v-for="(item, idx) in nav.children"
                        :key="idx"
                        :class="{ on: childrenActiveIndex === idx }"
                        @click.stop="childrenCurrentClick(idx)"
                      >
                        <a href="javascript:;" @click="pageJump(item.index)">{{
                          item.title
                        }}</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {marked} from 'marked'

let rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});
export default {
  props: {
    article: {
        type: String,
        default: ''
    },
  },
  data() {
    return {
      html: "", //文章内容
      navList: [],
      activeIndex: 0,
      docsFirstLevels: [],
      docsSecondLevels: [],
      childrenActiveIndex: 0,
    };
  },
  computed: {
    content() {
        return this.html
    },
        //此函数将markdown内容进一步的转换
    compiledMarkdown: function() {
      let index = 0;
      rendererMD.heading = function(text, level) {
        //我比较习惯三级和四级目录，这里看你喜欢
        if (level <= 4) {
          return `<h${level} id="data-${index++}">${text}</h${level}>`;
        } else {
          return `<h${level}>${text}</h${level}>`;
        }
      };

      return marked(this.content);
    },
  },
  mounted() {
    this.getArticleDetail();
  },
  methods: {
    async getArticleDetail() {
      this.html = this.article
      this.navList = this.handleNavTree();
      this.getDocsFirstLevels(0);
    },
    childrenCurrentClick(index) {
      this.childrenActiveIndex = index;
    },
    getDocsFirstLevels(times) {
      // 解决图片加载会影响高度问题
      setTimeout(() => {
        let firstLevels = [];
        Array.from(document.querySelectorAll("h3"), (element) => {
          firstLevels.push(element.offsetTop - 60);
        });
        this.docsFirstLevels = firstLevels;

        if (times < 8) {
          this.getDocsFirstLevels(times + 1);
        }
      }, 500);
    },
    getDocsSecondLevels(parentActiveIndex) {
      let idx = parentActiveIndex;
      let secondLevels = [];
      let navChildren = this.navList[idx].children;

      if (navChildren.length > 0) {
        secondLevels = navChildren.map((item) => {
          return this.$el.querySelector(`#data-${item.index}`).offsetTop - 60;
        });
        this.docsSecondLevels = secondLevels;
      }
    },
    getLevelActiveIndex(scrollTop, docsLevels) {
      let currentIdx = null;
      let nowActive = docsLevels.some((currentValue, index) => {
        if (currentValue >= scrollTop) {
          currentIdx = index;
          return true;
        }
      });

      currentIdx = currentIdx - 1;

      if (nowActive && currentIdx === -1) {
        currentIdx = 0;
      } else if (!nowActive && currentIdx === -1) {
        currentIdx = docsLevels.length - 1;
      }
      return currentIdx;
    },
    pageJump(id) {
      // this.titleClickScroll = true;
      // //这里我与原作者的不太一样，发现原作者的scrollTop一直为0，所以使用了Vuetify自带的goTo事件
      // this.$vuetify.goTo(this.$el.querySelector(`#data-${id}`).offsetTop - 40);
      // setTimeout(() => (this.titleClickScroll = false), 100);
    },
    currentClick(index) {
      this.activeIndex = index;
      this.getDocsSecondLevels(index);
    },
    getTitle(content) {
      let nav = [];

      let tempArr = [];
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1) {
        let title = match.replace("\n", "");
        let level = m1.length;
        tempArr.push({
          title: title.replace(/^#+/, "").replace(/\([^)]*?\)/, ""),
          level: level,
          children: [],
        });
      });

      // 只处理二级到四级标题，以及添加与id对应的index值，这里还是有点bug,因为某些code里面的注释可能有多个井号
      nav = tempArr.filter((item) => item.level >= 2 && item.level <= 4);
      global.console.log(nav);
      let index = 0;
      return (nav = nav.map((item) => {
        item.index = index++;
        return item;
      }));
    },
    // 将标题数据处理成树结构
    handleNavTree() {
      const navs = this.getTitle(this.content)
      navs.forEach((item) => {
        const parentIndex = this.getParentIndex(navs, item.index)
        item.parent = parentIndex
      })
      return this.filterArray(navs)
    },
    filterArray(data, parent) {
      const self = this
      var tree = []
      var temp
      for (var i = 0; i < data.length; i++) {
        if (data[i].parent === parent) {
          var obj = data[i]
          temp = self.filterArray(data, data[i].index)
          if (temp.length > 0) {
            obj.children = temp
          }
          tree.push(obj)
        }
      }
      return tree
    },
    find(arr, condition) {
      return arr.filter((item) => {
        for (let key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });
    },
    getParentIndex(nav, endIndex) {
      for (var i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
          return nav[i].index;
        }
      }
    },
    appendToParentNav(nav, parentIndex, newNav) {
      let index = this.findIndex(nav, {
        index: parentIndex,
      });
      nav[index].children = nav[index].children.concat(newNav);
    },
    findIndex(arr, condition) {
      let ret = -1;
      arr.forEach((item, index) => {
        for (var key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        ret = index;
      });
      return ret;
    },
  },
};
</script>

<style scoped lang='scss'>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

ul {
  list-style-type: none;
  padding: 2px 6px;
}
li {
  list-style-type: none;
  margin: 2px 6px;
}
a {
  color: #42b983;
  text-decoration: none;
}

.link {
    position: fixed;
    top: 0rem;
    padding-top: 1rem;
  }
  .link_cover {
    max-height: 20rem;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: visible;
  }
// @media screen and (min-width: 960px) {
//   .link {
//     padding-top: 100px;
//     position: fixed;
//     right: 25px;
//     top: 100;
//   }
//   .link_cover {
//     max-height: 400px;
//     overflow: scroll;
//     overflow-x: hidden;
//     overflow-y: visible;
//   }
// }
// @media screen and (min-width: 1060px) {
//   .link {
//     padding-top: 100px;
//     position: fixed;
//     right: 50px;
//     top: 100;
//   }
//   .link_cover {
//     max-height: 400px;
//     overflow: scroll;
//     overflow-x: hidden;
//     overflow-y: visible;
//   }
// }
</style>
