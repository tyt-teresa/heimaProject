<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="getMaterials">
      <el-tab-pane label="全部" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <el-row type="flex" justify>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="collect">
        <div>
          <el-card>
            <img src alt />
            <el-row type="flex" justify>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    changeTab () {
      this.getMaterials()
    },
    getMaterials () {
      this.$axios({
        url: '/user/images'
      }).then(result => {
        console.log(result.data.results)
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getMaterials()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .img-card {
    width: 150px;
    height: 150px;
    margin: 20px 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      background-color: #f4f5f6;
      i {
        font-size: 22px;
      }
    }
  }
}
</style>
