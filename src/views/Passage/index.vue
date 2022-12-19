<template>
  <div id="scroll-lisener">
    <!-- header -->
    <Header />
    <!-- banner -->
    <el-row class="header">
      <div class="category-list">
        <span
          v-for="item in categoryList"
          :key="item.label"
          :class="
            'category-item' + (categoryActive === item.id ? ' active' : '')
          "
          @click="handleChangeCategoryActive(item.id)"
          >{{ item.label }}</span
        >
      </div>
    </el-row>
    <!-- main -->
    <el-row class="main">
      <div class="main-inner">
        <el-col class="message-left">
          <el-card class="box-card">
            <div class="order-list">
              <span
                v-for="item in orderList"
                :key="item.label"
                :class="
                  'order-item' + (orderActive === item.value ? ' active' : '')
                "
                @click="handleChangeOrderActive(item.value)"
                >{{ item.label }}</span
              >
            </div>
            <div class="passage-list" v-if="passageList.length !== 0">
              <PassageList :passageList="passageList" />
            </div>
            <el-skeleton style="margin-top: 15px" v-else-if="isLoading" />
            <el-empty v-else></el-empty>
          </el-card>
        </el-col>
        <el-col class="message-right">
          <PassageSignIn />
          <PassageRecom />
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
const categoryList = [
  { id: 1, label: "全部", parentId: "" },
  { id: 2, label: "前端", parentId: "" },
  { id: 3, label: "后端", parentId: "" },
  { id: 4, label: "Andriod", parentId: "" },
  { id: 5, label: "IOS", parentId: "" },
  { id: 6, label: "人工智能", parentId: "" },
  { id: 7, label: "阅读", parentId: "" },
  { id: 8, label: "杂谈", parentId: "" },
];
const orderList = [
  { label: "推荐", value: 1 },
  { label: "最新", value: 2 },
  { label: "热榜", value: 3 },
];
import Header from "@/components/Header";
import PassageList from "@/components/passage/passage-list.vue";
import PassageSignIn from "@/components/passage/passage-signIn.vue";
import PassageRecom from "@/components/passage/passage-recom.vue";
import { mapActions } from "vuex";
import { throttle } from "@/utils";

export default {
  name: "passagePage",
  components: { Header, PassageList, PassageSignIn, PassageRecom },
  data() {
    return {
      categoryList,
      orderList,
      passageList: [],
      categoryActive: 1,
      orderActive: 1,
      loadTimes: 0,
      isLoading: false,

      // 文章分页，下拉刷新增加一页，固定大小为5条
      pageMap: {
        size: 5,
        page: 1,
      },
    };
  },
    computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, false);
    this.getData();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    ...mapActions("passage", ["getPassageList",'getPassageLatestList','getPassageHotList']),

    // 数据更新
    async getData(type) {
      try {
        this.isLoading = true;
        const params = {...this.pageMap, userId: this.user.id}
        let data = {}
        switch(this.orderActive){
          case 1: data = await this.getPassageList(params); break;
          case 2: data = await this.getPassageLatestList(params); break;
          case 3: data = await this.getPassageHotList(params); break;
          default: this.$message.error("出错了");
        }
        this.isLoading = false
        if (data.data.code !== 200) return this.$message.warning("没有更多数据了");
        this.passageList = type ? this.passageList.concat(data.data.data) : data.data.data;
      } catch (e) {
        this.$message.error("不好意思，服务器跑丢了~~");
      }
    },

    addPage() {
      this.pageMap.page++;
      this.getData(true);
    },

    // 监听鼠标位置，在到达地步150px长度触底，进行数据懒加载
    handleScroll() {
      const dis =
        document.body.offsetHeight - window.pageYOffset - window.innerHeight;
      if (dis <= 5) {
        if (this.isLoading) return; //节流
        let that = this;
        throttle(that.addPage(), 500); //节流函数，每500ms触发一次
      }
    },

    handleChangeCategoryActive(id) {
      this.categoryActive = id;
      this.getData();
    },
    handleChangeOrderActive(id) {
      this.orderActive = id;
      this.getData();
    },
  },
};
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #eeecec;
  box-shadow: 1px 1px 1px #ccc;
  font-size: 14px;
  color: #71777c;
  position: sticky;
  top: 0;
  z-index: 200;
  background-color: #fff;
  min-width: 700px;

  .category-list {
    width: 65%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;

    .category-item {
      padding: 0 10px;
      cursor: pointer;
    }

    .category-item:first-child {
      padding-left: 0;
    }

    .category-item:hover {
      color: #1e80ff;
    }
  }
}

.active {
  color: #1e80ff;
}

.main {
  background-color: #f4f5f5;
  padding-top: 20px;
  min-height: calc(100vh - 100px);
  min-width: 700px;

  .main-inner {
    width: 65%;
    margin: 0 auto;

    .message-left {
      width: 75%;    
      padding-bottom: 5rem;

      .box-card{
        min-height: 90vh;
      }
    }

    .message-right {
      float: right;
      width: 23%;
    }
  }
}

.order-list {
  font-size: 14px;
  color: #71777c;

  .order-item {
    margin-right: 15px;
    cursor: pointer;
  }

  .order-item:hover {
    color: #1e80ff;
  }
}

.passage-list,
.el-skeleton {
  padding-top: 5px;
}

@media screen and (max-width: 1500px) {
  .main .main-inner {
    .message-left {
      width: 100%;
    }
    .message-right {
      display: none;
    }
  }
}

@media screen and (max-width: 1350px) {
  .header {
    .category-list {
      width: 80%;
    }
  }
  .main .main-inner {
    width: 80%;
  }
}

@media screen and (max-width: 1000px) {
  .header {
    .category-list {
      width: 95%;
    }
  }
  .main .main-inner {
    width: 95%;
  }
}
</style>