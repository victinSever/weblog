<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审核</el-breadcrumb-item>
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

        <el-table-column
          prop="status"
          label="审核状态"
          width="120"
          align="center"
          ><template slot-scope="scope">
            <div>
              <el-tag type="warning" size="mini" v-if="scope.row.status === 2"
                >审核中</el-tag
              >
              <el-tag
                type="success"
                size="mini"
                v-else-if="scope.row.status === 1"
                >已通过</el-tag
              >
              <el-tag
                type="danger"
                size="mini"
                v-else-if="scope.row.status === 0"
                >未通过</el-tag
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="title"
          label="博客标题"
          width="300"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="publishImage"
          label="博客封面"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar
              shape="square"
              :size="50"
              :src="scope.row.publishImage"
              style="margin: 0 5px"
            ></el-avatar>
          </template>
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

        <el-table-column
          prop="userId"
          label="用户ID"
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
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              class="el-icon-view"
              type="success"
              @click="openDetail(scope.$index, scope.row)"
              >详细信息</el-button
            >
            <el-popover placement="top" width="200" trigger="hover">
              <div class="operation-box">
                <el-button
                  type="primary"
                  size="mini"
                  @click="sendAuditResult(true, scope.$index, scope.row)"
                  >Pass</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="sendAuditResult(false, scope.$index, scope.row)"
                  >Faile</el-button
                >
              </div>
              <el-button
                type="primary"
                size="mini"
                class="el-icon-edit"
                slot="reference"
                v-if="scope.row.status === 2"
                >审核</el-button
              >
            </el-popover>
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

    <!-- 审核原因 -->
    <el-dialog
      :visible.sync="dialogVisible2"
      width="300px"
      :before-close="handleCloseDialog"
    >
      <el-input
        type="textarea"
        placeholder="填写不予通过原因"
        focus
        v-model="ps"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendAuditResultFalse"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <CheckDetail :blog="blog" />
    </el-dialog>
  </div>
</template>

<script>
import CheckDetail from "@/components/check/detail.vue";
import { mapActions } from "vuex";
export default {
  name: "checkPage",
  components: { CheckDetail },
  data() {
    return {
      // 弹窗显示
      dialogVisible: false, //详细信息
      dialogVisible2: false,

      dataList: [],

      pageMap: {
        size: 10,
        page: 1,
      },
      total: 20,

      // 被选择
      multipleSelection: [],

      // 数据
      tableData: [],

      ps: "",

      blog: {},
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
    console.log(this.user);
  },
  methods: {
    ...mapActions("admin", ["getAuditBlogs", "auditBlog"]),

    async getData() {
      try {
        const { data: res } = await this.getAuditBlogs({
          ...this.pageMap,
        });
        this.tableData = res.data;
        this.total = res.map.total;
      } catch (e) {
        this.$message.error(e);
      }
    },

    handleCloseDialog() {
      this.dialogVisible2 = false;
    },

    async sendCheckBlog(status) {
      try {
        const { data: res } = await this.auditBlog({
          userId: this.user.id,
          blogId: this.blog.blogId,
          status,
          ps: this.ps,
        });
        if(res.code !== 200) return this.$message.warning(res.msg)
        if (status == 1) {
          this.tableData[this.index].status = 1;
          this.$message.success("审核通过！");
        } else {
          this.tableData[this.index].status = 0;
          this.$message.error("审核未通过！原因：" + this.ps);
          this.ps = "";
        }
      } catch (e) {
        this.$message.error(e);
      }
    },

    // 发送审核结果
    sendAuditResult(judge, index, blog) {
      this.blog = blog;
      this.index = index;
      if (judge) {
        this.sendCheckBlog(1);
      } else {
        this.dialogVisible2 = true;
      }
    },

    // 审核失败
    sendAuditResultFalse() {
      if (this.ps) {
        this.sendCheckBlog(0);
        this.dialogVisible2 = false;
      } else {
        this.$message.error("请填写原因");
      }
    },

    // 刷新页面数据
    refreshPage() {
      location.reload();
    },

    //关闭窗口
    handleClose() {
      this.dialogVisible = false;
      this.dialogVisible2 = false;
    },

    // 打开详情diaglo
    openDetail(index, row) {
      this.blog = row;
      this.dialogVisible = true;
    },

    // 删除一个
    handleDelete(index, row) {
      console.log(index, row);
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