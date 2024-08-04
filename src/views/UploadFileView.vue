<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <LeftHeader></LeftHeader>
    <el-main>
      <el-upload class="upload-demo" ref="upload" accept=".txt,.doc,.docx,.pdf" action="/api/api/filemanage"
        :before-upload="beforeUpload" :on-exceed="handleExceed" :on-preview="handlePreview" :on-remove="handleRemove"
        :on-success="handleSuccess" :file-list="fileList" :auto-upload="false" :limit="3">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">不支持中文文件名,只能上传txt/doc/docx/pdf文件，且不超过10mb</div>
      </el-upload>

    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import LeftHeader from '@/components/LeftHeader.vue'
export default {
  name: 'UploadFileView',
  components: {
    LeftHeader
  },
  data() {
    return {
      fileList: [],

    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.$router.push('/managefile')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      const fileSuffix = file.name.split('.')[1];
      const whitelist = ['txt', 'doc', 'docx', 'pdf'];
      if (whitelist.indexOf(fileSuffix) === -1) {
        this.$message.error('上传文件格式不正确!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!');
        return false;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  }
}
</script>