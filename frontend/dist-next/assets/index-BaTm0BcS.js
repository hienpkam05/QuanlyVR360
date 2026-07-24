(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Bc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Dt={},us=[],ci=()=>{},Kh=()=>!1,Ka=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),ja=t=>t.startsWith("onUpdate:"),sn=Object.assign,kc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},zg=Object.prototype.hasOwnProperty,Tt=(t,e)=>zg.call(t,e),at=Array.isArray,cs=t=>Eo(t)==="[object Map]",As=t=>Eo(t)==="[object Set]",Df=t=>Eo(t)==="[object Date]",ht=t=>typeof t=="function",Ht=t=>typeof t=="string",Bn=t=>typeof t=="symbol",Ct=t=>t!==null&&typeof t=="object",jh=t=>(Ct(t)||ht(t))&&ht(t.then)&&ht(t.catch),Zh=Object.prototype.toString,Eo=t=>Zh.call(t),Gg=t=>Eo(t).slice(8,-1),Jh=t=>Eo(t)==="[object Object]",Za=t=>Ht(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,to=Bc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ja=t=>{const e=Object.create(null);return(n=>e[n]||(e[n]=t(n)))},Wg=/-\w/g,Wn=Ja(t=>t.replace(Wg,e=>e.slice(1).toUpperCase())),$g=/\B([A-Z])/g,lr=Ja(t=>t.replace($g,"-$1").toLowerCase()),Qh=Ja(t=>t.charAt(0).toUpperCase()+t.slice(1)),wl=Ja(t=>t?`on${Qh(t)}`:""),ai=(t,e)=>!Object.is(t,e),ha=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},ep=(t,e,n,i=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:i,value:n})},Qa=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let If;const el=()=>If||(If=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Bt(t){if(at(t)){const e={};for(let n=0;n<t.length;n++){const i=t[n],r=Ht(i)?Kg(i):Bt(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Ht(t)||Ct(t))return t}const Xg=/;(?![^(]*\))/g,qg=/:([^]+)/,Yg=/\/\*[^]*?\*\//g;function Kg(t){const e={};return t.replace(Yg,"").split(Xg).forEach(n=>{if(n){const i=n.split(qg);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function $t(t){let e="";if(Ht(t))e=t;else if(at(t))for(let n=0;n<t.length;n++){const i=$t(t[n]);i&&(e+=i+" ")}else if(Ct(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const jg="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Zg=Bc(jg);function tp(t){return!!t||t===""}function Jg(t,e){if(t.length!==e.length)return!1;let n=!0;for(let i=0;n&&i<t.length;i++)n=Rs(t[i],e[i]);return n}function Rs(t,e){if(t===e)return!0;let n=Df(t),i=Df(e);if(n||i)return n&&i?t.getTime()===e.getTime():!1;if(n=Bn(t),i=Bn(e),n||i)return t===e;if(n=at(t),i=at(e),n||i)return n&&i?Jg(t,e):!1;if(n=Ct(t),i=Ct(e),n||i){if(!n||!i)return!1;const r=Object.keys(t).length,s=Object.keys(e).length;if(r!==s)return!1;for(const o in t){const a=t.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!Rs(t[o],e[o]))return!1}}return String(t)===String(e)}function Vc(t,e){return t.findIndex(n=>Rs(n,e))}const np=t=>!!(t&&t.__v_isRef===!0),oe=t=>Ht(t)?t:t==null?"":at(t)||Ct(t)&&(t.toString===Zh||!ht(t.toString))?np(t)?oe(t.value):JSON.stringify(t,ip,2):String(t),ip=(t,e)=>np(e)?ip(t,e.value):cs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[i,r],s)=>(n[Tl(i,s)+" =>"]=r,n),{})}:As(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Tl(n))}:Bn(e)?Tl(e):Ct(e)&&!at(e)&&!Jh(e)?String(e):e,Tl=(t,e="")=>{var n;return Bn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};let jt;class rp{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&jt&&(jt.active?(this.parent=jt,this.index=(jt.scopes||(jt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes){const i=this.scopes.slice();for(e=0,n=i.length;e<n;e++)i[e].pause()}for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes){const r=this.scopes.slice();for(e=0,n=r.length;e<n;e++)r[e].resume()}const i=this.effects.slice();for(e=0,n=i.length;e<n;e++)i[e].resume()}}run(e){if(this._active){const n=jt;try{return jt=this,e()}finally{jt=n}}}on(){++this._on===1&&(this.prevScope=jt,jt=this)}off(){if(this._on>0&&--this._on===0){if(jt===this)jt=this.prevScope;else{let e=jt;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const r=this.scopes.slice();for(n=0,i=r.length;n<i;n++)r[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function sp(t){return new rp(t)}function op(){return jt}function Qg(t,e=!1){jt&&jt.cleanups.push(t)}let Ut;const Al=new WeakSet;class ap{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,jt&&(jt.active?jt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Al.has(this)&&(Al.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||up(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Nf(this),cp(this);const e=Ut,n=$n;Ut=this,$n=!0;try{return this.fn()}finally{fp(this),Ut=e,$n=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Gc(e);this.deps=this.depsTail=void 0,Nf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Al.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Eu(this)&&this.run()}get dirty(){return Eu(this)}}let lp=0,no,io;function up(t,e=!1){if(t.flags|=8,e){t.next=io,io=t;return}t.next=no,no=t}function Hc(){lp++}function zc(){if(--lp>0)return;if(io){let e=io;for(io=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;no;){let e=no;for(no=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=n}}if(t)throw t}function cp(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function fp(t){let e,n=t.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),Gc(i),e_(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}t.deps=e,t.depsTail=n}function Eu(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(dp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function dp(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===fo)||(t.globalVersion=fo,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Eu(t))))return;t.flags|=2;const e=t.dep,n=Ut,i=$n;Ut=t,$n=!0;try{cp(t);const r=t.fn(t._value);(e.version===0||ai(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{Ut=n,$n=i,fp(t),t.flags&=-3}}function Gc(t,e=!1){const{dep:n,prevSub:i,nextSub:r}=t;if(i&&(i.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=i,t.nextSub=void 0),n.subs===t&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Gc(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function e_(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let $n=!0;const hp=[];function Ui(){hp.push($n),$n=!1}function Oi(){const t=hp.pop();$n=t===void 0?!0:t}function Nf(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Ut;Ut=void 0;try{e()}finally{Ut=n}}}let fo=0;class t_{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Wc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ut||!$n||Ut===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ut)n=this.activeLink=new t_(Ut,this),Ut.deps?(n.prevDep=Ut.depsTail,Ut.depsTail.nextDep=n,Ut.depsTail=n):Ut.deps=Ut.depsTail=n,pp(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=Ut.depsTail,n.nextDep=void 0,Ut.depsTail.nextDep=n,Ut.depsTail=n,Ut.deps===n&&(Ut.deps=i)}return n}trigger(e){this.version++,fo++,this.notify(e)}notify(e){Hc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{zc()}}}function pp(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)pp(i)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const wa=new WeakMap,Er=Symbol(""),wu=Symbol(""),ho=Symbol("");function un(t,e,n){if($n&&Ut){let i=wa.get(t);i||wa.set(t,i=new Map);let r=i.get(n);r||(i.set(n,r=new Wc),r.map=i,r.key=n),r.track()}}function Ai(t,e,n,i,r,s){const o=wa.get(t);if(!o){fo++;return}const a=l=>{l&&l.trigger()};if(Hc(),e==="clear")o.forEach(a);else{const l=at(t),u=l&&Za(n);if(l&&n==="length"){const c=Number(i);o.forEach((f,d)=>{(d==="length"||d===ho||!Bn(d)&&d>=c)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),u&&a(o.get(ho)),e){case"add":l?u&&a(o.get("length")):(a(o.get(Er)),cs(t)&&a(o.get(wu)));break;case"delete":l||(a(o.get(Er)),cs(t)&&a(o.get(wu)));break;case"set":cs(t)&&a(o.get(Er));break}}zc()}function n_(t,e){const n=wa.get(t);return n&&n.get(e)}function Hr(t){const e=Mt(t);return e===t?e:(un(e,"iterate",ho),An(t)?e:e.map(Xn))}function tl(t){return un(t=Mt(t),"iterate",ho),t}function ri(t,e){return Fi(t)?ms(Li(t)?Xn(e):e):Xn(e)}const i_={__proto__:null,[Symbol.iterator](){return Rl(this,Symbol.iterator,t=>ri(this,t))},concat(...t){return Hr(this).concat(...t.map(e=>at(e)?Hr(e):e))},entries(){return Rl(this,"entries",t=>(t[1]=ri(this,t[1]),t))},every(t,e){return vi(this,"every",t,e,void 0,arguments)},filter(t,e){return vi(this,"filter",t,e,n=>n.map(i=>ri(this,i)),arguments)},find(t,e){return vi(this,"find",t,e,n=>ri(this,n),arguments)},findIndex(t,e){return vi(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return vi(this,"findLast",t,e,n=>ri(this,n),arguments)},findLastIndex(t,e){return vi(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return vi(this,"forEach",t,e,void 0,arguments)},includes(...t){return Cl(this,"includes",t)},indexOf(...t){return Cl(this,"indexOf",t)},join(t){return Hr(this).join(t)},lastIndexOf(...t){return Cl(this,"lastIndexOf",t)},map(t,e){return vi(this,"map",t,e,void 0,arguments)},pop(){return Hs(this,"pop")},push(...t){return Hs(this,"push",t)},reduce(t,...e){return Uf(this,"reduce",t,e)},reduceRight(t,...e){return Uf(this,"reduceRight",t,e)},shift(){return Hs(this,"shift")},some(t,e){return vi(this,"some",t,e,void 0,arguments)},splice(...t){return Hs(this,"splice",t)},toReversed(){return Hr(this).toReversed()},toSorted(t){return Hr(this).toSorted(t)},toSpliced(...t){return Hr(this).toSpliced(...t)},unshift(...t){return Hs(this,"unshift",t)},values(){return Rl(this,"values",t=>ri(this,t))}};function Rl(t,e,n){const i=tl(t),r=i[e]();return i!==t&&!An(t)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=n(s.value)),s}),r}const r_=Array.prototype;function vi(t,e,n,i,r,s){const o=tl(t),a=o!==t&&!An(t),l=o[e];if(l!==r_[e]){const f=l.apply(t,s);return a?Xn(f):f}let u=n;o!==t&&(a?u=function(f,d){return n.call(this,ri(t,f),d,t)}:n.length>2&&(u=function(f,d){return n.call(this,f,d,t)}));const c=l.call(o,u,i);return a&&r?r(c):c}function Uf(t,e,n,i){const r=tl(t),s=r!==t&&!An(t);let o=n,a=!1;r!==t&&(s?(a=i.length===0,o=function(u,c,f){return a&&(a=!1,u=ri(t,u)),n.call(this,u,ri(t,c),f,t)}):n.length>3&&(o=function(u,c,f){return n.call(this,u,c,f,t)}));const l=r[e](o,...i);return a?ri(t,l):l}function Cl(t,e,n){const i=Mt(t);un(i,"iterate",ho);const r=i[e](...n);return(r===-1||r===!1)&&nl(n[0])?(n[0]=Mt(n[0]),i[e](...n)):r}function Hs(t,e,n=[]){Ui(),Hc();const i=Mt(t)[e].apply(t,n);return zc(),Oi(),i}const s_=Bc("__proto__,__v_isRef,__isVue"),mp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Bn));function o_(t){Bn(t)||(t=String(t));const e=Mt(this);return un(e,"has",t),e.hasOwnProperty(t)}class gp{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,i){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return i===(r?s?g_:bp:s?xp:vp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=at(e);if(!r){let l;if(o&&(l=i_[n]))return l;if(n==="hasOwnProperty")return o_}const a=Reflect.get(e,n,zt(e)?e:i);if((Bn(n)?mp.has(n):s_(n))||(r||un(e,"get",n),s))return a;if(zt(a)){const l=o&&Za(n)?a:a.value;return r&&Ct(l)?Au(l):l}return Ct(a)?r?Au(a):Zt(a):a}}class _p extends gp{constructor(e=!1){super(!1,e)}set(e,n,i,r){let s=e[n];const o=at(e)&&Za(n);if(!this._isShallow){const u=Fi(s);if(!An(i)&&!Fi(i)&&(s=Mt(s),i=Mt(i)),!o&&zt(s)&&!zt(i))return u||(s.value=i),!0}const a=o?Number(n)<e.length:Tt(e,n),l=Reflect.set(e,n,i,zt(e)?e:r);return e===Mt(r)&&l&&(a?ai(i,s)&&Ai(e,"set",n,i):Ai(e,"add",n,i)),l}deleteProperty(e,n){const i=Tt(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&i&&Ai(e,"delete",n,void 0),r}has(e,n){const i=Reflect.has(e,n);return(!Bn(n)||!mp.has(n))&&un(e,"has",n),i}ownKeys(e){return un(e,"iterate",at(e)?"length":Er),Reflect.ownKeys(e)}}class a_ extends gp{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const l_=new _p,u_=new a_,c_=new _p(!0);const Tu=t=>t,ko=t=>Reflect.getPrototypeOf(t);function f_(t,e,n){return function(...i){const r=this.__v_raw,s=Mt(r),o=cs(s),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,u=r[t](...i),c=n?Tu:e?ms:Xn;return!e&&un(s,"iterate",l?wu:Er),sn(Object.create(u),{next(){const{value:f,done:d}=u.next();return d?{value:f,done:d}:{value:a?[c(f[0]),c(f[1])]:c(f),done:d}}})}}function Vo(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function d_(t,e){const n={get(r){const s=this.__v_raw,o=Mt(s),a=Mt(r);t||(ai(r,a)&&un(o,"get",r),un(o,"get",a));const{has:l}=ko(o),u=e?Tu:t?ms:Xn;if(l.call(o,r))return u(s.get(r));if(l.call(o,a))return u(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!t&&un(Mt(r),"iterate",Er),r.size},has(r){const s=this.__v_raw,o=Mt(s),a=Mt(r);return t||(ai(r,a)&&un(o,"has",r),un(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=Mt(a),u=e?Tu:t?ms:Xn;return!t&&un(l,"iterate",Er),a.forEach((c,f)=>r.call(s,u(c),u(f),o))}};return sn(n,t?{add:Vo("add"),set:Vo("set"),delete:Vo("delete"),clear:Vo("clear")}:{add(r){const s=Mt(this),o=ko(s),a=Mt(r),l=!e&&!An(r)&&!Fi(r)?a:r;return o.has.call(s,l)||ai(r,l)&&o.has.call(s,r)||ai(a,l)&&o.has.call(s,a)||(s.add(l),Ai(s,"add",l,l)),this},set(r,s){!e&&!An(s)&&!Fi(s)&&(s=Mt(s));const o=Mt(this),{has:a,get:l}=ko(o);let u=a.call(o,r);u||(r=Mt(r),u=a.call(o,r));const c=l.call(o,r);return o.set(r,s),u?ai(s,c)&&Ai(o,"set",r,s):Ai(o,"add",r,s),this},delete(r){const s=Mt(this),{has:o,get:a}=ko(s);let l=o.call(s,r);l||(r=Mt(r),l=o.call(s,r)),a&&a.call(s,r);const u=s.delete(r);return l&&Ai(s,"delete",r,void 0),u},clear(){const r=Mt(this),s=r.size!==0,o=r.clear();return s&&Ai(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=f_(r,t,e)}),n}function $c(t,e){const n=d_(t,e);return(i,r,s)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?i:Reflect.get(Tt(n,r)&&r in i?n:i,r,s)}const h_={get:$c(!1,!1)},p_={get:$c(!1,!0)},m_={get:$c(!0,!1)};const vp=new WeakMap,xp=new WeakMap,bp=new WeakMap,g_=new WeakMap;function __(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Zt(t){return Fi(t)?t:Xc(t,!1,l_,h_,vp)}function yp(t){return Xc(t,!1,c_,p_,xp)}function Au(t){return Xc(t,!0,u_,m_,bp)}function Xc(t,e,n,i,r){if(!Ct(t)||t.__v_raw&&!(e&&t.__v_isReactive)||t.__v_skip||!Object.isExtensible(t))return t;const s=r.get(t);if(s)return s;const o=__(Gg(t));if(o===0)return t;const a=new Proxy(t,o===2?i:n);return r.set(t,a),a}function Li(t){return Fi(t)?Li(t.__v_raw):!!(t&&t.__v_isReactive)}function Fi(t){return!!(t&&t.__v_isReadonly)}function An(t){return!!(t&&t.__v_isShallow)}function nl(t){return t?!!t.__v_raw:!1}function Mt(t){const e=t&&t.__v_raw;return e?Mt(e):t}function qc(t){return!Tt(t,"__v_skip")&&Object.isExtensible(t)&&ep(t,"__v_skip",!0),t}const Xn=t=>Ct(t)?Zt(t):t,ms=t=>Ct(t)?Au(t):t;function zt(t){return t?t.__v_isRef===!0:!1}function Me(t){return Sp(t,!1)}function v_(t){return Sp(t,!0)}function Sp(t,e){return zt(t)?t:new x_(t,e)}class x_{constructor(e,n){this.dep=new Wc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Mt(e),this._value=n?e:Xn(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,i=this.__v_isShallow||An(e)||Fi(e);e=i?e:Mt(e),ai(e,n)&&(this._rawValue=e,this._value=i?e:Xn(e),this.dep.trigger())}}function cn(t){return zt(t)?t.value:t}const b_={get:(t,e,n)=>e==="__v_raw"?t:cn(Reflect.get(t,e,n)),set:(t,e,n,i)=>{const r=t[e];return zt(r)&&!zt(n)?(r.value=n,!0):Reflect.set(t,e,n,i)}};function Mp(t){return Li(t)?t:new Proxy(t,b_)}function y_(t){const e=at(t)?new Array(t.length):{};for(const n in t)e[n]=M_(t,n);return e}class S_{constructor(e,n,i){this._object=e,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0,this._key=Bn(n)?n:String(n),this._raw=Mt(e);let r=!0,s=e;if(!at(e)||Bn(this._key)||!Za(this._key))do r=!nl(s)||An(s);while(r&&(s=s.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=cn(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&zt(this._raw[this._key])){const n=this._object[this._key];if(zt(n)){n.value=e;return}}this._object[this._key]=e}get dep(){return n_(this._raw,this._key)}}function M_(t,e,n){return new S_(t,e,n)}class E_{constructor(e,n,i){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Wc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=fo-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Ut!==this)return up(this,!0),!0}get value(){const e=this.dep.track();return dp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function w_(t,e,n=!1){let i,r;return ht(t)?i=t:(i=t.get,r=t.set),new E_(i,r,n)}const Ho={},Ta=new WeakMap;let gr;function T_(t,e=!1,n=gr){if(n){let i=Ta.get(n);i||Ta.set(n,i=[]),i.push(t)}}function A_(t,e,n=Dt){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=n,u=b=>r?b:An(b)||r===!1||r===0?Ri(b,1):Ri(b);let c,f,d,p,_=!1,y=!1;if(zt(t)?(f=()=>t.value,_=An(t)):Li(t)?(f=()=>u(t),_=!0):at(t)?(y=!0,_=t.some(b=>Li(b)||An(b)),f=()=>t.map(b=>{if(zt(b))return b.value;if(Li(b))return u(b);if(ht(b))return l?l(b,2):b()})):ht(t)?e?f=l?()=>l(t,2):t:f=()=>{if(d){Ui();try{d()}finally{Oi()}}const b=gr;gr=c;try{return l?l(t,3,[p]):t(p)}finally{gr=b}}:f=ci,e&&r){const b=f,I=r===!0?1/0:r;f=()=>Ri(b(),I)}const g=op(),h=()=>{c.stop(),g&&g.active&&kc(g.effects,c)};if(s&&e){const b=e;e=(...I)=>{const w=b(...I);return h(),w}}let M=y?new Array(t.length).fill(Ho):Ho;const C=b=>{if(!(!(c.flags&1)||!c.dirty&&!b))if(e){const I=c.run();if(b||r||_||(y?I.some((w,B)=>ai(w,M[B])):ai(I,M))){d&&d();const w=gr;gr=c;try{const B=[I,M===Ho?void 0:y&&M[0]===Ho?[]:M,p];M=I,l?l(e,3,B):e(...B)}finally{gr=w}}}else c.run()};return a&&a(C),c=new ap(f),c.scheduler=o?()=>o(C,!1):C,p=b=>T_(b,!1,c),d=c.onStop=()=>{const b=Ta.get(c);if(b){if(l)l(b,4);else for(const I of b)I();Ta.delete(c)}},e?i?C(!0):M=c.run():o?o(C.bind(null,!0),!0):c.run(),h.pause=c.pause.bind(c),h.resume=c.resume.bind(c),h.stop=h,h}function Ri(t,e=1/0,n){if(e<=0||!Ct(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,zt(t))Ri(t.value,e,n);else if(at(t))for(let i=0;i<t.length;i++)Ri(t[i],e,n);else if(As(t)||cs(t))t.forEach(i=>{Ri(i,e,n)});else if(Jh(t)){for(const i in t)Ri(t[i],e,n);for(const i of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,i)&&Ri(t[i],e,n)}return t}function wo(t,e,n,i){try{return i?t(...i):t()}catch(r){il(r,e,n)}}function qn(t,e,n,i){if(ht(t)){const r=wo(t,e,n,i);return r&&jh(r)&&r.catch(s=>{il(s,e,n)}),r}if(at(t)){const r=[];for(let s=0;s<t.length;s++)r.push(qn(t[s],e,n,i));return r}}function il(t,e,n,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Dt;if(e){let a=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const c=a.ec;if(c){for(let f=0;f<c.length;f++)if(c[f](t,l,u)===!1)return}a=a.parent}if(s){Ui(),wo(s,null,10,[t,l,u]),Oi();return}}R_(t,n,r,i,o)}function R_(t,e,n,i=!0,r=!1){if(r)throw t;console.error(t)}const vn=[];let ii=-1;const fs=[];let Qi=null,os=0;const Ep=Promise.resolve();let Aa=null;function Cs(t){const e=Aa||Ep;return t?e.then(this?t.bind(this):t):e}function C_(t){let e=ii+1,n=vn.length;for(;e<n;){const i=e+n>>>1,r=vn[i],s=po(r);s<t||s===t&&r.flags&2?e=i+1:n=i}return e}function Yc(t){if(!(t.flags&1)){const e=po(t),n=vn[vn.length-1];!n||!(t.flags&2)&&e>=po(n)?vn.push(t):vn.splice(C_(e),0,t),t.flags|=1,wp()}}function wp(){Aa||(Aa=Ep.then(Ap))}function P_(t){at(t)?fs.push(...t):Qi&&t.id===-1?Qi.splice(os+1,0,t):t.flags&1||(fs.push(t),t.flags|=1),wp()}function Of(t,e,n=ii+1){for(;n<vn.length;n++){const i=vn[n];if(i&&i.flags&2){if(t&&i.id!==t.uid)continue;vn.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Tp(t){if(fs.length){const e=[...new Set(fs)].sort((n,i)=>po(n)-po(i));if(fs.length=0,Qi){Qi.push(...e);return}for(Qi=e,os=0;os<Qi.length;os++){const n=Qi[os];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Qi=null,os=0}}const po=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Ap(t){try{for(ii=0;ii<vn.length;ii++){const e=vn[ii];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),wo(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ii<vn.length;ii++){const e=vn[ii];e&&(e.flags&=-2)}ii=-1,vn.length=0,Tp(),Aa=null,(vn.length||fs.length)&&Ap()}}let Un=null,Rp=null;function Ra(t){const e=Un;return Un=t,Rp=t&&t.type.__scopeId||null,e}function Ca(t,e=Un,n){if(!e||t._n)return t;const i=(...r)=>{i._d&&Da(-1);const s=Ra(e),o=Tr.length;let a;try{a=t(...r)}finally{for(let l=Tr.length;l>o;l--)Qp();Ra(s),i._d&&Da(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Ke(t,e){if(Un===null)return t;const n=al(Un),i=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[s,o,a,l=Dt]=e[r];s&&(ht(s)&&(s={mounted:s,updated:s}),s.deep&&Ri(o),i.push({dir:s,instance:n,value:o,oldValue:void 0,arg:a,modifiers:l}))}return t}function cr(t,e,n,i){const r=t.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(Ui(),qn(l,n,8,[t.el,a,t,e]),Oi())}}function pa(t,e){if(xn){let n=xn.provides;const i=xn.parent&&xn.parent.provides;i===n&&(n=xn.provides=Object.create(i)),n[t]=e}}function On(t,e,n=!1){const i=nm();if(i||wr){let r=wr?wr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&ht(e)?e.call(i&&i.proxy):e}}function L_(){return!!(nm()||wr)}const D_=Symbol.for("v-scx"),I_=()=>On(D_);function fi(t,e,n){return Cp(t,e,n)}function Cp(t,e,n=Dt){const{immediate:i,deep:r,flush:s,once:o}=n,a=sn({},n),l=e&&i||!e&&s!=="post";let u;if(go){if(s==="sync"){const p=I_();u=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=ci,p.resume=ci,p.pause=ci,p}}const c=xn;a.call=(p,_,y)=>qn(p,c,_,y);let f=!1;s==="post"?a.scheduler=p=>{bn(p,c&&c.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(p,_)=>{_?p():Yc(p)}),a.augmentJob=p=>{e&&(p.flags|=4),f&&(p.flags|=2,c&&(p.id=c.uid,p.i=c))};const d=A_(t,e,a);return go&&(u?u.push(d):l&&d()),d}function N_(t,e,n){const i=this.proxy,r=Ht(t)?t.includes(".")?Pp(i,t):()=>i[t]:t.bind(i,i);let s;ht(e)?s=e:(s=e.handler,n=e);const o=To(this),a=Cp(r,s.bind(i),n);return o(),a}function Pp(t,e){const n=e.split(".");return()=>{let i=t;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}const U_=Symbol("_vte"),O_=t=>t.__isTeleport,Pl=Symbol("_leaveCb");function Kc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Kc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Lp(t,e){return ht(t)?sn({name:t.name},e,{setup:t}):t}function Dp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Ff(t,e){let n;return!!((n=Object.getOwnPropertyDescriptor(t,e))&&!n.configurable)}const Pa=new WeakMap;function ro(t,e,n,i,r=!1){if(at(t)){t.forEach((y,g)=>ro(y,e&&(at(e)?e[g]:e),n,i,r));return}if(so(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&ro(t,e,n,i.component.subTree);return}const s=i.shapeFlag&4?al(i.component):i.el,o=r?null:s,{i:a,r:l}=t,u=e&&e.r,c=a.refs===Dt?a.refs={}:a.refs,f=a.setupState,d=Mt(f),p=f===Dt?Kh:y=>Ff(c,y)?!1:Tt(d,y),_=(y,g)=>!(g&&Ff(c,g));if(u!=null&&u!==l){if(Bf(e),Ht(u))c[u]=null,p(u)&&(f[u]=null);else if(zt(u)){const y=e;_(u,y.k)&&(u.value=null),y.k&&(c[y.k]=null)}}if(ht(l))wo(l,a,12,[o,c]);else{const y=Ht(l),g=zt(l);if(y||g){const h=()=>{if(t.f){const M=y?p(l)?f[l]:c[l]:_()||!t.k?l.value:c[t.k];if(r)at(M)&&kc(M,s);else if(at(M))M.includes(s)||M.push(s);else if(y)c[l]=[s],p(l)&&(f[l]=c[l]);else{const C=[s];_(l,t.k)&&(l.value=C),t.k&&(c[t.k]=C)}}else y?(c[l]=o,p(l)&&(f[l]=o)):g&&(_(l,t.k)&&(l.value=o),t.k&&(c[t.k]=o))};if(o){const M=()=>{h(),Pa.delete(t)};M.id=-1,Pa.set(t,M),bn(M,n)}else Bf(t),h()}}}function Bf(t){const e=Pa.get(t);e&&(e.flags|=8,Pa.delete(t))}el().requestIdleCallback;el().cancelIdleCallback;const so=t=>!!t.type.__asyncLoader,Ip=t=>t.type.__isKeepAlive;function F_(t,e){Np(t,"a",e)}function B_(t,e){Np(t,"da",e)}function Np(t,e,n=xn){const i=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(rl(e,i,n),n){let r=n.parent;for(;r&&r.parent;)Ip(r.parent.vnode)&&k_(i,e,n,r),r=r.parent}}function k_(t,e,n,i){const r=rl(e,t,i,!0);Up(()=>{kc(i[e],r)},n)}function rl(t,e,n=xn,i=!1){if(n){const r=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...o)=>{Ui();const a=To(n),l=qn(e,n,t,o);return a(),Oi(),l});return i?r.unshift(s):r.push(s),s}}const Vi=t=>(e,n=xn)=>{(!go||t==="sp")&&rl(t,(...i)=>e(...i),n)},V_=Vi("bm"),jn=Vi("m"),H_=Vi("bu"),z_=Vi("u"),Ps=Vi("bum"),Up=Vi("um"),G_=Vi("sp"),W_=Vi("rtg"),$_=Vi("rtc");function X_(t,e=xn){rl("ec",t,e)}const q_=Symbol.for("v-ndc");function ct(t,e,n,i){let r;const s=n,o=at(t);if(o||Ht(t)){const a=o&&Li(t);let l=!1,u=!1;a&&(l=!An(t),u=Fi(t),t=tl(t)),r=new Array(t.length);for(let c=0,f=t.length;c<f;c++)r[c]=e(l?u?ms(Xn(t[c])):Xn(t[c]):t[c],c,void 0,s)}else if(typeof t=="number"){r=new Array(t);for(let a=0;a<t;a++)r[a]=e(a+1,a,void 0,s)}else if(Ct(t))if(t[Symbol.iterator])r=Array.from(t,(a,l)=>e(a,l,void 0,s));else{const a=Object.keys(t);r=new Array(a.length);for(let l=0,u=a.length;l<u;l++){const c=a[l];r[l]=e(t[c],c,l,s)}}else r=[];return r}const Ru=t=>t?im(t)?al(t):Ru(t.parent):null,oo=sn(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Ru(t.parent),$root:t=>Ru(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Fp(t),$forceUpdate:t=>t.f||(t.f=()=>{Yc(t.update)}),$nextTick:t=>t.n||(t.n=Cs.bind(t.proxy)),$watch:t=>N_.bind(t)}),Ll=(t,e)=>t!==Dt&&!t.__isScriptSetup&&Tt(t,e),Y_={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=t;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return r[e];case 4:return n[e];case 3:return s[e]}else{if(Ll(i,e))return o[e]=1,i[e];if(r!==Dt&&Tt(r,e))return o[e]=2,r[e];if(Tt(s,e))return o[e]=3,s[e];if(n!==Dt&&Tt(n,e))return o[e]=4,n[e];Cu&&(o[e]=0)}}const u=oo[e];let c,f;if(u)return e==="$attrs"&&un(t.attrs,"get",""),u(t);if((c=a.__cssModules)&&(c=c[e]))return c;if(n!==Dt&&Tt(n,e))return o[e]=4,n[e];if(f=l.config.globalProperties,Tt(f,e))return f[e]},set({_:t},e,n){const{data:i,setupState:r,ctx:s}=t;return Ll(r,e)?(r[e]=n,!0):i!==Dt&&Tt(i,e)?(i[e]=n,!0):Tt(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:i,appContext:r,props:s,type:o}},a){let l;return!!(n[a]||t!==Dt&&a[0]!=="$"&&Tt(t,a)||Ll(e,a)||Tt(s,a)||Tt(i,a)||Tt(oo,a)||Tt(r.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Tt(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function kf(t){return at(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Cu=!0;function K_(t){const e=Fp(t),n=t.proxy,i=t.ctx;Cu=!1,e.beforeCreate&&Vf(e.beforeCreate,t,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:u,created:c,beforeMount:f,mounted:d,beforeUpdate:p,updated:_,activated:y,deactivated:g,beforeDestroy:h,beforeUnmount:M,destroyed:C,unmounted:b,render:I,renderTracked:w,renderTriggered:B,errorCaptured:v,serverPrefetch:S,expose:F,inheritAttrs:D,components:H,directives:ee,filters:X}=e;if(u&&j_(u,i,null),o)for(const L in o){const $=o[L];ht($)&&(i[L]=$.bind(n))}if(r){const L=r.call(n,n);Ct(L)&&(t.data=Zt(L))}if(Cu=!0,s)for(const L in s){const $=s[L],ge=ht($)?$.bind(n,n):ht($.get)?$.get.bind(n,n):ci,Ue=!ht($)&&ht($.set)?$.set.bind(n):ci,Pe=st({get:ge,set:Ue});Object.defineProperty(i,L,{enumerable:!0,configurable:!0,get:()=>Pe.value,set:ke=>Pe.value=ke})}if(a)for(const L in a)Op(a[L],i,n,L);if(l){const L=ht(l)?l.call(n):l;Reflect.ownKeys(L).forEach($=>{pa($,L[$])})}c&&Vf(c,t,"c");function le(L,$){at($)?$.forEach(ge=>L(ge.bind(n))):$&&L($.bind(n))}if(le(V_,f),le(jn,d),le(H_,p),le(z_,_),le(F_,y),le(B_,g),le(X_,v),le($_,w),le(W_,B),le(Ps,M),le(Up,b),le(G_,S),at(F))if(F.length){const L=t.exposed||(t.exposed={});F.forEach($=>{Object.defineProperty(L,$,{get:()=>n[$],set:ge=>n[$]=ge,enumerable:!0})})}else t.exposed||(t.exposed={});I&&t.render===ci&&(t.render=I),D!=null&&(t.inheritAttrs=D),H&&(t.components=H),ee&&(t.directives=ee),S&&Dp(t)}function j_(t,e,n=ci){at(t)&&(t=Pu(t));for(const i in t){const r=t[i];let s;Ct(r)?"default"in r?s=On(r.from||i,r.default,!0):s=On(r.from||i):s=On(r),zt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function Vf(t,e,n){qn(at(t)?t.map(i=>i.bind(e.proxy)):t.bind(e.proxy),e,n)}function Op(t,e,n,i){let r=i.includes(".")?Pp(n,i):()=>n[i];if(Ht(t)){const s=e[t];ht(s)&&fi(r,s)}else if(ht(t))fi(r,t.bind(n));else if(Ct(t))if(at(t))t.forEach(s=>Op(s,e,n,i));else{const s=ht(t.handler)?t.handler.bind(n):e[t.handler];ht(s)&&fi(r,s,t)}}function Fp(t){const e=t.type,{mixins:n,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=t.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!n&&!i?l=e:(l={},r.length&&r.forEach(u=>La(l,u,o,!0)),La(l,e,o)),Ct(e)&&s.set(e,l),l}function La(t,e,n,i=!1){const{mixins:r,extends:s}=e;s&&La(t,s,n,!0),r&&r.forEach(o=>La(t,o,n,!0));for(const o in e)if(!(i&&o==="expose")){const a=Z_[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const Z_={data:Hf,props:zf,emits:zf,methods:Zs,computed:Zs,beforeCreate:pn,created:pn,beforeMount:pn,mounted:pn,beforeUpdate:pn,updated:pn,beforeDestroy:pn,beforeUnmount:pn,destroyed:pn,unmounted:pn,activated:pn,deactivated:pn,errorCaptured:pn,serverPrefetch:pn,components:Zs,directives:Zs,watch:Q_,provide:Hf,inject:J_};function Hf(t,e){return e?t?function(){return sn(ht(t)?t.call(this,this):t,ht(e)?e.call(this,this):e)}:e:t}function J_(t,e){return Zs(Pu(t),Pu(e))}function Pu(t){if(at(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function pn(t,e){return t?[...new Set([].concat(t,e))]:e}function Zs(t,e){return t?sn(Object.create(null),t,e):e}function zf(t,e){return t?at(t)&&at(e)?[...new Set([...t,...e])]:sn(Object.create(null),kf(t),kf(e??{})):e}function Q_(t,e){if(!t)return e;if(!e)return t;const n=sn(Object.create(null),t);for(const i in e)n[i]=pn(t[i],e[i]);return n}function Bp(){return{app:null,config:{isNativeTag:Kh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ev=0;function tv(t,e){return function(i,r=null){ht(i)||(i=sn({},i)),r!=null&&!Ct(r)&&(r=null);const s=Bp(),o=new WeakSet,a=[];let l=!1;const u=s.app={_uid:ev++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:Lv,get config(){return s.config},set config(c){},use(c,...f){return o.has(c)||(c&&ht(c.install)?(o.add(c),c.install(u,...f)):ht(c)&&(o.add(c),c(u,...f))),u},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),u},component(c,f){return f?(s.components[c]=f,u):s.components[c]},directive(c,f){return f?(s.directives[c]=f,u):s.directives[c]},mount(c,f,d){if(!l){const p=u._ceVNode||tn(i,r);return p.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),t(p,c,d),l=!0,u._container=c,c.__vue_app__=u,al(p.component)}},onUnmount(c){a.push(c)},unmount(){l&&(qn(a,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(c,f){return s.provides[c]=f,u},runWithContext(c){const f=wr;wr=u;try{return c()}finally{wr=f}}};return u}}let wr=null;const nv=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Wn(e)}Modifiers`]||t[`${lr(e)}Modifiers`];function iv(t,e,...n){if(t.isUnmounted)return;const i=t.vnode.props||Dt;let r=n;const s=e.startsWith("update:"),o=s&&nv(i,e.slice(7));o&&(o.trim&&(r=n.map(c=>Ht(c)?c.trim():c)),o.number&&(r=n.map(Qa)));let a,l=i[a=wl(e)]||i[a=wl(Wn(e))];!l&&s&&(l=i[a=wl(lr(e))]),l&&qn(l,t,6,r);const u=i[a+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,qn(u,t,6,r)}}const rv=new WeakMap;function kp(t,e,n=!1){const i=n?rv:e.emitsCache,r=i.get(t);if(r!==void 0)return r;const s=t.emits;let o={},a=!1;if(!ht(t)){const l=u=>{const c=kp(u,e,!0);c&&(a=!0,sn(o,c))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!s&&!a?(Ct(t)&&i.set(t,null),null):(at(s)?s.forEach(l=>o[l]=null):sn(o,s),Ct(t)&&i.set(t,o),o)}function sl(t,e){return!t||!Ka(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),Tt(t,e[0].toLowerCase()+e.slice(1))||Tt(t,lr(e))||Tt(t,e))}function Gf(t){const{type:e,vnode:n,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:u,renderCache:c,props:f,data:d,setupState:p,ctx:_,inheritAttrs:y}=t,g=Ra(t);let h,M;try{if(n.shapeFlag&4){const b=r||i,I=b;h=si(u.call(I,b,c,f,p,d,_)),M=a}else{const b=e;h=si(b.length>1?b(f,{attrs:a,slots:o,emit:l}):b(f,null)),M=e.props?a:sv(a)}}catch(b){Tr.length=0,il(b,t,1),h=tn(sr)}let C=h;if(M&&y!==!1){const b=Object.keys(M),{shapeFlag:I}=C;b.length&&I&7&&(s&&b.some(ja)&&(M=ov(M,s)),C=gs(C,M,!1,!0))}return n.dirs&&(C=gs(C,null,!1,!0),C.dirs=C.dirs?C.dirs.concat(n.dirs):n.dirs),n.transition&&Kc(C,n.transition),h=C,Ra(g),h}const sv=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ka(n))&&((e||(e={}))[n]=t[n]);return e},ov=(t,e)=>{const n={};for(const i in t)(!ja(i)||!(i.slice(9)in e))&&(n[i]=t[i]);return n};function av(t,e,n){const{props:i,children:r,component:s}=t,{props:o,children:a,patchFlag:l}=e,u=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return i?Wf(i,o,u):!!o;if(l&8){const c=e.dynamicProps;for(let f=0;f<c.length;f++){const d=c[f];if(Vp(o,i,d)&&!sl(u,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Wf(i,o,u):!0:!!o;return!1}function Wf(t,e,n){const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(Vp(e,t,s)&&!sl(n,s))return!0}return!1}function Vp(t,e,n){const i=t[n],r=e[n];return n==="style"&&Ct(i)&&Ct(r)?!Rs(i,r):i!==r}function lv({vnode:t,parent:e,suspense:n},i){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.suspense.vnode.el=r.el=i,t=r),r===t)(t=e.vnode).el=i,e=e.parent;else break}n&&n.activeBranch===t&&(n.vnode.el=i)}const Hp={},zp=()=>Object.create(Hp),Gp=t=>Object.getPrototypeOf(t)===Hp;function uv(t,e,n,i=!1){const r={},s=zp();t.propsDefaults=Object.create(null),Wp(t,e,r,s);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=i?r:yp(r):t.type.props?t.props=r:t.props=s,t.attrs=s}function cv(t,e,n,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=t,a=Mt(r),[l]=t.propsOptions;let u=!1;if((i||o>0)&&!(o&16)){if(o&8){const c=t.vnode.dynamicProps;for(let f=0;f<c.length;f++){let d=c[f];if(sl(t.emitsOptions,d))continue;const p=e[d];if(l)if(Tt(s,d))p!==s[d]&&(s[d]=p,u=!0);else{const _=Wn(d);r[_]=Lu(l,a,_,p,t,!1)}else p!==s[d]&&(s[d]=p,u=!0)}}}else{Wp(t,e,r,s)&&(u=!0);let c;for(const f in a)(!e||!Tt(e,f)&&((c=lr(f))===f||!Tt(e,c)))&&(l?n&&(n[f]!==void 0||n[c]!==void 0)&&(r[f]=Lu(l,a,f,void 0,t,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!Tt(e,f))&&(delete s[f],u=!0)}u&&Ai(t.attrs,"set","")}function Wp(t,e,n,i){const[r,s]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(to(l))continue;const u=e[l];let c;r&&Tt(r,c=Wn(l))?!s||!s.includes(c)?n[c]=u:(a||(a={}))[c]=u:sl(t.emitsOptions,l)||(!(l in i)||u!==i[l])&&(i[l]=u,o=!0)}if(s){const l=Mt(n),u=a||Dt;for(let c=0;c<s.length;c++){const f=s[c];n[f]=Lu(r,l,f,u[f],t,!Tt(u,f))}}return o}function Lu(t,e,n,i,r,s){const o=t[n];if(o!=null){const a=Tt(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ht(l)){const{propsDefaults:u}=r;if(n in u)i=u[n];else{const c=To(r);i=u[n]=l.call(null,e),c()}}else i=l;r.ce&&r.ce._setProp(n,i)}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===lr(n))&&(i=!0))}return i}const fv=new WeakMap;function $p(t,e,n=!1){const i=n?fv:e.propsCache,r=i.get(t);if(r)return r;const s=t.props,o={},a=[];let l=!1;if(!ht(t)){const c=f=>{l=!0;const[d,p]=$p(f,e,!0);sn(o,d),p&&a.push(...p)};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}if(!s&&!l)return Ct(t)&&i.set(t,us),us;if(at(s))for(let c=0;c<s.length;c++){const f=Wn(s[c]);$f(f)&&(o[f]=Dt)}else if(s)for(const c in s){const f=Wn(c);if($f(f)){const d=s[c],p=o[f]=at(d)||ht(d)?{type:d}:sn({},d),_=p.type;let y=!1,g=!0;if(at(_))for(let h=0;h<_.length;++h){const M=_[h],C=ht(M)&&M.name;if(C==="Boolean"){y=!0;break}else C==="String"&&(g=!1)}else y=ht(_)&&_.name==="Boolean";p[0]=y,p[1]=g,(y||Tt(p,"default"))&&a.push(f)}}const u=[o,a];return Ct(t)&&i.set(t,u),u}function $f(t){return t[0]!=="$"&&!to(t)}const jc=t=>t==="_"||t==="_ctx"||t==="$stable",Zc=t=>at(t)?t.map(si):[si(t)],dv=(t,e,n)=>{if(e._n)return e;const i=Ca((...r)=>Zc(e(...r)),n);return i._c=!1,i},Xp=(t,e,n)=>{const i=t._ctx;for(const r in t){if(jc(r))continue;const s=t[r];if(ht(s))e[r]=dv(r,s,i);else if(s!=null){const o=Zc(s);e[r]=()=>o}}},qp=(t,e)=>{const n=Zc(e);t.slots.default=()=>n},Yp=(t,e,n)=>{for(const i in e)(n||!jc(i))&&(t[i]=e[i])},hv=(t,e,n)=>{const i=t.slots=zp();if(t.vnode.shapeFlag&32){const r=e._;r?(Yp(i,e,n),n&&ep(i,"_",r,!0)):Xp(e,i)}else e&&qp(t,e)},pv=(t,e,n)=>{const{vnode:i,slots:r}=t;let s=!0,o=Dt;if(i.shapeFlag&32){const a=e._;a?n&&a===1?s=!1:Yp(r,e,n):(s=!e.$stable,Xp(e,r)),o=e}else e&&(qp(t,e),o={default:1});if(s)for(const a in r)!jc(a)&&o[a]==null&&delete r[a]},bn=xv;function mv(t){return gv(t)}function gv(t,e){const n=el();n.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:u,setElementText:c,parentNode:f,nextSibling:d,setScopeId:p=ci,insertStaticContent:_}=t,y=(T,R,k,re=null,Q=null,ue=null,Ae=void 0,Ee=null,Re=!!R.dynamicChildren)=>{if(T===R)return;T&&!zs(T,R)&&(re=W(T),ke(T,Q,ue,!0),T=null),R.patchFlag===-2&&(Re=!1,R.dynamicChildren=null);const{type:Y,ref:be,shapeFlag:N}=R;switch(Y){case ol:g(T,R,k,re);break;case sr:h(T,R,k,re);break;case Il:T==null&&M(R,k,re,Ae);break;case tt:H(T,R,k,re,Q,ue,Ae,Ee,Re);break;default:N&1?I(T,R,k,re,Q,ue,Ae,Ee,Re):N&6?ee(T,R,k,re,Q,ue,Ae,Ee,Re):(N&64||N&128)&&Y.process(T,R,k,re,Q,ue,Ae,Ee,Re,Te)}be!=null&&Q?ro(be,T&&T.ref,ue,R||T,!R):be==null&&T&&T.ref!=null&&ro(T.ref,null,ue,T,!0)},g=(T,R,k,re)=>{if(T==null)i(R.el=a(R.children),k,re);else{const Q=R.el=T.el;R.children!==T.children&&u(Q,R.children)}},h=(T,R,k,re)=>{T==null?i(R.el=l(R.children||""),k,re):R.el=T.el},M=(T,R,k,re)=>{[T.el,T.anchor]=_(T.children,R,k,re,T.el,T.anchor)},C=({el:T,anchor:R},k,re)=>{let Q;for(;T&&T!==R;)Q=d(T),i(T,k,re),T=Q;i(R,k,re)},b=({el:T,anchor:R})=>{let k;for(;T&&T!==R;)k=d(T),r(T),T=k;r(R)},I=(T,R,k,re,Q,ue,Ae,Ee,Re)=>{if(R.type==="svg"?Ae="svg":R.type==="math"&&(Ae="mathml"),T==null)w(R,k,re,Q,ue,Ae,Ee,Re);else{const Y=T.el&&T.el._isVueCE?T.el:null;try{Y&&Y._beginPatch(),S(T,R,Q,ue,Ae,Ee,Re)}finally{Y&&Y._endPatch()}}},w=(T,R,k,re,Q,ue,Ae,Ee)=>{let Re,Y;const{props:be,shapeFlag:N,transition:Ie,dirs:we}=T;if(Re=T.el=o(T.type,ue,be&&be.is,be),N&8?c(Re,T.children):N&16&&v(T.children,Re,null,re,Q,Dl(T,ue),Ae,Ee),we&&cr(T,null,re,"created"),B(Re,T,T.scopeId,Ae,re),be){for(const x in be)x!=="value"&&!to(x)&&s(Re,x,null,be[x],ue,re);"value"in be&&s(Re,"value",null,be.value,ue),(Y=be.onVnodeBeforeMount)&&ei(Y,re,T)}we&&cr(T,null,re,"beforeMount");const U=_v(Q,Ie);U&&Ie.beforeEnter(Re),i(Re,R,k),((Y=be&&be.onVnodeMounted)||U||we)&&bn(()=>{Y&&ei(Y,re,T),U&&Ie.enter(Re),we&&cr(T,null,re,"mounted")},Q)},B=(T,R,k,re,Q)=>{if(k&&p(T,k),re)for(let ue=0;ue<re.length;ue++)p(T,re[ue]);if(Q){let ue=Q.subTree;if(R===ue||Jp(ue.type)&&(ue.ssContent===R||ue.ssFallback===R)){const Ae=Q.vnode;B(T,Ae,Ae.scopeId,Ae.slotScopeIds,Q.parent)}}},v=(T,R,k,re,Q,ue,Ae,Ee,Re=0)=>{for(let Y=Re;Y<T.length;Y++){const be=T[Y]=Ee?Ti(T[Y]):si(T[Y]);y(null,be,R,k,re,Q,ue,Ae,Ee)}},S=(T,R,k,re,Q,ue,Ae)=>{const Ee=R.el=T.el;let{patchFlag:Re,dynamicChildren:Y,dirs:be}=R;Re|=T.patchFlag&16;const N=T.props||Dt,Ie=R.props||Dt;let we;if(k&&fr(k,!1),(we=Ie.onVnodeBeforeUpdate)&&ei(we,k,R,T),be&&cr(R,T,k,"beforeUpdate"),k&&fr(k,!0),Y&&(!T.dynamicChildren||T.dynamicChildren.length!==Y.length)&&(Re=0,Ae=!1,Y=null),(N.innerHTML&&Ie.innerHTML==null||N.textContent&&Ie.textContent==null)&&c(Ee,""),Y?F(T.dynamicChildren,Y,Ee,k,re,Dl(R,Q),ue):Ae||$(T,R,Ee,null,k,re,Dl(R,Q),ue,!1),Re>0){if(Re&16)D(Ee,N,Ie,k,Q);else if(Re&2&&N.class!==Ie.class&&s(Ee,"class",null,Ie.class,Q),Re&4&&s(Ee,"style",N.style,Ie.style,Q),Re&8){const U=R.dynamicProps;for(let x=0;x<U.length;x++){const q=U[x],ne=N[q],de=Ie[q];(de!==ne||q==="value")&&s(Ee,q,ne,de,Q,k)}}Re&1&&T.children!==R.children&&c(Ee,R.children)}else!Ae&&Y==null&&D(Ee,N,Ie,k,Q);((we=Ie.onVnodeUpdated)||be)&&bn(()=>{we&&ei(we,k,R,T),be&&cr(R,T,k,"updated")},re)},F=(T,R,k,re,Q,ue,Ae)=>{for(let Ee=0;Ee<R.length;Ee++){const Re=T[Ee],Y=R[Ee],be=Re.el&&(Re.type===tt||!zs(Re,Y)||Re.shapeFlag&198)?f(Re.el):k;y(Re,Y,be,null,re,Q,ue,Ae,!0)}},D=(T,R,k,re,Q)=>{if(R!==k){if(R!==Dt)for(const ue in R)!to(ue)&&!(ue in k)&&s(T,ue,R[ue],null,Q,re);for(const ue in k){if(to(ue))continue;const Ae=k[ue],Ee=R[ue];Ae!==Ee&&ue!=="value"&&s(T,ue,Ee,Ae,Q,re)}"value"in k&&s(T,"value",R.value,k.value,Q)}},H=(T,R,k,re,Q,ue,Ae,Ee,Re)=>{const Y=R.el=T?T.el:a(""),be=R.anchor=T?T.anchor:a("");let{patchFlag:N,dynamicChildren:Ie,slotScopeIds:we}=R;we&&(Ee=Ee?Ee.concat(we):we),T==null?(i(Y,k,re),i(be,k,re),v(R.children||[],k,be,Q,ue,Ae,Ee,Re)):N>0&&N&64&&Ie&&T.dynamicChildren&&T.dynamicChildren.length===Ie.length?(F(T.dynamicChildren,Ie,k,Q,ue,Ae,Ee),(R.key!=null||Q&&R===Q.subTree)&&Kp(T,R,!0)):$(T,R,k,be,Q,ue,Ae,Ee,Re)},ee=(T,R,k,re,Q,ue,Ae,Ee,Re)=>{R.slotScopeIds=Ee,T==null?R.shapeFlag&512?Q.ctx.activate(R,k,re,Ae,Re):X(R,k,re,Q,ue,Ae,Re):J(T,R,Re)},X=(T,R,k,re,Q,ue,Ae)=>{const Ee=T.component=wv(T,re,Q);if(Ip(T)&&(Ee.ctx.renderer=Te),Tv(Ee,!1,Ae),Ee.asyncDep){if(Q&&Q.registerDep(Ee,le,Ae),!T.el){const Re=Ee.subTree=tn(sr);h(null,Re,R,k),T.placeholder=Re.el}}else le(Ee,T,R,k,Q,ue,Ae)},J=(T,R,k)=>{const re=R.component=T.component;if(av(T,R,k))if(re.asyncDep&&!re.asyncResolved){L(re,R,k);return}else re.next=R,re.update();else R.el=T.el,re.vnode=R},le=(T,R,k,re,Q,ue,Ae)=>{const Ee=()=>{if(T.isMounted){let{next:N,bu:Ie,u:we,parent:U,vnode:x}=T;{const Ve=jp(T);if(Ve){N&&(N.el=x.el,L(T,N,Ae)),Ve.asyncDep.then(()=>{bn(()=>{T.isUnmounted||Y()},Q)});return}}let q=N,ne;fr(T,!1),N?(N.el=x.el,L(T,N,Ae)):N=x,Ie&&ha(Ie),(ne=N.props&&N.props.onVnodeBeforeUpdate)&&ei(ne,U,N,x),fr(T,!0);const de=Gf(T),Ne=T.subTree;T.subTree=de,y(Ne,de,f(Ne.el),W(Ne),T,Q,ue),N.el=de.el,q===null&&lv(T,de.el),we&&bn(we,Q),(ne=N.props&&N.props.onVnodeUpdated)&&bn(()=>ei(ne,U,N,x),Q)}else{let N;const{el:Ie,props:we}=R,{bm:U,m:x,parent:q,root:ne,type:de}=T,Ne=so(R);fr(T,!1),U&&ha(U),!Ne&&(N=we&&we.onVnodeBeforeMount)&&ei(N,q,R),fr(T,!0);{ne.ce&&ne.ce._hasShadowRoot()&&ne.ce._injectChildStyle(de,T.parent?T.parent.type:void 0);const Ve=T.subTree=Gf(T);y(null,Ve,k,re,T,Q,ue),R.el=Ve.el}if(x&&bn(x,Q),!Ne&&(N=we&&we.onVnodeMounted)){const Ve=R;bn(()=>ei(N,q,Ve),Q)}(R.shapeFlag&256||q&&so(q.vnode)&&q.vnode.shapeFlag&256)&&T.a&&bn(T.a,Q),T.isMounted=!0,R=k=re=null}};T.scope.on();const Re=T.effect=new ap(Ee);T.scope.off();const Y=T.update=Re.run.bind(Re),be=T.job=Re.runIfDirty.bind(Re);be.i=T,be.id=T.uid,Re.scheduler=()=>Yc(be),fr(T,!0),Y()},L=(T,R,k)=>{R.component=T;const re=T.vnode.props;T.vnode=R,T.next=null,cv(T,R.props,re,k),pv(T,R.children,k),Ui(),Of(T),Oi()},$=(T,R,k,re,Q,ue,Ae,Ee,Re=!1)=>{const Y=T&&T.children,be=T?T.shapeFlag:0,N=R.children,{patchFlag:Ie,shapeFlag:we}=R;if(Ie>0){if(Ie&128){Ue(Y,N,k,re,Q,ue,Ae,Ee,Re);return}else if(Ie&256){ge(Y,N,k,re,Q,ue,Ae,Ee,Re);return}}we&8?(be&16&&ie(Y,Q,ue),N!==Y&&c(k,N)):be&16?we&16?Ue(Y,N,k,re,Q,ue,Ae,Ee,Re):ie(Y,Q,ue,!0):(be&8&&c(k,""),we&16&&v(N,k,re,Q,ue,Ae,Ee,Re))},ge=(T,R,k,re,Q,ue,Ae,Ee,Re)=>{T=T||us,R=R||us;const Y=T.length,be=R.length,N=Math.min(Y,be);let Ie;for(Ie=0;Ie<N;Ie++){const we=R[Ie]=Re?Ti(R[Ie]):si(R[Ie]);y(T[Ie],we,k,null,Q,ue,Ae,Ee,Re)}Y>be?ie(T,Q,ue,!0,!1,N):v(R,k,re,Q,ue,Ae,Ee,Re,N)},Ue=(T,R,k,re,Q,ue,Ae,Ee,Re)=>{let Y=0;const be=R.length;let N=T.length-1,Ie=be-1;for(;Y<=N&&Y<=Ie;){const we=T[Y],U=R[Y]=Re?Ti(R[Y]):si(R[Y]);if(zs(we,U))y(we,U,k,null,Q,ue,Ae,Ee,Re);else break;Y++}for(;Y<=N&&Y<=Ie;){const we=T[N],U=R[Ie]=Re?Ti(R[Ie]):si(R[Ie]);if(zs(we,U))y(we,U,k,null,Q,ue,Ae,Ee,Re);else break;N--,Ie--}if(Y>N){if(Y<=Ie){const we=Ie+1,U=we<be?R[we].el:re;for(;Y<=Ie;)y(null,R[Y]=Re?Ti(R[Y]):si(R[Y]),k,U,Q,ue,Ae,Ee,Re),Y++}}else if(Y>Ie)for(;Y<=N;)ke(T[Y],Q,ue,!0),Y++;else{const we=Y,U=Y,x=new Map;for(Y=U;Y<=Ie;Y++){const Be=R[Y]=Re?Ti(R[Y]):si(R[Y]);Be.key!=null&&x.set(Be.key,Y)}let q,ne=0;const de=Ie-U+1;let Ne=!1,Ve=0;const _e=new Array(de);for(Y=0;Y<de;Y++)_e[Y]=0;for(Y=we;Y<=N;Y++){const Be=T[Y];if(ne>=de){ke(Be,Q,ue,!0);continue}let Ge;if(Be.key!=null)Ge=x.get(Be.key);else for(q=U;q<=Ie;q++)if(_e[q-U]===0&&zs(Be,R[q])){Ge=q;break}Ge===void 0?ke(Be,Q,ue,!0):(_e[Ge-U]=Y+1,Ge>=Ve?Ve=Ge:Ne=!0,y(Be,R[Ge],k,null,Q,ue,Ae,Ee,Re),ne++)}const xe=Ne?vv(_e):us;for(q=xe.length-1,Y=de-1;Y>=0;Y--){const Be=U+Y,Ge=R[Be],ze=R[Be+1],He=Be+1<be?ze.el||Zp(ze):re;_e[Y]===0?y(null,Ge,k,He,Q,ue,Ae,Ee,Re):Ne&&(q<0||Y!==xe[q]?Pe(Ge,k,He,2):q--)}}},Pe=(T,R,k,re,Q=null)=>{const{el:ue,type:Ae,transition:Ee,children:Re,shapeFlag:Y}=T;if(Y&6){Pe(T.component.subTree,R,k,re);return}if(Y&128){T.suspense.move(R,k,re);return}if(Y&64){Ae.move(T,R,k,Te);return}if(Ae===tt){i(ue,R,k);for(let N=0;N<Re.length;N++)Pe(Re[N],R,k,re);i(T.anchor,R,k);return}if(Ae===Il){C(T,R,k);return}if(re!==2&&Y&1&&Ee)if(re===0)Ee.persisted&&!ue[Pl]?i(ue,R,k):(Ee.beforeEnter(ue),i(ue,R,k),bn(()=>Ee.enter(ue),Q));else{const{leave:N,delayLeave:Ie,afterLeave:we}=Ee,U=()=>{T.ctx.isUnmounted?r(ue):i(ue,R,k)},x=()=>{const q=ue._isLeaving||!!ue[Pl];ue._isLeaving&&ue[Pl](!0),Ee.persisted&&!q?U():N(ue,()=>{U(),we&&we()})};Ie?Ie(ue,U,x):x()}else i(ue,R,k)},ke=(T,R,k,re=!1,Q=!1)=>{const{type:ue,props:Ae,ref:Ee,children:Re,dynamicChildren:Y,shapeFlag:be,patchFlag:N,dirs:Ie,cacheIndex:we,memo:U}=T;if(N===-2&&(Q=!1),Ee!=null&&(Ui(),ro(Ee,null,k,T,!0),Oi()),we!=null&&(R.renderCache[we]=void 0),be&256){R.ctx.deactivate(T);return}const x=be&1&&Ie,q=!so(T);let ne;if(q&&(ne=Ae&&Ae.onVnodeBeforeUnmount)&&ei(ne,R,T),be&6)ye(T.component,k,re);else{if(be&128){T.suspense.unmount(k,re);return}x&&cr(T,null,R,"beforeUnmount"),be&64?T.type.remove(T,R,k,Te,re):Y&&!Y.hasOnce&&(ue!==tt||N>0&&N&64)?ie(Y,R,k,!1,!0):(ue===tt&&N&384||!Q&&be&16)&&ie(Re,R,k),re&&Le(T)}const de=U!=null&&we==null;(q&&(ne=Ae&&Ae.onVnodeUnmounted)||x||de)&&bn(()=>{ne&&ei(ne,R,T),x&&cr(T,null,R,"unmounted"),de&&(T.el=null)},k)},Le=T=>{const{type:R,el:k,anchor:re,transition:Q}=T;if(R===tt){De(k,re);return}if(R===Il){b(T);return}const ue=()=>{r(k),Q&&!Q.persisted&&Q.afterLeave&&Q.afterLeave()};if(T.shapeFlag&1&&Q&&!Q.persisted){const{leave:Ae,delayLeave:Ee}=Q,Re=()=>Ae(k,ue);Ee?Ee(T.el,ue,Re):Re()}else ue()},De=(T,R)=>{let k;for(;T!==R;)k=d(T),r(T),T=k;r(R)},ye=(T,R,k)=>{const{bum:re,scope:Q,job:ue,subTree:Ae,um:Ee,m:Re,a:Y}=T;Xf(Re),Xf(Y),re&&ha(re),Q.stop(),ue&&(ue.flags|=8,ke(Ae,T,R,k)),Ee&&bn(Ee,R),bn(()=>{T.isUnmounted=!0},R)},ie=(T,R,k,re=!1,Q=!1,ue=0)=>{for(let Ae=ue;Ae<T.length;Ae++)ke(T[Ae],R,k,re,Q)},W=T=>{if(T.shapeFlag&6)return W(T.component.subTree);if(T.shapeFlag&128)return T.suspense.next();const R=d(T.anchor||T.el),k=R&&R[U_];return k?d(k):R};let ae=!1;const ve=(T,R,k)=>{let re;T==null?R._vnode&&(ke(R._vnode,null,null,!0),re=R._vnode.component):y(R._vnode||null,T,R,null,null,null,k),R._vnode=T,ae||(ae=!0,Of(re),Tp(),ae=!1)},Te={p:y,um:ke,m:Pe,r:Le,mt:X,mc:v,pc:$,pbc:F,n:W,o:t};return{render:ve,hydrate:void 0,createApp:tv(ve)}}function Dl({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function fr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function _v(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Kp(t,e,n=!1){const i=t.children,r=e.children;if(at(i)&&at(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=Ti(r[s]),a.el=o.el),!n&&a.patchFlag!==-2&&Kp(o,a)),a.type===ol&&(a.patchFlag===-1&&(a=r[s]=Ti(a)),a.el=o.el),a.type===sr&&!a.el&&(a.el=o.el)}}function vv(t){const e=t.slice(),n=[0];let i,r,s,o,a;const l=t.length;for(i=0;i<l;i++){const u=t[i];if(u!==0){if(r=n[n.length-1],t[r]<u){e[i]=r,n.push(i);continue}for(s=0,o=n.length-1;s<o;)a=s+o>>1,t[n[a]]<u?s=a+1:o=a;u<t[n[s]]&&(s>0&&(e[i]=n[s-1]),n[s]=i)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=e[o];return n}function jp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:jp(e)}function Xf(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}function Zp(t){if(t.placeholder)return t.placeholder;const e=t.component;return e?Zp(e.subTree):null}const Jp=t=>t.__isSuspense;function xv(t,e){e&&e.pendingBranch?at(t)?e.effects.push(...t):e.effects.push(t):P_(t)}const tt=Symbol.for("v-fgt"),ol=Symbol.for("v-txt"),sr=Symbol.for("v-cmt"),Il=Symbol.for("v-stc"),Tr=[];let Tn=null;function j(t=!1){Tr.push(Tn=t?null:[])}function Qp(){Tr.pop(),Tn=Tr[Tr.length-1]||null}let mo=1;function Da(t,e=!1){mo+=t,t<0&&Tn&&e&&(Tn.hasOnce=!0)}function em(t){return t.dynamicChildren=mo>0?Tn||us:null,Qp(),mo>0&&Tn&&Tn.push(t),t}function Z(t,e,n,i,r,s){return em(m(t,e,n,i,r,s,!0))}function Du(t,e,n,i,r){return em(tn(t,e,n,i,r,!0))}function Ia(t){return t?t.__v_isVNode===!0:!1}function zs(t,e){return t.type===e.type&&t.key===e.key}const tm=({key:t})=>t??null,ma=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ht(t)||zt(t)||ht(t)?{i:Un,r:t,k:e,f:!!n}:t:null);function m(t,e=null,n=null,i=0,r=null,s=t===tt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&tm(e),ref:e&&ma(e),scopeId:Rp,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Un};return a?(Na(l,n),s&128&&t.normalize(l)):n&&(l.shapeFlag|=Ht(n)?8:16),mo>0&&!o&&Tn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Tn.push(l),l}const tn=bv;function bv(t,e=null,n=null,i=0,r=null,s=!1){if((!t||t===q_)&&(t=sr),Ia(t)){const a=gs(t,e,!0);return n&&Na(a,n),mo>0&&!s&&Tn&&(a.shapeFlag&6?Tn[Tn.indexOf(t)]=a:Tn.push(a)),a.patchFlag=-2,a}if(Pv(t)&&(t=t.__vccOpts),e){e=yv(e);let{class:a,style:l}=e;a&&!Ht(a)&&(e.class=$t(a)),Ct(l)&&(nl(l)&&!at(l)&&(l=sn({},l)),e.style=Bt(l))}const o=Ht(t)?1:Jp(t)?128:O_(t)?64:Ct(t)?4:ht(t)?2:0;return m(t,e,n,i,r,o,s,!0)}function yv(t){return t?nl(t)||Gp(t)?sn({},t):t:null}function gs(t,e,n=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=t,u=e?Sv(r||{},e):r,c={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&tm(u),ref:e&&e.ref?n&&s?at(s)?s.concat(ma(e)):[s,ma(e)]:ma(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==tt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&gs(t.ssContent),ssFallback:t.ssFallback&&gs(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&i&&Kc(c,l.clone(c)),c}function it(t=" ",e=0){return tn(ol,null,t,e)}function Je(t="",e=!1){return e?(j(),Du(sr,null,t)):tn(sr,null,t)}function si(t){return t==null||typeof t=="boolean"?tn(sr):at(t)?tn(tt,null,t.slice()):Ia(t)?Ti(t):tn(ol,null,String(t))}function Ti(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:gs(t)}function Na(t,e){let n=0;const{shapeFlag:i}=t;if(e==null)e=null;else if(at(e))n=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Na(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Gp(e)?e._ctx=Un:r===3&&Un&&(Un.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else if(ht(e)){if(i&65){Na(t,{default:e});return}e={default:e,_ctx:Un},n=32}else e=String(e),i&64?(n=16,e=[it(e)]):n=8;t.children=e,t.shapeFlag|=n}function Sv(...t){const e={};for(let n=0;n<t.length;n++){const i=t[n];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=$t([e.class,i.class]));else if(r==="style")e.style=Bt([e.style,i.style]);else if(Ka(r)){const s=e[r],o=i[r];o&&s!==o&&!(at(s)&&s.includes(o))?e[r]=s?[].concat(s,o):o:o==null&&s==null&&!ja(r)&&(e[r]=o)}else r!==""&&(e[r]=i[r])}return e}function ei(t,e,n,i=null){qn(t,e,7,[n,i])}const Mv=Bp();let Ev=0;function wv(t,e,n){const i=t.type,r=(e?e.appContext:t.appContext)||Mv,s={uid:Ev++,vnode:t,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new rp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$p(i,r),emitsOptions:kp(i,r),emit:null,emitted:null,propsDefaults:Dt,inheritAttrs:i.inheritAttrs,ctx:Dt,data:Dt,props:Dt,attrs:Dt,slots:Dt,refs:Dt,setupState:Dt,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=iv.bind(null,s),t.ce&&t.ce(s),s}let xn=null;const nm=()=>xn||Un;let Ua,Iu;{const t=el(),e=(n,i)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Ua=e("__VUE_INSTANCE_SETTERS__",n=>xn=n),Iu=e("__VUE_SSR_SETTERS__",n=>go=n)}const To=t=>{const e=xn;return Ua(t),t.scope.on(),()=>{t.scope.off(),Ua(e)}},qf=()=>{xn&&xn.scope.off(),Ua(null)};function im(t){return t.vnode.shapeFlag&4}let go=!1;function Tv(t,e=!1,n=!1){e&&Iu(e);const{props:i,children:r}=t.vnode,s=im(t);uv(t,i,s,e),hv(t,r,n||e);const o=s?Av(t,e):void 0;return e&&Iu(!1),o}function Av(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Y_);const{setup:i}=n;if(i){Ui();const r=t.setupContext=i.length>1?Cv(t):null,s=To(t),o=wo(i,t,0,[t.props,r]),a=jh(o);if(Oi(),s(),(a||t.sp)&&!so(t)&&Dp(t),a){if(o.then(qf,qf),e)return o.then(l=>{Yf(t,l)}).catch(l=>{il(l,t,0)});t.asyncDep=o}else Yf(t,o)}else rm(t)}function Yf(t,e,n){ht(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ct(e)&&(t.setupState=Mp(e)),rm(t)}function rm(t,e,n){const i=t.type;t.render||(t.render=i.render||ci);{const r=To(t);Ui();try{K_(t)}finally{Oi(),r()}}}const Rv={get(t,e){return un(t,"get",""),t[e]}};function Cv(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Rv),slots:t.slots,emit:t.emit,expose:e}}function al(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Mp(qc(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in oo)return oo[n](t)},has(e,n){return n in e||n in oo}})):t.proxy}function Pv(t){return ht(t)&&"__vccOpts"in t}const st=(t,e)=>w_(t,e,go);function sm(t,e,n){try{Da(-1);const i=arguments.length;return i===2?Ct(e)&&!at(e)?Ia(e)?tn(t,null,[e]):tn(t,e):tn(t,null,e):(i>3?n=Array.prototype.slice.call(arguments,2):i===3&&Ia(n)&&(n=[n]),tn(t,e,n))}finally{Da(1)}}const Lv="3.5.40";let Nu;const Kf=typeof window<"u"&&window.trustedTypes;if(Kf)try{Nu=Kf.createPolicy("vue",{createHTML:t=>t})}catch{}const om=Nu?t=>Nu.createHTML(t):t=>t,Dv="http://www.w3.org/2000/svg",Iv="http://www.w3.org/1998/Math/MathML",wi=typeof document<"u"?document:null,jf=wi&&wi.createElement("template"),Nv={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const r=e==="svg"?wi.createElementNS(Dv,t):e==="mathml"?wi.createElementNS(Iv,t):n?wi.createElement(t,{is:n}):wi.createElement(t);return t==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:t=>wi.createTextNode(t),createComment:t=>wi.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>wi.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,r,s){const o=n?n.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{jf.innerHTML=om(i==="svg"?`<svg>${t}</svg>`:i==="mathml"?`<math>${t}</math>`:t);const a=jf.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Uv=Symbol("_vtc");function Ov(t,e,n){const i=t[Uv];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Zf=Symbol("_vod"),Fv=Symbol("_vsh"),Bv=Symbol(""),kv=/(?:^|;)\s*display\s*:/;function Vv(t,e,n){const i=t.style,r=Ht(n);let s=!1;if(n&&!r){if(e)if(Ht(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&Js(i,a,"")}else for(const o in e)n[o]==null&&Js(i,o,"");for(const o in n){o==="display"&&(s=!0);const a=n[o];a!=null?zv(t,o,!Ht(e)&&e?e[o]:void 0,a)||Js(i,o,a):Js(i,o,"")}}else if(r){if(e!==n){const o=i[Bv];o&&(n+=";"+o),i.cssText=n,s=kv.test(n)}}else e&&t.removeAttribute("style");Zf in t&&(t[Zf]=s?i.display:"",t[Fv]&&(i.display="none"))}const Jf=/\s*!important$/;function Js(t,e,n){if(at(n))n.forEach(i=>Js(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=Hv(t,e);Jf.test(n)?t.setProperty(lr(i),n.replace(Jf,""),"important"):t[i]=n}}const Qf=["Webkit","Moz","ms"],Nl={};function Hv(t,e){const n=Nl[e];if(n)return n;let i=Wn(e);if(i!=="filter"&&i in t)return Nl[e]=i;i=Qh(i);for(let r=0;r<Qf.length;r++){const s=Qf[r]+i;if(s in t)return Nl[e]=s}return e}function zv(t,e,n,i){return t.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&Ht(i)&&n===i}const ed="http://www.w3.org/1999/xlink";function td(t,e,n,i,r,s=Zg(e)){i&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ed,e.slice(6,e.length)):t.setAttributeNS(ed,e,n):n==null||s&&!tp(n)?t.removeAttribute(e):t.setAttribute(e,s?"":Bn(n)?String(n):n)}function nd(t,e,n,i,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?om(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=tp(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function tr(t,e,n,i){t.addEventListener(e,n,i)}function Gv(t,e,n,i){t.removeEventListener(e,n,i)}const id=Symbol("_vei");function Wv(t,e,n,i,r=null){const s=t[id]||(t[id]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=qv(e);if(i){const u=s[e]=jv(i,r);tr(t,a,u,l)}else o&&(Gv(t,a,o,l),s[e]=void 0)}}const $v=/(Once|Passive|Capture)$/,Xv=/^on:?(?:Once|Passive|Capture)$/;function qv(t){let e,n;for(;(n=t.match($v))&&!Xv.test(t);)e||(e={}),t=t.slice(0,t.length-n[1].length),e[n[1].toLowerCase()]=!0;return[t[2]===":"?t.slice(3):lr(t.slice(2)),e]}let Ul=0;const Yv=Promise.resolve(),Kv=()=>Ul||(Yv.then(()=>Ul=0),Ul=Date.now());function jv(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;const r=n.value;if(at(r)){const s=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{s.call(i),i._stopped=!0};const o=r.slice(),a=[i];for(let l=0;l<o.length&&!i._stopped;l++){const u=o[l];u&&qn(u,e,5,a)}}else qn(r,e,5,[i])};return n.value=t,n.attached=Kv(),n}const rd=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Zv=(t,e,n,i,r,s)=>{const o=r==="svg";e==="class"?Ov(t,i,o):e==="style"?Vv(t,n,i):Ka(e)?ja(e)||Wv(t,e,n,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Jv(t,e,i,o))?(nd(t,e,i),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&td(t,e,i,o,s,e!=="value")):t._isVueCE&&(Qv(t,e)||t._def.__asyncLoader&&(/[A-Z]/.test(e)||!Ht(i)))?nd(t,Wn(e),i,s,e):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),td(t,e,i,o))};function Jv(t,e,n,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in t&&rd(e)&&ht(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&t.tagName==="IFRAME"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return rd(e)&&Ht(n)?!1:e in t}function Qv(t,e){const n=t._def.props;if(!n)return!1;const i=Wn(e);return Array.isArray(n)?n.some(r=>Wn(r)===i):Object.keys(n).some(r=>Wn(r)===i)}const _s=t=>{const e=t.props["onUpdate:modelValue"]||!1;return at(e)?n=>ha(e,n):e};function e0(t){t.target.composing=!0}function sd(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Di=Symbol("_assign");function od(t,e,n){return e&&(t=t.trim()),n&&(t=Qa(t)),t}const lt={created(t,{modifiers:{lazy:e,trim:n,number:i}},r){t[Di]=_s(r);const s=i||r.props&&r.props.type==="number";tr(t,e?"change":"input",o=>{o.target.composing||t[Di](od(t.value,n,s))}),(n||s)&&tr(t,"change",()=>{t.value=od(t.value,n,s)}),e||(tr(t,"compositionstart",e0),tr(t,"compositionend",sd),tr(t,"change",sd))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:i,trim:r,number:s}},o){if(t[Di]=_s(o),t.composing)return;const a=(s||t.type==="number")&&!/^0\d/.test(t.value)?Qa(t.value):t.value,l=e??"";if(a===l)return;const u=t.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===t&&t.type!=="range"&&(i&&e===n||r&&t.value.trim()===l)||(t.value=l)}},Jc={deep:!0,created(t,e,n){t[Di]=_s(n),tr(t,"change",()=>{const i=t._modelValue,r=_o(t),s=t.checked,o=t[Di];if(at(i)){const a=Vc(i,r),l=a!==-1;if(s&&!l)o(i.concat(r));else if(!s&&l){const u=[...i];u.splice(a,1),o(u)}}else if(As(i)){const a=new Set(i);s?a.add(r):a.delete(r),o(a)}else o(am(t,s))})},mounted:ad,beforeUpdate(t,e,n){t[Di]=_s(n),ad(t,e,n)}};function ad(t,{value:e,oldValue:n},i){t._modelValue=e;let r;if(at(e))r=Vc(e,i.props.value)>-1;else if(As(e))r=e.has(i.props.value);else{if(e===n)return;r=Rs(e,am(t,!0))}t.checked!==r&&(t.checked=r)}const Wt={deep:!0,created(t,{value:e,modifiers:{number:n}},i){t._modelValue=e,tr(t,"change",()=>{const r=Array.prototype.filter.call(t.options,s=>s.selected).map(s=>n?Qa(_o(s)):_o(s));t[Di](t.multiple?As(t._modelValue)?new Set(r):r:r[0]),t._assigning=!0,Cs(()=>{t._assigning=!1})}),t[Di]=_s(i)},mounted(t,{value:e}){ld(t,e)},beforeUpdate(t,{value:e},n){t._modelValue=e,t[Di]=_s(n)},updated(t,{value:e}){t._assigning||ld(t,e)}};function ld(t,e){const n=t.multiple,i=at(e);if(!(n&&!i&&!As(e))){for(let r=0,s=t.options.length;r<s;r++){const o=t.options[r],a=_o(o);if(n)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=e.some(u=>String(u)===String(a)):o.selected=Vc(e,a)>-1}else o.selected=e.has(a);else if(Rs(_o(o),e)){t.selectedIndex!==r&&(t.selectedIndex=r);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function _o(t){return"_value"in t?t._value:t.value}function am(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const t0=["ctrl","shift","alt","meta"],n0={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>t0.some(n=>t[`${n}Key`]&&!e.includes(n))},_t=(t,e)=>{if(!t)return t;const n=t._withMods||(t._withMods={}),i=e.join(".");return n[i]||(n[i]=((r,...s)=>{for(let o=0;o<e.length;o++){const a=n0[e[o]];if(a&&a(r,e))return}return t(r,...s)}))},i0={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},ir=(t,e)=>{const n=t._withKeys||(t._withKeys={}),i=e.join(".");return n[i]||(n[i]=(r=>{if(!("key"in r))return;const s=lr(r.key);if(e.some(o=>o===s||i0[o]===s))return t(r)}))},r0=sn({patchProp:Zv},Nv);let ud;function s0(){return ud||(ud=mv(r0))}const o0=((...t)=>{const e=s0().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=l0(i);if(!r)return;const s=e._component;!ht(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,a0(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function a0(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function l0(t){return Ht(t)?document.querySelector(t):t}let lm;const ll=t=>lm=t,um=Symbol();function Uu(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var ao;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(ao||(ao={}));function u0(){const t=sp(!0),e=t.run(()=>Me({}));let n=[],i=[];const r=qc({install(s){ll(r),r._a=s,s.provide(um,r),s.config.globalProperties.$pinia=r,i.forEach(o=>n.push(o)),i=[]},use(s){return this._a?n.push(s):i.push(s),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return r}const cm=()=>{};function cd(t,e,n,i=cm){t.push(e);const r=()=>{const s=t.indexOf(e);s>-1&&(t.splice(s,1),i())};return!n&&op()&&Qg(r),r}function zr(t,...e){t.slice().forEach(n=>{n(...e)})}const c0=t=>t(),fd=Symbol(),Ol=Symbol();function Ou(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,i)=>t.set(i,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const i=e[n],r=t[n];Uu(r)&&Uu(i)&&t.hasOwnProperty(n)&&!zt(i)&&!Li(i)?t[n]=Ou(r,i):t[n]=i}return t}const f0=Symbol();function d0(t){return!Uu(t)||!t.hasOwnProperty(f0)}const{assign:Ji}=Object;function h0(t){return!!(zt(t)&&t.effect)}function p0(t,e,n,i){const{state:r,actions:s,getters:o}=e,a=n.state.value[t];let l;function u(){a||(n.state.value[t]=r?r():{});const c=y_(n.state.value[t]);return Ji(c,s,Object.keys(o||{}).reduce((f,d)=>(f[d]=qc(st(()=>{ll(n);const p=n._s.get(t);return o[d].call(p,p)})),f),{}))}return l=fm(t,u,e,n,i,!0),l}function fm(t,e,n={},i,r,s){let o;const a=Ji({actions:{}},n),l={deep:!0};let u,c,f=[],d=[],p;const _=i.state.value[t];!s&&!_&&(i.state.value[t]={});let y;function g(v){let S;u=c=!1,typeof v=="function"?(v(i.state.value[t]),S={type:ao.patchFunction,storeId:t,events:p}):(Ou(i.state.value[t],v),S={type:ao.patchObject,payload:v,storeId:t,events:p});const F=y=Symbol();Cs().then(()=>{y===F&&(u=!0)}),c=!0,zr(f,S,i.state.value[t])}const h=s?function(){const{state:S}=n,F=S?S():{};this.$patch(D=>{Ji(D,F)})}:cm;function M(){o.stop(),f=[],d=[],i._s.delete(t)}const C=(v,S="")=>{if(fd in v)return v[Ol]=S,v;const F=function(){ll(i);const D=Array.from(arguments),H=[],ee=[];function X(L){H.push(L)}function J(L){ee.push(L)}zr(d,{args:D,name:F[Ol],store:I,after:X,onError:J});let le;try{le=v.apply(this&&this.$id===t?this:I,D)}catch(L){throw zr(ee,L),L}return le instanceof Promise?le.then(L=>(zr(H,L),L)).catch(L=>(zr(ee,L),Promise.reject(L))):(zr(H,le),le)};return F[fd]=!0,F[Ol]=S,F},b={_p:i,$id:t,$onAction:cd.bind(null,d),$patch:g,$reset:h,$subscribe(v,S={}){const F=cd(f,v,S.detached,()=>D()),D=o.run(()=>fi(()=>i.state.value[t],H=>{(S.flush==="sync"?c:u)&&v({storeId:t,type:ao.direct,events:p},H)},Ji({},l,S)));return F},$dispose:M},I=Zt(b);i._s.set(t,I);const B=(i._a&&i._a.runWithContext||c0)(()=>i._e.run(()=>(o=sp()).run(()=>e({action:C}))));for(const v in B){const S=B[v];if(zt(S)&&!h0(S)||Li(S))s||(_&&d0(S)&&(zt(S)?S.value=_[v]:Ou(S,_[v])),i.state.value[t][v]=S);else if(typeof S=="function"){const F=C(S,v);B[v]=F,a.actions[v]=S}}return Ji(I,B),Ji(Mt(I),B),Object.defineProperty(I,"$state",{get:()=>i.state.value[t],set:v=>{g(S=>{Ji(S,v)})}}),i._p.forEach(v=>{Ji(I,o.run(()=>v({store:I,app:i._a,pinia:i,options:a})))}),_&&s&&n.hydrate&&n.hydrate(I.$state,_),u=!0,c=!0,I}function m0(t,e,n){let i,r;const s=typeof e=="function";i=t,r=s?n:e;function o(a,l){const u=L_();return a=a||(u?On(um,null):null),a&&ll(a),a=lm,a._s.has(i)||(s?fm(i,e,r,a):p0(i,r,a)),a._s.get(i)}return o.$id=i,o}const as=typeof document<"u";function dm(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function g0(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&dm(t.default)}const wt=Object.assign;function Fl(t,e){const n={};for(const i in e){const r=e[i];n[i]=Yn(r)?r.map(t):t(r)}return n}const lo=()=>{},Yn=Array.isArray;function dd(t,e){const n={};for(const i in t)n[i]=i in e?e[i]:t[i];return n}const hm=/#/g,_0=/&/g,v0=/\//g,x0=/=/g,b0=/\?/g,pm=/\+/g,y0=/%5B/g,S0=/%5D/g,mm=/%5E/g,M0=/%60/g,gm=/%7B/g,E0=/%7C/g,_m=/%7D/g,w0=/%20/g;function Qc(t){return t==null?"":encodeURI(""+t).replace(E0,"|").replace(y0,"[").replace(S0,"]")}function T0(t){return Qc(t).replace(gm,"{").replace(_m,"}").replace(mm,"^")}function Fu(t){return Qc(t).replace(pm,"%2B").replace(w0,"+").replace(hm,"%23").replace(_0,"%26").replace(M0,"`").replace(gm,"{").replace(_m,"}").replace(mm,"^")}function A0(t){return Fu(t).replace(x0,"%3D")}function R0(t){return Qc(t).replace(hm,"%23").replace(b0,"%3F")}function C0(t){return R0(t).replace(v0,"%2F")}function vo(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const P0=/\/$/,L0=t=>t.replace(P0,"");function Bl(t,e,n="/"){let i,r={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=e.slice(0,l),s=e.slice(l,a>0?a:e.length),r=t(s.slice(1))),a>=0&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=U0(i??e,n),{fullPath:i+s+o,path:i,query:r,hash:vo(o)}}function D0(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function hd(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function I0(t,e,n){const i=e.matched.length-1,r=n.matched.length-1;return i>-1&&i===r&&vs(e.matched[i],n.matched[r])&&vm(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function vs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function vm(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(var n in t)if(!N0(t[n],e[n]))return!1;return!0}function N0(t,e){return Yn(t)?pd(t,e):Yn(e)?pd(e,t):t?.valueOf()===e?.valueOf()}function pd(t,e){return Yn(e)?t.length===e.length&&t.every((n,i)=>n===e[i]):t.length===1&&t[0]===e}function U0(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),i=t.split("/"),r=i[i.length-1];(r===".."||r===".")&&i.push("");let s=n.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+i.slice(o).join("/")}const Wi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Bu=(function(t){return t.pop="pop",t.push="push",t})({}),kl=(function(t){return t.back="back",t.forward="forward",t.unknown="",t})({});function O0(t){if(!t)if(as){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),L0(t)}const F0=/^[^#]+#/;function B0(t,e){return t.replace(F0,"#")+e}function k0(t,e){const n=document.documentElement.getBoundingClientRect(),i=t.getBoundingClientRect();return{behavior:e.behavior,left:i.left-n.left-(e.left||0),top:i.top-n.top-(e.top||0)}}const ul=()=>({left:window.scrollX,top:window.scrollY});function V0(t){let e;if("el"in t){const n=t.el,i=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?i?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=k0(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function md(t,e){return(history.state?history.state.position-e:-1)+t}const ku=new Map;function H0(t,e){ku.set(t,e)}function z0(t){const e=ku.get(t);return ku.delete(t),e}function G0(t){return typeof t=="string"||t&&typeof t=="object"}function xm(t){return typeof t=="string"||typeof t=="symbol"}let kt=(function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t})({});const bm=Symbol("");kt.MATCHER_NOT_FOUND+"",kt.NAVIGATION_GUARD_REDIRECT+"",kt.NAVIGATION_ABORTED+"",kt.NAVIGATION_CANCELLED+"",kt.NAVIGATION_DUPLICATED+"";function xs(t,e){return wt(new Error,{type:t,[bm]:!0},e)}function xi(t,e){return t instanceof Error&&bm in t&&(e==null||!!(t.type&e))}const W0=["params","query","hash"];function $0(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of W0)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function X0(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let i=0;i<n.length;++i){const r=n[i].replace(pm," "),s=r.indexOf("="),o=vo(s<0?r:r.slice(0,s)),a=s<0?null:vo(r.slice(s+1));if(o in e){let l=e[o];Yn(l)||(l=e[o]=[l]),l.push(a)}else e[o]=a}return e}function gd(t){let e="";for(let n in t){const i=t[n];if(n=A0(n),i==null){i!==void 0&&(e+=(e.length?"&":"")+n);continue}(Yn(i)?i.map(r=>r&&Fu(r)):[i&&Fu(i)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function q0(t){const e={};for(const n in t){const i=t[n];i!==void 0&&(e[n]=Yn(i)?i.map(r=>r==null?null:""+r):i==null?i:""+i)}return e}const Y0=Symbol(""),_d=Symbol(""),cl=Symbol(""),ef=Symbol(""),Vu=Symbol("");function Gs(){let t=[];function e(i){return t.push(i),()=>{const r=t.indexOf(i);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function er(t,e,n,i,r,s=o=>o()){const o=i&&(i.enterCallbacks[r]=i.enterCallbacks[r]||[]);return()=>new Promise((a,l)=>{const u=d=>{d===!1?l(xs(kt.NAVIGATION_ABORTED,{from:n,to:e})):d instanceof Error?l(d):G0(d)?l(xs(kt.NAVIGATION_GUARD_REDIRECT,{from:e,to:d})):(o&&i.enterCallbacks[r]===o&&typeof d=="function"&&o.push(d),a())},c=s(()=>t.call(i&&i.instances[r],e,n,u));let f=Promise.resolve(c);t.length<3&&(f=f.then(u)),f.catch(d=>l(d))})}function Vl(t,e,n,i,r=s=>s()){const s=[];for(const o of t)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(dm(l)){const u=(l.__vccOpts||l)[e];u&&s.push(er(u,n,i,o,a,r))}else{let u=l();s.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=g0(c)?c.default:c;o.mods[a]=c,o.components[a]=f;const d=(f.__vccOpts||f)[e];return d&&er(d,n,i,o,a,r)()}))}}return s}function K0(t,e){const n=[],i=[],r=[],s=Math.max(e.matched.length,t.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(t.matched.find(u=>vs(u,a))?i.push(a):n.push(a));const l=t.matched[o];l&&(e.matched.find(u=>vs(u,l))||r.push(l))}return[n,i,r]}let j0=()=>location.protocol+"//"+location.host;function ym(t,e){const{pathname:n,search:i,hash:r}=e,s=t.indexOf("#");if(s>-1){let o=r.includes(t.slice(s))?t.slice(s).length:1,a=r.slice(o);return a[0]!=="/"&&(a="/"+a),hd(a,"")}return hd(n,t)+i+r}function Z0(t,e,n,i){let r=[],s=[],o=null;const a=({state:d})=>{const p=ym(t,location),_=n.value,y=e.value;let g=0;if(d){if(n.value=p,e.value=d,o&&o===_){o=null;return}g=y?d.position-y.position:0}else i(p);r.forEach(h=>{h(n.value,_,{delta:g,type:Bu.pop,direction:g?g>0?kl.forward:kl.back:kl.unknown})})};function l(){o=n.value}function u(d){r.push(d);const p=()=>{const _=r.indexOf(d);_>-1&&r.splice(_,1)};return s.push(p),p}function c(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(wt({},d.state,{scroll:ul()}),"")}}function f(){for(const d of s)d();s=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:u,destroy:f}}function vd(t,e,n,i=!1,r=!1){return{back:t,current:e,forward:n,replaced:i,position:window.history.length,scroll:r?ul():null}}function J0(t){const{history:e,location:n}=window,i={value:ym(t,n)},r={value:e.state};r.value||s(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,u,c){const f=t.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?t:t.slice(f))+l:j0()+t+l;try{e[c?"replaceState":"pushState"](u,"",d),r.value=u}catch(p){console.error(p),n[c?"replace":"assign"](d)}}function o(l,u){s(l,wt({},e.state,vd(r.value.back,l,r.value.forward,!0),u,{position:r.value.position}),!0),i.value=l}function a(l,u){const c=wt({},r.value,e.state,{forward:l,scroll:ul()});s(c.current,c,!0),s(l,wt({},vd(i.value,l,null),{position:c.position+1},u),!1),i.value=l}return{location:i,state:r,push:a,replace:o}}function Q0(t){t=O0(t);const e=J0(t),n=Z0(t,e.state,e.location,e.replace);function i(s,o=!0){o||n.pauseListeners(),history.go(s)}const r=wt({location:"",base:t,go:i,createHref:B0.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}let br=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t})({});var Kt=(function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t})(Kt||{});const ex={type:br.Static,value:""},tx=/[a-zA-Z0-9_]/;function nx(t){if(!t)return[[]];if(t==="/")return[[ex]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(p){throw new Error(`ERR (${n})/"${u}": ${p}`)}let n=Kt.Static,i=n;const r=[];let s;function o(){s&&r.push(s),s=[]}let a=0,l,u="",c="";function f(){u&&(n===Kt.Static?s.push({type:br.Static,value:u}):n===Kt.Param||n===Kt.ParamRegExp||n===Kt.ParamRegExpEnd?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),s.push({type:br.Param,value:u,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function d(){u+=l}for(;a<t.length;){if(l=t[a++],l==="\\"&&n!==Kt.ParamRegExp){i=n,n=Kt.EscapeNext;continue}switch(n){case Kt.Static:l==="/"?(u&&f(),o()):l===":"?(f(),n=Kt.Param):d();break;case Kt.EscapeNext:d(),n=i;break;case Kt.Param:l==="("?n=Kt.ParamRegExp:tx.test(l)?d():(f(),n=Kt.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Kt.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:n=Kt.ParamRegExpEnd:c+=l;break;case Kt.ParamRegExpEnd:f(),n=Kt.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,c="";break;default:e("Unknown state");break}}return n===Kt.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),f(),o(),r}const xd="[^/]+?",ix={sensitive:!1,strict:!1,start:!0,end:!0};var _n=(function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t})(_n||{});const rx=/[.+*?^${}()[\]/\\]/g;function sx(t,e){const n=wt({},ix,e),i=[];let r=n.start?"^":"";const s=[];for(const u of t){const c=u.length?[]:[_n.Root];n.strict&&!u.length&&(r+="/");for(let f=0;f<u.length;f++){const d=u[f];let p=_n.Segment+(n.sensitive?_n.BonusCaseSensitive:0);if(d.type===br.Static)f||(r+="/"),r+=d.value.replace(rx,"\\$&"),p+=_n.Static;else if(d.type===br.Param){const{value:_,repeatable:y,optional:g,regexp:h}=d;s.push({name:_,repeatable:y,optional:g});const M=h||xd;if(M!==xd){p+=_n.BonusCustomRegExp;try{`${M}`}catch(b){throw new Error(`Invalid custom RegExp for param "${_}" (${M}): `+b.message)}}let C=y?`((?:${M})(?:/(?:${M}))*)`:`(${M})`;f||(C=g&&u.length<2?`(?:/${C})`:"/"+C),g&&(C+="?"),r+=C,p+=_n.Dynamic,g&&(p+=_n.BonusOptional),y&&(p+=_n.BonusRepeatable),M===".*"&&(p+=_n.BonusWildcard)}c.push(p)}i.push(c)}if(n.strict&&n.end){const u=i.length-1;i[u][i[u].length-1]+=_n.BonusStrict}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(u){const c=u.match(o),f={};if(!c)return null;for(let d=1;d<c.length;d++){const p=c[d]||"",_=s[d-1];f[_.name]=p&&_.repeatable?p.split("/"):p}return f}function l(u){let c="",f=!1;for(const d of t){(!f||!c.endsWith("/"))&&(c+="/"),f=!1;for(const p of d)if(p.type===br.Static)c+=p.value;else if(p.type===br.Param){const{value:_,repeatable:y,optional:g}=p,h=_ in u?u[_]:"";if(Yn(h)&&!y)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const M=Yn(h)?h.join("/"):h;if(!M)if(g)d.length<2&&(c.endsWith("/")?c=c.slice(0,-1):f=!0);else throw new Error(`Missing required param "${_}"`);c+=M}}return c||"/"}return{re:o,score:i,keys:s,parse:a,stringify:l}}function ox(t,e){let n=0;for(;n<t.length&&n<e.length;){const i=e[n]-t[n];if(i)return i;n++}return t.length<e.length?t.length===1&&t[0]===_n.Static+_n.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===_n.Static+_n.Segment?1:-1:0}function Sm(t,e){let n=0;const i=t.score,r=e.score;for(;n<i.length&&n<r.length;){const s=ox(i[n],r[n]);if(s)return s;n++}if(Math.abs(r.length-i.length)===1){if(bd(i))return 1;if(bd(r))return-1}return r.length-i.length}function bd(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const ax={strict:!1,end:!0,sensitive:!1};function lx(t,e,n){const i=sx(nx(t.path),n),r=wt(i,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function ux(t,e){const n=[],i=new Map;e=dd(ax,e);function r(f){return i.get(f)}function s(f,d,p){const _=!p,y=Sd(f);y.aliasOf=p&&p.record;const g=dd(e,f),h=[y];if("alias"in f){const b=typeof f.alias=="string"?[f.alias]:f.alias;for(const I of b)h.push(Sd(wt({},y,{components:p?p.record.components:y.components,path:I,aliasOf:p?p.record:y})))}let M,C;for(const b of h){const{path:I}=b;if(d&&I[0]!=="/"){const w=d.record.path,B=w[w.length-1]==="/"?"":"/";b.path=d.record.path+(I&&B+I)}if(M=lx(b,d,g),p?p.alias.push(M):(C=C||M,C!==M&&C.alias.push(M),_&&f.name&&!Md(M)&&o(f.name)),Mm(M)&&l(M),y.children){const w=y.children;for(let B=0;B<w.length;B++)s(w[B],M,p&&p.children[B])}p=p||M}return C?()=>{o(C)}:lo}function o(f){if(xm(f)){const d=i.get(f);d&&(i.delete(f),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(f);d>-1&&(n.splice(d,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function l(f){const d=dx(f,n);n.splice(d,0,f),f.record.name&&!Md(f)&&i.set(f.record.name,f)}function u(f,d){let p,_={},y,g;if("name"in f&&f.name){if(p=i.get(f.name),!p)throw xs(kt.MATCHER_NOT_FOUND,{location:f});g=p.record.name,_=wt(yd(d.params,p.keys.filter(C=>!C.optional).concat(p.parent?p.parent.keys.filter(C=>C.optional):[]).map(C=>C.name)),f.params&&yd(f.params,p.keys.map(C=>C.name))),y=p.stringify(_)}else if(f.path!=null)y=f.path,p=n.find(C=>C.re.test(y)),p&&(_=p.parse(y),g=p.record.name);else{if(p=d.name?i.get(d.name):n.find(C=>C.re.test(d.path)),!p)throw xs(kt.MATCHER_NOT_FOUND,{location:f,currentLocation:d});g=p.record.name,_=wt({},d.params,f.params),y=p.stringify(_)}const h=[];let M=p;for(;M;)h.unshift(M.record),M=M.parent;return{name:g,path:y,params:_,matched:h,meta:fx(h)}}t.forEach(f=>s(f));function c(){n.length=0,i.clear()}return{addRoute:s,resolve:u,removeRoute:o,clearRoutes:c,getRoutes:a,getRecordMatcher:r}}function yd(t,e){const n={};for(const i of e)i in t&&(n[i]=t[i]);return n}function Sd(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:cx(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function cx(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const i in t.components)e[i]=typeof n=="object"?n[i]:n;return e}function Md(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function fx(t){return t.reduce((e,n)=>wt(e,n.meta),{})}function dx(t,e){let n=0,i=e.length;for(;n!==i;){const s=n+i>>1;Sm(t,e[s])<0?i=s:n=s+1}const r=hx(t);return r&&(i=e.lastIndexOf(r,i-1)),i}function hx(t){let e=t;for(;e=e.parent;)if(Mm(e)&&Sm(t,e)===0)return e}function Mm({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Ed(t){const e=On(cl),n=On(ef),i=st(()=>{const l=cn(t.to);return e.resolve(l)}),r=st(()=>{const{matched:l}=i.value,{length:u}=l,c=l[u-1],f=n.matched;if(!c||!f.length)return-1;const d=f.findIndex(vs.bind(null,c));if(d>-1)return d;const p=wd(l[u-2]);return u>1&&wd(c)===p&&f[f.length-1].path!==p?f.findIndex(vs.bind(null,l[u-2])):d}),s=st(()=>r.value>-1&&_x(n.params,i.value.params)),o=st(()=>r.value>-1&&r.value===n.matched.length-1&&vm(n.params,i.value.params));function a(l={}){if(gx(l)){const u=e[cn(t.replace)?"replace":"push"](cn(t.to)).catch(lo);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:i,href:st(()=>i.value.href),isActive:s,isExactActive:o,navigate:a}}function px(t){return t.length===1?t[0]:t}const mx=Lp({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Ed,setup(t,{slots:e}){const n=Zt(Ed(t)),{options:i}=On(cl),r=st(()=>({[Td(t.activeClass,i.linkActiveClass,"router-link-active")]:n.isActive,[Td(t.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=e.default&&px(e.default(n));return t.custom?s:sm("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},s)}}}),Oa=mx;function gx(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function _x(t,e){for(const n in e){const i=e[n],r=t[n];if(typeof i=="string"){if(i!==r)return!1}else if(!Yn(r)||r.length!==i.length||i.some((s,o)=>s.valueOf()!==r[o].valueOf()))return!1}return!0}function wd(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Td=(t,e,n)=>t??e??n,vx=Lp({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const i=On(Vu),r=st(()=>t.route||i.value),s=On(_d,0),o=st(()=>{let u=cn(s);const{matched:c}=r.value;let f;for(;(f=c[u])&&!f.components;)u++;return u}),a=st(()=>r.value.matched[o.value]);pa(_d,st(()=>o.value+1)),pa(Y0,a),pa(Vu,r);const l=Me();return fi(()=>[l.value,a.value,t.name],([u,c,f],[d,p,_])=>{c&&(c.instances[f]=u,p&&p!==c&&u&&u===d&&(c.leaveGuards.size||(c.leaveGuards=p.leaveGuards),c.updateGuards.size||(c.updateGuards=p.updateGuards))),u&&c&&(!p||!vs(c,p)||!d)&&(c.enterCallbacks[f]||[]).forEach(y=>y(u))},{flush:"post"}),()=>{const u=r.value,c=t.name,f=a.value,d=f&&f.components[c];if(!d)return Ad(n.default,{Component:d,route:u});const p=f.props[c],_=p?p===!0?u.params:typeof p=="function"?p(u):p:null,g=sm(d,wt({},_,e,{onVnodeUnmounted:h=>{h.component.isUnmounted&&(f.instances[c]=null)},ref:l}));return Ad(n.default,{Component:g,route:u})||g}}});function Ad(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Em=vx;function xx(t){const e=ux(t.routes,t),n=t.parseQuery||X0,i=t.stringifyQuery||gd,r=t.history,s=Gs(),o=Gs(),a=Gs(),l=v_(Wi);let u=Wi;as&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=Fl.bind(null,W=>""+W),f=Fl.bind(null,C0),d=Fl.bind(null,vo);function p(W,ae){let ve,Te;return xm(W)?(ve=e.getRecordMatcher(W),Te=ae):Te=W,e.addRoute(Te,ve)}function _(W){const ae=e.getRecordMatcher(W);ae&&e.removeRoute(ae)}function y(){return e.getRoutes().map(W=>W.record)}function g(W){return!!e.getRecordMatcher(W)}function h(W,ae){if(ae=wt({},ae||l.value),typeof W=="string"){const k=Bl(n,W,ae.path),re=e.resolve({path:k.path},ae),Q=r.createHref(k.fullPath);return wt(k,re,{params:d(re.params),hash:vo(k.hash),redirectedFrom:void 0,href:Q})}let ve;if(W.path!=null)ve=wt({},W,{path:Bl(n,W.path,ae.path).path});else{const k=wt({},W.params);for(const re in k)k[re]==null&&delete k[re];ve=wt({},W,{params:f(k)}),ae.params=f(ae.params)}const Te=e.resolve(ve,ae),Fe=W.hash||"";Te.params=c(d(Te.params));const T=D0(i,wt({},W,{hash:T0(Fe),path:Te.path})),R=r.createHref(T);return wt({fullPath:T,hash:Fe,query:i===gd?q0(W.query):W.query||{}},Te,{redirectedFrom:void 0,href:R})}function M(W){return typeof W=="string"?Bl(n,W,l.value.path):wt({},W)}function C(W,ae){if(u!==W)return xs(kt.NAVIGATION_CANCELLED,{from:ae,to:W})}function b(W){return B(W)}function I(W){return b(wt(M(W),{replace:!0}))}function w(W,ae){const ve=W.matched[W.matched.length-1];if(ve&&ve.redirect){const{redirect:Te}=ve;let Fe=typeof Te=="function"?Te(W,ae):Te;return typeof Fe=="string"&&(Fe=Fe.includes("?")||Fe.includes("#")?Fe=M(Fe):{path:Fe},Fe.params={}),wt({query:W.query,hash:W.hash,params:Fe.path!=null?{}:W.params},Fe)}}function B(W,ae){const ve=u=h(W),Te=l.value,Fe=W.state,T=W.force,R=W.replace===!0,k=w(ve,Te);if(k)return B(wt(M(k),{state:typeof k=="object"?wt({},Fe,k.state):Fe,force:T,replace:R}),ae||ve);const re=ve;re.redirectedFrom=ae;let Q;return!T&&I0(i,Te,ve)&&(Q=xs(kt.NAVIGATION_DUPLICATED,{to:re,from:Te}),Pe(Te,Te,!0,!1)),(Q?Promise.resolve(Q):F(re,Te)).catch(ue=>xi(ue)?xi(ue,kt.NAVIGATION_GUARD_REDIRECT)?ue:Ue(ue):$(ue,re,Te)).then(ue=>{if(ue){if(xi(ue,kt.NAVIGATION_GUARD_REDIRECT))return B(wt({replace:R},M(ue.to),{state:typeof ue.to=="object"?wt({},Fe,ue.to.state):Fe,force:T}),ae||re)}else ue=H(re,Te,!0,R,Fe);return D(re,Te,ue),ue})}function v(W,ae){const ve=C(W,ae);return ve?Promise.reject(ve):Promise.resolve()}function S(W){const ae=De.values().next().value;return ae&&typeof ae.runWithContext=="function"?ae.runWithContext(W):W()}function F(W,ae){let ve;const[Te,Fe,T]=K0(W,ae);ve=Vl(Te.reverse(),"beforeRouteLeave",W,ae);for(const k of Te)k.leaveGuards.forEach(re=>{ve.push(er(re,W,ae))});const R=v.bind(null,W,ae);return ve.push(R),ie(ve).then(()=>{ve=[];for(const k of s.list())ve.push(er(k,W,ae));return ve.push(R),ie(ve)}).then(()=>{ve=Vl(Fe,"beforeRouteUpdate",W,ae);for(const k of Fe)k.updateGuards.forEach(re=>{ve.push(er(re,W,ae))});return ve.push(R),ie(ve)}).then(()=>{ve=[];for(const k of T)if(k.beforeEnter)if(Yn(k.beforeEnter))for(const re of k.beforeEnter)ve.push(er(re,W,ae));else ve.push(er(k.beforeEnter,W,ae));return ve.push(R),ie(ve)}).then(()=>(W.matched.forEach(k=>k.enterCallbacks={}),ve=Vl(T,"beforeRouteEnter",W,ae,S),ve.push(R),ie(ve))).then(()=>{ve=[];for(const k of o.list())ve.push(er(k,W,ae));return ve.push(R),ie(ve)}).catch(k=>xi(k,kt.NAVIGATION_CANCELLED)?k:Promise.reject(k))}function D(W,ae,ve){a.list().forEach(Te=>S(()=>Te(W,ae,ve)))}function H(W,ae,ve,Te,Fe){const T=C(W,ae);if(T)return T;const R=ae===Wi,k=as?history.state:{};ve&&(Te||R?r.replace(W.fullPath,wt({scroll:R&&k&&k.scroll},Fe)):r.push(W.fullPath,Fe)),l.value=W,Pe(W,ae,ve,R),Ue()}let ee;function X(){ee||(ee=r.listen((W,ae,ve)=>{if(!ye.listening)return;const Te=h(W),Fe=w(Te,ye.currentRoute.value);if(Fe){B(wt(Fe,{replace:!0,force:!0}),Te).catch(lo);return}u=Te;const T=l.value;as&&H0(md(T.fullPath,ve.delta),ul()),F(Te,T).catch(R=>xi(R,kt.NAVIGATION_ABORTED|kt.NAVIGATION_CANCELLED)?R:xi(R,kt.NAVIGATION_GUARD_REDIRECT)?(B(wt(M(R.to),{force:!0}),Te).then(k=>{xi(k,kt.NAVIGATION_ABORTED|kt.NAVIGATION_DUPLICATED)&&!ve.delta&&ve.type===Bu.pop&&r.go(-1,!1)}).catch(lo),Promise.reject()):(ve.delta&&r.go(-ve.delta,!1),$(R,Te,T))).then(R=>{R=R||H(Te,T,!1),R&&(ve.delta&&!xi(R,kt.NAVIGATION_CANCELLED)?r.go(-ve.delta,!1):ve.type===Bu.pop&&xi(R,kt.NAVIGATION_ABORTED|kt.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),D(Te,T,R)}).catch(lo)}))}let J=Gs(),le=Gs(),L;function $(W,ae,ve){Ue(W);const Te=le.list();return Te.length?Te.forEach(Fe=>Fe(W,ae,ve)):console.error(W),Promise.reject(W)}function ge(){return L&&l.value!==Wi?Promise.resolve():new Promise((W,ae)=>{J.add([W,ae])})}function Ue(W){return L||(L=!W,X(),J.list().forEach(([ae,ve])=>W?ve(W):ae()),J.reset()),W}function Pe(W,ae,ve,Te){const{scrollBehavior:Fe}=t;if(!as||!Fe)return Promise.resolve();const T=!ve&&z0(md(W.fullPath,0))||(Te||!ve)&&history.state&&history.state.scroll||null;return Cs().then(()=>Fe(W,ae,T)).then(R=>R&&V0(R)).catch(R=>$(R,W,ae))}const ke=W=>r.go(W);let Le;const De=new Set,ye={currentRoute:l,listening:!0,addRoute:p,removeRoute:_,clearRoutes:e.clearRoutes,hasRoute:g,getRoutes:y,resolve:h,options:t,push:b,replace:I,go:ke,back:()=>ke(-1),forward:()=>ke(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:le.add,isReady:ge,install(W){W.component("RouterLink",Oa),W.component("RouterView",Em),W.config.globalProperties.$router=ye,Object.defineProperty(W.config.globalProperties,"$route",{enumerable:!0,get:()=>cn(l)}),as&&!Le&&l.value===Wi&&(Le=!0,b(r.location).catch(Te=>{}));const ae={};for(const Te in Wi)Object.defineProperty(ae,Te,{get:()=>l.value[Te],enumerable:!0});W.provide(cl,ye),W.provide(ef,yp(ae)),W.provide(Vu,l);const ve=W.unmount;De.add(W),W.unmount=function(){De.delete(W),De.size<1&&(u=Wi,ee&&ee(),ee=null,l.value=Wi,Le=!1,L=!1),ve()}}};function ie(W){return W.reduce((ae,ve)=>ae.then(()=>S(ve)),Promise.resolve())}return ye}function Ls(){return On(cl)}function tf(t){return On(ef)}function wm(t,e){return function(){return t.apply(e,arguments)}}const{toString:bx}=Object.prototype,{getPrototypeOf:bs}=Object,{iterator:Ao,toStringTag:Tm}=Symbol,Fa=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),xo=(t,e)=>{let n=t;const i=[];for(;n!=null&&n!==Object.prototype;){if(i.indexOf(n)!==-1)return!1;if(i.push(n),Fa(n,e))return!0;n=bs(n)}return!1},yx=(t,e)=>t!=null&&xo(t,e)?t[e]:void 0,nf=(t=>e=>{const n=bx.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Zn=t=>(t=t.toLowerCase(),e=>nf(e)===t),fl=t=>e=>typeof e===t,{isArray:Rr}=Array,ys=fl("undefined");function Ds(t){return t!==null&&!ys(t)&&t.constructor!==null&&!ys(t.constructor)&&yn(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Am=Zn("ArrayBuffer");function Sx(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Am(t.buffer),e}const Mx=fl("string"),yn=fl("function"),Rm=fl("number"),Is=t=>t!==null&&typeof t=="object",Ex=t=>t===!0||t===!1,ga=t=>{if(!Is(t))return!1;const e=bs(t);return(e===null||e===Object.prototype||bs(e)===null)&&!xo(t,Tm)&&!xo(t,Ao)},wx=t=>{if(!Is(t)||Ds(t))return!1;try{return Object.keys(t).length===0&&Object.getPrototypeOf(t)===Object.prototype}catch{return!1}},Tx=Zn("Date"),Ax=Zn("File"),Rx=t=>!!(t&&typeof t.uri<"u"),Cx=t=>t&&typeof t.getParts<"u",Px=Zn("Blob"),Lx=Zn("FileList"),Dx=t=>Is(t)&&yn(t.pipe);function Ix(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Rd=Ix(),Cd=typeof Rd.FormData<"u"?Rd.FormData:void 0,Nx=t=>{if(!t)return!1;if(Cd&&t instanceof Cd)return!0;const e=bs(t);if(!e||e===Object.prototype||!yn(t.append))return!1;const n=nf(t);return n==="formdata"||n==="object"&&yn(t.toString)&&t.toString()==="[object FormData]"},Ux=Zn("URLSearchParams"),[Ox,Fx,Bx,kx]=["ReadableStream","Request","Response","Headers"].map(Zn),Vx=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Ro(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let i,r;if(typeof t!="object"&&(t=[t]),Rr(t))for(i=0,r=t.length;i<r;i++)e.call(null,t[i],i,t);else{if(Ds(t))return;const s=n?Object.getOwnPropertyNames(t):Object.keys(t),o=s.length;let a;for(i=0;i<o;i++)a=s[i],e.call(null,t[a],a,t)}}function Cm(t,e){if(Ds(t))return null;e=e.toLowerCase();const n=Object.keys(t);let i=n.length,r;for(;i-- >0;)if(r=n[i],e===r.toLowerCase())return r;return null}const yr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Pm=t=>!ys(t)&&t!==yr;function Hu(...t){const{caseless:e,skipUndefined:n}=Pm(this)&&this||{},i={},r=(s,o)=>{if(o==="__proto__"||o==="constructor"||o==="prototype")return;const a=e&&typeof o=="string"&&Cm(i,o)||o,l=Fa(i,a)?i[a]:void 0;ga(l)&&ga(s)?i[a]=Hu(l,s):ga(s)?i[a]=Hu({},s):Rr(s)?i[a]=s.slice():(!n||!ys(s))&&(i[a]=s)};for(let s=0,o=t.length;s<o;s++){const a=t[s];if(!a||Ds(a)||(Ro(a,r),typeof a!="object"||Rr(a)))continue;const l=Object.getOwnPropertySymbols(a);for(let u=0;u<l.length;u++){const c=l[u];Jx.call(a,c)&&r(a[c],c)}}return i}const Hx=(t,e,n,{allOwnKeys:i}={})=>(Ro(e,(r,s)=>{n&&yn(r)?Object.defineProperty(t,s,{__proto__:null,value:wm(r,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(t,s,{__proto__:null,value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:i}),t),zx=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Gx=(t,e,n,i)=>{t.prototype=Object.create(e.prototype,i),Object.defineProperty(t.prototype,"constructor",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(t,"super",{__proto__:null,value:e.prototype}),n&&Object.assign(t.prototype,n)},Wx=(t,e,n,i)=>{let r,s,o;const a={};if(e=e||{},t==null)return e;do{for(r=Object.getOwnPropertyNames(t),s=r.length;s-- >0;)o=r[s],(!i||i(o,t,e))&&!a[o]&&(e[o]=t[o],a[o]=!0);t=n!==!1&&bs(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},$x=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const i=t.indexOf(e,n);return i!==-1&&i===n},Xx=t=>{if(!t)return null;if(Rr(t))return t;let e=t.length;if(!Rm(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},qx=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&bs(Uint8Array)),Yx=(t,e)=>{const i=(t&&t[Ao]).call(t);let r;for(;(r=i.next())&&!r.done;){const s=r.value;e.call(t,s[0],s[1])}},Kx=(t,e)=>{let n;const i=[];for(;(n=t.exec(e))!==null;)i.push(n);return i},jx=Zn("HTMLFormElement"),Zx=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,i,r){return i.toUpperCase()+r}),{propertyIsEnumerable:Jx}=Object.prototype,Qx=Zn("RegExp"),Lm=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),i={};Ro(n,(r,s)=>{let o;(o=e(r,s,t))!==!1&&(i[s]=o||r)}),Object.defineProperties(t,i)},eb=t=>{Lm(t,(e,n)=>{if(yn(t)&&["arguments","caller","callee"].includes(n))return!1;const i=t[n];if(yn(i)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},tb=(t,e)=>{const n={},i=r=>{r.forEach(s=>{n[s]=!0})};return Rr(t)?i(t):i(String(t).split(e)),n},nb=()=>{},ib=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e;function rb(t){return!!(t&&yn(t.append)&&t[Tm]==="FormData"&&t[Ao])}const sb=t=>{const e=new WeakSet,n=i=>{if(Is(i)){if(e.has(i))return;if(Ds(i))return i;if(!("toJSON"in i)){e.add(i);const r=Rr(i)?[]:{};return Ro(i,(s,o)=>{const a=n(s);!ys(a)&&(r[o]=a)}),e.delete(i),r}}return i};return n(t)},ob=Zn("AsyncFunction"),ab=t=>t&&(Is(t)||yn(t))&&yn(t.then)&&yn(t.catch),Dm=((t,e)=>t?setImmediate:e?((n,i)=>(yr.addEventListener("message",({source:r,data:s})=>{r===yr&&s===n&&i.length&&i.shift()()},!1),r=>{i.push(r),yr.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",yn(yr.postMessage)),lb=typeof queueMicrotask<"u"?queueMicrotask.bind(yr):typeof process<"u"&&process.nextTick||Dm,Im=t=>t!=null&&yn(t[Ao]),ub=t=>t!=null&&xo(t,Ao)&&Im(t),te={isArray:Rr,isArrayBuffer:Am,isBuffer:Ds,isFormData:Nx,isArrayBufferView:Sx,isString:Mx,isNumber:Rm,isBoolean:Ex,isObject:Is,isPlainObject:ga,isEmptyObject:wx,isReadableStream:Ox,isRequest:Fx,isResponse:Bx,isHeaders:kx,isUndefined:ys,isDate:Tx,isFile:Ax,isReactNativeBlob:Rx,isReactNative:Cx,isBlob:Px,isRegExp:Qx,isFunction:yn,isStream:Dx,isURLSearchParams:Ux,isTypedArray:qx,isFileList:Lx,forEach:Ro,merge:Hu,extend:Hx,trim:Vx,stripBOM:zx,inherits:Gx,toFlatObject:Wx,kindOf:nf,kindOfTest:Zn,endsWith:$x,toArray:Xx,forEachEntry:Yx,matchAll:Kx,isHTMLForm:jx,hasOwnProperty:Fa,hasOwnProp:Fa,hasOwnInPrototypeChain:xo,getSafeProp:yx,reduceDescriptors:Lm,freezeMethods:eb,toObjectSet:tb,toCamelCase:Zx,noop:nb,toFiniteNumber:ib,findKey:Cm,global:yr,isContextDefined:Pm,isSpecCompliantForm:rb,toJSONObject:sb,isAsyncFn:ob,isThenable:ab,setImmediate:Dm,asap:lb,isIterable:Im,isSafeIterable:ub},cb=te.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),fb=t=>{const e={};let n,i,r;return t&&t.split(`
`).forEach(function(o){r=o.indexOf(":"),n=o.substring(0,r).trim().toLowerCase(),i=o.substring(r+1).trim(),!(!n||e[n]&&cb[n])&&(n==="set-cookie"?e[n]?e[n].push(i):e[n]=[i]:e[n]=e[n]?e[n]+", "+i:i)}),e};function db(t){let e=0,n=t.length;for(;e<n;){const i=t.charCodeAt(e);if(i!==9&&i!==32)break;e+=1}for(;n>e;){const i=t.charCodeAt(n-1);if(i!==9&&i!==32)break;n-=1}return e===0&&n===t.length?t:t.slice(e,n)}const hb=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),pb=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function rf(t,e){return te.isArray(t)?t.map(n=>rf(n,e)):db(String(t).replace(e,""))}const mb=t=>rf(t,hb),gb=t=>rf(t,pb);function Nm(t){const e=Object.create(null);return te.forEach(t.toJSON(),(n,i)=>{e[i]=gb(n)}),e}const Pd=Symbol("internals");function Ws(t){return t&&String(t).trim().toLowerCase()}function _a(t){return t===!1||t==null?t:te.isArray(t)?t.map(_a):mb(String(t))}function _b(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=n.exec(t);)e[i[1]]=i[2];return e}const vb=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function Hl(t,e,n,i,r){if(te.isFunction(i))return i.call(this,e,n);if(r&&(e=n),!!te.isString(e)){if(te.isString(i))return e.indexOf(i)!==-1;if(te.isRegExp(i))return i.test(e)}}function xb(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,i)=>n.toUpperCase()+i)}function bb(t,e){const n=te.toCamelCase(" "+e);["get","set","has"].forEach(i=>{Object.defineProperty(t,i+n,{__proto__:null,value:function(r,s,o){return this[i].call(this,e,r,s,o)},configurable:!0})})}let dn=class{constructor(e){e&&this.set(e)}set(e,n,i){const r=this;function s(a,l,u){const c=Ws(l);if(!c)return;const f=te.findKey(r,c);(!f||r[f]===void 0||u===!0||u===void 0&&r[f]!==!1)&&(r[f||l]=_a(a))}const o=(a,l)=>te.forEach(a,(u,c)=>s(u,c,l));if(te.isPlainObject(e)||e instanceof this.constructor)o(e,n);else if(te.isString(e)&&(e=e.trim())&&!vb(e))o(fb(e),n);else if(te.isObject(e)&&te.isSafeIterable(e)){let a=Object.create(null),l,u;for(const c of e){if(!te.isArray(c))throw new TypeError("Object iterator must return a key-value pair");u=c[0],te.hasOwnProp(a,u)?(l=a[u],a[u]=te.isArray(l)?[...l,c[1]]:[l,c[1]]):a[u]=c[1]}o(a,n)}else e!=null&&s(n,e,i);return this}get(e,n){if(e=Ws(e),e){const i=te.findKey(this,e);if(i){const r=this[i];if(!n)return r;if(n===!0)return _b(r);if(te.isFunction(n))return n.call(this,r,i);if(te.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Ws(e),e){const i=te.findKey(this,e);return!!(i&&this[i]!==void 0&&(!n||Hl(this,this[i],i,n)))}return!1}delete(e,n){const i=this;let r=!1;function s(o){if(o=Ws(o),o){const a=te.findKey(i,o);a&&(!n||Hl(i,i[a],a,n))&&(delete i[a],r=!0)}}return te.isArray(e)?e.forEach(s):s(e),r}clear(e){const n=Object.keys(this);let i=n.length,r=!1;for(;i--;){const s=n[i];(!e||Hl(this,this[s],s,e,!0))&&(delete this[s],r=!0)}return r}normalize(e){const n=this,i={};return te.forEach(this,(r,s)=>{const o=te.findKey(i,s);if(o){n[o]=_a(r),delete n[s];return}const a=e?xb(s):String(s).trim();a!==s&&delete n[s],n[a]=_a(r),i[a]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return te.forEach(this,(i,r)=>{i!=null&&i!==!1&&(n[r]=e&&te.isArray(i)?i.join(", "):i)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const i=new this(e);return n.forEach(r=>i.set(r)),i}static accessor(e){const i=(this[Pd]=this[Pd]={accessors:{}}).accessors,r=this.prototype;function s(o){const a=Ws(o);i[a]||(bb(r,o),i[a]=!0)}return te.isArray(e)?e.forEach(s):s(e),this}};dn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);te.reduceDescriptors(dn.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(i){this[n]=i}}});te.freezeMethods(dn);const yb="[REDACTED ****]";function Sb(t){if(te.hasOwnProp(t,"toJSON"))return!0;let e=Object.getPrototypeOf(t);for(;e&&e!==Object.prototype;){if(te.hasOwnProp(e,"toJSON"))return!0;e=Object.getPrototypeOf(e)}return!1}function Mb(t,e){const n=new Set(e.map(s=>String(s).toLowerCase())),i=[],r=s=>{if(s===null||typeof s!="object"||te.isBuffer(s))return s;if(i.indexOf(s)!==-1)return;s instanceof dn&&(s=s.toJSON()),i.push(s);let o;if(te.isArray(s))o=[],s.forEach((a,l)=>{const u=r(a);te.isUndefined(u)||(o[l]=u)});else{if(!te.isPlainObject(s)&&Sb(s))return i.pop(),s;o=Object.create(null);for(const[a,l]of Object.entries(s)){const u=n.has(a.toLowerCase())?yb:r(l);te.isUndefined(u)||(o[a]=u)}}return i.pop(),o};return r(t)}let qe=class Um extends Error{static from(e,n,i,r,s,o){const a=new Um(e.message,n||e.code,i,r,s);return Object.defineProperty(a,"cause",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),a.name=e.name,e.status!=null&&a.status==null&&(a.status=e.status),o&&Object.assign(a,o),a}constructor(e,n,i,r,s){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),i&&(this.config=i),r&&(this.request=r),s&&(this.response=s,this.status=s.status)}toJSON(){const e=this.config,n=e&&te.hasOwnProp(e,"redact")?e.redact:void 0,i=te.isArray(n)&&n.length>0?Mb(e,n):te.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:i,code:this.code,status:this.status}}};qe.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";qe.ERR_BAD_OPTION="ERR_BAD_OPTION";qe.ECONNABORTED="ECONNABORTED";qe.ETIMEDOUT="ETIMEDOUT";qe.ECONNREFUSED="ECONNREFUSED";qe.ERR_NETWORK="ERR_NETWORK";qe.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";qe.ERR_DEPRECATED="ERR_DEPRECATED";qe.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";qe.ERR_BAD_REQUEST="ERR_BAD_REQUEST";qe.ERR_CANCELED="ERR_CANCELED";qe.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";qe.ERR_INVALID_URL="ERR_INVALID_URL";qe.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const Eb=null,Om=100;function zu(t){return te.isPlainObject(t)||te.isArray(t)}function Fm(t){return te.endsWith(t,"[]")?t.slice(0,-2):t}function zl(t,e,n){return t?t.concat(e).map(function(r,s){return r=Fm(r),!n&&s?"["+r+"]":r}).join(n?".":""):e}function wb(t){return te.isArray(t)&&!t.some(zu)}const Tb=te.toFlatObject(te,{},null,function(e){return/^is[A-Z]/.test(e)});function dl(t,e,n){if(!te.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=te.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(M,C){return!te.isUndefined(C[M])});const i=n.metaTokens,r=n.visitor||_,s=n.dots,o=n.indexes,a=n.Blob||typeof Blob<"u"&&Blob,l=n.maxDepth===void 0?Om:n.maxDepth,u=a&&te.isSpecCompliantForm(e),c=[];if(!te.isFunction(r))throw new TypeError("visitor must be a function");function f(h){if(h===null)return"";if(te.isDate(h))return h.toISOString();if(te.isBoolean(h))return h.toString();if(!u&&te.isBlob(h))throw new qe("Blob is not supported. Use a Buffer instead.");if(te.isArrayBuffer(h)||te.isTypedArray(h)){if(u&&typeof a=="function")return new a([h]);if(typeof Buffer<"u")return Buffer.from(h);throw new qe("Blob is not supported. Use a Buffer instead.",qe.ERR_NOT_SUPPORT)}return h}function d(h){if(h>l)throw new qe("Object is too deeply nested ("+h+" levels). Max depth: "+l,qe.ERR_FORM_DATA_DEPTH_EXCEEDED)}function p(h,M){if(l===1/0)return JSON.stringify(h);const C=[];return JSON.stringify(h,function(I,w){if(!te.isObject(w))return w;for(;C.length&&C[C.length-1]!==this;)C.pop();return C.push(w),d(M+C.length-1),w})}function _(h,M,C){let b=h;if(te.isReactNative(e)&&te.isReactNativeBlob(h))return e.append(zl(C,M,s),f(h)),!1;if(h&&!C&&typeof h=="object"){if(te.endsWith(M,"{}"))M=i?M:M.slice(0,-2),h=p(h,1);else if(te.isArray(h)&&wb(h)||(te.isFileList(h)||te.endsWith(M,"[]"))&&(b=te.toArray(h)))return M=Fm(M),b.forEach(function(w,B){!(te.isUndefined(w)||w===null)&&e.append(o===!0?zl([M],B,s):o===null?M:M+"[]",f(w))}),!1}return zu(h)?!0:(e.append(zl(C,M,s),f(h)),!1)}const y=Object.assign(Tb,{defaultVisitor:_,convertValue:f,isVisitable:zu});function g(h,M,C=0){if(!te.isUndefined(h)){if(d(C),c.indexOf(h)!==-1)throw new Error("Circular reference detected in "+M.join("."));c.push(h),te.forEach(h,function(I,w){(!(te.isUndefined(I)||I===null)&&r.call(e,I,te.isString(w)?w.trim():w,M,y))===!0&&g(I,M?M.concat(w):[w],C+1)}),c.pop()}}if(!te.isObject(t))throw new TypeError("data must be an object");return g(t),e}function Ld(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(t).replace(/[!'()~]|%20/g,function(i){return e[i]})}function sf(t,e){this._pairs=[],t&&dl(t,this,e)}const Bm=sf.prototype;Bm.append=function(e,n){this._pairs.push([e,n])};Bm.toString=function(e){const n=e?i=>e.call(this,i,Ld):Ld;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function Ab(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function km(t,e,n){if(!e)return t;t=t||"";const i=te.isFunction(n)?{serialize:n}:n,r=te.getSafeProp(i,"encode")||Ab,s=te.getSafeProp(i,"serialize");let o;if(s?o=s(e,i):o=te.isURLSearchParams(e)?e.toString():new sf(e,i).toString(r),o){const a=t.indexOf("#");a!==-1&&(t=t.slice(0,a)),t+=(t.indexOf("?")===-1?"?":"&")+o}return t}class Dd{constructor(){this.handlers=[]}use(e,n,i){return this.handlers.push({fulfilled:e,rejected:n,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){te.forEach(this.handlers,function(i){i!==null&&e(i)})}}const of={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},Rb=typeof URLSearchParams<"u"?URLSearchParams:sf,Cb=typeof FormData<"u"?FormData:null,Pb=typeof Blob<"u"?Blob:null,Lb={isBrowser:!0,classes:{URLSearchParams:Rb,FormData:Cb,Blob:Pb},protocols:["http","https","file","blob","url","data"]},af=typeof window<"u"&&typeof document<"u",Gu=typeof navigator=="object"&&navigator||void 0,Db=af&&(!Gu||["ReactNative","NativeScript","NS"].indexOf(Gu.product)<0),Ib=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Nb=af&&window.location.href||"http://localhost",Ub=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:af,hasStandardBrowserEnv:Db,hasStandardBrowserWebWorkerEnv:Ib,navigator:Gu,origin:Nb},Symbol.toStringTag,{value:"Module"})),nn={...Ub,...Lb};function Ob(t,e){return dl(t,new nn.classes.URLSearchParams,{visitor:function(n,i,r,s){return nn.isNode&&te.isBuffer(n)?(this.append(i,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)},...e})}const Id=Om;function Vm(t){if(t>Id)throw new qe("FormData field is too deeply nested ("+t+" levels). Max depth: "+Id,qe.ERR_FORM_DATA_DEPTH_EXCEEDED)}function Fb(t){const e=[],n=/\w+|\[(\w*)]/g;let i;for(;(i=n.exec(t))!==null;)Vm(e.length),e.push(i[0]==="[]"?"":i[1]||i[0]);return e}function Bb(t){const e={},n=Object.keys(t);let i;const r=n.length;let s;for(i=0;i<r;i++)s=n[i],e[s]=t[s];return e}function Hm(t){function e(n,i,r,s){Vm(s);let o=n[s++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),l=s>=n.length;return o=!o&&te.isArray(r)?r.length:o,l?(te.hasOwnProp(r,o)?r[o]=te.isArray(r[o])?r[o].concat(i):[r[o],i]:r[o]=i,!a):((!te.hasOwnProp(r,o)||!te.isObject(r[o]))&&(r[o]=[]),e(n,i,r[o],s)&&te.isArray(r[o])&&(r[o]=Bb(r[o])),!a)}if(te.isFormData(t)&&te.isFunction(t.entries)){const n={};return te.forEachEntry(t,(i,r)=>{e(Fb(i),r,n,0)}),n}return null}const Gr=(t,e)=>t!=null&&te.hasOwnProp(t,e)?t[e]:void 0;function kb(t,e,n){if(te.isString(t))try{return(e||JSON.parse)(t),te.trim(t)}catch(i){if(i.name!=="SyntaxError")throw i}return(n||JSON.stringify)(t)}const Co={transitional:of,adapter:["xhr","http","fetch"],transformRequest:[function(e,n){const i=n.getContentType()||"",r=i.indexOf("application/json")>-1,s=te.isObject(e);if(s&&te.isHTMLForm(e)&&(e=new FormData(e)),te.isFormData(e))return r?JSON.stringify(Hm(e)):e;if(te.isArrayBuffer(e)||te.isBuffer(e)||te.isStream(e)||te.isFile(e)||te.isBlob(e)||te.isReadableStream(e))return e;if(te.isArrayBufferView(e))return e.buffer;if(te.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(s){const l=Gr(this,"formSerializer");if(i.indexOf("application/x-www-form-urlencoded")>-1)return Ob(e,l).toString();if((a=te.isFileList(e))||i.indexOf("multipart/form-data")>-1){const u=Gr(this,"env"),c=u&&u.FormData;return dl(a?{"files[]":e}:e,c&&new c,l)}}return s||r?(n.setContentType("application/json",!1),kb(e)):e}],transformResponse:[function(e){const n=Gr(this,"transitional")||Co.transitional,i=n&&n.forcedJSONParsing,r=Gr(this,"responseType"),s=r==="json";if(te.isResponse(e)||te.isReadableStream(e))return e;if(e&&te.isString(e)&&(i&&!r||s)){const a=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(e,Gr(this,"parseReviver"))}catch(l){if(a)throw l.name==="SyntaxError"?qe.from(l,qe.ERR_BAD_RESPONSE,this,null,Gr(this,"response")):l}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:nn.classes.FormData,Blob:nn.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};te.forEach(["delete","get","head","post","put","patch","query"],t=>{Co.headers[t]={}});function Gl(t,e){const n=this||Co,i=e||n,r=dn.from(i.headers);let s=i.data;return te.forEach(t,function(a){s=a.call(n,s,r.normalize(),e?e.status:void 0)}),r.normalize(),s}function zm(t){return!!(t&&t.__CANCEL__)}let Po=class extends qe{constructor(e,n,i){super(e??"canceled",qe.ERR_CANCELED,n,i),this.name="CanceledError",this.__CANCEL__=!0}};function Gm(t,e,n){const i=n.config.validateStatus;!n.status||!i||i(n.status)?t(n):e(new qe("Request failed with status code "+n.status,n.status>=400&&n.status<500?qe.ERR_BAD_REQUEST:qe.ERR_BAD_RESPONSE,n.config,n.request,n))}function Vb(t){const e=/^([-+\w]{1,25}):(?:\/\/)?/.exec(t);return e&&e[1]||""}function Hb(t,e){t=t||10;const n=new Array(t),i=new Array(t);let r=0,s=0,o;return e=e!==void 0?e:1e3,function(l){const u=Date.now(),c=i[s];o||(o=u),n[r]=l,i[r]=u;let f=s,d=0;for(;f!==r;)d+=n[f++],f=f%t;if(r=(r+1)%t,r===s&&(s=(s+1)%t),u-o<e)return;const p=c&&u-c;return p?Math.round(d*1e3/p):void 0}}function zb(t,e){let n=0,i=1e3/e,r,s;const o=(u,c=Date.now())=>{n=c,r=null,s&&(clearTimeout(s),s=null),t(...u)};return[(...u)=>{const c=Date.now(),f=c-n;f>=i?o(u,c):(r=u,s||(s=setTimeout(()=>{s=null,o(r)},i-f)))},()=>r&&o(r)]}const Ba=(t,e,n=3)=>{let i=0;const r=Hb(50,250);return zb(s=>{if(!s||typeof s.loaded!="number")return;const o=s.loaded,a=s.lengthComputable?s.total:void 0,l=a!=null?Math.min(o,a):o,u=Math.max(0,l-i),c=r(u);i=Math.max(i,l);const f={loaded:l,total:a,progress:a?l/a:void 0,bytes:u,rate:c||void 0,estimated:c&&a?(a-l)/c:void 0,event:s,lengthComputable:a!=null,[e?"download":"upload"]:!0};t(f)},n)},Nd=(t,e)=>{const n=t!=null;return[i=>e[0]({lengthComputable:n,total:t,loaded:i}),e[1]]},Ud=t=>(...e)=>te.asap(()=>t(...e)),Gb=nn.hasStandardBrowserEnv?((t,e)=>n=>(n=new URL(n,nn.origin),t.protocol===n.protocol&&t.host===n.host&&(e||t.port===n.port)))(new URL(nn.origin),nn.navigator&&/(msie|trident)/i.test(nn.navigator.userAgent)):()=>!0,Wb=nn.hasStandardBrowserEnv?{write(t,e,n,i,r,s,o){if(typeof document>"u")return;const a=[`${t}=${encodeURIComponent(e)}`];te.isNumber(n)&&a.push(`expires=${new Date(n).toUTCString()}`),te.isString(i)&&a.push(`path=${i}`),te.isString(r)&&a.push(`domain=${r}`),s===!0&&a.push("secure"),te.isString(o)&&a.push(`SameSite=${o}`),document.cookie=a.join("; ")},read(t){if(typeof document>"u")return null;const e=document.cookie.split(";");for(let n=0;n<e.length;n++){const i=e[n].replace(/^\s+/,""),r=i.indexOf("=");if(r!==-1&&i.slice(0,r)===t)try{return decodeURIComponent(i.slice(r+1))}catch{return i.slice(r+1)}}return null},remove(t){this.write(t,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function $b(t){return typeof t!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function Xb(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}const qb=/^https?:(?!\/\/)/i,Yb=/[\t\n\r]/g;function Kb(t){let e=0;for(;e<t.length&&t.charCodeAt(e)<=32;)e++;return t.slice(e)}function jb(t){return Kb(t).replace(Yb,"")}function Od(t,e){if(typeof t=="string"&&qb.test(jb(t)))throw new qe('Invalid URL: missing "//" after protocol',qe.ERR_INVALID_URL,e)}function Wm(t,e,n,i){Od(e,i);let r=!$b(e);return t&&(r||n===!1)?(Od(t,i),Xb(t,e)):e}const Fd=t=>t instanceof dn?{...t}:t;function Cr(t,e){t=t||{},e=e||{};const n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function i(c,f,d,p){return te.isPlainObject(c)&&te.isPlainObject(f)?te.merge.call({caseless:p},c,f):te.isPlainObject(f)?te.merge({},f):te.isArray(f)?f.slice():f}function r(c,f,d,p){if(te.isUndefined(f)){if(!te.isUndefined(c))return i(void 0,c,d,p)}else return i(c,f,d,p)}function s(c,f){if(!te.isUndefined(f))return i(void 0,f)}function o(c,f){if(te.isUndefined(f)){if(!te.isUndefined(c))return i(void 0,c)}else return i(void 0,f)}function a(c){const f=te.hasOwnProp(e,"transitional")?e.transitional:void 0;if(!te.isUndefined(f))if(te.isPlainObject(f)){if(te.hasOwnProp(f,c))return f[c]}else return;const d=te.hasOwnProp(t,"transitional")?t.transitional:void 0;if(te.isPlainObject(d)&&te.hasOwnProp(d,c))return d[c]}function l(c,f,d){if(te.hasOwnProp(e,d))return i(c,f);if(te.hasOwnProp(t,d))return i(void 0,c)}const u={url:s,method:s,data:s,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:l,headers:(c,f,d)=>r(Fd(c),Fd(f),d,!0)};return te.forEach(Object.keys({...t,...e}),function(f){if(f==="__proto__"||f==="constructor"||f==="prototype")return;const d=te.hasOwnProp(u,f)?u[f]:r,p=te.hasOwnProp(t,f)?t[f]:void 0,_=te.hasOwnProp(e,f)?e[f]:void 0,y=d(p,_,f);te.isUndefined(y)&&d!==l||(n[f]=y)}),te.hasOwnProp(e,"validateStatus")&&te.isUndefined(e.validateStatus)&&a("validateStatusUndefinedResolves")===!1&&(te.hasOwnProp(t,"validateStatus")?n.validateStatus=i(void 0,t.validateStatus):delete n.validateStatus),n}const Zb=["content-type","content-length"];function Jb(t,e,n){if(n!=="content-only"){t.set(e);return}Object.entries(e||{}).forEach(([i,r])=>{Zb.includes(i.toLowerCase())&&t.set(i,r)})}const Qb=t=>encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi,(e,n)=>String.fromCharCode(parseInt(n,16)));function $m(t){const e=Cr({},t),n=d=>te.hasOwnProp(e,d)?e[d]:void 0,i=n("data");let r=n("withXSRFToken");const s=n("xsrfHeaderName"),o=n("xsrfCookieName");let a=n("headers");const l=n("auth"),u=n("baseURL"),c=n("allowAbsoluteUrls"),f=n("url");if(e.headers=a=dn.from(a),e.url=km(Wm(u,f,c,e),n("params"),n("paramsSerializer")),l){const d=te.getSafeProp(l,"username")||"",p=te.getSafeProp(l,"password")||"";try{a.set("Authorization","Basic "+btoa(d+":"+(p?Qb(p):"")))}catch(_){throw qe.from(_,qe.ERR_BAD_OPTION_VALUE,t)}}if(te.isFormData(i)&&(nn.hasStandardBrowserEnv||nn.hasStandardBrowserWebWorkerEnv||te.isReactNative(i)?a.setContentType(void 0):te.isFunction(i.getHeaders)&&Jb(a,i.getHeaders(),n("formDataHeaderPolicy"))),nn.hasStandardBrowserEnv&&(te.isFunction(r)&&(r=r(e)),r===!0||r==null&&Gb(e.url))){const p=s&&o&&Wb.read(o);p&&a.set(s,p)}return e}const ey=typeof XMLHttpRequest<"u",ty=ey&&function(t){return new Promise(function(n,i){const r=$m(t);let s=r.data;const o=dn.from(r.headers).normalize();let{responseType:a,onUploadProgress:l,onDownloadProgress:u}=r,c,f,d,p,_;function y(){p&&p(),_&&_(),r.cancelToken&&r.cancelToken.unsubscribe(c),r.signal&&r.signal.removeEventListener("abort",c)}let g=new XMLHttpRequest;g.open(r.method.toUpperCase(),r.url,!0),g.timeout=r.timeout;function h(){if(!g)return;const C=dn.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),I={data:!a||a==="text"||a==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:C,config:t,request:g};Gm(function(B){n(B),y()},function(B){i(B),y()},I),g=null}"onloadend"in g?g.onloadend=h:g.onreadystatechange=function(){!g||g.readyState!==4||g.status===0&&!(g.responseURL&&g.responseURL.startsWith("file:"))||setTimeout(h)},g.onabort=function(){g&&(i(new qe("Request aborted",qe.ECONNABORTED,t,g)),y(),g=null)},g.onerror=function(b){const I=b&&b.message?b.message:"Network Error",w=new qe(I,qe.ERR_NETWORK,t,g);w.event=b||null,i(w),y(),g=null},g.ontimeout=function(){let b=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const I=r.transitional||of;r.timeoutErrorMessage&&(b=r.timeoutErrorMessage),i(new qe(b,I.clarifyTimeoutError?qe.ETIMEDOUT:qe.ECONNABORTED,t,g)),y(),g=null},s===void 0&&o.setContentType(null),"setRequestHeader"in g&&te.forEach(Nm(o),function(b,I){g.setRequestHeader(I,b)}),te.isUndefined(r.withCredentials)||(g.withCredentials=!!r.withCredentials),a&&a!=="json"&&(g.responseType=r.responseType),u&&([d,_]=Ba(u,!0),g.addEventListener("progress",d)),l&&g.upload&&([f,p]=Ba(l),g.upload.addEventListener("progress",f),g.upload.addEventListener("loadend",p)),(r.cancelToken||r.signal)&&(c=C=>{g&&(i(!C||C.type?new Po(null,t,g):C),g.abort(),y(),g=null)},r.cancelToken&&r.cancelToken.subscribe(c),r.signal&&(r.signal.aborted?c():r.signal.addEventListener("abort",c)));const M=Vb(r.url);if(M&&!nn.protocols.includes(M)){i(new qe("Unsupported protocol "+M+":",qe.ERR_BAD_REQUEST,t)),y();return}g.send(s||null)})},ny=(t,e)=>{if(t=t?t.filter(Boolean):[],!e&&!t.length)return;const n=new AbortController;let i=!1;const r=function(l){if(!i){i=!0,o();const u=l instanceof Error?l:this.reason;n.abort(u instanceof qe?u:new Po(u instanceof Error?u.message:u))}};let s=e&&setTimeout(()=>{s=null,r(new qe(`timeout of ${e}ms exceeded`,qe.ETIMEDOUT))},e);const o=()=>{t&&(s&&clearTimeout(s),s=null,t.forEach(l=>{l.unsubscribe?l.unsubscribe(r):l.removeEventListener("abort",r)}),t=null)};t.forEach(l=>l.addEventListener("abort",r,{once:!0}));const{signal:a}=n;return a.unsubscribe=()=>te.asap(o),a},iy=function*(t,e){let n=t.byteLength;if(n<e){yield t;return}let i=0,r;for(;i<n;)r=i+e,yield t.slice(i,r),i=r},ry=async function*(t,e){for await(const n of sy(t))yield*iy(n,e)},sy=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:n,value:i}=await e.read();if(n)break;yield i}}finally{await e.cancel()}},Bd=(t,e,n,i)=>{const r=ry(t,e);let s=0,o,a=l=>{o||(o=!0,i&&i(l))};return new ReadableStream({async pull(l){try{const{done:u,value:c}=await r.next();if(u){a(),l.close();return}let f=c.byteLength;if(n){let d=s+=f;n(d)}l.enqueue(new Uint8Array(c))}catch(u){throw a(u),u}},cancel(l){return a(l),r.return()}},{highWaterMark:2})},ka=t=>t>=48&&t<=57||t>=65&&t<=70||t>=97&&t<=102,oy=(t,e,n)=>e+2<n&&ka(t.charCodeAt(e+1))&&ka(t.charCodeAt(e+2));function ay(t){if(!t||typeof t!="string"||!t.startsWith("data:"))return 0;const e=t.indexOf(",");if(e<0)return 0;const n=t.slice(5,e),i=t.slice(e+1);if(/;base64/i.test(n)){let o=i.length;const a=i.length;for(let p=0;p<a;p++)if(i.charCodeAt(p)===37&&p+2<a){const _=i.charCodeAt(p+1),y=i.charCodeAt(p+2);ka(_)&&ka(y)&&(o-=2,p+=2)}let l=0,u=a-1;const c=p=>p>=2&&i.charCodeAt(p-2)===37&&i.charCodeAt(p-1)===51&&(i.charCodeAt(p)===68||i.charCodeAt(p)===100);u>=0&&(i.charCodeAt(u)===61?(l++,u--):c(u)&&(l++,u-=3)),l===1&&u>=0&&(i.charCodeAt(u)===61||c(u))&&l++;const d=Math.floor(o/4)*3-(l||0);return d>0?d:0}let s=0;for(let o=0,a=i.length;o<a;o++){const l=i.charCodeAt(o);if(l===37&&oy(i,o,a))s+=1,o+=2;else if(l<128)s+=1;else if(l<2048)s+=2;else if(l>=55296&&l<=56319&&o+1<a){const u=i.charCodeAt(o+1);u>=56320&&u<=57343?(s+=4,o++):s+=3}else s+=3}return s}const lf="1.18.1",kd=64*1024,{isFunction:zo}=te,ly=t=>encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi,(e,n)=>String.fromCharCode(parseInt(n,16))),Vd=t=>{if(!te.isString(t))return t;try{return decodeURIComponent(t)}catch{return t}},Hd=(t,...e)=>{try{return!!t(...e)}catch{return!1}},uy=t=>{const e=t.indexOf("://");let n=t;return e!==-1&&(n=n.slice(e+3)),n.includes("@")||n.includes(":")},cy=t=>{const e=te.global!==void 0&&te.global!==null?te.global:globalThis,{ReadableStream:n,TextEncoder:i}=e;t=te.merge.call({skipUndefined:!0},{Request:e.Request,Response:e.Response},t);const{fetch:r,Request:s,Response:o}=t,a=r?zo(r):typeof fetch=="function",l=zo(s),u=zo(o);if(!a)return!1;const c=a&&zo(n),f=a&&(typeof i=="function"?(h=>M=>h.encode(M))(new i):async h=>new Uint8Array(await new s(h).arrayBuffer())),d=l&&c&&Hd(()=>{let h=!1;const M=new s(nn.origin,{body:new n,method:"POST",get duplex(){return h=!0,"half"}}),C=M.headers.has("Content-Type");return M.body!=null&&M.body.cancel(),h&&!C}),p=u&&c&&Hd(()=>te.isReadableStream(new o("").body)),_={stream:p&&(h=>h.body)};a&&["text","arrayBuffer","blob","formData","stream"].forEach(h=>{!_[h]&&(_[h]=(M,C)=>{let b=M&&M[h];if(b)return b.call(M);throw new qe(`Response type '${h}' is not supported`,qe.ERR_NOT_SUPPORT,C)})});const y=async h=>{if(h==null)return 0;if(te.isBlob(h))return h.size;if(te.isSpecCompliantForm(h))return(await new s(nn.origin,{method:"POST",body:h}).arrayBuffer()).byteLength;if(te.isArrayBufferView(h)||te.isArrayBuffer(h))return h.byteLength;if(te.isURLSearchParams(h)&&(h=h+""),te.isString(h))return(await f(h)).byteLength},g=async(h,M)=>{const C=te.toFiniteNumber(h.getContentLength());return C??y(M)};return async h=>{let{url:M,method:C,data:b,signal:I,cancelToken:w,timeout:B,onDownloadProgress:v,onUploadProgress:S,responseType:F,headers:D,withCredentials:H="same-origin",fetchOptions:ee,maxContentLength:X,maxBodyLength:J}=$m(h);const le=te.isNumber(X)&&X>-1,L=te.isNumber(J)&&J>-1,$=ie=>te.hasOwnProp(h,ie)?h[ie]:void 0;let ge=r||fetch;F=F?(F+"").toLowerCase():"text";let Ue=ny([I,w&&w.toAbortSignal()],B),Pe=null;const ke=Ue&&Ue.unsubscribe&&(()=>{Ue.unsubscribe()});let Le,De=null;const ye=()=>new qe("Request body larger than maxBodyLength limit",qe.ERR_BAD_REQUEST,h,Pe);try{let ie;const W=$("auth");if(W){const Q=te.getSafeProp(W,"username")||"",ue=te.getSafeProp(W,"password")||"";ie={username:Q,password:ue}}if(uy(M)){const Q=new URL(M,nn.origin);if(!ie&&(Q.username||Q.password)){const ue=Vd(Q.username),Ae=Vd(Q.password);ie={username:ue,password:Ae}}(Q.username||Q.password)&&(Q.username="",Q.password="",M=Q.href)}if(ie&&(D.delete("authorization"),D.set("Authorization","Basic "+btoa(ly((ie.username||"")+":"+(ie.password||""))))),le&&typeof M=="string"&&M.startsWith("data:")&&ay(M)>X)throw new qe("maxContentLength size of "+X+" exceeded",qe.ERR_BAD_RESPONSE,h,Pe);if(L&&C!=="get"&&C!=="head"){const Q=await y(b);if(typeof Q=="number"&&isFinite(Q)&&(Le=Q,Q>J))throw ye()}const ae=L&&(te.isReadableStream(b)||te.isStream(b)),ve=(Q,ue,Ae)=>Bd(Q,kd,Ee=>{if(L&&Ee>J)throw De=ye();ue&&ue(Ee)},Ae);if(d&&C!=="get"&&C!=="head"&&(S||ae)){if(Le=Le??await g(D,b),Le!==0||ae){let Q=new s(M,{method:"POST",body:b,duplex:"half"}),ue;if(te.isFormData(b)&&(ue=Q.headers.get("content-type"))&&D.setContentType(ue),Q.body){const[Ae,Ee]=S&&Nd(Le,Ba(Ud(S)))||[];b=ve(Q.body,Ae,Ee)}}}else if(ae&&!l&&c&&C!=="get"&&C!=="head")b=ve(b);else if(ae&&l&&!d&&C!=="get"&&C!=="head")throw new qe("Stream request bodies are not supported by the current fetch implementation",qe.ERR_NOT_SUPPORT,h,Pe);te.isString(H)||(H=H?"include":"omit");const Te=l&&"credentials"in s.prototype;if(te.isFormData(b)){const Q=D.getContentType();Q&&/^multipart\/form-data/i.test(Q)&&!/boundary=/i.test(Q)&&D.delete("content-type")}D.set("User-Agent","axios/"+lf,!1);const Fe={...ee,signal:Ue,method:C.toUpperCase(),headers:Nm(D.normalize()),body:b,duplex:"half",credentials:Te?H:void 0};Pe=l&&new s(M,Fe);let T=await(l?ge(Pe,ee):ge(M,Fe));const R=dn.from(T.headers);if(le){const Q=te.toFiniteNumber(R.getContentLength());if(Q!=null&&Q>X)throw new qe("maxContentLength size of "+X+" exceeded",qe.ERR_BAD_RESPONSE,h,Pe)}const k=p&&(F==="stream"||F==="response");if(p&&T.body&&(v||le||k&&ke)){const Q={};["status","statusText","headers"].forEach(be=>{Q[be]=T[be]});const ue=te.toFiniteNumber(R.getContentLength()),[Ae,Ee]=v&&Nd(ue,Ba(Ud(v),!0))||[];let Re=0;const Y=be=>{if(le&&(Re=be,Re>X))throw new qe("maxContentLength size of "+X+" exceeded",qe.ERR_BAD_RESPONSE,h,Pe);Ae&&Ae(be)};T=new o(Bd(T.body,kd,Y,()=>{Ee&&Ee(),ke&&ke()}),Q)}F=F||"text";let re=await _[te.findKey(_,F)||"text"](T,h);if(le&&!p&&!k){let Q;if(re!=null&&(typeof re.byteLength=="number"?Q=re.byteLength:typeof re.size=="number"?Q=re.size:typeof re=="string"&&(Q=typeof i=="function"?new i().encode(re).byteLength:re.length)),typeof Q=="number"&&Q>X)throw new qe("maxContentLength size of "+X+" exceeded",qe.ERR_BAD_RESPONSE,h,Pe)}return!k&&ke&&ke(),await new Promise((Q,ue)=>{Gm(Q,ue,{data:re,headers:dn.from(T.headers),status:T.status,statusText:T.statusText,config:h,request:Pe})})}catch(ie){if(ke&&ke(),Ue&&Ue.aborted&&Ue.reason instanceof qe){const W=Ue.reason;throw W.config=h,Pe&&(W.request=Pe),ie!==W&&Object.defineProperty(W,"cause",{__proto__:null,value:ie,writable:!0,enumerable:!1,configurable:!0}),W}if(De)throw Pe&&!De.request&&(De.request=Pe),De;if(ie instanceof qe)throw Pe&&!ie.request&&(ie.request=Pe),ie;if(ie&&ie.name==="TypeError"&&/Load failed|fetch/i.test(ie.message)){const W=new qe("Network Error",qe.ERR_NETWORK,h,Pe,ie&&ie.response);throw Object.defineProperty(W,"cause",{__proto__:null,value:ie.cause||ie,writable:!0,enumerable:!1,configurable:!0}),W}throw qe.from(ie,ie&&ie.code,h,Pe,ie&&ie.response)}}},fy=new Map,Xm=t=>{let e=t&&t.env||{};const{fetch:n,Request:i,Response:r}=e,s=[i,r,n];let o=s.length,a=o,l,u,c=fy;for(;a--;)l=s[a],u=c.get(l),u===void 0&&c.set(l,u=a?new Map:cy(e)),c=u;return u};Xm();const uf={http:Eb,xhr:ty,fetch:{get:Xm}};te.forEach(uf,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{__proto__:null,value:e})}catch{}Object.defineProperty(t,"adapterName",{__proto__:null,value:e})}});const zd=t=>`- ${t}`,dy=t=>te.isFunction(t)||t===null||t===!1;function hy(t,e){t=te.isArray(t)?t:[t];const{length:n}=t;let i,r;const s={};for(let o=0;o<n;o++){i=t[o];let a;if(r=i,!dy(i)&&(r=uf[(a=String(i)).toLowerCase()],r===void 0))throw new qe(`Unknown adapter '${a}'`);if(r&&(te.isFunction(r)||(r=r.get(e))))break;s[a||"#"+o]=r}if(!r){const o=Object.entries(s).map(([l,u])=>`adapter ${l} `+(u===!1?"is not supported by the environment":"is not available in the build"));let a=n?o.length>1?`since :
`+o.map(zd).join(`
`):" "+zd(o[0]):"as no adapter specified";throw new qe("There is no suitable adapter to dispatch the request "+a,qe.ERR_NOT_SUPPORT)}return r}const qm={getAdapter:hy,adapters:uf};function Wl(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Po(null,t)}function Gd(t){return Wl(t),t.headers=dn.from(t.headers),t.data=Gl.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),qm.getAdapter(t.adapter||Co.adapter,t)(t).then(function(i){Wl(t),t.response=i;try{i.data=Gl.call(t,t.transformResponse,i)}finally{delete t.response}return i.headers=dn.from(i.headers),i},function(i){if(!zm(i)&&(Wl(t),i&&i.response)){t.response=i.response;try{i.response.data=Gl.call(t,t.transformResponse,i.response)}finally{delete t.response}i.response.headers=dn.from(i.response.headers)}return Promise.reject(i)})}const hl={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{hl[t]=function(i){return typeof i===t||"a"+(e<1?"n ":" ")+t}});const Wd={};hl.transitional=function(e,n,i){function r(s,o){return"[Axios v"+lf+"] Transitional option '"+s+"'"+o+(i?". "+i:"")}return(s,o,a)=>{if(e===!1)throw new qe(r(o," has been removed"+(n?" in "+n:"")),qe.ERR_DEPRECATED);return n&&!Wd[o]&&(Wd[o]=!0,console.warn(r(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(s,o,a):!0}};hl.spelling=function(e){return(n,i)=>(console.warn(`${i} is likely a misspelling of ${e}`),!0)};function py(t,e,n){if(typeof t!="object"||t===null)throw new qe("options must be an object",qe.ERR_BAD_OPTION_VALUE);const i=Object.keys(t);let r=i.length;for(;r-- >0;){const s=i[r],o=Object.prototype.hasOwnProperty.call(e,s)?e[s]:void 0;if(o){const a=t[s],l=a===void 0||o(a,s,t);if(l!==!0)throw new qe("option "+s+" must be "+l,qe.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new qe("Unknown option "+s,qe.ERR_BAD_OPTION)}}const va={assertOptions:py,validators:hl},on=va.validators;let Ar=class{constructor(e){this.defaults=e||{},this.interceptors={request:new Dd,response:new Dd}}async request(e,n){try{return await this._request(e,n)}catch(i){if(i instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const s=(()=>{if(!r.stack)return"";const o=r.stack.indexOf(`
`);return o===-1?"":r.stack.slice(o+1)})();try{if(!i.stack)i.stack=s;else if(s){const o=s.indexOf(`
`),a=o===-1?-1:s.indexOf(`
`,o+1),l=a===-1?"":s.slice(a+1);String(i.stack).endsWith(l)||(i.stack+=`
`+s)}}catch{}}throw i}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=Cr(this.defaults,n);const{transitional:i,paramsSerializer:r,headers:s}=n;i!==void 0&&va.assertOptions(i,{silentJSONParsing:on.transitional(on.boolean),forcedJSONParsing:on.transitional(on.boolean),clarifyTimeoutError:on.transitional(on.boolean),legacyInterceptorReqResOrdering:on.transitional(on.boolean),advertiseZstdAcceptEncoding:on.transitional(on.boolean),validateStatusUndefinedResolves:on.transitional(on.boolean)},!1),r!=null&&(te.isFunction(r)?n.paramsSerializer={serialize:r}:va.assertOptions(r,{encode:on.function,serialize:on.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),va.assertOptions(n,{baseUrl:on.spelling("baseURL"),withXsrfToken:on.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=s&&te.merge(s.common,s[n.method]);s&&te.forEach(["delete","get","head","post","put","patch","query","common"],_=>{delete s[_]}),n.headers=dn.concat(o,s);const a=[];let l=!0;this.interceptors.request.forEach(function(y){if(typeof y.runWhen=="function"&&y.runWhen(n)===!1)return;l=l&&y.synchronous;const g=n.transitional||of;g&&g.legacyInterceptorReqResOrdering?a.unshift(y.fulfilled,y.rejected):a.push(y.fulfilled,y.rejected)});const u=[];this.interceptors.response.forEach(function(y){u.push(y.fulfilled,y.rejected)});let c,f=0,d;if(!l){const _=[Gd.bind(this),void 0];for(_.unshift(...a),_.push(...u),d=_.length,c=Promise.resolve(n);f<d;)c=c.then(_[f++],_[f++]);return c}d=a.length;let p=n;for(;f<d;){const _=a[f++],y=a[f++];try{p=_(p)}catch(g){y.call(this,g);break}}try{c=Gd.call(this,p)}catch(_){return Promise.reject(_)}for(f=0,d=u.length;f<d;)c=c.then(u[f++],u[f++]);return c}getUri(e){e=Cr(this.defaults,e);const n=Wm(e.baseURL,e.url,e.allowAbsoluteUrls,e);return km(n,e.params,e.paramsSerializer)}};te.forEach(["delete","get","head","options"],function(e){Ar.prototype[e]=function(n,i){return this.request(Cr(i||{},{method:e,url:n,data:i&&te.hasOwnProp(i,"data")?i.data:void 0}))}});te.forEach(["post","put","patch","query"],function(e){function n(i){return function(s,o,a){return this.request(Cr(a||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:s,data:o}))}}Ar.prototype[e]=n(),e!=="query"&&(Ar.prototype[e+"Form"]=n(!0))});let my=class Ym{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const i=this;this.promise.then(r=>{if(!i._listeners)return;let s=i._listeners.length;for(;s-- >0;)i._listeners[s](r);i._listeners=null}),this.promise.then=r=>{let s;const o=new Promise(a=>{i.subscribe(a),s=a}).then(r);return o.cancel=function(){i.unsubscribe(s)},o},e(function(s,o,a){i.reason||(i.reason=new Po(s,o,a),n(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const e=new AbortController,n=i=>{e.abort(i)};return this.subscribe(n),e.signal.unsubscribe=()=>this.unsubscribe(n),e.signal}static source(){let e;return{token:new Ym(function(r){e=r}),cancel:e}}};function gy(t){return function(n){return t.apply(null,n)}}function _y(t){return te.isObject(t)&&t.isAxiosError===!0}const Wu={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Wu).forEach(([t,e])=>{Wu[e]=t});function Km(t){const e=new Ar(t),n=wm(Ar.prototype.request,e);return te.extend(n,Ar.prototype,e,{allOwnKeys:!0}),te.extend(n,e,null,{allOwnKeys:!0}),n.create=function(r){return Km(Cr(t,r))},n}const Ot=Km(Co);Ot.Axios=Ar;Ot.CanceledError=Po;Ot.CancelToken=my;Ot.isCancel=zm;Ot.VERSION=lf;Ot.toFormData=dl;Ot.AxiosError=qe;Ot.Cancel=Ot.CanceledError;Ot.all=function(e){return Promise.all(e)};Ot.spread=gy;Ot.isAxiosError=_y;Ot.mergeConfig=Cr;Ot.AxiosHeaders=dn;Ot.formToJSON=t=>Hm(te.isHTMLForm(t)?new FormData(t):t);Ot.getAdapter=qm.getAdapter;Ot.HttpStatusCode=Wu;Ot.default=Ot;const{Axios:E3,AxiosError:w3,CanceledError:T3,isCancel:A3,CancelToken:R3,VERSION:C3,all:P3,Cancel:L3,isAxiosError:D3,spread:I3,toFormData:N3,AxiosHeaders:U3,HttpStatusCode:O3,formToJSON:F3,getAdapter:B3,mergeConfig:k3,create:V3}=Ot,Lo="http://127.0.0.1:8000",dt=Ot.create({baseURL:Lo,headers:{"Content-Type":"application/json"}});dt.interceptors.request.use(t=>{const e=localStorage.getItem("access_token");return e&&(t.headers.Authorization=`Bearer ${e}`),t.data instanceof FormData&&(delete t.headers["Content-Type"],delete t.headers["content-type"]),t});dt.interceptors.response.use(t=>t,async t=>{const e=t.config,n=localStorage.getItem("refresh_token");if(t.response?.status===401&&n&&!e._retry){e._retry=!0;const i=await Ot.post(`${Lo}/api/auth/refresh/`,{refresh:n});return localStorage.setItem("access_token",i.data.access),e.headers.Authorization=`Bearer ${i.data.access}`,dt(e)}return Promise.reject(t)});const Ns=m0("auth",()=>{const t=Me(localStorage.getItem("access_token")||""),e=Me(localStorage.getItem("refresh_token")||""),n=Me(JSON.parse(localStorage.getItem("user")||"null")),i=st(()=>!!t.value),r=st(()=>n.value?.role||""),s=st(()=>r.value==="guest");async function o(u,c){const f=await dt.post("/api/auth/login/",{username:u,password:c});t.value=f.data.access,e.value=f.data.refresh,localStorage.setItem("access_token",f.data.access),localStorage.setItem("refresh_token",f.data.refresh),await a()}async function a(){const u=await dt.get("/api/auth/me/");n.value=u.data,localStorage.setItem("user",JSON.stringify(u.data))}function l(){t.value="",e.value="",n.value=null,localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("user")}return{accessToken:t,refreshToken:e,user:n,isAuthenticated:i,role:r,isGuest:s,login:o,fetchMe:a,logout:l}}),vy={key:0,class:"sidebar"},xy={__name:"App",setup(t){const e=Ns(),n=tf(),i=Ls(),r=st(()=>!!n.meta.immersive),s=st(()=>{const a=[{to:"/",label:"Home"},{to:"/viewer",label:"VR360 Viewer"}];return e.isGuest?a:[...a.slice(0,1),{to:"/dashboard",label:"Dashboard"},{to:"/projects",label:"Projects"},{to:"/builder",label:"VR360 Builder"},a[1],{to:"/publishing",label:"Publishing"},{to:"/stats",label:"Analytics"},{to:"/public-viewer",label:"Public Viewer"}]});function o(){e.logout(),i.push("/login")}return(a,l)=>(j(),Z("div",{class:$t(["app-shell",{"app-shell-immersive":r.value}])},[cn(e).isAuthenticated&&!r.value?(j(),Z("aside",vy,[tn(cn(Oa),{class:"brand",to:"/"},{default:Ca(()=>[...l[0]||(l[0]=[it("VR360",-1)])]),_:1}),m("nav",null,[(j(!0),Z(tt,null,ct(s.value,u=>(j(),Du(cn(Oa),{key:u.to,to:u.to},{default:Ca(()=>[it(oe(u.label),1)]),_:2},1032,["to"]))),128))]),m("button",{class:"ghost-button",type:"button",onClick:o}," Logout ")])):Je("",!0),m("main",{class:$t(["content",{"content-auth":!cn(e).isAuthenticated,"content-immersive":r.value}])},[(j(),Du(cn(Em),{key:cn(n).fullPath}))],2)],2))}};function by(){return dt.get("/api/dashboard/overview/")}function yy(t={}){return dt.get("/api/dashboard/top-locations/",{params:t})}function Sy(t={limit:10}){return dt.get("/api/dashboard/recent-activity/",{params:t})}const My={class:"page dashboard-page"},Ey={class:"page-header"},wy={class:"eyebrow"},Ty={key:0,class:"error-message"},Ay={key:1,class:"muted"},Ry={key:2,class:"metric-grid dashboard-metric-grid"},Cy={class:"metric-card dashboard-metric-card project"},Py={class:"metric-card dashboard-metric-card location"},Ly={class:"metric-card dashboard-metric-card publish"},Dy={class:"metric-card dashboard-metric-card visit"},Iy={class:"metric-card dashboard-metric-card unique"},Ny={class:"two-column dashboard-main-grid"},Uy={class:"panel dashboard-table-panel"},Oy={class:"table-wrap"},Fy={key:0},By={class:"panel dashboard-activity-panel"},ky={class:"activity-list"},Vy={key:0,class:"muted"},Hy={__name:"DashboardView",setup(t){const e=Ns(),n=Me(null),i=Me([]),r=Me([]),s=Me(!0),o=Me("");async function a(){s.value=!0,o.value="";try{const[l,u,c]=await Promise.all([by(),yy({limit:5}),Sy({limit:5})]);n.value=l.data,i.value=u.data.results||[],r.value=c.data.results||[]}catch(l){o.value=l.response?.data?.detail||"Could not load dashboard."}finally{s.value=!1}}return jn(a),(l,u)=>(j(),Z("section",My,[m("header",Ey,[m("div",null,[m("p",wy,"Xin chào "+oe(cn(e).user?.username||"ban"),1),u[0]||(u[0]=m("h1",null,"Tổng quan hệ thống",-1))]),m("button",{class:"secondary-button",type:"button",onClick:a}," Refresh ")]),o.value?(j(),Z("p",Ty,oe(o.value),1)):Je("",!0),s.value?(j(),Z("p",Ay,"Loading data...")):Je("",!0),n.value?(j(),Z("div",Ry,[m("article",Cy,[m("div",null,[u[1]||(u[1]=m("span",null,"Project",-1)),m("strong",null,oe(n.value.projects_count),1)]),u[2]||(u[2]=m("i",null,"📁",-1))]),m("article",Py,[m("div",null,[u[3]||(u[3]=m("span",null,"Location",-1)),m("strong",null,oe(n.value.locations_count),1)]),u[4]||(u[4]=m("i",null,"📍",-1))]),m("article",Ly,[m("div",null,[u[5]||(u[5]=m("span",null,"Publishing",-1)),m("strong",null,oe(n.value.published_locations),1)]),u[6]||(u[6]=m("i",null,"🌐",-1))]),m("article",Dy,[m("div",null,[u[7]||(u[7]=m("span",null,"Lượt truy cập",-1)),m("strong",null,oe(n.value.total_visits),1)]),u[8]||(u[8]=m("i",null,"👁",-1))]),m("article",Iy,[m("div",null,[u[9]||(u[9]=m("span",null,"Unique visitor",-1)),m("strong",null,oe(n.value.unique_visitors),1)]),u[10]||(u[10]=m("i",null,"👤",-1))])])):Je("",!0),m("div",Ny,[m("section",Uy,[u[13]||(u[13]=m("h2",null,"Top location",-1)),m("div",Oy,[m("table",null,[u[12]||(u[12]=m("thead",null,[m("tr",null,[m("th",null,"Location"),m("th",null,"Project"),m("th",null,"Lượt xem")])],-1)),m("tbody",null,[(j(!0),Z(tt,null,ct(i.value,c=>(j(),Z("tr",{key:c.location_id},[m("td",null,oe(c.location_name),1),m("td",null,oe(c.project_name),1),m("td",null,oe(c.total_visits),1)]))),128)),i.value.length?Je("",!0):(j(),Z("tr",Fy,[...u[11]||(u[11]=[m("td",{colspan:"3"},"Chưa có dữ liệu.",-1)])]))])])])]),m("section",By,[u[14]||(u[14]=m("div",{class:"panel-title-row"},[m("h2",null,"Hoạt động gần đây."),m("small",null,"5 mới nhất")],-1)),m("ul",ky,[(j(!0),Z(tt,null,ct(r.value,c=>(j(),Z("li",{key:c.id},[m("strong",null,oe(c.action),1),m("span",null,oe(c.description||c.entity_type),1)]))),128)),r.value.length?Je("",!0):(j(),Z("li",Vy,"Chưa có hoạt động."))])])])]))}},zy="http://127.0.0.1:8000";function jm(t={}){return Ot.get(`${zy}/api/published-tours/`,{params:t})}const Gy={class:"page home-page"},Wy={key:0,class:"home-topbar"},$y={class:"home-topbar-actions"},Xy={class:"home-hero"},qy={class:"home-hero-copy"},Yy={class:"home-hero-actions"},Ky=["disabled"],jy={class:"home-summary-card"},Zy={key:1,class:"builder-alert error"},Jy={key:2,class:"builder-alert success"},Qy={key:3,class:"published-tour-grid"},eS={class:"published-tour-body"},tS={class:"published-tour-meta"},nS={class:"published-tour-footer"},iS={class:"published-tour-actions"},rS=["onClick"],sS=["onClick"],oS={key:4,class:"panel empty-state"},aS={__name:"HomeView",setup(t){const e=Ls(),n=Ns(),i=Me([]),r=Me(""),s=Me(!1),o=Me(""),a=Me("");let l=null;const u=st(()=>{const b=r.value.trim().toLowerCase();return b?i.value.filter(I=>[I.location_name,I.project_name,I.location_description,I.version_label].filter(Boolean).some(w=>String(w).toLowerCase().includes(b))):i.value}),c=st(()=>i.value.reduce((b,I)=>b+Number(I.scene_count||0),0));function f(b){return Array.isArray(b)?b:Array.isArray(b?.results)?b.results:Array.isArray(b?.data)?b.data:Array.isArray(b?.items)?b.items:[]}function d(b){return b?new Intl.DateTimeFormat("vi-VN",{dateStyle:"medium"}).format(new Date(b)):"Chua ro ngay publish"}function p(b){e.push({path:`/vr360/${b.public_token}`})}function _(b){return new URL(`/vr360/${b.public_token}`,window.location.origin).toString()}function y(b){const I=_(b),w=`${b.project_name||"VR360"} - ${b.location_name||"Tour"}`;return`<iframe src="${I}" title="${w}" width="100%" height="640" style="border:0;border-radius:12px;" allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; accelerometer" allowfullscreen loading="lazy"></iframe>`}function g(b){clearTimeout(l),a.value="",window.requestAnimationFrame(()=>{a.value=b,l=setTimeout(()=>{a.value=""},2e3)})}async function h(b){const I=y(b);try{await navigator.clipboard.writeText(I),g("Da copy iframe VR. Web khac chi dung duoc neu domain da whitelist.")}catch{const w=document.createElement("textarea");w.value=I,w.setAttribute("readonly",""),w.style.position="fixed",w.style.left="-9999px",document.body.appendChild(w),w.select(),document.execCommand("copy"),document.body.removeChild(w),g("Da copy iframe VR.")}}function M(){e.push("/login")}async function C(){s.value=!0,o.value="";try{const b=await jm();i.value=f(b.data)}catch(b){o.value=b.response?.data?.detail||"Could not load published tour list."}finally{s.value=!1}}return jn(C),Ps(()=>{clearTimeout(l)}),(b,I)=>(j(),Z("section",Gy,[cn(n).isAuthenticated?Je("",!0):(j(),Z("nav",Wy,[tn(cn(Oa),{class:"home-logo",to:"/"},{default:Ca(()=>[...I[1]||(I[1]=[it("VR360",-1)])]),_:1}),m("div",$y,[m("button",{class:"ghost-button compact-button",type:"button",onClick:C},oe(s.value?"Loading...":"Refresh"),1),m("button",{class:"primary-button compact-button",type:"button",onClick:M}," Dang nhap ")])])),m("header",Xy,[m("div",qy,[I[2]||(I[2]=m("p",{class:"eyebrow"},"Thu vien VR360",-1)),I[3]||(I[3]=m("h1",null,"Kham pha cac tour 360 da publish",-1)),I[4]||(I[4]=m("p",null,"Chon tour cong khai de xem nhanh tren VR360 Viewer, hoac dang nhap de quan ly du an.",-1)),m("div",Yy,[Ke(m("input",{"onUpdate:modelValue":I[0]||(I[0]=w=>r.value=w),placeholder:"Tim theo project, location..."},null,512),[[lt,r.value]]),m("button",{class:"secondary-button",type:"button",disabled:s.value,onClick:C},oe(s.value?"Loading...":"Refresh"),9,Ky)])]),m("div",jy,[I[5]||(I[5]=m("span",null,"Da publish",-1)),m("strong",null,oe(i.value.length),1),m("small",null,oe(c.value)+" scene san sang",1)])]),o.value?(j(),Z("p",Zy,oe(o.value),1)):Je("",!0),a.value?(j(),Z("p",Jy,oe(a.value),1)):Je("",!0),u.value.length?(j(),Z("section",Qy,[(j(!0),Z(tt,null,ct(u.value,w=>(j(),Z("article",{key:w.id,class:"published-tour-card"},[m("div",{class:"published-tour-cover",style:Bt(w.location_thumbnail||w.tour_thumbnail?{backgroundImage:`url(${w.location_thumbnail||w.tour_thumbnail})`}:{})},[...I[6]||(I[6]=[m("span",null,"Da xuat ban",-1)])],4),m("div",eS,[m("small",null,oe(w.project_name),1),m("h2",null,oe(w.location_name),1),m("p",null,oe(w.location_description||"Tour VR360 da san sang de xem."),1),m("div",tS,[m("span",null,"v"+oe(w.version_number)+oe(w.version_label?` · ${w.version_label}`:""),1),m("span",null,oe(w.scene_count)+" scenes",1)]),m("div",nS,[m("em",null,"Published "+oe(d(w.published_at)),1),m("div",iS,[m("button",{class:"secondary-button compact-button",type:"button",title:"Copy iframe de nhung vao website khac",onClick:B=>h(w)}," Lay link VR ",8,rS),m("button",{class:"primary-button compact-button",type:"button",onClick:B=>p(w)}," Xem tour ",8,sS)])])])]))),128))])):(j(),Z("section",oS,oe(s.value?"Loading tour list...":"No published tours yet."),1))]))}},lS={class:"auth-card"},uS={key:0,class:"error-message"},cS=["disabled"],fS={__name:"LoginView",setup(t){const e=Ls(),n=Ns(),i=Me("admin"),r=Me("123456"),s=Me(!1),o=Me("");async function a(){s.value=!0,o.value="";try{await n.login(i.value,r.value),e.push("/")}catch(l){const u=l.response?.data;o.value=u?.detail||u?.non_field_errors?.join(" ")||(typeof u=="string"?u:"")||"Could not connect to backend or CORS was blocked."}finally{s.value=!1}}return(l,u)=>(j(),Z("section",lS,[u[4]||(u[4]=m("div",null,[m("p",{class:"eyebrow"},"VR360 Admin"),m("h1",null,"Login system"),m("p",{class:"muted"},"Use an admin or company staff account created in the backend.")],-1)),m("form",{class:"form",onSubmit:_t(a,["prevent"])},[m("label",null,[u[2]||(u[2]=it(" Username ",-1)),Ke(m("input",{"onUpdate:modelValue":u[0]||(u[0]=c=>i.value=c),autocomplete:"username"},null,512),[[lt,i.value]])]),m("label",null,[u[3]||(u[3]=it(" Password ",-1)),Ke(m("input",{"onUpdate:modelValue":u[1]||(u[1]=c=>r.value=c),type:"password",autocomplete:"current-password"},null,512),[[lt,r.value]])]),o.value?(j(),Z("p",uS,oe(o.value),1)):Je("",!0),m("button",{class:"primary-button",type:"submit",disabled:s.value},oe(s.value?"Logging in...":"Login"),9,cS)],32)]))}};const cf="185",dS=0,$d=1,hS=2,xa=1,pS=2,Qs=3,or=0,Sn=1,Ci=2,Ii=0,ds=1,Xd=2,qd=3,Yd=4,mS=5,vr=100,gS=101,_S=102,vS=103,xS=104,bS=200,yS=201,SS=202,MS=203,$u=204,Xu=205,ES=206,wS=207,TS=208,AS=209,RS=210,CS=211,PS=212,LS=213,DS=214,qu=0,Yu=1,Ku=2,Ss=3,ju=4,Zu=5,Ju=6,Qu=7,Zm=0,IS=1,NS=2,di=0,Jm=1,Qm=2,eg=3,tg=4,ng=5,ig=6,rg=7,sg=300,Pr=301,Ms=302,$l=303,Xl=304,pl=306,ec=1e3,Pi=1001,tc=1002,rn=1003,US=1004,Go=1005,fn=1006,ql=1007,Sr=1008,Nn=1009,og=1010,ag=1011,bo=1012,ff=1013,mi=1014,li=1015,Bi=1016,df=1017,hf=1018,yo=1020,lg=35902,ug=35899,cg=1021,fg=1022,Gn=1023,ki=1026,Mr=1027,dg=1028,pf=1029,Lr=1030,mf=1031,gf=1033,ba=33776,ya=33777,Sa=33778,Ma=33779,nc=35840,ic=35841,rc=35842,sc=35843,oc=36196,ac=37492,lc=37496,uc=37488,cc=37489,Va=37490,fc=37491,dc=37808,hc=37809,pc=37810,mc=37811,gc=37812,_c=37813,vc=37814,xc=37815,bc=37816,yc=37817,Sc=37818,Mc=37819,Ec=37820,wc=37821,Tc=36492,Ac=36494,Rc=36495,Cc=36283,Pc=36284,Ha=36285,Lc=36286,OS=3200,Kd=0,FS=1,nr="",wn="srgb",za="srgb-linear",Ga="linear",Rt="srgb",Wr=7680,jd=519,BS=512,kS=513,VS=514,_f=515,HS=516,zS=517,vf=518,GS=519,Zd=35044,Jd="300 es",ui=2e3,Wa=2001;function WS(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function So(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function $S(){const t=So("canvas");return t.style.display="block",t}const Qd={};function eh(...t){const e="THREE."+t.shift();console.log(e,...t)}function hg(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function ut(...t){t=hg(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function St(...t){t=hg(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function hs(...t){const e=t.join(" ");e in Qd||(Qd[e]=!0,ut(...t))}function XS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const qS={[qu]:Yu,[Ku]:Ju,[ju]:Qu,[Ss]:Zu,[Yu]:qu,[Ju]:Ku,[Qu]:ju,[Zu]:Ss};class Ir{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let th=1234567;const uo=Math.PI/180,Mo=180/Math.PI;function Us(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[t&255]+an[t>>8&255]+an[t>>16&255]+an[t>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[n&63|128]+an[n>>8&255]+"-"+an[n>>16&255]+an[n>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function vt(t,e,n){return Math.max(e,Math.min(n,t))}function xf(t,e){return(t%e+e)%e}function YS(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function KS(t,e,n){return t!==e?(n-t)/(e-t):0}function co(t,e,n){return(1-n)*t+n*e}function jS(t,e,n,i){return co(t,e,1-Math.exp(-n*i))}function ZS(t,e=1){return e-Math.abs(xf(t,e*2)-e)}function JS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function QS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function eM(t,e){return t+Math.floor(Math.random()*(e-t+1))}function tM(t,e){return t+Math.random()*(e-t)}function nM(t){return t*(.5-Math.random())}function iM(t){t!==void 0&&(th=t);let e=th+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rM(t){return t*uo}function sM(t){return t*Mo}function oM(t){return(t&t-1)===0&&t!==0}function aM(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function lM(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function uM(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),u=s((e+i)/2),c=o((e+i)/2),f=s((e-i)/2),d=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*c,l*f,l*d,a*u);break;case"YZY":t.set(l*d,a*c,l*f,a*u);break;case"ZXZ":t.set(l*f,l*d,a*c,a*u);break;case"XZX":t.set(a*c,l*_,l*p,a*u);break;case"YXY":t.set(l*p,a*c,l*_,a*u);break;case"ZYZ":t.set(l*_,l*p,a*c,a*u);break;default:ut("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ls(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function mn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const $r={DEG2RAD:uo,RAD2DEG:Mo,generateUUID:Us,clamp:vt,euclideanModulo:xf,mapLinear:YS,inverseLerp:KS,lerp:co,damp:jS,pingpong:ZS,smoothstep:JS,smootherstep:QS,randInt:eM,randFloat:tM,randFloatSpread:nM,seededRandom:iM,degToRad:rM,radToDeg:sM,isPowerOfTwo:oM,ceilPowerOfTwo:aM,floorPowerOfTwo:lM,setQuaternionFromProperEuler:uM,normalize:mn,denormalize:ls},Tf=class Tf{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=vt(this.x,e.x,n.x),this.y=vt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=vt(this.x,e,n),this.y=vt(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(vt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Tf.prototype.isVector2=!0;let Et=Tf;class Os{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],u=i[r+1],c=i[r+2],f=i[r+3],d=s[o+0],p=s[o+1],_=s[o+2],y=s[o+3];if(f!==y||l!==d||u!==p||c!==_){let g=l*d+u*p+c*_+f*y;g<0&&(d=-d,p=-p,_=-_,y=-y,g=-g);let h=1-a;if(g<.9995){const M=Math.acos(g),C=Math.sin(M);h=Math.sin(h*M)/C,a=Math.sin(a*M)/C,l=l*h+d*a,u=u*h+p*a,c=c*h+_*a,f=f*h+y*a}else{l=l*h+d*a,u=u*h+p*a,c=c*h+_*a,f=f*h+y*a;const M=1/Math.sqrt(l*l+u*u+c*c+f*f);l*=M,u*=M,c*=M,f*=M}}e[n]=l,e[n+1]=u,e[n+2]=c,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],c=i[r+3],f=s[o],d=s[o+1],p=s[o+2],_=s[o+3];return e[n]=a*_+c*f+l*p-u*d,e[n+1]=l*_+c*d+u*f-a*p,e[n+2]=u*_+c*p+a*d-l*f,e[n+3]=c*_-a*f-l*d-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(r/2),f=a(s/2),d=l(i/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=d*c*f+u*p*_,this._y=u*p*f-d*c*_,this._z=u*c*_+d*p*f,this._w=u*c*f-d*p*_;break;case"YXZ":this._x=d*c*f+u*p*_,this._y=u*p*f-d*c*_,this._z=u*c*_-d*p*f,this._w=u*c*f+d*p*_;break;case"ZXY":this._x=d*c*f-u*p*_,this._y=u*p*f+d*c*_,this._z=u*c*_+d*p*f,this._w=u*c*f-d*p*_;break;case"ZYX":this._x=d*c*f-u*p*_,this._y=u*p*f+d*c*_,this._z=u*c*_-d*p*f,this._w=u*c*f+d*p*_;break;case"YZX":this._x=d*c*f+u*p*_,this._y=u*p*f+d*c*_,this._z=u*c*_-d*p*f,this._w=u*c*f-d*p*_;break;case"XZY":this._x=d*c*f-u*p*_,this._y=u*p*f-d*c*_,this._z=u*c*_+d*p*f,this._w=u*c*f+d*p*_;break;default:ut("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],u=n[2],c=n[6],f=n[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(c-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,u=n._z,c=n._w;return this._x=i*c+o*a+r*u-s*l,this._y=r*c+o*l+s*a-i*u,this._z=s*c+o*u+i*l-r*a,this._w=o*c-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-n;if(a<.9995){const u=Math.acos(a),c=Math.sin(u);l=Math.sin(l*u)/c,n=Math.sin(n*u)/c,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Af=class Af{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(nh.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(nh.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),c=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*u+o*f-a*c,this.y=i+l*c+a*u-s*f,this.z=r+l*f+s*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=vt(this.x,e.x,n.x),this.y=vt(this.y,e.y,n.y),this.z=vt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=vt(this.x,e,n),this.y=vt(this.y,e,n),this.z=vt(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(vt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Yl.copy(this).projectOnVector(e),this.sub(Yl)}reflect(e){return this.sub(Yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Af.prototype.isVector3=!0;let he=Af;const Yl=new he,nh=new Os,Rf=class Rf{constructor(e,n,i,r,s,o,a,l,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u)}set(e,n,i,r,s,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=r,c[2]=a,c[3]=n,c[4]=s,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],f=i[7],d=i[2],p=i[5],_=i[8],y=r[0],g=r[3],h=r[6],M=r[1],C=r[4],b=r[7],I=r[2],w=r[5],B=r[8];return s[0]=o*y+a*M+l*I,s[3]=o*g+a*C+l*w,s[6]=o*h+a*b+l*B,s[1]=u*y+c*M+f*I,s[4]=u*g+c*C+f*w,s[7]=u*h+c*b+f*B,s[2]=d*y+p*M+_*I,s[5]=d*g+p*C+_*w,s[8]=d*h+p*b+_*B,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return n*o*c-n*a*u-i*s*c+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=c*o-a*u,d=a*l-c*s,p=u*s-o*l,_=n*f+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=f*y,e[1]=(r*u-c*i)*y,e[2]=(a*i-r*o)*y,e[3]=d*y,e[4]=(c*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-u*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+n,0,0,1),this}scale(e,n){return hs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Kl.makeScale(e,n)),this}rotate(e){return hs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Kl.makeRotation(-e)),this}translate(e,n){return hs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Kl.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Rf.prototype.isMatrix3=!0;let ft=Rf;const Kl=new ft,ih=new ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rh=new ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cM(){const t={enabled:!0,workingColorSpace:za,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Rt&&(r.r=Ni(r.r),r.g=Ni(r.g),r.b=Ni(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Rt&&(r.r=ps(r.r),r.g=ps(r.g),r.b=ps(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===nr?Ga:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return hs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return hs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[za]:{primaries:e,whitePoint:i,transfer:Ga,toXYZ:ih,fromXYZ:rh,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:e,whitePoint:i,transfer:Rt,toXYZ:ih,fromXYZ:rh,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),t}const bt=cM();function Ni(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ps(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Xr;class fM{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Xr===void 0&&(Xr=So("canvas")),Xr.width=e.width,Xr.height=e.height;const r=Xr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Xr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=So("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ni(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ni(n[i]/255)*255):n[i]=Ni(n[i]);return{data:n,width:e.width,height:e.height}}else return ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let dM=0;class bf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dM++}),this.uuid=Us(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(jl(r[o].image)):s.push(jl(r[o]))}else s=jl(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function jl(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?fM.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(ut("Texture: Unable to serialize Texture."),{})}let hM=0;const Zl=new he;class hn extends Ir{constructor(e=hn.DEFAULT_IMAGE,n=hn.DEFAULT_MAPPING,i=Pi,r=Pi,s=fn,o=Sr,a=Gn,l=Nn,u=hn.DEFAULT_ANISOTROPY,c=nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hM++}),this.uuid=Us(),this.name="",this.source=new bf(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Zl).x}get height(){return this.source.getSize(Zl).y}get depth(){return this.source.getSize(Zl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){ut(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ut(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ec:e.x=e.x-Math.floor(e.x);break;case Pi:e.x=e.x<0?0:1;break;case tc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ec:e.y=e.y-Math.floor(e.y);break;case Pi:e.y=e.y<0?0:1;break;case tc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=sg;hn.DEFAULT_ANISOTROPY=1;const Cf=class Cf{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],c=l[4],f=l[8],d=l[1],p=l[5],_=l[9],y=l[2],g=l[6],h=l[10];if(Math.abs(c-d)<.01&&Math.abs(f-y)<.01&&Math.abs(_-g)<.01){if(Math.abs(c+d)<.1&&Math.abs(f+y)<.1&&Math.abs(_+g)<.1&&Math.abs(u+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const C=(u+1)/2,b=(p+1)/2,I=(h+1)/2,w=(c+d)/4,B=(f+y)/4,v=(_+g)/4;return C>b&&C>I?C<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(C),r=w/i,s=B/i):b>I?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=w/r,s=v/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=B/s,r=v/s),this.set(i,r,s,n),this}let M=Math.sqrt((g-_)*(g-_)+(f-y)*(f-y)+(d-c)*(d-c));return Math.abs(M)<.001&&(M=1),this.x=(g-_)/M,this.y=(f-y)/M,this.z=(d-c)/M,this.w=Math.acos((u+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=vt(this.x,e.x,n.x),this.y=vt(this.y,e.y,n.y),this.z=vt(this.z,e.z,n.z),this.w=vt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=vt(this.x,e,n),this.y=vt(this.y,e,n),this.z=vt(this.z,e,n),this.w=vt(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(vt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Cf.prototype.isVector4=!0;let Vt=Cf;class pM extends Ir{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Vt(0,0,e,n),this.scissorTest=!1,this.viewport=new Vt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new hn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new bf(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends pM{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class pg extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class mM extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ya=class Ya{constructor(e,n,i,r,s,o,a,l,u,c,f,d,p,_,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u,c,f,d,p,_,y,g)}set(e,n,i,r,s,o,a,l,u,c,f,d,p,_,y,g){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=u,h[6]=c,h[10]=f,h[14]=d,h[3]=p,h[7]=_,h[11]=y,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ya().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/qr.setFromMatrixColumn(e,0).length(),s=1/qr.setFromMatrixColumn(e,1).length(),o=1/qr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*c,p=o*f,_=a*c,y=a*f;n[0]=l*c,n[4]=-l*f,n[8]=u,n[1]=p+_*u,n[5]=d-y*u,n[9]=-a*l,n[2]=y-d*u,n[6]=_+p*u,n[10]=o*l}else if(e.order==="YXZ"){const d=l*c,p=l*f,_=u*c,y=u*f;n[0]=d+y*a,n[4]=_*a-p,n[8]=o*u,n[1]=o*f,n[5]=o*c,n[9]=-a,n[2]=p*a-_,n[6]=y+d*a,n[10]=o*l}else if(e.order==="ZXY"){const d=l*c,p=l*f,_=u*c,y=u*f;n[0]=d-y*a,n[4]=-o*f,n[8]=_+p*a,n[1]=p+_*a,n[5]=o*c,n[9]=y-d*a,n[2]=-o*u,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const d=o*c,p=o*f,_=a*c,y=a*f;n[0]=l*c,n[4]=_*u-p,n[8]=d*u+y,n[1]=l*f,n[5]=y*u+d,n[9]=p*u-_,n[2]=-u,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*u,_=a*l,y=a*u;n[0]=l*c,n[4]=y-d*f,n[8]=_*f+p,n[1]=f,n[5]=o*c,n[9]=-a*c,n[2]=-u*c,n[6]=p*f+_,n[10]=d-y*f}else if(e.order==="XZY"){const d=o*l,p=o*u,_=a*l,y=a*u;n[0]=l*c,n[4]=-f,n[8]=u*c,n[1]=d*f+y,n[5]=o*c,n[9]=p*f-_,n[2]=_*f-p,n[6]=a*c,n[10]=y*f+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gM,e,_M)}lookAt(e,n,i){const r=this.elements;return Mn.subVectors(e,n),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),$i.crossVectors(i,Mn),$i.lengthSq()===0&&(Math.abs(i.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),$i.crossVectors(i,Mn)),$i.normalize(),Wo.crossVectors(Mn,$i),r[0]=$i.x,r[4]=Wo.x,r[8]=Mn.x,r[1]=$i.y,r[5]=Wo.y,r[9]=Mn.y,r[2]=$i.z,r[6]=Wo.z,r[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],f=i[5],d=i[9],p=i[13],_=i[2],y=i[6],g=i[10],h=i[14],M=i[3],C=i[7],b=i[11],I=i[15],w=r[0],B=r[4],v=r[8],S=r[12],F=r[1],D=r[5],H=r[9],ee=r[13],X=r[2],J=r[6],le=r[10],L=r[14],$=r[3],ge=r[7],Ue=r[11],Pe=r[15];return s[0]=o*w+a*F+l*X+u*$,s[4]=o*B+a*D+l*J+u*ge,s[8]=o*v+a*H+l*le+u*Ue,s[12]=o*S+a*ee+l*L+u*Pe,s[1]=c*w+f*F+d*X+p*$,s[5]=c*B+f*D+d*J+p*ge,s[9]=c*v+f*H+d*le+p*Ue,s[13]=c*S+f*ee+d*L+p*Pe,s[2]=_*w+y*F+g*X+h*$,s[6]=_*B+y*D+g*J+h*ge,s[10]=_*v+y*H+g*le+h*Ue,s[14]=_*S+y*ee+g*L+h*Pe,s[3]=M*w+C*F+b*X+I*$,s[7]=M*B+C*D+b*J+I*ge,s[11]=M*v+C*H+b*le+I*Ue,s[15]=M*S+C*ee+b*L+I*Pe,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],f=e[6],d=e[10],p=e[14],_=e[3],y=e[7],g=e[11],h=e[15],M=l*p-u*d,C=a*p-u*f,b=a*d-l*f,I=o*p-u*c,w=o*d-l*c,B=o*f-a*c;return n*(y*M-g*C+h*b)-i*(_*M-g*I+h*w)+r*(_*C-y*I+h*B)-s*(_*b-y*w+g*B)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],l=e[2],u=e[6],c=e[10];return n*(o*c-a*u)-i*(s*c-a*l)+r*(s*u-o*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=e[9],d=e[10],p=e[11],_=e[12],y=e[13],g=e[14],h=e[15],M=n*a-i*o,C=n*l-r*o,b=n*u-s*o,I=i*l-r*a,w=i*u-s*a,B=r*u-s*l,v=c*y-f*_,S=c*g-d*_,F=c*h-p*_,D=f*g-d*y,H=f*h-p*y,ee=d*h-p*g,X=M*ee-C*H+b*D+I*F-w*S+B*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const J=1/X;return e[0]=(a*ee-l*H+u*D)*J,e[1]=(r*H-i*ee-s*D)*J,e[2]=(y*B-g*w+h*I)*J,e[3]=(d*w-f*B-p*I)*J,e[4]=(l*F-o*ee-u*S)*J,e[5]=(n*ee-r*F+s*S)*J,e[6]=(g*b-_*B-h*C)*J,e[7]=(c*B-d*b+p*C)*J,e[8]=(o*H-a*F+u*v)*J,e[9]=(i*F-n*H-s*v)*J,e[10]=(_*w-y*b+h*M)*J,e[11]=(f*b-c*w-p*M)*J,e[12]=(a*S-o*D-l*v)*J,e[13]=(n*D-i*S+r*v)*J,e[14]=(y*C-_*I-g*M)*J,e[15]=(c*I-f*C+d*M)*J,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,c=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,c*a+i,c*l-r*o,0,u*l-r*a,c*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,u=s+s,c=o+o,f=a+a,d=s*u,p=s*c,_=s*f,y=o*c,g=o*f,h=a*f,M=l*u,C=l*c,b=l*f,I=i.x,w=i.y,B=i.z;return r[0]=(1-(y+h))*I,r[1]=(p+b)*I,r[2]=(_-C)*I,r[3]=0,r[4]=(p-b)*w,r[5]=(1-(d+h))*w,r[6]=(g+M)*w,r[7]=0,r[8]=(_+C)*B,r[9]=(g-M)*B,r[10]=(1-(d+y))*B,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let o=qr.set(r[0],r[1],r[2]).length();const a=qr.set(r[4],r[5],r[6]).length(),l=qr.set(r[8],r[9],r[10]).length();s<0&&(o=-o),kn.copy(this);const u=1/o,c=1/a,f=1/l;return kn.elements[0]*=u,kn.elements[1]*=u,kn.elements[2]*=u,kn.elements[4]*=c,kn.elements[5]*=c,kn.elements[6]*=c,kn.elements[8]*=f,kn.elements[9]*=f,kn.elements[10]*=f,n.setFromRotationMatrix(kn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,n,i,r,s,o,a=ui,l=!1){const u=this.elements,c=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),p=(i+r)/(i-r);let _,y;if(l)_=s/(o-s),y=o*s/(o-s);else if(a===ui)_=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Wa)_=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return u[0]=c,u[4]=0,u[8]=d,u[12]=0,u[1]=0,u[5]=f,u[9]=p,u[13]=0,u[2]=0,u[6]=0,u[10]=_,u[14]=y,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=ui,l=!1){const u=this.elements,c=2/(n-e),f=2/(i-r),d=-(n+e)/(n-e),p=-(i+r)/(i-r);let _,y;if(l)_=1/(o-s),y=o/(o-s);else if(a===ui)_=-2/(o-s),y=-(o+s)/(o-s);else if(a===Wa)_=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return u[0]=c,u[4]=0,u[8]=0,u[12]=d,u[1]=0,u[5]=f,u[9]=0,u[13]=p,u[2]=0,u[6]=0,u[10]=_,u[14]=y,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};Ya.prototype.isMatrix4=!0;let Xt=Ya;const qr=new he,kn=new Xt,gM=new he(0,0,0),_M=new he(1,1,1),$i=new he,Wo=new he,Mn=new he,sh=new Xt,oh=new Os;class Dr{constructor(e=0,n=0,i=0,r=Dr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],c=r[9],f=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-vt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-vt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return sh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sh,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return oh.setFromEuler(this),this.setFromQuaternion(oh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dr.DEFAULT_ORDER="XYZ";class yf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vM=0;const ah=new he,Yr=new Os,bi=new Xt,$o=new he,$s=new he,xM=new he,bM=new Os,lh=new he(1,0,0),uh=new he(0,1,0),ch=new he(0,0,1),fh={type:"added"},yM={type:"removed"},Kr={type:"childadded",child:null},Jl={type:"childremoved",child:null};class Rn extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vM++}),this.uuid=Us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const e=new he,n=new Dr,i=new Os,r=new he(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Xt},normalMatrix:{value:new ft}}),this.matrix=new Xt,this.matrixWorld=new Xt,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Yr.setFromAxisAngle(e,n),this.quaternion.multiply(Yr),this}rotateOnWorldAxis(e,n){return Yr.setFromAxisAngle(e,n),this.quaternion.premultiply(Yr),this}rotateX(e){return this.rotateOnAxis(lh,e)}rotateY(e){return this.rotateOnAxis(uh,e)}rotateZ(e){return this.rotateOnAxis(ch,e)}translateOnAxis(e,n){return ah.copy(e).applyQuaternion(this.quaternion),this.position.add(ah.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(lh,e)}translateY(e){return this.translateOnAxis(uh,e)}translateZ(e){return this.translateOnAxis(ch,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?$o.copy(e):$o.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt($s,$o,this.up):bi.lookAt($o,$s,this.up),this.quaternion.setFromRotationMatrix(bi),r&&(bi.extractRotation(r.matrixWorld),Yr.setFromRotationMatrix(bi),this.quaternion.premultiply(Yr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(St("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fh),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null):St("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(yM),Jl.child=e,this.dispatchEvent(Jl),Jl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fh),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,xM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,bM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const f=l[u];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Rn.DEFAULT_UP=new he(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Xo extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const SM={type:"move"};class Ql{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new he,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new he),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new he,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new he,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const y of e.hand.values()){const g=n.getJointPose(y,i),h=this._getHandJoint(u,y);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const c=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=c.position.distanceTo(f.position),p=.02,_=.005;u.inputState.pinching&&d>p+_?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=p-_&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(SM)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Xo;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const mg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},qo={h:0,s:0,l:0};function eu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class At{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=bt.workingColorSpace){return this.r=e,this.g=n,this.b=i,bt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=bt.workingColorSpace){if(e=xf(e,1),n=vt(n,0,1),i=vt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=eu(o,s,e+1/3),this.g=eu(o,s,e),this.b=eu(o,s,e-1/3)}return bt.colorSpaceToWorking(this,r),this}setStyle(e,n=wn){function i(s){s!==void 0&&parseFloat(s)<1&&ut("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:ut("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);ut("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=wn){const i=mg[e.toLowerCase()];return i!==void 0?this.setHex(i,n):ut("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return bt.workingToColorSpace(ln.copy(this),e),Math.round(vt(ln.r*255,0,255))*65536+Math.round(vt(ln.g*255,0,255))*256+Math.round(vt(ln.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=bt.workingColorSpace){bt.workingToColorSpace(ln.copy(this),n);const i=ln.r,r=ln.g,s=ln.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const f=o-a;switch(u=c<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,n=bt.workingColorSpace){return bt.workingToColorSpace(ln.copy(this),n),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=wn){bt.workingToColorSpace(ln.copy(this),e);const n=ln.r,i=ln.g,r=ln.b;return e!==wn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+n,Xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Xi),e.getHSL(qo);const i=co(Xi.h,qo.h,n),r=co(Xi.s,qo.s,n),s=co(Xi.l,qo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ln=new At;At.NAMES=mg;class MM extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dr,this.environmentIntensity=1,this.environmentRotation=new Dr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Vn=new he,yi=new he,tu=new he,Si=new he,jr=new he,Zr=new he,dh=new he,nu=new he,iu=new he,ru=new he,su=new Vt,ou=new Vt,au=new Vt;class zn{constructor(e=new he,n=new he,i=new he){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Vn.subVectors(e,n),r.cross(Vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Vn.subVectors(r,n),yi.subVectors(i,n),tu.subVectors(e,n);const o=Vn.dot(Vn),a=Vn.dot(yi),l=Vn.dot(tu),u=yi.dot(yi),c=yi.dot(tu),f=o*u-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(u*l-a*c)*d,_=(o*c-a*l)*d;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return su.setScalar(0),ou.setScalar(0),au.setScalar(0),su.fromBufferAttribute(e,n),ou.fromBufferAttribute(e,i),au.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(su,s.x),o.addScaledVector(ou,s.y),o.addScaledVector(au,s.z),o}static isFrontFacing(e,n,i,r){return Vn.subVectors(i,n),yi.subVectors(e,n),Vn.cross(yi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Vn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return zn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return zn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return zn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;jr.subVectors(r,i),Zr.subVectors(s,i),nu.subVectors(e,i);const l=jr.dot(nu),u=Zr.dot(nu);if(l<=0&&u<=0)return n.copy(i);iu.subVectors(e,r);const c=jr.dot(iu),f=Zr.dot(iu);if(c>=0&&f<=c)return n.copy(r);const d=l*f-c*u;if(d<=0&&l>=0&&c<=0)return o=l/(l-c),n.copy(i).addScaledVector(jr,o);ru.subVectors(e,s);const p=jr.dot(ru),_=Zr.dot(ru);if(_>=0&&p<=_)return n.copy(s);const y=p*u-l*_;if(y<=0&&u>=0&&_<=0)return a=u/(u-_),n.copy(i).addScaledVector(Zr,a);const g=c*_-p*f;if(g<=0&&f-c>=0&&p-_>=0)return dh.subVectors(s,r),a=(f-c)/(f-c+(p-_)),n.copy(r).addScaledVector(dh,a);const h=1/(g+y+d);return o=y*h,a=d*h,n.copy(i).addScaledVector(jr,o).addScaledVector(Zr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Do{constructor(e=new he(1/0,1/0,1/0),n=new he(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Hn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Hn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Hn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Hn):Hn.fromBufferAttribute(s,o),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Yo.copy(i.boundingBox)),Yo.applyMatrix4(e.matrixWorld),this.union(Yo)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xs),Ko.subVectors(this.max,Xs),Jr.subVectors(e.a,Xs),Qr.subVectors(e.b,Xs),es.subVectors(e.c,Xs),qi.subVectors(Qr,Jr),Yi.subVectors(es,Qr),dr.subVectors(Jr,es);let n=[0,-qi.z,qi.y,0,-Yi.z,Yi.y,0,-dr.z,dr.y,qi.z,0,-qi.x,Yi.z,0,-Yi.x,dr.z,0,-dr.x,-qi.y,qi.x,0,-Yi.y,Yi.x,0,-dr.y,dr.x,0];return!lu(n,Jr,Qr,es,Ko)||(n=[1,0,0,0,1,0,0,0,1],!lu(n,Jr,Qr,es,Ko))?!1:(jo.crossVectors(qi,Yi),n=[jo.x,jo.y,jo.z],lu(n,Jr,Qr,es,Ko))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mi=[new he,new he,new he,new he,new he,new he,new he,new he],Hn=new he,Yo=new Do,Jr=new he,Qr=new he,es=new he,qi=new he,Yi=new he,dr=new he,Xs=new he,Ko=new he,jo=new he,hr=new he;function lu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){hr.fromArray(t,s);const a=r.x*Math.abs(hr.x)+r.y*Math.abs(hr.y)+r.z*Math.abs(hr.z),l=e.dot(hr),u=n.dot(hr),c=i.dot(hr);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const Yt=new he,Zo=new Et;let EM=0;class pi extends Ir{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:EM++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Zd,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Zo.fromBufferAttribute(this,n),Zo.applyMatrix3(e),this.setXY(n,Zo.x,Zo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyMatrix3(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyMatrix4(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyNormalMatrix(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.transformDirection(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ls(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=mn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ls(n,this.array)),n}setX(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ls(n,this.array)),n}setY(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ls(n,this.array)),n}setZ(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ls(n,this.array)),n}setW(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array),r=mn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array),r=mn(r,this.array),s=mn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zd&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class gg extends pi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class _g extends pi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Fn extends pi{constructor(e,n,i){super(new Float32Array(e),n,i)}}const wM=new Do,qs=new he,uu=new he;class Sf{constructor(e=new he,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):wM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qs.subVectors(e,this.center);const n=qs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(qs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(uu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qs.copy(e.center).add(uu)),this.expandByPoint(qs.copy(e.center).sub(uu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let TM=0;const Dn=new Xt,cu=new Rn,ts=new he,En=new Do,Ys=new Do,en=new he;class _i extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:TM++}),this.uuid=Us(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(WS(e)?_g:gg)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ft().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,n,i){return Dn.makeTranslation(e,n,i),this.applyMatrix4(Dn),this}scale(e,n,i){return Dn.makeScale(e,n,i),this.applyMatrix4(Dn),this}lookAt(e){return cu.lookAt(e),cu.updateMatrix(),this.applyMatrix4(cu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Fn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Do);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){St("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new he(-1/0,-1/0,-1/0),new he(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];En.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&St('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sf);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){St("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new he,1/0);return}if(e){const i=this.boundingSphere.center;if(En.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Ys.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(En.min,Ys.min),En.expandByPoint(en),en.addVectors(En.max,Ys.max),En.expandByPoint(en)):(En.expandByPoint(Ys.min),En.expandByPoint(Ys.max))}En.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)en.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(en));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)en.fromBufferAttribute(a,u),l&&(ts.fromBufferAttribute(e,u),en.add(ts)),r=Math.max(r,i.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&St('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){St("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new pi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new he,l[v]=new he;const u=new he,c=new he,f=new he,d=new Et,p=new Et,_=new Et,y=new he,g=new he;function h(v,S,F){u.fromBufferAttribute(i,v),c.fromBufferAttribute(i,S),f.fromBufferAttribute(i,F),d.fromBufferAttribute(s,v),p.fromBufferAttribute(s,S),_.fromBufferAttribute(s,F),c.sub(u),f.sub(u),p.sub(d),_.sub(d);const D=1/(p.x*_.y-_.x*p.y);isFinite(D)&&(y.copy(c).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(D),g.copy(f).multiplyScalar(p.x).addScaledVector(c,-_.x).multiplyScalar(D),a[v].add(y),a[S].add(y),a[F].add(y),l[v].add(g),l[S].add(g),l[F].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,S=M.length;v<S;++v){const F=M[v],D=F.start,H=F.count;for(let ee=D,X=D+H;ee<X;ee+=3)h(e.getX(ee+0),e.getX(ee+1),e.getX(ee+2))}const C=new he,b=new he,I=new he,w=new he;function B(v){I.fromBufferAttribute(r,v),w.copy(I);const S=a[v];C.copy(S),C.sub(I.multiplyScalar(I.dot(S))).normalize(),b.crossVectors(w,S);const D=b.dot(l[v])<0?-1:1;o.setXYZW(v,C.x,C.y,C.z,D)}for(let v=0,S=M.length;v<S;++v){const F=M[v],D=F.start,H=F.count;for(let ee=D,X=D+H;ee<X;ee+=3)B(e.getX(ee+0)),B(e.getX(ee+1)),B(e.getX(ee+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new pi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new he,s=new he,o=new he,a=new he,l=new he,u=new he,c=new he,f=new he;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),y=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,g),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,g),a.add(c),l.add(c),u.add(c),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)en.fromBufferAttribute(e,n),en.normalize(),e.setXYZ(n,en.x,en.y,en.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,f=a.normalized,d=new u.constructor(l.length*c);let p=0,_=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*c;for(let h=0;h<c;h++)d[_++]=u[p++]}return new pi(d,c,f)}if(this.index===null)return ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new _i,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);n.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let c=0,f=u.length;c<f;c++){const d=u[c],p=e(d,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let f=0,d=u.length;f<d;f++){const p=u[f];c.push(p.toJSON(e.data))}c.length>0&&(r[l]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const u in r){const c=r[u];this.setAttribute(u,c.clone(n))}const s=e.morphAttributes;for(const u in s){const c=[],f=s[u];for(let d=0,p=f.length;d<p;d++)c.push(f[d].clone(n));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let AM=0;class ml extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:AM++}),this.uuid=Us(),this.name="",this.type="Material",this.blending=ds,this.side=or,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$u,this.blendDst=Xu,this.blendEquation=vr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new At(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){ut(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){ut(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ds&&(i.blending=this.blending),this.side!==or&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==$u&&(i.blendSrc=this.blendSrc),this.blendDst!==Xu&&(i.blendDst=this.blendDst),this.blendEquation!==vr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ss&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Wr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Wr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new At().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Et().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Et().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ei=new he,fu=new he,Jo=new he,Ki=new he,du=new he,Qo=new he,hu=new he;class vg{constructor(e=new he,n=new he(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ei.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,n),Ei.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){fu.copy(e).add(n).multiplyScalar(.5),Jo.copy(n).sub(e).normalize(),Ki.copy(this.origin).sub(fu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Jo),a=Ki.dot(this.direction),l=-Ki.dot(Jo),u=Ki.lengthSq(),c=Math.abs(1-o*o);let f,d,p,_;if(c>0)if(f=o*l-a,d=o*a-l,_=s*c,f>=0)if(d>=-_)if(d<=_){const y=1/c;f*=y,d*=y,p=f*(f+o*d+2*a)+d*(o*f+d+2*l)+u}else d=s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;else d=-s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;else d<=-_?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+u):d<=_?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+u):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+u);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(fu).addScaledVector(Jo,d),p}intersectSphere(e,n){Ei.subVectors(e.center,this.origin);const i=Ei.dot(this.direction),r=Ei.dot(Ei)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(i=(e.min.x-d.x)*u,r=(e.max.x-d.x)*u):(i=(e.max.x-d.x)*u,r=(e.min.x-d.x)*u),c>=0?(s=(e.min.y-d.y)*c,o=(e.max.y-d.y)*c):(s=(e.max.y-d.y)*c,o=(e.min.y-d.y)*c),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,n,i,r,s){du.subVectors(n,e),Qo.subVectors(i,e),hu.crossVectors(du,Qo);let o=this.direction.dot(hu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ki.subVectors(this.origin,e);const l=a*this.direction.dot(Qo.crossVectors(Ki,Qo));if(l<0)return null;const u=a*this.direction.dot(du.cross(Ki));if(u<0||l+u>o)return null;const c=-a*Ki.dot(hu);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $a extends ml{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dr,this.combine=Zm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hh=new Xt,pr=new vg,ea=new Sf,ph=new he,ta=new he,na=new he,ia=new he,pu=new he,ra=new he,mh=new he,sa=new he;class Kn extends Rn{constructor(e=new _i,n=new $a){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ra.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const c=a[l],f=s[l];c!==0&&(pu.fromBufferAttribute(f,e),o?ra.addScaledVector(pu,c):ra.addScaledVector(pu.sub(n),c))}n.add(ra)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ea.copy(i.boundingSphere),ea.applyMatrix4(s),pr.copy(e.ray).recast(e.near),!(ea.containsPoint(pr.origin)===!1&&(pr.intersectSphere(ea,ph)===null||pr.origin.distanceToSquared(ph)>(e.far-e.near)**2))&&(hh.copy(s).invert(),pr.copy(e.ray).applyMatrix4(hh),!(i.boundingBox!==null&&pr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,pr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,c=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,y=d.length;_<y;_++){const g=d[_],h=o[g.materialIndex],M=Math.max(g.start,p.start),C=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,I=C;b<I;b+=3){const w=a.getX(b),B=a.getX(b+1),v=a.getX(b+2);r=oa(this,h,e,i,u,c,f,w,B,v),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let g=_,h=y;g<h;g+=3){const M=a.getX(g),C=a.getX(g+1),b=a.getX(g+2);r=oa(this,o,e,i,u,c,f,M,C,b),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,y=d.length;_<y;_++){const g=d[_],h=o[g.materialIndex],M=Math.max(g.start,p.start),C=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,I=C;b<I;b+=3){const w=b,B=b+1,v=b+2;r=oa(this,h,e,i,u,c,f,w,B,v),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let g=_,h=y;g<h;g+=3){const M=g,C=g+1,b=g+2;r=oa(this,o,e,i,u,c,f,M,C,b),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function RM(t,e,n,i,r,s,o,a){let l;if(e.side===Sn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===or,a),l===null)return null;sa.copy(a),sa.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(sa);return u<n.near||u>n.far?null:{distance:u,point:sa.clone(),object:t}}function oa(t,e,n,i,r,s,o,a,l,u){t.getVertexPosition(a,ta),t.getVertexPosition(l,na),t.getVertexPosition(u,ia);const c=RM(t,e,n,i,ta,na,ia,mh);if(c){const f=new he;zn.getBarycoord(mh,ta,na,ia,f),r&&(c.uv=zn.getInterpolatedAttribute(r,a,l,u,f,new Et)),s&&(c.uv1=zn.getInterpolatedAttribute(s,a,l,u,f,new Et)),o&&(c.normal=zn.getInterpolatedAttribute(o,a,l,u,f,new he),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const d={a,b:l,c:u,normal:new he,materialIndex:0};zn.getNormal(ta,na,ia,d.normal),c.face=d,c.barycoord=f}return c}class CM extends hn{constructor(e=null,n=1,i=1,r,s,o,a,l,u=rn,c=rn,f,d){super(null,o,a,l,u,c,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const mu=new he,PM=new he,LM=new ft;class _r{constructor(e=new he(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=mu.subVectors(i,n).cross(PM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(mu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||LM.getNormalMatrix(e),r=this.coplanarPoint(mu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mr=new Sf,DM=new Et(.5,.5),aa=new he;class xg{constructor(e=new _r,n=new _r,i=new _r,r=new _r,s=new _r,o=new _r){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=ui,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],u=s[3],c=s[4],f=s[5],d=s[6],p=s[7],_=s[8],y=s[9],g=s[10],h=s[11],M=s[12],C=s[13],b=s[14],I=s[15];if(r[0].setComponents(u-o,p-c,h-_,I-M).normalize(),r[1].setComponents(u+o,p+c,h+_,I+M).normalize(),r[2].setComponents(u+a,p+f,h+y,I+C).normalize(),r[3].setComponents(u-a,p-f,h-y,I-C).normalize(),i)r[4].setComponents(l,d,g,b).normalize(),r[5].setComponents(u-l,p-d,h-g,I-b).normalize();else if(r[4].setComponents(u-l,p-d,h-g,I-b).normalize(),n===ui)r[5].setComponents(u+l,p+d,h+g,I+b).normalize();else if(n===Wa)r[5].setComponents(l,d,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mr)}intersectsSprite(e){mr.center.set(0,0,0);const n=DM.distanceTo(e.center);return mr.radius=.7071067811865476+n,mr.applyMatrix4(e.matrixWorld),this.intersectsSphere(mr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(aa.x=r.normal.x>0?e.max.x:e.min.x,aa.y=r.normal.y>0?e.max.y:e.min.y,aa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(aa)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class bg extends hn{constructor(e=[],n=Pr,i,r,s,o,a,l,u,c){super(e,n,i,r,s,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Es extends hn{constructor(e,n,i=mi,r,s,o,a=rn,l=rn,u,c=ki,f=1){if(c!==ki&&c!==Mr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:f};super(d,r,s,o,a,l,c,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new bf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class IM extends Es{constructor(e,n=mi,i=Pr,r,s,o=rn,a=rn,l,u=ki){const c={width:e,height:e,depth:1},f=[c,c,c,c,c,c];super(e,e,n,i,r,s,o,a,l,u),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class yg extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Io extends _i{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],c=[],f=[];let d=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Fn(u,3)),this.setAttribute("normal",new Fn(c,3)),this.setAttribute("uv",new Fn(f,2));function _(y,g,h,M,C,b,I,w,B,v,S){const F=b/B,D=I/v,H=b/2,ee=I/2,X=w/2,J=B+1,le=v+1;let L=0,$=0;const ge=new he;for(let Ue=0;Ue<le;Ue++){const Pe=Ue*D-ee;for(let ke=0;ke<J;ke++){const Le=ke*F-H;ge[y]=Le*M,ge[g]=Pe*C,ge[h]=X,u.push(ge.x,ge.y,ge.z),ge[y]=0,ge[g]=0,ge[h]=w>0?1:-1,c.push(ge.x,ge.y,ge.z),f.push(ke/B),f.push(1-Ue/v),L+=1}}for(let Ue=0;Ue<v;Ue++)for(let Pe=0;Pe<B;Pe++){const ke=d+Pe+J*Ue,Le=d+Pe+J*(Ue+1),De=d+(Pe+1)+J*(Ue+1),ye=d+(Pe+1)+J*Ue;l.push(ke,Le,ye),l.push(Le,De,ye),$+=6}a.addGroup(p,$,S),p+=$,d+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Io(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class gl extends _i{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),u=a+1,c=l+1,f=e/a,d=n/l,p=[],_=[],y=[],g=[];for(let h=0;h<c;h++){const M=h*d-o;for(let C=0;C<u;C++){const b=C*f-s;_.push(b,-M,0),y.push(0,0,1),g.push(C/a),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let M=0;M<a;M++){const C=M+u*h,b=M+u*(h+1),I=M+1+u*(h+1),w=M+1+u*h;p.push(C,b,w),p.push(b,I,w)}this.setIndex(p),this.setAttribute("position",new Fn(_,3)),this.setAttribute("normal",new Fn(y,3)),this.setAttribute("uv",new Fn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.width,e.height,e.widthSegments,e.heightSegments)}}class Xa extends _i{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let u=0;const c=[],f=new he,d=new he,p=[],_=[],y=[],g=[];for(let h=0;h<=i;h++){const M=[],C=h/i,b=o+C*a,I=e*Math.cos(b),w=Math.sqrt(e*e-I*I);let B=0;h===0&&o===0?B=.5/n:h===i&&l===Math.PI&&(B=-.5/n);for(let v=0;v<=n;v++){const S=v/n,F=r+S*s;f.x=-w*Math.cos(F),f.y=I,f.z=w*Math.sin(F),_.push(f.x,f.y,f.z),d.copy(f).normalize(),y.push(d.x,d.y,d.z),g.push(S+B,1-C),M.push(u++)}c.push(M)}for(let h=0;h<i;h++)for(let M=0;M<n;M++){const C=c[h][M+1],b=c[h][M],I=c[h+1][M],w=c[h+1][M+1];(h!==0||o>0)&&p.push(C,b,w),(h!==i-1||l<Math.PI)&&p.push(b,I,w)}this.setIndex(p),this.setAttribute("position",new Fn(_,3)),this.setAttribute("normal",new Fn(y,3)),this.setAttribute("uv",new Fn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xa(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ws(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(gh(r))r.isRenderTargetTexture?(ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(gh(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function gn(t){const e={};for(let n=0;n<t.length;n++){const i=ws(t[n]);for(const r in i)e[r]=i[r]}return e}function gh(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function NM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Sg(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:bt.workingColorSpace}const UM={clone:ws,merge:gn};var OM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,FM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gi extends ml{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=OM,this.fragmentShader=FM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ws(e.uniforms),this.uniformsGroups=NM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new At().setHex(r.value);break;case"v2":this.uniforms[i].value=new Et().fromArray(r.value);break;case"v3":this.uniforms[i].value=new he().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Vt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ft().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Xt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class BM extends gi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class kM extends ml{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=OS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class VM extends ml{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const gu={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(_h(t)||(this.files[t]=e))},get:function(t){if(this.enabled!==!1&&!_h(t))return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};function _h(t){try{const e=t.slice(t.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class HM{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(c){a++,s===!1&&r.onStart!==void 0&&r.onStart(c,o,a),s=!0},this.itemEnd=function(c){o++,r.onProgress!==void 0&&r.onProgress(c,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(c){r.onError!==void 0&&r.onError(c)},this.resolveURL=function(c){return c=c.normalize("NFC"),l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,f){return u.push(c,f),this},this.removeHandler=function(c){const f=u.indexOf(c);return f!==-1&&u.splice(f,2),this},this.getHandler=function(c){for(let f=0,d=u.length;f<d;f+=2){const p=u[f],_=u[f+1];if(p.global&&(p.lastIndex=0),p.test(c))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const zM=new HM;class Mf{constructor(e){this.manager=e!==void 0?e:zM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Mf.DEFAULT_MATERIAL_NAME="__DEFAULT";const ns=new WeakMap;class GM extends Mf{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=gu.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0);else{let f=ns.get(o);f===void 0&&(f=[],ns.set(o,f)),f.push({onLoad:n,onError:r})}return o}const a=So("img");function l(){c(),n&&n(this);const f=ns.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onLoad&&p.onLoad(this)}ns.delete(this),s.manager.itemEnd(e)}function u(f){c(),r&&r(f),gu.remove(`image:${e}`);const d=ns.get(this)||[];for(let p=0;p<d.length;p++){const _=d[p];_.onError&&_.onError(f)}ns.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function c(){a.removeEventListener("load",l,!1),a.removeEventListener("error",u,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),gu.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class WM extends Mf{constructor(e){super(e)}load(e,n,i,r){const s=new hn,o=new GM(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}const la=new he,ua=new Os,ti=new he;class Mg extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xt,this.projectionMatrix=new Xt,this.projectionMatrixInverse=new Xt,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(la,ua,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(la,ua,ti.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(la,ua,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(la,ua,ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ji=new he,vh=new Et,xh=new Et;class In extends Mg{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Mo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(uo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mo*2*Math.atan(Math.tan(uo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,n){return this.getViewBounds(e,vh,xh),n.subVectors(xh,vh)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(uo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Eg extends Mg{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const is=-90,rs=1;class $M extends Rn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(is,rs,e,n);r.layers=this.layers,this.add(r);const s=new In(is,rs,e,n);s.layers=this.layers,this.add(s);const o=new In(is,rs,e,n);o.layers=this.layers,this.add(o);const a=new In(is,rs,e,n);a.layers=this.layers,this.add(a);const l=new In(is,rs,e,n);l.layers=this.layers,this.add(l);const u=new In(is,rs,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const u of n)this.remove(u);if(e===ui)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Wa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,c]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(f,d,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class XM extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const bh=new Xt;class qM{constructor(e,n,i=0,r=1/0){this.ray=new vg(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new yf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):St("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return bh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bh),this}intersectObject(e,n=!0,i=[]){return Dc(e,this,i,n),i.sort(yh),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Dc(e[r],this,i,n);return i.sort(yh),i}}function yh(t,e){return t.distance-e.distance}function Dc(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)Dc(s[o],e,n,!0)}}const Pf=class Pf{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Pf.prototype.isMatrix2=!0;let Sh=Pf;function Mh(t,e,n,i){const r=YM(i);switch(n){case cg:return t*e;case dg:return t*e/r.components*r.byteLength;case pf:return t*e/r.components*r.byteLength;case Lr:return t*e*2/r.components*r.byteLength;case mf:return t*e*2/r.components*r.byteLength;case fg:return t*e*3/r.components*r.byteLength;case Gn:return t*e*4/r.components*r.byteLength;case gf:return t*e*4/r.components*r.byteLength;case ba:case ya:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Sa:case Ma:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ic:case sc:return Math.max(t,16)*Math.max(e,8)/4;case nc:case rc:return Math.max(t,8)*Math.max(e,8)/2;case oc:case ac:case uc:case cc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case lc:case Va:case fc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case dc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case pc:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case mc:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case gc:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case _c:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case vc:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case xc:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case bc:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case yc:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Sc:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Mc:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Ec:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case wc:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Tc:case Ac:case Rc:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Cc:case Pc:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Ha:case Lc:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function YM(t){switch(t){case Nn:case og:return{byteLength:1,components:1};case bo:case ag:case Bi:return{byteLength:2,components:1};case df:case hf:return{byteLength:2,components:4};case mi:case ff:case li:return{byteLength:4,components:1};case lg:case ug:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cf}}));typeof window<"u"&&(window.__THREE__?ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cf);function wg(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function KM(t){const e=new WeakMap;function n(a,l){const u=a.array,c=a.usage,f=u.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,u,c),a.onUploadCallback();let p;if(u instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)p=t.HALF_FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=t.SHORT;else if(u instanceof Uint32Array)p=t.UNSIGNED_INT;else if(u instanceof Int32Array)p=t.INT;else if(u instanceof Int8Array)p=t.BYTE;else if(u instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,u){const c=l.array,f=l.updateRanges;if(t.bindBuffer(u,a),f.length===0)t.bufferSubData(u,0,c);else{f.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<f.length;p++){const _=f[d],y=f[p];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++d,f[d]=y)}f.length=d+1;for(let p=0,_=f.length;p<_;p++){const y=f[p];t.bufferSubData(u,y.start*c.BYTES_PER_ELEMENT,c,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=e.get(a);(!c||c.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=e.get(a);if(u===void 0)e.set(a,n(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:r,remove:s,update:o}}var jM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ZM=`#ifdef USE_ALPHAHASH
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
#endif`,JM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,QM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nE=`#ifdef USE_AOMAP
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
#endif`,iE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rE=`#ifdef USE_BATCHING
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
#endif`,sE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,oE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,aE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uE=`#ifdef USE_IRIDESCENCE
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
#endif`,cE=`#ifdef USE_BUMPMAP
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
#endif`,fE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_E=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,xE=`#define PI 3.141592653589793
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
} // validated`,bE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yE=`vec3 transformedNormal = objectNormal;
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
#endif`,SE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ME=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,EE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,TE="gl_FragColor = linearToOutputTexel( gl_FragColor );",AE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,RE=`#ifdef USE_ENVMAP
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
#endif`,CE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,PE=`#ifdef USE_ENVMAP
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
#endif`,LE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,DE=`#ifdef USE_ENVMAP
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
#endif`,IE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,NE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,UE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,OE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,FE=`#ifdef USE_GRADIENTMAP
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
}`,BE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,VE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,HE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,zE=`#ifdef USE_ENVMAP
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
#endif`,GE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,WE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$E=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,XE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qE=`PhysicalMaterial material;
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
#endif`,YE=`uniform sampler2D dfgLUT;
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
}`,KE=`
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
#endif`,jE=`#if defined( RE_IndirectDiffuse )
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
#endif`,ZE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,JE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,QE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ew=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ow=`#if defined( USE_POINTS_UV )
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
#endif`,aw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dw=`#ifdef USE_MORPHTARGETS
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
#endif`,hw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,mw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_w=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,xw=`#ifdef USE_NORMALMAP
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
#endif`,bw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ew=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ww=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Aw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Iw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Uw=`float getShadowMask() {
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
}`,Ow=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fw=`#ifdef USE_SKINNING
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
#endif`,Bw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kw=`#ifdef USE_SKINNING
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
#endif`,Vw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ww=`#ifdef USE_TRANSMISSION
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
#endif`,$w=`#ifdef USE_TRANSMISSION
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
#endif`,Xw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zw=`uniform sampler2D t2D;
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
}`,Jw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,eT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nT=`#include <common>
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
}`,iT=`#if DEPTH_PACKING == 3200
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
}`,rT=`#define DISTANCE
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
}`,sT=`#define DISTANCE
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
}`,oT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,aT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lT=`uniform float scale;
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
}`,uT=`uniform vec3 diffuse;
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
}`,cT=`#include <common>
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
}`,fT=`uniform vec3 diffuse;
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
}`,dT=`#define LAMBERT
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
}`,hT=`#define LAMBERT
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
}`,pT=`#define MATCAP
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
}`,mT=`#define MATCAP
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
}`,gT=`#define NORMAL
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
}`,_T=`#define NORMAL
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
}`,vT=`#define PHONG
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
}`,xT=`#define PHONG
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
}`,bT=`#define STANDARD
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
}`,yT=`#define STANDARD
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
}`,ST=`#define TOON
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
}`,MT=`#define TOON
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
}`,ET=`uniform float size;
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
}`,wT=`uniform vec3 diffuse;
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
}`,TT=`#include <common>
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
}`,AT=`uniform vec3 color;
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
}`,RT=`uniform float rotation;
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
}`,CT=`uniform vec3 diffuse;
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
}`,mt={alphahash_fragment:jM,alphahash_pars_fragment:ZM,alphamap_fragment:JM,alphamap_pars_fragment:QM,alphatest_fragment:eE,alphatest_pars_fragment:tE,aomap_fragment:nE,aomap_pars_fragment:iE,batching_pars_vertex:rE,batching_vertex:sE,begin_vertex:oE,beginnormal_vertex:aE,bsdfs:lE,iridescence_fragment:uE,bumpmap_pars_fragment:cE,clipping_planes_fragment:fE,clipping_planes_pars_fragment:dE,clipping_planes_pars_vertex:hE,clipping_planes_vertex:pE,color_fragment:mE,color_pars_fragment:gE,color_pars_vertex:_E,color_vertex:vE,common:xE,cube_uv_reflection_fragment:bE,defaultnormal_vertex:yE,displacementmap_pars_vertex:SE,displacementmap_vertex:ME,emissivemap_fragment:EE,emissivemap_pars_fragment:wE,colorspace_fragment:TE,colorspace_pars_fragment:AE,envmap_fragment:RE,envmap_common_pars_fragment:CE,envmap_pars_fragment:PE,envmap_pars_vertex:LE,envmap_physical_pars_fragment:zE,envmap_vertex:DE,fog_vertex:IE,fog_pars_vertex:NE,fog_fragment:UE,fog_pars_fragment:OE,gradientmap_pars_fragment:FE,lightmap_pars_fragment:BE,lights_lambert_fragment:kE,lights_lambert_pars_fragment:VE,lights_pars_begin:HE,lights_toon_fragment:GE,lights_toon_pars_fragment:WE,lights_phong_fragment:$E,lights_phong_pars_fragment:XE,lights_physical_fragment:qE,lights_physical_pars_fragment:YE,lights_fragment_begin:KE,lights_fragment_maps:jE,lights_fragment_end:ZE,lightprobes_pars_fragment:JE,logdepthbuf_fragment:QE,logdepthbuf_pars_fragment:ew,logdepthbuf_pars_vertex:tw,logdepthbuf_vertex:nw,map_fragment:iw,map_pars_fragment:rw,map_particle_fragment:sw,map_particle_pars_fragment:ow,metalnessmap_fragment:aw,metalnessmap_pars_fragment:lw,morphinstance_vertex:uw,morphcolor_vertex:cw,morphnormal_vertex:fw,morphtarget_pars_vertex:dw,morphtarget_vertex:hw,normal_fragment_begin:pw,normal_fragment_maps:mw,normal_pars_fragment:gw,normal_pars_vertex:_w,normal_vertex:vw,normalmap_pars_fragment:xw,clearcoat_normal_fragment_begin:bw,clearcoat_normal_fragment_maps:yw,clearcoat_pars_fragment:Sw,iridescence_pars_fragment:Mw,opaque_fragment:Ew,packing:ww,premultiplied_alpha_fragment:Tw,project_vertex:Aw,dithering_fragment:Rw,dithering_pars_fragment:Cw,roughnessmap_fragment:Pw,roughnessmap_pars_fragment:Lw,shadowmap_pars_fragment:Dw,shadowmap_pars_vertex:Iw,shadowmap_vertex:Nw,shadowmask_pars_fragment:Uw,skinbase_vertex:Ow,skinning_pars_vertex:Fw,skinning_vertex:Bw,skinnormal_vertex:kw,specularmap_fragment:Vw,specularmap_pars_fragment:Hw,tonemapping_fragment:zw,tonemapping_pars_fragment:Gw,transmission_fragment:Ww,transmission_pars_fragment:$w,uv_pars_fragment:Xw,uv_pars_vertex:qw,uv_vertex:Yw,worldpos_vertex:Kw,background_vert:jw,background_frag:Zw,backgroundCube_vert:Jw,backgroundCube_frag:Qw,cube_vert:eT,cube_frag:tT,depth_vert:nT,depth_frag:iT,distance_vert:rT,distance_frag:sT,equirect_vert:oT,equirect_frag:aT,linedashed_vert:lT,linedashed_frag:uT,meshbasic_vert:cT,meshbasic_frag:fT,meshlambert_vert:dT,meshlambert_frag:hT,meshmatcap_vert:pT,meshmatcap_frag:mT,meshnormal_vert:gT,meshnormal_frag:_T,meshphong_vert:vT,meshphong_frag:xT,meshphysical_vert:bT,meshphysical_frag:yT,meshtoon_vert:ST,meshtoon_frag:MT,points_vert:ET,points_frag:wT,shadow_vert:TT,shadow_frag:AT,sprite_vert:RT,sprite_frag:CT},Xe={common:{diffuse:{value:new At(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},envMapRotation:{value:new ft},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new At(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new he},probesMax:{value:new he},probesResolution:{value:new he}},points:{diffuse:{value:new At(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new At(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},oi={basic:{uniforms:gn([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:gn([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new At(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:gn([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new At(0)},specular:{value:new At(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:gn([Xe.common,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.roughnessmap,Xe.metalnessmap,Xe.fog,Xe.lights,{emissive:{value:new At(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:gn([Xe.common,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.gradientmap,Xe.fog,Xe.lights,{emissive:{value:new At(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:gn([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:gn([Xe.points,Xe.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:gn([Xe.common,Xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:gn([Xe.common,Xe.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:gn([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:gn([Xe.sprite,Xe.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ft}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:gn([Xe.common,Xe.displacementmap,{referencePosition:{value:new he},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:gn([Xe.lights,Xe.fog,{color:{value:new At(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};oi.physical={uniforms:gn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new At(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new At(0)},specularColor:{value:new At(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const ca={r:0,b:0,g:0},PT=new Xt,Tg=new ft;Tg.set(-1,0,0,0,1,0,0,0,1);function LT(t,e,n,i,r,s){const o=new At(0);let a=r===!0?0:1,l,u,c=null,f=0,d=null;function p(M){let C=M.isScene===!0?M.background:null;if(C&&C.isTexture){const b=M.backgroundBlurriness>0;C=e.get(C,b)}return C}function _(M){let C=!1;const b=p(M);b===null?g(o,a):b&&b.isColor&&(g(b,1),C=!0);const I=t.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,s):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||C)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function y(M,C){const b=p(C);b&&(b.isCubeTexture||b.mapping===pl)?(u===void 0&&(u=new Kn(new Io(1,1,1),new gi({name:"BackgroundCubeMaterial",uniforms:ws(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,w,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=b,u.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(PT.makeRotationFromEuler(C.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Tg),u.material.toneMapped=bt.getTransfer(b.colorSpace)!==Rt,(c!==b||f!==b.version||d!==t.toneMapping)&&(u.material.needsUpdate=!0,c=b,f=b.version,d=t.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Kn(new gl(2,2),new gi({name:"BackgroundMaterial",uniforms:ws(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:or,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=bt.getTransfer(b.colorSpace)!==Rt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(c!==b||f!==b.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,c=b,f=b.version,d=t.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,C){M.getRGB(ca,Sg(t)),n.buffers.color.setClear(ca.r,ca.g,ca.b,C,s)}function h(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,C=1){o.set(M),a=C,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:_,addToRenderList:y,dispose:h}}function DT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(D,H,ee,X,J){let le=!1;const L=f(D,X,ee,H);s!==L&&(s=L,u(s.object)),le=p(D,X,ee,J),le&&_(D,X,ee,J),J!==null&&e.update(J,t.ELEMENT_ARRAY_BUFFER),(le||o)&&(o=!1,b(D,H,ee,X),J!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function l(){return t.createVertexArray()}function u(D){return t.bindVertexArray(D)}function c(D){return t.deleteVertexArray(D)}function f(D,H,ee,X){const J=X.wireframe===!0;let le=i[H.id];le===void 0&&(le={},i[H.id]=le);const L=D.isInstancedMesh===!0?D.id:0;let $=le[L];$===void 0&&($={},le[L]=$);let ge=$[ee.id];ge===void 0&&(ge={},$[ee.id]=ge);let Ue=ge[J];return Ue===void 0&&(Ue=d(l()),ge[J]=Ue),Ue}function d(D){const H=[],ee=[],X=[];for(let J=0;J<n;J++)H[J]=0,ee[J]=0,X[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:ee,attributeDivisors:X,object:D,attributes:{},index:null}}function p(D,H,ee,X){const J=s.attributes,le=H.attributes;let L=0;const $=ee.getAttributes();for(const ge in $)if($[ge].location>=0){const Pe=J[ge];let ke=le[ge];if(ke===void 0&&(ge==="instanceMatrix"&&D.instanceMatrix&&(ke=D.instanceMatrix),ge==="instanceColor"&&D.instanceColor&&(ke=D.instanceColor)),Pe===void 0||Pe.attribute!==ke||ke&&Pe.data!==ke.data)return!0;L++}return s.attributesNum!==L||s.index!==X}function _(D,H,ee,X){const J={},le=H.attributes;let L=0;const $=ee.getAttributes();for(const ge in $)if($[ge].location>=0){let Pe=le[ge];Pe===void 0&&(ge==="instanceMatrix"&&D.instanceMatrix&&(Pe=D.instanceMatrix),ge==="instanceColor"&&D.instanceColor&&(Pe=D.instanceColor));const ke={};ke.attribute=Pe,Pe&&Pe.data&&(ke.data=Pe.data),J[ge]=ke,L++}s.attributes=J,s.attributesNum=L,s.index=X}function y(){const D=s.newAttributes;for(let H=0,ee=D.length;H<ee;H++)D[H]=0}function g(D){h(D,0)}function h(D,H){const ee=s.newAttributes,X=s.enabledAttributes,J=s.attributeDivisors;ee[D]=1,X[D]===0&&(t.enableVertexAttribArray(D),X[D]=1),J[D]!==H&&(t.vertexAttribDivisor(D,H),J[D]=H)}function M(){const D=s.newAttributes,H=s.enabledAttributes;for(let ee=0,X=H.length;ee<X;ee++)H[ee]!==D[ee]&&(t.disableVertexAttribArray(ee),H[ee]=0)}function C(D,H,ee,X,J,le,L){L===!0?t.vertexAttribIPointer(D,H,ee,J,le):t.vertexAttribPointer(D,H,ee,X,J,le)}function b(D,H,ee,X){y();const J=X.attributes,le=ee.getAttributes(),L=H.defaultAttributeValues;for(const $ in le){const ge=le[$];if(ge.location>=0){let Ue=J[$];if(Ue===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(Ue=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(Ue=D.instanceColor)),Ue!==void 0){const Pe=Ue.normalized,ke=Ue.itemSize,Le=e.get(Ue);if(Le===void 0)continue;const De=Le.buffer,ye=Le.type,ie=Le.bytesPerElement,W=ye===t.INT||ye===t.UNSIGNED_INT||Ue.gpuType===ff;if(Ue.isInterleavedBufferAttribute){const ae=Ue.data,ve=ae.stride,Te=Ue.offset;if(ae.isInstancedInterleavedBuffer){for(let Fe=0;Fe<ge.locationSize;Fe++)h(ge.location+Fe,ae.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Fe=0;Fe<ge.locationSize;Fe++)g(ge.location+Fe);t.bindBuffer(t.ARRAY_BUFFER,De);for(let Fe=0;Fe<ge.locationSize;Fe++)C(ge.location+Fe,ke/ge.locationSize,ye,Pe,ve*ie,(Te+ke/ge.locationSize*Fe)*ie,W)}else{if(Ue.isInstancedBufferAttribute){for(let ae=0;ae<ge.locationSize;ae++)h(ge.location+ae,Ue.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Ue.meshPerAttribute*Ue.count)}else for(let ae=0;ae<ge.locationSize;ae++)g(ge.location+ae);t.bindBuffer(t.ARRAY_BUFFER,De);for(let ae=0;ae<ge.locationSize;ae++)C(ge.location+ae,ke/ge.locationSize,ye,Pe,ke*ie,ke/ge.locationSize*ae*ie,W)}}else if(L!==void 0){const Pe=L[$];if(Pe!==void 0)switch(Pe.length){case 2:t.vertexAttrib2fv(ge.location,Pe);break;case 3:t.vertexAttrib3fv(ge.location,Pe);break;case 4:t.vertexAttrib4fv(ge.location,Pe);break;default:t.vertexAttrib1fv(ge.location,Pe)}}}}M()}function I(){S();for(const D in i){const H=i[D];for(const ee in H){const X=H[ee];for(const J in X){const le=X[J];for(const L in le)c(le[L].object),delete le[L];delete X[J]}}delete i[D]}}function w(D){if(i[D.id]===void 0)return;const H=i[D.id];for(const ee in H){const X=H[ee];for(const J in X){const le=X[J];for(const L in le)c(le[L].object),delete le[L];delete X[J]}}delete i[D.id]}function B(D){for(const H in i){const ee=i[H];for(const X in ee){const J=ee[X];if(J[D.id]===void 0)continue;const le=J[D.id];for(const L in le)c(le[L].object),delete le[L];delete J[D.id]}}}function v(D){for(const H in i){const ee=i[H],X=D.isInstancedMesh===!0?D.id:0,J=ee[X];if(J!==void 0){for(const le in J){const L=J[le];for(const $ in L)c(L[$].object),delete L[$];delete J[le]}delete ee[X],Object.keys(ee).length===0&&delete i[H]}}}function S(){F(),o=!0,s!==r&&(s=r,u(s.object))}function F(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:S,resetDefaultState:F,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:B,initAttributes:y,enableAttribute:g,disableUnusedAttributes:M}}function IT(t,e,n){let i;function r(l){i=l}function s(l,u){t.drawArrays(i,l,u),n.update(u,i,1)}function o(l,u,c){c!==0&&(t.drawArraysInstanced(i,l,u,c),n.update(u,i,c))}function a(l,u,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,c);let d=0;for(let p=0;p<c;p++)d+=u[p];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function NT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(B){return!(B!==Gn&&i.convert(B)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(B){const v=B===Bi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==Nn&&i.convert(B)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==li&&!v)}function l(B){if(B==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const c=l(u);c!==u&&(ut("WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const f=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),M=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),C=t.getParameter(t.MAX_VARYING_VECTORS),b=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),I=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:M,maxVaryings:C,maxFragmentUniforms:b,maxSamples:I,samples:w}}function UT(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new _r,a=new ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){n=c(f,d,0)},this.setState=function(f,d,p){const _=f.clippingPlanes,y=f.clipIntersection,g=f.clipShadows,h=t.get(f);if(!r||_===null||_.length===0||s&&!g)s?c(null):u();else{const M=s?0:i,C=M*4;let b=h.clippingState||null;l.value=b,b=c(_,d,C,p);for(let I=0;I!==C;++I)b[I]=n[I];h.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(f,d,p,_){const y=f!==null?f.length:0;let g=null;if(y!==0){if(g=l.value,_!==!0||g===null){const h=p+y*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<h)&&(g=new Float32Array(h));for(let C=0,b=p;C!==y;++C,b+=4)o.copy(f[C]).applyMatrix4(M,a),o.normal.toArray(g,b),g[b+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}const rr=4,Eh=[.125,.215,.35,.446,.526,.582],xr=20,OT=256,Ks=new Eg,wh=new At;let _u=null,vu=0,xu=0,bu=!1;const FT=new he;class Th{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=FT}=s;_u=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_u,vu,xu),this._renderer.xr.enabled=bu,e.scissorTest=!1,ss(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Pr||e.mapping===Ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_u=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Bi,format:Gn,colorSpace:za,depthBuffer:!1},r=Ah(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=BT(s)),this._blurMaterial=VT(s,e,n),this._ggxMaterial=kT(s,e,n)}return r}_compileMaterial(e){const n=new Kn(new _i,e);this._renderer.compile(n,Ks)}_sceneToCubeUV(e,n,i,r,s){const l=new In(90,1,n,i),u=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(wh),f.toneMapping=di,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kn(new Io,new $a({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,g=y.material;let h=!1;const M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,h=!0):(g.color.copy(wh),h=!0);for(let C=0;C<6;C++){const b=C%3;b===0?(l.up.set(0,u[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+c[C],s.y,s.z)):b===1?(l.up.set(0,0,u[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+c[C],s.z)):(l.up.set(0,u[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+c[C]));const I=this._cubeSize;ss(r,b*I,C>2?I:0,I,I),f.setRenderTarget(r),h&&f.render(y,l),f.render(e,l)}f.toneMapping=p,f.autoClear=d,e.background=M}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Pr||e.mapping===Ms;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rh());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ss(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Ks)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,u=i/(this._lodMeshes.length-1),c=n/(this._lodMeshes.length-1),f=Math.sqrt(u*u-c*c),d=0+u*1.25,p=f*d,{_lodMax:_}=this,y=this._sizeLods[i],g=3*y*(i>_-rr?i-_+rr:0),h=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-n,ss(s,g,h,3*y,2*y),r.setRenderTarget(s),r.render(a,Ks),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,ss(e,g,h,3*y,2*y),r.setRenderTarget(e),r.render(a,Ks)}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&St("blur direction must be either latitudinal or longitudinal!");const c=3,f=this._lodMeshes[r];f.material=u;const d=u.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*xr-1),y=s/_,g=isFinite(s)?1+Math.floor(c*y):xr;g>xr&&ut(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${xr}`);const h=[];let M=0;for(let B=0;B<xr;++B){const v=B/y,S=Math.exp(-v*v/2);h.push(S),B===0?M+=S:B<g&&(M+=2*S)}for(let B=0;B<h.length;B++)h[B]=h[B]/M;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:C}=this;d.dTheta.value=_,d.mipInt.value=C-i;const b=this._sizeLods[r],I=3*b*(r>C-rr?r-C+rr:0),w=4*(this._cubeSize-b);ss(n,I,w,3*b,2*b),l.setRenderTarget(n),l.render(f,Ks)}}function BT(t){const e=[],n=[],i=[];let r=t;const s=t-rr+1+Eh.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>t-rr?l=Eh[o-t+rr-1]:o===0&&(l=0),n.push(l);const u=1/(a-2),c=-u,f=1+u,d=[c,c,f,c,f,f,c,c,f,f,c,f],p=6,_=6,y=3,g=2,h=1,M=new Float32Array(y*_*p),C=new Float32Array(g*_*p),b=new Float32Array(h*_*p);for(let w=0;w<p;w++){const B=w%3*2/3-1,v=w>2?0:-1,S=[B,v,0,B+2/3,v,0,B+2/3,v+1,0,B,v,0,B+2/3,v+1,0,B,v+1,0];M.set(S,y*_*w),C.set(d,g*_*w);const F=[w,w,w,w,w,w];b.set(F,h*_*w)}const I=new _i;I.setAttribute("position",new pi(M,y)),I.setAttribute("uv",new pi(C,g)),I.setAttribute("faceIndex",new pi(b,h)),i.push(new Kn(I,null)),r>rr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Ah(t,e,n){const i=new hi(t,e,n);return i.texture.mapping=pl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ss(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function kT(t,e,n){return new gi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:OT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:_l(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function VT(t,e,n){const i=new Float32Array(xr),r=new he(0,1,0);return new gi({name:"SphericalGaussianBlur",defines:{n:xr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_l(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Rh(){return new gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_l(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Ch(){return new gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function _l(){return`

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
	`}class Ag extends hi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new bg(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Io(5,5,5),s=new gi({name:"CubemapFromEquirect",uniforms:ws(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Sn,blending:Ii});s.uniforms.tEquirect.value=n;const o=new Kn(r,s),a=n.minFilter;return n.minFilter===Sr&&(n.minFilter=fn),new $M(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}function HT(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?o(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===$l||p===Xl)if(e.has(d)){const _=e.get(d).texture;return a(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const y=new Ag(_.height);return y.fromEquirectangularTexture(t,d),e.set(d,y),d.addEventListener("dispose",u),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const p=d.mapping,_=p===$l||p===Xl,y=p===Pr||p===Ms;if(_||y){let g=n.get(d);const h=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new Th(t)),g=_?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,n.set(d,g),g.texture;if(g!==void 0)return g.texture;{const M=d.image;return _&&M&&M.height>0||y&&M&&l(M)?(i===null&&(i=new Th(t)),g=_?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,n.set(d,g),d.addEventListener("dispose",c),g.texture):null}}}return d}function a(d,p){return p===$l?d.mapping=Pr:p===Xl&&(d.mapping=Ms),d}function l(d){let p=0;const _=6;for(let y=0;y<_;y++)d[y]!==void 0&&p++;return p===_}function u(d){const p=d.target;p.removeEventListener("dispose",u);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function c(d){const p=d.target;p.removeEventListener("dispose",c);const _=n.get(p);_!==void 0&&(n.delete(p),_.dispose())}function f(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function zT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&hs("WebGLRenderer: "+i+" extension not supported."),r}}}function GT(t,e,n,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(f){const d=f.attributes;for(const p in d)e.update(d[p],t.ARRAY_BUFFER)}function u(f){const d=[],p=f.index,_=f.attributes.position;let y=0;if(_===void 0)return;if(p!==null){const M=p.array;y=p.version;for(let C=0,b=M.length;C<b;C+=3){const I=M[C+0],w=M[C+1],B=M[C+2];d.push(I,w,w,B,B,I)}}else{const M=_.array;y=_.version;for(let C=0,b=M.length/3-1;C<b;C+=3){const I=C+0,w=C+1,B=C+2;d.push(I,w,w,B,B,I)}}const g=new(_.count>=65535?_g:gg)(d,1);g.version=y;const h=s.get(f);h&&e.remove(h),s.set(f,g)}function c(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&u(f)}else u(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:c}}function WT(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){t.drawElements(i,d,s,f*o),n.update(d,i,1)}function u(f,d,p){p!==0&&(t.drawElementsInstanced(i,d,s,f*o,p),n.update(d,i,p))}function c(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,p);let y=0;for(let g=0;g<p;g++)y+=d[g];n.update(y,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=c}function $T(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:St("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function XT(t,e,n){const i=new WeakMap,r=new Vt;function s(o,a,l){const u=o.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=c!==void 0?c.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let F=function(){v.dispose(),i.delete(a),a.removeEventListener("dispose",F)};var p=F;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],C=a.morphAttributes.color||[];let b=0;_===!0&&(b=1),y===!0&&(b=2),g===!0&&(b=3);let I=a.attributes.position.count*b,w=1;I>e.maxTextureSize&&(w=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const B=new Float32Array(I*w*4*f),v=new pg(B,I,w,f);v.type=li,v.needsUpdate=!0;const S=b*4;for(let D=0;D<f;D++){const H=h[D],ee=M[D],X=C[D],J=I*w*4*D;for(let le=0;le<H.count;le++){const L=le*S;_===!0&&(r.fromBufferAttribute(H,le),B[J+L+0]=r.x,B[J+L+1]=r.y,B[J+L+2]=r.z,B[J+L+3]=0),y===!0&&(r.fromBufferAttribute(ee,le),B[J+L+4]=r.x,B[J+L+5]=r.y,B[J+L+6]=r.z,B[J+L+7]=0),g===!0&&(r.fromBufferAttribute(X,le),B[J+L+8]=r.x,B[J+L+9]=r.y,B[J+L+10]=r.z,B[J+L+11]=X.itemSize===4?r.w:1)}}d={count:f,texture:v,size:new Et(I,w)},i.set(a,d),a.addEventListener("dispose",F)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let _=0;for(let g=0;g<u.length;g++)_+=u[g];const y=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",u)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function qT(t,e,n,i,r){let s=new WeakMap;function o(u){const c=r.render.frame,f=u.geometry,d=e.get(u,f);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),s.get(u)!==c&&(n.update(u.instanceMatrix,t.ARRAY_BUFFER),u.instanceColor!==null&&n.update(u.instanceColor,t.ARRAY_BUFFER),s.set(u,c))),u.isSkinnedMesh){const p=u.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return d}function a(){s=new WeakMap}function l(u){const c=u.target;c.removeEventListener("dispose",l),i.releaseStatesOfObject(c),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:o,dispose:a}}const YT={[Jm]:"LINEAR_TONE_MAPPING",[Qm]:"REINHARD_TONE_MAPPING",[eg]:"CINEON_TONE_MAPPING",[tg]:"ACES_FILMIC_TONE_MAPPING",[ig]:"AGX_TONE_MAPPING",[rg]:"NEUTRAL_TONE_MAPPING",[ng]:"CUSTOM_TONE_MAPPING"};function KT(t,e,n,i,r,s){const o=new hi(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new Es(e,n):void 0}),a=new hi(e,n,{type:Bi,depthBuffer:!1,stencilBuffer:!1}),l=new _i;l.setAttribute("position",new Fn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Fn([0,2,0,0,2,0],2));const u=new BM({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Kn(l,u),f=new Eg(-1,1,1,-1,0,1);let d=null,p=null,_=!1,y,g=null,h=[],M=!1;this.setSize=function(C,b){o.setSize(C,b),a.setSize(C,b);for(let I=0;I<h.length;I++){const w=h[I];w.setSize&&w.setSize(C,b)}},this.setEffects=function(C){h=C,M=h.length>0&&h[0].isRenderPass===!0;const b=o.width,I=o.height;for(let w=0;w<h.length;w++){const B=h[w];B.setSize&&B.setSize(b,I)}},this.begin=function(C,b){if(_||C.toneMapping===di&&h.length===0)return!1;if(g=b,b!==null){const I=b.width,w=b.height;(o.width!==I||o.height!==w)&&this.setSize(I,w)}return M===!1&&C.setRenderTarget(o),y=C.toneMapping,C.toneMapping=di,!0},this.hasRenderPass=function(){return M},this.end=function(C,b){C.toneMapping=y,_=!0;let I=o,w=a;for(let B=0;B<h.length;B++){const v=h[B];if(v.enabled!==!1&&(v.render(C,w,I,b),v.needsSwap!==!1)){const S=I;I=w,w=S}}if(d!==C.outputColorSpace||p!==C.toneMapping){d=C.outputColorSpace,p=C.toneMapping,u.defines={},bt.getTransfer(d)===Rt&&(u.defines.SRGB_TRANSFER="");const B=YT[p];B&&(u.defines[B]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=I.texture,C.setRenderTarget(g),C.render(c,f),g=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),u.dispose()}}const Rg=new hn,Ic=new Es(1,1),Cg=new pg,Pg=new mM,Lg=new bg,Ph=[],Lh=[],Dh=new Float32Array(16),Ih=new Float32Array(9),Nh=new Float32Array(4);function Fs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Ph[r];if(s===void 0&&(s=new Float32Array(r),Ph[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Jt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Qt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function vl(t,e){let n=Lh[e];n===void 0&&(n=new Int32Array(e),Lh[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function jT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function ZT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Jt(n,e))return;t.uniform2fv(this.addr,e),Qt(n,e)}}function JT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Jt(n,e))return;t.uniform3fv(this.addr,e),Qt(n,e)}}function QT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Jt(n,e))return;t.uniform4fv(this.addr,e),Qt(n,e)}}function eA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Jt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Qt(n,e)}else{if(Jt(n,i))return;Nh.set(i),t.uniformMatrix2fv(this.addr,!1,Nh),Qt(n,i)}}function tA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Jt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Qt(n,e)}else{if(Jt(n,i))return;Ih.set(i),t.uniformMatrix3fv(this.addr,!1,Ih),Qt(n,i)}}function nA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Jt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Qt(n,e)}else{if(Jt(n,i))return;Dh.set(i),t.uniformMatrix4fv(this.addr,!1,Dh),Qt(n,i)}}function iA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function rA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Jt(n,e))return;t.uniform2iv(this.addr,e),Qt(n,e)}}function sA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Jt(n,e))return;t.uniform3iv(this.addr,e),Qt(n,e)}}function oA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Jt(n,e))return;t.uniform4iv(this.addr,e),Qt(n,e)}}function aA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function lA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Jt(n,e))return;t.uniform2uiv(this.addr,e),Qt(n,e)}}function uA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Jt(n,e))return;t.uniform3uiv(this.addr,e),Qt(n,e)}}function cA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Jt(n,e))return;t.uniform4uiv(this.addr,e),Qt(n,e)}}function fA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Ic.compareFunction=n.isReversedDepthBuffer()?vf:_f,s=Ic):s=Rg,n.setTexture2D(e||s,r)}function dA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Pg,r)}function hA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Lg,r)}function pA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Cg,r)}function mA(t){switch(t){case 5126:return jT;case 35664:return ZT;case 35665:return JT;case 35666:return QT;case 35674:return eA;case 35675:return tA;case 35676:return nA;case 5124:case 35670:return iA;case 35667:case 35671:return rA;case 35668:case 35672:return sA;case 35669:case 35673:return oA;case 5125:return aA;case 36294:return lA;case 36295:return uA;case 36296:return cA;case 35678:case 36198:case 36298:case 36306:case 35682:return fA;case 35679:case 36299:case 36307:return dA;case 35680:case 36300:case 36308:case 36293:return hA;case 36289:case 36303:case 36311:case 36292:return pA}}function gA(t,e){t.uniform1fv(this.addr,e)}function _A(t,e){const n=Fs(e,this.size,2);t.uniform2fv(this.addr,n)}function vA(t,e){const n=Fs(e,this.size,3);t.uniform3fv(this.addr,n)}function xA(t,e){const n=Fs(e,this.size,4);t.uniform4fv(this.addr,n)}function bA(t,e){const n=Fs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function yA(t,e){const n=Fs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function SA(t,e){const n=Fs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function MA(t,e){t.uniform1iv(this.addr,e)}function EA(t,e){t.uniform2iv(this.addr,e)}function wA(t,e){t.uniform3iv(this.addr,e)}function TA(t,e){t.uniform4iv(this.addr,e)}function AA(t,e){t.uniform1uiv(this.addr,e)}function RA(t,e){t.uniform2uiv(this.addr,e)}function CA(t,e){t.uniform3uiv(this.addr,e)}function PA(t,e){t.uniform4uiv(this.addr,e)}function LA(t,e,n){const i=this.cache,r=e.length,s=vl(n,r);Jt(i,s)||(t.uniform1iv(this.addr,s),Qt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=Ic:o=Rg;for(let a=0;a!==r;++a)n.setTexture2D(e[a]||o,s[a])}function DA(t,e,n){const i=this.cache,r=e.length,s=vl(n,r);Jt(i,s)||(t.uniform1iv(this.addr,s),Qt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Pg,s[o])}function IA(t,e,n){const i=this.cache,r=e.length,s=vl(n,r);Jt(i,s)||(t.uniform1iv(this.addr,s),Qt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Lg,s[o])}function NA(t,e,n){const i=this.cache,r=e.length,s=vl(n,r);Jt(i,s)||(t.uniform1iv(this.addr,s),Qt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Cg,s[o])}function UA(t){switch(t){case 5126:return gA;case 35664:return _A;case 35665:return vA;case 35666:return xA;case 35674:return bA;case 35675:return yA;case 35676:return SA;case 5124:case 35670:return MA;case 35667:case 35671:return EA;case 35668:case 35672:return wA;case 35669:case 35673:return TA;case 5125:return AA;case 36294:return RA;case 36295:return CA;case 36296:return PA;case 35678:case 36198:case 36298:case 36306:case 35682:return LA;case 35679:case 36299:case 36307:return DA;case 35680:case 36300:case 36308:case 36293:return IA;case 36289:case 36303:case 36311:case 36292:return NA}}class OA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=mA(n.type)}}class FA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=UA(n.type)}}class BA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const yu=/(\w+)(\])?(\[|\.)?/g;function Uh(t,e){t.seq.push(e),t.map[e.id]=e}function kA(t,e,n){const i=t.name,r=i.length;for(yu.lastIndex=0;;){const s=yu.exec(i),o=yu.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){Uh(n,u===void 0?new OA(a,t,e):new FA(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new BA(a),Uh(n,f)),n=f}}}class Ea{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(n,o),l=e.getUniformLocation(n,a.name);kA(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Oh(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const VA=37297;let HA=0;function zA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const Fh=new ft;function GA(t){bt._getMatrix(Fh,bt.workingColorSpace,t);const e=`mat3( ${Fh.elements.map(n=>n.toFixed(4))} )`;switch(bt.getTransfer(t)){case Ga:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return ut("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Bh(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+zA(t.getShaderSource(e),a)}else return s}function WA(t,e){const n=GA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const $A={[Jm]:"Linear",[Qm]:"Reinhard",[eg]:"Cineon",[tg]:"ACESFilmic",[ig]:"AgX",[rg]:"Neutral",[ng]:"Custom"};function XA(t,e){const n=$A[e];return n===void 0?(ut("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const fa=new he;function qA(){bt.getLuminanceCoefficients(fa);const t=fa.x.toFixed(4),e=fa.y.toFixed(4),n=fa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function YA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eo).join(`
`)}function KA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function jA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function eo(t){return t!==""}function kh(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vh(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ZA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nc(t){return t.replace(ZA,QA)}const JA=new Map;function QA(t,e){let n=mt[e];if(n===void 0){const i=JA.get(e);if(i!==void 0)n=mt[i],ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Nc(n)}const e1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hh(t){return t.replace(e1,t1)}function t1(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function zh(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const n1={[xa]:"SHADOWMAP_TYPE_PCF",[Qs]:"SHADOWMAP_TYPE_VSM"};function i1(t){return n1[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const r1={[Pr]:"ENVMAP_TYPE_CUBE",[Ms]:"ENVMAP_TYPE_CUBE",[pl]:"ENVMAP_TYPE_CUBE_UV"};function s1(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":r1[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const o1={[Ms]:"ENVMAP_MODE_REFRACTION"};function a1(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":o1[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const l1={[Zm]:"ENVMAP_BLENDING_MULTIPLY",[IS]:"ENVMAP_BLENDING_MIX",[NS]:"ENVMAP_BLENDING_ADD"};function u1(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":l1[t.combine]||"ENVMAP_BLENDING_NONE"}function c1(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function f1(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=i1(n),u=s1(n),c=a1(n),f=u1(n),d=c1(n),p=YA(n),_=KA(s),y=r.createProgram();let g,h,M=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(eo).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(eo).join(`
`),h.length>0&&(h+=`
`)):(g=[zh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),h=[zh(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==di?"#define TONE_MAPPING":"",n.toneMapping!==di?mt.tonemapping_pars_fragment:"",n.toneMapping!==di?XA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,WA("linearToOutputTexel",n.outputColorSpace),qA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(eo).join(`
`)),o=Nc(o),o=kh(o,n),o=Vh(o,n),a=Nc(a),a=kh(a,n),a=Vh(a,n),o=Hh(o),a=Hh(a),n.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===Jd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Jd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const C=M+g+o,b=M+h+a,I=Oh(r,r.VERTEX_SHADER,C),w=Oh(r,r.FRAGMENT_SHADER,b);r.attachShader(y,I),r.attachShader(y,w),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function B(D){if(t.debug.checkShaderErrors){const H=r.getProgramInfoLog(y)||"",ee=r.getShaderInfoLog(I)||"",X=r.getShaderInfoLog(w)||"",J=H.trim(),le=ee.trim(),L=X.trim();let $=!0,ge=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if($=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,I,w);else{const Ue=Bh(r,I,"vertex"),Pe=Bh(r,w,"fragment");St("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+J+`
`+Ue+`
`+Pe)}else J!==""?ut("WebGLProgram: Program Info Log:",J):(le===""||L==="")&&(ge=!1);ge&&(D.diagnostics={runnable:$,programLog:J,vertexShader:{log:le,prefix:g},fragmentShader:{log:L,prefix:h}})}r.deleteShader(I),r.deleteShader(w),v=new Ea(r,y),S=jA(r,y)}let v;this.getUniforms=function(){return v===void 0&&B(this),v};let S;this.getAttributes=function(){return S===void 0&&B(this),S};let F=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(y,VA)),F},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=HA++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=I,this.fragmentShader=w,this}let d1=0;class h1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new p1(e),n.set(e,i)),i}}class p1{constructor(e){this.id=d1++,this.code=e,this.usedTimes=0}}function m1(t){return t===Lr||t===Va||t===Ha}function g1(t,e,n,i,r,s){const o=new yf,a=new h1,l=new Set,u=[],c=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function y(v,S,F,D,H,ee){const X=D.fog,J=H.geometry,le=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,L=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,$=e.get(v.envMap||le,L),ge=$&&$.mapping===pl?$.image.height:null,Ue=p[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&ut("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const Pe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ke=Pe!==void 0?Pe.length:0;let Le=0;J.morphAttributes.position!==void 0&&(Le=1),J.morphAttributes.normal!==void 0&&(Le=2),J.morphAttributes.color!==void 0&&(Le=3);let De,ye,ie,W;if(Ue){const Ye=oi[Ue];De=Ye.vertexShader,ye=Ye.fragmentShader}else{De=v.vertexShader,ye=v.fragmentShader;const Ye=a.getVertexShaderStage(v),Ft=a.getFragmentShaderStage(v);a.update(v,Ye,Ft),ie=Ye.id,W=Ft.id}const ae=t.getRenderTarget(),ve=t.state.buffers.depth.getReversed(),Te=H.isInstancedMesh===!0,Fe=H.isBatchedMesh===!0,T=!!v.map,R=!!v.matcap,k=!!$,re=!!v.aoMap,Q=!!v.lightMap,ue=!!v.bumpMap&&v.wireframe===!1,Ae=!!v.normalMap,Ee=!!v.displacementMap,Re=!!v.emissiveMap,Y=!!v.metalnessMap,be=!!v.roughnessMap,N=v.anisotropy>0,Ie=v.clearcoat>0,we=v.dispersion>0,U=v.iridescence>0,x=v.sheen>0,q=v.transmission>0,ne=N&&!!v.anisotropyMap,de=Ie&&!!v.clearcoatMap,Ne=Ie&&!!v.clearcoatNormalMap,Ve=Ie&&!!v.clearcoatRoughnessMap,_e=U&&!!v.iridescenceMap,xe=U&&!!v.iridescenceThicknessMap,Be=x&&!!v.sheenColorMap,Ge=x&&!!v.sheenRoughnessMap,ze=!!v.specularMap,He=!!v.specularColorMap,nt=!!v.specularIntensityMap,rt=q&&!!v.transmissionMap,ot=q&&!!v.thicknessMap,K=!!v.gradientMap,V=!!v.alphaMap,z=v.alphaTest>0,G=!!v.alphaHash,Oe=!!v.extensions;let Se=di;v.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Se=t.toneMapping);const Qe={shaderID:Ue,shaderType:v.type,shaderName:v.name,vertexShader:De,fragmentShader:ye,defines:v.defines,customVertexShaderID:ie,customFragmentShaderID:W,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Fe,batchingColor:Fe&&H._colorsTexture!==null,instancing:Te,instancingColor:Te&&H.instanceColor!==null,instancingMorph:Te&&H.morphTexture!==null,outputColorSpace:ae===null?t.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:bt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:T,matcap:R,envMap:k,envMapMode:k&&$.mapping,envMapCubeUVHeight:ge,aoMap:re,lightMap:Q,bumpMap:ue,normalMap:Ae,displacementMap:Ee,emissiveMap:Re,normalMapObjectSpace:Ae&&v.normalMapType===FS,normalMapTangentSpace:Ae&&v.normalMapType===Kd,packedNormalMap:Ae&&v.normalMapType===Kd&&m1(v.normalMap.format),metalnessMap:Y,roughnessMap:be,anisotropy:N,anisotropyMap:ne,clearcoat:Ie,clearcoatMap:de,clearcoatNormalMap:Ne,clearcoatRoughnessMap:Ve,dispersion:we,iridescence:U,iridescenceMap:_e,iridescenceThicknessMap:xe,sheen:x,sheenColorMap:Be,sheenRoughnessMap:Ge,specularMap:ze,specularColorMap:He,specularIntensityMap:nt,transmission:q,transmissionMap:rt,thicknessMap:ot,gradientMap:K,opaque:v.transparent===!1&&v.blending===ds&&v.alphaToCoverage===!1,alphaMap:V,alphaTest:z,alphaHash:G,combine:v.combine,mapUv:T&&_(v.map.channel),aoMapUv:re&&_(v.aoMap.channel),lightMapUv:Q&&_(v.lightMap.channel),bumpMapUv:ue&&_(v.bumpMap.channel),normalMapUv:Ae&&_(v.normalMap.channel),displacementMapUv:Ee&&_(v.displacementMap.channel),emissiveMapUv:Re&&_(v.emissiveMap.channel),metalnessMapUv:Y&&_(v.metalnessMap.channel),roughnessMapUv:be&&_(v.roughnessMap.channel),anisotropyMapUv:ne&&_(v.anisotropyMap.channel),clearcoatMapUv:de&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ve&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&_(v.sheenRoughnessMap.channel),specularMapUv:ze&&_(v.specularMap.channel),specularColorMapUv:He&&_(v.specularColorMap.channel),specularIntensityMapUv:nt&&_(v.specularIntensityMap.channel),transmissionMapUv:rt&&_(v.transmissionMap.channel),thicknessMapUv:ot&&_(v.thicknessMap.channel),alphaMapUv:V&&_(v.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Ae||N),vertexNormals:!!J.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!J.attributes.uv&&(T||V),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||J.attributes.normal===void 0&&Ae===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ve,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:J.attributes.position!==void 0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:ke,morphTextureStride:Le,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:ee.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&F.length>0,shadowMapType:t.shadowMap.type,toneMapping:Se,decodeVideoTexture:T&&v.map.isVideoTexture===!0&&bt.getTransfer(v.map.colorSpace)===Rt,decodeVideoTextureEmissive:Re&&v.emissiveMap.isVideoTexture===!0&&bt.getTransfer(v.emissiveMap.colorSpace)===Rt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ci,flipSided:v.side===Sn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Oe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&v.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Qe.vertexUv1s=l.has(1),Qe.vertexUv2s=l.has(2),Qe.vertexUv3s=l.has(3),l.clear(),Qe}function g(v){const S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(const F in v.defines)S.push(F),S.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(h(S,v),M(S,v),S.push(t.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function h(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function M(v,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),S.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function C(v){const S=p[v.type];let F;if(S){const D=oi[S];F=UM.clone(D.uniforms)}else F=v.uniforms;return F}function b(v,S){let F=c.get(S);return F!==void 0?++F.usedTimes:(F=new f1(t,S,v,r),u.push(F),c.set(S,F)),F}function I(v){if(--v.usedTimes===0){const S=u.indexOf(v);u[S]=u[u.length-1],u.pop(),c.delete(v.cacheKey),v.destroy()}}function w(v){a.remove(v)}function B(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:C,acquireProgram:b,releaseProgram:I,releaseShaderCache:w,programs:u,dispose:B}}function _1(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function v1(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Gh(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Wh(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function a(d,p,_,y,g,h){let M=t[e];return M===void 0?(M={id:d.id,object:d,geometry:p,material:_,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:g,group:h},t[e]=M):(M.id=d.id,M.object=d,M.geometry=p,M.material=_,M.materialVariant=o(d),M.groupOrder=y,M.renderOrder=d.renderOrder,M.z=g,M.group=h),e++,M}function l(d,p,_,y,g,h){const M=a(d,p,_,y,g,h);_.transmission>0?i.push(M):_.transparent===!0?r.push(M):n.push(M)}function u(d,p,_,y,g,h){const M=a(d,p,_,y,g,h);_.transmission>0?i.unshift(M):_.transparent===!0?r.unshift(M):n.unshift(M)}function c(d,p,_){n.length>1&&n.sort(d||v1),i.length>1&&i.sort(p||Gh),r.length>1&&r.sort(p||Gh),_&&(n.reverse(),i.reverse(),r.reverse())}function f(){for(let d=e,p=t.length;d<p;d++){const _=t[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:u,finish:f,sort:c}}function x1(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Wh,t.set(i,[o])):r>=s.length?(o=new Wh,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function b1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new he,color:new At};break;case"SpotLight":n={position:new he,direction:new he,color:new At,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new he,color:new At,distance:0,decay:0};break;case"HemisphereLight":n={direction:new he,skyColor:new At,groundColor:new At};break;case"RectAreaLight":n={color:new At,position:new he,halfWidth:new he,halfHeight:new he};break}return t[e.id]=n,n}}}function y1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let S1=0;function M1(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function E1(t){const e=new b1,n=y1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new he);const r=new he,s=new Xt,o=new Xt;function a(u){let c=0,f=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,_=0,y=0,g=0,h=0,M=0,C=0,b=0,I=0,w=0,B=0;u.sort(M1);for(let S=0,F=u.length;S<F;S++){const D=u[S],H=D.color,ee=D.intensity,X=D.distance;let J=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Lr?J=D.shadow.map.texture:J=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)c+=H.r*ee,f+=H.g*ee,d+=H.b*ee;else if(D.isLightProbe){for(let le=0;le<9;le++)i.probe[le].addScaledVector(D.sh.coefficients[le],ee);B++}else if(D.isDirectionalLight){const le=e.get(D);if(le.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const L=D.shadow,$=n.get(D);$.shadowIntensity=L.intensity,$.shadowBias=L.bias,$.shadowNormalBias=L.normalBias,$.shadowRadius=L.radius,$.shadowMapSize=L.mapSize,i.directionalShadow[p]=$,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=D.shadow.matrix,M++}i.directional[p]=le,p++}else if(D.isSpotLight){const le=e.get(D);le.position.setFromMatrixPosition(D.matrixWorld),le.color.copy(H).multiplyScalar(ee),le.distance=X,le.coneCos=Math.cos(D.angle),le.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),le.decay=D.decay,i.spot[y]=le;const L=D.shadow;if(D.map&&(i.spotLightMap[I]=D.map,I++,L.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[y]=L.matrix,D.castShadow){const $=n.get(D);$.shadowIntensity=L.intensity,$.shadowBias=L.bias,$.shadowNormalBias=L.normalBias,$.shadowRadius=L.radius,$.shadowMapSize=L.mapSize,i.spotShadow[y]=$,i.spotShadowMap[y]=J,b++}y++}else if(D.isRectAreaLight){const le=e.get(D);le.color.copy(H).multiplyScalar(ee),le.halfWidth.set(D.width*.5,0,0),le.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=le,g++}else if(D.isPointLight){const le=e.get(D);if(le.color.copy(D.color).multiplyScalar(D.intensity),le.distance=D.distance,le.decay=D.decay,D.castShadow){const L=D.shadow,$=n.get(D);$.shadowIntensity=L.intensity,$.shadowBias=L.bias,$.shadowNormalBias=L.normalBias,$.shadowRadius=L.radius,$.shadowMapSize=L.mapSize,$.shadowCameraNear=L.camera.near,$.shadowCameraFar=L.camera.far,i.pointShadow[_]=$,i.pointShadowMap[_]=J,i.pointShadowMatrix[_]=D.shadow.matrix,C++}i.point[_]=le,_++}else if(D.isHemisphereLight){const le=e.get(D);le.skyColor.copy(D.color).multiplyScalar(ee),le.groundColor.copy(D.groundColor).multiplyScalar(ee),i.hemi[h]=le,h++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Xe.LTC_FLOAT_1,i.rectAreaLTC2=Xe.LTC_FLOAT_2):(i.rectAreaLTC1=Xe.LTC_HALF_1,i.rectAreaLTC2=Xe.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=f,i.ambient[2]=d;const v=i.hash;(v.directionalLength!==p||v.pointLength!==_||v.spotLength!==y||v.rectAreaLength!==g||v.hemiLength!==h||v.numDirectionalShadows!==M||v.numPointShadows!==C||v.numSpotShadows!==b||v.numSpotMaps!==I||v.numLightProbes!==B)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=g,i.point.length=_,i.hemi.length=h,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=b+I-w,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=B,v.directionalLength=p,v.pointLength=_,v.spotLength=y,v.rectAreaLength=g,v.hemiLength=h,v.numDirectionalShadows=M,v.numPointShadows=C,v.numSpotShadows=b,v.numSpotMaps=I,v.numLightProbes=B,i.version=S1++)}function l(u,c){let f=0,d=0,p=0,_=0,y=0;const g=c.matrixWorldInverse;for(let h=0,M=u.length;h<M;h++){const C=u[h];if(C.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),f++}else if(C.isSpotLight){const b=i.spot[p];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),p++}else if(C.isRectAreaLight){const b=i.rectArea[_];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(g),o.identity(),s.copy(C.matrixWorld),s.premultiply(g),o.extractRotation(s),b.halfWidth.set(C.width*.5,0,0),b.halfHeight.set(0,C.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),_++}else if(C.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(g),d++}else if(C.isHemisphereLight){const b=i.hemi[y];b.direction.setFromMatrixPosition(C.matrixWorld),b.direction.transformDirection(g),y++}}}return{setup:a,setupView:l,state:i}}function $h(t){const e=new E1(t),n=[],i=[],r=[];function s(d){f.camera=d,n.length=0,i.length=0,r.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function l(d){r.push(d)}function u(){e.setup(n)}function c(d){e.setupView(n,d)}const f={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:u,setupLightsView:c,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function w1(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new $h(t),e.set(r,[a])):s>=o.length?(a=new $h(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const T1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,A1=`uniform sampler2D shadow_pass;
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
}`,R1=[new he(1,0,0),new he(-1,0,0),new he(0,1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1)],C1=[new he(0,-1,0),new he(0,-1,0),new he(0,0,1),new he(0,0,-1),new he(0,-1,0),new he(0,-1,0)],Xh=new Xt,js=new he,Su=new he;function P1(t,e,n){let i=new xg;const r=new Et,s=new Et,o=new Vt,a=new kM,l=new VM,u={},c=n.maxTextureSize,f={[or]:Sn,[Sn]:or,[Ci]:Ci},d=new gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:T1,fragmentShader:A1}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new _i;_.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Kn(_,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xa;let h=this.type;this.render=function(w,B,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===pS&&(ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=xa);const S=t.getRenderTarget(),F=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),H=t.state;H.setBlending(Ii),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const ee=h!==this.type;ee&&B.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(J=>J.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,J=w.length;X<J;X++){const le=w[X],L=le.shadow;if(L===void 0){ut("WebGLShadowMap:",le,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;r.copy(L.mapSize);const $=L.getFrameExtents();r.multiply($),s.copy(L.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/$.x),r.x=s.x*$.x,L.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/$.y),r.y=s.y*$.y,L.mapSize.y=s.y));const ge=t.state.buffers.depth.getReversed();if(L.camera._reversedDepth=ge,L.map===null||ee===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Qs){if(le.isPointLight){ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new hi(r.x,r.y,{format:Lr,type:Bi,minFilter:fn,magFilter:fn,generateMipmaps:!1}),L.map.texture.name=le.name+".shadowMap",L.map.depthTexture=new Es(r.x,r.y,li),L.map.depthTexture.name=le.name+".shadowMapDepth",L.map.depthTexture.format=ki,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=rn,L.map.depthTexture.magFilter=rn}else le.isPointLight?(L.map=new Ag(r.x),L.map.depthTexture=new IM(r.x,mi)):(L.map=new hi(r.x,r.y),L.map.depthTexture=new Es(r.x,r.y,mi)),L.map.depthTexture.name=le.name+".shadowMap",L.map.depthTexture.format=ki,this.type===xa?(L.map.depthTexture.compareFunction=ge?vf:_f,L.map.depthTexture.minFilter=fn,L.map.depthTexture.magFilter=fn):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=rn,L.map.depthTexture.magFilter=rn);L.camera.updateProjectionMatrix()}const Ue=L.map.isWebGLCubeRenderTarget?6:1;for(let Pe=0;Pe<Ue;Pe++){if(L.map.isWebGLCubeRenderTarget)t.setRenderTarget(L.map,Pe),t.clear();else{Pe===0&&(t.setRenderTarget(L.map),t.clear());const ke=L.getViewport(Pe);o.set(s.x*ke.x,s.y*ke.y,s.x*ke.z,s.y*ke.w),H.viewport(o)}if(le.isPointLight){const ke=L.camera,Le=L.matrix,De=le.distance||ke.far;De!==ke.far&&(ke.far=De,ke.updateProjectionMatrix()),js.setFromMatrixPosition(le.matrixWorld),ke.position.copy(js),Su.copy(ke.position),Su.add(R1[Pe]),ke.up.copy(C1[Pe]),ke.lookAt(Su),ke.updateMatrixWorld(),Le.makeTranslation(-js.x,-js.y,-js.z),Xh.multiplyMatrices(ke.projectionMatrix,ke.matrixWorldInverse),L._frustum.setFromProjectionMatrix(Xh,ke.coordinateSystem,ke.reversedDepth)}else L.updateMatrices(le);i=L.getFrustum(),b(B,v,L.camera,le,this.type)}L.isPointLightShadow!==!0&&this.type===Qs&&M(L,v),L.needsUpdate=!1}h=this.type,g.needsUpdate=!1,t.setRenderTarget(S,F,D)};function M(w,B){const v=e.update(y);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new hi(r.x,r.y,{format:Lr,type:Bi})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(B,null,v,d,y,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(B,null,v,p,y,null)}function C(w,B,v,S){let F=null;const D=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)F=D;else if(F=v.isPointLight===!0?l:a,t.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const H=F.uuid,ee=B.uuid;let X=u[H];X===void 0&&(X={},u[H]=X);let J=X[ee];J===void 0&&(J=F.clone(),X[ee]=J,B.addEventListener("dispose",I)),F=J}if(F.visible=B.visible,F.wireframe=B.wireframe,S===Qs?F.side=B.shadowSide!==null?B.shadowSide:B.side:F.side=B.shadowSide!==null?B.shadowSide:f[B.side],F.alphaMap=B.alphaMap,F.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,F.map=B.map,F.clipShadows=B.clipShadows,F.clippingPlanes=B.clippingPlanes,F.clipIntersection=B.clipIntersection,F.displacementMap=B.displacementMap,F.displacementScale=B.displacementScale,F.displacementBias=B.displacementBias,F.wireframeLinewidth=B.wireframeLinewidth,F.linewidth=B.linewidth,v.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const H=t.properties.get(F);H.light=v}return F}function b(w,B,v,S,F){if(w.visible===!1)return;if(w.layers.test(B.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&F===Qs)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const ee=e.update(w),X=w.material;if(Array.isArray(X)){const J=ee.groups;for(let le=0,L=J.length;le<L;le++){const $=J[le],ge=X[$.materialIndex];if(ge&&ge.visible){const Ue=C(w,ge,S,F);w.onBeforeShadow(t,w,B,v,ee,Ue,$),t.renderBufferDirect(v,null,ee,Ue,w,$),w.onAfterShadow(t,w,B,v,ee,Ue,$)}}}else if(X.visible){const J=C(w,X,S,F);w.onBeforeShadow(t,w,B,v,ee,J,null),t.renderBufferDirect(v,null,ee,J,w,null),w.onAfterShadow(t,w,B,v,ee,J,null)}}const H=w.children;for(let ee=0,X=H.length;ee<X;ee++)b(H[ee],B,v,S,F)}function I(w){w.target.removeEventListener("dispose",I);for(const v in u){const S=u[v],F=w.target.uuid;F in S&&(S[F].dispose(),delete S[F])}}}function L1(t,e){function n(){let K=!1;const V=new Vt;let z=null;const G=new Vt(0,0,0,0);return{setMask:function(Oe){z!==Oe&&!K&&(t.colorMask(Oe,Oe,Oe,Oe),z=Oe)},setLocked:function(Oe){K=Oe},setClear:function(Oe,Se,Qe,Ye,Ft){Ft===!0&&(Oe*=Ye,Se*=Ye,Qe*=Ye),V.set(Oe,Se,Qe,Ye),G.equals(V)===!1&&(t.clearColor(Oe,Se,Qe,Ye),G.copy(V))},reset:function(){K=!1,z=null,G.set(-1,0,0,0)}}}function i(){let K=!1,V=!1,z=null,G=null,Oe=null;return{setReversed:function(Se){if(V!==Se){const Qe=e.get("EXT_clip_control");Se?Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.ZERO_TO_ONE_EXT):Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.NEGATIVE_ONE_TO_ONE_EXT),V=Se;const Ye=Oe;Oe=null,this.setClear(Ye)}},getReversed:function(){return V},setTest:function(Se){Se?ae(t.DEPTH_TEST):ve(t.DEPTH_TEST)},setMask:function(Se){z!==Se&&!K&&(t.depthMask(Se),z=Se)},setFunc:function(Se){if(V&&(Se=qS[Se]),G!==Se){switch(Se){case qu:t.depthFunc(t.NEVER);break;case Yu:t.depthFunc(t.ALWAYS);break;case Ku:t.depthFunc(t.LESS);break;case Ss:t.depthFunc(t.LEQUAL);break;case ju:t.depthFunc(t.EQUAL);break;case Zu:t.depthFunc(t.GEQUAL);break;case Ju:t.depthFunc(t.GREATER);break;case Qu:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}G=Se}},setLocked:function(Se){K=Se},setClear:function(Se){Oe!==Se&&(Oe=Se,V&&(Se=1-Se),t.clearDepth(Se))},reset:function(){K=!1,z=null,G=null,Oe=null,V=!1}}}function r(){let K=!1,V=null,z=null,G=null,Oe=null,Se=null,Qe=null,Ye=null,Ft=null;return{setTest:function(Pt){K||(Pt?ae(t.STENCIL_TEST):ve(t.STENCIL_TEST))},setMask:function(Pt){V!==Pt&&!K&&(t.stencilMask(Pt),V=Pt)},setFunc:function(Pt,Cn,Pn){(z!==Pt||G!==Cn||Oe!==Pn)&&(t.stencilFunc(Pt,Cn,Pn),z=Pt,G=Cn,Oe=Pn)},setOp:function(Pt,Cn,Pn){(Se!==Pt||Qe!==Cn||Ye!==Pn)&&(t.stencilOp(Pt,Cn,Pn),Se=Pt,Qe=Cn,Ye=Pn)},setLocked:function(Pt){K=Pt},setClear:function(Pt){Ft!==Pt&&(t.clearStencil(Pt),Ft=Pt)},reset:function(){K=!1,V=null,z=null,G=null,Oe=null,Se=null,Qe=null,Ye=null,Ft=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,u=new WeakMap;let c={},f={},d={},p=new WeakMap,_=[],y=null,g=!1,h=null,M=null,C=null,b=null,I=null,w=null,B=null,v=new At(0,0,0),S=0,F=!1,D=null,H=null,ee=null,X=null,J=null;const le=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,$=0;const ge=t.getParameter(t.VERSION);ge.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(ge)[1]),L=$>=1):ge.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(ge)[1]),L=$>=2);let Ue=null,Pe={};const ke=t.getParameter(t.SCISSOR_BOX),Le=t.getParameter(t.VIEWPORT),De=new Vt().fromArray(ke),ye=new Vt().fromArray(Le);function ie(K,V,z,G){const Oe=new Uint8Array(4),Se=t.createTexture();t.bindTexture(K,Se),t.texParameteri(K,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(K,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Qe=0;Qe<z;Qe++)K===t.TEXTURE_3D||K===t.TEXTURE_2D_ARRAY?t.texImage3D(V,0,t.RGBA,1,1,G,0,t.RGBA,t.UNSIGNED_BYTE,Oe):t.texImage2D(V+Qe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Oe);return Se}const W={};W[t.TEXTURE_2D]=ie(t.TEXTURE_2D,t.TEXTURE_2D,1),W[t.TEXTURE_CUBE_MAP]=ie(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[t.TEXTURE_2D_ARRAY]=ie(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),W[t.TEXTURE_3D]=ie(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(t.DEPTH_TEST),o.setFunc(Ss),ue(!1),Ae($d),ae(t.CULL_FACE),re(Ii);function ae(K){c[K]!==!0&&(t.enable(K),c[K]=!0)}function ve(K){c[K]!==!1&&(t.disable(K),c[K]=!1)}function Te(K,V){return d[K]!==V?(t.bindFramebuffer(K,V),d[K]=V,K===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=V),K===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=V),!0):!1}function Fe(K,V){let z=_,G=!1;if(K){z=p.get(V),z===void 0&&(z=[],p.set(V,z));const Oe=K.textures;if(z.length!==Oe.length||z[0]!==t.COLOR_ATTACHMENT0){for(let Se=0,Qe=Oe.length;Se<Qe;Se++)z[Se]=t.COLOR_ATTACHMENT0+Se;z.length=Oe.length,G=!0}}else z[0]!==t.BACK&&(z[0]=t.BACK,G=!0);G&&t.drawBuffers(z)}function T(K){return y!==K?(t.useProgram(K),y=K,!0):!1}const R={[vr]:t.FUNC_ADD,[gS]:t.FUNC_SUBTRACT,[_S]:t.FUNC_REVERSE_SUBTRACT};R[vS]=t.MIN,R[xS]=t.MAX;const k={[bS]:t.ZERO,[yS]:t.ONE,[SS]:t.SRC_COLOR,[$u]:t.SRC_ALPHA,[RS]:t.SRC_ALPHA_SATURATE,[TS]:t.DST_COLOR,[ES]:t.DST_ALPHA,[MS]:t.ONE_MINUS_SRC_COLOR,[Xu]:t.ONE_MINUS_SRC_ALPHA,[AS]:t.ONE_MINUS_DST_COLOR,[wS]:t.ONE_MINUS_DST_ALPHA,[CS]:t.CONSTANT_COLOR,[PS]:t.ONE_MINUS_CONSTANT_COLOR,[LS]:t.CONSTANT_ALPHA,[DS]:t.ONE_MINUS_CONSTANT_ALPHA};function re(K,V,z,G,Oe,Se,Qe,Ye,Ft,Pt){if(K===Ii){g===!0&&(ve(t.BLEND),g=!1);return}if(g===!1&&(ae(t.BLEND),g=!0),K!==mS){if(K!==h||Pt!==F){if((M!==vr||I!==vr)&&(t.blendEquation(t.FUNC_ADD),M=vr,I=vr),Pt)switch(K){case ds:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xd:t.blendFunc(t.ONE,t.ONE);break;case qd:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yd:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:St("WebGLState: Invalid blending: ",K);break}else switch(K){case ds:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xd:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case qd:St("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yd:St("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:St("WebGLState: Invalid blending: ",K);break}C=null,b=null,w=null,B=null,v.set(0,0,0),S=0,h=K,F=Pt}return}Oe=Oe||V,Se=Se||z,Qe=Qe||G,(V!==M||Oe!==I)&&(t.blendEquationSeparate(R[V],R[Oe]),M=V,I=Oe),(z!==C||G!==b||Se!==w||Qe!==B)&&(t.blendFuncSeparate(k[z],k[G],k[Se],k[Qe]),C=z,b=G,w=Se,B=Qe),(Ye.equals(v)===!1||Ft!==S)&&(t.blendColor(Ye.r,Ye.g,Ye.b,Ft),v.copy(Ye),S=Ft),h=K,F=!1}function Q(K,V){K.side===Ci?ve(t.CULL_FACE):ae(t.CULL_FACE);let z=K.side===Sn;V&&(z=!z),ue(z),K.blending===ds&&K.transparent===!1?re(Ii):re(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),o.setFunc(K.depthFunc),o.setTest(K.depthTest),o.setMask(K.depthWrite),s.setMask(K.colorWrite);const G=K.stencilWrite;a.setTest(G),G&&(a.setMask(K.stencilWriteMask),a.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),a.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),Re(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?ae(t.SAMPLE_ALPHA_TO_COVERAGE):ve(t.SAMPLE_ALPHA_TO_COVERAGE)}function ue(K){D!==K&&(K?t.frontFace(t.CW):t.frontFace(t.CCW),D=K)}function Ae(K){K!==dS?(ae(t.CULL_FACE),K!==H&&(K===$d?t.cullFace(t.BACK):K===hS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ve(t.CULL_FACE),H=K}function Ee(K){K!==ee&&(L&&t.lineWidth(K),ee=K)}function Re(K,V,z){K?(ae(t.POLYGON_OFFSET_FILL),(X!==V||J!==z)&&(X=V,J=z,o.getReversed()&&(V=-V),t.polygonOffset(V,z))):ve(t.POLYGON_OFFSET_FILL)}function Y(K){K?ae(t.SCISSOR_TEST):ve(t.SCISSOR_TEST)}function be(K){K===void 0&&(K=t.TEXTURE0+le-1),Ue!==K&&(t.activeTexture(K),Ue=K)}function N(K,V,z){z===void 0&&(Ue===null?z=t.TEXTURE0+le-1:z=Ue);let G=Pe[z];G===void 0&&(G={type:void 0,texture:void 0},Pe[z]=G),(G.type!==K||G.texture!==V)&&(Ue!==z&&(t.activeTexture(z),Ue=z),t.bindTexture(K,V||W[K]),G.type=K,G.texture=V)}function Ie(){const K=Pe[Ue];K!==void 0&&K.type!==void 0&&(t.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function we(){try{t.compressedTexImage2D(...arguments)}catch(K){St("WebGLState:",K)}}function U(){try{t.compressedTexImage3D(...arguments)}catch(K){St("WebGLState:",K)}}function x(){try{t.texSubImage2D(...arguments)}catch(K){St("WebGLState:",K)}}function q(){try{t.texSubImage3D(...arguments)}catch(K){St("WebGLState:",K)}}function ne(){try{t.compressedTexSubImage2D(...arguments)}catch(K){St("WebGLState:",K)}}function de(){try{t.compressedTexSubImage3D(...arguments)}catch(K){St("WebGLState:",K)}}function Ne(){try{t.texStorage2D(...arguments)}catch(K){St("WebGLState:",K)}}function Ve(){try{t.texStorage3D(...arguments)}catch(K){St("WebGLState:",K)}}function _e(){try{t.texImage2D(...arguments)}catch(K){St("WebGLState:",K)}}function xe(){try{t.texImage3D(...arguments)}catch(K){St("WebGLState:",K)}}function Be(K){return f[K]!==void 0?f[K]:t.getParameter(K)}function Ge(K,V){f[K]!==V&&(t.pixelStorei(K,V),f[K]=V)}function ze(K){De.equals(K)===!1&&(t.scissor(K.x,K.y,K.z,K.w),De.copy(K))}function He(K){ye.equals(K)===!1&&(t.viewport(K.x,K.y,K.z,K.w),ye.copy(K))}function nt(K,V){let z=u.get(V);z===void 0&&(z=new WeakMap,u.set(V,z));let G=z.get(K);G===void 0&&(G=t.getUniformBlockIndex(V,K.name),z.set(K,G))}function rt(K,V){const G=u.get(V).get(K);l.get(V)!==G&&(t.uniformBlockBinding(V,G,K.__bindingPointIndex),l.set(V,G))}function ot(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),c={},f={},Ue=null,Pe={},d={},p=new WeakMap,_=[],y=null,g=!1,h=null,M=null,C=null,b=null,I=null,w=null,B=null,v=new At(0,0,0),S=0,F=!1,D=null,H=null,ee=null,X=null,J=null,De.set(0,0,t.canvas.width,t.canvas.height),ye.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ae,disable:ve,bindFramebuffer:Te,drawBuffers:Fe,useProgram:T,setBlending:re,setMaterial:Q,setFlipSided:ue,setCullFace:Ae,setLineWidth:Ee,setPolygonOffset:Re,setScissorTest:Y,activeTexture:be,bindTexture:N,unbindTexture:Ie,compressedTexImage2D:we,compressedTexImage3D:U,texImage2D:_e,texImage3D:xe,pixelStorei:Ge,getParameter:Be,updateUBOMapping:nt,uniformBlockBinding:rt,texStorage2D:Ne,texStorage3D:Ve,texSubImage2D:x,texSubImage3D:q,compressedTexSubImage2D:ne,compressedTexSubImage3D:de,scissor:ze,viewport:He,reset:ot}}function D1(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Et,c=new WeakMap,f=new Set;let d;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(U,x){return _?new OffscreenCanvas(U,x):So("canvas")}function g(U,x,q){let ne=1;const de=we(U);if((de.width>q||de.height>q)&&(ne=q/Math.max(de.width,de.height)),ne<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const Ne=Math.floor(ne*de.width),Ve=Math.floor(ne*de.height);d===void 0&&(d=y(Ne,Ve));const _e=x?y(Ne,Ve):d;return _e.width=Ne,_e.height=Ve,_e.getContext("2d").drawImage(U,0,0,Ne,Ve),ut("WebGLRenderer: Texture has been resized from ("+de.width+"x"+de.height+") to ("+Ne+"x"+Ve+")."),_e}else return"data"in U&&ut("WebGLRenderer: Image in DataTexture is too big ("+de.width+"x"+de.height+")."),U;return U}function h(U){return U.generateMipmaps}function M(U){t.generateMipmap(U)}function C(U){return U.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?t.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function b(U,x,q,ne,de,Ne=!1){if(U!==null){if(t[U]!==void 0)return t[U];ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let Ve;ne&&(Ve=e.get("EXT_texture_norm16"),Ve||ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let _e=x;if(x===t.RED&&(q===t.FLOAT&&(_e=t.R32F),q===t.HALF_FLOAT&&(_e=t.R16F),q===t.UNSIGNED_BYTE&&(_e=t.R8),q===t.UNSIGNED_SHORT&&Ve&&(_e=Ve.R16_EXT),q===t.SHORT&&Ve&&(_e=Ve.R16_SNORM_EXT)),x===t.RED_INTEGER&&(q===t.UNSIGNED_BYTE&&(_e=t.R8UI),q===t.UNSIGNED_SHORT&&(_e=t.R16UI),q===t.UNSIGNED_INT&&(_e=t.R32UI),q===t.BYTE&&(_e=t.R8I),q===t.SHORT&&(_e=t.R16I),q===t.INT&&(_e=t.R32I)),x===t.RG&&(q===t.FLOAT&&(_e=t.RG32F),q===t.HALF_FLOAT&&(_e=t.RG16F),q===t.UNSIGNED_BYTE&&(_e=t.RG8),q===t.UNSIGNED_SHORT&&Ve&&(_e=Ve.RG16_EXT),q===t.SHORT&&Ve&&(_e=Ve.RG16_SNORM_EXT)),x===t.RG_INTEGER&&(q===t.UNSIGNED_BYTE&&(_e=t.RG8UI),q===t.UNSIGNED_SHORT&&(_e=t.RG16UI),q===t.UNSIGNED_INT&&(_e=t.RG32UI),q===t.BYTE&&(_e=t.RG8I),q===t.SHORT&&(_e=t.RG16I),q===t.INT&&(_e=t.RG32I)),x===t.RGB_INTEGER&&(q===t.UNSIGNED_BYTE&&(_e=t.RGB8UI),q===t.UNSIGNED_SHORT&&(_e=t.RGB16UI),q===t.UNSIGNED_INT&&(_e=t.RGB32UI),q===t.BYTE&&(_e=t.RGB8I),q===t.SHORT&&(_e=t.RGB16I),q===t.INT&&(_e=t.RGB32I)),x===t.RGBA_INTEGER&&(q===t.UNSIGNED_BYTE&&(_e=t.RGBA8UI),q===t.UNSIGNED_SHORT&&(_e=t.RGBA16UI),q===t.UNSIGNED_INT&&(_e=t.RGBA32UI),q===t.BYTE&&(_e=t.RGBA8I),q===t.SHORT&&(_e=t.RGBA16I),q===t.INT&&(_e=t.RGBA32I)),x===t.RGB&&(q===t.UNSIGNED_SHORT&&Ve&&(_e=Ve.RGB16_EXT),q===t.SHORT&&Ve&&(_e=Ve.RGB16_SNORM_EXT),q===t.UNSIGNED_INT_5_9_9_9_REV&&(_e=t.RGB9_E5),q===t.UNSIGNED_INT_10F_11F_11F_REV&&(_e=t.R11F_G11F_B10F)),x===t.RGBA){const xe=Ne?Ga:bt.getTransfer(de);q===t.FLOAT&&(_e=t.RGBA32F),q===t.HALF_FLOAT&&(_e=t.RGBA16F),q===t.UNSIGNED_BYTE&&(_e=xe===Rt?t.SRGB8_ALPHA8:t.RGBA8),q===t.UNSIGNED_SHORT&&Ve&&(_e=Ve.RGBA16_EXT),q===t.SHORT&&Ve&&(_e=Ve.RGBA16_SNORM_EXT),q===t.UNSIGNED_SHORT_4_4_4_4&&(_e=t.RGBA4),q===t.UNSIGNED_SHORT_5_5_5_1&&(_e=t.RGB5_A1)}return(_e===t.R16F||_e===t.R32F||_e===t.RG16F||_e===t.RG32F||_e===t.RGBA16F||_e===t.RGBA32F)&&e.get("EXT_color_buffer_float"),_e}function I(U,x){let q;return U?x===null||x===mi||x===yo?q=t.DEPTH24_STENCIL8:x===li?q=t.DEPTH32F_STENCIL8:x===bo&&(q=t.DEPTH24_STENCIL8,ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===mi||x===yo?q=t.DEPTH_COMPONENT24:x===li?q=t.DEPTH_COMPONENT32F:x===bo&&(q=t.DEPTH_COMPONENT16),q}function w(U,x){return h(U)===!0||U.isFramebufferTexture&&U.minFilter!==rn&&U.minFilter!==fn?Math.log2(Math.max(x.width,x.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?x.mipmaps.length:1}function B(U){const x=U.target;x.removeEventListener("dispose",B),S(x),x.isVideoTexture&&c.delete(x),x.isHTMLTexture&&f.delete(x)}function v(U){const x=U.target;x.removeEventListener("dispose",v),D(x)}function S(U){const x=i.get(U);if(x.__webglInit===void 0)return;const q=U.source,ne=p.get(q);if(ne){const de=ne[x.__cacheKey];de.usedTimes--,de.usedTimes===0&&F(U),Object.keys(ne).length===0&&p.delete(q)}i.remove(U)}function F(U){const x=i.get(U);t.deleteTexture(x.__webglTexture);const q=U.source,ne=p.get(q);delete ne[x.__cacheKey],o.memory.textures--}function D(U){const x=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(x.__webglFramebuffer[ne]))for(let de=0;de<x.__webglFramebuffer[ne].length;de++)t.deleteFramebuffer(x.__webglFramebuffer[ne][de]);else t.deleteFramebuffer(x.__webglFramebuffer[ne]);x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer[ne])}else{if(Array.isArray(x.__webglFramebuffer))for(let ne=0;ne<x.__webglFramebuffer.length;ne++)t.deleteFramebuffer(x.__webglFramebuffer[ne]);else t.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&t.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let ne=0;ne<x.__webglColorRenderbuffer.length;ne++)x.__webglColorRenderbuffer[ne]&&t.deleteRenderbuffer(x.__webglColorRenderbuffer[ne]);x.__webglDepthRenderbuffer&&t.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const q=U.textures;for(let ne=0,de=q.length;ne<de;ne++){const Ne=i.get(q[ne]);Ne.__webglTexture&&(t.deleteTexture(Ne.__webglTexture),o.memory.textures--),i.remove(q[ne])}i.remove(U)}let H=0;function ee(){H=0}function X(){return H}function J(U){H=U}function le(){const U=H;return U>=r.maxTextures&&ut("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+r.maxTextures),H+=1,U}function L(U){const x=[];return x.push(U.wrapS),x.push(U.wrapT),x.push(U.wrapR||0),x.push(U.magFilter),x.push(U.minFilter),x.push(U.anisotropy),x.push(U.internalFormat),x.push(U.format),x.push(U.type),x.push(U.generateMipmaps),x.push(U.premultiplyAlpha),x.push(U.flipY),x.push(U.unpackAlignment),x.push(U.colorSpace),x.join()}function $(U,x){const q=i.get(U);if(U.isVideoTexture&&N(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&q.__version!==U.version){const ne=U.image;if(ne===null)ut("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)ut("WebGLRenderer: Texture marked for update but image is incomplete");else{ve(q,U,x);return}}else U.isExternalTexture&&(q.__webglTexture=U.sourceTexture?U.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,q.__webglTexture,t.TEXTURE0+x)}function ge(U,x){const q=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&q.__version!==U.version){ve(q,U,x);return}else U.isExternalTexture&&(q.__webglTexture=U.sourceTexture?U.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,q.__webglTexture,t.TEXTURE0+x)}function Ue(U,x){const q=i.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&q.__version!==U.version){ve(q,U,x);return}n.bindTexture(t.TEXTURE_3D,q.__webglTexture,t.TEXTURE0+x)}function Pe(U,x){const q=i.get(U);if(U.isCubeDepthTexture!==!0&&U.version>0&&q.__version!==U.version){Te(q,U,x);return}n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture,t.TEXTURE0+x)}const ke={[ec]:t.REPEAT,[Pi]:t.CLAMP_TO_EDGE,[tc]:t.MIRRORED_REPEAT},Le={[rn]:t.NEAREST,[US]:t.NEAREST_MIPMAP_NEAREST,[Go]:t.NEAREST_MIPMAP_LINEAR,[fn]:t.LINEAR,[ql]:t.LINEAR_MIPMAP_NEAREST,[Sr]:t.LINEAR_MIPMAP_LINEAR},De={[BS]:t.NEVER,[GS]:t.ALWAYS,[kS]:t.LESS,[_f]:t.LEQUAL,[VS]:t.EQUAL,[vf]:t.GEQUAL,[HS]:t.GREATER,[zS]:t.NOTEQUAL};function ye(U,x){if(x.type===li&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===fn||x.magFilter===ql||x.magFilter===Go||x.magFilter===Sr||x.minFilter===fn||x.minFilter===ql||x.minFilter===Go||x.minFilter===Sr)&&ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(U,t.TEXTURE_WRAP_S,ke[x.wrapS]),t.texParameteri(U,t.TEXTURE_WRAP_T,ke[x.wrapT]),(U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY)&&t.texParameteri(U,t.TEXTURE_WRAP_R,ke[x.wrapR]),t.texParameteri(U,t.TEXTURE_MAG_FILTER,Le[x.magFilter]),t.texParameteri(U,t.TEXTURE_MIN_FILTER,Le[x.minFilter]),x.compareFunction&&(t.texParameteri(U,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(U,t.TEXTURE_COMPARE_FUNC,De[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===rn||x.minFilter!==Go&&x.minFilter!==Sr||x.type===li&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");t.texParameterf(U,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function ie(U,x){let q=!1;U.__webglInit===void 0&&(U.__webglInit=!0,x.addEventListener("dispose",B));const ne=x.source;let de=p.get(ne);de===void 0&&(de={},p.set(ne,de));const Ne=L(x);if(Ne!==U.__cacheKey){de[Ne]===void 0&&(de[Ne]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,q=!0),de[Ne].usedTimes++;const Ve=de[U.__cacheKey];Ve!==void 0&&(de[U.__cacheKey].usedTimes--,Ve.usedTimes===0&&F(x)),U.__cacheKey=Ne,U.__webglTexture=de[Ne].texture}return q}function W(U,x,q){return Math.floor(Math.floor(U/q)/x)}function ae(U,x,q,ne){const Ne=U.updateRanges;if(Ne.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,x.width,x.height,q,ne,x.data);else{Ne.sort((Ge,ze)=>Ge.start-ze.start);let Ve=0;for(let Ge=1;Ge<Ne.length;Ge++){const ze=Ne[Ve],He=Ne[Ge],nt=ze.start+ze.count,rt=W(He.start,x.width,4),ot=W(ze.start,x.width,4);He.start<=nt+1&&rt===ot&&W(He.start+He.count-1,x.width,4)===rt?ze.count=Math.max(ze.count,He.start+He.count-ze.start):(++Ve,Ne[Ve]=He)}Ne.length=Ve+1;const _e=n.getParameter(t.UNPACK_ROW_LENGTH),xe=n.getParameter(t.UNPACK_SKIP_PIXELS),Be=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,x.width);for(let Ge=0,ze=Ne.length;Ge<ze;Ge++){const He=Ne[Ge],nt=Math.floor(He.start/4),rt=Math.ceil(He.count/4),ot=nt%x.width,K=Math.floor(nt/x.width),V=rt,z=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,ot),n.pixelStorei(t.UNPACK_SKIP_ROWS,K),n.texSubImage2D(t.TEXTURE_2D,0,ot,K,V,z,q,ne,x.data)}U.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,_e),n.pixelStorei(t.UNPACK_SKIP_PIXELS,xe),n.pixelStorei(t.UNPACK_SKIP_ROWS,Be)}}function ve(U,x,q){let ne=t.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ne=t.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ne=t.TEXTURE_3D);const de=ie(U,x),Ne=x.source;n.bindTexture(ne,U.__webglTexture,t.TEXTURE0+q);const Ve=i.get(Ne);if(Ne.version!==Ve.__version||de===!0){if(n.activeTexture(t.TEXTURE0+q),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const z=bt.getPrimaries(bt.workingColorSpace),G=x.colorSpace===nr?null:bt.getPrimaries(x.colorSpace),Oe=x.colorSpace===nr||z===G?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe)}n.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment);let xe=g(x.image,!1,r.maxTextureSize);xe=Ie(x,xe);const Be=s.convert(x.format,x.colorSpace),Ge=s.convert(x.type);let ze=b(x.internalFormat,Be,Ge,x.normalized,x.colorSpace,x.isVideoTexture);ye(ne,x);let He;const nt=x.mipmaps,rt=x.isVideoTexture!==!0,ot=Ve.__version===void 0||de===!0,K=Ne.dataReady,V=w(x,xe);if(x.isDepthTexture)ze=I(x.format===Mr,x.type),ot&&(rt?n.texStorage2D(t.TEXTURE_2D,1,ze,xe.width,xe.height):n.texImage2D(t.TEXTURE_2D,0,ze,xe.width,xe.height,0,Be,Ge,null));else if(x.isDataTexture)if(nt.length>0){rt&&ot&&n.texStorage2D(t.TEXTURE_2D,V,ze,nt[0].width,nt[0].height);for(let z=0,G=nt.length;z<G;z++)He=nt[z],rt?K&&n.texSubImage2D(t.TEXTURE_2D,z,0,0,He.width,He.height,Be,Ge,He.data):n.texImage2D(t.TEXTURE_2D,z,ze,He.width,He.height,0,Be,Ge,He.data);x.generateMipmaps=!1}else rt?(ot&&n.texStorage2D(t.TEXTURE_2D,V,ze,xe.width,xe.height),K&&ae(x,xe,Be,Ge)):n.texImage2D(t.TEXTURE_2D,0,ze,xe.width,xe.height,0,Be,Ge,xe.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){rt&&ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,V,ze,nt[0].width,nt[0].height,xe.depth);for(let z=0,G=nt.length;z<G;z++)if(He=nt[z],x.format!==Gn)if(Be!==null)if(rt){if(K)if(x.layerUpdates.size>0){const Oe=Mh(He.width,He.height,x.format,x.type);for(const Se of x.layerUpdates){const Qe=He.data.subarray(Se*Oe/He.data.BYTES_PER_ELEMENT,(Se+1)*Oe/He.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,z,0,0,Se,He.width,He.height,1,Be,Qe)}x.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,z,0,0,0,He.width,He.height,xe.depth,Be,He.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,z,ze,He.width,He.height,xe.depth,0,He.data,0,0);else ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?K&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,z,0,0,0,He.width,He.height,xe.depth,Be,Ge,He.data):n.texImage3D(t.TEXTURE_2D_ARRAY,z,ze,He.width,He.height,xe.depth,0,Be,Ge,He.data)}else{rt&&ot&&n.texStorage2D(t.TEXTURE_2D,V,ze,nt[0].width,nt[0].height);for(let z=0,G=nt.length;z<G;z++)He=nt[z],x.format!==Gn?Be!==null?rt?K&&n.compressedTexSubImage2D(t.TEXTURE_2D,z,0,0,He.width,He.height,Be,He.data):n.compressedTexImage2D(t.TEXTURE_2D,z,ze,He.width,He.height,0,He.data):ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?K&&n.texSubImage2D(t.TEXTURE_2D,z,0,0,He.width,He.height,Be,Ge,He.data):n.texImage2D(t.TEXTURE_2D,z,ze,He.width,He.height,0,Be,Ge,He.data)}else if(x.isDataArrayTexture)if(rt){if(ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,V,ze,xe.width,xe.height,xe.depth),K)if(x.layerUpdates.size>0){const z=Mh(xe.width,xe.height,x.format,x.type);for(const G of x.layerUpdates){const Oe=xe.data.subarray(G*z/xe.data.BYTES_PER_ELEMENT,(G+1)*z/xe.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,G,xe.width,xe.height,1,Be,Ge,Oe)}x.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,Be,Ge,xe.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,ze,xe.width,xe.height,xe.depth,0,Be,Ge,xe.data);else if(x.isData3DTexture)rt?(ot&&n.texStorage3D(t.TEXTURE_3D,V,ze,xe.width,xe.height,xe.depth),K&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,Be,Ge,xe.data)):n.texImage3D(t.TEXTURE_3D,0,ze,xe.width,xe.height,xe.depth,0,Be,Ge,xe.data);else if(x.isFramebufferTexture){if(ot)if(rt)n.texStorage2D(t.TEXTURE_2D,V,ze,xe.width,xe.height);else{let z=xe.width,G=xe.height;for(let Oe=0;Oe<V;Oe++)n.texImage2D(t.TEXTURE_2D,Oe,ze,z,G,0,Be,Ge,null),z>>=1,G>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in t){const z=t.canvas;if(z.hasAttribute("layoutsubtree")||z.setAttribute("layoutsubtree","true"),xe.parentNode!==z){z.appendChild(xe),f.add(x),z.onpaint=G=>{const Oe=G.changedElements;for(const Se of f)Oe.includes(Se.image)&&(Se.needsUpdate=!0)},z.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,xe);else{const Oe=t.RGBA,Se=t.RGBA,Qe=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,Oe,Se,Qe,xe)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(nt.length>0){if(rt&&ot){const z=we(nt[0]);n.texStorage2D(t.TEXTURE_2D,V,ze,z.width,z.height)}for(let z=0,G=nt.length;z<G;z++)He=nt[z],rt?K&&n.texSubImage2D(t.TEXTURE_2D,z,0,0,Be,Ge,He):n.texImage2D(t.TEXTURE_2D,z,ze,Be,Ge,He);x.generateMipmaps=!1}else if(rt){if(ot){const z=we(xe);n.texStorage2D(t.TEXTURE_2D,V,ze,z.width,z.height)}K&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Be,Ge,xe)}else n.texImage2D(t.TEXTURE_2D,0,ze,Be,Ge,xe);h(x)&&M(ne),Ve.__version=Ne.version,x.onUpdate&&x.onUpdate(x)}U.__version=x.version}function Te(U,x,q){if(x.image.length!==6)return;const ne=ie(U,x),de=x.source;n.bindTexture(t.TEXTURE_CUBE_MAP,U.__webglTexture,t.TEXTURE0+q);const Ne=i.get(de);if(de.version!==Ne.__version||ne===!0){n.activeTexture(t.TEXTURE0+q);const Ve=bt.getPrimaries(bt.workingColorSpace),_e=x.colorSpace===nr?null:bt.getPrimaries(x.colorSpace),xe=x.colorSpace===nr||Ve===_e?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Be=x.isCompressedTexture||x.image[0].isCompressedTexture,Ge=x.image[0]&&x.image[0].isDataTexture,ze=[];for(let Se=0;Se<6;Se++)!Be&&!Ge?ze[Se]=g(x.image[Se],!0,r.maxCubemapSize):ze[Se]=Ge?x.image[Se].image:x.image[Se],ze[Se]=Ie(x,ze[Se]);const He=ze[0],nt=s.convert(x.format,x.colorSpace),rt=s.convert(x.type),ot=b(x.internalFormat,nt,rt,x.normalized,x.colorSpace),K=x.isVideoTexture!==!0,V=Ne.__version===void 0||ne===!0,z=de.dataReady;let G=w(x,He);ye(t.TEXTURE_CUBE_MAP,x);let Oe;if(Be){K&&V&&n.texStorage2D(t.TEXTURE_CUBE_MAP,G,ot,He.width,He.height);for(let Se=0;Se<6;Se++){Oe=ze[Se].mipmaps;for(let Qe=0;Qe<Oe.length;Qe++){const Ye=Oe[Qe];x.format!==Gn?nt!==null?K?z&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe,0,0,Ye.width,Ye.height,nt,Ye.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe,ot,Ye.width,Ye.height,0,Ye.data):ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):K?z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe,0,0,Ye.width,Ye.height,nt,rt,Ye.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe,ot,Ye.width,Ye.height,0,nt,rt,Ye.data)}}}else{if(Oe=x.mipmaps,K&&V){Oe.length>0&&G++;const Se=we(ze[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,G,ot,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(Ge){K?z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,ze[Se].width,ze[Se].height,nt,rt,ze[Se].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ot,ze[Se].width,ze[Se].height,0,nt,rt,ze[Se].data);for(let Qe=0;Qe<Oe.length;Qe++){const Ft=Oe[Qe].image[Se].image;K?z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe+1,0,0,Ft.width,Ft.height,nt,rt,Ft.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe+1,ot,Ft.width,Ft.height,0,nt,rt,Ft.data)}}else{K?z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,nt,rt,ze[Se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ot,nt,rt,ze[Se]);for(let Qe=0;Qe<Oe.length;Qe++){const Ye=Oe[Qe];K?z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe+1,0,0,nt,rt,Ye.image[Se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Qe+1,ot,nt,rt,Ye.image[Se])}}}h(x)&&M(t.TEXTURE_CUBE_MAP),Ne.__version=de.version,x.onUpdate&&x.onUpdate(x)}U.__version=x.version}function Fe(U,x,q,ne,de,Ne){const Ve=s.convert(q.format,q.colorSpace),_e=s.convert(q.type),xe=b(q.internalFormat,Ve,_e,q.normalized,q.colorSpace),Be=i.get(x),Ge=i.get(q);if(Ge.__renderTarget=x,!Be.__hasExternalTextures){const ze=Math.max(1,x.width>>Ne),He=Math.max(1,x.height>>Ne);de===t.TEXTURE_3D||de===t.TEXTURE_2D_ARRAY?n.texImage3D(de,Ne,xe,ze,He,x.depth,0,Ve,_e,null):n.texImage2D(de,Ne,xe,ze,He,0,Ve,_e,null)}n.bindFramebuffer(t.FRAMEBUFFER,U),be(x)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,de,Ge.__webglTexture,0,Y(x)):(de===t.TEXTURE_2D||de>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ne,de,Ge.__webglTexture,Ne),n.bindFramebuffer(t.FRAMEBUFFER,null)}function T(U,x,q){if(t.bindRenderbuffer(t.RENDERBUFFER,U),x.depthBuffer){const ne=x.depthTexture,de=ne&&ne.isDepthTexture?ne.type:null,Ne=I(x.stencilBuffer,de),Ve=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;be(x)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Y(x),Ne,x.width,x.height):q?t.renderbufferStorageMultisample(t.RENDERBUFFER,Y(x),Ne,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,Ne,x.width,x.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ve,t.RENDERBUFFER,U)}else{const ne=x.textures;for(let de=0;de<ne.length;de++){const Ne=ne[de],Ve=s.convert(Ne.format,Ne.colorSpace),_e=s.convert(Ne.type),xe=b(Ne.internalFormat,Ve,_e,Ne.normalized,Ne.colorSpace);be(x)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Y(x),xe,x.width,x.height):q?t.renderbufferStorageMultisample(t.RENDERBUFFER,Y(x),xe,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,xe,x.width,x.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function R(U,x,q){const ne=x.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,U),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const de=i.get(x.depthTexture);if(de.__renderTarget=x,(!de.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),ne){if(de.__webglInit===void 0&&(de.__webglInit=!0,x.depthTexture.addEventListener("dispose",B)),de.__webglTexture===void 0){de.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,de.__webglTexture),ye(t.TEXTURE_CUBE_MAP,x.depthTexture);const Be=s.convert(x.depthTexture.format),Ge=s.convert(x.depthTexture.type);let ze;x.depthTexture.format===ki?ze=t.DEPTH_COMPONENT24:x.depthTexture.format===Mr&&(ze=t.DEPTH24_STENCIL8);for(let He=0;He<6;He++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,ze,x.width,x.height,0,Be,Ge,null)}}else $(x.depthTexture,0);const Ne=de.__webglTexture,Ve=Y(x),_e=ne?t.TEXTURE_CUBE_MAP_POSITIVE_X+q:t.TEXTURE_2D,xe=x.depthTexture.format===Mr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(x.depthTexture.format===ki)be(x)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,xe,_e,Ne,0,Ve):t.framebufferTexture2D(t.FRAMEBUFFER,xe,_e,Ne,0);else if(x.depthTexture.format===Mr)be(x)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,xe,_e,Ne,0,Ve):t.framebufferTexture2D(t.FRAMEBUFFER,xe,_e,Ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function k(U){const x=i.get(U),q=U.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==U.depthTexture){const ne=U.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),ne){const de=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,ne.removeEventListener("dispose",de)};ne.addEventListener("dispose",de),x.__depthDisposeCallback=de}x.__boundDepthTexture=ne}if(U.depthTexture&&!x.__autoAllocateDepthBuffer)if(q)for(let ne=0;ne<6;ne++)R(x.__webglFramebuffer[ne],U,ne);else{const ne=U.texture.mipmaps;ne&&ne.length>0?R(x.__webglFramebuffer[0],U,0):R(x.__webglFramebuffer,U,0)}else if(q){x.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[ne]),x.__webglDepthbuffer[ne]===void 0)x.__webglDepthbuffer[ne]=t.createRenderbuffer(),T(x.__webglDepthbuffer[ne],U,!1);else{const de=U.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ne=x.__webglDepthbuffer[ne];t.bindRenderbuffer(t.RENDERBUFFER,Ne),t.framebufferRenderbuffer(t.FRAMEBUFFER,de,t.RENDERBUFFER,Ne)}}else{const ne=U.texture.mipmaps;if(ne&&ne.length>0?n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=t.createRenderbuffer(),T(x.__webglDepthbuffer,U,!1);else{const de=U.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ne=x.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,Ne),t.framebufferRenderbuffer(t.FRAMEBUFFER,de,t.RENDERBUFFER,Ne)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function re(U,x,q){const ne=i.get(U);x!==void 0&&Fe(ne.__webglFramebuffer,U,U.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),q!==void 0&&k(U)}function Q(U){const x=U.texture,q=i.get(U),ne=i.get(x);U.addEventListener("dispose",v);const de=U.textures,Ne=U.isWebGLCubeRenderTarget===!0,Ve=de.length>1;if(Ve||(ne.__webglTexture===void 0&&(ne.__webglTexture=t.createTexture()),ne.__version=x.version,o.memory.textures++),Ne){q.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(x.mipmaps&&x.mipmaps.length>0){q.__webglFramebuffer[_e]=[];for(let xe=0;xe<x.mipmaps.length;xe++)q.__webglFramebuffer[_e][xe]=t.createFramebuffer()}else q.__webglFramebuffer[_e]=t.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){q.__webglFramebuffer=[];for(let _e=0;_e<x.mipmaps.length;_e++)q.__webglFramebuffer[_e]=t.createFramebuffer()}else q.__webglFramebuffer=t.createFramebuffer();if(Ve)for(let _e=0,xe=de.length;_e<xe;_e++){const Be=i.get(de[_e]);Be.__webglTexture===void 0&&(Be.__webglTexture=t.createTexture(),o.memory.textures++)}if(U.samples>0&&be(U)===!1){q.__webglMultisampledFramebuffer=t.createFramebuffer(),q.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let _e=0;_e<de.length;_e++){const xe=de[_e];q.__webglColorRenderbuffer[_e]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,q.__webglColorRenderbuffer[_e]);const Be=s.convert(xe.format,xe.colorSpace),Ge=s.convert(xe.type),ze=b(xe.internalFormat,Be,Ge,xe.normalized,xe.colorSpace,U.isXRRenderTarget===!0),He=Y(U);t.renderbufferStorageMultisample(t.RENDERBUFFER,He,ze,U.width,U.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,q.__webglColorRenderbuffer[_e])}t.bindRenderbuffer(t.RENDERBUFFER,null),U.depthBuffer&&(q.__webglDepthRenderbuffer=t.createRenderbuffer(),T(q.__webglDepthRenderbuffer,U,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Ne){n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),ye(t.TEXTURE_CUBE_MAP,x);for(let _e=0;_e<6;_e++)if(x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)Fe(q.__webglFramebuffer[_e][xe],U,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,xe);else Fe(q.__webglFramebuffer[_e],U,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);h(x)&&M(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ve){for(let _e=0,xe=de.length;_e<xe;_e++){const Be=de[_e],Ge=i.get(Be);let ze=t.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(ze=U.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ze,Ge.__webglTexture),ye(ze,Be),Fe(q.__webglFramebuffer,U,Be,t.COLOR_ATTACHMENT0+_e,ze,0),h(Be)&&M(ze)}n.unbindTexture()}else{let _e=t.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(_e=U.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(_e,ne.__webglTexture),ye(_e,x),x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)Fe(q.__webglFramebuffer[xe],U,x,t.COLOR_ATTACHMENT0,_e,xe);else Fe(q.__webglFramebuffer,U,x,t.COLOR_ATTACHMENT0,_e,0);h(x)&&M(_e),n.unbindTexture()}U.depthBuffer&&k(U)}function ue(U){const x=U.textures;for(let q=0,ne=x.length;q<ne;q++){const de=x[q];if(h(de)){const Ne=C(U),Ve=i.get(de).__webglTexture;n.bindTexture(Ne,Ve),M(Ne),n.unbindTexture()}}}const Ae=[],Ee=[];function Re(U){if(U.samples>0){if(be(U)===!1){const x=U.textures,q=U.width,ne=U.height;let de=t.COLOR_BUFFER_BIT;const Ne=U.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ve=i.get(U),_e=x.length>1;if(_e)for(let Be=0;Be<x.length;Be++)n.bindFramebuffer(t.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Be,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ve.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Be,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer);const xe=U.texture.mipmaps;xe&&xe.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ve.__webglFramebuffer);for(let Be=0;Be<x.length;Be++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(de|=t.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(de|=t.STENCIL_BUFFER_BIT)),_e){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ve.__webglColorRenderbuffer[Be]);const Ge=i.get(x[Be]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ge,0)}t.blitFramebuffer(0,0,q,ne,0,0,q,ne,de,t.NEAREST),l===!0&&(Ae.length=0,Ee.length=0,Ae.push(t.COLOR_ATTACHMENT0+Be),U.depthBuffer&&U.resolveDepthBuffer===!1&&(Ae.push(Ne),Ee.push(Ne),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ee)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ae))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),_e)for(let Be=0;Be<x.length;Be++){n.bindFramebuffer(t.FRAMEBUFFER,Ve.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Be,t.RENDERBUFFER,Ve.__webglColorRenderbuffer[Be]);const Ge=i.get(x[Be]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ve.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Be,t.TEXTURE_2D,Ge,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ve.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){const x=U.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[x])}}}function Y(U){return Math.min(r.maxSamples,U.samples)}function be(U){const x=i.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(U){const x=o.render.frame;c.get(U)!==x&&(c.set(U,x),U.update())}function Ie(U,x){const q=U.colorSpace,ne=U.format,de=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||q!==za&&q!==nr&&(bt.getTransfer(q)===Rt?(ne!==Gn||de!==Nn)&&ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):St("WebGLTextures: Unsupported texture color space:",q)),x}function we(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(u.width=U.naturalWidth||U.width,u.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(u.width=U.displayWidth,u.height=U.displayHeight):(u.width=U.width,u.height=U.height),u}this.allocateTextureUnit=le,this.resetTextureUnits=ee,this.getTextureUnits=X,this.setTextureUnits=J,this.setTexture2D=$,this.setTexture2DArray=ge,this.setTexture3D=Ue,this.setTextureCube=Pe,this.rebindTextures=re,this.setupRenderTarget=Q,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=k,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=be,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function I1(t,e){function n(i,r=nr){let s;const o=bt.getTransfer(r);if(i===Nn)return t.UNSIGNED_BYTE;if(i===df)return t.UNSIGNED_SHORT_4_4_4_4;if(i===hf)return t.UNSIGNED_SHORT_5_5_5_1;if(i===lg)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===ug)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===og)return t.BYTE;if(i===ag)return t.SHORT;if(i===bo)return t.UNSIGNED_SHORT;if(i===ff)return t.INT;if(i===mi)return t.UNSIGNED_INT;if(i===li)return t.FLOAT;if(i===Bi)return t.HALF_FLOAT;if(i===cg)return t.ALPHA;if(i===fg)return t.RGB;if(i===Gn)return t.RGBA;if(i===ki)return t.DEPTH_COMPONENT;if(i===Mr)return t.DEPTH_STENCIL;if(i===dg)return t.RED;if(i===pf)return t.RED_INTEGER;if(i===Lr)return t.RG;if(i===mf)return t.RG_INTEGER;if(i===gf)return t.RGBA_INTEGER;if(i===ba||i===ya||i===Sa||i===Ma)if(o===Rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ba)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ya)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ma)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ba)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ya)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ma)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nc||i===ic||i===rc||i===sc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===nc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ic)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oc||i===ac||i===lc||i===uc||i===cc||i===Va||i===fc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===oc||i===ac)return o===Rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===lc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===uc)return s.COMPRESSED_R11_EAC;if(i===cc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Va)return s.COMPRESSED_RG11_EAC;if(i===fc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===dc||i===hc||i===pc||i===mc||i===gc||i===_c||i===vc||i===xc||i===bc||i===yc||i===Sc||i===Mc||i===Ec||i===wc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===dc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===hc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_c)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===bc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ec)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wc)return o===Rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Tc||i===Ac||i===Rc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Tc)return o===Rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ac)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Rc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cc||i===Pc||i===Ha||i===Lc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Cc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Pc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ha)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const N1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U1=`
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

}`;class O1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new yg(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new gi({vertexShader:N1,fragmentShader:U1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Kn(new gl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F1 extends Ir{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,c=null,f=null,d=null,p=null,_=null;const y=typeof XRWebGLBinding<"u",g=new O1,h={},M=n.getContextAttributes();let C=null,b=null;const I=[],w=[],B=new Et;let v=null;const S=new In;S.viewport=new Vt;const F=new In;F.viewport=new Vt;const D=[S,F],H=new XM;let ee=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let W=I[ie];return W===void 0&&(W=new Ql,I[ie]=W),W.getTargetRaySpace()},this.getControllerGrip=function(ie){let W=I[ie];return W===void 0&&(W=new Ql,I[ie]=W),W.getGripSpace()},this.getHand=function(ie){let W=I[ie];return W===void 0&&(W=new Ql,I[ie]=W),W.getHandSpace()};function J(ie){const W=w.indexOf(ie.inputSource);if(W===-1)return;const ae=I[W];ae!==void 0&&(ae.update(ie.inputSource,ie.frame,u||o),ae.dispatchEvent({type:ie.type,data:ie.inputSource}))}function le(){r.removeEventListener("select",J),r.removeEventListener("selectstart",J),r.removeEventListener("selectend",J),r.removeEventListener("squeeze",J),r.removeEventListener("squeezestart",J),r.removeEventListener("squeezeend",J),r.removeEventListener("end",le),r.removeEventListener("inputsourceschange",L);for(let ie=0;ie<I.length;ie++){const W=w[ie];W!==null&&(w[ie]=null,I[ie].disconnect(W))}ee=null,X=null,g.reset();for(const ie in h)delete h[ie];e.setRenderTarget(C),p=null,d=null,f=null,r=null,b=null,ye.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(B.width,B.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){s=ie,i.isPresenting===!0&&ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){a=ie,i.isPresenting===!0&&ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(ie){u=ie},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",J),r.addEventListener("selectstart",J),r.addEventListener("selectend",J),r.addEventListener("squeeze",J),r.addEventListener("squeezestart",J),r.addEventListener("squeezeend",J),r.addEventListener("end",le),r.addEventListener("inputsourceschange",L),M.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(B),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,ve=null,Te=null;M.depth&&(Te=M.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ae=M.stencil?Mr:ki,ve=M.stencil?yo:mi);const Fe={colorFormat:n.RGBA8,depthFormat:Te,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Fe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new hi(d.textureWidth,d.textureHeight,{format:Gn,type:Nn,depthTexture:new Es(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ae={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ae),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new hi(p.framebufferWidth,p.framebufferHeight,{format:Gn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),ye.setContext(r),ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function L(ie){for(let W=0;W<ie.removed.length;W++){const ae=ie.removed[W],ve=w.indexOf(ae);ve>=0&&(w[ve]=null,I[ve].disconnect(ae))}for(let W=0;W<ie.added.length;W++){const ae=ie.added[W];let ve=w.indexOf(ae);if(ve===-1){for(let Fe=0;Fe<I.length;Fe++)if(Fe>=w.length){w.push(ae),ve=Fe;break}else if(w[Fe]===null){w[Fe]=ae,ve=Fe;break}if(ve===-1)break}const Te=I[ve];Te&&Te.connect(ae)}}const $=new he,ge=new he;function Ue(ie,W,ae){$.setFromMatrixPosition(W.matrixWorld),ge.setFromMatrixPosition(ae.matrixWorld);const ve=$.distanceTo(ge),Te=W.projectionMatrix.elements,Fe=ae.projectionMatrix.elements,T=Te[14]/(Te[10]-1),R=Te[14]/(Te[10]+1),k=(Te[9]+1)/Te[5],re=(Te[9]-1)/Te[5],Q=(Te[8]-1)/Te[0],ue=(Fe[8]+1)/Fe[0],Ae=T*Q,Ee=T*ue,Re=ve/(-Q+ue),Y=Re*-Q;if(W.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Y),ie.translateZ(Re),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Te[10]===-1)ie.projectionMatrix.copy(W.projectionMatrix),ie.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{const be=T+Re,N=R+Re,Ie=Ae-Y,we=Ee+(ve-Y),U=k*R/N*be,x=re*R/N*be;ie.projectionMatrix.makePerspective(Ie,we,U,x,be,N),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function Pe(ie,W){W===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(W.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;let W=ie.near,ae=ie.far;g.texture!==null&&(g.depthNear>0&&(W=g.depthNear),g.depthFar>0&&(ae=g.depthFar)),H.near=F.near=S.near=W,H.far=F.far=S.far=ae,(ee!==H.near||X!==H.far)&&(r.updateRenderState({depthNear:H.near,depthFar:H.far}),ee=H.near,X=H.far),H.layers.mask=ie.layers.mask|6,S.layers.mask=H.layers.mask&-5,F.layers.mask=H.layers.mask&-3;const ve=ie.parent,Te=H.cameras;Pe(H,ve);for(let Fe=0;Fe<Te.length;Fe++)Pe(Te[Fe],ve);Te.length===2?Ue(H,S,F):H.projectionMatrix.copy(S.projectionMatrix),ke(ie,H,ve)};function ke(ie,W,ae){ae===null?ie.matrix.copy(W.matrixWorld):(ie.matrix.copy(ae.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(W.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(W.projectionMatrix),ie.projectionMatrixInverse.copy(W.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Mo*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(ie){l=ie,d!==null&&(d.fixedFoveation=ie),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ie)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(ie){return h[ie]};let Le=null;function De(ie,W){if(c=W.getViewerPose(u||o),_=W,c!==null){const ae=c.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ve=!1;ae.length!==H.cameras.length&&(H.cameras.length=0,ve=!0);for(let R=0;R<ae.length;R++){const k=ae[R];let re=null;if(p!==null)re=p.getViewport(k);else{const ue=f.getViewSubImage(d,k);re=ue.viewport,R===0&&(e.setRenderTargetTextures(b,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(b))}let Q=D[R];Q===void 0&&(Q=new In,Q.layers.enable(R),Q.viewport=new Vt,D[R]=Q),Q.matrix.fromArray(k.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(k.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(re.x,re.y,re.width,re.height),R===0&&(H.matrix.copy(Q.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),ve===!0&&H.cameras.push(Q)}const Te=r.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){f=i.getBinding();const R=f.getDepthInformation(ae[0]);R&&R.isValid&&R.texture&&g.init(R,r.renderState)}if(Te&&Te.includes("camera-access")&&y){e.state.unbindTexture(),f=i.getBinding();for(let R=0;R<ae.length;R++){const k=ae[R].camera;if(k){let re=h[k];re||(re=new yg,h[k]=re);const Q=f.getCameraImage(k);re.sourceTexture=Q}}}}for(let ae=0;ae<I.length;ae++){const ve=w[ae],Te=I[ae];ve!==null&&Te!==void 0&&Te.update(ve,W,u||o)}Le&&Le(ie,W),W.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:W}),_=null}const ye=new wg;ye.setAnimationLoop(De),this.setAnimationLoop=function(ie){Le=ie},this.dispose=function(){}}}const B1=new Xt,Dg=new ft;Dg.set(-1,0,0,0,1,0,0,0,1);function k1(t,e){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,Sg(t)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,M,C,b){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(g,h):h.isMeshLambertMaterial?(s(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(g,h),f(g,h)):h.isMeshPhongMaterial?(s(g,h),c(g,h),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(g,h),d(g,h),h.isMeshPhysicalMaterial&&p(g,h,b)):h.isMeshMatcapMaterial?(s(g,h),_(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),y(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?l(g,h,M,C):h.isSpriteMaterial?u(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===Sn&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===Sn&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const M=e.get(h),C=M.envMap,b=M.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(B1.makeRotationFromEuler(b)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Dg),g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,M,C){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*M,g.scale.value=C*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function u(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function f(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function d(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,M){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Sn&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,h){h.matcap&&(g.matcap.value=h.matcap)}function y(g,h){const M=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function V1(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,I){const w=I.program;i.uniformBlockBinding(b,w)}function u(b,I){let w=r[b.id];w===void 0&&(g(b),w=c(b),r[b.id]=w,b.addEventListener("dispose",M));const B=I.program;i.updateUBOMapping(b,B);const v=e.render.frame;s[b.id]!==v&&(d(b),s[b.id]=v)}function c(b){const I=f();b.__bindingPointIndex=I;const w=t.createBuffer(),B=b.__size,v=b.usage;return t.bindBuffer(t.UNIFORM_BUFFER,w),t.bufferData(t.UNIFORM_BUFFER,B,v),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,I,w),w}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return St("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const I=r[b.id],w=b.uniforms,B=b.__cache;t.bindBuffer(t.UNIFORM_BUFFER,I);for(let v=0,S=w.length;v<S;v++){const F=w[v];if(Array.isArray(F))for(let D=0,H=F.length;D<H;D++)p(F[D],v,D,B);else p(F,v,0,B)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(b,I,w,B){if(y(b,I,w,B)===!0){const v=b.__offset,S=b.value;if(Array.isArray(S)){let F=0;for(let D=0;D<S.length;D++){const H=S[D],ee=h(H);_(H,b.__data,F),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(F+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(S,b.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,v,b.__data)}}function _(b,I,w){typeof b=="number"||typeof b=="boolean"?I[0]=b:b.isMatrix3?(I[0]=b.elements[0],I[1]=b.elements[1],I[2]=b.elements[2],I[3]=0,I[4]=b.elements[3],I[5]=b.elements[4],I[6]=b.elements[5],I[7]=0,I[8]=b.elements[6],I[9]=b.elements[7],I[10]=b.elements[8],I[11]=0):ArrayBuffer.isView(b)?I.set(new b.constructor(b.buffer,b.byteOffset,I.length)):b.toArray(I,w)}function y(b,I,w,B){const v=b.value,S=I+"_"+w;if(B[S]===void 0)return typeof v=="number"||typeof v=="boolean"?B[S]=v:ArrayBuffer.isView(v)?B[S]=v.slice():B[S]=v.clone(),!0;{const F=B[S];if(typeof v=="number"||typeof v=="boolean"){if(F!==v)return B[S]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(F.equals(v)===!1)return F.copy(v),!0}}return!1}function g(b){const I=b.uniforms;let w=0;const B=16;for(let S=0,F=I.length;S<F;S++){const D=Array.isArray(I[S])?I[S]:[I[S]];for(let H=0,ee=D.length;H<ee;H++){const X=D[H],J=Array.isArray(X.value)?X.value:[X.value];for(let le=0,L=J.length;le<L;le++){const $=J[le],ge=h($),Ue=w%B,Pe=Ue%ge.boundary,ke=Ue+Pe;w+=Pe,ke!==0&&B-ke<ge.storage&&(w+=B-ke),X.__data=new Float32Array(ge.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=w,w+=ge.storage}}}const v=w%B;return v>0&&(w+=B-v),b.__size=w,b.__cache={},this}function h(b){const I={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(I.boundary=4,I.storage=4):b.isVector2?(I.boundary=8,I.storage=8):b.isVector3||b.isColor?(I.boundary=16,I.storage=12):b.isVector4?(I.boundary=16,I.storage=16):b.isMatrix3?(I.boundary=48,I.storage=48):b.isMatrix4?(I.boundary=64,I.storage=64):b.isTexture?ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(I.boundary=16,I.storage=b.byteLength):ut("WebGLRenderer: Unsupported uniform value type.",b),I}function M(b){const I=b.target;I.removeEventListener("dispose",M);const w=o.indexOf(I.__bindingPointIndex);o.splice(w,1),t.deleteBuffer(r[I.id]),delete r[I.id],delete s[I.id]}function C(){for(const b in r)t.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:u,dispose:C}}const H1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ni=null;function z1(){return ni===null&&(ni=new CM(H1,16,16,Lr,Bi),ni.name="DFG_LUT",ni.minFilter=fn,ni.magFilter=fn,ni.wrapS=Pi,ni.wrapT=Pi,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class G1{constructor(e={}){const{canvas:n=$S(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Nn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=o;const y=p,g=new Set([gf,mf,pf]),h=new Set([Nn,mi,bo,yo,df,hf]),M=new Uint32Array(4),C=new Int32Array(4),b=new he;let I=null,w=null;const B=[],v=[];let S=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let D=!1,H=null,ee=null,X=null,J=null;this._outputColorSpace=wn;let le=0,L=0,$=null,ge=-1,Ue=null;const Pe=new Vt,ke=new Vt;let Le=null;const De=new At(0);let ye=0,ie=n.width,W=n.height,ae=1,ve=null,Te=null;const Fe=new Vt(0,0,ie,W),T=new Vt(0,0,ie,W);let R=!1;const k=new xg;let re=!1,Q=!1;const ue=new Xt,Ae=new he,Ee=new Vt,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Y=!1;function be(){return $===null?ae:1}let N=i;function Ie(P,se){return n.getContext(P,se)}try{const P={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${cf}`),n.addEventListener("webglcontextlost",Ft,!1),n.addEventListener("webglcontextrestored",Pt,!1),n.addEventListener("webglcontextcreationerror",Cn,!1),N===null){const se="webgl2";if(N=Ie(se,P),N===null)throw Ie(se)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(P){throw St("WebGLRenderer: "+P.message),P}let we,U,x,q,ne,de,Ne,Ve,_e,xe,Be,Ge,ze,He,nt,rt,ot,K,V,z,G,Oe,Se;function Qe(){we=new zT(N),we.init(),G=new I1(N,we),U=new NT(N,we,e,G),x=new L1(N,we),U.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),ee=N.createFramebuffer(),X=N.createFramebuffer(),J=N.createFramebuffer(),q=new $T(N),ne=new _1,de=new D1(N,we,x,ne,U,G,q),Ne=new HT(F),Ve=new KM(N),Oe=new DT(N,Ve),_e=new GT(N,Ve,q,Oe),xe=new qT(N,_e,Ve,Oe,q),K=new XT(N,U,de),nt=new UT(ne),Be=new g1(F,Ne,we,U,Oe,nt),Ge=new k1(F,ne),ze=new x1,He=new w1(we),ot=new LT(F,Ne,x,xe,_,l),rt=new P1(F,xe,U),Se=new V1(N,q,U,x),V=new IT(N,we,q),z=new WT(N,we,q),q.programs=Be.programs,F.capabilities=U,F.extensions=we,F.properties=ne,F.renderLists=ze,F.shadowMap=rt,F.state=x,F.info=q}Qe(),y!==Nn&&(S=new KT(y,n.width,n.height,a,r,s));const Ye=new F1(F,N);this.xr=Ye,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const P=we.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=we.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(P){P!==void 0&&(ae=P,this.setSize(ie,W,!1))},this.getSize=function(P){return P.set(ie,W)},this.setSize=function(P,se,me=!0){if(Ye.isPresenting){ut("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=P,W=se,n.width=Math.floor(P*ae),n.height=Math.floor(se*ae),me===!0&&(n.style.width=P+"px",n.style.height=se+"px"),S!==null&&S.setSize(n.width,n.height),this.setViewport(0,0,P,se)},this.getDrawingBufferSize=function(P){return P.set(ie*ae,W*ae).floor()},this.setDrawingBufferSize=function(P,se,me){ie=P,W=se,ae=me,n.width=Math.floor(P*me),n.height=Math.floor(se*me),this.setViewport(0,0,P,se)},this.setEffects=function(P){if(y===Nn){St("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let se=0;se<P.length;se++)if(P[se].isOutputPass===!0){ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(Pe)},this.getViewport=function(P){return P.copy(Fe)},this.setViewport=function(P,se,me,ce){P.isVector4?Fe.set(P.x,P.y,P.z,P.w):Fe.set(P,se,me,ce),x.viewport(Pe.copy(Fe).multiplyScalar(ae).round())},this.getScissor=function(P){return P.copy(T)},this.setScissor=function(P,se,me,ce){P.isVector4?T.set(P.x,P.y,P.z,P.w):T.set(P,se,me,ce),x.scissor(ke.copy(T).multiplyScalar(ae).round())},this.getScissorTest=function(){return R},this.setScissorTest=function(P){x.setScissorTest(R=P)},this.setOpaqueSort=function(P){ve=P},this.setTransparentSort=function(P){Te=P},this.getClearColor=function(P){return P.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor(...arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha(...arguments)},this.clear=function(P=!0,se=!0,me=!0){let ce=0;if(P){let fe=!1;if($!==null){const $e=$.texture.format;fe=g.has($e)}if(fe){const $e=$.texture.type,Ze=h.has($e),We=ot.getClearColor(),et=ot.getClearAlpha(),A=We.r,E=We.g,O=We.b;Ze?(M[0]=A,M[1]=E,M[2]=O,M[3]=et,N.clearBufferuiv(N.COLOR,0,M)):(C[0]=A,C[1]=E,C[2]=O,C[3]=et,N.clearBufferiv(N.COLOR,0,C))}else ce|=N.COLOR_BUFFER_BIT}se&&(ce|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),me&&(ce|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ce!==0&&N.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),H=P},this.dispose=function(){n.removeEventListener("webglcontextlost",Ft,!1),n.removeEventListener("webglcontextrestored",Pt,!1),n.removeEventListener("webglcontextcreationerror",Cn,!1),ot.dispose(),ze.dispose(),He.dispose(),ne.dispose(),Ne.dispose(),xe.dispose(),Oe.dispose(),Se.dispose(),Be.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",No),Ye.removeEventListener("sessionend",Uo),Jn.stop()};function Ft(P){P.preventDefault(),eh("WebGLRenderer: Context Lost."),D=!0}function Pt(){eh("WebGLRenderer: Context Restored."),D=!1;const P=q.autoReset,se=rt.enabled,me=rt.autoUpdate,ce=rt.needsUpdate,fe=rt.type;Qe(),q.autoReset=P,rt.enabled=se,rt.autoUpdate=me,rt.needsUpdate=ce,rt.type=fe}function Cn(P){St("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Pn(P){const se=P.target;se.removeEventListener("dispose",Pn),ur(se)}function ur(P){xl(P),ne.remove(P)}function xl(P){const se=ne.get(P).programs;se!==void 0&&(se.forEach(function(me){Be.releaseProgram(me)}),P.isShaderMaterial&&Be.releaseShaderCache(P))}this.renderBufferDirect=function(P,se,me,ce,fe,$e){se===null&&(se=Re);const Ze=fe.isMesh&&fe.matrixWorld.determinantAffine()<0,We=Sl(P,se,me,ce,fe);x.setMaterial(ce,Ze);let et=me.index,A=1;if(ce.wireframe===!0){if(et=_e.getWireframeAttribute(me),et===void 0)return;A=2}const E=me.drawRange,O=me.attributes.position;let pe=E.start*A,Ce=(E.start+E.count)*A;$e!==null&&(pe=Math.max(pe,$e.start*A),Ce=Math.min(Ce,($e.start+$e.count)*A)),et!==null?(pe=Math.max(pe,0),Ce=Math.min(Ce,et.count)):O!=null&&(pe=Math.max(pe,0),Ce=Math.min(Ce,O.count));const gt=Ce-pe;if(gt<0||gt===1/0)return;Oe.setup(fe,ce,We,me,et);let yt,xt=V;if(et!==null&&(yt=Ve.get(et),xt=z,xt.setIndex(yt)),fe.isMesh)ce.wireframe===!0?(x.setLineWidth(ce.wireframeLinewidth*be()),xt.setMode(N.LINES)):xt.setMode(N.TRIANGLES);else if(fe.isLine){let qt=ce.linewidth;qt===void 0&&(qt=1),x.setLineWidth(qt*be()),fe.isLineSegments?xt.setMode(N.LINES):fe.isLineLoop?xt.setMode(N.LINE_LOOP):xt.setMode(N.LINE_STRIP)}else fe.isPoints?xt.setMode(N.POINTS):fe.isSprite&&xt.setMode(N.TRIANGLES);if(fe.isBatchedMesh)if(we.get("WEBGL_multi_draw"))xt.renderMultiDraw(fe._multiDrawStarts,fe._multiDrawCounts,fe._multiDrawCount);else{const qt=fe._multiDrawStarts,je=fe._multiDrawCounts,It=fe._multiDrawCount,pt=et?Ve.get(et).bytesPerElement:1,Ln=ne.get(ce).currentProgram.getUniforms();for(let Qn=0;Qn<It;Qn++)Ln.setValue(N,"_gl_DrawID",Qn),xt.render(qt[Qn]/pt,je[Qn])}else if(fe.isInstancedMesh)xt.renderInstances(pe,gt,fe.count);else if(me.isInstancedBufferGeometry){const qt=me._maxInstanceCount!==void 0?me._maxInstanceCount:1/0,je=Math.min(me.instanceCount,qt);xt.renderInstances(pe,gt,je)}else xt.render(pe,gt)};function Bs(P,se,me){P.transparent===!0&&P.side===Ci&&P.forceSinglePass===!1?(P.side=Sn,P.needsUpdate=!0,Or(P,se,me),P.side=or,P.needsUpdate=!0,Or(P,se,me),P.side=Ci):Or(P,se,me)}this.compile=function(P,se,me=null){me===null&&(me=P),w=He.get(me),w.init(se),v.push(w),me.traverseVisible(function(fe){fe.isLight&&fe.layers.test(se.layers)&&(w.pushLight(fe),fe.castShadow&&w.pushShadow(fe))}),P!==me&&P.traverseVisible(function(fe){fe.isLight&&fe.layers.test(se.layers)&&(w.pushLight(fe),fe.castShadow&&w.pushShadow(fe))}),w.setupLights();const ce=new Set;return P.traverse(function(fe){if(!(fe.isMesh||fe.isPoints||fe.isLine||fe.isSprite))return;const $e=fe.material;if($e)if(Array.isArray($e))for(let Ze=0;Ze<$e.length;Ze++){const We=$e[Ze];Bs(We,me,fe),ce.add(We)}else Bs($e,me,fe),ce.add($e)}),w=v.pop(),ce},this.compileAsync=function(P,se,me=null){const ce=this.compile(P,se,me);return new Promise(fe=>{function $e(){if(ce.forEach(function(Ze){ne.get(Ze).currentProgram.isReady()&&ce.delete(Ze)}),ce.size===0){fe(P);return}setTimeout($e,10)}we.get("KHR_parallel_shader_compile")!==null?$e():setTimeout($e,10)})};let ks=null;function bl(P){ks&&ks(P)}function No(){Jn.stop()}function Uo(){Jn.start()}const Jn=new wg;Jn.setAnimationLoop(bl),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(P){ks=P,Ye.setAnimationLoop(P),P===null?Jn.stop():Jn.start()},Ye.addEventListener("sessionstart",No),Ye.addEventListener("sessionend",Uo),this.render=function(P,se){if(se!==void 0&&se.isCamera!==!0){St("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;H!==null&&H.renderStart(P,se);const me=Ye.enabled===!0&&Ye.isPresenting===!0,ce=S!==null&&($===null||me)&&S.begin(F,$);if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),se.parent===null&&se.matrixWorldAutoUpdate===!0&&se.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(se),se=Ye.getCamera()),P.isScene===!0&&P.onBeforeRender(F,P,se,$),w=He.get(P,v.length),w.init(se),w.state.textureUnits=de.getTextureUnits(),v.push(w),ue.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),k.setFromProjectionMatrix(ue,ui,se.reversedDepth),Q=this.localClippingEnabled,re=nt.init(this.clippingPlanes,Q),I=ze.get(P,B.length),I.init(),B.push(I),Ye.enabled===!0&&Ye.isPresenting===!0){const Ze=F.xr.getDepthSensingMesh();Ze!==null&&Vs(Ze,se,-1/0,F.sortObjects)}Vs(P,se,0,F.sortObjects),I.finish(),F.sortObjects===!0&&I.sort(ve,Te,se.reversedDepth),Y=Ye.enabled===!1||Ye.isPresenting===!1||Ye.hasDepthSensing()===!1,Y&&ot.addToRenderList(I,P),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),re===!0&&nt.beginShadows();const fe=w.state.shadowsArray;if(rt.render(fe,P,se),re===!0&&nt.endShadows(),(ce&&S.hasRenderPass())===!1){const Ze=I.opaque,We=I.transmissive;if(w.setupLights(),se.isArrayCamera){const et=se.cameras;if(We.length>0)for(let A=0,E=et.length;A<E;A++){const O=et[A];Fo(Ze,We,P,O)}Y&&ot.render(P);for(let A=0,E=et.length;A<E;A++){const O=et[A];Oo(I,P,O,O.viewport)}}else We.length>0&&Fo(Ze,We,P,se),Y&&ot.render(P),Oo(I,P,se)}$!==null&&L===0&&(de.updateMultisampleRenderTarget($),de.updateRenderTargetMipmap($)),ce&&S.end(F),P.isScene===!0&&P.onAfterRender(F,P,se),Oe.resetDefaultState(),ge=-1,Ue=null,v.pop(),v.length>0?(w=v[v.length-1],de.setTextureUnits(w.state.textureUnits),re===!0&&nt.setGlobalState(F.clippingPlanes,w.state.camera)):w=null,B.pop(),B.length>0?I=B[B.length-1]:I=null,H!==null&&H.renderEnd()};function Vs(P,se,me,ce){if(P.visible===!1)return;if(P.layers.test(se.layers)){if(P.isGroup)me=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(se);else if(P.isLightProbeGrid)w.pushLightProbeGrid(P);else if(P.isLight)w.pushLight(P),P.castShadow&&w.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||k.intersectsSprite(P)){ce&&Ee.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ue);const Ze=xe.update(P),We=P.material;We.visible&&I.push(P,Ze,We,me,Ee.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||k.intersectsObject(P))){const Ze=xe.update(P),We=P.material;if(ce&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Ee.copy(P.boundingSphere.center)):(Ze.boundingSphere===null&&Ze.computeBoundingSphere(),Ee.copy(Ze.boundingSphere.center)),Ee.applyMatrix4(P.matrixWorld).applyMatrix4(ue)),Array.isArray(We)){const et=Ze.groups;for(let A=0,E=et.length;A<E;A++){const O=et[A],pe=We[O.materialIndex];pe&&pe.visible&&I.push(P,Ze,pe,me,Ee.z,O)}}else We.visible&&I.push(P,Ze,We,me,Ee.z,null)}}const $e=P.children;for(let Ze=0,We=$e.length;Ze<We;Ze++)Vs($e[Ze],se,me,ce)}function Oo(P,se,me,ce){const{opaque:fe,transmissive:$e,transparent:Ze}=P;w.setupLightsView(me),re===!0&&nt.setGlobalState(F.clippingPlanes,me),ce&&x.viewport(Pe.copy(ce)),fe.length>0&&Ur(fe,se,me),$e.length>0&&Ur($e,se,me),Ze.length>0&&Ur(Ze,se,me),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Fo(P,se,me,ce){if((me.isScene===!0?me.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[ce.id]===void 0){const pe=we.has("EXT_color_buffer_half_float")||we.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[ce.id]=new hi(1,1,{generateMipmaps:!0,type:pe?Bi:Nn,minFilter:Sr,samples:Math.max(4,U.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:bt.workingColorSpace})}const $e=w.state.transmissionRenderTarget[ce.id],Ze=ce.viewport||Pe;$e.setSize(Ze.z*F.transmissionResolutionScale,Ze.w*F.transmissionResolutionScale);const We=F.getRenderTarget(),et=F.getActiveCubeFace(),A=F.getActiveMipmapLevel();F.setRenderTarget($e),F.getClearColor(De),ye=F.getClearAlpha(),ye<1&&F.setClearColor(16777215,.5),F.clear(),Y&&ot.render(me);const E=F.toneMapping;F.toneMapping=di;const O=ce.viewport;if(ce.viewport!==void 0&&(ce.viewport=void 0),w.setupLightsView(ce),re===!0&&nt.setGlobalState(F.clippingPlanes,ce),Ur(P,me,ce),de.updateMultisampleRenderTarget($e),de.updateRenderTargetMipmap($e),we.has("WEBGL_multisampled_render_to_texture")===!1){let pe=!1;for(let Ce=0,gt=se.length;Ce<gt;Ce++){const yt=se[Ce],{object:xt,geometry:qt,material:je,group:It}=yt;if(je.side===Ci&&xt.layers.test(ce.layers)){const pt=je.side;je.side=Sn,je.needsUpdate=!0,Bo(xt,me,ce,qt,je,It),je.side=pt,je.needsUpdate=!0,pe=!0}}pe===!0&&(de.updateMultisampleRenderTarget($e),de.updateRenderTargetMipmap($e))}F.setRenderTarget(We,et,A),F.setClearColor(De,ye),O!==void 0&&(ce.viewport=O),F.toneMapping=E}function Ur(P,se,me){const ce=se.isScene===!0?se.overrideMaterial:null;for(let fe=0,$e=P.length;fe<$e;fe++){const Ze=P[fe],{object:We,geometry:et,group:A}=Ze;let E=Ze.material;E.allowOverride===!0&&ce!==null&&(E=ce),We.layers.test(me.layers)&&Bo(We,se,me,et,E,A)}}function Bo(P,se,me,ce,fe,$e){P.onBeforeRender(F,se,me,ce,fe,$e),P.modelViewMatrix.multiplyMatrices(me.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),fe.onBeforeRender(F,se,me,ce,P,$e),fe.transparent===!0&&fe.side===Ci&&fe.forceSinglePass===!1?(fe.side=Sn,fe.needsUpdate=!0,F.renderBufferDirect(me,se,ce,fe,P,$e),fe.side=or,fe.needsUpdate=!0,F.renderBufferDirect(me,se,ce,fe,P,$e),fe.side=Ci):F.renderBufferDirect(me,se,ce,fe,P,$e),P.onAfterRender(F,se,me,ce,fe,$e)}function Or(P,se,me){se.isScene!==!0&&(se=Re);const ce=ne.get(P),fe=w.state.lights,$e=w.state.shadowsArray,Ze=fe.state.version,We=Be.getParameters(P,fe.state,$e,se,me,w.state.lightProbeGridArray),et=Be.getProgramCacheKey(We);let A=ce.programs;ce.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?se.environment:null,ce.fog=se.fog;const E=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;ce.envMap=Ne.get(P.envMap||ce.environment,E),ce.envMapRotation=ce.environment!==null&&P.envMap===null?se.environmentRotation:P.envMapRotation,A===void 0&&(P.addEventListener("dispose",Pn),A=new Map,ce.programs=A);let O=A.get(et);if(O!==void 0){if(ce.currentProgram===O&&ce.lightsStateVersion===Ze)return Br(P,We),O}else We.uniforms=Be.getUniforms(P),H!==null&&P.isNodeMaterial&&H.build(P,me,We),P.onBeforeCompile(We,F),O=Be.acquireProgram(We,et),A.set(et,O),ce.uniforms=We.uniforms;const pe=ce.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(pe.clippingPlanes=nt.uniform),Br(P,We),ce.needsLights=El(P),ce.lightsStateVersion=Ze,ce.needsLights&&(pe.ambientLightColor.value=fe.state.ambient,pe.lightProbe.value=fe.state.probe,pe.directionalLights.value=fe.state.directional,pe.directionalLightShadows.value=fe.state.directionalShadow,pe.spotLights.value=fe.state.spot,pe.spotLightShadows.value=fe.state.spotShadow,pe.rectAreaLights.value=fe.state.rectArea,pe.ltc_1.value=fe.state.rectAreaLTC1,pe.ltc_2.value=fe.state.rectAreaLTC2,pe.pointLights.value=fe.state.point,pe.pointLightShadows.value=fe.state.pointShadow,pe.hemisphereLights.value=fe.state.hemi,pe.directionalShadowMatrix.value=fe.state.directionalShadowMatrix,pe.spotLightMatrix.value=fe.state.spotLightMatrix,pe.spotLightMap.value=fe.state.spotLightMap,pe.pointShadowMatrix.value=fe.state.pointShadowMatrix),ce.lightProbeGrid=w.state.lightProbeGridArray.length>0,ce.currentProgram=O,ce.uniformsList=null,O}function Fr(P){if(P.uniformsList===null){const se=P.currentProgram.getUniforms();P.uniformsList=Ea.seqWithValue(se.seq,P.uniforms)}return P.uniformsList}function Br(P,se){const me=ne.get(P);me.outputColorSpace=se.outputColorSpace,me.batching=se.batching,me.batchingColor=se.batchingColor,me.instancing=se.instancing,me.instancingColor=se.instancingColor,me.instancingMorph=se.instancingMorph,me.skinning=se.skinning,me.morphTargets=se.morphTargets,me.morphNormals=se.morphNormals,me.morphColors=se.morphColors,me.morphTargetsCount=se.morphTargetsCount,me.numClippingPlanes=se.numClippingPlanes,me.numIntersection=se.numClipIntersection,me.vertexAlphas=se.vertexAlphas,me.vertexTangents=se.vertexTangents,me.toneMapping=se.toneMapping}function yl(P,se){if(P.length===0)return null;if(P.length===1)return P[0].texture!==null?P[0]:null;b.setFromMatrixPosition(se.matrixWorld);for(let me=0,ce=P.length;me<ce;me++){const fe=P[me];if(fe.texture!==null&&fe.boundingBox.containsPoint(b))return fe}return null}function Sl(P,se,me,ce,fe){se.isScene!==!0&&(se=Re),de.resetTextureUnits();const $e=se.fog,Ze=ce.isMeshStandardMaterial||ce.isMeshLambertMaterial||ce.isMeshPhongMaterial?se.environment:null,We=$===null?F.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:bt.workingColorSpace,et=ce.isMeshStandardMaterial||ce.isMeshLambertMaterial&&!ce.envMap||ce.isMeshPhongMaterial&&!ce.envMap,A=Ne.get(ce.envMap||Ze,et),E=ce.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,O=!!me.attributes.tangent&&(!!ce.normalMap||ce.anisotropy>0),pe=!!me.morphAttributes.position,Ce=!!me.morphAttributes.normal,gt=!!me.morphAttributes.color;let yt=di;ce.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(yt=F.toneMapping);const xt=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,qt=xt!==void 0?xt.length:0,je=ne.get(ce),It=w.state.lights;if(re===!0&&(Q===!0||P!==Ue)){const Nt=P===Ue&&ce.id===ge;nt.setState(ce,P,Nt)}let pt=!1;ce.version===je.__version?(je.needsLights&&je.lightsStateVersion!==It.state.version||je.outputColorSpace!==We||fe.isBatchedMesh&&je.batching===!1||!fe.isBatchedMesh&&je.batching===!0||fe.isBatchedMesh&&je.batchingColor===!0&&fe.colorTexture===null||fe.isBatchedMesh&&je.batchingColor===!1&&fe.colorTexture!==null||fe.isInstancedMesh&&je.instancing===!1||!fe.isInstancedMesh&&je.instancing===!0||fe.isSkinnedMesh&&je.skinning===!1||!fe.isSkinnedMesh&&je.skinning===!0||fe.isInstancedMesh&&je.instancingColor===!0&&fe.instanceColor===null||fe.isInstancedMesh&&je.instancingColor===!1&&fe.instanceColor!==null||fe.isInstancedMesh&&je.instancingMorph===!0&&fe.morphTexture===null||fe.isInstancedMesh&&je.instancingMorph===!1&&fe.morphTexture!==null||je.envMap!==A||ce.fog===!0&&je.fog!==$e||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==nt.numPlanes||je.numIntersection!==nt.numIntersection)||je.vertexAlphas!==E||je.vertexTangents!==O||je.morphTargets!==pe||je.morphNormals!==Ce||je.morphColors!==gt||je.toneMapping!==yt||je.morphTargetsCount!==qt||!!je.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(pt=!0):(pt=!0,je.__version=ce.version);let Ln=je.currentProgram;pt===!0&&(Ln=Or(ce,se,fe),H&&ce.isNodeMaterial&&H.onUpdateProgram(ce,Ln,je));let Qn=!1,Hi=!1,kr=!1;const Lt=Ln.getUniforms(),Gt=je.uniforms;if(x.useProgram(Ln.program)&&(Qn=!0,Hi=!0,kr=!0),ce.id!==ge&&(ge=ce.id,Hi=!0),je.needsLights){const Nt=yl(w.state.lightProbeGridArray,fe);je.lightProbeGrid!==Nt&&(je.lightProbeGrid=Nt,Hi=!0)}if(Qn||Ue!==P){x.buffers.depth.getReversed()&&P.reversedDepth!==!0&&(P._reversedDepth=!0,P.updateProjectionMatrix()),Lt.setValue(N,"projectionMatrix",P.projectionMatrix),Lt.setValue(N,"viewMatrix",P.matrixWorldInverse);const Gi=Lt.map.cameraPosition;Gi!==void 0&&Gi.setValue(N,Ae.setFromMatrixPosition(P.matrixWorld)),U.logarithmicDepthBuffer&&Lt.setValue(N,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(ce.isMeshPhongMaterial||ce.isMeshToonMaterial||ce.isMeshLambertMaterial||ce.isMeshBasicMaterial||ce.isMeshStandardMaterial||ce.isShaderMaterial)&&Lt.setValue(N,"isOrthographic",P.isOrthographicCamera===!0),Ue!==P&&(Ue=P,Hi=!0,kr=!0)}if(je.needsLights&&(It.state.directionalShadowMap.length>0&&Lt.setValue(N,"directionalShadowMap",It.state.directionalShadowMap,de),It.state.spotShadowMap.length>0&&Lt.setValue(N,"spotShadowMap",It.state.spotShadowMap,de),It.state.pointShadowMap.length>0&&Lt.setValue(N,"pointShadowMap",It.state.pointShadowMap,de)),fe.isSkinnedMesh){Lt.setOptional(N,fe,"bindMatrix"),Lt.setOptional(N,fe,"bindMatrixInverse");const Nt=fe.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),Lt.setValue(N,"boneTexture",Nt.boneTexture,de))}fe.isBatchedMesh&&(Lt.setOptional(N,fe,"batchingTexture"),Lt.setValue(N,"batchingTexture",fe._matricesTexture,de),Lt.setOptional(N,fe,"batchingIdTexture"),Lt.setValue(N,"batchingIdTexture",fe._indirectTexture,de),Lt.setOptional(N,fe,"batchingColorTexture"),fe._colorsTexture!==null&&Lt.setValue(N,"batchingColorTexture",fe._colorsTexture,de));const zi=me.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&K.update(fe,me,Ln),(Hi||je.receiveShadow!==fe.receiveShadow)&&(je.receiveShadow=fe.receiveShadow,Lt.setValue(N,"receiveShadow",fe.receiveShadow)),(ce.isMeshStandardMaterial||ce.isMeshLambertMaterial||ce.isMeshPhongMaterial)&&ce.envMap===null&&se.environment!==null&&(Gt.envMapIntensity.value=se.environmentIntensity),Gt.dfgLUT!==void 0&&(Gt.dfgLUT.value=z1()),Hi){if(Lt.setValue(N,"toneMappingExposure",F.toneMappingExposure),je.needsLights&&Ml(Gt,kr),$e&&ce.fog===!0&&Ge.refreshFogUniforms(Gt,$e),Ge.refreshMaterialUniforms(Gt,ce,ae,W,w.state.transmissionRenderTarget[P.id]),je.needsLights&&je.lightProbeGrid){const Nt=je.lightProbeGrid;Gt.probesSH.value=Nt.texture,Gt.probesMin.value.copy(Nt.boundingBox.min),Gt.probesMax.value.copy(Nt.boundingBox.max),Gt.probesResolution.value.copy(Nt.resolution)}Ea.upload(N,Fr(je),Gt,de)}if(ce.isShaderMaterial&&ce.uniformsNeedUpdate===!0&&(Ea.upload(N,Fr(je),Gt,de),ce.uniformsNeedUpdate=!1),ce.isSpriteMaterial&&Lt.setValue(N,"center",fe.center),Lt.setValue(N,"modelViewMatrix",fe.modelViewMatrix),Lt.setValue(N,"normalMatrix",fe.normalMatrix),Lt.setValue(N,"modelMatrix",fe.matrixWorld),ce.uniformsGroups!==void 0){const Nt=ce.uniformsGroups;for(let Gi=0,Vr=Nt.length;Gi<Vr;Gi++){const Lf=Nt[Gi];Se.update(Lf,Ln),Se.bind(Lf,Ln)}}return Ln}function Ml(P,se){P.ambientLightColor.needsUpdate=se,P.lightProbe.needsUpdate=se,P.directionalLights.needsUpdate=se,P.directionalLightShadows.needsUpdate=se,P.pointLights.needsUpdate=se,P.pointLightShadows.needsUpdate=se,P.spotLights.needsUpdate=se,P.spotLightShadows.needsUpdate=se,P.rectAreaLights.needsUpdate=se,P.hemisphereLights.needsUpdate=se}function El(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return le},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(P,se,me){const ce=ne.get(P);ce.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,ce.__autoAllocateDepthBuffer===!1&&(ce.__useRenderToTexture=!1),ne.get(P.texture).__webglTexture=se,ne.get(P.depthTexture).__webglTexture=ce.__autoAllocateDepthBuffer?void 0:me,ce.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,se){const me=ne.get(P);me.__webglFramebuffer=se,me.__useDefaultFramebuffer=se===void 0},this.setRenderTarget=function(P,se=0,me=0){$=P,le=se,L=me;let ce=null,fe=!1,$e=!1;if(P){const We=ne.get(P);if(We.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,We.__webglFramebuffer),Pe.copy(P.viewport),ke.copy(P.scissor),Le=P.scissorTest,x.viewport(Pe),x.scissor(ke),x.setScissorTest(Le),ge=-1;return}else if(We.__webglFramebuffer===void 0)de.setupRenderTarget(P);else if(We.__hasExternalTextures)de.rebindTextures(P,ne.get(P.texture).__webglTexture,ne.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const E=P.depthTexture;if(We.__boundDepthTexture!==E){if(E!==null&&ne.has(E)&&(P.width!==E.image.width||P.height!==E.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");de.setupDepthRenderbuffer(P)}}const et=P.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&($e=!0);const A=ne.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(A[se])?ce=A[se][me]:ce=A[se],fe=!0):P.samples>0&&de.useMultisampledRTT(P)===!1?ce=ne.get(P).__webglMultisampledFramebuffer:Array.isArray(A)?ce=A[me]:ce=A,Pe.copy(P.viewport),ke.copy(P.scissor),Le=P.scissorTest}else Pe.copy(Fe).multiplyScalar(ae).floor(),ke.copy(T).multiplyScalar(ae).floor(),Le=R;if(me!==0&&(ce=ee),x.bindFramebuffer(N.FRAMEBUFFER,ce)&&x.drawBuffers(P,ce),x.viewport(Pe),x.scissor(ke),x.setScissorTest(Le),fe){const We=ne.get(P.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+se,We.__webglTexture,me)}else if($e){const We=se;for(let et=0;et<P.textures.length;et++){const A=ne.get(P.textures[et]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+et,A.__webglTexture,me,We)}}else if(P!==null&&me!==0){const We=ne.get(P.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,We.__webglTexture,me)}ge=-1},this.readRenderTargetPixels=function(P,se,me,ce,fe,$e,Ze,We=0){if(!(P&&P.isWebGLRenderTarget)){St("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let et=ne.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Ze!==void 0&&(et=et[Ze]),et){x.bindFramebuffer(N.FRAMEBUFFER,et);try{const A=P.textures[We],E=A.format,O=A.type;if(P.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+We),!U.textureFormatReadable(E)){St("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!U.textureTypeReadable(O)){St("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}se>=0&&se<=P.width-ce&&me>=0&&me<=P.height-fe&&N.readPixels(se,me,ce,fe,G.convert(E),G.convert(O),$e)}finally{const A=$!==null?ne.get($).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,A)}}},this.readRenderTargetPixelsAsync=async function(P,se,me,ce,fe,$e,Ze,We=0){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let et=ne.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Ze!==void 0&&(et=et[Ze]),et)if(se>=0&&se<=P.width-ce&&me>=0&&me<=P.height-fe){x.bindFramebuffer(N.FRAMEBUFFER,et);const A=P.textures[We],E=A.format,O=A.type;if(P.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+We),!U.textureFormatReadable(E))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!U.textureTypeReadable(O))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,pe),N.bufferData(N.PIXEL_PACK_BUFFER,$e.byteLength,N.STREAM_READ),N.readPixels(se,me,ce,fe,G.convert(E),G.convert(O),0);const Ce=$!==null?ne.get($).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Ce);const gt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await XS(N,gt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,pe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,$e),N.deleteBuffer(pe),N.deleteSync(gt),$e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,se=null,me=0){const ce=Math.pow(2,-me),fe=Math.floor(P.image.width*ce),$e=Math.floor(P.image.height*ce),Ze=se!==null?se.x:0,We=se!==null?se.y:0;de.setTexture2D(P,0),N.copyTexSubImage2D(N.TEXTURE_2D,me,0,0,Ze,We,fe,$e),x.unbindTexture()},this.copyTextureToTexture=function(P,se,me=null,ce=null,fe=0,$e=0){let Ze,We,et,A,E,O,pe,Ce,gt;const yt=P.isCompressedTexture?P.mipmaps[$e]:P.image;if(me!==null)Ze=me.max.x-me.min.x,We=me.max.y-me.min.y,et=me.isBox3?me.max.z-me.min.z:1,A=me.min.x,E=me.min.y,O=me.isBox3?me.min.z:0;else{const Gt=Math.pow(2,-fe);Ze=Math.floor(yt.width*Gt),We=Math.floor(yt.height*Gt),P.isDataArrayTexture?et=yt.depth:P.isData3DTexture?et=Math.floor(yt.depth*Gt):et=1,A=0,E=0,O=0}ce!==null?(pe=ce.x,Ce=ce.y,gt=ce.z):(pe=0,Ce=0,gt=0);const xt=G.convert(se.format),qt=G.convert(se.type);let je;se.isData3DTexture?(de.setTexture3D(se,0),je=N.TEXTURE_3D):se.isDataArrayTexture||se.isCompressedArrayTexture?(de.setTexture2DArray(se,0),je=N.TEXTURE_2D_ARRAY):(de.setTexture2D(se,0),je=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,se.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,se.unpackAlignment);const It=x.getParameter(N.UNPACK_ROW_LENGTH),pt=x.getParameter(N.UNPACK_IMAGE_HEIGHT),Ln=x.getParameter(N.UNPACK_SKIP_PIXELS),Qn=x.getParameter(N.UNPACK_SKIP_ROWS),Hi=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,yt.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,yt.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,A),x.pixelStorei(N.UNPACK_SKIP_ROWS,E),x.pixelStorei(N.UNPACK_SKIP_IMAGES,O);const kr=P.isDataArrayTexture||P.isData3DTexture,Lt=se.isDataArrayTexture||se.isData3DTexture;if(P.isDepthTexture){const Gt=ne.get(P),zi=ne.get(se),Nt=ne.get(Gt.__renderTarget),Gi=ne.get(zi.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,Nt.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Vr=0;Vr<et;Vr++)kr&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ne.get(P).__webglTexture,fe,O+Vr),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ne.get(se).__webglTexture,$e,gt+Vr)),N.blitFramebuffer(A,E,Ze,We,pe,Ce,Ze,We,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(fe!==0||P.isRenderTargetTexture||ne.has(P)){const Gt=ne.get(P),zi=ne.get(se);x.bindFramebuffer(N.READ_FRAMEBUFFER,X),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,J);for(let Nt=0;Nt<et;Nt++)kr?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Gt.__webglTexture,fe,O+Nt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Gt.__webglTexture,fe),Lt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,zi.__webglTexture,$e,gt+Nt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,zi.__webglTexture,$e),fe!==0?N.blitFramebuffer(A,E,Ze,We,pe,Ce,Ze,We,N.COLOR_BUFFER_BIT,N.NEAREST):Lt?N.copyTexSubImage3D(je,$e,pe,Ce,gt+Nt,A,E,Ze,We):N.copyTexSubImage2D(je,$e,pe,Ce,A,E,Ze,We);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Lt?P.isDataTexture||P.isData3DTexture?N.texSubImage3D(je,$e,pe,Ce,gt,Ze,We,et,xt,qt,yt.data):se.isCompressedArrayTexture?N.compressedTexSubImage3D(je,$e,pe,Ce,gt,Ze,We,et,xt,yt.data):N.texSubImage3D(je,$e,pe,Ce,gt,Ze,We,et,xt,qt,yt):P.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,$e,pe,Ce,Ze,We,xt,qt,yt.data):P.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,$e,pe,Ce,yt.width,yt.height,xt,yt.data):N.texSubImage2D(N.TEXTURE_2D,$e,pe,Ce,Ze,We,xt,qt,yt);x.pixelStorei(N.UNPACK_ROW_LENGTH,It),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pt),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Ln),x.pixelStorei(N.UNPACK_SKIP_ROWS,Qn),x.pixelStorei(N.UNPACK_SKIP_IMAGES,Hi),$e===0&&se.generateMipmaps&&N.generateMipmap(je),x.unbindTexture()},this.initRenderTarget=function(P){ne.get(P).__webglFramebuffer===void 0&&de.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?de.setTextureCube(P,0):P.isData3DTexture?de.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?de.setTexture2DArray(P,0):de.setTexture2D(P,0),x.unbindTexture()},this.resetState=function(){le=0,L=0,$=null,x.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=bt._getDrawingBufferColorSpace(e),n.unpackColorSpace=bt._getUnpackColorSpace()}}const W1={key:0,class:"canvas-empty-text"},$1={key:1,class:"canvas-empty-text panorama-error-text"},X1={key:2,class:"panorama-info-area-layer","aria-hidden":"true"},q1=["points"],Y1=["points","onClick"],K1=["onClick"],j1=["src"],Z1=["src"],J1=["onClick","onDblclick"],Q1={key:1,class:"viewer-info-dot"},eR={key:2,class:"viewer-point-dot"},tR={class:"hotspot-label"},nR=650,iR=-70,rR=82,Ef={__name:"PanoramaViewer",props:{imageUrl:{type:String,default:""},fallbackImageUrls:{type:Array,default:()=>[]},hotspots:{type:Array,default:()=>[]},selectedHotspotId:{type:String,default:""},initialView:{type:Object,default:()=>({lon:0,lat:0,fov:75})},hotspotDisplayMode:{type:String,default:"builder"},pointHotspotLogo:{type:String,default:""},autoRotate:{type:Boolean,default:!1},autoRotateDelay:{type:Number,default:2500},autoRotateSpeed:{type:Number,default:2.5}},emits:["panorama-click","hotspot-click","hotspot-dblclick","view-change"],setup(t,{expose:e,emit:n}){const i=t,r=n,s=Me(null),o=Me([]),a=Me([]),l=Me(!1),u=Me(""),c=st(()=>!!i.imageUrl);let f,d,p,_,y,g,h,M=0,C,b,I,w,B=!1,v=null,S=0,F=0,D=null,H=0,ee=0,X=75;function J(Y,be,N){return Math.min(N,Math.max(be,Y))}function le(Y){return J(Number(Y||0),iR,rR)}function L(){r("view-change",{lon:Math.round(H*10)/10,lat:Math.round(ee*10)/10,fov:Math.round(X)})}function $(){S=performance.now()}function ge(Y){return Y<.5?4*Y*Y*Y:1-Math.pow(-2*Y+2,3)/2}function Ue(Y,be){return((be-Y)%360+540)%360-180}function Pe(Y,be,N=500){const Ie=$r.degToRad(90-Number(be||0)),we=$r.degToRad(Number(Y||0));return new he(N*Math.sin(Ie)*Math.cos(we),N*Math.cos(Ie),N*Math.sin(Ie)*Math.sin(we))}function ke(Y){const be=Y.clone().normalize(),N=$r.radToDeg(Math.atan2(be.z,be.x)),Ie=$r.radToDeg(Math.asin(be.y));return{lon:Math.round(N*10)/10,lat:Math.round(Ie*10)/10}}function Le(Y){if(!Y)return"";const be=String(Y).trim(),Ie=[/youtube\.com\/watch\?v=([^&]+)/i,/youtu\.be\/([^?&]+)/i,/youtube\.com\/embed\/([^?&/]+)/i,/youtube\.com\/shorts\/([^?&/]+)/i].map(U=>be.match(U)).find(Boolean);if(!Ie?.[1])return"";const we=new URLSearchParams({controls:"0",disablekb:"1",fs:"0",modestbranding:"1",playsinline:"1",rel:"0"});return`https://www.youtube.com/embed/${Ie[1]}?${we.toString()}`}function De(Y){return!!(Le(Y.info?.youtube_url)||Y.info?.video_url)}function ye(){if(!s.value||!p||l.value){o.value=[],a.value=[];return}const Y=s.value.clientWidth||1,be=s.value.clientHeight||1,N=new he;p.getWorldDirection(N);function Ie(we){const U=Pe(we.lon,we.lat),x=U.clone().normalize(),q=N.dot(x)>0,ne=U.clone().project(p);return{visible:q&&ne.z>-1&&ne.z<1&&ne.x>=-1.2&&ne.x<=1.2&&ne.y>=-1.2&&ne.y<=1.2,screenX:(ne.x*.5+.5)*Y,screenY:(-ne.y*.5+.5)*be}}o.value=i.hotspots.filter(we=>we.type!=="info_area").map((we,U)=>{const x=Ie(we);return{...we,index:U,...x}}).filter(we=>we.visible),a.value=i.hotspots.filter(we=>we.type==="info_area"&&Array.isArray(we.area_points)).map((we,U)=>{const x=we.area_points.map(Ie),q=x.filter(K=>K.visible),ne=we.isDraft?2:3,de=x.length>0&&q.length===x.length,Ne=x.map(K=>K.screenX),Ve=x.map(K=>K.screenY),_e=Math.min(...Ne);Math.max(...Ne);const xe=Math.min(...Ve);Math.max(...Ve);const Be=Math.max(...Ne)-Math.min(...Ne),Ge=Math.max(...Ve)-Math.min(...Ve),ze=Be>Y*.72||Ge>be*.72,He=we.isDraft&&x.length>=ne&&q.length>=ne,nt=!we.isDraft&&x.length>=ne&&de&&!ze,rt=we.isDraft?q:x,ot=rt.map(K=>{const V=Be?(K.screenX-_e)/Be*100:0,z=Ge?(K.screenY-xe)/Ge*100:0;return`${Math.min(100,Math.max(0,V)).toFixed(2)}% ${Math.min(100,Math.max(0,z)).toFixed(2)}%`});return{...we,index:U,visible:He||nt,polygonPoints:rt.map(K=>`${K.screenX},${K.screenY}`).join(" "),mediaClipPath:ot.length>=3?`polygon(${ot.join(", ")})`:"",box:{left:_e,top:xe,width:Be,height:Ge},mediaBox:{left:_e,top:xe,width:Be,height:Ge},youtube_embed_url:Le(we.info?.youtube_url)}}).filter(we=>we.visible)}function ie(){ee=le(ee);const Y=$r.degToRad(90-ee),be=$r.degToRad(H),N=new he(500*Math.sin(Y)*Math.cos(be),500*Math.cos(Y),500*Math.sin(Y)*Math.sin(be));p.lookAt(N),p.fov=X,p.updateProjectionMatrix()}function W(){const Y=performance.now(),be=F?(Y-F)/1e3:0;if(F=Y,D){const N=Math.min((Y-D.startedAt)/D.duration,1),Ie=ge(N);H=D.from.lon+D.lonDelta*Ie,ee=D.from.lat+(D.to.lat-D.from.lat)*Ie,X=D.from.fov+(D.to.fov-D.from.fov)*Ie,L(),N>=1&&(H=D.to.lon,ee=D.to.lat,X=D.to.fov,D.resolve(),D=null)}i.autoRotate&&c.value&&!B&&!D&&Y-S>=i.autoRotateDelay&&(H+=i.autoRotateSpeed*be,L()),ie(),ye(),R(),f.render(d,p),C=requestAnimationFrame(W)}function ae(Y={},be=520){return $(),D?.resolve?.(),new Promise(N=>{const Ie=Number(Y.lon??H),we=le(Y.lat??ee),U=J(Number(Y.fov??X),35,100);D={startedAt:performance.now(),duration:be,from:{lon:H,lat:ee,fov:X},to:{lon:Ie,lat:we,fov:U},lonDelta:Ue(H,Ie),resolve:N}})}function ve(){if(!s.value||!f||!p)return;const Y=s.value.clientWidth||1,be=s.value.clientHeight||1;p.aspect=Y/be,p.updateProjectionMatrix(),f.setSize(Y,be),ye()}function Te(){y&&(y.dispose(),y=null)}function Fe(){g&&(d?.remove(g),g.geometry.dispose(),g.material.dispose(),g=null),h&&(h.dispose(),h=null)}function T(Y){if(!Y||!d)return;Fe();const be=new Xa(499,64,40);be.scale(-1,1,1);const N=new $a({map:Y,transparent:!0,opacity:1,depthWrite:!1});g=new Kn(be,N),g.renderOrder=2,h=Y,M=performance.now(),d.add(g)}function R(){if(!g)return;const Y=Math.min((performance.now()-M)/nR,1),be=1-Math.pow(1-Y,3);g.material.opacity=1-be,Y>=1&&Fe()}function k(){return[i.imageUrl,...i.fallbackImageUrls].filter(Boolean).filter((Y,be,N)=>N.indexOf(Y)===be)}function re(Y=0){if(!_)return;l.value=!0,o.value=[],a.value=[],u.value="";const be=k(),N=be[Y];if(!N){Te(),Fe(),_.material.map=null,_.material.color.set(1120295),_.material.needsUpdate=!0,l.value=!1,u.value=i.imageUrl?"Could not load panorama image.":"";return}const Ie=new WM;Ie.setCrossOrigin("anonymous"),Ie.load(N,we=>{const U=y;y=we,y.colorSpace=wn,_.material.map=y,_.material.color.set(16777215),_.material.needsUpdate=!0,U&&T(U),l.value=!1,ve()},void 0,we=>{if(Y+1<be.length){re(Y+1);return}console.warn("Panorama texture could not be loaded.",N,we),_.material.map=null,_.material.color.set(1120295),_.material.needsUpdate=!0,l.value=!1,u.value="Could not load panorama image."})}function Q(){if(!s.value)return;d=new MM,p=new In(X,1,1,1100),I=new qM,w=new Et;const Y=new Xa(500,64,40);Y.scale(-1,1,1);const be=new $a({color:1120295});_=new Kn(Y,be),d.add(_),f=new G1({antialias:!0,alpha:!1}),f.setClearColor(1120295,1),f.setPixelRatio(window.devicePixelRatio||1),f.domElement.className="panorama-canvas",s.value.appendChild(f.domElement),ve(),re(),$(),W()}function ue(Y){c.value&&($(),B=!0,v={x:Y.clientX,y:Y.clientY,lon:H,lat:ee})}function Ae(Y){!B||!v||($(),H=v.lon-(Y.clientX-v.x)*.12,ee=le(v.lat+(Y.clientY-v.y)*.12),L())}function Ee(Y){if(!B||!v)return;$();const be=Math.hypot(Y.clientX-v.x,Y.clientY-v.y);if(B=!1,v=null,be<5&&c.value){const N=s.value?.getBoundingClientRect();if(!N||!I||!w||!_)return;w.x=(Y.clientX-N.left)/N.width*2-1,w.y=-((Y.clientY-N.top)/N.height)*2+1,I.setFromCamera(w,p);const Ie=I.intersectObject(_,!1)[0],we=Ie?ke(Ie.point):{lon:H,lat:ee};r("panorama-click",{x:(Y.offsetX||0)/(s.value?.clientWidth||1)*100,y:(Y.offsetY||0)/(s.value?.clientHeight||1)*100,lon:we.lon,lat:we.lat})}}function Re(Y){c.value&&($(),Y.preventDefault(),X=J(X+Y.deltaY*.04,35,100),L())}return fi(()=>[i.imageUrl,i.fallbackImageUrls],async()=>{await Cs(),re()},{deep:!0}),fi(()=>i.hotspots,()=>ye(),{deep:!0}),fi(()=>i.initialView,Y=>{H=Number(Y?.lon??0),ee=le(Y?.lat??0),X=Number(Y?.fov??75),$(),L()},{deep:!0,immediate:!0}),jn(()=>{Q(),window.addEventListener("resize",ve),s.value&&(b=new ResizeObserver(ve),b.observe(s.value))}),Ps(()=>{window.removeEventListener("resize",ve),b?.disconnect(),cancelAnimationFrame(C),Te(),Fe(),_&&(_.geometry.dispose(),_.material.dispose()),f?.dispose()}),e({animateToView:ae}),(Y,be)=>(j(),Z("div",{ref_key:"container",ref:s,class:$t(["panorama-viewer",{empty:!c.value}]),onPointerdown:ue,onPointermove:Ae,onPointerup:Ee,onPointerleave:Ee,onWheel:Re,onClick:$},[c.value?u.value?(j(),Z("span",$1,oe(u.value),1)):Je("",!0):(j(),Z("span",W1," Upload panorama JPG 360 de xem preview, keo chuot de xoay ngang/doc. ")),a.value.length?(j(),Z("svg",X1,[(j(!0),Z(tt,null,ct(a.value,N=>(j(),Z(tt,{key:N.id},[N.isDraft?(j(),Z("polyline",{key:0,class:"panorama-info-area draft",points:N.polygonPoints},null,8,q1)):(j(),Z("polygon",{key:1,class:"panorama-info-area",points:N.polygonPoints,onClick:_t(Ie=>{$(),r("hotspot-click",N,Ie)},["stop"])},null,8,Y1))],64))),128))])):Je("",!0),(j(!0),Z(tt,null,ct(a.value.filter(De),N=>(j(),Z("div",{key:`${N.id}-media`,class:"panorama-info-area-media",style:Bt({left:`${N.mediaBox.left}px`,top:`${N.mediaBox.top}px`,width:`${N.mediaBox.width}px`,height:`${N.mediaBox.height}px`,clipPath:N.mediaClipPath,WebkitClipPath:N.mediaClipPath}),onClick:_t(Ie=>{$(),r("hotspot-click",N,Ie)},["stop"])},[N.youtube_embed_url?(j(),Z("iframe",{key:0,src:N.youtube_embed_url,title:"YouTube video",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"},null,8,j1)):(j(),Z("video",{key:1,src:N.info.video_url,autoplay:"",muted:"",loop:"",playsinline:"",controls:""},null,8,Z1))],12,K1))),128)),(j(!0),Z(tt,null,ct(o.value,N=>(j(),Z("button",{key:N.id,class:$t(["panorama-hotspot",[t.hotspotDisplayMode==="viewer"?`viewer-hotspot viewer-hotspot-${N.type||"point"}`:"hotspot-dot",{active:N.id===t.selectedHotspotId}]]),style:Bt({left:`${N.screenX}px`,top:`${N.screenY}px`}),type:"button",onClick:_t(Ie=>{$(),r("hotspot-click",N,Ie)},["stop"]),onDblclick:_t(Ie=>{$(),r("hotspot-dblclick",N,Ie)},["stop"])},[t.hotspotDisplayMode==="viewer"&&N.type==="nav"?(j(),Z(tt,{key:0},[be[0]||(be[0]=m("span",{class:"viewer-nav-arrow"},[m("i",{class:"ti-angle-double-up","aria-hidden":"true"})],-1)),N.preview_image?(j(),Z("span",{key:0,class:"viewer-hotspot-preview",style:Bt({backgroundImage:`url(${N.preview_image})`})},null,4)):Je("",!0)],64)):(j(),Z(tt,{key:1},[t.hotspotDisplayMode==="viewer"&&t.pointHotspotLogo&&N.type!=="info"?(j(),Z("span",{key:0,class:"viewer-point-logo",style:Bt({backgroundImage:`url(${t.pointHotspotLogo})`})},null,4)):t.hotspotDisplayMode==="viewer"&&N.type==="info"?(j(),Z("span",Q1,"i")):(j(),Z("span",eR,oe(N.index+1),1)),m("span",tR,oe(N.label||"Hotspot"),1),t.hotspotDisplayMode==="viewer"&&N.preview_image?(j(),Z("span",{key:3,class:"viewer-hotspot-preview",style:Bt({backgroundImage:`url(${N.preview_image})`})},null,4)):Je("",!0)],64))],46,J1))),128))],34))}};function ar(t,e={}){return dt.get(`/api/projects/${t}/locations/`,{params:e})}function wf(t,e){return dt.post(`/api/projects/${t}/locations/`,e)}function Ig(t,e){return dt.patch(`/api/locations/${t}/`,e)}function Ng(t){return dt.delete(`/api/locations/${t}/`)}function Uc(t,e){const n=new FormData;return n.append("thumbnail",e),dt.post(`/api/locations/${t}/upload-thumbnail/`,n,{headers:{"Content-Type":"multipart/form-data"}})}function sR({tourVersion:t,sceneKey:e,originalFile:n}){const i=new FormData;return i.append("tour_version",t),i.append("scene_key",e),i.append("original_file",n),dt.post("/api/media/scenes/upload/",i,{headers:{"Content-Type":"multipart/form-data"}})}function oR(t){return dt.delete(`/api/media/scenes/${t}/`)}function Nr(t={}){return dt.get("/api/projects/",{params:t})}function Ug(t){return dt.post("/api/projects/",t)}function aR(t,e){return dt.patch(`/api/projects/${t}/`,e)}function lR(t){return dt.delete(`/api/projects/${t}/`)}function Ts(t,e={}){return dt.get(`/api/locations/${t}/versions/`,{params:e})}function qh(t){return t instanceof File||t instanceof Blob}function Og(t){const e=qh(t?.background_audio_file),n=qh(t?.hotspot_point_logo_file);if(!e&&!n)return t;const i=new FormData;return t.label!==void 0&&i.append("label",t.label),t.changelog!==void 0&&i.append("changelog",t.changelog),t.data!==void 0&&i.append("data",JSON.stringify(t.data)),t.source_version_id!==void 0&&t.source_version_id!==""&&i.append("source_version_id",t.source_version_id),t.thumbnail&&i.append("thumbnail",t.thumbnail),e&&i.append("background_audio",t.background_audio_file),n&&i.append("hotspot_point_logo",t.hotspot_point_logo_file),i}function qa(t,e){return dt.post(`/api/locations/${t}/versions/`,Og(e))}function Oc(t,e){return dt.get(`/api/locations/${t}/versions/${e}/`)}function Fc(t,e,n){return dt.patch(`/api/locations/${t}/versions/${e}/`,Og(n))}function uR(t,e,{hotspotId:n,audioFile:i}){const r=new FormData;return r.append("hotspot_id",n),r.append("audio",i),dt.post(`/api/locations/${t}/versions/${e}/hotspot-audio/`,r)}function cR(t,e,{hotspotId:n,imageFile:i}){const r=new FormData;return r.append("hotspot_id",n),r.append("image",i),dt.post(`/api/locations/${t}/versions/${e}/hotspot-info-image/`,r)}function fR(t,e,{hotspotId:n,videoFile:i}){const r=new FormData;return r.append("hotspot_id",n),r.append("video",i),dt.post(`/api/locations/${t}/versions/${e}/hotspot-info-video/`,r)}function Fg(t,e){return dt.delete(`/api/locations/${t}/versions/${e}/`)}function dR(t,e){return dt.get(`/api/locations/${t}/versions/${e}/preview/`)}function hR(t,e){return dt.get(`/api/locations/${t}/versions/${e}/export/`)}const pR={class:"builder-page"},mR={class:"builder-topbar"},gR={class:"builder-top-actions"},_R=["value"],vR=["value"],xR=["value"],bR={class:"builder-right-actions"},yR={key:0,class:"builder-alert error"},SR={key:1,class:"builder-alert success"},MR={class:"builder-shell"},ER={class:"panel-title-row"},wR=["onDragstart","onDragover","onDrop","onClick","onKeydown"],TR={class:"scene-index"},AR={class:"scene-copy"},RR=["onClick"],CR={class:"builder-canvas-panel"},PR={class:"builder-canvas"},LR={class:"viewer-help"},DR={class:"view-meter"},IR={class:"builder-right"},NR={class:"inspector-image-row"},UR={class:"form"},OR={class:"actions-row"},FR={class:"inspector-section"},BR={class:"three-inputs"},kR=["value"],VR=["value"],HR=["value"],zR={class:"inspector-section"},GR={class:"panel-title-row"},WR={key:0,class:"info-area-toolbar"},$R=["disabled"],XR=["disabled"],qR={key:1,class:"hotspot-list"},YR=["onClick","onKeydown"],KR={class:"hotspot-number"},jR=["onClick"],ZR={key:2,class:"builder-muted"},JR={key:0,class:"form hotspot-form"},QR={key:0},eC=["value","disabled"],tC={key:1,class:"info-hotspot-fields"},nC={class:"info-editor-head"},iC={class:"info-image-uploader"},rC={key:0},sC={class:"info-image-actions"},oC={class:"info-upload-button"},aC={class:"info-media-uploader"},lC={class:"info-media-card"},uC={class:"info-upload-button"},cC={class:"info-media-card"},fC={class:"checkbox-row info-glow-row"},dC={class:"two-inputs"},hC={class:"two-inputs"},pC={class:"builder-muted"},mC={key:1,class:"empty-inspector"},gC={class:"builder-modal"},_C={class:"panel-title-row"},vC=["value"],xC={class:"builder-modal"},bC={class:"panel-title-row"},yC={class:"builder-modal builder-modal-small"},SC={class:"panel-title-row"},MC={class:"form"},EC={class:"quick-step"},wC={class:"panel-title-row"},TC={key:1},AC=["value"],RC={class:"quick-step"},CC={class:"panel-title-row"},PC=["disabled"],LC={class:"thumbnail-edit-block"},DC={class:"thumbnail-edit-grid"},IC={key:0},NC={class:"thumbnail-upload-button"},UC={class:"two-inputs"},OC={key:1},FC=["disabled"],BC=["value"],kC={class:"quick-step"},VC={class:"panel-title-row"},HC={key:0},zC=["disabled"],GC=["value"],WC={key:1},$C={key:0},XC=["disabled"],qC=["value"],YC={key:1,class:"builder-muted"},KC={key:3,class:"builder-muted"},jC={class:"actions-row"},ZC={__name:"BuilderView",setup(t){const e=Ls(),n=tf(),i=Me([]),r=Me([]),s=Me([]),o=Me(""),a=Me(""),l=Me(""),u=Me(null),c=Me([]),f=Me(""),d=Me(""),p=Me(""),_=Me("");let y=null;const g=Me(!1),h=Me(!1),M=Me(""),C=Me(""),b=Me(!1),I=Me(!1),w=Me(!1),B=Me(!1),v=Me(!1),S=Me([]),F=Me(null),D=Me([]),H=Me([]),ee=Zt({id:"",name:"",group:"Default",description:"",image_url:""}),X=Zt({id:"",label:"",type:"nav",target_scene_id:"",x:50,y:50,lon:0,lat:0,audio_url:"",info_title:"",info_description:"",info_image_url:"",info_video_url:"",info_youtube_url:"",glow:!0}),J=Zt({lon:0,lat:0,fov:75}),le=Me(""),L=Zt({project_id:"",location_id:"",version_id:"",source_version_id:"",create_project:!1,create_location:!1,create_version:!0,project_name:"",project_description:"",location_name:"",location_description:"",location_thumbnail_file:null,location_thumbnail_preview:"",latitude:"",longitude:"",version_label:"",background_audio_file:null,hotspot_point_logo_file:null}),$=st(()=>c.value.find(A=>A.id===f.value)||null),ge=st(()=>$.value&&($.value.hotspots||[]).find(A=>A.id===d.value)||null),Ue=st(()=>!$.value||!d.value?-1:($.value.hotspots||[]).findIndex(A=>A.id===d.value)),Pe=st(()=>$.value?.view||{lon:0,lat:0,fov:75}),ke=st(()=>c.value.map((A,E)=>({id:A.id,name:A.name||A.id,index:E+1,isCurrent:A.id===$.value?.id,hasImage:!!R(A)}))),Le=st(()=>{const A=$.value?.hotspots||[];return!v.value||!S.value.length?A:[...A,{id:"__draft_info_area__",label:"Draft info area",type:"info_area",area_points:S.value,info:{title:"Draft info area",description:"",image_url:""},isDraft:!0}]}),De=st(()=>({...u.value?.data||{},title:u.value?.label||u.value?.data?.title||"VR360 Tour",scenes:c.value.map(A=>{const{preview_url:E,preview_object_url:O,local_file:pe,...Ce}=A;return{...Ce,hotspots:(Ce.hotspots||[]).map(gt=>{const{local_audio_file:yt,local_info_image_file:xt,local_info_image_preview:qt,local_info_video_file:je,local_info_video_preview:It,...pt}=gt;return pt})}})})),ye=st(()=>JSON.stringify(De.value,null,2)),ie=st(()=>R($.value));function W(A){return Array.isArray(A)?A:Array.isArray(A?.results)?A.results:Array.isArray(A?.data)?A.data:Array.isArray(A?.items)?A.items:[]}function ae(A,E){const O=A.response?.data;if(!O)return A.message||E;if(typeof O=="string")return O.slice(0,240)||E;if(O.detail)return O.detail;if(O.non_field_errors?.length)return O.non_field_errors[0];const pe=Object.keys(O)[0],Ce=pe?O[pe]:null;return Array.isArray(Ce)?`${pe}: ${Ce[0]}`:typeof Ce=="string"?`${pe}: ${Ce}`:E}function ve(){if(clearTimeout(y),!p.value&&!_.value)return;const A=p.value,E=_.value;y=setTimeout(()=>{p.value===A&&(p.value=""),_.value===E&&(_.value="")},2e3)}function Te(A){return`${A}-${Date.now()}-${Math.random().toString(16).slice(2,7)}`}function Fe(A){return A.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,48)}function T(A){return A?A.startsWith("blob:")||A.startsWith("data:")||A.startsWith("http")?A:`${Lo}${A.startsWith("/")?A:`/${A}`}`:""}function R(A){return A?T(A.optimized_file||A.original_file||A.image_url||A.preview_url||A.preview_file||A.thumbnail||""):""}function k(A,E=0){const O=String(A.id||A.key||A.scene_key||Te("scene")),pe=A.optimized_file||A.original_file||A.image_url||A.url||A.preview_url||A.preview_file||A.panorama||"";return{id:O,name:A.name||A.title||`Scene ${E+1}`,group:A.group||A.category||"Default",description:A.description||A.desc||"",image_url:pe,preview_url:A.preview_url||"",preview_object_url:A.preview_object_url||"",local_file:A.local_file||null,image_file_name:A.image_file_name||"",optimized_file:A.optimized_file||"",preview_file:A.preview_file||"",original_file:A.original_file||"",thumbnail:A.thumbnail||A.thumbnail_file||A.preview_file||"",thumbnail_file:A.thumbnail_file||"",scene_asset_id:A.scene_asset_id||A.asset_id||"",processing_status:A.processing_status||"",view:{lon:Number(A.view?.lon??A.lon??0),lat:Number(A.view?.lat??A.lat??0),fov:Number(A.view?.fov??A.fov??75)},hotspots:(A.hotspots||[]).map((Ce,gt)=>({id:String(Ce.id||Te("hotspot")),label:Ce.label||Ce.title||`Hotspot ${gt+1}`,type:["nav","point","info","info_area"].includes(Ce.type||Ce.action)?Ce.type||Ce.action:(Ce.type||Ce.action)==="navigate"?"nav":"point",target_scene_id:String(Ce.target_scene_id||Ce.target||Ce.scene_id||""),x:Math.round(Number(Ce.x??50)),y:Math.round(Number(Ce.y??50)),lon:Number(Ce.lon??0),lat:Number(Ce.lat??0),audio_url:Ce.audio_url||Ce.audio||"",local_audio_file:Ce.local_audio_file||null,local_info_image_file:Ce.local_info_image_file||null,local_info_image_preview:Ce.local_info_image_preview||"",local_info_video_file:Ce.local_info_video_file||null,local_info_video_preview:Ce.local_info_video_preview||"",area_points:Array.isArray(Ce.area_points)?Ce.area_points.map(yt=>({lon:Number(yt.lon??0),lat:Number(yt.lat??0),x:Math.round(Number(yt.x??50)),y:Math.round(Number(yt.y??50))})):[],info:{title:Ce.info?.title||Ce.info_title||Ce.type==="info"&&(Ce.title||Ce.label)||"",description:Ce.info?.description||Ce.info_description||Ce.description||"",image_url:Ce.info?.image_url||Ce.info_image_url||Ce.image_url||"",video_url:Ce.info?.video_url||Ce.info_video_url||Ce.video_url||"",youtube_url:Ce.info?.youtube_url||Ce.info_youtube_url||Ce.youtube_url||""},glow:Ce.glow??Ce.style?.glow??!0}))}}function re(A){const E=A?.TOUR_DATA||A?.tour_data||A?.data||A||{},O=E.scenes||E.SCENES||[];return Array.isArray(O)?O.map(k):[]}function Q(A="VR360 Tour"){return{title:A,scenes:[]}}async function ue(){try{const A=await Nr();i.value=W(A.data);const E=Number(n.query.project||0);E&&i.value.some(O=>O.id===E)&&(o.value=E),!o.value&&i.value.length&&(o.value=i.value[0].id)}catch(A){p.value=A.response?.data?.detail||"Could not load project list."}}async function Ae(){if(!o.value)return;const A=await ar(o.value);r.value=W(A.data);const E=Number(n.query.location||0);E&&r.value.some(O=>O.id===E)&&(a.value=E),!a.value&&r.value.length&&(a.value=r.value[0].id)}async function Ee(){if(!a.value)return;const A=await Ts(a.value);s.value=W(A.data);const E=Number(n.query.version||0);if(E&&s.value.some(pe=>pe.id===E)){l.value=E;return}const O=s.value.find(pe=>pe.status==="draft");l.value=O?.id||s.value[0]?.id||""}async function Re(){if(!a.value||!l.value)return;p.value="";const A=await Oc(a.value,l.value);u.value=A.data,c.value=re(A.data.data),f.value=c.value[0]?.id||"",d.value="",N(),U(null)}async function Y(){a.value="",l.value="",u.value=null,r.value=[],s.value=[],await Ae(),await Ee(),await Re()}async function be(){l.value="",u.value=null,s.value=[],await Ee(),await Re()}function N(){ee.id=$.value?.id||"",ee.name=$.value?.name||"",ee.group=$.value?.group||"Default",ee.description=$.value?.description||"",ee.image_url=$.value?.image_url||$.value?.original_file||""}function Ie(){$.value&&($.value.name=ee.name.trim()||$.value.image_file_name||$.value.id)}function we(){$.value&&($.value.group=ee.group.trim()||"Default")}function U(A){X.id=A?.id||"",X.label=A?.label||"",X.type=A?.type||"nav",X.target_scene_id=A?.target_scene_id||"",X.x=Math.round(Number(A?.x??50)),X.y=Math.round(Number(A?.y??50)),X.lon=Math.round(Number(A?.lon??0)*10)/10,X.lat=Math.round(Number(A?.lat??0)*10)/10,X.audio_url=A?.audio_url||"",X.info_title=A?.info?.title||"",X.info_description=A?.info?.description||"",X.info_image_url=A?.info?.image_url||"",X.info_video_url=A?.info?.video_url||"",X.info_youtube_url=A?.info?.youtube_url||"",X.glow=A?.glow??!0}function x(A){f.value=A,d.value="",B.value=!1,v.value=!1,S.value=[],N(),U(null)}function q(){$.value&&(B.value=!0,v.value=!1,S.value=[],d.value="",U(null))}function ne(){$.value&&(v.value=!0,B.value=!1,d.value="",S.value=[],U(null),_.value="Click multiple points on the panorama, then Finish area.")}function de(){const A=Te("scene");c.value.push(k({id:A,name:`Scene ${c.value.length+1}`},c.value.length)),x(A)}function Ne(A){const E=`img_${Fe(A.name.replace(/\.[^.]+$/,""))||Date.now()}`,O=c.value.some(Ce=>Ce.id===E)?Te(E):E,pe=URL.createObjectURL(A);return k({id:O,name:A.name.replace(/\.[^.]+$/,""),image_url:"",preview_url:pe,preview_object_url:pe,local_file:A,image_file_name:A.name},c.value.length)}async function Ve(A,E){if(!l.value)return!1;try{A.scene_asset_id&&(await oR(A.scene_asset_id),A.scene_asset_id="",A.optimized_file="",A.preview_file="",A.original_file="",A.thumbnail_file="",A.processing_status="");const O=await sR({tourVersion:l.value,sceneKey:A.id,originalFile:E}),pe=O.data.asset||O.data;return A.scene_asset_id=pe.id,A.optimized_file=pe.optimized_file||"",A.preview_file=pe.preview_file||"",A.original_file=pe.original_file,A.thumbnail_file=pe.thumbnail_file||"",A.image_url=pe.optimized_file||pe.original_file||pe.preview_file||A.image_url||"",A.preview_url=pe.preview_file||A.preview_url||"",A.thumbnail=pe.thumbnail_file||pe.preview_file||A.thumbnail||"",A.processing_status=pe.processing_status,A.local_file=null,!0}catch(O){const pe=O.response?.data?.asset;return pe?(A.scene_asset_id=pe.id,A.optimized_file=pe.optimized_file||"",A.preview_file=pe.preview_file||"",A.original_file=pe.original_file,A.thumbnail_file=pe.thumbnail_file||"",A.image_url=pe.optimized_file||pe.original_file||pe.preview_file||A.image_url||"",A.preview_url=pe.preview_file||A.preview_url||"",A.thumbnail=pe.thumbnail_file||pe.preview_file||A.thumbnail||"",A.processing_status=pe.processing_status,A.local_file=null,p.value=O.response?.data?.detail||"Image was saved, but backend returned a processing warning.",!0):(p.value=O.response?.data?.detail||"Image is previewed locally, but backend upload is not finished. Click Save Tour and upload again.",!1)}}async function _e(){if(!l.value)return 0;let A=0;for(const E of c.value)E.local_file&&await Ve(E,E.local_file)&&(A+=1);return A}async function xe(A){if(!a.value||!l.value||!A.local_audio_file)return!1;const E=await uR(a.value,l.value,{hotspotId:A.id,audioFile:A.local_audio_file});return A.audio_url=E.data.audio_url||E.data.audio_path||"",A.local_audio_file=null,!0}async function Be(){if(!l.value)return 0;let A=0;for(const E of c.value)for(const O of E.hotspots||[])O.local_audio_file&&await xe(O)&&(A+=1);return A}async function Ge(A){if(!a.value||!l.value||!A.local_info_image_file)return!1;const E=await cR(a.value,l.value,{hotspotId:A.id,imageFile:A.local_info_image_file});return A.info={...A.info||{},image_url:E.data.image_url||E.data.image_path||""},A.local_info_image_preview&&URL.revokeObjectURL(A.local_info_image_preview),A.local_info_image_file=null,A.local_info_image_preview="",X.info_image_url=A.info.image_url,!0}async function ze(){if(!l.value)return 0;let A=0;for(const E of c.value)for(const O of E.hotspots||[])O.local_info_image_file&&await Ge(O)&&(A+=1);return A}async function He(A){if(!a.value||!l.value||!A.local_info_video_file)return!1;const E=await fR(a.value,l.value,{hotspotId:A.id,videoFile:A.local_info_video_file});return A.info={...A.info||{},video_url:E.data.video_url||E.data.video_path||""},A.local_info_video_preview&&URL.revokeObjectURL(A.local_info_video_preview),A.local_info_video_file=null,A.local_info_video_preview="",X.info_video_url=A.info.video_url,!0}async function nt(){if(!l.value)return 0;let A=0;for(const E of c.value)for(const O of E.hotspots||[])O.local_info_video_file&&await He(O)&&(A+=1);return A}async function rt(A){const E=Array.from(A||[]).filter(O=>O.type.startsWith("image/"));if(E.length){g.value=!0,p.value="",_.value="";for(const O of E){const pe=Ne(O);c.value.push(pe),f.value=pe.id,N()}g.value=!1,_.value=`Added ${E.length} image(s) to tour. Click Save Tour to save images to backend.`}}function ot(){F.value?.click()}function K(A){rt(A.target.files),A.target.value=""}function V(A){h.value=!1,rt(A.dataTransfer?.files)}function z(){if(!$.value)return;const A=$.value.id,E=ee.id.trim()||A;$.value.id=E,$.value.name=ee.name.trim()||$.value.name,$.value.group=ee.group.trim()||"Default",$.value.description=ee.description.trim(),$.value.image_url=ee.image_url.trim(),c.value.forEach(O=>{O.hotspots=(O.hotspots||[]).map(pe=>({...pe,target_scene_id:pe.target_scene_id===A?E:pe.target_scene_id}))}),f.value=E,_.value="Đã lưu thuộc tính scene."}function G(A){if(!window.confirm("Delete scene này?"))return;const E=c.value.find(O=>O.id===A);E?.preview_object_url&&URL.revokeObjectURL(E.preview_object_url),c.value=c.value.filter(O=>O.id!==A),c.value.forEach(O=>{O.hotspots=(O.hotspots||[]).filter(pe=>pe.target_scene_id!==A)}),f.value=c.value[0]?.id||"",d.value="",N(),U(null)}function Oe(A,E){M.value=E,C.value=E,A.dataTransfer.effectAllowed="move",A.dataTransfer.setData("text/plain",E)}function Se(A,E){A.preventDefault(),!(!M.value||M.value===E)&&(C.value=E)}function Qe(A,E){A.preventDefault();const O=M.value||A.dataTransfer.getData("text/plain");if(!O||O===E){Ye();return}const pe=[...c.value],Ce=pe.findIndex(xt=>xt.id===O),gt=pe.findIndex(xt=>xt.id===E);if(Ce<0||gt<0){Ye();return}const[yt]=pe.splice(Ce,1);pe.splice(gt,0,yt),c.value=pe,f.value=yt.id,Ye()}function Ye(){M.value="",C.value=""}function Ft(A){if(!$.value)return;if(v.value){S.value=[...S.value,{x:Math.round(A.x),y:Math.round(A.y),lon:Math.round(Number(A.lon??J.lon)*10)/10,lat:Math.round(Number(A.lat??J.lat)*10)/10}];return}if(!B.value)return;const E={id:Te("hotspot"),label:`Hotspot ${($.value.hotspots||[]).length+1}`,type:"nav",target_scene_id:Bs(),x:Math.round(A.x),y:Math.round(A.y),lon:Math.round(Number(A.lon??J.lon)*10)/10,lat:Math.round(Number(A.lat??J.lat)*10)/10,audio_url:"",local_audio_file:null,local_info_image_file:null,local_info_image_preview:"",local_info_video_file:null,local_info_video_preview:"",area_points:[],info:{title:"",description:"",image_url:"",video_url:"",youtube_url:""},glow:!0};$.value.hotspots=[...$.value.hotspots||[],E],d.value=E.id,B.value=!1,U(E)}function Pt(){if(!$.value||S.value.length<3){p.value="Info area needs at least 3 points.";return}const A=[...S.value],E=A.reduce((Ce,gt)=>({x:Ce.x+Number(gt.x||0),y:Ce.y+Number(gt.y||0),lon:Ce.lon+Number(gt.lon||0),lat:Ce.lat+Number(gt.lat||0)}),{x:0,y:0,lon:0,lat:0}),O=A.length||1,pe={id:Te("info-area"),label:`Info area ${($.value.hotspots||[]).length+1}`,type:"info_area",target_scene_id:"",x:Math.round(E.x/O),y:Math.round(E.y/O),lon:Math.round(E.lon/O*10)/10,lat:Math.round(E.lat/O*10)/10,audio_url:"",local_audio_file:null,local_info_image_file:null,local_info_image_preview:"",local_info_video_file:null,local_info_video_preview:"",area_points:A,info:{title:"",description:"",image_url:"",video_url:"",youtube_url:""},glow:!0};$.value.hotspots=[...$.value.hotspots||[],pe],d.value=pe.id,v.value=!1,S.value=[],U(pe),_.value="Created info area. Add title, image and description."}function Cn(){S.value=S.value.slice(0,-1)}function Pn(){v.value=!1,S.value=[]}function ur(A){d.value=A.id,U(A)}function xl(A){if(!A)return;ur(A);const E=A.target_scene_id;if(!E){p.value="Hotspot nay chua co target scene.";return}const O=c.value.find(pe=>String(pe.id)===String(E));if(!O){p.value="Khong tim thay scene duoc lien ket.";return}x(O.id),_.value=`Da chuyen den scene: ${O.name||O.id}.`}function Bs(){if(!$.value)return"";const A=c.value.findIndex(O=>O.id===$.value.id);return c.value.find((O,pe)=>pe>A&&O.id!==$.value.id)?.id||c.value.find(O=>O.id!==$.value.id)?.id||""}function ks(){const A=ge.value;A&&(A.label=X.label.trim()||A.label,A.type=X.type,A.target_scene_id=["info","info_area"].includes(X.type)?"":X.target_scene_id||Bs(),A.x=Number(X.x),A.y=Number(X.y),A.lon=Number(X.lon),A.lat=Number(X.lat),A.audio_url=X.audio_url.trim(),A.info={title:X.info_title.trim(),description:X.info_description.trim(),image_url:A.local_info_image_preview||X.info_image_url.trim()||A.info?.image_url||"",video_url:A.local_info_video_preview||X.info_video_url.trim()||A.info?.video_url||"",youtube_url:X.info_youtube_url.trim()},A.glow=!!X.glow,X.target_scene_id=A.target_scene_id,_.value="Da luu hotspot.")}function bl(A){const E=A.target.files?.[0]||null,O=ge.value;!O||!E||(O.local_audio_file=E,O.audio_url="",X.audio_url="",_.value="Đã chọn audio cho hotspot. Bấm Save Tour để upload.")}function No(A){const E=A.target.files?.[0]||null,O=ge.value;if(!(!O||!E)){if(!E.type.startsWith("image/")){p.value="Only image files are allowed.",A.target.value="";return}O.local_info_image_preview&&URL.revokeObjectURL(O.local_info_image_preview),O.local_info_image_file=E,O.local_info_image_preview=URL.createObjectURL(E),O.info={...O.info||{},image_url:O.local_info_image_preview},X.info_image_url="",_.value="Selected info image. Click Save Tour to upload it.",A.target.value=""}}function Uo(A){const E=A.target.files?.[0]||null,O=ge.value;if(!(!O||!E)){if(!E.type.startsWith("video/")){p.value="Only video files are allowed.",A.target.value="";return}O.local_info_video_preview&&URL.revokeObjectURL(O.local_info_video_preview),O.local_info_video_file=E,O.local_info_video_preview=URL.createObjectURL(E),O.info={...O.info||{},video_url:O.local_info_video_preview},X.info_video_url="",_.value="Selected info video. Click Save Tour to upload it.",A.target.value=""}}function Jn(){!$.value||!d.value||($.value.hotspots=($.value.hotspots||[]).filter(A=>A.id!==d.value),d.value="",U(null))}function Vs(){$.value&&($.value.view={...J},_.value="Đã lưu view mặc định cho scene.")}function Oo(A){J.lon=A.lon,J.lat=A.lat,J.fov=A.fov}function Fo(){const A=new Blob([ye.value],{type:"application/json"}),E=URL.createObjectURL(A),O=document.createElement("a");O.href=E,O.download="vr360-tour.json",O.click(),URL.revokeObjectURL(E)}async function Ur(){await navigator.clipboard.writeText(ye.value),_.value="Đã copy TOUR_DATA."}function Bo(){le.value="",b.value=!0}async function Or(){i.value.length||await ue(),L.project_id=o.value||i.value[0]?.id||"",L.location_id="",L.version_id="",L.source_version_id="",L.create_project=!L.project_id,L.create_location=!1,L.create_version=!0,L.project_name="",L.project_description="",L.location_name="",L.location_description="",P(),L.latitude="",L.longitude="",L.version_label="",L.background_audio_file=null,L.hotspot_point_logo_file=null,D.value=[],H.value=[],L.project_id&&await Fr(),w.value=!0}async function Fr(){if(D.value=[],H.value=[],L.location_id="",L.version_id="",L.source_version_id="",!L.project_id||L.create_project)return;const A=await ar(L.project_id);D.value=W(A.data),L.location_id=a.value||D.value[0]?.id||"",L.location_id&&await Br()}async function Br(){if(H.value=[],L.version_id="",L.source_version_id="",!L.location_id||L.create_location)return;const A=await Ts(L.location_id);H.value=W(A.data);const E=H.value.find(O=>O.status==="draft");L.version_id=l.value||E?.id||H.value[0]?.id||"",L.source_version_id=l.value||H.value[0]?.id||""}function yl(){L.create_project=!0,L.create_location=!0,L.create_version=!0,L.project_id="",L.location_id="",L.version_id="",L.source_version_id="",D.value=[],H.value=[]}function Sl(){L.create_project=!1,L.create_location=!1,L.project_id=o.value||i.value[0]?.id||"",Fr()}function Ml(){L.create_location=!0,L.create_version=!0,L.location_id="",L.version_id="",L.source_version_id="",P(),H.value=[]}function El(){L.create_location=!1,P(),L.location_id=a.value||D.value[0]?.id||"",Br()}function P(){L.location_thumbnail_preview&&URL.revokeObjectURL(L.location_thumbnail_preview),L.location_thumbnail_file=null,L.location_thumbnail_preview=""}function se(A){const E=A.target.files?.[0]||null;L.location_thumbnail_preview&&URL.revokeObjectURL(L.location_thumbnail_preview),L.location_thumbnail_file=E,L.location_thumbnail_preview=E?URL.createObjectURL(E):""}function me(A){L.background_audio_file=A.target.files?.[0]||null}function ce(A){L.hotspot_point_logo_file=A.target.files?.[0]||null}async function fe(){if(L.create_project&&!L.project_name.trim()){p.value="Bạn cần import name project mới.";return}if(!L.create_project&&!L.project_id){p.value="Bạn cần chọn project hoặc tạo project mới.";return}if(L.create_location&&!L.location_name.trim()){p.value="Bạn cần import name location mới.";return}if(!L.create_location&&!L.location_id){p.value="Bạn cần chọn location hoặc tạo location mới.";return}if(!L.create_version&&!L.version_id){p.value="Bạn cần chọn version có sẵn hoặc tạo version mới.";return}p.value="",_.value="";try{let A=i.value.find(pe=>pe.id===L.project_id);L.create_project&&(A=(await Ug({name:L.project_name.trim(),description:L.project_description.trim(),is_active:!0})).data);let E=D.value.find(pe=>pe.id===L.location_id);if(L.create_location){const pe={name:L.location_name.trim(),description:L.location_description.trim(),is_active:!0,order:0};L.latitude!==""&&(pe.latitude=Number(L.latitude)),L.longitude!==""&&(pe.longitude=Number(L.longitude)),E=(await wf(A.id,pe)).data,L.location_thumbnail_file&&(E=(await Uc(E.id,L.location_thumbnail_file)).data)}let O=H.value.find(pe=>pe.id===L.version_id);if(L.create_version){const pe=L.version_label.trim()||`${E.name} draft`,Ce={label:L.version_label.trim()||`${E.name} draft`,changelog:"Created from VR360 Builder.",background_audio_file:L.background_audio_file,hotspot_point_logo_file:L.hotspot_point_logo_file};L.source_version_id&&!L.create_location?Ce.source_version_id=L.source_version_id:Ce.data=Q(pe),O=(await qa(E.id,Ce)).data}else O=(await Oc(E.id,O.id)).data;await ue(),o.value=A.id,await Ae(),a.value=E.id,await Ee(),l.value=O.id,u.value=O,c.value.forEach(pe=>{pe.preview_object_url&&URL.revokeObjectURL(pe.preview_object_url)}),c.value=re(O.data),f.value=c.value[0]?.id||"",d.value="",N(),U(null),w.value=!1,_.value=L.create_version?"Đã tạo/chọn tour và tạo version draft mới.":"Đã mở version có sẵn để chỉnh sửa."}catch(A){p.value=ae(A,"Could not create/select tour.")}}function $e(){try{const A=JSON.parse(le.value);c.value.forEach(E=>{E.preview_object_url&&URL.revokeObjectURL(E.preview_object_url)}),c.value=re(A),u.value=u.value?{...u.value,data:A}:u.value,f.value=c.value[0]?.id||"",d.value="",N(),U(null),b.value=!1,_.value="Đã import JSON."}catch{p.value="JSON none hợp lệ."}}async function Ze(){if(!a.value){p.value="Bạn cần chọn location trước, rồi Save Tour sẽ tự tạo version draft.";return}p.value="",_.value="";try{if(!l.value||!u.value){const It=await qa(a.value,{label:De.value.title||"VR360 Tour draft",changelog:"Created from VR360 Builder.",data:De.value});u.value=It.data,l.value=It.data.id,await Ee(),l.value=It.data.id}const A=c.value.filter(It=>It.local_file).length,E=A>0,O=c.value.some(It=>(It.hotspots||[]).some(pt=>pt.local_audio_file)),pe=c.value.some(It=>(It.hotspots||[]).some(pt=>pt.local_info_image_file)),Ce=c.value.some(It=>(It.hotspots||[]).some(pt=>pt.local_info_video_file));let gt=0,yt=0,xt=0,qt=0;if(E||O||pe||Ce){if(u.value=(await Fc(a.value,l.value,{label:u.value.label,changelog:u.value.changelog,data:De.value})).data,gt=await _e(),gt!==A)throw new Error(p.value||"Some panorama images could not be uploaded. Please try Save Tour again.");yt=await Be(),xt=await ze(),qt=await nt()}const je=await Fc(a.value,l.value,{label:u.value.label,changelog:u.value.changelog,data:De.value});u.value=je.data,_.value=E||O||pe||Ce?`Saved tour and uploaded ${gt} panorama image(s), ${yt} hotspot audio file(s), ${xt} info image(s), ${qt} info video(s).`:"Saved draft tour version successfully."}catch(A){p.value=ae(A,"Could not save builder. Published versions cannot be edited.")}}async function We(){try{await ue(),await Ae(),await Ee(),await Re()}catch(A){p.value=A.response?.data?.detail||"Could not load builder data."}}function et(){if(window.history.length>1){e.back();return}e.push("/dashboard")}return fi([p,_],ve),jn(We),Ps(()=>{clearTimeout(y),P(),c.value.forEach(A=>{A.preview_object_url&&URL.revokeObjectURL(A.preview_object_url)})}),(A,E)=>(j(),Z("section",pR,[m("header",mR,[m("button",{class:"builder-tool-button builder-back-button",type:"button",onClick:et}," < Back "),E[51]||(E[51]=m("div",{class:"builder-brand"},"VR360 Builder",-1)),m("div",gR,[m("button",{class:"builder-tool-button",type:"button",onClick:ot}," + Add image "),m("button",{class:"builder-tool-button",type:"button",onClick:Bo}," Import JSON "),m("button",{class:"builder-tool-button",type:"button",onClick:Re}," Load Tour "),m("button",{class:"builder-save-button",type:"button",onClick:Ze}," Save Tour "),m("button",{class:"builder-quick-button",type:"button",onClick:Or}," + Create new tour "),Ke(m("select",{"onUpdate:modelValue":E[0]||(E[0]=O=>o.value=O),onChange:Y},[E[48]||(E[48]=m("option",{value:""},"Select project",-1)),(j(!0),Z(tt,null,ct(i.value,O=>(j(),Z("option",{key:O.id,value:O.id},oe(O.name),9,_R))),128))],544),[[Wt,o.value]]),Ke(m("select",{"onUpdate:modelValue":E[1]||(E[1]=O=>a.value=O),onChange:be},[E[49]||(E[49]=m("option",{value:""},"Select location",-1)),(j(!0),Z(tt,null,ct(r.value,O=>(j(),Z("option",{key:O.id,value:O.id},oe(O.name),9,vR))),128))],544),[[Wt,a.value]]),Ke(m("select",{"onUpdate:modelValue":E[2]||(E[2]=O=>l.value=O),onChange:Re},[E[50]||(E[50]=m("option",{value:""},"Select version",-1)),(j(!0),Z(tt,null,ct(s.value,O=>(j(),Z("option",{key:O.id,value:O.id}," v"+oe(O.version_number)+" - "+oe(O.status),9,xR))),128))],544),[[Wt,l.value]])]),m("div",bR,[m("button",{class:"builder-export-button",type:"button",onClick:E[3]||(E[3]=O=>I.value=!0)}," Export JSON ")]),m("input",{ref_key:"fileInput",ref:F,class:"hidden-input",type:"file",multiple:"",accept:"image/*",onChange:K},null,544)]),p.value?(j(),Z("p",yR,oe(p.value),1)):Je("",!0),_.value?(j(),Z("p",SR,oe(_.value),1)):Je("",!0),m("div",MR,[m("aside",{class:$t(["builder-left",{"drag-over":h.value}]),onDragover:E[4]||(E[4]=_t(O=>h.value=!0,["prevent"])),onDragleave:E[5]||(E[5]=_t(O=>h.value=!1,["prevent"])),onDrop:_t(V,["prevent"])},[m("div",ER,[E[52]||(E[52]=m("h2",null,"Scenes",-1)),m("span",null,oe(c.value.length),1)]),(j(!0),Z(tt,null,ct(c.value,(O,pe)=>(j(),Z("article",{key:O.id,class:$t(["scene-list-item",{active:O.id===f.value,dragging:O.id===M.value,"drag-over-scene":O.id===C.value&&O.id!==M.value}]),draggable:"true",role:"button",tabindex:"0",onDragstart:Ce=>Oe(Ce,O.id),onDragover:Ce=>Se(Ce,O.id),onDrop:Ce=>Qe(Ce,O.id),onDragend:Ye,onClick:Ce=>x(O.id),onKeydown:[ir(_t(Ce=>x(O.id),["prevent"]),["enter"]),ir(_t(Ce=>x(O.id),["prevent"]),["space"])]},[m("span",TR,oe(pe+1),1),m("span",{class:"scene-thumb",style:Bt(R(O)?{backgroundImage:`url(${R(O)})`}:{})},null,4),m("span",AR,[m("strong",null,oe(O.name||O.id),1),m("small",null,oe(O.hotspots?.length||0)+" hotspot · "+oe(O.group||"Default"),1)]),m("button",{class:"scene-delete-button",type:"button",title:"Delete scene","aria-label":"Delete scene",onClick:_t(Ce=>G(O.id),["stop"])}," 🗑 ",8,RR)],42,wR))),128)),m("button",{class:"drop-zone-button",type:"button",onClick:ot}," + Keo tha hoac click de them anh 360° ")],34),m("main",CR,[m("div",PR,[tn(Ef,{"image-url":ie.value,hotspots:Le.value,"selected-hotspot-id":d.value,"initial-view":Pe.value,onPanoramaClick:Ft,onHotspotClick:ur,onHotspotDblclick:xl,onViewChange:Oo},null,8,["image-url","hotspots","selected-hotspot-id","initial-view"]),m("div",LR,oe($.value?v.value?`Drawing info area: ${S.value.length} point(s). Click wall/object edges, then Finish area.`:B.value?"Selecting hotspot position: click image to pin point":"Drag mouse to rotate. Click + Add hotspot then click image to place point.":"Thêm ảnh panorama 360° để bắt đầu"),1),m("div",DR,[m("span",null,"LON "+oe(J.lon)+"°",1),m("span",null,"LAT "+oe(J.lat)+"°",1),m("span",null,"FOV "+oe(J.fov)+"°",1)])])]),m("aside",IR,[E[85]||(E[85]=m("h2",null,"Inspector",-1)),$.value?(j(),Z(tt,{key:0},[m("div",NR,[m("span",{class:"inspector-thumb",style:Bt(ie.value?{backgroundImage:`url(${ie.value})`}:{})},null,4),m("button",{class:"builder-tool-button wide",type:"button",onClick:ot},oe(g.value?"Uploading...":"Change image"),1)]),m("div",UR,[m("label",null,[E[53]||(E[53]=it("Scene ID",-1)),Ke(m("input",{"onUpdate:modelValue":E[6]||(E[6]=O=>ee.id=O)},null,512),[[lt,ee.id]])]),m("label",null,[E[54]||(E[54]=it("Scene name",-1)),Ke(m("input",{"onUpdate:modelValue":E[7]||(E[7]=O=>ee.name=O),onInput:Ie},null,544),[[lt,ee.name]])]),m("label",null,[E[55]||(E[55]=it("Group",-1)),Ke(m("input",{"onUpdate:modelValue":E[8]||(E[8]=O=>ee.group=O),onInput:we},null,544),[[lt,ee.group]])]),m("label",null,[E[56]||(E[56]=it("Description",-1)),Ke(m("textarea",{"onUpdate:modelValue":E[9]||(E[9]=O=>ee.description=O),rows:"3"},null,512),[[lt,ee.description]])]),m("label",null,[E[57]||(E[57]=it("URL cloud / file",-1)),Ke(m("input",{"onUpdate:modelValue":E[10]||(E[10]=O=>ee.image_url=O),placeholder:"/media/... hoac https://..."},null,512),[[lt,ee.image_url]])]),m("div",OR,[m("button",{class:"secondary-button",type:"button",onClick:z}," Save scene "),m("button",{class:"danger-button",type:"button",onClick:E[11]||(E[11]=O=>G($.value.id))}," Delete scene ")])]),E[82]||(E[82]=m("hr",null,null,-1)),m("section",FR,[E[61]||(E[61]=m("h3",null,"View",-1)),m("div",BR,[m("label",null,[E[58]||(E[58]=it("LON",-1)),m("input",{value:J.lon,readonly:""},null,8,kR)]),m("label",null,[E[59]||(E[59]=it("LAT",-1)),m("input",{value:J.lat,readonly:""},null,8,VR)]),m("label",null,[E[60]||(E[60]=it("FOV",-1)),m("input",{value:J.fov,readonly:""},null,8,HR)])]),m("button",{class:"builder-outline-button",type:"button",onClick:Vs}," Save current view ")]),E[83]||(E[83]=m("hr",null,null,-1)),m("section",zR,[m("div",GR,[m("h3",null,"Hotspots ("+oe($.value.hotspots?.length||0)+")",1),m("button",{class:$t(["builder-mini-button",{active:B.value}]),type:"button",onClick:q},oe(B.value?"Click image...":"+ Add hotspot"),3),m("button",{class:$t(["builder-mini-button",{active:v.value}]),type:"button",onClick:ne}," + Draw area ",2)]),v.value?(j(),Z("div",WR,[m("span",null,oe(S.value.length)+" point(s)",1),m("button",{type:"button",disabled:!S.value.length,onClick:Cn}," Undo ",8,$R),m("button",{type:"button",disabled:S.value.length<3,onClick:Pt}," Finish ",8,XR),m("button",{type:"button",onClick:Pn},"Cancel")])):Je("",!0),$.value.hotspots?.length?(j(),Z("div",qR,[(j(!0),Z(tt,null,ct($.value.hotspots,(O,pe)=>(j(),Z("div",{key:O.id,class:$t(["hotspot-list-item",{active:O.id===d.value}]),role:"button",tabindex:"0",onClick:Ce=>ur(O),onKeydown:[ir(_t(Ce=>ur(O),["prevent"]),["enter"]),ir(_t(Ce=>ur(O),["prevent"]),["space"])]},[m("span",KR,oe(pe+1),1),m("span",null,[m("strong",null,oe(O.label||`Hotspot ${pe+1}`),1),m("small",null," Lon:"+oe(Math.round(Number(O.lon||0)*10)/10)+"° Lat:"+oe(Math.round(Number(O.lat||0)*10)/10)+"° → "+oe(["info","info_area"].includes(O.type)?O.info?.title||"info popup":O.target_scene_id||"not selected")+" ("+oe(O.type||"point")+") ",1)]),m("button",{class:"hotspot-remove",type:"button",onClick:_t(Ce=>{d.value=O.id,Jn()},["stop"])}," × ",8,jR)],42,YR))),128))])):Je("",!0),ge.value?Je("",!0):(j(),Z("p",ZR,' Click "+ Add hotspot", then click image to pin hotspot in the 360 position. '))]),ge.value?(j(),Z("div",JR,[m("h3",null,"HOTSPOT #"+oe(Ue.value+1),1),m("label",null,[E[62]||(E[62]=it("Label",-1)),Ke(m("input",{"onUpdate:modelValue":E[12]||(E[12]=O=>X.label=O)},null,512),[[lt,X.label]])]),m("label",null,[E[64]||(E[64]=it(" Type ",-1)),Ke(m("select",{"onUpdate:modelValue":E[13]||(E[13]=O=>X.type=O)},[...E[63]||(E[63]=[m("option",{value:"point"},"POINT",-1),m("option",{value:"nav"},"NAV",-1),m("option",{value:"info"},"INFO",-1),m("option",{value:"info_area"},"INFO AREA",-1)])],512),[[Wt,X.type]])]),["info","info_area"].includes(X.type)?Je("",!0):(j(),Z("label",QR,[E[66]||(E[66]=it(" Target scene ",-1)),Ke(m("select",{"onUpdate:modelValue":E[14]||(E[14]=O=>X.target_scene_id=O)},[E[65]||(E[65]=m("option",{value:""},"None",-1)),(j(!0),Z(tt,null,ct(ke.value,O=>(j(),Z("option",{key:O.id,value:O.id,disabled:O.isCurrent},oe(O.index)+". "+oe(O.name)+" "+oe(O.isCurrent?"(current scene)":"")+" "+oe(O.hasImage?"":"(no image)"),9,eC))),128))],512),[[Wt,X.target_scene_id]])])),["info","info_area"].includes(X.type)?(j(),Z("div",tC,[m("div",nC,[m("span",null,oe(X.type==="info_area"?"Area content":"Info content"),1),m("small",null,oe(X.type==="info_area"?"Click glowing area to open this card.":"Click hotspot to open this card."),1)]),m("label",null,[E[67]||(E[67]=it(" Title ",-1)),Ke(m("input",{"onUpdate:modelValue":E[15]||(E[15]=O=>X.info_title=O),placeholder:"Painting / object / highlight name"},null,512),[[lt,X.info_title]])]),m("div",iC,[m("span",{class:"info-image-preview",style:Bt(ge.value.info?.image_url?{backgroundImage:`url(${ge.value.info.image_url})`}:{})},[ge.value.info?.image_url?Je("",!0):(j(),Z("small",rC,"No image"))],4),m("div",sC,[m("label",oC,[E[68]||(E[68]=it(" Upload image ",-1)),m("input",{type:"file",accept:"image/*",onChange:No},null,32)]),Ke(m("input",{"onUpdate:modelValue":E[16]||(E[16]=O=>X.info_image_url=O),placeholder:"Or paste image URL..."},null,512),[[lt,X.info_image_url]]),m("small",null,oe(ge.value.local_info_image_file?`Selected: ${ge.value.local_info_image_file.name}`:"Image will show in the viewer popup."),1)])]),m("div",aC,[m("div",lC,[E[70]||(E[70]=m("strong",null,"Video",-1)),E[71]||(E[71]=m("small",null,"Upload MP4/WebM or paste a hosted video URL.",-1)),m("label",uC,[E[69]||(E[69]=it(" Upload video ",-1)),m("input",{type:"file",accept:"video/*",onChange:Uo},null,32)]),Ke(m("input",{"onUpdate:modelValue":E[17]||(E[17]=O=>X.info_video_url=O),placeholder:"Video URL /media/... or https://..."},null,512),[[lt,X.info_video_url]]),m("small",null,oe(ge.value.local_info_video_file?`Selected: ${ge.value.local_info_video_file.name}`:ge.value.info?.video_url?"Video will be shown in the popup.":"No uploaded video selected."),1)]),m("div",cC,[E[72]||(E[72]=m("strong",null,"YouTube",-1)),E[73]||(E[73]=m("small",null,"Paste a YouTube watch/share/embed link.",-1)),Ke(m("input",{"onUpdate:modelValue":E[18]||(E[18]=O=>X.info_youtube_url=O),placeholder:"https://www.youtube.com/watch?v=..."},null,512),[[lt,X.info_youtube_url]])])]),m("label",null,[E[74]||(E[74]=it(" Description ",-1)),Ke(m("textarea",{"onUpdate:modelValue":E[19]||(E[19]=O=>X.info_description=O),rows:"4",placeholder:"This text is shown when viewer clicks the info hotspot."},null,512),[[lt,X.info_description]])]),m("label",fC,[Ke(m("input",{"onUpdate:modelValue":E[20]||(E[20]=O=>X.glow=O),type:"checkbox"},null,512),[[Jc,X.glow]]),E[75]||(E[75]=m("span",null,"Glow effect",-1))])])):Je("",!0),m("div",dC,[m("label",null,[E[76]||(E[76]=it("LON",-1)),Ke(m("input",{"onUpdate:modelValue":E[21]||(E[21]=O=>X.lon=O),type:"number",step:"0.1"},null,512),[[lt,X.lon]])]),m("label",null,[E[77]||(E[77]=it("LAT",-1)),Ke(m("input",{"onUpdate:modelValue":E[22]||(E[22]=O=>X.lat=O),type:"number",step:"0.1"},null,512),[[lt,X.lat]])])]),m("div",hC,[m("label",null,[E[78]||(E[78]=it("X %",-1)),Ke(m("input",{"onUpdate:modelValue":E[23]||(E[23]=O=>X.x=O),type:"number",min:"0",max:"100"},null,512),[[lt,X.x]])]),m("label",null,[E[79]||(E[79]=it("Y %",-1)),Ke(m("input",{"onUpdate:modelValue":E[24]||(E[24]=O=>X.y=O),type:"number",min:"0",max:"100"},null,512),[[lt,X.y]])])]),m("label",null,[E[80]||(E[80]=it(" Hotspot audio ",-1)),m("input",{type:"file",accept:"audio/*",onChange:bl},null,32)]),m("label",null,[E[81]||(E[81]=it(" Audio URL ",-1)),Ke(m("input",{"onUpdate:modelValue":E[25]||(E[25]=O=>X.audio_url=O),placeholder:"/media/... or https://..."},null,512),[[lt,X.audio_url]])]),m("p",pC,oe(ge.value.local_audio_file?`Selected: ${ge.value.local_audio_file.name}`:X.audio_url?"Hotspot has audio.":"No audio for this hotspot."),1),m("div",{class:"actions-row"},[m("button",{class:"primary-button",type:"button",onClick:ks}," Save hotspot "),m("button",{class:"danger-button",type:"button",onClick:Jn}," Delete ")])])):Je("",!0)],64)):(j(),Z("div",mC,[E[84]||(E[84]=m("p",null,"Select a scene on the left to edit properties.",-1)),m("button",{class:"builder-tool-button wide",type:"button",onClick:de}," + Create empty scene ")]))])]),I.value?(j(),Z("div",{key:2,class:"builder-modal-backdrop",onClick:E[27]||(E[27]=_t(O=>I.value=!1,["self"]))},[m("div",gC,[m("div",_C,[E[86]||(E[86]=m("h2",null,"Export TOUR_DATA",-1)),m("button",{class:"builder-mini-button",type:"button",onClick:E[26]||(E[26]=O=>I.value=!1)}," Close ")]),m("textarea",{readonly:"",rows:"18",value:ye.value},null,8,vC),m("div",{class:"actions-row"},[m("button",{class:"builder-save-button",type:"button",onClick:Fo}," Download JSON "),m("button",{class:"builder-tool-button",type:"button",onClick:Ur}," Copy ")])])])):Je("",!0),b.value?(j(),Z("div",{key:3,class:"builder-modal-backdrop",onClick:E[30]||(E[30]=_t(O=>b.value=!1,["self"]))},[m("div",xC,[m("div",bC,[E[87]||(E[87]=m("h2",null,"Import JSON",-1)),m("button",{class:"builder-mini-button",type:"button",onClick:E[28]||(E[28]=O=>b.value=!1)}," Cancel ")]),Ke(m("textarea",{"onUpdate:modelValue":E[29]||(E[29]=O=>le.value=O),rows:"18",placeholder:"Paste TOUR_DATA JSON here..."},null,512),[[lt,le.value]]),m("div",{class:"actions-row"},[m("button",{class:"builder-save-button",type:"button",onClick:$e}," Nhap ")])])])):Je("",!0),w.value?(j(),Z("div",{key:4,class:"builder-modal-backdrop",onClick:E[47]||(E[47]=_t(O=>w.value=!1,["self"]))},[m("div",yC,[m("div",SC,[E[88]||(E[88]=m("h2",null,"Select or create tour",-1)),m("button",{class:"builder-mini-button",type:"button",onClick:E[31]||(E[31]=O=>w.value=!1)}," Close ")]),m("div",MC,[m("section",EC,[m("div",wC,[E[89]||(E[89]=m("h3",null,"1. Project",-1)),m("button",{class:"builder-mini-button",type:"button",onClick:E[32]||(E[32]=O=>L.create_project?Sl():yl())},oe(L.create_project?"Select project có sẵn":"+ Create new project"),1)]),L.create_project?(j(),Z(tt,{key:0},[m("label",null,[E[90]||(E[90]=it("New project name *",-1)),Ke(m("input",{"onUpdate:modelValue":E[33]||(E[33]=O=>L.project_name=O),placeholder:"VD: Xa Co Do"},null,512),[[lt,L.project_name]])]),m("label",null,[E[91]||(E[91]=it("Description project",-1)),Ke(m("textarea",{"onUpdate:modelValue":E[34]||(E[34]=O=>L.project_description=O),rows:"2"},null,512),[[lt,L.project_description]])])],64)):(j(),Z("label",TC,[E[93]||(E[93]=it(" Select project co san ",-1)),Ke(m("select",{"onUpdate:modelValue":E[35]||(E[35]=O=>L.project_id=O),onChange:Fr},[E[92]||(E[92]=m("option",{value:""},"Select project",-1)),(j(!0),Z(tt,null,ct(i.value,O=>(j(),Z("option",{key:O.id,value:O.id},oe(O.name),9,AC))),128))],544),[[Wt,L.project_id]])]))]),m("section",RC,[m("div",CC,[E[94]||(E[94]=m("h3",null,"2. Location",-1)),m("button",{class:"builder-mini-button",type:"button",disabled:L.create_project||!L.create_project&&!L.project_id,onClick:E[36]||(E[36]=O=>L.create_location?El():Ml())},oe(L.create_location?"Select location co san":"+ Create new location"),9,PC)]),L.create_location?(j(),Z(tt,{key:0},[m("label",null,[E[95]||(E[95]=it("New location name *",-1)),Ke(m("input",{"onUpdate:modelValue":E[37]||(E[37]=O=>L.location_name=O),placeholder:"VD: Den Dan Ha"},null,512),[[lt,L.location_name]])]),m("label",null,[E[96]||(E[96]=it("Description location",-1)),Ke(m("textarea",{"onUpdate:modelValue":E[38]||(E[38]=O=>L.location_description=O),rows:"2"},null,512),[[lt,L.location_description]])]),m("div",LC,[E[99]||(E[99]=m("span",{class:"form-label"},"Location thumbnail",-1)),m("div",DC,[m("div",{class:"thumbnail-preview",style:Bt(L.location_thumbnail_preview?{backgroundImage:`url(${L.location_thumbnail_preview})`}:{})},[L.location_thumbnail_preview?Je("",!0):(j(),Z("span",IC," No thumbnail "))],4),m("label",NC,[m("input",{type:"file",accept:"image/*",onChange:se},null,32),E[97]||(E[97]=m("strong",null,"Upload thumbnail",-1)),E[98]||(E[98]=m("small",null," Anh nay dung cho card publish tren Home, dep hon anh panorama. ",-1))])])]),m("div",UC,[m("label",null,[E[100]||(E[100]=it("Latitude",-1)),Ke(m("input",{"onUpdate:modelValue":E[39]||(E[39]=O=>L.latitude=O),type:"number",step:"0.000001"},null,512),[[lt,L.latitude]])]),m("label",null,[E[101]||(E[101]=it("Longitude",-1)),Ke(m("input",{"onUpdate:modelValue":E[40]||(E[40]=O=>L.longitude=O),type:"number",step:"0.000001"},null,512),[[lt,L.longitude]])])])],64)):(j(),Z("label",OC,[E[103]||(E[103]=it(" Select location co san ",-1)),Ke(m("select",{"onUpdate:modelValue":E[41]||(E[41]=O=>L.location_id=O),disabled:!D.value.length,onChange:Br},[E[102]||(E[102]=m("option",{value:""},"Select location",-1)),(j(!0),Z(tt,null,ct(D.value,O=>(j(),Z("option",{key:O.id,value:O.id},oe(O.name),9,BC))),128))],40,FC),[[Wt,L.location_id]])]))]),m("section",kC,[m("div",VC,[E[104]||(E[104]=m("h3",null,"3. Version",-1)),L.create_location?Je("",!0):(j(),Z("button",{key:0,class:"builder-mini-button",type:"button",onClick:E[42]||(E[42]=O=>L.create_version=!L.create_version)},oe(L.create_version?"Select version co san":"+ Create new version"),1))]),!L.create_version&&!L.create_location?(j(),Z("label",HC,[E[106]||(E[106]=it(" Select version de chinh sua ",-1)),Ke(m("select",{"onUpdate:modelValue":E[43]||(E[43]=O=>L.version_id=O),disabled:!H.value.length},[E[105]||(E[105]=m("option",{value:""},"Select version",-1)),(j(!0),Z(tt,null,ct(H.value,O=>(j(),Z("option",{key:O.id,value:O.id}," v"+oe(O.version_number)+" - "+oe(O.status)+" - "+oe(O.label||"No label"),9,GC))),128))],8,zC),[[Wt,L.version_id]])])):(j(),Z("label",WC,[E[107]||(E[107]=it(" New draft version label ",-1)),Ke(m("input",{"onUpdate:modelValue":E[44]||(E[44]=O=>L.version_label=O),placeholder:"Leave empty to auto-name"},null,512),[[lt,L.version_label]])])),L.create_version||L.create_location?(j(),Z(tt,{key:2},[L.create_version&&!L.create_location?(j(),Z("label",$C,[E[109]||(E[109]=it(" Inherit from version ",-1)),Ke(m("select",{"onUpdate:modelValue":E[45]||(E[45]=O=>L.source_version_id=O),disabled:!H.value.length},[E[108]||(E[108]=m("option",{value:""},"Create empty version",-1)),(j(!0),Z(tt,null,ct(H.value,O=>(j(),Z("option",{key:O.id,value:O.id}," v"+oe(O.version_number)+" - "+oe(O.status)+" - "+oe(O.label||"No label"),9,qC))),128))],8,XC),[[Wt,L.source_version_id]])])):Je("",!0),L.create_version&&!L.create_location?(j(),Z("p",YC," New draft will copy scenes, hotspots, audio, logo and media from selected version. ")):Je("",!0),m("label",null,[E[110]||(E[110]=it(" Background audio ",-1)),m("input",{type:"file",accept:"audio/*",onChange:me},null,32)]),m("label",null,[E[111]||(E[111]=it(" Point hotspot logo ",-1)),m("input",{type:"file",accept:"image/*",onChange:ce},null,32)]),E[112]||(E[112]=m("p",{class:"builder-muted"}," Logo này sẽ dùng cho hotspot loai point trong viewer. ",-1))],64)):Je("",!0),L.create_location?(j(),Z("p",KC," New location has no version, so Builder will create a new draft version. ")):Je("",!0)]),m("div",jC,[m("button",{class:"builder-save-button",type:"button",onClick:fe},oe(L.create_version?"Create/select tour":"Open version to edit"),1),m("button",{class:"builder-tool-button",type:"button",onClick:E[46]||(E[46]=O=>w.value=!1)}," Cancel ")])])])])):Je("",!0)]))}},JC={class:"page"},QC={key:0,class:"error-message"},eP={class:"panel"},tP={class:"inline-form"},nP=["value"],iP={class:"panel"},rP={class:"checkbox-row"},sP=["disabled"],oP={class:"panel"},aP={key:0,class:"muted"},lP={class:"table-wrap"},uP={class:"actions-cell"},cP=["onClick"],fP=["onClick"],dP={key:0},hP={__name:"LocationsView",setup(t){const e=Me([]),n=Me([]),i=Me(""),r=Me(!1),s=Me(!1),o=Me(""),a=Zt({id:null,name:"",description:"",latitude:"",longitude:"",order:0,is_active:!0});function l(h){return Array.isArray(h)?h:Array.isArray(h?.results)?h.results:Array.isArray(h?.data)?h.data:Array.isArray(h?.items)?h.items:[]}function u(h){const M=h.response?.data;return M?typeof M=="string"?M:M.detail?M.detail:Object.entries(M).map(([C,b])=>`${C}: ${Array.isArray(b)?b.join(", "):b}`).join(" | "):h.message||"Co loi xay ra."}async function c(){const h=await Nr();e.value=l(h.data),!i.value&&e.value.length&&(i.value=e.value[0].id)}async function f(){if(i.value){r.value=!0,o.value="";try{const h=await ar(i.value);n.value=l(h.data)}catch(h){o.value=h.response?.data?.detail||"Could not load location list."}finally{r.value=!1}}}function d(){Object.assign(a,{id:null,name:"",description:"",latitude:"",longitude:"",order:n.value.length+1,is_active:!0})}function p(h){Object.assign(a,{id:h.id,name:h.name,description:h.description||"",latitude:h.latitude||"",longitude:h.longitude||"",order:h.order||0,is_active:h.is_active})}async function _(){if(!i.value){o.value="Vui long select project truoc khi create location.";return}s.value=!0,o.value="";const h={name:a.name,description:a.description,latitude:a.latitude||null,longitude:a.longitude||null,order:Number(a.order||0),is_active:a.is_active};try{a.id?await Ig(a.id,h):await wf(i.value,h),d(),await f()}catch(M){o.value=u(M)}finally{s.value=!1}}async function y(h){window.confirm(`Delete location "${h.name}"?`)&&(await Ng(h.id),await f())}async function g(){await c(),d(),await f()}return jn(g),(h,M)=>(j(),Z("section",JC,[m("header",{class:"page-header"},[M[7]||(M[7]=m("div",null,[m("p",{class:"eyebrow"},"Quan ly"),m("h1",null,"Location")],-1)),m("button",{class:"secondary-button",type:"button",onClick:f},"Refresh")]),o.value?(j(),Z("p",QC,oe(o.value),1)):Je("",!0),m("section",eP,[M[9]||(M[9]=m("h2",null,"Select project",-1)),m("div",tP,[Ke(m("select",{"onUpdate:modelValue":M[0]||(M[0]=C=>i.value=C),onChange:f},[M[8]||(M[8]=m("option",{value:""},"Select project",-1)),(j(!0),Z(tt,null,ct(e.value,C=>(j(),Z("option",{key:C.id,value:C.id},oe(C.name),9,nP))),128))],544),[[Wt,i.value]])])]),m("section",iP,[m("h2",null,oe(a.id?"Update location":"Create new location"),1),m("form",{class:"grid-form",onSubmit:_t(_,["prevent"])},[Ke(m("input",{"onUpdate:modelValue":M[1]||(M[1]=C=>a.name=C),placeholder:"Ten location",required:""},null,512),[[lt,a.name]]),Ke(m("input",{"onUpdate:modelValue":M[2]||(M[2]=C=>a.description=C),placeholder:"Description"},null,512),[[lt,a.description]]),Ke(m("input",{"onUpdate:modelValue":M[3]||(M[3]=C=>a.latitude=C),type:"number",step:"any",placeholder:"Latitude"},null,512),[[lt,a.latitude,void 0,{number:!0}]]),Ke(m("input",{"onUpdate:modelValue":M[4]||(M[4]=C=>a.longitude=C),type:"number",step:"any",placeholder:"Longitude"},null,512),[[lt,a.longitude,void 0,{number:!0}]]),Ke(m("input",{"onUpdate:modelValue":M[5]||(M[5]=C=>a.order=C),type:"number",min:"0",placeholder:"Thu tu"},null,512),[[lt,a.order,void 0,{number:!0}]]),m("label",rP,[Ke(m("input",{"onUpdate:modelValue":M[6]||(M[6]=C=>a.is_active=C),type:"checkbox"},null,512),[[Jc,a.is_active]]),M[10]||(M[10]=it(" Active ",-1))]),m("button",{class:"primary-button",type:"submit",disabled:s.value},oe(s.value?"Saving...":a.id?"Save":"Create"),9,sP),m("button",{class:"secondary-button",type:"button",onClick:d},"Lam moi")],32)]),m("section",oP,[M[13]||(M[13]=m("h2",null,"Location list",-1)),r.value?(j(),Z("p",aP,"Loading...")):Je("",!0),m("div",lP,[m("table",null,[M[12]||(M[12]=m("thead",null,[m("tr",null,[m("th",null,"ID"),m("th",null,"Ten"),m("th",null,"Slug"),m("th",null,"Thu tu"),m("th",null,"Status"),m("th")])],-1)),m("tbody",null,[(j(!0),Z(tt,null,ct(n.value,C=>(j(),Z("tr",{key:C.id},[m("td",null,oe(C.id),1),m("td",null,oe(C.name),1),m("td",null,oe(C.slug),1),m("td",null,oe(C.order),1),m("td",null,oe(C.is_active?"Active":"Inactive"),1),m("td",uP,[m("button",{class:"secondary-button",type:"button",onClick:b=>p(C)},"Edit",8,cP),m("button",{class:"danger-button",type:"button",onClick:b=>y(C)},"Delete",8,fP)])]))),128)),!n.value.length&&!r.value?(j(),Z("tr",dP,[...M[11]||(M[11]=[m("td",{colspan:"6"},"Chua co location.",-1)])])):Je("",!0)])])])])]))}},Bg="http://127.0.0.1:8000";function kg(){return typeof window>"u"?"":window.self!==window.top&&document.referrer?document.referrer:window.location.origin}function Vg(t,e=kg()){return Ot.get(`${Bg}/api/public/tour/${t}/`,{params:{embed_origin:e}})}function pP(t,e={},n=kg()){return Ot.post(`${Bg}/api/public/tour/${t}/track-visit/`,{...e,embed_origin:n})}const mP={class:"public-tour-viewer"},gP={class:"public-viewer-topbar"},_P={key:0,class:"viewer-error"},vP={class:"public-viewer-stage"},xP={class:"viewer-scene-badge"},bP={key:0,class:"viewer-thumbs public-viewer-thumbs"},yP=["onClick"],SP={class:"view-meter public-view-meter"},MP={class:"viewer-info-modal"},EP={key:0,class:"viewer-info-media"},wP=["src"],TP=["src"],AP={__name:"PublicViewerView",setup(t){const e=Zt({token:"",origin:window.location.origin}),n=Me(null),i=Me([]),r=Me(""),s=Me(null),o=Me(""),a=Me(!1),l=Zt({lon:0,lat:0,fov:75}),u=st(()=>i.value.find(S=>S.id===r.value)||null),c=st(()=>u.value?.view||{lon:0,lat:0,fov:75}),f=st(()=>y(u.value)),d=st(()=>_(n.value?.version?.hotspot_point_logo||"")),p=st(()=>{const S=u.value;return S?(S.hotspots||[]).map(F=>{const D=i.value.find(H=>H.id===F.target_scene_id);return{...F,preview_image:["info","info_area"].includes(F.type)&&_(F.info?.image_url||F.image_url||"")||y(D||S),audio_url:_(F.audio_url||F.audio||""),info:{title:F.info?.title||F.info_title||F.label||"",description:F.info?.description||F.info_description||F.description||"",image_url:_(F.info?.image_url||F.info_image_url||F.image_url||""),video_url:_(F.info?.video_url||F.info_video_url||F.video_url||""),youtube_url:F.info?.youtube_url||F.info_youtube_url||F.youtube_url||""}}}):[]});function _(S){return S?S.startsWith("blob:")||S.startsWith("data:")||S.startsWith("http")?S:`${Lo}${S.startsWith("/")?S:`/${S}`}`:""}function y(S){return S?_(S.optimized_file||S.original_file||S.image_url||S.preview_file||S.thumbnail||S.thumb||S.panorama||""):""}function g(S){if(!S)return"";const F=String(S).trim(),H=[/youtube\.com\/watch\?v=([^&]+)/i,/youtu\.be\/([^?&]+)/i,/youtube\.com\/embed\/([^?&/]+)/i,/youtube\.com\/shorts\/([^?&/]+)/i].map(ee=>F.match(ee)).find(Boolean);return H?.[1]?`https://www.youtube.com/embed/${H[1]}`:""}function h(S,F=0){return{id:String(S.id||S.key||S.scene_key||`scene-${F+1}`),name:S.name||S.title||`Scene ${F+1}`,group:S.group||"Default",description:S.description||S.info||"",image_url:S.image_url||"",optimized_file:S.optimized_file||"",preview_file:S.preview_file||"",original_file:S.original_file||"",thumbnail:S.thumbnail||S.thumb||S.thumbnail_file||S.preview_file||S.optimized_file||S.original_file||S.image_url||"",thumbnail_file:S.thumbnail_file||"",view:{lon:Number(S.view?.lon??S.initialView?.lon??S.lon??0),lat:Number(S.view?.lat??S.initialView?.lat??S.lat??0),fov:Number(S.view?.fov??S.initialView?.fov??S.fov??75)},hotspots:(S.hotspots||[]).map((D,H)=>({id:String(D.id||`hotspot-${F+1}-${H+1}`),label:D.label||D.title||`Hotspot ${H+1}`,type:["nav","point","info","info_area"].includes(D.type)?D.type:D.type==="navigate"?"nav":"point",target_scene_id:String(D.target_scene_id||D.target||D.scene_id||""),lon:Number(D.lon??0),lat:Number(D.lat??0),x:Number(D.x??50),y:Number(D.y??50),audio_url:D.audio_url||D.audio||"",area_points:Array.isArray(D.area_points)?D.area_points.map(ee=>({lon:Number(ee.lon??0),lat:Number(ee.lat??0),x:Number(ee.x??50),y:Number(ee.y??50)})):[],info:{title:D.info?.title||D.info_title||"",description:D.info?.description||D.info_description||D.description||"",image_url:D.info?.image_url||D.info_image_url||D.image_url||"",video_url:D.info?.video_url||D.info_video_url||D.video_url||"",youtube_url:D.info?.youtube_url||D.info_youtube_url||D.youtube_url||""},glow:D.glow??D.style?.glow??!0}))}}function M(S){const F=S?.TOUR_DATA||S?.tour_data||S?.data||S||{},D=F.scenes||F.SCENES||[];return Array.isArray(D)?D.map(h):[]}async function C(){o.value="",a.value=!1,s.value=null;try{const S=await Vg(e.token,e.origin);n.value=S.data,i.value=M(S.data.data||S.data),r.value=i.value[0]?.id||"",await b()}catch(S){n.value=null,i.value=[],r.value="",o.value=S.response?.data?.detail||"Could not load public tour."}}async function b(){if(!(!e.token||a.value))try{await pP(e.token,{country_code:"VN",city:"Ha Noi"},e.origin),a.value=!0}catch{}}function I(S){S&&(r.value=S,s.value=null)}function w(){if(!i.value.length)return"";const S=i.value.findIndex(F=>F.id===r.value);return i.value[(S+1)%i.value.length]?.id||""}function B(S){if(s.value=null,["info","info_area"].includes(S.type)){s.value=S;return}const F=S.target_scene_id;if(F&&i.value.some(D=>D.id===F)){I(F);return}["nav","point"].includes(S.type)&&I(w())}function v(S){l.lon=S.lon,l.lat=S.lat,l.fov=S.fov}return(S,F)=>(j(),Z("section",mP,[m("header",gP,[F[5]||(F[5]=m("div",null,[m("p",{class:"eyebrow"},"Public"),m("h1",null,"Public VR360 Viewer")],-1)),m("form",{class:"public-viewer-loader",onSubmit:_t(C,["prevent"])},[Ke(m("input",{"onUpdate:modelValue":F[0]||(F[0]=D=>e.token=D),placeholder:"public_token"},null,512),[[lt,e.token]]),Ke(m("input",{"onUpdate:modelValue":F[1]||(F[1]=D=>e.origin=D),placeholder:"Origin"},null,512),[[lt,e.origin]]),F[4]||(F[4]=m("button",{class:"primary-button",type:"submit"},"Load Tour",-1))],32)]),o.value?(j(),Z("p",_P,oe(o.value),1)):Je("",!0),m("div",vP,[tn(Ef,{class:"tour-panorama","image-url":f.value,hotspots:p.value,"initial-view":c.value,"point-hotspot-logo":d.value,"auto-rotate":"","auto-rotate-delay":3e3,"auto-rotate-speed":3,"hotspot-display-mode":"viewer",onHotspotClick:B,onViewChange:v},null,8,["image-url","hotspots","initial-view","point-hotspot-logo"]),m("div",xP,oe(u.value?.name||"No scene"),1),i.value.length?(j(),Z("div",bP,[(j(!0),Z(tt,null,ct(i.value,D=>(j(),Z("button",{key:D.id,class:$t(["viewer-thumb-item",{active:D.id===r.value}]),type:"button",onClick:H=>I(D.id)},[m("span",{style:Bt(y(D)?{backgroundImage:`url(${y(D)})`}:{})},null,4),m("small",null,oe(D.name),1)],10,yP))),128))])):Je("",!0),m("div",SP,[m("span",null,"LON "+oe(l.lon)+"°",1),m("span",null,"LAT "+oe(l.lat)+"°",1),m("span",null,"FOV "+oe(l.fov)+"°",1)]),s.value?(j(),Z("div",{key:1,class:"viewer-info-modal-backdrop",onClick:F[3]||(F[3]=_t(D=>s.value=null,["self"]))},[m("article",MP,[m("button",{class:"viewer-info-close",type:"button",onClick:F[2]||(F[2]=D=>s.value=null)},"×"),g(s.value.info?.youtube_url)?(j(),Z("div",EP,[m("iframe",{src:g(s.value.info.youtube_url),title:"YouTube video",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:""},null,8,wP)])):s.value.info?.video_url?(j(),Z("video",{key:1,class:"viewer-info-video",src:s.value.info.video_url,controls:"",playsinline:""},null,8,TP)):s.value.info?.image_url?(j(),Z("span",{key:2,class:"viewer-info-image",style:Bt({backgroundImage:`url(${s.value.info.image_url})`})},null,4)):Je("",!0),m("small",null,oe(s.value.type==="info_area"?"INFO AREA":"INFO HOTSPOT"),1),m("h2",null,oe(s.value.info?.title||s.value.label||"Information"),1),m("p",null,oe(s.value.info?.description||s.value.description||"No information has been added for this hotspot yet."),1)])])):Je("",!0)])]))}},RP={class:"page projects-page"},CP={key:0,class:"error-message"},PP={key:1,class:"success-message"},LP={class:"panel project-quick-create"},DP={class:"project-flow"},IP={class:"panel project-flow-column"},NP={class:"panel-title-row"},UP={class:"muted"},OP={key:0,class:"muted"},FP=["onClick","onKeydown"],BP={class:"actions-row"},kP=["onClick"],VP=["onClick"],HP={key:1,class:"muted"},zP={class:"panel project-flow-column"},GP={class:"panel-title-row"},WP={class:"muted"},$P={key:1,class:"muted"},XP={key:2,class:"muted"},qP=["onClick","onKeydown"],YP={class:"actions-row"},KP=["onClick"],jP=["onClick"],ZP={key:3,class:"muted"},JP={class:"panel project-flow-column"},QP={class:"panel-title-row"},eL={class:"muted"},tL={key:1,class:"muted"},nL={key:2,class:"muted"},iL={class:"actions-row"},rL=["onClick"],sL=["disabled","onClick"],oL=["onClick"],aL={key:3,class:"empty-flow-card"},lL={class:"builder-modal builder-modal-small"},uL=["value"],cL={key:3,class:"builder-modal-backdrop"},fL={class:"builder-modal builder-modal-small"},dL={class:"builder-modal-header"},hL={key:0,class:"thumbnail-edit-block"},pL={class:"thumbnail-edit-grid"},mL={key:0},gL={class:"thumbnail-upload-button"},_L={key:1,class:"two-inputs"},vL={class:"checkbox-row"},xL={__name:"ProjectsView",setup(t){const e=Ls(),n=Me([]),i=Me([]),r=Me([]),s=Me(""),o=Me(""),a=Me(!1),l=Me(!1),u=Me(!1),c=Me(""),f=Me(""),d=Me(null),p=Me(!1);let _=null;const y=Zt({name:"",description:""}),g=Zt({label:"",source_version_id:"",background_audio_file:null,hotspot_point_logo_file:null}),h=Zt({id:"",type:"",name:"",description:"",is_active:!0,thumbnail:"",thumbnail_file:null,thumbnail_preview:"",latitude:"",longitude:""}),M=st(()=>n.value.find(T=>T.id===s.value)||null),C=st(()=>i.value.find(T=>T.id===o.value)||null);function b(T){return Array.isArray(T)?T:Array.isArray(T?.results)?T.results:Array.isArray(T?.data)?T.data:Array.isArray(T?.items)?T.items:[]}function I(T,R){const k=T.response?.data;if(!k)return T.message||R;if(typeof k=="string")return k.slice(0,240)||R;if(k.detail)return k.detail;if(k.non_field_errors?.length)return k.non_field_errors[0];const re=Object.keys(k)[0],Q=re?k[re]:null;return Array.isArray(Q)?`${re}: ${Q[0]}`:typeof Q=="string"?`${re}: ${Q}`:R}function w(T){const R=T.label?` - ${T.label}`:"";return`v${T.version_number}${R}`}function B(){if(clearTimeout(_),!c.value&&!f.value)return;const T=c.value,R=f.value;_=setTimeout(()=>{c.value===T&&(c.value=""),f.value===R&&(f.value="")},2e3)}async function v(){a.value=!0,c.value="";try{const T=await Nr();n.value=b(T.data)}catch(T){c.value=T.response?.data?.detail||"Could not load project list."}finally{a.value=!1}}async function S(T){s.value=T.id,o.value="",i.value=[],r.value=[],await F(T.id)}async function F(T=s.value){if(T){l.value=!0,c.value="";try{const R=await ar(T);i.value=b(R.data)}catch(R){c.value=R.response?.data?.detail||"Could not load locations."}finally{l.value=!1}}}async function D(T){o.value=T.id,r.value=[],await H(T.id)}async function H(T=o.value){if(T){u.value=!0,c.value="";try{const R=await Ts(T);r.value=b(R.data)}catch(R){c.value=R.response?.data?.detail||"Could not load versions."}finally{u.value=!1}}}async function ee(){if(!y.name.trim()){c.value="Project name is required.";return}c.value="",f.value="";const T=await Ug({name:y.name.trim(),description:y.description.trim(),is_active:!0});y.name="",y.description="",f.value="Project created.",await v();const R=n.value.find(k=>k.id===T.data.id);R&&await S(R)}async function X(){if(!s.value){c.value="Select a project first.";return}if(!h.name.trim()){c.value="Location name is required.";return}c.value="",f.value="";const T={name:h.name.trim(),description:h.description.trim(),is_active:h.is_active};h.latitude!==""&&(T.latitude=Number(h.latitude)),h.longitude!==""&&(T.longitude=Number(h.longitude));try{const R=await wf(s.value,T);h.thumbnail_file&&await Uc(R.data.id,h.thumbnail_file),f.value="Location created.",await F();const k=i.value.find(re=>re.id===R.data.id);k&&await D(k),$()}catch(R){c.value=I(R,"Could not create location.")}}function J(T){ge(),d.value="project",h.id=T.id,h.type="project",h.name=T.name||"",h.description=T.description||"",h.is_active=!!T.is_active,h.thumbnail=T.thumbnail||"",h.latitude="",h.longitude=""}function le(T){ge(),d.value="location",h.id=T.id,h.type="location",h.name=T.name||"",h.description=T.description||"",h.is_active=!!T.is_active,h.thumbnail=T.thumbnail||"",h.latitude=T.latitude??"",h.longitude=T.longitude??""}function L(){if(!s.value){c.value="Select a project first.";return}ge(),d.value="create_location",h.id="",h.type="create_location",h.name="",h.description="",h.is_active=!0,h.thumbnail="",h.latitude="",h.longitude=""}function $(){ge(),d.value=null,h.id="",h.type="",h.name="",h.description="",h.is_active=!0,h.thumbnail="",h.thumbnail_file=null,h.thumbnail_preview="",h.latitude="",h.longitude=""}function ge(){h.thumbnail_preview&&URL.revokeObjectURL(h.thumbnail_preview),h.thumbnail_preview="",h.thumbnail_file=null}function Ue(T){const R=T.target.files?.[0]||null;h.thumbnail_preview&&URL.revokeObjectURL(h.thumbnail_preview),h.thumbnail_file=R,h.thumbnail_preview=R?URL.createObjectURL(R):""}async function Pe(){if(!h.name.trim()){c.value="Name is required.";return}c.value="",f.value="";const T={name:h.name.trim(),description:h.description.trim(),is_active:h.is_active};try{if(h.type==="project")await aR(h.id,T),f.value="Project updated.",await v(),s.value===h.id&&await F();else if(h.type==="location")T.latitude=h.latitude===""?null:Number(h.latitude),T.longitude=h.longitude===""?null:Number(h.longitude),await Ig(h.id,T),h.thumbnail_file&&await Uc(h.id,h.thumbnail_file),f.value="Location updated.",await F(),o.value===h.id&&await H();else if(h.type==="create_location"){await X();return}$()}catch(R){c.value=R.response?.data?.detail||"Could not update."}}async function ke(T){if(window.confirm(`Soft delete project "${T.name}"?`)){c.value="",f.value="";try{await lR(T.id),f.value="Project deleted.",s.value===T.id&&(s.value="",o.value="",i.value=[],r.value=[]),await v()}catch(k){c.value=k.response?.data?.detail||"Could not delete project."}}}async function Le(T){if(window.confirm(`Soft delete location "${T.name}"?`)){c.value="",f.value="";try{await Ng(T.id),f.value="Location deleted.",o.value===T.id&&(o.value="",r.value=[]),await F()}catch(k){c.value=k.response?.data?.detail||"Could not delete location."}}}async function De(T){if(window.confirm(`Soft delete ${w(T)}? Only draft versions can be deleted.`)){c.value="",f.value="";try{await Fg(o.value,T.id),f.value="Version deleted.",await H()}catch(k){c.value=k.response?.data?.detail||"Could not delete version."}}}function ye(){if(!o.value){c.value="Select a location first.";return}g.label="",g.source_version_id=r.value[0]?.id||"",g.background_audio_file=null,g.hotspot_point_logo_file=null,p.value=!0}function ie(){p.value=!1,g.label="",g.source_version_id="",g.background_audio_file=null,g.hotspot_point_logo_file=null}function W(T){g.background_audio_file=T.target.files?.[0]||null}function ae(T){g.hotspot_point_logo_file=T.target.files?.[0]||null}async function ve(){if(!o.value){c.value="Select a location first.";return}c.value="",f.value="";try{const T=g.label.trim()||`${C.value?.name||"Tour"} draft`,R={label:T,changelog:"Created from Projects flow.",background_audio_file:g.background_audio_file,hotspot_point_logo_file:g.hotspot_point_logo_file};g.source_version_id?R.source_version_id=g.source_version_id:R.data={title:T,scenes:[]},await qa(o.value,R),ie(),f.value="Version created.",await H()}catch(T){c.value=I(T,"Could not create version.")}}function Te(T){e.push({path:"/viewer",query:{project:s.value,location:o.value,version:T.id}})}function Fe(T=null){if(T?.status==="published"){c.value="Published versions cannot be edited. Open an archived or draft version.";return}e.push({path:"/builder",query:{project:s.value||void 0,location:o.value||void 0,version:T?.id||void 0}})}return fi([c,f],B),jn(v),Ps(()=>{clearTimeout(_),ge()}),(T,R)=>(j(),Z("section",RP,[m("header",{class:"page-header"},[R[9]||(R[9]=m("div",null,[m("p",{class:"eyebrow"},"Management"),m("h1",null,"Projects"),m("p",{class:"muted"},"Choose a project, then a location, then open a tour version in VR360 Viewer.")],-1)),m("button",{class:"secondary-button",type:"button",onClick:v},"Refresh")]),c.value?(j(),Z("p",CP,oe(c.value),1)):Je("",!0),f.value?(j(),Z("p",PP,oe(f.value),1)):Je("",!0),m("section",LP,[m("form",{class:"inline-form",onSubmit:_t(ee,["prevent"])},[Ke(m("input",{"onUpdate:modelValue":R[0]||(R[0]=k=>y.name=k),placeholder:"New project name"},null,512),[[lt,y.name]]),Ke(m("input",{"onUpdate:modelValue":R[1]||(R[1]=k=>y.description=k),placeholder:"Short description"},null,512),[[lt,y.description]]),R[10]||(R[10]=m("button",{class:"primary-button",type:"submit"},"Create project",-1))],32)]),m("section",DP,[m("div",IP,[m("div",NP,[R[11]||(R[11]=m("h2",null,"1. Projects",-1)),m("span",UP,oe(n.value.length),1)]),a.value?(j(),Z("p",OP,"Loading projects...")):Je("",!0),(j(!0),Z(tt,null,ct(n.value,k=>(j(),Z("article",{key:k.id,class:$t(["flow-card",{active:k.id===s.value}]),role:"button",tabindex:"0",onClick:re=>S(k),onKeydown:[ir(_t(re=>S(k),["prevent"]),["enter"]),ir(_t(re=>S(k),["prevent"]),["space"])]},[m("strong",null,oe(k.name),1),m("span",null,oe(k.description||"No description"),1),m("small",null,oe(k.locations_count||0)+" locations · "+oe(k.is_active?"Active":"Inactive"),1),m("div",BP,[m("button",{class:"secondary-button compact-button",type:"button",onClick:_t(re=>J(k),["stop"])},"Edit",8,kP),m("button",{class:"danger-button compact-button",type:"button",onClick:_t(re=>ke(k),["stop"])},"Delete",8,VP)])],42,FP))),128)),!n.value.length&&!a.value?(j(),Z("p",HP,"No project yet.")):Je("",!0)]),m("div",zP,[m("div",GP,[R[12]||(R[12]=m("h2",null,"2. Locations",-1)),m("span",WP,oe(i.value.length),1)]),M.value?(j(),Z("button",{key:0,class:"secondary-button",type:"button",onClick:L}," + Create location ")):Je("",!0),M.value?l.value?(j(),Z("p",XP,"Loading locations...")):Je("",!0):(j(),Z("p",$P,"Select a project to see its locations.")),(j(!0),Z(tt,null,ct(i.value,k=>(j(),Z("article",{key:k.id,class:$t(["flow-card",{active:k.id===o.value}]),role:"button",tabindex:"0",onClick:re=>D(k),onKeydown:[ir(_t(re=>D(k),["prevent"]),["enter"]),ir(_t(re=>D(k),["prevent"]),["space"])]},[m("strong",null,oe(k.name),1),m("span",null,oe(k.description||M.value?.name),1),m("small",null,oe(k.is_active?"Active":"Inactive"),1),m("div",YP,[m("button",{class:"secondary-button compact-button",type:"button",onClick:_t(re=>le(k),["stop"])},"Edit",8,KP),m("button",{class:"danger-button compact-button",type:"button",onClick:_t(re=>Le(k),["stop"])},"Delete",8,jP)])],42,qP))),128)),M.value&&!i.value.length&&!l.value?(j(),Z("p",ZP,"No location yet.")):Je("",!0)]),m("div",JP,[m("div",QP,[R[13]||(R[13]=m("h2",null,"3. Versions",-1)),m("span",eL,oe(r.value.length),1)]),C.value?(j(),Z("button",{key:0,class:"secondary-button",type:"button",onClick:ye}," + Create version ")):Je("",!0),C.value?u.value?(j(),Z("p",nL,"Loading versions...")):Je("",!0):(j(),Z("p",tL,"Select a location to see versions.")),(j(!0),Z(tt,null,ct(r.value,k=>(j(),Z("article",{key:k.id,class:"flow-card version-card"},[m("strong",null,oe(w(k)),1),m("span",null,oe(k.changelog||C.value?.name),1),m("small",null,oe(k.status)+" · "+oe(k.scene_assets_count||0)+" assets",1),m("div",iL,[m("button",{class:"primary-button",type:"button",onClick:re=>Te(k)},"View",8,rL),m("button",{class:"secondary-button",type:"button",disabled:k.status==="published",onClick:re=>Fe(k)}," Edit ",8,sL),m("button",{class:"danger-button",type:"button",onClick:re=>De(k)},"Delete",8,oL)])]))),128)),C.value&&!r.value.length&&!u.value?(j(),Z("div",aL,[...R[14]||(R[14]=[m("p",{class:"muted"},"No version yet.",-1)])])):Je("",!0)])]),p.value?(j(),Z("div",{key:2,class:"builder-modal-backdrop",onClick:_t(ie,["self"])},[m("div",lL,[m("div",{class:"builder-modal-header"},[R[15]||(R[15]=m("h2",null,"Create version",-1)),m("button",{type:"button",onClick:ie},"×")]),m("form",{class:"form",onSubmit:_t(ve,["prevent"])},[m("label",null,[R[16]||(R[16]=it(" Version label ",-1)),Ke(m("input",{"onUpdate:modelValue":R[2]||(R[2]=k=>g.label=k),placeholder:"Leave empty to auto-name"},null,512),[[lt,g.label]])]),m("label",null,[R[18]||(R[18]=it(" Inherit from version ",-1)),Ke(m("select",{"onUpdate:modelValue":R[3]||(R[3]=k=>g.source_version_id=k)},[R[17]||(R[17]=m("option",{value:""},"Create empty version",-1)),(j(!0),Z(tt,null,ct(r.value,k=>(j(),Z("option",{key:k.id,value:k.id},oe(w(k))+" - "+oe(k.status),9,uL))),128))],512),[[Wt,g.source_version_id]])]),R[22]||(R[22]=m("p",{class:"muted"}," If selected, the new draft will copy scenes, hotspots, audio, logo and media assets from that version. ",-1)),m("label",null,[R[19]||(R[19]=it(" Background audio ",-1)),m("input",{type:"file",accept:"audio/*",onChange:W},null,32)]),m("label",null,[R[20]||(R[20]=it(" Point hotspot logo ",-1)),m("input",{type:"file",accept:"image/*",onChange:ae},null,32)]),R[23]||(R[23]=m("p",{class:"muted"},"Logo nay se dung cho hotspot loai point trong viewer.",-1)),m("div",{class:"actions-row"},[R[21]||(R[21]=m("button",{class:"primary-button",type:"submit"},"Create version",-1)),m("button",{class:"secondary-button",type:"button",onClick:ie},"Cancel")])],32)])])):Je("",!0),d.value?(j(),Z("div",cL,[m("div",fL,[m("div",dL,[m("h2",null,oe(h.type==="create_location"?"Create location":`Edit ${d.value}`),1),m("button",{type:"button",onClick:$},"×")]),m("form",{class:"form",onSubmit:_t(Pe,["prevent"])},[m("label",null,[R[24]||(R[24]=it(" Name ",-1)),Ke(m("input",{"onUpdate:modelValue":R[4]||(R[4]=k=>h.name=k)},null,512),[[lt,h.name]])]),m("label",null,[R[25]||(R[25]=it(" Description ",-1)),Ke(m("textarea",{"onUpdate:modelValue":R[5]||(R[5]=k=>h.description=k),rows:"4"},null,512),[[lt,h.description]])]),h.type==="location"||h.type==="create_location"?(j(),Z("div",hL,[R[28]||(R[28]=m("span",{class:"form-label"},"Thumbnail",-1)),m("div",pL,[m("div",{class:"thumbnail-preview",style:Bt(h.thumbnail_preview||h.thumbnail?{backgroundImage:`url(${h.thumbnail_preview||h.thumbnail})`}:{})},[!h.thumbnail_preview&&!h.thumbnail?(j(),Z("span",mL,"No thumbnail")):Je("",!0)],4),m("label",gL,[m("input",{type:"file",accept:"image/*",onChange:Ue},null,32),R[26]||(R[26]=m("strong",null,"Upload thumbnail",-1)),R[27]||(R[27]=m("small",null,"JPG/PNG/WebP, dùng làm ảnh card khi publish.",-1))])])])):Je("",!0),h.type==="location"||h.type==="create_location"?(j(),Z("div",_L,[m("label",null,[R[29]||(R[29]=it(" Latitude ",-1)),Ke(m("input",{"onUpdate:modelValue":R[6]||(R[6]=k=>h.latitude=k),type:"number",step:"0.000001",placeholder:"VD: 21.402514"},null,512),[[lt,h.latitude]])]),m("label",null,[R[30]||(R[30]=it(" Longitude ",-1)),Ke(m("input",{"onUpdate:modelValue":R[7]||(R[7]=k=>h.longitude=k),type:"number",step:"0.000001",placeholder:"VD: 105.807476"},null,512),[[lt,h.longitude]])])])):Je("",!0),m("label",vL,[Ke(m("input",{"onUpdate:modelValue":R[8]||(R[8]=k=>h.is_active=k),type:"checkbox"},null,512),[[Jc,h.is_active]]),R[31]||(R[31]=it(" Active ",-1))]),m("div",{class:"actions-row"},[R[32]||(R[32]=m("button",{class:"primary-button",type:"submit"},"Save",-1)),m("button",{class:"secondary-button",type:"button",onClick:$},"Cancel")])],32)])])):Je("",!0)]))}};function bL(t){return dt.get(`/api/locations/${t}/publish/`)}function yL(t,e){return dt.post(`/api/locations/${t}/publish/`,e)}function SL(t,e){return dt.patch(`/api/locations/${t}/publish/`,e)}function ML(t){return dt.post(`/api/locations/${t}/publish/regenerate-token/`)}function EL(t){return dt.delete(`/api/locations/${t}/publish/`)}function wL(t){return dt.get(`/api/locations/${t}/publish/domains/`)}function TL(t,e){return dt.post(`/api/locations/${t}/publish/domains/`,e)}function AL(t,e,n){return dt.patch(`/api/locations/${t}/publish/domains/${e}/`,n)}function RL(t,e){return dt.delete(`/api/locations/${t}/publish/domains/${e}/`)}const CL={class:"page"},PL={key:0,class:"error-message"},LL={class:"panel selector-grid publish-selector-grid"},DL=["value"],IL=["value"],NL=["value"],UL={class:"two-column"},OL={class:"panel"},FL={class:"json-preview"},BL={class:"panel"},kL={class:"activity-list"},VL={class:"actions-row"},HL=["onClick"],zL=["onClick"],GL={key:0,class:"muted"},WL={__name:"PublishingView",setup(t){const e=Me([]),n=Me([]),i=Me([]),r=Me([]),s=Me(null),o=Me(""),a=Me(""),l=Me(""),u=Me(""),c=Zt({domain:"localhost:5173",label:"Local fronnamed"});function f(F){return Array.isArray(F)?F:Array.isArray(F?.results)?F.results:Array.isArray(F?.data)?F.data:Array.isArray(F?.items)?F.items:[]}async function d(){const F=await Nr();e.value=f(F.data),!o.value&&e.value.length&&(o.value=e.value[0].id)}async function p(){if(!o.value)return;const F=await ar(o.value);n.value=f(F.data),!a.value&&n.value.length&&(a.value=n.value[0].id)}async function _(){if(!a.value)return;const F=await Ts(a.value);i.value=f(F.data),l.value=i.value[0]?.id||""}async function y(){if(!a.value)return;const F=await bL(a.value);s.value=F.data;const D=F.data?.publish_config?.published_version;D&&(l.value=D);const H=await wL(a.value);r.value=f(H.data)}async function g(){await _(),await y()}async function h(){a.value="",await p(),await g()}async function M(){u.value="";try{await yL(a.value,{published_version:l.value,is_active:!0}),await y()}catch(F){u.value=F.response?.data?.detail||"Publish none thimage cong."}}async function C(){const F=s.value?.publish_config;F&&(await SL(a.value,{is_active:!F.is_active}),await y())}async function b(){await ML(a.value),await y()}async function I(){window.confirm("Cancel publish location nay?")&&(await EL(a.value),await y())}async function w(){await TL(a.value,{domain:c.domain,label:c.label,is_active:!0}),await y()}async function B(F){await AL(a.value,F.id,{is_active:!F.is_active}),await y()}async function v(F){window.confirm(`Delete domain ${F.domain}?`)&&(await RL(a.value,F.id),await y())}async function S(){await d(),await p(),await g()}return jn(S),(F,D)=>(j(),Z("section",CL,[m("header",{class:"page-header"},[D[5]||(D[5]=m("div",null,[m("p",{class:"eyebrow"},"Publish"),m("h1",null,"Cấu hình tour public")],-1)),m("button",{class:"secondary-button",type:"button",onClick:g}," Refresh ")]),u.value?(j(),Z("p",PL,oe(u.value),1)):Je("",!0),m("section",LL,[m("label",null,[D[6]||(D[6]=it(" Project ",-1)),Ke(m("select",{"onUpdate:modelValue":D[0]||(D[0]=H=>o.value=H),onChange:h},[(j(!0),Z(tt,null,ct(e.value,H=>(j(),Z("option",{key:H.id,value:H.id},oe(H.name),9,DL))),128))],544),[[Wt,o.value]])]),m("label",null,[D[7]||(D[7]=it(" Location ",-1)),Ke(m("select",{"onUpdate:modelValue":D[1]||(D[1]=H=>a.value=H),onChange:g},[(j(!0),Z(tt,null,ct(n.value,H=>(j(),Z("option",{key:H.id,value:H.id},oe(H.name),9,IL))),128))],544),[[Wt,a.value]])]),m("label",null,[D[8]||(D[8]=it(" Version ",-1)),Ke(m("select",{"onUpdate:modelValue":D[2]||(D[2]=H=>l.value=H)},[(j(!0),Z(tt,null,ct(i.value,H=>(j(),Z("option",{key:H.id,value:H.id}," v"+oe(H.version_number)+" - "+oe(H.status),9,NL))),128))],512),[[Wt,l.value]])]),m("button",{class:"primary-button publish-button",type:"button",onClick:M}," Publish ")]),m("section",UL,[m("div",OL,[D[9]||(D[9]=m("h2",null,"Cấu hình export ban",-1)),m("pre",FL,oe(s.value||"Chưa có cấu hình publish."),1),m("div",{class:"actions-row publish-config-actions"},[m("button",{class:"secondary-button",type:"button",onClick:C}," Bật/tắt active "),m("button",{class:"secondary-button",type:"button",onClick:b}," Regenerate token "),m("button",{class:"danger-button",type:"button",onClick:I}," Cancel publish ")])]),m("div",BL,[D[11]||(D[11]=m("h2",null,"Domain cho phép",-1)),m("form",{class:"form",onSubmit:_t(w,["prevent"])},[Ke(m("input",{"onUpdate:modelValue":D[3]||(D[3]=H=>c.domain=H),placeholder:"localhost:5173"},null,512),[[lt,c.domain]]),Ke(m("input",{"onUpdate:modelValue":D[4]||(D[4]=H=>c.label=H),placeholder:"Label"},null,512),[[lt,c.label]]),D[10]||(D[10]=m("button",{class:"primary-button",type:"submit"},"Add domain",-1))],32),m("ul",kL,[(j(!0),Z(tt,null,ct(r.value,H=>(j(),Z("li",{key:H.id},[m("strong",null,oe(H.domain),1),m("span",null,oe(H.label)+" - "+oe(H.is_active?"Active":"Inactive"),1),m("div",VL,[m("button",{class:"secondary-button",type:"button",onClick:ee=>B(H)}," Bật/tắt ",8,HL),m("button",{class:"danger-button",type:"button",onClick:ee=>v(H)}," Delete ",8,zL)])]))),128)),r.value.length?Je("",!0):(j(),Z("li",GL," Chưa có domain whitelist. "))])])])]))}};function $L(t,e={}){return dt.get(`/api/locations/${t}/stats/summary/`,{params:e})}function XL(t,e={}){return dt.get(`/api/locations/${t}/stats/timeseries/`,{params:e})}function qL(t,e={}){return dt.get(`/api/locations/${t}/stats/by-country/`,{params:e})}function YL(t,e={}){return dt.get(`/api/locations/${t}/stats/by-device/`,{params:e})}function KL(t,e={}){return dt.get(`/api/locations/${t}/stats/by-referrer/`,{params:e})}const jL={class:"page analytics-dashboard-page"},ZL={class:"page-header analytics-dashboard-header"},JL=["disabled"],QL={class:"panel analytics-filter-panel"},eD=["value"],tD=["value"],nD={class:"period-toggle","aria-label":"Choose time range"},iD=["onClick"],rD={key:0,class:"builder-alert error"},sD={class:"analytics-metric-row"},oD={class:"analytics-metric-card primary"},aD={class:"analytics-metric-card"},lD={class:"analytics-metric-card"},uD={class:"analytics-main-grid"},cD={class:"panel analytics-chart-card"},fD={class:"panel-title-row"},dD={class:"chart-subtitle"},hD={class:"chart-badge"},pD={key:0,class:"analytics-chart large"},mD=["viewBox"],gD=["x2","y1","y2"],_D=["x","y","width","height"],vD=["points"],xD=["cx","cy"],bD=["x","y"],yD={key:1,class:"empty-state"},SD={class:"panel analytics-donut-card"},MD={class:"panel-title-row"},ED={class:"chart-badge"},wD={class:"donut-wrap"},TD={class:"breakdown-list"},AD={class:"analytics-table-grid"},RD={class:"panel"},CD={class:"breakdown-list roomy"},PD={class:"panel"},LD={class:"analytics-referrer-table"},Mu=1e3,da=300,Zi=42,DD={__name:"StatsView",setup(t){const e=new Date().getFullYear(),n=Me([]),i=Me([]),r=Me(""),s=Me(""),o=Me(null),a=Me([]),l=Me([]),u=Me([]),c=Me([]),f=Me(!1),d=Me(""),p=Zt({from:`${e}-01-01`,to:`${e}-12-31`,granularity:"month"}),_=[{label:"Tuan",value:"week",hint:"7 ngay"},{label:"Thang",value:"month",hint:"Theo thang"},{label:"Nam",value:"year",hint:"Theo nam"}],y=["#4f63ff","#8b5cf6","#ec4899","#f59e0b","#10b981","#0ea5e9"],g=Mu-Zi*2,h=da-Zi*2,M=st(()=>Number(o.value?.total_visits||0)),C=st(()=>Number(o.value?.unique_visitors||0)),b=st(()=>a.value.length?Math.round(M.value/a.value.length*10)/10:0),I=st(()=>Math.max(1,...a.value.map(Le=>Number(Le.total_visits||0)))),w=st(()=>{const Le=Math.max(1,a.value.length),De=g/Le,ye=Math.max(10,Math.min(44,De*.5));return a.value.map((ie,W)=>{const ae=Number(ie.total_visits||0),ve=ae/I.value*h;return{...ie,visits:ae,label:J(ie.period),x:Zi+W*De+(De-ye)/2,y:da-Zi-ve,width:ye,height:ve}})}),B=st(()=>{if(!w.value.length)return[];const Le=p.granularity==="year"?w.value.length:7,De=Math.max(1,Math.ceil(w.value.length/Le));return w.value.filter((ye,ie)=>ie%De===0||ie===w.value.length-1)}),v=st(()=>w.value.map(Le=>`${Le.x+Le.width/2},${Le.y}`).join(" ")),S=st(()=>u.value.reduce((Le,De)=>Le+Number(De.count||0),0)),F=st(()=>{if(!S.value)return{background:"#eef2ff"};let Le=0;return{background:`conic-gradient(${u.value.slice(0,6).map((ye,ie)=>{const W=Le;return Le+=Number(ye.count||0)/S.value*100,`${y[ie%y.length]} ${W}% ${Le}%`}).join(", ")})`}}),D=st(()=>l.value.slice(0,5)),H=st(()=>u.value.slice(0,5)),ee=st(()=>c.value.slice(0,6));function X(Le){return Array.isArray(Le)?Le:Array.isArray(Le?.results)?Le.results:Array.isArray(Le?.data)?Le.data:Array.isArray(Le?.items)?Le.items:[]}function J(Le){if(!Le)return"";const De=String(Le);return p.granularity==="year"?De.slice(0,4):p.granularity==="month"?De.slice(0,7):De.slice(0,10)}function le(Le,De){return De?Math.round(Number(Le||0)/De*100):0}async function L(){const Le=await Nr();n.value=X(Le.data),!r.value&&n.value.length&&(r.value=n.value[0].id)}async function $(){if(!r.value)return;const Le=await ar(r.value);i.value=X(Le.data),!s.value&&i.value.length&&(s.value=i.value[0].id)}async function ge(){if(s.value){f.value=!0,d.value="";try{const Le={from:p.from,to:p.to},[De,ye,ie,W,ae]=await Promise.all([$L(s.value,Le),XL(s.value,{...Le,granularity:p.granularity}),qL(s.value,Le),YL(s.value,Le),KL(s.value,Le)]);o.value=De.data,a.value=ye.data.results||[],l.value=ie.data.results||[],u.value=W.data.results||[],c.value=ae.data.results||[]}catch(Le){d.value=Le.response?.data?.detail||"Could not load du lieu stats."}finally{f.value=!1}}}async function Ue(){s.value="",i.value=[],await $(),await ge()}async function Pe(Le){p.granularity=Le,await ge()}async function ke(){await L(),await $(),await ge()}return jn(ke),(Le,De)=>(j(),Z("section",jL,[m("header",ZL,[De[4]||(De[4]=m("div",null,[m("p",{class:"eyebrow"},"Stats"),m("h1",null,"Stats location"),m("span",{class:"analytics-subtitle"},"Theo dõi lượt truy cập, thiết bị và nguồn giới thiệu của tour VR360.")],-1)),m("button",{class:"secondary-button",type:"button",disabled:f.value,onClick:ge},oe(f.value?"Loading...":"Refresh"),9,JL)]),m("section",QL,[m("label",null,[De[5]||(De[5]=it(" Project ",-1)),Ke(m("select",{"onUpdate:modelValue":De[0]||(De[0]=ye=>r.value=ye),onChange:Ue},[(j(!0),Z(tt,null,ct(n.value,ye=>(j(),Z("option",{key:ye.id,value:ye.id},oe(ye.name),9,eD))),128))],544),[[Wt,r.value]])]),m("label",null,[De[6]||(De[6]=it(" Location ",-1)),Ke(m("select",{"onUpdate:modelValue":De[1]||(De[1]=ye=>s.value=ye),onChange:ge},[(j(!0),Z(tt,null,ct(i.value,ye=>(j(),Z("option",{key:ye.id,value:ye.id},oe(ye.name),9,tD))),128))],544),[[Wt,s.value]])]),m("label",null,[De[7]||(De[7]=it(" Từ ngày ",-1)),Ke(m("input",{"onUpdate:modelValue":De[2]||(De[2]=ye=>p.from=ye),type:"date",onChange:ge},null,544),[[lt,p.from]])]),m("label",null,[De[8]||(De[8]=it(" Đến ngày ",-1)),Ke(m("input",{"onUpdate:modelValue":De[3]||(De[3]=ye=>p.to=ye),type:"date",onChange:ge},null,544),[[lt,p.to]])]),m("div",nD,[(j(),Z(tt,null,ct(_,ye=>m("button",{key:ye.value,type:"button",class:$t({active:p.granularity===ye.value}),onClick:ie=>Pe(ye.value)},[m("strong",null,oe(ye.label),1),m("small",null,oe(ye.hint),1)],10,iD)),64))])]),d.value?(j(),Z("p",rD,oe(d.value),1)):Je("",!0),m("section",sD,[m("article",oD,[De[9]||(De[9]=m("span",null,"Tổng lượt truy cập",-1)),m("strong",null,oe(M.value),1),m("small",null,oe(p.from)+" → "+oe(p.to),1)]),m("article",aD,[De[10]||(De[10]=m("span",null,"Khách duy nhất ",-1)),m("strong",null,oe(C.value),1),De[11]||(De[11]=m("small",null,"Unique visitor",-1))]),m("article",lD,[De[12]||(De[12]=m("span",null,"Trung bình / kỳ",-1)),m("strong",null,oe(b.value),1),m("small",null,oe(p.granularity),1)])]),m("section",uD,[m("article",cD,[m("div",fD,[m("div",null,[De[13]||(De[13]=m("h2",null,"Biểu đồ truy cập",-1)),m("p",dD," Lượt truy cập theo "+oe(_.find(ye=>ye.value===p.granularity)?.label.toLowerCase()),1)]),m("span",hD,"Cao nhất "+oe(I.value),1)]),a.value.length?(j(),Z("div",pD,[(j(),Z("svg",{viewBox:`0 0 ${Mu} ${da}`,preserveAspectRatio:"none",role:"img","aria-label":"Bieu do luot truy cap"},[(j(),Z(tt,null,ct(5,ye=>m("line",{key:ye,x1:Zi,x2:Mu-Zi,y1:Zi+(ye-1)*h/4,y2:Zi+(ye-1)*h/4,class:"chart-grid-line"},null,8,gD)),64)),(j(!0),Z(tt,null,ct(w.value,ye=>(j(),Z("rect",{key:ye.period,class:"chart-bar",x:ye.x,y:ye.y,width:ye.width,height:ye.height,rx:"8"},[m("title",null,oe(ye.label)+": "+oe(ye.visits)+" luot",1)],8,_D))),128)),w.value.length>1?(j(),Z("polyline",{key:0,class:"chart-line",points:v.value},null,8,vD)):Je("",!0),(j(!0),Z(tt,null,ct(w.value,ye=>(j(),Z("circle",{key:`${ye.period}-point`,class:"chart-point",cx:ye.x+ye.width/2,cy:ye.y,r:"4"},null,8,xD))),128)),(j(!0),Z(tt,null,ct(B.value,ye=>(j(),Z("text",{key:ye.period,class:"chart-label",x:ye.x+ye.width/2,y:da-10,"text-anchor":"middle"},oe(ye.label),9,bD))),128))],8,mD))])):(j(),Z("p",yD," Chua co du lieu truy cap trong khoang thoi gian nay. "))]),m("article",SD,[m("div",MD,[De[14]||(De[14]=m("h2",null,"Thiết bị truy cập",-1)),m("span",ED,oe(S.value),1)]),m("div",wD,[m("div",{class:"donut-chart",style:Bt(F.value)},[m("span",null,oe(S.value),1)],4)]),m("ul",TD,[(j(!0),Z(tt,null,ct(H.value,(ye,ie)=>(j(),Z("li",{key:ye.key},[m("i",{style:Bt({background:y[ie%y.length]})},null,4),m("strong",null,oe(ye.key),1),m("span",null,oe(ye.count)+" · "+oe(le(ye.count,S.value))+"%",1)]))),128))])])]),m("section",AD,[m("article",RD,[De[15]||(De[15]=m("h2",null,"Quốc gia",-1)),m("ul",CD,[(j(!0),Z(tt,null,ct(D.value,(ye,ie)=>(j(),Z("li",{key:ye.key},[m("i",{style:Bt({background:y[ie%y.length]})},null,4),m("strong",null,oe(ye.key),1),m("span",null,oe(ye.count)+" luot",1)]))),128))])]),m("article",PD,[De[16]||(De[16]=m("h2",null,"Nguồn giới thiệu",-1)),m("ul",LD,[(j(!0),Z(tt,null,ct(ee.value,ye=>(j(),Z("li",{key:ye.key},[m("strong",null,oe(ye.key),1),m("span",null,oe(ye.count),1),m("em",null,oe(ye.unique_visitors)+" unique",1)]))),128))])])])]))}},ID={class:"viewer-topbar"},ND={class:"viewer-selects"},UD=["value"],OD=["value"],FD=["value"],BD={class:"viewer-scene-badge"},kD={key:0,class:"viewer-error"},VD={class:"viewer-transition-card"},HD=["title"],zD={key:2,class:"viewer-point-card"},GD={class:"viewer-info-modal"},WD={key:0,class:"viewer-info-media"},$D=["src"],XD=["src"],qD={class:"viewer-sidebar-header"},YD={class:"viewer-sidebar-body"},KD=["onClick"],jD={class:"viewer-left-toolbar"},ZD={class:"viewer-bottom-bar"},JD=["onClick"],Yh={__name:"TourViewerView",setup(t){const e=tf(),n=Ls(),i=Ns(),r=Me([]),s=Me([]),o=Me([]),a=Me([]),l=Me(""),u=Me(""),c=Me(""),f=Me(null),d=Me([]),p=Me(null),_=Me(""),y=Me(!1),g=Me(!0),h=Me(""),M=Me(null),C=Me(!1),b=Me(""),I=Me(!1),w=Me(!1),B=Me(!1),v=Me(null),S=Zt({lon:0,lat:0,fov:75});let F=null,D=null,H=null;const ee=st(()=>d.value.find(V=>V.id===_.value)||null),X=st(()=>!i.isAuthenticated||i.isGuest),J=st(()=>d.value.findIndex(V=>V.id===_.value)),le=st(()=>ee.value?.view||ee.value?.initialView||{lon:0,lat:0,fov:75}),L=st(()=>De(ee.value)),$=st(()=>ye(ee.value)),ge=st(()=>Le(f.value?.background_audio||"")),Ue=st(()=>Le(f.value?.hotspot_point_logo||"")),Pe=st(()=>{const V=ee.value;return V?(V.hotspots||[]).map(z=>{const G=d.value.find(Oe=>Oe.id===z.target_scene_id);return{...z,preview_image:["info","info_area"].includes(z.type)&&Le(z.info?.image_url||z.image_url||"")||De(G||V),audio_url:Le(z.audio_url||z.audio||""),info:{title:z.info?.title||z.info_title||z.label||"",description:z.info?.description||z.info_description||z.description||"",image_url:Le(z.info?.image_url||z.info_image_url||z.image_url||""),video_url:Le(z.info?.video_url||z.info_video_url||z.video_url||""),youtube_url:z.info?.youtube_url||z.info_youtube_url||z.youtube_url||""}}}):[]});function ke(V){return Array.isArray(V)?V:Array.isArray(V?.results)?V.results:Array.isArray(V?.data)?V.data:Array.isArray(V?.items)?V.items:[]}function Le(V){return V?V.startsWith("blob:")||V.startsWith("data:")||V.startsWith("http")?V:`${Lo}${V.startsWith("/")?V:`/${V}`}`:""}function De(V){return V&&ye(V)[0]||""}function ye(V){return V?[V.original_file,V.image_url,V.optimized_file,V.preview_file,V.thumbnail_file,V.thumbnail,V.thumb,V.panorama].map(Le).filter(Boolean).filter((z,G,Oe)=>Oe.indexOf(z)===G):[]}function ie(V){if(!V)return"";const z=String(V).trim(),Oe=[/youtube\.com\/watch\?v=([^&]+)/i,/youtu\.be\/([^?&]+)/i,/youtube\.com\/embed\/([^?&/]+)/i,/youtube\.com\/shorts\/([^?&/]+)/i].map(Se=>z.match(Se)).find(Boolean);return Oe?.[1]?`https://www.youtube.com/embed/${Oe[1]}`:""}function W(V){return new Promise(z=>{window.setTimeout(z,V)})}function ae(V){return V?new Promise(z=>{const G=new Image;G.onload=z,G.onerror=z,G.src=V}):Promise.resolve()}function ve(V){if(V)try{V.pause(),V.currentTime=0,V.removeAttribute("src"),V.load()}catch{}}function Te(){ve(F),F=null}function Fe(){ve(H),H=null,B.value=!1}function T(){ve(D),D=null,I.value=!1,w.value=!1}function R(){Te(),Fe(),T()}function k(V,z=0){return{id:String(V.id||V.key||V.scene_key||`scene-${z+1}`),name:V.name||V.title||`Scene ${z+1}`,group:V.group||"Default",description:V.description||V.info||"",audio_url:V.audio_url||V.audio||V.entry_audio_url||V.narration_audio||"",image_url:V.image_url||"",optimized_file:V.optimized_file||"",preview_file:V.preview_file||"",original_file:V.original_file||"",thumbnail:V.thumbnail||V.thumb||V.thumbnail_file||V.preview_file||V.optimized_file||V.original_file||V.image_url||"",thumbnail_file:V.thumbnail_file||"",view:{lon:Number(V.view?.lon??V.initialView?.lon??V.lon??0),lat:Number(V.view?.lat??V.initialView?.lat??V.lat??0),fov:Number(V.view?.fov??V.initialView?.fov??V.fov??75)},hotspots:(V.hotspots||[]).map((G,Oe)=>({id:String(G.id||`hotspot-${z+1}-${Oe+1}`),label:G.label||G.title||`Hotspot ${Oe+1}`,type:["nav","point","info","info_area"].includes(G.type)?G.type:G.type==="navigate"?"nav":"point",target_scene_id:String(G.target_scene_id||G.target||G.scene_id||""),lon:Number(G.lon??0),lat:Number(G.lat??0),x:Number(G.x??50),y:Number(G.y??50),audio_url:G.audio_url||G.audio||"",area_points:Array.isArray(G.area_points)?G.area_points.map(Se=>({lon:Number(Se.lon??0),lat:Number(Se.lat??0),x:Number(Se.x??50),y:Number(Se.y??50)})):[],info:{title:G.info?.title||G.info_title||"",description:G.info?.description||G.info_description||G.description||"",image_url:G.info?.image_url||G.info_image_url||G.image_url||"",video_url:G.info?.video_url||G.info_video_url||G.video_url||"",youtube_url:G.info?.youtube_url||G.info_youtube_url||G.youtube_url||""},glow:G.glow??G.style?.glow??!0}))}}function re(V){const z=V?.TOUR_DATA||V?.tour_data||V?.data||V||{},G=z.scenes||z.SCENES||[];return Array.isArray(G)?G.map(k):[]}function Q(V){R(),f.value=V.version||V,d.value=re(V.data||V),_.value=d.value[0]?.id||"",v.value=null}function ue(V){if(!V)return"";const z=V.audio_url||V.audio||V.entry_audio_url||V.narration_audio||"";if(z)return Le(z);const G=(V.hotspots||[]).find(Oe=>Oe.audio_url||Oe.audio);return G?Le(G.audio_url||G.audio):""}async function Ae(){if(!ge.value){T();return}(!D||D.src!==ge.value)&&(T(),D=new Audio(ge.value),D.loop=!0,D.volume=.55);try{await D.play(),I.value=!0,w.value=!1}catch{I.value=!1,w.value=!0}}function Ee(){if(ge.value){if(D&&!D.paused){D.pause(),I.value=!1,w.value=!1;return}Ae()}}function Re(V){V?.target?.closest?.(".viewer-background-audio")||(w.value&&ge.value&&Ae(),B.value&&_e())}function Y(V,z){const G=new Map;return V.forEach(Oe=>{const Se=z(Oe);Se&&!G.has(Se)&&G.set(Se,Oe)}),Array.from(G.values())}async function be(){if(a.value.length)return a.value;const V=await jm();return a.value=ke(V.data),a.value}function N(V=null){const z=a.value;r.value=Y(z.map(G=>({id:G.project_id,name:G.project_name})),G=>G.id),V&&(l.value=V.project_id),!l.value&&r.value.length&&(l.value=r.value[0].id),s.value=Y(z.filter(G=>Number(G.project_id)===Number(l.value)).map(G=>({id:G.location_id,name:G.location_name})),G=>G.id),V&&(u.value=V.location_id),s.value.some(G=>Number(G.id)===Number(u.value))||(u.value=s.value[0]?.id||""),o.value=z.filter(G=>Number(G.location_id)===Number(u.value)).map(G=>({id:G.version_id,version_number:G.version_number,label:G.version_label,status:"published",public_token:G.public_token})),V&&(c.value=V.version_id),o.value.some(G=>Number(G.id)===Number(c.value))||(c.value=o.value[0]?.id||"")}async function Ie(){await be(),N();const V=a.value.find(z=>Number(z.project_id)===Number(l.value)&&Number(z.location_id)===Number(u.value)&&Number(z.version_id)===Number(c.value))||a.value.find(z=>Number(z.version_id)===Number(c.value));if(!V){h.value="No published tour selected.",d.value=[];return}N(V),await ne(V.public_token)}async function we(){const V=await Nr();r.value=ke(V.data);const z=Number(e.query.project||0);z&&r.value.some(G=>G.id===z)&&(l.value=z),!l.value&&r.value.length&&(l.value=r.value[0].id)}async function U(){if(!l.value)return;const V=await ar(l.value);s.value=ke(V.data);const z=Number(e.query.location||0);z&&s.value.some(G=>G.id===z)&&(u.value=z),!u.value&&s.value.length&&(u.value=s.value[0].id)}async function x(){if(!u.value)return;const V=await Ts(u.value);o.value=ke(V.data);const z=Number(e.query.version||0);if(z&&o.value.some(Oe=>Oe.id===z)){c.value=z;return}const G=o.value.find(Oe=>Oe.status==="published");c.value=G?.id||o.value[0]?.id||""}async function q(){if(!(!u.value||!c.value)){if(X.value){await Ie();return}h.value="",R();try{const V=await Oc(u.value,c.value);Q(V.data),await _e(),await Ae()}catch(V){h.value=V.response?.data?.detail||"Could not load version."}}}async function ne(V){if(!V)return!1;R();const z=await Vg(V);return Q(z.data),await _e(),await Ae(),!0}async function de(){const V=await be(),z=Number(e.query.project||0),G=Number(e.query.location||0),Oe=Number(e.query.version||0),Se=String(e.params.token||e.query.token||e.query.public_token||""),Qe=Se?V.find(Ye=>Ye.public_token===Se):V.find(Ye=>(!z||Number(Ye.project_id)===z)&&(!G||Number(Ye.location_id)===G)&&(!Oe||Number(Ye.version_id)===Oe));if(!Qe)throw new Error("No published tour matches this URL.");N(Qe),await ne(Qe.public_token)}async function Ne(){if(R(),M.value=null,v.value=null,X.value){u.value="",c.value="",d.value=[],N(),await Ie();return}u.value="",c.value="",s.value=[],o.value=[],d.value=[],await U(),await x(),await q()}async function Ve(){if(R(),M.value=null,v.value=null,X.value){c.value="",d.value=[],N(),await Ie();return}c.value="",o.value=[],d.value=[],await x(),await q()}async function _e(){Fe();const V=ue(ee.value);if(!V){B.value=!1;return}H=new Audio(V);try{await H.play(),B.value=!1}catch{B.value=!0}}async function xe(V,z={}){if(!V||C.value)return;const G=d.value.find(Ye=>Ye.id===V);if(!G||V===_.value&&!z.force)return;C.value=!0,b.value=G.name||"Loading scene",M.value=null,v.value=null,Te(),Fe();const Se=De(G),Qe=z.targetView||G.view||G.initialView||{lon:0,lat:0,fov:75};try{await ae(Se),_.value=V,y.value=!1,await Cs(),await p.value?.animateToView?.(Qe,180),await _e()}finally{await W(80),C.value=!1,b.value=""}}function Be(){if(!d.value.length)return;const V=(J.value+1)%d.value.length;xe(d.value[V].id)}function Ge(){if(!d.value.length)return;const V=(J.value-1+d.value.length)%d.value.length;xe(d.value[V].id)}function ze(){if(d.value.length<=1)return"";const V=J.value>=0?J.value:0;return d.value[(V+1)%d.value.length]?.id||""}function He(V){const z=Le(V.audio_url||V.audio||"");z&&(Te(),F=new Audio(z),F.play().catch(()=>{}))}async function nt(V){if(C.value)return;if(h.value="",M.value=null,v.value=null,["info","info_area"].includes(V.type)){v.value=V,He(V);return}He(V);const z=V.target_scene_id;if(z&&d.value.some(Oe=>Oe.id===z)){await xe(z,{targetView:V.target_view||V.view});return}if(!["nav","point"].includes(V.type))return;const G=ze();G&&await xe(G,{})}function rt(V){S.lon=V.lon,S.lat=V.lat,S.fov=V.fov}async function ot(){h.value="";const V=!!(e.params.token||e.query.token||e.query.public_token),z=!!(e.query.project||e.query.location||e.query.version);if(X.value){try{await de(),h.value=""}catch(G){h.value=G.response?.data?.detail||G.message||"Could not load published tour data."}return}if(V)try{if(await de(),h.value="",d.value.length)return}catch(G){h.value=G.response?.data?.detail||G.message||"Could not load published tour data."}if(!V||z)try{if(await we(),await U(),await x(),await q(),d.value.length||r.value.length)return}catch(G){h.value=G.response?.data?.detail||"Could not load private tour data."}if(!z)try{await de(),h.value=""}catch(G){h.value=G.response?.data?.detail||G.message||"Could not load published tour data."}}function K(){if(window.history.length>1){n.back();return}n.push("/")}return jn(ot),Ps(R),(V,z)=>(j(),Z("section",{class:"tour-viewer-page",onPointerdownCapture:Re},[m("div",ID,[m("button",{class:"viewer-icon-button",type:"button",onClick:K},"←"),m("button",{class:"viewer-icon-button",type:"button",onClick:z[0]||(z[0]=G=>y.value=!0)},"☰"),z[14]||(z[14]=m("div",{class:"viewer-brand"},"VR360 TOUR VIEWER",-1)),m("div",ND,[Ke(m("select",{"onUpdate:modelValue":z[1]||(z[1]=G=>l.value=G),onChange:Ne},[z[11]||(z[11]=m("option",{value:""},"Project",-1)),(j(!0),Z(tt,null,ct(r.value,G=>(j(),Z("option",{key:G.id,value:G.id},oe(G.name),9,UD))),128))],544),[[Wt,l.value]]),Ke(m("select",{"onUpdate:modelValue":z[2]||(z[2]=G=>u.value=G),onChange:Ve},[z[12]||(z[12]=m("option",{value:""},"Location",-1)),(j(!0),Z(tt,null,ct(s.value,G=>(j(),Z("option",{key:G.id,value:G.id},oe(G.name),9,OD))),128))],544),[[Wt,u.value]]),Ke(m("select",{"onUpdate:modelValue":z[3]||(z[3]=G=>c.value=G),onChange:q},[z[13]||(z[13]=m("option",{value:""},"Version",-1)),(j(!0),Z(tt,null,ct(o.value,G=>(j(),Z("option",{key:G.id,value:G.id},"v"+oe(G.version_number)+" - "+oe(G.status),9,FD))),128))],544),[[Wt,c.value]])])]),m("div",BD,oe(ee.value?.name||"Chua co scene"),1),h.value?(j(),Z("p",kD,oe(h.value),1)):Je("",!0),tn(Ef,{ref_key:"panoramaRef",ref:p,class:"tour-panorama","image-url":L.value,"fallback-image-urls":$.value,hotspots:Pe.value,"initial-view":le.value,"point-hotspot-logo":Ue.value,"auto-rotate":"","auto-rotate-delay":3e3,"auto-rotate-speed":3,"hotspot-display-mode":"viewer",onHotspotClick:nt,onViewChange:rt},null,8,["image-url","fallback-image-urls","hotspots","initial-view","point-hotspot-logo"]),m("div",{class:$t(["viewer-transition-overlay",{active:C.value}])},[m("div",VD,[z[15]||(z[15]=m("span",null,null,-1)),m("strong",null,oe(b.value||"Loading scene"),1)])],2),ge.value?(j(),Z("button",{key:1,class:"viewer-background-audio",type:"button",title:w.value?"Click to play background audio":"Toggle background audio",onClick:_t(Ee,["stop"])},[m("span",null,oe(I.value?"♪":"▶"),1),m("small",null,oe(w.value?"Click to play audio":"Music"),1)],8,HD)):Je("",!0),M.value?(j(),Z("div",zD,[m("button",{class:"viewer-point-close",type:"button",onClick:z[4]||(z[4]=G=>M.value=null)},"×"),M.value.preview_image?(j(),Z("span",{key:0,class:"viewer-point-card-image",style:Bt({backgroundImage:`url(${M.value.preview_image})`})},null,4)):Je("",!0),m("div",null,[z[16]||(z[16]=m("small",null,"POINT",-1)),m("strong",null,oe(M.value.label||"Hotspot"),1),m("p",null,oe(ee.value?.description||"Point info trong tour 360."),1)])])):Je("",!0),v.value?(j(),Z("div",{key:3,class:"viewer-info-modal-backdrop",onClick:z[6]||(z[6]=_t(G=>v.value=null,["self"]))},[m("article",GD,[m("button",{class:"viewer-info-close",type:"button",onClick:z[5]||(z[5]=G=>v.value=null)},"×"),ie(v.value.info?.youtube_url)?(j(),Z("div",WD,[m("iframe",{src:ie(v.value.info.youtube_url),title:"YouTube video",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:""},null,8,$D)])):v.value.info?.video_url?(j(),Z("video",{key:1,class:"viewer-info-video",src:v.value.info.video_url,controls:"",playsinline:""},null,8,XD)):v.value.info?.image_url?(j(),Z("span",{key:2,class:"viewer-info-image",style:Bt({backgroundImage:`url(${v.value.info.image_url})`})},null,4)):Je("",!0),z[17]||(z[17]=m("small",null,"INFO HOTSPOT",-1)),m("h2",null,oe(v.value.info?.title||v.value.label||"Information"),1),m("p",null,oe(v.value.info?.description||v.value.description||"No information has been added for this hotspot yet."),1)])])):Je("",!0),m("aside",{class:$t(["viewer-sidebar",{open:y.value}])},[m("div",qD,[m("strong",null,oe(f.value?.label||"Tour scenes"),1),m("button",{type:"button",onClick:z[7]||(z[7]=G=>y.value=!1)},"×")]),m("div",YD,[(j(!0),Z(tt,null,ct(d.value,G=>(j(),Z("div",{key:G.id,class:$t(["viewer-nav-item",{active:G.id===_.value}]),onClick:Oe=>xe(G.id)},[m("span",{class:"viewer-nav-thumb",style:Bt(De(G)?{backgroundImage:`url(${De(G)})`}:{})},null,4),m("span",null,[m("strong",null,oe(G.name),1),m("small",null,oe(G.group),1)])],10,KD))),128))])],2),m("div",jD,[m("button",{type:"button",title:"Scenes",onClick:z[8]||(z[8]=G=>y.value=!0)},"☰"),m("button",{type:"button",title:"Thumbnails",onClick:z[9]||(z[9]=G=>g.value=!g.value)},"▦"),m("button",{type:"button",title:"Fullscreen",onClick:z[10]||(z[10]=G=>V.document.documentElement.requestFullscreen?.())},"⛶")]),m("div",ZD,[m("button",{type:"button",onClick:Ge},"‹"),m("button",{type:"button",onClick:Be},"›"),m("span",null,"LON "+oe(S.lon)+"°",1),m("span",null,"LAT "+oe(S.lat)+"°",1),m("span",null,"FOV "+oe(S.fov)+"°",1)]),m("div",{class:$t(["viewer-thumbs",{show:g.value&&d.value.length}])},[(j(!0),Z(tt,null,ct(d.value,G=>(j(),Z("button",{key:G.id,class:$t(["viewer-thumb-item",{active:G.id===_.value}]),type:"button",onClick:Oe=>xe(G.id)},[m("span",{style:Bt(De(G)?{backgroundImage:`url(${De(G)})`}:{})},null,4),m("small",null,oe(G.name),1)],10,JD))),128))],2)],32))}},QD={class:"page"},e3={key:0,class:"error-message"},t3={key:1,class:"success-message"},n3={class:"panel selector-grid"},i3=["value"],r3=["value"],s3={class:"panel"},o3={class:"actions-row"},a3={class:"primary-button",type:"submit"},l3={class:"two-column"},u3={class:"panel"},c3={class:"table-wrap"},f3={class:"actions-cell"},d3=["onClick"],h3=["onClick"],p3=["onClick"],m3=["onClick"],g3={key:0},_3={class:"panel"},v3={class:"json-preview"},x3={__name:"VersionsView",setup(t){const e=Me([]),n=Me([]),i=Me([]),r=Me(null),s=Me(""),o=Me(""),a=Me(""),l=Me(""),u=Zt({id:null,label:"",changelog:"",dataText:`{
  "scenes": [
    {"id": "scene-1", "name": "Scene 1", "hotspots": []}
  ]
}`});function c(w){return Array.isArray(w)?w:Array.isArray(w?.results)?w.results:Array.isArray(w?.data)?w.data:Array.isArray(w?.items)?w.items:[]}async function f(){const w=await Nr();e.value=c(w.data),!s.value&&e.value.length&&(s.value=e.value[0].id)}async function d(){if(!s.value)return;const w=await ar(s.value);n.value=c(w.data),!o.value&&n.value.length&&(o.value=n.value[0].id)}async function p(){if(!o.value)return;const w=await Ts(o.value);i.value=c(w.data)}function _(w){u.id=w.id,u.label=w.label||"",u.changelog=w.changelog||"",u.dataText=JSON.stringify(w.data||{scenes:[]},null,2)}function y(){u.id=null,u.label="",u.changelog="",u.dataText=`{
  "scenes": [
    {"id": "scene-1", "name": "Scene 1", "hotspots": []}
  ]
}`}async function g(){a.value="",l.value="";try{const w={label:u.label,changelog:u.changelog,data:JSON.parse(u.dataText)};u.id?await Fc(o.value,u.id,w):await qa(o.value,w),y(),await p(),l.value="Version saved."}catch(w){a.value=w.response?.data?.detail||w.message||"Could not save version."}}async function h(w){const B=await dR(o.value,w.id);r.value=B.data}async function M(w){const B=await hR(o.value,w.id);await navigator.clipboard.writeText(JSON.stringify(B.data,null,2)),l.value="Copied JSON export to clipboard."}async function C(w){window.confirm(`Delete version v${w.version_number}?`)&&(await Fg(o.value,w.id),await p())}async function b(){o.value="",await d(),await p()}async function I(){await f(),await d(),await p()}return jn(I),(w,B)=>(j(),Z("section",QD,[m("header",{class:"page-header"},[B[5]||(B[5]=m("div",null,[m("p",{class:"eyebrow"},"Tour editor data"),m("h1",null,"Version tour")],-1)),m("button",{class:"secondary-button",type:"button",onClick:p},"Refresh")]),a.value?(j(),Z("p",e3,oe(a.value),1)):Je("",!0),l.value?(j(),Z("p",t3,oe(l.value),1)):Je("",!0),m("section",n3,[m("label",null,[B[6]||(B[6]=it(" Project ",-1)),Ke(m("select",{"onUpdate:modelValue":B[0]||(B[0]=v=>s.value=v),onChange:b},[(j(!0),Z(tt,null,ct(e.value,v=>(j(),Z("option",{key:v.id,value:v.id},oe(v.name),9,i3))),128))],544),[[Wt,s.value]])]),m("label",null,[B[7]||(B[7]=it(" Location ",-1)),Ke(m("select",{"onUpdate:modelValue":B[1]||(B[1]=v=>o.value=v),onChange:p},[(j(!0),Z(tt,null,ct(n.value,v=>(j(),Z("option",{key:v.id,value:v.id},oe(v.name),9,r3))),128))],544),[[Wt,o.value]])])]),m("section",s3,[m("h2",null,oe(u.id?"Edit draft version":"Create draft version"),1),m("form",{class:"form",onSubmit:_t(g,["prevent"])},[Ke(m("input",{"onUpdate:modelValue":B[2]||(B[2]=v=>u.label=v),placeholder:"Label"},null,512),[[lt,u.label]]),Ke(m("input",{"onUpdate:modelValue":B[3]||(B[3]=v=>u.changelog=v),placeholder:"Changelog"},null,512),[[lt,u.changelog]]),Ke(m("textarea",{"onUpdate:modelValue":B[4]||(B[4]=v=>u.dataText=v),rows:"10",spellcheck:"false"},null,512),[[lt,u.dataText]]),m("div",o3,[m("button",a3,oe(u.id?"Save version":"Create version"),1),m("button",{class:"secondary-button",type:"button",onClick:y},"Lam moi")])],32)]),m("section",l3,[m("div",u3,[B[10]||(B[10]=m("h2",null,"Version list",-1)),m("div",c3,[m("table",null,[B[9]||(B[9]=m("thead",null,[m("tr",null,[m("th",null,"Version"),m("th",null,"Label"),m("th",null,"Status"),m("th")])],-1)),m("tbody",null,[(j(!0),Z(tt,null,ct(i.value,v=>(j(),Z("tr",{key:v.id},[m("td",null,"v"+oe(v.version_number),1),m("td",null,oe(v.label),1),m("td",null,oe(v.status),1),m("td",f3,[m("button",{class:"secondary-button",type:"button",onClick:S=>h(v)},"Preview",8,d3),m("button",{class:"secondary-button",type:"button",onClick:S=>M(v)},"Export",8,h3),m("button",{class:"secondary-button",type:"button",onClick:S=>_(v)},"Edit",8,p3),m("button",{class:"danger-button",type:"button",onClick:S=>C(v)},"Delete",8,m3)])]))),128)),i.value.length?Je("",!0):(j(),Z("tr",g3,[...B[8]||(B[8]=[m("td",{colspan:"4"},"Chua co version.",-1)])]))])])])]),m("div",_3,[B[11]||(B[11]=m("h2",null,"Preview data",-1)),m("pre",v3,oe(r.value||"Choose Preview to view resolved tour data."),1)])])]))}},b3=[{path:"/login",name:"Login",component:fS,meta:{public:!0}},{path:"/",name:"Home",component:aS,meta:{public:!0}},{path:"/dashboard",name:"Dashboard",component:Hy,meta:{staffOnly:!0}},{path:"/projects",name:"Projects",component:xL,meta:{staffOnly:!0}},{path:"/locations",name:"Locations",component:hP,meta:{staffOnly:!0}},{path:"/versions",name:"Versions",component:x3,meta:{staffOnly:!0}},{path:"/builder",name:"Builder",component:ZC,meta:{immersive:!0,staffOnly:!0}},{path:"/viewer",name:"TourViewer",component:Yh,meta:{immersive:!0,public:!0}},{path:"/vr360/:token",name:"PublicTourViewer",component:Yh,meta:{immersive:!0,public:!0}},{path:"/publishing",name:"Publishing",component:WL,meta:{staffOnly:!0}},{path:"/stats",name:"Stats",component:DD,meta:{staffOnly:!0}},{path:"/public-viewer",name:"PublicViewer",component:AP,meta:{public:!0}}],Hg=xx({history:Q0(),routes:b3});Hg.beforeEach(t=>{const e=Ns();return!t.meta.public&&!e.isAuthenticated?"/login":t.path==="/login"&&e.isAuthenticated||t.meta.staffOnly&&e.isGuest?"/":!0});o0(xy).use(u0()).use(Hg).mount("#app");
