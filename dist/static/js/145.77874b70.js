"use strict";(self["webpackChunkweblog"]=self["webpackChunkweblog"]||[]).push([[145],{33145:function(e,s,t){t.r(s),t.d(s,{default:function(){return l}});t(57658);var o=function(){var e=this,s=e._self._c;return s("el-form",{ref:"restoreForm",attrs:{model:e.restoreForm,"status-icon":"",size:"medium"}},[s("el-form-item",[s("div",{staticClass:"header"},[s("el-image",{attrs:{src:t(27442),alt:""}}),s("span",{staticClass:"tip"},[e._v("重置密码")])],1)]),s("el-form-item",{attrs:{prop:"phone"}},[s("el-input",{ref:"inputRePhone",attrs:{type:"text",placeholder:"请输入手机号"},model:{value:e.restoreForm.phone,callback:function(s){e.$set(e.restoreForm,"phone",s)},expression:"restoreForm.phone"}})],1),s("el-form-item",{attrs:{prop:"code"}},[s("el-input",{ref:"inputReCode",attrs:{type:"text",autocomplete:"off",placeholder:"请输入6位数验证码"},model:{value:e.restoreForm.code,callback:function(s){e.$set(e.restoreForm,"code",s)},expression:"restoreForm.code"}},[s("span",{class:"code "+(0===e.sendCodeTime?"code-link":"code-disabled"),attrs:{slot:"suffix"},on:{click:function(s){return e.getPhoneCode()}},slot:"suffix"},[e._v(" "+e._s(0===e.sendCodeTime?"发送验证码":e.sendCodeTime+"s后再次发送")+" ")])])],1),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{directives:[{name:"show",rawName:"v-show",value:e.isSend,expression:"isSend"}],ref:"inputRePassword",attrs:{placeholder:"请输入新密码","show-password":""},model:{value:e.restoreForm.newPassword,callback:function(s){e.$set(e.restoreForm,"newPassword",s)},expression:"restoreForm.newPassword"}})],1),s("el-form-item",[s("el-button",{class:"btn-submit "+(e.restoreForm.phone?"":"not-allowed"),attrs:{type:"primary"},on:{click:function(s){return e.submitForm()}}},[e._v("修改密码")])],1),s("el-form-item",[s("el-link",{attrs:{underline:!1,type:"primary"},on:{click:function(s){return e.$router.push({name:"login"})}}},[e._v("返回登录")])],1)],1)},r=[];function n(e){const s=/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;return s.test(e)}var i={name:"login",data(){return{restoreForm:{phone:"",code:"",newPassword:""},sendCodeTime:0,isSend:!1}},methods:{resetForm(e){this.$refs[e].resetFields()},async getPhoneCode(){if(0===this.sendCodeTime){if(this.restoreForm.phone||this.$notify({message:"请输入手机号",type:"warning",duration:2e3}),!n(this.restoreForm.phone))return this.$notify({message:"手机号格式不正确",type:"warning",duration:2e3});this.$message.success("验证码已发送！"),this.isSend=!0,this.sendCodeTime=60;const e=setInterval((()=>{this.sendCodeTime--,0===this.sendCodeTime&&clearInterval(e)}),1e3)}else this.$message.warning("操作过于频繁！")},async updateByPhone(){this.$message.success("重置成功！自动跳转到登录！"),this.resetForm("restoreForm"),setTimeout((()=>{this.$router.push({name:"login"})}),1e3)},submitForm(){return this.restoreForm.phone?n(this.restoreForm.phone)?""===this.restoreForm.code||6!==this.restoreForm.code.length?(this.$notify({message:""===this.restoreForm.code?"请输入验证码":"验证码位数不正确",type:"warning",duration:2e3}),void this.$refs.inputReCode.focus()):""===this.restoreForm.newPassword||this.restoreForm.newPassword.length<6?(this.$notify({message:""===this.restoreForm.newPassword?"请输入新密码":"密码长度不低于6位",type:"warning",duration:2e3}),void this.$refs.inputRePassword.focus()):void this.updateByPhone():(this.$notify({message:"手机号格式不正确",type:"warning",duration:2e3}),this.$refs.inputRePhone.focus()):(this.$notify({message:"请输入手机号",type:"warning",duration:2e3}),this.$refs.inputRePhone.focus())}}},a=i,d=t(1001),m=(0,d.Z)(a,o,r,!1,null,"bc4bf392",null),l=m.exports},27442:function(e,s,t){e.exports=t.p+"static/img/logo.069095a8.png"}}]);
//# sourceMappingURL=145.77874b70.js.map