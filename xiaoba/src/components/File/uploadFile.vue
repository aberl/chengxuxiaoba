<template>
    <el-form-item label="图片" ref="registerRef" prop="images">
      <el-upload
        class="upload-demo"
        action="string"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :http-request="httprequest"
        accept="*"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
      </el-upload>
    </el-form-item>
</template>

<script>
export default {
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>
