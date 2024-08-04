<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <LeftHeader></LeftHeader>
    <el-main>
      <el-form :model="formData" ref="formData" label-width="110px" class="demo-formData">
        <el-form-item property="searchword" label="搜索关键词" width="220">
          <el-input v-model="formData.searchword"></el-input>
        </el-form-item>
        <el-form-item class="button_submit">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button type="primary" @click="clear()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-input type="textarea" :rows="10" placeholder="" v-model="textarea">

      </el-input>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import LeftHeader from '@/components/LeftHeader.vue'
import Axios from "axios";
export default {
  name: 'SearchKnowledgeView',
  components: {
    LeftHeader
  },
  data() {
    return {
      textarea: "知识库检索结果",
      formData: {
        searchword: "",
      },
    };
  },
  methods: {
    submitForm() {
      Axios.post("/api/knowledge", {
        query: this.formData.searchword,
      })
        .then((response) => {
          this.textarea = response.data.result;
        });

    },
    clear() {
      this.formData = {
        formData: {
          searchword: "",
        },
      };
    }
  }
}
</script>