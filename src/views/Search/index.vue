<template>
  <div>
    <Header />
    <el-row class="main">
      <div class="main-inner">
        <el-col class="message-left">
          <el-card class="box-card">
            <div class="order-list">
              <span
                v-for="item in order"
                :key="item.value"
                :class="
                  'order-item' + (orderActive === item.value ? ' active' : '')
                "
                @click="handleChangeOrderActive(item.value)"
                >{{ item.label }}</span
              >
            </div>
            <div class="passage-list" v-if="passageList.length !== 0">
              <PassageList :passageList="passageList" :keyword="keyword" />
            </div>
            <div class="loading" v-else-if="isLoading">
              <el-skeleton />
            </div>
            <div class="empty" v-else>
              <el-empty
                :image-size="200"
                description="内容空空如也！"
              ></el-empty>
            </div>
          </el-card>
        </el-col>
        <el-col class="message-right"> </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header";
import PassageList from "@/components/passage/passage-list.vue";
import { mapActions } from "vuex";
import { throttle } from "@/utils";

const order = [
  { label: "综合排序", value: 1 },
  { label: "最新优先", value: 2 },
  { label: "最热优先", value: 3 },
];

export default {
  name: "SearchPages",
  components: { Header, PassageList },
  data() {
    return {
      passageList: [],
      order,
      orderActive: 1,
      keyword: "",
      isLoading: false,
      pageMap: {
        page: 1,
        size: 5,
      },
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.keyword = this.$route.query.key;
        this.getData();
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
    window.addEventListener("scroll", this.handleScroll, false);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    ...mapActions("passage", [
      "searchAdviceBlog",
      "searchHotBlog",
      "searchLatestBlog",
    ]),

    async getData(type) {
      try {
        this.isLoading = true;
        const params = {
          userId: this.user.id || 0,
          keyword: this.keyword,
          ...this.pageMap,
        };
        let data = {};
        switch (this.orderActive) {
          case 1:
            data = await this.searchAdviceBlog(params);
            break;
          case 2:
            console.log(params);
            data = await this.searchLatestBlog(params);
            break;
          case 3:
            data = await this.searchHotBlog(params);
            break;
          default:
            this.$message.error("出错了");
        }
        this.isLoading = false;
        if (data.data.code !== 200 || data.data.data.length === 0)
          return this.$message.info("没有更多数据了");
        this.passageList = type ? this.passageList.concat(data.data.data) : data.data.data
      } catch (e) {
        this.$message.error(e);
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
        throttle(that.addPage(), 1000); //节流函数，每1000ms触发一次
      }
    },

    handleChangeOrderActive(id) {
      this.orderActive = id;
      this.getData()
    },
  },
};
</script>

<style scoped lang='scss'>

.active {
  color: #1e80ff;
}

.main {
  padding-top: 20px;
  background-color: var(--bgc-1);

  .main-inner {
    width: 70rem;
    margin: 0 auto;
    background-color: var(--bgc-2);

    .message-left {
      width: 75%;

      .box-card{
        min-height: 95vh;
        background-color: var(--bgc-1)
      }
      

      .order-list {
        margin-bottom: 2rem;
      }

      .passage-list {
        
      }
    }

    .message-right {
      float: right;
      width: 22%;
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
</style>