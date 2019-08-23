<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrClose(obj.row)"
            :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"
          >{{obj.row.comment_status?"关闭评论":"打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination background layout="prev, pager, next"
      :total="page.total" :page-size="page.pageSize" :current-page="page.currentPage"
      @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComments()
    },
    openOrClose (row) {
      let msg = row.comment_status ? '打开' : '关闭'
      this.$confirm(`您确定要${msg}这条评论吗`, '提示').then(() => {
        this.$axios({
          methods: 'put',
          url: '/comments/status',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComments()
        })
      })
    },
    getComments () {
      let pageParams = { page: this.page.currentPage, per_page: this.page.pageSize }
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          ...pageParams
        }
      }).then(result => {
        // console.log(result.data.results)
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
