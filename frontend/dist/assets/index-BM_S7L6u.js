(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Mu(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ut={},os=[],di=()=>{},Oh=()=>!1,Na=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Oa=t=>t.startsWith("onUpdate:"),nn=Object.assign,Eu=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Lg=Object.prototype.hasOwnProperty,Tt=(t,e)=>Lg.call(t,e),rt=Array.isArray,as=t=>mo(t)==="[object Map]",Ms=t=>mo(t)==="[object Set]",yf=t=>mo(t)==="[object Date]",ut=t=>typeof t=="function",zt=t=>typeof t=="string",Hn=t=>typeof t=="symbol",Rt=t=>t!==null&&typeof t=="object",Fh=t=>(Rt(t)||ut(t))&&ut(t.then)&&ut(t.catch),Bh=Object.prototype.toString,mo=t=>Bh.call(t),Ig=t=>mo(t).slice(8,-1),kh=t=>mo(t)==="[object Object]",Fa=t=>zt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Xs=Mu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ba=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Ug=/-\w/g,qn=Ba(t=>t.replace(Ug,e=>e.slice(1).toUpperCase())),Ng=/\B([A-Z])/g,Ir=Ba(t=>t.replace(Ng,"-$1").toLowerCase()),Vh=Ba(t=>t.charAt(0).toUpperCase()+t.slice(1)),ll=Ba(t=>t?`on${Vh(t)}`:""),ci=(t,e)=>!Object.is(t,e),na=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Hh=(t,e,n,i=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:i,value:n})},ka=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Sf;const Va=()=>Sf||(Sf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function yn(t){if(rt(t)){const e={};for(let n=0;n<t.length;n++){const i=t[n],r=zt(i)?kg(i):yn(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(zt(t)||Rt(t))return t}const Og=/;(?![^(]*\))/g,Fg=/:([^]+)/,Bg=/\/\*[^]*?\*\//g;function kg(t){const e={};return t.replace(Bg,"").split(Og).forEach(n=>{if(n){const i=n.split(Fg);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function cn(t){let e="";if(zt(t))e=t;else if(rt(t))for(let n=0;n<t.length;n++){const i=cn(t[n]);i&&(e+=i+" ")}else if(Rt(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Vg="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Hg=Mu(Vg);function zh(t){return!!t||t===""}function zg(t,e){if(t.length!==e.length)return!1;let n=!0;for(let i=0;n&&i<t.length;i++)n=Es(t[i],e[i]);return n}function Es(t,e){if(t===e)return!0;let n=yf(t),i=yf(e);if(n||i)return n&&i?t.getTime()===e.getTime():!1;if(n=Hn(t),i=Hn(e),n||i)return t===e;if(n=rt(t),i=rt(e),n||i)return n&&i?zg(t,e):!1;if(n=Rt(t),i=Rt(e),n||i){if(!n||!i)return!1;const r=Object.keys(t).length,s=Object.keys(e).length;if(r!==s)return!1;for(const o in t){const a=t.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!Es(t[o],e[o]))return!1}}return String(t)===String(e)}function Tu(t,e){return t.findIndex(n=>Es(n,e))}const Gh=t=>!!(t&&t.__v_isRef===!0),le=t=>zt(t)?t:t==null?"":rt(t)||Rt(t)&&(t.toString===Bh||!ut(t.toString))?Gh(t)?le(t.value):JSON.stringify(t,Wh,2):String(t),Wh=(t,e)=>Gh(e)?Wh(t,e.value):as(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[i,r],s)=>(n[cl(i,s)+" =>"]=r,n),{})}:Ms(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>cl(n))}:Hn(e)?cl(e):Rt(e)&&!rt(e)&&!kh(e)?String(e):e,cl=(t,e="")=>{var n;return Hn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};let Kt;class Xh{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Kt&&(Kt.active?(this.parent=Kt,this.index=(Kt.scopes||(Kt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const i=this.scopes.slice();for(e=0,n=i.length;e<n;e++)i[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const r=this.scopes.slice();for(e=0,n=r.length;e<n;e++)r[e].resume()}const i=this.effects.slice();for(e=0,n=i.length;e<n;e++)i[e].resume()}}run(e){if(this._active){const n=Kt;try{return Kt=this,e()}finally{Kt=n}}}on(){++this._on===1&&(this.prevScope=Kt,Kt=this)}off(){if(this._on>0&&--this._on===0){if(Kt===this)Kt=this.prevScope;else{let e=Kt;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const r=this.scopes.slice();for(n=0,i=r.length;n<i;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function $h(t){return new Xh(t)}function qh(){return Kt}function Gg(t,e=!1){Kt&&Kt.cleanups.push(t)}let Ot;const ul=new WeakSet;class Yh{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Kt&&(Kt.active?Kt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ul.has(this)&&(ul.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||jh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Mf(this),Zh(this);const e=Ot,n=Yn;Ot=this,Yn=!0;try{return this.fn()}finally{Jh(this),Ot=e,Yn=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Ru(e);this.deps=this.depsTail=void 0,Mf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ul.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ac(this)&&this.run()}get dirty(){return ac(this)}}let Kh=0,$s,qs;function jh(t,e=!1){if(t.flags|=8,e){t.next=qs,qs=t;return}t.next=$s,$s=t}function Au(){Kh++}function wu(){if(--Kh>0)return;if(qs){let e=qs;for(qs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;$s;){let e=$s;for($s=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=n}}if(t)throw t}function Zh(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Jh(t){let e,n=t.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),Ru(i),Wg(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}t.deps=e,t.depsTail=n}function ac(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Qh(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Qh(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===to)||(t.globalVersion=to,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!ac(t))))return;t.flags|=2;const e=t.dep,n=Ot,i=Yn;Ot=t,Yn=!0;try{Zh(t);const r=t.fn(t._value);(e.version===0||ci(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{Ot=n,Yn=i,Jh(t),t.flags&=-3}}function Ru(t,e=!1){const{dep:n,prevSub:i,nextSub:r}=t;if(i&&(i.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=i,t.nextSub=void 0),n.subs===t&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Ru(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Wg(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Yn=!0;const ep=[];function Oi(){ep.push(Yn),Yn=!1}function Fi(){const t=ep.pop();Yn=t===void 0?!0:t}function Mf(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Ot;Ot=void 0;try{e()}finally{Ot=n}}}let to=0;class Xg{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Cu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ot||!Yn||Ot===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ot)n=this.activeLink=new Xg(Ot,this),Ot.deps?(n.prevDep=Ot.depsTail,Ot.depsTail.nextDep=n,Ot.depsTail=n):Ot.deps=Ot.depsTail=n,tp(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=Ot.depsTail,n.nextDep=void 0,Ot.depsTail.nextDep=n,Ot.depsTail=n,Ot.deps===n&&(Ot.deps=i)}return n}trigger(e){this.version++,to++,this.notify(e)}notify(e){Au();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{wu()}}}function tp(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)tp(i)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const pa=new WeakMap,Mr=Symbol(""),lc=Symbol(""),no=Symbol("");function ln(t,e,n){if(Yn&&Ot){let i=pa.get(t);i||pa.set(t,i=new Map);let r=i.get(n);r||(i.set(n,r=new Cu),r.map=i,r.key=n),r.track()}}function Ri(t,e,n,i,r,s){const o=pa.get(t);if(!o){to++;return}const a=l=>{l&&l.trigger()};if(Au(),e==="clear")o.forEach(a);else{const l=rt(t),c=l&&Fa(n);if(l&&n==="length"){const u=Number(i);o.forEach((f,d)=>{(d==="length"||d===no||!Hn(d)&&d>=u)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),c&&a(o.get(no)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Mr)),as(t)&&a(o.get(lc)));break;case"delete":l||(a(o.get(Mr)),as(t)&&a(o.get(lc)));break;case"set":as(t)&&a(o.get(Mr));break}}wu()}function $g(t,e){const n=pa.get(t);return n&&n.get(e)}function Br(t){const e=St(t);return e===t?e:(ln(e,"iterate",no),Ln(t)?e:e.map(Kn))}function Ha(t){return ln(t=St(t),"iterate",no),t}function oi(t,e){return Bi(t)?ds(Li(t)?Kn(e):e):Kn(e)}const qg={__proto__:null,[Symbol.iterator](){return fl(this,Symbol.iterator,t=>oi(this,t))},concat(...t){return Br(this).concat(...t.map(e=>rt(e)?Br(e):e))},entries(){return fl(this,"entries",t=>(t[1]=oi(this,t[1]),t))},every(t,e){return xi(this,"every",t,e,void 0,arguments)},filter(t,e){return xi(this,"filter",t,e,n=>n.map(i=>oi(this,i)),arguments)},find(t,e){return xi(this,"find",t,e,n=>oi(this,n),arguments)},findIndex(t,e){return xi(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return xi(this,"findLast",t,e,n=>oi(this,n),arguments)},findLastIndex(t,e){return xi(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return xi(this,"forEach",t,e,void 0,arguments)},includes(...t){return dl(this,"includes",t)},indexOf(...t){return dl(this,"indexOf",t)},join(t){return Br(this).join(t)},lastIndexOf(...t){return dl(this,"lastIndexOf",t)},map(t,e){return xi(this,"map",t,e,void 0,arguments)},pop(){return Ds(this,"pop")},push(...t){return Ds(this,"push",t)},reduce(t,...e){return Ef(this,"reduce",t,e)},reduceRight(t,...e){return Ef(this,"reduceRight",t,e)},shift(){return Ds(this,"shift")},some(t,e){return xi(this,"some",t,e,void 0,arguments)},splice(...t){return Ds(this,"splice",t)},toReversed(){return Br(this).toReversed()},toSorted(t){return Br(this).toSorted(t)},toSpliced(...t){return Br(this).toSpliced(...t)},unshift(...t){return Ds(this,"unshift",t)},values(){return fl(this,"values",t=>oi(this,t))}};function fl(t,e,n){const i=Ha(t),r=i[e]();return i!==t&&!Ln(t)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=n(s.value)),s}),r}const Yg=Array.prototype;function xi(t,e,n,i,r,s){const o=Ha(t),a=o!==t&&!Ln(t),l=o[e];if(l!==Yg[e]){const f=l.apply(t,s);return a?Kn(f):f}let c=n;o!==t&&(a?c=function(f,d){return n.call(this,oi(t,f),d,t)}:n.length>2&&(c=function(f,d){return n.call(this,f,d,t)}));const u=l.call(o,c,i);return a&&r?r(u):u}function Ef(t,e,n,i){const r=Ha(t),s=r!==t&&!Ln(t);let o=n,a=!1;r!==t&&(s?(a=i.length===0,o=function(c,u,f){return a&&(a=!1,c=oi(t,c)),n.call(this,c,oi(t,u),f,t)}):n.length>3&&(o=function(c,u,f){return n.call(this,c,u,f,t)}));const l=r[e](o,...i);return a?oi(t,l):l}function dl(t,e,n){const i=St(t);ln(i,"iterate",no);const r=i[e](...n);return(r===-1||r===!1)&&za(n[0])?(n[0]=St(n[0]),i[e](...n)):r}function Ds(t,e,n=[]){Oi(),Au();const i=St(t)[e].apply(t,n);return wu(),Fi(),i}const Kg=Mu("__proto__,__v_isRef,__isVue"),np=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Hn));function jg(t){Hn(t)||(t=String(t));const e=St(this);return ln(e,"has",t),e.hasOwnProperty(t)}class ip{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,i){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return i===(r?s?o_:ap:s?op:sp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=rt(e);if(!r){let l;if(o&&(l=qg[n]))return l;if(n==="hasOwnProperty")return jg}const a=Reflect.get(e,n,Gt(e)?e:i);if((Hn(n)?np.has(n):Kg(n))||(r||ln(e,"get",n),s))return a;if(Gt(a)){const l=o&&Fa(n)?a:a.value;return r&&Rt(l)?uc(l):l}return Rt(a)?r?uc(a):un(a):a}}class rp extends ip{constructor(e=!1){super(!1,e)}set(e,n,i,r){let s=e[n];const o=rt(e)&&Fa(n);if(!this._isShallow){const c=Bi(s);if(!Ln(i)&&!Bi(i)&&(s=St(s),i=St(i)),!o&&Gt(s)&&!Gt(i))return c||(s.value=i),!0}const a=o?Number(n)<e.length:Tt(e,n),l=Reflect.set(e,n,i,Gt(e)?e:r);return e===St(r)&&l&&(a?ci(i,s)&&Ri(e,"set",n,i):Ri(e,"add",n,i)),l}deleteProperty(e,n){const i=Tt(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&i&&Ri(e,"delete",n,void 0),r}has(e,n){const i=Reflect.has(e,n);return(!Hn(n)||!np.has(n))&&ln(e,"has",n),i}ownKeys(e){return ln(e,"iterate",rt(e)?"length":Mr),Reflect.ownKeys(e)}}class Zg extends ip{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Jg=new rp,Qg=new Zg,e_=new rp(!0);const cc=t=>t,Ro=t=>Reflect.getPrototypeOf(t);function t_(t,e,n){return function(...i){const r=this.__v_raw,s=St(r),o=as(s),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=r[t](...i),u=n?cc:e?ds:Kn;return!e&&ln(s,"iterate",l?lc:Mr),nn(Object.create(c),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}}})}}function Co(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function n_(t,e){const n={get(r){const s=this.__v_raw,o=St(s),a=St(r);t||(ci(r,a)&&ln(o,"get",r),ln(o,"get",a));const{has:l}=Ro(o),c=e?cc:t?ds:Kn;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!t&&ln(St(r),"iterate",Mr),r.size},has(r){const s=this.__v_raw,o=St(s),a=St(r);return t||(ci(r,a)&&ln(o,"has",r),ln(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=St(a),c=e?cc:t?ds:Kn;return!t&&ln(l,"iterate",Mr),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return nn(n,t?{add:Co("add"),set:Co("set"),delete:Co("delete"),clear:Co("clear")}:{add(r){const s=St(this),o=Ro(s),a=St(r),l=!e&&!Ln(r)&&!Bi(r)?a:r;return o.has.call(s,l)||ci(r,l)&&o.has.call(s,r)||ci(a,l)&&o.has.call(s,a)||(s.add(l),Ri(s,"add",l,l)),this},set(r,s){!e&&!Ln(s)&&!Bi(s)&&(s=St(s));const o=St(this),{has:a,get:l}=Ro(o);let c=a.call(o,r);c||(r=St(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?ci(s,u)&&Ri(o,"set",r,s):Ri(o,"add",r,s),this},delete(r){const s=St(this),{has:o,get:a}=Ro(s);let l=o.call(s,r);l||(r=St(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&Ri(s,"delete",r,void 0),c},clear(){const r=St(this),s=r.size!==0,o=r.clear();return s&&Ri(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=t_(r,t,e)}),n}function Pu(t,e){const n=n_(t,e);return(i,r,s)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?i:Reflect.get(Tt(n,r)&&r in i?n:i,r,s)}const i_={get:Pu(!1,!1)},r_={get:Pu(!1,!0)},s_={get:Pu(!0,!1)};const sp=new WeakMap,op=new WeakMap,ap=new WeakMap,o_=new WeakMap;function a_(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function un(t){return Bi(t)?t:Du(t,!1,Jg,i_,sp)}function lp(t){return Du(t,!1,e_,r_,op)}function uc(t){return Du(t,!0,Qg,s_,ap)}function Du(t,e,n,i,r){if(!Rt(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const s=r.get(t);if(s)return s;const o=a_(Ig(t));if(o===0)return t;const a=new Proxy(t,o===2?i:n);return r.set(t,a),a}function Li(t){return Bi(t)?Li(t.__v_raw):!!(t&&t.__v_isReactive)}function Bi(t){return!!(t&&t.__v_isReadonly)}function Ln(t){return!!(t&&t.__v_isShallow)}function za(t){return t?!!t.__v_raw:!1}function St(t){const e=t&&t.__v_raw;return e?St(e):t}function Lu(t){return!Tt(t,"__v_skip")&&Object.isExtensible(t)&&Hh(t,"__v_skip",!0),t}const Kn=t=>Rt(t)?un(t):t,ds=t=>Rt(t)?uc(t):t;function Gt(t){return t?t.__v_isRef===!0:!1}function Pe(t){return cp(t,!1)}function l_(t){return cp(t,!0)}function cp(t,e){return Gt(t)?t:new c_(t,e)}class c_{constructor(e,n){this.dep=new Cu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:St(e),this._value=n?e:Kn(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,i=this.__v_isShallow||Ln(e)||Bi(e);e=i?e:St(e),ci(e,n)&&(this._rawValue=e,this._value=i?e:Kn(e),this.dep.trigger())}}function En(t){return Gt(t)?t.value:t}const u_={get:(t,e,n)=>e==="__v_raw"?t:En(Reflect.get(t,e,n)),set:(t,e,n,i)=>{const r=t[e];return Gt(r)&&!Gt(n)?(r.value=n,!0):Reflect.set(t,e,n,i)}};function up(t){return Li(t)?t:new Proxy(t,u_)}function f_(t){const e=rt(t)?new Array(t.length):{};for(const n in t)e[n]=h_(t,n);return e}class d_{constructor(e,n,i){this._object=e,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0,this._key=Hn(n)?n:String(n),this._raw=St(e);let r=!0,s=e;if(!rt(e)||Hn(this._key)||!Fa(this._key))do r=!za(s)||Ln(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=En(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&Gt(this._raw[this._key])){const n=this._object[this._key];if(Gt(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return $g(this._raw,this._key)}}function h_(t,e,n){return new d_(t,e,n)}class p_{constructor(e,n,i){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Cu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=to-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Ot!==this)return jh(this,!0),!0}get value(){const e=this.dep.track();return Qh(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function m_(t,e,n=!1){let i,r;return ut(t)?i=t:(i=t.get,r=t.set),new p_(i,r,n)}const Po={},ma=new WeakMap;let mr;function g_(t,e=!1,n=mr){if(n){let i=ma.get(n);i||ma.set(n,i=[]),i.push(t)}}function __(t,e,n=Ut){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=n,c=b=>r?b:Ln(b)||r===!1||r===0?Ci(b,1):Ci(b);let u,f,d,h,_=!1,S=!1;if(Gt(t)?(f=()=>t.value,_=Ln(t)):Li(t)?(f=()=>c(t),_=!0):rt(t)?(S=!0,_=t.some(b=>Li(b)||Ln(b)),f=()=>t.map(b=>{if(Gt(b))return b.value;if(Li(b))return c(b);if(ut(b))return l?l(b,2):b()})):ut(t)?e?f=l?()=>l(t,2):t:f=()=>{if(d){Oi();try{d()}finally{Fi()}}const b=mr;mr=u;try{return l?l(t,3,[h]):t(h)}finally{mr=b}}:f=di,e&&r){const b=f,w=r===!0?1/0:r;f=()=>Ci(b(),w)}const m=qh(),p=()=>{u.stop(),m&&m.active&&Eu(m.effects,u)};if(s&&e){const b=e;e=(...w)=>{const T=b(...w);return p(),T}}let y=S?new Array(t.length).fill(Po):Po;const E=b=>{if(!(!(u.flags&1)||!u.dirty&&!b))if(e){const w=u.run();if(b||r||_||(S?w.some((T,C)=>ci(T,y[C])):ci(w,y))){d&&d();const T=mr;mr=u;try{const C=[w,y===Po?void 0:S&&y[0]===Po?[]:y,h];y=w,l?l(e,3,C):e(...C)}finally{mr=T}}}else u.run()};return a&&a(E),u=new Yh(f),u.scheduler=o?()=>o(E,!1):E,h=b=>g_(b,!1,u),d=u.onStop=()=>{const b=ma.get(u);if(b){if(l)l(b,4);else for(const w of b)w();ma.delete(u)}},e?i?E(!0):y=u.run():o?o(E.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function Ci(t,e=1/0,n){if(e<=0||!Rt(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Gt(t))Ci(t.value,e,n);else if(rt(t))for(let i=0;i<t.length;i++)Ci(t[i],e,n);else if(Ms(t)||as(t))t.forEach(i=>{Ci(i,e,n)});else if(kh(t)){for(const i in t)Ci(t[i],e,n);for(const i of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,i)&&Ci(t[i],e,n)}return t}function go(t,e,n,i){try{return i?t(...i):t()}catch(r){Ga(r,e,n)}}function jn(t,e,n,i){if(ut(t)){const r=go(t,e,n,i);return r&&Fh(r)&&r.catch(s=>{Ga(s,e,n)}),r}if(rt(t)){const r=[];for(let s=0;s<t.length;s++)r.push(jn(t[s],e,n,i));return r}}function Ga(t,e,n,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ut;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](t,l,c)===!1)return}a=a.parent}if(s){Oi(),go(s,null,10,[t,l,c]),Fi();return}}v_(t,n,r,i,o)}function v_(t,e,n,i=!0,r=!1){if(r)throw t;console.error(t)}const xn=[];let si=-1;const ls=[];let er=null,is=0;const fp=Promise.resolve();let ga=null;function _o(t){const e=ga||fp;return t?e.then(this?t.bind(this):t):e}function x_(t){let e=si+1,n=xn.length;for(;e<n;){const i=e+n>>>1,r=xn[i],s=io(r);s<t||s===t&&r.flags&2?e=i+1:n=i}return e}function Iu(t){if(!(t.flags&1)){const e=io(t),n=xn[xn.length-1];!n||!(t.flags&2)&&e>=io(n)?xn.push(t):xn.splice(x_(e),0,t),t.flags|=1,dp()}}function dp(){ga||(ga=fp.then(pp))}function b_(t){rt(t)?ls.push(...t):er&&t.id===-1?er.splice(is+1,0,t):t.flags&1||(ls.push(t),t.flags|=1),dp()}function Tf(t,e,n=si+1){for(;n<xn.length;n++){const i=xn[n];if(i&&i.flags&2){if(t&&i.id!==t.uid)continue;xn.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function hp(t){if(ls.length){const e=[...new Set(ls)].sort((n,i)=>io(n)-io(i));if(ls.length=0,er){er.push(...e);return}for(er=e,is=0;is<er.length;is++){const n=er[is];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}er=null,is=0}}const io=t=>t.id==null?t.flags&2?-1:1/0:t.id;function pp(t){try{for(si=0;si<xn.length;si++){const e=xn[si];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),go(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;si<xn.length;si++){const e=xn[si];e&&(e.flags&=-2)}si=-1,xn.length=0,hp(),ga=null,(xn.length||ls.length)&&pp()}}let Bn=null,mp=null;function _a(t){const e=Bn;return Bn=t,mp=t&&t.type.__scopeId||null,e}function fc(t,e=Bn,n){if(!e||t._n)return t;const i=(...r)=>{i._d&&ba(-1);const s=_a(e),o=Tr.length;let a;try{a=t(...r)}finally{for(let l=Tr.length;l>o;l--)Vp();_a(s),i._d&&ba(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Qe(t,e){if(Bn===null)return t;const n=qa(Bn),i=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[s,o,a,l=Ut]=e[r];s&&(ut(s)&&(s={mounted:s,updated:s}),s.deep&&Ci(o),i.push({dir:s,instance:n,value:o,oldValue:void 0,arg:a,modifiers:l}))}return t}function cr(t,e,n,i){const r=t.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(Oi(),jn(l,n,8,[t.el,a,t,e]),Fi())}}function ia(t,e){if(bn){let n=bn.provides;const i=bn.parent&&bn.parent.provides;i===n&&(n=bn.provides=Object.create(i)),n[t]=e}}function kn(t,e,n=!1){const i=Gp();if(i||Er){let r=Er?Er._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&ut(e)?e.call(i&&i.proxy):e}}function y_(){return!!(Gp()||Er)}const S_=Symbol.for("v-scx"),M_=()=>kn(S_);function sr(t,e,n){return gp(t,e,n)}function gp(t,e,n=Ut){const{immediate:i,deep:r,flush:s,once:o}=n,a=nn({},n),l=e&&i||!e&&s!=="post";let c;if(so){if(s==="sync"){const h=M_();c=h.__watcherHandles||(h.__watcherHandles=[])}else if(!l){const h=()=>{};return h.stop=di,h.resume=di,h.pause=di,h}}const u=bn;a.call=(h,_,S)=>jn(h,u,_,S);let f=!1;s==="post"?a.scheduler=h=>{Sn(h,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(h,_)=>{_?h():Iu(h)}),a.augmentJob=h=>{e&&(h.flags|=4),f&&(h.flags|=2,u&&(h.id=u.uid,h.i=u))};const d=__(t,e,a);return so&&(c?c.push(d):l&&d()),d}function E_(t,e,n){const i=this.proxy,r=zt(t)?t.includes(".")?_p(i,t):()=>i[t]:t.bind(i,i);let s;ut(e)?s=e:(s=e.handler,n=e);const o=vo(this),a=gp(r,s.bind(i),n);return o(),a}function _p(t,e){const n=e.split(".");return()=>{let i=t;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}const T_=Symbol("_vte"),A_=t=>t.__isTeleport,hl=Symbol("_leaveCb");function Uu(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Uu(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function vp(t,e){return ut(t)?nn({name:t.name},e,{setup:t}):t}function xp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Af(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const va=new WeakMap;function Ys(t,e,n,i,r=!1){if(rt(t)){t.forEach((S,m)=>Ys(S,e&&(rt(e)?e[m]:e),n,i,r));return}if(Ks(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Ys(t,e,n,i.component.subTree);return}const s=i.shapeFlag&4?qa(i.component):i.el,o=r?null:s,{i:a,r:l}=t,c=e&&e.r,u=a.refs===Ut?a.refs={}:a.refs,f=a.setupState,d=St(f),h=f===Ut?Oh:S=>Af(u,S)?!1:Tt(d,S),_=(S,m)=>!(m&&Af(u,m));if(c!=null&&c!==l){if(wf(e),zt(c))u[c]=null,h(c)&&(f[c]=null);else if(Gt(c)){const S=e;_(c,S.k)&&(c.value=null),S.k&&(u[S.k]=null)}}if(ut(l))go(l,a,12,[o,u]);else{const S=zt(l),m=Gt(l);if(S||m){const p=()=>{if(t.f){const y=S?h(l)?f[l]:u[l]:_()||!t.k?l.value:u[t.k];if(r)rt(y)&&Eu(y,s);else if(rt(y))y.includes(s)||y.push(s);else if(S)u[l]=[s],h(l)&&(f[l]=u[l]);else{const E=[s];_(l,t.k)&&(l.value=E),t.k&&(u[t.k]=E)}}else S?(u[l]=o,h(l)&&(f[l]=o)):m&&(_(l,t.k)&&(l.value=o),t.k&&(u[t.k]=o))};if(o){const y=()=>{p(),va.delete(t)};y.id=-1,va.set(t,y),Sn(y,n)}else wf(t),p()}}}function wf(t){const e=va.get(t);e&&(e.flags|=8,va.delete(t))}Va().requestIdleCallback;Va().cancelIdleCallback;const Ks=t=>!!t.type.__asyncLoader,bp=t=>t.type.__isKeepAlive;function w_(t,e){yp(t,"a",e)}function R_(t,e){yp(t,"da",e)}function yp(t,e,n=bn){const i=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(Wa(e,i,n),n){let r=n.parent;for(;r&&r.parent;)bp(r.parent.vnode)&&C_(i,e,n,r),r=r.parent}}function C_(t,e,n,i){const r=Wa(e,t,i,!0);Sp(()=>{Eu(i[e],r)},n)}function Wa(t,e,n=bn,i=!1){if(n){const r=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...o)=>{Oi();const a=vo(n),l=jn(e,n,t,o);return a(),Fi(),l});return i?r.unshift(s):r.push(s),s}}const Hi=t=>(e,n=bn)=>{(!so||t==="sp")&&Wa(t,(...i)=>e(...i),n)},P_=Hi("bm"),Qn=Hi("m"),D_=Hi("bu"),L_=Hi("u"),Nu=Hi("bum"),Sp=Hi("um"),I_=Hi("sp"),U_=Hi("rtg"),N_=Hi("rtc");function O_(t,e=bn){Wa("ec",t,e)}const F_=Symbol.for("v-ndc");function ht(t,e,n,i){let r;const s=n,o=rt(t);if(o||zt(t)){const a=o&&Li(t);let l=!1,c=!1;a&&(l=!Ln(t),c=Bi(t),t=Ha(t)),r=new Array(t.length);for(let u=0,f=t.length;u<f;u++)r[u]=e(l?c?ds(Kn(t[u])):Kn(t[u]):t[u],u,void 0,s)}else if(typeof t=="number"){r=new Array(t);for(let a=0;a<t;a++)r[a]=e(a+1,a,void 0,s)}else if(Rt(t))if(t[Symbol.iterator])r=Array.from(t,(a,l)=>e(a,l,void 0,s));else{const a=Object.keys(t);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=e(t[u],u,l,s)}}else r=[];return r}const dc=t=>t?Wp(t)?qa(t):dc(t.parent):null,js=nn(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>dc(t.parent),$root:t=>dc(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Ep(t),$forceUpdate:t=>t.f||(t.f=()=>{Iu(t.update)}),$nextTick:t=>t.n||(t.n=_o.bind(t.proxy)),$watch:t=>E_.bind(t)}),pl=(t,e)=>t!==Ut&&!t.__isScriptSetup&&Tt(t,e),B_={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=t;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return r[e];case 4:return n[e];case 3:return s[e]}else{if(pl(i,e))return o[e]=1,i[e];if(r!==Ut&&Tt(r,e))return o[e]=2,r[e];if(Tt(s,e))return o[e]=3,s[e];if(n!==Ut&&Tt(n,e))return o[e]=4,n[e];hc&&(o[e]=0)}}const c=js[e];let u,f;if(c)return e==="$attrs"&&ln(t.attrs,"get",""),c(t);if((u=a.__cssModules)&&(u=u[e]))return u;if(n!==Ut&&Tt(n,e))return o[e]=4,n[e];if(f=l.config.globalProperties,Tt(f,e))return f[e]},set({_:t},e,n){const{data:i,setupState:r,ctx:s}=t;return pl(r,e)?(r[e]=n,!0):i!==Ut&&Tt(i,e)?(i[e]=n,!0):Tt(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:i,appContext:r,props:s,type:o}},a){let l;return!!(n[a]||t!==Ut&&a[0]!=="$"&&Tt(t,a)||pl(e,a)||Tt(s,a)||Tt(i,a)||Tt(js,a)||Tt(r.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Tt(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Rf(t){return rt(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let hc=!0;function k_(t){const e=Ep(t),n=t.proxy,i=t.ctx;hc=!1,e.beforeCreate&&Cf(e.beforeCreate,t,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:h,updated:_,activated:S,deactivated:m,beforeDestroy:p,beforeUnmount:y,destroyed:E,unmounted:b,render:w,renderTracked:T,renderTriggered:C,errorCaptured:x,serverPrefetch:R,expose:O,inheritAttrs:M,components:I,directives:ce,filters:he}=e;if(c&&V_(c,i,null),o)for(const G in o){const oe=o[G];ut(oe)&&(i[G]=oe.bind(n))}if(r){const G=r.call(n,n);Rt(G)&&(t.data=un(G))}if(hc=!0,s)for(const G in s){const oe=s[G],_e=ut(oe)?oe.bind(n,n):ut(oe.get)?oe.get.bind(n,n):di,Ee=!ut(oe)&&ut(oe.set)?oe.set.bind(n):di,be=at({get:_e,set:Ee});Object.defineProperty(i,G,{enumerable:!0,configurable:!0,get:()=>be.value,set:Ce=>be.value=Ce})}if(a)for(const G in a)Mp(a[G],i,n,G);if(l){const G=ut(l)?l.call(n):l;Reflect.ownKeys(G).forEach(oe=>{ia(oe,G[oe])})}u&&Cf(u,t,"c");function ne(G,oe){rt(oe)?oe.forEach(_e=>G(_e.bind(n))):oe&&G(oe.bind(n))}if(ne(P_,f),ne(Qn,d),ne(D_,h),ne(L_,_),ne(w_,S),ne(R_,m),ne(O_,x),ne(N_,T),ne(U_,C),ne(Nu,y),ne(Sp,b),ne(I_,R),rt(O))if(O.length){const G=t.exposed||(t.exposed={});O.forEach(oe=>{Object.defineProperty(G,oe,{get:()=>n[oe],set:_e=>n[oe]=_e,enumerable:!0})})}else t.exposed||(t.exposed={});w&&t.render===di&&(t.render=w),M!=null&&(t.inheritAttrs=M),I&&(t.components=I),ce&&(t.directives=ce),R&&xp(t)}function V_(t,e,n=di){rt(t)&&(t=pc(t));for(const i in t){const r=t[i];let s;Rt(r)?"default"in r?s=kn(r.from||i,r.default,!0):s=kn(r.from||i):s=kn(r),Gt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function Cf(t,e,n){jn(rt(t)?t.map(i=>i.bind(e.proxy)):t.bind(e.proxy),e,n)}function Mp(t,e,n,i){let r=i.includes(".")?_p(n,i):()=>n[i];if(zt(t)){const s=e[t];ut(s)&&sr(r,s)}else if(ut(t))sr(r,t.bind(n));else if(Rt(t))if(rt(t))t.forEach(s=>Mp(s,e,n,i));else{const s=ut(t.handler)?t.handler.bind(n):e[t.handler];ut(s)&&sr(r,s,t)}}function Ep(t){const e=t.type,{mixins:n,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=t.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!n&&!i?l=e:(l={},r.length&&r.forEach(c=>xa(l,c,o,!0)),xa(l,e,o)),Rt(e)&&s.set(e,l),l}function xa(t,e,n,i=!1){const{mixins:r,extends:s}=e;s&&xa(t,s,n,!0),r&&r.forEach(o=>xa(t,o,n,!0));for(const o in e)if(!(i&&o==="expose")){const a=H_[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const H_={data:Pf,props:Df,emits:Df,methods:Hs,computed:Hs,beforeCreate:mn,created:mn,beforeMount:mn,mounted:mn,beforeUpdate:mn,updated:mn,beforeDestroy:mn,beforeUnmount:mn,destroyed:mn,unmounted:mn,activated:mn,deactivated:mn,errorCaptured:mn,serverPrefetch:mn,components:Hs,directives:Hs,watch:G_,provide:Pf,inject:z_};function Pf(t,e){return e?t?function(){return nn(ut(t)?t.call(this,this):t,ut(e)?e.call(this,this):e)}:e:t}function z_(t,e){return Hs(pc(t),pc(e))}function pc(t){if(rt(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function mn(t,e){return t?[...new Set([].concat(t,e))]:e}function Hs(t,e){return t?nn(Object.create(null),t,e):e}function Df(t,e){return t?rt(t)&&rt(e)?[...new Set([...t,...e])]:nn(Object.create(null),Rf(t),Rf(e??{})):e}function G_(t,e){if(!t)return e;if(!e)return t;const n=nn(Object.create(null),t);for(const i in e)n[i]=mn(t[i],e[i]);return n}function Tp(){return{app:null,config:{isNativeTag:Oh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let W_=0;function X_(t,e){return function(i,r=null){ut(i)||(i=nn({},i)),r!=null&&!Rt(r)&&(r=null);const s=Tp(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:W_++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:yv,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&ut(u.install)?(o.add(u),u.install(c,...f)):ut(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!l){const h=c._ceVNode||fn(i,r);return h.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),t(h,u,d),l=!0,c._container=u,u.__vue_app__=c,qa(h.component)}},onUnmount(u){a.push(u)},unmount(){l&&(jn(a,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Er;Er=c;try{return u()}finally{Er=f}}};return c}}let Er=null;const $_=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${qn(e)}Modifiers`]||t[`${Ir(e)}Modifiers`];function q_(t,e,...n){if(t.isUnmounted)return;const i=t.vnode.props||Ut;let r=n;const s=e.startsWith("update:"),o=s&&$_(i,e.slice(7));o&&(o.trim&&(r=n.map(u=>zt(u)?u.trim():u)),o.number&&(r=n.map(ka)));let a,l=i[a=ll(e)]||i[a=ll(qn(e))];!l&&s&&(l=i[a=ll(Ir(e))]),l&&jn(l,t,6,r);const c=i[a+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,jn(c,t,6,r)}}const Y_=new WeakMap;function Ap(t,e,n=!1){const i=n?Y_:e.emitsCache,r=i.get(t);if(r!==void 0)return r;const s=t.emits;let o={},a=!1;if(!ut(t)){const l=c=>{const u=Ap(c,e,!0);u&&(a=!0,nn(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!s&&!a?(Rt(t)&&i.set(t,null),null):(rt(s)?s.forEach(l=>o[l]=null):nn(o,s),Rt(t)&&i.set(t,o),o)}function Xa(t,e){return!t||!Na(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),Tt(t,e[0].toLowerCase()+e.slice(1))||Tt(t,Ir(e))||Tt(t,e))}function Lf(t){const{type:e,vnode:n,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:d,setupState:h,ctx:_,inheritAttrs:S}=t,m=_a(t);let p,y;try{if(n.shapeFlag&4){const b=r||i,w=b;p=ai(c.call(w,b,u,f,h,d,_)),y=a}else{const b=e;p=ai(b.length>1?b(f,{attrs:a,slots:o,emit:l}):b(f,null)),y=e.props?a:K_(a)}}catch(b){Tr.length=0,Ga(b,t,1),p=fn(or)}let E=p;if(y&&S!==!1){const b=Object.keys(y),{shapeFlag:w}=E;b.length&&w&7&&(s&&b.some(Oa)&&(y=j_(y,s)),E=hs(E,y,!1,!0))}return n.dirs&&(E=hs(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition&&Uu(E,n.transition),p=E,_a(m),p}const K_=t=>{let e;for(const n in t)(n==="class"||n==="style"||Na(n))&&((e||(e={}))[n]=t[n]);return e},j_=(t,e)=>{const n={};for(const i in t)(!Oa(i)||!(i.slice(9)in e))&&(n[i]=t[i]);return n};function Z_(t,e,n){const{props:i,children:r,component:s}=t,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return i?If(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(wp(o,i,d)&&!Xa(c,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?If(i,o,c):!0:!!o;return!1}function If(t,e,n){const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(wp(e,t,s)&&!Xa(n,s))return!0}return!1}function wp(t,e,n){const i=t[n],r=e[n];return n==="style"&&Rt(i)&&Rt(r)?!Es(i,r):i!==r}function J_({vnode:t,parent:e,suspense:n},i){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.suspense.vnode.el=r.el=i,t=r),r===t)(t=e.vnode).el=i,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=i)}const Rp={},Cp=()=>Object.create(Rp),Pp=t=>Object.getPrototypeOf(t)===Rp;function Q_(t,e,n,i=!1){const r={},s=Cp();t.propsDefaults=Object.create(null),Dp(t,e,r,s);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=i?r:lp(r):t.type.props?t.props=r:t.props=s,t.attrs=s}function ev(t,e,n,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=t,a=St(r),[l]=t.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Xa(t.emitsOptions,d))continue;const h=e[d];if(l)if(Tt(s,d))h!==s[d]&&(s[d]=h,c=!0);else{const _=qn(d);r[_]=mc(l,a,_,h,t,!1)}else h!==s[d]&&(s[d]=h,c=!0)}}}else{Dp(t,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!Tt(e,f)&&((u=Ir(f))===f||!Tt(e,u)))&&(l?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=mc(l,a,f,void 0,t,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!Tt(e,f))&&(delete s[f],c=!0)}c&&Ri(t.attrs,"set","")}function Dp(t,e,n,i){const[r,s]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(Xs(l))continue;const c=e[l];let u;r&&Tt(r,u=qn(l))?!s||!s.includes(u)?n[u]=c:(a||(a={}))[u]=c:Xa(t.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=St(n),c=a||Ut;for(let u=0;u<s.length;u++){const f=s[u];n[f]=mc(r,l,f,c[f],t,!Tt(c,f))}}return o}function mc(t,e,n,i,r,s){const o=t[n];if(o!=null){const a=Tt(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ut(l)){const{propsDefaults:c}=r;if(n in c)i=c[n];else{const u=vo(r);i=c[n]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(n,i)}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===Ir(n))&&(i=!0))}return i}const tv=new WeakMap;function Lp(t,e,n=!1){const i=n?tv:e.propsCache,r=i.get(t);if(r)return r;const s=t.props,o={},a=[];let l=!1;if(!ut(t)){const u=f=>{l=!0;const[d,h]=Lp(f,e,!0);nn(o,d),h&&a.push(...h)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!s&&!l)return Rt(t)&&i.set(t,os),os;if(rt(s))for(let u=0;u<s.length;u++){const f=qn(s[u]);Uf(f)&&(o[f]=Ut)}else if(s)for(const u in s){const f=qn(u);if(Uf(f)){const d=s[u],h=o[f]=rt(d)||ut(d)?{type:d}:nn({},d),_=h.type;let S=!1,m=!0;if(rt(_))for(let p=0;p<_.length;++p){const y=_[p],E=ut(y)&&y.name;if(E==="Boolean"){S=!0;break}else E==="String"&&(m=!1)}else S=ut(_)&&_.name==="Boolean";h[0]=S,h[1]=m,(S||Tt(h,"default"))&&a.push(f)}}const c=[o,a];return Rt(t)&&i.set(t,c),c}function Uf(t){return t[0]!=="$"&&!Xs(t)}const Ou=t=>t==="_"||t==="_ctx"||t==="$stable",Fu=t=>rt(t)?t.map(ai):[ai(t)],nv=(t,e,n)=>{if(e._n)return e;const i=fc((...r)=>Fu(e(...r)),n);return i._c=!1,i},Ip=(t,e,n)=>{const i=t._ctx;for(const r in t){if(Ou(r))continue;const s=t[r];if(ut(s))e[r]=nv(r,s,i);else if(s!=null){const o=Fu(s);e[r]=()=>o}}},Up=(t,e)=>{const n=Fu(e);t.slots.default=()=>n},Np=(t,e,n)=>{for(const i in e)(n||!Ou(i))&&(t[i]=e[i])},iv=(t,e,n)=>{const i=t.slots=Cp();if(t.vnode.shapeFlag&32){const r=e._;r?(Np(i,e,n),n&&Hh(i,"_",r,!0)):Ip(e,i)}else e&&Up(t,e)},rv=(t,e,n)=>{const{vnode:i,slots:r}=t;let s=!0,o=Ut;if(i.shapeFlag&32){const a=e._;a?n&&a===1?s=!1:Np(r,e,n):(s=!e.$stable,Ip(e,r)),o=e}else e&&(Up(t,e),o={default:1});if(s)for(const a in r)!Ou(a)&&o[a]==null&&delete r[a]},Sn=cv;function sv(t){return ov(t)}function ov(t,e){const n=Va();n.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:h=di,insertStaticContent:_}=t,S=(D,L,V,ee=null,z=null,te=null,Me=void 0,ye=null,Te=!!L.dynamicChildren)=>{if(D===L)return;D&&!Ls(D,L)&&(ee=F(D),Ce(D,z,te,!0),D=null),L.patchFlag===-2&&(Te=!1,L.dynamicChildren=null);const{type:me,ref:Fe,shapeFlag:U}=L;switch(me){case $a:m(D,L,V,ee);break;case or:p(D,L,V,ee);break;case gl:D==null&&y(L,V,ee,Me);break;case nt:I(D,L,V,ee,z,te,Me,ye,Te);break;default:U&1?w(D,L,V,ee,z,te,Me,ye,Te):U&6?ce(D,L,V,ee,z,te,Me,ye,Te):(U&64||U&128)&&me.process(D,L,V,ee,z,te,Me,ye,Te,j)}Fe!=null&&z?Ys(Fe,D&&D.ref,te,L||D,!L):Fe==null&&D&&D.ref!=null&&Ys(D.ref,null,te,D,!0)},m=(D,L,V,ee)=>{if(D==null)i(L.el=a(L.children),V,ee);else{const z=L.el=D.el;L.children!==D.children&&c(z,L.children)}},p=(D,L,V,ee)=>{D==null?i(L.el=l(L.children||""),V,ee):L.el=D.el},y=(D,L,V,ee)=>{[D.el,D.anchor]=_(D.children,L,V,ee,D.el,D.anchor)},E=({el:D,anchor:L},V,ee)=>{let z;for(;D&&D!==L;)z=d(D),i(D,V,ee),D=z;i(L,V,ee)},b=({el:D,anchor:L})=>{let V;for(;D&&D!==L;)V=d(D),r(D),D=V;r(L)},w=(D,L,V,ee,z,te,Me,ye,Te)=>{if(L.type==="svg"?Me="svg":L.type==="math"&&(Me="mathml"),D==null)T(L,V,ee,z,te,Me,ye,Te);else{const me=D.el&&D.el._isVueCE?D.el:null;try{me&&me._beginPatch(),R(D,L,z,te,Me,ye,Te)}finally{me&&me._endPatch()}}},T=(D,L,V,ee,z,te,Me,ye)=>{let Te,me;const{props:Fe,shapeFlag:U,transition:We,dirs:Ne}=D;if(Te=D.el=o(D.type,te,Fe&&Fe.is,Fe),U&8?u(Te,D.children):U&16&&x(D.children,Te,null,ee,z,ml(D,te),Me,ye),Ne&&cr(D,null,ee,"created"),C(Te,D,D.scopeId,Me,ee),Fe){for(const v in Fe)v!=="value"&&!Xs(v)&&s(Te,v,null,Fe[v],te,ee);"value"in Fe&&s(Te,"value",null,Fe.value,te),(me=Fe.onVnodeBeforeMount)&&ni(me,ee,D)}Ne&&cr(D,null,ee,"beforeMount");const P=av(z,We);P&&We.beforeEnter(Te),i(Te,L,V),((me=Fe&&Fe.onVnodeMounted)||P||Ne)&&Sn(()=>{me&&ni(me,ee,D),P&&We.enter(Te),Ne&&cr(D,null,ee,"mounted")},z)},C=(D,L,V,ee,z)=>{if(V&&h(D,V),ee)for(let te=0;te<ee.length;te++)h(D,ee[te]);if(z){let te=z.subTree;if(L===te||kp(te.type)&&(te.ssContent===L||te.ssFallback===L)){const Me=z.vnode;C(D,Me,Me.scopeId,Me.slotScopeIds,z.parent)}}},x=(D,L,V,ee,z,te,Me,ye,Te=0)=>{for(let me=Te;me<D.length;me++){const Fe=D[me]=ye?wi(D[me]):ai(D[me]);S(null,Fe,L,V,ee,z,te,Me,ye)}},R=(D,L,V,ee,z,te,Me)=>{const ye=L.el=D.el;let{patchFlag:Te,dynamicChildren:me,dirs:Fe}=L;Te|=D.patchFlag&16;const U=D.props||Ut,We=L.props||Ut;let Ne;if(V&&ur(V,!1),(Ne=We.onVnodeBeforeUpdate)&&ni(Ne,V,L,D),Fe&&cr(L,D,V,"beforeUpdate"),V&&ur(V,!0),me&&(!D.dynamicChildren||D.dynamicChildren.length!==me.length)&&(Te=0,Me=!1,me=null),(U.innerHTML&&We.innerHTML==null||U.textContent&&We.textContent==null)&&u(ye,""),me?O(D.dynamicChildren,me,ye,V,ee,ml(L,z),te):Me||oe(D,L,ye,null,V,ee,ml(L,z),te,!1),Te>0){if(Te&16)M(ye,U,We,V,z);else if(Te&2&&U.class!==We.class&&s(ye,"class",null,We.class,z),Te&4&&s(ye,"style",U.style,We.style,z),Te&8){const P=L.dynamicProps;for(let v=0;v<P.length;v++){const X=P[v],Z=U[X],ae=We[X];(ae!==Z||X==="value")&&s(ye,X,Z,ae,z,V)}}Te&1&&D.children!==L.children&&u(ye,L.children)}else!Me&&me==null&&M(ye,U,We,V,z);((Ne=We.onVnodeUpdated)||Fe)&&Sn(()=>{Ne&&ni(Ne,V,L,D),Fe&&cr(L,D,V,"updated")},ee)},O=(D,L,V,ee,z,te,Me)=>{for(let ye=0;ye<L.length;ye++){const Te=D[ye],me=L[ye],Fe=Te.el&&(Te.type===nt||!Ls(Te,me)||Te.shapeFlag&198)?f(Te.el):V;S(Te,me,Fe,null,ee,z,te,Me,!0)}},M=(D,L,V,ee,z)=>{if(L!==V){if(L!==Ut)for(const te in L)!Xs(te)&&!(te in V)&&s(D,te,L[te],null,z,ee);for(const te in V){if(Xs(te))continue;const Me=V[te],ye=L[te];Me!==ye&&te!=="value"&&s(D,te,ye,Me,z,ee)}"value"in V&&s(D,"value",L.value,V.value,z)}},I=(D,L,V,ee,z,te,Me,ye,Te)=>{const me=L.el=D?D.el:a(""),Fe=L.anchor=D?D.anchor:a("");let{patchFlag:U,dynamicChildren:We,slotScopeIds:Ne}=L;Ne&&(ye=ye?ye.concat(Ne):Ne),D==null?(i(me,V,ee),i(Fe,V,ee),x(L.children||[],V,Fe,z,te,Me,ye,Te)):U>0&&U&64&&We&&D.dynamicChildren&&D.dynamicChildren.length===We.length?(O(D.dynamicChildren,We,V,z,te,Me,ye),(L.key!=null||z&&L===z.subTree)&&Op(D,L,!0)):oe(D,L,V,Fe,z,te,Me,ye,Te)},ce=(D,L,V,ee,z,te,Me,ye,Te)=>{L.slotScopeIds=ye,D==null?L.shapeFlag&512?z.ctx.activate(L,V,ee,Me,Te):he(L,V,ee,z,te,Me,Te):Y(D,L,Te)},he=(D,L,V,ee,z,te,Me)=>{const ye=D.component=mv(D,ee,z);if(bp(D)&&(ye.ctx.renderer=j),gv(ye,!1,Me),ye.asyncDep){if(z&&z.registerDep(ye,ne,Me),!D.el){const Te=ye.subTree=fn(or);p(null,Te,L,V),D.placeholder=Te.el}}else ne(ye,D,L,V,z,te,Me)},Y=(D,L,V)=>{const ee=L.component=D.component;if(Z_(D,L,V))if(ee.asyncDep&&!ee.asyncResolved){G(ee,L,V);return}else ee.next=L,ee.update();else L.el=D.el,ee.vnode=L},ne=(D,L,V,ee,z,te,Me)=>{const ye=()=>{if(D.isMounted){let{next:U,bu:We,u:Ne,parent:P,vnode:v}=D;{const Le=Fp(D);if(Le){U&&(U.el=v.el,G(D,U,Me)),Le.asyncDep.then(()=>{Sn(()=>{D.isUnmounted||me()},z)});return}}let X=U,Z;ur(D,!1),U?(U.el=v.el,G(D,U,Me)):U=v,We&&na(We),(Z=U.props&&U.props.onVnodeBeforeUpdate)&&ni(Z,P,U,v),ur(D,!0);const ae=Lf(D),Ae=D.subTree;D.subTree=ae,S(Ae,ae,f(Ae.el),F(Ae),D,z,te),U.el=ae.el,X===null&&J_(D,ae.el),Ne&&Sn(Ne,z),(Z=U.props&&U.props.onVnodeUpdated)&&Sn(()=>ni(Z,P,U,v),z)}else{let U;const{el:We,props:Ne}=L,{bm:P,m:v,parent:X,root:Z,type:ae}=D,Ae=Ks(L);ur(D,!1),P&&na(P),!Ae&&(U=Ne&&Ne.onVnodeBeforeMount)&&ni(U,X,L),ur(D,!0);{Z.ce&&Z.ce._hasShadowRoot()&&Z.ce._injectChildStyle(ae,D.parent?D.parent.type:void 0);const Le=D.subTree=Lf(D);S(null,Le,V,ee,D,z,te),L.el=Le.el}if(v&&Sn(v,z),!Ae&&(U=Ne&&Ne.onVnodeMounted)){const Le=L;Sn(()=>ni(U,X,Le),z)}(L.shapeFlag&256||X&&Ks(X.vnode)&&X.vnode.shapeFlag&256)&&D.a&&Sn(D.a,z),D.isMounted=!0,L=V=ee=null}};D.scope.on();const Te=D.effect=new Yh(ye);D.scope.off();const me=D.update=Te.run.bind(Te),Fe=D.job=Te.runIfDirty.bind(Te);Fe.i=D,Fe.id=D.uid,Te.scheduler=()=>Iu(Fe),ur(D,!0),me()},G=(D,L,V)=>{L.component=D;const ee=D.vnode.props;D.vnode=L,D.next=null,ev(D,L.props,ee,V),rv(D,L.children,V),Oi(),Tf(D),Fi()},oe=(D,L,V,ee,z,te,Me,ye,Te=!1)=>{const me=D&&D.children,Fe=D?D.shapeFlag:0,U=L.children,{patchFlag:We,shapeFlag:Ne}=L;if(We>0){if(We&128){Ee(me,U,V,ee,z,te,Me,ye,Te);return}else if(We&256){_e(me,U,V,ee,z,te,Me,ye,Te);return}}Ne&8?(Fe&16&&k(me,z,te),U!==me&&u(V,U)):Fe&16?Ne&16?Ee(me,U,V,ee,z,te,Me,ye,Te):k(me,z,te,!0):(Fe&8&&u(V,""),Ne&16&&x(U,V,ee,z,te,Me,ye,Te))},_e=(D,L,V,ee,z,te,Me,ye,Te)=>{D=D||os,L=L||os;const me=D.length,Fe=L.length,U=Math.min(me,Fe);let We;for(We=0;We<U;We++){const Ne=L[We]=Te?wi(L[We]):ai(L[We]);S(D[We],Ne,V,null,z,te,Me,ye,Te)}me>Fe?k(D,z,te,!0,!1,U):x(L,V,ee,z,te,Me,ye,Te,U)},Ee=(D,L,V,ee,z,te,Me,ye,Te)=>{let me=0;const Fe=L.length;let U=D.length-1,We=Fe-1;for(;me<=U&&me<=We;){const Ne=D[me],P=L[me]=Te?wi(L[me]):ai(L[me]);if(Ls(Ne,P))S(Ne,P,V,null,z,te,Me,ye,Te);else break;me++}for(;me<=U&&me<=We;){const Ne=D[U],P=L[We]=Te?wi(L[We]):ai(L[We]);if(Ls(Ne,P))S(Ne,P,V,null,z,te,Me,ye,Te);else break;U--,We--}if(me>U){if(me<=We){const Ne=We+1,P=Ne<Fe?L[Ne].el:ee;for(;me<=We;)S(null,L[me]=Te?wi(L[me]):ai(L[me]),V,P,z,te,Me,ye,Te),me++}}else if(me>We)for(;me<=U;)Ce(D[me],z,te,!0),me++;else{const Ne=me,P=me,v=new Map;for(me=P;me<=We;me++){const De=L[me]=Te?wi(L[me]):ai(L[me]);De.key!=null&&v.set(De.key,me)}let X,Z=0;const ae=We-P+1;let Ae=!1,Le=0;const pe=new Array(ae);for(me=0;me<ae;me++)pe[me]=0;for(me=Ne;me<=U;me++){const De=D[me];if(Z>=ae){Ce(De,z,te,!0);continue}let Xe;if(De.key!=null)Xe=v.get(De.key);else for(X=P;X<=We;X++)if(pe[X-P]===0&&Ls(De,L[X])){Xe=X;break}Xe===void 0?Ce(De,z,te,!0):(pe[Xe-P]=me+1,Xe>=Le?Le=Xe:Ae=!0,S(De,L[Xe],V,null,z,te,Me,ye,Te),Z++)}const ge=Ae?lv(pe):os;for(X=ge.length-1,me=ae-1;me>=0;me--){const De=P+me,Xe=L[De],Oe=L[De+1],Ie=De+1<Fe?Oe.el||Bp(Oe):ee;pe[me]===0?S(null,Xe,V,Ie,z,te,Me,ye,Te):Ae&&(X<0||me!==ge[X]?be(Xe,V,Ie,2):X--)}}},be=(D,L,V,ee,z=null)=>{const{el:te,type:Me,transition:ye,children:Te,shapeFlag:me}=D;if(me&6){be(D.component.subTree,L,V,ee);return}if(me&128){D.suspense.move(L,V,ee);return}if(me&64){Me.move(D,L,V,j);return}if(Me===nt){i(te,L,V);for(let U=0;U<Te.length;U++)be(Te[U],L,V,ee);i(D.anchor,L,V);return}if(Me===gl){E(D,L,V);return}if(ee!==2&&me&1&&ye)if(ee===0)ye.persisted&&!te[hl]?i(te,L,V):(ye.beforeEnter(te),i(te,L,V),Sn(()=>ye.enter(te),z));else{const{leave:U,delayLeave:We,afterLeave:Ne}=ye,P=()=>{D.ctx.isUnmounted?r(te):i(te,L,V)},v=()=>{const X=te._isLeaving||!!te[hl];te._isLeaving&&te[hl](!0),ye.persisted&&!X?P():U(te,()=>{P(),Ne&&Ne()})};We?We(te,P,v):v()}else i(te,L,V)},Ce=(D,L,V,ee=!1,z=!1)=>{const{type:te,props:Me,ref:ye,children:Te,dynamicChildren:me,shapeFlag:Fe,patchFlag:U,dirs:We,cacheIndex:Ne,memo:P}=D;if(U===-2&&(z=!1),ye!=null&&(Oi(),Ys(ye,null,V,D,!0),Fi()),Ne!=null&&(L.renderCache[Ne]=void 0),Fe&256){L.ctx.deactivate(D);return}const v=Fe&1&&We,X=!Ks(D);let Z;if(X&&(Z=Me&&Me.onVnodeBeforeUnmount)&&ni(Z,L,D),Fe&6)xe(D.component,V,ee);else{if(Fe&128){D.suspense.unmount(V,ee);return}v&&cr(D,null,L,"beforeUnmount"),Fe&64?D.type.remove(D,L,V,j,ee):me&&!me.hasOnce&&(te!==nt||U>0&&U&64)?k(me,L,V,!1,!0):(te===nt&&U&384||!z&&Fe&16)&&k(Te,L,V),ee&&Re(D)}const ae=P!=null&&Ne==null;(X&&(Z=Me&&Me.onVnodeUnmounted)||v||ae)&&Sn(()=>{Z&&ni(Z,L,D),v&&cr(D,null,L,"unmounted"),ae&&(D.el=null)},V)},Re=D=>{const{type:L,el:V,anchor:ee,transition:z}=D;if(L===nt){we(V,ee);return}if(L===gl){b(D);return}const te=()=>{r(V),z&&!z.persisted&&z.afterLeave&&z.afterLeave()};if(D.shapeFlag&1&&z&&!z.persisted){const{leave:Me,delayLeave:ye}=z,Te=()=>Me(V,te);ye?ye(D.el,te,Te):Te()}else te()},we=(D,L)=>{let V;for(;D!==L;)V=d(D),r(D),D=V;r(L)},xe=(D,L,V)=>{const{bum:ee,scope:z,job:te,subTree:Me,um:ye,m:Te,a:me}=D;Nf(Te),Nf(me),ee&&na(ee),z.stop(),te&&(te.flags|=8,Ce(Me,D,L,V)),ye&&Sn(ye,L),Sn(()=>{D.isUnmounted=!0},L)},k=(D,L,V,ee=!1,z=!1,te=0)=>{for(let Me=te;Me<D.length;Me++)Ce(D[Me],L,V,ee,z)},F=D=>{if(D.shapeFlag&6)return F(D.component.subTree);if(D.shapeFlag&128)return D.suspense.next();const L=d(D.anchor||D.el),V=L&&L[T_];return V?d(V):L};let H=!1;const N=(D,L,V)=>{let ee;D==null?L._vnode&&(Ce(L._vnode,null,null,!0),ee=L._vnode.component):S(L._vnode||null,D,L,null,null,null,V),L._vnode=D,H||(H=!0,Tf(ee),hp(),H=!1)},j={p:S,um:Ce,m:be,r:Re,mt:he,mc:x,pc:oe,pbc:O,n:F,o:t};return{render:N,hydrate:void 0,createApp:X_(N)}}function ml({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function ur({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function av(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Op(t,e,n=!1){const i=t.children,r=e.children;if(rt(i)&&rt(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=wi(r[s]),a.el=o.el),!n&&a.patchFlag!==-2&&Op(o,a)),a.type===$a&&(a.patchFlag===-1&&(a=r[s]=wi(a)),a.el=o.el),a.type===or&&!a.el&&(a.el=o.el)}}function lv(t){const e=t.slice(),n=[0];let i,r,s,o,a;const l=t.length;for(i=0;i<l;i++){const c=t[i];if(c!==0){if(r=n[n.length-1],t[r]<c){e[i]=r,n.push(i);continue}for(s=0,o=n.length-1;s<o;)a=s+o>>1,t[n[a]]<c?s=a+1:o=a;c<t[n[s]]&&(s>0&&(e[i]=n[s-1]),n[s]=i)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=e[o];return n}function Fp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Fp(e)}function Nf(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function Bp(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?Bp(e.subTree):null}const kp=t=>t.__isSuspense;function cv(t,e){e&&e.pendingBranch?rt(t)?e.effects.push(...t):e.effects.push(t):b_(t)}const nt=Symbol.for("v-fgt"),$a=Symbol.for("v-txt"),or=Symbol.for("v-cmt"),gl=Symbol.for("v-stc"),Tr=[];let Dn=null;function ue(t=!1){Tr.push(Dn=t?null:[])}function Vp(){Tr.pop(),Dn=Tr[Tr.length-1]||null}let ro=1;function ba(t,e=!1){ro+=t,t<0&&Dn&&e&&(Dn.hasOnce=!0)}function Hp(t){return t.dynamicChildren=ro>0?Dn||os:null,Vp(),ro>0&&Dn&&Dn.push(t),t}function de(t,e,n,i,r,s){return Hp(g(t,e,n,i,r,s,!0))}function gc(t,e,n,i,r){return Hp(fn(t,e,n,i,r,!0))}function ya(t){return t?t.__v_isVNode===!0:!1}function Ls(t,e){return t.type===e.type&&t.key===e.key}const zp=({key:t})=>t??null,ra=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?zt(t)||Gt(t)||ut(t)?{i:Bn,r:t,k:e,f:!!n}:t:null);function g(t,e=null,n=null,i=0,r=null,s=t===nt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&zp(e),ref:e&&ra(e),scopeId:mp,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Bn};return a?(Sa(l,n),s&128&&t.normalize(l)):n&&(l.shapeFlag|=zt(n)?8:16),ro>0&&!o&&Dn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Dn.push(l),l}const fn=uv;function uv(t,e=null,n=null,i=0,r=null,s=!1){if((!t||t===F_)&&(t=or),ya(t)){const a=hs(t,e,!0);return n&&Sa(a,n),ro>0&&!s&&Dn&&(a.shapeFlag&6?Dn[Dn.indexOf(t)]=a:Dn.push(a)),a.patchFlag=-2,a}if(bv(t)&&(t=t.__vccOpts),e){e=fv(e);let{class:a,style:l}=e;a&&!zt(a)&&(e.class=cn(a)),Rt(l)&&(za(l)&&!rt(l)&&(l=nn({},l)),e.style=yn(l))}const o=zt(t)?1:kp(t)?128:A_(t)?64:Rt(t)?4:ut(t)?2:0;return g(t,e,n,i,r,o,s,!0)}function fv(t){return t?za(t)||Pp(t)?nn({},t):t:null}function hs(t,e,n=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=t,c=e?dv(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&zp(c),ref:e&&e.ref?n&&s?rt(s)?s.concat(ra(e)):[s,ra(e)]:ra(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==nt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&hs(t.ssContent),ssFallback:t.ssFallback&&hs(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&i&&Uu(u,l.clone(u)),u}function dt(t=" ",e=0){return fn($a,null,t,e)}function mt(t="",e=!1){return e?(ue(),gc(or,null,t)):fn(or,null,t)}function ai(t){return t==null||typeof t=="boolean"?fn(or):rt(t)?fn(nt,null,t.slice()):ya(t)?wi(t):fn($a,null,String(t))}function wi(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:hs(t)}function Sa(t,e){let n=0;const{shapeFlag:i}=t;if(e==null)e=null;else if(rt(e))n=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Sa(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Pp(e)?e._ctx=Bn:r===3&&Bn&&(Bn.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(ut(e)){if(i&65){Sa(t,{default:e});return}e={default:e,_ctx:Bn},n=32}else e=String(e),i&64?(n=16,e=[dt(e)]):n=8;t.children=e,t.shapeFlag|=n}function dv(...t){const e={};for(let n=0;n<t.length;n++){const i=t[n];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=cn([e.class,i.class]));else if(r==="style")e.style=yn([e.style,i.style]);else if(Na(r)){const s=e[r],o=i[r];o&&s!==o&&!(rt(s)&&s.includes(o))?e[r]=s?[].concat(s,o):o:o==null&&s==null&&!Oa(r)&&(e[r]=o)}else r!==""&&(e[r]=i[r])}return e}function ni(t,e,n,i=null){jn(t,e,7,[n,i])}const hv=Tp();let pv=0;function mv(t,e,n){const i=t.type,r=(e?e.appContext:t.appContext)||hv,s={uid:pv++,vnode:t,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Xh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Lp(i,r),emitsOptions:Ap(i,r),emit:null,emitted:null,propsDefaults:Ut,inheritAttrs:i.inheritAttrs,ctx:Ut,data:Ut,props:Ut,attrs:Ut,slots:Ut,refs:Ut,setupState:Ut,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=q_.bind(null,s),t.ce&&t.ce(s),s}let bn=null;const Gp=()=>bn||Bn;let Ma,_c;{const t=Va(),e=(n,i)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Ma=e("__VUE_INSTANCE_SETTERS__",n=>bn=n),_c=e("__VUE_SSR_SETTERS__",n=>so=n)}const vo=t=>{const e=bn;return Ma(t),t.scope.on(),()=>{t.scope.off(),Ma(e)}},Of=()=>{bn&&bn.scope.off(),Ma(null)};function Wp(t){return t.vnode.shapeFlag&4}let so=!1;function gv(t,e=!1,n=!1){e&&_c(e);const{props:i,children:r}=t.vnode,s=Wp(t);Q_(t,i,s,e),iv(t,r,n||e);const o=s?_v(t,e):void 0;return e&&_c(!1),o}function _v(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,B_);const{setup:i}=n;if(i){Oi();const r=t.setupContext=i.length>1?xv(t):null,s=vo(t),o=go(i,t,0,[t.props,r]),a=Fh(o);if(Fi(),s(),(a||t.sp)&&!Ks(t)&&xp(t),a){if(o.then(Of,Of),e)return o.then(l=>{Ff(t,l)}).catch(l=>{Ga(l,t,0)});t.asyncDep=o}else Ff(t,o)}else Xp(t)}function Ff(t,e,n){ut(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Rt(e)&&(t.setupState=up(e)),Xp(t)}function Xp(t,e,n){const i=t.type;t.render||(t.render=i.render||di);{const r=vo(t);Oi();try{k_(t)}finally{Fi(),r()}}}const vv={get(t,e){return ln(t,"get",""),t[e]}};function xv(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,vv),slots:t.slots,emit:t.emit,expose:e}}function qa(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(up(Lu(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in js)return js[n](t)},has(e,n){return n in e||n in js}})):t.proxy}function bv(t){return ut(t)&&"__vccOpts"in t}const at=(t,e)=>m_(t,e,so);function $p(t,e,n){try{ba(-1);const i=arguments.length;return i===2?Rt(e)&&!rt(e)?ya(e)?fn(t,null,[e]):fn(t,e):fn(t,null,e):(i>3?n=Array.prototype.slice.call(arguments,2):i===3&&ya(n)&&(n=[n]),fn(t,e,n))}finally{ba(1)}}const yv="3.5.40";let vc;const Bf=typeof window<"u"&&window.trustedTypes;if(Bf)try{vc=Bf.createPolicy("vue",{createHTML:t=>t})}catch{}const qp=vc?t=>vc.createHTML(t):t=>t,Sv="http://www.w3.org/2000/svg",Mv="http://www.w3.org/1998/Math/MathML",Ai=typeof document<"u"?document:null,kf=Ai&&Ai.createElement("template"),Ev={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const r=e==="svg"?Ai.createElementNS(Sv,t):e==="mathml"?Ai.createElementNS(Mv,t):n?Ai.createElement(t,{is:n}):Ai.createElement(t);return t==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:t=>Ai.createTextNode(t),createComment:t=>Ai.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Ai.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,r,s){const o=n?n.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{kf.innerHTML=qp(i==="svg"?`<svg>${t}</svg>`:i==="mathml"?`<math>${t}</math>`:t);const a=kf.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Tv=Symbol("_vtc");function Av(t,e,n){const i=t[Tv];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Vf=Symbol("_vod"),wv=Symbol("_vsh"),Rv=Symbol(""),Cv=/(?:^|;)\s*display\s*:/;function Pv(t,e,n){const i=t.style,r=zt(n);let s=!1;if(n&&!r){if(e)if(zt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&zs(i,a,"")}else for(const o in e)n[o]==null&&zs(i,o,"");for(const o in n){o==="display"&&(s=!0);const a=n[o];a!=null?Lv(t,o,!zt(e)&&e?e[o]:void 0,a)||zs(i,o,a):zs(i,o,"")}}else if(r){if(e!==n){const o=i[Rv];o&&(n+=";"+o),i.cssText=n,s=Cv.test(n)}}else e&&t.removeAttribute("style");Vf in t&&(t[Vf]=s?i.display:"",t[wv]&&(i.display="none"))}const Hf=/\s*!important$/;function zs(t,e,n){if(rt(n))n.forEach(i=>zs(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=Dv(t,e);Hf.test(n)?t.setProperty(Ir(i),n.replace(Hf,""),"important"):t[i]=n}}const zf=["Webkit","Moz","ms"],_l={};function Dv(t,e){const n=_l[e];if(n)return n;let i=qn(e);if(i!=="filter"&&i in t)return _l[e]=i;i=Vh(i);for(let r=0;r<zf.length;r++){const s=zf[r]+i;if(s in t)return _l[e]=s}return e}function Lv(t,e,n,i){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&zt(i)&&n===i}const Gf="http://www.w3.org/1999/xlink";function Wf(t,e,n,i,r,s=Hg(e)){i&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Gf,e.slice(6,e.length)):t.setAttributeNS(Gf,e,n):n==null||s&&!zh(n)?t.removeAttribute(e):t.setAttribute(e,s?"":Hn(n)?String(n):n)}function Xf(t,e,n,i,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?qp(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=zh(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function nr(t,e,n,i){t.addEventListener(e,n,i)}function Iv(t,e,n,i){t.removeEventListener(e,n,i)}const $f=Symbol("_vei");function Uv(t,e,n,i,r=null){const s=t[$f]||(t[$f]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=Fv(e);if(i){const c=s[e]=Vv(i,r);nr(t,a,c,l)}else o&&(Iv(t,a,o,l),s[e]=void 0)}}const Nv=/(Once|Passive|Capture)$/,Ov=/^on:?(?:Once|Passive|Capture)$/;function Fv(t){let e,n;for(;(n=t.match(Nv))&&!Ov.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):Ir(t.slice(2)),e]}let vl=0;const Bv=Promise.resolve(),kv=()=>vl||(Bv.then(()=>vl=0),vl=Date.now());function Vv(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;const r=n.value;if(rt(r)){const s=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{s.call(i),i._stopped=!0};const o=r.slice(),a=[i];for(let l=0;l<o.length&&!i._stopped;l++){const c=o[l];c&&jn(c,e,5,a)}}else jn(r,e,5,[i])};return n.value=t,n.attached=kv(),n}const qf=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Hv=(t,e,n,i,r,s)=>{const o=r==="svg";e==="class"?Av(t,i,o):e==="style"?Pv(t,n,i):Na(e)?Oa(e)||Uv(t,e,n,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):zv(t,e,i,o))?(Xf(t,e,i),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Wf(t,e,i,o,s,e!=="value")):t._isVueCE&&(Gv(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!zt(i)))?Xf(t,qn(e),i,s,e):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),Wf(t,e,i,o))};function zv(t,e,n,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in t&&qf(e)&&ut(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return qf(e)&&zt(n)?!1:e in t}function Gv(t,e){const n=t._def.props;if(!n)return!1;const i=qn(e);return Array.isArray(n)?n.some(r=>qn(r)===i):Object.keys(n).some(r=>qn(r)===i)}const ps=t=>{const e=t.props["onUpdate:modelValue"]||!1;return rt(e)?n=>na(e,n):e};function Wv(t){t.target.composing=!0}function Yf(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Ii=Symbol("_assign");function Kf(t,e,n){return e&&(t=t.trim()),n&&(t=ka(t)),t}const gt={created(t,{modifiers:{lazy:e,trim:n,number:i}},r){t[Ii]=ps(r);const s=i||r.props&&r.props.type==="number";nr(t,e?"change":"input",o=>{o.target.composing||t[Ii](Kf(t.value,n,s))}),(n||s)&&nr(t,"change",()=>{t.value=Kf(t.value,n,s)}),e||(nr(t,"compositionstart",Wv),nr(t,"compositionend",Yf),nr(t,"change",Yf))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:i,trim:r,number:s}},o){if(t[Ii]=ps(o),t.composing)return;const a=(s||t.type==="number")&&!/^0\d/.test(t.value)?ka(t.value):t.value,l=e??"";if(a===l)return;const c=t.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===t&&t.type!=="range"&&(i&&e===n||r&&t.value.trim()===l)||(t.value=l)}},Xv={deep:!0,created(t,e,n){t[Ii]=ps(n),nr(t,"change",()=>{const i=t._modelValue,r=oo(t),s=t.checked,o=t[Ii];if(rt(i)){const a=Tu(i,r),l=a!==-1;if(s&&!l)o(i.concat(r));else if(!s&&l){const c=[...i];c.splice(a,1),o(c)}}else if(Ms(i)){const a=new Set(i);s?a.add(r):a.delete(r),o(a)}else o(Yp(t,s))})},mounted:jf,beforeUpdate(t,e,n){t[Ii]=ps(n),jf(t,e,n)}};function jf(t,{value:e,oldValue:n},i){t._modelValue=e;let r;if(rt(e))r=Tu(e,i.props.value)>-1;else if(Ms(e))r=e.has(i.props.value);else{if(e===n)return;r=Es(e,Yp(t,!0))}t.checked!==r&&(t.checked=r)}const jt={deep:!0,created(t,{value:e,modifiers:{number:n}},i){t._modelValue=e,nr(t,"change",()=>{const r=Array.prototype.filter.call(t.options,s=>s.selected).map(s=>n?ka(oo(s)):oo(s));t[Ii](t.multiple?Ms(t._modelValue)?new Set(r):r:r[0]),t._assigning=!0,_o(()=>{t._assigning=!1})}),t[Ii]=ps(i)},mounted(t,{value:e}){Zf(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[Ii]=ps(n)},updated(t,{value:e}){t._assigning||Zf(t,e)}};function Zf(t,e){const n=t.multiple,i=rt(e);if(!(n&&!i&&!Ms(e))){for(let r=0,s=t.options.length;r<s;r++){const o=t.options[r],a=oo(o);if(n)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=e.some(c=>String(c)===String(a)):o.selected=Tu(e,a)>-1}else o.selected=e.has(a);else if(Es(oo(o),e)){t.selectedIndex!==r&&(t.selectedIndex=r);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function oo(t){return"_value"in t?t._value:t.value}function Yp(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const $v=["ctrl","shift","alt","meta"],qv={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>$v.some(n=>t[`${n}Key`]&&!e.includes(n))},Mn=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),i=e.join(".");return n[i]||(n[i]=((r,...s)=>{for(let o=0;o<e.length;o++){const a=qv[e[o]];if(a&&a(r,e))return}return t(r,...s)}))},Yv=nn({patchProp:Hv},Ev);let Jf;function Kv(){return Jf||(Jf=sv(Yv))}const jv=((...t)=>{const e=Kv().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=Jv(i);if(!r)return;const s=e._component;!ut(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,Zv(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function Zv(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Jv(t){return zt(t)?document.querySelector(t):t}let Kp;const Ya=t=>Kp=t,jp=Symbol();function xc(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var Zs;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Zs||(Zs={}));function Qv(){const t=$h(!0),e=t.run(()=>Pe({}));let n=[],i=[];const r=Lu({install(s){Ya(r),r._a=s,s.provide(jp,r),s.config.globalProperties.$pinia=r,i.forEach(o=>n.push(o)),i=[]},use(s){return this._a?n.push(s):i.push(s),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return r}const Zp=()=>{};function Qf(t,e,n,i=Zp){t.push(e);const r=()=>{const s=t.indexOf(e);s>-1&&(t.splice(s,1),i())};return!n&&qh()&&Gg(r),r}function kr(t,...e){t.slice().forEach(n=>{n(...e)})}const e0=t=>t(),ed=Symbol(),xl=Symbol();function bc(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,i)=>t.set(i,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const i=e[n],r=t[n];xc(r)&&xc(i)&&t.hasOwnProperty(n)&&!Gt(i)&&!Li(i)?t[n]=bc(r,i):t[n]=i}return t}const t0=Symbol();function n0(t){return!xc(t)||!t.hasOwnProperty(t0)}const{assign:Qi}=Object;function i0(t){return!!(Gt(t)&&t.effect)}function r0(t,e,n,i){const{state:r,actions:s,getters:o}=e,a=n.state.value[t];let l;function c(){a||(n.state.value[t]=r?r():{});const u=f_(n.state.value[t]);return Qi(u,s,Object.keys(o||{}).reduce((f,d)=>(f[d]=Lu(at(()=>{Ya(n);const h=n._s.get(t);return o[d].call(h,h)})),f),{}))}return l=Jp(t,c,e,n,i,!0),l}function Jp(t,e,n={},i,r,s){let o;const a=Qi({actions:{}},n),l={deep:!0};let c,u,f=[],d=[],h;const _=i.state.value[t];!s&&!_&&(i.state.value[t]={});let S;function m(x){let R;c=u=!1,typeof x=="function"?(x(i.state.value[t]),R={type:Zs.patchFunction,storeId:t,events:h}):(bc(i.state.value[t],x),R={type:Zs.patchObject,payload:x,storeId:t,events:h});const O=S=Symbol();_o().then(()=>{S===O&&(c=!0)}),u=!0,kr(f,R,i.state.value[t])}const p=s?function(){const{state:R}=n,O=R?R():{};this.$patch(M=>{Qi(M,O)})}:Zp;function y(){o.stop(),f=[],d=[],i._s.delete(t)}const E=(x,R="")=>{if(ed in x)return x[xl]=R,x;const O=function(){Ya(i);const M=Array.from(arguments),I=[],ce=[];function he(G){I.push(G)}function Y(G){ce.push(G)}kr(d,{args:M,name:O[xl],store:w,after:he,onError:Y});let ne;try{ne=x.apply(this&&this.$id===t?this:w,M)}catch(G){throw kr(ce,G),G}return ne instanceof Promise?ne.then(G=>(kr(I,G),G)).catch(G=>(kr(ce,G),Promise.reject(G))):(kr(I,ne),ne)};return O[ed]=!0,O[xl]=R,O},b={_p:i,$id:t,$onAction:Qf.bind(null,d),$patch:m,$reset:p,$subscribe(x,R={}){const O=Qf(f,x,R.detached,()=>M()),M=o.run(()=>sr(()=>i.state.value[t],I=>{(R.flush==="sync"?u:c)&&x({storeId:t,type:Zs.direct,events:h},I)},Qi({},l,R)));return O},$dispose:y},w=un(b);i._s.set(t,w);const C=(i._a&&i._a.runWithContext||e0)(()=>i._e.run(()=>(o=$h()).run(()=>e({action:E}))));for(const x in C){const R=C[x];if(Gt(R)&&!i0(R)||Li(R))s||(_&&n0(R)&&(Gt(R)?R.value=_[x]:bc(R,_[x])),i.state.value[t][x]=R);else if(typeof R=="function"){const O=E(R,x);C[x]=O,a.actions[x]=R}}return Qi(w,C),Qi(St(w),C),Object.defineProperty(w,"$state",{get:()=>i.state.value[t],set:x=>{m(R=>{Qi(R,x)})}}),i._p.forEach(x=>{Qi(w,o.run(()=>x({store:w,app:i._a,pinia:i,options:a})))}),_&&s&&n.hydrate&&n.hydrate(w.$state,_),c=!0,u=!0,w}function s0(t,e,n){let i,r;const s=typeof e=="function";i=t,r=s?n:e;function o(a,l){const c=y_();return a=a||(c?kn(jp,null):null),a&&Ya(a),a=Kp,a._s.has(i)||(s?Jp(i,e,r,a):r0(i,r,a)),a._s.get(i)}return o.$id=i,o}const rs=typeof document<"u";function Qp(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function o0(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&Qp(t.default)}const Et=Object.assign;function bl(t,e){const n={};for(const i in e){const r=e[i];n[i]=Zn(r)?r.map(t):t(r)}return n}const Js=()=>{},Zn=Array.isArray;function td(t,e){const n={};for(const i in t)n[i]=i in e?e[i]:t[i];return n}const em=/#/g,a0=/&/g,l0=/\//g,c0=/=/g,u0=/\?/g,tm=/\+/g,f0=/%5B/g,d0=/%5D/g,nm=/%5E/g,h0=/%60/g,im=/%7B/g,p0=/%7C/g,rm=/%7D/g,m0=/%20/g;function Bu(t){return t==null?"":encodeURI(""+t).replace(p0,"|").replace(f0,"[").replace(d0,"]")}function g0(t){return Bu(t).replace(im,"{").replace(rm,"}").replace(nm,"^")}function yc(t){return Bu(t).replace(tm,"%2B").replace(m0,"+").replace(em,"%23").replace(a0,"%26").replace(h0,"`").replace(im,"{").replace(rm,"}").replace(nm,"^")}function _0(t){return yc(t).replace(c0,"%3D")}function v0(t){return Bu(t).replace(em,"%23").replace(u0,"%3F")}function x0(t){return v0(t).replace(l0,"%2F")}function ao(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const b0=/\/$/,y0=t=>t.replace(b0,"");function yl(t,e,n="/"){let i,r={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=e.slice(0,l),s=e.slice(l,a>0?a:e.length),r=t(s.slice(1))),a>=0&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=T0(i??e,n),{fullPath:i+s+o,path:i,query:r,hash:ao(o)}}function S0(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function nd(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function M0(t,e,n){const i=e.matched.length-1,r=n.matched.length-1;return i>-1&&i===r&&ms(e.matched[i],n.matched[r])&&sm(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function ms(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function sm(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!E0(t[n],e[n]))return!1;return!0}function E0(t,e){return Zn(t)?id(t,e):Zn(e)?id(e,t):t?.valueOf()===e?.valueOf()}function id(t,e){return Zn(e)?t.length===e.length&&t.every((n,i)=>n===e[i]):t.length===1&&t[0]===e}function T0(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),i=t.split("/"),r=i[i.length-1];(r===".."||r===".")&&i.push("");let s=n.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+i.slice(o).join("/")}const Xi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Sc=(function(t){return t.pop="pop",t.push="push",t})({}),Sl=(function(t){return t.back="back",t.forward="forward",t.unknown="",t})({});function A0(t){if(!t)if(rs){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),y0(t)}const w0=/^[^#]+#/;function R0(t,e){return t.replace(w0,"#")+e}function C0(t,e){const n=document.documentElement.getBoundingClientRect(),i=t.getBoundingClientRect();return{behavior:e.behavior,left:i.left-n.left-(e.left||0),top:i.top-n.top-(e.top||0)}}const Ka=()=>({left:window.scrollX,top:window.scrollY});function P0(t){let e;if("el"in t){const n=t.el,i=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?i?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=C0(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function rd(t,e){return(history.state?history.state.position-e:-1)+t}const Mc=new Map;function D0(t,e){Mc.set(t,e)}function L0(t){const e=Mc.get(t);return Mc.delete(t),e}function I0(t){return typeof t=="string"||t&&typeof t=="object"}function om(t){return typeof t=="string"||typeof t=="symbol"}let Vt=(function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t})({});const am=Symbol("");Vt.MATCHER_NOT_FOUND+"",Vt.NAVIGATION_GUARD_REDIRECT+"",Vt.NAVIGATION_ABORTED+"",Vt.NAVIGATION_CANCELLED+"",Vt.NAVIGATION_DUPLICATED+"";function gs(t,e){return Et(new Error,{type:t,[am]:!0},e)}function bi(t,e){return t instanceof Error&&am in t&&(e==null||!!(t.type&e))}const U0=["params","query","hash"];function N0(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of U0)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function O0(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let i=0;i<n.length;++i){const r=n[i].replace(tm," "),s=r.indexOf("="),o=ao(s<0?r:r.slice(0,s)),a=s<0?null:ao(r.slice(s+1));if(o in e){let l=e[o];Zn(l)||(l=e[o]=[l]),l.push(a)}else e[o]=a}return e}function sd(t){let e="";for(let n in t){const i=t[n];if(n=_0(n),i==null){i!==void 0&&(e+=(e.length?"&":"")+n);continue}(Zn(i)?i.map(r=>r&&yc(r)):[i&&yc(i)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function F0(t){const e={};for(const n in t){const i=t[n];i!==void 0&&(e[n]=Zn(i)?i.map(r=>r==null?null:""+r):i==null?i:""+i)}return e}const B0=Symbol(""),od=Symbol(""),ja=Symbol(""),ku=Symbol(""),Ec=Symbol("");function Is(){let t=[];function e(i){return t.push(i),()=>{const r=t.indexOf(i);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function tr(t,e,n,i,r,s=o=>o()){const o=i&&(i.enterCallbacks[r]=i.enterCallbacks[r]||[]);return()=>new Promise((a,l)=>{const c=d=>{d===!1?l(gs(Vt.NAVIGATION_ABORTED,{from:n,to:e})):d instanceof Error?l(d):I0(d)?l(gs(Vt.NAVIGATION_GUARD_REDIRECT,{from:e,to:d})):(o&&i.enterCallbacks[r]===o&&typeof d=="function"&&o.push(d),a())},u=s(()=>t.call(i&&i.instances[r],e,n,c));let f=Promise.resolve(u);t.length<3&&(f=f.then(c)),f.catch(d=>l(d))})}function Ml(t,e,n,i,r=s=>s()){const s=[];for(const o of t)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(Qp(l)){const c=(l.__vccOpts||l)[e];c&&s.push(tr(c,n,i,o,a,r))}else{let c=l();s.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=o0(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const d=(f.__vccOpts||f)[e];return d&&tr(d,n,i,o,a,r)()}))}}return s}function k0(t,e){const n=[],i=[],r=[],s=Math.max(e.matched.length,t.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(t.matched.find(c=>ms(c,a))?i.push(a):n.push(a));const l=t.matched[o];l&&(e.matched.find(c=>ms(c,l))||r.push(l))}return[n,i,r]}let V0=()=>location.protocol+"//"+location.host;function lm(t,e){const{pathname:n,search:i,hash:r}=e,s=t.indexOf("#");if(s>-1){let o=r.includes(t.slice(s))?t.slice(s).length:1,a=r.slice(o);return a[0]!=="/"&&(a="/"+a),nd(a,"")}return nd(n,t)+i+r}function H0(t,e,n,i){let r=[],s=[],o=null;const a=({state:d})=>{const h=lm(t,location),_=n.value,S=e.value;let m=0;if(d){if(n.value=h,e.value=d,o&&o===_){o=null;return}m=S?d.position-S.position:0}else i(h);r.forEach(p=>{p(n.value,_,{delta:m,type:Sc.pop,direction:m?m>0?Sl.forward:Sl.back:Sl.unknown})})};function l(){o=n.value}function c(d){r.push(d);const h=()=>{const _=r.indexOf(d);_>-1&&r.splice(_,1)};return s.push(h),h}function u(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(Et({},d.state,{scroll:Ka()}),"")}}function f(){for(const d of s)d();s=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:f}}function ad(t,e,n,i=!1,r=!1){return{back:t,current:e,forward:n,replaced:i,position:window.history.length,scroll:r?Ka():null}}function z0(t){const{history:e,location:n}=window,i={value:lm(t,n)},r={value:e.state};r.value||s(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=t.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+l:V0()+t+l;try{e[u?"replaceState":"pushState"](c,"",d),r.value=c}catch(h){console.error(h),n[u?"replace":"assign"](d)}}function o(l,c){s(l,Et({},e.state,ad(r.value.back,l,r.value.forward,!0),c,{position:r.value.position}),!0),i.value=l}function a(l,c){const u=Et({},r.value,e.state,{forward:l,scroll:Ka()});s(u.current,u,!0),s(l,Et({},ad(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:r,push:a,replace:o}}function G0(t){t=A0(t);const e=z0(t),n=H0(t,e.state,e.location,e.replace);function i(s,o=!0){o||n.pauseListeners(),history.go(s)}const r=Et({location:"",base:t,go:i,createHref:R0.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}let xr=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t})({});var Yt=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t})(Yt||{});const W0={type:xr.Static,value:""},X0=/[a-zA-Z0-9_]/;function $0(t){if(!t)return[[]];if(t==="/")return[[W0]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(h){throw new Error(`ERR (${n})/"${c}": ${h}`)}let n=Yt.Static,i=n;const r=[];let s;function o(){s&&r.push(s),s=[]}let a=0,l,c="",u="";function f(){c&&(n===Yt.Static?s.push({type:xr.Static,value:c}):n===Yt.Param||n===Yt.ParamRegExp||n===Yt.ParamRegExpEnd?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:xr.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function d(){c+=l}for(;a<t.length;){if(l=t[a++],l==="\\"&&n!==Yt.ParamRegExp){i=n,n=Yt.EscapeNext;continue}switch(n){case Yt.Static:l==="/"?(c&&f(),o()):l===":"?(f(),n=Yt.Param):d();break;case Yt.EscapeNext:d(),n=i;break;case Yt.Param:l==="("?n=Yt.ParamRegExp:X0.test(l)?d():(f(),n=Yt.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Yt.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=Yt.ParamRegExpEnd:u+=l;break;case Yt.ParamRegExpEnd:f(),n=Yt.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===Yt.ParamRegExp&&e(`Unfinished custom RegExp for param "${c}"`),f(),o(),r}const ld="[^/]+?",q0={sensitive:!1,strict:!1,start:!0,end:!0};var vn=(function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t})(vn||{});const Y0=/[.+*?^${}()[\]/\\]/g;function K0(t,e){const n=Et({},q0,e),i=[];let r=n.start?"^":"";const s=[];for(const c of t){const u=c.length?[]:[vn.Root];n.strict&&!c.length&&(r+="/");for(let f=0;f<c.length;f++){const d=c[f];let h=vn.Segment+(n.sensitive?vn.BonusCaseSensitive:0);if(d.type===xr.Static)f||(r+="/"),r+=d.value.replace(Y0,"\\$&"),h+=vn.Static;else if(d.type===xr.Param){const{value:_,repeatable:S,optional:m,regexp:p}=d;s.push({name:_,repeatable:S,optional:m});const y=p||ld;if(y!==ld){h+=vn.BonusCustomRegExp;try{`${y}`}catch(b){throw new Error(`Invalid custom RegExp for param "${_}" (${y}): `+b.message)}}let E=S?`((?:${y})(?:/(?:${y}))*)`:`(${y})`;f||(E=m&&c.length<2?`(?:/${E})`:"/"+E),m&&(E+="?"),r+=E,h+=vn.Dynamic,m&&(h+=vn.BonusOptional),S&&(h+=vn.BonusRepeatable),y===".*"&&(h+=vn.BonusWildcard)}u.push(h)}i.push(u)}if(n.strict&&n.end){const c=i.length-1;i[c][i[c].length-1]+=vn.BonusStrict}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const h=u[d]||"",_=s[d-1];f[_.name]=h&&_.repeatable?h.split("/"):h}return f}function l(c){let u="",f=!1;for(const d of t){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const h of d)if(h.type===xr.Static)u+=h.value;else if(h.type===xr.Param){const{value:_,repeatable:S,optional:m}=h,p=_ in c?c[_]:"";if(Zn(p)&&!S)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const y=Zn(p)?p.join("/"):p;if(!y)if(m)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${_}"`);u+=y}}return u||"/"}return{re:o,score:i,keys:s,parse:a,stringify:l}}function j0(t,e){let n=0;for(;n<t.length&&n<e.length;){const i=e[n]-t[n];if(i)return i;n++}return t.length<e.length?t.length===1&&t[0]===vn.Static+vn.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===vn.Static+vn.Segment?1:-1:0}function cm(t,e){let n=0;const i=t.score,r=e.score;for(;n<i.length&&n<r.length;){const s=j0(i[n],r[n]);if(s)return s;n++}if(Math.abs(r.length-i.length)===1){if(cd(i))return 1;if(cd(r))return-1}return r.length-i.length}function cd(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Z0={strict:!1,end:!0,sensitive:!1};function J0(t,e,n){const i=K0($0(t.path),n),r=Et(i,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function Q0(t,e){const n=[],i=new Map;e=td(Z0,e);function r(f){return i.get(f)}function s(f,d,h){const _=!h,S=fd(f);S.aliasOf=h&&h.record;const m=td(e,f),p=[S];if("alias"in f){const b=typeof f.alias=="string"?[f.alias]:f.alias;for(const w of b)p.push(fd(Et({},S,{components:h?h.record.components:S.components,path:w,aliasOf:h?h.record:S})))}let y,E;for(const b of p){const{path:w}=b;if(d&&w[0]!=="/"){const T=d.record.path,C=T[T.length-1]==="/"?"":"/";b.path=d.record.path+(w&&C+w)}if(y=J0(b,d,m),h?h.alias.push(y):(E=E||y,E!==y&&E.alias.push(y),_&&f.name&&!dd(y)&&o(f.name)),um(y)&&l(y),S.children){const T=S.children;for(let C=0;C<T.length;C++)s(T[C],y,h&&h.children[C])}h=h||y}return E?()=>{o(E)}:Js}function o(f){if(om(f)){const d=i.get(f);d&&(i.delete(f),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(f);d>-1&&(n.splice(d,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function l(f){const d=nx(f,n);n.splice(d,0,f),f.record.name&&!dd(f)&&i.set(f.record.name,f)}function c(f,d){let h,_={},S,m;if("name"in f&&f.name){if(h=i.get(f.name),!h)throw gs(Vt.MATCHER_NOT_FOUND,{location:f});m=h.record.name,_=Et(ud(d.params,h.keys.filter(E=>!E.optional).concat(h.parent?h.parent.keys.filter(E=>E.optional):[]).map(E=>E.name)),f.params&&ud(f.params,h.keys.map(E=>E.name))),S=h.stringify(_)}else if(f.path!=null)S=f.path,h=n.find(E=>E.re.test(S)),h&&(_=h.parse(S),m=h.record.name);else{if(h=d.name?i.get(d.name):n.find(E=>E.re.test(d.path)),!h)throw gs(Vt.MATCHER_NOT_FOUND,{location:f,currentLocation:d});m=h.record.name,_=Et({},d.params,f.params),S=h.stringify(_)}const p=[];let y=h;for(;y;)p.unshift(y.record),y=y.parent;return{name:m,path:S,params:_,matched:p,meta:tx(p)}}t.forEach(f=>s(f));function u(){n.length=0,i.clear()}return{addRoute:s,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:r}}function ud(t,e){const n={};for(const i of e)i in t&&(n[i]=t[i]);return n}function fd(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:ex(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function ex(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const i in t.components)e[i]=typeof n=="object"?n[i]:n;return e}function dd(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function tx(t){return t.reduce((e,n)=>Et(e,n.meta),{})}function nx(t,e){let n=0,i=e.length;for(;n!==i;){const s=n+i>>1;cm(t,e[s])<0?i=s:n=s+1}const r=ix(t);return r&&(i=e.lastIndexOf(r,i-1)),i}function ix(t){let e=t;for(;e=e.parent;)if(um(e)&&cm(t,e)===0)return e}function um({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function hd(t){const e=kn(ja),n=kn(ku),i=at(()=>{const l=En(t.to);return e.resolve(l)}),r=at(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=n.matched;if(!u||!f.length)return-1;const d=f.findIndex(ms.bind(null,u));if(d>-1)return d;const h=pd(l[c-2]);return c>1&&pd(u)===h&&f[f.length-1].path!==h?f.findIndex(ms.bind(null,l[c-2])):d}),s=at(()=>r.value>-1&&ax(n.params,i.value.params)),o=at(()=>r.value>-1&&r.value===n.matched.length-1&&sm(n.params,i.value.params));function a(l={}){if(ox(l)){const c=e[En(t.replace)?"replace":"push"](En(t.to)).catch(Js);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:at(()=>i.value.href),isActive:s,isExactActive:o,navigate:a}}function rx(t){return t.length===1?t[0]:t}const sx=vp({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:hd,setup(t,{slots:e}){const n=un(hd(t)),{options:i}=kn(ja),r=at(()=>({[md(t.activeClass,i.linkActiveClass,"router-link-active")]:n.isActive,[md(t.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=e.default&&rx(e.default(n));return t.custom?s:$p("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},s)}}}),Tc=sx;function ox(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function ax(t,e){for(const n in e){const i=e[n],r=t[n];if(typeof i=="string"){if(i!==r)return!1}else if(!Zn(r)||r.length!==i.length||i.some((s,o)=>s.valueOf()!==r[o].valueOf()))return!1}return!0}function pd(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const md=(t,e,n)=>t??e??n,lx=vp({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const i=kn(Ec),r=at(()=>t.route||i.value),s=kn(od,0),o=at(()=>{let c=En(s);const{matched:u}=r.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=at(()=>r.value.matched[o.value]);ia(od,at(()=>o.value+1)),ia(B0,a),ia(Ec,r);const l=Pe();return sr(()=>[l.value,a.value,t.name],([c,u,f],[d,h,_])=>{u&&(u.instances[f]=c,h&&h!==u&&c&&c===d&&(u.leaveGuards.size||(u.leaveGuards=h.leaveGuards),u.updateGuards.size||(u.updateGuards=h.updateGuards))),c&&u&&(!h||!ms(u,h)||!d)&&(u.enterCallbacks[f]||[]).forEach(S=>S(c))},{flush:"post"}),()=>{const c=r.value,u=t.name,f=a.value,d=f&&f.components[u];if(!d)return gd(n.default,{Component:d,route:c});const h=f.props[u],_=h?h===!0?c.params:typeof h=="function"?h(c):h:null,m=$p(d,Et({},_,e,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return gd(n.default,{Component:m,route:c})||m}}});function gd(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const fm=lx;function cx(t){const e=Q0(t.routes,t),n=t.parseQuery||O0,i=t.stringifyQuery||sd,r=t.history,s=Is(),o=Is(),a=Is(),l=l_(Xi);let c=Xi;rs&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=bl.bind(null,F=>""+F),f=bl.bind(null,x0),d=bl.bind(null,ao);function h(F,H){let N,j;return om(F)?(N=e.getRecordMatcher(F),j=H):j=F,e.addRoute(j,N)}function _(F){const H=e.getRecordMatcher(F);H&&e.removeRoute(H)}function S(){return e.getRoutes().map(F=>F.record)}function m(F){return!!e.getRecordMatcher(F)}function p(F,H){if(H=Et({},H||l.value),typeof F=="string"){const V=yl(n,F,H.path),ee=e.resolve({path:V.path},H),z=r.createHref(V.fullPath);return Et(V,ee,{params:d(ee.params),hash:ao(V.hash),redirectedFrom:void 0,href:z})}let N;if(F.path!=null)N=Et({},F,{path:yl(n,F.path,H.path).path});else{const V=Et({},F.params);for(const ee in V)V[ee]==null&&delete V[ee];N=Et({},F,{params:f(V)}),H.params=f(H.params)}const j=e.resolve(N,H),J=F.hash||"";j.params=u(d(j.params));const D=S0(i,Et({},F,{hash:g0(J),path:j.path})),L=r.createHref(D);return Et({fullPath:D,hash:J,query:i===sd?F0(F.query):F.query||{}},j,{redirectedFrom:void 0,href:L})}function y(F){return typeof F=="string"?yl(n,F,l.value.path):Et({},F)}function E(F,H){if(c!==F)return gs(Vt.NAVIGATION_CANCELLED,{from:H,to:F})}function b(F){return C(F)}function w(F){return b(Et(y(F),{replace:!0}))}function T(F,H){const N=F.matched[F.matched.length-1];if(N&&N.redirect){const{redirect:j}=N;let J=typeof j=="function"?j(F,H):j;return typeof J=="string"&&(J=J.includes("?")||J.includes("#")?J=y(J):{path:J},J.params={}),Et({query:F.query,hash:F.hash,params:J.path!=null?{}:F.params},J)}}function C(F,H){const N=c=p(F),j=l.value,J=F.state,D=F.force,L=F.replace===!0,V=T(N,j);if(V)return C(Et(y(V),{state:typeof V=="object"?Et({},J,V.state):J,force:D,replace:L}),H||N);const ee=N;ee.redirectedFrom=H;let z;return!D&&M0(i,j,N)&&(z=gs(Vt.NAVIGATION_DUPLICATED,{to:ee,from:j}),be(j,j,!0,!1)),(z?Promise.resolve(z):O(ee,j)).catch(te=>bi(te)?bi(te,Vt.NAVIGATION_GUARD_REDIRECT)?te:Ee(te):oe(te,ee,j)).then(te=>{if(te){if(bi(te,Vt.NAVIGATION_GUARD_REDIRECT))return C(Et({replace:L},y(te.to),{state:typeof te.to=="object"?Et({},J,te.to.state):J,force:D}),H||ee)}else te=I(ee,j,!0,L,J);return M(ee,j,te),te})}function x(F,H){const N=E(F,H);return N?Promise.reject(N):Promise.resolve()}function R(F){const H=we.values().next().value;return H&&typeof H.runWithContext=="function"?H.runWithContext(F):F()}function O(F,H){let N;const[j,J,D]=k0(F,H);N=Ml(j.reverse(),"beforeRouteLeave",F,H);for(const V of j)V.leaveGuards.forEach(ee=>{N.push(tr(ee,F,H))});const L=x.bind(null,F,H);return N.push(L),k(N).then(()=>{N=[];for(const V of s.list())N.push(tr(V,F,H));return N.push(L),k(N)}).then(()=>{N=Ml(J,"beforeRouteUpdate",F,H);for(const V of J)V.updateGuards.forEach(ee=>{N.push(tr(ee,F,H))});return N.push(L),k(N)}).then(()=>{N=[];for(const V of D)if(V.beforeEnter)if(Zn(V.beforeEnter))for(const ee of V.beforeEnter)N.push(tr(ee,F,H));else N.push(tr(V.beforeEnter,F,H));return N.push(L),k(N)}).then(()=>(F.matched.forEach(V=>V.enterCallbacks={}),N=Ml(D,"beforeRouteEnter",F,H,R),N.push(L),k(N))).then(()=>{N=[];for(const V of o.list())N.push(tr(V,F,H));return N.push(L),k(N)}).catch(V=>bi(V,Vt.NAVIGATION_CANCELLED)?V:Promise.reject(V))}function M(F,H,N){a.list().forEach(j=>R(()=>j(F,H,N)))}function I(F,H,N,j,J){const D=E(F,H);if(D)return D;const L=H===Xi,V=rs?history.state:{};N&&(j||L?r.replace(F.fullPath,Et({scroll:L&&V&&V.scroll},J)):r.push(F.fullPath,J)),l.value=F,be(F,H,N,L),Ee()}let ce;function he(){ce||(ce=r.listen((F,H,N)=>{if(!xe.listening)return;const j=p(F),J=T(j,xe.currentRoute.value);if(J){C(Et(J,{replace:!0,force:!0}),j).catch(Js);return}c=j;const D=l.value;rs&&D0(rd(D.fullPath,N.delta),Ka()),O(j,D).catch(L=>bi(L,Vt.NAVIGATION_ABORTED|Vt.NAVIGATION_CANCELLED)?L:bi(L,Vt.NAVIGATION_GUARD_REDIRECT)?(C(Et(y(L.to),{force:!0}),j).then(V=>{bi(V,Vt.NAVIGATION_ABORTED|Vt.NAVIGATION_DUPLICATED)&&!N.delta&&N.type===Sc.pop&&r.go(-1,!1)}).catch(Js),Promise.reject()):(N.delta&&r.go(-N.delta,!1),oe(L,j,D))).then(L=>{L=L||I(j,D,!1),L&&(N.delta&&!bi(L,Vt.NAVIGATION_CANCELLED)?r.go(-N.delta,!1):N.type===Sc.pop&&bi(L,Vt.NAVIGATION_ABORTED|Vt.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),M(j,D,L)}).catch(Js)}))}let Y=Is(),ne=Is(),G;function oe(F,H,N){Ee(F);const j=ne.list();return j.length?j.forEach(J=>J(F,H,N)):console.error(F),Promise.reject(F)}function _e(){return G&&l.value!==Xi?Promise.resolve():new Promise((F,H)=>{Y.add([F,H])})}function Ee(F){return G||(G=!F,he(),Y.list().forEach(([H,N])=>F?N(F):H()),Y.reset()),F}function be(F,H,N,j){const{scrollBehavior:J}=t;if(!rs||!J)return Promise.resolve();const D=!N&&L0(rd(F.fullPath,0))||(j||!N)&&history.state&&history.state.scroll||null;return _o().then(()=>J(F,H,D)).then(L=>L&&P0(L)).catch(L=>oe(L,F,H))}const Ce=F=>r.go(F);let Re;const we=new Set,xe={currentRoute:l,listening:!0,addRoute:h,removeRoute:_,clearRoutes:e.clearRoutes,hasRoute:m,getRoutes:S,resolve:p,options:t,push:b,replace:w,go:Ce,back:()=>Ce(-1),forward:()=>Ce(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:ne.add,isReady:_e,install(F){F.component("RouterLink",Tc),F.component("RouterView",fm),F.config.globalProperties.$router=xe,Object.defineProperty(F.config.globalProperties,"$route",{enumerable:!0,get:()=>En(l)}),rs&&!Re&&l.value===Xi&&(Re=!0,b(r.location).catch(j=>{}));const H={};for(const j in Xi)Object.defineProperty(H,j,{get:()=>l.value[j],enumerable:!0});F.provide(ja,xe),F.provide(ku,lp(H)),F.provide(Ec,l);const N=F.unmount;we.add(F),F.unmount=function(){we.delete(F),we.size<1&&(c=Xi,ce&&ce(),ce=null,l.value=Xi,Re=!1,G=!1),N()}}};function k(F){return F.reduce((H,N)=>H.then(()=>R(N)),Promise.resolve())}return xe}function xo(){return kn(ja)}function dm(t){return kn(ku)}function hm(t,e){return function(){return t.apply(e,arguments)}}const{toString:ux}=Object.prototype,{getPrototypeOf:_s}=Object,{iterator:bo,toStringTag:pm}=Symbol,Ea=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),lo=(t,e)=>{let n=t;const i=[];for(;n!=null&&n!==Object.prototype;){if(i.indexOf(n)!==-1)return!1;if(i.push(n),Ea(n,e))return!0;n=_s(n)}return!1},fx=(t,e)=>t!=null&&lo(t,e)?t[e]:void 0,Vu=(t=>e=>{const n=ux.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),ei=t=>(t=t.toLowerCase(),e=>Vu(e)===t),Za=t=>e=>typeof e===t,{isArray:wr}=Array,vs=Za("undefined");function Ts(t){return t!==null&&!vs(t)&&t.constructor!==null&&!vs(t.constructor)&&Tn(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const mm=ei("ArrayBuffer");function dx(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&mm(t.buffer),e}const hx=Za("string"),Tn=Za("function"),gm=Za("number"),As=t=>t!==null&&typeof t=="object",px=t=>t===!0||t===!1,sa=t=>{if(!As(t))return!1;const e=_s(t);return(e===null||e===Object.prototype||_s(e)===null)&&!lo(t,pm)&&!lo(t,bo)},mx=t=>{if(!As(t)||Ts(t))return!1;try{return Object.keys(t).length===0&&Object.getPrototypeOf(t)===Object.prototype}catch{return!1}},gx=ei("Date"),_x=ei("File"),vx=t=>!!(t&&typeof t.uri<"u"),xx=t=>t&&typeof t.getParts<"u",bx=ei("Blob"),yx=ei("FileList"),Sx=t=>As(t)&&Tn(t.pipe);function Mx(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const _d=Mx(),vd=typeof _d.FormData<"u"?_d.FormData:void 0,Ex=t=>{if(!t)return!1;if(vd&&t instanceof vd)return!0;const e=_s(t);if(!e||e===Object.prototype||!Tn(t.append))return!1;const n=Vu(t);return n==="formdata"||n==="object"&&Tn(t.toString)&&t.toString()==="[object FormData]"},Tx=ei("URLSearchParams"),[Ax,wx,Rx,Cx]=["ReadableStream","Request","Response","Headers"].map(ei),Px=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function yo(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let i,r;if(typeof t!="object"&&(t=[t]),wr(t))for(i=0,r=t.length;i<r;i++)e.call(null,t[i],i,t);else{if(Ts(t))return;const s=n?Object.getOwnPropertyNames(t):Object.keys(t),o=s.length;let a;for(i=0;i<o;i++)a=s[i],e.call(null,t[a],a,t)}}function _m(t,e){if(Ts(t))return null;e=e.toLowerCase();const n=Object.keys(t);let i=n.length,r;for(;i-- >0;)if(r=n[i],e===r.toLowerCase())return r;return null}const br=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,vm=t=>!vs(t)&&t!==br;function Ac(...t){const{caseless:e,skipUndefined:n}=vm(this)&&this||{},i={},r=(s,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const a=e&&typeof o=="string"&&_m(i,o)||o,l=Ea(i,a)?i[a]:void 0;sa(l)&&sa(s)?i[a]=Ac(l,s):sa(s)?i[a]=Ac({},s):wr(s)?i[a]=s.slice():(!n||!vs(s))&&(i[a]=s)};for(let s=0,o=t.length;s<o;s++){const a=t[s];if(!a||Ts(a)||(yo(a,r),typeof a!="object"||wr(a)))continue;const l=Object.getOwnPropertySymbols(a);for(let c=0;c<l.length;c++){const u=l[c];zx.call(a,u)&&r(a[u],u)}}return i}const Dx=(t,e,n,{allOwnKeys:i}={})=>(yo(e,(r,s)=>{n&&Tn(r)?Object.defineProperty(t,s,{__proto__:null,value:hm(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(t,s,{__proto__:null,value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:i}),t),Lx=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Ix=(t,e,n,i)=>{t.prototype=Object.create(e.prototype,i),Object.defineProperty(t.prototype,"constructor",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(t,"super",{__proto__:null,value:e.prototype}),n&&Object.assign(t.prototype,n)},Ux=(t,e,n,i)=>{let r,s,o;const a={};if(e=e||{},t==null)return e;do{for(r=Object.getOwnPropertyNames(t),s=r.length;s-- >0;)o=r[s],(!i||i(o,t,e))&&!a[o]&&(e[o]=t[o],a[o]=!0);t=n!==!1&&_s(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},Nx=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const i=t.indexOf(e,n);return i!==-1&&i===n},Ox=t=>{if(!t)return null;if(wr(t))return t;let e=t.length;if(!gm(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},Fx=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&_s(Uint8Array)),Bx=(t,e)=>{const i=(t&&t[bo]).call(t);let r;for(;(r=i.next())&&!r.done;){const s=r.value;e.call(t,s[0],s[1])}},kx=(t,e)=>{let n;const i=[];for(;(n=t.exec(e))!==null;)i.push(n);return i},Vx=ei("HTMLFormElement"),Hx=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,i,r){return i.toUpperCase()+r}),{propertyIsEnumerable:zx}=Object.prototype,Gx=ei("RegExp"),xm=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),i={};yo(n,(r,s)=>{let o;(o=e(r,s,t))!==!1&&(i[s]=o||r)}),Object.defineProperties(t,i)},Wx=t=>{xm(t,(e,n)=>{if(Tn(t)&&["arguments","caller","callee"].includes(n))return!1;const i=t[n];if(Tn(i)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Xx=(t,e)=>{const n={},i=r=>{r.forEach(s=>{n[s]=!0})};return wr(t)?i(t):i(String(t).split(e)),n},$x=()=>{},qx=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e;function Yx(t){return!!(t&&Tn(t.append)&&t[pm]==="FormData"&&t[bo])}const Kx=t=>{const e=new WeakSet,n=i=>{if(As(i)){if(e.has(i))return;if(Ts(i))return i;if(!("toJSON"in i)){e.add(i);const r=wr(i)?[]:{};return yo(i,(s,o)=>{const a=n(s);!vs(a)&&(r[o]=a)}),e.delete(i),r}}return i};return n(t)},jx=ei("AsyncFunction"),Zx=t=>t&&(As(t)||Tn(t))&&Tn(t.then)&&Tn(t.catch),bm=((t,e)=>t?setImmediate:e?((n,i)=>(br.addEventListener("message",({source:r,data:s})=>{r===br&&s===n&&i.length&&i.shift()()},!1),r=>{i.push(r),br.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Tn(br.postMessage)),Jx=typeof queueMicrotask<"u"?queueMicrotask.bind(br):typeof process<"u"&&process.nextTick||bm,ym=t=>t!=null&&Tn(t[bo]),Qx=t=>t!=null&&lo(t,bo)&&ym(t),q={isArray:wr,isArrayBuffer:mm,isBuffer:Ts,isFormData:Ex,isArrayBufferView:dx,isString:hx,isNumber:gm,isBoolean:px,isObject:As,isPlainObject:sa,isEmptyObject:mx,isReadableStream:Ax,isRequest:wx,isResponse:Rx,isHeaders:Cx,isUndefined:vs,isDate:gx,isFile:_x,isReactNativeBlob:vx,isReactNative:xx,isBlob:bx,isRegExp:Gx,isFunction:Tn,isStream:Sx,isURLSearchParams:Tx,isTypedArray:Fx,isFileList:yx,forEach:yo,merge:Ac,extend:Dx,trim:Px,stripBOM:Lx,inherits:Ix,toFlatObject:Ux,kindOf:Vu,kindOfTest:ei,endsWith:Nx,toArray:Ox,forEachEntry:Bx,matchAll:kx,isHTMLForm:Vx,hasOwnProperty:Ea,hasOwnProp:Ea,hasOwnInPrototypeChain:lo,getSafeProp:fx,reduceDescriptors:xm,freezeMethods:Wx,toObjectSet:Xx,toCamelCase:Hx,noop:$x,toFiniteNumber:qx,findKey:_m,global:br,isContextDefined:vm,isSpecCompliantForm:Yx,toJSONObject:Kx,isAsyncFn:jx,isThenable:Zx,setImmediate:bm,asap:Jx,isIterable:ym,isSafeIterable:Qx},eb=q.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),tb=t=>{const e={};let n,i,r;return t&&t.split(`
`).forEach(function(o){r=o.indexOf(":"),n=o.substring(0,r).trim().toLowerCase(),i=o.substring(r+1).trim(),!(!n||e[n]&&eb[n])&&(n==="set-cookie"?e[n]?e[n].push(i):e[n]=[i]:e[n]=e[n]?e[n]+", "+i:i)}),e};function nb(t){let e=0,n=t.length;for(;e<n;){const i=t.charCodeAt(e);if(i!==9&&i!==32)break;e+=1}for(;n>e;){const i=t.charCodeAt(n-1);if(i!==9&&i!==32)break;n-=1}return e===0&&n===t.length?t:t.slice(e,n)}const ib=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),rb=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function Hu(t,e){return q.isArray(t)?t.map(n=>Hu(n,e)):nb(String(t).replace(e,""))}const sb=t=>Hu(t,ib),ob=t=>Hu(t,rb);function Sm(t){const e=Object.create(null);return q.forEach(t.toJSON(),(n,i)=>{e[i]=ob(n)}),e}const xd=Symbol("internals");function Us(t){return t&&String(t).trim().toLowerCase()}function oa(t){return t===!1||t==null?t:q.isArray(t)?t.map(oa):sb(String(t))}function ab(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=n.exec(t);)e[i[1]]=i[2];return e}const lb=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function El(t,e,n,i,r){if(q.isFunction(i))return i.call(this,e,n);if(r&&(e=n),!!q.isString(e)){if(q.isString(i))return e.indexOf(i)!==-1;if(q.isRegExp(i))return i.test(e)}}function cb(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,i)=>n.toUpperCase()+i)}function ub(t,e){const n=q.toCamelCase(" "+e);["get","set","has"].forEach(i=>{Object.defineProperty(t,i+n,{__proto__:null,value:function(r,s,o){return this[i].call(this,e,r,s,o)},configurable:!0})})}let hn=class{constructor(e){e&&this.set(e)}set(e,n,i){const r=this;function s(a,l,c){const u=Us(l);if(!u)return;const f=q.findKey(r,u);(!f||r[f]===void 0||c===!0||c===void 0&&r[f]!==!1)&&(r[f||l]=oa(a))}const o=(a,l)=>q.forEach(a,(c,u)=>s(c,u,l));if(q.isPlainObject(e)||e instanceof this.constructor)o(e,n);else if(q.isString(e)&&(e=e.trim())&&!lb(e))o(tb(e),n);else if(q.isObject(e)&&q.isSafeIterable(e)){let a=Object.create(null),l,c;for(const u of e){if(!q.isArray(u))throw new TypeError("Object iterator must return a key-value pair");c=u[0],q.hasOwnProp(a,c)?(l=a[c],a[c]=q.isArray(l)?[...l,u[1]]:[l,u[1]]):a[c]=u[1]}o(a,n)}else e!=null&&s(n,e,i);return this}get(e,n){if(e=Us(e),e){const i=q.findKey(this,e);if(i){const r=this[i];if(!n)return r;if(n===!0)return ab(r);if(q.isFunction(n))return n.call(this,r,i);if(q.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Us(e),e){const i=q.findKey(this,e);return!!(i&&this[i]!==void 0&&(!n||El(this,this[i],i,n)))}return!1}delete(e,n){const i=this;let r=!1;function s(o){if(o=Us(o),o){const a=q.findKey(i,o);a&&(!n||El(i,i[a],a,n))&&(delete i[a],r=!0)}}return q.isArray(e)?e.forEach(s):s(e),r}clear(e){const n=Object.keys(this);let i=n.length,r=!1;for(;i--;){const s=n[i];(!e||El(this,this[s],s,e,!0))&&(delete this[s],r=!0)}return r}normalize(e){const n=this,i={};return q.forEach(this,(r,s)=>{const o=q.findKey(i,s);if(o){n[o]=oa(r),delete n[s];return}const a=e?cb(s):String(s).trim();a!==s&&delete n[s],n[a]=oa(r),i[a]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return q.forEach(this,(i,r)=>{i!=null&&i!==!1&&(n[r]=e&&q.isArray(i)?i.join(", "):i)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const i=new this(e);return n.forEach(r=>i.set(r)),i}static accessor(e){const i=(this[xd]=this[xd]={accessors:{}}).accessors,r=this.prototype;function s(o){const a=Us(o);i[a]||(ub(r,o),i[a]=!0)}return q.isArray(e)?e.forEach(s):s(e),this}};hn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);q.reduceDescriptors(hn.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(i){this[n]=i}}});q.freezeMethods(hn);const fb="[REDACTED ****]";function db(t){if(q.hasOwnProp(t,"toJSON"))return!0;let e=Object.getPrototypeOf(t);for(;e&&e!==Object.prototype;){if(q.hasOwnProp(e,"toJSON"))return!0;e=Object.getPrototypeOf(e)}return!1}function hb(t,e){const n=new Set(e.map(s=>String(s).toLowerCase())),i=[],r=s=>{if(s===null||typeof s!="object"||q.isBuffer(s))return s;if(i.indexOf(s)!==-1)return;s instanceof hn&&(s=s.toJSON()),i.push(s);let o;if(q.isArray(s))o=[],s.forEach((a,l)=>{const c=r(a);q.isUndefined(c)||(o[l]=c)});else{if(!q.isPlainObject(s)&&db(s))return i.pop(),s;o=Object.create(null);for(const[a,l]of Object.entries(s)){const c=n.has(a.toLowerCase())?fb:r(l);q.isUndefined(c)||(o[a]=c)}}return i.pop(),o};return r(t)}let Ve=class Mm extends Error{static from(e,n,i,r,s,o){const a=new Mm(e.message,n||e.code,i,r,s);return Object.defineProperty(a,"cause",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),a.name=e.name,e.status!=null&&a.status==null&&(a.status=e.status),o&&Object.assign(a,o),a}constructor(e,n,i,r,s){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),i&&(this.config=i),r&&(this.request=r),s&&(this.response=s,this.status=s.status)}toJSON(){const e=this.config,n=e&&q.hasOwnProp(e,"redact")?e.redact:void 0,i=q.isArray(n)&&n.length>0?hb(e,n):q.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:i,code:this.code,status:this.status}}};Ve.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Ve.ERR_BAD_OPTION="ERR_BAD_OPTION";Ve.ECONNABORTED="ECONNABORTED";Ve.ETIMEDOUT="ETIMEDOUT";Ve.ECONNREFUSED="ECONNREFUSED";Ve.ERR_NETWORK="ERR_NETWORK";Ve.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Ve.ERR_DEPRECATED="ERR_DEPRECATED";Ve.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Ve.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Ve.ERR_CANCELED="ERR_CANCELED";Ve.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Ve.ERR_INVALID_URL="ERR_INVALID_URL";Ve.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const pb=null,Em=100;function wc(t){return q.isPlainObject(t)||q.isArray(t)}function Tm(t){return q.endsWith(t,"[]")?t.slice(0,-2):t}function Tl(t,e,n){return t?t.concat(e).map(function(r,s){return r=Tm(r),!n&&s?"["+r+"]":r}).join(n?".":""):e}function mb(t){return q.isArray(t)&&!t.some(wc)}const gb=q.toFlatObject(q,{},null,function(e){return/^is[A-Z]/.test(e)});function Ja(t,e,n){if(!q.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=q.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,E){return!q.isUndefined(E[y])});const i=n.metaTokens,r=n.visitor||_,s=n.dots,o=n.indexes,a=n.Blob||typeof Blob<"u"&&Blob,l=n.maxDepth===void 0?Em:n.maxDepth,c=a&&q.isSpecCompliantForm(e),u=[];if(!q.isFunction(r))throw new TypeError("visitor must be a function");function f(p){if(p===null)return"";if(q.isDate(p))return p.toISOString();if(q.isBoolean(p))return p.toString();if(!c&&q.isBlob(p))throw new Ve("Blob is not supported. Use a Buffer instead.");if(q.isArrayBuffer(p)||q.isTypedArray(p)){if(c&&typeof a=="function")return new a([p]);if(typeof Buffer<"u")return Buffer.from(p);throw new Ve("Blob is not supported. Use a Buffer instead.",Ve.ERR_NOT_SUPPORT)}return p}function d(p){if(p>l)throw new Ve("Object is too deeply nested ("+p+" levels). Max depth: "+l,Ve.ERR_FORM_DATA_DEPTH_EXCEEDED)}function h(p,y){if(l===1/0)return JSON.stringify(p);const E=[];return JSON.stringify(p,function(w,T){if(!q.isObject(T))return T;for(;E.length&&E[E.length-1]!==this;)E.pop();return E.push(T),d(y+E.length-1),T})}function _(p,y,E){let b=p;if(q.isReactNative(e)&&q.isReactNativeBlob(p))return e.append(Tl(E,y,s),f(p)),!1;if(p&&!E&&typeof p=="object"){if(q.endsWith(y,"{}"))y=i?y:y.slice(0,-2),p=h(p,1);else if(q.isArray(p)&&mb(p)||(q.isFileList(p)||q.endsWith(y,"[]"))&&(b=q.toArray(p)))return y=Tm(y),b.forEach(function(T,C){!(q.isUndefined(T)||T===null)&&e.append(o===!0?Tl([y],C,s):o===null?y:y+"[]",f(T))}),!1}return wc(p)?!0:(e.append(Tl(E,y,s),f(p)),!1)}const S=Object.assign(gb,{defaultVisitor:_,convertValue:f,isVisitable:wc});function m(p,y,E=0){if(!q.isUndefined(p)){if(d(E),u.indexOf(p)!==-1)throw new Error("Circular reference detected in "+y.join("."));u.push(p),q.forEach(p,function(w,T){(!(q.isUndefined(w)||w===null)&&r.call(e,w,q.isString(T)?T.trim():T,y,S))===!0&&m(w,y?y.concat(T):[T],E+1)}),u.pop()}}if(!q.isObject(t))throw new TypeError("data must be an object");return m(t),e}function bd(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(t).replace(/[!'()~]|%20/g,function(i){return e[i]})}function zu(t,e){this._pairs=[],t&&Ja(t,this,e)}const Am=zu.prototype;Am.append=function(e,n){this._pairs.push([e,n])};Am.toString=function(e){const n=e?i=>e.call(this,i,bd):bd;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function _b(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function wm(t,e,n){if(!e)return t;t=t||"";const i=q.isFunction(n)?{serialize:n}:n,r=q.getSafeProp(i,"encode")||_b,s=q.getSafeProp(i,"serialize");let o;if(s?o=s(e,i):o=q.isURLSearchParams(e)?e.toString():new zu(e,i).toString(r),o){const a=t.indexOf("#");a!==-1&&(t=t.slice(0,a)),t+=(t.indexOf("?")===-1?"?":"&")+o}return t}class yd{constructor(){this.handlers=[]}use(e,n,i){return this.handlers.push({fulfilled:e,rejected:n,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){q.forEach(this.handlers,function(i){i!==null&&e(i)})}}const Gu={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},vb=typeof URLSearchParams<"u"?URLSearchParams:zu,xb=typeof FormData<"u"?FormData:null,bb=typeof Blob<"u"?Blob:null,yb={isBrowser:!0,classes:{URLSearchParams:vb,FormData:xb,Blob:bb},protocols:["http","https","file","blob","url","data"]},Wu=typeof window<"u"&&typeof document<"u",Rc=typeof navigator=="object"&&navigator||void 0,Sb=Wu&&(!Rc||["ReactNative","NativeScript","NS"].indexOf(Rc.product)<0),Mb=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Eb=Wu&&window.location.href||"http://localhost",Tb=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Wu,hasStandardBrowserEnv:Sb,hasStandardBrowserWebWorkerEnv:Mb,navigator:Rc,origin:Eb},Symbol.toStringTag,{value:"Module"})),en={...Tb,...yb};function Ab(t,e){return Ja(t,new en.classes.URLSearchParams,{visitor:function(n,i,r,s){return en.isNode&&q.isBuffer(n)?(this.append(i,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)},...e})}const Sd=Em;function Rm(t){if(t>Sd)throw new Ve("FormData field is too deeply nested ("+t+" levels). Max depth: "+Sd,Ve.ERR_FORM_DATA_DEPTH_EXCEEDED)}function wb(t){const e=[],n=/\w+|\[(\w*)]/g;let i;for(;(i=n.exec(t))!==null;)Rm(e.length),e.push(i[0]==="[]"?"":i[1]||i[0]);return e}function Rb(t){const e={},n=Object.keys(t);let i;const r=n.length;let s;for(i=0;i<r;i++)s=n[i],e[s]=t[s];return e}function Cm(t){function e(n,i,r,s){Rm(s);let o=n[s++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),l=s>=n.length;return o=!o&&q.isArray(r)?r.length:o,l?(q.hasOwnProp(r,o)?r[o]=q.isArray(r[o])?r[o].concat(i):[r[o],i]:r[o]=i,!a):((!q.hasOwnProp(r,o)||!q.isObject(r[o]))&&(r[o]=[]),e(n,i,r[o],s)&&q.isArray(r[o])&&(r[o]=Rb(r[o])),!a)}if(q.isFormData(t)&&q.isFunction(t.entries)){const n={};return q.forEachEntry(t,(i,r)=>{e(wb(i),r,n,0)}),n}return null}const Vr=(t,e)=>t!=null&&q.hasOwnProp(t,e)?t[e]:void 0;function Cb(t,e,n){if(q.isString(t))try{return(e||JSON.parse)(t),q.trim(t)}catch(i){if(i.name!=="SyntaxError")throw i}return(n||JSON.stringify)(t)}const So={transitional:Gu,adapter:["xhr","http","fetch"],transformRequest:[function(e,n){const i=n.getContentType()||"",r=i.indexOf("application/json")>-1,s=q.isObject(e);if(s&&q.isHTMLForm(e)&&(e=new FormData(e)),q.isFormData(e))return r?JSON.stringify(Cm(e)):e;if(q.isArrayBuffer(e)||q.isBuffer(e)||q.isStream(e)||q.isFile(e)||q.isBlob(e)||q.isReadableStream(e))return e;if(q.isArrayBufferView(e))return e.buffer;if(q.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(s){const l=Vr(this,"formSerializer");if(i.indexOf("application/x-www-form-urlencoded")>-1)return Ab(e,l).toString();if((a=q.isFileList(e))||i.indexOf("multipart/form-data")>-1){const c=Vr(this,"env"),u=c&&c.FormData;return Ja(a?{"files[]":e}:e,u&&new u,l)}}return s||r?(n.setContentType("application/json",!1),Cb(e)):e}],transformResponse:[function(e){const n=Vr(this,"transitional")||So.transitional,i=n&&n.forcedJSONParsing,r=Vr(this,"responseType"),s=r==="json";if(q.isResponse(e)||q.isReadableStream(e))return e;if(e&&q.isString(e)&&(i&&!r||s)){const a=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(e,Vr(this,"parseReviver"))}catch(l){if(a)throw l.name==="SyntaxError"?Ve.from(l,Ve.ERR_BAD_RESPONSE,this,null,Vr(this,"response")):l}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:en.classes.FormData,Blob:en.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};q.forEach(["delete","get","head","post","put","patch","query"],t=>{So.headers[t]={}});function Al(t,e){const n=this||So,i=e||n,r=hn.from(i.headers);let s=i.data;return q.forEach(t,function(a){s=a.call(n,s,r.normalize(),e?e.status:void 0)}),r.normalize(),s}function Pm(t){return!!(t&&t.__CANCEL__)}let Mo=class extends Ve{constructor(e,n,i){super(e??"canceled",Ve.ERR_CANCELED,n,i),this.name="CanceledError",this.__CANCEL__=!0}};function Dm(t,e,n){const i=n.config.validateStatus;!n.status||!i||i(n.status)?t(n):e(new Ve("Request failed with status code "+n.status,n.status>=400&&n.status<500?Ve.ERR_BAD_REQUEST:Ve.ERR_BAD_RESPONSE,n.config,n.request,n))}function Pb(t){const e=/^([-+\w]{1,25}):(?:\/\/)?/.exec(t);return e&&e[1]||""}function Db(t,e){t=t||10;const n=new Array(t),i=new Array(t);let r=0,s=0,o;return e=e!==void 0?e:1e3,function(l){const c=Date.now(),u=i[s];o||(o=c),n[r]=l,i[r]=c;let f=s,d=0;for(;f!==r;)d+=n[f++],f=f%t;if(r=(r+1)%t,r===s&&(s=(s+1)%t),c-o<e)return;const h=u&&c-u;return h?Math.round(d*1e3/h):void 0}}function Lb(t,e){let n=0,i=1e3/e,r,s;const o=(c,u=Date.now())=>{n=u,r=null,s&&(clearTimeout(s),s=null),t(...c)};return[(...c)=>{const u=Date.now(),f=u-n;f>=i?o(c,u):(r=c,s||(s=setTimeout(()=>{s=null,o(r)},i-f)))},()=>r&&o(r)]}const Ta=(t,e,n=3)=>{let i=0;const r=Db(50,250);return Lb(s=>{if(!s||typeof s.loaded!="number")return;const o=s.loaded,a=s.lengthComputable?s.total:void 0,l=a!=null?Math.min(o,a):o,c=Math.max(0,l-i),u=r(c);i=Math.max(i,l);const f={loaded:l,total:a,progress:a?l/a:void 0,bytes:c,rate:u||void 0,estimated:u&&a?(a-l)/u:void 0,event:s,lengthComputable:a!=null,[e?"download":"upload"]:!0};t(f)},n)},Md=(t,e)=>{const n=t!=null;return[i=>e[0]({lengthComputable:n,total:t,loaded:i}),e[1]]},Ed=t=>(...e)=>q.asap(()=>t(...e)),Ib=en.hasStandardBrowserEnv?((t,e)=>n=>(n=new URL(n,en.origin),t.protocol===n.protocol&&t.host===n.host&&(e||t.port===n.port)))(new URL(en.origin),en.navigator&&/(msie|trident)/i.test(en.navigator.userAgent)):()=>!0,Ub=en.hasStandardBrowserEnv?{write(t,e,n,i,r,s,o){if(typeof document>"u")return;const a=[`${t}=${encodeURIComponent(e)}`];q.isNumber(n)&&a.push(`expires=${new Date(n).toUTCString()}`),q.isString(i)&&a.push(`path=${i}`),q.isString(r)&&a.push(`domain=${r}`),s===!0&&a.push("secure"),q.isString(o)&&a.push(`SameSite=${o}`),document.cookie=a.join("; ")},read(t){if(typeof document>"u")return null;const e=document.cookie.split(";");for(let n=0;n<e.length;n++){const i=e[n].replace(/^\s+/,""),r=i.indexOf("=");if(r!==-1&&i.slice(0,r)===t)try{return decodeURIComponent(i.slice(r+1))}catch{return i.slice(r+1)}}return null},remove(t){this.write(t,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Nb(t){return typeof t!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Ob(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}const Fb=/^https?:(?!\/\/)/i,Bb=/[\t\n\r]/g;function kb(t){let e=0;for(;e<t.length&&t.charCodeAt(e)<=32;)e++;return t.slice(e)}function Vb(t){return kb(t).replace(Bb,"")}function Td(t,e){if(typeof t=="string"&&Fb.test(Vb(t)))throw new Ve('Invalid URL: missing "//" after protocol',Ve.ERR_INVALID_URL,e)}function Lm(t,e,n,i){Td(e,i);let r=!Nb(e);return t&&(r||n===!1)?(Td(t,i),Ob(t,e)):e}const Ad=t=>t instanceof hn?{...t}:t;function Rr(t,e){t=t||{},e=e||{};const n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function i(u,f,d,h){return q.isPlainObject(u)&&q.isPlainObject(f)?q.merge.call({caseless:h},u,f):q.isPlainObject(f)?q.merge({},f):q.isArray(f)?f.slice():f}function r(u,f,d,h){if(q.isUndefined(f)){if(!q.isUndefined(u))return i(void 0,u,d,h)}else return i(u,f,d,h)}function s(u,f){if(!q.isUndefined(f))return i(void 0,f)}function o(u,f){if(q.isUndefined(f)){if(!q.isUndefined(u))return i(void 0,u)}else return i(void 0,f)}function a(u){const f=q.hasOwnProp(e,"transitional")?e.transitional:void 0;if(!q.isUndefined(f))if(q.isPlainObject(f)){if(q.hasOwnProp(f,u))return f[u]}else return;const d=q.hasOwnProp(t,"transitional")?t.transitional:void 0;if(q.isPlainObject(d)&&q.hasOwnProp(d,u))return d[u]}function l(u,f,d){if(q.hasOwnProp(e,d))return i(u,f);if(q.hasOwnProp(t,d))return i(void 0,u)}const c={url:s,method:s,data:s,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:l,headers:(u,f,d)=>r(Ad(u),Ad(f),d,!0)};return q.forEach(Object.keys({...t,...e}),function(f){if(f==="__proto__"||f==="constructor"||f==="prototype")return;const d=q.hasOwnProp(c,f)?c[f]:r,h=q.hasOwnProp(t,f)?t[f]:void 0,_=q.hasOwnProp(e,f)?e[f]:void 0,S=d(h,_,f);q.isUndefined(S)&&d!==l||(n[f]=S)}),q.hasOwnProp(e,"validateStatus")&&q.isUndefined(e.validateStatus)&&a("validateStatusUndefinedResolves")===!1&&(q.hasOwnProp(t,"validateStatus")?n.validateStatus=i(void 0,t.validateStatus):delete n.validateStatus),n}const Hb=["content-type","content-length"];function zb(t,e,n){if(n!=="content-only"){t.set(e);return}Object.entries(e||{}).forEach(([i,r])=>{Hb.includes(i.toLowerCase())&&t.set(i,r)})}const Gb=t=>encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi,(e,n)=>String.fromCharCode(parseInt(n,16)));function Im(t){const e=Rr({},t),n=d=>q.hasOwnProp(e,d)?e[d]:void 0,i=n("data");let r=n("withXSRFToken");const s=n("xsrfHeaderName"),o=n("xsrfCookieName");let a=n("headers");const l=n("auth"),c=n("baseURL"),u=n("allowAbsoluteUrls"),f=n("url");if(e.headers=a=hn.from(a),e.url=wm(Lm(c,f,u,e),n("params"),n("paramsSerializer")),l){const d=q.getSafeProp(l,"username")||"",h=q.getSafeProp(l,"password")||"";try{a.set("Authorization","Basic "+btoa(d+":"+(h?Gb(h):"")))}catch(_){throw Ve.from(_,Ve.ERR_BAD_OPTION_VALUE,t)}}if(q.isFormData(i)&&(en.hasStandardBrowserEnv||en.hasStandardBrowserWebWorkerEnv||q.isReactNative(i)?a.setContentType(void 0):q.isFunction(i.getHeaders)&&zb(a,i.getHeaders(),n("formDataHeaderPolicy"))),en.hasStandardBrowserEnv&&(q.isFunction(r)&&(r=r(e)),r===!0||r==null&&Ib(e.url))){const h=s&&o&&Ub.read(o);h&&a.set(s,h)}return e}const Wb=typeof XMLHttpRequest<"u",Xb=Wb&&function(t){return new Promise(function(n,i){const r=Im(t);let s=r.data;const o=hn.from(r.headers).normalize();let{responseType:a,onUploadProgress:l,onDownloadProgress:c}=r,u,f,d,h,_;function S(){h&&h(),_&&_(),r.cancelToken&&r.cancelToken.unsubscribe(u),r.signal&&r.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(r.method.toUpperCase(),r.url,!0),m.timeout=r.timeout;function p(){if(!m)return;const E=hn.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),w={data:!a||a==="text"||a==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:E,config:t,request:m};Dm(function(C){n(C),S()},function(C){i(C),S()},w),m=null}"onloadend"in m?m.onloadend=p:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.startsWith("file:"))||setTimeout(p)},m.onabort=function(){m&&(i(new Ve("Request aborted",Ve.ECONNABORTED,t,m)),S(),m=null)},m.onerror=function(b){const w=b&&b.message?b.message:"Network Error",T=new Ve(w,Ve.ERR_NETWORK,t,m);T.event=b||null,i(T),S(),m=null},m.ontimeout=function(){let b=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const w=r.transitional||Gu;r.timeoutErrorMessage&&(b=r.timeoutErrorMessage),i(new Ve(b,w.clarifyTimeoutError?Ve.ETIMEDOUT:Ve.ECONNABORTED,t,m)),S(),m=null},s===void 0&&o.setContentType(null),"setRequestHeader"in m&&q.forEach(Sm(o),function(b,w){m.setRequestHeader(w,b)}),q.isUndefined(r.withCredentials)||(m.withCredentials=!!r.withCredentials),a&&a!=="json"&&(m.responseType=r.responseType),c&&([d,_]=Ta(c,!0),m.addEventListener("progress",d)),l&&m.upload&&([f,h]=Ta(l),m.upload.addEventListener("progress",f),m.upload.addEventListener("loadend",h)),(r.cancelToken||r.signal)&&(u=E=>{m&&(i(!E||E.type?new Mo(null,t,m):E),m.abort(),S(),m=null)},r.cancelToken&&r.cancelToken.subscribe(u),r.signal&&(r.signal.aborted?u():r.signal.addEventListener("abort",u)));const y=Pb(r.url);if(y&&!en.protocols.includes(y)){i(new Ve("Unsupported protocol "+y+":",Ve.ERR_BAD_REQUEST,t)),S();return}m.send(s||null)})},$b=(t,e)=>{if(t=t?t.filter(Boolean):[],!e&&!t.length)return;const n=new AbortController;let i=!1;const r=function(l){if(!i){i=!0,o();const c=l instanceof Error?l:this.reason;n.abort(c instanceof Ve?c:new Mo(c instanceof Error?c.message:c))}};let s=e&&setTimeout(()=>{s=null,r(new Ve(`timeout of ${e}ms exceeded`,Ve.ETIMEDOUT))},e);const o=()=>{t&&(s&&clearTimeout(s),s=null,t.forEach(l=>{l.unsubscribe?l.unsubscribe(r):l.removeEventListener("abort",r)}),t=null)};t.forEach(l=>l.addEventListener("abort",r,{once:!0}));const{signal:a}=n;return a.unsubscribe=()=>q.asap(o),a},qb=function*(t,e){let n=t.byteLength;if(n<e){yield t;return}let i=0,r;for(;i<n;)r=i+e,yield t.slice(i,r),i=r},Yb=async function*(t,e){for await(const n of Kb(t))yield*qb(n,e)},Kb=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:n,value:i}=await e.read();if(n)break;yield i}}finally{await e.cancel()}},wd=(t,e,n,i)=>{const r=Yb(t,e);let s=0,o,a=l=>{o||(o=!0,i&&i(l))};return new ReadableStream({async pull(l){try{const{done:c,value:u}=await r.next();if(c){a(),l.close();return}let f=u.byteLength;if(n){let d=s+=f;n(d)}l.enqueue(new Uint8Array(u))}catch(c){throw a(c),c}},cancel(l){return a(l),r.return()}},{highWaterMark:2})},Aa=t=>t>=48&&t<=57||t>=65&&t<=70||t>=97&&t<=102,jb=(t,e,n)=>e+2<n&&Aa(t.charCodeAt(e+1))&&Aa(t.charCodeAt(e+2));function Zb(t){if(!t||typeof t!="string"||!t.startsWith("data:"))return 0;const e=t.indexOf(",");if(e<0)return 0;const n=t.slice(5,e),i=t.slice(e+1);if(/;base64/i.test(n)){let o=i.length;const a=i.length;for(let h=0;h<a;h++)if(i.charCodeAt(h)===37&&h+2<a){const _=i.charCodeAt(h+1),S=i.charCodeAt(h+2);Aa(_)&&Aa(S)&&(o-=2,h+=2)}let l=0,c=a-1;const u=h=>h>=2&&i.charCodeAt(h-2)===37&&i.charCodeAt(h-1)===51&&(i.charCodeAt(h)===68||i.charCodeAt(h)===100);c>=0&&(i.charCodeAt(c)===61?(l++,c--):u(c)&&(l++,c-=3)),l===1&&c>=0&&(i.charCodeAt(c)===61||u(c))&&l++;const d=Math.floor(o/4)*3-(l||0);return d>0?d:0}let s=0;for(let o=0,a=i.length;o<a;o++){const l=i.charCodeAt(o);if(l===37&&jb(i,o,a))s+=1,o+=2;else if(l<128)s+=1;else if(l<2048)s+=2;else if(l>=55296&&l<=56319&&o+1<a){const c=i.charCodeAt(o+1);c>=56320&&c<=57343?(s+=4,o++):s+=3}else s+=3}return s}const Xu="1.18.1",Rd=64*1024,{isFunction:Do}=q,Jb=t=>encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi,(e,n)=>String.fromCharCode(parseInt(n,16))),Cd=t=>{if(!q.isString(t))return t;try{return decodeURIComponent(t)}catch{return t}},Pd=(t,...e)=>{try{return!!t(...e)}catch{return!1}},Qb=t=>{const e=t.indexOf("://");let n=t;return e!==-1&&(n=n.slice(e+3)),n.includes("@")||n.includes(":")},ey=t=>{const e=q.global!==void 0&&q.global!==null?q.global:globalThis,{ReadableStream:n,TextEncoder:i}=e;t=q.merge.call({skipUndefined:!0},{Request:e.Request,Response:e.Response},t);const{fetch:r,Request:s,Response:o}=t,a=r?Do(r):typeof fetch=="function",l=Do(s),c=Do(o);if(!a)return!1;const u=a&&Do(n),f=a&&(typeof i=="function"?(p=>y=>p.encode(y))(new i):async p=>new Uint8Array(await new s(p).arrayBuffer())),d=l&&u&&Pd(()=>{let p=!1;const y=new s(en.origin,{body:new n,method:"POST",get duplex(){return p=!0,"half"}}),E=y.headers.has("Content-Type");return y.body!=null&&y.body.cancel(),p&&!E}),h=c&&u&&Pd(()=>q.isReadableStream(new o("").body)),_={stream:h&&(p=>p.body)};a&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!_[p]&&(_[p]=(y,E)=>{let b=y&&y[p];if(b)return b.call(y);throw new Ve(`Response type '${p}' is not supported`,Ve.ERR_NOT_SUPPORT,E)})});const S=async p=>{if(p==null)return 0;if(q.isBlob(p))return p.size;if(q.isSpecCompliantForm(p))return(await new s(en.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(q.isArrayBufferView(p)||q.isArrayBuffer(p))return p.byteLength;if(q.isURLSearchParams(p)&&(p=p+""),q.isString(p))return(await f(p)).byteLength},m=async(p,y)=>{const E=q.toFiniteNumber(p.getContentLength());return E??S(y)};return async p=>{let{url:y,method:E,data:b,signal:w,cancelToken:T,timeout:C,onDownloadProgress:x,onUploadProgress:R,responseType:O,headers:M,withCredentials:I="same-origin",fetchOptions:ce,maxContentLength:he,maxBodyLength:Y}=Im(p);const ne=q.isNumber(he)&&he>-1,G=q.isNumber(Y)&&Y>-1,oe=k=>q.hasOwnProp(p,k)?p[k]:void 0;let _e=r||fetch;O=O?(O+"").toLowerCase():"text";let Ee=$b([w,T&&T.toAbortSignal()],C),be=null;const Ce=Ee&&Ee.unsubscribe&&(()=>{Ee.unsubscribe()});let Re,we=null;const xe=()=>new Ve("Request body larger than maxBodyLength limit",Ve.ERR_BAD_REQUEST,p,be);try{let k;const F=oe("auth");if(F){const z=q.getSafeProp(F,"username")||"",te=q.getSafeProp(F,"password")||"";k={username:z,password:te}}if(Qb(y)){const z=new URL(y,en.origin);if(!k&&(z.username||z.password)){const te=Cd(z.username),Me=Cd(z.password);k={username:te,password:Me}}(z.username||z.password)&&(z.username="",z.password="",y=z.href)}if(k&&(M.delete("authorization"),M.set("Authorization","Basic "+btoa(Jb((k.username||"")+":"+(k.password||""))))),ne&&typeof y=="string"&&y.startsWith("data:")&&Zb(y)>he)throw new Ve("maxContentLength size of "+he+" exceeded",Ve.ERR_BAD_RESPONSE,p,be);if(G&&E!=="get"&&E!=="head"){const z=await S(b);if(typeof z=="number"&&isFinite(z)&&(Re=z,z>Y))throw xe()}const H=G&&(q.isReadableStream(b)||q.isStream(b)),N=(z,te,Me)=>wd(z,Rd,ye=>{if(G&&ye>Y)throw we=xe();te&&te(ye)},Me);if(d&&E!=="get"&&E!=="head"&&(R||H)){if(Re=Re??await m(M,b),Re!==0||H){let z=new s(y,{method:"POST",body:b,duplex:"half"}),te;if(q.isFormData(b)&&(te=z.headers.get("content-type"))&&M.setContentType(te),z.body){const[Me,ye]=R&&Md(Re,Ta(Ed(R)))||[];b=N(z.body,Me,ye)}}}else if(H&&!l&&u&&E!=="get"&&E!=="head")b=N(b);else if(H&&l&&!d&&E!=="get"&&E!=="head")throw new Ve("Stream request bodies are not supported by the current fetch implementation",Ve.ERR_NOT_SUPPORT,p,be);q.isString(I)||(I=I?"include":"omit");const j=l&&"credentials"in s.prototype;if(q.isFormData(b)){const z=M.getContentType();z&&/^multipart\/form-data/i.test(z)&&!/boundary=/i.test(z)&&M.delete("content-type")}M.set("User-Agent","axios/"+Xu,!1);const J={...ce,signal:Ee,method:E.toUpperCase(),headers:Sm(M.normalize()),body:b,duplex:"half",credentials:j?I:void 0};be=l&&new s(y,J);let D=await(l?_e(be,ce):_e(y,J));const L=hn.from(D.headers);if(ne){const z=q.toFiniteNumber(L.getContentLength());if(z!=null&&z>he)throw new Ve("maxContentLength size of "+he+" exceeded",Ve.ERR_BAD_RESPONSE,p,be)}const V=h&&(O==="stream"||O==="response");if(h&&D.body&&(x||ne||V&&Ce)){const z={};["status","statusText","headers"].forEach(Fe=>{z[Fe]=D[Fe]});const te=q.toFiniteNumber(L.getContentLength()),[Me,ye]=x&&Md(te,Ta(Ed(x),!0))||[];let Te=0;const me=Fe=>{if(ne&&(Te=Fe,Te>he))throw new Ve("maxContentLength size of "+he+" exceeded",Ve.ERR_BAD_RESPONSE,p,be);Me&&Me(Fe)};D=new o(wd(D.body,Rd,me,()=>{ye&&ye(),Ce&&Ce()}),z)}O=O||"text";let ee=await _[q.findKey(_,O)||"text"](D,p);if(ne&&!h&&!V){let z;if(ee!=null&&(typeof ee.byteLength=="number"?z=ee.byteLength:typeof ee.size=="number"?z=ee.size:typeof ee=="string"&&(z=typeof i=="function"?new i().encode(ee).byteLength:ee.length)),typeof z=="number"&&z>he)throw new Ve("maxContentLength size of "+he+" exceeded",Ve.ERR_BAD_RESPONSE,p,be)}return!V&&Ce&&Ce(),await new Promise((z,te)=>{Dm(z,te,{data:ee,headers:hn.from(D.headers),status:D.status,statusText:D.statusText,config:p,request:be})})}catch(k){if(Ce&&Ce(),Ee&&Ee.aborted&&Ee.reason instanceof Ve){const F=Ee.reason;throw F.config=p,be&&(F.request=be),k!==F&&Object.defineProperty(F,"cause",{__proto__:null,value:k,writable:!0,enumerable:!1,configurable:!0}),F}if(we)throw be&&!we.request&&(we.request=be),we;if(k instanceof Ve)throw be&&!k.request&&(k.request=be),k;if(k&&k.name==="TypeError"&&/Load failed|fetch/i.test(k.message)){const F=new Ve("Network Error",Ve.ERR_NETWORK,p,be,k&&k.response);throw Object.defineProperty(F,"cause",{__proto__:null,value:k.cause||k,writable:!0,enumerable:!1,configurable:!0}),F}throw Ve.from(k,k&&k.code,p,be,k&&k.response)}}},ty=new Map,Um=t=>{let e=t&&t.env||{};const{fetch:n,Request:i,Response:r}=e,s=[i,r,n];let o=s.length,a=o,l,c,u=ty;for(;a--;)l=s[a],c=u.get(l),c===void 0&&u.set(l,c=a?new Map:ey(e)),u=c;return c};Um();const $u={http:pb,xhr:Xb,fetch:{get:Um}};q.forEach($u,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{__proto__:null,value:e})}catch{}Object.defineProperty(t,"adapterName",{__proto__:null,value:e})}});const Dd=t=>`- ${t}`,ny=t=>q.isFunction(t)||t===null||t===!1;function iy(t,e){t=q.isArray(t)?t:[t];const{length:n}=t;let i,r;const s={};for(let o=0;o<n;o++){i=t[o];let a;if(r=i,!ny(i)&&(r=$u[(a=String(i)).toLowerCase()],r===void 0))throw new Ve(`Unknown adapter '${a}'`);if(r&&(q.isFunction(r)||(r=r.get(e))))break;s[a||"#"+o]=r}if(!r){const o=Object.entries(s).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build"));let a=n?o.length>1?`since :
`+o.map(Dd).join(`
`):" "+Dd(o[0]):"as no adapter specified";throw new Ve("There is no suitable adapter to dispatch the request "+a,Ve.ERR_NOT_SUPPORT)}return r}const Nm={getAdapter:iy,adapters:$u};function wl(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Mo(null,t)}function Ld(t){return wl(t),t.headers=hn.from(t.headers),t.data=Al.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Nm.getAdapter(t.adapter||So.adapter,t)(t).then(function(i){wl(t),t.response=i;try{i.data=Al.call(t,t.transformResponse,i)}finally{delete t.response}return i.headers=hn.from(i.headers),i},function(i){if(!Pm(i)&&(wl(t),i&&i.response)){t.response=i.response;try{i.response.data=Al.call(t,t.transformResponse,i.response)}finally{delete t.response}i.response.headers=hn.from(i.response.headers)}return Promise.reject(i)})}const Qa={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{Qa[t]=function(i){return typeof i===t||"a"+(e<1?"n ":" ")+t}});const Id={};Qa.transitional=function(e,n,i){function r(s,o){return"[Axios v"+Xu+"] Transitional option '"+s+"'"+o+(i?". "+i:"")}return(s,o,a)=>{if(e===!1)throw new Ve(r(o," has been removed"+(n?" in "+n:"")),Ve.ERR_DEPRECATED);return n&&!Id[o]&&(Id[o]=!0,console.warn(r(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(s,o,a):!0}};Qa.spelling=function(e){return(n,i)=>(console.warn(`${i} is likely a misspelling of ${e}`),!0)};function ry(t,e,n){if(typeof t!="object"||t===null)throw new Ve("options must be an object",Ve.ERR_BAD_OPTION_VALUE);const i=Object.keys(t);let r=i.length;for(;r-- >0;){const s=i[r],o=Object.prototype.hasOwnProperty.call(e,s)?e[s]:void 0;if(o){const a=t[s],l=a===void 0||o(a,s,t);if(l!==!0)throw new Ve("option "+s+" must be "+l,Ve.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Ve("Unknown option "+s,Ve.ERR_BAD_OPTION)}}const aa={assertOptions:ry,validators:Qa},sn=aa.validators;let Ar=class{constructor(e){this.defaults=e||{},this.interceptors={request:new yd,response:new yd}}async request(e,n){try{return await this._request(e,n)}catch(i){if(i instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const s=(()=>{if(!r.stack)return"";const o=r.stack.indexOf(`
`);return o===-1?"":r.stack.slice(o+1)})();try{if(!i.stack)i.stack=s;else if(s){const o=s.indexOf(`
`),a=o===-1?-1:s.indexOf(`
`,o+1),l=a===-1?"":s.slice(a+1);String(i.stack).endsWith(l)||(i.stack+=`
`+s)}}catch{}}throw i}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=Rr(this.defaults,n);const{transitional:i,paramsSerializer:r,headers:s}=n;i!==void 0&&aa.assertOptions(i,{silentJSONParsing:sn.transitional(sn.boolean),forcedJSONParsing:sn.transitional(sn.boolean),clarifyTimeoutError:sn.transitional(sn.boolean),legacyInterceptorReqResOrdering:sn.transitional(sn.boolean),advertiseZstdAcceptEncoding:sn.transitional(sn.boolean),validateStatusUndefinedResolves:sn.transitional(sn.boolean)},!1),r!=null&&(q.isFunction(r)?n.paramsSerializer={serialize:r}:aa.assertOptions(r,{encode:sn.function,serialize:sn.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),aa.assertOptions(n,{baseUrl:sn.spelling("baseURL"),withXsrfToken:sn.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=s&&q.merge(s.common,s[n.method]);s&&q.forEach(["delete","get","head","post","put","patch","query","common"],_=>{delete s[_]}),n.headers=hn.concat(o,s);const a=[];let l=!0;this.interceptors.request.forEach(function(S){if(typeof S.runWhen=="function"&&S.runWhen(n)===!1)return;l=l&&S.synchronous;const m=n.transitional||Gu;m&&m.legacyInterceptorReqResOrdering?a.unshift(S.fulfilled,S.rejected):a.push(S.fulfilled,S.rejected)});const c=[];this.interceptors.response.forEach(function(S){c.push(S.fulfilled,S.rejected)});let u,f=0,d;if(!l){const _=[Ld.bind(this),void 0];for(_.unshift(...a),_.push(...c),d=_.length,u=Promise.resolve(n);f<d;)u=u.then(_[f++],_[f++]);return u}d=a.length;let h=n;for(;f<d;){const _=a[f++],S=a[f++];try{h=_(h)}catch(m){S.call(this,m);break}}try{u=Ld.call(this,h)}catch(_){return Promise.reject(_)}for(f=0,d=c.length;f<d;)u=u.then(c[f++],c[f++]);return u}getUri(e){e=Rr(this.defaults,e);const n=Lm(e.baseURL,e.url,e.allowAbsoluteUrls,e);return wm(n,e.params,e.paramsSerializer)}};q.forEach(["delete","get","head","options"],function(e){Ar.prototype[e]=function(n,i){return this.request(Rr(i||{},{method:e,url:n,data:i&&q.hasOwnProp(i,"data")?i.data:void 0}))}});q.forEach(["post","put","patch","query"],function(e){function n(i){return function(s,o,a){return this.request(Rr(a||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:s,data:o}))}}Ar.prototype[e]=n(),e!=="query"&&(Ar.prototype[e+"Form"]=n(!0))});let sy=class Om{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const i=this;this.promise.then(r=>{if(!i._listeners)return;let s=i._listeners.length;for(;s-- >0;)i._listeners[s](r);i._listeners=null}),this.promise.then=r=>{let s;const o=new Promise(a=>{i.subscribe(a),s=a}).then(r);return o.cancel=function(){i.unsubscribe(s)},o},e(function(s,o,a){i.reason||(i.reason=new Mo(s,o,a),n(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const e=new AbortController,n=i=>{e.abort(i)};return this.subscribe(n),e.signal.unsubscribe=()=>this.unsubscribe(n),e.signal}static source(){let e;return{token:new Om(function(r){e=r}),cancel:e}}};function oy(t){return function(n){return t.apply(null,n)}}function ay(t){return q.isObject(t)&&t.isAxiosError===!0}const Cc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Cc).forEach(([t,e])=>{Cc[e]=t});function Fm(t){const e=new Ar(t),n=hm(Ar.prototype.request,e);return q.extend(n,Ar.prototype,e,{allOwnKeys:!0}),q.extend(n,e,null,{allOwnKeys:!0}),n.create=function(r){return Fm(Rr(t,r))},n}const Ft=Fm(So);Ft.Axios=Ar;Ft.CanceledError=Mo;Ft.CancelToken=sy;Ft.isCancel=Pm;Ft.VERSION=Xu;Ft.toFormData=Ja;Ft.AxiosError=Ve;Ft.Cancel=Ft.CanceledError;Ft.all=function(e){return Promise.all(e)};Ft.spread=oy;Ft.isAxiosError=ay;Ft.mergeConfig=Rr;Ft.AxiosHeaders=hn;Ft.formToJSON=t=>Cm(q.isHTMLForm(t)?new FormData(t):t);Ft.getAdapter=Nm.getAdapter;Ft.HttpStatusCode=Cc;Ft.default=Ft;const{Axios:ID,AxiosError:UD,CanceledError:ND,isCancel:OD,CancelToken:FD,VERSION:BD,all:kD,Cancel:VD,isAxiosError:HD,spread:zD,toFormData:GD,AxiosHeaders:WD,HttpStatusCode:XD,formToJSON:$D,getAdapter:qD,mergeConfig:YD,create:KD}=Ft,el="http://127.0.0.1:8000",_t=Ft.create({baseURL:el,headers:{"Content-Type":"application/json"}});_t.interceptors.request.use(t=>{const e=localStorage.getItem("access_token");return e&&(t.headers.Authorization=`Bearer ${e}`),t});_t.interceptors.response.use(t=>t,async t=>{const e=t.config,n=localStorage.getItem("refresh_token");if(t.response?.status===401&&n&&!e._retry){e._retry=!0;const i=await Ft.post(`${el}/api/auth/refresh/`,{refresh:n});return localStorage.setItem("access_token",i.data.access),e.headers.Authorization=`Bearer ${i.data.access}`,_t(e)}return Promise.reject(t)});const tl=s0("auth",()=>{const t=Pe(localStorage.getItem("access_token")||""),e=Pe(localStorage.getItem("refresh_token")||""),n=Pe(JSON.parse(localStorage.getItem("user")||"null")),i=at(()=>!!t.value),r=at(()=>n.value?.role||""),s=at(()=>r.value==="guest");async function o(c,u){const f=await _t.post("/api/auth/login/",{username:c,password:u});t.value=f.data.access,e.value=f.data.refresh,localStorage.setItem("access_token",f.data.access),localStorage.setItem("refresh_token",f.data.refresh),await a()}async function a(){const c=await _t.get("/api/auth/me/");n.value=c.data,localStorage.setItem("user",JSON.stringify(c.data))}function l(){t.value="",e.value="",n.value=null,localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("user")}return{accessToken:t,refreshToken:e,user:n,isAuthenticated:i,role:r,isGuest:s,login:o,fetchMe:a,logout:l}}),ly={key:0,class:"sidebar"},cy={__name:"App",setup(t){const e=tl(),n=dm(),i=xo(),r=at(()=>!!n.meta.immersive),s=at(()=>{const a=[{to:"/",label:"Home"},{to:"/viewer",label:"VR360 Viewer"}];return e.isGuest?a:[...a.slice(0,1),{to:"/dashboard",label:"Dashboard"},{to:"/projects",label:"Projects"},{to:"/locations",label:"Locations"},{to:"/versions",label:"Tour Versions"},{to:"/builder",label:"VR360 Builder"},a[1],{to:"/publishing",label:"Publishing"},{to:"/stats",label:"Analytics"},{to:"/public-viewer",label:"Public Viewer"}]});function o(){e.logout(),i.push("/login")}return(a,l)=>(ue(),de("div",{class:cn(["app-shell",{"app-shell-immersive":r.value}])},[En(e).isAuthenticated&&!r.value?(ue(),de("aside",ly,[fn(En(Tc),{class:"brand",to:"/"},{default:fc(()=>[...l[0]||(l[0]=[dt("VR360",-1)])]),_:1}),g("nav",null,[(ue(!0),de(nt,null,ht(s.value,c=>(ue(),gc(En(Tc),{key:c.to,to:c.to},{default:fc(()=>[dt(le(c.label),1)]),_:2},1032,["to"]))),128))]),g("button",{class:"ghost-button",type:"button",onClick:o}," Logout ")])):mt("",!0),g("main",{class:cn(["content",{"content-auth":!En(e).isAuthenticated,"content-immersive":r.value}])},[(ue(),gc(En(fm),{key:En(n).fullPath}))],2)],2))}};function uy(){return _t.get("/api/dashboard/overview/")}function fy(t={}){return _t.get("/api/dashboard/top-locations/",{params:t})}function dy(t={limit:10}){return _t.get("/api/dashboard/recent-activity/",{params:t})}const hy={class:"page"},py={class:"page-header"},my={class:"eyebrow"},gy={key:0,class:"error-message"},_y={key:1,class:"muted"},vy={key:2,class:"metric-grid"},xy={class:"metric-card"},by={class:"metric-card"},yy={class:"metric-card"},Sy={class:"metric-card"},My={class:"metric-card"},Ey={class:"two-column"},Ty={class:"panel"},Ay={class:"table-wrap"},wy={key:0},Ry={class:"panel"},Cy={class:"activity-list"},Py={key:0,class:"muted"},Dy={__name:"DashboardView",setup(t){const e=tl(),n=Pe(null),i=Pe([]),r=Pe([]),s=Pe(!0),o=Pe("");async function a(){s.value=!0,o.value="";try{const[l,c,u]=await Promise.all([uy(),fy({limit:5}),dy({limit:8})]);n.value=l.data,i.value=c.data.results||[],r.value=u.data.results||[]}catch(l){o.value=l.response?.data?.detail||"Could not load dashboard."}finally{s.value=!1}}return Qn(a),(l,c)=>(ue(),de("section",hy,[g("header",py,[g("div",null,[g("p",my,"Xin chao "+le(En(e).user?.username||"ban"),1),c[0]||(c[0]=g("h1",null,"Dashboard dashboard",-1))]),g("button",{class:"secondary-button",type:"button",onClick:a},"Refresh")]),o.value?(ue(),de("p",gy,le(o.value),1)):mt("",!0),s.value?(ue(),de("p",_y,"Loading data...")):mt("",!0),n.value?(ue(),de("div",vy,[g("article",xy,[c[1]||(c[1]=g("span",null,"Project",-1)),g("strong",null,le(n.value.projects_count),1)]),g("article",by,[c[2]||(c[2]=g("span",null,"Location",-1)),g("strong",null,le(n.value.locations_count),1)]),g("article",yy,[c[3]||(c[3]=g("span",null,"Publishing",-1)),g("strong",null,le(n.value.published_locations),1)]),g("article",Sy,[c[4]||(c[4]=g("span",null,"Luot truy cap",-1)),g("strong",null,le(n.value.total_visits),1)]),g("article",My,[c[5]||(c[5]=g("span",null,"Unique visitor",-1)),g("strong",null,le(n.value.unique_visitors),1)])])):mt("",!0),g("div",Ey,[g("section",Ty,[c[8]||(c[8]=g("h2",null,"Top location",-1)),g("div",Ay,[g("table",null,[c[7]||(c[7]=g("thead",null,[g("tr",null,[g("th",null,"Location"),g("th",null,"Project"),g("th",null,"Luot xem")])],-1)),g("tbody",null,[(ue(!0),de(nt,null,ht(i.value,u=>(ue(),de("tr",{key:u.location_id},[g("td",null,le(u.location_name),1),g("td",null,le(u.project_name),1),g("td",null,le(u.total_visits),1)]))),128)),i.value.length?mt("",!0):(ue(),de("tr",wy,[...c[6]||(c[6]=[g("td",{colspan:"3"},"Chua co du lieu.",-1)])]))])])])]),g("section",Ry,[c[9]||(c[9]=g("h2",null,"Hoat dong gan day",-1)),g("ul",Cy,[(ue(!0),de(nt,null,ht(r.value,u=>(ue(),de("li",{key:u.id},[g("strong",null,le(u.action),1),g("span",null,le(u.description||u.entity_type),1)]))),128)),r.value.length?mt("",!0):(ue(),de("li",Py,"Chua co hoat dong."))])])])]))}},Ly="http://127.0.0.1:8000";function Bm(t={}){return Ft.get(`${Ly}/api/published-tours/`,{params:t})}const Iy={class:"page home-page"},Uy={class:"home-hero"},Ny={class:"home-hero-actions"},Oy=["disabled"],Fy={class:"home-summary-card"},By={key:0,class:"builder-alert error"},ky={key:1,class:"published-tour-grid"},Vy={class:"published-tour-body"},Hy={class:"published-tour-meta"},zy={class:"published-tour-footer"},Gy=["onClick"],Wy={key:2,class:"panel empty-state"},Xy={__name:"HomeView",setup(t){const e=xo(),n=Pe([]),i=Pe(""),r=Pe(!1),s=Pe(""),o=at(()=>{const d=i.value.trim().toLowerCase();return d?n.value.filter(h=>[h.location_name,h.project_name,h.location_description,h.version_label].filter(Boolean).some(_=>String(_).toLowerCase().includes(d))):n.value}),a=at(()=>n.value.reduce((d,h)=>d+Number(h.scene_count||0),0));function l(d){return Array.isArray(d)?d:Array.isArray(d?.results)?d.results:Array.isArray(d?.data)?d.data:Array.isArray(d?.items)?d.items:[]}function c(d){return d?new Intl.DateTimeFormat("vi-VN",{dateStyle:"medium"}).format(new Date(d)):"Chua ro ngay publish"}function u(d){e.push({path:"/viewer",query:{token:d.public_token,project:d.project_id,location:d.location_id,version:d.version_id}})}async function f(){r.value=!0,s.value="";try{const d=await Bm();n.value=l(d.data)}catch(d){s.value=d.response?.data?.detail||"Could not load published tour list."}finally{r.value=!1}}return Qn(f),(d,h)=>(ue(),de("section",Iy,[g("header",Uy,[g("div",null,[h[1]||(h[1]=g("p",{class:"eyebrow"},"Thu vien VR360",-1)),h[2]||(h[2]=g("h1",null,"Kham pha cac tour VR360 da publish",-1)),h[3]||(h[3]=g("p",null," Browse published VR360 tours. Choose a tour to open it in the viewer. ",-1)),g("div",Ny,[Qe(g("input",{"onUpdate:modelValue":h[0]||(h[0]=_=>i.value=_),placeholder:"Tim theo project, location..."},null,512),[[gt,i.value]]),g("button",{class:"secondary-button",type:"button",disabled:r.value,onClick:f},le(r.value?"Loading...":"Refresh"),9,Oy)])]),g("div",Fy,[h[4]||(h[4]=g("span",null,"Da publish",-1)),g("strong",null,le(n.value.length),1),g("small",null,le(a.value)+" scene dang san sang",1)])]),s.value?(ue(),de("p",By,le(s.value),1)):mt("",!0),o.value.length?(ue(),de("section",ky,[(ue(!0),de(nt,null,ht(o.value,_=>(ue(),de("article",{key:_.id,class:"published-tour-card"},[g("div",{class:"published-tour-cover",style:yn(_.tour_thumbnail||_.location_thumbnail?{backgroundImage:`url(${_.tour_thumbnail||_.location_thumbnail})`}:{})},[...h[5]||(h[5]=[g("span",null,"Da xuat ban",-1)])],4),g("div",Vy,[g("small",null,le(_.project_name),1),g("h2",null,le(_.location_name),1),g("p",null,le(_.location_description||"This VR360 tour is published and ready to view."),1),g("div",Hy,[g("span",null,"v"+le(_.version_number)+" "+le(_.version_label?`· ${_.version_label}`:""),1),g("span",null,le(_.scene_count)+" scenes",1)]),g("div",zy,[g("em",null,le(c(_.published_at)),1),g("button",{class:"primary-button",type:"button",onClick:S=>u(_)},"View tour",8,Gy)])])]))),128))])):(ue(),de("section",Wy,le(r.value?"Loading tour list...":"No published tours yet."),1))]))}},$y={class:"auth-card"},qy={key:0,class:"error-message"},Yy=["disabled"],Ky={__name:"LoginView",setup(t){const e=xo(),n=tl(),i=Pe("admin"),r=Pe("123456"),s=Pe(!1),o=Pe("");async function a(){s.value=!0,o.value="";try{await n.login(i.value,r.value),e.push("/")}catch(l){const c=l.response?.data;o.value=c?.detail||c?.non_field_errors?.join(" ")||(typeof c=="string"?c:"")||"Could not connect to backend or CORS was blocked."}finally{s.value=!1}}return(l,c)=>(ue(),de("section",$y,[c[4]||(c[4]=g("div",null,[g("p",{class:"eyebrow"},"VR360 Admin"),g("h1",null,"Login system"),g("p",{class:"muted"},"Use an admin or company staff account created in the backend.")],-1)),g("form",{class:"form",onSubmit:Mn(a,["prevent"])},[g("label",null,[c[2]||(c[2]=dt(" Username ",-1)),Qe(g("input",{"onUpdate:modelValue":c[0]||(c[0]=u=>i.value=u),autocomplete:"username"},null,512),[[gt,i.value]])]),g("label",null,[c[3]||(c[3]=dt(" Password ",-1)),Qe(g("input",{"onUpdate:modelValue":c[1]||(c[1]=u=>r.value=u),type:"password",autocomplete:"current-password"},null,512),[[gt,r.value]])]),o.value?(ue(),de("p",qy,le(o.value),1)):mt("",!0),g("button",{class:"primary-button",type:"submit",disabled:s.value},le(s.value?"Logging in...":"Login"),9,Yy)],32)]))}};const qu="185",jy=0,Ud=1,Zy=2,la=1,Jy=2,Gs=3,ar=0,An=1,Pi=2,Ui=0,cs=1,Nd=2,Od=3,Fd=4,Qy=5,_r=100,eS=101,tS=102,nS=103,iS=104,rS=200,sS=201,oS=202,aS=203,Pc=204,Dc=205,lS=206,cS=207,uS=208,fS=209,dS=210,hS=211,pS=212,mS=213,gS=214,Lc=0,Ic=1,Uc=2,xs=3,Nc=4,Oc=5,Fc=6,Bc=7,km=0,_S=1,vS=2,hi=0,Vm=1,Hm=2,zm=3,Gm=4,Wm=5,Xm=6,$m=7,qm=300,Cr=301,bs=302,Rl=303,Cl=304,nl=306,kc=1e3,Di=1001,Vc=1002,tn=1003,xS=1004,Lo=1005,dn=1006,Pl=1007,yr=1008,Fn=1009,Ym=1010,Km=1011,co=1012,Yu=1013,gi=1014,ui=1015,ki=1016,Ku=1017,ju=1018,uo=1020,jm=35902,Zm=35899,Jm=1021,Qm=1022,$n=1023,Vi=1026,Sr=1027,eg=1028,Zu=1029,Pr=1030,Ju=1031,Qu=1033,ca=33776,ua=33777,fa=33778,da=33779,Hc=35840,zc=35841,Gc=35842,Wc=35843,Xc=36196,$c=37492,qc=37496,Yc=37488,Kc=37489,wa=37490,jc=37491,Zc=37808,Jc=37809,Qc=37810,eu=37811,tu=37812,nu=37813,iu=37814,ru=37815,su=37816,ou=37817,au=37818,lu=37819,cu=37820,uu=37821,fu=36492,du=36494,hu=36495,pu=36283,mu=36284,Ra=36285,gu=36286,bS=3200,Bd=0,yS=1,ir="",Pn="srgb",Ca="srgb-linear",Pa="linear",wt="srgb",Hr=7680,kd=519,SS=512,MS=513,ES=514,ef=515,TS=516,AS=517,tf=518,wS=519,Vd=35044,Hd="300 es",fi=2e3,Da=2001;function RS(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function fo(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function CS(){const t=fo("canvas");return t.style.display="block",t}const zd={};function Gd(...t){const e="THREE."+t.shift();console.log(e,...t)}function tg(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function st(...t){t=tg(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function bt(...t){t=tg(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function us(...t){const e=t.join(" ");e in zd||(zd[e]=!0,st(...t))}function PS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const DS={[Lc]:Ic,[Uc]:Fc,[Nc]:Bc,[xs]:Oc,[Ic]:Lc,[Fc]:Uc,[Bc]:Nc,[Oc]:xs};class Ur{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wd=1234567;const Qs=Math.PI/180,ho=180/Math.PI;function ws(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[t&255]+on[t>>8&255]+on[t>>16&255]+on[t>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[n&63|128]+on[n>>8&255]+"-"+on[n>>16&255]+on[n>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function vt(t,e,n){return Math.max(e,Math.min(n,t))}function nf(t,e){return(t%e+e)%e}function LS(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function IS(t,e,n){return t!==e?(n-t)/(e-t):0}function eo(t,e,n){return(1-n)*t+n*e}function US(t,e,n,i){return eo(t,e,1-Math.exp(-n*i))}function NS(t,e=1){return e-Math.abs(nf(t,e*2)-e)}function OS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function FS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function BS(t,e){return t+Math.floor(Math.random()*(e-t+1))}function kS(t,e){return t+Math.random()*(e-t)}function VS(t){return t*(.5-Math.random())}function HS(t){t!==void 0&&(Wd=t);let e=Wd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zS(t){return t*Qs}function GS(t){return t*ho}function WS(t){return(t&t-1)===0&&t!==0}function XS(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function $S(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function qS(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),d=o((e-i)/2),h=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*u,l*f,l*d,a*c);break;case"YZY":t.set(l*d,a*u,l*f,a*c);break;case"ZXZ":t.set(l*f,l*d,a*u,a*c);break;case"XZX":t.set(a*u,l*_,l*h,a*c);break;case"YXY":t.set(l*h,a*u,l*_,a*c);break;case"ZYZ":t.set(l*_,l*h,a*u,a*c);break;default:st("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ss(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const zr={DEG2RAD:Qs,RAD2DEG:ho,generateUUID:ws,clamp:vt,euclideanModulo:nf,mapLinear:LS,inverseLerp:IS,lerp:eo,damp:US,pingpong:NS,smoothstep:OS,smootherstep:FS,randInt:BS,randFloat:kS,randFloatSpread:VS,seededRandom:HS,degToRad:zS,radToDeg:GS,isPowerOfTwo:WS,ceilPowerOfTwo:XS,floorPowerOfTwo:$S,setQuaternionFromProperEuler:qS,normalize:gn,denormalize:ss},lf=class lf{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=vt(this.x,e.x,n.x),this.y=vt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=vt(this.x,e,n),this.y=vt(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(vt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};lf.prototype.isVector2=!0;let Mt=lf;class Rs{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],d=s[o+0],h=s[o+1],_=s[o+2],S=s[o+3];if(f!==S||l!==d||c!==h||u!==_){let m=l*d+c*h+u*_+f*S;m<0&&(d=-d,h=-h,_=-_,S=-S,m=-m);let p=1-a;if(m<.9995){const y=Math.acos(m),E=Math.sin(y);p=Math.sin(p*y)/E,a=Math.sin(a*y)/E,l=l*p+d*a,c=c*p+h*a,u=u*p+_*a,f=f*p+S*a}else{l=l*p+d*a,c=c*p+h*a,u=u*p+_*a,f=f*p+S*a;const y=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=y,c*=y,u*=y,f*=y}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],d=s[o+1],h=s[o+2],_=s[o+3];return e[n]=a*_+u*f+l*h-c*d,e[n+1]=l*_+u*d+c*f-a*h,e[n+2]=c*_+u*h+a*d-l*f,e[n+3]=u*_-a*f-l*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),d=l(i/2),h=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=d*u*f+c*h*_,this._y=c*h*f-d*u*_,this._z=c*u*_+d*h*f,this._w=c*u*f-d*h*_;break;case"YXZ":this._x=d*u*f+c*h*_,this._y=c*h*f-d*u*_,this._z=c*u*_-d*h*f,this._w=c*u*f+d*h*_;break;case"ZXY":this._x=d*u*f-c*h*_,this._y=c*h*f+d*u*_,this._z=c*u*_+d*h*f,this._w=c*u*f-d*h*_;break;case"ZYX":this._x=d*u*f-c*h*_,this._y=c*h*f+d*u*_,this._z=c*u*_-d*h*f,this._w=c*u*f+d*h*_;break;case"YZX":this._x=d*u*f+c*h*_,this._y=c*h*f+d*u*_,this._z=c*u*_-d*h*f,this._w=c*u*f-d*h*_;break;case"XZY":this._x=d*u*f-c*h*_,this._y=c*h*f-d*u*_,this._z=c*u*_+d*h*f,this._w=c*u*f+d*h*_;break;default:st("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],f=n[10],d=i+a+f;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-r)*h}else if(i>a&&i>f){const h=2*Math.sqrt(1+i-a-f);this._w=(u-l)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+c)/h}else if(a>f){const h=2*Math.sqrt(1+a-i-f);this._w=(s-c)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+f-i-a);this._w=(o-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-n;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,n=Math.sin(n*c)/u,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const cf=class cf{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Xd.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Xd.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=vt(this.x,e.x,n.x),this.y=vt(this.y,e.y,n.y),this.z=vt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=vt(this.x,e,n),this.y=vt(this.y,e,n),this.z=vt(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(vt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dl.copy(this).projectOnVector(e),this.sub(Dl)}reflect(e){return this.sub(Dl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};cf.prototype.isVector3=!0;let re=cf;const Dl=new re,Xd=new Rs,uf=class uf{constructor(e,n,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],h=i[5],_=i[8],S=r[0],m=r[3],p=r[6],y=r[1],E=r[4],b=r[7],w=r[2],T=r[5],C=r[8];return s[0]=o*S+a*y+l*w,s[3]=o*m+a*E+l*T,s[6]=o*p+a*b+l*C,s[1]=c*S+u*y+f*w,s[4]=c*m+u*E+f*T,s[7]=c*p+u*b+f*C,s[2]=d*S+h*y+_*w,s[5]=d*m+h*E+_*T,s[8]=d*p+h*b+_*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,d=a*l-u*s,h=c*s-o*l,_=n*f+i*d+r*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=f*S,e[1]=(r*c-u*i)*S,e[2]=(a*i-r*o)*S,e[3]=d*S,e[4]=(u*n-r*l)*S,e[5]=(r*s-a*n)*S,e[6]=h*S,e[7]=(i*l-c*n)*S,e[8]=(o*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return us("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ll.makeScale(e,n)),this}rotate(e){return us("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ll.makeRotation(-e)),this}translate(e,n){return us("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ll.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};uf.prototype.isMatrix3=!0;let lt=uf;const Ll=new lt,$d=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qd=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function YS(){const t={enabled:!0,workingColorSpace:Ca,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===wt&&(r.r=Ni(r.r),r.g=Ni(r.g),r.b=Ni(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===wt&&(r.r=fs(r.r),r.g=fs(r.g),r.b=fs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ir?Pa:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return us("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return us("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ca]:{primaries:e,whitePoint:i,transfer:Pa,toXYZ:$d,fromXYZ:qd,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Pn},outputColorSpaceConfig:{drawingBufferColorSpace:Pn}},[Pn]:{primaries:e,whitePoint:i,transfer:wt,toXYZ:$d,fromXYZ:qd,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Pn}}}),t}const xt=YS();function Ni(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function fs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Gr;class KS{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Gr===void 0&&(Gr=fo("canvas")),Gr.width=e.width,Gr.height=e.height;const r=Gr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Gr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=fo("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ni(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ni(n[i]/255)*255):n[i]=Ni(n[i]);return{data:n,width:e.width,height:e.height}}else return st("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jS=0;class rf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jS++}),this.uuid=ws(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Il(r[o].image)):s.push(Il(r[o]))}else s=Il(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Il(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?KS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(st("Texture: Unable to serialize Texture."),{})}let ZS=0;const Ul=new re;class pn extends Ur{constructor(e=pn.DEFAULT_IMAGE,n=pn.DEFAULT_MAPPING,i=Di,r=Di,s=dn,o=yr,a=$n,l=Fn,c=pn.DEFAULT_ANISOTROPY,u=ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=ws(),this.name="",this.source=new rf(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ul).x}get height(){return this.source.getSize(Ul).y}get depth(){return this.source.getSize(Ul).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){st(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){st(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kc:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case Vc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kc:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case Vc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=qm;pn.DEFAULT_ANISOTROPY=1;const ff=class ff{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],h=l[5],_=l[9],S=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-S)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+S)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const E=(c+1)/2,b=(h+1)/2,w=(p+1)/2,T=(u+d)/4,C=(f+S)/4,x=(_+m)/4;return E>b&&E>w?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=T/i,s=C/i):b>w?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=T/r,s=x/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=C/s,r=x/s),this.set(i,r,s,n),this}let y=Math.sqrt((m-_)*(m-_)+(f-S)*(f-S)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(f-S)/y,this.z=(d-u)/y,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=vt(this.x,e.x,n.x),this.y=vt(this.y,e.y,n.y),this.z=vt(this.z,e.z,n.z),this.w=vt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=vt(this.x,e,n),this.y=vt(this.y,e,n),this.z=vt(this.z,e,n),this.w=vt(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(vt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ff.prototype.isVector4=!0;let Ht=ff;class JS extends Ur{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Ht(0,0,e,n),this.scissorTest=!1,this.viewport=new Ht(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new pn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new rf(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pi extends JS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class ng extends pn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class QS extends pn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ua=class Ua{constructor(e,n,i,r,s,o,a,l,c,u,f,d,h,_,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,f,d,h,_,S,m)}set(e,n,i,r,s,o,a,l,c,u,f,d,h,_,S,m){const p=this.elements;return p[0]=e,p[4]=n,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=d,p[3]=h,p[7]=_,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ua().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Wr.setFromMatrixColumn(e,0).length(),s=1/Wr.setFromMatrixColumn(e,1).length(),o=1/Wr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*u,h=o*f,_=a*u,S=a*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=h+_*c,n[5]=d-S*c,n[9]=-a*l,n[2]=S-d*c,n[6]=_+h*c,n[10]=o*l}else if(e.order==="YXZ"){const d=l*u,h=l*f,_=c*u,S=c*f;n[0]=d+S*a,n[4]=_*a-h,n[8]=o*c,n[1]=o*f,n[5]=o*u,n[9]=-a,n[2]=h*a-_,n[6]=S+d*a,n[10]=o*l}else if(e.order==="ZXY"){const d=l*u,h=l*f,_=c*u,S=c*f;n[0]=d-S*a,n[4]=-o*f,n[8]=_+h*a,n[1]=h+_*a,n[5]=o*u,n[9]=S-d*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const d=o*u,h=o*f,_=a*u,S=a*f;n[0]=l*u,n[4]=_*c-h,n[8]=d*c+S,n[1]=l*f,n[5]=S*c+d,n[9]=h*c-_,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,h=o*c,_=a*l,S=a*c;n[0]=l*u,n[4]=S-d*f,n[8]=_*f+h,n[1]=f,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=h*f+_,n[10]=d-S*f}else if(e.order==="XZY"){const d=o*l,h=o*c,_=a*l,S=a*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=d*f+S,n[5]=o*u,n[9]=h*f-_,n[2]=_*f-h,n[6]=a*u,n[10]=S*f+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(eM,e,tM)}lookAt(e,n,i){const r=this.elements;return Rn.subVectors(e,n),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),$i.crossVectors(i,Rn),$i.lengthSq()===0&&(Math.abs(i.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),$i.crossVectors(i,Rn)),$i.normalize(),Io.crossVectors(Rn,$i),r[0]=$i.x,r[4]=Io.x,r[8]=Rn.x,r[1]=$i.y,r[5]=Io.y,r[9]=Rn.y,r[2]=$i.z,r[6]=Io.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],h=i[13],_=i[2],S=i[6],m=i[10],p=i[14],y=i[3],E=i[7],b=i[11],w=i[15],T=r[0],C=r[4],x=r[8],R=r[12],O=r[1],M=r[5],I=r[9],ce=r[13],he=r[2],Y=r[6],ne=r[10],G=r[14],oe=r[3],_e=r[7],Ee=r[11],be=r[15];return s[0]=o*T+a*O+l*he+c*oe,s[4]=o*C+a*M+l*Y+c*_e,s[8]=o*x+a*I+l*ne+c*Ee,s[12]=o*R+a*ce+l*G+c*be,s[1]=u*T+f*O+d*he+h*oe,s[5]=u*C+f*M+d*Y+h*_e,s[9]=u*x+f*I+d*ne+h*Ee,s[13]=u*R+f*ce+d*G+h*be,s[2]=_*T+S*O+m*he+p*oe,s[6]=_*C+S*M+m*Y+p*_e,s[10]=_*x+S*I+m*ne+p*Ee,s[14]=_*R+S*ce+m*G+p*be,s[3]=y*T+E*O+b*he+w*oe,s[7]=y*C+E*M+b*Y+w*_e,s[11]=y*x+E*I+b*ne+w*Ee,s[15]=y*R+E*ce+b*G+w*be,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],h=e[14],_=e[3],S=e[7],m=e[11],p=e[15],y=l*h-c*d,E=a*h-c*f,b=a*d-l*f,w=o*h-c*u,T=o*d-l*u,C=o*f-a*u;return n*(S*y-m*E+p*b)-i*(_*y-m*w+p*T)+r*(_*E-S*w+p*C)-s*(_*b-S*T+m*C)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return n*(o*u-a*c)-i*(s*u-a*l)+r*(s*c-o*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],h=e[11],_=e[12],S=e[13],m=e[14],p=e[15],y=n*a-i*o,E=n*l-r*o,b=n*c-s*o,w=i*l-r*a,T=i*c-s*a,C=r*c-s*l,x=u*S-f*_,R=u*m-d*_,O=u*p-h*_,M=f*m-d*S,I=f*p-h*S,ce=d*p-h*m,he=y*ce-E*I+b*M+w*O-T*R+C*x;if(he===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Y=1/he;return e[0]=(a*ce-l*I+c*M)*Y,e[1]=(r*I-i*ce-s*M)*Y,e[2]=(S*C-m*T+p*w)*Y,e[3]=(d*T-f*C-h*w)*Y,e[4]=(l*O-o*ce-c*R)*Y,e[5]=(n*ce-r*O+s*R)*Y,e[6]=(m*b-_*C-p*E)*Y,e[7]=(u*C-d*b+h*E)*Y,e[8]=(o*I-a*O+c*x)*Y,e[9]=(i*O-n*I-s*x)*Y,e[10]=(_*T-S*b+p*y)*Y,e[11]=(f*b-u*T-h*y)*Y,e[12]=(a*R-o*M-l*x)*Y,e[13]=(n*M-i*R+r*x)*Y,e[14]=(S*E-_*w-m*y)*Y,e[15]=(u*w-f*E+d*y)*Y,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,f=a+a,d=s*c,h=s*u,_=s*f,S=o*u,m=o*f,p=a*f,y=l*c,E=l*u,b=l*f,w=i.x,T=i.y,C=i.z;return r[0]=(1-(S+p))*w,r[1]=(h+b)*w,r[2]=(_-E)*w,r[3]=0,r[4]=(h-b)*T,r[5]=(1-(d+p))*T,r[6]=(m+y)*T,r[7]=0,r[8]=(_+E)*C,r[9]=(m-y)*C,r[10]=(1-(d+S))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let o=Wr.set(r[0],r[1],r[2]).length();const a=Wr.set(r[4],r[5],r[6]).length(),l=Wr.set(r[8],r[9],r[10]).length();s<0&&(o=-o),zn.copy(this);const c=1/o,u=1/a,f=1/l;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=f,zn.elements[9]*=f,zn.elements[10]*=f,n.setFromRotationMatrix(zn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,n,i,r,s,o,a=fi,l=!1){const c=this.elements,u=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let _,S;if(l)_=s/(o-s),S=o*s/(o-s);else if(a===fi)_=-(o+s)/(o-s),S=-2*o*s/(o-s);else if(a===Da)_=-o/(o-s),S=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=fi,l=!1){const c=this.elements,u=2/(n-e),f=2/(i-r),d=-(n+e)/(n-e),h=-(i+r)/(i-r);let _,S;if(l)_=1/(o-s),S=o/(o-s);else if(a===fi)_=-2/(o-s),S=-(o+s)/(o-s);else if(a===Da)_=-1/(o-s),S=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};Ua.prototype.isMatrix4=!0;let $t=Ua;const Wr=new re,zn=new $t,eM=new re(0,0,0),tM=new re(1,1,1),$i=new re,Io=new re,Rn=new re,Yd=new $t,Kd=new Rs;class Dr{constructor(e=0,n=0,i=0,r=Dr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],h=r[10];switch(n){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-vt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:st("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Yd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yd,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Kd.setFromEuler(this),this.setFromQuaternion(Kd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dr.DEFAULT_ORDER="XYZ";class sf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nM=0;const jd=new re,Xr=new Rs,yi=new $t,Uo=new re,Ns=new re,iM=new re,rM=new Rs,Zd=new re(1,0,0),Jd=new re(0,1,0),Qd=new re(0,0,1),eh={type:"added"},sM={type:"removed"},$r={type:"childadded",child:null},Nl={type:"childremoved",child:null};class In extends Ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nM++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=In.DEFAULT_UP.clone();const e=new re,n=new Dr,i=new Rs,r=new re(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new $t},normalMatrix:{value:new lt}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=In.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Xr.setFromAxisAngle(e,n),this.quaternion.multiply(Xr),this}rotateOnWorldAxis(e,n){return Xr.setFromAxisAngle(e,n),this.quaternion.premultiply(Xr),this}rotateX(e){return this.rotateOnAxis(Zd,e)}rotateY(e){return this.rotateOnAxis(Jd,e)}rotateZ(e){return this.rotateOnAxis(Qd,e)}translateOnAxis(e,n){return jd.copy(e).applyQuaternion(this.quaternion),this.position.add(jd.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Zd,e)}translateY(e){return this.translateOnAxis(Jd,e)}translateZ(e){return this.translateOnAxis(Qd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Uo.copy(e):Uo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(Ns,Uo,this.up):yi.lookAt(Uo,Ns,this.up),this.quaternion.setFromRotationMatrix(yi),r&&(yi.extractRotation(r.matrixWorld),Xr.setFromRotationMatrix(yi),this.quaternion.premultiply(Xr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(bt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eh),$r.child=e,this.dispatchEvent($r),$r.child=null):bt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(sM),Nl.child=e,this.dispatchEvent(Nl),Nl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eh),$r.child=e,this.dispatchEvent($r),$r.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,iM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,rM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),d=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),h.length>0&&(i.animations=h),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}In.DEFAULT_UP=new re(0,1,0);In.DEFAULT_MATRIX_AUTO_UPDATE=!0;In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class No extends In{constructor(){super(),this.isGroup=!0,this.type="Group"}}const oM={type:"move"};class Ol{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new No,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new No,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new re,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new re),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new No,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new re,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new re,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const S of e.hand.values()){const m=n.getJointPose(S,i),p=this._getHandJoint(c,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,_=.005;c.inputState.pinching&&d>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(oM)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new No;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const ig={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Oo={h:0,s:0,l:0};function Fl(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class At{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=xt.workingColorSpace){return this.r=e,this.g=n,this.b=i,xt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=xt.workingColorSpace){if(e=nf(e,1),n=vt(n,0,1),i=vt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Fl(o,s,e+1/3),this.g=Fl(o,s,e),this.b=Fl(o,s,e-1/3)}return xt.colorSpaceToWorking(this,r),this}setStyle(e,n=Pn){function i(s){s!==void 0&&parseFloat(s)<1&&st("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:st("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);st("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Pn){const i=ig[e.toLowerCase()];return i!==void 0?this.setHex(i,n):st("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=fs(e.r),this.g=fs(e.g),this.b=fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pn){return xt.workingToColorSpace(an.copy(this),e),Math.round(vt(an.r*255,0,255))*65536+Math.round(vt(an.g*255,0,255))*256+Math.round(vt(an.b*255,0,255))}getHexString(e=Pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=xt.workingColorSpace){xt.workingToColorSpace(an.copy(this),n);const i=an.r,r=an.g,s=an.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=xt.workingColorSpace){return xt.workingToColorSpace(an.copy(this),n),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Pn){xt.workingToColorSpace(an.copy(this),e);const n=an.r,i=an.g,r=an.b;return e!==Pn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+n,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(qi),e.getHSL(Oo);const i=eo(qi.h,Oo.h,n),r=eo(qi.s,Oo.s,n),s=eo(qi.l,Oo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new At;At.NAMES=ig;class aM extends In{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dr,this.environmentIntensity=1,this.environmentRotation=new Dr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Gn=new re,Si=new re,Bl=new re,Mi=new re,qr=new re,Yr=new re,th=new re,kl=new re,Vl=new re,Hl=new re,zl=new Ht,Gl=new Ht,Wl=new Ht;class Xn{constructor(e=new re,n=new re,i=new re){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Gn.subVectors(e,n),r.cross(Gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Gn.subVectors(r,n),Si.subVectors(i,n),Bl.subVectors(e,n);const o=Gn.dot(Gn),a=Gn.dot(Si),l=Gn.dot(Bl),c=Si.dot(Si),u=Si.dot(Bl),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,h=(c*l-a*u)*d,_=(o*u-a*l)*d;return s.set(1-h-_,_,h)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mi.x),l.addScaledVector(o,Mi.y),l.addScaledVector(a,Mi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return zl.setScalar(0),Gl.setScalar(0),Wl.setScalar(0),zl.fromBufferAttribute(e,n),Gl.fromBufferAttribute(e,i),Wl.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(zl,s.x),o.addScaledVector(Gl,s.y),o.addScaledVector(Wl,s.z),o}static isFrontFacing(e,n,i,r){return Gn.subVectors(i,n),Si.subVectors(e,n),Gn.cross(Si).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),Gn.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Xn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Xn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;qr.subVectors(r,i),Yr.subVectors(s,i),kl.subVectors(e,i);const l=qr.dot(kl),c=Yr.dot(kl);if(l<=0&&c<=0)return n.copy(i);Vl.subVectors(e,r);const u=qr.dot(Vl),f=Yr.dot(Vl);if(u>=0&&f<=u)return n.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(qr,o);Hl.subVectors(e,s);const h=qr.dot(Hl),_=Yr.dot(Hl);if(_>=0&&h<=_)return n.copy(s);const S=h*c-l*_;if(S<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(i).addScaledVector(Yr,a);const m=u*_-h*f;if(m<=0&&f-u>=0&&h-_>=0)return th.subVectors(s,r),a=(f-u)/(f-u+(h-_)),n.copy(r).addScaledVector(th,a);const p=1/(m+S+d);return o=S*p,a=d*p,n.copy(i).addScaledVector(qr,o).addScaledVector(Yr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Eo{constructor(e=new re(1/0,1/0,1/0),n=new re(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Wn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Wn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Wn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Wn):Wn.fromBufferAttribute(s,o),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fo.copy(i.boundingBox)),Fo.applyMatrix4(e.matrixWorld),this.union(Fo)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Os),Bo.subVectors(this.max,Os),Kr.subVectors(e.a,Os),jr.subVectors(e.b,Os),Zr.subVectors(e.c,Os),Yi.subVectors(jr,Kr),Ki.subVectors(Zr,jr),fr.subVectors(Kr,Zr);let n=[0,-Yi.z,Yi.y,0,-Ki.z,Ki.y,0,-fr.z,fr.y,Yi.z,0,-Yi.x,Ki.z,0,-Ki.x,fr.z,0,-fr.x,-Yi.y,Yi.x,0,-Ki.y,Ki.x,0,-fr.y,fr.x,0];return!Xl(n,Kr,jr,Zr,Bo)||(n=[1,0,0,0,1,0,0,0,1],!Xl(n,Kr,jr,Zr,Bo))?!1:(ko.crossVectors(Yi,Ki),n=[ko.x,ko.y,ko.z],Xl(n,Kr,jr,Zr,Bo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ei=[new re,new re,new re,new re,new re,new re,new re,new re],Wn=new re,Fo=new Eo,Kr=new re,jr=new re,Zr=new re,Yi=new re,Ki=new re,fr=new re,Os=new re,Bo=new re,ko=new re,dr=new re;function Xl(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){dr.fromArray(t,s);const a=r.x*Math.abs(dr.x)+r.y*Math.abs(dr.y)+r.z*Math.abs(dr.z),l=e.dot(dr),c=n.dot(dr),u=i.dot(dr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const qt=new re,Vo=new Mt;let lM=0;class mi extends Ur{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lM++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Vd,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Vo.fromBufferAttribute(this,n),Vo.applyMatrix3(e),this.setXY(n,Vo.x,Vo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)qt.fromBufferAttribute(this,n),qt.applyMatrix3(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)qt.fromBufferAttribute(this,n),qt.applyMatrix4(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)qt.fromBufferAttribute(this,n),qt.applyNormalMatrix(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)qt.fromBufferAttribute(this,n),qt.transformDirection(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ss(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=gn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ss(n,this.array)),n}setX(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ss(n,this.array)),n}setY(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ss(n,this.array)),n}setZ(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ss(n,this.array)),n}setW(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array),s=gn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vd&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class rg extends mi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class sg extends mi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Vn extends mi{constructor(e,n,i){super(new Float32Array(e),n,i)}}const cM=new Eo,Fs=new re,$l=new re;class of{constructor(e=new re,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):cM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const n=Fs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Fs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($l.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add($l)),this.expandByPoint(Fs.copy(e.center).sub($l))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let uM=0;const Nn=new $t,ql=new In,Jr=new re,Cn=new Eo,Bs=new Eo,Qt=new re;class vi extends Ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uM++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(RS(e)?sg:rg)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new lt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,n,i){return Nn.makeTranslation(e,n,i),this.applyMatrix4(Nn),this}scale(e,n,i){return Nn.makeScale(e,n,i),this.applyMatrix4(Nn),this}lookAt(e){return ql.lookAt(e),ql.updateMatrix(),this.applyMatrix4(ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jr).negate(),this.translate(Jr.x,Jr.y,Jr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Vn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&st("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Eo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new re(-1/0,-1/0,-1/0),new re(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new of);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new re,1/0);return}if(e){const i=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(Qt.addVectors(Cn.min,Bs.min),Cn.expandByPoint(Qt),Qt.addVectors(Cn.max,Bs.max),Cn.expandByPoint(Qt)):(Cn.expandByPoint(Bs.min),Cn.expandByPoint(Bs.max))}Cn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Qt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Qt.fromBufferAttribute(a,c),l&&(Jr.fromBufferAttribute(e,c),Qt.add(Jr)),r=Math.max(r,i.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new mi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let x=0;x<i.count;x++)a[x]=new re,l[x]=new re;const c=new re,u=new re,f=new re,d=new Mt,h=new Mt,_=new Mt,S=new re,m=new re;function p(x,R,O){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,R),f.fromBufferAttribute(i,O),d.fromBufferAttribute(s,x),h.fromBufferAttribute(s,R),_.fromBufferAttribute(s,O),u.sub(c),f.sub(c),h.sub(d),_.sub(d);const M=1/(h.x*_.y-_.x*h.y);isFinite(M)&&(S.copy(u).multiplyScalar(_.y).addScaledVector(f,-h.y).multiplyScalar(M),m.copy(f).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(M),a[x].add(S),a[R].add(S),a[O].add(S),l[x].add(m),l[R].add(m),l[O].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,R=y.length;x<R;++x){const O=y[x],M=O.start,I=O.count;for(let ce=M,he=M+I;ce<he;ce+=3)p(e.getX(ce+0),e.getX(ce+1),e.getX(ce+2))}const E=new re,b=new re,w=new re,T=new re;function C(x){w.fromBufferAttribute(r,x),T.copy(w);const R=a[x];E.copy(R),E.sub(w.multiplyScalar(w.dot(R))).normalize(),b.crossVectors(T,R);const M=b.dot(l[x])<0?-1:1;o.setXYZW(x,E.x,E.y,E.z,M)}for(let x=0,R=y.length;x<R;++x){const O=y[x],M=O.start,I=O.count;for(let ce=M,he=M+I;ce<he;ce+=3)C(e.getX(ce+0)),C(e.getX(ce+1)),C(e.getX(ce+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new mi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);const r=new re,s=new re,o=new re,a=new re,l=new re,c=new re,u=new re,f=new re;if(e)for(let d=0,h=e.count;d<h;d+=3){const _=e.getX(d+0),S=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,S),o.fromBufferAttribute(n,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,h=n.count;d<h;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Qt.fromBufferAttribute(e,n),Qt.normalize(),e.setXYZ(n,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,d=new c.constructor(l.length*u);let h=0,_=0;for(let S=0,m=l.length;S<m;S++){a.isInterleavedBufferAttribute?h=l[S]*a.data.stride+a.offset:h=l[S]*u;for(let p=0;p<u;p++)d[_++]=c[h++]}return new mi(d,u,f)}if(this.index===null)return st("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new vi,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const d=c[u],h=e(d,i);l.push(h)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const h=c[f];u.push(h.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let fM=0;class il extends Ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fM++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=cs,this.side=ar,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pc,this.blendDst=Dc,this.blendEquation=_r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new At(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){st(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){st(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==cs&&(i.blending=this.blending),this.side!==ar&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Pc&&(i.blendSrc=this.blendSrc),this.blendDst!==Dc&&(i.blendDst=this.blendDst),this.blendEquation!==_r&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==xs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new At().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Mt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Mt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ti=new re,Yl=new re,Ho=new re,ji=new re,Kl=new re,zo=new re,jl=new re;class og{constructor(e=new re,n=new re(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ti.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,n),Ti.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Yl.copy(e).add(n).multiplyScalar(.5),Ho.copy(n).sub(e).normalize(),ji.copy(this.origin).sub(Yl);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Ho),a=ji.dot(this.direction),l=-ji.dot(Ho),c=ji.lengthSq(),u=Math.abs(1-o*o);let f,d,h,_;if(u>0)if(f=o*l-a,d=o*a-l,_=s*u,f>=0)if(d>=-_)if(d<=_){const S=1/u;f*=S,d*=S,h=f*(f+o*d+2*a)+d*(o*f+d+2*l)+c}else d=s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;else d<=-_?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c):d<=_?(f=0,d=Math.min(Math.max(-s,-l),s),h=d*(d+2*l)+c):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Yl).addScaledVector(Ho,d),h}intersectSphere(e,n){Ti.subVectors(e.center,this.origin);const i=Ti.dot(this.direction),r=Ti.dot(Ti)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,n,i,r,s){Kl.subVectors(n,e),zo.subVectors(i,e),jl.crossVectors(Kl,zo);let o=this.direction.dot(jl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ji.subVectors(this.origin,e);const l=a*this.direction.dot(zo.crossVectors(ji,zo));if(l<0)return null;const c=a*this.direction.dot(Kl.cross(ji));if(c<0||l+c>o)return null;const u=-a*ji.dot(jl);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class La extends il{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dr,this.combine=km,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const nh=new $t,hr=new og,Go=new of,ih=new re,Wo=new re,Xo=new re,$o=new re,Zl=new re,qo=new re,rh=new re,Yo=new re;class Jn extends In{constructor(e=new vi,n=new La){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){qo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Zl.fromBufferAttribute(f,e),o?qo.addScaledVector(Zl,u):qo.addScaledVector(Zl.sub(n),u))}n.add(qo)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Go.copy(i.boundingSphere),Go.applyMatrix4(s),hr.copy(e.ray).recast(e.near),!(Go.containsPoint(hr.origin)===!1&&(hr.intersectSphere(Go,ih)===null||hr.origin.distanceToSquared(ih)>(e.far-e.near)**2))&&(nh.copy(s).invert(),hr.copy(e.ray).applyMatrix4(nh),!(i.boundingBox!==null&&hr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,hr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,S=d.length;_<S;_++){const m=d[_],p=o[m.materialIndex],y=Math.max(m.start,h.start),E=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let b=y,w=E;b<w;b+=3){const T=a.getX(b),C=a.getX(b+1),x=a.getX(b+2);r=Ko(this,p,e,i,c,u,f,T,C,x),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,h.start),S=Math.min(a.count,h.start+h.count);for(let m=_,p=S;m<p;m+=3){const y=a.getX(m),E=a.getX(m+1),b=a.getX(m+2);r=Ko(this,o,e,i,c,u,f,y,E,b),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,S=d.length;_<S;_++){const m=d[_],p=o[m.materialIndex],y=Math.max(m.start,h.start),E=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let b=y,w=E;b<w;b+=3){const T=b,C=b+1,x=b+2;r=Ko(this,p,e,i,c,u,f,T,C,x),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,h.start),S=Math.min(l.count,h.start+h.count);for(let m=_,p=S;m<p;m+=3){const y=m,E=m+1,b=m+2;r=Ko(this,o,e,i,c,u,f,y,E,b),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function dM(t,e,n,i,r,s,o,a){let l;if(e.side===An?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===ar,a),l===null)return null;Yo.copy(a),Yo.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Yo);return c<n.near||c>n.far?null:{distance:c,point:Yo.clone(),object:t}}function Ko(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Wo),t.getVertexPosition(l,Xo),t.getVertexPosition(c,$o);const u=dM(t,e,n,i,Wo,Xo,$o,rh);if(u){const f=new re;Xn.getBarycoord(rh,Wo,Xo,$o,f),r&&(u.uv=Xn.getInterpolatedAttribute(r,a,l,c,f,new Mt)),s&&(u.uv1=Xn.getInterpolatedAttribute(s,a,l,c,f,new Mt)),o&&(u.normal=Xn.getInterpolatedAttribute(o,a,l,c,f,new re),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new re,materialIndex:0};Xn.getNormal(Wo,Xo,$o,d.normal),u.face=d,u.barycoord=f}return u}class hM extends pn{constructor(e=null,n=1,i=1,r,s,o,a,l,c=tn,u=tn,f,d){super(null,o,a,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jl=new re,pM=new re,mM=new lt;class gr{constructor(e=new re(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Jl.subVectors(i,n).cross(pM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Jl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||mM.getNormalMatrix(e),r=this.coplanarPoint(Jl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pr=new of,gM=new Mt(.5,.5),jo=new re;class ag{constructor(e=new gr,n=new gr,i=new gr,r=new gr,s=new gr,o=new gr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=fi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],h=s[7],_=s[8],S=s[9],m=s[10],p=s[11],y=s[12],E=s[13],b=s[14],w=s[15];if(r[0].setComponents(c-o,h-u,p-_,w-y).normalize(),r[1].setComponents(c+o,h+u,p+_,w+y).normalize(),r[2].setComponents(c+a,h+f,p+S,w+E).normalize(),r[3].setComponents(c-a,h-f,p-S,w-E).normalize(),i)r[4].setComponents(l,d,m,b).normalize(),r[5].setComponents(c-l,h-d,p-m,w-b).normalize();else if(r[4].setComponents(c-l,h-d,p-m,w-b).normalize(),n===fi)r[5].setComponents(c+l,h+d,p+m,w+b).normalize();else if(n===Da)r[5].setComponents(l,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pr)}intersectsSprite(e){pr.center.set(0,0,0);const n=gM.distanceTo(e.center);return pr.radius=.7071067811865476+n,pr.applyMatrix4(e.matrixWorld),this.intersectsSphere(pr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(jo.x=r.normal.x>0?e.max.x:e.min.x,jo.y=r.normal.y>0?e.max.y:e.min.y,jo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(jo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lg extends pn{constructor(e=[],n=Cr,i,r,s,o,a,l,c,u){super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ys extends pn{constructor(e,n,i=gi,r,s,o,a=tn,l=tn,c,u=Vi,f=1){if(u!==Vi&&u!==Sr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:f};super(d,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class _M extends ys{constructor(e,n=gi,i=Cr,r,s,o=tn,a=tn,l,c=Vi){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,n,i,r,s,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class cg extends pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class To extends vi{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let d=0,h=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Vn(c,3)),this.setAttribute("normal",new Vn(u,3)),this.setAttribute("uv",new Vn(f,2));function _(S,m,p,y,E,b,w,T,C,x,R){const O=b/C,M=w/x,I=b/2,ce=w/2,he=T/2,Y=C+1,ne=x+1;let G=0,oe=0;const _e=new re;for(let Ee=0;Ee<ne;Ee++){const be=Ee*M-ce;for(let Ce=0;Ce<Y;Ce++){const Re=Ce*O-I;_e[S]=Re*y,_e[m]=be*E,_e[p]=he,c.push(_e.x,_e.y,_e.z),_e[S]=0,_e[m]=0,_e[p]=T>0?1:-1,u.push(_e.x,_e.y,_e.z),f.push(Ce/C),f.push(1-Ee/x),G+=1}}for(let Ee=0;Ee<x;Ee++)for(let be=0;be<C;be++){const Ce=d+be+Y*Ee,Re=d+be+Y*(Ee+1),we=d+(be+1)+Y*(Ee+1),xe=d+(be+1)+Y*Ee;l.push(Ce,Re,xe),l.push(Re,we,xe),oe+=6}a.addGroup(h,oe,R),h+=oe,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new To(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class rl extends vi{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,d=n/l,h=[],_=[],S=[],m=[];for(let p=0;p<u;p++){const y=p*d-o;for(let E=0;E<c;E++){const b=E*f-s;_.push(b,-y,0),S.push(0,0,1),m.push(E/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const E=y+c*p,b=y+c*(p+1),w=y+1+c*(p+1),T=y+1+c*p;h.push(E,b,T),h.push(b,w,T)}this.setIndex(h),this.setAttribute("position",new Vn(_,3)),this.setAttribute("normal",new Vn(S,3)),this.setAttribute("uv",new Vn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rl(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ia extends vi{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new re,d=new re,h=[],_=[],S=[],m=[];for(let p=0;p<=i;p++){const y=[],E=p/i,b=o+E*a,w=e*Math.cos(b),T=Math.sqrt(e*e-w*w);let C=0;p===0&&o===0?C=.5/n:p===i&&l===Math.PI&&(C=-.5/n);for(let x=0;x<=n;x++){const R=x/n,O=r+R*s;f.x=-T*Math.cos(O),f.y=w,f.z=T*Math.sin(O),_.push(f.x,f.y,f.z),d.copy(f).normalize(),S.push(d.x,d.y,d.z),m.push(R+C,1-E),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<n;y++){const E=u[p][y+1],b=u[p][y],w=u[p+1][y],T=u[p+1][y+1];(p!==0||o>0)&&h.push(E,b,T),(p!==i-1||l<Math.PI)&&h.push(b,w,T)}this.setIndex(h),this.setAttribute("position",new Vn(_,3)),this.setAttribute("normal",new Vn(S,3)),this.setAttribute("uv",new Vn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ia(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Ss(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(sh(r))r.isRenderTargetTexture?(st("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(sh(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function _n(t){const e={};for(let n=0;n<t.length;n++){const i=Ss(t[n]);for(const r in i)e[r]=i[r]}return e}function sh(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function vM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function ug(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const xM={clone:Ss,merge:_n};var bM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends il{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bM,this.fragmentShader=yM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ss(e.uniforms),this.uniformsGroups=vM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new At().setHex(r.value);break;case"v2":this.uniforms[i].value=new Mt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new re().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Ht().fromArray(r.value);break;case"m3":this.uniforms[i].value=new lt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new $t().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class SM extends _i{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class MM extends il{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class EM extends il{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ql={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(oh(t)||(this.files[t]=e))},get:function(t){if(this.enabled!==!1&&!oh(t))return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};function oh(t){try{const e=t.slice(t.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class TM{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=c.length;f<d;f+=2){const h=c[f],_=c[f+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const AM=new TM;class af{constructor(e){this.manager=e!==void 0?e:AM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}af.DEFAULT_MATERIAL_NAME="__DEFAULT";const Qr=new WeakMap;class wM extends af{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Ql.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0);else{let f=Qr.get(o);f===void 0&&(f=[],Qr.set(o,f)),f.push({onLoad:n,onError:r})}return o}const a=fo("img");function l(){u(),n&&n(this);const f=Qr.get(this)||[];for(let d=0;d<f.length;d++){const h=f[d];h.onLoad&&h.onLoad(this)}Qr.delete(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),Ql.remove(`image:${e}`);const d=Qr.get(this)||[];for(let h=0;h<d.length;h++){const _=d[h];_.onError&&_.onError(f)}Qr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ql.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class RM extends af{constructor(e){super(e)}load(e,n,i,r){const s=new pn,o=new wM(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}const Zo=new re,Jo=new Rs,ii=new re;class fg extends In{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zo,Jo,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Jo,ii.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Zo,Jo,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Jo,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Zi=new re,ah=new Mt,lh=new Mt;class On extends fg{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=ho*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ho*2*Math.atan(Math.tan(Qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z)}getViewSize(e,n){return this.getViewBounds(e,ah,lh),n.subVectors(lh,ah)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Qs*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class dg extends fg{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const es=-90,ts=1;class CM extends In{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new On(es,ts,e,n);r.layers=this.layers,this.add(r);const s=new On(es,ts,e,n);s.layers=this.layers,this.add(s);const o=new On(es,ts,e,n);o.layers=this.layers,this.add(o);const a=new On(es,ts,e,n);a.layers=this.layers,this.add(a);const l=new On(es,ts,e,n);l.layers=this.layers,this.add(l);const c=new On(es,ts,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===fi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Da)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(f,d,h),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class PM extends On{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ch=new $t;class DM{constructor(e,n,i=0,r=1/0){this.ray=new og(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new sf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):bt("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ch),this}intersectObject(e,n=!0,i=[]){return _u(e,this,i,n),i.sort(uh),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)_u(e[r],this,i,n);return i.sort(uh),i}}function uh(t,e){return t.distance-e.distance}function _u(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)_u(s[o],e,n,!0)}}const df=class df{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};df.prototype.isMatrix2=!0;let fh=df;function dh(t,e,n,i){const r=LM(i);switch(n){case Jm:return t*e;case eg:return t*e/r.components*r.byteLength;case Zu:return t*e/r.components*r.byteLength;case Pr:return t*e*2/r.components*r.byteLength;case Ju:return t*e*2/r.components*r.byteLength;case Qm:return t*e*3/r.components*r.byteLength;case $n:return t*e*4/r.components*r.byteLength;case Qu:return t*e*4/r.components*r.byteLength;case ca:case ua:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case fa:case da:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case zc:case Wc:return Math.max(t,16)*Math.max(e,8)/4;case Hc:case Gc:return Math.max(t,8)*Math.max(e,8)/2;case Xc:case $c:case Yc:case Kc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case qc:case wa:case jc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Zc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Jc:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Qc:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case eu:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case tu:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case nu:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case iu:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case ru:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case su:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case ou:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case au:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case lu:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case cu:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case uu:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case fu:case du:case hu:return Math.ceil(t/4)*Math.ceil(e/4)*16;case pu:case mu:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Ra:case gu:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function LM(t){switch(t){case Fn:case Ym:return{byteLength:1,components:1};case co:case Km:case ki:return{byteLength:2,components:1};case Ku:case ju:return{byteLength:2,components:4};case gi:case Yu:case ui:return{byteLength:4,components:1};case jm:case Zm:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qu}}));typeof window<"u"&&(window.__THREE__?st("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qu);function hg(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function IM(t){const e=new WeakMap;function n(a,l){const c=a.array,u=a.usage,f=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=t.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=t.HALF_FLOAT:h=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=t.SHORT;else if(c instanceof Uint32Array)h=t.UNSIGNED_INT;else if(c instanceof Int32Array)h=t.INT;else if(c instanceof Int8Array)h=t.BYTE;else if(c instanceof Uint8Array)h=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(t.bindBuffer(c,a),f.length===0)t.bufferSubData(c,0,u);else{f.sort((h,_)=>h.start-_.start);let d=0;for(let h=1;h<f.length;h++){const _=f[d],S=f[h];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++d,f[d]=S)}f.length=d+1;for(let h=0,_=f.length;h<_;h++){const S=f[h];t.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var UM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,NM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,OM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,FM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,BM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,VM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,HM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,GM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,WM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,XM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$M=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,YM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,KM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ZM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,JM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,QM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,eE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,iE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,oE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,aE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uE="gl_FragColor = linearToOutputTexel( gl_FragColor );",fE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,hE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_E=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,SE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ME=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,EE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,TE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,AE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,wE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,DE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,LE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,IE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,UE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,NE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,OE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,FE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,BE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,HE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,GE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,WE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$E=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,YE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,KE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ZE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,QE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,eT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,iT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,oT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,aT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,uT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,_T=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ST=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,MT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ET=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,AT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,RT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,CT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,PT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,DT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,LT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,IT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const UT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,NT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,VT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,HT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,zT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,GT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,WT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,XT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$T=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,YT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,KT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,QT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,nA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ft={alphahash_fragment:UM,alphahash_pars_fragment:NM,alphamap_fragment:OM,alphamap_pars_fragment:FM,alphatest_fragment:BM,alphatest_pars_fragment:kM,aomap_fragment:VM,aomap_pars_fragment:HM,batching_pars_vertex:zM,batching_vertex:GM,begin_vertex:WM,beginnormal_vertex:XM,bsdfs:$M,iridescence_fragment:qM,bumpmap_pars_fragment:YM,clipping_planes_fragment:KM,clipping_planes_pars_fragment:jM,clipping_planes_pars_vertex:ZM,clipping_planes_vertex:JM,color_fragment:QM,color_pars_fragment:eE,color_pars_vertex:tE,color_vertex:nE,common:iE,cube_uv_reflection_fragment:rE,defaultnormal_vertex:sE,displacementmap_pars_vertex:oE,displacementmap_vertex:aE,emissivemap_fragment:lE,emissivemap_pars_fragment:cE,colorspace_fragment:uE,colorspace_pars_fragment:fE,envmap_fragment:dE,envmap_common_pars_fragment:hE,envmap_pars_fragment:pE,envmap_pars_vertex:mE,envmap_physical_pars_fragment:AE,envmap_vertex:gE,fog_vertex:_E,fog_pars_vertex:vE,fog_fragment:xE,fog_pars_fragment:bE,gradientmap_pars_fragment:yE,lightmap_pars_fragment:SE,lights_lambert_fragment:ME,lights_lambert_pars_fragment:EE,lights_pars_begin:TE,lights_toon_fragment:wE,lights_toon_pars_fragment:RE,lights_phong_fragment:CE,lights_phong_pars_fragment:PE,lights_physical_fragment:DE,lights_physical_pars_fragment:LE,lights_fragment_begin:IE,lights_fragment_maps:UE,lights_fragment_end:NE,lightprobes_pars_fragment:OE,logdepthbuf_fragment:FE,logdepthbuf_pars_fragment:BE,logdepthbuf_pars_vertex:kE,logdepthbuf_vertex:VE,map_fragment:HE,map_pars_fragment:zE,map_particle_fragment:GE,map_particle_pars_fragment:WE,metalnessmap_fragment:XE,metalnessmap_pars_fragment:$E,morphinstance_vertex:qE,morphcolor_vertex:YE,morphnormal_vertex:KE,morphtarget_pars_vertex:jE,morphtarget_vertex:ZE,normal_fragment_begin:JE,normal_fragment_maps:QE,normal_pars_fragment:eT,normal_pars_vertex:tT,normal_vertex:nT,normalmap_pars_fragment:iT,clearcoat_normal_fragment_begin:rT,clearcoat_normal_fragment_maps:sT,clearcoat_pars_fragment:oT,iridescence_pars_fragment:aT,opaque_fragment:lT,packing:cT,premultiplied_alpha_fragment:uT,project_vertex:fT,dithering_fragment:dT,dithering_pars_fragment:hT,roughnessmap_fragment:pT,roughnessmap_pars_fragment:mT,shadowmap_pars_fragment:gT,shadowmap_pars_vertex:_T,shadowmap_vertex:vT,shadowmask_pars_fragment:xT,skinbase_vertex:bT,skinning_pars_vertex:yT,skinning_vertex:ST,skinnormal_vertex:MT,specularmap_fragment:ET,specularmap_pars_fragment:TT,tonemapping_fragment:AT,tonemapping_pars_fragment:wT,transmission_fragment:RT,transmission_pars_fragment:CT,uv_pars_fragment:PT,uv_pars_vertex:DT,uv_vertex:LT,worldpos_vertex:IT,background_vert:UT,background_frag:NT,backgroundCube_vert:OT,backgroundCube_frag:FT,cube_vert:BT,cube_frag:kT,depth_vert:VT,depth_frag:HT,distance_vert:zT,distance_frag:GT,equirect_vert:WT,equirect_frag:XT,linedashed_vert:$T,linedashed_frag:qT,meshbasic_vert:YT,meshbasic_frag:KT,meshlambert_vert:jT,meshlambert_frag:ZT,meshmatcap_vert:JT,meshmatcap_frag:QT,meshnormal_vert:eA,meshnormal_frag:tA,meshphong_vert:nA,meshphong_frag:iA,meshphysical_vert:rA,meshphysical_frag:sA,meshtoon_vert:oA,meshtoon_frag:aA,points_vert:lA,points_frag:cA,shadow_vert:uA,shadow_frag:fA,sprite_vert:dA,sprite_frag:hA},ke={common:{diffuse:{value:new At(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new At(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new re},probesMax:{value:new re},probesResolution:{value:new re}},points:{diffuse:{value:new At(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new At(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},li={basic:{uniforms:_n([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:_n([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new At(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:_n([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new At(0)},specular:{value:new At(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:_n([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new At(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:_n([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new At(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:_n([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:_n([ke.points,ke.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:_n([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:_n([ke.common,ke.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:_n([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:_n([ke.sprite,ke.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:_n([ke.common,ke.displacementmap,{referencePosition:{value:new re},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:_n([ke.lights,ke.fog,{color:{value:new At(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};li.physical={uniforms:_n([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new At(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new At(0)},specularColor:{value:new At(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const Qo={r:0,b:0,g:0},pA=new $t,pg=new lt;pg.set(-1,0,0,0,1,0,0,0,1);function mA(t,e,n,i,r,s){const o=new At(0);let a=r===!0?0:1,l,c,u=null,f=0,d=null;function h(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){const b=y.backgroundBlurriness>0;E=e.get(E,b)}return E}function _(y){let E=!1;const b=h(y);b===null?m(o,a):b&&b.isColor&&(m(b,1),E=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function S(y,E){const b=h(E);b&&(b.isCubeTexture||b.mapping===nl)?(c===void 0&&(c=new Jn(new To(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:Ss(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(pA.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(pg),c.material.toneMapped=xt.getTransfer(b.colorSpace)!==wt,(u!==b||f!==b.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,d=t.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Jn(new rl(2,2),new _i({name:"BackgroundMaterial",uniforms:Ss(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:ar,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=xt.getTransfer(b.colorSpace)!==wt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=t.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,E){y.getRGB(Qo,ug(t)),n.buffers.color.setClear(Qo.r,Qo.g,Qo.b,E,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,E=1){o.set(y),a=E,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:_,addToRenderList:S,dispose:p}}function gA(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(M,I,ce,he,Y){let ne=!1;const G=f(M,he,ce,I);s!==G&&(s=G,c(s.object)),ne=h(M,he,ce,Y),ne&&_(M,he,ce,Y),Y!==null&&e.update(Y,t.ELEMENT_ARRAY_BUFFER),(ne||o)&&(o=!1,b(M,I,ce,he),Y!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return t.createVertexArray()}function c(M){return t.bindVertexArray(M)}function u(M){return t.deleteVertexArray(M)}function f(M,I,ce,he){const Y=he.wireframe===!0;let ne=i[I.id];ne===void 0&&(ne={},i[I.id]=ne);const G=M.isInstancedMesh===!0?M.id:0;let oe=ne[G];oe===void 0&&(oe={},ne[G]=oe);let _e=oe[ce.id];_e===void 0&&(_e={},oe[ce.id]=_e);let Ee=_e[Y];return Ee===void 0&&(Ee=d(l()),_e[Y]=Ee),Ee}function d(M){const I=[],ce=[],he=[];for(let Y=0;Y<n;Y++)I[Y]=0,ce[Y]=0,he[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:ce,attributeDivisors:he,object:M,attributes:{},index:null}}function h(M,I,ce,he){const Y=s.attributes,ne=I.attributes;let G=0;const oe=ce.getAttributes();for(const _e in oe)if(oe[_e].location>=0){const be=Y[_e];let Ce=ne[_e];if(Ce===void 0&&(_e==="instanceMatrix"&&M.instanceMatrix&&(Ce=M.instanceMatrix),_e==="instanceColor"&&M.instanceColor&&(Ce=M.instanceColor)),be===void 0||be.attribute!==Ce||Ce&&be.data!==Ce.data)return!0;G++}return s.attributesNum!==G||s.index!==he}function _(M,I,ce,he){const Y={},ne=I.attributes;let G=0;const oe=ce.getAttributes();for(const _e in oe)if(oe[_e].location>=0){let be=ne[_e];be===void 0&&(_e==="instanceMatrix"&&M.instanceMatrix&&(be=M.instanceMatrix),_e==="instanceColor"&&M.instanceColor&&(be=M.instanceColor));const Ce={};Ce.attribute=be,be&&be.data&&(Ce.data=be.data),Y[_e]=Ce,G++}s.attributes=Y,s.attributesNum=G,s.index=he}function S(){const M=s.newAttributes;for(let I=0,ce=M.length;I<ce;I++)M[I]=0}function m(M){p(M,0)}function p(M,I){const ce=s.newAttributes,he=s.enabledAttributes,Y=s.attributeDivisors;ce[M]=1,he[M]===0&&(t.enableVertexAttribArray(M),he[M]=1),Y[M]!==I&&(t.vertexAttribDivisor(M,I),Y[M]=I)}function y(){const M=s.newAttributes,I=s.enabledAttributes;for(let ce=0,he=I.length;ce<he;ce++)I[ce]!==M[ce]&&(t.disableVertexAttribArray(ce),I[ce]=0)}function E(M,I,ce,he,Y,ne,G){G===!0?t.vertexAttribIPointer(M,I,ce,Y,ne):t.vertexAttribPointer(M,I,ce,he,Y,ne)}function b(M,I,ce,he){S();const Y=he.attributes,ne=ce.getAttributes(),G=I.defaultAttributeValues;for(const oe in ne){const _e=ne[oe];if(_e.location>=0){let Ee=Y[oe];if(Ee===void 0&&(oe==="instanceMatrix"&&M.instanceMatrix&&(Ee=M.instanceMatrix),oe==="instanceColor"&&M.instanceColor&&(Ee=M.instanceColor)),Ee!==void 0){const be=Ee.normalized,Ce=Ee.itemSize,Re=e.get(Ee);if(Re===void 0)continue;const we=Re.buffer,xe=Re.type,k=Re.bytesPerElement,F=xe===t.INT||xe===t.UNSIGNED_INT||Ee.gpuType===Yu;if(Ee.isInterleavedBufferAttribute){const H=Ee.data,N=H.stride,j=Ee.offset;if(H.isInstancedInterleavedBuffer){for(let J=0;J<_e.locationSize;J++)p(_e.location+J,H.meshPerAttribute);M.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let J=0;J<_e.locationSize;J++)m(_e.location+J);t.bindBuffer(t.ARRAY_BUFFER,we);for(let J=0;J<_e.locationSize;J++)E(_e.location+J,Ce/_e.locationSize,xe,be,N*k,(j+Ce/_e.locationSize*J)*k,F)}else{if(Ee.isInstancedBufferAttribute){for(let H=0;H<_e.locationSize;H++)p(_e.location+H,Ee.meshPerAttribute);M.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let H=0;H<_e.locationSize;H++)m(_e.location+H);t.bindBuffer(t.ARRAY_BUFFER,we);for(let H=0;H<_e.locationSize;H++)E(_e.location+H,Ce/_e.locationSize,xe,be,Ce*k,Ce/_e.locationSize*H*k,F)}}else if(G!==void 0){const be=G[oe];if(be!==void 0)switch(be.length){case 2:t.vertexAttrib2fv(_e.location,be);break;case 3:t.vertexAttrib3fv(_e.location,be);break;case 4:t.vertexAttrib4fv(_e.location,be);break;default:t.vertexAttrib1fv(_e.location,be)}}}}y()}function w(){R();for(const M in i){const I=i[M];for(const ce in I){const he=I[ce];for(const Y in he){const ne=he[Y];for(const G in ne)u(ne[G].object),delete ne[G];delete he[Y]}}delete i[M]}}function T(M){if(i[M.id]===void 0)return;const I=i[M.id];for(const ce in I){const he=I[ce];for(const Y in he){const ne=he[Y];for(const G in ne)u(ne[G].object),delete ne[G];delete he[Y]}}delete i[M.id]}function C(M){for(const I in i){const ce=i[I];for(const he in ce){const Y=ce[he];if(Y[M.id]===void 0)continue;const ne=Y[M.id];for(const G in ne)u(ne[G].object),delete ne[G];delete Y[M.id]}}}function x(M){for(const I in i){const ce=i[I],he=M.isInstancedMesh===!0?M.id:0,Y=ce[he];if(Y!==void 0){for(const ne in Y){const G=Y[ne];for(const oe in G)u(G[oe].object),delete G[oe];delete Y[ne]}delete ce[he],Object.keys(ce).length===0&&delete i[I]}}}function R(){O(),o=!0,s!==r&&(s=r,c(s.object))}function O(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:O,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:m,disableUnusedAttributes:y}}function _A(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function o(l,c,u){u!==0&&(t.drawArraysInstanced(i,l,c,u),n.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let h=0;h<u;h++)d+=c[h];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function vA(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==$n&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const x=C===ki&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Fn&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ui&&!x)}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(st("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&st("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),p=t.getParameter(t.MAX_VERTEX_ATTRIBS),y=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),E=t.getParameter(t.MAX_VARYING_VECTORS),b=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),T=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:b,maxSamples:w,samples:T}}function xA(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new gr,a=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const h=f.length!==0||d||i!==0||r;return r=d,i=f.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){n=u(f,d,0)},this.setState=function(f,d,h){const _=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,p=t.get(f);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,E=y*4;let b=p.clippingState||null;l.value=b,b=u(_,d,E,h);for(let w=0;w!==E;++w)b[w]=n[w];p.clippingState=b,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,h,_){const S=f!==null?f.length:0;let m=null;if(S!==0){if(m=l.value,_!==!0||m===null){const p=h+S*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,b=h;E!==S;++E,b+=4)o.copy(f[E]).applyMatrix4(y,a),o.normal.toArray(m,b),m[b+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const rr=4,hh=[.125,.215,.35,.446,.526,.582],vr=20,bA=256,ks=new dg,ph=new At;let ec=null,tc=0,nc=0,ic=!1;const yA=new re;class mh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=yA}=s;ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel(),ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ec,tc,nc),this._renderer.xr.enabled=ic,e.scissorTest=!1,ns(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Cr||e.mapping===bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel(),ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:ki,format:$n,colorSpace:Ca,depthBuffer:!1},r=gh(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gh(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=SA(s)),this._blurMaterial=EA(s,e,n),this._ggxMaterial=MA(s,e,n)}return r}_compileMaterial(e){const n=new Jn(new vi,e);this._renderer.compile(n,ks)}_sceneToCubeUV(e,n,i,r,s){const l=new On(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(ph),f.toneMapping=hi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jn(new To,new La({name:"PMREM.Background",side:An,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(ph),p=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[E],s.y,s.z)):b===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[E]));const w=this._cubeSize;ns(r,b*w,E>2?w:0,w,w),f.setRenderTarget(r),p&&f.render(S,l),f.render(e,l)}f.toneMapping=h,f.autoClear=d,e.background=y}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Cr||e.mapping===bs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_h());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ns(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,ks)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,h=f*d,{_lodMax:_}=this,S=this._sizeLods[i],m=3*S*(i>_-rr?i-_+rr:0),p=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=_-n,ns(s,m,p,3*S,2*S),r.setRenderTarget(s),r.render(a,ks),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,ns(e,m,p,3*S,2*S),r.setRenderTarget(e),r.render(a,ks)}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&bt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const d=c.uniforms,h=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*vr-1),S=s/_,m=isFinite(s)?1+Math.floor(u*S):vr;m>vr&&st(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vr}`);const p=[];let y=0;for(let C=0;C<vr;++C){const x=C/S,R=Math.exp(-x*x/2);p.push(R),C===0?y+=R:C<m&&(y+=2*R)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:E}=this;d.dTheta.value=_,d.mipInt.value=E-i;const b=this._sizeLods[r],w=3*b*(r>E-rr?r-E+rr:0),T=4*(this._cubeSize-b);ns(n,w,T,3*b,2*b),l.setRenderTarget(n),l.render(f,ks)}}function SA(t){const e=[],n=[],i=[];let r=t;const s=t-rr+1+hh.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>t-rr?l=hh[o-t+rr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],h=6,_=6,S=3,m=2,p=1,y=new Float32Array(S*_*h),E=new Float32Array(m*_*h),b=new Float32Array(p*_*h);for(let T=0;T<h;T++){const C=T%3*2/3-1,x=T>2?0:-1,R=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];y.set(R,S*_*T),E.set(d,m*_*T);const O=[T,T,T,T,T,T];b.set(O,p*_*T)}const w=new vi;w.setAttribute("position",new mi(y,S)),w.setAttribute("uv",new mi(E,m)),w.setAttribute("faceIndex",new mi(b,p)),i.push(new Jn(w,null)),r>rr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function gh(t,e,n){const i=new pi(t,e,n);return i.texture.mapping=nl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ns(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function MA(t,e,n){return new _i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function EA(t,e,n){const i=new Float32Array(vr),r=new re(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:vr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function _h(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function vh(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class mg extends pi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new lg(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new To(5,5,5),s=new _i({name:"CubemapFromEquirect",uniforms:Ss(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:An,blending:Ui});s.uniforms.tEquirect.value=n;const o=new Jn(r,s),a=n.minFilter;return n.minFilter===yr&&(n.minFilter=dn),new CM(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}function TA(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,h=!1){return d==null?null:h?o(d):s(d)}function s(d){if(d&&d.isTexture){const h=d.mapping;if(h===Rl||h===Cl)if(e.has(d)){const _=e.get(d).texture;return a(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const S=new mg(_.height);return S.fromEquirectangularTexture(t,d),e.set(d,S),d.addEventListener("dispose",c),a(S.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const h=d.mapping,_=h===Rl||h===Cl,S=h===Cr||h===bs;if(_||S){let m=n.get(d);const p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new mh(t)),m=_?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),m.texture;if(m!==void 0)return m.texture;{const y=d.image;return _&&y&&y.height>0||S&&y&&l(y)?(i===null&&(i=new mh(t)),m=_?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,h){return h===Rl?d.mapping=Cr:h===Cl&&(d.mapping=bs),d}function l(d){let h=0;const _=6;for(let S=0;S<_;S++)d[S]!==void 0&&h++;return h===_}function c(d){const h=d.target;h.removeEventListener("dispose",c);const _=e.get(h);_!==void 0&&(e.delete(h),_.dispose())}function u(d){const h=d.target;h.removeEventListener("dispose",u);const _=n.get(h);_!==void 0&&(n.delete(h),_.dispose())}function f(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function AA(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&us("WebGLRenderer: "+i+" extension not supported."),r}}}function wA(t,e,n,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete r[d.id];const h=s.get(d);h&&(e.remove(h),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(f){const d=f.attributes;for(const h in d)e.update(d[h],t.ARRAY_BUFFER)}function c(f){const d=[],h=f.index,_=f.attributes.position;let S=0;if(_===void 0)return;if(h!==null){const y=h.array;S=h.version;for(let E=0,b=y.length;E<b;E+=3){const w=y[E+0],T=y[E+1],C=y[E+2];d.push(w,T,T,C,C,w)}}else{const y=_.array;S=_.version;for(let E=0,b=y.length/3-1;E<b;E+=3){const w=E+0,T=E+1,C=E+2;d.push(w,T,T,C,C,w)}}const m=new(_.count>=65535?sg:rg)(d,1);m.version=S;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const d=s.get(f);if(d){const h=f.index;h!==null&&d.version<h.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function RA(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){t.drawElements(i,d,s,f*o),n.update(d,i,1)}function c(f,d,h){h!==0&&(t.drawElementsInstanced(i,d,s,f*o,h),n.update(d,i,h))}function u(f,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,h);let S=0;for(let m=0;m<h;m++)S+=d[m];n.update(S,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function CA(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:bt("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function PA(t,e,n){const i=new WeakMap,r=new Ht;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let O=function(){x.dispose(),i.delete(a),a.removeEventListener("dispose",O)};var h=O;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let b=0;_===!0&&(b=1),S===!0&&(b=2),m===!0&&(b=3);let w=a.attributes.position.count*b,T=1;w>e.maxTextureSize&&(T=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const C=new Float32Array(w*T*4*f),x=new ng(C,w,T,f);x.type=ui,x.needsUpdate=!0;const R=b*4;for(let M=0;M<f;M++){const I=p[M],ce=y[M],he=E[M],Y=w*T*4*M;for(let ne=0;ne<I.count;ne++){const G=ne*R;_===!0&&(r.fromBufferAttribute(I,ne),C[Y+G+0]=r.x,C[Y+G+1]=r.y,C[Y+G+2]=r.z,C[Y+G+3]=0),S===!0&&(r.fromBufferAttribute(ce,ne),C[Y+G+4]=r.x,C[Y+G+5]=r.y,C[Y+G+6]=r.z,C[Y+G+7]=0),m===!0&&(r.fromBufferAttribute(he,ne),C[Y+G+8]=r.x,C[Y+G+9]=r.y,C[Y+G+10]=r.z,C[Y+G+11]=he.itemSize===4?r.w:1)}}d={count:f,texture:x,size:new Mt(w,T)},i.set(a,d),a.addEventListener("dispose",O)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const S=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",S),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function DA(t,e,n,i,r){let s=new WeakMap;function o(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return d}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:o,dispose:a}}const LA={[Vm]:"LINEAR_TONE_MAPPING",[Hm]:"REINHARD_TONE_MAPPING",[zm]:"CINEON_TONE_MAPPING",[Gm]:"ACES_FILMIC_TONE_MAPPING",[Xm]:"AGX_TONE_MAPPING",[$m]:"NEUTRAL_TONE_MAPPING",[Wm]:"CUSTOM_TONE_MAPPING"};function IA(t,e,n,i,r,s){const o=new pi(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new ys(e,n):void 0}),a=new pi(e,n,{type:ki,depthBuffer:!1,stencilBuffer:!1}),l=new vi;l.setAttribute("position",new Vn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Vn([0,2,0,0,2,0],2));const c=new SM({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Jn(l,c),f=new dg(-1,1,1,-1,0,1);let d=null,h=null,_=!1,S,m=null,p=[],y=!1;this.setSize=function(E,b){o.setSize(E,b),a.setSize(E,b);for(let w=0;w<p.length;w++){const T=p[w];T.setSize&&T.setSize(E,b)}},this.setEffects=function(E){p=E,y=p.length>0&&p[0].isRenderPass===!0;const b=o.width,w=o.height;for(let T=0;T<p.length;T++){const C=p[T];C.setSize&&C.setSize(b,w)}},this.begin=function(E,b){if(_||E.toneMapping===hi&&p.length===0)return!1;if(m=b,b!==null){const w=b.width,T=b.height;(o.width!==w||o.height!==T)&&this.setSize(w,T)}return y===!1&&E.setRenderTarget(o),S=E.toneMapping,E.toneMapping=hi,!0},this.hasRenderPass=function(){return y},this.end=function(E,b){E.toneMapping=S,_=!0;let w=o,T=a;for(let C=0;C<p.length;C++){const x=p[C];if(x.enabled!==!1&&(x.render(E,T,w,b),x.needsSwap!==!1)){const R=w;w=T,T=R}}if(d!==E.outputColorSpace||h!==E.toneMapping){d=E.outputColorSpace,h=E.toneMapping,c.defines={},xt.getTransfer(d)===wt&&(c.defines.SRGB_TRANSFER="");const C=LA[h];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(m),E.render(u,f),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const gg=new pn,vu=new ys(1,1),_g=new ng,vg=new QS,xg=new lg,xh=[],bh=[],yh=new Float32Array(16),Sh=new Float32Array(9),Mh=new Float32Array(4);function Cs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=xh[r];if(s===void 0&&(s=new Float32Array(r),xh[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Zt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Jt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function ol(t,e){let n=bh[e];n===void 0&&(n=new Int32Array(e),bh[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function UA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function NA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;t.uniform2fv(this.addr,e),Jt(n,e)}}function OA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Zt(n,e))return;t.uniform3fv(this.addr,e),Jt(n,e)}}function FA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;t.uniform4fv(this.addr,e),Jt(n,e)}}function BA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Zt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Jt(n,e)}else{if(Zt(n,i))return;Mh.set(i),t.uniformMatrix2fv(this.addr,!1,Mh),Jt(n,i)}}function kA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Zt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Jt(n,e)}else{if(Zt(n,i))return;Sh.set(i),t.uniformMatrix3fv(this.addr,!1,Sh),Jt(n,i)}}function VA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Zt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Jt(n,e)}else{if(Zt(n,i))return;yh.set(i),t.uniformMatrix4fv(this.addr,!1,yh),Jt(n,i)}}function HA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function zA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;t.uniform2iv(this.addr,e),Jt(n,e)}}function GA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;t.uniform3iv(this.addr,e),Jt(n,e)}}function WA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;t.uniform4iv(this.addr,e),Jt(n,e)}}function XA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function $A(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;t.uniform2uiv(this.addr,e),Jt(n,e)}}function qA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;t.uniform3uiv(this.addr,e),Jt(n,e)}}function YA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;t.uniform4uiv(this.addr,e),Jt(n,e)}}function KA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(vu.compareFunction=n.isReversedDepthBuffer()?tf:ef,s=vu):s=gg,n.setTexture2D(e||s,r)}function jA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||vg,r)}function ZA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||xg,r)}function JA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||_g,r)}function QA(t){switch(t){case 5126:return UA;case 35664:return NA;case 35665:return OA;case 35666:return FA;case 35674:return BA;case 35675:return kA;case 35676:return VA;case 5124:case 35670:return HA;case 35667:case 35671:return zA;case 35668:case 35672:return GA;case 35669:case 35673:return WA;case 5125:return XA;case 36294:return $A;case 36295:return qA;case 36296:return YA;case 35678:case 36198:case 36298:case 36306:case 35682:return KA;case 35679:case 36299:case 36307:return jA;case 35680:case 36300:case 36308:case 36293:return ZA;case 36289:case 36303:case 36311:case 36292:return JA}}function ew(t,e){t.uniform1fv(this.addr,e)}function tw(t,e){const n=Cs(e,this.size,2);t.uniform2fv(this.addr,n)}function nw(t,e){const n=Cs(e,this.size,3);t.uniform3fv(this.addr,n)}function iw(t,e){const n=Cs(e,this.size,4);t.uniform4fv(this.addr,n)}function rw(t,e){const n=Cs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function sw(t,e){const n=Cs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function ow(t,e){const n=Cs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function aw(t,e){t.uniform1iv(this.addr,e)}function lw(t,e){t.uniform2iv(this.addr,e)}function cw(t,e){t.uniform3iv(this.addr,e)}function uw(t,e){t.uniform4iv(this.addr,e)}function fw(t,e){t.uniform1uiv(this.addr,e)}function dw(t,e){t.uniform2uiv(this.addr,e)}function hw(t,e){t.uniform3uiv(this.addr,e)}function pw(t,e){t.uniform4uiv(this.addr,e)}function mw(t,e,n){const i=this.cache,r=e.length,s=ol(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Jt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=vu:o=gg;for(let a=0;a!==r;++a)n.setTexture2D(e[a]||o,s[a])}function gw(t,e,n){const i=this.cache,r=e.length,s=ol(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Jt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||vg,s[o])}function _w(t,e,n){const i=this.cache,r=e.length,s=ol(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Jt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||xg,s[o])}function vw(t,e,n){const i=this.cache,r=e.length,s=ol(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Jt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||_g,s[o])}function xw(t){switch(t){case 5126:return ew;case 35664:return tw;case 35665:return nw;case 35666:return iw;case 35674:return rw;case 35675:return sw;case 35676:return ow;case 5124:case 35670:return aw;case 35667:case 35671:return lw;case 35668:case 35672:return cw;case 35669:case 35673:return uw;case 5125:return fw;case 36294:return dw;case 36295:return hw;case 36296:return pw;case 35678:case 36198:case 36298:case 36306:case 35682:return mw;case 35679:case 36299:case 36307:return gw;case 35680:case 36300:case 36308:case 36293:return _w;case 36289:case 36303:case 36311:case 36292:return vw}}class bw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=QA(n.type)}}class yw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=xw(n.type)}}class Sw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const rc=/(\w+)(\])?(\[|\.)?/g;function Eh(t,e){t.seq.push(e),t.map[e.id]=e}function Mw(t,e,n){const i=t.name,r=i.length;for(rc.lastIndex=0;;){const s=rc.exec(i),o=rc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Eh(n,c===void 0?new bw(a,t,e):new yw(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new Sw(a),Eh(n,f)),n=f}}}class ha{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(n,o),l=e.getUniformLocation(n,a.name);Mw(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Th(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Ew=37297;let Tw=0;function Aw(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const Ah=new lt;function ww(t){xt._getMatrix(Ah,xt.workingColorSpace,t);const e=`mat3( ${Ah.elements.map(n=>n.toFixed(4))} )`;switch(xt.getTransfer(t)){case Pa:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return st("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function wh(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+Aw(t.getShaderSource(e),a)}else return s}function Rw(t,e){const n=ww(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Cw={[Vm]:"Linear",[Hm]:"Reinhard",[zm]:"Cineon",[Gm]:"ACESFilmic",[Xm]:"AgX",[$m]:"Neutral",[Wm]:"Custom"};function Pw(t,e){const n=Cw[e];return n===void 0?(st("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ea=new re;function Dw(){xt.getLuminanceCoefficients(ea);const t=ea.x.toFixed(4),e=ea.y.toFixed(4),n=ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lw(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function Iw(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Uw(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Ws(t){return t!==""}function Rh(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ch(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Nw=/^[ \t]*#include +<([\w\d./]+)>/gm;function xu(t){return t.replace(Nw,Fw)}const Ow=new Map;function Fw(t,e){let n=ft[e];if(n===void 0){const i=Ow.get(e);if(i!==void 0)n=ft[i],st('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return xu(n)}const Bw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(t){return t.replace(Bw,kw)}function kw(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Dh(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Vw={[la]:"SHADOWMAP_TYPE_PCF",[Gs]:"SHADOWMAP_TYPE_VSM"};function Hw(t){return Vw[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const zw={[Cr]:"ENVMAP_TYPE_CUBE",[bs]:"ENVMAP_TYPE_CUBE",[nl]:"ENVMAP_TYPE_CUBE_UV"};function Gw(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":zw[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ww={[bs]:"ENVMAP_MODE_REFRACTION"};function Xw(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Ww[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $w={[km]:"ENVMAP_BLENDING_MULTIPLY",[_S]:"ENVMAP_BLENDING_MIX",[vS]:"ENVMAP_BLENDING_ADD"};function qw(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":$w[t.combine]||"ENVMAP_BLENDING_NONE"}function Yw(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function Kw(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=Hw(n),c=Gw(n),u=Xw(n),f=qw(n),d=Yw(n),h=Lw(n),_=Iw(s),S=r.createProgram();let m,p,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ws).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ws).join(`
`),p.length>0&&(p+=`
`)):(m=[Dh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),p=[Dh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==hi?"#define TONE_MAPPING":"",n.toneMapping!==hi?ft.tonemapping_pars_fragment:"",n.toneMapping!==hi?Pw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,Rw("linearToOutputTexel",n.outputColorSpace),Dw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ws).join(`
`)),o=xu(o),o=Rh(o,n),o=Ch(o,n),a=xu(a),a=Rh(a,n),a=Ch(a,n),o=Ph(o),a=Ph(a),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===Hd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Hd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=y+m+o,b=y+p+a,w=Th(r,r.VERTEX_SHADER,E),T=Th(r,r.FRAGMENT_SHADER,b);r.attachShader(S,w),r.attachShader(S,T),n.index0AttributeName!==void 0?r.bindAttribLocation(S,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function C(M){if(t.debug.checkShaderErrors){const I=r.getProgramInfoLog(S)||"",ce=r.getShaderInfoLog(w)||"",he=r.getShaderInfoLog(T)||"",Y=I.trim(),ne=ce.trim(),G=he.trim();let oe=!0,_e=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(oe=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,S,w,T);else{const Ee=wh(r,w,"vertex"),be=wh(r,T,"fragment");bt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+Y+`
`+Ee+`
`+be)}else Y!==""?st("WebGLProgram: Program Info Log:",Y):(ne===""||G==="")&&(_e=!1);_e&&(M.diagnostics={runnable:oe,programLog:Y,vertexShader:{log:ne,prefix:m},fragmentShader:{log:G,prefix:p}})}r.deleteShader(w),r.deleteShader(T),x=new ha(r,S),R=Uw(r,S)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let O=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=r.getProgramParameter(S,Ew)),O},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Tw++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=T,this}let jw=0;class Zw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new Jw(e),n.set(e,i)),i}}class Jw{constructor(e){this.id=jw++,this.code=e,this.usedTimes=0}}function Qw(t){return t===Pr||t===wa||t===Ra}function e1(t,e,n,i,r,s){const o=new sf,a=new Zw,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function S(x,R,O,M,I,ce){const he=M.fog,Y=I.geometry,ne=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?M.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,oe=e.get(x.envMap||ne,G),_e=oe&&oe.mapping===nl?oe.image.height:null,Ee=h[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&st("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const be=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ce=be!==void 0?be.length:0;let Re=0;Y.morphAttributes.position!==void 0&&(Re=1),Y.morphAttributes.normal!==void 0&&(Re=2),Y.morphAttributes.color!==void 0&&(Re=3);let we,xe,k,F;if(Ee){const Ye=li[Ee];we=Ye.vertexShader,xe=Ye.fragmentShader}else{we=x.vertexShader,xe=x.fragmentShader;const Ye=a.getVertexShaderStage(x),Bt=a.getFragmentShaderStage(x);a.update(x,Ye,Bt),k=Ye.id,F=Bt.id}const H=t.getRenderTarget(),N=t.state.buffers.depth.getReversed(),j=I.isInstancedMesh===!0,J=I.isBatchedMesh===!0,D=!!x.map,L=!!x.matcap,V=!!oe,ee=!!x.aoMap,z=!!x.lightMap,te=!!x.bumpMap&&x.wireframe===!1,Me=!!x.normalMap,ye=!!x.displacementMap,Te=!!x.emissiveMap,me=!!x.metalnessMap,Fe=!!x.roughnessMap,U=x.anisotropy>0,We=x.clearcoat>0,Ne=x.dispersion>0,P=x.iridescence>0,v=x.sheen>0,X=x.transmission>0,Z=U&&!!x.anisotropyMap,ae=We&&!!x.clearcoatMap,Ae=We&&!!x.clearcoatNormalMap,Le=We&&!!x.clearcoatRoughnessMap,pe=P&&!!x.iridescenceMap,ge=P&&!!x.iridescenceThicknessMap,De=v&&!!x.sheenColorMap,Xe=v&&!!x.sheenRoughnessMap,Oe=!!x.specularMap,Ie=!!x.specularColorMap,et=!!x.specularIntensityMap,it=X&&!!x.transmissionMap,ot=X&&!!x.thicknessMap,$=!!x.gradientMap,Ue=!!x.alphaMap,ve=x.alphaTest>0,Be=!!x.alphaHash,He=!!x.extensions;let Se=hi;x.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Se=t.toneMapping);const Ke={shaderID:Ee,shaderType:x.type,shaderName:x.name,vertexShader:we,fragmentShader:xe,defines:x.defines,customVertexShaderID:k,customFragmentShaderID:F,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:J,batchingColor:J&&I._colorsTexture!==null,instancing:j,instancingColor:j&&I.instanceColor!==null,instancingMorph:j&&I.morphTexture!==null,outputColorSpace:H===null?t.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:xt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:D,matcap:L,envMap:V,envMapMode:V&&oe.mapping,envMapCubeUVHeight:_e,aoMap:ee,lightMap:z,bumpMap:te,normalMap:Me,displacementMap:ye,emissiveMap:Te,normalMapObjectSpace:Me&&x.normalMapType===yS,normalMapTangentSpace:Me&&x.normalMapType===Bd,packedNormalMap:Me&&x.normalMapType===Bd&&Qw(x.normalMap.format),metalnessMap:me,roughnessMap:Fe,anisotropy:U,anisotropyMap:Z,clearcoat:We,clearcoatMap:ae,clearcoatNormalMap:Ae,clearcoatRoughnessMap:Le,dispersion:Ne,iridescence:P,iridescenceMap:pe,iridescenceThicknessMap:ge,sheen:v,sheenColorMap:De,sheenRoughnessMap:Xe,specularMap:Oe,specularColorMap:Ie,specularIntensityMap:et,transmission:X,transmissionMap:it,thicknessMap:ot,gradientMap:$,opaque:x.transparent===!1&&x.blending===cs&&x.alphaToCoverage===!1,alphaMap:Ue,alphaTest:ve,alphaHash:Be,combine:x.combine,mapUv:D&&_(x.map.channel),aoMapUv:ee&&_(x.aoMap.channel),lightMapUv:z&&_(x.lightMap.channel),bumpMapUv:te&&_(x.bumpMap.channel),normalMapUv:Me&&_(x.normalMap.channel),displacementMapUv:ye&&_(x.displacementMap.channel),emissiveMapUv:Te&&_(x.emissiveMap.channel),metalnessMapUv:me&&_(x.metalnessMap.channel),roughnessMapUv:Fe&&_(x.roughnessMap.channel),anisotropyMapUv:Z&&_(x.anisotropyMap.channel),clearcoatMapUv:ae&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Le&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:De&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Xe&&_(x.sheenRoughnessMap.channel),specularMapUv:Oe&&_(x.specularMap.channel),specularColorMapUv:Ie&&_(x.specularColorMap.channel),specularIntensityMapUv:et&&_(x.specularIntensityMap.channel),transmissionMapUv:it&&_(x.transmissionMap.channel),thicknessMapUv:ot&&_(x.thicknessMap.channel),alphaMapUv:Ue&&_(x.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Me||U),vertexNormals:!!Y.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!Y.attributes.uv&&(D||Ue),fog:!!he,useFog:x.fog===!0,fogExp2:!!he&&he.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||Y.attributes.normal===void 0&&Me===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:N,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:Y.attributes.position!==void 0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:Re,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:ce.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&O.length>0,shadowMapType:t.shadowMap.type,toneMapping:Se,decodeVideoTexture:D&&x.map.isVideoTexture===!0&&xt.getTransfer(x.map.colorSpace)===wt,decodeVideoTextureEmissive:Te&&x.emissiveMap.isVideoTexture===!0&&xt.getTransfer(x.emissiveMap.colorSpace)===wt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Pi,flipSided:x.side===An,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:He&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&x.extensions.multiDraw===!0||J)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ke.vertexUv1s=l.has(1),Ke.vertexUv2s=l.has(2),Ke.vertexUv3s=l.has(3),l.clear(),Ke}function m(x){const R=[];if(x.shaderID?R.push(x.shaderID):(R.push(x.customVertexShaderID),R.push(x.customFragmentShaderID)),x.defines!==void 0)for(const O in x.defines)R.push(O),R.push(x.defines[O]);return x.isRawShaderMaterial===!1&&(p(R,x),y(R,x),R.push(t.outputColorSpace)),R.push(x.customProgramCacheKey),R.join()}function p(x,R){x.push(R.precision),x.push(R.outputColorSpace),x.push(R.envMapMode),x.push(R.envMapCubeUVHeight),x.push(R.mapUv),x.push(R.alphaMapUv),x.push(R.lightMapUv),x.push(R.aoMapUv),x.push(R.bumpMapUv),x.push(R.normalMapUv),x.push(R.displacementMapUv),x.push(R.emissiveMapUv),x.push(R.metalnessMapUv),x.push(R.roughnessMapUv),x.push(R.anisotropyMapUv),x.push(R.clearcoatMapUv),x.push(R.clearcoatNormalMapUv),x.push(R.clearcoatRoughnessMapUv),x.push(R.iridescenceMapUv),x.push(R.iridescenceThicknessMapUv),x.push(R.sheenColorMapUv),x.push(R.sheenRoughnessMapUv),x.push(R.specularMapUv),x.push(R.specularColorMapUv),x.push(R.specularIntensityMapUv),x.push(R.transmissionMapUv),x.push(R.thicknessMapUv),x.push(R.combine),x.push(R.fogExp2),x.push(R.sizeAttenuation),x.push(R.morphTargetsCount),x.push(R.morphAttributeCount),x.push(R.numDirLights),x.push(R.numPointLights),x.push(R.numSpotLights),x.push(R.numSpotLightMaps),x.push(R.numHemiLights),x.push(R.numRectAreaLights),x.push(R.numDirLightShadows),x.push(R.numPointLightShadows),x.push(R.numSpotLightShadows),x.push(R.numSpotLightShadowsWithMaps),x.push(R.numLightProbes),x.push(R.shadowMapType),x.push(R.toneMapping),x.push(R.numClippingPlanes),x.push(R.numClipIntersection),x.push(R.depthPacking)}function y(x,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function E(x){const R=h[x.type];let O;if(R){const M=li[R];O=xM.clone(M.uniforms)}else O=x.uniforms;return O}function b(x,R){let O=u.get(R);return O!==void 0?++O.usedTimes:(O=new Kw(t,R,x,r),c.push(O),u.set(R,O)),O}function w(x){if(--x.usedTimes===0){const R=c.indexOf(x);c[R]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function T(x){a.remove(x)}function C(){a.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:E,acquireProgram:b,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:C}}function t1(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function n1(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Lh(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Ih(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function a(d,h,_,S,m,p){let y=t[e];return y===void 0?(y={id:d.id,object:d,geometry:h,material:_,materialVariant:o(d),groupOrder:S,renderOrder:d.renderOrder,z:m,group:p},t[e]=y):(y.id=d.id,y.object=d,y.geometry=h,y.material=_,y.materialVariant=o(d),y.groupOrder=S,y.renderOrder=d.renderOrder,y.z=m,y.group=p),e++,y}function l(d,h,_,S,m,p){const y=a(d,h,_,S,m,p);_.transmission>0?i.push(y):_.transparent===!0?r.push(y):n.push(y)}function c(d,h,_,S,m,p){const y=a(d,h,_,S,m,p);_.transmission>0?i.unshift(y):_.transparent===!0?r.unshift(y):n.unshift(y)}function u(d,h,_){n.length>1&&n.sort(d||n1),i.length>1&&i.sort(h||Lh),r.length>1&&r.sort(h||Lh),_&&(n.reverse(),i.reverse(),r.reverse())}function f(){for(let d=e,h=t.length;d<h;d++){const _=t[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function i1(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Ih,t.set(i,[o])):r>=s.length?(o=new Ih,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function r1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new re,color:new At};break;case"SpotLight":n={position:new re,direction:new re,color:new At,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new re,color:new At,distance:0,decay:0};break;case"HemisphereLight":n={direction:new re,skyColor:new At,groundColor:new At};break;case"RectAreaLight":n={color:new At,position:new re,halfWidth:new re,halfHeight:new re};break}return t[e.id]=n,n}}}function s1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let o1=0;function a1(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function l1(t){const e=new r1,n=s1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new re);const r=new re,s=new $t,o=new $t;function a(c){let u=0,f=0,d=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let h=0,_=0,S=0,m=0,p=0,y=0,E=0,b=0,w=0,T=0,C=0;c.sort(a1);for(let R=0,O=c.length;R<O;R++){const M=c[R],I=M.color,ce=M.intensity,he=M.distance;let Y=null;if(M.shadow&&M.shadow.map&&(M.shadow.map.texture.format===Pr?Y=M.shadow.map.texture:Y=M.shadow.map.depthTexture||M.shadow.map.texture),M.isAmbientLight)u+=I.r*ce,f+=I.g*ce,d+=I.b*ce;else if(M.isLightProbe){for(let ne=0;ne<9;ne++)i.probe[ne].addScaledVector(M.sh.coefficients[ne],ce);C++}else if(M.isDirectionalLight){const ne=e.get(M);if(ne.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const G=M.shadow,oe=n.get(M);oe.shadowIntensity=G.intensity,oe.shadowBias=G.bias,oe.shadowNormalBias=G.normalBias,oe.shadowRadius=G.radius,oe.shadowMapSize=G.mapSize,i.directionalShadow[h]=oe,i.directionalShadowMap[h]=Y,i.directionalShadowMatrix[h]=M.shadow.matrix,y++}i.directional[h]=ne,h++}else if(M.isSpotLight){const ne=e.get(M);ne.position.setFromMatrixPosition(M.matrixWorld),ne.color.copy(I).multiplyScalar(ce),ne.distance=he,ne.coneCos=Math.cos(M.angle),ne.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),ne.decay=M.decay,i.spot[S]=ne;const G=M.shadow;if(M.map&&(i.spotLightMap[w]=M.map,w++,G.updateMatrices(M),M.castShadow&&T++),i.spotLightMatrix[S]=G.matrix,M.castShadow){const oe=n.get(M);oe.shadowIntensity=G.intensity,oe.shadowBias=G.bias,oe.shadowNormalBias=G.normalBias,oe.shadowRadius=G.radius,oe.shadowMapSize=G.mapSize,i.spotShadow[S]=oe,i.spotShadowMap[S]=Y,b++}S++}else if(M.isRectAreaLight){const ne=e.get(M);ne.color.copy(I).multiplyScalar(ce),ne.halfWidth.set(M.width*.5,0,0),ne.halfHeight.set(0,M.height*.5,0),i.rectArea[m]=ne,m++}else if(M.isPointLight){const ne=e.get(M);if(ne.color.copy(M.color).multiplyScalar(M.intensity),ne.distance=M.distance,ne.decay=M.decay,M.castShadow){const G=M.shadow,oe=n.get(M);oe.shadowIntensity=G.intensity,oe.shadowBias=G.bias,oe.shadowNormalBias=G.normalBias,oe.shadowRadius=G.radius,oe.shadowMapSize=G.mapSize,oe.shadowCameraNear=G.camera.near,oe.shadowCameraFar=G.camera.far,i.pointShadow[_]=oe,i.pointShadowMap[_]=Y,i.pointShadowMatrix[_]=M.shadow.matrix,E++}i.point[_]=ne,_++}else if(M.isHemisphereLight){const ne=e.get(M);ne.skyColor.copy(M.color).multiplyScalar(ce),ne.groundColor.copy(M.groundColor).multiplyScalar(ce),i.hemi[p]=ne,p++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ke.LTC_FLOAT_1,i.rectAreaLTC2=ke.LTC_FLOAT_2):(i.rectAreaLTC1=ke.LTC_HALF_1,i.rectAreaLTC2=ke.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const x=i.hash;(x.directionalLength!==h||x.pointLength!==_||x.spotLength!==S||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==y||x.numPointShadows!==E||x.numSpotShadows!==b||x.numSpotMaps!==w||x.numLightProbes!==C)&&(i.directional.length=h,i.spot.length=S,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=b+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,x.directionalLength=h,x.pointLength=_,x.spotLength=S,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=y,x.numPointShadows=E,x.numSpotShadows=b,x.numSpotMaps=w,x.numLightProbes=C,i.version=o1++)}function l(c,u){let f=0,d=0,h=0,_=0,S=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const E=c[p];if(E.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),f++}else if(E.isSpotLight){const b=i.spot[h];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),h++}else if(E.isRectAreaLight){const b=i.rectArea[_];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),b.halfWidth.set(E.width*.5,0,0),b.halfHeight.set(0,E.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const b=i.hemi[S];b.direction.setFromMatrixPosition(E.matrixWorld),b.direction.transformDirection(m),S++}}}return{setup:a,setupView:l,state:i}}function Uh(t){const e=new l1(t),n=[],i=[],r=[];function s(d){f.camera=d,n.length=0,i.length=0,r.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(n)}function u(d){e.setupView(n,d)}const f={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function c1(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Uh(t),e.set(r,[a])):s>=o.length?(a=new Uh(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const u1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,d1=[new re(1,0,0),new re(-1,0,0),new re(0,1,0),new re(0,-1,0),new re(0,0,1),new re(0,0,-1)],h1=[new re(0,-1,0),new re(0,-1,0),new re(0,0,1),new re(0,0,-1),new re(0,-1,0),new re(0,-1,0)],Nh=new $t,Vs=new re,sc=new re;function p1(t,e,n){let i=new ag;const r=new Mt,s=new Mt,o=new Ht,a=new MM,l=new EM,c={},u=n.maxTextureSize,f={[ar]:An,[An]:ar,[Pi]:Pi},d=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:u1,fragmentShader:f1}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const _=new vi;_.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Jn(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=la;let p=this.type;this.render=function(T,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Jy&&(st("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=la);const R=t.getRenderTarget(),O=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),I=t.state;I.setBlending(Ui),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const ce=p!==this.type;ce&&C.traverse(function(he){he.material&&(Array.isArray(he.material)?he.material.forEach(Y=>Y.needsUpdate=!0):he.material.needsUpdate=!0)});for(let he=0,Y=T.length;he<Y;he++){const ne=T[he],G=ne.shadow;if(G===void 0){st("WebGLShadowMap:",ne,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const oe=G.getFrameExtents();r.multiply(oe),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/oe.x),r.x=s.x*oe.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/oe.y),r.y=s.y*oe.y,G.mapSize.y=s.y));const _e=t.state.buffers.depth.getReversed();if(G.camera._reversedDepth=_e,G.map===null||ce===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Gs){if(ne.isPointLight){st("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new pi(r.x,r.y,{format:Pr,type:ki,minFilter:dn,magFilter:dn,generateMipmaps:!1}),G.map.texture.name=ne.name+".shadowMap",G.map.depthTexture=new ys(r.x,r.y,ui),G.map.depthTexture.name=ne.name+".shadowMapDepth",G.map.depthTexture.format=Vi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=tn,G.map.depthTexture.magFilter=tn}else ne.isPointLight?(G.map=new mg(r.x),G.map.depthTexture=new _M(r.x,gi)):(G.map=new pi(r.x,r.y),G.map.depthTexture=new ys(r.x,r.y,gi)),G.map.depthTexture.name=ne.name+".shadowMap",G.map.depthTexture.format=Vi,this.type===la?(G.map.depthTexture.compareFunction=_e?tf:ef,G.map.depthTexture.minFilter=dn,G.map.depthTexture.magFilter=dn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=tn,G.map.depthTexture.magFilter=tn);G.camera.updateProjectionMatrix()}const Ee=G.map.isWebGLCubeRenderTarget?6:1;for(let be=0;be<Ee;be++){if(G.map.isWebGLCubeRenderTarget)t.setRenderTarget(G.map,be),t.clear();else{be===0&&(t.setRenderTarget(G.map),t.clear());const Ce=G.getViewport(be);o.set(s.x*Ce.x,s.y*Ce.y,s.x*Ce.z,s.y*Ce.w),I.viewport(o)}if(ne.isPointLight){const Ce=G.camera,Re=G.matrix,we=ne.distance||Ce.far;we!==Ce.far&&(Ce.far=we,Ce.updateProjectionMatrix()),Vs.setFromMatrixPosition(ne.matrixWorld),Ce.position.copy(Vs),sc.copy(Ce.position),sc.add(d1[be]),Ce.up.copy(h1[be]),Ce.lookAt(sc),Ce.updateMatrixWorld(),Re.makeTranslation(-Vs.x,-Vs.y,-Vs.z),Nh.multiplyMatrices(Ce.projectionMatrix,Ce.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Nh,Ce.coordinateSystem,Ce.reversedDepth)}else G.updateMatrices(ne);i=G.getFrustum(),b(C,x,G.camera,ne,this.type)}G.isPointLightShadow!==!0&&this.type===Gs&&y(G,x),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,t.setRenderTarget(R,O,M)};function y(T,C){const x=e.update(S);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new pi(r.x,r.y,{format:Pr,type:ki})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(C,null,x,d,S,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(C,null,x,h,S,null)}function E(T,C,x,R){let O=null;const M=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(M!==void 0)O=M;else if(O=x.isPointLight===!0?l:a,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const I=O.uuid,ce=C.uuid;let he=c[I];he===void 0&&(he={},c[I]=he);let Y=he[ce];Y===void 0&&(Y=O.clone(),he[ce]=Y,C.addEventListener("dispose",w)),O=Y}if(O.visible=C.visible,O.wireframe=C.wireframe,R===Gs?O.side=C.shadowSide!==null?C.shadowSide:C.side:O.side=C.shadowSide!==null?C.shadowSide:f[C.side],O.alphaMap=C.alphaMap,O.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,O.map=C.map,O.clipShadows=C.clipShadows,O.clippingPlanes=C.clippingPlanes,O.clipIntersection=C.clipIntersection,O.displacementMap=C.displacementMap,O.displacementScale=C.displacementScale,O.displacementBias=C.displacementBias,O.wireframeLinewidth=C.wireframeLinewidth,O.linewidth=C.linewidth,x.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const I=t.properties.get(O);I.light=x}return O}function b(T,C,x,R,O){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&O===Gs)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const ce=e.update(T),he=T.material;if(Array.isArray(he)){const Y=ce.groups;for(let ne=0,G=Y.length;ne<G;ne++){const oe=Y[ne],_e=he[oe.materialIndex];if(_e&&_e.visible){const Ee=E(T,_e,R,O);T.onBeforeShadow(t,T,C,x,ce,Ee,oe),t.renderBufferDirect(x,null,ce,Ee,T,oe),T.onAfterShadow(t,T,C,x,ce,Ee,oe)}}}else if(he.visible){const Y=E(T,he,R,O);T.onBeforeShadow(t,T,C,x,ce,Y,null),t.renderBufferDirect(x,null,ce,Y,T,null),T.onAfterShadow(t,T,C,x,ce,Y,null)}}const I=T.children;for(let ce=0,he=I.length;ce<he;ce++)b(I[ce],C,x,R,O)}function w(T){T.target.removeEventListener("dispose",w);for(const x in c){const R=c[x],O=T.target.uuid;O in R&&(R[O].dispose(),delete R[O])}}}function m1(t,e){function n(){let $=!1;const Ue=new Ht;let ve=null;const Be=new Ht(0,0,0,0);return{setMask:function(He){ve!==He&&!$&&(t.colorMask(He,He,He,He),ve=He)},setLocked:function(He){$=He},setClear:function(He,Se,Ke,Ye,Bt){Bt===!0&&(He*=Ye,Se*=Ye,Ke*=Ye),Ue.set(He,Se,Ke,Ye),Be.equals(Ue)===!1&&(t.clearColor(He,Se,Ke,Ye),Be.copy(Ue))},reset:function(){$=!1,ve=null,Be.set(-1,0,0,0)}}}function i(){let $=!1,Ue=!1,ve=null,Be=null,He=null;return{setReversed:function(Se){if(Ue!==Se){const Ke=e.get("EXT_clip_control");Se?Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.ZERO_TO_ONE_EXT):Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.NEGATIVE_ONE_TO_ONE_EXT),Ue=Se;const Ye=He;He=null,this.setClear(Ye)}},getReversed:function(){return Ue},setTest:function(Se){Se?H(t.DEPTH_TEST):N(t.DEPTH_TEST)},setMask:function(Se){ve!==Se&&!$&&(t.depthMask(Se),ve=Se)},setFunc:function(Se){if(Ue&&(Se=DS[Se]),Be!==Se){switch(Se){case Lc:t.depthFunc(t.NEVER);break;case Ic:t.depthFunc(t.ALWAYS);break;case Uc:t.depthFunc(t.LESS);break;case xs:t.depthFunc(t.LEQUAL);break;case Nc:t.depthFunc(t.EQUAL);break;case Oc:t.depthFunc(t.GEQUAL);break;case Fc:t.depthFunc(t.GREATER);break;case Bc:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Be=Se}},setLocked:function(Se){$=Se},setClear:function(Se){He!==Se&&(He=Se,Ue&&(Se=1-Se),t.clearDepth(Se))},reset:function(){$=!1,ve=null,Be=null,He=null,Ue=!1}}}function r(){let $=!1,Ue=null,ve=null,Be=null,He=null,Se=null,Ke=null,Ye=null,Bt=null;return{setTest:function(Ct){$||(Ct?H(t.STENCIL_TEST):N(t.STENCIL_TEST))},setMask:function(Ct){Ue!==Ct&&!$&&(t.stencilMask(Ct),Ue=Ct)},setFunc:function(Ct,W,B){(ve!==Ct||Be!==W||He!==B)&&(t.stencilFunc(Ct,W,B),ve=Ct,Be=W,He=B)},setOp:function(Ct,W,B){(Se!==Ct||Ke!==W||Ye!==B)&&(t.stencilOp(Ct,W,B),Se=Ct,Ke=W,Ye=B)},setLocked:function(Ct){$=Ct},setClear:function(Ct){Bt!==Ct&&(t.clearStencil(Ct),Bt=Ct)},reset:function(){$=!1,Ue=null,ve=null,Be=null,He=null,Se=null,Ke=null,Ye=null,Bt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},h=new WeakMap,_=[],S=null,m=!1,p=null,y=null,E=null,b=null,w=null,T=null,C=null,x=new At(0,0,0),R=0,O=!1,M=null,I=null,ce=null,he=null,Y=null;const ne=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,oe=0;const _e=t.getParameter(t.VERSION);_e.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(_e)[1]),G=oe>=1):_e.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(_e)[1]),G=oe>=2);let Ee=null,be={};const Ce=t.getParameter(t.SCISSOR_BOX),Re=t.getParameter(t.VIEWPORT),we=new Ht().fromArray(Ce),xe=new Ht().fromArray(Re);function k($,Ue,ve,Be){const He=new Uint8Array(4),Se=t.createTexture();t.bindTexture($,Se),t.texParameteri($,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri($,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ke=0;Ke<ve;Ke++)$===t.TEXTURE_3D||$===t.TEXTURE_2D_ARRAY?t.texImage3D(Ue,0,t.RGBA,1,1,Be,0,t.RGBA,t.UNSIGNED_BYTE,He):t.texImage2D(Ue+Ke,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,He);return Se}const F={};F[t.TEXTURE_2D]=k(t.TEXTURE_2D,t.TEXTURE_2D,1),F[t.TEXTURE_CUBE_MAP]=k(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),F[t.TEXTURE_2D_ARRAY]=k(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),F[t.TEXTURE_3D]=k(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),H(t.DEPTH_TEST),o.setFunc(xs),te(!1),Me(Ud),H(t.CULL_FACE),ee(Ui);function H($){u[$]!==!0&&(t.enable($),u[$]=!0)}function N($){u[$]!==!1&&(t.disable($),u[$]=!1)}function j($,Ue){return d[$]!==Ue?(t.bindFramebuffer($,Ue),d[$]=Ue,$===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=Ue),$===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=Ue),!0):!1}function J($,Ue){let ve=_,Be=!1;if($){ve=h.get(Ue),ve===void 0&&(ve=[],h.set(Ue,ve));const He=$.textures;if(ve.length!==He.length||ve[0]!==t.COLOR_ATTACHMENT0){for(let Se=0,Ke=He.length;Se<Ke;Se++)ve[Se]=t.COLOR_ATTACHMENT0+Se;ve.length=He.length,Be=!0}}else ve[0]!==t.BACK&&(ve[0]=t.BACK,Be=!0);Be&&t.drawBuffers(ve)}function D($){return S!==$?(t.useProgram($),S=$,!0):!1}const L={[_r]:t.FUNC_ADD,[eS]:t.FUNC_SUBTRACT,[tS]:t.FUNC_REVERSE_SUBTRACT};L[nS]=t.MIN,L[iS]=t.MAX;const V={[rS]:t.ZERO,[sS]:t.ONE,[oS]:t.SRC_COLOR,[Pc]:t.SRC_ALPHA,[dS]:t.SRC_ALPHA_SATURATE,[uS]:t.DST_COLOR,[lS]:t.DST_ALPHA,[aS]:t.ONE_MINUS_SRC_COLOR,[Dc]:t.ONE_MINUS_SRC_ALPHA,[fS]:t.ONE_MINUS_DST_COLOR,[cS]:t.ONE_MINUS_DST_ALPHA,[hS]:t.CONSTANT_COLOR,[pS]:t.ONE_MINUS_CONSTANT_COLOR,[mS]:t.CONSTANT_ALPHA,[gS]:t.ONE_MINUS_CONSTANT_ALPHA};function ee($,Ue,ve,Be,He,Se,Ke,Ye,Bt,Ct){if($===Ui){m===!0&&(N(t.BLEND),m=!1);return}if(m===!1&&(H(t.BLEND),m=!0),$!==Qy){if($!==p||Ct!==O){if((y!==_r||w!==_r)&&(t.blendEquation(t.FUNC_ADD),y=_r,w=_r),Ct)switch($){case cs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Nd:t.blendFunc(t.ONE,t.ONE);break;case Od:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Fd:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:bt("WebGLState: Invalid blending: ",$);break}else switch($){case cs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Nd:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Od:bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fd:bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:bt("WebGLState: Invalid blending: ",$);break}E=null,b=null,T=null,C=null,x.set(0,0,0),R=0,p=$,O=Ct}return}He=He||Ue,Se=Se||ve,Ke=Ke||Be,(Ue!==y||He!==w)&&(t.blendEquationSeparate(L[Ue],L[He]),y=Ue,w=He),(ve!==E||Be!==b||Se!==T||Ke!==C)&&(t.blendFuncSeparate(V[ve],V[Be],V[Se],V[Ke]),E=ve,b=Be,T=Se,C=Ke),(Ye.equals(x)===!1||Bt!==R)&&(t.blendColor(Ye.r,Ye.g,Ye.b,Bt),x.copy(Ye),R=Bt),p=$,O=!1}function z($,Ue){$.side===Pi?N(t.CULL_FACE):H(t.CULL_FACE);let ve=$.side===An;Ue&&(ve=!ve),te(ve),$.blending===cs&&$.transparent===!1?ee(Ui):ee($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),o.setFunc($.depthFunc),o.setTest($.depthTest),o.setMask($.depthWrite),s.setMask($.colorWrite);const Be=$.stencilWrite;a.setTest(Be),Be&&(a.setMask($.stencilWriteMask),a.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),a.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),Te($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?H(t.SAMPLE_ALPHA_TO_COVERAGE):N(t.SAMPLE_ALPHA_TO_COVERAGE)}function te($){M!==$&&($?t.frontFace(t.CW):t.frontFace(t.CCW),M=$)}function Me($){$!==jy?(H(t.CULL_FACE),$!==I&&($===Ud?t.cullFace(t.BACK):$===Zy?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):N(t.CULL_FACE),I=$}function ye($){$!==ce&&(G&&t.lineWidth($),ce=$)}function Te($,Ue,ve){$?(H(t.POLYGON_OFFSET_FILL),(he!==Ue||Y!==ve)&&(he=Ue,Y=ve,o.getReversed()&&(Ue=-Ue),t.polygonOffset(Ue,ve))):N(t.POLYGON_OFFSET_FILL)}function me($){$?H(t.SCISSOR_TEST):N(t.SCISSOR_TEST)}function Fe($){$===void 0&&($=t.TEXTURE0+ne-1),Ee!==$&&(t.activeTexture($),Ee=$)}function U($,Ue,ve){ve===void 0&&(Ee===null?ve=t.TEXTURE0+ne-1:ve=Ee);let Be=be[ve];Be===void 0&&(Be={type:void 0,texture:void 0},be[ve]=Be),(Be.type!==$||Be.texture!==Ue)&&(Ee!==ve&&(t.activeTexture(ve),Ee=ve),t.bindTexture($,Ue||F[$]),Be.type=$,Be.texture=Ue)}function We(){const $=be[Ee];$!==void 0&&$.type!==void 0&&(t.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Ne(){try{t.compressedTexImage2D(...arguments)}catch($){bt("WebGLState:",$)}}function P(){try{t.compressedTexImage3D(...arguments)}catch($){bt("WebGLState:",$)}}function v(){try{t.texSubImage2D(...arguments)}catch($){bt("WebGLState:",$)}}function X(){try{t.texSubImage3D(...arguments)}catch($){bt("WebGLState:",$)}}function Z(){try{t.compressedTexSubImage2D(...arguments)}catch($){bt("WebGLState:",$)}}function ae(){try{t.compressedTexSubImage3D(...arguments)}catch($){bt("WebGLState:",$)}}function Ae(){try{t.texStorage2D(...arguments)}catch($){bt("WebGLState:",$)}}function Le(){try{t.texStorage3D(...arguments)}catch($){bt("WebGLState:",$)}}function pe(){try{t.texImage2D(...arguments)}catch($){bt("WebGLState:",$)}}function ge(){try{t.texImage3D(...arguments)}catch($){bt("WebGLState:",$)}}function De($){return f[$]!==void 0?f[$]:t.getParameter($)}function Xe($,Ue){f[$]!==Ue&&(t.pixelStorei($,Ue),f[$]=Ue)}function Oe($){we.equals($)===!1&&(t.scissor($.x,$.y,$.z,$.w),we.copy($))}function Ie($){xe.equals($)===!1&&(t.viewport($.x,$.y,$.z,$.w),xe.copy($))}function et($,Ue){let ve=c.get(Ue);ve===void 0&&(ve=new WeakMap,c.set(Ue,ve));let Be=ve.get($);Be===void 0&&(Be=t.getUniformBlockIndex(Ue,$.name),ve.set($,Be))}function it($,Ue){const Be=c.get(Ue).get($);l.get(Ue)!==Be&&(t.uniformBlockBinding(Ue,Be,$.__bindingPointIndex),l.set(Ue,Be))}function ot(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),u={},f={},Ee=null,be={},d={},h=new WeakMap,_=[],S=null,m=!1,p=null,y=null,E=null,b=null,w=null,T=null,C=null,x=new At(0,0,0),R=0,O=!1,M=null,I=null,ce=null,he=null,Y=null,we.set(0,0,t.canvas.width,t.canvas.height),xe.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:H,disable:N,bindFramebuffer:j,drawBuffers:J,useProgram:D,setBlending:ee,setMaterial:z,setFlipSided:te,setCullFace:Me,setLineWidth:ye,setPolygonOffset:Te,setScissorTest:me,activeTexture:Fe,bindTexture:U,unbindTexture:We,compressedTexImage2D:Ne,compressedTexImage3D:P,texImage2D:pe,texImage3D:ge,pixelStorei:Xe,getParameter:De,updateUBOMapping:et,uniformBlockBinding:it,texStorage2D:Ae,texStorage3D:Le,texSubImage2D:v,texSubImage3D:X,compressedTexSubImage2D:Z,compressedTexSubImage3D:ae,scissor:Oe,viewport:Ie,reset:ot}}function g1(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Mt,u=new WeakMap,f=new Set;let d;const h=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(P,v){return _?new OffscreenCanvas(P,v):fo("canvas")}function m(P,v,X){let Z=1;const ae=Ne(P);if((ae.width>X||ae.height>X)&&(Z=X/Math.max(ae.width,ae.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Ae=Math.floor(Z*ae.width),Le=Math.floor(Z*ae.height);d===void 0&&(d=S(Ae,Le));const pe=v?S(Ae,Le):d;return pe.width=Ae,pe.height=Le,pe.getContext("2d").drawImage(P,0,0,Ae,Le),st("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Ae+"x"+Le+")."),pe}else return"data"in P&&st("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),P;return P}function p(P){return P.generateMipmaps}function y(P){t.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?t.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function b(P,v,X,Z,ae,Ae=!1){if(P!==null){if(t[P]!==void 0)return t[P];st("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Le;Z&&(Le=e.get("EXT_texture_norm16"),Le||st("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pe=v;if(v===t.RED&&(X===t.FLOAT&&(pe=t.R32F),X===t.HALF_FLOAT&&(pe=t.R16F),X===t.UNSIGNED_BYTE&&(pe=t.R8),X===t.UNSIGNED_SHORT&&Le&&(pe=Le.R16_EXT),X===t.SHORT&&Le&&(pe=Le.R16_SNORM_EXT)),v===t.RED_INTEGER&&(X===t.UNSIGNED_BYTE&&(pe=t.R8UI),X===t.UNSIGNED_SHORT&&(pe=t.R16UI),X===t.UNSIGNED_INT&&(pe=t.R32UI),X===t.BYTE&&(pe=t.R8I),X===t.SHORT&&(pe=t.R16I),X===t.INT&&(pe=t.R32I)),v===t.RG&&(X===t.FLOAT&&(pe=t.RG32F),X===t.HALF_FLOAT&&(pe=t.RG16F),X===t.UNSIGNED_BYTE&&(pe=t.RG8),X===t.UNSIGNED_SHORT&&Le&&(pe=Le.RG16_EXT),X===t.SHORT&&Le&&(pe=Le.RG16_SNORM_EXT)),v===t.RG_INTEGER&&(X===t.UNSIGNED_BYTE&&(pe=t.RG8UI),X===t.UNSIGNED_SHORT&&(pe=t.RG16UI),X===t.UNSIGNED_INT&&(pe=t.RG32UI),X===t.BYTE&&(pe=t.RG8I),X===t.SHORT&&(pe=t.RG16I),X===t.INT&&(pe=t.RG32I)),v===t.RGB_INTEGER&&(X===t.UNSIGNED_BYTE&&(pe=t.RGB8UI),X===t.UNSIGNED_SHORT&&(pe=t.RGB16UI),X===t.UNSIGNED_INT&&(pe=t.RGB32UI),X===t.BYTE&&(pe=t.RGB8I),X===t.SHORT&&(pe=t.RGB16I),X===t.INT&&(pe=t.RGB32I)),v===t.RGBA_INTEGER&&(X===t.UNSIGNED_BYTE&&(pe=t.RGBA8UI),X===t.UNSIGNED_SHORT&&(pe=t.RGBA16UI),X===t.UNSIGNED_INT&&(pe=t.RGBA32UI),X===t.BYTE&&(pe=t.RGBA8I),X===t.SHORT&&(pe=t.RGBA16I),X===t.INT&&(pe=t.RGBA32I)),v===t.RGB&&(X===t.UNSIGNED_SHORT&&Le&&(pe=Le.RGB16_EXT),X===t.SHORT&&Le&&(pe=Le.RGB16_SNORM_EXT),X===t.UNSIGNED_INT_5_9_9_9_REV&&(pe=t.RGB9_E5),X===t.UNSIGNED_INT_10F_11F_11F_REV&&(pe=t.R11F_G11F_B10F)),v===t.RGBA){const ge=Ae?Pa:xt.getTransfer(ae);X===t.FLOAT&&(pe=t.RGBA32F),X===t.HALF_FLOAT&&(pe=t.RGBA16F),X===t.UNSIGNED_BYTE&&(pe=ge===wt?t.SRGB8_ALPHA8:t.RGBA8),X===t.UNSIGNED_SHORT&&Le&&(pe=Le.RGBA16_EXT),X===t.SHORT&&Le&&(pe=Le.RGBA16_SNORM_EXT),X===t.UNSIGNED_SHORT_4_4_4_4&&(pe=t.RGBA4),X===t.UNSIGNED_SHORT_5_5_5_1&&(pe=t.RGB5_A1)}return(pe===t.R16F||pe===t.R32F||pe===t.RG16F||pe===t.RG32F||pe===t.RGBA16F||pe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function w(P,v){let X;return P?v===null||v===gi||v===uo?X=t.DEPTH24_STENCIL8:v===ui?X=t.DEPTH32F_STENCIL8:v===co&&(X=t.DEPTH24_STENCIL8,st("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===gi||v===uo?X=t.DEPTH_COMPONENT24:v===ui?X=t.DEPTH_COMPONENT32F:v===co&&(X=t.DEPTH_COMPONENT16),X}function T(P,v){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==tn&&P.minFilter!==dn?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function C(P){const v=P.target;v.removeEventListener("dispose",C),R(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function x(P){const v=P.target;v.removeEventListener("dispose",x),M(v)}function R(P){const v=i.get(P);if(v.__webglInit===void 0)return;const X=P.source,Z=h.get(X);if(Z){const ae=Z[v.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&O(P),Object.keys(Z).length===0&&h.delete(X)}i.remove(P)}function O(P){const v=i.get(P);t.deleteTexture(v.__webglTexture);const X=P.source,Z=h.get(X);delete Z[v.__cacheKey],o.memory.textures--}function M(P){const v=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let ae=0;ae<v.__webglFramebuffer[Z].length;ae++)t.deleteFramebuffer(v.__webglFramebuffer[Z][ae]);else t.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)t.deleteFramebuffer(v.__webglFramebuffer[Z]);else t.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&t.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&t.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&t.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const X=P.textures;for(let Z=0,ae=X.length;Z<ae;Z++){const Ae=i.get(X[Z]);Ae.__webglTexture&&(t.deleteTexture(Ae.__webglTexture),o.memory.textures--),i.remove(X[Z])}i.remove(P)}let I=0;function ce(){I=0}function he(){return I}function Y(P){I=P}function ne(){const P=I;return P>=r.maxTextures&&st("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),I+=1,P}function G(P){const v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function oe(P,v){const X=i.get(P);if(P.isVideoTexture&&U(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&X.__version!==P.version){const Z=P.image;if(Z===null)st("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)st("WebGLRenderer: Texture marked for update but image is incomplete");else{N(X,P,v);return}}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,X.__webglTexture,t.TEXTURE0+v)}function _e(P,v){const X=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){N(X,P,v);return}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,X.__webglTexture,t.TEXTURE0+v)}function Ee(P,v){const X=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){N(X,P,v);return}n.bindTexture(t.TEXTURE_3D,X.__webglTexture,t.TEXTURE0+v)}function be(P,v){const X=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&X.__version!==P.version){j(X,P,v);return}n.bindTexture(t.TEXTURE_CUBE_MAP,X.__webglTexture,t.TEXTURE0+v)}const Ce={[kc]:t.REPEAT,[Di]:t.CLAMP_TO_EDGE,[Vc]:t.MIRRORED_REPEAT},Re={[tn]:t.NEAREST,[xS]:t.NEAREST_MIPMAP_NEAREST,[Lo]:t.NEAREST_MIPMAP_LINEAR,[dn]:t.LINEAR,[Pl]:t.LINEAR_MIPMAP_NEAREST,[yr]:t.LINEAR_MIPMAP_LINEAR},we={[SS]:t.NEVER,[wS]:t.ALWAYS,[MS]:t.LESS,[ef]:t.LEQUAL,[ES]:t.EQUAL,[tf]:t.GEQUAL,[TS]:t.GREATER,[AS]:t.NOTEQUAL};function xe(P,v){if(v.type===ui&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===dn||v.magFilter===Pl||v.magFilter===Lo||v.magFilter===yr||v.minFilter===dn||v.minFilter===Pl||v.minFilter===Lo||v.minFilter===yr)&&st("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,Ce[v.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,Ce[v.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,Ce[v.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,Re[v.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,Re[v.minFilter]),v.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,we[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===tn||v.minFilter!==Lo&&v.minFilter!==yr||v.type===ui&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function k(P,v){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",C));const Z=v.source;let ae=h.get(Z);ae===void 0&&(ae={},h.set(Z,ae));const Ae=G(v);if(Ae!==P.__cacheKey){ae[Ae]===void 0&&(ae[Ae]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ae[Ae].usedTimes++;const Le=ae[P.__cacheKey];Le!==void 0&&(ae[P.__cacheKey].usedTimes--,Le.usedTimes===0&&O(v)),P.__cacheKey=Ae,P.__webglTexture=ae[Ae].texture}return X}function F(P,v,X){return Math.floor(Math.floor(P/X)/v)}function H(P,v,X,Z){const Ae=P.updateRanges;if(Ae.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,v.width,v.height,X,Z,v.data);else{Ae.sort((Xe,Oe)=>Xe.start-Oe.start);let Le=0;for(let Xe=1;Xe<Ae.length;Xe++){const Oe=Ae[Le],Ie=Ae[Xe],et=Oe.start+Oe.count,it=F(Ie.start,v.width,4),ot=F(Oe.start,v.width,4);Ie.start<=et+1&&it===ot&&F(Ie.start+Ie.count-1,v.width,4)===it?Oe.count=Math.max(Oe.count,Ie.start+Ie.count-Oe.start):(++Le,Ae[Le]=Ie)}Ae.length=Le+1;const pe=n.getParameter(t.UNPACK_ROW_LENGTH),ge=n.getParameter(t.UNPACK_SKIP_PIXELS),De=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,v.width);for(let Xe=0,Oe=Ae.length;Xe<Oe;Xe++){const Ie=Ae[Xe],et=Math.floor(Ie.start/4),it=Math.ceil(Ie.count/4),ot=et%v.width,$=Math.floor(et/v.width),Ue=it,ve=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,ot),n.pixelStorei(t.UNPACK_SKIP_ROWS,$),n.texSubImage2D(t.TEXTURE_2D,0,ot,$,Ue,ve,X,Z,v.data)}P.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,pe),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ge),n.pixelStorei(t.UNPACK_SKIP_ROWS,De)}}function N(P,v,X){let Z=t.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=t.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=t.TEXTURE_3D);const ae=k(P,v),Ae=v.source;n.bindTexture(Z,P.__webglTexture,t.TEXTURE0+X);const Le=i.get(Ae);if(Ae.version!==Le.__version||ae===!0){if(n.activeTexture(t.TEXTURE0+X),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ve=xt.getPrimaries(xt.workingColorSpace),Be=v.colorSpace===ir?null:xt.getPrimaries(v.colorSpace),He=v.colorSpace===ir||ve===Be?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,He)}n.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment);let ge=m(v.image,!1,r.maxTextureSize);ge=We(v,ge);const De=s.convert(v.format,v.colorSpace),Xe=s.convert(v.type);let Oe=b(v.internalFormat,De,Xe,v.normalized,v.colorSpace,v.isVideoTexture);xe(Z,v);let Ie;const et=v.mipmaps,it=v.isVideoTexture!==!0,ot=Le.__version===void 0||ae===!0,$=Ae.dataReady,Ue=T(v,ge);if(v.isDepthTexture)Oe=w(v.format===Sr,v.type),ot&&(it?n.texStorage2D(t.TEXTURE_2D,1,Oe,ge.width,ge.height):n.texImage2D(t.TEXTURE_2D,0,Oe,ge.width,ge.height,0,De,Xe,null));else if(v.isDataTexture)if(et.length>0){it&&ot&&n.texStorage2D(t.TEXTURE_2D,Ue,Oe,et[0].width,et[0].height);for(let ve=0,Be=et.length;ve<Be;ve++)Ie=et[ve],it?$&&n.texSubImage2D(t.TEXTURE_2D,ve,0,0,Ie.width,Ie.height,De,Xe,Ie.data):n.texImage2D(t.TEXTURE_2D,ve,Oe,Ie.width,Ie.height,0,De,Xe,Ie.data);v.generateMipmaps=!1}else it?(ot&&n.texStorage2D(t.TEXTURE_2D,Ue,Oe,ge.width,ge.height),$&&H(v,ge,De,Xe)):n.texImage2D(t.TEXTURE_2D,0,Oe,ge.width,ge.height,0,De,Xe,ge.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){it&&ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,Oe,et[0].width,et[0].height,ge.depth);for(let ve=0,Be=et.length;ve<Be;ve++)if(Ie=et[ve],v.format!==$n)if(De!==null)if(it){if($)if(v.layerUpdates.size>0){const He=dh(Ie.width,Ie.height,v.format,v.type);for(const Se of v.layerUpdates){const Ke=Ie.data.subarray(Se*He/Ie.data.BYTES_PER_ELEMENT,(Se+1)*He/Ie.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ve,0,0,Se,Ie.width,Ie.height,1,De,Ke)}v.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ve,0,0,0,Ie.width,Ie.height,ge.depth,De,Ie.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ve,Oe,Ie.width,Ie.height,ge.depth,0,Ie.data,0,0);else st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else it?$&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ve,0,0,0,Ie.width,Ie.height,ge.depth,De,Xe,Ie.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ve,Oe,Ie.width,Ie.height,ge.depth,0,De,Xe,Ie.data)}else{it&&ot&&n.texStorage2D(t.TEXTURE_2D,Ue,Oe,et[0].width,et[0].height);for(let ve=0,Be=et.length;ve<Be;ve++)Ie=et[ve],v.format!==$n?De!==null?it?$&&n.compressedTexSubImage2D(t.TEXTURE_2D,ve,0,0,Ie.width,Ie.height,De,Ie.data):n.compressedTexImage2D(t.TEXTURE_2D,ve,Oe,Ie.width,Ie.height,0,Ie.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?$&&n.texSubImage2D(t.TEXTURE_2D,ve,0,0,Ie.width,Ie.height,De,Xe,Ie.data):n.texImage2D(t.TEXTURE_2D,ve,Oe,Ie.width,Ie.height,0,De,Xe,Ie.data)}else if(v.isDataArrayTexture)if(it){if(ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ue,Oe,ge.width,ge.height,ge.depth),$)if(v.layerUpdates.size>0){const ve=dh(ge.width,ge.height,v.format,v.type);for(const Be of v.layerUpdates){const He=ge.data.subarray(Be*ve/ge.data.BYTES_PER_ELEMENT,(Be+1)*ve/ge.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Be,ge.width,ge.height,1,De,Xe,He)}v.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,De,Xe,ge.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Oe,ge.width,ge.height,ge.depth,0,De,Xe,ge.data);else if(v.isData3DTexture)it?(ot&&n.texStorage3D(t.TEXTURE_3D,Ue,Oe,ge.width,ge.height,ge.depth),$&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,De,Xe,ge.data)):n.texImage3D(t.TEXTURE_3D,0,Oe,ge.width,ge.height,ge.depth,0,De,Xe,ge.data);else if(v.isFramebufferTexture){if(ot)if(it)n.texStorage2D(t.TEXTURE_2D,Ue,Oe,ge.width,ge.height);else{let ve=ge.width,Be=ge.height;for(let He=0;He<Ue;He++)n.texImage2D(t.TEXTURE_2D,He,Oe,ve,Be,0,De,Xe,null),ve>>=1,Be>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in t){const ve=t.canvas;if(ve.hasAttribute("layoutsubtree")||ve.setAttribute("layoutsubtree","true"),ge.parentNode!==ve){ve.appendChild(ge),f.add(v),ve.onpaint=Be=>{const He=Be.changedElements;for(const Se of f)He.includes(Se.image)&&(Se.needsUpdate=!0)},ve.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,ge);else{const He=t.RGBA,Se=t.RGBA,Ke=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,He,Se,Ke,ge)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(et.length>0){if(it&&ot){const ve=Ne(et[0]);n.texStorage2D(t.TEXTURE_2D,Ue,Oe,ve.width,ve.height)}for(let ve=0,Be=et.length;ve<Be;ve++)Ie=et[ve],it?$&&n.texSubImage2D(t.TEXTURE_2D,ve,0,0,De,Xe,Ie):n.texImage2D(t.TEXTURE_2D,ve,Oe,De,Xe,Ie);v.generateMipmaps=!1}else if(it){if(ot){const ve=Ne(ge);n.texStorage2D(t.TEXTURE_2D,Ue,Oe,ve.width,ve.height)}$&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,De,Xe,ge)}else n.texImage2D(t.TEXTURE_2D,0,Oe,De,Xe,ge);p(v)&&y(Z),Le.__version=Ae.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function j(P,v,X){if(v.image.length!==6)return;const Z=k(P,v),ae=v.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+X);const Ae=i.get(ae);if(ae.version!==Ae.__version||Z===!0){n.activeTexture(t.TEXTURE0+X);const Le=xt.getPrimaries(xt.workingColorSpace),pe=v.colorSpace===ir?null:xt.getPrimaries(v.colorSpace),ge=v.colorSpace===ir||Le===pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const De=v.isCompressedTexture||v.image[0].isCompressedTexture,Xe=v.image[0]&&v.image[0].isDataTexture,Oe=[];for(let Se=0;Se<6;Se++)!De&&!Xe?Oe[Se]=m(v.image[Se],!0,r.maxCubemapSize):Oe[Se]=Xe?v.image[Se].image:v.image[Se],Oe[Se]=We(v,Oe[Se]);const Ie=Oe[0],et=s.convert(v.format,v.colorSpace),it=s.convert(v.type),ot=b(v.internalFormat,et,it,v.normalized,v.colorSpace),$=v.isVideoTexture!==!0,Ue=Ae.__version===void 0||Z===!0,ve=ae.dataReady;let Be=T(v,Ie);xe(t.TEXTURE_CUBE_MAP,v);let He;if(De){$&&Ue&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Be,ot,Ie.width,Ie.height);for(let Se=0;Se<6;Se++){He=Oe[Se].mipmaps;for(let Ke=0;Ke<He.length;Ke++){const Ye=He[Ke];v.format!==$n?et!==null?$?ve&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke,0,0,Ye.width,Ye.height,et,Ye.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke,ot,Ye.width,Ye.height,0,Ye.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?ve&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke,0,0,Ye.width,Ye.height,et,it,Ye.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke,ot,Ye.width,Ye.height,0,et,it,Ye.data)}}}else{if(He=v.mipmaps,$&&Ue){He.length>0&&Be++;const Se=Ne(Oe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Be,ot,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(Xe){$?ve&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Oe[Se].width,Oe[Se].height,et,it,Oe[Se].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ot,Oe[Se].width,Oe[Se].height,0,et,it,Oe[Se].data);for(let Ke=0;Ke<He.length;Ke++){const Bt=He[Ke].image[Se].image;$?ve&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke+1,0,0,Bt.width,Bt.height,et,it,Bt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke+1,ot,Bt.width,Bt.height,0,et,it,Bt.data)}}else{$?ve&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,et,it,Oe[Se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ot,et,it,Oe[Se]);for(let Ke=0;Ke<He.length;Ke++){const Ye=He[Ke];$?ve&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke+1,0,0,et,it,Ye.image[Se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ke+1,ot,et,it,Ye.image[Se])}}}p(v)&&y(t.TEXTURE_CUBE_MAP),Ae.__version=ae.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function J(P,v,X,Z,ae,Ae){const Le=s.convert(X.format,X.colorSpace),pe=s.convert(X.type),ge=b(X.internalFormat,Le,pe,X.normalized,X.colorSpace),De=i.get(v),Xe=i.get(X);if(Xe.__renderTarget=v,!De.__hasExternalTextures){const Oe=Math.max(1,v.width>>Ae),Ie=Math.max(1,v.height>>Ae);ae===t.TEXTURE_3D||ae===t.TEXTURE_2D_ARRAY?n.texImage3D(ae,Ae,ge,Oe,Ie,v.depth,0,Le,pe,null):n.texImage2D(ae,Ae,ge,Oe,Ie,0,Le,pe,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Fe(v)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,ae,Xe.__webglTexture,0,me(v)):(ae===t.TEXTURE_2D||ae>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Z,ae,Xe.__webglTexture,Ae),n.bindFramebuffer(t.FRAMEBUFFER,null)}function D(P,v,X){if(t.bindRenderbuffer(t.RENDERBUFFER,P),v.depthBuffer){const Z=v.depthTexture,ae=Z&&Z.isDepthTexture?Z.type:null,Ae=w(v.stencilBuffer,ae),Le=v.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Fe(v)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,me(v),Ae,v.width,v.height):X?t.renderbufferStorageMultisample(t.RENDERBUFFER,me(v),Ae,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,Ae,v.width,v.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Le,t.RENDERBUFFER,P)}else{const Z=v.textures;for(let ae=0;ae<Z.length;ae++){const Ae=Z[ae],Le=s.convert(Ae.format,Ae.colorSpace),pe=s.convert(Ae.type),ge=b(Ae.internalFormat,Le,pe,Ae.normalized,Ae.colorSpace);Fe(v)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,me(v),ge,v.width,v.height):X?t.renderbufferStorageMultisample(t.RENDERBUFFER,me(v),ge,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,ge,v.width,v.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function L(P,v,X){const Z=v.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ae=i.get(v.depthTexture);if(ae.__renderTarget=v,(!ae.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z){if(ae.__webglInit===void 0&&(ae.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),ae.__webglTexture===void 0){ae.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,ae.__webglTexture),xe(t.TEXTURE_CUBE_MAP,v.depthTexture);const De=s.convert(v.depthTexture.format),Xe=s.convert(v.depthTexture.type);let Oe;v.depthTexture.format===Vi?Oe=t.DEPTH_COMPONENT24:v.depthTexture.format===Sr&&(Oe=t.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,Oe,v.width,v.height,0,De,Xe,null)}}else oe(v.depthTexture,0);const Ae=ae.__webglTexture,Le=me(v),pe=Z?t.TEXTURE_CUBE_MAP_POSITIVE_X+X:t.TEXTURE_2D,ge=v.depthTexture.format===Sr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(v.depthTexture.format===Vi)Fe(v)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ge,pe,Ae,0,Le):t.framebufferTexture2D(t.FRAMEBUFFER,ge,pe,Ae,0);else if(v.depthTexture.format===Sr)Fe(v)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ge,pe,Ae,0,Le):t.framebufferTexture2D(t.FRAMEBUFFER,ge,pe,Ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function V(P){const v=i.get(P),X=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const ae=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",ae)};Z.addEventListener("dispose",ae),v.__depthDisposeCallback=ae}v.__boundDepthTexture=Z}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(X)for(let Z=0;Z<6;Z++)L(v.__webglFramebuffer[Z],P,Z);else{const Z=P.texture.mipmaps;Z&&Z.length>0?L(v.__webglFramebuffer[0],P,0):L(v.__webglFramebuffer,P,0)}else if(X){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=t.createRenderbuffer(),D(v.__webglDepthbuffer[Z],P,!1);else{const ae=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ae=v.__webglDepthbuffer[Z];t.bindRenderbuffer(t.RENDERBUFFER,Ae),t.framebufferRenderbuffer(t.FRAMEBUFFER,ae,t.RENDERBUFFER,Ae)}}else{const Z=P.texture.mipmaps;if(Z&&Z.length>0?n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=t.createRenderbuffer(),D(v.__webglDepthbuffer,P,!1);else{const ae=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ae=v.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,Ae),t.framebufferRenderbuffer(t.FRAMEBUFFER,ae,t.RENDERBUFFER,Ae)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function ee(P,v,X){const Z=i.get(P);v!==void 0&&J(Z.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),X!==void 0&&V(P)}function z(P){const v=P.texture,X=i.get(P),Z=i.get(v);P.addEventListener("dispose",x);const ae=P.textures,Ae=P.isWebGLCubeRenderTarget===!0,Le=ae.length>1;if(Le||(Z.__webglTexture===void 0&&(Z.__webglTexture=t.createTexture()),Z.__version=v.version,o.memory.textures++),Ae){X.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(v.mipmaps&&v.mipmaps.length>0){X.__webglFramebuffer[pe]=[];for(let ge=0;ge<v.mipmaps.length;ge++)X.__webglFramebuffer[pe][ge]=t.createFramebuffer()}else X.__webglFramebuffer[pe]=t.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){X.__webglFramebuffer=[];for(let pe=0;pe<v.mipmaps.length;pe++)X.__webglFramebuffer[pe]=t.createFramebuffer()}else X.__webglFramebuffer=t.createFramebuffer();if(Le)for(let pe=0,ge=ae.length;pe<ge;pe++){const De=i.get(ae[pe]);De.__webglTexture===void 0&&(De.__webglTexture=t.createTexture(),o.memory.textures++)}if(P.samples>0&&Fe(P)===!1){X.__webglMultisampledFramebuffer=t.createFramebuffer(),X.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let pe=0;pe<ae.length;pe++){const ge=ae[pe];X.__webglColorRenderbuffer[pe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,X.__webglColorRenderbuffer[pe]);const De=s.convert(ge.format,ge.colorSpace),Xe=s.convert(ge.type),Oe=b(ge.internalFormat,De,Xe,ge.normalized,ge.colorSpace,P.isXRRenderTarget===!0),Ie=me(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ie,Oe,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,X.__webglColorRenderbuffer[pe])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=t.createRenderbuffer(),D(X.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Ae){n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),xe(t.TEXTURE_CUBE_MAP,v);for(let pe=0;pe<6;pe++)if(v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)J(X.__webglFramebuffer[pe][ge],P,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,ge);else J(X.__webglFramebuffer[pe],P,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);p(v)&&y(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Le){for(let pe=0,ge=ae.length;pe<ge;pe++){const De=ae[pe],Xe=i.get(De);let Oe=t.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Oe=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Oe,Xe.__webglTexture),xe(Oe,De),J(X.__webglFramebuffer,P,De,t.COLOR_ATTACHMENT0+pe,Oe,0),p(De)&&y(Oe)}n.unbindTexture()}else{let pe=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(pe=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(pe,Z.__webglTexture),xe(pe,v),v.mipmaps&&v.mipmaps.length>0)for(let ge=0;ge<v.mipmaps.length;ge++)J(X.__webglFramebuffer[ge],P,v,t.COLOR_ATTACHMENT0,pe,ge);else J(X.__webglFramebuffer,P,v,t.COLOR_ATTACHMENT0,pe,0);p(v)&&y(pe),n.unbindTexture()}P.depthBuffer&&V(P)}function te(P){const v=P.textures;for(let X=0,Z=v.length;X<Z;X++){const ae=v[X];if(p(ae)){const Ae=E(P),Le=i.get(ae).__webglTexture;n.bindTexture(Ae,Le),y(Ae),n.unbindTexture()}}}const Me=[],ye=[];function Te(P){if(P.samples>0){if(Fe(P)===!1){const v=P.textures,X=P.width,Z=P.height;let ae=t.COLOR_BUFFER_BIT;const Ae=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Le=i.get(P),pe=v.length>1;if(pe)for(let De=0;De<v.length;De++)n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);const ge=P.texture.mipmaps;ge&&ge.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let De=0;De<v.length;De++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ae|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ae|=t.STENCIL_BUFFER_BIT)),pe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Le.__webglColorRenderbuffer[De]);const Xe=i.get(v[De]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Xe,0)}t.blitFramebuffer(0,0,X,Z,0,0,X,Z,ae,t.NEAREST),l===!0&&(Me.length=0,ye.length=0,Me.push(t.COLOR_ATTACHMENT0+De),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Me.push(Ae),ye.push(Ae),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,ye)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Me))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),pe)for(let De=0;De<v.length;De++){n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,Le.__webglColorRenderbuffer[De]);const Xe=i.get(v[De]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,Xe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const v=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[v])}}}function me(P){return Math.min(r.maxSamples,P.samples)}function Fe(P){const v=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(P){const v=o.render.frame;u.get(P)!==v&&(u.set(P,v),P.update())}function We(P,v){const X=P.colorSpace,Z=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==Ca&&X!==ir&&(xt.getTransfer(X)===wt?(Z!==$n||ae!==Fn)&&st("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):bt("WebGLTextures: Unsupported texture color space:",X)),v}function Ne(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=ne,this.resetTextureUnits=ce,this.getTextureUnits=he,this.setTextureUnits=Y,this.setTexture2D=oe,this.setTexture2DArray=_e,this.setTexture3D=Ee,this.setTextureCube=be,this.rebindTextures=ee,this.setupRenderTarget=z,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=V,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Fe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function _1(t,e){function n(i,r=ir){let s;const o=xt.getTransfer(r);if(i===Fn)return t.UNSIGNED_BYTE;if(i===Ku)return t.UNSIGNED_SHORT_4_4_4_4;if(i===ju)return t.UNSIGNED_SHORT_5_5_5_1;if(i===jm)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Zm)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ym)return t.BYTE;if(i===Km)return t.SHORT;if(i===co)return t.UNSIGNED_SHORT;if(i===Yu)return t.INT;if(i===gi)return t.UNSIGNED_INT;if(i===ui)return t.FLOAT;if(i===ki)return t.HALF_FLOAT;if(i===Jm)return t.ALPHA;if(i===Qm)return t.RGB;if(i===$n)return t.RGBA;if(i===Vi)return t.DEPTH_COMPONENT;if(i===Sr)return t.DEPTH_STENCIL;if(i===eg)return t.RED;if(i===Zu)return t.RED_INTEGER;if(i===Pr)return t.RG;if(i===Ju)return t.RG_INTEGER;if(i===Qu)return t.RGBA_INTEGER;if(i===ca||i===ua||i===fa||i===da)if(o===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ca)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===da)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ca)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ua)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===da)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Hc||i===zc||i===Gc||i===Wc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Hc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Gc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xc||i===$c||i===qc||i===Yc||i===Kc||i===wa||i===jc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Xc||i===$c)return o===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===qc)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Yc)return s.COMPRESSED_R11_EAC;if(i===Kc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===wa)return s.COMPRESSED_RG11_EAC;if(i===jc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Zc||i===Jc||i===Qc||i===eu||i===tu||i===nu||i===iu||i===ru||i===su||i===ou||i===au||i===lu||i===cu||i===uu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Zc)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Jc)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qc)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===eu)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===tu)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nu)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===iu)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ru)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===su)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ou)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===au)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===lu)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===cu)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===uu)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fu||i===du||i===hu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===fu)return o===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===du)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===pu||i===mu||i===Ra||i===gu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===pu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===mu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ra)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===gu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===uo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const v1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,x1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class b1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new cg(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new _i({vertexShader:v1,fragmentShader:x1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Jn(new rl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y1 extends Ur{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,d=null,h=null,_=null;const S=typeof XRWebGLBinding<"u",m=new b1,p={},y=n.getContextAttributes();let E=null,b=null;const w=[],T=[],C=new Mt;let x=null;const R=new On;R.viewport=new Ht;const O=new On;O.viewport=new Ht;const M=[R,O],I=new PM;let ce=null,he=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let F=w[k];return F===void 0&&(F=new Ol,w[k]=F),F.getTargetRaySpace()},this.getControllerGrip=function(k){let F=w[k];return F===void 0&&(F=new Ol,w[k]=F),F.getGripSpace()},this.getHand=function(k){let F=w[k];return F===void 0&&(F=new Ol,w[k]=F),F.getHandSpace()};function Y(k){const F=T.indexOf(k.inputSource);if(F===-1)return;const H=w[F];H!==void 0&&(H.update(k.inputSource,k.frame,c||o),H.dispatchEvent({type:k.type,data:k.inputSource}))}function ne(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",ne),r.removeEventListener("inputsourceschange",G);for(let k=0;k<w.length;k++){const F=T[k];F!==null&&(T[k]=null,w[k].disconnect(F))}ce=null,he=null,m.reset();for(const k in p)delete p[k];e.setRenderTarget(E),h=null,d=null,f=null,r=null,b=null,xe.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,i.isPresenting===!0&&st("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,i.isPresenting===!0&&st("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",ne),r.addEventListener("inputsourceschange",G),y.xrCompatible!==!0&&await n.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let H=null,N=null,j=null;y.depth&&(j=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,H=y.stencil?Sr:Vi,N=y.stencil?uo:gi);const J={colorFormat:n.RGBA8,depthFormat:j,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(J),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new pi(d.textureWidth,d.textureHeight,{format:$n,type:Fn,depthTexture:new ys(d.textureWidth,d.textureHeight,N,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const H={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,n,H),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new pi(h.framebufferWidth,h.framebufferHeight,{format:$n,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),xe.setContext(r),xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(k){for(let F=0;F<k.removed.length;F++){const H=k.removed[F],N=T.indexOf(H);N>=0&&(T[N]=null,w[N].disconnect(H))}for(let F=0;F<k.added.length;F++){const H=k.added[F];let N=T.indexOf(H);if(N===-1){for(let J=0;J<w.length;J++)if(J>=T.length){T.push(H),N=J;break}else if(T[J]===null){T[J]=H,N=J;break}if(N===-1)break}const j=w[N];j&&j.connect(H)}}const oe=new re,_e=new re;function Ee(k,F,H){oe.setFromMatrixPosition(F.matrixWorld),_e.setFromMatrixPosition(H.matrixWorld);const N=oe.distanceTo(_e),j=F.projectionMatrix.elements,J=H.projectionMatrix.elements,D=j[14]/(j[10]-1),L=j[14]/(j[10]+1),V=(j[9]+1)/j[5],ee=(j[9]-1)/j[5],z=(j[8]-1)/j[0],te=(J[8]+1)/J[0],Me=D*z,ye=D*te,Te=N/(-z+te),me=Te*-z;if(F.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(me),k.translateZ(Te),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),j[10]===-1)k.projectionMatrix.copy(F.projectionMatrix),k.projectionMatrixInverse.copy(F.projectionMatrixInverse);else{const Fe=D+Te,U=L+Te,We=Me-me,Ne=ye+(N-me),P=V*L/U*Fe,v=ee*L/U*Fe;k.projectionMatrix.makePerspective(We,Ne,P,v,Fe,U),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function be(k,F){F===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(F.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;let F=k.near,H=k.far;m.texture!==null&&(m.depthNear>0&&(F=m.depthNear),m.depthFar>0&&(H=m.depthFar)),I.near=O.near=R.near=F,I.far=O.far=R.far=H,(ce!==I.near||he!==I.far)&&(r.updateRenderState({depthNear:I.near,depthFar:I.far}),ce=I.near,he=I.far),I.layers.mask=k.layers.mask|6,R.layers.mask=I.layers.mask&-5,O.layers.mask=I.layers.mask&-3;const N=k.parent,j=I.cameras;be(I,N);for(let J=0;J<j.length;J++)be(j[J],N);j.length===2?Ee(I,R,O):I.projectionMatrix.copy(R.projectionMatrix),Ce(k,I,N)};function Ce(k,F,H){H===null?k.matrix.copy(F.matrixWorld):(k.matrix.copy(H.matrixWorld),k.matrix.invert(),k.matrix.multiply(F.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(F.projectionMatrix),k.projectionMatrixInverse.copy(F.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=ho*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(k){l=k,d!==null&&(d.fixedFoveation=k),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=k)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(k){return p[k]};let Re=null;function we(k,F){if(u=F.getViewerPose(c||o),_=F,u!==null){const H=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let N=!1;H.length!==I.cameras.length&&(I.cameras.length=0,N=!0);for(let L=0;L<H.length;L++){const V=H[L];let ee=null;if(h!==null)ee=h.getViewport(V);else{const te=f.getViewSubImage(d,V);ee=te.viewport,L===0&&(e.setRenderTargetTextures(b,te.colorTexture,te.depthStencilTexture),e.setRenderTarget(b))}let z=M[L];z===void 0&&(z=new On,z.layers.enable(L),z.viewport=new Ht,M[L]=z),z.matrix.fromArray(V.transform.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale),z.projectionMatrix.fromArray(V.projectionMatrix),z.projectionMatrixInverse.copy(z.projectionMatrix).invert(),z.viewport.set(ee.x,ee.y,ee.width,ee.height),L===0&&(I.matrix.copy(z.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),N===!0&&I.cameras.push(z)}const j=r.enabledFeatures;if(j&&j.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const L=f.getDepthInformation(H[0]);L&&L.isValid&&L.texture&&m.init(L,r.renderState)}if(j&&j.includes("camera-access")&&S){e.state.unbindTexture(),f=i.getBinding();for(let L=0;L<H.length;L++){const V=H[L].camera;if(V){let ee=p[V];ee||(ee=new cg,p[V]=ee);const z=f.getCameraImage(V);ee.sourceTexture=z}}}}for(let H=0;H<w.length;H++){const N=T[H],j=w[H];N!==null&&j!==void 0&&j.update(N,F,c||o)}Re&&Re(k,F),F.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:F}),_=null}const xe=new hg;xe.setAnimationLoop(we),this.setAnimationLoop=function(k){Re=k},this.dispose=function(){}}}const S1=new $t,bg=new lt;bg.set(-1,0,0,0,1,0,0,0,1);function M1(t,e){function n(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,ug(t)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,E,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&h(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),S(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===An&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===An&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),E=y.envMap,b=y.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(S1.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(bg),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=E*.5,p.map&&(m.map.value=p.map,n(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===An&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function E1(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,w){const T=w.program;i.uniformBlockBinding(b,T)}function c(b,w){let T=r[b.id];T===void 0&&(m(b),T=u(b),r[b.id]=T,b.addEventListener("dispose",y));const C=w.program;i.updateUBOMapping(b,C);const x=e.render.frame;s[b.id]!==x&&(d(b),s[b.id]=x)}function u(b){const w=f();b.__bindingPointIndex=w;const T=t.createBuffer(),C=b.__size,x=b.usage;return t.bindBuffer(t.UNIFORM_BUFFER,T),t.bufferData(t.UNIFORM_BUFFER,C,x),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,T),T}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const w=r[b.id],T=b.uniforms,C=b.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let x=0,R=T.length;x<R;x++){const O=T[x];if(Array.isArray(O))for(let M=0,I=O.length;M<I;M++)h(O[M],x,M,C);else h(O,x,0,C)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(b,w,T,C){if(S(b,w,T,C)===!0){const x=b.__offset,R=b.value;if(Array.isArray(R)){let O=0;for(let M=0;M<R.length;M++){const I=R[M],ce=p(I);_(I,b.__data,O),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(O+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(R,b.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,x,b.__data)}}function _(b,w,T){typeof b=="number"||typeof b=="boolean"?w[0]=b:b.isMatrix3?(w[0]=b.elements[0],w[1]=b.elements[1],w[2]=b.elements[2],w[3]=0,w[4]=b.elements[3],w[5]=b.elements[4],w[6]=b.elements[5],w[7]=0,w[8]=b.elements[6],w[9]=b.elements[7],w[10]=b.elements[8],w[11]=0):ArrayBuffer.isView(b)?w.set(new b.constructor(b.buffer,b.byteOffset,w.length)):b.toArray(w,T)}function S(b,w,T,C){const x=b.value,R=w+"_"+T;if(C[R]===void 0)return typeof x=="number"||typeof x=="boolean"?C[R]=x:ArrayBuffer.isView(x)?C[R]=x.slice():C[R]=x.clone(),!0;{const O=C[R];if(typeof x=="number"||typeof x=="boolean"){if(O!==x)return C[R]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(O.equals(x)===!1)return O.copy(x),!0}}return!1}function m(b){const w=b.uniforms;let T=0;const C=16;for(let R=0,O=w.length;R<O;R++){const M=Array.isArray(w[R])?w[R]:[w[R]];for(let I=0,ce=M.length;I<ce;I++){const he=M[I],Y=Array.isArray(he.value)?he.value:[he.value];for(let ne=0,G=Y.length;ne<G;ne++){const oe=Y[ne],_e=p(oe),Ee=T%C,be=Ee%_e.boundary,Ce=Ee+be;T+=be,Ce!==0&&C-Ce<_e.storage&&(T+=C-Ce),he.__data=new Float32Array(_e.storage/Float32Array.BYTES_PER_ELEMENT),he.__offset=T,T+=_e.storage}}}const x=T%C;return x>0&&(T+=C-x),b.__size=T,b.__cache={},this}function p(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?st("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(w.boundary=16,w.storage=b.byteLength):st("WebGLRenderer: Unsupported uniform value type.",b),w}function y(b){const w=b.target;w.removeEventListener("dispose",y);const T=o.indexOf(w.__bindingPointIndex);o.splice(T,1),t.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function E(){for(const b in r)t.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:E}}const T1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ri=null;function A1(){return ri===null&&(ri=new hM(T1,16,16,Pr,ki),ri.name="DFG_LUT",ri.minFilter=dn,ri.magFilter=dn,ri.wrapS=Di,ri.wrapT=Di,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}class w1{constructor(e={}){const{canvas:n=CS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=Fn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const S=h,m=new Set([Qu,Ju,Zu]),p=new Set([Fn,gi,co,uo,Ku,ju]),y=new Uint32Array(4),E=new Int32Array(4),b=new re;let w=null,T=null;const C=[],x=[];let R=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let M=!1,I=null,ce=null,he=null,Y=null;this._outputColorSpace=Pn;let ne=0,G=0,oe=null,_e=-1,Ee=null;const be=new Ht,Ce=new Ht;let Re=null;const we=new At(0);let xe=0,k=n.width,F=n.height,H=1,N=null,j=null;const J=new Ht(0,0,k,F),D=new Ht(0,0,k,F);let L=!1;const V=new ag;let ee=!1,z=!1;const te=new $t,Me=new re,ye=new Ht,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Fe(){return oe===null?H:1}let U=i;function We(A,K){return n.getContext(A,K)}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${qu}`),n.addEventListener("webglcontextlost",Bt,!1),n.addEventListener("webglcontextrestored",Ct,!1),n.addEventListener("webglcontextcreationerror",W,!1),U===null){const K="webgl2";if(U=We(K,A),U===null)throw We(K)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw bt("WebGLRenderer: "+A.message),A}let Ne,P,v,X,Z,ae,Ae,Le,pe,ge,De,Xe,Oe,Ie,et,it,ot,$,Ue,ve,Be,He,Se;function Ke(){Ne=new AA(U),Ne.init(),Be=new _1(U,Ne),P=new vA(U,Ne,e,Be),v=new m1(U,Ne),P.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),ce=U.createFramebuffer(),he=U.createFramebuffer(),Y=U.createFramebuffer(),X=new CA(U),Z=new t1,ae=new g1(U,Ne,v,Z,P,Be,X),Ae=new TA(O),Le=new IM(U),He=new gA(U,Le),pe=new wA(U,Le,X,He),ge=new DA(U,pe,Le,He,X),$=new PA(U,P,ae),et=new xA(Z),De=new e1(O,Ae,Ne,P,He,et),Xe=new M1(O,Z),Oe=new i1,Ie=new c1(Ne),ot=new mA(O,Ae,v,ge,_,l),it=new p1(O,ge,P),Se=new E1(U,X,P,v),Ue=new _A(U,Ne,X),ve=new RA(U,Ne,X),X.programs=De.programs,O.capabilities=P,O.extensions=Ne,O.properties=Z,O.renderLists=Oe,O.shadowMap=it,O.state=v,O.info=X}Ke(),S!==Fn&&(R=new IA(S,n.width,n.height,a,r,s));const Ye=new y1(O,U);this.xr=Ye,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const A=Ne.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ne.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(A){A!==void 0&&(H=A,this.setSize(k,F,!1))},this.getSize=function(A){return A.set(k,F)},this.setSize=function(A,K,fe=!0){if(Ye.isPresenting){st("WebGLRenderer: Can't change size while VR device is presenting.");return}k=A,F=K,n.width=Math.floor(A*H),n.height=Math.floor(K*H),fe===!0&&(n.style.width=A+"px",n.style.height=K+"px"),R!==null&&R.setSize(n.width,n.height),this.setViewport(0,0,A,K)},this.getDrawingBufferSize=function(A){return A.set(k*H,F*H).floor()},this.setDrawingBufferSize=function(A,K,fe){k=A,F=K,H=fe,n.width=Math.floor(A*fe),n.height=Math.floor(K*fe),this.setViewport(0,0,A,K)},this.setEffects=function(A){if(S===Fn){bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let K=0;K<A.length;K++)if(A[K].isOutputPass===!0){st("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(be)},this.getViewport=function(A){return A.copy(J)},this.setViewport=function(A,K,fe,ie){A.isVector4?J.set(A.x,A.y,A.z,A.w):J.set(A,K,fe,ie),v.viewport(be.copy(J).multiplyScalar(H).round())},this.getScissor=function(A){return A.copy(D)},this.setScissor=function(A,K,fe,ie){A.isVector4?D.set(A.x,A.y,A.z,A.w):D.set(A,K,fe,ie),v.scissor(Ce.copy(D).multiplyScalar(H).round())},this.getScissorTest=function(){return L},this.setScissorTest=function(A){v.setScissorTest(L=A)},this.setOpaqueSort=function(A){N=A},this.setTransparentSort=function(A){j=A},this.getClearColor=function(A){return A.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor(...arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha(...arguments)},this.clear=function(A=!0,K=!0,fe=!0){let ie=0;if(A){let se=!1;if(oe!==null){const Ge=oe.texture.format;se=m.has(Ge)}if(se){const Ge=oe.texture.type,qe=p.has(Ge),ze=ot.getClearColor(),je=ot.getClearAlpha(),Je=ze.r,ct=ze.g,pt=ze.b;qe?(y[0]=Je,y[1]=ct,y[2]=pt,y[3]=je,U.clearBufferuiv(U.COLOR,0,y)):(E[0]=Je,E[1]=ct,E[2]=pt,E[3]=je,U.clearBufferiv(U.COLOR,0,E))}else ie|=U.COLOR_BUFFER_BIT}K&&(ie|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),fe&&(ie|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ie!==0&&U.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){n.removeEventListener("webglcontextlost",Bt,!1),n.removeEventListener("webglcontextrestored",Ct,!1),n.removeEventListener("webglcontextcreationerror",W,!1),ot.dispose(),Oe.dispose(),Ie.dispose(),Z.dispose(),Ae.dispose(),ge.dispose(),He.dispose(),Se.dispose(),De.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",hf),Ye.removeEventListener("sessionend",pf),lr.stop()};function Bt(A){A.preventDefault(),Gd("WebGLRenderer: Context Lost."),M=!0}function Ct(){Gd("WebGLRenderer: Context Restored."),M=!1;const A=X.autoReset,K=it.enabled,fe=it.autoUpdate,ie=it.needsUpdate,se=it.type;Ke(),X.autoReset=A,it.enabled=K,it.autoUpdate=fe,it.needsUpdate=ie,it.type=se}function W(A){bt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function B(A){const K=A.target;K.removeEventListener("dispose",B),Q(K)}function Q(A){Ze(A),Z.remove(A)}function Ze(A){const K=Z.get(A).programs;K!==void 0&&(K.forEach(function(fe){De.releaseProgram(fe)}),A.isShaderMaterial&&De.releaseShaderCache(A))}this.renderBufferDirect=function(A,K,fe,ie,se,Ge){K===null&&(K=Te);const qe=se.isMesh&&se.matrixWorld.determinantAffine()<0,ze=Cg(A,K,fe,ie,se);v.setMaterial(ie,qe);let je=fe.index,Je=1;if(ie.wireframe===!0){if(je=pe.getWireframeAttribute(fe),je===void 0)return;Je=2}const ct=fe.drawRange,pt=fe.attributes.position;let tt=ct.start*Je,Dt=(ct.start+ct.count)*Je;Ge!==null&&(tt=Math.max(tt,Ge.start*Je),Dt=Math.min(Dt,(Ge.start+Ge.count)*Je)),je!==null?(tt=Math.max(tt,0),Dt=Math.min(Dt,je.count)):pt!=null&&(tt=Math.max(tt,0),Dt=Math.min(Dt,pt.count));const Wt=Dt-tt;if(Wt<0||Wt===1/0)return;He.setup(se,ie,ze,fe,je);let kt,Lt=Ue;if(je!==null&&(kt=Le.get(je),Lt=ve,Lt.setIndex(kt)),se.isMesh)ie.wireframe===!0?(v.setLineWidth(ie.wireframeLinewidth*Fe()),Lt.setMode(U.LINES)):Lt.setMode(U.TRIANGLES);else if(se.isLine){let rn=ie.linewidth;rn===void 0&&(rn=1),v.setLineWidth(rn*Fe()),se.isLineSegments?Lt.setMode(U.LINES):se.isLineLoop?Lt.setMode(U.LINE_LOOP):Lt.setMode(U.LINE_STRIP)}else se.isPoints?Lt.setMode(U.POINTS):se.isSprite&&Lt.setMode(U.TRIANGLES);if(se.isBatchedMesh)if(Ne.get("WEBGL_multi_draw"))Lt.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else{const rn=se._multiDrawStarts,$e=se._multiDrawCounts,wn=se._multiDrawCount,yt=je?Le.get(je).bytesPerElement:1,Un=Z.get(ie).currentProgram.getUniforms();for(let ti=0;ti<wn;ti++)Un.setValue(U,"_gl_DrawID",ti),Lt.render(rn[ti]/yt,$e[ti])}else if(se.isInstancedMesh)Lt.renderInstances(tt,Wt,se.count);else if(fe.isInstancedBufferGeometry){const rn=fe._maxInstanceCount!==void 0?fe._maxInstanceCount:1/0,$e=Math.min(fe.instanceCount,rn);Lt.renderInstances(tt,Wt,$e)}else Lt.render(tt,Wt)};function Pt(A,K,fe){A.transparent===!0&&A.side===Pi&&A.forceSinglePass===!1?(A.side=An,A.needsUpdate=!0,wo(A,K,fe),A.side=ar,A.needsUpdate=!0,wo(A,K,fe),A.side=Pi):wo(A,K,fe)}this.compile=function(A,K,fe=null){fe===null&&(fe=A),T=Ie.get(fe),T.init(K),x.push(T),fe.traverseVisible(function(se){se.isLight&&se.layers.test(K.layers)&&(T.pushLight(se),se.castShadow&&T.pushShadow(se))}),A!==fe&&A.traverseVisible(function(se){se.isLight&&se.layers.test(K.layers)&&(T.pushLight(se),se.castShadow&&T.pushShadow(se))}),T.setupLights();const ie=new Set;return A.traverse(function(se){if(!(se.isMesh||se.isPoints||se.isLine||se.isSprite))return;const Ge=se.material;if(Ge)if(Array.isArray(Ge))for(let qe=0;qe<Ge.length;qe++){const ze=Ge[qe];Pt(ze,fe,se),ie.add(ze)}else Pt(Ge,fe,se),ie.add(Ge)}),T=x.pop(),ie},this.compileAsync=function(A,K,fe=null){const ie=this.compile(A,K,fe);return new Promise(se=>{function Ge(){if(ie.forEach(function(qe){Z.get(qe).currentProgram.isReady()&&ie.delete(qe)}),ie.size===0){se(A);return}setTimeout(Ge,10)}Ne.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let Ps=null;function wg(A){Ps&&Ps(A)}function hf(){lr.stop()}function pf(){lr.start()}const lr=new hg;lr.setAnimationLoop(wg),typeof self<"u"&&lr.setContext(self),this.setAnimationLoop=function(A){Ps=A,Ye.setAnimationLoop(A),A===null?lr.stop():lr.start()},Ye.addEventListener("sessionstart",hf),Ye.addEventListener("sessionend",pf),this.render=function(A,K){if(K!==void 0&&K.isCamera!==!0){bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;I!==null&&I.renderStart(A,K);const fe=Ye.enabled===!0&&Ye.isPresenting===!0,ie=R!==null&&(oe===null||fe)&&R.begin(O,oe);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(K),K=Ye.getCamera()),A.isScene===!0&&A.onBeforeRender(O,A,K,oe),T=Ie.get(A,x.length),T.init(K),T.state.textureUnits=ae.getTextureUnits(),x.push(T),te.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),V.setFromProjectionMatrix(te,fi,K.reversedDepth),z=this.localClippingEnabled,ee=et.init(this.clippingPlanes,z),w=Oe.get(A,C.length),w.init(),C.push(w),Ye.enabled===!0&&Ye.isPresenting===!0){const qe=O.xr.getDepthSensingMesh();qe!==null&&al(qe,K,-1/0,O.sortObjects)}al(A,K,0,O.sortObjects),w.finish(),O.sortObjects===!0&&w.sort(N,j,K.reversedDepth),me=Ye.enabled===!1||Ye.isPresenting===!1||Ye.hasDepthSensing()===!1,me&&ot.addToRenderList(w,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&et.beginShadows();const se=T.state.shadowsArray;if(it.render(se,A,K),ee===!0&&et.endShadows(),(ie&&R.hasRenderPass())===!1){const qe=w.opaque,ze=w.transmissive;if(T.setupLights(),K.isArrayCamera){const je=K.cameras;if(ze.length>0)for(let Je=0,ct=je.length;Je<ct;Je++){const pt=je[Je];gf(qe,ze,A,pt)}me&&ot.render(A);for(let Je=0,ct=je.length;Je<ct;Je++){const pt=je[Je];mf(w,A,pt,pt.viewport)}}else ze.length>0&&gf(qe,ze,A,K),me&&ot.render(A),mf(w,A,K)}oe!==null&&G===0&&(ae.updateMultisampleRenderTarget(oe),ae.updateRenderTargetMipmap(oe)),ie&&R.end(O),A.isScene===!0&&A.onAfterRender(O,A,K),He.resetDefaultState(),_e=-1,Ee=null,x.pop(),x.length>0?(T=x[x.length-1],ae.setTextureUnits(T.state.textureUnits),ee===!0&&et.setGlobalState(O.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,I!==null&&I.renderEnd()};function al(A,K,fe,ie){if(A.visible===!1)return;if(A.layers.test(K.layers)){if(A.isGroup)fe=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(K);else if(A.isLightProbeGrid)T.pushLightProbeGrid(A);else if(A.isLight)T.pushLight(A),A.castShadow&&T.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||V.intersectsSprite(A)){ie&&ye.setFromMatrixPosition(A.matrixWorld).applyMatrix4(te);const qe=ge.update(A),ze=A.material;ze.visible&&w.push(A,qe,ze,fe,ye.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||V.intersectsObject(A))){const qe=ge.update(A),ze=A.material;if(ie&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ye.copy(A.boundingSphere.center)):(qe.boundingSphere===null&&qe.computeBoundingSphere(),ye.copy(qe.boundingSphere.center)),ye.applyMatrix4(A.matrixWorld).applyMatrix4(te)),Array.isArray(ze)){const je=qe.groups;for(let Je=0,ct=je.length;Je<ct;Je++){const pt=je[Je],tt=ze[pt.materialIndex];tt&&tt.visible&&w.push(A,qe,tt,fe,ye.z,pt)}}else ze.visible&&w.push(A,qe,ze,fe,ye.z,null)}}const Ge=A.children;for(let qe=0,ze=Ge.length;qe<ze;qe++)al(Ge[qe],K,fe,ie)}function mf(A,K,fe,ie){const{opaque:se,transmissive:Ge,transparent:qe}=A;T.setupLightsView(fe),ee===!0&&et.setGlobalState(O.clippingPlanes,fe),ie&&v.viewport(be.copy(ie)),se.length>0&&Ao(se,K,fe),Ge.length>0&&Ao(Ge,K,fe),qe.length>0&&Ao(qe,K,fe),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function gf(A,K,fe,ie){if((fe.isScene===!0?fe.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[ie.id]===void 0){const tt=Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[ie.id]=new pi(1,1,{generateMipmaps:!0,type:tt?ki:Fn,minFilter:yr,samples:Math.max(4,P.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace})}const Ge=T.state.transmissionRenderTarget[ie.id],qe=ie.viewport||be;Ge.setSize(qe.z*O.transmissionResolutionScale,qe.w*O.transmissionResolutionScale);const ze=O.getRenderTarget(),je=O.getActiveCubeFace(),Je=O.getActiveMipmapLevel();O.setRenderTarget(Ge),O.getClearColor(we),xe=O.getClearAlpha(),xe<1&&O.setClearColor(16777215,.5),O.clear(),me&&ot.render(fe);const ct=O.toneMapping;O.toneMapping=hi;const pt=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),T.setupLightsView(ie),ee===!0&&et.setGlobalState(O.clippingPlanes,ie),Ao(A,fe,ie),ae.updateMultisampleRenderTarget(Ge),ae.updateRenderTargetMipmap(Ge),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let Dt=0,Wt=K.length;Dt<Wt;Dt++){const kt=K[Dt],{object:Lt,geometry:rn,material:$e,group:wn}=kt;if($e.side===Pi&&Lt.layers.test(ie.layers)){const yt=$e.side;$e.side=An,$e.needsUpdate=!0,_f(Lt,fe,ie,rn,$e,wn),$e.side=yt,$e.needsUpdate=!0,tt=!0}}tt===!0&&(ae.updateMultisampleRenderTarget(Ge),ae.updateRenderTargetMipmap(Ge))}O.setRenderTarget(ze,je,Je),O.setClearColor(we,xe),pt!==void 0&&(ie.viewport=pt),O.toneMapping=ct}function Ao(A,K,fe){const ie=K.isScene===!0?K.overrideMaterial:null;for(let se=0,Ge=A.length;se<Ge;se++){const qe=A[se],{object:ze,geometry:je,group:Je}=qe;let ct=qe.material;ct.allowOverride===!0&&ie!==null&&(ct=ie),ze.layers.test(fe.layers)&&_f(ze,K,fe,je,ct,Je)}}function _f(A,K,fe,ie,se,Ge){A.onBeforeRender(O,K,fe,ie,se,Ge),A.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),se.onBeforeRender(O,K,fe,ie,A,Ge),se.transparent===!0&&se.side===Pi&&se.forceSinglePass===!1?(se.side=An,se.needsUpdate=!0,O.renderBufferDirect(fe,K,ie,se,A,Ge),se.side=ar,se.needsUpdate=!0,O.renderBufferDirect(fe,K,ie,se,A,Ge),se.side=Pi):O.renderBufferDirect(fe,K,ie,se,A,Ge),A.onAfterRender(O,K,fe,ie,se,Ge)}function wo(A,K,fe){K.isScene!==!0&&(K=Te);const ie=Z.get(A),se=T.state.lights,Ge=T.state.shadowsArray,qe=se.state.version,ze=De.getParameters(A,se.state,Ge,K,fe,T.state.lightProbeGridArray),je=De.getProgramCacheKey(ze);let Je=ie.programs;ie.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?K.environment:null,ie.fog=K.fog;const ct=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ie.envMap=Ae.get(A.envMap||ie.environment,ct),ie.envMapRotation=ie.environment!==null&&A.envMap===null?K.environmentRotation:A.envMapRotation,Je===void 0&&(A.addEventListener("dispose",B),Je=new Map,ie.programs=Je);let pt=Je.get(je);if(pt!==void 0){if(ie.currentProgram===pt&&ie.lightsStateVersion===qe)return xf(A,ze),pt}else ze.uniforms=De.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,fe,ze),A.onBeforeCompile(ze,O),pt=De.acquireProgram(ze,je),Je.set(je,pt),ie.uniforms=ze.uniforms;const tt=ie.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(tt.clippingPlanes=et.uniform),xf(A,ze),ie.needsLights=Dg(A),ie.lightsStateVersion=qe,ie.needsLights&&(tt.ambientLightColor.value=se.state.ambient,tt.lightProbe.value=se.state.probe,tt.directionalLights.value=se.state.directional,tt.directionalLightShadows.value=se.state.directionalShadow,tt.spotLights.value=se.state.spot,tt.spotLightShadows.value=se.state.spotShadow,tt.rectAreaLights.value=se.state.rectArea,tt.ltc_1.value=se.state.rectAreaLTC1,tt.ltc_2.value=se.state.rectAreaLTC2,tt.pointLights.value=se.state.point,tt.pointLightShadows.value=se.state.pointShadow,tt.hemisphereLights.value=se.state.hemi,tt.directionalShadowMatrix.value=se.state.directionalShadowMatrix,tt.spotLightMatrix.value=se.state.spotLightMatrix,tt.spotLightMap.value=se.state.spotLightMap,tt.pointShadowMatrix.value=se.state.pointShadowMatrix),ie.lightProbeGrid=T.state.lightProbeGridArray.length>0,ie.currentProgram=pt,ie.uniformsList=null,pt}function vf(A){if(A.uniformsList===null){const K=A.currentProgram.getUniforms();A.uniformsList=ha.seqWithValue(K.seq,A.uniforms)}return A.uniformsList}function xf(A,K){const fe=Z.get(A);fe.outputColorSpace=K.outputColorSpace,fe.batching=K.batching,fe.batchingColor=K.batchingColor,fe.instancing=K.instancing,fe.instancingColor=K.instancingColor,fe.instancingMorph=K.instancingMorph,fe.skinning=K.skinning,fe.morphTargets=K.morphTargets,fe.morphNormals=K.morphNormals,fe.morphColors=K.morphColors,fe.morphTargetsCount=K.morphTargetsCount,fe.numClippingPlanes=K.numClippingPlanes,fe.numIntersection=K.numClipIntersection,fe.vertexAlphas=K.vertexAlphas,fe.vertexTangents=K.vertexTangents,fe.toneMapping=K.toneMapping}function Rg(A,K){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;b.setFromMatrixPosition(K.matrixWorld);for(let fe=0,ie=A.length;fe<ie;fe++){const se=A[fe];if(se.texture!==null&&se.boundingBox.containsPoint(b))return se}return null}function Cg(A,K,fe,ie,se){K.isScene!==!0&&(K=Te),ae.resetTextureUnits();const Ge=K.fog,qe=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial?K.environment:null,ze=oe===null?O.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:xt.workingColorSpace,je=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial&&!ie.envMap||ie.isMeshPhongMaterial&&!ie.envMap,Je=Ae.get(ie.envMap||qe,je),ct=ie.vertexColors===!0&&!!fe.attributes.color&&fe.attributes.color.itemSize===4,pt=!!fe.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),tt=!!fe.morphAttributes.position,Dt=!!fe.morphAttributes.normal,Wt=!!fe.morphAttributes.color;let kt=hi;ie.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(kt=O.toneMapping);const Lt=fe.morphAttributes.position||fe.morphAttributes.normal||fe.morphAttributes.color,rn=Lt!==void 0?Lt.length:0,$e=Z.get(ie),wn=T.state.lights;if(ee===!0&&(z===!0||A!==Ee)){const Nt=A===Ee&&ie.id===_e;et.setState(ie,A,Nt)}let yt=!1;ie.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==wn.state.version||$e.outputColorSpace!==ze||se.isBatchedMesh&&$e.batching===!1||!se.isBatchedMesh&&$e.batching===!0||se.isBatchedMesh&&$e.batchingColor===!0&&se.colorTexture===null||se.isBatchedMesh&&$e.batchingColor===!1&&se.colorTexture!==null||se.isInstancedMesh&&$e.instancing===!1||!se.isInstancedMesh&&$e.instancing===!0||se.isSkinnedMesh&&$e.skinning===!1||!se.isSkinnedMesh&&$e.skinning===!0||se.isInstancedMesh&&$e.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&$e.instancingColor===!1&&se.instanceColor!==null||se.isInstancedMesh&&$e.instancingMorph===!0&&se.morphTexture===null||se.isInstancedMesh&&$e.instancingMorph===!1&&se.morphTexture!==null||$e.envMap!==Je||ie.fog===!0&&$e.fog!==Ge||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==et.numPlanes||$e.numIntersection!==et.numIntersection)||$e.vertexAlphas!==ct||$e.vertexTangents!==pt||$e.morphTargets!==tt||$e.morphNormals!==Dt||$e.morphColors!==Wt||$e.toneMapping!==kt||$e.morphTargetsCount!==rn||!!$e.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(yt=!0):(yt=!0,$e.__version=ie.version);let Un=$e.currentProgram;yt===!0&&(Un=wo(ie,K,se),I&&ie.isNodeMaterial&&I.onUpdateProgram(ie,Un,$e));let ti=!1,zi=!1,Or=!1;const It=Un.getUniforms(),Xt=$e.uniforms;if(v.useProgram(Un.program)&&(ti=!0,zi=!0,Or=!0),ie.id!==_e&&(_e=ie.id,zi=!0),$e.needsLights){const Nt=Rg(T.state.lightProbeGridArray,se);$e.lightProbeGrid!==Nt&&($e.lightProbeGrid=Nt,zi=!0)}if(ti||Ee!==A){v.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),It.setValue(U,"projectionMatrix",A.projectionMatrix),It.setValue(U,"viewMatrix",A.matrixWorldInverse);const Wi=It.map.cameraPosition;Wi!==void 0&&Wi.setValue(U,Me.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&It.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&It.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),Ee!==A&&(Ee=A,zi=!0,Or=!0)}if($e.needsLights&&(wn.state.directionalShadowMap.length>0&&It.setValue(U,"directionalShadowMap",wn.state.directionalShadowMap,ae),wn.state.spotShadowMap.length>0&&It.setValue(U,"spotShadowMap",wn.state.spotShadowMap,ae),wn.state.pointShadowMap.length>0&&It.setValue(U,"pointShadowMap",wn.state.pointShadowMap,ae)),se.isSkinnedMesh){It.setOptional(U,se,"bindMatrix"),It.setOptional(U,se,"bindMatrixInverse");const Nt=se.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),It.setValue(U,"boneTexture",Nt.boneTexture,ae))}se.isBatchedMesh&&(It.setOptional(U,se,"batchingTexture"),It.setValue(U,"batchingTexture",se._matricesTexture,ae),It.setOptional(U,se,"batchingIdTexture"),It.setValue(U,"batchingIdTexture",se._indirectTexture,ae),It.setOptional(U,se,"batchingColorTexture"),se._colorsTexture!==null&&It.setValue(U,"batchingColorTexture",se._colorsTexture,ae));const Gi=fe.morphAttributes;if((Gi.position!==void 0||Gi.normal!==void 0||Gi.color!==void 0)&&$.update(se,fe,Un),(zi||$e.receiveShadow!==se.receiveShadow)&&($e.receiveShadow=se.receiveShadow,It.setValue(U,"receiveShadow",se.receiveShadow)),(ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial)&&ie.envMap===null&&K.environment!==null&&(Xt.envMapIntensity.value=K.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=A1()),zi){if(It.setValue(U,"toneMappingExposure",O.toneMappingExposure),$e.needsLights&&Pg(Xt,Or),Ge&&ie.fog===!0&&Xe.refreshFogUniforms(Xt,Ge),Xe.refreshMaterialUniforms(Xt,ie,H,F,T.state.transmissionRenderTarget[A.id]),$e.needsLights&&$e.lightProbeGrid){const Nt=$e.lightProbeGrid;Xt.probesSH.value=Nt.texture,Xt.probesMin.value.copy(Nt.boundingBox.min),Xt.probesMax.value.copy(Nt.boundingBox.max),Xt.probesResolution.value.copy(Nt.resolution)}ha.upload(U,vf($e),Xt,ae)}if(ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(ha.upload(U,vf($e),Xt,ae),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&It.setValue(U,"center",se.center),It.setValue(U,"modelViewMatrix",se.modelViewMatrix),It.setValue(U,"normalMatrix",se.normalMatrix),It.setValue(U,"modelMatrix",se.matrixWorld),ie.uniformsGroups!==void 0){const Nt=ie.uniformsGroups;for(let Wi=0,Fr=Nt.length;Wi<Fr;Wi++){const bf=Nt[Wi];Se.update(bf,Un),Se.bind(bf,Un)}}return Un}function Pg(A,K){A.ambientLightColor.needsUpdate=K,A.lightProbe.needsUpdate=K,A.directionalLights.needsUpdate=K,A.directionalLightShadows.needsUpdate=K,A.pointLights.needsUpdate=K,A.pointLightShadows.needsUpdate=K,A.spotLights.needsUpdate=K,A.spotLightShadows.needsUpdate=K,A.rectAreaLights.needsUpdate=K,A.hemisphereLights.needsUpdate=K}function Dg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return ne},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(A,K,fe){const ie=Z.get(A);ie.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),Z.get(A.texture).__webglTexture=K,Z.get(A.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:fe,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,K){const fe=Z.get(A);fe.__webglFramebuffer=K,fe.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(A,K=0,fe=0){oe=A,ne=K,G=fe;let ie=null,se=!1,Ge=!1;if(A){const ze=Z.get(A);if(ze.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,ze.__webglFramebuffer),be.copy(A.viewport),Ce.copy(A.scissor),Re=A.scissorTest,v.viewport(be),v.scissor(Ce),v.setScissorTest(Re),_e=-1;return}else if(ze.__webglFramebuffer===void 0)ae.setupRenderTarget(A);else if(ze.__hasExternalTextures)ae.rebindTextures(A,Z.get(A.texture).__webglTexture,Z.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ct=A.depthTexture;if(ze.__boundDepthTexture!==ct){if(ct!==null&&Z.has(ct)&&(A.width!==ct.image.width||A.height!==ct.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ae.setupDepthRenderbuffer(A)}}const je=A.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(Ge=!0);const Je=Z.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Je[K])?ie=Je[K][fe]:ie=Je[K],se=!0):A.samples>0&&ae.useMultisampledRTT(A)===!1?ie=Z.get(A).__webglMultisampledFramebuffer:Array.isArray(Je)?ie=Je[fe]:ie=Je,be.copy(A.viewport),Ce.copy(A.scissor),Re=A.scissorTest}else be.copy(J).multiplyScalar(H).floor(),Ce.copy(D).multiplyScalar(H).floor(),Re=L;if(fe!==0&&(ie=ce),v.bindFramebuffer(U.FRAMEBUFFER,ie)&&v.drawBuffers(A,ie),v.viewport(be),v.scissor(Ce),v.setScissorTest(Re),se){const ze=Z.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+K,ze.__webglTexture,fe)}else if(Ge){const ze=K;for(let je=0;je<A.textures.length;je++){const Je=Z.get(A.textures[je]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+je,Je.__webglTexture,fe,ze)}}else if(A!==null&&fe!==0){const ze=Z.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ze.__webglTexture,fe)}_e=-1},this.readRenderTargetPixels=function(A,K,fe,ie,se,Ge,qe,ze=0){if(!(A&&A.isWebGLRenderTarget)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let je=Z.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&qe!==void 0&&(je=je[qe]),je){v.bindFramebuffer(U.FRAMEBUFFER,je);try{const Je=A.textures[ze],ct=Je.format,pt=Je.type;if(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ze),!P.textureFormatReadable(ct)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(pt)){bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=A.width-ie&&fe>=0&&fe<=A.height-se&&U.readPixels(K,fe,ie,se,Be.convert(ct),Be.convert(pt),Ge)}finally{const Je=oe!==null?Z.get(oe).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(A,K,fe,ie,se,Ge,qe,ze=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let je=Z.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&qe!==void 0&&(je=je[qe]),je)if(K>=0&&K<=A.width-ie&&fe>=0&&fe<=A.height-se){v.bindFramebuffer(U.FRAMEBUFFER,je);const Je=A.textures[ze],ct=Je.format,pt=Je.type;if(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ze),!P.textureFormatReadable(ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,tt),U.bufferData(U.PIXEL_PACK_BUFFER,Ge.byteLength,U.STREAM_READ),U.readPixels(K,fe,ie,se,Be.convert(ct),Be.convert(pt),0);const Dt=oe!==null?Z.get(oe).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Dt);const Wt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await PS(U,Wt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,tt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ge),U.deleteBuffer(tt),U.deleteSync(Wt),Ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,K=null,fe=0){const ie=Math.pow(2,-fe),se=Math.floor(A.image.width*ie),Ge=Math.floor(A.image.height*ie),qe=K!==null?K.x:0,ze=K!==null?K.y:0;ae.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,fe,0,0,qe,ze,se,Ge),v.unbindTexture()},this.copyTextureToTexture=function(A,K,fe=null,ie=null,se=0,Ge=0){let qe,ze,je,Je,ct,pt,tt,Dt,Wt;const kt=A.isCompressedTexture?A.mipmaps[Ge]:A.image;if(fe!==null)qe=fe.max.x-fe.min.x,ze=fe.max.y-fe.min.y,je=fe.isBox3?fe.max.z-fe.min.z:1,Je=fe.min.x,ct=fe.min.y,pt=fe.isBox3?fe.min.z:0;else{const Xt=Math.pow(2,-se);qe=Math.floor(kt.width*Xt),ze=Math.floor(kt.height*Xt),A.isDataArrayTexture?je=kt.depth:A.isData3DTexture?je=Math.floor(kt.depth*Xt):je=1,Je=0,ct=0,pt=0}ie!==null?(tt=ie.x,Dt=ie.y,Wt=ie.z):(tt=0,Dt=0,Wt=0);const Lt=Be.convert(K.format),rn=Be.convert(K.type);let $e;K.isData3DTexture?(ae.setTexture3D(K,0),$e=U.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(ae.setTexture2DArray(K,0),$e=U.TEXTURE_2D_ARRAY):(ae.setTexture2D(K,0),$e=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,K.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,K.unpackAlignment);const wn=v.getParameter(U.UNPACK_ROW_LENGTH),yt=v.getParameter(U.UNPACK_IMAGE_HEIGHT),Un=v.getParameter(U.UNPACK_SKIP_PIXELS),ti=v.getParameter(U.UNPACK_SKIP_ROWS),zi=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,kt.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,kt.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Je),v.pixelStorei(U.UNPACK_SKIP_ROWS,ct),v.pixelStorei(U.UNPACK_SKIP_IMAGES,pt);const Or=A.isDataArrayTexture||A.isData3DTexture,It=K.isDataArrayTexture||K.isData3DTexture;if(A.isDepthTexture){const Xt=Z.get(A),Gi=Z.get(K),Nt=Z.get(Xt.__renderTarget),Wi=Z.get(Gi.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,Nt.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Fr=0;Fr<je;Fr++)Or&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Z.get(A).__webglTexture,se,pt+Fr),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Z.get(K).__webglTexture,Ge,Wt+Fr)),U.blitFramebuffer(Je,ct,qe,ze,tt,Dt,qe,ze,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(se!==0||A.isRenderTargetTexture||Z.has(A)){const Xt=Z.get(A),Gi=Z.get(K);v.bindFramebuffer(U.READ_FRAMEBUFFER,he),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,Y);for(let Nt=0;Nt<je;Nt++)Or?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Xt.__webglTexture,se,pt+Nt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Xt.__webglTexture,se),It?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Gi.__webglTexture,Ge,Wt+Nt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Gi.__webglTexture,Ge),se!==0?U.blitFramebuffer(Je,ct,qe,ze,tt,Dt,qe,ze,U.COLOR_BUFFER_BIT,U.NEAREST):It?U.copyTexSubImage3D($e,Ge,tt,Dt,Wt+Nt,Je,ct,qe,ze):U.copyTexSubImage2D($e,Ge,tt,Dt,Je,ct,qe,ze);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else It?A.isDataTexture||A.isData3DTexture?U.texSubImage3D($e,Ge,tt,Dt,Wt,qe,ze,je,Lt,rn,kt.data):K.isCompressedArrayTexture?U.compressedTexSubImage3D($e,Ge,tt,Dt,Wt,qe,ze,je,Lt,kt.data):U.texSubImage3D($e,Ge,tt,Dt,Wt,qe,ze,je,Lt,rn,kt):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ge,tt,Dt,qe,ze,Lt,rn,kt.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ge,tt,Dt,kt.width,kt.height,Lt,kt.data):U.texSubImage2D(U.TEXTURE_2D,Ge,tt,Dt,qe,ze,Lt,rn,kt);v.pixelStorei(U.UNPACK_ROW_LENGTH,wn),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,yt),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Un),v.pixelStorei(U.UNPACK_SKIP_ROWS,ti),v.pixelStorei(U.UNPACK_SKIP_IMAGES,zi),Ge===0&&K.generateMipmaps&&U.generateMipmap($e),v.unbindTexture()},this.initRenderTarget=function(A){Z.get(A).__webglFramebuffer===void 0&&ae.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ae.setTextureCube(A,0):A.isData3DTexture?ae.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ae.setTexture2DArray(A,0):ae.setTexture2D(A,0),v.unbindTexture()},this.resetState=function(){ne=0,G=0,oe=null,v.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),n.unpackColorSpace=xt._getUnpackColorSpace()}}const R1={key:0,class:"canvas-empty-text"},C1=["onClick"],P1={class:"viewer-point-dot"},D1={class:"hotspot-label"},L1=650,yg={__name:"PanoramaViewer",props:{imageUrl:{type:String,default:""},hotspots:{type:Array,default:()=>[]},selectedHotspotId:{type:String,default:""},initialView:{type:Object,default:()=>({lon:0,lat:0,fov:75})},hotspotDisplayMode:{type:String,default:"builder"}},emits:["panorama-click","hotspot-click","view-change"],setup(t,{emit:e}){const n=t,i=e,r=Pe(null),s=Pe([]),o=at(()=>!!n.imageUrl);let a,l,c,u,f,d,h,_=0,S,m,p,y,E=!1,b=null,w=0,T=0,C=75;function x(k,F,H){return Math.min(H,Math.max(F,k))}function R(){i("view-change",{lon:Math.round(w*10)/10,lat:Math.round(T*10)/10,fov:Math.round(C)})}function O(k,F,H=500){const N=zr.degToRad(90-Number(F||0)),j=zr.degToRad(Number(k||0));return new re(H*Math.sin(N)*Math.cos(j),H*Math.cos(N),H*Math.sin(N)*Math.sin(j))}function M(k){const F=k.clone().normalize(),H=zr.radToDeg(Math.atan2(F.z,F.x)),N=zr.radToDeg(Math.asin(F.y));return{lon:Math.round(H*10)/10,lat:Math.round(N*10)/10}}function I(){if(!r.value||!c){s.value=[];return}const k=r.value.clientWidth||1,F=r.value.clientHeight||1,H=new re;c.getWorldDirection(H),s.value=n.hotspots.map((N,j)=>{const J=O(N.lon,N.lat),D=J.clone().normalize(),L=H.dot(D)>0,V=J.clone().project(c);return{...N,index:j,visible:L&&V.z>-1&&V.z<1&&V.x>=-1.12&&V.x<=1.12&&V.y>=-1.12&&V.y<=1.12,screenX:(V.x*.5+.5)*k,screenY:(-V.y*.5+.5)*F}}).filter(N=>N.visible)}function ce(){T=x(T,-85,85);const k=zr.degToRad(90-T),F=zr.degToRad(w),H=new re(500*Math.sin(k)*Math.cos(F),500*Math.cos(k),500*Math.sin(k)*Math.sin(F));c.lookAt(H),c.fov=C,c.updateProjectionMatrix()}function he(){ce(),I(),_e(),a.render(l,c),S=requestAnimationFrame(he)}function Y(){if(!r.value||!a||!c)return;const k=r.value.clientWidth||1,F=r.value.clientHeight||1;c.aspect=k/F,c.updateProjectionMatrix(),a.setSize(k,F),I()}function ne(){f&&(f.dispose(),f=null)}function G(){d&&(l?.remove(d),d.geometry.dispose(),d.material.dispose(),d=null),h&&(h.dispose(),h=null)}function oe(k){if(!k||!l)return;G();const F=new Ia(499,64,40);F.scale(-1,1,1);const H=new La({map:k,transparent:!0,opacity:1,depthWrite:!1});d=new Jn(F,H),d.renderOrder=2,h=k,_=performance.now(),l.add(d)}function _e(){if(!d)return;const k=Math.min((performance.now()-_)/L1,1),F=1-Math.pow(1-k,3);d.material.opacity=1-F,k>=1&&G()}function Ee(){if(!u)return;if(!n.imageUrl){ne(),G(),u.material.map=null,u.material.color.set(1120295),u.material.needsUpdate=!0;return}const k=new RM;k.setCrossOrigin("anonymous"),k.load(n.imageUrl,F=>{const H=f;f=F,f.colorSpace=Pn,u.material.map=f,u.material.color.set(16777215),u.material.needsUpdate=!0,H&&oe(H),Y()},void 0,()=>{u.material.map=null,u.material.color.set(1120295),u.material.needsUpdate=!0})}function be(){if(!r.value)return;l=new aM,c=new On(C,1,1,1100),p=new DM,y=new Mt;const k=new Ia(500,64,40);k.scale(-1,1,1);const F=new La({color:1120295});u=new Jn(k,F),l.add(u),a=new w1({antialias:!0,alpha:!1}),a.setClearColor(1120295,1),a.setPixelRatio(window.devicePixelRatio||1),a.domElement.className="panorama-canvas",r.value.appendChild(a.domElement),Y(),Ee(),he()}function Ce(k){o.value&&(E=!0,b={x:k.clientX,y:k.clientY,lon:w,lat:T})}function Re(k){!E||!b||(w=b.lon-(k.clientX-b.x)*.12,T=b.lat+(k.clientY-b.y)*.12,R())}function we(k){if(!E||!b)return;const F=Math.hypot(k.clientX-b.x,k.clientY-b.y);if(E=!1,b=null,F<5&&o.value){const H=r.value?.getBoundingClientRect();if(!H||!p||!y||!u)return;y.x=(k.clientX-H.left)/H.width*2-1,y.y=-((k.clientY-H.top)/H.height)*2+1,p.setFromCamera(y,c);const N=p.intersectObject(u,!1)[0],j=N?M(N.point):{lon:w,lat:T};i("panorama-click",{x:(k.offsetX||0)/(r.value?.clientWidth||1)*100,y:(k.offsetY||0)/(r.value?.clientHeight||1)*100,lon:j.lon,lat:j.lat})}}function xe(k){o.value&&(k.preventDefault(),C=x(C+k.deltaY*.04,35,100),R())}return sr(()=>n.imageUrl,async()=>{await _o(),Ee()}),sr(()=>n.hotspots,()=>I(),{deep:!0}),sr(()=>n.initialView,k=>{w=Number(k?.lon??0),T=Number(k?.lat??0),C=Number(k?.fov??75),R()},{deep:!0,immediate:!0}),Qn(()=>{be(),window.addEventListener("resize",Y),r.value&&(m=new ResizeObserver(Y),m.observe(r.value))}),Nu(()=>{window.removeEventListener("resize",Y),m?.disconnect(),cancelAnimationFrame(S),ne(),G(),u&&(u.geometry.dispose(),u.material.dispose()),a?.dispose()}),(k,F)=>(ue(),de("div",{ref_key:"container",ref:r,class:cn(["panorama-viewer",{empty:!o.value}]),onPointerdown:Ce,onPointermove:Re,onPointerup:we,onPointerleave:we,onWheel:xe},[o.value?mt("",!0):(ue(),de("span",R1," Upload panorama JPG 360 de xem preview, keo chuot de xoay ngang/doc. ")),(ue(!0),de(nt,null,ht(s.value,H=>(ue(),de("button",{key:H.id,class:cn(["panorama-hotspot",[t.hotspotDisplayMode==="viewer"?`viewer-hotspot viewer-hotspot-${H.type||"point"}`:"hotspot-dot",{active:H.id===t.selectedHotspotId}]]),style:yn({left:`${H.screenX}px`,top:`${H.screenY}px`}),type:"button",onClick:Mn(N=>i("hotspot-click",H,N),["stop"])},[t.hotspotDisplayMode==="viewer"&&H.type==="nav"?(ue(),de(nt,{key:0},[F[0]||(F[0]=g("span",{class:"viewer-nav-arrow"},[g("i",{class:"ti-angle-double-up","aria-hidden":"true"})],-1)),H.preview_image?(ue(),de("span",{key:0,class:"viewer-hotspot-preview",style:yn({backgroundImage:`url(${H.preview_image})`})},null,4)):mt("",!0)],64)):(ue(),de(nt,{key:1},[g("span",P1,le(H.index+1),1),g("span",D1,le(H.label||"Hotspot"),1),t.hotspotDisplayMode==="viewer"&&H.preview_image?(ue(),de("span",{key:0,class:"viewer-hotspot-preview",style:yn({backgroundImage:`url(${H.preview_image})`})},null,4)):mt("",!0)],64))],14,C1))),128))],34))}};function Lr(t,e={}){return _t.get(`/api/projects/${t}/locations/`,{params:e})}function Sg(t,e){return _t.post(`/api/projects/${t}/locations/`,e)}function I1(t,e){return _t.patch(`/api/locations/${t}/`,e)}function U1(t){return _t.delete(`/api/locations/${t}/`)}function N1({tourVersion:t,sceneKey:e,originalFile:n,maxZoomLevel:i=3,tileSize:r=512}){const s=new FormData;return s.append("tour_version",t),s.append("scene_key",e),s.append("original_file",n),s.append("max_zoom_level",i),s.append("tile_size",r),_t.post("/api/media/scenes/upload/",s,{headers:{"Content-Type":"multipart/form-data"}})}function O1(t){return _t.delete(`/api/media/scenes/${t}/`)}function Nr(t={}){return _t.get("/api/projects/",{params:t})}function Mg(t){return _t.post("/api/projects/",t)}function po(t,e={}){return _t.get(`/api/locations/${t}/versions/`,{params:e})}function bu(t,e){return _t.post(`/api/locations/${t}/versions/`,e)}function yu(t,e){return _t.get(`/api/locations/${t}/versions/${e}/`)}function Su(t,e,n){return _t.patch(`/api/locations/${t}/versions/${e}/`,n)}function F1(t,e){return _t.delete(`/api/locations/${t}/versions/${e}/`)}function B1(t,e){return _t.get(`/api/locations/${t}/versions/${e}/preview/`)}function k1(t,e){return _t.get(`/api/locations/${t}/versions/${e}/export/`)}const V1={class:"builder-page"},H1={class:"builder-topbar"},z1={class:"builder-top-actions"},G1=["value"],W1=["value"],X1=["value"],$1={class:"builder-right-actions"},q1={key:0,class:"builder-alert error"},Y1={key:1,class:"builder-alert success"},K1={class:"builder-shell"},j1={class:"panel-title-row"},Z1=["onClick"],J1={class:"scene-index"},Q1={class:"scene-copy"},eR={class:"builder-canvas-panel"},tR={class:"builder-canvas"},nR={class:"viewer-help"},iR={class:"view-meter"},rR={class:"builder-right"},sR={class:"inspector-image-row"},oR={class:"form"},aR={class:"actions-row"},lR={class:"inspector-section"},cR={class:"three-inputs"},uR=["value"],fR=["value"],dR=["value"],hR={class:"inspector-section"},pR={class:"panel-title-row"},mR={key:0,class:"hotspot-list"},gR=["onClick"],_R={class:"hotspot-number"},vR=["onClick"],xR={key:1,class:"builder-muted"},bR={key:0,class:"form hotspot-form"},yR=["value"],SR={class:"two-inputs"},MR={class:"two-inputs"},ER={key:1,class:"empty-inspector"},TR={class:"builder-modal"},AR={class:"panel-title-row"},wR=["value"],RR={class:"builder-modal"},CR={class:"panel-title-row"},PR={class:"builder-modal builder-modal-small"},DR={class:"panel-title-row"},LR={class:"form"},IR={class:"quick-step"},UR={class:"panel-title-row"},NR={key:1},OR=["value"],FR={class:"quick-step"},BR={class:"panel-title-row"},kR=["disabled"],VR={class:"two-inputs"},HR={key:1},zR=["disabled"],GR=["value"],WR={class:"quick-step"},XR={class:"panel-title-row"},$R={key:0},qR=["disabled"],YR=["value"],KR={key:1},jR={key:2,class:"builder-muted"},ZR={class:"actions-row"},JR={__name:"BuilderView",setup(t){const e=xo(),n=Pe([]),i=Pe([]),r=Pe([]),s=Pe(""),o=Pe(""),a=Pe(""),l=Pe(null),c=Pe([]),u=Pe(""),f=Pe(""),d=Pe(""),h=Pe(""),_=Pe(!1),S=Pe(!1),m=Pe(!1),p=Pe(!1),y=Pe(!1),E=Pe(!1),b=Pe(null),w=Pe([]),T=Pe([]),C=un({id:"",name:"",group:"Default",description:"",image_url:""}),x=un({id:"",label:"",type:"nav",target_scene_id:"",x:50,y:50,lon:0,lat:0}),R=un({lon:0,lat:0,fov:75}),O=Pe(""),M=un({project_id:"",location_id:"",version_id:"",create_project:!1,create_location:!1,create_version:!0,project_name:"",project_description:"",location_name:"",location_description:"",latitude:"",longitude:"",version_label:""}),I=at(()=>c.value.find(W=>W.id===u.value)||null),ce=at(()=>I.value&&(I.value.hotspots||[]).find(W=>W.id===f.value)||null),he=at(()=>!I.value||!f.value?-1:(I.value.hotspots||[]).findIndex(W=>W.id===f.value)),Y=at(()=>I.value?.view||{lon:0,lat:0,fov:75}),ne=at(()=>c.value.filter(W=>W.id!==I.value?.id)),G=at(()=>({...l.value?.data||{},title:l.value?.label||l.value?.data?.title||"VR360 Tour",scenes:c.value.map(W=>{const{preview_url:B,preview_object_url:Q,local_file:Ze,...Pt}=W;return Pt})})),oe=at(()=>JSON.stringify(G.value,null,2)),_e=at(()=>we(I.value));function Ee(W){return Array.isArray(W)?W:Array.isArray(W?.results)?W.results:Array.isArray(W?.data)?W.data:Array.isArray(W?.items)?W.items:[]}function be(W){return`${W}-${Date.now()}-${Math.random().toString(16).slice(2,7)}`}function Ce(W){return W.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,48)}function Re(W){return W?W.startsWith("blob:")||W.startsWith("data:")||W.startsWith("http")?W:`${el}${W.startsWith("/")?W:`/${W}`}`:""}function we(W){return W?Re(W.preview_url||W.image_url||W.original_file||W.thumbnail||""):""}function xe(W,B=0){const Q=String(W.id||W.key||W.scene_key||be("scene")),Ze=W.image_url||W.url||W.original_file||W.panorama||"";return{id:Q,name:W.name||W.title||`Scene ${B+1}`,group:W.group||W.category||"Default",description:W.description||W.desc||"",image_url:Ze,preview_url:W.preview_url||"",preview_object_url:W.preview_object_url||"",local_file:W.local_file||null,image_file_name:W.image_file_name||"",original_file:W.original_file||"",thumbnail:W.thumbnail||"",scene_asset_id:W.scene_asset_id||W.asset_id||"",tile_base_path:W.tile_base_path||"",processing_status:W.processing_status||"",view:{lon:Number(W.view?.lon??W.lon??0),lat:Number(W.view?.lat??W.lat??0),fov:Number(W.view?.fov??W.fov??75)},hotspots:(W.hotspots||[]).map((Pt,Ps)=>({id:String(Pt.id||be("hotspot")),label:Pt.label||Pt.title||`Hotspot ${Ps+1}`,type:["nav","point"].includes(Pt.type||Pt.action)?Pt.type||Pt.action:(Pt.type||Pt.action)==="navigate"?"nav":"point",target_scene_id:String(Pt.target_scene_id||Pt.target||Pt.scene_id||""),x:Math.round(Number(Pt.x??50)),y:Math.round(Number(Pt.y??50)),lon:Number(Pt.lon??0),lat:Number(Pt.lat??0)}))}}function k(W){const B=W?.TOUR_DATA||W?.tour_data||W?.data||W||{},Q=B.scenes||B.SCENES||[];return Array.isArray(Q)?Q.map(xe):[]}function F(W="VR360 Tour"){return{title:W,scenes:[]}}async function H(){try{const W=await Nr();n.value=Ee(W.data),!s.value&&n.value.length&&(s.value=n.value[0].id)}catch(W){d.value=W.response?.data?.detail||"Could not load project list."}}async function N(){if(!s.value)return;const W=await Lr(s.value);i.value=Ee(W.data),!o.value&&i.value.length&&(o.value=i.value[0].id)}async function j(){if(!o.value)return;const W=await po(o.value);r.value=Ee(W.data);const B=r.value.find(Q=>Q.status==="draft");a.value=B?.id||r.value[0]?.id||""}async function J(){if(!o.value||!a.value)return;d.value="";const W=await yu(o.value,a.value);l.value=W.data,c.value=k(W.data.data),u.value=c.value[0]?.id||"",f.value="",V(),te(null)}async function D(){o.value="",a.value="",l.value=null,i.value=[],r.value=[],await N(),await j(),await J()}async function L(){a.value="",l.value=null,r.value=[],await j(),await J()}function V(){C.id=I.value?.id||"",C.name=I.value?.name||"",C.group=I.value?.group||"Default",C.description=I.value?.description||"",C.image_url=I.value?.image_url||I.value?.original_file||""}function ee(){I.value&&(I.value.name=C.name.trim()||I.value.image_file_name||I.value.id)}function z(){I.value&&(I.value.group=C.group.trim()||"Default")}function te(W){x.id=W?.id||"",x.label=W?.label||"",x.type=W?.type||"nav",x.target_scene_id=W?.target_scene_id||"",x.x=Math.round(Number(W?.x??50)),x.y=Math.round(Number(W?.y??50)),x.lon=Math.round(Number(W?.lon??0)*10)/10,x.lat=Math.round(Number(W?.lat??0)*10)/10}function Me(W){u.value=W,f.value="",E.value=!1,V(),te(null)}function ye(){I.value&&(E.value=!0,f.value="",te(null))}function Te(){const W=be("scene");c.value.push(xe({id:W,name:`Scene ${c.value.length+1}`},c.value.length)),Me(W)}function me(W){const B=`img_${Ce(W.name.replace(/\.[^.]+$/,""))||Date.now()}`,Q=c.value.some(Pt=>Pt.id===B)?be(B):B,Ze=URL.taoObjectURL(W);return xe({id:Q,name:W.name.replace(/\.[^.]+$/,""),image_url:"",preview_url:Ze,preview_object_url:Ze,local_file:W,image_file_name:W.name},c.value.length)}async function Fe(W,B){if(!a.value)return!1;try{W.scene_asset_id&&(await O1(W.scene_asset_id),W.scene_asset_id="",W.original_file="",W.tile_base_path="",W.processing_status="");const Q=await N1({tourVersion:a.value,sceneKey:W.id,originalFile:B}),Ze=Q.data.asset||Q.data;return W.scene_asset_id=Ze.id,W.original_file=Ze.original_file,W.tile_base_path=Ze.tile_base_path,W.processing_status=Ze.processing_status,W.local_file=null,!0}catch(Q){const Ze=Q.response?.data?.asset;return Ze?(W.scene_asset_id=Ze.id,W.original_file=Ze.original_file,W.tile_base_path=Ze.tile_base_path,W.processing_status=Ze.processing_status,W.local_file=null,d.value=Q.response?.data?.detail||"Image was saved, but tiles are not processed yet.",!0):(d.value=Q.response?.data?.detail||"Image is previewed locally, but backend upload is not finished. Click Save Tour and upload again if tiles are needed.",!1)}}async function U(){if(!a.value)return 0;let W=0;for(const B of c.value)B.local_file&&await Fe(B,B.local_file)&&(W+=1);return W}async function We(W){const B=Array.from(W||[]).filter(Q=>Q.type.startsWith("image/"));if(B.length){_.value=!0,d.value="",h.value="";for(const Q of B){const Ze=me(Q);c.value.push(Ze),u.value=Ze.id,V()}_.value=!1,h.value=`Added ${B.length} image(s) to tour. Click Save Tour to save images to backend.`}}function Ne(){b.value?.click()}function P(W){We(W.target.files),W.target.value=""}function v(W){S.value=!1,We(W.dataTransfer?.files)}function X(){if(!I.value)return;const W=I.value.id,B=C.id.trim()||W;I.value.id=B,I.value.name=C.name.trim()||I.value.name,I.value.group=C.group.trim()||"Default",I.value.description=C.description.trim(),I.value.image_url=C.image_url.trim(),c.value.forEach(Q=>{Q.hotspots=(Q.hotspots||[]).map(Ze=>({...Ze,target_scene_id:Ze.target_scene_id===W?B:Ze.target_scene_id}))}),u.value=B,h.value="Da luu thuoc tinh scene."}function Z(W){if(!window.confirm("Delete scene nay?"))return;const B=c.value.find(Q=>Q.id===W);B?.preview_object_url&&URL.revokeObjectURL(B.preview_object_url),c.value=c.value.filter(Q=>Q.id!==W),c.value.forEach(Q=>{Q.hotspots=(Q.hotspots||[]).filter(Ze=>Ze.target_scene_id!==W)}),u.value=c.value[0]?.id||"",f.value="",V(),te(null)}function ae(W){if(!I.value||!E.value)return;const B={id:be("hotspot"),label:`Hotspot ${(I.value.hotspots||[]).length+1}`,type:"nav",target_scene_id:Le(),x:Math.round(W.x),y:Math.round(W.y),lon:Math.round(Number(W.lon??R.lon)*10)/10,lat:Math.round(Number(W.lat??R.lat)*10)/10};I.value.hotspots=[...I.value.hotspots||[],B],f.value=B.id,E.value=!1,te(B)}function Ae(W){f.value=W.id,te(W)}function Le(){if(!I.value)return"";const W=c.value.findIndex(Q=>Q.id===I.value.id);return c.value.find((Q,Ze)=>Ze>W&&Q.id!==I.value.id)?.id||c.value.find(Q=>Q.id!==I.value.id)?.id||""}function pe(){const W=ce.value;W&&(W.label=x.label.trim()||W.label,W.type=x.type,W.target_scene_id=x.target_scene_id||Le(),W.x=Number(x.x),W.y=Number(x.y),W.lon=Number(x.lon),W.lat=Number(x.lat),x.target_scene_id=W.target_scene_id,h.value="Da luu hotspot.")}function ge(){!I.value||!f.value||(I.value.hotspots=(I.value.hotspots||[]).filter(W=>W.id!==f.value),f.value="",te(null))}function De(){I.value&&(I.value.view={...R},h.value="Da luu view mac dinh cho scene.")}function Xe(W){R.lon=W.lon,R.lat=W.lat,R.fov=W.fov}function Oe(){const W=new Blob([oe.value],{type:"application/json"}),B=URL.taoObjectURL(W),Q=document.taoElement("a");Q.href=B,Q.download="vr360-tour.json",Q.click(),URL.revokeObjectURL(B)}async function Ie(){await navigator.clipboard.writeText(oe.value),h.value="Da copy TOUR_DATA."}function et(){O.value="",m.value=!0}async function it(){n.value.length||await H(),M.project_id=s.value||n.value[0]?.id||"",M.location_id="",M.version_id="",M.create_project=!M.project_id,M.create_location=!1,M.create_version=!0,M.project_name="",M.project_description="",M.location_name="",M.location_description="",M.latitude="",M.longitude="",M.version_label="",w.value=[],T.value=[],M.project_id&&await ot(),y.value=!0}async function ot(){if(w.value=[],T.value=[],M.location_id="",M.version_id="",!M.project_id||M.create_project)return;const W=await Lr(M.project_id);w.value=Ee(W.data),M.location_id=o.value||w.value[0]?.id||"",M.location_id&&await $()}async function $(){if(T.value=[],M.version_id="",!M.location_id||M.create_location)return;const W=await po(M.location_id);T.value=Ee(W.data);const B=T.value.find(Q=>Q.status==="draft");M.version_id=a.value||B?.id||T.value[0]?.id||""}function Ue(){M.create_project=!0,M.create_location=!0,M.create_version=!0,M.project_id="",M.location_id="",M.version_id="",w.value=[],T.value=[]}function ve(){M.create_project=!1,M.create_location=!1,M.project_id=s.value||n.value[0]?.id||"",ot()}function Be(){M.create_location=!0,M.create_version=!0,M.location_id="",M.version_id="",T.value=[]}function He(){M.create_location=!1,M.location_id=o.value||w.value[0]?.id||"",$()}async function Se(){if(M.create_project&&!M.project_name.trim()){d.value="Ban can import name project moi.";return}if(!M.create_project&&!M.project_id){d.value="Ban can chon project hoac tao project moi.";return}if(M.create_location&&!M.location_name.trim()){d.value="Ban can import name location moi.";return}if(!M.create_location&&!M.location_id){d.value="Ban can chon location hoac tao location moi.";return}if(!M.create_version&&!M.version_id){d.value="Ban can chon version co san hoac tao version moi.";return}d.value="",h.value="";try{let W=n.value.find(Ze=>Ze.id===M.project_id);M.create_project&&(W=(await Mg({name:M.project_name.trim(),description:M.project_description.trim(),is_active:!0})).data);let B=w.value.find(Ze=>Ze.id===M.location_id);if(M.create_location){const Ze={name:M.location_name.trim(),description:M.location_description.trim(),is_active:!0,order:0};M.latitude!==""&&(Ze.latitude=Number(M.latitude)),M.longitude!==""&&(Ze.longitude=Number(M.longitude)),B=(await Sg(W.id,Ze)).data}let Q=T.value.find(Ze=>Ze.id===M.version_id);if(M.create_version){const Ze=F(M.version_label.trim()||`${B.name} draft`);Q=(await bu(B.id,{label:M.version_label.trim()||`${B.name} draft`,changelog:"Created from VR360 Builder.",data:Ze})).data}else Q=(await yu(B.id,Q.id)).data;await H(),s.value=W.id,await N(),o.value=B.id,await j(),a.value=Q.id,l.value=Q,c.value.forEach(Ze=>{Ze.preview_object_url&&URL.revokeObjectURL(Ze.preview_object_url)}),c.value=k(Q.data),u.value=c.value[0]?.id||"",f.value="",V(),te(null),y.value=!1,h.value=M.create_version?"Da tao/chon tour va tao version draft moi.":"Da mo version co san de chinh sua."}catch(W){d.value=W.response?.data?.detail||W.response?.data?.name?.[0]||W.response?.data?.non_field_errors?.[0]||"Could not create/select tour."}}function Ke(){try{const W=JSON.parse(O.value);c.value.forEach(B=>{B.preview_object_url&&URL.revokeObjectURL(B.preview_object_url)}),c.value=k(W),l.value=l.value?{...l.value,data:W}:l.value,u.value=c.value[0]?.id||"",f.value="",V(),te(null),m.value=!1,h.value="Da import JSON."}catch{d.value="JSON none hop le."}}async function Ye(){if(!o.value){d.value="Ban can chon location truoc, roi Save Tour se tu tao version draft.";return}d.value="",h.value="";try{if(!a.value||!l.value){const Ze=await bu(o.value,{label:G.value.title||"VR360 Tour draft",changelog:"Created from VR360 Builder.",data:G.value});l.value=Ze.data,a.value=Ze.data.id,await j(),a.value=Ze.data.id}const W=c.value.some(Ze=>Ze.local_file);let B=0;W&&(l.value=(await Su(o.value,a.value,{label:l.value.label,changelog:l.value.changelog,data:G.value})).data,B=await U());const Q=await Su(o.value,a.value,{label:l.value.label,changelog:l.value.changelog,data:G.value});l.value=Q.data,h.value=W?`Saved tour and uploaded ${B} image(s).`:"Saved draft tour version successfully."}catch(W){d.value=W.response?.data?.detail||"Could not save builder. Only draft versions can be edited."}}async function Bt(){try{await H(),await N(),await j(),await J()}catch(W){d.value=W.response?.data?.detail||"Could not load builder data."}}function Ct(){if(window.history.length>1){e.back();return}e.push("/dashboard")}return Qn(Bt),Nu(()=>{c.value.forEach(W=>{W.preview_object_url&&URL.revokeObjectURL(W.preview_object_url)})}),(W,B)=>(ue(),de("section",V1,[g("header",H1,[g("button",{class:"builder-tool-button builder-back-button",type:"button",onClick:Ct},"< Back"),B[43]||(B[43]=g("div",{class:"builder-brand"},"VR360 Builder",-1)),g("div",z1,[g("button",{class:"builder-tool-button",type:"button",onClick:Ne},"+ Add image"),g("button",{class:"builder-tool-button",type:"button",onClick:et},"Import JSON"),g("button",{class:"builder-tool-button",type:"button",onClick:J},"Load Tour"),g("button",{class:"builder-save-button",type:"button",onClick:Ye},"Save Tour"),g("button",{class:"builder-quick-button",type:"button",onClick:it}," + Create new tour "),Qe(g("select",{"onUpdate:modelValue":B[0]||(B[0]=Q=>s.value=Q),onChange:D},[B[40]||(B[40]=g("option",{value:""},"Select project",-1)),(ue(!0),de(nt,null,ht(n.value,Q=>(ue(),de("option",{key:Q.id,value:Q.id},le(Q.name),9,G1))),128))],544),[[jt,s.value]]),Qe(g("select",{"onUpdate:modelValue":B[1]||(B[1]=Q=>o.value=Q),onChange:L},[B[41]||(B[41]=g("option",{value:""},"Select location",-1)),(ue(!0),de(nt,null,ht(i.value,Q=>(ue(),de("option",{key:Q.id,value:Q.id},le(Q.name),9,W1))),128))],544),[[jt,o.value]]),Qe(g("select",{"onUpdate:modelValue":B[2]||(B[2]=Q=>a.value=Q),onChange:J},[B[42]||(B[42]=g("option",{value:""},"Select version",-1)),(ue(!0),de(nt,null,ht(r.value,Q=>(ue(),de("option",{key:Q.id,value:Q.id},"v"+le(Q.version_number)+" - "+le(Q.status),9,X1))),128))],544),[[jt,a.value]])]),g("div",$1,[g("button",{class:"builder-export-button",type:"button",onClick:B[3]||(B[3]=Q=>p.value=!0)},"Export JSON")]),g("input",{ref_key:"fileInput",ref:b,class:"hidden-input",type:"file",multiple:"",accept:"image/*",onChange:P},null,544)]),d.value?(ue(),de("p",q1,le(d.value),1)):mt("",!0),h.value?(ue(),de("p",Y1,le(h.value),1)):mt("",!0),g("div",K1,[g("aside",{class:cn(["builder-left",{"drag-over":S.value}]),onDragover:B[4]||(B[4]=Mn(Q=>S.value=!0,["prevent"])),onDragleave:B[5]||(B[5]=Mn(Q=>S.value=!1,["prevent"])),onDrop:Mn(v,["prevent"])},[g("div",j1,[B[44]||(B[44]=g("h2",null,"Scenes",-1)),g("span",null,le(c.value.length),1)]),(ue(!0),de(nt,null,ht(c.value,(Q,Ze)=>(ue(),de("button",{key:Q.id,class:cn(["scene-list-item",{active:Q.id===u.value}]),type:"button",onClick:Pt=>Me(Q.id)},[g("span",J1,le(Ze+1),1),g("span",{class:"scene-thumb",style:yn(we(Q)?{backgroundImage:`url(${we(Q)})`}:{})},null,4),g("span",Q1,[g("strong",null,le(Q.name||Q.id),1),g("small",null,le(Q.hotspots?.length||0)+" hotspot · "+le(Q.group||"Default"),1)])],10,Z1))),128)),g("button",{class:"drop-zone-button",type:"button",onClick:Ne}," + Keo tha hoac click de them anh 360° ")],34),g("main",eR,[g("div",tR,[fn(yg,{"image-url":_e.value,hotspots:I.value?.hotspots||[],"selected-hotspot-id":f.value,"initial-view":Y.value,onPanoramaClick:ae,onHotspotClick:Ae,onViewChange:Xe},null,8,["image-url","hotspots","selected-hotspot-id","initial-view"]),g("div",nR,le(I.value?E.value?"Selecting hotspot position: click image to pin point":"Drag mouse to rotate. Click + Add hotspot then click image to place point.":"Them anh panorama 360° de bat dau"),1),g("div",iR,[g("span",null,"LON "+le(R.lon)+"°",1),g("span",null,"LAT "+le(R.lat)+"°",1),g("span",null,"FOV "+le(R.fov)+"°",1)])])]),g("aside",rR,[B[66]||(B[66]=g("h2",null,"Inspector",-1)),I.value?(ue(),de(nt,{key:0},[g("div",sR,[g("span",{class:"inspector-thumb",style:yn(_e.value?{backgroundImage:`url(${_e.value})`}:{})},null,4),g("button",{class:"builder-tool-button wide",type:"button",onClick:Ne},le(_.value?"Uploading...":"Change image"),1)]),g("div",oR,[g("label",null,[B[45]||(B[45]=dt("Scene ID",-1)),Qe(g("input",{"onUpdate:modelValue":B[6]||(B[6]=Q=>C.id=Q)},null,512),[[gt,C.id]])]),g("label",null,[B[46]||(B[46]=dt("Scene name",-1)),Qe(g("input",{"onUpdate:modelValue":B[7]||(B[7]=Q=>C.name=Q),onInput:ee},null,544),[[gt,C.name]])]),g("label",null,[B[47]||(B[47]=dt("Group",-1)),Qe(g("input",{"onUpdate:modelValue":B[8]||(B[8]=Q=>C.group=Q),onInput:z},null,544),[[gt,C.group]])]),g("label",null,[B[48]||(B[48]=dt("Description",-1)),Qe(g("textarea",{"onUpdate:modelValue":B[9]||(B[9]=Q=>C.description=Q),rows:"3"},null,512),[[gt,C.description]])]),g("label",null,[B[49]||(B[49]=dt("URL cloud / file",-1)),Qe(g("input",{"onUpdate:modelValue":B[10]||(B[10]=Q=>C.image_url=Q),placeholder:"/media/... hoac https://..."},null,512),[[gt,C.image_url]])]),g("div",aR,[g("button",{class:"secondary-button",type:"button",onClick:X},"Save scene"),g("button",{class:"danger-button",type:"button",onClick:B[11]||(B[11]=Q=>Z(I.value.id))},"Delete scene")])]),B[63]||(B[63]=g("hr",null,null,-1)),g("section",lR,[B[53]||(B[53]=g("h3",null,"View",-1)),g("div",cR,[g("label",null,[B[50]||(B[50]=dt("LON",-1)),g("input",{value:R.lon,readonly:""},null,8,uR)]),g("label",null,[B[51]||(B[51]=dt("LAT",-1)),g("input",{value:R.lat,readonly:""},null,8,fR)]),g("label",null,[B[52]||(B[52]=dt("FOV",-1)),g("input",{value:R.fov,readonly:""},null,8,dR)])]),g("button",{class:"builder-outline-button",type:"button",onClick:De},"Save current view")]),B[64]||(B[64]=g("hr",null,null,-1)),g("section",hR,[g("div",pR,[g("h3",null,"Hotspots ("+le(I.value.hotspots?.length||0)+")",1),g("button",{class:cn(["builder-mini-button",{active:E.value}]),type:"button",onClick:ye},le(E.value?"Click image...":"+ Add hotspot"),3)]),I.value.hotspots?.length?(ue(),de("div",mR,[(ue(!0),de(nt,null,ht(I.value.hotspots,(Q,Ze)=>(ue(),de("button",{key:Q.id,class:cn(["hotspot-list-item",{active:Q.id===f.value}]),type:"button",onClick:Pt=>Ae(Q)},[g("span",_R,le(Ze+1),1),g("span",null,[g("strong",null,le(Q.label||`Hotspot ${Ze+1}`),1),g("small",null," Lon:"+le(Math.round(Number(Q.lon||0)*10)/10)+"° Lat:"+le(Math.round(Number(Q.lat||0)*10)/10)+"° → "+le(Q.target_scene_id||"not selected")+" ("+le(Q.type||"point")+") ",1)]),g("button",{class:"hotspot-remove",type:"button",onClick:Mn(Pt=>{f.value=Q.id,ge()},["stop"])},"×",8,vR)],10,gR))),128))])):mt("",!0),ce.value?mt("",!0):(ue(),de("p",xR,' Click "+ Add hotspot", then click image to pin hotspot in the 360 position. '))]),ce.value?(ue(),de("div",bR,[g("h3",null,"HOTSPOT #"+le(he.value+1),1),g("label",null,[B[54]||(B[54]=dt("Label",-1)),Qe(g("input",{"onUpdate:modelValue":B[12]||(B[12]=Q=>x.label=Q)},null,512),[[gt,x.label]])]),g("label",null,[B[56]||(B[56]=dt(" Type ",-1)),Qe(g("select",{"onUpdate:modelValue":B[13]||(B[13]=Q=>x.type=Q)},[...B[55]||(B[55]=[g("option",{value:"point"},"POINT",-1),g("option",{value:"nav"},"NAV",-1)])],512),[[jt,x.type]])]),g("label",null,[B[58]||(B[58]=dt(" Target scene ",-1)),Qe(g("select",{"onUpdate:modelValue":B[14]||(B[14]=Q=>x.target_scene_id=Q)},[B[57]||(B[57]=g("option",{value:""},"None",-1)),(ue(!0),de(nt,null,ht(ne.value,Q=>(ue(),de("option",{key:Q.id,value:Q.id},le(Q.name||Q.id),9,yR))),128))],512),[[jt,x.target_scene_id]])]),g("div",SR,[g("label",null,[B[59]||(B[59]=dt("LON",-1)),Qe(g("input",{"onUpdate:modelValue":B[15]||(B[15]=Q=>x.lon=Q),type:"number",step:"0.1"},null,512),[[gt,x.lon]])]),g("label",null,[B[60]||(B[60]=dt("LAT",-1)),Qe(g("input",{"onUpdate:modelValue":B[16]||(B[16]=Q=>x.lat=Q),type:"number",step:"0.1"},null,512),[[gt,x.lat]])])]),g("div",MR,[g("label",null,[B[61]||(B[61]=dt("X %",-1)),Qe(g("input",{"onUpdate:modelValue":B[17]||(B[17]=Q=>x.x=Q),type:"number",min:"0",max:"100"},null,512),[[gt,x.x]])]),g("label",null,[B[62]||(B[62]=dt("Y %",-1)),Qe(g("input",{"onUpdate:modelValue":B[18]||(B[18]=Q=>x.y=Q),type:"number",min:"0",max:"100"},null,512),[[gt,x.y]])])]),g("div",{class:"actions-row"},[g("button",{class:"primary-button",type:"button",onClick:pe},"Save hotspot"),g("button",{class:"danger-button",type:"button",onClick:ge},"Delete")])])):mt("",!0)],64)):(ue(),de("div",ER,[B[65]||(B[65]=g("p",null,"Select a scene on the left to edit properties.",-1)),g("button",{class:"builder-tool-button wide",type:"button",onClick:Te},"+ Create empty scene")]))])]),p.value?(ue(),de("div",{key:2,class:"builder-modal-backdrop",onClick:B[20]||(B[20]=Mn(Q=>p.value=!1,["self"]))},[g("div",TR,[g("div",AR,[B[67]||(B[67]=g("h2",null,"Export TOUR_DATA",-1)),g("button",{class:"builder-mini-button",type:"button",onClick:B[19]||(B[19]=Q=>p.value=!1)},"Close")]),g("textarea",{readonly:"",rows:"18",value:oe.value},null,8,wR),g("div",{class:"actions-row"},[g("button",{class:"builder-save-button",type:"button",onClick:Oe},"Download JSON"),g("button",{class:"builder-tool-button",type:"button",onClick:Ie},"Copy")])])])):mt("",!0),m.value?(ue(),de("div",{key:3,class:"builder-modal-backdrop",onClick:B[23]||(B[23]=Mn(Q=>m.value=!1,["self"]))},[g("div",RR,[g("div",CR,[B[68]||(B[68]=g("h2",null,"Import JSON",-1)),g("button",{class:"builder-mini-button",type:"button",onClick:B[21]||(B[21]=Q=>m.value=!1)},"Cancel")]),Qe(g("textarea",{"onUpdate:modelValue":B[22]||(B[22]=Q=>O.value=Q),rows:"18",placeholder:"Paste TOUR_DATA JSON here..."},null,512),[[gt,O.value]]),g("div",{class:"actions-row"},[g("button",{class:"builder-save-button",type:"button",onClick:Ke},"Nhap")])])])):mt("",!0),y.value?(ue(),de("div",{key:4,class:"builder-modal-backdrop",onClick:B[39]||(B[39]=Mn(Q=>y.value=!1,["self"]))},[g("div",PR,[g("div",DR,[B[69]||(B[69]=g("h2",null,"Select or create tour",-1)),g("button",{class:"builder-mini-button",type:"button",onClick:B[24]||(B[24]=Q=>y.value=!1)},"Close")]),g("div",LR,[g("section",IR,[g("div",UR,[B[70]||(B[70]=g("h3",null,"1. Project",-1)),g("button",{class:"builder-mini-button",type:"button",onClick:B[25]||(B[25]=Q=>M.create_project?ve():Ue())},le(M.create_project?"Select project co san":"+ Create new project"),1)]),M.create_project?(ue(),de(nt,{key:0},[g("label",null,[B[71]||(B[71]=dt("New project name *",-1)),Qe(g("input",{"onUpdate:modelValue":B[26]||(B[26]=Q=>M.project_name=Q),placeholder:"VD: Xa Co Do"},null,512),[[gt,M.project_name]])]),g("label",null,[B[72]||(B[72]=dt("Description project",-1)),Qe(g("textarea",{"onUpdate:modelValue":B[27]||(B[27]=Q=>M.project_description=Q),rows:"2"},null,512),[[gt,M.project_description]])])],64)):(ue(),de("label",NR,[B[74]||(B[74]=dt(" Select project co san ",-1)),Qe(g("select",{"onUpdate:modelValue":B[28]||(B[28]=Q=>M.project_id=Q),onChange:ot},[B[73]||(B[73]=g("option",{value:""},"Select project",-1)),(ue(!0),de(nt,null,ht(n.value,Q=>(ue(),de("option",{key:Q.id,value:Q.id},le(Q.name),9,OR))),128))],544),[[jt,M.project_id]])]))]),g("section",FR,[g("div",BR,[B[75]||(B[75]=g("h3",null,"2. Location",-1)),g("button",{class:"builder-mini-button",type:"button",disabled:M.create_project||!M.create_project&&!M.project_id,onClick:B[29]||(B[29]=Q=>M.create_location?He():Be())},le(M.create_location?"Select location co san":"+ Create new location"),9,kR)]),M.create_location?(ue(),de(nt,{key:0},[g("label",null,[B[76]||(B[76]=dt("New location name *",-1)),Qe(g("input",{"onUpdate:modelValue":B[30]||(B[30]=Q=>M.location_name=Q),placeholder:"VD: Den Dan Ha"},null,512),[[gt,M.location_name]])]),g("label",null,[B[77]||(B[77]=dt("Description location",-1)),Qe(g("textarea",{"onUpdate:modelValue":B[31]||(B[31]=Q=>M.location_description=Q),rows:"2"},null,512),[[gt,M.location_description]])]),g("div",VR,[g("label",null,[B[78]||(B[78]=dt("Latitude",-1)),Qe(g("input",{"onUpdate:modelValue":B[32]||(B[32]=Q=>M.latitude=Q),type:"number",step:"0.000001"},null,512),[[gt,M.latitude]])]),g("label",null,[B[79]||(B[79]=dt("Longitude",-1)),Qe(g("input",{"onUpdate:modelValue":B[33]||(B[33]=Q=>M.longitude=Q),type:"number",step:"0.000001"},null,512),[[gt,M.longitude]])])])],64)):(ue(),de("label",HR,[B[81]||(B[81]=dt(" Select location co san ",-1)),Qe(g("select",{"onUpdate:modelValue":B[34]||(B[34]=Q=>M.location_id=Q),disabled:!w.value.length,onChange:$},[B[80]||(B[80]=g("option",{value:""},"Select location",-1)),(ue(!0),de(nt,null,ht(w.value,Q=>(ue(),de("option",{key:Q.id,value:Q.id},le(Q.name),9,GR))),128))],40,zR),[[jt,M.location_id]])]))]),g("section",WR,[g("div",XR,[B[82]||(B[82]=g("h3",null,"3. Version",-1)),M.create_location?mt("",!0):(ue(),de("button",{key:0,class:"builder-mini-button",type:"button",onClick:B[35]||(B[35]=Q=>M.create_version=!M.create_version)},le(M.create_version?"Select version co san":"+ Create new version"),1))]),!M.create_version&&!M.create_location?(ue(),de("label",$R,[B[84]||(B[84]=dt(" Select version de chinh sua ",-1)),Qe(g("select",{"onUpdate:modelValue":B[36]||(B[36]=Q=>M.version_id=Q),disabled:!T.value.length},[B[83]||(B[83]=g("option",{value:""},"Select version",-1)),(ue(!0),de(nt,null,ht(T.value,Q=>(ue(),de("option",{key:Q.id,value:Q.id}," v"+le(Q.version_number)+" - "+le(Q.status)+" - "+le(Q.label||"No label"),9,YR))),128))],8,qR),[[jt,M.version_id]])])):(ue(),de("label",KR,[B[85]||(B[85]=dt(" New draft version label ",-1)),Qe(g("input",{"onUpdate:modelValue":B[37]||(B[37]=Q=>M.version_label=Q),placeholder:"Leave empty to auto-name"},null,512),[[gt,M.version_label]])])),M.create_location?(ue(),de("p",jR," New location has no version, so Builder will create a new draft version. ")):mt("",!0)]),g("div",ZR,[g("button",{class:"builder-save-button",type:"button",onClick:Se},le(M.create_version?"Create/select tour":"Open version to edit"),1),g("button",{class:"builder-tool-button",type:"button",onClick:B[38]||(B[38]=Q=>y.value=!1)},"Cancel")])])])])):mt("",!0)]))}},QR={class:"page"},eC={key:0,class:"error-message"},tC={class:"panel"},nC={class:"inline-form"},iC=["value"],rC={class:"panel"},sC={class:"checkbox-row"},oC=["disabled"],aC={class:"panel"},lC={key:0,class:"muted"},cC={class:"table-wrap"},uC={class:"actions-cell"},fC=["onClick"],dC=["onClick"],hC={key:0},pC={__name:"LocationsView",setup(t){const e=Pe([]),n=Pe([]),i=Pe(""),r=Pe(!1),s=Pe(!1),o=Pe(""),a=un({id:null,name:"",description:"",latitude:"",longitude:"",order:0,is_active:!0});function l(p){return Array.isArray(p)?p:Array.isArray(p?.results)?p.results:Array.isArray(p?.data)?p.data:Array.isArray(p?.items)?p.items:[]}function c(p){const y=p.response?.data;return y?typeof y=="string"?y:y.detail?y.detail:Object.entries(y).map(([E,b])=>`${E}: ${Array.isArray(b)?b.join(", "):b}`).join(" | "):p.message||"Co loi xay ra."}async function u(){const p=await Nr();e.value=l(p.data),!i.value&&e.value.length&&(i.value=e.value[0].id)}async function f(){if(i.value){r.value=!0,o.value="";try{const p=await Lr(i.value);n.value=l(p.data)}catch(p){o.value=p.response?.data?.detail||"Could not load location list."}finally{r.value=!1}}}function d(){Object.assign(a,{id:null,name:"",description:"",latitude:"",longitude:"",order:n.value.length+1,is_active:!0})}function h(p){Object.assign(a,{id:p.id,name:p.name,description:p.description||"",latitude:p.latitude||"",longitude:p.longitude||"",order:p.order||0,is_active:p.is_active})}async function _(){if(!i.value){o.value="Vui long select project truoc khi create location.";return}s.value=!0,o.value="";const p={name:a.name,description:a.description,latitude:a.latitude||null,longitude:a.longitude||null,order:Number(a.order||0),is_active:a.is_active};try{a.id?await I1(a.id,p):await Sg(i.value,p),d(),await f()}catch(y){o.value=c(y)}finally{s.value=!1}}async function S(p){window.confirm(`Delete location "${p.name}"?`)&&(await U1(p.id),await f())}async function m(){await u(),d(),await f()}return Qn(m),(p,y)=>(ue(),de("section",QR,[g("header",{class:"page-header"},[y[7]||(y[7]=g("div",null,[g("p",{class:"eyebrow"},"Quan ly"),g("h1",null,"Location")],-1)),g("button",{class:"secondary-button",type:"button",onClick:f},"Refresh")]),o.value?(ue(),de("p",eC,le(o.value),1)):mt("",!0),g("section",tC,[y[9]||(y[9]=g("h2",null,"Select project",-1)),g("div",nC,[Qe(g("select",{"onUpdate:modelValue":y[0]||(y[0]=E=>i.value=E),onChange:f},[y[8]||(y[8]=g("option",{value:""},"Select project",-1)),(ue(!0),de(nt,null,ht(e.value,E=>(ue(),de("option",{key:E.id,value:E.id},le(E.name),9,iC))),128))],544),[[jt,i.value]])])]),g("section",rC,[g("h2",null,le(a.id?"Update location":"Create new location"),1),g("form",{class:"grid-form",onSubmit:Mn(_,["prevent"])},[Qe(g("input",{"onUpdate:modelValue":y[1]||(y[1]=E=>a.name=E),placeholder:"Ten location",required:""},null,512),[[gt,a.name]]),Qe(g("input",{"onUpdate:modelValue":y[2]||(y[2]=E=>a.description=E),placeholder:"Description"},null,512),[[gt,a.description]]),Qe(g("input",{"onUpdate:modelValue":y[3]||(y[3]=E=>a.latitude=E),type:"number",step:"any",placeholder:"Latitude"},null,512),[[gt,a.latitude,void 0,{number:!0}]]),Qe(g("input",{"onUpdate:modelValue":y[4]||(y[4]=E=>a.longitude=E),type:"number",step:"any",placeholder:"Longitude"},null,512),[[gt,a.longitude,void 0,{number:!0}]]),Qe(g("input",{"onUpdate:modelValue":y[5]||(y[5]=E=>a.order=E),type:"number",min:"0",placeholder:"Thu tu"},null,512),[[gt,a.order,void 0,{number:!0}]]),g("label",sC,[Qe(g("input",{"onUpdate:modelValue":y[6]||(y[6]=E=>a.is_active=E),type:"checkbox"},null,512),[[Xv,a.is_active]]),y[10]||(y[10]=dt(" Active ",-1))]),g("button",{class:"primary-button",type:"submit",disabled:s.value},le(s.value?"Saving...":a.id?"Save":"Create"),9,oC),g("button",{class:"secondary-button",type:"button",onClick:d},"Lam moi")],32)]),g("section",aC,[y[13]||(y[13]=g("h2",null,"Location list",-1)),r.value?(ue(),de("p",lC,"Loading...")):mt("",!0),g("div",cC,[g("table",null,[y[12]||(y[12]=g("thead",null,[g("tr",null,[g("th",null,"ID"),g("th",null,"Ten"),g("th",null,"Slug"),g("th",null,"Thu tu"),g("th",null,"Status"),g("th")])],-1)),g("tbody",null,[(ue(!0),de(nt,null,ht(n.value,E=>(ue(),de("tr",{key:E.id},[g("td",null,le(E.id),1),g("td",null,le(E.name),1),g("td",null,le(E.slug),1),g("td",null,le(E.order),1),g("td",null,le(E.is_active?"Active":"Inactive"),1),g("td",uC,[g("button",{class:"secondary-button",type:"button",onClick:b=>h(E)},"Edit",8,fC),g("button",{class:"danger-button",type:"button",onClick:b=>S(E)},"Delete",8,dC)])]))),128)),!n.value.length&&!r.value?(ue(),de("tr",hC,[...y[11]||(y[11]=[g("td",{colspan:"6"},"Chua co location.",-1)])])):mt("",!0)])])])])]))}},Eg="http://127.0.0.1:8000";function Tg(t,e=window.location.origin){return Ft.get(`${Eg}/api/public/tour/${t}/`,{headers:{Origin:e}})}function mC(t,e={},n=window.location.origin){return Ft.post(`${Eg}/api/public/tour/${t}/track-visit/`,e,{headers:{Origin:n}})}const gC={class:"page"},_C={class:"panel"},vC={key:0,class:"error-message"},xC={key:0,class:"two-column"},bC={class:"panel"},yC={class:"muted"},SC={class:"scene-grid"},MC={class:"panel"},EC={class:"json-preview"},TC={__name:"PublicViewerView",setup(t){const e=un({token:"",origin:window.location.origin}),n=Pe(null),i=Pe(""),r=Pe(!1);async function s(){i.value="",r.value=!1;try{const a=await Tg(e.token,e.origin);n.value=a.data}catch(a){n.value=null,i.value=a.response?.data?.detail||"Could not load public tour."}}async function o(){await mC(e.token,{country_code:"VN",city:"Ha Noi"},e.origin),r.value=!0}return(a,l)=>(ue(),de("section",gC,[l[4]||(l[4]=g("header",{class:"page-header"},[g("div",null,[g("p",{class:"eyebrow"},"Public"),g("h1",null,"Public Viewer")])],-1)),g("section",_C,[g("form",{class:"inline-form",onSubmit:Mn(s,["prevent"])},[Qe(g("input",{"onUpdate:modelValue":l[0]||(l[0]=c=>e.token=c),placeholder:"public_token"},null,512),[[gt,e.token]]),Qe(g("input",{"onUpdate:modelValue":l[1]||(l[1]=c=>e.origin=c),placeholder:"Origin"},null,512),[[gt,e.origin]]),l[2]||(l[2]=g("button",{class:"primary-button",type:"submit"},"Load Tour",-1))],32),i.value?(ue(),de("p",vC,le(i.value),1)):mt("",!0)]),n.value?(ue(),de("section",xC,[g("div",bC,[g("h2",null,le(n.value.location.name),1),g("p",yC,"Version v"+le(n.value.version.version_number)+" - "+le(n.value.version.label),1),g("button",{class:"secondary-button",type:"button",onClick:o},le(r.value?"Da track visit":"Track visit"),1),g("div",SC,[(ue(!0),de(nt,null,ht(n.value.data.scenes,c=>(ue(),de("article",{key:c.id,class:"scene-card"},[g("strong",null,le(c.name||c.id),1),g("span",null,le(c.tile_url?"Co tile URL":"Chua co tile"),1),g("small",null,le(c.tile_url),1)]))),128))])]),g("div",MC,[l[3]||(l[3]=g("h2",null,"Raw data",-1)),g("pre",EC,le(n.value),1)])])):mt("",!0)]))}},AC={class:"page"},wC={key:0,class:"error-message"},RC={class:"panel"},CC={class:"panel"},PC={key:0,class:"muted"},DC={class:"table-wrap"},LC={key:0},IC={__name:"ProjectsView",setup(t){const e=Pe([]),n=Pe(!1),i=Pe(""),r=un({name:"",description:""});function s(l){return Array.isArray(l)?l:Array.isArray(l?.results)?l.results:Array.isArray(l?.data)?l.data:Array.isArray(l?.items)?l.items:[]}async function o(){n.value=!0,i.value="";try{const l=await Nr();e.value=s(l.data)}catch(l){i.value=l.response?.data?.detail||"Could not load project list."}finally{n.value=!1}}async function a(){if(!r.name.trim()){i.value="Vui long import name project.";return}await Mg({name:r.name,description:r.description,is_active:!0}),r.name="",r.description="",await o()}return Qn(o),(l,c)=>(ue(),de("section",AC,[g("header",{class:"page-header"},[c[2]||(c[2]=g("div",null,[g("p",{class:"eyebrow"},"Quan ly"),g("h1",null,"Project VR360")],-1)),g("button",{class:"secondary-button",type:"button",onClick:o},"Refresh")]),i.value?(ue(),de("p",wC,le(i.value),1)):mt("",!0),g("section",RC,[c[4]||(c[4]=g("h2",null,"Create new project",-1)),g("form",{class:"inline-form",onSubmit:Mn(a,["prevent"])},[Qe(g("input",{"onUpdate:modelValue":c[0]||(c[0]=u=>r.name=u),placeholder:"Ten project"},null,512),[[gt,r.name]]),Qe(g("input",{"onUpdate:modelValue":c[1]||(c[1]=u=>r.description=u),placeholder:"Description ngan"},null,512),[[gt,r.description]]),c[3]||(c[3]=g("button",{class:"primary-button",type:"submit"},"Create project",-1))],32)]),g("section",CC,[c[7]||(c[7]=g("h2",null,"Project list",-1)),n.value?(ue(),de("p",PC,"Loading...")):mt("",!0),g("div",DC,[g("table",null,[c[6]||(c[6]=g("thead",null,[g("tr",null,[g("th",null,"ID"),g("th",null,"Ten"),g("th",null,"Slug"),g("th",null,"Status"),g("th",null,"Ngay tao")])],-1)),g("tbody",null,[(ue(!0),de(nt,null,ht(e.value,u=>(ue(),de("tr",{key:u.id},[g("td",null,le(u.id),1),g("td",null,le(u.name),1),g("td",null,le(u.slug),1),g("td",null,le(u.is_active?"Active":"Inactive"),1),g("td",null,le(u.created_at),1)]))),128)),!e.value.length&&!n.value?(ue(),de("tr",LC,[...c[5]||(c[5]=[g("td",{colspan:"5"},"No project yet.",-1)])])):mt("",!0)])])])])]))}};function UC(t){return _t.get(`/api/locations/${t}/publish/`)}function NC(t,e){return _t.post(`/api/locations/${t}/publish/`,e)}function OC(t,e){return _t.patch(`/api/locations/${t}/publish/`,e)}function FC(t){return _t.post(`/api/locations/${t}/publish/regenerate-token/`)}function BC(t){return _t.delete(`/api/locations/${t}/publish/`)}function kC(t){return _t.get(`/api/locations/${t}/publish/domains/`)}function VC(t,e){return _t.post(`/api/locations/${t}/publish/domains/`,e)}function HC(t,e,n){return _t.patch(`/api/locations/${t}/publish/domains/${e}/`,n)}function zC(t,e){return _t.delete(`/api/locations/${t}/publish/domains/${e}/`)}const GC={class:"page"},WC={key:0,class:"error-message"},XC={class:"panel selector-grid"},$C=["value"],qC=["value"],YC=["value"],KC={class:"two-column"},jC={class:"panel"},ZC={class:"json-preview"},JC={class:"panel"},QC={class:"activity-list"},eP={class:"actions-row"},tP=["onClick"],nP=["onClick"],iP={key:0,class:"muted"},rP={__name:"PublishingView",setup(t){const e=Pe([]),n=Pe([]),i=Pe([]),r=Pe([]),s=Pe(null),o=Pe(""),a=Pe(""),l=Pe(""),c=Pe(""),u=un({domain:"localhost:5173",label:"Local fronnamed"});function f(O){return Array.isArray(O)?O:Array.isArray(O?.results)?O.results:Array.isArray(O?.data)?O.data:Array.isArray(O?.items)?O.items:[]}async function d(){const O=await Nr();e.value=f(O.data),!o.value&&e.value.length&&(o.value=e.value[0].id)}async function h(){if(!o.value)return;const O=await Lr(o.value);n.value=f(O.data),!a.value&&n.value.length&&(a.value=n.value[0].id)}async function _(){if(!a.value)return;const O=await po(a.value);i.value=f(O.data),l.value=i.value[0]?.id||""}async function S(){if(!a.value)return;const O=await UC(a.value);s.value=O.data;const M=await kC(a.value);r.value=f(M.data)}async function m(){await _(),await S()}async function p(){a.value="",await h(),await m()}async function y(){c.value="";try{await NC(a.value,{published_version:l.value,is_active:!0}),await S()}catch(O){c.value=O.response?.data?.detail||"Publish none thimage cong."}}async function E(){const O=s.value?.publish_config;O&&(await OC(a.value,{is_active:!O.is_active}),await S())}async function b(){await FC(a.value),await S()}async function w(){window.confirm("Cancel publish location nay?")&&(await BC(a.value),await S())}async function T(){await VC(a.value,{domain:u.domain,label:u.label,is_active:!0}),await S()}async function C(O){await HC(a.value,O.id,{is_active:!O.is_active}),await S()}async function x(O){window.confirm(`Delete domain ${O.domain}?`)&&(await zC(a.value,O.id),await S())}async function R(){await d(),await h(),await m()}return Qn(R),(O,M)=>(ue(),de("section",GC,[g("header",{class:"page-header"},[M[5]||(M[5]=g("div",null,[g("p",{class:"eyebrow"},"Publish"),g("h1",null,"Cau hinh tour public")],-1)),g("button",{class:"secondary-button",type:"button",onClick:m},"Refresh")]),c.value?(ue(),de("p",WC,le(c.value),1)):mt("",!0),g("section",XC,[g("label",null,[M[6]||(M[6]=dt(" Project ",-1)),Qe(g("select",{"onUpdate:modelValue":M[0]||(M[0]=I=>o.value=I),onChange:p},[(ue(!0),de(nt,null,ht(e.value,I=>(ue(),de("option",{key:I.id,value:I.id},le(I.name),9,$C))),128))],544),[[jt,o.value]])]),g("label",null,[M[7]||(M[7]=dt(" Location ",-1)),Qe(g("select",{"onUpdate:modelValue":M[1]||(M[1]=I=>a.value=I),onChange:m},[(ue(!0),de(nt,null,ht(n.value,I=>(ue(),de("option",{key:I.id,value:I.id},le(I.name),9,qC))),128))],544),[[jt,a.value]])]),g("label",null,[M[8]||(M[8]=dt(" Version ",-1)),Qe(g("select",{"onUpdate:modelValue":M[2]||(M[2]=I=>l.value=I)},[(ue(!0),de(nt,null,ht(i.value,I=>(ue(),de("option",{key:I.id,value:I.id}," v"+le(I.version_number)+" - "+le(I.status),9,YC))),128))],512),[[jt,l.value]])]),g("button",{class:"primary-button",type:"button",onClick:y},"Publish")]),g("section",KC,[g("div",jC,[M[9]||(M[9]=g("h2",null,"Cau hinh export ban",-1)),g("pre",ZC,le(s.value||"Chua co cau hinh publish."),1),g("div",{class:"actions-row"},[g("button",{class:"secondary-button",type:"button",onClick:E},"Bat/tat active"),g("button",{class:"secondary-button",type:"button",onClick:b},"Regenerate token"),g("button",{class:"danger-button",type:"button",onClick:w},"Cancel publish")])]),g("div",JC,[M[11]||(M[11]=g("h2",null,"Domain cho phep",-1)),g("form",{class:"form",onSubmit:Mn(T,["prevent"])},[Qe(g("input",{"onUpdate:modelValue":M[3]||(M[3]=I=>u.domain=I),placeholder:"localhost:5173"},null,512),[[gt,u.domain]]),Qe(g("input",{"onUpdate:modelValue":M[4]||(M[4]=I=>u.label=I),placeholder:"Label"},null,512),[[gt,u.label]]),M[10]||(M[10]=g("button",{class:"primary-button",type:"submit"},"Add domain",-1))],32),g("ul",QC,[(ue(!0),de(nt,null,ht(r.value,I=>(ue(),de("li",{key:I.id},[g("strong",null,le(I.domain),1),g("span",null,le(I.label)+" - "+le(I.is_active?"Active":"Inactive"),1),g("div",eP,[g("button",{class:"secondary-button",type:"button",onClick:ce=>C(I)},"Bat/tat",8,tP),g("button",{class:"danger-button",type:"button",onClick:ce=>x(I)},"Delete",8,nP)])]))),128)),r.value.length?mt("",!0):(ue(),de("li",iP,"Chua co domain whitelist."))])])])]))}};function sP(t,e={}){return _t.get(`/api/locations/${t}/stats/summary/`,{params:e})}function oP(t,e={}){return _t.get(`/api/locations/${t}/stats/timeseries/`,{params:e})}function aP(t,e={}){return _t.get(`/api/locations/${t}/stats/by-country/`,{params:e})}function lP(t,e={}){return _t.get(`/api/locations/${t}/stats/by-device/`,{params:e})}function cP(t,e={}){return _t.get(`/api/locations/${t}/stats/by-referrer/`,{params:e})}const uP={class:"page analytics-dashboard-page"},fP={class:"page-header analytics-dashboard-header"},dP=["disabled"],hP={class:"panel analytics-filter-panel"},pP=["value"],mP=["value"],gP={class:"period-toggle","aria-label":"Choose time range"},_P=["onClick"],vP={key:0,class:"builder-alert error"},xP={class:"analytics-metric-row"},bP={class:"analytics-metric-card primary"},yP={class:"analytics-metric-card"},SP={class:"analytics-metric-card"},MP={class:"analytics-codein-grid"},EP={class:"panel analytics-chart-card"},TP={class:"panel-title-row"},AP={class:"chart-subtitle"},wP={class:"chart-badge"},RP={key:0,class:"analytics-chart large"},CP=["viewBox"],PP=["x2","y1","y2"],DP=["x","y","width","height"],LP=["points"],IP=["cx","cy"],UP=["x","y"],NP={key:1,class:"empty-state"},OP={class:"panel analytics-donut-card"},FP={class:"panel-title-row"},BP={class:"chart-badge"},kP={class:"donut-wrap"},VP={class:"breakdown-list"},HP={class:"analytics-table-grid"},zP={class:"panel"},GP={class:"breakdown-list roomy"},WP={class:"panel"},XP={class:"analytics-referrer-table"},oc=1e3,ta=300,Ji=42,$P={__name:"StatsView",setup(t){const e=new Date().getFullYear(),n=Pe([]),i=Pe([]),r=Pe(""),s=Pe(""),o=Pe(null),a=Pe([]),l=Pe([]),c=Pe([]),u=Pe([]),f=Pe(!1),d=Pe(""),h=un({from:`${e}-01-01`,to:`${e}-12-31`,granularity:"month"}),_=[{label:"Tuan",value:"week",hint:"Theo tuan"},{label:"Thang",value:"month",hint:"Theo thang"},{label:"Nam",value:"year",hint:"Theo nam"}],S=["#4f63ff","#8b5cf6","#ec4899","#f59e0b","#10b981","#0ea5e9"],m=oc-Ji*2,p=ta-Ji*2,y=at(()=>Number(o.value?.total_visits||0)),E=at(()=>Number(o.value?.unique_visitors||0)),b=at(()=>a.value.length?Math.round(y.value/a.value.length*10)/10:0),w=at(()=>Math.max(1,...a.value.map(Re=>Number(Re.total_visits||0)))),T=at(()=>{const Re=Math.max(1,a.value.length),we=m/Re,xe=Math.max(10,Math.min(44,we*.5));return a.value.map((k,F)=>{const H=Number(k.total_visits||0),N=H/w.value*p;return{...k,visits:H,label:Y(k.period),x:Ji+F*we+(we-xe)/2,y:ta-Ji-N,width:xe,height:N}})}),C=at(()=>{if(!T.value.length)return[];const Re=h.granularity==="year"?T.value.length:7,we=Math.max(1,Math.ceil(T.value.length/Re));return T.value.filter((xe,k)=>k%we===0||k===T.value.length-1)}),x=at(()=>T.value.map(Re=>`${Re.x+Re.width/2},${Re.y}`).join(" ")),R=at(()=>c.value.reduce((Re,we)=>Re+Number(we.count||0),0)),O=at(()=>{if(!R.value)return{background:"#eef2ff"};let Re=0;return{background:`conic-gradient(${c.value.slice(0,6).map((xe,k)=>{const F=Re;return Re+=Number(xe.count||0)/R.value*100,`${S[k%S.length]} ${F}% ${Re}%`}).join(", ")})`}}),M=at(()=>l.value.slice(0,5)),I=at(()=>c.value.slice(0,5)),ce=at(()=>u.value.slice(0,6));function he(Re){return Array.isArray(Re)?Re:Array.isArray(Re?.results)?Re.results:Array.isArray(Re?.data)?Re.data:Array.isArray(Re?.items)?Re.items:[]}function Y(Re){if(!Re)return"";const we=String(Re);return h.granularity==="year"?we.slice(0,4):h.granularity==="month"?we.slice(0,7):we.slice(0,10)}function ne(Re,we){return we?Math.round(Number(Re||0)/we*100):0}async function G(){const Re=await Nr();n.value=he(Re.data),!r.value&&n.value.length&&(r.value=n.value[0].id)}async function oe(){if(!r.value)return;const Re=await Lr(r.value);i.value=he(Re.data),!s.value&&i.value.length&&(s.value=i.value[0].id)}async function _e(){if(s.value){f.value=!0,d.value="";try{const Re={from:h.from,to:h.to},[we,xe,k,F,H]=await Promise.all([sP(s.value,Re),oP(s.value,{...Re,granularity:h.granularity}),aP(s.value,Re),lP(s.value,Re),cP(s.value,Re)]);o.value=we.data,a.value=xe.data.results||[],l.value=k.data.results||[],c.value=F.data.results||[],u.value=H.data.results||[]}catch(Re){d.value=Re.response?.data?.detail||"Could not load du lieu stats."}finally{f.value=!1}}}async function Ee(){s.value="",i.value=[],await oe(),await _e()}async function be(Re){h.granularity=Re,await _e()}async function Ce(){await G(),await oe(),await _e()}return Qn(Ce),(Re,we)=>(ue(),de("section",uP,[g("header",fP,[we[4]||(we[4]=g("div",null,[g("p",{class:"eyebrow"},"Stats"),g("h1",null,"Stats location"),g("span",{class:"analytics-subtitle"},"Theo doi luot truy cap, thiet bi va nguon gioi thieu cua tour VR360.")],-1)),g("button",{class:"secondary-button",type:"button",disabled:f.value,onClick:_e},le(f.value?"Loading...":"Refresh"),9,dP)]),g("section",hP,[g("label",null,[we[5]||(we[5]=dt(" Project ",-1)),Qe(g("select",{"onUpdate:modelValue":we[0]||(we[0]=xe=>r.value=xe),onChange:Ee},[(ue(!0),de(nt,null,ht(n.value,xe=>(ue(),de("option",{key:xe.id,value:xe.id},le(xe.name),9,pP))),128))],544),[[jt,r.value]])]),g("label",null,[we[6]||(we[6]=dt(" Location ",-1)),Qe(g("select",{"onUpdate:modelValue":we[1]||(we[1]=xe=>s.value=xe),onChange:_e},[(ue(!0),de(nt,null,ht(i.value,xe=>(ue(),de("option",{key:xe.id,value:xe.id},le(xe.name),9,mP))),128))],544),[[jt,s.value]])]),g("label",null,[we[7]||(we[7]=dt(" Tu ngay ",-1)),Qe(g("input",{"onUpdate:modelValue":we[2]||(we[2]=xe=>h.from=xe),type:"date",onChange:_e},null,544),[[gt,h.from]])]),g("label",null,[we[8]||(we[8]=dt(" Den ngay ",-1)),Qe(g("input",{"onUpdate:modelValue":we[3]||(we[3]=xe=>h.to=xe),type:"date",onChange:_e},null,544),[[gt,h.to]])]),g("div",gP,[(ue(),de(nt,null,ht(_,xe=>g("button",{key:xe.value,type:"button",class:cn({active:h.granularity===xe.value}),onClick:k=>be(xe.value)},[g("strong",null,le(xe.label),1),g("small",null,le(xe.hint),1)],10,_P)),64))])]),d.value?(ue(),de("p",vP,le(d.value),1)):mt("",!0),g("section",xP,[g("article",bP,[we[9]||(we[9]=g("span",null,"Tong luot truy cap",-1)),g("strong",null,le(y.value),1),g("small",null,le(h.from)+" → "+le(h.to),1)]),g("article",yP,[we[10]||(we[10]=g("span",null,"Khach duy nhat",-1)),g("strong",null,le(E.value),1),we[11]||(we[11]=g("small",null,"Unique visitor",-1))]),g("article",SP,[we[12]||(we[12]=g("span",null,"Trung binh / ky",-1)),g("strong",null,le(b.value),1),g("small",null,le(h.granularity),1)])]),g("section",MP,[g("article",EP,[g("div",TP,[g("div",null,[we[13]||(we[13]=g("h2",null,"Bieu do truy cap",-1)),g("p",AP,"Luot truy cap theo "+le(_.find(xe=>xe.value===h.granularity)?.label.toLowerCase()),1)]),g("span",wP,"Codex "+le(w.value),1)]),a.value.length?(ue(),de("div",RP,[(ue(),de("svg",{viewBox:`0 0 ${oc} ${ta}`,preserveAspectRatio:"none",role:"img","aria-label":"Bieu do luot truy cap"},[(ue(),de(nt,null,ht(5,xe=>g("line",{key:xe,x1:Ji,x2:oc-Ji,y1:Ji+(xe-1)*p/4,y2:Ji+(xe-1)*p/4,class:"chart-grid-line"},null,8,PP)),64)),(ue(!0),de(nt,null,ht(T.value,xe=>(ue(),de("rect",{key:xe.period,class:"chart-bar",x:xe.x,y:xe.y,width:xe.width,height:xe.height,rx:"8"},[g("title",null,le(xe.label)+": "+le(xe.visits)+" luot",1)],8,DP))),128)),T.value.length>1?(ue(),de("polyline",{key:0,class:"chart-line",points:x.value},null,8,LP)):mt("",!0),(ue(!0),de(nt,null,ht(T.value,xe=>(ue(),de("circle",{key:`${xe.period}-point`,class:"chart-point",cx:xe.x+xe.width/2,cy:xe.y,r:"4"},null,8,IP))),128)),(ue(!0),de(nt,null,ht(C.value,xe=>(ue(),de("text",{key:xe.period,class:"chart-label",x:xe.x+xe.width/2,y:ta-10,"text-anchor":"middle"},le(xe.label),9,UP))),128))],8,CP))])):(ue(),de("p",NP,"Chua co du lieu truy cap trong khoang thoi gian nay."))]),g("article",OP,[g("div",FP,[we[14]||(we[14]=g("h2",null,"Thiet bi truy cap",-1)),g("span",BP,le(R.value),1)]),g("div",kP,[g("div",{class:"donut-chart",style:yn(O.value)},[g("span",null,le(R.value),1)],4)]),g("ul",VP,[(ue(!0),de(nt,null,ht(I.value,(xe,k)=>(ue(),de("li",{key:xe.key},[g("i",{style:yn({background:S[k%S.length]})},null,4),g("strong",null,le(xe.key),1),g("span",null,le(xe.count)+" · "+le(ne(xe.count,R.value))+"%",1)]))),128))])])]),g("section",HP,[g("article",zP,[we[15]||(we[15]=g("h2",null,"Quoc gia",-1)),g("ul",GP,[(ue(!0),de(nt,null,ht(M.value,(xe,k)=>(ue(),de("li",{key:xe.key},[g("i",{style:yn({background:S[k%S.length]})},null,4),g("strong",null,le(xe.key),1),g("span",null,le(xe.count)+" luot",1)]))),128))])]),g("article",WP,[we[16]||(we[16]=g("h2",null,"Nguon gioi thieu",-1)),g("ul",XP,[(ue(!0),de(nt,null,ht(ce.value,xe=>(ue(),de("li",{key:xe.key},[g("strong",null,le(xe.key),1),g("span",null,le(xe.count),1),g("em",null,le(xe.unique_visitors)+" unique",1)]))),128))])])])]))}},qP={class:"tour-viewer-page"},YP={class:"viewer-topbar"},KP={class:"viewer-selects"},jP=["value"],ZP=["value"],JP=["value"],QP={class:"viewer-scene-badge"},eD={key:0,class:"viewer-error"},tD={key:1,class:"viewer-point-card"},nD={class:"viewer-sidebar-header"},iD={class:"viewer-sidebar-body"},rD=["onClick"],sD={class:"viewer-left-toolbar"},oD={class:"viewer-bottom-bar"},aD=["onClick"],lD={__name:"TourViewerView",setup(t){const e=dm(),n=xo(),i=Pe([]),r=Pe([]),s=Pe([]),o=Pe(""),a=Pe(""),l=Pe(""),c=Pe(null),u=Pe([]),f=Pe(""),d=Pe(!1),h=Pe(!0),_=Pe(""),S=Pe(null),m=un({lon:0,lat:0,fov:75}),p=at(()=>u.value.find(N=>N.id===f.value)||null),y=at(()=>u.value.findIndex(N=>N.id===f.value)),E=at(()=>p.value?.view||p.value?.initialView||{lon:0,lat:0,fov:75}),b=at(()=>x(p.value)),w=at(()=>{const N=p.value;return N?(N.hotspots||[]).map(j=>{const J=u.value.find(D=>D.id===j.target_scene_id);return{...j,preview_image:x(J||N)}}):[]});function T(N){return Array.isArray(N)?N:Array.isArray(N?.results)?N.results:Array.isArray(N?.data)?N.data:Array.isArray(N?.items)?N.items:[]}function C(N){return N?N.startsWith("blob:")||N.startsWith("data:")||N.startsWith("http")?N:`${el}${N.startsWith("/")?N:`/${N}`}`:""}function x(N){return N?C(N.image_url||N.original_file||N.thumbnail||N.thumb||N.panorama||""):""}function R(N,j=0){return{id:String(N.id||N.key||N.scene_key||`scene-${j+1}`),name:N.name||N.title||`Scene ${j+1}`,group:N.group||"Default",description:N.description||N.info||"",image_url:N.image_url||"",original_file:N.original_file||"",thumbnail:N.thumbnail||N.thumb||N.original_file||N.image_url||"",view:{lon:Number(N.view?.lon??N.initialView?.lon??N.lon??0),lat:Number(N.view?.lat??N.initialView?.lat??N.lat??0),fov:Number(N.view?.fov??N.initialView?.fov??N.fov??75)},hotspots:(N.hotspots||[]).map((J,D)=>({id:String(J.id||`hotspot-${j+1}-${D+1}`),label:J.label||J.title||`Hotspot ${D+1}`,type:["nav","point"].includes(J.type)?J.type:J.type==="navigate"?"nav":"point",target_scene_id:String(J.target_scene_id||J.target||J.scene_id||""),lon:Number(J.lon??0),lat:Number(J.lat??0),x:Number(J.x??50),y:Number(J.y??50)}))}}function O(N){const j=N?.TOUR_DATA||N?.tour_data||N?.data||N||{},J=j.scenes||j.SCENES||[];return Array.isArray(J)?J.map(R):[]}function M(N){c.value=N.version||N,u.value=O(N.data||N),f.value=u.value[0]?.id||""}function I(N,j){const J=new Map;return N.forEach(D=>{const L=j(D);L&&!J.has(L)&&J.set(L,D)}),Array.from(J.values())}async function ce(){const N=await Nr();i.value=T(N.data);const j=Number(e.query.project||0);j&&i.value.some(J=>J.id===j)&&(o.value=j),!o.value&&i.value.length&&(o.value=i.value[0].id)}async function he(){if(!o.value)return;const N=await Lr(o.value);r.value=T(N.data);const j=Number(e.query.location||0);j&&r.value.some(J=>J.id===j)&&(a.value=j),!a.value&&r.value.length&&(a.value=r.value[0].id)}async function Y(){if(!a.value)return;const N=await po(a.value);s.value=T(N.data);const j=Number(e.query.version||0);if(j&&s.value.some(D=>D.id===j)){l.value=j;return}const J=s.value.find(D=>D.status==="published");l.value=J?.id||s.value[0]?.id||""}async function ne(){if(!(!a.value||!l.value)){_.value="";try{const N=await yu(a.value,l.value);M(N.data)}catch(N){_.value=N.response?.data?.detail||"Could not load version."}}}async function G(N){if(!N)return!1;const j=await Tg(N);return M(j.data),!0}async function oe(){const N=await Bm(),j=T(N.data),J=Number(e.query.project||0),D=Number(e.query.location||0),L=Number(e.query.version||0),V=String(e.query.token||e.query.public_token||""),ee=V?j.find(z=>z.public_token===V):j.find(z=>(!J||Number(z.project_id)===J)&&(!D||Number(z.location_id)===D)&&(!L||Number(z.version_id)===L));if(!ee)throw new Error("No published tour matches this URL.");i.value=I(j.map(z=>({id:z.project_id,name:z.project_name})),z=>z.id),o.value=ee.project_id,r.value=I(j.filter(z=>Number(z.project_id)===Number(o.value)).map(z=>({id:z.location_id,name:z.location_name})),z=>z.id),a.value=ee.location_id,s.value=j.filter(z=>Number(z.location_id)===Number(a.value)).map(z=>({id:z.version_id,version_number:z.version_number,label:z.version_label,status:"published",public_token:z.public_token})),l.value=ee.version_id,await G(ee.public_token)}async function _e(){a.value="",l.value="",r.value=[],s.value=[],u.value=[],await he(),await Y(),await ne()}async function Ee(){l.value="",s.value=[],u.value=[],await Y(),await ne()}function be(N){f.value=N,d.value=!1,S.value=null}function Ce(){if(!u.value.length)return;const N=(y.value+1)%u.value.length;be(u.value[N].id)}function Re(){if(!u.value.length)return;const N=(y.value-1+u.value.length)%u.value.length;be(u.value[N].id)}function we(){if(u.value.length<=1)return"";const N=y.value>=0?y.value:0;return u.value[(N+1)%u.value.length]?.id||""}function xe(N){S.value=null;const j=N.target_scene_id;if(j&&u.value.some(D=>D.id===j)){be(j);return}if(!["nav","point"].includes(N.type))return;const J=we();J&&be(J)}function k(N){m.lon=N.lon,m.lat=N.lat,m.fov=N.fov}async function F(){if(_.value="",e.query.token||e.query.public_token||e.query.project||e.query.location||e.query.version)try{if(await oe(),_.value="",u.value.length)return}catch(N){_.value=N.response?.data?.detail||N.message||"Could not load published tour data."}try{if(await ce(),await he(),await Y(),await ne(),u.value.length)return}catch(N){_.value=N.response?.data?.detail||"Could not load private tour data."}try{await oe(),_.value=""}catch(N){_.value=N.response?.data?.detail||N.message||"Could not load published tour data."}}function H(){if(window.history.length>1){n.back();return}n.push("/")}return Qn(F),(N,j)=>(ue(),de("section",qP,[g("div",YP,[g("button",{class:"viewer-icon-button",type:"button",onClick:H},"←"),g("button",{class:"viewer-icon-button",type:"button",onClick:j[0]||(j[0]=J=>d.value=!0)},"☰"),j[12]||(j[12]=g("div",{class:"viewer-brand"},"VR360 TOUR VIEWER",-1)),g("div",KP,[Qe(g("select",{"onUpdate:modelValue":j[1]||(j[1]=J=>o.value=J),onChange:_e},[j[9]||(j[9]=g("option",{value:""},"Project",-1)),(ue(!0),de(nt,null,ht(i.value,J=>(ue(),de("option",{key:J.id,value:J.id},le(J.name),9,jP))),128))],544),[[jt,o.value]]),Qe(g("select",{"onUpdate:modelValue":j[2]||(j[2]=J=>a.value=J),onChange:Ee},[j[10]||(j[10]=g("option",{value:""},"Location",-1)),(ue(!0),de(nt,null,ht(r.value,J=>(ue(),de("option",{key:J.id,value:J.id},le(J.name),9,ZP))),128))],544),[[jt,a.value]]),Qe(g("select",{"onUpdate:modelValue":j[3]||(j[3]=J=>l.value=J),onChange:ne},[j[11]||(j[11]=g("option",{value:""},"Version",-1)),(ue(!0),de(nt,null,ht(s.value,J=>(ue(),de("option",{key:J.id,value:J.id},"v"+le(J.version_number)+" - "+le(J.status),9,JP))),128))],544),[[jt,l.value]])])]),g("div",QP,le(p.value?.name||"Chua co scene"),1),_.value?(ue(),de("p",eD,le(_.value),1)):mt("",!0),fn(yg,{class:"tour-panorama","image-url":b.value,hotspots:w.value,"initial-view":E.value,"hotspot-display-mode":"viewer",onHotspotClick:xe,onViewChange:k},null,8,["image-url","hotspots","initial-view"]),S.value?(ue(),de("div",tD,[g("button",{class:"viewer-point-close",type:"button",onClick:j[4]||(j[4]=J=>S.value=null)},"×"),S.value.preview_image?(ue(),de("span",{key:0,class:"viewer-point-card-image",style:yn({backgroundImage:`url(${S.value.preview_image})`})},null,4)):mt("",!0),g("div",null,[j[13]||(j[13]=g("small",null,"POINT",-1)),g("strong",null,le(S.value.label||"Hotspot"),1),g("p",null,le(p.value?.description||"Point info trong tour 360."),1)])])):mt("",!0),g("aside",{class:cn(["viewer-sidebar",{open:d.value}])},[g("div",nD,[g("strong",null,le(c.value?.label||"Tour scenes"),1),g("button",{type:"button",onClick:j[5]||(j[5]=J=>d.value=!1)},"×")]),g("div",iD,[(ue(!0),de(nt,null,ht(u.value,J=>(ue(),de("div",{key:J.id,class:cn(["viewer-nav-item",{active:J.id===f.value}]),onClick:D=>be(J.id)},[g("span",{class:"viewer-nav-thumb",style:yn(x(J)?{backgroundImage:`url(${x(J)})`}:{})},null,4),g("span",null,[g("strong",null,le(J.name),1),g("small",null,le(J.group),1)])],10,rD))),128))])],2),g("div",sD,[g("button",{type:"button",title:"Scenes",onClick:j[6]||(j[6]=J=>d.value=!0)},"☰"),g("button",{type:"button",title:"Thumbnails",onClick:j[7]||(j[7]=J=>h.value=!h.value)},"▦"),g("button",{type:"button",title:"Fullscreen",onClick:j[8]||(j[8]=J=>N.document.documentElement.requestFullscreen?.())},"⛶")]),g("div",oD,[g("button",{type:"button",onClick:Re},"‹"),g("button",{type:"button",onClick:Ce},"›"),g("span",null,"LON "+le(m.lon)+"°",1),g("span",null,"LAT "+le(m.lat)+"°",1),g("span",null,"FOV "+le(m.fov)+"°",1)]),g("div",{class:cn(["viewer-thumbs",{show:h.value&&u.value.length}])},[(ue(!0),de(nt,null,ht(u.value,J=>(ue(),de("button",{key:J.id,class:cn(["viewer-thumb-item",{active:J.id===f.value}]),type:"button",onClick:D=>be(J.id)},[g("span",{style:yn(x(J)?{backgroundImage:`url(${x(J)})`}:{})},null,4),g("small",null,le(J.name),1)],10,aD))),128))],2)]))}},cD={class:"page"},uD={key:0,class:"error-message"},fD={class:"panel selector-grid"},dD=["value"],hD=["value"],pD={class:"panel"},mD={class:"actions-row"},gD={class:"primary-button",type:"submit"},_D={class:"two-column"},vD={class:"panel"},xD={class:"table-wrap"},bD={class:"actions-cell"},yD=["onClick"],SD=["onClick"],MD=["onClick"],ED=["onClick"],TD={key:0},AD={class:"panel"},wD={class:"json-preview"},RD={__name:"VersionsView",setup(t){const e=Pe([]),n=Pe([]),i=Pe([]),r=Pe(null),s=Pe(""),o=Pe(""),a=Pe(""),l=un({id:null,label:"",changelog:"",dataText:`{
  "scenes": [
    {"id": "scene-1", "name": "Scene 1", "hotspots": []}
  ]
}`});function c(w){return Array.isArray(w)?w:Array.isArray(w?.results)?w.results:Array.isArray(w?.data)?w.data:Array.isArray(w?.items)?w.items:[]}async function u(){const w=await Nr();e.value=c(w.data),!s.value&&e.value.length&&(s.value=e.value[0].id)}async function f(){if(!s.value)return;const w=await Lr(s.value);n.value=c(w.data),!o.value&&n.value.length&&(o.value=n.value[0].id)}async function d(){if(!o.value)return;const w=await po(o.value);i.value=c(w.data)}function h(w){l.id=w.id,l.label=w.label||"",l.changelog=w.changelog||"",l.dataText=JSON.stringify(w.data||{scenes:[]},null,2)}function _(){l.id=null,l.label="",l.changelog="",l.dataText=`{
  "scenes": [
    {"id": "scene-1", "name": "Scene 1", "hotspots": []}
  ]
}`}async function S(){a.value="";try{const w={label:l.label,changelog:l.changelog,data:JSON.parse(l.dataText)};l.id?await Su(o.value,l.id,w):await bu(o.value,w),_(),await d()}catch(w){a.value=w.response?.data?.detail||w.message||"Could not save version."}}async function m(w){const T=await B1(o.value,w.id);r.value=T.data}async function p(w){const T=await k1(o.value,w.id);await navigator.clipboard.writeText(JSON.stringify(T.data,null,2)),window.alert("Da copy JSON export vao clipboard.")}async function y(w){window.confirm(`Delete version v${w.version_number}?`)&&(await F1(o.value,w.id),await d())}async function E(){o.value="",await f(),await d()}async function b(){await u(),await f(),await d()}return Qn(b),(w,T)=>(ue(),de("section",cD,[g("header",{class:"page-header"},[T[5]||(T[5]=g("div",null,[g("p",{class:"eyebrow"},"Tour editor data"),g("h1",null,"Version tour")],-1)),g("button",{class:"secondary-button",type:"button",onClick:d},"Refresh")]),a.value?(ue(),de("p",uD,le(a.value),1)):mt("",!0),g("section",fD,[g("label",null,[T[6]||(T[6]=dt(" Project ",-1)),Qe(g("select",{"onUpdate:modelValue":T[0]||(T[0]=C=>s.value=C),onChange:E},[(ue(!0),de(nt,null,ht(e.value,C=>(ue(),de("option",{key:C.id,value:C.id},le(C.name),9,dD))),128))],544),[[jt,s.value]])]),g("label",null,[T[7]||(T[7]=dt(" Location ",-1)),Qe(g("select",{"onUpdate:modelValue":T[1]||(T[1]=C=>o.value=C),onChange:d},[(ue(!0),de(nt,null,ht(n.value,C=>(ue(),de("option",{key:C.id,value:C.id},le(C.name),9,hD))),128))],544),[[jt,o.value]])])]),g("section",pD,[g("h2",null,le(l.id?"Edit draft version":"Create draft version"),1),g("form",{class:"form",onSubmit:Mn(S,["prevent"])},[Qe(g("input",{"onUpdate:modelValue":T[2]||(T[2]=C=>l.label=C),placeholder:"Label"},null,512),[[gt,l.label]]),Qe(g("input",{"onUpdate:modelValue":T[3]||(T[3]=C=>l.changelog=C),placeholder:"Changelog"},null,512),[[gt,l.changelog]]),Qe(g("textarea",{"onUpdate:modelValue":T[4]||(T[4]=C=>l.dataText=C),rows:"10",spellcheck:"false"},null,512),[[gt,l.dataText]]),g("div",mD,[g("button",gD,le(l.id?"Save version":"Create version"),1),g("button",{class:"secondary-button",type:"button",onClick:_},"Lam moi")])],32)]),g("section",_D,[g("div",vD,[T[10]||(T[10]=g("h2",null,"Version list",-1)),g("div",xD,[g("table",null,[T[9]||(T[9]=g("thead",null,[g("tr",null,[g("th",null,"Version"),g("th",null,"Label"),g("th",null,"Status"),g("th")])],-1)),g("tbody",null,[(ue(!0),de(nt,null,ht(i.value,C=>(ue(),de("tr",{key:C.id},[g("td",null,"v"+le(C.version_number),1),g("td",null,le(C.label),1),g("td",null,le(C.status),1),g("td",bD,[g("button",{class:"secondary-button",type:"button",onClick:x=>m(C)},"Preview",8,yD),g("button",{class:"secondary-button",type:"button",onClick:x=>p(C)},"Export",8,SD),g("button",{class:"secondary-button",type:"button",onClick:x=>h(C)},"Edit",8,MD),g("button",{class:"danger-button",type:"button",onClick:x=>y(C)},"Delete",8,ED)])]))),128)),i.value.length?mt("",!0):(ue(),de("tr",TD,[...T[8]||(T[8]=[g("td",{colspan:"4"},"Chua co version.",-1)])]))])])])]),g("div",AD,[T[11]||(T[11]=g("h2",null,"Preview data",-1)),g("pre",wD,le(r.value||"Choose Preview to view resolved tile data."),1)])])]))}},CD=[{path:"/login",name:"Login",component:Ky,meta:{public:!0}},{path:"/",name:"Home",component:Xy,meta:{public:!0}},{path:"/dashboard",name:"Dashboard",component:Dy,meta:{staffOnly:!0}},{path:"/projects",name:"Projects",component:IC,meta:{staffOnly:!0}},{path:"/locations",name:"Locations",component:pC,meta:{staffOnly:!0}},{path:"/versions",name:"Versions",component:RD,meta:{staffOnly:!0}},{path:"/builder",name:"Builder",component:JR,meta:{immersive:!0,staffOnly:!0}},{path:"/viewer",name:"TourViewer",component:lD,meta:{immersive:!0,public:!0}},{path:"/publishing",name:"Publishing",component:rP,meta:{staffOnly:!0}},{path:"/stats",name:"Stats",component:$P,meta:{staffOnly:!0}},{path:"/public-viewer",name:"PublicViewer",component:TC,meta:{public:!0}}],Ag=cx({history:G0(),routes:CD});Ag.beforeEach(t=>{const e=tl();return!t.meta.public&&!e.isAuthenticated?"/login":t.path==="/login"&&e.isAuthenticated||t.meta.staffOnly&&e.isGuest?"/":!0});jv(cy).use(Qv()).use(Ag).mount("#app");
