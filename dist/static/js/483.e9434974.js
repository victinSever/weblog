"use strict";(self["webpackChunkweblog"]=self["webpackChunkweblog"]||[]).push([[483],{65021:function(e,t,s){s.d(t,{Z:function(){return $}});s(57658);var o=function(){var e=this,t=e._self._c;return t("div",[e.isHidden?t("el-row",{staticClass:"header"},[t("el-row",{staticClass:"header-top"},[t("div",{staticClass:"header-top-in"},[t("div",{staticClass:"header-top-left"},[t("div",{staticClass:"header-logo",on:{click:e.handleGotoHome}},[t("el-image",{attrs:{src:s(90872)||"#",alt:""}})],1),t("el-input",{staticClass:"user-input",attrs:{size:"medium",placeholder:"输入博客标题、描述的关键词"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSearch.apply(null,arguments)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}},[t("div",{staticClass:"iconfont icon-search",attrs:{slot:"prefix"},on:{click:e.handleSearch},slot:"prefix"})])],1),t("div",{staticClass:"header-top-right"},[t("el-button",{staticClass:"user-create",attrs:{type:"primary",size:"medium",icon:"el-icon-user-solid"},on:{click:e.gotoEditor}},[e._v("去创作")]),e.user?t("el-button",{staticClass:"user-message",attrs:{icon:"el-icon-bell",circle:""},on:{click:e.handleClickMessage}}):e._e(),e.user?t("el-popover",{attrs:{placement:"bottom-end",width:"250",trigger:"click"}},[t("BaseInfo"),t("div",{staticClass:"user-img",attrs:{slot:"reference"},slot:"reference"},[e.user.headshot?t("img",{attrs:{src:e.user.headshot||"#"}}):e._e()])],1):t("el-button",{staticClass:"user-login-register",attrs:{type:"primary",plain:"",size:"medium"},on:{click:function(t){return e.$router.push({name:"login"})}}},[t("span",[e._v("登录")]),t("span",[e._v("|")]),t("span",[e._v("注册")])])],1)])])],1):e._e()],1)},i=[],n=function(){var e=this,t=e._self._c;return t("div",[1===e.loginWay?t("el-form",{ref:"passForm",attrs:{model:e.passForm,"status-icon":"",size:"medium"}},[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{ref:"inputUsername",attrs:{type:"text",autocomplete:"off",placeholder:"请输入用户名"},model:{value:e.passForm.username,callback:function(t){e.$set(e.passForm,"username",t)},expression:"passForm.username"}})],1),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{ref:"inputPassword",attrs:{autocomplete:"off",placeholder:"请输入密码","show-password":""},model:{value:e.passForm.password,callback:function(t){e.$set(e.passForm,"password",t)},expression:"passForm.password"}})],1),t("el-form-item",[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("登录")])],1),t("el-form-item",[t("el-link",{attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.changeLoginWay(2)}}},[e._v("手机登录")]),t("el-link",{staticStyle:{float:"right"},attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.changeLoginWay(3)}}},[e._v("忘记密码")])],1),t("el-form-item",{staticStyle:{display:"flex","justify-content":"space-around"}},[t("el-button",{staticClass:"iconfont icon-weibo",attrs:{circle:"",type:"danger"}})],1)],1):2===e.loginWay?t("el-form",{ref:"phoneForm",attrs:{model:e.phoneForm,"status-icon":"",size:"medium"}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{ref:"inputPhone",attrs:{type:"text",placeholder:"请输入手机号"},model:{value:e.phoneForm.phone,callback:function(t){e.$set(e.phoneForm,"phone",t)},expression:"phoneForm.phone"}})],1),t("el-form-item",{attrs:{prop:"code"}},[t("el-input",{ref:"inputCode",attrs:{type:"text",autocomplete:"off",placeholder:"请输入6位数验证码"},model:{value:e.phoneForm.code,callback:function(t){e.$set(e.phoneForm,"code",t)},expression:"phoneForm.code"}},[t("span",{class:"code "+(0===e.sendCodeTime?"code-link":"code-disabled"),attrs:{slot:"suffix"},on:{click:function(t){return e.getPhoneCode(1)}},slot:"suffix"},[e._v(" "+e._s(0===e.sendCodeTime?"发送验证码":e.sendCodeTime+"s后再次发送")+" ")])])],1),t("el-form-item",[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm2()}}},[e._v("登录")])],1),t("el-form-item",[t("el-link",{attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.changeLoginWay(1)}}},[e._v("切换登录方式")])],1)],1):3===e.loginWay?t("el-form",{ref:"restoreForm",attrs:{model:e.restoreForm,"status-icon":"",size:"medium"}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{ref:"inputRePhone",attrs:{type:"text",placeholder:"请输入手机号"},model:{value:e.restoreForm.phone,callback:function(t){e.$set(e.restoreForm,"phone",t)},expression:"restoreForm.phone"}})],1),t("el-form-item",{attrs:{prop:"code"}},[t("el-input",{ref:"inputReCode",attrs:{type:"text",autocomplete:"off",placeholder:"请输入6位数验证码"},model:{value:e.restoreForm.code,callback:function(t){e.$set(e.restoreForm,"code",t)},expression:"restoreForm.code"}},[t("span",{class:"code "+(0===e.sendCodeTime?"code-link":"code-disabled"),attrs:{slot:"suffix"},on:{click:function(t){return e.getPhoneCode(3)}},slot:"suffix"},[e._v(" "+e._s(0===e.sendCodeTime?"发送验证码":e.sendCodeTime+"s后再次发送")+" ")])])],1),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{ref:"inputRePassword",attrs:{placeholder:"请输入新密码","show-password":""},model:{value:e.restoreForm.newPassword,callback:function(t){e.$set(e.restoreForm,"newPassword",t)},expression:"restoreForm.newPassword"}})],1),t("el-form-item",[t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm3()}}},[e._v("修改")])],1),t("el-form-item",[t("el-link",{attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.changeLoginWay(4)}}},[e._v("邮箱重置密码")]),t("el-link",{staticStyle:{float:"right"},attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.changeLoginWay(1)}}},[e._v("账密登录")])],1)],1):t("el-form",{ref:"emailForm",attrs:{model:e.emailForm,"status-icon":"",size:"medium"}},[t("el-form-item",{attrs:{prop:"email"}},[t("el-input",{ref:"inputEmail",attrs:{type:"email",placeholder:"请输入邮箱"},model:{value:e.emailForm.email,callback:function(t){e.$set(e.emailForm,"email",t)},expression:"emailForm.email"}})],1),0!==e.sendEmailCodeTime?t("el-form-item",{attrs:{prop:"code"}},[t("el-input",{ref:"inputEmailCode",attrs:{type:"text",autocomplete:"off",placeholder:"请输入邮箱验证码"},model:{value:e.emailForm.code,callback:function(t){e.$set(e.emailForm,"code",t)},expression:"emailForm.code"}})],1):e._e(),0!==e.sendEmailCodeTime?t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{ref:"inputEmailPassword",attrs:{placeholder:"请输入新密码","show-password":""},model:{value:e.emailForm.password,callback:function(t){e.$set(e.emailForm,"password",t)},expression:"emailForm.password"}})],1):e._e(),t("el-form-item",[0===e.sendEmailCodeTime?t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.sendEmailCode}},[e._v("发送邮件验证码")]):t("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm4()}}},[e._v("修改")])],1),t("el-form-item",[t("el-link",{attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.changeLoginWay(3)}}},[e._v("手机重置密码")]),t("el-link",{staticStyle:{float:"right"},attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.changeLoginWay(1)}}},[e._v("账密登录")])],1)],1),e.loginWay<3?t("p",{staticClass:"user-private"},[t("span",[e._v("注册登录即表示同意 ")]),t("span",{staticClass:"argument",on:{click:function(t){return e.$router.push("/userAgreement")}}},[e._v("用户协议、隐私政策")])]):e._e()],1)},r=[],a=s(20629),l=s(70594),m={name:"loginPage",props:["loginWay"],data(){return{passForm:{username:"",password:"",ip:""},phoneForm:{phone:"",code:"",ip:""},restoreForm:{phone:"",code:"",newPassword:""},emailForm:{email:"",code:"",password:""},ip:"",phonePre:"",sendCodeTime:0,sendEmailCodeTime:0}},methods:{...(0,a.OI)("user",["UpdateUserInfo","UpdateToken"]),...(0,a.nv)("user",["getLoginByPass","getLoginByPhone","sendPhoneCode","retrievePasswordByPhone","retrievePasswordByEmail"]),changeLoginWay(e){this.$emit("changeLoginWay",e)},async loginByPass(){this.$message.success("登录成功！"),this.UpdateToken("123"),this.UpdateUserInfo({userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",username:"狂徒张三",userLevel:7,phone:"15730363265"}),this.$emit("closeDialog"),this.resetForm("passForm"),(0,l.Z)({method:"get",url:"你的路径",data:{id:1},params:{id:1},headers:{}}).then((e=>{console.log(e)})).catch((e=>{}))},submitForm(){return""===this.passForm.username?(this.$notify({message:"请输入用户名",type:"warning",duration:2e3}),void this.$refs.inputUsername.focus()):""===this.passForm.password?(this.$notify({message:"请输入密码",type:"warning",duration:2e3}),void this.$refs.inputPassword.focus()):void this.loginByPass()},async loginByPhone(){this.phoneForm.ip=this.ip;const{data:e}=await this.getLoginByPhone(this.phoneForm);200===e.code?(this.$message.success("登录成功！"),this.UpdateUserInfo(e.data),this.UpdateToken(e.data.token),this.$emit("closeDialog"),this.resetForm("phoneForm")):this.$message.warning(e.msg)},submitForm2(){return""===this.phoneForm.phone||11!==this.phoneForm.phone.length?(this.$notify({message:""===this.phoneForm.phone?"请输入手机号":"手机号位数不正确",type:"warning",duration:2e3}),void this.$refs.inputPhone.focus()):""===this.phoneForm.code||6!==this.phoneForm.code.length?(this.$notify({message:""===this.phoneForm.phone?"请输入验证码":"验证码位数不正确",type:"warning",duration:2e3}),void this.$refs.inputCode.focus()):void this.loginByPhone()},async getPhoneCode(e){if(0===this.sendCodeTime){if(11!==this.phoneForm.phone.length&&1===e)return void this.submitForm2();if(11!==this.restoreForm.phone.length&&3===e)return void this.submitForm3();const{data:t}=await this.sendPhoneCode({phone:this.restoreForm.phone,sendType:e});if(200!==t.code)return this.$message.error(t.msg);this.$message.success("验证码已发送！"),this.sendCodeTime=60;const s=setInterval((()=>{this.sendCodeTime--,0===this.sendCodeTime&&clearInterval(s)}),1e3)}else this.$message.warning("操作过于频繁！")},async updateByPhone(){const{data:e}=await this.retrievePasswordByPhone(this.restoreForm);200!==e.code&&this.$message.error(e.msg),this.$message.success("重置成功！自动跳转到登录！"),this.resetForm("restoreForm"),setTimeout((()=>{this.changeLoginWay(1)}),1e3)},submitForm3(){return""===this.restoreForm.phone||11!==this.restoreForm.phone.length?(this.$notify({message:""===this.restoreForm.phone?"请输入手机号":"手机号位数不正确",type:"warning",duration:2e3}),void this.$refs.inputRePhone.focus()):""===this.restoreForm.code||6!==this.restoreForm.code.length?(this.$notify({message:""===this.restoreForm.code?"请输入验证码":"验证码位数不正确",type:"warning",duration:2e3}),void this.$refs.inputReCode.focus()):""===this.restoreForm.newPassword||this.restoreForm.newPassword.length<6?(this.$notify({message:""===this.restoreForm.newPassword?"请输入新密码":"密码长度不低于6位",type:"warning",duration:2e3}),void this.$refs.inputRePassword.focus()):void this.updateByPhone()},async updateByEmail(){this.$message.success("密码重置成功！自动跳转到登录！"),this.resetForm("emailForm"),setTimeout((()=>{this.changeLoginWay(1)}),1e3)},submitForm4(){return""===this.emailForm.email?(this.$notify({message:""===this.emailForm.email?"请输入邮箱":"邮箱格式不正确",type:"warning",duration:2e3}),void this.$refs.inputEmail.focus()):""===this.emailForm.code||6!==this.emailForm.code.length?(this.$notify({message:""===this.restoreForm.code?"请输入验证码":"验证码位数不正确",type:"warning",duration:2e3}),void this.$refs.inputEmailCode.focus()):""===this.emailForm.password||this.emailForm.password.length<6?(this.$notify({message:""===this.restoreForm.password?"请输入新密码":"密码长度不低于6位",type:"warning",duration:2e3}),void this.$refs.inputEmailPassword.focus()):void this.updateByPhone()},sendEmailCode(){if(0===this.sendEmailCodeTime){this.$message.success("邮件已发送，请到邮箱查看验证码后重置密码"),this.sendEmailCodeTime=60;const e=setInterval((()=>{this.sendEmailCodeTime--,0===this.sendEmailCodeTime&&clearInterval(e)}),1e3)}else this.$message.warning("操作过于频繁！")},resetForm(e){this.$refs[e].resetFields()}}},c=m,u=s(1001),p=(0,u.Z)(c,n,r,!1,null,"15ede421",null),d=p.exports,h=function(){var e=this,t=e._self._c;return t("div",{staticClass:"root"},[t("div",{staticClass:"user-title"},[t("el-image",{staticClass:"title-image",attrs:{src:e.user.headshot||"#"},on:{click:function(t){return e.$router.push({name:"user"})}}}),t("div",{staticClass:"title-box"},[t("span",{staticClass:"title"},[e._v(e._s(e.user.username))]),t("p",[t("span",[e._v("成长等级："+e._s(e.user.ranking))]),t("span",{staticClass:"iconfont icon-arrow-right"})])])],1),t("div",{staticClass:"user-level"}),t("div",{staticClass:"user-info"},[t("span",[t("span",[e._v(e._s(e.user.concernAmount||0))]),t("span",[e._v("关注")])]),t("span",[t("span",[e._v(e._s(e.user.likedAmount||0))]),t("span",[e._v("赞过")])]),t("span",[t("span",[e._v(e._s(e.user.collectedAmount||0))]),t("span",[e._v("收藏")])])]),t("div",{staticClass:"user-menu"},e._l(e.menus,(function(s){return t("div",{key:s.id,staticClass:"menu-item",on:{click:function(t){return e.handleGoto(s)}}},[t("span",{class:"iconfont "+s.icon},[0!==s.message?t("span",{staticClass:"message"}):e._e()]),t("span",{staticClass:"title"},[e._v(e._s(s.title))])])})),0),t("div",{staticClass:"user-signOut"},[t("span",{staticClass:"setting",domProps:{textContent:e._s("个人信息")},on:{click:function(t){return e.$router.push({name:"change"})}}}),t("span",{staticClass:"signOut",domProps:{textContent:e._s("退出登录")},on:{click:e.signOut}})])])},f=[];const g=[{icon:"icon-person",title:"我的主页",urlname:"user",id:1,message:0},{icon:"icon-activity",title:"我的动态",urlname:"active",id:2,message:0},{icon:"icon-coursera",title:"创作管理",urlname:"essays",id:3,message:2},{icon:"icon-columns",title:"我的专栏",urlname:"columns",id:4,message:0},{icon:"icon-3501shuju",title:"成长中心",urlname:"data",id:5,message:0},{icon:"icon-setting",title:"主题配置",urlname:"setting",id:6,message:0}];var y={name:"userBaseInfo",data(){return{menus:g}},computed:{user(){const e=this.$store.state.user;return!!e.token&&e.userInfo}},methods:{...(0,a.OI)("user",["SignOut"]),handleGoto(e){this.$route.path!==e.path&&e.urlname&&this.$router.push({name:e.urlname})},signOut(){let e=window.confirm("确认退出吗，每个博文都是开发者辛勤劳动的结果~~");e&&(this.SignOut(),this.$message.success("退出成功！"))}}},v=y,w=(0,u.Z)(v,h,f,!1,null,"7d8502f6",null),F=w.exports,C={name:"headerCompontent",components:{Login:d,BaseInfo:F},data(){return{messageNum:1,keyword:"",inputOpen:!1}},computed:{user(){const e=this.$store.state.user;return!!e.token&&e.userInfo},isHidden(){return!this.$route.meta.hiddenHeader}},methods:{handleGotoHome(){"passage"!=this.$route.name&&this.$router.push({name:"passage"})},handleClickMessage(){this.$message.success("敬请期待！")},handleSearch(){const e=this.keyword.trim(),{query:t}=this.$route;t.key!==e&&e&&this.$router.push(`/search?key=${e}`)},gotoEditor:function(){this.user?this.$router.push("/user/content/drafts"):this.handleLogin()},handleLogin(){let e=this.$router.resolve({name:"login"});window.open(e.href,"_blank")},changeLoginWay(e){this.loginWay=e}}},k=C,_=(0,u.Z)(k,o,i,!1,null,"f4477144",null),$=_.exports},85402:function(e,t,s){s.d(t,{Z:function(){return c}});var o=function(){var e=this,t=e._self._c;return e.passageList&&0!==e.passageList.length?t("div",{staticClass:"passage-list"},e._l(e.passageList,(function(s){return t("div",{key:s.blogId,staticClass:"passage-item",on:{click:function(t){return e.gotoPost(s)}}},[t("div",{class:"publishInfo "+(s.publishImage?"":"full")},[t("div",{staticClass:"item-top"},[s.userImage?t("span",[t("el-image",{attrs:{src:s.userImage}})],1):e._e(),t("span",[e._v(e._s(s.userName||"未命名用户"))]),t("span",[e._v("|")]),t("span",[e._v(e._s(e.passTime(s.publishTime)))])]),t("div",{staticClass:"item-main"},[t("h4",{staticClass:"title",domProps:{innerHTML:e._s(e.highlight(s.title))}}),t("p",{staticClass:"discription",domProps:{innerHTML:e._s(e.highlight(s.discription))}})]),t("div",{staticClass:"item-bottom"},[t("span",{staticClass:"iconfont icon-view"},[e._v(" "+e._s(" "+(s.readAmount||0)))]),t("span",{staticClass:"iconfont icon-31dianzan"},[e._v(" "+e._s(" "+(s.likeAmount||0)||0))]),t("span",{staticClass:"iconfont icon-pinglun"},[e._v(" "+e._s(" "+(s.commentAmount||0)))])])]),s.publishImage?t("div",{staticClass:"publishImage"},[t("el-image",{attrs:{src:s.publishImage||"#",alt:""}})],1):e._e()])})),0):e._e()},i=[],n=(s(57658),s(42325)),r={name:"passageList",props:{passageList:{type:Array,default:[]},keyword:{type:String,default:""}},methods:{passTime(e){return(0,n.Vb)(e)},highlight(e){if(!this.keyword)return e;const t=e.split(this.keyword);return t.join(`<span style="color: red;">${this.keyword}</span>`)},gotoPost(e){this.$router.push({name:"post",params:{...e}})}}},a=r,l=s(1001),m=(0,l.Z)(a,o,i,!1,null,"f9743dea",null),c=m.exports},42325:function(e,t,s){s.d(t,{P2:function(){return n},Vb:function(){return o},_3:function(){return i}});const o=function(e,t=new Date){let s=Date.parse(new Date(e)),o=Date.parse(new Date(t)),i=parseInt((o-s)/864e5);if(i>356)return i%356+"年前";if(i>30)return i%12+"个月前";if(i>7)return i%7+"周前";if(i>1)return i+"天前";{let e=parseInt((o-s)/36e5);if(e>=1)return e+"小时前";{let e=parseInt((o-s)/6e4);return e>=1?e+"分钟前":"刚刚"}}},i=function(e){if(!e)return;let t=new Date(e);return t.getMonth()+"-"+t.getDay()};function n(e,t){let s,o;return function(i){let n=this,r=arguments,a=+new Date;s&&a<s+t?(clearTimeout(o),o=setTimeout((function(){s=a,e.apply(n,r)}),t)):(s=a,e.apply(n,r))}}},90872:function(e,t,s){e.exports=s.p+"static/img/logo_weblog.b599685d.png"}}]);
//# sourceMappingURL=483.e9434974.js.map