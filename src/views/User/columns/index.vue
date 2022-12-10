<template>
  <div>
    <el-divider content-position="center">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold"
        >专栏管理</span
      >
    </el-divider>

        <div class="container">
      <div class="drop" :style="'--clr:' + item.color" v-for="item in columnList" :key="item.id">
        <div class="content">
          <h2 v-text="item.label"></h2>
          <p v-text="item.discription"></p>
          <a href="#" @click="gotoColumn(item.id)">Read More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const columnList = [
  {
    id: 0,
    label: "web开发",
    color: '#ff0f5b',
    discription: 'web开发的流程化控制过程',
    publishImage:
        "https://tva1.sinaimg.cn/large/008cs7isly8h88hfgvz1qj31ao0t6n3x.jpg"
  },
  {
    id: 1,
    label: "flutter生态",
    color: '#01b4ff',
    discription: 'flutter从0构建andrio APP'
  },
  {
    id: 3,
    label: "中后台应用",
    color: '#be01fe',
    discription: '面向企业级的中后台配置方案'
  },
  {
    id: 4,
    label: "测试1",
    color: '#777',
    discription: '面向企业级的中后台配置方案'
  },
  {
    id: 5,
    label: "测试2",
    color: '#000',
    discription: '面向企业级的中后台配置方案'
  },
  {
    id: 6,
    label: "测试3",
    color: 'green',
    discription: '面向企业级的中后台配置方案'
  },
];
export default {
  name: "columnPage",
  data() {
    return {
      columnList,
    };
  },
  methods: {
    // 跳转到文章详情
    gotoColumn(id) {
      this.$router.push(`/user/column/${id}`);
    },
  }
};
</script>

<style scoped>
@import "@/assets/css/user-data/css/style.css";
</style>