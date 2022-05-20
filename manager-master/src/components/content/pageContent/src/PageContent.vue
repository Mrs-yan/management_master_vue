<template>
  <div class="page-content">
    <chh-table :dataList="dataList" v-bind="contentConfig" v-on="$listeners">
      <!-- 固定插槽 -->
      <template #headerHandler>
        <el-button v-if="contentConfig.createText" size="mini" type="primary">{{
          contentConfig.createText
        }}</el-button>
      </template>
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.avatar_url"
          :preview-src-list="[scope.row.avatar_url]"
        ></el-image>
      </template>
      <template #createAt="scope">
        <strong>{{ scope.row.createAt | format }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ scope.row.updateAt | format }}</strong>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isShowView"
            icon="el-icon-edit"
            size="normal"
            type="text"
            @click="onView(scope.row.id)"
            >查看</el-button
          >
          <el-button
            v-if="isShowAdmir"
            icon="el-icon-edit"
            size="normal"
            type="text"
            @click="onAdmir(scope.row.id)"
            >同意</el-button
          >
          <el-button
            v-if="isShowRefuse"
            icon="el-icon-edit"
            size="normal"
            type="text"
            @click="onRefuse(scope.row.id)"
            >拒绝</el-button
          >
          <el-button
            v-if="isShowDelete"
            icon="el-icon-edit"
            size="normal"
            type="text"
            @click="onDelete(scope.row.id)"
            >删除</el-button
          >
        </div>
      </template>
      <template #status="scope">
        <el-button size="mini" plain v-if="scope.row.status === 0"> 未审批 </el-button>
        <el-button size="mini" plain v-else-if="scope.row.status === 1" type="success"
          >已同意</el-button
        >
        <el-button size="mini" plain v-else-if="scope.row.status === 2" type="danger"
          >已拒绝</el-button
        >
      </template>
    </chh-table>
  </div>
</template>

<script>
/* 组件 */
import ChhTable from '@/components/common/table';
export default {
  components: {
    ChhTable,
  },
  props: {
    isShowView: {
      type: Boolean,
      default: false,
    },
    isShowAdmir: {
      type: Boolean,
      default: false,
    },
    isShowRefuse: {
      type: Boolean,
      default: false,
    },
    isShowDelete: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array,
      required: true,
    },
    contentConfig: {
      type: Object,
      reuqired: true,
    },
  },
  methods: {
    onView(id) {
      this.$emit('onView', id);
    },
    onAdmir(id) {
      this.$emit('onAdmir', id);
    },
    onRefuse(id) {
      this.$emit('onRefuse', id);
    },
    onDelete(id) {
      this.$emit('onDelect', id);
    },

    onSizeChange(pageInfo) {
      this.pageInfo = pageInfo;
      this.getdataList();
    },
    onCurrentChange(val) {
      this.page = val;
      this.getdataList();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-content {
  margin-top: 0;
  border-radius: 10px;
  overflow: hidden;
}
.warning-btn {
  color: red;
}
</style>
