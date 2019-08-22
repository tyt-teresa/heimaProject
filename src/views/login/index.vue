<template>
  <div class="login">
    <el-card class="loginform">
      <div class="title">
        <img src="../../assets/image/logo_index.png" alt="黑马头条">
      </div>
      <el-form :model="ruleForm" ref="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="ruleForm.code" placeholder="请输入验证码" style="width:60%"></el-input>
          <el-button style="width:34%;float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
           <el-checkbox v-model="ruleForm.checked">我已阅读并同意<a style="color:#409eff">用户协议</a>和<a style="color:#409eff">隐私条款</a></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var fn = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('请勾选协议'))
      }
    }
    return {
      ruleForm: {
        mobile: '',
        code: '',
        checked: false
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            tigger: 'blur'
          },
          {
            len: 11,
            message: '手机号长度必须为11个字符',
            tigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式错误',
            tigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码长度必须为6个数字',
            tigger: 'blur'
          }
        ],
        checked: [
          {
            // validator--->自定义校验函数
            validator: fn
          }
        ]
      }
    }
  },
  methods: {
    // validate--->手动校验表单数据
    login () {
      this.$refs.form.validate(isOK => {
        if (isOK) {
          this.$axios.post('/authorizations', this.ruleForm).then(result => {
            // console.log(result)
            window.localStorage.setItem('user-info', JSON.stringify(result.data))
            // 编程式导航
            this.$router.push('/home')
          }).catch(() => {
            // console.log(error)
            this.$message({
              message: '输入的手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
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
