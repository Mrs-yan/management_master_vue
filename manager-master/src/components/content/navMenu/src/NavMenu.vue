<template>
  <div class="nav-menu">
    <!-- <div class="logo">
      <img class="img" src="~@/assets/img/login/logo.svg" alt="logo" />
      <span @touchstart="touchstart" @touchend="touchend" v-if="!isCollapse" class="title"
        >Vue2+JS</span
      >
    </div> -->
    <el-menu class="el-menu-vertical" :collapse="isCollapse" :default-active="'22'">
      <el-submenu :index="x.id + ''" v-for="x in menuList" :key="x.id">
        <template slot="title">
          <i :class="x.icon"></i>
          <span>{{ x.name }}</span>
        </template>
        <template v-if="x.children">
          <el-menu-item v-for="y in x.children" :key="y.id" :index="y.id + ''" @click="onMenu(y)">{{
            y.name
          }}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// import localCache from '@/utils/cache.js';

export default {
  data() {
    return {
      menuList: [],
      // menuActive: '',
      loop: 0,
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  created() {
    const isAdmin = this.$store.getters.isAdmin;
    console.log('isAdmin', isAdmin);
    // 获取菜单和选中菜单
    const info = [
      //资源
      {
        id: 1,
        name: '资源管理',
        type: 1,
        url: '/main/resourseMg',
        icon: 'el-icon-monitor',
        sort: 1,
        children: [
          {
            id: 11,
            url: '/main/resourseMg/eqMg',
            name: '设备管理',
            sort: 106,
            type: 2,
            children: null,
            parentId: 1,
          },
          {
            id: 12,
            url: '/main/resourseMg/employeMg',
            name: '员工管理',
            sort: 106,
            type: 2,
            children: null,
            parentId: 1,
          },
          {
            id: 13,
            url: '/main/resourseMg/customerMg',
            name: '客户管理',
            sort: 106,
            type: 2,
            children: null,
            parentId: 1,
          },
        ],
      },
      // 公告
      {
        id: 2,
        name: '公告中心',
        type: 1,
        url: '/main/announceCT',
        icon: 'el-icon-tickets',
        sort: 2,
        children: [
          {
            id: 21,
            url: '/main/announceCT/announceMg',
            name: '公告管理',
            sort: 100,
            type: 2,
            parentId: 2,
          },
          {
            id: 22,
            url: '/main/announceCT/announceList',
            name: '公告列表',
            sort: 102,
            type: 2,
            parentId: 2,
          },
        ],
      },
      //任务
      {
        id: 3,
        name: '任务中心',
        type: 1,
        url: '/main/taskesMG',
        icon: 'el-icon-suitcase',
        sort: 2,
        children: [
          {
            id: 31,
            url: '/main/taskesMG/taskMG',
            name: '任务管理',
            sort: 100,
            type: 2,
            parentId: 3,
          },
        ],
      },
      //员工
      {
        id: 4,
        name: '员工中心',
        type: 1,
        url: '/main/employeCT',
        icon: 'el-icon-user',
        sort: 1,
        children: [
          {
            id: 41,
            url: '/main/employeCT/workCheckIn',
            name: '工作打卡',
            sort: 106,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 42,
            url: '/main/employeCT/workHours',
            name: '工时统计',
            sort: 106,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 43,
            url: '/main/employeCT/personInfo',
            name: '个人信息',
            sort: 106,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 44,
            url: '/main/employeCT/spendingList',
            name: '支出列表',
            sort: 107,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 45,
            url: '/main/employeCT/spendingApply',
            name: '支出申请',
            sort: 108,
            type: 2,
            children: null,
            parentId: 4,
          },
        ],
      },
      //审批
      {
        id: 5,
        name: '审批中心',
        type: 1,
        url: '/main/approvalCT',
        icon: 'el-icon-setting',
        sort: 2,
        children: [
          {
            id: 51,
            url: '/main/approvalCT/waitApproval',
            name: '待审事项',
            sort: 100,
            type: 2,
            parentId: 5,
          },
          {
            id: 52,
            url: '/main/approvalCT/approvalList',
            name: '审批列表',
            sort: 101,
            type: 2,
            parentId: 5,
          },
        ],
      },
      //财务
      {
        id: 6,
        name: '财务中心',
        type: 1,
        url: '/main/financialCT',
        icon: 'el-icon-money',
        sort: 2,
        children: [
          {
            id: 71,
            url: '/main/financialCT/financialSm',
            name: '财务报表',
            sort: 100,
            type: 2,
            parentId: 6,
          },
          {
            id: 72,
            url: '/main/financialCT/financialMg',
            name: '财务管理',
            sort: 101,
            type: 2,
            parentId: 6,
          },
          {
            id: 82,
            url: '/main/financialCT/financialList',
            name: '财务列表',
            sort: 101,
            type: 2,
            parentId: 6,
          },
        ],
      },
    ];
    const info1 = [
      //资源
      {
        id: 1,
        name: '资源管理',
        type: 1,
        url: '/main/resourseMg',
        icon: 'el-icon-monitor',
        sort: 1,
        children: [
          {
            id: 11,
            url: '/main/resourseMg/eqMg',
            name: '设备管理',
            sort: 106,
            type: 2,
            children: null,
            parentId: 1,
          },
          {
            id: 13,
            url: '/main/resourseMg/customerMg',
            name: '客户管理',
            sort: 106,
            type: 2,
            children: null,
            parentId: 1,
          },
        ],
      },
      // 公告
      {
        id: 2,
        name: '公告中心',
        type: 1,
        url: '/main/announceCT',
        icon: 'el-icon-tickets',
        sort: 2,
        children: [
          {
            id: 22,
            url: '/main/announceCT/announceList',
            name: '公告列表',
            sort: 102,
            type: 2,
            parentId: 2,
          },
        ],
      },
      //任务
      {
        id: 3,
        name: '任务中心',
        type: 1,
        url: '/main/taskesMG',
        icon: 'el-icon-suitcase',
        sort: 2,
        children: [
          {
            id: 31,
            url: '/main/taskesMG/taskMG',
            name: '任务管理',
            sort: 100,
            type: 2,
            parentId: 3,
          },
        ],
      },
      //员工
      {
        id: 4,
        name: '员工中心',
        type: 1,
        url: '/main/employeCT',
        icon: 'el-icon-user',
        sort: 1,
        children: [
          {
            id: 41,
            url: '/main/employeCT/workCheckIn',
            name: '工作打卡',
            sort: 106,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 42,
            url: '/main/employeCT/workHours',
            name: '工时统计',
            sort: 106,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 43,
            url: '/main/employeCT/personInfo',
            name: '个人信息',
            sort: 106,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 44,
            url: '/main/employeCT/spendingList',
            name: '支出列表',
            sort: 107,
            type: 2,
            children: null,
            parentId: 4,
          },
          {
            id: 45,
            url: '/main/employeCT/spendingApply',
            name: '支出申请',
            sort: 108,
            type: 2,
            children: null,
            parentId: 4,
          },
        ],
      },
    ];
    if (isAdmin) {
      this.menuList = info;
    } else {
      this.menuList = info1;
    }
    // this.menuActive = localCache.getCache('menuActive');
  },
  methods: {
    onMenu(menu) {
      // localCache.setCache('menuActive', menu.id);
      this.$router.push({
        path: menu.url ?? '/notFound',
      });
    },

    touchstart(res) {
      clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        console.log('长按了');
        console.log(res);
        res.preventDefault();
      }, 1000);
    },
    touchend() {
      clearTimeout(this.loop);
    },
  },
};
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      user-select: none;
    }
  }

  .el-menu {
    border-right: none;
    background-color: #0c2135;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
    .el-submenu__title span {
      color: #fff;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }
  .el-menu-item {
    span {
      color: #fff;
    }
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu {
  .el-menu-item {
    background-color: #0c2135;
    color: #fff;
  }
  .el-menu-item.is-active {
    color: var(--el-color-primary);
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
.el-menu--vertical {
  .is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
</style>
