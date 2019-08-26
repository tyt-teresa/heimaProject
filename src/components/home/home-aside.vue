<template>
  <div>
    <div class="title">
      <img :src="collapse?smallImg : bigImg" alt="黑马头条" :style="{width:collapse?'30px':'140px'}" />
    </div>
    <el-menu
    background-color="#353b4e"
    text-color="#adafb5"
    active-text-color=" #ffd04b"
    router
    :collapse="collapse"
    :collapse-transition="false"
    > <!-- :router="true"和router一样 -->
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="content">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>

      <el-submenu index="fans">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
        <el-menu-item index="/home/fansdetails">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fansphoto">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-user-solid"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../tools/eventBus'
export default {
  data () {
    return {
      collapse: false,
      bigImg: require('../../assets/image/logo_admin.png'),
      smallImg: require('../../assets/image/toutiao.png')
    }
  },
  created () {
    eventBus.$on('collapseOrClose', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang="less" scoped>
    .title{
        padding:15px 0;
        text-align:center;
        background-color: #2e2f32;
        img {
            width:140px;
            height: 30px;
        }

    }
</style>
