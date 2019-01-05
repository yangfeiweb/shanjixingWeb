<template>
  <div class="pay-dialog">
    <el-dialog width="400px" :visible.sync="dialogShow" @close="dialogHide" title="账户充值">
      <div style="text-align:center">
        <div style="font-size: 18px;">使用充值码给账户充值</div>
        <div></div>
        <el-form :model="payForm" ref="payForm" :rules="rules2" class="pass" label-width="100px">
          <el-form-item label="充值密码：" prop="payNo">
            <el-input clearable v-model="payForm.payNo" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <p>
          充值卡是一次性产品,充值成功后该卡就会失效！
        </p>
      </div>
      <div slot="footer">
        <el-button @click="dialogShow=false">取消</el-button>
        <el-button type="primary" @click="pay('payForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dataService from "@/service/index";

import { utility } from "@/utility";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: function(val) {
      this.dialogShow = val;
      console.log(val);
    }
  },
  data() {
    var payNo = (rule, value, callback) => {
      let reg = /\S/;
      if (!reg.test(value)) {
        return callback(new Error("充值密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      dialogShow: false,
      payNo: "",
      payForm: {
        payNo: ""
      },
      rules2: {
        payNo: [{ validator: payNo, trigger: "blur" }]
      }
    };
  },
  methods: {
    dialogHide: function() {
      this.$emit("update:show", false);
    },
    pay(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let loading = this.$loading({
            background: "rgba(0,0,0,.1)"
          });
          dataService
            .pay(this.payForm.payNo, "CHARGE_CARD", "CHARGE_CARD")
            .then(
              res => {
                let result = res.data;
                let code = result.code;
                let msg = result.msg;
                if (code === 200) {
                  this.payForm.payNo = "";
                  this.$message.success("充值成功");
                  this.dialogShow = false;
                  this.computedVipday();
                }
                if (code === 500) {
                  this.$message.error(msg);
                }
                loading && loading.close();
              },
              () => {
                loading && loading.close();
                this.$message.error("请求错误");
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    computedVipday() {
      dataService.getUserInfo().then(res => {
        let result = res.data;
        let code = result.code;
        // let msg = result.msg;
        if (code === 200) {
          let data = result.data;
          let serverTime = localStorage.getItem("serverTime") || "";
          console.log("------------data", data);
          let day = utility.computedVipDay(serverTime, data.vipDeadTime);
          localStorage.setItem("vipDay", day);
          this.$emit("success")
        }
      });
    }
  }
};
</script>
<style lang="scss">
.pay-dialog {
  .el-form-item__error {
    left: 80px;
  }
  .el-dialog__header {
    background: #66b1ff !important;
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
  .el-input__inner {
    width: 100%;
  }
  .pass {
    margin-top: 30px;
  }
}
</style>
