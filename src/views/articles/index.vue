<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form class="total-title">
      <el-form-item label="文章状态:">
        <el-radio-group v-model="formData.status" @change="refreshList">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select v-model="formData.channels_id" placeholder="请选择" @change="refreshList">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          @change="refreshList"
          v-model="formData.dateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total_title">共找到{{page.totalCount}}条符合条件的内容</div>
    <!-- 内容列表 -->
    <div class="content-list">
      <!-- 循环项 -->
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="item.cover.images" alt />
          <!-- 内容信息 -->
          <div class="info">
            <!-- 文章标题 -->
            <span>{{item.title}}</span>
            <el-tag style="width:60px" :type="item.status|statusType">{{item.status|statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span style="cursor:pointer">
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span @click="delItem(item)" style="cursor:pointer">
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination background layout="prev, pager, next" :total="page.totalCount" @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        channels_id: '',
        status: 5,
        dateRange: null
      },
      page: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10
      },
      channels: [],
      list: []
    }
  },
  methods: {
    // 获取from表单中的状态
    getConditions () {
      let { channels_id: cid, status, dateRange } = this.formData
      let params = {
        status: status === 5 ? null : status,
        channels_id: cid,
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length > 1 ? dateRange[1] : null }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize
      return params
    },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getArticles(this.getConditions())
    },
    // 当from表单中的状态发生改变时重新刷新表单
    refreshList () {
      this.page.currentPage = 1
      this.getArticles(this.getConditions())
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params: { ...params }
      }).then(result => {
        // console.log(result)/
        this.list = result.data.results
        this.page.totalCount = result.data.total_count
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // console.log(result.data)
        this.channels = result.data.channels
      })
    }
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'warning'
        case 4:
          return 'danger'
      }
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.total-title {
  border-bottom: 1px dashed #ccc;
  padding-left: 40px;
}
.content-list {
  .content-item {
    padding: 10px;
    border-bottom: 1px solid #f2f3f5;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        margin-left: 10px;
        display: flex;
        height: 100px;
        padding: 5px 0;
        flex-direction: column;
        justify-content: space-between;
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      span,
      span i {
        font-size: 12px;
        color: #333;
      }
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>
