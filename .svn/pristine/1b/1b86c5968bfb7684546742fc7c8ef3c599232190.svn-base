<template>
  <div class="upload-img">
    <el-dialog :visible.sync="dialogShow" @open="openDialog" width="500px" @close="dialogHide" title="修改头像" center>
      <div class="changeIcon">
        <div class="change-img">
          <img :src="userSelectImagePath||iconImgurl" alt="" style="width:100%">
        </div>
        <!--  -->
        <div class="button-group">
          <input type="file" multiple="multiple" style="display: none" name="file" class="file" ref="avatarInput" accept="image/png,image/gif,image/jpeg" @change="changeImage($event)" />
          <el-button v-show="!showUploadBtn" type="primary" @click="edit" class="upload_img">选择上传头像</el-button>
          <el-button v-show="showUploadBtn" @click="cancelUpload">取消上传</el-button>
          <el-button v-show="showUploadBtn" type="primary" @click="upload">确定上传</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { IMAGE_PATH, IMG_TYPE } from "@/utility/dict";
import { utility, getRequestSign } from "@/utility";
import { iconPath, apiRoot } from "@/service/urlConfig";
// import   from "@/service/urlConfig";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userList: {
      type: Object
    }
  },
  watch: {
    show: function(val) {
      this.dialogShow = val;
    },
    userList: function(val) {
      if (val && val.icon) {
        this.iconImgurl = iconPath + val.icon;
      } else {
        this.iconImgurl = "static/userAvatar/default.png";
      }
    }
  },
  data() {
    return {
      dialogShow: false,
      showUploadBtn: false,
      // Icons: [],
      iconFile: "",
      selectItem: 0,
      isSelected: false,
      userSelectImagePath: "",
      iconImgurl: "",
      activeName2: "first"
    };
  },
  mounted() {
    console.log("------------", this);
    // this.Icons = [];
    // for (let i = 1; i < 151; i++) {
    //   this.Icons.push(IMAGE_PATH + i + IMG_TYPE);
    // }
  },
  methods: {
    openDialog() {
      if (!this.iconImgurl) {
        let icon = localStorage.getItem("icon");
        if (icon) {
          this.iconImgurl = iconPath + icon;
        } else {
          this.iconImgurl = "static/userAvatar/default.png";
        }
      }
    },
    dialogHide: function() {
      this.userSelectImagePath = "";
      this.dialogShow = false;
      this.showUploadBtn = false;
      this.$emit("update:show", false);
    },

    changeImage(e) {
      let file = this.$refs.avatarInput.files[0];
      console.log("------------input files", this.$refs);
      try {
        let url = URL.createObjectURL(file);
        this.userSelectImagePath = url;
      } catch (error) {
        console.log("--------err", error);
      }
      this.showUploadBtn = true;
    },
    edit() {
      this.showUploadBtn = false;
      this.$refs.avatarInput.click();
    },
    selectQue() {
      this.userList.icon = this.iconFile;
      console.log(this.userList);
      localStorage.setItem("icon", this.userList.icon);
      this.$parent.iconImgurl = localStorage.getItem("icon");
      this.dialogShow = false;
    },
    selectImg(val, index) {
      this.iconFile = val;
      this.selectItem = index;
      if (this.selectItem === index) {
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    },
    cancelUpload() {
      this.dialogHide();
    },
    upload() {
      let load = this.$loading({
        background: "rgba(0, 0, 0, 0.1)"
      });
      let params = {};
      let formData = new FormData();
      let token = localStorage.getItem("token");
      let file = this.$refs.avatarInput.files[0];
      params["token"] = token;
      params["ts"] = utility.getTs();
      params["version"] = "1.0.0";
      params["sign"] = getRequestSign(params);
      for (const val in params) {
        formData.append(val, params[val]);
      }
      formData.append("file", file);
      let config = {
        "Content-Type": "multipart/form-data"
      };
      this.showUploadBtn = false;
      this.userSelectImagePath = "";
      if (this.$refs.avatarInput.files.length !== 0) {
        this.$http.post(apiRoot + "changeIcon", formData, config).then(
          res => {
            load.close();
            console.log("-----------res", res);
            let result = res.data;
            let data = result.data;
            let code = result.code;
            let msg = result.msg;
            if (code === 200) {
              this.$message.success("上传成功");
              this.iconImgurl = iconPath + data.icon;
              localStorage.setItem("icon", data.icon);
              this.$parent.iconImgurl = iconPath + data.icon;
            }
            if (code === 500) {
              this.$message.error(msg);
            }
          },
          () => {
            load.close();
            this.$message.error("请求错误");
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" >
.upload-img {
  .changeIcon {
    width: 100%;
    .change-img {
      display: inline-block;
      width: 200px;
      height: 200px;
      border: 1px solid #c0c4cc;
      margin-bottom: 50px;
      overflow: hidden;
    }
    .button-group {
      height: 100%;
      display: inline-block;
    }
  }
  .el-dialog__header {
    background-color: #66b1ff !important;
    text-align: center;
  }
  .el-dialog__title {
    color: #f5f7fa;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #f5f7fa;
  }
  .el-dialog__headerbtn {
    font-size: 22px;
  }
}
</style>
