"use strict";(self["webpackChunkweblog"]=self["webpackChunkweblog"]||[]).push([[26],{26026:function(s,e,t){t.r(e),t.d(e,{default:function(){return m}});var r=function(){var s=this,e=s._self._c;return e("div",{staticClass:"root"},[e("div",{staticClass:"session base-info"},[e("el-divider",{attrs:{"content-position":"left"}},[e("span",{staticClass:"session-title"},[s._v("基础信息")])]),e("div",{staticClass:"session-content"},[e("el-form",{ref:"userForm",staticClass:"userForm",attrs:{model:s.userForm,"label-width":"6rem"}},[e("el-form-item",{attrs:{prop:"userName",label:"用户名"}},[s.isEdit?e("el-input",{staticStyle:{wdith:"5rem"},attrs:{type:"text",placeholder:"输入用户名"},model:{value:s.userForm.userName,callback:function(e){s.$set(s.userForm,"userName",e)},expression:"userForm.userName"}}):e("span",{domProps:{textContent:s._s(s.user.userName)}})],1),e("el-form-item",{attrs:{prop:"headshot",label:"用户头像"}},[s.isEdit?e("el-upload",{staticClass:"avatar-uploader",attrs:{action:s.$upload_path,"show-file-list":!1,"on-success":s.handleAvatarSuccess,"on-error":s.handleAvatarError,"before-upload":s.beforeAvatarUpload}},[s.user.headshot?e("el-image",{staticClass:"avatar",attrs:{src:s.user.headshot||"#"}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})],1):e("el-image",{staticClass:"userImage",attrs:{src:s.user.headshot||"#",alt:""}})],1),e("el-form-item",{attrs:{prop:"phone",label:"手机号"}},[s.isEdit?e("el-input",{staticStyle:{wdith:"5rem"},attrs:{type:"text",placeholder:"更改手机号绑定"},model:{value:s.userForm.phone,callback:function(e){s.$set(s.userForm,"phone",e)},expression:"userForm.phone"}}):e("span",{domProps:{textContent:s._s(s.user.phone)}})],1),e("el-form-item",{attrs:{prop:"email",label:"邮箱"}},[s.isEdit?e("el-input",{staticStyle:{wdith:"5rem"},attrs:{type:"text",placeholder:"更改邮箱绑定"},model:{value:s.userForm.email,callback:function(e){s.$set(s.userForm,"email",e)},expression:"userForm.email"}}):e("span",{domProps:{textContent:s._s(s.user.email)}})],1),e("el-form-item",[e("el-button",{attrs:{type:"primary"},domProps:{textContent:s._s(s.isEdit?"修改":"编辑")},on:{click:s.handleChange}})],1)],1)],1)],1),e("div",{staticClass:"session base-info"},[e("el-divider",{attrs:{"content-position":"left"}},[e("span",{staticClass:"session-title"},[s._v("修改密码")])]),e("div",{staticClass:"session-content"},[e("el-form",{ref:"userForm",staticClass:"userForm",attrs:{model:s.passwordForm,"label-width":"6rem"}},[e("el-form-item",{attrs:{prop:"prePassword",label:"原密码"}},[e("el-input",{staticStyle:{wdith:"5rem"},attrs:{type:"text",placeholder:"输入新密码"},model:{value:s.passwordForm.prePassword,callback:function(e){s.$set(s.passwordForm,"prePassword",e)},expression:"passwordForm.prePassword"}})],1),e("el-form-item",{attrs:{prop:"newPassword",label:"新密码"}},[e("el-input",{staticStyle:{wdith:"5rem"},attrs:{type:"text",placeholder:"输入新密码"},model:{value:s.passwordForm.newPassword,callback:function(e){s.$set(s.passwordForm,"newPassword",e)},expression:"passwordForm.newPassword"}})],1),e("el-form-item",[e("el-button",{attrs:{type:"primary"},domProps:{textContent:s._s("修改")},on:{click:s.handleChangePassword}})],1)],1)],1)],1)])},a=[],o=t(20629),i={name:"changePage",data(){return{userForm:{},passwordForm:{prePassword:"",newPassword:""},isEdit:!1,isChangePassword:!1,imageUrl:""}},mounted(){this.userForm=this.user},computed:{user(){const s=this.$store.state.user;return!!s.token&&s.userInfo}},methods:{...(0,o.OI)("user",["UpdateUserInfo"]),...(0,o.nv)("user",["updateUserInfo","getUserInfo","updatePassword"]),async handleChangePassword(){try{const{data:s}=await this.updatePassword({userId:this.user.id,...this.passwordForm});200===s.code?this.$message.success(s.msg):this.$message.error(s.msg)}catch(s){this.$message.error(s)}},async handleChange(){if(this.isEdit)try{const{data:s}=await this.updateUserInfo({userId:this.user.id,...this.userForm});if(200===s.code){this.$message.success("信息修改成功！");const{data:s}=await this.getUserInfo({userId:this.user.id});200===s.code&&this.UpdateUserInfo(s.data)}}catch(s){this.$message.error(s)}this.isEdit=!this.isEdit},handleAvatarSuccess(s,e){this.userForm.headshot=s.data.minIoUrl},handleAvatarError(s,e,t){this.$message.error("文件上传失败！")},beforeAvatarUpload(s){const e=s.size/1024/1024<5;return e||this.$message.error("上传头像图片大小不能超过 5MB!"),e}}},l=i,n=t(1001),d=(0,n.Z)(l,r,a,!1,null,"367e0700",null),m=d.exports}}]);
//# sourceMappingURL=26.ee459d03.js.map