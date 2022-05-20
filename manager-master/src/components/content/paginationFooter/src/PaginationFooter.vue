<template>
  <el-pagination small layout="prev, pager, next" :total="150" @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  name: 'PaginationFooter',
  props: {
    total: {
      type: Number,
      default: 150,
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
