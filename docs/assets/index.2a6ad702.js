import{d as f,r as d,o as k,a,c as l,b as i,w as x,v as b,F as m,e as y,t as u,f as v,g as p,h as $}from"./vendor.31590879.js";const I=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};I();const w=i("h1",{class:"title is-4"},"\u90FD\u9053\u5E9C\u770C\u3092\u9078\u629E",-1),C={class:"select"},L=i("option",null,null,-1),N=f({props:{selectPrefecture:null},setup(c){const o="",s=d([]),r=d("");return k(async()=>{const e=await fetch(`${o}/api/prefectures`);s.value=await e.json()}),(e,t)=>(a(),l("div",null,[w,i("div",C,[x(i("select",{"onUpdate:modelValue":t[0]||(t[0]=n=>r.value=n),onChange:t[1]||(t[1]=n=>c.selectPrefecture(r.value))},[L,(a(!0),l(m,null,y(s.value,n=>(a(),l("option",{key:n},u(n),1))),128))],544),[[b,r.value]])])]))}});const P={class:"title is-4 disaster-title"},O={key:0,class:"checkbox item"},E=["checked"],F={key:1,class:"checkbox item"},M=["checked"],V=f({props:{disaster:null,measureItems:null},setup(c){const{disaster:o,measureItems:s}=c,r=s.map(({name:t,link:n})=>({name:t,link:n,checked:!1})),e=d(r);return(t,n)=>(a(),l("div",null,[i("h2",P,u(c.disaster),1),(a(!0),l(m,null,y(e.value,({name:_,link:g,checked:h})=>(a(),l("div",{class:"columns",key:_},[g===""?(a(),l("label",O,[i("input",{type:"checkbox",checked:h},null,8,E),v(" "+u(_),1)])):(a(),l("label",F,[i("input",{type:"checkbox",checked:h},null,8,M),v(" "+u(_),1)]))]))),128))]))}});var A=(c,o)=>{const s=c.__vccOpts||c;for(const[r,e]of o)s[r]=e;return s};const B={},D={class:"header"},S=i("h1",{class:"title is-1"},"\u3054\u5F53\u5730\u707D\u5BB3\u30AC\u30A4\u30C9",-1),U=[S];function j(c,o){return a(),l("div",D,U)}var H=A(B,[["render",j]]);const q={class:"measureItem content"},K=f({setup(c){const o="",s=d({disaster:"",measureItems:[]}),r=async e=>{const t=await fetch(`${o}/api/prefectures?p=${e}`);s.value=await t.json()};return(e,t)=>(a(),l(m,null,[p(H),p(N,{"select-prefecture":r}),i("div",q,[p(V,{disaster:s.value.disaster,"measure-items":s.value.measureItems},null,8,["disaster","measure-items"])])],64))}});$(K).mount("#app");
