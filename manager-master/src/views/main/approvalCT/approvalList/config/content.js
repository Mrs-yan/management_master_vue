export const contentConfig = {
  title: '待审列表',
  propList: [
    { prop: 'proposerName', label: '申请人', minWidth: '100' },
    { prop: "spendType", label: "花费类型", minWidth: "100" },
    { prop: 'money', label: '金额', minWidth: '100' },
    { prop: 'taskName', label: '任务名称', minWidth: '100' },

    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
  ],
  showIndexColumn: true,
  showSelectColumn: false,
};
