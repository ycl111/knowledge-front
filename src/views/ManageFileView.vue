<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <LeftHeader></LeftHeader>
    <el-main>
      <div class="table_container">
        <el-table :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column type="index" width="100"> </el-table-column>

          <el-table-column property="filename" label="文件名" width="220">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="danger" @click="deleteFile(scope.row.filename)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="Pagination" style="text-align: left; margin-top: 10px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="count">
          </el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import LeftHeader from '@/components/LeftHeader.vue'
import Axios from "axios"
export default {
  name: 'ManageFileView',
  components: {
    LeftHeader
  },

  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.getFileList()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //当页数变化时
      // console.log(`当前页: ${val}`);
      var tmpTableData = JSON.parse(localStorage.getItem("filelist"));
      // console.log(tmpTableData);
      this.offset = this.pageSize * (val - 1);
      // console.log(`offset: ${this.offset}`);
      if (tmpTableData.length <= this.pageSize * val) {
        this.limit = tmpTableData.length - 1;
      } else {
        this.limit = this.offset + this.pageSize - 1;
      }

      // console.log(`limit: ${this.limit}`);
      if (tmpTableData) {
        this.tableData = [];
        for (var j = this.offset; j <= this.limit; j++) {
          this.tableData.push(tmpTableData[j]);
        }
      }
    },
    getFileList() {
      localStorage.removeItem("filelist");
      Axios.get('/api/filemanage')
        .then(response => {
          // console.log(response.data)
          if (response.data.status == "success") {
            var result = response.data.data;
            var tmpTableData = [];
            for (let i = 0; i < result.length; i++) {
              var filename = result[i];
              tmpTableData.push({ filename: filename })
            }
            localStorage.setItem("filelist", JSON.stringify(tmpTableData));
            this.count = result.length;
            //第一页显示列表
            if (tmpTableData.length <= this.pageSize) {
              this.tableData = tmpTableData;
            } else {
              for (var j = 0; j < this.pageSize; j++) {
                this.tableData.push(tmpTableData[j]);
              }
            }
          }
          else {
            console.log(response.data.message);
          }

        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteFile(filename) {
      this.$confirm("此操作将永久删除此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Axios.delete('/api/deletefile/' + filename)
            .then(response => {
              // console.log(response.data)
              if (response.data.status == "success") {
                this.$message.success("删除成功");
                this.$router.go(0);
              }

              else {
                this.$message.error("删除失败");
              }
            })
            .catch(error => {
              console.log(error)
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  }
}
</script>