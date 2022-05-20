<template>
  <div>
    <div class="main">
      <el-upload
        class="avatar-uploader"
        action="/myApi/common/uploadPicture"
        name="file"
        :auto-upload="true"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
      <!-- <img v-if="image ? image : newImage" :src="image ? image : newImage" class="avatar" /> -->
        <img :src="userInfo.img" class="avatar" />
      </el-upload>
      <chh-form v-bind="modalConfig" :formData="userInfo" @onChangeValue="onChangeValue">
      </chh-form>
      <el-button type="primary" @click="handleConfirm">提交更改</el-button>
    </div>
  </div>
</template>

<script>
/* 组件 */
import ChhForm from '@/components/common/form';
// import PageCard from '@/components/content/pageCard';
// import PageModal from '@/components/content/pageModal';

import { myRequest } from '@/service';
import { modalConfig } from './config/modal';
export default {
  name: 'personInfo',
  data() {
    return {
      userInfo: {},
      // newImage: '',
    };
  },
  created() {
    this.userInfo = this.$store.state.loginUser;
  },
  components: {
    ChhForm,
    // PageCard,
    // PageModal,
  },
  computed: {
    modalConfig() {
      return modalConfig;
    },
    imgUrl() {
      return this.newImage ? this.newImage :this.userInfo.img
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.newImage = res.data;
      this.$set(this.userInfo, 'img', res.data);
      // this.userInfo.img = res.data;
    },
    handleConfirm() {
      myRequest.patch(`/user/updateUser/${this.userInfo.id}`, this.userInfo).then((res) => {
        console.log(res);
        this.$store.commit('setUserInfo', res.data);
        this.$message.success('修改成功');
      });
      // this.$message.success('修改成功');
    },
    /* 表单值改变 */
    onChangeValue(formData) {
      console.log('onChangeValue');
      console.log(formData);
      this.userInfo = formData;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-left: 50px;
  /* display: flex;
  justify-content: center;
  align-items: center;
  left: 500px; */
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  /* top: 100px;
  position: absolute; */
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center !important;
}
.chh-form {
  position: relative;
  margin-left: -270px;
}
</style>
