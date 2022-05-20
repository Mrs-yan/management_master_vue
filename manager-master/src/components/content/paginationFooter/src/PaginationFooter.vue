<template>
  <el-pagination small layout="prev, pager, next" :total="50" @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  name: 'PaginationFooter',
  props: {
    total: {
      type: Number,
      default: 50,
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('current-change', val);
    },
  },
};
</script>

<style>
</style>
