<template>
  <div class="nav-header">
    <span>便民设备管理系统</span>
    <el-button @click="handleLoginOut">退出登录</el-button>
  </div>
</template>

<script>
import localCache from '@/utils/cache';
import { pathMapBreadcrumbs } from '@/utils/mapMenus';

export default {
  components: {},
  data() {
    return {
      isFold: false,
    };
  },
  computed: {
    breadcrumbs() {
      const menuList = this.$store.state.login.menuInfo;
      const currentPath = this.$store.state.currentPath;
      return pathMapBreadcrumbs(menuList, currentPath);
    },
  },
  created() {},
  methods: {
    onFold() {
      this.isFold = !this.isFold;
      this.$emit('onFold', this.isFold);
    },
    handleLoginOut() {
      localCache.clearCache();
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  line-height: 40px;
  width: 100%;
  justify-content: space-between;
}
</style>
