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
              <el-tag type="warning" size="mini" v-if="scope.row.status === 1"
                >审核中</el-tag
              >
              <el-tag
                type="success"
                size="mini"
                v-else-if="scope.row.status === 2"
                >已通过</el-tag
              >
              <el-tag
                type="danger"
                size="mini"
                v-else-if="scope.row.status === 3"
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
          width="300"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar
              shape="square"
              :size="30"
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
          prop="phone"
          label="账户/手机号"
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
                  @click="sendAuditResult(true, scope.$index)"
                  >Pass</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="sendAuditResult(false, scope.$index)"
                  >Faile</el-button
                >
              </div>
              <el-button
                type="primary"
                size="mini"
                class="el-icon-edit"
                slot="reference"
                v-if="scope.row.status < 2"
                >审核</el-button
              >
            </el-popover>

            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确认删除该条博客？"
              v-if="scope.row.status >= 2"
              @confirm="handelDelete(scope.$index, scope.row)"
            >
              <el-button
                type="danger"
                size="mini"
                class="el-icon-delete"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
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
        <el-button type="primary" @click="sendAuditResultFaile"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <CheckDetail :blogId="blog.blogId" :userId="user.id" />
    </el-dialog>
  </div>
</template>

<script>
import CheckDetail from "@/components/check/detail.vue";
import {mapActions} from 'vuex';
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
        pageNum: 1,
      },
      total: 20,

      // 被选择
      multipleSelection: [],

      // 数据
      tableData: [
        {
          blogId: "1",
          id: "1",
          phone: "19122518451",
          userName: "李华",
          publishImage: "",
          status: 0, //是否未注销
          createTime: "2022-7-23 18:30:55",
          title: "吃饭睡觉打豆豆",
        },
      ],

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
  methods: {
    ...mapActions("admin", ["getCheckList"]),

    async getData() {
      try {
        const { data: res } = await getCheckList({
            userId: this.user.id,
            ...this.pageMap
        });
        console.log(res);
      } catch (e) {
        this.$message.success(e);
      }
    },

    handleCloseDialog() {
      this.dialogVisible2 = false;
    },

    // 发送审核结果
    sendAuditResult(judge, index) {
      this.index = index;
      if (judge) {
        this.tableData[index].status = 2;
        this.$message.success("审核通过！");
      } else {
        this.dialogVisible2 = true;
      }
    },

    // 审核失败
    sendAuditResultFaile() {
      if (this.ps) {
        this.dialogVisible2 = false;
        this.tableData[this.index].status = 3;
        this.$message.error("审核未通过！原因：" + this.ps);
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
      this.getData()
    },
    // 改变页码
    handleCurrentChange(val) {
      this.pageMap.page = val;
      this.getData()
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