export const contentConfig = {
  title: '财务列表',
  module: 'Bulletin',
  propList: [
    { prop: "type", label: "类型", minWidth: "100" },
    { prop: "describe", label: "性质", minWidth: "100" },
    { prop: "money", label: "金额", minWidth: "100" },
    { prop: "remark", label: "备注", minWidth: "100" },
    { prop: 'createBy', label: '创建人', minWidth: '100'},
    { prop: 'createTime', label: '创建时间', minWidth: '100'},
    { label: '操作', minWidth: '120', slotName: 'handler' },
  ],
  showIndexColumn: true,
  showSelectColumn: false,
};
