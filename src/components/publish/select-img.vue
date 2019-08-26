<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="materials">
        <div class="material-list">
          <el-card v-for="item in list" :key="item.id" class="material-item">
            <img :src="item.url" alt @click="selectOneImg(item)" />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">
        <el-upload
          class="upload-demo"
          drag
          action
          :http-request="uploadImg"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'materials',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 9,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(result => {
        // console.log(result.data.url)
        this.$emit('selectOneImg', result.data.url)
      })
    },
    selectOneImg (item) {
    //   console.log(item.url)
      this.$emit('selectOneImg', item.url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterials()
    },
    getMaterials () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: false, ...pageParams }
      }).then(result => {
        // console.log(result.data.results)
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
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  .material-item {
    margin: 5px;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
