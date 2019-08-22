<template>
  <el-container>
  <el-aside style="width:200px;height:100vh;background-color: #323745;">
    <home-aside></home-aside>
  </el-aside>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>

</template>

<script>
import homeAside from '../../components/home/home-aside.vue'
import homeHeader from '../../components/home/home-header.vue'
export default {
  components: {
    'home-aside': homeAside,
    'home-header': homeHeader
  }
}
</script>
