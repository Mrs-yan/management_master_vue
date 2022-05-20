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
  name: 'BulletinMg',
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
    this.getBulletinList();
    this.getAllTask();
  },
  computed: {
    modalConfig() {
      return modalConfig;
    },
  },
  methods: {
    getAllTask() {
      myRequest('/common/getTaskList').then((res) => {
        modalConfig.formItems[2].options = mapDataToOptions(res.data);
        console.log(modalConfig);
      });
    },

    getBulletinList() {
      myRequest.get(`/bulletin/getAllBulletin/${this.page}/6`).then((res) => {
        this.eqList = res.data.list;
      });
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.page = val;
      this.getBulletinList();
    },
    handleView(id) {
      myRequest.get(`/bulletin/getBulletinById/${id}`).then((res) => {
        this.formData = res.data;
        this.onView();
      });
      console.log(id);
    },
    handleConfirm(newFormData, id) {
      if (!id) {
        myRequest
          .post(`/bulletin/addBulletin`, { ...newFormData, createBy: this.loginUserName })
          .then((res) => {
            console.log(res);
            this.$message.success('操作成功');
            this.getBulletinList();
          });
      } else {
        myRequest.patch(`/bulletin/updateBulletin/${id}`, newFormData).then((res) => {
          console.log(res);
          this.$message.success('操作成功');
          this.getBulletinList();
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
          myRequest.delete(`/bulletin/deleteBulletin/${id}`).then((res) => {
            console.log(res);
            this.$message.success('操作成功');
            this.getBulletinList();
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
