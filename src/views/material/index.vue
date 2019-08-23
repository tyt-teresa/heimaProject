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
            <el-row type="flex" justify="space-around" class="operate">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        pageSize: 15,
        total: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterials()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterials()
    },
    getMaterials () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', ...pageParams }
      }).then(result => {
        console.log(result.data.results)
        this.list = result.data.results
        this.page.total = result.data.total_count
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
    width: 180px;
    height: 180px;
    margin: 20px 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .operate {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      background-color: #f4f5f6;
      i {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
}
</style>
