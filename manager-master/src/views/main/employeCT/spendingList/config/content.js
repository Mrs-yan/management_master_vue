export const contentConfig = {
  title: '支出列表',
  propList: [
    { prop: 'spendType', label: '花费类型', minWidth: '100' },
    { prop: 'money', label: '金额', minWidth: '100' },
    { prop: 'taskName', label: '任务名称', minWidth: '100' },

    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
  ],
  showIndexColumn: true,
  showSelectColumn: false,
};
