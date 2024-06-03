(function(){"use strict";var e={7823:function(e,t,a){var n=a(5130),r=a(6768);const s=(0,r.Lk)("nav",{class:"navbar navbar-expand-lg navbar-light bg-light"},[(0,r.Lk)("div",{class:"container-fluid"},[(0,r.Lk)("a",{class:"navbar-brand",href:"#"},"StepTrack-Cloud - Leaderboard")])],-1);function i(e,t){const a=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)(r.FK,null,[s,(0,r.bF)(a)],64)}var o=a(1241);const l={},c=(0,o.A)(l,[["render",i]]);var u=c,d=a(1387);const h={class:"home"};function p(e,t,a,n,s,i){const o=(0,r.g2)("AppLeaderboard");return(0,r.uX)(),(0,r.CE)("div",h,[(0,r.bF)(o)])}var v=a(4232);const f=e=>((0,r.Qi)("data-v-f8ce8dc4"),e=e(),(0,r.jt)(),e),g={class:"container"},b={class:"leaderboard-container"},m={class:"btn-group"},k={class:"view-content"},y={key:0,class:"spinner-border",role:"status"},w=f((()=>(0,r.Lk)("span",{class:"visually-hidden"},"Loading...",-1))),L=[w],C={key:1,class:"leaderboard-box"},D={key:0,class:"empty-container alert alert-warning"},E={key:1},F={key:0,class:"chart-container"},A={key:1},O={key:0,class:"table-filter-container"},S={class:"active-filter"},_={class:"table"},X=f((()=>(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",{scope:"col"},"ID"),(0,r.Lk)("th",{scope:"col"},"Username"),(0,r.Lk)("th",{scope:"col"},"Steps"),(0,r.Lk)("th",{scope:"col"},"Start"),(0,r.Lk)("th",{scope:"col"},"End")])],-1))),x={scope:"row"},T=["onClick"],j={key:1};function Q(e,t,a,n,s,i){const o=(0,r.g2)("Bar");return(0,r.uX)(),(0,r.CE)("div",g,[(0,r.Lk)("div",b,[(0,r.Lk)("div",m,[(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","today"===s.view?"active":""]),onClick:t[0]||(t[0]=e=>i.changeView("today"))},"Last 24 hours",2),(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","week"===s.view?"active":""]),onClick:t[1]||(t[1]=e=>i.changeView("week"))},"Last 7 days",2),(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","month"===s.view?"active":""]),onClick:t[2]||(t[2]=e=>i.changeView("month"))},"Last 30 days",2),(0,r.Lk)("a",{href:"#",class:(0,v.C4)(["btn btn-primary","log"===s.view?"active":""]),onClick:t[3]||(t[3]=e=>i.changeView("log"))},"Logging",2)]),(0,r.Lk)("div",k,[s.hasData?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("div",y,L)),s.hasData?((0,r.uX)(),(0,r.CE)("div",C,[s.stepsData.length?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("div",D," No step data available! ")),s.stepsData.length?((0,r.uX)(),(0,r.CE)("div",E,["log"!==s.view?((0,r.uX)(),(0,r.CE)("div",F,[(0,r.bF)(o,{data:s.barChartData,options:s.barChartOptions},null,8,["data","options"])])):(0,r.Q3)("",!0),"log"===s.view?((0,r.uX)(),(0,r.CE)("div",A,[""!==s.userFilter?((0,r.uX)(),(0,r.CE)("div",O,[(0,r.eW)(" Filter: "),(0,r.Lk)("span",S,[(0,r.eW)((0,v.v_)(s.userFilter)+" ",1),(0,r.Lk)("a",{href:"#",class:"badge bg-danger",onClick:t[4]||(t[4]=e=>i.showDataByUsername(""))},"clear")])])):(0,r.Q3)("",!0),(0,r.Lk)("table",_,[X,(0,r.Lk)("tbody",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(s.stepsData,(e=>((0,r.uX)(),(0,r.CE)("tr",{key:e.id},[(0,r.Lk)("td",x,(0,v.v_)(e.id),1),(0,r.Lk)("td",null,[e.username&&""!==e.username?((0,r.uX)(),(0,r.CE)("a",{key:0,href:"#",onClick:t=>i.showDataByUsername(e.username)},(0,v.v_)(e.username),9,T)):((0,r.uX)(),(0,r.CE)("span",j,"ANON"))]),(0,r.Lk)("td",null,(0,v.v_)(e.steps),1),(0,r.Lk)("td",null,(0,v.v_)(e.start),1),(0,r.Lk)("td",null,(0,v.v_)(e.end),1)])))),128))])])])):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0)])])])}a(4114);var B=a(4373),P=a(6912),U=a(1010);P.t1.register(P.PP,P.kc,P.E8,P.hE,P.m_,P.s$);var $={name:"AppLeaderboard",components:{Bar:U.yP},data(){return{stepsData:[],view:"today",userFilter:"",hasData:!1,barChartData:{},barChartOptions:{indexAxis:"y",elements:{bar:{borderWidth:2}},responsive:!0,maintainAspectRatio:!0,onClick:e=>{const t=e.chart,a=e.chart.getElementsAtEventForMode(e,"nearest",{intersect:!0},!0);if(a.length){const e=a[0],n=t.data.labels[e.index];if(n&&n.length>3){const e=n.substring(n.indexOf(" ")+1);e&&e.length&&this.showDataByUsername(e)}}},plugins:{legend:{position:"right"},title:{display:!0,text:""}}}}},mounted(){this.fetchData()},methods:{async fetchData(){this.stepsData=[],this.hasData=!1;let e="",t="",a="";if("log"!==this.view){const n=864e5;let r=new Date;if(t=this.getDateTimeFormat(r),"today"===this.view){let t=new Date(r-n);e=this.getDateTimeFormat(t)}else if("week"===this.view){let t=new Date(r-7*n);e=this.getDateTimeFormat(t)}else if("month"===this.view){let t=new Date(r-30*n);e=this.getDateTimeFormat(t)}a+="?end="+t+(""!==e?"&start="+e:"")}else this.userFilter&&""!==this.userFilter&&(a+="?username="+encodeURI(this.userFilter));try{const e=await B.A.get("http://174.138.68.148/api/steps"+a);if(this.stepsData=e.data,"log"!==this.view){let e=[],t=[],a=1;this.stepsData.forEach((n=>{n.username&&n.steps&&(e.push(a.toString()+". "+n.username),t.push(n.steps),a++)})),this.barChartData={labels:e,datasets:[{label:"Steps",data:t,borderColor:"#0d6efd",backgroundColor:"#8eaddb"}]}}this.hasData=!0}catch(n){console.error("Error fetching data:",n)}},changeView(e){this.view=e,this.userFilter="",this.fetchData()},showDataByUsername(e){this.view="log",this.userFilter=e,this.fetchData()},getDateTimeFormat(e){return encodeURI(`${e.getFullYear()}-${this.numAddLeadingZero(e.getMonth()+1)}-${this.numAddLeadingZero(e.getDate())} ${this.numAddLeadingZero(e.getHours())}:${this.numAddLeadingZero(e.getMinutes())}:${this.numAddLeadingZero(e.getSeconds())}`)},numAddLeadingZero(e){return e<10?"0"+e.toString():e.toString()}}};const M=(0,o.A)($,[["render",Q],["__scopeId","data-v-f8ce8dc4"]]);var V=M,Z={name:"HomeView",components:{AppLeaderboard:V}};const I=(0,o.A)(Z,[["render",p]]);var N=I;const R=[{path:"/",name:"home",component:N}],W=(0,d.aE)({history:(0,d.Bt)(),routes:R});var H=W;a(6213);(0,n.Ef)(u).use(H).mount("#app")}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,a),s.exports}a.m=e,function(){var e=[];a.O=function(t,n,r,s){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],s=e[u][2];for(var o=!0,l=0;l<n.length;l++)(!1&s||i>=s)&&Object.keys(a.O).every((function(e){return a.O[e](n[l])}))?n.splice(l--,1):(o=!1,s<i&&(i=s));if(o){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[n,r,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,s,i=n[0],o=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(r in o)a.o(o,r)&&(a.m[r]=o[r]);if(l)var u=l(a)}for(t&&t(n);c<i.length;c++)s=i[c],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(u)},n=self["webpackChunkStepTrack_Cloud"]=self["webpackChunkStepTrack_Cloud"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[504],(function(){return a(7823)}));n=a.O(n)})();
//# sourceMappingURL=app.d3cb9018.js.map