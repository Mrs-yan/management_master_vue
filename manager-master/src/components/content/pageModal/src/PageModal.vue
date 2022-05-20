<template>
  <div class="page-model">
    <el-dialog
      :title="title"
      v-if="showDialog"
      :visible="true"
      width="30%"
      destroy-on-close
      center
      :modal="false"
      @close="onClose"
    >
      <div class="main">
        <el-upload
          v-if="showElUpload"
          class="avatar-uploader"
          action="/myApi/common/uploadPicture"
          name="file"
          :auto-upload="true"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="image ? image : newImage" :src="image ? image : newImage" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-image style="width: 100px; height: 100px" :src="image" :preview-src-list="[image]">
        </el-image> -->
        <chh-form v-bind="newModalConfig" :formData="formData" @onChangeValue="onChangeValue">
        </chh-form>
      </div>

      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
           <el-button @click="handleCancel">取 消</el-button>
          <!-- <el-button @click="showDialog = false">取 消</el-button> -->
          <el-button type="primary" @click="onConfirm" v-if="isShowConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <chh-form />
  </div>
</template>

<script>
// 组件
import ChhForm from '@/components/common/form';

// // 配置
// import { myRequest } from '@/service';
export default {
  components: {
    ChhForm,
  },
  props: {
    isCheckIn: {
      type: Boolean,
      default: false,
    },
    pageName: {
      type: String,
      require: true,
    },
    modalConfig: {
      type: Object,
      reuqired: true,
    },
    defaultInfo: {
      typeof: Object,
      default: () => ({}),
    },
    othreInfo: {
      typeof: Object,
      default: () => ({}),
    },
    handleType: {
      type: String,
      default: 'create',
    },
  },
  data() {
    return {
      showDialog: false,
      formData: {},
      newImage: '',
    };
  },
  computed: {
    isShowConfirm() {
      return this.$store.getters.isAdmin || this.isCheckIn;
    },
    title() {
      const titleEnum = {
        create: '新建',
        edit: '编辑',
        view: '查看',
      };
      return titleEnum[this.handleType] + this.modalConfig.title;
    },
    showElUpload() {
      console.log(this.title);
      if (
        this.title === '编辑员工' ||
        this.title === '编辑设备' ||
        this.title === '新建员工' ||
        this.title === '新建设备'
      ) {
        return true;
      } else {
        return false;
      }
    },
    image() {
      return this.newImage ? this.newImage : this.defaultInfo.img;
    },
    id() {
      return this.defaultInfo.id;
    },

    //禁止编辑的字段，创建的时候不显示，就要深拷贝便利删除
    newModalConfig() {
      console.log('newModalConfig');
      console.log(this.modalConfig);
      let copyModalConfig = JSON.parse(JSON.stringify(this.modalConfig));
      if (this.handleType === 'create') {
        for (let index = 0; index < copyModalConfig.formItems.length; index++) {
          console.log(index);
          if (copyModalConfig.formItems[index].disabled) {
            copyModalConfig.formItems.splice(index, 1);
            index = index - 1;
          }
        }
        return copyModalConfig;
      } else {
        return this.modalConfig;
      }
    },
  },
  created() {},
  watch: {
    defaultInfo: {
      handler(newValue) {
        console.log('watch defaultInfo');
        console.log(newValue);

        for (const item of this.modalConfig?.formItems) {
          // 动态添加formData属性，否则modal值无法及时响应视图
          this.$set(this.formData, item.field, newValue[`${item.field}`]);
        }
      },
    },
  },
  methods: {
    /* 点击确认 */
    onConfirm() {
      this.showDialog = false;
      console.log(this.formData);

      this.$emit('onConfirm', this.formData, this.id);
    },
    handleCancel() {
      this.newImage = '';
      this.showDialog = false;
    },
    /* 表单值改变 */
    onChangeValue(formData) {
      console.log('onChangeValue');
      console.log(formData);
      this.formData = formData;
    },
    onClose() {
      this.showDialog = false;
    },

    handleAvatarSuccess(res, file) {
      console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.newImage = res.data;
      this.$set(this.formData, 'img', this.newImage);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  top: 100px;
  position: absolute;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  top: 100px;
  position: absolute;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  top: 100px;
  position: absolute;
}
</style>
