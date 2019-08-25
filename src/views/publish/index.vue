<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form label-width="80px" :model="formData" :rules="rules" ref="myFrom">
      <el-form-item label="标题" prop="title">
        <el-input style="width:400px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor
          type="textarea"
          placeholder="请输入内容"
          style="width:800px;height:400px;margin-bottom:100px"
          v-model="formData.content"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formData.cover.type" @change="changeType()">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <cover-img :images="formData.cover.images"></cover-img>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="publish(false)">发表</el-button>
        <el-button @click="publish(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      draft: false,
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空' },
          {
            min: 5,
            max: 30,
            message: '标题内容需要在5~30字符之间'
          }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    changeType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    getArticlesID () {
      let { articleId } = this.$route.params
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    },
    publish (draft) {
      this.$refs.myFrom.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params
          let method = articleId ? 'put' : 'post'
          let url = articleId ? `/articles/${articleId}` : '/articles'
          this.$axios({
            method,
            url,
            params: { draft },
            data: this.formData
          }).then(result => {
            // console.log(result)
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    let { articleId } = this.$route.params
    articleId && this.getArticlesID()
    this.getChannels()
  }
}
</script>

<style>
</style>
