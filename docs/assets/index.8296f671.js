import{d as p,r as d,o as h,a as o,c as n,b as l,w as v,v as y,F as f,e as m,t as i,f as g,g as _,h as b}from"./vendor.31590879.js";const x=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};x();const $=l("h1",{class:"title is-4"},"\u90FD\u9053\u5E9C\u770C\u3092\u9078\u629E",-1),k={class:"select"},I=l("option",null,null,-1),w=p({props:{selectPrefecture:null},setup(u){const c="",r=d([]),s=d("");return h(async()=>{const e=await fetch(`${c}/api/prefectures`);r.value=await e.json()}),(e,t)=>(o(),n("div",null,[$,l("div",k,[v(l("select",{"onUpdate:modelValue":t[0]||(t[0]=a=>s.value=a),onChange:t[1]||(t[1]=a=>u.selectPrefecture(s.value))},[I,(o(!0),n(f,null,m(r.value,a=>(o(),n("option",null,i(a),1))),256))],544),[[y,s.value]])])]))}});const L={class:"title is-4 disaster-title"},N={class:"columns"},P={key:0,class:"checkbox"},C=l("input",{type:"checkbox"},null,-1),E={key:1,class:"checkbox"},F=l("input",{type:"checkbox"},null,-1),M={href:"link"},O=p({props:{disaster:null,measureItems:null},setup(u){return(c,r)=>(o(),n("div",null,[l("h2",L,i(u.disaster),1),(o(!0),n(f,null,m(u.measureItems,({name:s,link:e})=>(o(),n("div",N,[e===""?(o(),n("label",P,[C,g(" "+i(s),1)])):(o(),n("label",E,[F,l("a",M,i(s),1)]))]))),256))]))}});const V={class:"columns is-mobile measureItem"},A=p({setup(u){const c="",r=d({disaster:"",measureItems:[]}),s=async e=>{const t=await fetch(`${c}/api/prefectures?p=${e}`);r.value=await t.json()};return(e,t)=>(o(),n(f,null,[_(w,{"select-prefecture":s}),l("div",V,[_(O,{disaster:r.value.disaster,"measure-items":r.value.measureItems,class:"column is-4 is-offset-4"},null,8,["disaster","measure-items"])])],64))}});b(A).mount("#app");
