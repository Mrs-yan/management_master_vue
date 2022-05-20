<template>
  <div>
    <page-content
      :contentConfig="contentConfig"
      :dataList="dataList"
      :isShowAdmir="true"
      :isShowRefuse="true"
      @onCurrentChange="handleCurrentChange"
      ref="pageContentRef"
    />
  </div>
</template>

<script>
/* 组件 */
import PageContent from '@/components/content/pageContent';
/* 配置 */
import { myRequest } from '@/service';
import { handleContentMixin } from '@/mixin/handleContentMixin';
import { contentConfig } from './config/content';
/* mixin */
// import { handleContentMixin } from "@/mixin/handleContentMixin";
export default {
  name: 'workHours',
  data() {
    return {
      dataList: [],
      formData: {},
      page: 1,
    };
  },
  mixins: [handleContentMixin],
  components: { PageContent },
  created() {
    this.getPendList();
  },
  mounted() {},
  computed: {
    contentConfig() {
      return contentConfig;
    },
  },
  methods: {
    getPendList() {
      myRequest.get(`employee/getWorkList/${this.$store.state.loginUser.id}/${this.page}/6`).then((res) => {
        console.log(res);
        this.dataList = res.data.list;
      });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.page = val;
      this.getPendList();
    },
  },
};
</script>

<style scoped lang="less">
</style>

