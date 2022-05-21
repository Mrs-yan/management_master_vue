export const modalConfig = {
  title: '财务信息',
  formItems: [
    {
      field: 'money',
      type: 'input',
      label: '金额',
      placeholder: '请输入金额',
    },
    {
      field: 'type',
      type: 'select',
      options: [
        {
          title: '支出',
          value: '支出',
        },
        {
          title: '收入',
          value: '收入',
        },
      ],
      label: '支出/收入',
    },
    {
      field: 'taskId',
      type: 'select',
      label: '所属任务',
      placeholder: '请选择任务(可不填)',
    },

    {
      field: 'describe',
      type: 'input',
      label: '描述',
      placeholder: '请输入描述',
    },
    {
      field: 'remark',
      type: 'input',
      label: '备注',
      placeholder: '请输入备注',
      textarea:'textarea',
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {},
};
