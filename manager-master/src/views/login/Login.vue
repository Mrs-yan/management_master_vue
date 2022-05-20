<template>
  <div class="bg">
    <el-card class="box-card">
      <el-form>
        <h3>欢迎来到便民设备管理系统！</h3>
        <el-form-item>
          <el-input v-model="loginForm.account" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { myRequest } from '@/service';
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      myRequest.post('/user/login', this.loginForm).then((res) => {
        if (res.code === 1) {
          console.log(res.data);
          this.$store.commit('setUserInfo', res.data);
          this.$message.success('登录成功');
          this.$router.push('/main/announceCT/announceList');
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    reset() {
      this.loginForm = {
        account: '',
        password: '',
      };
    },
  },
};
</script>

<style>
.btn {
  display: flex;
  justify-content: space-between;
}
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/img/login/1510643317606947.png') ;
  background-position: 100% 100%;
}
.box-card {
  /* margin: 100px auto; */
  width: 400px;
}
</style>
