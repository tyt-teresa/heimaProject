<template>
  <el-row class="home-header" type="flex" justify="space-between" align="middle">
    <el-col :span="9" class="left-header">
      <i :class="currentClass" @click="openOrClose"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="right-header">
      <img :src="user.photo?user.photo:defaultImg" alt="用户头像" />
      <el-dropdown trigger="click" class="select" @command="commandItems">
        <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../tools/eventBus'
export default {
  data () {
    return {
      user: {

      },
      currentClass: 'el-icon-s-fold',
      defaultImg: require('../../assets/image/avatar.jpg')
    }
  },
  methods: {
    openOrClose () {
      eventBus.$emit('collapseOrClose')
      this.currentClass = this.currentClass === 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    getInfo () {
      // let userinfo = window.localStorage.getItem('user-info')
      // let token = userinfo ? JSON.parse(userinfo).token : null
      // console.log(token)
      this.$axios({
        // methods: 'get',
        url: '/user/profile'
        // headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        // console.log(result.data.data)
        this.user = result.data
      })
    },
    commandItems (command) {
      if (command === 'account') {
        this.$router.push('/home/acount')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/tyt-teresa/heimaProject'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getInfo()
    eventBus.$on('updateUserInfoSuccess', () => {
      this.getInfo()
    })
  }
}
</script>

<style lang="less" scoped>
.home-header {
  padding-top: 12px;
  .left-header {
    i {
      font-size: 20px;
      margin-right: 8px;
    }
  }
  .right-header {
      display: flex;
      align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
