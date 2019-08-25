<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form label-width="80px" :model="formData" :rules="rules" ref="myFrom">
      <el-form-item label="标题" prop="title">
        <el-input style="width:400px" v-model="formData.title"></el-input>
      </el-form-item >
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" placeholder="请输入内容" :rows="20" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
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
        title: [{ required: true, message: '标题不能为空' },
          {
            min: 5,
            max: 30,
            message: '标题内容需要在5~30字符之间'
          }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    publish (draft) {
      this.$refs.myFrom.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/articles',
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
    this.getChannels()
  }
}
</script>

<style>
</style>
