<template>
  <div>
    <page-content
      :contentConfig="contentConfig"
      :dataList="dataList"
      :isShowView="true"
      ref="pageContentRef"
      @onView="handleView"
      @onCurrentChange="handleCurrentChange"
    />
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="formData"
      :handleType="handleType"
      @onConfirm="handleConfirm"
    />
  </div>
</template>

<script>
/* 组件 */
import PageContent from '@/components/content/pageContent';
import PageModal from '@/components/content/pageModal';
/* 配置 */
import { myRequest } from '@/service';
import { handleContentMixin } from '@/mixin/handleContentMixin';
import { contentConfig } from './config/content';
import { modalConfig } from './config/modal';
/* mixin */
// import { handleContentMixin } from "@/mixin/handleContentMixin";
export default {
  name: 'AnnounceList',
  data() {
    return {
      dataList: [],
      formData: {},
      page: 1,
    };
  },
  mixins: [handleContentMixin],
  components: { PageContent, PageModal },
  created() {
    this.getBulletinList();
  },
  mounted() {},
  computed: {
    modalConfig() {
      return modalConfig;
    },
    contentConfig() {
      return contentConfig;
    },
  },
  methods: {
    getBulletinList() {
      myRequest.get(`/bulletin/getAllBulletin/${this.page}/6`).then((res) => {
        this.dataList = res.data.list;
      });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.page = val;
      this.getBulletinList();
    },
    handleView(id) {
      console.log(id);
      myRequest.get(`/bulletin/getBulletinById/${id}`).then((res) => {
        this.formData = res.data;
        this.onView('查看公告');
      });
      console.log(id);
    },
    handleConfirm() {
      console.log('handleConfirm');
    },
  },
};
</script>

<style scoped lang="less">
</style>

