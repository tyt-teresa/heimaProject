<template>
  <el-container>
    <el-aside :style="{width,minHeight:'100vh',backgroundColor: '#323745'}">
      <home-aside></home-aside>
    </el-aside>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-main style="padding:0">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import eventBus from '../../tools/eventBus'
export default {
  data () {
    return {
      width: '200px'
    }
  },
  created () {
    eventBus.$on('collapseOrClose', () => {
      this.width = this.width === '200px' ? '60px' : '200px'
    })
  }
}
</script>
