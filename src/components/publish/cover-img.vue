<template>
  <div class="cover-image">
    <div class="cover-item" v-for="(item,index) in images" :key="index" @click="clickImg (index)">
      <img :src="item?item:defaultImg" alt />
    </div>
    <el-dialog :visible="dialogVisible"  @close="dialogVisible = false">
        <select-img @selectOneImg="selectImg"></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/image/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    clickImg (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    selectImg (url) {
      this.$emit('updateImage', url, this.selectIndex)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
  display: flex;
  //  flex-wrap: wrap;
  .cover-item {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
