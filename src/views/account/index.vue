<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form label-width="300px" :model="fromData" :rules="rules">
      <el-upload class="portraits" action>
        <img :src="fromData.photo?fromData.photo:defaulltImg" alt />
      </el-upload>
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入头条号名称" v-model="fromData.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input placeholder="请输入头条号简介" v-model="fromData.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入邮箱地址" v-model="fromData.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input disabled v-model="fromData.mobile" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaulltImg: require('../../assets/image/avatar.jpg'),
      fromData: {
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
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // console.log(result)
        this.fromData = result.data
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
