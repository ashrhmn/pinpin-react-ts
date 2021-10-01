var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,o=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,s=(e,t)=>{for(var a in t||(t={}))l.call(t,a)&&o(e,a,t[a]);if(n)for(var a of n(t))r.call(t,a)&&o(e,a,t[a]);return e},c=(e,n)=>t(e,a(n));"undefined"!=typeof require&&require;import{a as i,R as u,b as m,_ as d,u as g,c as p,r as h,d as E,e as v,f as w,g as b,h as f,i as x,j as k,L as y,s as S,B as L,S as C,k as T,Q as N,l as D,m as j,n as Q}from"./vendor.2741063f.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var M=i.create({baseURL:"https://pinash.herokuapp.com/api/",headers:{authToken:localStorage.getItem("authToken"),"Content-type":"Application/json"}});const I=u({key:"authUserState",get:async({get:e})=>{const t=e(B);if(!t)return{isLoggedIn:!1,user:null,msg:"Not logged in"};try{const e=await M.get("auth/authUser",{headers:{authToken:t}});return console.log(e.data),e.data}catch(a){throw a}}}),F=m({key:"isAddingNewData",default:!1}),B=m({key:"tokenState",default:localStorage.getItem("authToken")}),V=m({key:"baseUrlState",default:"/pinpin-react-ts/"}),H=m({key:"messageState",default:null}),z=m({key:"messageTimeoutIdState",default:0}),P=(e,t,a=2e3)=>{t(e);const n=setTimeout((()=>{t(null),clearTimeout(n)}),a)},U=(e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:e.name.toLowerCase()>t.name.toLowerCase()?1:0,W=(e,t)=>e.isFavourite&&!t.isFavourite?-1:!e.isFavourite&&t.isFavourite?1:0,$=()=>{const e=g(),[,t]=p(F),[,a]=p(H),[n,l]=h.exports.useState({id:0,username:"",name:"",description:"",secret:"",isFavourite:!1,isTrashed:!1,createdDate:"",updatedDate:""}),r=E((async({name:e,description:t,secret:a})=>{try{const n=await M.post("/pindata/",{name:e,description:""==t?null:t,secret:""==a?null:a},{headers:{authToken:localStorage.getItem("authToken")}});return console.log(n.data),n.data}catch(n){return console.log(n),null}}),{onMutate:async({name:n,description:l,secret:r})=>{t(!1),a("Saving New Data"),console.log({name:n,description:l,secret:r}),await e.cancelQueries("pindata");const o=e.getQueryData("pindata");return console.log(o),o?(e.setQueryData("pindata",[...o,{name:n,description:l,secret:r}].sort(U).sort(W)),{preData:o}):(e.setQueryData("pindata",[]),null)},onError:(t,n,l)=>{P("Saving Error",a),console.log(t),e.setQueryData("pindata",null==l?void 0:l.preData)},onSettled:()=>{e.invalidateQueries("pindata")},onSuccess:()=>{P("Saved Successfully",a)}});return v.createElement(A,null,v.createElement(G,null,v.createElement(q,null,"Name :"),v.createElement(K,{value:n.name,onChange:e=>l(c(s({},n),{name:e.target.value}))})),v.createElement(G,null,v.createElement(q,null,"Description :"),v.createElement(K,{value:n.description?n.description:"",onChange:e=>l(c(s({},n),{description:e.target.value}))})),v.createElement(G,null,v.createElement(q,null,"Secret :"),v.createElement(K,{value:n.secret,onChange:e=>l(c(s({},n),{secret:e.target.value}))})),v.createElement(O,null,v.createElement(R,{onClick:()=>r.mutate(n)},v.createElement(_,null),v.createElement("p",null,"Save")),v.createElement(R,{onClick:()=>t(!1)},v.createElement(J,null),v.createElement("p",null,"Cancel"))))},O=d.div`flex w-full justify-evenly mt-2`,A=d.div`flex flex-col items-center p-2 bg-green-600 rounded-lg text-lg mt-2 mb-2`,R=d.button`text-green-100 bg-blue-700 rounded w-32 pl-5 pr-5 pt-2 pb-2 flex items-center space-x-2 justify-center`,q=d.h1`text-white`,G=d.div`flex items-center justify-between space-x-2 w-full`,K=d.input`border-2 border-green-700 rounded focus:outline-none p-1 mt-1 mb-1 w-60`,_=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})),J=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"})),X=({data:e,setEditing:t})=>{const a=g(),[n,l]=h.exports.useState(e),[,r]=p(H),o=E((async({id:e,name:t,description:a,secret:n})=>{try{const l=await M.put(`/pindata/id/${e}`,{name:t,description:""==a?null:a,secret:""==n?null:n},{headers:{authToken:localStorage.getItem("authToken")}});return console.log(l.data),l.data}catch(l){console.log(l)}}),{onMutate:async e=>{t(!1),r("Saving Edits"),await a.cancelQueries("pindata");const n=a.getQueryData("pindata"),l=null==n?void 0:n.map((t=>t.id!=e.id?t:c(s({},t),{name:e.name,description:e.description,secret:e.secret})));return console.log(null==l?void 0:l.sort(U).sort(W)),n?(a.setQueryData("pindata",null==n?void 0:n.map((t=>t.id!=e.id?t:c(s({},t),{name:e.name,description:e.description,secret:e.secret}))).sort(U).sort(W)),{predata:n}):null},onError:(e,t,n)=>{P("Error saving edits, reverting.....",r),console.log(e),a.setQueryData("pindata",null==n?void 0:n.predata)},onSettled:()=>{a.invalidateQueries("pindata")},onSuccess:()=>{P("Edit saved successfully",r)}});return v.createElement(Z,null,v.createElement(ae,null,v.createElement(te,null,"Name :"),v.createElement(ne,{value:n.name,onChange:e=>l(c(s({},n),{name:e.target.value}))})),v.createElement(ae,null,v.createElement(te,null,"Description :"),v.createElement(ne,{value:n.description?n.description:"",onChange:e=>l(c(s({},n),{description:e.target.value}))})),v.createElement(ae,null,v.createElement(te,null,"Secret :"),v.createElement(ne,{value:n.secret,onChange:e=>l(c(s({},n),{secret:e.target.value}))})),v.createElement(Y,null,v.createElement(ee,{onClick:()=>o.mutate(n)},v.createElement(le,null),v.createElement("p",null,"Save")),v.createElement(ee,{onClick:()=>t(!1)},v.createElement(re,null),v.createElement("p",null,"Cancel"))))},Y=d.div`flex w-full justify-evenly mt-2`,Z=d.div`flex flex-col items-center p-2 bg-green-600 rounded-lg text-lg mt-2 mb-2`,ee=d.button`text-green-100 bg-blue-700 rounded w-32 pl-5 pr-5 pt-2 pb-2 flex items-center space-x-2 justify-center`,te=d.h1`text-white`,ae=d.div`flex items-center justify-between space-x-2 w-full`,ne=d.input`border-2 border-green-700 rounded focus:outline-none p-1 mt-1 mb-1 w-60`,le=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})),re=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"})),oe=({data:e})=>{const[t,a]=h.exports.useState(!1),n=g(),[,l]=p(H),r=E((async({id:e})=>{try{const t=await M.put(`/pindata/toogleFavourite/${e}`,{headers:{authToken:localStorage.getItem("authToken")}});return console.log(t.data),t.data}catch(t){return console.log(t),t}}),{onMutate:async({id:e})=>{l("Toogling..."),await n.cancelQueries("pindata");const t=n.getQueryData("pindata");return t?(n.setQueryData("pindata",t.map((t=>t.id==e?c(s({},t),{isFavourite:!t.isFavourite}):t)).sort(U).sort(W)),{preData:t}):null},onError:(e,t,a)=>{P("Error toogling, reverting...",l),console.log(e),n.setQueryData("pindata",null==a?void 0:a.preData)},onSuccess:()=>{P("Done",l)},onSettled:()=>{n.invalidateQueries("pindata")}}),o=e.isTrashed?"pindatabin":"pindata",i=E((async({id:t})=>{try{const a=e.isTrashed?await M.delete(`/pindata/id/${t}`,{headers:{authToken:localStorage.getItem("authToken")}}):await M.put(`/pindata/toogleTrashed/${t}`,{headers:{authToken:localStorage.getItem("authToken")}});return console.log(a.data),a.data}catch(a){return console.log(a),a}}),{onMutate:async({id:t})=>{l(e.isTrashed?"Deleting...":"Moving to bin..."),await n.cancelQueries(o);const a=n.getQueryData(o);return a?(n.setQueryData(o,a.filter((e=>e.id!=t))),{preData:a}):null},onError:(t,a,r)=>{P(`Error ${e.isTrashed?"deleting data":"moving data to bin"}, reverting....`,l),console.log(t),n.setQueryData(o,null==r?void 0:r.preData)},onSettled:()=>{n.invalidateQueries("pindatabin"),n.invalidateQueries("pindata")},onSuccess:()=>{P((e.isTrashed?"Deleted":"Moved to bin")+" succesfully",l)}}),u=E((async({id:e})=>{try{const t=await M.put(`/pindata/toogleTrashed/${e}`,{headers:{authToken:localStorage.getItem("authToken")}});return console.log(t.data),t.data}catch(t){return console.log(t),t}}),{onMutate:async({id:e})=>{l("Restoring..."),await n.cancelQueries(o);const t=n.getQueryData(o);return t?(n.setQueryData(o,t.filter((t=>t.id!=e))),{preData:t}):null},onError:(e,t,a)=>{P("Error restoring data, reverting....",l),console.log(e),n.setQueryData(o,null==a?void 0:a.preData)},onSettled:()=>{n.invalidateQueries("pindatabin"),n.invalidateQueries("pindata")},onSuccess:()=>{P("Restored succesfully",l)}});return v.createElement(v.Fragment,null,t?v.createElement(X,{data:e,setEditing:a}):v.createElement("div",{className:`flex items-center justify-between text-2xl mt-4 mb-4 p-2 ${e.isTrashed?"bg-red-600":"bg-blue-600"} text-white rounded-lg shadow-lg`},v.createElement("div",{className:"flex flex-col w-2/3"},v.createElement("h1",null,e.name),v.createElement("p",null,e.description)),v.createElement("div",{className:"flex flex-col w-1/3"},v.createElement("p",{className:"break-words text-center"},e.secret),v.createElement("div",{className:"flex justify-evenly"},e.isTrashed?v.createElement(v.Fragment,null,v.createElement("button",{onClick:()=>u.mutate(e)},v.createElement(se,null))):v.createElement(v.Fragment,null,v.createElement("button",{onClick:()=>r.mutate(e)},e.isFavourite?v.createElement(me,null):v.createElement(ue,null)),v.createElement("button",{onClick:()=>a(!0)},v.createElement(ie,null))),v.createElement("button",{onClick:()=>i.mutate(e)},v.createElement(ce,null))))))},se=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"})),ce=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})),ie=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})),ue=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"})),me=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",viewBox:"0 0 20 20",fill:"currentColor"},v.createElement("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})),de=({isBin:e=!1})=>{const t=w("pindata"+(e?"bin":""),(()=>M.get("/pindata/"+(e?"bin/":""),{headers:{authToken:localStorage.getItem("authToken")}}).then((e=>e.data))));switch(t.status){case"loading":return v.createElement(v.Fragment,null,"Loading...");case"error":return v.createElement(v.Fragment,null,"Error Loading PinData...");case"success":return v.createElement(v.Fragment,null,t.data.map((e=>v.createElement(oe,{key:e.id+e.name+e.description+e.secret+e.isFavourite+e.isTrashed+e.createdDate+e.updatedDate,data:e}))));case"idle":return v.createElement(v.Fragment,null,"Query Idle...")}},ge=()=>{var e,t;const a=b(V),n=f(I),[l,r]=h.exports.useState(!1);switch(n.state){case"hasValue":return(null==(e=n.contents)?void 0:e.isLoggedIn)?v.createElement("div",null,v.createElement("h1",null,null==(t=n.contents)?void 0:t.user.username),v.createElement("div",{className:"flex justify-center text-2xl text-white m-2"},v.createElement(pe,{className:"rounded-tl-2xl rounded-bl-2xl",$active:!l,onClick:()=>r(!1)},"Data"),v.createElement(pe,{className:"rounded-tr-2xl rounded-br-2xl",$active:l,onClick:()=>r(!0)},"Trashed")),l?v.createElement(Ee,null):v.createElement(he,null)):v.createElement(x,{to:a+"login"});case"loading":return v.createElement("div",null,"Loading...");case"hasError":return v.createElement(x,{to:a+"login"})}},pe=d.button`w-32 pt-1 pb-1 focus:outline-none hover:bg-green-700 ${e=>e.$active?"shadow-inner bg-green-700":"shadow-none bg-green-600"}`,he=()=>v.createElement(v.Fragment,null,v.createElement(ve,null),v.createElement(de,{isBin:!1})),Ee=()=>v.createElement(de,{isBin:!0}),ve=()=>{const[e,t]=p(F);return v.createElement(v.Fragment,null,v.createElement("button",{onClick:()=>t(!e),className:"flex items-center bg-green-600 text-white rounded p-2"},v.createElement(we,null),v.createElement("p",null,"Add New")),e?v.createElement($,null):v.createElement(v.Fragment,null))},we=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"})),be=()=>{const e=k(),t=b(V);return v.createElement("div",null,v.createElement("h1",null,"Home"),v.createElement("button",{onClick:()=>e.push(t+"login")},"Go Login"))},fe=()=>{var e;const t=b(V);k();const[a,n]=h.exports.useState(""),[l,r]=h.exports.useState(""),o=f(I),[,s]=p(B),[,c]=p(H);p(z);const i=async()=>{try{const e=await M.post("auth/login/",{username:a,password:l});console.log(e.data),P(e.data.msg,c),e.data.token?(localStorage.setItem("authToken",e.data.token),s(e.data.token)):(localStorage.removeItem("authToken"),s(null))}catch(e){console.log(e),localStorage.removeItem("authToken"),s(null)}};switch(o.state){case"hasValue":return(null==(e=o.contents)?void 0:e.isLoggedIn)?v.createElement(x,{to:t+"dashboard"}):v.createElement("div",null,v.createElement("div",{className:"flex flex-col"},v.createElement("div",{className:"flex flex-col items-center"},v.createElement(xe,{onChange:e=>n(e.target.value),value:a,type:"text",placeholder:"Username"}),v.createElement(xe,{value:l,onChange:e=>r(e.target.value),type:"password",placeholder:"Password"})),v.createElement("div",{className:"flex justify-center"},v.createElement(ye,{onClick:i},"Sign In"),v.createElement(Se,null,v.createElement(y,{to:t+"signup"},"Sign Up")))));case"loading":return v.createElement("div",null,"Loading...");case"hasError":return v.createElement("div",null,"Error loading...")}},xe=d.input`border-2 border-black w-60 m-2 p-2 rounded focus:outline-none`,ke=d.button`transition-all rounded px-2 w-20 py-1 m-1`,ye=d(ke)`bg-blue-600 text-white hover:bg-blue-700`,Se=d(ke)`bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600`,Le=()=>{const[e,t]=p(H);return v.createElement("div",null,e?v.createElement("div",{className:"z-10 flex items-center space-x-3 bg-blue-700 rounded text-white justify-center shadow-2xl px-2 py-1 m-2 absolute bottom-2 right-2"},v.createElement("h1",null,e),v.createElement("button",{className:"bg-red-700 text-white rounded-full",onClick:()=>t(null)},v.createElement(Ce,null))):v.createElement(v.Fragment,null))},Ce=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})),Te=()=>{var e;const t=b(V),a=f(I);switch(a.state){case"hasValue":return(null==(e=a.contents)?void 0:e.isLoggedIn)?v.createElement(Ne,null,v.createElement("div",null,v.createElement(y,{to:t},v.createElement(je,null,"Home"))),v.createElement(De,null,v.createElement(y,{to:t+"dashboard"},v.createElement(je,null,v.createElement(Qe,null),v.createElement("p",null,"Dashboard"))),v.createElement(Me,null))):v.createElement(Ne,null,v.createElement("div",null,v.createElement(y,{to:t},v.createElement(je,null,"Home"))),v.createElement(De,null,v.createElement(y,{to:t+"login"},v.createElement(je,null,"Login"))));case"loading":return v.createElement(v.Fragment,null,"Loading...");case"hasError":return localStorage.removeItem("authToken"),v.createElement(v.Fragment,null,v.createElement("h1",{className:"text-red-600"},"Error loading Conditional Nav, showing all routes"),v.createElement(Ne,null,v.createElement("div",null,v.createElement(y,{to:t},v.createElement(je,null,"Home"))),v.createElement(De,null,v.createElement(y,{to:t+"signup"},v.createElement(je,null,"SignUp")),v.createElement(y,{to:t+"login"},v.createElement(je,null,"Login")),v.createElement(y,{to:t+"dashboard"},v.createElement(je,null,"Dashboard")))))}},Ne=d.div`flex justify-between mt-4`,De=d.div`flex space-x-3`,je=d.button`bg-blue-700 text-white rounded hover:bg-blue-900 transition-all px-2 py-1 flex items-center space-x-1`,Qe=()=>v.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},v.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"})),Me=()=>{const[,e]=p(B),[,t]=p(H);return v.createElement(je,{onClick:()=>{localStorage.removeItem("authToken"),e(null),P("Logged out",t)}},"Logout")},Ie=()=>{var e;const t=f(I),a=b(V),[n,l]=p(H),[r,o]=h.exports.useState(""),[s,c]=h.exports.useState(""),[i,u]=h.exports.useState(""),[m,d]=h.exports.useState(""),[g,E]=h.exports.useState("");let w;const k=async()=>{if(""==r)return l("Username can not be empty"),void(w=setTimeout((()=>{l(null),clearTimeout(w)}),2e3));if(s!=i)return l("Passwords don't match"),void(w=setTimeout((()=>{l(null),clearTimeout(w)}),2e3));if(""==s)return l("Password can not be empty"),void(w=setTimeout((()=>{l(null),clearTimeout(w)}),2e3));const e=await M.post("/auth/signup/",{username:r,password:s,email:m,name:g});console.log(e.data),l(e.data.msg),w=setTimeout((()=>{l(null),clearTimeout(w)}),2e3)};switch(t.state){case"hasValue":return(null==(e=t.contents)?void 0:e.isLoggedIn)?v.createElement(x,{to:a+"dashboard"}):v.createElement("div",{className:"flex flex-col items-center"},v.createElement(Fe,{value:m,onChange:e=>d(e.target.value),placeholder:"Email"}),v.createElement(Fe,{value:s,onChange:e=>c(e.target.value),type:"password",placeholder:"Password"}),v.createElement(Fe,{value:i,onChange:e=>u(e.target.value),type:"password",placeholder:"Confirm Password"}),v.createElement(Fe,{value:r,onChange:e=>o(e.target.value),placeholder:"Username"}),v.createElement(Fe,{value:g,onChange:e=>E(e.target.value),placeholder:"Full Name"}),v.createElement("div",null,v.createElement(Be,{onClick:k},"Sign Up")),v.createElement("p",null,"Already have an account?"," ",v.createElement(y,{to:a+"login"},v.createElement("span",{className:"underline hover:text-blue-500 hover:no-underline transition-all"},"Sign In"))));case"loading":return v.createElement("div",null,"Loading...")}return v.createElement("div",null,"SignUp")},Fe=d.input`border-2 border-black w-60 m-2 p-2 rounded focus:outline-none`,Be=d(d.button`transition-all rounded w-60 px-2 py-2 m-1`)`bg-blue-600 text-white hover:bg-blue-700`,Ve=()=>{const e=b(V);return v.createElement(He,{className:""},v.createElement(L,null,v.createElement(Te,null),v.createElement("div",{className:"flex justify-center"},v.createElement(Le,null)),v.createElement(C,null,v.createElement(T,{exact:!0,path:e},v.createElement(be,null)),v.createElement(T,{path:e+"dashboard"},v.createElement(ge,null)),v.createElement(T,{path:e+"login"},v.createElement(fe,null)),v.createElement(T,{path:e+"signup"},v.createElement(Ie,null)))))},He=S.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 1rem;
`,ze=new N;D.render(v.createElement(v.StrictMode,null,v.createElement(j,{client:ze},v.createElement(Q,null,v.createElement(Ve,null)))),document.getElementById("root"));