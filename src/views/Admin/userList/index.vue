<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审核记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="table" style="margin-top: 2rem">
      <!-- 顶部按钮 -->
      <div class="table-header">
        <div class="table-header-left">
          <el-button
            type="danger"
            class="el-icon-delete"
            size="mini"
            @click="handleDeleteMore()"
            >删除</el-button
          >
        </div>
        <div class="table-header-right">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button
              class="el-icon-refresh right-btns"
              size="small"
              @click="refreshPage"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="密度" placement="top">
            <el-button
              class="el-icon-s-operation right-btns"
              size="small"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置" placement="top">
            <el-button
              class="el-icon-setting right-btns"
              size="small"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="全屏" placement="top">
            <el-button class="el-icon-rank right-btns" size="small"></el-button>
          </el-tooltip>
        </div>
      </div>

      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" fixed>
        </el-table-column>
        <el-table-column type="index" width="50" align="center" fixed>
        </el-table-column>

        <el-table-column prop="id" label="用户ID" width="120" align="center">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="用户昵称"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="headshot" label="头像" width="120" align="center"
          ><template slot-scope="scope">
            <el-avatar
              shape="square"
              :size="30"
              :src="scope.row.headshot"
              style="margin: 0 5px"
            ></el-avatar>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="手机号" width="120" align="center">
        </el-table-column>

        <el-table-column prop="email" label="邮箱" width="120" align="center">
        </el-table-column>

        <el-table-column prop="role" label="权限" width="120" align="center">
        </el-table-column>

        <el-table-column prop="ranking" label="排名" width="120" align="center">
        </el-table-column>

        <el-table-column
          prop="viewedAmount"
          label="浏览量"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="likedAmount"
          label="点赞数"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="blogAmount"
          label="博文数"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="fansAmount"
          label="粉丝数"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="commentAmount"
          label="评论数"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="collectedAmount"
          label="收藏数"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              class="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageMap.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageMap.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "userListPage",
  data() {
    return {
      pageMap: {
        size: 10,
        page: 1,
      },
      total: 20,

      // 被选择
      multipleSelection: [],

      // 数据
      tableData: [],
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      return user.token ? user.userInfo : false;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    ...mapActions("admin", ["getAllUser"]),

    async getData() {
      try {
        const { data: res } = await this.getAllUser({
          ...this.pageMap,
        });
        console.log(res);
        this.tableData = res.data;
        this.total = res.map.total;
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 刷新页面数据
    refreshPage() {
      location.reload();
    },

    // 删除一个
    handleDelete(index, row) {
      this.$message.warning("暂未开放功能");
    },
    // 批量删除
    handleDeleteMore() {
      // 验证是否存在选择
      if (this.multipleSelection.length === 0)
        return this.$message.warning("您还未选择删除的用户！");
      console.log(this.multipleSelection);
      this.$message.warning("暂未开放功能");
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 改变页大小
    handleSizeChange(val) {
      this.pageMap.size = val;
      this.getData();
    },
    // 改变页码
    handleCurrentChange(val) {
      this.pageMap.page = val;
      this.getData();
    },
  },
};
</script>

<style lang='scss' scoped>
.el-button {
  margin: 0 5px;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.right-btns {
  font-size: 18px;
}

.pagination {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>