(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39fd2926"],{"216d":function(e,t,c){"use strict";c.r(t);var n=c("7a23"),o=c("2a7d"),a=c("ae8d"),r=c("e6f3"),l=c("afbc");const i={id:"remain"},s={id:"menu"},b={id:"menuBlock"},d={id:"tableBoard"},u={id:"tableBlock"};var j=Object(n["defineComponent"])({__name:"Remaining",setup(e){const t=Object(r["a"])(),c=()=>{l["a"].push("/Park")};return(e,r)=>(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",i,[Object(n["createElementVNode"])("div",s,[Object(n["createElementVNode"])("div",b,[Object(n["createVNode"])(o["a"],{title:"回到遊戲",onOnClick:c})])]),Object(n["createElementVNode"])("div",d,[Object(n["createElementVNode"])("div",u,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(Object(n["unref"])(t).cards,e=>(Object(n["openBlock"])(),Object(n["createBlock"])(a["a"],{key:e,v:e.join(",")},null,8,["v"]))),128))])])]))}});c("b09c");const O=j;t["default"]=O},"25fa":function(e,t,c){},7439:function(e,t,c){"use strict";c("83f2")},"83f2":function(e,t,c){},ae8d:function(e,t,c){"use strict";var n=c("7a23");const o=["data-ary"],a=["innerHTML"];var r=Object(n["defineComponent"])({__name:"Card",props:{v:{type:String,required:!0},lock:{type:Boolean}},emits:["chooseCard"],setup(e,{emit:t}){const c=e;class r{constructor(){this.color="",this.iconfont="",this.style={},this.dt="",this.ct=0}}const l=new r;if(c.v.length>0){let e=c.v.split(",").map(e=>Number(e));switch(e[0]){case 1:l.iconfont="&#xa00"+e[2],l.style.transform="rotate(180deg)";break;case 2:l.iconfont="&#xb00"+e[2];break;case 3:l.iconfont="&#xc00"+e[2],l.style.fontWeight="bolder";break}switch(e[1]){case 1:l.color="red";break;case 2:l.color="green";break;case 3:l.color="blue";break}l.ct=e[3],l.dt=e.join(",")}return(c,r)=>(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{"data-ary":Object(n["unref"])(l).dt,class:Object(n["normalizeClass"])(["card",[Object(n["unref"])(l).color,e.lock?"lock":""]]),style:Object(n["normalizeStyle"])(Object(n["unref"])(l).style)},[Object(n["createElementVNode"])("div",{onClick:r[0]||(r[0]=e=>t("chooseCard",e.target))},[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(Object(n["unref"])(l).ct,e=>(Object(n["openBlock"])(),Object(n["createElementBlock"])("i",{key:e,innerHTML:Object(n["unref"])(l).iconfont},null,8,a))),128))])],14,o))}});c("7439");const l=r;t["a"]=l},b09c:function(e,t,c){"use strict";c("25fa")}}]);
//# sourceMappingURL=chunk-39fd2926.38c657d4.js.map