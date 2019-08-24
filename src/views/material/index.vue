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
              <i class="el-icon-star-on" @click="collectOrCanel(item)" :style="{color:item.is_collected?'red':''}"></i>
              <i class="el-icon-delete-solid" @click="delMaterial(item)"></i>
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
    // 收藏或取消收藏
    collectOrCanel (item) {
      let msg = item.is_collected ? '取消收藏' : '收藏'
      this.$confirm(`您是否要${msg}此图片?`, '提示')
      this.$axios({
        methods: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(result => {
        this.getMaterials()
      })
    },
    // 删除素材
    delMaterial (item) {
      this.$confirm('您确定要删除此图片吗?', '提示').then(() => {
        this.$axios({
          methods: 'delete',
          url: `/user/images/${item.id}`
        }).then(result => {
          this.getMaterials()
        })
      })
    },
    // 实现分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterials()
    },
    // 切换标签页
    changeTab () {
      this.page.currentPage = 1
      this.getMaterials()
    },
    // 获取后台素材
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
  justify-content: start;
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
