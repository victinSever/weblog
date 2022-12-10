<template>
  <div class="root">
    <ul class="menu-list">
        <li 
        v-for="item in menuList" 
        :key="item.id"
        :class="'menu-item' + (item.id === active ? ' active' : '')"
        @click="handleChange(item)">
            <span :class="'icon iconfont ' + item.icon" ></span>
            <span class="label" v-text="item.label"></span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "userMenuCompontent",
  data() {
    const menuList = [
      { id: "0", label: "首页", icon: "icon-home", routername: "user" },
      { id: "1", label: "文章", icon: "icon-coursera", routername: "essays" },
      { id: "2", label: "动态", icon: "icon-activity", routername: "active" },
      { id: "3", label: "专栏", icon: "icon-columns", routername: "columns" },
      { id: "4", label: "数据", icon: "icon-3501shuju", routername: "data" },
    ];
    return {
      menuList,
      active: '0'
    };
  },
  created() {
    const menu = this.menuList.find(item => {
      return this.$route.name.includes(item.routername)
    })
    this.active = menu ? menu.id : '1'
  },
  methods: {
    // 更改菜单路由
    handleChange(menu) {
      this.active = menu.id
      if(this.$route.name.includes(menu.routername)) return
      this.$router.push({ name: menu.routername })
    },
    // 父组件改变菜单显示的回调
    changeMenuByParent(id) {
      this.active = id
    }
  },
};
</script>

<style scoped lang='scss'>
.menu-list {
    .menu-item {
        height: 3rem;
        width: 10rem;
        margin: 1rem 0;
        display:flex;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        color: var(--bgc-clr4);
        font-size: 1.2rem;
        transition: all 0.2s ease-in-out 0s;
        cursor: pointer;

        .icon {
            margin-right: 1rem;
        }
    }

    .menu-item:not(.active):hover {
        background: var(--bgc-clr5);
    }

    .active {
        background: linear-gradient(90deg, var(--pink-1), var(--pink-2));
        color: #fff;
    }

    .active:hover {
        box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--pink-1);
    }
}
</style>