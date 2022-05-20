export const modalConfig = {
  title: '打卡',
  formItems: [
    {
      field: 'taskId',
      type: 'select',
      label: '任务列表',
    },
    {
      field: 'remark',
      type: 'input',
      label: '备注信息',
    },
    {
      field: 'status',
      type: 'select',
      label: '打卡状态',
      placeholder: '请选择打卡状态',
      options: [
        {
          title: '打卡',
          value: '打卡',
        },
        {
          title: '请假',
          value: '请假',
        },
        {
          title: '调休',
          value: '调休',
        },
      ],
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {},
};
