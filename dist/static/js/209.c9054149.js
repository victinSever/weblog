"use strict";(self["webpackChunkweblog"]=self["webpackChunkweblog"]||[]).push([[209],{50337:function(e,s,a){a.r(s),a.d(s,{default:function(){return v}});var t=function(){var e=this,s=e._self._c;return s("div",[s("Header"),s("el-row",{staticClass:"main"},[s("div",{staticClass:"main-inner"},[s("el-col",{staticClass:"message-left"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"order-list"},e._l(e.order,(function(a){return s("span",{key:a.value,class:"order-item"+(e.orderActive===a.value?" active":""),on:{click:function(s){return e.handleChangeOrderActive(a.value)}}},[e._v(e._s(a.label))])})),0),0!==e.passageList.length?s("div",{staticClass:"passage-list"},[s("PassageList",{attrs:{passageList:e.passageList,keyword:e.keyword}})],1):e.isLoading?s("div",{staticClass:"loading"},[s("el-skeleton")],1):s("div",{staticClass:"empty"},[s("el-empty",{attrs:{"image-size":200,description:"内容空空如也！"}})],1)])],1),s("el-col",{staticClass:"message-right"})],1)])],1)},i=[],r=a(7866),l=a(77376),o=a(20629),n=a(42325);const d=[{label:"综合排序",value:1},{label:"最新优先",value:2},{label:"最热优先",value:3}];var c={name:"SearchPages",components:{Header:r.Z,PassageList:l.Z},data(){return{passageList:[],order:d,orderActive:1,keyword:"",isLoading:!1,pageMap:{page:1,size:5}}},watch:{$route:{immediate:!0,handler(){this.keyword=this.$route.query.key,this.getData()}}},computed:{user(){const e=this.$store.state.user;return!!e.token&&e.userInfo}},mounted(){window.addEventListener("scroll",this.handleScroll,!1)},beforeDestroy(){window.removeEventListener("scroll",this.handleScroll,!1)},methods:{...(0,o.nv)("passage",["searchAdviceBlog","searchHotBlog","searchLatestBlog"]),async getData(){try{this.isLoading=!0;const e={userId:this.user.id,keyword:this.keyword,...this.pageMap};let s={};switch(this.orderActive){case 1:s=await this.searchAdviceBlog(e);break;case 2:s=await this.searchHotBlog(e);break;case 3:s=await this.searchLatestBlog(e);break;default:this.$message.error("出错了")}if(this.isLoading=!1,200!==s.data.code||0===s.data.data.length)return this.$message.warning("没有更多数据了");this.passageList=this.passageList.concat(s.data.data)}catch(e){this.$message.error(e)}},addPage(){this.pageMap.page++,this.getData()},handleScroll(){const e=document.body.offsetHeight-window.pageYOffset-window.innerHeight;if(e<=5){if(this.isLoading)return;let e=this;(0,n.P2)(e.addPage(),500)}},handleChangeOrderActive(e){this.orderActive=e,this.passageList=[],this.getData()}}},h=c,g=a(1001),u=(0,g.Z)(h,t,i,!1,null,"15f8884e",null),v=u.exports}}]);
//# sourceMappingURL=209.c9054149.js.map