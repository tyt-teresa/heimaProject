<template>
  <div class="login">
    <el-card class="loginform">
      <div class="title">
        <img src="../../assets/image/logo_index.png" alt="黑马头条">
      </div>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入验证码" style="width:60%"></el-input>
          <el-button style="width:34%;float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
           <el-checkbox v-model="checked">我已阅读并同意<a style="color:#409eff">用户协议</a>和<a style="color:#409eff">隐私条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 .login {
width:100%;
height: 100vh;
background-image: url('../../assets/image/login_bg.jpg');
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
  .loginform {
  width:400px;
  height: 340px;
    .title {
    text-align:center;
    margin-bottom:20px;
      img {
      width:180px;
      height:36px;
      }
    }
  }
}
</style>
