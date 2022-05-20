<template>
  <div class="overview">
    <div class="new">
      <el-button type="primary" icon="el-icon-plus" @click="onCreate" v-if="this.$store.getters.isAdmin">新建</el-button>
    </div>
    <div class="showInfo">
      <template v-for="item in eqList">
        <PageCard
          :name="item.name"
          :model="item.model"
          :imageUrl="item.img"
          :key="item.id"
          :id="item.id"
          :status="item.status"
          :createBy="item.createBy"
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
import { mapDataToOptions } from './utils';

/* 配置 */
import { handleContentMixin } from '@/mixin/handleContentMixin';
import { modalConfig } from './config/modal';

export default {
  name: 'taskMg',
  components: { PageCard, PaginationFooter, PageModal },
  data() {
    return {
      loginUserName: '',
      eqList: [],
      page: 1,
    };
  },
  mixins: [handleContentMixin],
  created() {
    this.loginUserName = this.$store.state.loginUser.name;
    this.getTaskList();
    this.getAllCustomer();
    this.getEquipmentList();
  },
  computed: {
    modalConfig() {
      return modalConfig;
    },
  },
  methods: {
    getAllCustomer() {
      myRequest('/common/getAllCustomer').then((res) => {
        modalConfig.formItems[1].options = mapDataToOptions(res.data);
        console.log(modalConfig);
      });
    },
    getEquipmentList() {
      myRequest('/common/getEquipmentList').then((res) => {
        modalConfig.formItems[2].options = mapDataToOptions(res.data);
      });
    },

    getTaskList() {
      myRequest.get(`/task/getAllTask/${this.page}/6`).then((res) => {
        this.eqList = res.data.list;
      });
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.page = val;
      this.getTaskList();
    },
    handleView(id) {
      myRequest.get(`/task/getTaskById/${id}`).then((res) => {
        this.formData = res.data;

        //判断状态禁用表单
        if (this.formData.status === 3) {
          this.modalConfig.formItems.forEach((item) => {
            item.disabled = true;
          });
        } else {
          this.modalConfig.formItems.forEach((item) => {
            item.disabled = false;
          });
        }

        this.onView();
      });
      console.log(id);
    },
    handleConfirm(newFormData, id) {
      if (!id) {
        myRequest
          .post(`/task/addTask`, { ...newFormData, createBy: this.loginUserName })
          .then((res) => {
            console.log(res);
            this.$message.success('操作成功');
            this.getTaskList();
          });
      } else {
        myRequest.patch(`/task/updateTask/${id}`, newFormData).then((res) => {
          console.log(res);
          this.$message.success('操作成功');
          this.getTaskList();
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
          myRequest.delete(`/task/deleteTask/${id}`).then((res) => {
            console.log(res);
            this.$message.success('操作成功');
            this.getTaskList();
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
