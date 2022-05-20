const HANDLE_CREATE = 'create'; // 新增操作
const HANDLE_EDIT = 'edit'; // 编辑操作
const HANDLE_VIEW = 'view'; // 编辑操作

var modalConfig = null;
export const handleContentMixin = {
  data() {
    return {
      formData: {},
      defaultInfo: {},
      handleType: '',
    };
  },
  computed: {
    modalConfig() {
      return modalConfig;
    },
  },
  methods: {
    onCreate() {
      this.formData = {};
      this.$refs.pageModalRef.showDialog = true;
      this.handleType = HANDLE_CREATE;
    },
    /* 编辑用户 */
    onView(somethings) {
      if (somethings) {
        console.log('if');
        this.handleType = HANDLE_VIEW;
      } else {
        console.log('else');
        this.handleType = HANDLE_EDIT;
      }
      this.$refs.pageModalRef.showDialog = true;

      // this.defaultInfo = formData;
    },
  },
};
