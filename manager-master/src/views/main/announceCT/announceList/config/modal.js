export const modalConfig = {
  title: '公告',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '公告名称',
      placeholder: '请输入用户名',
      disabled: true,
    },
    {
      field: 'type',
      type: 'input',
      label: '公告类型',
      placeholder: '请输入公告类型',
      disabled: true,
    },
    {
      field: 'taskName',
      type: 'select',
      label: '所属任务',
      placeholder: '请选择任务(可不填)',
      disabled: true,
    },

    {
      field: 'content',
      type: 'input',
      label: '公告内容',
      placeholder: '请输入公告内容',
      disabled: true,
      textarea: 'textarea',
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      disabled: true,
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {},
};
