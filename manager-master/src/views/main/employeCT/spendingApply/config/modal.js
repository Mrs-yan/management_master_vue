export const modalConfig = {
  title: '支出申请',
  formItems: [
    {
      field: 'spendType',
      type: 'select',
      label: '类型',
      options: [
        {
          title: '因公支出',
          value: '因公支出',
        },
        {
          title: '个人预支',
          value: '个人预支',
        },
      ],
    },
    {
      field: 'money',
      type: 'input',
      label: '金额',
      placeholder: '请输入需要金额',
    },
    {
      field: 'taskId',
      type: 'select',
      label: '所属任务',
      placeholder: '请选择任务',
    },

    {
      field: 'remark',
      type: 'input',
      label: '说明',
      textarea:'textarea',
      placeholder: '请输入说明内容',
    },
    // {
    //   field: 'proposerId',
    //   type: 'select',
    //   label: '创建时间',
    //   disabled: true,
    // },
  ],
  colLayout: { span: 24 },
  itemStyle: {},
};
