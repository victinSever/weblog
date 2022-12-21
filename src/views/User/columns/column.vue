<template>
  <div>
    <el-divider content-position="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/user/columns' }"
          ><span class="breadcrumb-title">全部专栏</span></el-breadcrumb-item
        >
        <el-breadcrumb-item
          ><span class="breadcrumb-title">{{column.column_name}}</span></el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-divider>

    <div class="container">
      <div class="main" v-if="column">
        <div class="header">
          <div class="header-left">
            <el-image
            v-if="column.cover"
              :src="column.cover || '#'"
              alt=""
              style="height: 100%"
            ></el-image>
          </div>
          <div class="header-right">
            <h2 class="column-title" v-text="column.column_name"></h2>
            <p class="column-title" v-text="column.discription"></p>
            <div class="info" v-if="column.createTime">
              <span
                class="publishTime"
                v-text="'创建于' + column.createTime"
              ></span>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="tip">
            <span class="tip-title" v-text="'收录文章'"></span>
          </div>
          <div class="column-list" v-if="passageList.length !== 0">
            <UserPassageList :passageList="passageList" />
          </div>
          <el-skeleton class="loading" v-else-if="isLoading" />
          <el-empty class="empty" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPassageList from "@/components/passage/passage-list.vue";
const column = {
  id: 0,
  title: "web开发",
  disription: "web开发",
  publishTime: "2022-11-20 10:20:20",
  publishImage:
    "https://tva1.sinaimg.cn/large/008cs7isly8h88hfgvz1qj31ao0t6n3x.jpg",
  passageList: [
    {
      id: "12312",
      username: "法盲张三",
      userImage:
        "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
      publishImage:
        "https://tva1.sinaimg.cn/large/008cs7isly8h88hfgvz1qj31ao0t6n3x.jpg",
      publishTime: "2022-11-1 19:00:00",
      title: "何劳荣一案，到底谁是真正的主谋？个人理解，大家交流一下",
      content:
        "何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家",
      view: "6.1w",
      dianzan: "372",
      comment: "271",
    },
  ],
};
import { mapActions } from "vuex";

export default {
  name: "columnDetailPage",
  data() {
    return {
      column: {},
      passageList: [],
      total: 0,
      isLoading: false,
      pageMap: {
        page: 1,
        size: 100
      }
    };
  },
  components: { UserPassageList },
  mounted() {
    console.log(this.$route.query);
    this.column = this.$route.query || {}
    this.getData();
  },
    computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  methods: {
    ...mapActions("person", ["selectBlogListByColumnId"]),

    async getData() {
      try {
        const { data: res } = await this.selectBlogListByColumnId({
          userId: this.user.id,
          columnId: this.$route.params.columnId,
          ...this.pageMap
        });
        if (res.code == 200) {
          this.passageList = res.data;
          this.total = res.map.total;
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.breadcrumb-title {
  color: var(--bgc-clr6);
  font-size: 1.5em;
  font-weight: bold;
  transition: 0.4s;
}

.session-title:hover {
  color: var(--bgc-clr5);
}

.main {
  width: 100%;

  .header {
    border-radius: 0.5rem;
    display: flex;
    padding: 1rem;
    box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
    margin-bottom: 2rem;

    .header-left {
      width: 15rem;
      margin-right: 1rem;

      .el-image {
        border-radius: 0.5rem;
        width: 100%;
        height: 100%;
      }
    }

    .header-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .column-title {
        margin-bottom: 1rem;
      }

      .info {
        margin-bottom: 1rem;
        .publishTime {
        }
      }
    }
  }

  .content {
    box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
    padding: 1rem;
    min-height: 75vh;

    .tip {
      padding-left: 2rem;
      border-bottom: 1px solid var(--bgc-clr6);
      color: var(--bgc-clr6);

      .tip-title {
        height: 100%;
        display: inline-block;
        padding: 0.5rem 0;
        font-size: 1.2rem;

        border-bottom: 0.15rem solid var(--bgc-clr2);
      }
    }
  }
}
</style>