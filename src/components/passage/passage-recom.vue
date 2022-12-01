<template>
  <ul class="recom-list">
    <h3 class="recom-title">优质领域博主</h3>
    <li
      class="recom-item"
      v-for="item in recomList"
      :key="item.id"
      @click="gotoLink(item)"
    >
      <el-image v-if="item.userImage" :src="item.userImage"></el-image>
      <el-image
        v-else
        src="https://tva2.sinaimg.cn/large/008cs7isly8h88i9ec08sj30u00u379u.jpg"
      ></el-image>
      <span v-text="item.username" class="username"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "recomPage",
  data() {
    const recomList = [
      {
        id: "1",
        userImage:
          "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
        username: "法盲张三",
      },
      {
        id: "2",
        userImage:
          "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
        username: "法盲张三",
      },
      {
        id: "3",
        userImage:
          "https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",
        username: "法盲张三",
      },
    ];
    return {
      recomList,
    };
  },
  methods: {
    gotoLink(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style scoped lang='scss'>
$bgc: blue;

.recom-list {
  margin: 1rem 0;
  background-color: #fff;
  padding: 1rem;

  .recom-title {
    background: #fcfcfc;
  }

  .recom-item {
    height: 2.2rem;
    display: flex;
    align-items: center;
    margin: 1rem 0;
    cursor: pointer;
    color: $color;

    .el-image {
      height: 100%;
      border-radius: 50%;
      margin-right: 1rem;
    }
  }

  .recom-item:hover {
    .username {
      color: $bgc;
    }
  }
}
</style>