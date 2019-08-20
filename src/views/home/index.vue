<template>
  <el-container>
  <el-aside style="width:200px;height:100vh;background-color: #323745;">
    <home-aside></home-aside>
  </el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>

</template>

<script>
import homeAside from '../../components/home-aside'
export default {
  components: { 'home-aside': homeAside }
}
</script>
