<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form class="total-title">
      <el-form-item label="文章状态:">
        <el-radio-group v-model="radio">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select v-model="channels_id" placeholder="请选择">
          <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          v-model="value1"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total_title">共找到条符合条件的内容</div>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
    //   formDate: {
    //     radio: 5,
    //     channels_id: '',
    //     status: null,
    //     page: {
    //       currentPage: 1,
    //       totalCount: 0,
    //       pageSize: 10
    //     }
    //  },
      channels: [],
      list: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // console.log(result.data)
        this.channel = result.data.results
      })
    },
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        // console.log(result)/
        this.list = result.data.results
        this.totalCount = result.data.total_count
      })
    }
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0 :
          return '草稿'
        case 2 :
          return '已发表'
        case 3 :
          return '审核失败'
        case 4 :
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0 :
          return 'info'
        case 2 :
          return 'success'
        case 3 :
          return 'warning'
        case 4 :
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
