(function(){"use strict";var e={628:function(e,n,t){var o=t(963),i=t(823),r=t(252);function s(e,n){const t=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(t)}var l=t(744);const u={},a=(0,l.Z)(u,[["render",s]]);var c=a,d=t(205);(0,d.z)("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var f=t(201),h=t(577),g={key:0},p={key:1},m={class:"units-header"},b=(0,r._)("h2",null,"Completed Units",-1),v=(0,r.Uk)(" Offline Mode "),C={class:"saved-list"},y=["onClick"],k=(0,r._)("i",{class:"pi pi-sync sync-icon"},null,-1),w=[k],S=["onClick"],D=(0,r._)("i",{class:"pi pi-trash trash-icon"},null,-1),U=[D],O={class:"center"};function W(e,n,t,i,s,l){var u=(0,r.up)("input-text"),a=(0,r.up)("Button"),c=(0,r.up)("spacer-break"),d=(0,r.up)("checkbox"),f=(0,r.up)("ProgressSpinner"),k=(0,r.up)("Divider"),D=(0,r.up)("Dialog"),W=(0,r.up)("BlockUI");return(0,r.wg)(),(0,r.iD)(r.HY,null,[e.storageUser?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",g,[(0,r.Wm)(u,{modelValue:e.inputUser,"onUpdate:modelValue":n[0]||(n[0]=function(n){return e.inputUser=n}),type:"text",class:"full p-inputtext-lg",placeholder:"User name"},null,8,["modelValue"]),(0,r.Wm)(a,{onClick:e.onSaveUser,label:"Save User Name",class:"full p-button-lg"},null,8,["onClick"]),(0,r.Wm)(c)])),e.storageJob?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",p,[(0,r.Wm)(u,{modelValue:e.inputJob,"onUpdate:modelValue":n[1]||(n[1]=function(n){return e.inputJob=n}),type:"text",class:"full p-inputtext-lg",placeholder:"Property name"},null,8,["modelValue"]),(0,r.Wm)(a,{onClick:e.onSaveJob,label:"Start New Property",class:"full p-button-lg"},null,8,["onClick"]),(0,r.Wm)(c)])),(0,r.Wm)(u,{modelValue:e.unitName,"onUpdate:modelValue":n[2]||(n[2]=function(n){return e.unitName=n}),type:"text",class:"full p-inputtext-lg",placeholder:"Unit"},null,8,["modelValue"]),(0,r.Wm)(c),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.greenCodes,(function(n){return(0,r.wg)(),(0,r.iD)("div",{key:n},[(0,r.Wm)(a,{onClick:function(t){return e.onAddCode(n)},label:n,class:(0,h.C_)(["full p-button-lg",e.chosenCodes.includes(n)?"p-button-secondary":""])},null,8,["onClick","label","class"]),(0,r.Wm)(c)])})),128)),(0,r.Wm)(a,{onClick:e.onAddCodes,label:"Add Codes",class:"full p-button-lg p-button-success"},null,8,["onClick"]),(0,r.Wm)(c),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.yellowCodes,(function(n){return(0,r.wg)(),(0,r.iD)("div",{key:n},[(0,r.Wm)(a,{onClick:function(t){return e.onAddCode(n)},label:n,class:(0,h.C_)(["full p-button-lg",e.chosenCodes.includes(n)?"p-button-secondary":"p-button-warning"])},null,8,["onClick","label","class"]),(0,r.Wm)(c)])})),128)),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.redCodes,(function(n){return(0,r.wg)(),(0,r.iD)("div",{key:n},[(0,r.Wm)(a,{onClick:function(t){return e.onAddCode(n)},label:n,class:(0,h.C_)(["full p-button-lg",e.chosenCodes.includes(n)?"p-button-secondary":"p-button-danger"])},null,8,["onClick","label","class"]),(0,r.Wm)(c)])})),128)),(0,r.Wm)(a,{onClick:e.onEndJob,label:"End Job",class:"full p-button-lg p-button-help"},null,8,["onClick"]),(0,r._)("div",m,[b,(0,r._)("span",null,[v,(0,r.Wm)(d,{class:"offline-checkbox",modelValue:e.offlineMode,"onUpdate:modelValue":n[3]||(n[3]=function(n){return e.offlineMode=n}),binary:!0},null,8,["modelValue"])])]),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.visibleCodes,(function(n){return(0,r.wg)(),(0,r.iD)("ul",{key:n.id,class:"left-align list"},[(0,r._)("li",C,[(0,r._)("span",null,(0,h.zw)(n.unit),1),(0,r._)("span",null,(0,h.zw)(n.codes),1),n.id||e.saving!==n.unit?n.id?((0,r.wg)(),(0,r.iD)("button",{key:2,onClick:function(t){return e.onDeleteCode(n)},class:"small-btn"},U,8,S)):((0,r.wg)(),(0,r.iD)("button",{key:1,onClick:function(t){return e.onSyncCode(n)},class:(0,h.C_)("small-btn ".concat(e.syncing===n.unit?"spin":""))},w,10,y)):((0,r.wg)(),(0,r.j4)(f,{key:0,style:{height:"25px",width:"25px","margin-right":"5px"}}))]),(0,r.Wm)(k)])})),128)),(0,r.Wm)(D,{header:"Other description",visible:e.displayOtherDesc,"onUpdate:visible":n[6]||(n[6]=function(n){return e.displayOtherDesc=n})},{default:(0,r.w5)((function(){return[(0,r.Wm)(u,{type:"text",modelValue:e.otherDesc,"onUpdate:modelValue":n[4]||(n[4]=function(n){return e.otherDesc=n}),class:"full p-inputtest-lg"},null,8,["modelValue"]),(0,r.Wm)(c),(0,r.Wm)(a,{onClick:n[5]||(n[5]=function(n){return e.displayOtherDesc=!1}),label:"Save",class:"full p-button-lg"})]})),_:1},8,["visible"]),(0,r.Wm)(W,{blocked:e.loading,"full-screen":!0},null,8,["blocked"]),(0,r.wy)((0,r._)("div",O,[(0,r.Wm)(f)],512),[[o.F8,e.loading]])],64)}var J=t(655),j=t(76),P=t(325),M=t(541),N=t(242),V=t(895),T=t(667),x=t(876),A="https://cchs-be.onrender.com",B=function(e){return fetch("".concat(A,"/unitcode/").concat(e),{method:"DELETE"}).then((function(e){return e.json()}))},_=function(e){return e?fetch("".concat(A,"/unitcodes?job=").concat(encodeURIComponent(e))).then((function(e){return e.json()})):Promise.resolve([])},I=function(e){return fetch("".concat(A,"/unitcode"),{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(n){return{success:500!==n.status,unitCode:e}}))},E=t(387);const Z=(0,r._)("br",null,null,-1),R=(0,r._)("br",null,null,-1);function H(e,n){return(0,r.wg)(),(0,r.iD)(r.HY,null,[Z,R],64)}const L={},Y=(0,l.Z)(L,[["render",H]]);var F=Y,K=["TV","Dog","Blocked","Locked From The Inside","No Key","Key Not Work","Skip Per Management","Minor","Denied Entry","OTHER"],G=["Missing Chimney Cap","Missing Damper","Broken Damper - Other","Broken Damper - stays open","Broken Damper - closed/won't open","Broken Damper - Not Connected","Missing Spark Screen","Damaged Spark Screen","Damaged Left Refractory Panel","Damaged Back Refractory Panel","Damaged Right Refractory Panel","Damaged Base Panel","Missing Left Refractory Panel","Missing Back Refractory Panel","Missing Right Refractory Panel","Missing Base Panel","Completed - Other","Went Back"],q=["Completed. No Issues."],z=(0,r.aZ)({name:"HomeView",components:{InputText:j.Z,Button:P.Z,Dialog:M.Z,Divider:N.Z,ProgressSpinner:V.Z,BlockUI:T.Z,SpacerBreak:F,Checkbox:x.Z},data:function(){return{greenCodes:[],yellowCodes:[],redCodes:[],inputUser:"",inputJob:"",storageUser:"",storageJob:"",savedCodes:[],visibleCodes:[],unitName:"",chosenCodes:[],otherDesc:"",displayOtherDesc:!1,syncing:"",loading:!1,saving:"",offlineMode:!1}},mounted:function(){return(0,J.mG)(this,void 0,void 0,(function(){return(0,J.Jh)(this,(function(e){return this.greenCodes=q,this.yellowCodes=G,this.redCodes=K,this.storageUser=localStorage.getItem("user")||"",this.storageJob=localStorage.getItem("job")||"",[2]}))}))},watch:{storageJob:function(){return(0,J.mG)(this,void 0,void 0,(function(){var e=this;return(0,J.Jh)(this,(function(n){return this.loading=!0,this.visibleCodes=this.getStorageCodes(),this.getSavedCodes().then((function(){e.loading=!1})).catch((function(){e.loading=!1})),[2]}))}))}},methods:{onSaveUser:function(){localStorage.setItem("user",this.inputUser),this.storageUser=localStorage.getItem("user")||""},onSaveJob:function(){localStorage.setItem("job",this.inputJob),this.storageJob=localStorage.getItem("job")||""},onEndJob:function(){localStorage.setItem("job",""),this.inputJob="",this.storageJob=""},onAddCode:function(e){e.toLowerCase().includes("other")&&!this.chosenCodes.includes(e)&&(this.displayOtherDesc=!0),this.chosenCodes=this.chosenCodes.includes(e)?this.chosenCodes.filter((function(n){return n!==e})):(0,J.ev)((0,J.ev)([],this.chosenCodes,!0),[e],!1)},onAddCodes:function(){var e=this;if(!this.storageUser)return alert("Please add your user.");if(!this.storageJob)return alert("Please add a job.");if(!this.unitName)return alert("Please add unit.");if(1===this.chosenCodes.length&&"Went Back"===this.chosenCodes[0])return alert("Must choose another code with 'Went Back'");var n=this.chosenCodes.map((function(n){return n.toLowerCase().includes("other")?"".concat(n," ").concat(e.otherDesc):n}));this.saveCodes(n)},onDeleteCode:function(e){var n=window.confirm("Are you sure you want to delete unit code ".concat(e.unit," ").concat(e.codes,"?"));n&&(this.offlineMode?this.removeUnitCode(e):B(e.id).then(this.removeUnitCode))},onSyncCode:function(e){var n=this;if(this.offlineMode)return alert("Cannot sync in offline mode.");this.syncing=e.unit;var t=function(e){return n.syncing=""};I(e).then(t).then(this.getSavedCodes).catch(t)},saveCodes:function(e){var n={user:this.storageUser,unit:this.unitName,codes:e.join(", "),property:this.storageJob};this.addCodeToUI(n),this.offlineMode?this.chosenCodes=[]:(this.saving=this.unitName,I(n).then(this.getSavedCodes).then(this.resetValues).catch(this.resetValues))},addCodeToUI:function(e){var n=this.getStorageCodes();localStorage.setItem(this.storageJob,JSON.stringify((0,J.ev)([e],n,!0))),this.visibleCodes=(0,J.ev)([e],this.visibleCodes,!0)},getSavedCodes:function(){return(0,J.mG)(this,void 0,void 0,(function(){var e,n,t,o;return(0,J.Jh)(this,(function(i){switch(i.label){case 0:return this.offlineMode?(n=[],[3,3]):[3,1];case 1:return[4,_(this.storageJob)];case 2:n=i.sent(),i.label=3;case 3:return e=n,t=this.getStorageCodes(),o=E.zGw((function(e){return e.sort((function(e,n){if(!e.createdAt||!n.createdAt)return 0;var t=new Date(e.createdAt).getTime(),o=new Date(n.createdAt).getTime();return t-o>1?-1:t-o<1?1:0}))}),(function(e){return E.vMG(E.vgT("unit"),e)}),(function(e){return Object.keys(e).map((function(n){var t=e[n];return t.find((function(e){return e.id}))||E.YMb(t)}))}),(function(e){return E.mNm(E.vgT("unit"),e)}))((0,J.ev)((0,J.ev)([],t,!0),e,!0)),this.savedCodes=e,this.visibleCodes=o,[2]}}))}))},removeUnitCode:function(e){this.visibleCodes=this.visibleCodes.filter((function(n){return n.id!==e.id})),this.syncing=""},isUnsaved:function(e){var n=this.getStorageCodes();return n.some((function(n){return n.unit===e.unit}))},getStorageCodes:function(){return JSON.parse(localStorage.getItem(this.storageJob)||"[]")},resetValues:function(){this.unitName="",this.chosenCodes=[],this.syncing="",this.saving="",this.loading=!1}}});const Q=(0,l.Z)(z,[["render",W]]);var X=Q,$=[{path:"/",name:"home",component:X},{path:"/about",name:"about",component:function(){return t.e(443).then(t.bind(t,546))}}],ee=(0,f.p7)({history:(0,f.r5)(),routes:$}),ne=ee,te=t(907),oe=(0,te.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}});(0,o.ri)(c).use(oe).use(ne).use(i.Z).mount("#app")}},n={};function t(o){var i=n[o];if(void 0!==i)return i.exports;var r=n[o]={exports:{}};return e[o](r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,o,i,r){if(!o){var s=1/0;for(c=0;c<e.length;c++){o=e[c][0],i=e[c][1],r=e[c][2];for(var l=!0,u=0;u<o.length;u++)(!1&r||s>=r)&&Object.keys(t.O).every((function(e){return t.O[e](o[u])}))?o.splice(u--,1):(l=!1,r<s&&(s=r));if(l){e.splice(c--,1);var a=i();void 0!==a&&(n=a)}}return n}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,i,r]}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,o){return t.f[o](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/about.b90640c9.js"}}(),function(){t.miniCssF=function(e){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="Vine:";t.l=function(o,i,r,s){if(e[o])e[o].push(i);else{var l,u;if(void 0!==r)for(var a=document.getElementsByTagName("script"),c=0;c<a.length;c++){var d=a[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==n+r){l=d;break}}l||(u=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,t.nc&&l.setAttribute("nonce",t.nc),l.setAttribute("data-webpack",n+r),l.src=o),e[o]=[i];var f=function(n,t){l.onerror=l.onload=null,clearTimeout(h);var i=e[o];if(delete e[o],l.parentNode&&l.parentNode.removeChild(l),i&&i.forEach((function(e){return e(t)})),n)return n(t)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=f.bind(null,l.onerror),l.onload=f.bind(null,l.onload),u&&document.head.appendChild(l)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e={143:0};t.f.j=function(n,o){var i=t.o(e,n)?e[n]:void 0;if(0!==i)if(i)o.push(i[2]);else{var r=new Promise((function(t,o){i=e[n]=[t,o]}));o.push(i[2]=r);var s=t.p+t.u(n),l=new Error,u=function(o){if(t.o(e,n)&&(i=e[n],0!==i&&(e[n]=void 0),i)){var r=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;l.message="Loading chunk "+n+" failed.\n("+r+": "+s+")",l.name="ChunkLoadError",l.type=r,l.request=s,i[1](l)}};t.l(s,u,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,o){var i,r,s=o[0],l=o[1],u=o[2],a=0;if(s.some((function(n){return 0!==e[n]}))){for(i in l)t.o(l,i)&&(t.m[i]=l[i]);if(u)var c=u(t)}for(n&&n(o);a<s.length;a++)r=s[a],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(c)},o=self["webpackChunkVine"]=self["webpackChunkVine"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(628)}));o=t.O(o)})();
//# sourceMappingURL=app.1706028a.js.map