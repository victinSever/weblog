"use strict";(self["webpackChunkweblog"]=self["webpackChunkweblog"]||[]).push([[39],{15307:function(e,t,s){s.r(t),s.d(t,{default:function(){return A}});var a=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"scroll-lisener"}},[t("Header"),t("el-row",{staticClass:"header"},[t("div",{staticClass:"category-list"},e._l(e.categoryList,(function(s){return t("span",{key:s.label,class:"category-item"+(e.categoryActive===s.id?" active":""),on:{click:function(t){return e.handleChangeCategoryActive(s.id)}}},[e._v(e._s(s.label))])})),0)]),t("el-row",{staticClass:"main"},[t("div",{staticClass:"main-inner"},[t("el-col",{staticClass:"message-left"},[t("el-card",{staticClass:"box-card"},[t("div",{staticClass:"order-list"},e._l(e.orderList,(function(s){return t("span",{key:s.label,class:"order-item"+(e.orderActive===s.value?" active":""),on:{click:function(t){return e.handleChangeOrderActive(s.value)}}},[e._v(e._s(s.label))])})),0),0!==e.passageList.length?t("div",{staticClass:"passage-list"},[t("PassageList",{attrs:{passageList:e.passageList}})],1):e.isLoading?t("el-skeleton",{staticStyle:{"margin-top":"15px"}}):t("el-empty")],1)],1),t("el-col",{staticClass:"message-right"},[t("PassageSignIn")],1)],1)])],1)},i=[],r=s(40210),n=s(85402),l=function(){var e=this,t=e._self._c;return t("el-card",{staticClass:"pass-signIn"},[t("div",{staticClass:"sigin-top"},[t("span",[t("span",{staticClass:"iconfont icon-rili"}),t("span",{staticClass:"welcome"},[e._v(e._s(e.welcome))])])]),t("p",{staticClass:"text"},[e._v(e._s(e.user?"把握每一天~~":"你还没有登录哦，登录可享更多权益"))])])},o=[],c={name:"passageSignIn",data(){return{isSignIn:!1}},computed:{welcome(){let e=(new Date).getHours();return e<=3||e>=23?"夜深了":e>3&&e<8?"早上好!":e>=8&&e<11?"上午好!":e>=11&&e<13?"中午好!":e>=13&&e<18?"下午好!":e>=18&&e<23?"晚上好!":""},user(){const e=this.$store.state.user;return!!e.token&&e.userInfo}}},g=c,d=s(1001),u=(0,d.Z)(g,l,o,!1,null,"bffe66e8",null),h=u.exports,p=function(){var e=this,t=e._self._c;return t("ul",{staticClass:"recom-list"},[t("h3",{staticClass:"recom-title"},[e._v("优质领域博主")]),e._l(e.recomList,(function(s){return t("li",{key:s.id,staticClass:"recom-item",on:{click:function(t){return e.gotoLink(s.id)}}},[s.userImage?t("el-image",{attrs:{src:s.userImage}}):t("el-image",{attrs:{src:"https://tva2.sinaimg.cn/large/008cs7isly8h88i9ec08sj30u00u379u.jpg"}}),t("span",{staticClass:"username",domProps:{textContent:e._s(s.username)}})],1)}))],2)},m=[],v={name:"recomPage",data(){const e=[{id:"1",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",username:"法盲张三"},{id:"2",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",username:"法盲张三"},{id:"3",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",username:"法盲张三"}];return{recomList:e}},methods:{gotoLink(e){this.$message.warning("暂不支持访问他人博客主页！")}}},y=v,L=(0,d.Z)(y,p,m,!1,null,"7d4dc9c9",null),C=L.exports,f=s(20629),b=s(42325);const w=[{id:1,label:"前端",parentId:""},{id:2,label:"后端",parentId:""},{id:3,label:"Andriod",parentId:""},{id:4,label:"IOS",parentId:""},{id:5,label:"人工智能",parentId:""},{id:6,label:"阅读",parentId:""},{id:7,label:"杂谈",parentId:""}],I=[{label:"推荐",value:1},{label:"最新",value:2},{label:"热榜",value:3}];var _={name:"passagePage",components:{Header:r.Z,PassageList:n.Z,PassageSignIn:h,PassageRecom:C},data(){return{categoryList:w,orderList:I,passageList:[],categoryActive:0,orderActive:1,loadTimes:0,isLoading:!1,isCategory:!1,pageMap:{size:5,page:1}}},watch:{orderActive(){this.isCategory=!1,this.pageMap.page=1},categoryActive(){this.isCategory=!0,this.pageMap.page=1}},computed:{user(){const e=this.$store.state.user;return!!e.token&&e.userInfo}},mounted(){window.addEventListener("scroll",this.handleScroll,!1),this.getData()},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll,!1)},methods:{...(0,f.nv)("passage",["getPassageList","getPassageLatestList","getPassageHotList","selectBlogListByCategoryId"]),async getData(e){try{this.isLoading=!0;const t={...this.pageMap,userId:this.user.id||0};let s={};switch(this.orderActive){case 1:s=await this.getPassageList(t);break;case 2:s=await this.getPassageLatestList(t);break;case 3:s=await this.getPassageHotList(t);break;default:this.$message.error("出错了")}if(this.isLoading=!1,200!==s.data.code||0===s.data.data.length)return this.$message.warning("没有更多数据了");this.passageList=e?this.passageList.concat(s.data.data):s.data.data}catch(t){this.$message.error("不好意思，服务器跑丢了~~")}},async getCategory(e){try{this.isLoading=!0;const t={...this.pageMap,userId:this.user.id||0,categoryId:this.categoryActive},{data:s}=await this.selectBlogListByCategoryId(t);if(this.isLoading=!1,200!==s.code||0===s.data.length)return this.$message.info("没有更多数据了");this.passageList=e?this.passageList.concat(s.data):s.data}catch(t){this.$message.error("不好意思，服务器跑丢了~~")}},addPage(){this.pageMap.page++,this.isCategory?this.getCategory(!0):this.getData(!0)},handleScroll(){const e=document.body.offsetHeight-window.pageYOffset-window.innerHeight;if(e<=1){if(this.isLoading)return;let e=this;(0,b.P2)(e.addPage(),500)}},handleChangeCategoryActive(e){this.categoryActive=e,this.getCategory()},handleChangeOrderActive(e){this.orderActive=e,this.getData()}}},k=_,P=(0,d.Z)(k,a,i,!1,null,"749f96b0",null),A=P.exports}}]);
//# sourceMappingURL=39.aa83dacd.js.map