<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form label-width="300px" :model="formData" :rules="rules" ref="userForm">
      <el-upload class="portraits" action :http-request="updateImg">
        <img :src="formData.photo?formData.photo:defaulltImg" alt />
      </el-upload>
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入头条号名称" v-model="formData.name" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input placeholder="请输入头条号简介" v-model="formData.intro" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入邮箱地址" v-model="formData.email" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input disabled v-model="formData.mobile" style="width:350px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserForm">保存修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaulltImg: require('../../assets/image/avatar.jpg'),
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      rules: {
        name: [{ required: true, message: '用户名称不能为空' }],
        email: [{ required: true, message: '邮箱不能为空' }]
      }
    }
  },
  methods: {
    updateImg (params) {
      // params=>content为http-request默认参数对象
    //   console.log(params)
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
      })
    },
    saveUserForm () {
      this.$refs.userForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // console.log(result)
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.portraits {
    position: absolute;
    left:250px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
</style>
