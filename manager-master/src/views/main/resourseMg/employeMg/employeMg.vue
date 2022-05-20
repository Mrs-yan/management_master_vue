<template>
  <div class="overview">
    <div class="new">
      <el-button type="primary" icon="el-icon-plus" @click="onCreate">新建</el-button>
    </div>
    <div class="showInfo">
      <template v-for="item in eqList">
        <PageCard
          :name="item.name"
          :model="item.model"
          :imageUrl="item.img"
          :workNumber="item.workNumber"
          :key="item.id"
          :id="item.id"
          @view="handleView"
          @delect="handleDelect"
        />
      </template>
    </div>
    <div class="footer">
      <PaginationFooter @current-change="handleCurrentChange" :total="50" />
    </div>

    <PageModal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfig"
      :defaultInfo="formData"
      :handleType="handleType"
      @onConfirm="handleConfirm"
    />
  </div>
</template>

<script>
/* 组件 */
import PageCard from '@/components/content/pageCard';
import PaginationFooter from '@/components/content/paginationFooter';
import PageModal from '@/components/content/pageModal';
/* 配置 */
import { myRequest } from '@/service';

/* 配置 */
import { handleContentMixin } from '@/mixin/handleContentMixin';
import { modalConfig } from './config/modal';

export default {
  components: { PageCard, PaginationFooter, PageModal },
  data() {
    return {
      eqList: [],
      page: 1,
    };
  },
  mixins: [handleContentMixin],
  created() {
    this.getUserList();
  },
  computed: {
    modalConfig() {
      return modalConfig;
    },
  },
  methods: {
    getUserList() {
      myRequest.get(`/user/getAllUser/${this.page}/6`).then((res) => {
        this.eqList = res.data.list;
        console.log(this.eqList);
      });
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.page = val;
      this.getUserList();
    },
    handleView(id) {
      myRequest.get(`/user/getUserById/${id}`).then((res) => {
        this.formData = res.data;
        this.onView();
      });
      console.log(id);
    },
    handleConfirm(newFormData, id) {
      if (!id) {
        myRequest.post(`/user/addUser`, newFormData).then((res) => {
          console.log(res);
          this.$message.success('操作成功');
          this.getUserList();
        });
      } else {
        myRequest.patch(`/user/updateUser/${id}`, newFormData).then((res) => {
          console.log(res);
          this.$message.success('操作成功');
          this.getUserList();
        });
      }
    },
    handleDelect(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          myRequest.delete(`/user/deleteUser/${id}`).then((res) => {
            console.log(res);
            this.$message.success('操作成功');
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new {
  margin-left: 30px;
}
.footer {
  position: relative;
  margin-left: 950px;
  /* left: 950px; */
}
</style>
