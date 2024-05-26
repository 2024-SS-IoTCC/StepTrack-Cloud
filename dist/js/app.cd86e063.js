(function(){"use strict";var t={4122:function(t,e,a){var n=a(5130),r=a(6768);const o=(0,r.Lk)("nav",{class:"navbar navbar-expand-lg navbar-light bg-light"},[(0,r.Lk)("div",{class:"container-fluid"},[(0,r.Lk)("a",{class:"navbar-brand",href:"#"},"StepTrack-Cloud - Leaderboard")])],-1);function i(t,e){const a=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)(r.FK,null,[o,(0,r.bF)(a)],64)}var s=a(1241);const c={},l=(0,s.A)(c,[["render",i]]);var d=l,u=a(1387);const h={class:"home"};function p(t,e,a,n,o,i){const s=(0,r.g2)("AppLeaderboard");return(0,r.uX)(),(0,r.CE)("div",h,[(0,r.bF)(s)])}var v=a(4232);const f=t=>((0,r.Qi)("data-v-3b314312"),t=t(),(0,r.jt)(),t),g={class:"container"},b={class:"leaderboard-container"},m={class:"btn-group"},k={class:"view-content"},y={key:0,class:"spinner-border",role:"status"},w=f((()=>(0,r.Lk)("span",{class:"visually-hidden"},"Loading...",-1))),L=[w],C={key:1,class:"leaderboard-box"},D={key:0,class:"empty-container alert alert-warning"},E={key:1},O={key:0,class:"chart-container"},A={key:1,class:"table"},S=f((()=>(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",{scope:"col"},"ID"),(0,r.Lk)("th",{scope:"col"},"Username"),(0,r.Lk)("th",{scope:"col"},"Steps"),(0,r.Lk)("th",{scope:"col"},"Start"),(0,r.Lk)("th",{scope:"col"},"End")])],-1))),F={scope:"row"};function _(t,e,a,n,o,i){const s=(0,r.g2)("Bar");return(0,r.uX)(),(0,r.CE)("div",g,[(0,r.Lk)("div",b,[(0,r.Lk)("div",m,[(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","today"===o.view?"active":""]),onClick:e[0]||(e[0]=t=>i.changeView("today"))},"Last 24 hours",2),(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","week"===o.view?"active":""]),onClick:e[1]||(e[1]=t=>i.changeView("week"))},"Last 7 days",2),(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","month"===o.view?"active":""]),onClick:e[2]||(e[2]=t=>i.changeView("month"))},"Last 30 days",2),(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","log"===o.view?"active":""]),onClick:e[3]||(e[3]=t=>i.changeView("log"))},"Logging",2)]),(0,r.Lk)("div",k,[o.hasData?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("div",y,L)),o.hasData?((0,r.uX)(),(0,r.CE)("div",C,[o.stepsData.length?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("div",D," No step data available! ")),o.stepsData.length?((0,r.uX)(),(0,r.CE)("div",E,["log"!==o.view?((0,r.uX)(),(0,r.CE)("div",O,[(0,r.bF)(s,{data:o.barChartData,options:o.barChartOptions},null,8,["data","options"])])):(0,r.Q3)("",!0),"log"===o.view?((0,r.uX)(),(0,r.CE)("table",A,[S,(0,r.Lk)("tbody",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.stepsData,(t=>((0,r.uX)(),(0,r.CE)("tr",{key:t.id},[(0,r.Lk)("td",F,(0,v.v_)(t.id),1),(0,r.Lk)("td",null,(0,v.v_)(t.username),1),(0,r.Lk)("td",null,(0,v.v_)(t.steps),1),(0,r.Lk)("td",null,(0,v.v_)(t.start),1),(0,r.Lk)("td",null,(0,v.v_)(t.end),1)])))),128))])])):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0)])])])}a(4114);var X=a(4373),x=a(6912),T=a(1010);x.t1.register(x.PP,x.kc,x.E8,x.hE,x.m_,x.s$);var j={name:"AppLeaderboard",components:{Bar:T.yP},data(){return{stepsData:[],view:"today",hasData:!1,barChartData:{},barChartOptions:{indexAxis:"y",elements:{bar:{borderWidth:2}},responsive:!0,plugins:{legend:{position:"right"},title:{display:!0,text:""}}}}},mounted(){this.fetchData()},methods:{async fetchData(){this.stepsData=[],this.hasData=!1;let t="",e="",a="";if("log"!==this.view){const n=864e5;let r=new Date;if(e=this.getDateTimeFormat(r),"today"===this.view){let e=new Date(r-n);t=this.getDateTimeFormat(e)}else if("week"===this.view){let e=new Date(r-7*n);t=this.getDateTimeFormat(e)}else if("month"===this.view){let e=new Date(r-30*n);t=this.getDateTimeFormat(e)}a+="?end="+e+(""!==t?"&start="+t:"")}try{const t=await X.A.get("http://174.138.68.148/api/steps"+a);if(this.stepsData=t.data,"log"!==this.view){let t=[],e=[],a=1;this.stepsData.forEach((n=>{n.username&&n.steps&&(t.push(a.toString()+". "+n.username),e.push(n.steps),a++)})),this.barChartData={labels:t,datasets:[{label:"Steps",data:e,borderColor:"#0d6efd",backgroundColor:"#8eaddb"}]}}this.hasData=!0}catch(n){console.error("Error fetching data:",n)}},changeView(t){this.view=t,this.fetchData()},getDateTimeFormat(t){return encodeURI(`${t.getFullYear()}-${this.numAddLeadingZero(t.getMonth()+1)}-${this.numAddLeadingZero(t.getDate())} ${this.numAddLeadingZero(t.getHours())}:${this.numAddLeadingZero(t.getMinutes())}:${this.numAddLeadingZero(t.getSeconds())}`)},numAddLeadingZero(t){return t<10?"0"+t.toString():t.toString()}}};const P=(0,s.A)(j,[["render",_],["__scopeId","data-v-3b314312"]]);var Q=P,$={name:"HomeView",components:{AppLeaderboard:Q}};const V=(0,s.A)($,[["render",p]]);var Z=V;const M=[{path:"/",name:"home",component:Z}],I=(0,u.aE)({history:(0,u.Bt)(),routes:M});var B=I;a(6213);(0,n.Ef)(d).use(B).mount("#app")}},e={};function a(n){var r=e[n];if(void 0!==r)return r.exports;var o=e[n]={exports:{}};return t[n].call(o.exports,o,o.exports,a),o.exports}a.m=t,function(){var t=[];a.O=function(e,n,r,o){if(!n){var i=1/0;for(d=0;d<t.length;d++){n=t[d][0],r=t[d][1],o=t[d][2];for(var s=!0,c=0;c<n.length;c++)(!1&o||i>=o)&&Object.keys(a.O).every((function(t){return a.O[t](n[c])}))?n.splice(c--,1):(s=!1,o<i&&(i=o));if(s){t.splice(d--,1);var l=r();void 0!==l&&(e=l)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[n,r,o]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,n){var r,o,i=n[0],s=n[1],c=n[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(c)var d=c(a)}for(e&&e(n);l<i.length;l++)o=i[l],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return a.O(d)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=a.O(void 0,[504],(function(){return a(4122)}));n=a.O(n)})();
//# sourceMappingURL=app.cd86e063.js.map