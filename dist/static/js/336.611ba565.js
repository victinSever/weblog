"use strict";(self["webpackChunkweblog"]=self["webpackChunkweblog"]||[]).push([[336],{18384:function(e,s,t){t.r(s),t.d(s,{default:function(){return y}});var i=function(){var e=this,s=e._self._c;return s("div",{attrs:{id:"scroll-lisener"}},[s("Header"),s("el-row",{staticClass:"header"},[s("div",{staticClass:"tag-list"},e._l(e.tags,(function(t){return s("span",{key:t.value,class:"tag-item"+(e.tagActive===t.value?" active":""),on:{click:function(s){return e.handleChangeTagActive(t.value)}}},[e._v(e._s(t.label))])})),0)]),s("el-row",{staticClass:"main"},[s("div",{staticClass:"main-inner"},[s("el-col",{staticClass:"message-left"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"order-list"},e._l(e.order,(function(t){return s("span",{key:t.value,class:"order-item"+(e.orderActive===t.value?" active":""),on:{click:function(s){return e.handleChangeOrderActive(t.value)}}},[e._v(e._s(t.label))])})),0),0!==e.passageList.length?s("div",{staticClass:"passage-list"},[s("PassageList",{attrs:{passageList:e.passageList}})],1):e.isLoading?s("el-skeleton",{staticStyle:{"margin-top":"15px"}}):s("el-empty")],1)],1),s("el-col",{staticClass:"message-right"},[s("PassageSignIn"),s("PassageRecom")],1)],1)])],1)},n=[],a=t(95067),l=t(81471),c=function(){var e=this,s=e._self._c;return s("el-card",{staticClass:"pass-signIn"},[s("div",{staticClass:"sigin-top"},[s("span",[s("span",{staticClass:"iconfont icon-rili"}),s("span",{staticClass:"welcome"},[e._v(e._s(e.welcome))])]),e.isLogin&&!e.isSignIn?s("el-button",{staticClass:"btn-sigin",attrs:{type:"primary",plain:"",round:""},on:{click:e.signIn}},[e._v("去签到")]):e._e(),e.isLogin&&e.isSignIn?s("el-tag",{attrs:{type:"primary"}},[e._v("签到成功！")]):e._e()],1),s("p",{staticClass:"text"},[e._v(e._s(e.isLogin?"把握每一天~~":"你还没有登录哦，登录可享更多权益"))])])},o=[],r={name:"passageSignIn",data(){return{isSignIn:!1}},computed:{welcome(){let e=(new Date).getHours();return e<=3||e>=23?"夜深了":e>3&&e<8?"早上好!":e>=8&&e<11?"上午好!":e>=11&&e<13?"中午好!":e>=13&&e<18?"下午好!":e>=18&&e<23?"晚上好!":""},isLogin(){return JSON.parse(sessionStorage.getItem("token"))||!1}},methods:{signIn(){this.$message.success("签到成功！天平 +5"),this.isSignIn=!0}}},u=r,g=t(1001),m=(0,g.Z)(u,c,o,!1,null,"0d0397eb",null),h=m.exports,d=function(){var e=this,s=e._self._c;return s("ul",{staticClass:"recom-list"},[s("h3",{staticClass:"recom-title"},[e._v("优质领域博主")]),e._l(e.recomList,(function(t){return s("li",{key:t.id,staticClass:"recom-item",on:{click:function(s){return e.gotoLink(t)}}},[t.userImage?s("el-image",{attrs:{src:t.userImage}}):s("el-image",{attrs:{src:"https://tva2.sinaimg.cn/large/008cs7isly8h88i9ec08sj30u00u379u.jpg"}}),s("span",{staticClass:"username",domProps:{textContent:e._s(t.username)}})],1)}))],2)},v=[],p={name:"recomPage",data(){const e=[{id:"1",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",username:"法盲张三"},{id:"2",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",username:"法盲张三"},{id:"3",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",username:"法盲张三"}];return{recomList:e}},methods:{gotoLink(e){window.open(e,"_blank")}}},w=p,b=(0,g.Z)(w,d,v,!1,null,"5e55e13c",null),C=b.exports,f={name:"passagePage",components:{Header:a.Z,PassageList:l.Z,PassageSignIn:h,PassageRecom:C},data(){const e=[{label:"全部",value:1},{label:"计算机",value:2},{label:"医学",value:3},{label:"法学",value:4},{label:"哲学",value:5},{label:"杂谈",value:6},{label:"农学",value:7}],s=[{label:"推荐",value:1},{label:"最新",value:2},{label:"热榜",value:3}];return{tags:e,order:s,passageList:[],tagActive:1,orderActive:1,loadTimes:0,isLoading:!1}},mounted(){window.addEventListener("scroll",this.handleScroll,!0);this.getData()},methods:{async getData(){const e=[{id:"12312",username:"法盲张三",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",publishImage:"https://tva1.sinaimg.cn/large/008cs7isly8h88hfgvz1qj31ao0t6n3x.jpg",publishTime:"2022-11-1 19:00:00",title:"何劳荣一案，到底谁是真正的主谋？个人理解，大家交流一下",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家",view:"6.1w",dianzan:"372",comment:"271",isview:!1},{id:"21321312",username:"暴力美学",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",publishImage:"https://tva1.sinaimg.cn/large/008cs7isly8h88hfgvz1qj31ao0t6n3x.jpg",publishTime:"2022-10-25 19:00:00",title:"这里有一个简单辩论，大家交流一下",content:"王大父杀人案   被贵人王大霞因丕满李良才与其争变瓷砖生意:产生杀人恶念:2002年3月18日晚8时资;被告人王大雷把雇请的丢卫、马本全召到其在四川省成都市的住处，被告人米军、付强受被告人王卫的邀约也一同前往。被告人王大雷对被告人王卫等四人说:“我有个老乡在跟我争夺销售瓷砖生意，这笔生意关系到我一辈子的命运，做不成我就要破产。你们帮我教训他一顿。生意作成了一定给你们好处。”随后，王大雷让王卫等人听候消息。次日晚8时许，王大雷探明了李良才的行踪，即挂电话告知王卫。王卫约上马本全、米军、付强，分别携带长刀、菜刀、木工锯、匕首来到王大雷住处。王大雷说:“我那位老乡9点多钟才回来，被贵人王大霞因丕满李良才与其争变瓷砖生意:产生杀人恶念：2002年年3月18日晚8时资；被告人王大雷把雇请的丢卫、马本全召到其在四川省成都市的住处，被告人米军、付强受被告人王卫的邀约也一同前往.被告人王大雷对被告人王卫等四人说：“我有个老乡在跟我争夺销售瓷砖生意，这笔生意关系到我一辈子的命运，做不成我就要破产.你们帮我教训他一顿.生意作成了一定给你们好处.“随后，王大雷让王卫等人听候消息.次日晚8时许，王大雷探明了李良才的行踪，即挂电话告知王卫.王卫约上马本全、米军、付强，分别携带长刀、菜刀、木工锯、匕首来到王大雷住处.王大雷说：我那位老乡9点多钟才回来",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"264556",username:"文武双全",userImage:"",publishImage:"",publishTime:"2022-10-03 19:00:00",title:"类案匹配模糊，如何扩大精准范围？",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家321321311231321312",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"4374376",username:"纸上阡陌",userImage:"https://tva3.sinaimg.cn/large/008cs7isly8h7u5on9iu5j30u00u0q5i.jpg",publishImage:"https://tva1.sinaimg.cn/large/008cs7isly8h88hfgvz1qj31ao0t6n3x.jpg",publishTime:"2022-11-2 19:00:00",title:"CLF平台的搭建一体化流程文档",category:"类案",tags:["项目创建","CLF"],content:"# CLF项目介绍\n一个专为法律人打造的社交、辩论，答疑平台，基于智能文本抽取算法，可以进行文本抽取，文案生成，法律辩论和信息检索\n\n## 业务架构\n![image](https://tva2.sinaimg.cn/large/008cs7isly8h868p6sbtoj313x0u0dja.jpg)\n\n\n## 技术架构\n### haha\n#### hhahah\n前端技术架构主要为Vue2项目，具体技术栈如下：\n\n- Vue2（框架）\n- Vuex（状态管理）\n- Vue-router（路由管理）\n- ElementUI（组件库）\n- Sass（CSS语法扩展）\n- Axios（ajax请求封装库）\n\n优化技术：\n\n- NProgress（微进度条）\n- iconfont(阿里矢量图标库)\n- mavon-editor（markdown编辑器）\n\n工具：\n\n- VScode\n- [新浪图床](https://pic.gimhoy.com/)\n\n## 项目搭建\n\n- 依赖安装\n\n\n## 前端业务模块设计\n\n\n\n## 版本\n1.0.0\n\n## 部署\n\n部署链接：\n\nhttps://victinsever.github.io/MIPT/dist/index.html\n\n百度网盘链接：\n\n暂未上传\n",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"5646",username:"暴力美学",publishTime:"2022-11-2 20:20:00",title:"这里有一个简单辩论，大家交流一下",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家321321311231321312",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"4325435",username:"暴力美学",publishTime:"2022-11-2 20:37:30",title:"这里有一个简单辩论，大家交流一下",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家321321311231321312",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"35453425",username:"暴力美学",publishTime:"2022-10-25 19:00:00",title:"这里有一个简单辩论，大家交流一下",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家321321311231321312",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"2343432",username:"暴力美学",publishTime:"2022-10-25 19:00:00",title:"这里有一个简单辩论，大家交流一下",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家321321311231321312",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"34435435",username:"暴力美学",publishTime:"2022-10-25 19:00:00",title:"这里有一个简单辩论，大家交流一下",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家321321311231321312",view:"10w",dianzan:"255",comment:"1000",isview:!1},{id:"5345",username:"暴力美学",publishTime:"2022-10-25 19:00:00",title:"这里有一个简单辩论，大家交流一下",content:"何劳荣， 山东人， 爱吃河粉，爱吃蔬菜，多运动，邵淑华，山西二年，杀害李某某一家321321311231321312",view:"10w",dianzan:"255",comment:"1000",isview:!1}];this.isLoading=!0,this.passageList=[],setTimeout((()=>{this.passageList=e,this.isLoading=!1}),500)},handleScroll(){let e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,s=Math.floor(e/screen.height);s>this.loadTimes&&(this.loadTimes++,console.log("临界次数+1"))},handleChangeTagActive(e){this.tagActive=e},handleChangeOrderActive(e){this.orderActive=e,this.getData()}}},I=f,j=(0,g.Z)(I,i,n,!1,null,"af397b80",null),y=j.exports}}]);
//# sourceMappingURL=336.611ba565.js.map