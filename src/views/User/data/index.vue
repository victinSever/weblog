<template>
  <div>
    <el-divider content-position="center">
      <span
        class="session-title"
        style="color: var(--bgc-clr6); font-size: 2em; font-weight: bold"
        >博客数据</span
      >
    </el-divider>

    <div class="container">
      <div class="drop" :style="'--clr:' + item.color" v-for="item in dataList" :key="item.id">
        <div class="content">
          <h2 v-text="item.label">新</h2>
          <p v-text="item.blog.title"></p>
          <a href="#" @click="gotoPost(item.blog)">Read More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dataList = [
  {
    id: 0,
    label: "新",
    color: '#ff0f5b',
    blog: {
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
      isview: false,
    },
  },
  {
    id: 1,
    label: "热",
    color: '#01b4ff',
    blog: {
      id: "21321312",
      username: "暴力美学",
      userImage:
        "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
      publishImage:
        "https://tva1.sinaimg.cn/large/008cs7isly8h88hfgvz1qj31ao0t6n3x.jpg",
      publishTime: "2022-10-25 19:00:00",
      title: "这里有一个简单辩论，大家交流一下",
      content:
        "王大父杀人案   被贵人王大霞因丕满李良才与其争变瓷砖生意:产生杀人恶念:2002年3月18日晚8时资;" +
        "被告人王大雷把雇请的丢卫、马本全召到其在四川省成都市的住处，被告人米军、付强受被告" +
        "人王卫的邀约也一同前往。被告人王大雷对被告人王卫等四人说:“我有个老乡在跟我争夺销售" +
        "瓷砖生意，这笔生意关系到我一辈子的命运，做不成我就要破产。你们帮我教训他一顿。生意作成" +
        "了一定给你们好处。”随后，王大雷让王卫等人听候消息。次日晚8时许，王大雷探明了李良才的" +
        "行踪，即挂电话告知王卫。王卫约上马本全、米军、付强，分别携带长刀、菜刀、木工锯、匕首" +
        "来到王大雷住处。王大雷说:“我那位老乡9点多钟才回来，被贵人王大霞因丕满李良才与其争" +
        "变瓷砖生意:产生杀人恶念：2002年年3月18日晚8时资；被告人王大雷把雇请的丢卫、马本全" +
        "召到其在四川省成都市的住处，被告人米军、付强受被告人王卫的邀约也一同前往.被告人王" +
        "大雷对被告人王卫等四人说：“我有个老乡在跟我争夺销售瓷砖生意，这笔生意关系到我一辈" +
        "子的命运，做不成我就要破产.你们帮我教训他一顿.生意作成了一定给你们好处.“随后，王" +
        "大雷让王卫等人听候消息.次日晚8时许，王大雷探明了李良才的行踪，即挂电话告知王卫.王" +
        "卫约上马本全、米军、付强，分别携带长刀、菜刀、木工锯、匕首来到王大雷住处.王大雷说：" +
        "我那位老乡9点多钟才回来",

      view: "10w",
      dianzan: "255",
      comment: "1000",
      isview: false,
    },
  },
  {
    id: 3,
    label: "优",
    color: '#be01fe',
    blog: {
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
      isview: false,
    },
  },
];
export default {
  name: "dataPage",
  data() {
    return {
      dataList,
    };
  },
  methods: {
    // 跳转到文章详情
    gotoPost(item) {
      this.$router.push({
        name: "post",
        params: {
          ...item,
        },
      });
    },
  }
};
</script>

<style scoped>
@import "@/assets/css/user-data/css/style.css";
</style>