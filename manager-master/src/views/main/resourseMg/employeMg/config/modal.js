export const modalConfig = {
  title: '员工',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入用户名',
    },
    {
      field: 'telephoneNumber',
      type: 'input',
      label: '电话',
      placeholder: '请输入手机号码',
    },
    {
      field: 'sex',
      type: 'input',
      label: '性别',
      placeholder: '请输入性别',
    },
    {
      field: 'workType',
      type: 'input',
      label: '工种',
      placeholder: '请输入工种',
    },

    {
      field: 'role',
      type: 'select',
      label: '角色',
      placeholder: '请选择角色',
      options: [
        { title: '管理员', value: 0 },
        { title: '用户', value: 1 },
      ],
    },
    {
      field: 'workNumber',
      type: 'input',
      label: '工号',
      placeholder: '请输入工号',
      disabled: true,
    },
    {
      field: 'idCardNumber',
      type: 'input',
      label: '身份证号码',
      placeholder: '请输入身份证号码',
    },
    {
      field: 'account',
      type: 'input',
      label: '账号',
      placeholder: '请输入账号',
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
    },
    {
      field: 'img',
      type: 'none',
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {},
};
