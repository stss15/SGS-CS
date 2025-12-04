(function(){const S=document.createElement("link").relList;if(S&&S.supports&&S.supports("modulepreload"))return;for(const O of document.querySelectorAll('link[rel="modulepreload"]'))u(O);new MutationObserver(O=>{for(const E of O)if(E.type==="childList")for(const A of E.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&u(A)}).observe(document,{childList:!0,subtree:!0});function _(O){const E={};return O.integrity&&(E.integrity=O.integrity),O.referrerPolicy&&(E.referrerPolicy=O.referrerPolicy),O.crossOrigin==="use-credentials"?E.credentials="include":O.crossOrigin==="anonymous"?E.credentials="omit":E.credentials="same-origin",E}function u(O){if(O.ep)return;O.ep=!0;const E=_(O);fetch(O.href,E)}})();function zf(y){return y&&y.__esModule&&Object.prototype.hasOwnProperty.call(y,"default")?y.default:y}var uo={exports:{}},wi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xf;function jm(){if(xf)return wi;xf=1;var y=Symbol.for("react.transitional.element"),S=Symbol.for("react.fragment");function _(u,O,E){var A=null;if(E!==void 0&&(A=""+E),O.key!==void 0&&(A=""+O.key),"key"in O){E={};for(var k in O)k!=="key"&&(E[k]=O[k])}else E=O;return O=E.ref,{$$typeof:y,type:u,key:A,ref:O!==void 0?O:null,props:E}}return wi.Fragment=S,wi.jsx=_,wi.jsxs=_,wi}var _f;function Dm(){return _f||(_f=1,uo.exports=jm()),uo.exports}var l=Dm(),fo={exports:{}},te={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sf;function Rm(){if(Sf)return te;Sf=1;var y=Symbol.for("react.transitional.element"),S=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),O=Symbol.for("react.profiler"),E=Symbol.for("react.consumer"),A=Symbol.for("react.context"),k=Symbol.for("react.forward_ref"),M=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),G=Symbol.iterator;function L(f){return f===null||typeof f!="object"?null:(f=G&&f[G]||f["@@iterator"],typeof f=="function"?f:null)}var Y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I=Object.assign,Z={};function ce(f,T,U){this.props=f,this.context=T,this.refs=Z,this.updater=U||Y}ce.prototype.isReactComponent={},ce.prototype.setState=function(f,T){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,T,"setState")},ce.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function V(){}V.prototype=ce.prototype;function J(f,T,U){this.props=f,this.context=T,this.refs=Z,this.updater=U||Y}var $=J.prototype=new V;$.constructor=J,I($,ce.prototype),$.isPureReactComponent=!0;var j=Array.isArray;function z(){}var H={H:null,A:null,T:null,S:null},xe=Object.prototype.hasOwnProperty;function ee(f,T,U){var F=U.ref;return{$$typeof:y,type:f,key:T,ref:F!==void 0?F:null,props:U}}function ue(f,T){return ee(f.type,T,f.props)}function Fe(f){return typeof f=="object"&&f!==null&&f.$$typeof===y}function De(f){var T={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(U){return T[U]})}var be=/\/+/g;function Oe(f,T){return typeof f=="object"&&f!==null&&f.key!=null?De(""+f.key):T.toString(36)}function ae(f){switch(f.status){case"fulfilled":return f.value;case"rejected":throw f.reason;default:switch(typeof f.status=="string"?f.then(z,z):(f.status="pending",f.then(function(T){f.status==="pending"&&(f.status="fulfilled",f.value=T)},function(T){f.status==="pending"&&(f.status="rejected",f.reason=T)})),f.status){case"fulfilled":return f.value;case"rejected":throw f.reason}}throw f}function x(f,T,U,F,ne){var le=typeof f;(le==="undefined"||le==="boolean")&&(f=null);var ve=!1;if(f===null)ve=!0;else switch(le){case"bigint":case"string":case"number":ve=!0;break;case"object":switch(f.$$typeof){case y:case S:ve=!0;break;case B:return ve=f._init,x(ve(f._payload),T,U,F,ne)}}if(ve)return ne=ne(f),ve=F===""?"."+Oe(f,0):F,j(ne)?(U="",ve!=null&&(U=ve.replace(be,"$&/")+"/"),x(ne,T,U,"",function(Mn){return Mn})):ne!=null&&(Fe(ne)&&(ne=ue(ne,U+(ne.key==null||f&&f.key===ne.key?"":(""+ne.key).replace(be,"$&/")+"/")+ve)),T.push(ne)),1;ve=0;var Pe=F===""?".":F+":";if(j(f))for(var Le=0;Le<f.length;Le++)F=f[Le],le=Pe+Oe(F,Le),ve+=x(F,T,U,le,ne);else if(Le=L(f),typeof Le=="function")for(f=Le.call(f),Le=0;!(F=f.next()).done;)F=F.value,le=Pe+Oe(F,Le++),ve+=x(F,T,U,le,ne);else if(le==="object"){if(typeof f.then=="function")return x(ae(f),T,U,F,ne);throw T=String(f),Error("Objects are not valid as a React child (found: "+(T==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":T)+"). If you meant to render a collection of children, use an array instead.")}return ve}function R(f,T,U){if(f==null)return f;var F=[],ne=0;return x(f,F,"","",function(le){return T.call(U,le,ne++)}),F}function K(f){if(f._status===-1){var T=f._result;T=T(),T.then(function(U){(f._status===0||f._status===-1)&&(f._status=1,f._result=U)},function(U){(f._status===0||f._status===-1)&&(f._status=2,f._result=U)}),f._status===-1&&(f._status=0,f._result=T)}if(f._status===1)return f._result.default;throw f._result}var pe=typeof reportError=="function"?reportError:function(f){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var T=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof f=="object"&&f!==null&&typeof f.message=="string"?String(f.message):String(f),error:f});if(!window.dispatchEvent(T))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",f);return}console.error(f)},_e={map:R,forEach:function(f,T,U){R(f,function(){T.apply(this,arguments)},U)},count:function(f){var T=0;return R(f,function(){T++}),T},toArray:function(f){return R(f,function(T){return T})||[]},only:function(f){if(!Fe(f))throw Error("React.Children.only expected to receive a single React element child.");return f}};return te.Activity=D,te.Children=_e,te.Component=ce,te.Fragment=_,te.Profiler=O,te.PureComponent=J,te.StrictMode=u,te.Suspense=M,te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=H,te.__COMPILER_RUNTIME={__proto__:null,c:function(f){return H.H.useMemoCache(f)}},te.cache=function(f){return function(){return f.apply(null,arguments)}},te.cacheSignal=function(){return null},te.cloneElement=function(f,T,U){if(f==null)throw Error("The argument must be a React element, but you passed "+f+".");var F=I({},f.props),ne=f.key;if(T!=null)for(le in T.key!==void 0&&(ne=""+T.key),T)!xe.call(T,le)||le==="key"||le==="__self"||le==="__source"||le==="ref"&&T.ref===void 0||(F[le]=T[le]);var le=arguments.length-2;if(le===1)F.children=U;else if(1<le){for(var ve=Array(le),Pe=0;Pe<le;Pe++)ve[Pe]=arguments[Pe+2];F.children=ve}return ee(f.type,ne,F)},te.createContext=function(f){return f={$$typeof:A,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null},f.Provider=f,f.Consumer={$$typeof:E,_context:f},f},te.createElement=function(f,T,U){var F,ne={},le=null;if(T!=null)for(F in T.key!==void 0&&(le=""+T.key),T)xe.call(T,F)&&F!=="key"&&F!=="__self"&&F!=="__source"&&(ne[F]=T[F]);var ve=arguments.length-2;if(ve===1)ne.children=U;else if(1<ve){for(var Pe=Array(ve),Le=0;Le<ve;Le++)Pe[Le]=arguments[Le+2];ne.children=Pe}if(f&&f.defaultProps)for(F in ve=f.defaultProps,ve)ne[F]===void 0&&(ne[F]=ve[F]);return ee(f,le,ne)},te.createRef=function(){return{current:null}},te.forwardRef=function(f){return{$$typeof:k,render:f}},te.isValidElement=Fe,te.lazy=function(f){return{$$typeof:B,_payload:{_status:-1,_result:f},_init:K}},te.memo=function(f,T){return{$$typeof:b,type:f,compare:T===void 0?null:T}},te.startTransition=function(f){var T=H.T,U={};H.T=U;try{var F=f(),ne=H.S;ne!==null&&ne(U,F),typeof F=="object"&&F!==null&&typeof F.then=="function"&&F.then(z,pe)}catch(le){pe(le)}finally{T!==null&&U.types!==null&&(T.types=U.types),H.T=T}},te.unstable_useCacheRefresh=function(){return H.H.useCacheRefresh()},te.use=function(f){return H.H.use(f)},te.useActionState=function(f,T,U){return H.H.useActionState(f,T,U)},te.useCallback=function(f,T){return H.H.useCallback(f,T)},te.useContext=function(f){return H.H.useContext(f)},te.useDebugValue=function(){},te.useDeferredValue=function(f,T){return H.H.useDeferredValue(f,T)},te.useEffect=function(f,T){return H.H.useEffect(f,T)},te.useEffectEvent=function(f){return H.H.useEffectEvent(f)},te.useId=function(){return H.H.useId()},te.useImperativeHandle=function(f,T,U){return H.H.useImperativeHandle(f,T,U)},te.useInsertionEffect=function(f,T){return H.H.useInsertionEffect(f,T)},te.useLayoutEffect=function(f,T){return H.H.useLayoutEffect(f,T)},te.useMemo=function(f,T){return H.H.useMemo(f,T)},te.useOptimistic=function(f,T){return H.H.useOptimistic(f,T)},te.useReducer=function(f,T,U){return H.H.useReducer(f,T,U)},te.useRef=function(f){return H.H.useRef(f)},te.useState=function(f){return H.H.useState(f)},te.useSyncExternalStore=function(f,T,U){return H.H.useSyncExternalStore(f,T,U)},te.useTransition=function(){return H.H.useTransition()},te.version="19.2.1",te}var wf;function yo(){return wf||(wf=1,fo.exports=Rm()),fo.exports}var P=yo();const zm=zf(P);var ho={exports:{}},Ci={},po={exports:{}},mo={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cf;function Lm(){return Cf||(Cf=1,(function(y){function S(x,R){var K=x.length;x.push(R);e:for(;0<K;){var pe=K-1>>>1,_e=x[pe];if(0<O(_e,R))x[pe]=R,x[K]=_e,K=pe;else break e}}function _(x){return x.length===0?null:x[0]}function u(x){if(x.length===0)return null;var R=x[0],K=x.pop();if(K!==R){x[0]=K;e:for(var pe=0,_e=x.length,f=_e>>>1;pe<f;){var T=2*(pe+1)-1,U=x[T],F=T+1,ne=x[F];if(0>O(U,K))F<_e&&0>O(ne,U)?(x[pe]=ne,x[F]=K,pe=F):(x[pe]=U,x[T]=K,pe=T);else if(F<_e&&0>O(ne,K))x[pe]=ne,x[F]=K,pe=F;else break e}}return R}function O(x,R){var K=x.sortIndex-R.sortIndex;return K!==0?K:x.id-R.id}if(y.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var E=performance;y.unstable_now=function(){return E.now()}}else{var A=Date,k=A.now();y.unstable_now=function(){return A.now()-k}}var M=[],b=[],B=1,D=null,G=3,L=!1,Y=!1,I=!1,Z=!1,ce=typeof setTimeout=="function"?setTimeout:null,V=typeof clearTimeout=="function"?clearTimeout:null,J=typeof setImmediate<"u"?setImmediate:null;function $(x){for(var R=_(b);R!==null;){if(R.callback===null)u(b);else if(R.startTime<=x)u(b),R.sortIndex=R.expirationTime,S(M,R);else break;R=_(b)}}function j(x){if(I=!1,$(x),!Y)if(_(M)!==null)Y=!0,z||(z=!0,De());else{var R=_(b);R!==null&&ae(j,R.startTime-x)}}var z=!1,H=-1,xe=5,ee=-1;function ue(){return Z?!0:!(y.unstable_now()-ee<xe)}function Fe(){if(Z=!1,z){var x=y.unstable_now();ee=x;var R=!0;try{e:{Y=!1,I&&(I=!1,V(H),H=-1),L=!0;var K=G;try{t:{for($(x),D=_(M);D!==null&&!(D.expirationTime>x&&ue());){var pe=D.callback;if(typeof pe=="function"){D.callback=null,G=D.priorityLevel;var _e=pe(D.expirationTime<=x);if(x=y.unstable_now(),typeof _e=="function"){D.callback=_e,$(x),R=!0;break t}D===_(M)&&u(M),$(x)}else u(M);D=_(M)}if(D!==null)R=!0;else{var f=_(b);f!==null&&ae(j,f.startTime-x),R=!1}}break e}finally{D=null,G=K,L=!1}R=void 0}}finally{R?De():z=!1}}}var De;if(typeof J=="function")De=function(){J(Fe)};else if(typeof MessageChannel<"u"){var be=new MessageChannel,Oe=be.port2;be.port1.onmessage=Fe,De=function(){Oe.postMessage(null)}}else De=function(){ce(Fe,0)};function ae(x,R){H=ce(function(){x(y.unstable_now())},R)}y.unstable_IdlePriority=5,y.unstable_ImmediatePriority=1,y.unstable_LowPriority=4,y.unstable_NormalPriority=3,y.unstable_Profiling=null,y.unstable_UserBlockingPriority=2,y.unstable_cancelCallback=function(x){x.callback=null},y.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):xe=0<x?Math.floor(1e3/x):5},y.unstable_getCurrentPriorityLevel=function(){return G},y.unstable_next=function(x){switch(G){case 1:case 2:case 3:var R=3;break;default:R=G}var K=G;G=R;try{return x()}finally{G=K}},y.unstable_requestPaint=function(){Z=!0},y.unstable_runWithPriority=function(x,R){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var K=G;G=x;try{return R()}finally{G=K}},y.unstable_scheduleCallback=function(x,R,K){var pe=y.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?pe+K:pe):K=pe,x){case 1:var _e=-1;break;case 2:_e=250;break;case 5:_e=1073741823;break;case 4:_e=1e4;break;default:_e=5e3}return _e=K+_e,x={id:B++,callback:R,priorityLevel:x,startTime:K,expirationTime:_e,sortIndex:-1},K>pe?(x.sortIndex=K,S(b,x),_(M)===null&&x===_(b)&&(I?(V(H),H=-1):I=!0,ae(j,K-pe))):(x.sortIndex=_e,S(M,x),Y||L||(Y=!0,z||(z=!0,De()))),x},y.unstable_shouldYield=ue,y.unstable_wrapCallback=function(x){var R=G;return function(){var K=G;G=R;try{return x.apply(this,arguments)}finally{G=K}}}})(mo)),mo}var Nf;function Um(){return Nf||(Nf=1,po.exports=Lm()),po.exports}var go={exports:{}},Je={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Tf;function Bm(){if(Tf)return Je;Tf=1;var y=yo();function S(M){var b="https://react.dev/errors/"+M;if(1<arguments.length){b+="?args[]="+encodeURIComponent(arguments[1]);for(var B=2;B<arguments.length;B++)b+="&args[]="+encodeURIComponent(arguments[B])}return"Minified React error #"+M+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function _(){}var u={d:{f:_,r:function(){throw Error(S(522))},D:_,C:_,L:_,m:_,X:_,S:_,M:_},p:0,findDOMNode:null},O=Symbol.for("react.portal");function E(M,b,B){var D=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:O,key:D==null?null:""+D,children:M,containerInfo:b,implementation:B}}var A=y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function k(M,b){if(M==="font")return"";if(typeof b=="string")return b==="use-credentials"?b:""}return Je.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,Je.createPortal=function(M,b){var B=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!b||b.nodeType!==1&&b.nodeType!==9&&b.nodeType!==11)throw Error(S(299));return E(M,b,null,B)},Je.flushSync=function(M){var b=A.T,B=u.p;try{if(A.T=null,u.p=2,M)return M()}finally{A.T=b,u.p=B,u.d.f()}},Je.preconnect=function(M,b){typeof M=="string"&&(b?(b=b.crossOrigin,b=typeof b=="string"?b==="use-credentials"?b:"":void 0):b=null,u.d.C(M,b))},Je.prefetchDNS=function(M){typeof M=="string"&&u.d.D(M)},Je.preinit=function(M,b){if(typeof M=="string"&&b&&typeof b.as=="string"){var B=b.as,D=k(B,b.crossOrigin),G=typeof b.integrity=="string"?b.integrity:void 0,L=typeof b.fetchPriority=="string"?b.fetchPriority:void 0;B==="style"?u.d.S(M,typeof b.precedence=="string"?b.precedence:void 0,{crossOrigin:D,integrity:G,fetchPriority:L}):B==="script"&&u.d.X(M,{crossOrigin:D,integrity:G,fetchPriority:L,nonce:typeof b.nonce=="string"?b.nonce:void 0})}},Je.preinitModule=function(M,b){if(typeof M=="string")if(typeof b=="object"&&b!==null){if(b.as==null||b.as==="script"){var B=k(b.as,b.crossOrigin);u.d.M(M,{crossOrigin:B,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0})}}else b==null&&u.d.M(M)},Je.preload=function(M,b){if(typeof M=="string"&&typeof b=="object"&&b!==null&&typeof b.as=="string"){var B=b.as,D=k(B,b.crossOrigin);u.d.L(M,B,{crossOrigin:D,integrity:typeof b.integrity=="string"?b.integrity:void 0,nonce:typeof b.nonce=="string"?b.nonce:void 0,type:typeof b.type=="string"?b.type:void 0,fetchPriority:typeof b.fetchPriority=="string"?b.fetchPriority:void 0,referrerPolicy:typeof b.referrerPolicy=="string"?b.referrerPolicy:void 0,imageSrcSet:typeof b.imageSrcSet=="string"?b.imageSrcSet:void 0,imageSizes:typeof b.imageSizes=="string"?b.imageSizes:void 0,media:typeof b.media=="string"?b.media:void 0})}},Je.preloadModule=function(M,b){if(typeof M=="string")if(b){var B=k(b.as,b.crossOrigin);u.d.m(M,{as:typeof b.as=="string"&&b.as!=="script"?b.as:void 0,crossOrigin:B,integrity:typeof b.integrity=="string"?b.integrity:void 0})}else u.d.m(M)},Je.requestFormReset=function(M){u.d.r(M)},Je.unstable_batchedUpdates=function(M,b){return M(b)},Je.useFormState=function(M,b,B){return A.H.useFormState(M,b,B)},Je.useFormStatus=function(){return A.H.useHostTransitionStatus()},Je.version="19.2.1",Je}var Af;function Gm(){if(Af)return go.exports;Af=1;function y(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y)}catch(S){console.error(S)}}return y(),go.exports=Bm(),go.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ef;function Hm(){if(Ef)return Ci;Ef=1;var y=Um(),S=yo(),_=Gm();function u(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function O(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function E(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function A(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function k(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function M(e){if(E(e)!==e)throw Error(u(188))}function b(e){var t=e.alternate;if(!t){if(t=E(e),t===null)throw Error(u(188));return t!==e?null:e}for(var a=e,n=t;;){var i=a.return;if(i===null)break;var s=i.alternate;if(s===null){if(n=i.return,n!==null){a=n;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===a)return M(i),e;if(s===n)return M(i),t;s=s.sibling}throw Error(u(188))}if(a.return!==n.return)a=i,n=s;else{for(var r=!1,o=i.child;o;){if(o===a){r=!0,a=i,n=s;break}if(o===n){r=!0,n=i,a=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===a){r=!0,a=s,n=i;break}if(o===n){r=!0,n=s,a=i;break}o=o.sibling}if(!r)throw Error(u(189))}}if(a.alternate!==n)throw Error(u(190))}if(a.tag!==3)throw Error(u(188));return a.stateNode.current===a?e:t}function B(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=B(e),t!==null)return t;e=e.sibling}return null}var D=Object.assign,G=Symbol.for("react.element"),L=Symbol.for("react.transitional.element"),Y=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),Z=Symbol.for("react.strict_mode"),ce=Symbol.for("react.profiler"),V=Symbol.for("react.consumer"),J=Symbol.for("react.context"),$=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),z=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),xe=Symbol.for("react.lazy"),ee=Symbol.for("react.activity"),ue=Symbol.for("react.memo_cache_sentinel"),Fe=Symbol.iterator;function De(e){return e===null||typeof e!="object"?null:(e=Fe&&e[Fe]||e["@@iterator"],typeof e=="function"?e:null)}var be=Symbol.for("react.client.reference");function Oe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===be?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case I:return"Fragment";case ce:return"Profiler";case Z:return"StrictMode";case j:return"Suspense";case z:return"SuspenseList";case ee:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Y:return"Portal";case J:return e.displayName||"Context";case V:return(e._context.displayName||"Context")+".Consumer";case $:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case H:return t=e.displayName||null,t!==null?t:Oe(e.type)||"Memo";case xe:t=e._payload,e=e._init;try{return Oe(e(t))}catch{}}return null}var ae=Array.isArray,x=S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R=_.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},pe=[],_e=-1;function f(e){return{current:e}}function T(e){0>_e||(e.current=pe[_e],pe[_e]=null,_e--)}function U(e,t){_e++,pe[_e]=e.current,e.current=t}var F=f(null),ne=f(null),le=f(null),ve=f(null);function Pe(e,t){switch(U(le,t),U(ne,e),U(F,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Yd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Yd(t),e=Fd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}T(F),U(F,e)}function Le(){T(F),T(ne),T(le)}function Mn(e){e.memoizedState!==null&&U(ve,e);var t=F.current,a=Fd(t,e.type);t!==a&&(U(ne,e),U(F,a))}function Ni(e){ne.current===e&&(T(F),T(ne)),ve.current===e&&(T(ve),vi._currentValue=K)}var Vs,bo;function Ca(e){if(Vs===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Vs=t&&t[1]||"",bo=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Vs+e+bo}var Xs=!1;function Zs(e,t){if(!e||Xs)return"";Xs=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var N=function(){throw Error()};if(Object.defineProperty(N.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(N,[])}catch(v){var g=v}Reflect.construct(e,[],N)}else{try{N.call()}catch(v){g=v}e.call(N.prototype)}}else{try{throw Error()}catch(v){g=v}(N=e())&&typeof N.catch=="function"&&N.catch(function(){})}}catch(v){if(v&&g&&typeof v.stack=="string")return[v.stack,g.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=n.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var c=r.split(`
`),m=o.split(`
`);for(i=n=0;n<c.length&&!c[n].includes("DetermineComponentFrameRoot");)n++;for(;i<m.length&&!m[i].includes("DetermineComponentFrameRoot");)i++;if(n===c.length||i===m.length)for(n=c.length-1,i=m.length-1;1<=n&&0<=i&&c[n]!==m[i];)i--;for(;1<=n&&0<=i;n--,i--)if(c[n]!==m[i]){if(n!==1||i!==1)do if(n--,i--,0>i||c[n]!==m[i]){var w=`
`+c[n].replace(" at new "," at ");return e.displayName&&w.includes("<anonymous>")&&(w=w.replace("<anonymous>",e.displayName)),w}while(1<=n&&0<=i);break}}}finally{Xs=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Ca(a):""}function ch(e,t){switch(e.tag){case 26:case 27:case 5:return Ca(e.type);case 16:return Ca("Lazy");case 13:return e.child!==t&&t!==null?Ca("Suspense Fallback"):Ca("Suspense");case 19:return Ca("SuspenseList");case 0:case 15:return Zs(e.type,!1);case 11:return Zs(e.type.render,!1);case 1:return Zs(e.type,!0);case 31:return Ca("Activity");default:return""}}function vo(e){try{var t="",a=null;do t+=ch(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var Ks=Object.prototype.hasOwnProperty,$s=y.unstable_scheduleCallback,Ws=y.unstable_cancelCallback,uh=y.unstable_shouldYield,dh=y.unstable_requestPaint,ot=y.unstable_now,fh=y.unstable_getCurrentPriorityLevel,xo=y.unstable_ImmediatePriority,_o=y.unstable_UserBlockingPriority,Ti=y.unstable_NormalPriority,hh=y.unstable_LowPriority,So=y.unstable_IdlePriority,ph=y.log,mh=y.unstable_setDisableYieldValue,kn=null,ct=null;function Pt(e){if(typeof ph=="function"&&mh(e),ct&&typeof ct.setStrictMode=="function")try{ct.setStrictMode(kn,e)}catch{}}var ut=Math.clz32?Math.clz32:bh,gh=Math.log,yh=Math.LN2;function bh(e){return e>>>=0,e===0?32:31-(gh(e)/yh|0)|0}var Ai=256,Ei=262144,Oi=4194304;function Na(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Mi(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var i=0,s=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=n&134217727;return o!==0?(n=o&~s,n!==0?i=Na(n):(r&=o,r!==0?i=Na(r):a||(a=o&~e,a!==0&&(i=Na(a))))):(o=n&~s,o!==0?i=Na(o):r!==0?i=Na(r):a||(a=n&~e,a!==0&&(i=Na(a)))),i===0?0:t!==0&&t!==i&&(t&s)===0&&(s=i&-i,a=t&-t,s>=a||s===32&&(a&4194048)!==0)?t:i}function jn(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function vh(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wo(){var e=Oi;return Oi<<=1,(Oi&62914560)===0&&(Oi=4194304),e}function Js(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Dn(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function xh(e,t,a,n,i,s){var r=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var o=e.entanglements,c=e.expirationTimes,m=e.hiddenUpdates;for(a=r&~a;0<a;){var w=31-ut(a),N=1<<w;o[w]=0,c[w]=-1;var g=m[w];if(g!==null)for(m[w]=null,w=0;w<g.length;w++){var v=g[w];v!==null&&(v.lane&=-536870913)}a&=~N}n!==0&&Co(e,n,0),s!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function Co(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-ut(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function No(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-ut(a),i=1<<n;i&t|e[n]&t&&(e[n]|=t),a&=~i}}function To(e,t){var a=t&-t;return a=(a&42)!==0?1:Ps(a),(a&(e.suspendedLanes|t))!==0?0:a}function Ps(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function el(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ao(){var e=R.p;return e!==0?e:(e=window.event,e===void 0?32:hf(e.type))}function Eo(e,t){var a=R.p;try{return R.p=e,t()}finally{R.p=a}}var ea=Math.random().toString(36).slice(2),Xe="__reactFiber$"+ea,tt="__reactProps$"+ea,Qa="__reactContainer$"+ea,tl="__reactEvents$"+ea,_h="__reactListeners$"+ea,Sh="__reactHandles$"+ea,Oo="__reactResources$"+ea,Rn="__reactMarker$"+ea;function al(e){delete e[Xe],delete e[tt],delete e[tl],delete e[_h],delete e[Sh]}function Va(e){var t=e[Xe];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Qa]||a[Xe]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=$d(e);e!==null;){if(a=e[Xe])return a;e=$d(e)}return t}e=a,a=e.parentNode}return null}function Xa(e){if(e=e[Xe]||e[Qa]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function zn(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(u(33))}function Za(e){var t=e[Oo];return t||(t=e[Oo]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Qe(e){e[Rn]=!0}var Mo=new Set,ko={};function Ta(e,t){Ka(e,t),Ka(e+"Capture",t)}function Ka(e,t){for(ko[e]=t,e=0;e<t.length;e++)Mo.add(t[e])}var wh=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),jo={},Do={};function Ch(e){return Ks.call(Do,e)?!0:Ks.call(jo,e)?!1:wh.test(e)?Do[e]=!0:(jo[e]=!0,!1)}function ki(e,t,a){if(Ch(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function ji(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function zt(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}function bt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ro(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Nh(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(r){a=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(r){a=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function nl(e){if(!e._valueTracker){var t=Ro(e)?"checked":"value";e._valueTracker=Nh(e,t,""+e[t])}}function zo(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=Ro(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function Di(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Th=/[\n"\\]/g;function vt(e){return e.replace(Th,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function il(e,t,a,n,i,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+bt(t)):e.value!==""+bt(t)&&(e.value=""+bt(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?sl(e,r,bt(t)):a!=null?sl(e,r,bt(a)):n!=null&&e.removeAttribute("value"),i==null&&s!=null&&(e.defaultChecked=!!s),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+bt(o):e.removeAttribute("name")}function Lo(e,t,a,n,i,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||a!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){nl(e);return}a=a!=null?""+bt(a):"",t=t!=null?""+bt(t):a,o||t===e.value||(e.value=t),e.defaultValue=t}n=n??i,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=o?e.checked:!!n,e.defaultChecked=!!n,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),nl(e)}function sl(e,t,a){t==="number"&&Di(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function $a(e,t,a,n){if(e=e.options,t){t={};for(var i=0;i<a.length;i++)t["$"+a[i]]=!0;for(a=0;a<e.length;a++)i=t.hasOwnProperty("$"+e[a].value),e[a].selected!==i&&(e[a].selected=i),i&&n&&(e[a].defaultSelected=!0)}else{for(a=""+bt(a),t=null,i=0;i<e.length;i++){if(e[i].value===a){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Uo(e,t,a){if(t!=null&&(t=""+bt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+bt(a):""}function Bo(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(u(92));if(ae(n)){if(1<n.length)throw Error(u(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=bt(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),nl(e)}function Wa(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Ah=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Go(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||Ah.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Ho(e,t,a){if(t!=null&&typeof t!="object")throw Error(u(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var i in t)n=t[i],t.hasOwnProperty(i)&&a[i]!==n&&Go(e,i,n)}else for(var s in t)t.hasOwnProperty(s)&&Go(e,s,t[s])}function ll(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Eh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Oh=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ri(e){return Oh.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Lt(){}var rl=null;function ol(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ja=null,Pa=null;function qo(e){var t=Xa(e);if(t&&(e=t.stateNode)){var a=e[tt]||null;e:switch(e=t.stateNode,t.type){case"input":if(il(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+vt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var i=n[tt]||null;if(!i)throw Error(u(90));il(n,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&zo(n)}break e;case"textarea":Uo(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&$a(e,!!a.multiple,t,!1)}}}var cl=!1;function Yo(e,t,a){if(cl)return e(t,a);cl=!0;try{var n=e(t);return n}finally{if(cl=!1,(Ja!==null||Pa!==null)&&(_s(),Ja&&(t=Ja,e=Pa,Pa=Ja=null,qo(t),e)))for(t=0;t<e.length;t++)qo(e[t])}}function Ln(e,t){var a=e.stateNode;if(a===null)return null;var n=a[tt]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(u(231,t,typeof a));return a}var Ut=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ul=!1;if(Ut)try{var Un={};Object.defineProperty(Un,"passive",{get:function(){ul=!0}}),window.addEventListener("test",Un,Un),window.removeEventListener("test",Un,Un)}catch{ul=!1}var ta=null,dl=null,zi=null;function Fo(){if(zi)return zi;var e,t=dl,a=t.length,n,i="value"in ta?ta.value:ta.textContent,s=i.length;for(e=0;e<a&&t[e]===i[e];e++);var r=a-e;for(n=1;n<=r&&t[a-n]===i[s-n];n++);return zi=i.slice(e,1<n?1-n:void 0)}function Li(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ui(){return!0}function Io(){return!1}function at(e){function t(a,n,i,s,r){this._reactName=a,this._targetInst=i,this.type=n,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(a=e[o],this[o]=a?a(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ui:Io,this.isPropagationStopped=Io,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ui)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ui)},persist:function(){},isPersistent:Ui}),t}var Aa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bi=at(Aa),Bn=D({},Aa,{view:0,detail:0}),Mh=at(Bn),fl,hl,Gn,Gi=D({},Bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ml,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gn&&(Gn&&e.type==="mousemove"?(fl=e.screenX-Gn.screenX,hl=e.screenY-Gn.screenY):hl=fl=0,Gn=e),fl)},movementY:function(e){return"movementY"in e?e.movementY:hl}}),Qo=at(Gi),kh=D({},Gi,{dataTransfer:0}),jh=at(kh),Dh=D({},Bn,{relatedTarget:0}),pl=at(Dh),Rh=D({},Aa,{animationName:0,elapsedTime:0,pseudoElement:0}),zh=at(Rh),Lh=D({},Aa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Uh=at(Lh),Bh=D({},Aa,{data:0}),Vo=at(Bh),Gh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=qh[e])?!!t[e]:!1}function ml(){return Yh}var Fh=D({},Bn,{key:function(e){if(e.key){var t=Gh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Li(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ml,charCode:function(e){return e.type==="keypress"?Li(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Li(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ih=at(Fh),Qh=D({},Gi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xo=at(Qh),Vh=D({},Bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ml}),Xh=at(Vh),Zh=D({},Aa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kh=at(Zh),$h=D({},Gi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Wh=at($h),Jh=D({},Aa,{newState:0,oldState:0}),Ph=at(Jh),ep=[9,13,27,32],gl=Ut&&"CompositionEvent"in window,Hn=null;Ut&&"documentMode"in document&&(Hn=document.documentMode);var tp=Ut&&"TextEvent"in window&&!Hn,Zo=Ut&&(!gl||Hn&&8<Hn&&11>=Hn),Ko=" ",$o=!1;function Wo(e,t){switch(e){case"keyup":return ep.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jo(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var en=!1;function ap(e,t){switch(e){case"compositionend":return Jo(t);case"keypress":return t.which!==32?null:($o=!0,Ko);case"textInput":return e=t.data,e===Ko&&$o?null:e;default:return null}}function np(e,t){if(en)return e==="compositionend"||!gl&&Wo(e,t)?(e=Fo(),zi=dl=ta=null,en=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Zo&&t.locale!=="ko"?null:t.data;default:return null}}var ip={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Po(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ip[e.type]:t==="textarea"}function ec(e,t,a,n){Ja?Pa?Pa.push(n):Pa=[n]:Ja=n,t=Es(t,"onChange"),0<t.length&&(a=new Bi("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var qn=null,Yn=null;function sp(e){Ld(e,0)}function Hi(e){var t=zn(e);if(zo(t))return e}function tc(e,t){if(e==="change")return t}var ac=!1;if(Ut){var yl;if(Ut){var bl="oninput"in document;if(!bl){var nc=document.createElement("div");nc.setAttribute("oninput","return;"),bl=typeof nc.oninput=="function"}yl=bl}else yl=!1;ac=yl&&(!document.documentMode||9<document.documentMode)}function ic(){qn&&(qn.detachEvent("onpropertychange",sc),Yn=qn=null)}function sc(e){if(e.propertyName==="value"&&Hi(Yn)){var t=[];ec(t,Yn,e,ol(e)),Yo(sp,t)}}function lp(e,t,a){e==="focusin"?(ic(),qn=t,Yn=a,qn.attachEvent("onpropertychange",sc)):e==="focusout"&&ic()}function rp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Hi(Yn)}function op(e,t){if(e==="click")return Hi(t)}function cp(e,t){if(e==="input"||e==="change")return Hi(t)}function up(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var dt=typeof Object.is=="function"?Object.is:up;function Fn(e,t){if(dt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var i=a[n];if(!Ks.call(t,i)||!dt(e[i],t[i]))return!1}return!0}function lc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function rc(e,t){var a=lc(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=lc(a)}}function oc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?oc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function cc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Di(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Di(e.document)}return t}function vl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var dp=Ut&&"documentMode"in document&&11>=document.documentMode,tn=null,xl=null,In=null,_l=!1;function uc(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;_l||tn==null||tn!==Di(n)||(n=tn,"selectionStart"in n&&vl(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),In&&Fn(In,n)||(In=n,n=Es(xl,"onSelect"),0<n.length&&(t=new Bi("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=tn)))}function Ea(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var an={animationend:Ea("Animation","AnimationEnd"),animationiteration:Ea("Animation","AnimationIteration"),animationstart:Ea("Animation","AnimationStart"),transitionrun:Ea("Transition","TransitionRun"),transitionstart:Ea("Transition","TransitionStart"),transitioncancel:Ea("Transition","TransitionCancel"),transitionend:Ea("Transition","TransitionEnd")},Sl={},dc={};Ut&&(dc=document.createElement("div").style,"AnimationEvent"in window||(delete an.animationend.animation,delete an.animationiteration.animation,delete an.animationstart.animation),"TransitionEvent"in window||delete an.transitionend.transition);function Oa(e){if(Sl[e])return Sl[e];if(!an[e])return e;var t=an[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in dc)return Sl[e]=t[a];return e}var fc=Oa("animationend"),hc=Oa("animationiteration"),pc=Oa("animationstart"),fp=Oa("transitionrun"),hp=Oa("transitionstart"),pp=Oa("transitioncancel"),mc=Oa("transitionend"),gc=new Map,wl="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wl.push("scrollEnd");function Et(e,t){gc.set(e,t),Ta(t,[e])}var qi=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},xt=[],nn=0,Cl=0;function Yi(){for(var e=nn,t=Cl=nn=0;t<e;){var a=xt[t];xt[t++]=null;var n=xt[t];xt[t++]=null;var i=xt[t];xt[t++]=null;var s=xt[t];if(xt[t++]=null,n!==null&&i!==null){var r=n.pending;r===null?i.next=i:(i.next=r.next,r.next=i),n.pending=i}s!==0&&yc(a,i,s)}}function Fi(e,t,a,n){xt[nn++]=e,xt[nn++]=t,xt[nn++]=a,xt[nn++]=n,Cl|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function Nl(e,t,a,n){return Fi(e,t,a,n),Ii(e)}function Ma(e,t){return Fi(e,null,null,t),Ii(e)}function yc(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var i=!1,s=e.return;s!==null;)s.childLanes|=a,n=s.alternate,n!==null&&(n.childLanes|=a),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(i=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,i&&t!==null&&(i=31-ut(a),e=s.hiddenUpdates,n=e[i],n===null?e[i]=[t]:n.push(t),t.lane=a|536870912),s):null}function Ii(e){if(50<fi)throw fi=0,Rr=null,Error(u(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var sn={};function mp(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ft(e,t,a,n){return new mp(e,t,a,n)}function Tl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bt(e,t){var a=e.alternate;return a===null?(a=ft(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function bc(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Qi(e,t,a,n,i,s){var r=0;if(n=e,typeof e=="function")Tl(e)&&(r=1);else if(typeof e=="string")r=xm(e,a,F.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case ee:return e=ft(31,a,t,i),e.elementType=ee,e.lanes=s,e;case I:return ka(a.children,i,s,t);case Z:r=8,i|=24;break;case ce:return e=ft(12,a,t,i|2),e.elementType=ce,e.lanes=s,e;case j:return e=ft(13,a,t,i),e.elementType=j,e.lanes=s,e;case z:return e=ft(19,a,t,i),e.elementType=z,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case J:r=10;break e;case V:r=9;break e;case $:r=11;break e;case H:r=14;break e;case xe:r=16,n=null;break e}r=29,a=Error(u(130,e===null?"null":typeof e,"")),n=null}return t=ft(r,a,t,i),t.elementType=e,t.type=n,t.lanes=s,t}function ka(e,t,a,n){return e=ft(7,e,n,t),e.lanes=a,e}function Al(e,t,a){return e=ft(6,e,null,t),e.lanes=a,e}function vc(e){var t=ft(18,null,null,0);return t.stateNode=e,t}function El(e,t,a){return t=ft(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var xc=new WeakMap;function _t(e,t){if(typeof e=="object"&&e!==null){var a=xc.get(e);return a!==void 0?a:(t={value:e,source:t,stack:vo(t)},xc.set(e,t),t)}return{value:e,source:t,stack:vo(t)}}var ln=[],rn=0,Vi=null,Qn=0,St=[],wt=0,aa=null,kt=1,jt="";function Gt(e,t){ln[rn++]=Qn,ln[rn++]=Vi,Vi=e,Qn=t}function _c(e,t,a){St[wt++]=kt,St[wt++]=jt,St[wt++]=aa,aa=e;var n=kt;e=jt;var i=32-ut(n)-1;n&=~(1<<i),a+=1;var s=32-ut(t)+i;if(30<s){var r=i-i%5;s=(n&(1<<r)-1).toString(32),n>>=r,i-=r,kt=1<<32-ut(t)+i|a<<i|n,jt=s+e}else kt=1<<s|a<<i|n,jt=e}function Ol(e){e.return!==null&&(Gt(e,1),_c(e,1,0))}function Ml(e){for(;e===Vi;)Vi=ln[--rn],ln[rn]=null,Qn=ln[--rn],ln[rn]=null;for(;e===aa;)aa=St[--wt],St[wt]=null,jt=St[--wt],St[wt]=null,kt=St[--wt],St[wt]=null}function Sc(e,t){St[wt++]=kt,St[wt++]=jt,St[wt++]=aa,kt=t.id,jt=t.overflow,aa=e}var Ze=null,Me=null,he=!1,na=null,Ct=!1,kl=Error(u(519));function ia(e){var t=Error(u(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Vn(_t(t,e)),kl}function wc(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[Xe]=e,t[tt]=n,a){case"dialog":oe("cancel",t),oe("close",t);break;case"iframe":case"object":case"embed":oe("load",t);break;case"video":case"audio":for(a=0;a<pi.length;a++)oe(pi[a],t);break;case"source":oe("error",t);break;case"img":case"image":case"link":oe("error",t),oe("load",t);break;case"details":oe("toggle",t);break;case"input":oe("invalid",t),Lo(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":oe("invalid",t);break;case"textarea":oe("invalid",t),Bo(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||Hd(t.textContent,a)?(n.popover!=null&&(oe("beforetoggle",t),oe("toggle",t)),n.onScroll!=null&&oe("scroll",t),n.onScrollEnd!=null&&oe("scrollend",t),n.onClick!=null&&(t.onclick=Lt),t=!0):t=!1,t||ia(e,!0)}function Cc(e){for(Ze=e.return;Ze;)switch(Ze.tag){case 5:case 31:case 13:Ct=!1;return;case 27:case 3:Ct=!0;return;default:Ze=Ze.return}}function on(e){if(e!==Ze)return!1;if(!he)return Cc(e),he=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Kr(e.type,e.memoizedProps)),a=!a),a&&Me&&ia(e),Cc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Me=Kd(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Me=Kd(e)}else t===27?(t=Me,ba(e.type)?(e=eo,eo=null,Me=e):Me=t):Me=Ze?Tt(e.stateNode.nextSibling):null;return!0}function ja(){Me=Ze=null,he=!1}function jl(){var e=na;return e!==null&&(lt===null?lt=e:lt.push.apply(lt,e),na=null),e}function Vn(e){na===null?na=[e]:na.push(e)}var Dl=f(null),Da=null,Ht=null;function sa(e,t,a){U(Dl,t._currentValue),t._currentValue=a}function qt(e){e._currentValue=Dl.current,T(Dl)}function Rl(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function zl(e,t,a,n){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var s=i.dependencies;if(s!==null){var r=i.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=i;for(var c=0;c<t.length;c++)if(o.context===t[c]){s.lanes|=a,o=s.alternate,o!==null&&(o.lanes|=a),Rl(s.return,a,e),n||(r=null);break e}s=o.next}}else if(i.tag===18){if(r=i.return,r===null)throw Error(u(341));r.lanes|=a,s=r.alternate,s!==null&&(s.lanes|=a),Rl(r,a,e),r=null}else r=i.child;if(r!==null)r.return=i;else for(r=i;r!==null;){if(r===e){r=null;break}if(i=r.sibling,i!==null){i.return=r.return,r=i;break}r=r.return}i=r}}function cn(e,t,a,n){e=null;for(var i=t,s=!1;i!==null;){if(!s){if((i.flags&524288)!==0)s=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var r=i.alternate;if(r===null)throw Error(u(387));if(r=r.memoizedProps,r!==null){var o=i.type;dt(i.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(i===ve.current){if(r=i.alternate,r===null)throw Error(u(387));r.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(vi):e=[vi])}i=i.return}e!==null&&zl(t,e,a,n),t.flags|=262144}function Xi(e){for(e=e.firstContext;e!==null;){if(!dt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ra(e){Da=e,Ht=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ke(e){return Nc(Da,e)}function Zi(e,t){return Da===null&&Ra(e),Nc(e,t)}function Nc(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Ht===null){if(e===null)throw Error(u(308));Ht=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ht=Ht.next=t;return a}var gp=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},yp=y.unstable_scheduleCallback,bp=y.unstable_NormalPriority,Ge={$$typeof:J,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ll(){return{controller:new gp,data:new Map,refCount:0}}function Xn(e){e.refCount--,e.refCount===0&&yp(bp,function(){e.controller.abort()})}var Zn=null,Ul=0,un=0,dn=null;function vp(e,t){if(Zn===null){var a=Zn=[];Ul=0,un=Hr(),dn={status:"pending",value:void 0,then:function(n){a.push(n)}}}return Ul++,t.then(Tc,Tc),t}function Tc(){if(--Ul===0&&Zn!==null){dn!==null&&(dn.status="fulfilled");var e=Zn;Zn=null,un=0,dn=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function xp(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(i){a.push(i)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var i=0;i<a.length;i++)(0,a[i])(t)},function(i){for(n.status="rejected",n.reason=i,i=0;i<a.length;i++)(0,a[i])(void 0)}),n}var Ac=x.S;x.S=function(e,t){ud=ot(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&vp(e,t),Ac!==null&&Ac(e,t)};var za=f(null);function Bl(){var e=za.current;return e!==null?e:Ee.pooledCache}function Ki(e,t){t===null?U(za,za.current):U(za,t.pool)}function Ec(){var e=Bl();return e===null?null:{parent:Ge._currentValue,pool:e}}var fn=Error(u(460)),Gl=Error(u(474)),$i=Error(u(542)),Wi={then:function(){}};function Oc(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Mc(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Lt,Lt),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,jc(e),e;default:if(typeof t.status=="string")t.then(Lt,Lt);else{if(e=Ee,e!==null&&100<e.shellSuspendCounter)throw Error(u(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=n}},function(n){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,jc(e),e}throw Ua=t,fn}}function La(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ua=a,fn):a}}var Ua=null;function kc(){if(Ua===null)throw Error(u(459));var e=Ua;return Ua=null,e}function jc(e){if(e===fn||e===$i)throw Error(u(483))}var hn=null,Kn=0;function Ji(e){var t=Kn;return Kn+=1,hn===null&&(hn=[]),Mc(hn,e,t)}function $n(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Pi(e,t){throw t.$$typeof===G?Error(u(525)):(e=Object.prototype.toString.call(t),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Dc(e){function t(h,d){if(e){var p=h.deletions;p===null?(h.deletions=[d],h.flags|=16):p.push(d)}}function a(h,d){if(!e)return null;for(;d!==null;)t(h,d),d=d.sibling;return null}function n(h){for(var d=new Map;h!==null;)h.key!==null?d.set(h.key,h):d.set(h.index,h),h=h.sibling;return d}function i(h,d){return h=Bt(h,d),h.index=0,h.sibling=null,h}function s(h,d,p){return h.index=p,e?(p=h.alternate,p!==null?(p=p.index,p<d?(h.flags|=67108866,d):p):(h.flags|=67108866,d)):(h.flags|=1048576,d)}function r(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function o(h,d,p,C){return d===null||d.tag!==6?(d=Al(p,h.mode,C),d.return=h,d):(d=i(d,p),d.return=h,d)}function c(h,d,p,C){var X=p.type;return X===I?w(h,d,p.props.children,C,p.key):d!==null&&(d.elementType===X||typeof X=="object"&&X!==null&&X.$$typeof===xe&&La(X)===d.type)?(d=i(d,p.props),$n(d,p),d.return=h,d):(d=Qi(p.type,p.key,p.props,null,h.mode,C),$n(d,p),d.return=h,d)}function m(h,d,p,C){return d===null||d.tag!==4||d.stateNode.containerInfo!==p.containerInfo||d.stateNode.implementation!==p.implementation?(d=El(p,h.mode,C),d.return=h,d):(d=i(d,p.children||[]),d.return=h,d)}function w(h,d,p,C,X){return d===null||d.tag!==7?(d=ka(p,h.mode,C,X),d.return=h,d):(d=i(d,p),d.return=h,d)}function N(h,d,p){if(typeof d=="string"&&d!==""||typeof d=="number"||typeof d=="bigint")return d=Al(""+d,h.mode,p),d.return=h,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case L:return p=Qi(d.type,d.key,d.props,null,h.mode,p),$n(p,d),p.return=h,p;case Y:return d=El(d,h.mode,p),d.return=h,d;case xe:return d=La(d),N(h,d,p)}if(ae(d)||De(d))return d=ka(d,h.mode,p,null),d.return=h,d;if(typeof d.then=="function")return N(h,Ji(d),p);if(d.$$typeof===J)return N(h,Zi(h,d),p);Pi(h,d)}return null}function g(h,d,p,C){var X=d!==null?d.key:null;if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return X!==null?null:o(h,d,""+p,C);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case L:return p.key===X?c(h,d,p,C):null;case Y:return p.key===X?m(h,d,p,C):null;case xe:return p=La(p),g(h,d,p,C)}if(ae(p)||De(p))return X!==null?null:w(h,d,p,C,null);if(typeof p.then=="function")return g(h,d,Ji(p),C);if(p.$$typeof===J)return g(h,d,Zi(h,p),C);Pi(h,p)}return null}function v(h,d,p,C,X){if(typeof C=="string"&&C!==""||typeof C=="number"||typeof C=="bigint")return h=h.get(p)||null,o(d,h,""+C,X);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case L:return h=h.get(C.key===null?p:C.key)||null,c(d,h,C,X);case Y:return h=h.get(C.key===null?p:C.key)||null,m(d,h,C,X);case xe:return C=La(C),v(h,d,p,C,X)}if(ae(C)||De(C))return h=h.get(p)||null,w(d,h,C,X,null);if(typeof C.then=="function")return v(h,d,p,Ji(C),X);if(C.$$typeof===J)return v(h,d,p,Zi(d,C),X);Pi(d,C)}return null}function q(h,d,p,C){for(var X=null,me=null,Q=d,se=d=0,fe=null;Q!==null&&se<p.length;se++){Q.index>se?(fe=Q,Q=null):fe=Q.sibling;var ge=g(h,Q,p[se],C);if(ge===null){Q===null&&(Q=fe);break}e&&Q&&ge.alternate===null&&t(h,Q),d=s(ge,d,se),me===null?X=ge:me.sibling=ge,me=ge,Q=fe}if(se===p.length)return a(h,Q),he&&Gt(h,se),X;if(Q===null){for(;se<p.length;se++)Q=N(h,p[se],C),Q!==null&&(d=s(Q,d,se),me===null?X=Q:me.sibling=Q,me=Q);return he&&Gt(h,se),X}for(Q=n(Q);se<p.length;se++)fe=v(Q,h,se,p[se],C),fe!==null&&(e&&fe.alternate!==null&&Q.delete(fe.key===null?se:fe.key),d=s(fe,d,se),me===null?X=fe:me.sibling=fe,me=fe);return e&&Q.forEach(function(wa){return t(h,wa)}),he&&Gt(h,se),X}function W(h,d,p,C){if(p==null)throw Error(u(151));for(var X=null,me=null,Q=d,se=d=0,fe=null,ge=p.next();Q!==null&&!ge.done;se++,ge=p.next()){Q.index>se?(fe=Q,Q=null):fe=Q.sibling;var wa=g(h,Q,ge.value,C);if(wa===null){Q===null&&(Q=fe);break}e&&Q&&wa.alternate===null&&t(h,Q),d=s(wa,d,se),me===null?X=wa:me.sibling=wa,me=wa,Q=fe}if(ge.done)return a(h,Q),he&&Gt(h,se),X;if(Q===null){for(;!ge.done;se++,ge=p.next())ge=N(h,ge.value,C),ge!==null&&(d=s(ge,d,se),me===null?X=ge:me.sibling=ge,me=ge);return he&&Gt(h,se),X}for(Q=n(Q);!ge.done;se++,ge=p.next())ge=v(Q,h,se,ge.value,C),ge!==null&&(e&&ge.alternate!==null&&Q.delete(ge.key===null?se:ge.key),d=s(ge,d,se),me===null?X=ge:me.sibling=ge,me=ge);return e&&Q.forEach(function(km){return t(h,km)}),he&&Gt(h,se),X}function Ae(h,d,p,C){if(typeof p=="object"&&p!==null&&p.type===I&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case L:e:{for(var X=p.key;d!==null;){if(d.key===X){if(X=p.type,X===I){if(d.tag===7){a(h,d.sibling),C=i(d,p.props.children),C.return=h,h=C;break e}}else if(d.elementType===X||typeof X=="object"&&X!==null&&X.$$typeof===xe&&La(X)===d.type){a(h,d.sibling),C=i(d,p.props),$n(C,p),C.return=h,h=C;break e}a(h,d);break}else t(h,d);d=d.sibling}p.type===I?(C=ka(p.props.children,h.mode,C,p.key),C.return=h,h=C):(C=Qi(p.type,p.key,p.props,null,h.mode,C),$n(C,p),C.return=h,h=C)}return r(h);case Y:e:{for(X=p.key;d!==null;){if(d.key===X)if(d.tag===4&&d.stateNode.containerInfo===p.containerInfo&&d.stateNode.implementation===p.implementation){a(h,d.sibling),C=i(d,p.children||[]),C.return=h,h=C;break e}else{a(h,d);break}else t(h,d);d=d.sibling}C=El(p,h.mode,C),C.return=h,h=C}return r(h);case xe:return p=La(p),Ae(h,d,p,C)}if(ae(p))return q(h,d,p,C);if(De(p)){if(X=De(p),typeof X!="function")throw Error(u(150));return p=X.call(p),W(h,d,p,C)}if(typeof p.then=="function")return Ae(h,d,Ji(p),C);if(p.$$typeof===J)return Ae(h,d,Zi(h,p),C);Pi(h,p)}return typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint"?(p=""+p,d!==null&&d.tag===6?(a(h,d.sibling),C=i(d,p),C.return=h,h=C):(a(h,d),C=Al(p,h.mode,C),C.return=h,h=C),r(h)):a(h,d)}return function(h,d,p,C){try{Kn=0;var X=Ae(h,d,p,C);return hn=null,X}catch(Q){if(Q===fn||Q===$i)throw Q;var me=ft(29,Q,null,h.mode);return me.lanes=C,me.return=h,me}finally{}}}var Ba=Dc(!0),Rc=Dc(!1),la=!1;function Hl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ql(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ra(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function oa(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(ye&2)!==0){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,t=Ii(e),yc(e,null,a),t}return Fi(e,n,t,a),Ii(e)}function Wn(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,No(e,a)}}function Yl(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var i=null,s=null;if(a=a.firstBaseUpdate,a!==null){do{var r={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};s===null?i=s=r:s=s.next=r,a=a.next}while(a!==null);s===null?i=s=t:s=s.next=t}else i=s=t;a={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Fl=!1;function Jn(){if(Fl){var e=dn;if(e!==null)throw e}}function Pn(e,t,a,n){Fl=!1;var i=e.updateQueue;la=!1;var s=i.firstBaseUpdate,r=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var c=o,m=c.next;c.next=null,r===null?s=m:r.next=m,r=c;var w=e.alternate;w!==null&&(w=w.updateQueue,o=w.lastBaseUpdate,o!==r&&(o===null?w.firstBaseUpdate=m:o.next=m,w.lastBaseUpdate=c))}if(s!==null){var N=i.baseState;r=0,w=m=c=null,o=s;do{var g=o.lane&-536870913,v=g!==o.lane;if(v?(de&g)===g:(n&g)===g){g!==0&&g===un&&(Fl=!0),w!==null&&(w=w.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var q=e,W=o;g=t;var Ae=a;switch(W.tag){case 1:if(q=W.payload,typeof q=="function"){N=q.call(Ae,N,g);break e}N=q;break e;case 3:q.flags=q.flags&-65537|128;case 0:if(q=W.payload,g=typeof q=="function"?q.call(Ae,N,g):q,g==null)break e;N=D({},N,g);break e;case 2:la=!0}}g=o.callback,g!==null&&(e.flags|=64,v&&(e.flags|=8192),v=i.callbacks,v===null?i.callbacks=[g]:v.push(g))}else v={lane:g,tag:o.tag,payload:o.payload,callback:o.callback,next:null},w===null?(m=w=v,c=N):w=w.next=v,r|=g;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;v=o,o=v.next,v.next=null,i.lastBaseUpdate=v,i.shared.pending=null}}while(!0);w===null&&(c=N),i.baseState=c,i.firstBaseUpdate=m,i.lastBaseUpdate=w,s===null&&(i.shared.lanes=0),ha|=r,e.lanes=r,e.memoizedState=N}}function zc(e,t){if(typeof e!="function")throw Error(u(191,e));e.call(t)}function Lc(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)zc(a[e],t)}var pn=f(null),es=f(0);function Uc(e,t){e=$t,U(es,e),U(pn,t),$t=e|t.baseLanes}function Il(){U(es,$t),U(pn,pn.current)}function Ql(){$t=es.current,T(pn),T(es)}var ht=f(null),Nt=null;function ca(e){var t=e.alternate;U(Ue,Ue.current&1),U(ht,e),Nt===null&&(t===null||pn.current!==null||t.memoizedState!==null)&&(Nt=e)}function Vl(e){U(Ue,Ue.current),U(ht,e),Nt===null&&(Nt=e)}function Bc(e){e.tag===22?(U(Ue,Ue.current),U(ht,e),Nt===null&&(Nt=e)):ua()}function ua(){U(Ue,Ue.current),U(ht,ht.current)}function pt(e){T(ht),Nt===e&&(Nt=null),T(Ue)}var Ue=f(0);function ts(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Jr(a)||Pr(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Yt=0,ie=null,Ne=null,He=null,as=!1,mn=!1,Ga=!1,ns=0,ei=0,gn=null,_p=0;function Re(){throw Error(u(321))}function Xl(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!dt(e[a],t[a]))return!1;return!0}function Zl(e,t,a,n,i,s){return Yt=s,ie=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,x.H=e===null||e.memoizedState===null?_u:cr,Ga=!1,s=a(n,i),Ga=!1,mn&&(s=Hc(t,a,n,i)),Gc(e),s}function Gc(e){x.H=ni;var t=Ne!==null&&Ne.next!==null;if(Yt=0,He=Ne=ie=null,as=!1,ei=0,gn=null,t)throw Error(u(300));e===null||qe||(e=e.dependencies,e!==null&&Xi(e)&&(qe=!0))}function Hc(e,t,a,n){ie=e;var i=0;do{if(mn&&(gn=null),ei=0,mn=!1,25<=i)throw Error(u(301));if(i+=1,He=Ne=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}x.H=Su,s=t(a,n)}while(mn);return s}function Sp(){var e=x.H,t=e.useState()[0];return t=typeof t.then=="function"?ti(t):t,e=e.useState()[0],(Ne!==null?Ne.memoizedState:null)!==e&&(ie.flags|=1024),t}function Kl(){var e=ns!==0;return ns=0,e}function $l(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function Wl(e){if(as){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}as=!1}Yt=0,He=Ne=ie=null,mn=!1,ei=ns=0,gn=null}function et(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?ie.memoizedState=He=e:He=He.next=e,He}function Be(){if(Ne===null){var e=ie.alternate;e=e!==null?e.memoizedState:null}else e=Ne.next;var t=He===null?ie.memoizedState:He.next;if(t!==null)He=t,Ne=e;else{if(e===null)throw ie.alternate===null?Error(u(467)):Error(u(310));Ne=e,e={memoizedState:Ne.memoizedState,baseState:Ne.baseState,baseQueue:Ne.baseQueue,queue:Ne.queue,next:null},He===null?ie.memoizedState=He=e:He=He.next=e}return He}function is(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ti(e){var t=ei;return ei+=1,gn===null&&(gn=[]),e=Mc(gn,e,t),t=ie,(He===null?t.memoizedState:He.next)===null&&(t=t.alternate,x.H=t===null||t.memoizedState===null?_u:cr),e}function ss(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ti(e);if(e.$$typeof===J)return Ke(e)}throw Error(u(438,String(e)))}function Jl(e){var t=null,a=ie.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=ie.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=is(),ie.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=ue;return t.index++,a}function Ft(e,t){return typeof t=="function"?t(e):t}function ls(e){var t=Be();return Pl(t,Ne,e)}function Pl(e,t,a){var n=e.queue;if(n===null)throw Error(u(311));n.lastRenderedReducer=a;var i=e.baseQueue,s=n.pending;if(s!==null){if(i!==null){var r=i.next;i.next=s.next,s.next=r}t.baseQueue=i=s,n.pending=null}if(s=e.baseState,i===null)e.memoizedState=s;else{t=i.next;var o=r=null,c=null,m=t,w=!1;do{var N=m.lane&-536870913;if(N!==m.lane?(de&N)===N:(Yt&N)===N){var g=m.revertLane;if(g===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null}),N===un&&(w=!0);else if((Yt&g)===g){m=m.next,g===un&&(w=!0);continue}else N={lane:0,revertLane:m.revertLane,gesture:null,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null},c===null?(o=c=N,r=s):c=c.next=N,ie.lanes|=g,ha|=g;N=m.action,Ga&&a(s,N),s=m.hasEagerState?m.eagerState:a(s,N)}else g={lane:N,revertLane:m.revertLane,gesture:m.gesture,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null},c===null?(o=c=g,r=s):c=c.next=g,ie.lanes|=N,ha|=N;m=m.next}while(m!==null&&m!==t);if(c===null?r=s:c.next=o,!dt(s,e.memoizedState)&&(qe=!0,w&&(a=dn,a!==null)))throw a;e.memoizedState=s,e.baseState=r,e.baseQueue=c,n.lastRenderedState=s}return i===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function er(e){var t=Be(),a=t.queue;if(a===null)throw Error(u(311));a.lastRenderedReducer=e;var n=a.dispatch,i=a.pending,s=t.memoizedState;if(i!==null){a.pending=null;var r=i=i.next;do s=e(s,r.action),r=r.next;while(r!==i);dt(s,t.memoizedState)||(qe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),a.lastRenderedState=s}return[s,n]}function qc(e,t,a){var n=ie,i=Be(),s=he;if(s){if(a===void 0)throw Error(u(407));a=a()}else a=t();var r=!dt((Ne||i).memoizedState,a);if(r&&(i.memoizedState=a,qe=!0),i=i.queue,nr(Ic.bind(null,n,i,e),[e]),i.getSnapshot!==t||r||He!==null&&He.memoizedState.tag&1){if(n.flags|=2048,yn(9,{destroy:void 0},Fc.bind(null,n,i,a,t),null),Ee===null)throw Error(u(349));s||(Yt&127)!==0||Yc(n,t,a)}return a}function Yc(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=ie.updateQueue,t===null?(t=is(),ie.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Fc(e,t,a,n){t.value=a,t.getSnapshot=n,Qc(t)&&Vc(e)}function Ic(e,t,a){return a(function(){Qc(t)&&Vc(e)})}function Qc(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!dt(e,a)}catch{return!0}}function Vc(e){var t=Ma(e,2);t!==null&&rt(t,e,2)}function tr(e){var t=et();if(typeof e=="function"){var a=e;if(e=a(),Ga){Pt(!0);try{a()}finally{Pt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ft,lastRenderedState:e},t}function Xc(e,t,a,n){return e.baseState=a,Pl(e,Ne,typeof n=="function"?n:Ft)}function wp(e,t,a,n,i){if(cs(e))throw Error(u(485));if(e=t.action,e!==null){var s={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};x.T!==null?a(!0):s.isTransition=!1,n(s),a=t.pending,a===null?(s.next=t.pending=s,Zc(t,s)):(s.next=a.next,t.pending=a.next=s)}}function Zc(e,t){var a=t.action,n=t.payload,i=e.state;if(t.isTransition){var s=x.T,r={};x.T=r;try{var o=a(i,n),c=x.S;c!==null&&c(r,o),Kc(e,t,o)}catch(m){ar(e,t,m)}finally{s!==null&&r.types!==null&&(s.types=r.types),x.T=s}}else try{s=a(i,n),Kc(e,t,s)}catch(m){ar(e,t,m)}}function Kc(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){$c(e,t,n)},function(n){return ar(e,t,n)}):$c(e,t,a)}function $c(e,t,a){t.status="fulfilled",t.value=a,Wc(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Zc(e,a)))}function ar(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,Wc(t),t=t.next;while(t!==n)}e.action=null}function Wc(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Jc(e,t){return t}function Pc(e,t){if(he){var a=Ee.formState;if(a!==null){e:{var n=ie;if(he){if(Me){t:{for(var i=Me,s=Ct;i.nodeType!==8;){if(!s){i=null;break t}if(i=Tt(i.nextSibling),i===null){i=null;break t}}s=i.data,i=s==="F!"||s==="F"?i:null}if(i){Me=Tt(i.nextSibling),n=i.data==="F!";break e}}ia(n)}n=!1}n&&(t=a[0])}}return a=et(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jc,lastRenderedState:t},a.queue=n,a=bu.bind(null,ie,n),n.dispatch=a,n=tr(!1),s=or.bind(null,ie,!1,n.queue),n=et(),i={state:t,dispatch:null,action:e,pending:null},n.queue=i,a=wp.bind(null,ie,i,s,a),i.dispatch=a,n.memoizedState=e,[t,a,!1]}function eu(e){var t=Be();return tu(t,Ne,e)}function tu(e,t,a){if(t=Pl(e,t,Jc)[0],e=ls(Ft)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=ti(t)}catch(r){throw r===fn?$i:r}else n=t;t=Be();var i=t.queue,s=i.dispatch;return a!==t.memoizedState&&(ie.flags|=2048,yn(9,{destroy:void 0},Cp.bind(null,i,a),null)),[n,s,e]}function Cp(e,t){e.action=t}function au(e){var t=Be(),a=Ne;if(a!==null)return tu(t,a,e);Be(),t=t.memoizedState,a=Be();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function yn(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=ie.updateQueue,t===null&&(t=is(),ie.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function nu(){return Be().memoizedState}function rs(e,t,a,n){var i=et();ie.flags|=e,i.memoizedState=yn(1|t,{destroy:void 0},a,n===void 0?null:n)}function os(e,t,a,n){var i=Be();n=n===void 0?null:n;var s=i.memoizedState.inst;Ne!==null&&n!==null&&Xl(n,Ne.memoizedState.deps)?i.memoizedState=yn(t,s,a,n):(ie.flags|=e,i.memoizedState=yn(1|t,s,a,n))}function iu(e,t){rs(8390656,8,e,t)}function nr(e,t){os(2048,8,e,t)}function Np(e){ie.flags|=4;var t=ie.updateQueue;if(t===null)t=is(),ie.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function su(e){var t=Be().memoizedState;return Np({ref:t,nextImpl:e}),function(){if((ye&2)!==0)throw Error(u(440));return t.impl.apply(void 0,arguments)}}function lu(e,t){return os(4,2,e,t)}function ru(e,t){return os(4,4,e,t)}function ou(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function cu(e,t,a){a=a!=null?a.concat([e]):null,os(4,4,ou.bind(null,t,e),a)}function ir(){}function uu(e,t){var a=Be();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&Xl(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function du(e,t){var a=Be();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&Xl(t,n[1]))return n[0];if(n=e(),Ga){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[n,t],n}function sr(e,t,a){return a===void 0||(Yt&1073741824)!==0&&(de&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=fd(),ie.lanes|=e,ha|=e,a)}function fu(e,t,a,n){return dt(a,t)?a:pn.current!==null?(e=sr(e,a,n),dt(e,t)||(qe=!0),e):(Yt&42)===0||(Yt&1073741824)!==0&&(de&261930)===0?(qe=!0,e.memoizedState=a):(e=fd(),ie.lanes|=e,ha|=e,t)}function hu(e,t,a,n,i){var s=R.p;R.p=s!==0&&8>s?s:8;var r=x.T,o={};x.T=o,or(e,!1,t,a);try{var c=i(),m=x.S;if(m!==null&&m(o,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var w=xp(c,n);ai(e,t,w,yt(e))}else ai(e,t,n,yt(e))}catch(N){ai(e,t,{then:function(){},status:"rejected",reason:N},yt())}finally{R.p=s,r!==null&&o.types!==null&&(r.types=o.types),x.T=r}}function Tp(){}function lr(e,t,a,n){if(e.tag!==5)throw Error(u(476));var i=pu(e).queue;hu(e,i,t,K,a===null?Tp:function(){return mu(e),a(n)})}function pu(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ft,lastRenderedState:K},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ft,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function mu(e){var t=pu(e);t.next===null&&(t=e.alternate.memoizedState),ai(e,t.next.queue,{},yt())}function rr(){return Ke(vi)}function gu(){return Be().memoizedState}function yu(){return Be().memoizedState}function Ap(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=yt();e=ra(a);var n=oa(t,e,a);n!==null&&(rt(n,t,a),Wn(n,t,a)),t={cache:Ll()},e.payload=t;return}t=t.return}}function Ep(e,t,a){var n=yt();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},cs(e)?vu(t,a):(a=Nl(e,t,a,n),a!==null&&(rt(a,e,n),xu(a,t,n)))}function bu(e,t,a){var n=yt();ai(e,t,a,n)}function ai(e,t,a,n){var i={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(cs(e))vu(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,a);if(i.hasEagerState=!0,i.eagerState=o,dt(o,r))return Fi(e,t,i,0),Ee===null&&Yi(),!1}catch{}finally{}if(a=Nl(e,t,i,n),a!==null)return rt(a,e,n),xu(a,t,n),!0}return!1}function or(e,t,a,n){if(n={lane:2,revertLane:Hr(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},cs(e)){if(t)throw Error(u(479))}else t=Nl(e,a,n,2),t!==null&&rt(t,e,2)}function cs(e){var t=e.alternate;return e===ie||t!==null&&t===ie}function vu(e,t){mn=as=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function xu(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,No(e,a)}}var ni={readContext:Ke,use:ss,useCallback:Re,useContext:Re,useEffect:Re,useImperativeHandle:Re,useLayoutEffect:Re,useInsertionEffect:Re,useMemo:Re,useReducer:Re,useRef:Re,useState:Re,useDebugValue:Re,useDeferredValue:Re,useTransition:Re,useSyncExternalStore:Re,useId:Re,useHostTransitionStatus:Re,useFormState:Re,useActionState:Re,useOptimistic:Re,useMemoCache:Re,useCacheRefresh:Re};ni.useEffectEvent=Re;var _u={readContext:Ke,use:ss,useCallback:function(e,t){return et().memoizedState=[e,t===void 0?null:t],e},useContext:Ke,useEffect:iu,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,rs(4194308,4,ou.bind(null,t,e),a)},useLayoutEffect:function(e,t){return rs(4194308,4,e,t)},useInsertionEffect:function(e,t){rs(4,2,e,t)},useMemo:function(e,t){var a=et();t=t===void 0?null:t;var n=e();if(Ga){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=et();if(a!==void 0){var i=a(t);if(Ga){Pt(!0);try{a(t)}finally{Pt(!1)}}}else i=t;return n.memoizedState=n.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},n.queue=e,e=e.dispatch=Ep.bind(null,ie,e),[n.memoizedState,e]},useRef:function(e){var t=et();return e={current:e},t.memoizedState=e},useState:function(e){e=tr(e);var t=e.queue,a=bu.bind(null,ie,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:ir,useDeferredValue:function(e,t){var a=et();return sr(a,e,t)},useTransition:function(){var e=tr(!1);return e=hu.bind(null,ie,e.queue,!0,!1),et().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=ie,i=et();if(he){if(a===void 0)throw Error(u(407));a=a()}else{if(a=t(),Ee===null)throw Error(u(349));(de&127)!==0||Yc(n,t,a)}i.memoizedState=a;var s={value:a,getSnapshot:t};return i.queue=s,iu(Ic.bind(null,n,s,e),[e]),n.flags|=2048,yn(9,{destroy:void 0},Fc.bind(null,n,s,a,t),null),a},useId:function(){var e=et(),t=Ee.identifierPrefix;if(he){var a=jt,n=kt;a=(n&~(1<<32-ut(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=ns++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=_p++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:rr,useFormState:Pc,useActionState:Pc,useOptimistic:function(e){var t=et();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=or.bind(null,ie,!0,a),a.dispatch=t,[e,t]},useMemoCache:Jl,useCacheRefresh:function(){return et().memoizedState=Ap.bind(null,ie)},useEffectEvent:function(e){var t=et(),a={impl:e};return t.memoizedState=a,function(){if((ye&2)!==0)throw Error(u(440));return a.impl.apply(void 0,arguments)}}},cr={readContext:Ke,use:ss,useCallback:uu,useContext:Ke,useEffect:nr,useImperativeHandle:cu,useInsertionEffect:lu,useLayoutEffect:ru,useMemo:du,useReducer:ls,useRef:nu,useState:function(){return ls(Ft)},useDebugValue:ir,useDeferredValue:function(e,t){var a=Be();return fu(a,Ne.memoizedState,e,t)},useTransition:function(){var e=ls(Ft)[0],t=Be().memoizedState;return[typeof e=="boolean"?e:ti(e),t]},useSyncExternalStore:qc,useId:gu,useHostTransitionStatus:rr,useFormState:eu,useActionState:eu,useOptimistic:function(e,t){var a=Be();return Xc(a,Ne,e,t)},useMemoCache:Jl,useCacheRefresh:yu};cr.useEffectEvent=su;var Su={readContext:Ke,use:ss,useCallback:uu,useContext:Ke,useEffect:nr,useImperativeHandle:cu,useInsertionEffect:lu,useLayoutEffect:ru,useMemo:du,useReducer:er,useRef:nu,useState:function(){return er(Ft)},useDebugValue:ir,useDeferredValue:function(e,t){var a=Be();return Ne===null?sr(a,e,t):fu(a,Ne.memoizedState,e,t)},useTransition:function(){var e=er(Ft)[0],t=Be().memoizedState;return[typeof e=="boolean"?e:ti(e),t]},useSyncExternalStore:qc,useId:gu,useHostTransitionStatus:rr,useFormState:au,useActionState:au,useOptimistic:function(e,t){var a=Be();return Ne!==null?Xc(a,Ne,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Jl,useCacheRefresh:yu};Su.useEffectEvent=su;function ur(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:D({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var dr={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=yt(),i=ra(n);i.payload=t,a!=null&&(i.callback=a),t=oa(e,i,n),t!==null&&(rt(t,e,n),Wn(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=yt(),i=ra(n);i.tag=1,i.payload=t,a!=null&&(i.callback=a),t=oa(e,i,n),t!==null&&(rt(t,e,n),Wn(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=yt(),n=ra(a);n.tag=2,t!=null&&(n.callback=t),t=oa(e,n,a),t!==null&&(rt(t,e,a),Wn(t,e,a))}};function wu(e,t,a,n,i,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,s,r):t.prototype&&t.prototype.isPureReactComponent?!Fn(a,n)||!Fn(i,s):!0}function Cu(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&dr.enqueueReplaceState(t,t.state,null)}function Ha(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=D({},a));for(var i in e)a[i]===void 0&&(a[i]=e[i])}return a}function Nu(e){qi(e)}function Tu(e){console.error(e)}function Au(e){qi(e)}function us(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function Eu(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function fr(e,t,a){return a=ra(a),a.tag=3,a.payload={element:null},a.callback=function(){us(e,t)},a}function Ou(e){return e=ra(e),e.tag=3,e}function Mu(e,t,a,n){var i=a.type.getDerivedStateFromError;if(typeof i=="function"){var s=n.value;e.payload=function(){return i(s)},e.callback=function(){Eu(t,a,n)}}var r=a.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Eu(t,a,n),typeof i!="function"&&(pa===null?pa=new Set([this]):pa.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})})}function Op(e,t,a,n,i){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&cn(t,a,i,!0),a=ht.current,a!==null){switch(a.tag){case 31:case 13:return Nt===null?Ss():a.alternate===null&&ze===0&&(ze=3),a.flags&=-257,a.flags|=65536,a.lanes=i,n===Wi?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),Ur(e,n,i)),!1;case 22:return a.flags|=65536,n===Wi?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),Ur(e,n,i)),!1}throw Error(u(435,a.tag))}return Ur(e,n,i),Ss(),!1}if(he)return t=ht.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=i,n!==kl&&(e=Error(u(422),{cause:n}),Vn(_t(e,a)))):(n!==kl&&(t=Error(u(423),{cause:n}),Vn(_t(t,a))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,n=_t(n,a),i=fr(e.stateNode,n,i),Yl(e,i),ze!==4&&(ze=2)),!1;var s=Error(u(520),{cause:n});if(s=_t(s,a),di===null?di=[s]:di.push(s),ze!==4&&(ze=2),t===null)return!0;n=_t(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=i&-i,a.lanes|=e,e=fr(a.stateNode,n,e),Yl(a,e),!1;case 1:if(t=a.type,s=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(pa===null||!pa.has(s))))return a.flags|=65536,i&=-i,a.lanes|=i,i=Ou(i),Mu(i,e,a,n),Yl(a,i),!1}a=a.return}while(a!==null);return!1}var hr=Error(u(461)),qe=!1;function $e(e,t,a,n){t.child=e===null?Rc(t,null,a,n):Ba(t,e.child,a,n)}function ku(e,t,a,n,i){a=a.render;var s=t.ref;if("ref"in n){var r={};for(var o in n)o!=="ref"&&(r[o]=n[o])}else r=n;return Ra(t),n=Zl(e,t,a,r,s,i),o=Kl(),e!==null&&!qe?($l(e,t,i),It(e,t,i)):(he&&o&&Ol(t),t.flags|=1,$e(e,t,n,i),t.child)}function ju(e,t,a,n,i){if(e===null){var s=a.type;return typeof s=="function"&&!Tl(s)&&s.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=s,Du(e,t,s,n,i)):(e=Qi(a.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!_r(e,i)){var r=s.memoizedProps;if(a=a.compare,a=a!==null?a:Fn,a(r,n)&&e.ref===t.ref)return It(e,t,i)}return t.flags|=1,e=Bt(s,n),e.ref=t.ref,e.return=t,t.child=e}function Du(e,t,a,n,i){if(e!==null){var s=e.memoizedProps;if(Fn(s,n)&&e.ref===t.ref)if(qe=!1,t.pendingProps=n=s,_r(e,i))(e.flags&131072)!==0&&(qe=!0);else return t.lanes=e.lanes,It(e,t,i)}return pr(e,t,a,n,i)}function Ru(e,t,a,n){var i=n.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(s=s!==null?s.baseLanes|a:a,e!==null){for(n=t.child=e.child,i=0;n!==null;)i=i|n.lanes|n.childLanes,n=n.sibling;n=i&~s}else n=0,t.child=null;return zu(e,t,s,a,n)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ki(t,s!==null?s.cachePool:null),s!==null?Uc(t,s):Il(),Bc(t);else return n=t.lanes=536870912,zu(e,t,s!==null?s.baseLanes|a:a,a,n)}else s!==null?(Ki(t,s.cachePool),Uc(t,s),ua(),t.memoizedState=null):(e!==null&&Ki(t,null),Il(),ua());return $e(e,t,i,a),t.child}function ii(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function zu(e,t,a,n,i){var s=Bl();return s=s===null?null:{parent:Ge._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&Ki(t,null),Il(),Bc(t),e!==null&&cn(e,t,n,!0),t.childLanes=i,null}function ds(e,t){return t=hs({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Lu(e,t,a){return Ba(t,e.child,null,a),e=ds(t,t.pendingProps),e.flags|=2,pt(t),t.memoizedState=null,e}function Mp(e,t,a){var n=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(he){if(n.mode==="hidden")return e=ds(t,n),t.lanes=536870912,ii(null,e);if(Vl(t),(e=Me)?(e=Zd(e,Ct),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:aa!==null?{id:kt,overflow:jt}:null,retryLane:536870912,hydrationErrors:null},a=vc(e),a.return=t,t.child=a,Ze=t,Me=null)):e=null,e===null)throw ia(t);return t.lanes=536870912,null}return ds(t,n)}var s=e.memoizedState;if(s!==null){var r=s.dehydrated;if(Vl(t),i)if(t.flags&256)t.flags&=-257,t=Lu(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(u(558));else if(qe||cn(e,t,a,!1),i=(a&e.childLanes)!==0,qe||i){if(n=Ee,n!==null&&(r=To(n,a),r!==0&&r!==s.retryLane))throw s.retryLane=r,Ma(e,r),rt(n,e,r),hr;Ss(),t=Lu(e,t,a)}else e=s.treeContext,Me=Tt(r.nextSibling),Ze=t,he=!0,na=null,Ct=!1,e!==null&&Sc(t,e),t=ds(t,n),t.flags|=4096;return t}return e=Bt(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function fs(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(u(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function pr(e,t,a,n,i){return Ra(t),a=Zl(e,t,a,n,void 0,i),n=Kl(),e!==null&&!qe?($l(e,t,i),It(e,t,i)):(he&&n&&Ol(t),t.flags|=1,$e(e,t,a,i),t.child)}function Uu(e,t,a,n,i,s){return Ra(t),t.updateQueue=null,a=Hc(t,n,a,i),Gc(e),n=Kl(),e!==null&&!qe?($l(e,t,s),It(e,t,s)):(he&&n&&Ol(t),t.flags|=1,$e(e,t,a,s),t.child)}function Bu(e,t,a,n,i){if(Ra(t),t.stateNode===null){var s=sn,r=a.contextType;typeof r=="object"&&r!==null&&(s=Ke(r)),s=new a(n,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=dr,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=n,s.state=t.memoizedState,s.refs={},Hl(t),r=a.contextType,s.context=typeof r=="object"&&r!==null?Ke(r):sn,s.state=t.memoizedState,r=a.getDerivedStateFromProps,typeof r=="function"&&(ur(t,a,r,n),s.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&dr.enqueueReplaceState(s,s.state,null),Pn(t,n,s,i),Jn(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,c=Ha(a,o);s.props=c;var m=s.context,w=a.contextType;r=sn,typeof w=="object"&&w!==null&&(r=Ke(w));var N=a.getDerivedStateFromProps;w=typeof N=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,w||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||m!==r)&&Cu(t,s,n,r),la=!1;var g=t.memoizedState;s.state=g,Pn(t,n,s,i),Jn(),m=t.memoizedState,o||g!==m||la?(typeof N=="function"&&(ur(t,a,N,n),m=t.memoizedState),(c=la||wu(t,a,c,n,g,m,r))?(w||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=m),s.props=n,s.state=m,s.context=r,n=c):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{s=t.stateNode,ql(e,t),r=t.memoizedProps,w=Ha(a,r),s.props=w,N=t.pendingProps,g=s.context,m=a.contextType,c=sn,typeof m=="object"&&m!==null&&(c=Ke(m)),o=a.getDerivedStateFromProps,(m=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==N||g!==c)&&Cu(t,s,n,c),la=!1,g=t.memoizedState,s.state=g,Pn(t,n,s,i),Jn();var v=t.memoizedState;r!==N||g!==v||la||e!==null&&e.dependencies!==null&&Xi(e.dependencies)?(typeof o=="function"&&(ur(t,a,o,n),v=t.memoizedState),(w=la||wu(t,a,w,n,g,v,c)||e!==null&&e.dependencies!==null&&Xi(e.dependencies))?(m||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(n,v,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(n,v,c)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=v),s.props=n,s.state=v,s.context=c,n=w):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),n=!1)}return s=n,fs(e,t),n=(t.flags&128)!==0,s||n?(s=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&n?(t.child=Ba(t,e.child,null,i),t.child=Ba(t,null,a,i)):$e(e,t,a,i),t.memoizedState=s.state,e=t.child):e=It(e,t,i),e}function Gu(e,t,a,n){return ja(),t.flags|=256,$e(e,t,a,n),t.child}var mr={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function gr(e){return{baseLanes:e,cachePool:Ec()}}function yr(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=gt),e}function Hu(e,t,a){var n=t.pendingProps,i=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(Ue.current&2)!==0),r&&(i=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(he){if(i?ca(t):ua(),(e=Me)?(e=Zd(e,Ct),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:aa!==null?{id:kt,overflow:jt}:null,retryLane:536870912,hydrationErrors:null},a=vc(e),a.return=t,t.child=a,Ze=t,Me=null)):e=null,e===null)throw ia(t);return Pr(e)?t.lanes=32:t.lanes=536870912,null}var o=n.children;return n=n.fallback,i?(ua(),i=t.mode,o=hs({mode:"hidden",children:o},i),n=ka(n,i,a,null),o.return=t,n.return=t,o.sibling=n,t.child=o,n=t.child,n.memoizedState=gr(a),n.childLanes=yr(e,r,a),t.memoizedState=mr,ii(null,n)):(ca(t),br(t,o))}var c=e.memoizedState;if(c!==null&&(o=c.dehydrated,o!==null)){if(s)t.flags&256?(ca(t),t.flags&=-257,t=vr(e,t,a)):t.memoizedState!==null?(ua(),t.child=e.child,t.flags|=128,t=null):(ua(),o=n.fallback,i=t.mode,n=hs({mode:"visible",children:n.children},i),o=ka(o,i,a,null),o.flags|=2,n.return=t,o.return=t,n.sibling=o,t.child=n,Ba(t,e.child,null,a),n=t.child,n.memoizedState=gr(a),n.childLanes=yr(e,r,a),t.memoizedState=mr,t=ii(null,n));else if(ca(t),Pr(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var m=r.dgst;r=m,n=Error(u(419)),n.stack="",n.digest=r,Vn({value:n,source:null,stack:null}),t=vr(e,t,a)}else if(qe||cn(e,t,a,!1),r=(a&e.childLanes)!==0,qe||r){if(r=Ee,r!==null&&(n=To(r,a),n!==0&&n!==c.retryLane))throw c.retryLane=n,Ma(e,n),rt(r,e,n),hr;Jr(o)||Ss(),t=vr(e,t,a)}else Jr(o)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,Me=Tt(o.nextSibling),Ze=t,he=!0,na=null,Ct=!1,e!==null&&Sc(t,e),t=br(t,n.children),t.flags|=4096);return t}return i?(ua(),o=n.fallback,i=t.mode,c=e.child,m=c.sibling,n=Bt(c,{mode:"hidden",children:n.children}),n.subtreeFlags=c.subtreeFlags&65011712,m!==null?o=Bt(m,o):(o=ka(o,i,a,null),o.flags|=2),o.return=t,n.return=t,n.sibling=o,t.child=n,ii(null,n),n=t.child,o=e.child.memoizedState,o===null?o=gr(a):(i=o.cachePool,i!==null?(c=Ge._currentValue,i=i.parent!==c?{parent:c,pool:c}:i):i=Ec(),o={baseLanes:o.baseLanes|a,cachePool:i}),n.memoizedState=o,n.childLanes=yr(e,r,a),t.memoizedState=mr,ii(e.child,n)):(ca(t),a=e.child,e=a.sibling,a=Bt(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=a,t.memoizedState=null,a)}function br(e,t){return t=hs({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function hs(e,t){return e=ft(22,e,null,t),e.lanes=0,e}function vr(e,t,a){return Ba(t,e.child,null,a),e=br(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function qu(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Rl(e.return,t,a)}function xr(e,t,a,n,i,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:i,treeForkCount:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=n,r.tail=a,r.tailMode=i,r.treeForkCount=s)}function Yu(e,t,a){var n=t.pendingProps,i=n.revealOrder,s=n.tail;n=n.children;var r=Ue.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,U(Ue,r),$e(e,t,n,a),n=he?Qn:0,!o&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&qu(e,a,t);else if(e.tag===19)qu(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(a=t.child,i=null;a!==null;)e=a.alternate,e!==null&&ts(e)===null&&(i=a),a=a.sibling;a=i,a===null?(i=t.child,t.child=null):(i=a.sibling,a.sibling=null),xr(t,!1,i,a,s,n);break;case"backwards":case"unstable_legacy-backwards":for(a=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ts(e)===null){t.child=i;break}e=i.sibling,i.sibling=a,a=i,i=e}xr(t,!0,a,null,s,n);break;case"together":xr(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function It(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ha|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(cn(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(u(153));if(t.child!==null){for(e=t.child,a=Bt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Bt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function _r(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Xi(e)))}function kp(e,t,a){switch(t.tag){case 3:Pe(t,t.stateNode.containerInfo),sa(t,Ge,e.memoizedState.cache),ja();break;case 27:case 5:Mn(t);break;case 4:Pe(t,t.stateNode.containerInfo);break;case 10:sa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Vl(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(ca(t),t.flags|=128,null):(a&t.child.childLanes)!==0?Hu(e,t,a):(ca(t),e=It(e,t,a),e!==null?e.sibling:null);ca(t);break;case 19:var i=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(cn(e,t,a,!1),n=(a&t.childLanes)!==0),i){if(n)return Yu(e,t,a);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),U(Ue,Ue.current),n)break;return null;case 22:return t.lanes=0,Ru(e,t,a,t.pendingProps);case 24:sa(t,Ge,e.memoizedState.cache)}return It(e,t,a)}function Fu(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)qe=!0;else{if(!_r(e,a)&&(t.flags&128)===0)return qe=!1,kp(e,t,a);qe=(e.flags&131072)!==0}else qe=!1,he&&(t.flags&1048576)!==0&&_c(t,Qn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=La(t.elementType),t.type=e,typeof e=="function")Tl(e)?(n=Ha(e,n),t.tag=1,t=Bu(null,t,e,n,a)):(t.tag=0,t=pr(null,t,e,n,a));else{if(e!=null){var i=e.$$typeof;if(i===$){t.tag=11,t=ku(null,t,e,n,a);break e}else if(i===H){t.tag=14,t=ju(null,t,e,n,a);break e}}throw t=Oe(e)||e,Error(u(306,t,""))}}return t;case 0:return pr(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,i=Ha(n,t.pendingProps),Bu(e,t,n,i,a);case 3:e:{if(Pe(t,t.stateNode.containerInfo),e===null)throw Error(u(387));n=t.pendingProps;var s=t.memoizedState;i=s.element,ql(e,t),Pn(t,n,null,a);var r=t.memoizedState;if(n=r.cache,sa(t,Ge,n),n!==s.cache&&zl(t,[Ge],a,!0),Jn(),n=r.element,s.isDehydrated)if(s={element:n,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=Gu(e,t,n,a);break e}else if(n!==i){i=_t(Error(u(424)),t),Vn(i),t=Gu(e,t,n,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Me=Tt(e.firstChild),Ze=t,he=!0,na=null,Ct=!0,a=Rc(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(ja(),n===i){t=It(e,t,a);break e}$e(e,t,n,a)}t=t.child}return t;case 26:return fs(e,t),e===null?(a=ef(t.type,null,t.pendingProps,null))?t.memoizedState=a:he||(a=t.type,e=t.pendingProps,n=Os(le.current).createElement(a),n[Xe]=t,n[tt]=e,We(n,a,e),Qe(n),t.stateNode=n):t.memoizedState=ef(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Mn(t),e===null&&he&&(n=t.stateNode=Wd(t.type,t.pendingProps,le.current),Ze=t,Ct=!0,i=Me,ba(t.type)?(eo=i,Me=Tt(n.firstChild)):Me=i),$e(e,t,t.pendingProps.children,a),fs(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&he&&((i=n=Me)&&(n=rm(n,t.type,t.pendingProps,Ct),n!==null?(t.stateNode=n,Ze=t,Me=Tt(n.firstChild),Ct=!1,i=!0):i=!1),i||ia(t)),Mn(t),i=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,n=s.children,Kr(i,s)?n=null:r!==null&&Kr(i,r)&&(t.flags|=32),t.memoizedState!==null&&(i=Zl(e,t,Sp,null,null,a),vi._currentValue=i),fs(e,t),$e(e,t,n,a),t.child;case 6:return e===null&&he&&((e=a=Me)&&(a=om(a,t.pendingProps,Ct),a!==null?(t.stateNode=a,Ze=t,Me=null,e=!0):e=!1),e||ia(t)),null;case 13:return Hu(e,t,a);case 4:return Pe(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Ba(t,null,n,a):$e(e,t,n,a),t.child;case 11:return ku(e,t,t.type,t.pendingProps,a);case 7:return $e(e,t,t.pendingProps,a),t.child;case 8:return $e(e,t,t.pendingProps.children,a),t.child;case 12:return $e(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,sa(t,t.type,n.value),$e(e,t,n.children,a),t.child;case 9:return i=t.type._context,n=t.pendingProps.children,Ra(t),i=Ke(i),n=n(i),t.flags|=1,$e(e,t,n,a),t.child;case 14:return ju(e,t,t.type,t.pendingProps,a);case 15:return Du(e,t,t.type,t.pendingProps,a);case 19:return Yu(e,t,a);case 31:return Mp(e,t,a);case 22:return Ru(e,t,a,t.pendingProps);case 24:return Ra(t),n=Ke(Ge),e===null?(i=Bl(),i===null&&(i=Ee,s=Ll(),i.pooledCache=s,s.refCount++,s!==null&&(i.pooledCacheLanes|=a),i=s),t.memoizedState={parent:n,cache:i},Hl(t),sa(t,Ge,i)):((e.lanes&a)!==0&&(ql(e,t),Pn(t,null,null,a),Jn()),i=e.memoizedState,s=t.memoizedState,i.parent!==n?(i={parent:n,cache:n},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),sa(t,Ge,n)):(n=s.cache,sa(t,Ge,n),n!==i.cache&&zl(t,[Ge],a,!0))),$e(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(u(156,t.tag))}function Qt(e){e.flags|=4}function Sr(e,t,a,n,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(gd())e.flags|=8192;else throw Ua=Wi,Gl}else e.flags&=-16777217}function Iu(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!lf(t))if(gd())e.flags|=8192;else throw Ua=Wi,Gl}function ps(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?wo():536870912,e.lanes|=t,_n|=t)}function si(e,t){if(!he)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ke(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags&65011712,n|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)a|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function jp(e,t,a){var n=t.pendingProps;switch(Ml(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ke(t),null;case 1:return ke(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),qt(Ge),Le(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(on(t)?Qt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,jl())),ke(t),null;case 26:var i=t.type,s=t.memoizedState;return e===null?(Qt(t),s!==null?(ke(t),Iu(t,s)):(ke(t),Sr(t,i,null,n,a))):s?s!==e.memoizedState?(Qt(t),ke(t),Iu(t,s)):(ke(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&Qt(t),ke(t),Sr(t,i,e,n,a)),null;case 27:if(Ni(t),a=le.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Qt(t);else{if(!n){if(t.stateNode===null)throw Error(u(166));return ke(t),null}e=F.current,on(t)?wc(t):(e=Wd(i,n,a),t.stateNode=e,Qt(t))}return ke(t),null;case 5:if(Ni(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Qt(t);else{if(!n){if(t.stateNode===null)throw Error(u(166));return ke(t),null}if(s=F.current,on(t))wc(t);else{var r=Os(le.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof n.is=="string"?r.createElement("select",{is:n.is}):r.createElement("select"),n.multiple?s.multiple=!0:n.size&&(s.size=n.size);break;default:s=typeof n.is=="string"?r.createElement(i,{is:n.is}):r.createElement(i)}}s[Xe]=t,s[tt]=n;e:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break e;for(;r.sibling===null;){if(r.return===null||r.return===t)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=s;e:switch(We(s,i,n),i){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&Qt(t)}}return ke(t),Sr(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&Qt(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(u(166));if(e=le.current,on(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,i=Ze,i!==null)switch(i.tag){case 27:case 5:n=i.memoizedProps}e[Xe]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||Hd(e.nodeValue,a)),e||ia(t,!0)}else e=Os(e).createTextNode(n),e[Xe]=t,t.stateNode=e}return ke(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=on(t),a!==null){if(e===null){if(!n)throw Error(u(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(557));e[Xe]=t}else ja(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ke(t),e=!1}else a=jl(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(pt(t),t):(pt(t),null);if((t.flags&128)!==0)throw Error(u(558))}return ke(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=on(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(u(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(u(317));i[Xe]=t}else ja(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;ke(t),i=!1}else i=jl(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(pt(t),t):(pt(t),null)}return pt(t),(t.flags&128)!==0?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,i=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(i=n.alternate.memoizedState.cachePool.pool),s=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(s=n.memoizedState.cachePool.pool),s!==i&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),ps(t,t.updateQueue),ke(t),null);case 4:return Le(),e===null&&Ir(t.stateNode.containerInfo),ke(t),null;case 10:return qt(t.type),ke(t),null;case 19:if(T(Ue),n=t.memoizedState,n===null)return ke(t),null;if(i=(t.flags&128)!==0,s=n.rendering,s===null)if(i)si(n,!1);else{if(ze!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=ts(e),s!==null){for(t.flags|=128,si(n,!1),e=s.updateQueue,t.updateQueue=e,ps(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)bc(a,e),a=a.sibling;return U(Ue,Ue.current&1|2),he&&Gt(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&ot()>vs&&(t.flags|=128,i=!0,si(n,!1),t.lanes=4194304)}else{if(!i)if(e=ts(s),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,ps(t,e),si(n,!0),n.tail===null&&n.tailMode==="hidden"&&!s.alternate&&!he)return ke(t),null}else 2*ot()-n.renderingStartTime>vs&&a!==536870912&&(t.flags|=128,i=!0,si(n,!1),t.lanes=4194304);n.isBackwards?(s.sibling=t.child,t.child=s):(e=n.last,e!==null?e.sibling=s:t.child=s,n.last=s)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=ot(),e.sibling=null,a=Ue.current,U(Ue,i?a&1|2:a&1),he&&Gt(t,n.treeForkCount),e):(ke(t),null);case 22:case 23:return pt(t),Ql(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(ke(t),t.subtreeFlags&6&&(t.flags|=8192)):ke(t),a=t.updateQueue,a!==null&&ps(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&T(za),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),qt(Ge),ke(t),null;case 25:return null;case 30:return null}throw Error(u(156,t.tag))}function Dp(e,t){switch(Ml(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return qt(Ge),Le(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ni(t),null;case 31:if(t.memoizedState!==null){if(pt(t),t.alternate===null)throw Error(u(340));ja()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(pt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(u(340));ja()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return T(Ue),null;case 4:return Le(),null;case 10:return qt(t.type),null;case 22:case 23:return pt(t),Ql(),e!==null&&T(za),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return qt(Ge),null;case 25:return null;default:return null}}function Qu(e,t){switch(Ml(t),t.tag){case 3:qt(Ge),Le();break;case 26:case 27:case 5:Ni(t);break;case 4:Le();break;case 31:t.memoizedState!==null&&pt(t);break;case 13:pt(t);break;case 19:T(Ue);break;case 10:qt(t.type);break;case 22:case 23:pt(t),Ql(),e!==null&&T(za);break;case 24:qt(Ge)}}function li(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var i=n.next;a=i;do{if((a.tag&e)===e){n=void 0;var s=a.create,r=a.inst;n=s(),r.destroy=n}a=a.next}while(a!==i)}}catch(o){we(t,t.return,o)}}function da(e,t,a){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){var r=n.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,i=t;var c=a,m=o;try{m()}catch(w){we(i,c,w)}}}n=n.next}while(n!==s)}}catch(w){we(t,t.return,w)}}function Vu(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Lc(t,a)}catch(n){we(e,e.return,n)}}}function Xu(e,t,a){a.props=Ha(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){we(e,t,n)}}function ri(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(i){we(e,t,i)}}function Dt(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(i){we(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(i){we(e,t,i)}else a.current=null}function Zu(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(i){we(e,e.return,i)}}function wr(e,t,a){try{var n=e.stateNode;tm(n,e.type,a,t),n[tt]=t}catch(i){we(e,e.return,i)}}function Ku(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ba(e.type)||e.tag===4}function Cr(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ku(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ba(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Nr(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Lt));else if(n!==4&&(n===27&&ba(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Nr(e,t,a),e=e.sibling;e!==null;)Nr(e,t,a),e=e.sibling}function ms(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&ba(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(ms(e,t,a),e=e.sibling;e!==null;)ms(e,t,a),e=e.sibling}function $u(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);We(t,n,a),t[Xe]=e,t[tt]=a}catch(s){we(e,e.return,s)}}var Vt=!1,Ye=!1,Tr=!1,Wu=typeof WeakSet=="function"?WeakSet:Set,Ve=null;function Rp(e,t){if(e=e.containerInfo,Xr=Ls,e=cc(e),vl(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var i=n.anchorOffset,s=n.focusNode;n=n.focusOffset;try{a.nodeType,s.nodeType}catch{a=null;break e}var r=0,o=-1,c=-1,m=0,w=0,N=e,g=null;t:for(;;){for(var v;N!==a||i!==0&&N.nodeType!==3||(o=r+i),N!==s||n!==0&&N.nodeType!==3||(c=r+n),N.nodeType===3&&(r+=N.nodeValue.length),(v=N.firstChild)!==null;)g=N,N=v;for(;;){if(N===e)break t;if(g===a&&++m===i&&(o=r),g===s&&++w===n&&(c=r),(v=N.nextSibling)!==null)break;N=g,g=N.parentNode}N=v}a=o===-1||c===-1?null:{start:o,end:c}}else a=null}a=a||{start:0,end:0}}else a=null;for(Zr={focusedElem:e,selectionRange:a},Ls=!1,Ve=t;Ve!==null;)if(t=Ve,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Ve=e;else for(;Ve!==null;){switch(t=Ve,s=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)i=e[a],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&s!==null){e=void 0,a=t,i=s.memoizedProps,s=s.memoizedState,n=a.stateNode;try{var q=Ha(a.type,i);e=n.getSnapshotBeforeUpdate(q,s),n.__reactInternalSnapshotBeforeUpdate=e}catch(W){we(a,a.return,W)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)Wr(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Wr(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(u(163))}if(e=t.sibling,e!==null){e.return=t.return,Ve=e;break}Ve=t.return}}function Ju(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:Zt(e,a),n&4&&li(5,a);break;case 1:if(Zt(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(r){we(a,a.return,r)}else{var i=Ha(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){we(a,a.return,r)}}n&64&&Vu(a),n&512&&ri(a,a.return);break;case 3:if(Zt(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Lc(e,t)}catch(r){we(a,a.return,r)}}break;case 27:t===null&&n&4&&$u(a);case 26:case 5:Zt(e,a),t===null&&n&4&&Zu(a),n&512&&ri(a,a.return);break;case 12:Zt(e,a);break;case 31:Zt(e,a),n&4&&td(e,a);break;case 13:Zt(e,a),n&4&&ad(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Fp.bind(null,a),cm(e,a))));break;case 22:if(n=a.memoizedState!==null||Vt,!n){t=t!==null&&t.memoizedState!==null||Ye,i=Vt;var s=Ye;Vt=n,(Ye=t)&&!s?Kt(e,a,(a.subtreeFlags&8772)!==0):Zt(e,a),Vt=i,Ye=s}break;case 30:break;default:Zt(e,a)}}function Pu(e){var t=e.alternate;t!==null&&(e.alternate=null,Pu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&al(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var je=null,nt=!1;function Xt(e,t,a){for(a=a.child;a!==null;)ed(e,t,a),a=a.sibling}function ed(e,t,a){if(ct&&typeof ct.onCommitFiberUnmount=="function")try{ct.onCommitFiberUnmount(kn,a)}catch{}switch(a.tag){case 26:Ye||Dt(a,t),Xt(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ye||Dt(a,t);var n=je,i=nt;ba(a.type)&&(je=a.stateNode,nt=!1),Xt(e,t,a),gi(a.stateNode),je=n,nt=i;break;case 5:Ye||Dt(a,t);case 6:if(n=je,i=nt,je=null,Xt(e,t,a),je=n,nt=i,je!==null)if(nt)try{(je.nodeType===9?je.body:je.nodeName==="HTML"?je.ownerDocument.body:je).removeChild(a.stateNode)}catch(s){we(a,t,s)}else try{je.removeChild(a.stateNode)}catch(s){we(a,t,s)}break;case 18:je!==null&&(nt?(e=je,Vd(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),On(e)):Vd(je,a.stateNode));break;case 4:n=je,i=nt,je=a.stateNode.containerInfo,nt=!0,Xt(e,t,a),je=n,nt=i;break;case 0:case 11:case 14:case 15:da(2,a,t),Ye||da(4,a,t),Xt(e,t,a);break;case 1:Ye||(Dt(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&Xu(a,t,n)),Xt(e,t,a);break;case 21:Xt(e,t,a);break;case 22:Ye=(n=Ye)||a.memoizedState!==null,Xt(e,t,a),Ye=n;break;default:Xt(e,t,a)}}function td(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{On(e)}catch(a){we(t,t.return,a)}}}function ad(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{On(e)}catch(a){we(t,t.return,a)}}function zp(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Wu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Wu),t;default:throw Error(u(435,e.tag))}}function gs(e,t){var a=zp(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var i=Ip.bind(null,e,n);n.then(i,i)}})}function it(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var i=a[n],s=e,r=t,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(ba(o.type)){je=o.stateNode,nt=!1;break e}break;case 5:je=o.stateNode,nt=!1;break e;case 3:case 4:je=o.stateNode.containerInfo,nt=!0;break e}o=o.return}if(je===null)throw Error(u(160));ed(s,r,i),je=null,nt=!1,s=i.alternate,s!==null&&(s.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)nd(t,e),t=t.sibling}var Ot=null;function nd(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:it(t,e),st(e),n&4&&(da(3,e,e.return),li(3,e),da(5,e,e.return));break;case 1:it(t,e),st(e),n&512&&(Ye||a===null||Dt(a,a.return)),n&64&&Vt&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var i=Ot;if(it(t,e),st(e),n&512&&(Ye||a===null||Dt(a,a.return)),n&4){var s=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,i=i.ownerDocument||i;t:switch(n){case"title":s=i.getElementsByTagName("title")[0],(!s||s[Rn]||s[Xe]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=i.createElement(n),i.head.insertBefore(s,i.querySelector("head > title"))),We(s,n,a),s[Xe]=e,Qe(s),n=s;break e;case"link":var r=nf("link","href",i).get(n+(a.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){r.splice(o,1);break t}}s=i.createElement(n),We(s,n,a),i.head.appendChild(s);break;case"meta":if(r=nf("meta","content",i).get(n+(a.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){r.splice(o,1);break t}}s=i.createElement(n),We(s,n,a),i.head.appendChild(s);break;default:throw Error(u(468,n))}s[Xe]=e,Qe(s),n=s}e.stateNode=n}else sf(i,e.type,e.stateNode);else e.stateNode=af(i,n,e.memoizedProps);else s!==n?(s===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):s.count--,n===null?sf(i,e.type,e.stateNode):af(i,n,e.memoizedProps)):n===null&&e.stateNode!==null&&wr(e,e.memoizedProps,a.memoizedProps)}break;case 27:it(t,e),st(e),n&512&&(Ye||a===null||Dt(a,a.return)),a!==null&&n&4&&wr(e,e.memoizedProps,a.memoizedProps);break;case 5:if(it(t,e),st(e),n&512&&(Ye||a===null||Dt(a,a.return)),e.flags&32){i=e.stateNode;try{Wa(i,"")}catch(q){we(e,e.return,q)}}n&4&&e.stateNode!=null&&(i=e.memoizedProps,wr(e,i,a!==null?a.memoizedProps:i)),n&1024&&(Tr=!0);break;case 6:if(it(t,e),st(e),n&4){if(e.stateNode===null)throw Error(u(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(q){we(e,e.return,q)}}break;case 3:if(js=null,i=Ot,Ot=Ms(t.containerInfo),it(t,e),Ot=i,st(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{On(t.containerInfo)}catch(q){we(e,e.return,q)}Tr&&(Tr=!1,id(e));break;case 4:n=Ot,Ot=Ms(e.stateNode.containerInfo),it(t,e),st(e),Ot=n;break;case 12:it(t,e),st(e);break;case 31:it(t,e),st(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,gs(e,n)));break;case 13:it(t,e),st(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(bs=ot()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,gs(e,n)));break;case 22:i=e.memoizedState!==null;var c=a!==null&&a.memoizedState!==null,m=Vt,w=Ye;if(Vt=m||i,Ye=w||c,it(t,e),Ye=w,Vt=m,st(e),n&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(a===null||c||Vt||Ye||qa(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){c=a=t;try{if(s=c.stateNode,i)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=c.stateNode;var N=c.memoizedProps.style,g=N!=null&&N.hasOwnProperty("display")?N.display:null;o.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(q){we(c,c.return,q)}}}else if(t.tag===6){if(a===null){c=t;try{c.stateNode.nodeValue=i?"":c.memoizedProps}catch(q){we(c,c.return,q)}}}else if(t.tag===18){if(a===null){c=t;try{var v=c.stateNode;i?Xd(v,!0):Xd(c.stateNode,!1)}catch(q){we(c,c.return,q)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,gs(e,a))));break;case 19:it(t,e),st(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,gs(e,n)));break;case 30:break;case 21:break;default:it(t,e),st(e)}}function st(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(Ku(n)){a=n;break}n=n.return}if(a==null)throw Error(u(160));switch(a.tag){case 27:var i=a.stateNode,s=Cr(e);ms(e,s,i);break;case 5:var r=a.stateNode;a.flags&32&&(Wa(r,""),a.flags&=-33);var o=Cr(e);ms(e,o,r);break;case 3:case 4:var c=a.stateNode.containerInfo,m=Cr(e);Nr(e,m,c);break;default:throw Error(u(161))}}catch(w){we(e,e.return,w)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function id(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;id(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Zt(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Ju(e,t.alternate,t),t=t.sibling}function qa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:da(4,t,t.return),qa(t);break;case 1:Dt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Xu(t,t.return,a),qa(t);break;case 27:gi(t.stateNode);case 26:case 5:Dt(t,t.return),qa(t);break;case 22:t.memoizedState===null&&qa(t);break;case 30:qa(t);break;default:qa(t)}e=e.sibling}}function Kt(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,i=e,s=t,r=s.flags;switch(s.tag){case 0:case 11:case 15:Kt(i,s,a),li(4,s);break;case 1:if(Kt(i,s,a),n=s,i=n.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(m){we(n,n.return,m)}if(n=s,i=n.updateQueue,i!==null){var o=n.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)zc(c[i],o)}catch(m){we(n,n.return,m)}}a&&r&64&&Vu(s),ri(s,s.return);break;case 27:$u(s);case 26:case 5:Kt(i,s,a),a&&n===null&&r&4&&Zu(s),ri(s,s.return);break;case 12:Kt(i,s,a);break;case 31:Kt(i,s,a),a&&r&4&&td(i,s);break;case 13:Kt(i,s,a),a&&r&4&&ad(i,s);break;case 22:s.memoizedState===null&&Kt(i,s,a),ri(s,s.return);break;case 30:break;default:Kt(i,s,a)}t=t.sibling}}function Ar(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Xn(a))}function Er(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Xn(e))}function Mt(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)sd(e,t,a,n),t=t.sibling}function sd(e,t,a,n){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Mt(e,t,a,n),i&2048&&li(9,t);break;case 1:Mt(e,t,a,n);break;case 3:Mt(e,t,a,n),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Xn(e)));break;case 12:if(i&2048){Mt(e,t,a,n),e=t.stateNode;try{var s=t.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){we(t,t.return,c)}}else Mt(e,t,a,n);break;case 31:Mt(e,t,a,n);break;case 13:Mt(e,t,a,n);break;case 23:break;case 22:s=t.stateNode,r=t.alternate,t.memoizedState!==null?s._visibility&2?Mt(e,t,a,n):oi(e,t):s._visibility&2?Mt(e,t,a,n):(s._visibility|=2,bn(e,t,a,n,(t.subtreeFlags&10256)!==0||!1)),i&2048&&Ar(r,t);break;case 24:Mt(e,t,a,n),i&2048&&Er(t.alternate,t);break;default:Mt(e,t,a,n)}}function bn(e,t,a,n,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,r=t,o=a,c=n,m=r.flags;switch(r.tag){case 0:case 11:case 15:bn(s,r,o,c,i),li(8,r);break;case 23:break;case 22:var w=r.stateNode;r.memoizedState!==null?w._visibility&2?bn(s,r,o,c,i):oi(s,r):(w._visibility|=2,bn(s,r,o,c,i)),i&&m&2048&&Ar(r.alternate,r);break;case 24:bn(s,r,o,c,i),i&&m&2048&&Er(r.alternate,r);break;default:bn(s,r,o,c,i)}t=t.sibling}}function oi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,i=n.flags;switch(n.tag){case 22:oi(a,n),i&2048&&Ar(n.alternate,n);break;case 24:oi(a,n),i&2048&&Er(n.alternate,n);break;default:oi(a,n)}t=t.sibling}}var ci=8192;function vn(e,t,a){if(e.subtreeFlags&ci)for(e=e.child;e!==null;)ld(e,t,a),e=e.sibling}function ld(e,t,a){switch(e.tag){case 26:vn(e,t,a),e.flags&ci&&e.memoizedState!==null&&_m(a,Ot,e.memoizedState,e.memoizedProps);break;case 5:vn(e,t,a);break;case 3:case 4:var n=Ot;Ot=Ms(e.stateNode.containerInfo),vn(e,t,a),Ot=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=ci,ci=16777216,vn(e,t,a),ci=n):vn(e,t,a));break;default:vn(e,t,a)}}function rd(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ui(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Ve=n,cd(n,e)}rd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)od(e),e=e.sibling}function od(e){switch(e.tag){case 0:case 11:case 15:ui(e),e.flags&2048&&da(9,e,e.return);break;case 3:ui(e);break;case 12:ui(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ys(e)):ui(e);break;default:ui(e)}}function ys(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];Ve=n,cd(n,e)}rd(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:da(8,t,t.return),ys(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,ys(t));break;default:ys(t)}e=e.sibling}}function cd(e,t){for(;Ve!==null;){var a=Ve;switch(a.tag){case 0:case 11:case 15:da(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:Xn(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,Ve=n;else e:for(a=e;Ve!==null;){n=Ve;var i=n.sibling,s=n.return;if(Pu(n),n===a){Ve=null;break e}if(i!==null){i.return=s,Ve=i;break e}Ve=s}}}var Lp={getCacheForType:function(e){var t=Ke(Ge),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return Ke(Ge).controller.signal}},Up=typeof WeakMap=="function"?WeakMap:Map,ye=0,Ee=null,re=null,de=0,Se=0,mt=null,fa=!1,xn=!1,Or=!1,$t=0,ze=0,ha=0,Ya=0,Mr=0,gt=0,_n=0,di=null,lt=null,kr=!1,bs=0,ud=0,vs=1/0,xs=null,pa=null,Ie=0,ma=null,Sn=null,Wt=0,jr=0,Dr=null,dd=null,fi=0,Rr=null;function yt(){return(ye&2)!==0&&de!==0?de&-de:x.T!==null?Hr():Ao()}function fd(){if(gt===0)if((de&536870912)===0||he){var e=Ei;Ei<<=1,(Ei&3932160)===0&&(Ei=262144),gt=e}else gt=536870912;return e=ht.current,e!==null&&(e.flags|=32),gt}function rt(e,t,a){(e===Ee&&(Se===2||Se===9)||e.cancelPendingCommit!==null)&&(wn(e,0),ga(e,de,gt,!1)),Dn(e,a),((ye&2)===0||e!==Ee)&&(e===Ee&&((ye&2)===0&&(Ya|=a),ze===4&&ga(e,de,gt,!1)),Rt(e))}function hd(e,t,a){if((ye&6)!==0)throw Error(u(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||jn(e,t),i=n?Hp(e,t):Lr(e,t,!0),s=n;do{if(i===0){xn&&!n&&ga(e,t,0,!1);break}else{if(a=e.current.alternate,s&&!Bp(a)){i=Lr(e,t,!1),s=!1;continue}if(i===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;e:{var o=e;i=di;var c=o.current.memoizedState.isDehydrated;if(c&&(wn(o,r).flags|=256),r=Lr(o,r,!1),r!==2){if(Or&&!c){o.errorRecoveryDisabledLanes|=s,Ya|=s,i=4;break e}s=lt,lt=i,s!==null&&(lt===null?lt=s:lt.push.apply(lt,s))}i=r}if(s=!1,i!==2)continue}}if(i===1){wn(e,0),ga(e,t,0,!0);break}e:{switch(n=e,s=i,s){case 0:case 1:throw Error(u(345));case 4:if((t&4194048)!==t)break;case 6:ga(n,t,gt,!fa);break e;case 2:lt=null;break;case 3:case 5:break;default:throw Error(u(329))}if((t&62914560)===t&&(i=bs+300-ot(),10<i)){if(ga(n,t,gt,!fa),Mi(n,0,!0)!==0)break e;Wt=t,n.timeoutHandle=Id(pd.bind(null,n,a,lt,xs,kr,t,gt,Ya,_n,fa,s,"Throttled",-0,0),i);break e}pd(n,a,lt,xs,kr,t,gt,Ya,_n,fa,s,null,-0,0)}}break}while(!0);Rt(e)}function pd(e,t,a,n,i,s,r,o,c,m,w,N,g,v){if(e.timeoutHandle=-1,N=t.subtreeFlags,N&8192||(N&16785408)===16785408){N={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Lt},ld(t,s,N);var q=(s&62914560)===s?bs-ot():(s&4194048)===s?ud-ot():0;if(q=Sm(N,q),q!==null){Wt=s,e.cancelPendingCommit=q(Sd.bind(null,e,t,s,a,n,i,r,o,c,w,N,null,g,v)),ga(e,s,r,!m);return}}Sd(e,t,s,a,n,i,r,o,c)}function Bp(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var i=a[n],s=i.getSnapshot;i=i.value;try{if(!dt(s(),i))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ga(e,t,a,n){t&=~Mr,t&=~Ya,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var i=t;0<i;){var s=31-ut(i),r=1<<s;n[s]=-1,i&=~r}a!==0&&Co(e,a,t)}function _s(){return(ye&6)===0?(hi(0),!1):!0}function zr(){if(re!==null){if(Se===0)var e=re.return;else e=re,Ht=Da=null,Wl(e),hn=null,Kn=0,e=re;for(;e!==null;)Qu(e.alternate,e),e=e.return;re=null}}function wn(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,im(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Wt=0,zr(),Ee=e,re=a=Bt(e.current,null),de=t,Se=0,mt=null,fa=!1,xn=jn(e,t),Or=!1,_n=gt=Mr=Ya=ha=ze=0,lt=di=null,kr=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-ut(n),s=1<<i;t|=e[i],n&=~s}return $t=t,Yi(),a}function md(e,t){ie=null,x.H=ni,t===fn||t===$i?(t=kc(),Se=3):t===Gl?(t=kc(),Se=4):Se=t===hr?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,mt=t,re===null&&(ze=1,us(e,_t(t,e.current)))}function gd(){var e=ht.current;return e===null?!0:(de&4194048)===de?Nt===null:(de&62914560)===de||(de&536870912)!==0?e===Nt:!1}function yd(){var e=x.H;return x.H=ni,e===null?ni:e}function bd(){var e=x.A;return x.A=Lp,e}function Ss(){ze=4,fa||(de&4194048)!==de&&ht.current!==null||(xn=!0),(ha&134217727)===0&&(Ya&134217727)===0||Ee===null||ga(Ee,de,gt,!1)}function Lr(e,t,a){var n=ye;ye|=2;var i=yd(),s=bd();(Ee!==e||de!==t)&&(xs=null,wn(e,t)),t=!1;var r=ze;e:do try{if(Se!==0&&re!==null){var o=re,c=mt;switch(Se){case 8:zr(),r=6;break e;case 3:case 2:case 9:case 6:ht.current===null&&(t=!0);var m=Se;if(Se=0,mt=null,Cn(e,o,c,m),a&&xn){r=0;break e}break;default:m=Se,Se=0,mt=null,Cn(e,o,c,m)}}Gp(),r=ze;break}catch(w){md(e,w)}while(!0);return t&&e.shellSuspendCounter++,Ht=Da=null,ye=n,x.H=i,x.A=s,re===null&&(Ee=null,de=0,Yi()),r}function Gp(){for(;re!==null;)vd(re)}function Hp(e,t){var a=ye;ye|=2;var n=yd(),i=bd();Ee!==e||de!==t?(xs=null,vs=ot()+500,wn(e,t)):xn=jn(e,t);e:do try{if(Se!==0&&re!==null){t=re;var s=mt;t:switch(Se){case 1:Se=0,mt=null,Cn(e,t,s,1);break;case 2:case 9:if(Oc(s)){Se=0,mt=null,xd(t);break}t=function(){Se!==2&&Se!==9||Ee!==e||(Se=7),Rt(e)},s.then(t,t);break e;case 3:Se=7;break e;case 4:Se=5;break e;case 7:Oc(s)?(Se=0,mt=null,xd(t)):(Se=0,mt=null,Cn(e,t,s,7));break;case 5:var r=null;switch(re.tag){case 26:r=re.memoizedState;case 5:case 27:var o=re;if(r?lf(r):o.stateNode.complete){Se=0,mt=null;var c=o.sibling;if(c!==null)re=c;else{var m=o.return;m!==null?(re=m,ws(m)):re=null}break t}}Se=0,mt=null,Cn(e,t,s,5);break;case 6:Se=0,mt=null,Cn(e,t,s,6);break;case 8:zr(),ze=6;break e;default:throw Error(u(462))}}qp();break}catch(w){md(e,w)}while(!0);return Ht=Da=null,x.H=n,x.A=i,ye=a,re!==null?0:(Ee=null,de=0,Yi(),ze)}function qp(){for(;re!==null&&!uh();)vd(re)}function vd(e){var t=Fu(e.alternate,e,$t);e.memoizedProps=e.pendingProps,t===null?ws(e):re=t}function xd(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Uu(a,t,t.pendingProps,t.type,void 0,de);break;case 11:t=Uu(a,t,t.pendingProps,t.type.render,t.ref,de);break;case 5:Wl(t);default:Qu(a,t),t=re=bc(t,$t),t=Fu(a,t,$t)}e.memoizedProps=e.pendingProps,t===null?ws(e):re=t}function Cn(e,t,a,n){Ht=Da=null,Wl(t),hn=null,Kn=0;var i=t.return;try{if(Op(e,i,t,a,de)){ze=1,us(e,_t(a,e.current)),re=null;return}}catch(s){if(i!==null)throw re=i,s;ze=1,us(e,_t(a,e.current)),re=null;return}t.flags&32768?(he||n===1?e=!0:xn||(de&536870912)!==0?e=!1:(fa=e=!0,(n===2||n===9||n===3||n===6)&&(n=ht.current,n!==null&&n.tag===13&&(n.flags|=16384))),_d(t,e)):ws(t)}function ws(e){var t=e;do{if((t.flags&32768)!==0){_d(t,fa);return}e=t.return;var a=jp(t.alternate,t,$t);if(a!==null){re=a;return}if(t=t.sibling,t!==null){re=t;return}re=t=e}while(t!==null);ze===0&&(ze=5)}function _d(e,t){do{var a=Dp(e.alternate,e);if(a!==null){a.flags&=32767,re=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){re=e;return}re=e=a}while(e!==null);ze=6,re=null}function Sd(e,t,a,n,i,s,r,o,c){e.cancelPendingCommit=null;do Cs();while(Ie!==0);if((ye&6)!==0)throw Error(u(327));if(t!==null){if(t===e.current)throw Error(u(177));if(s=t.lanes|t.childLanes,s|=Cl,xh(e,a,s,r,o,c),e===Ee&&(re=Ee=null,de=0),Sn=t,ma=e,Wt=a,jr=s,Dr=i,dd=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Qp(Ti,function(){return Ad(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=x.T,x.T=null,i=R.p,R.p=2,r=ye,ye|=4;try{Rp(e,t,a)}finally{ye=r,R.p=i,x.T=n}}Ie=1,wd(),Cd(),Nd()}}function wd(){if(Ie===1){Ie=0;var e=ma,t=Sn,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=x.T,x.T=null;var n=R.p;R.p=2;var i=ye;ye|=4;try{nd(t,e);var s=Zr,r=cc(e.containerInfo),o=s.focusedElem,c=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&oc(o.ownerDocument.documentElement,o)){if(c!==null&&vl(o)){var m=c.start,w=c.end;if(w===void 0&&(w=m),"selectionStart"in o)o.selectionStart=m,o.selectionEnd=Math.min(w,o.value.length);else{var N=o.ownerDocument||document,g=N&&N.defaultView||window;if(g.getSelection){var v=g.getSelection(),q=o.textContent.length,W=Math.min(c.start,q),Ae=c.end===void 0?W:Math.min(c.end,q);!v.extend&&W>Ae&&(r=Ae,Ae=W,W=r);var h=rc(o,W),d=rc(o,Ae);if(h&&d&&(v.rangeCount!==1||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==d.node||v.focusOffset!==d.offset)){var p=N.createRange();p.setStart(h.node,h.offset),v.removeAllRanges(),W>Ae?(v.addRange(p),v.extend(d.node,d.offset)):(p.setEnd(d.node,d.offset),v.addRange(p))}}}}for(N=[],v=o;v=v.parentNode;)v.nodeType===1&&N.push({element:v,left:v.scrollLeft,top:v.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<N.length;o++){var C=N[o];C.element.scrollLeft=C.left,C.element.scrollTop=C.top}}Ls=!!Xr,Zr=Xr=null}finally{ye=i,R.p=n,x.T=a}}e.current=t,Ie=2}}function Cd(){if(Ie===2){Ie=0;var e=ma,t=Sn,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=x.T,x.T=null;var n=R.p;R.p=2;var i=ye;ye|=4;try{Ju(e,t.alternate,t)}finally{ye=i,R.p=n,x.T=a}}Ie=3}}function Nd(){if(Ie===4||Ie===3){Ie=0,dh();var e=ma,t=Sn,a=Wt,n=dd;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?Ie=5:(Ie=0,Sn=ma=null,Td(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(pa=null),el(a),t=t.stateNode,ct&&typeof ct.onCommitFiberRoot=="function")try{ct.onCommitFiberRoot(kn,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=x.T,i=R.p,R.p=2,x.T=null;try{for(var s=e.onRecoverableError,r=0;r<n.length;r++){var o=n[r];s(o.value,{componentStack:o.stack})}}finally{x.T=t,R.p=i}}(Wt&3)!==0&&Cs(),Rt(e),i=e.pendingLanes,(a&261930)!==0&&(i&42)!==0?e===Rr?fi++:(fi=0,Rr=e):fi=0,hi(0)}}function Td(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Xn(t)))}function Cs(){return wd(),Cd(),Nd(),Ad()}function Ad(){if(Ie!==5)return!1;var e=ma,t=jr;jr=0;var a=el(Wt),n=x.T,i=R.p;try{R.p=32>a?32:a,x.T=null,a=Dr,Dr=null;var s=ma,r=Wt;if(Ie=0,Sn=ma=null,Wt=0,(ye&6)!==0)throw Error(u(331));var o=ye;if(ye|=4,od(s.current),sd(s,s.current,r,a),ye=o,hi(0,!1),ct&&typeof ct.onPostCommitFiberRoot=="function")try{ct.onPostCommitFiberRoot(kn,s)}catch{}return!0}finally{R.p=i,x.T=n,Td(e,t)}}function Ed(e,t,a){t=_t(a,t),t=fr(e.stateNode,t,2),e=oa(e,t,2),e!==null&&(Dn(e,2),Rt(e))}function we(e,t,a){if(e.tag===3)Ed(e,e,a);else for(;t!==null;){if(t.tag===3){Ed(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(pa===null||!pa.has(n))){e=_t(a,e),a=Ou(2),n=oa(t,a,2),n!==null&&(Mu(a,n,t,e),Dn(n,2),Rt(n));break}}t=t.return}}function Ur(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new Up;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(a)||(Or=!0,i.add(a),e=Yp.bind(null,e,t,a),t.then(e,e))}function Yp(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ee===e&&(de&a)===a&&(ze===4||ze===3&&(de&62914560)===de&&300>ot()-bs?(ye&2)===0&&wn(e,0):Mr|=a,_n===de&&(_n=0)),Rt(e)}function Od(e,t){t===0&&(t=wo()),e=Ma(e,t),e!==null&&(Dn(e,t),Rt(e))}function Fp(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Od(e,a)}function Ip(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(a=i.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(u(314))}n!==null&&n.delete(t),Od(e,a)}function Qp(e,t){return $s(e,t)}var Ns=null,Nn=null,Br=!1,Ts=!1,Gr=!1,ya=0;function Rt(e){e!==Nn&&e.next===null&&(Nn===null?Ns=Nn=e:Nn=Nn.next=e),Ts=!0,Br||(Br=!0,Xp())}function hi(e,t){if(!Gr&&Ts){Gr=!0;do for(var a=!1,n=Ns;n!==null;){if(e!==0){var i=n.pendingLanes;if(i===0)var s=0;else{var r=n.suspendedLanes,o=n.pingedLanes;s=(1<<31-ut(42|e)+1)-1,s&=i&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(a=!0,Dd(n,s))}else s=de,s=Mi(n,n===Ee?s:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(s&3)===0||jn(n,s)||(a=!0,Dd(n,s));n=n.next}while(a);Gr=!1}}function Vp(){Md()}function Md(){Ts=Br=!1;var e=0;ya!==0&&nm()&&(e=ya);for(var t=ot(),a=null,n=Ns;n!==null;){var i=n.next,s=kd(n,t);s===0?(n.next=null,a===null?Ns=i:a.next=i,i===null&&(Nn=a)):(a=n,(e!==0||(s&3)!==0)&&(Ts=!0)),n=i}Ie!==0&&Ie!==5||hi(e),ya!==0&&(ya=0)}function kd(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-ut(s),o=1<<r,c=i[r];c===-1?((o&a)===0||(o&n)!==0)&&(i[r]=vh(o,t)):c<=t&&(e.expiredLanes|=o),s&=~o}if(t=Ee,a=de,a=Mi(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(Se===2||Se===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&Ws(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||jn(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&Ws(n),el(a)){case 2:case 8:a=_o;break;case 32:a=Ti;break;case 268435456:a=So;break;default:a=Ti}return n=jd.bind(null,e),a=$s(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&Ws(n),e.callbackPriority=2,e.callbackNode=null,2}function jd(e,t){if(Ie!==0&&Ie!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Cs()&&e.callbackNode!==a)return null;var n=de;return n=Mi(e,e===Ee?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(hd(e,n,t),kd(e,ot()),e.callbackNode!=null&&e.callbackNode===a?jd.bind(null,e):null)}function Dd(e,t){if(Cs())return null;hd(e,t,!0)}function Xp(){sm(function(){(ye&6)!==0?$s(xo,Vp):Md()})}function Hr(){if(ya===0){var e=un;e===0&&(e=Ai,Ai<<=1,(Ai&261888)===0&&(Ai=256)),ya=e}return ya}function Rd(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ri(""+e)}function zd(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function Zp(e,t,a,n,i){if(t==="submit"&&a&&a.stateNode===i){var s=Rd((i[tt]||null).action),r=n.submitter;r&&(t=(t=r[tt]||null)?Rd(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new Bi("action","action",null,n,i);e.push({event:o,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(ya!==0){var c=r?zd(i,r):new FormData(i);lr(a,{pending:!0,data:c,method:i.method,action:s},null,c)}}else typeof s=="function"&&(o.preventDefault(),c=r?zd(i,r):new FormData(i),lr(a,{pending:!0,data:c,method:i.method,action:s},s,c))},currentTarget:i}]})}}for(var qr=0;qr<wl.length;qr++){var Yr=wl[qr],Kp=Yr.toLowerCase(),$p=Yr[0].toUpperCase()+Yr.slice(1);Et(Kp,"on"+$p)}Et(fc,"onAnimationEnd"),Et(hc,"onAnimationIteration"),Et(pc,"onAnimationStart"),Et("dblclick","onDoubleClick"),Et("focusin","onFocus"),Et("focusout","onBlur"),Et(fp,"onTransitionRun"),Et(hp,"onTransitionStart"),Et(pp,"onTransitionCancel"),Et(mc,"onTransitionEnd"),Ka("onMouseEnter",["mouseout","mouseover"]),Ka("onMouseLeave",["mouseout","mouseover"]),Ka("onPointerEnter",["pointerout","pointerover"]),Ka("onPointerLeave",["pointerout","pointerover"]),Ta("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ta("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ta("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ta("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ta("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ta("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var pi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Wp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(pi));function Ld(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],i=n.event;n=n.listeners;e:{var s=void 0;if(t)for(var r=n.length-1;0<=r;r--){var o=n[r],c=o.instance,m=o.currentTarget;if(o=o.listener,c!==s&&i.isPropagationStopped())break e;s=o,i.currentTarget=m;try{s(i)}catch(w){qi(w)}i.currentTarget=null,s=c}else for(r=0;r<n.length;r++){if(o=n[r],c=o.instance,m=o.currentTarget,o=o.listener,c!==s&&i.isPropagationStopped())break e;s=o,i.currentTarget=m;try{s(i)}catch(w){qi(w)}i.currentTarget=null,s=c}}}}function oe(e,t){var a=t[tl];a===void 0&&(a=t[tl]=new Set);var n=e+"__bubble";a.has(n)||(Ud(t,e,2,!1),a.add(n))}function Fr(e,t,a){var n=0;t&&(n|=4),Ud(a,e,n,t)}var As="_reactListening"+Math.random().toString(36).slice(2);function Ir(e){if(!e[As]){e[As]=!0,Mo.forEach(function(a){a!=="selectionchange"&&(Wp.has(a)||Fr(a,!1,e),Fr(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[As]||(t[As]=!0,Fr("selectionchange",!1,t))}}function Ud(e,t,a,n){switch(hf(t)){case 2:var i=Nm;break;case 8:i=Tm;break;default:i=so}a=i.bind(null,t,a,e),i=void 0,!ul||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,a,{capture:!0,passive:i}):e.addEventListener(t,a,!0):i!==void 0?e.addEventListener(t,a,{passive:i}):e.addEventListener(t,a,!1)}function Qr(e,t,a,n,i){var s=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var r=n.tag;if(r===3||r===4){var o=n.stateNode.containerInfo;if(o===i)break;if(r===4)for(r=n.return;r!==null;){var c=r.tag;if((c===3||c===4)&&r.stateNode.containerInfo===i)return;r=r.return}for(;o!==null;){if(r=Va(o),r===null)return;if(c=r.tag,c===5||c===6||c===26||c===27){n=s=r;continue e}o=o.parentNode}}n=n.return}Yo(function(){var m=s,w=ol(a),N=[];e:{var g=gc.get(e);if(g!==void 0){var v=Bi,q=e;switch(e){case"keypress":if(Li(a)===0)break e;case"keydown":case"keyup":v=Ih;break;case"focusin":q="focus",v=pl;break;case"focusout":q="blur",v=pl;break;case"beforeblur":case"afterblur":v=pl;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Qo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=jh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Xh;break;case fc:case hc:case pc:v=zh;break;case mc:v=Kh;break;case"scroll":case"scrollend":v=Mh;break;case"wheel":v=Wh;break;case"copy":case"cut":case"paste":v=Uh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Xo;break;case"toggle":case"beforetoggle":v=Ph}var W=(t&4)!==0,Ae=!W&&(e==="scroll"||e==="scrollend"),h=W?g!==null?g+"Capture":null:g;W=[];for(var d=m,p;d!==null;){var C=d;if(p=C.stateNode,C=C.tag,C!==5&&C!==26&&C!==27||p===null||h===null||(C=Ln(d,h),C!=null&&W.push(mi(d,C,p))),Ae)break;d=d.return}0<W.length&&(g=new v(g,q,null,a,w),N.push({event:g,listeners:W}))}}if((t&7)===0){e:{if(g=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",g&&a!==rl&&(q=a.relatedTarget||a.fromElement)&&(Va(q)||q[Qa]))break e;if((v||g)&&(g=w.window===w?w:(g=w.ownerDocument)?g.defaultView||g.parentWindow:window,v?(q=a.relatedTarget||a.toElement,v=m,q=q?Va(q):null,q!==null&&(Ae=E(q),W=q.tag,q!==Ae||W!==5&&W!==27&&W!==6)&&(q=null)):(v=null,q=m),v!==q)){if(W=Qo,C="onMouseLeave",h="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(W=Xo,C="onPointerLeave",h="onPointerEnter",d="pointer"),Ae=v==null?g:zn(v),p=q==null?g:zn(q),g=new W(C,d+"leave",v,a,w),g.target=Ae,g.relatedTarget=p,C=null,Va(w)===m&&(W=new W(h,d+"enter",q,a,w),W.target=p,W.relatedTarget=Ae,C=W),Ae=C,v&&q)t:{for(W=Jp,h=v,d=q,p=0,C=h;C;C=W(C))p++;C=0;for(var X=d;X;X=W(X))C++;for(;0<p-C;)h=W(h),p--;for(;0<C-p;)d=W(d),C--;for(;p--;){if(h===d||d!==null&&h===d.alternate){W=h;break t}h=W(h),d=W(d)}W=null}else W=null;v!==null&&Bd(N,g,v,W,!1),q!==null&&Ae!==null&&Bd(N,Ae,q,W,!0)}}e:{if(g=m?zn(m):window,v=g.nodeName&&g.nodeName.toLowerCase(),v==="select"||v==="input"&&g.type==="file")var me=tc;else if(Po(g))if(ac)me=cp;else{me=rp;var Q=lp}else v=g.nodeName,!v||v.toLowerCase()!=="input"||g.type!=="checkbox"&&g.type!=="radio"?m&&ll(m.elementType)&&(me=tc):me=op;if(me&&(me=me(e,m))){ec(N,me,a,w);break e}Q&&Q(e,g,m),e==="focusout"&&m&&g.type==="number"&&m.memoizedProps.value!=null&&sl(g,"number",g.value)}switch(Q=m?zn(m):window,e){case"focusin":(Po(Q)||Q.contentEditable==="true")&&(tn=Q,xl=m,In=null);break;case"focusout":In=xl=tn=null;break;case"mousedown":_l=!0;break;case"contextmenu":case"mouseup":case"dragend":_l=!1,uc(N,a,w);break;case"selectionchange":if(dp)break;case"keydown":case"keyup":uc(N,a,w)}var se;if(gl)e:{switch(e){case"compositionstart":var fe="onCompositionStart";break e;case"compositionend":fe="onCompositionEnd";break e;case"compositionupdate":fe="onCompositionUpdate";break e}fe=void 0}else en?Wo(e,a)&&(fe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(fe="onCompositionStart");fe&&(Zo&&a.locale!=="ko"&&(en||fe!=="onCompositionStart"?fe==="onCompositionEnd"&&en&&(se=Fo()):(ta=w,dl="value"in ta?ta.value:ta.textContent,en=!0)),Q=Es(m,fe),0<Q.length&&(fe=new Vo(fe,e,null,a,w),N.push({event:fe,listeners:Q}),se?fe.data=se:(se=Jo(a),se!==null&&(fe.data=se)))),(se=tp?ap(e,a):np(e,a))&&(fe=Es(m,"onBeforeInput"),0<fe.length&&(Q=new Vo("onBeforeInput","beforeinput",null,a,w),N.push({event:Q,listeners:fe}),Q.data=se)),Zp(N,e,m,a,w)}Ld(N,t)})}function mi(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Es(e,t){for(var a=t+"Capture",n=[];e!==null;){var i=e,s=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||s===null||(i=Ln(e,a),i!=null&&n.unshift(mi(e,i,s)),i=Ln(e,t),i!=null&&n.push(mi(e,i,s))),e.tag===3)return n;e=e.return}return[]}function Jp(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Bd(e,t,a,n,i){for(var s=t._reactName,r=[];a!==null&&a!==n;){var o=a,c=o.alternate,m=o.stateNode;if(o=o.tag,c!==null&&c===n)break;o!==5&&o!==26&&o!==27||m===null||(c=m,i?(m=Ln(a,s),m!=null&&r.unshift(mi(a,m,c))):i||(m=Ln(a,s),m!=null&&r.push(mi(a,m,c)))),a=a.return}r.length!==0&&e.push({event:t,listeners:r})}var Pp=/\r\n?/g,em=/\u0000|\uFFFD/g;function Gd(e){return(typeof e=="string"?e:""+e).replace(Pp,`
`).replace(em,"")}function Hd(e,t){return t=Gd(t),Gd(e)===t}function Te(e,t,a,n,i,s){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||Wa(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&Wa(e,""+n);break;case"className":ji(e,"class",n);break;case"tabIndex":ji(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":ji(e,a,n);break;case"style":Ho(e,n,s);break;case"data":if(t!=="object"){ji(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Ri(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(a==="formAction"?(t!=="input"&&Te(e,t,"name",i.name,i,null),Te(e,t,"formEncType",i.formEncType,i,null),Te(e,t,"formMethod",i.formMethod,i,null),Te(e,t,"formTarget",i.formTarget,i,null)):(Te(e,t,"encType",i.encType,i,null),Te(e,t,"method",i.method,i,null),Te(e,t,"target",i.target,i,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=Ri(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=Lt);break;case"onScroll":n!=null&&oe("scroll",e);break;case"onScrollEnd":n!=null&&oe("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(u(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(u(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=Ri(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":oe("beforetoggle",e),oe("toggle",e),ki(e,"popover",n);break;case"xlinkActuate":zt(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":zt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":zt(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":zt(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":zt(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":zt(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":zt(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":zt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":zt(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":ki(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Eh.get(a)||a,ki(e,a,n))}}function Vr(e,t,a,n,i,s){switch(a){case"style":Ho(e,n,s);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(u(61));if(a=n.__html,a!=null){if(i.children!=null)throw Error(u(60));e.innerHTML=a}}break;case"children":typeof n=="string"?Wa(e,n):(typeof n=="number"||typeof n=="bigint")&&Wa(e,""+n);break;case"onScroll":n!=null&&oe("scroll",e);break;case"onScrollEnd":n!=null&&oe("scrollend",e);break;case"onClick":n!=null&&(e.onclick=Lt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!ko.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(i=a.endsWith("Capture"),t=a.slice(2,i?a.length-7:void 0),s=e[tt]||null,s=s!=null?s[a]:null,typeof s=="function"&&e.removeEventListener(t,s,i),typeof n=="function")){typeof s!="function"&&s!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,i);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):ki(e,a,n)}}}function We(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":oe("error",e),oe("load",e);var n=!1,i=!1,s;for(s in a)if(a.hasOwnProperty(s)){var r=a[s];if(r!=null)switch(s){case"src":n=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:Te(e,t,s,r,a,null)}}i&&Te(e,t,"srcSet",a.srcSet,a,null),n&&Te(e,t,"src",a.src,a,null);return;case"input":oe("invalid",e);var o=s=r=i=null,c=null,m=null;for(n in a)if(a.hasOwnProperty(n)){var w=a[n];if(w!=null)switch(n){case"name":i=w;break;case"type":r=w;break;case"checked":c=w;break;case"defaultChecked":m=w;break;case"value":s=w;break;case"defaultValue":o=w;break;case"children":case"dangerouslySetInnerHTML":if(w!=null)throw Error(u(137,t));break;default:Te(e,t,n,w,a,null)}}Lo(e,s,o,c,m,r,i,!1);return;case"select":oe("invalid",e),n=r=s=null;for(i in a)if(a.hasOwnProperty(i)&&(o=a[i],o!=null))switch(i){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":n=o;default:Te(e,t,i,o,a,null)}t=s,a=r,e.multiple=!!n,t!=null?$a(e,!!n,t,!1):a!=null&&$a(e,!!n,a,!0);return;case"textarea":oe("invalid",e),s=i=n=null;for(r in a)if(a.hasOwnProperty(r)&&(o=a[r],o!=null))switch(r){case"value":n=o;break;case"defaultValue":i=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(u(91));break;default:Te(e,t,r,o,a,null)}Bo(e,n,i,s);return;case"option":for(c in a)if(a.hasOwnProperty(c)&&(n=a[c],n!=null))switch(c){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:Te(e,t,c,n,a,null)}return;case"dialog":oe("beforetoggle",e),oe("toggle",e),oe("cancel",e),oe("close",e);break;case"iframe":case"object":oe("load",e);break;case"video":case"audio":for(n=0;n<pi.length;n++)oe(pi[n],e);break;case"image":oe("error",e),oe("load",e);break;case"details":oe("toggle",e);break;case"embed":case"source":case"link":oe("error",e),oe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(m in a)if(a.hasOwnProperty(m)&&(n=a[m],n!=null))switch(m){case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:Te(e,t,m,n,a,null)}return;default:if(ll(t)){for(w in a)a.hasOwnProperty(w)&&(n=a[w],n!==void 0&&Vr(e,t,w,n,a,void 0));return}}for(o in a)a.hasOwnProperty(o)&&(n=a[o],n!=null&&Te(e,t,o,n,a,null))}function tm(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,s=null,r=null,o=null,c=null,m=null,w=null;for(v in a){var N=a[v];if(a.hasOwnProperty(v)&&N!=null)switch(v){case"checked":break;case"value":break;case"defaultValue":c=N;default:n.hasOwnProperty(v)||Te(e,t,v,null,n,N)}}for(var g in n){var v=n[g];if(N=a[g],n.hasOwnProperty(g)&&(v!=null||N!=null))switch(g){case"type":s=v;break;case"name":i=v;break;case"checked":m=v;break;case"defaultChecked":w=v;break;case"value":r=v;break;case"defaultValue":o=v;break;case"children":case"dangerouslySetInnerHTML":if(v!=null)throw Error(u(137,t));break;default:v!==N&&Te(e,t,g,v,n,N)}}il(e,r,o,c,m,w,s,i);return;case"select":v=r=o=g=null;for(s in a)if(c=a[s],a.hasOwnProperty(s)&&c!=null)switch(s){case"value":break;case"multiple":v=c;default:n.hasOwnProperty(s)||Te(e,t,s,null,n,c)}for(i in n)if(s=n[i],c=a[i],n.hasOwnProperty(i)&&(s!=null||c!=null))switch(i){case"value":g=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==c&&Te(e,t,i,s,n,c)}t=o,a=r,n=v,g!=null?$a(e,!!a,g,!1):!!n!=!!a&&(t!=null?$a(e,!!a,t,!0):$a(e,!!a,a?[]:"",!1));return;case"textarea":v=g=null;for(o in a)if(i=a[o],a.hasOwnProperty(o)&&i!=null&&!n.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Te(e,t,o,null,n,i)}for(r in n)if(i=n[r],s=a[r],n.hasOwnProperty(r)&&(i!=null||s!=null))switch(r){case"value":g=i;break;case"defaultValue":v=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(u(91));break;default:i!==s&&Te(e,t,r,i,n,s)}Uo(e,g,v);return;case"option":for(var q in a)if(g=a[q],a.hasOwnProperty(q)&&g!=null&&!n.hasOwnProperty(q))switch(q){case"selected":e.selected=!1;break;default:Te(e,t,q,null,n,g)}for(c in n)if(g=n[c],v=a[c],n.hasOwnProperty(c)&&g!==v&&(g!=null||v!=null))switch(c){case"selected":e.selected=g&&typeof g!="function"&&typeof g!="symbol";break;default:Te(e,t,c,g,n,v)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var W in a)g=a[W],a.hasOwnProperty(W)&&g!=null&&!n.hasOwnProperty(W)&&Te(e,t,W,null,n,g);for(m in n)if(g=n[m],v=a[m],n.hasOwnProperty(m)&&g!==v&&(g!=null||v!=null))switch(m){case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(u(137,t));break;default:Te(e,t,m,g,n,v)}return;default:if(ll(t)){for(var Ae in a)g=a[Ae],a.hasOwnProperty(Ae)&&g!==void 0&&!n.hasOwnProperty(Ae)&&Vr(e,t,Ae,void 0,n,g);for(w in n)g=n[w],v=a[w],!n.hasOwnProperty(w)||g===v||g===void 0&&v===void 0||Vr(e,t,w,g,n,v);return}}for(var h in a)g=a[h],a.hasOwnProperty(h)&&g!=null&&!n.hasOwnProperty(h)&&Te(e,t,h,null,n,g);for(N in n)g=n[N],v=a[N],!n.hasOwnProperty(N)||g===v||g==null&&v==null||Te(e,t,N,g,n,v)}function qd(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function am(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var i=a[n],s=i.transferSize,r=i.initiatorType,o=i.duration;if(s&&o&&qd(r)){for(r=0,o=i.responseEnd,n+=1;n<a.length;n++){var c=a[n],m=c.startTime;if(m>o)break;var w=c.transferSize,N=c.initiatorType;w&&qd(N)&&(c=c.responseEnd,r+=w*(c<o?1:(o-m)/(c-m)))}if(--n,t+=8*(s+r)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Xr=null,Zr=null;function Os(e){return e.nodeType===9?e:e.ownerDocument}function Yd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Fd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Kr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var $r=null;function nm(){var e=window.event;return e&&e.type==="popstate"?e===$r?!1:($r=e,!0):($r=null,!1)}var Id=typeof setTimeout=="function"?setTimeout:void 0,im=typeof clearTimeout=="function"?clearTimeout:void 0,Qd=typeof Promise=="function"?Promise:void 0,sm=typeof queueMicrotask=="function"?queueMicrotask:typeof Qd<"u"?function(e){return Qd.resolve(null).then(e).catch(lm)}:Id;function lm(e){setTimeout(function(){throw e})}function ba(e){return e==="head"}function Vd(e,t){var a=t,n=0;do{var i=a.nextSibling;if(e.removeChild(a),i&&i.nodeType===8)if(a=i.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(i),On(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")gi(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,gi(a);for(var s=a.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[Rn]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||a.removeChild(s),s=r}}else a==="body"&&gi(e.ownerDocument.body);a=i}while(a);On(t)}function Xd(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function Wr(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Wr(a),al(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function rm(e,t,a,n){for(;e.nodeType===1;){var i=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[Rn])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Tt(e.nextSibling),e===null)break}return null}function om(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Tt(e.nextSibling),e===null))return null;return e}function Zd(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Tt(e.nextSibling),e===null))return null;return e}function Jr(e){return e.data==="$?"||e.data==="$~"}function Pr(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function cm(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function Tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var eo=null;function Kd(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Tt(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function $d(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function Wd(e,t,a){switch(t=Os(a),e){case"html":if(e=t.documentElement,!e)throw Error(u(452));return e;case"head":if(e=t.head,!e)throw Error(u(453));return e;case"body":if(e=t.body,!e)throw Error(u(454));return e;default:throw Error(u(451))}}function gi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);al(e)}var At=new Map,Jd=new Set;function Ms(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Jt=R.d;R.d={f:um,r:dm,D:fm,C:hm,L:pm,m:mm,X:ym,S:gm,M:bm};function um(){var e=Jt.f(),t=_s();return e||t}function dm(e){var t=Xa(e);t!==null&&t.tag===5&&t.type==="form"?mu(t):Jt.r(e)}var Tn=typeof document>"u"?null:document;function Pd(e,t,a){var n=Tn;if(n&&typeof t=="string"&&t){var i=vt(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof a=="string"&&(i+='[crossorigin="'+a+'"]'),Jd.has(i)||(Jd.add(i),e={rel:e,crossOrigin:a,href:t},n.querySelector(i)===null&&(t=n.createElement("link"),We(t,"link",e),Qe(t),n.head.appendChild(t)))}}function fm(e){Jt.D(e),Pd("dns-prefetch",e,null)}function hm(e,t){Jt.C(e,t),Pd("preconnect",e,t)}function pm(e,t,a){Jt.L(e,t,a);var n=Tn;if(n&&e&&t){var i='link[rel="preload"][as="'+vt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(i+='[imagesrcset="'+vt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(i+='[imagesizes="'+vt(a.imageSizes)+'"]')):i+='[href="'+vt(e)+'"]';var s=i;switch(t){case"style":s=An(e);break;case"script":s=En(e)}At.has(s)||(e=D({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),At.set(s,e),n.querySelector(i)!==null||t==="style"&&n.querySelector(yi(s))||t==="script"&&n.querySelector(bi(s))||(t=n.createElement("link"),We(t,"link",e),Qe(t),n.head.appendChild(t)))}}function mm(e,t){Jt.m(e,t);var a=Tn;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+vt(n)+'"][href="'+vt(e)+'"]',s=i;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=En(e)}if(!At.has(s)&&(e=D({rel:"modulepreload",href:e},t),At.set(s,e),a.querySelector(i)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(bi(s)))return}n=a.createElement("link"),We(n,"link",e),Qe(n),a.head.appendChild(n)}}}function gm(e,t,a){Jt.S(e,t,a);var n=Tn;if(n&&e){var i=Za(n).hoistableStyles,s=An(e);t=t||"default";var r=i.get(s);if(!r){var o={loading:0,preload:null};if(r=n.querySelector(yi(s)))o.loading=5;else{e=D({rel:"stylesheet",href:e,"data-precedence":t},a),(a=At.get(s))&&to(e,a);var c=r=n.createElement("link");Qe(c),We(c,"link",e),c._p=new Promise(function(m,w){c.onload=m,c.onerror=w}),c.addEventListener("load",function(){o.loading|=1}),c.addEventListener("error",function(){o.loading|=2}),o.loading|=4,ks(r,t,n)}r={type:"stylesheet",instance:r,count:1,state:o},i.set(s,r)}}}function ym(e,t){Jt.X(e,t);var a=Tn;if(a&&e){var n=Za(a).hoistableScripts,i=En(e),s=n.get(i);s||(s=a.querySelector(bi(i)),s||(e=D({src:e,async:!0},t),(t=At.get(i))&&ao(e,t),s=a.createElement("script"),Qe(s),We(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(i,s))}}function bm(e,t){Jt.M(e,t);var a=Tn;if(a&&e){var n=Za(a).hoistableScripts,i=En(e),s=n.get(i);s||(s=a.querySelector(bi(i)),s||(e=D({src:e,async:!0,type:"module"},t),(t=At.get(i))&&ao(e,t),s=a.createElement("script"),Qe(s),We(s,"link",e),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},n.set(i,s))}}function ef(e,t,a,n){var i=(i=le.current)?Ms(i):null;if(!i)throw Error(u(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=An(a.href),a=Za(i).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=An(a.href);var s=Za(i).hoistableStyles,r=s.get(e);if(r||(i=i.ownerDocument||i,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=i.querySelector(yi(e)))&&!s._p&&(r.instance=s,r.state.loading=5),At.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},At.set(e,a),s||vm(i,e,a,r.state))),t&&n===null)throw Error(u(528,""));return r}if(t&&n!==null)throw Error(u(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=En(a),a=Za(i).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(u(444,e))}}function An(e){return'href="'+vt(e)+'"'}function yi(e){return'link[rel="stylesheet"]['+e+"]"}function tf(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function vm(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),We(t,"link",a),Qe(t),e.head.appendChild(t))}function En(e){return'[src="'+vt(e)+'"]'}function bi(e){return"script[async]"+e}function af(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+vt(a.href)+'"]');if(n)return t.instance=n,Qe(n),n;var i=D({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),Qe(n),We(n,"style",i),ks(n,a.precedence,e),t.instance=n;case"stylesheet":i=An(a.href);var s=e.querySelector(yi(i));if(s)return t.state.loading|=4,t.instance=s,Qe(s),s;n=tf(a),(i=At.get(i))&&to(n,i),s=(e.ownerDocument||e).createElement("link"),Qe(s);var r=s;return r._p=new Promise(function(o,c){r.onload=o,r.onerror=c}),We(s,"link",n),t.state.loading|=4,ks(s,a.precedence,e),t.instance=s;case"script":return s=En(a.src),(i=e.querySelector(bi(s)))?(t.instance=i,Qe(i),i):(n=a,(i=At.get(s))&&(n=D({},a),ao(n,i)),e=e.ownerDocument||e,i=e.createElement("script"),Qe(i),We(i,"link",n),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(u(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,ks(n,a.precedence,e));return t.instance}function ks(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=n.length?n[n.length-1]:null,s=i,r=0;r<n.length;r++){var o=n[r];if(o.dataset.precedence===t)s=o;else if(s!==i)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function to(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function ao(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var js=null;function nf(e,t,a){if(js===null){var n=new Map,i=js=new Map;i.set(a,n)}else i=js,n=i.get(a),n||(n=new Map,i.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),i=0;i<a.length;i++){var s=a[i];if(!(s[Rn]||s[Xe]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=n.get(r);o?o.push(s):n.set(r,[s])}}return n}function sf(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function xm(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function lf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function _m(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var i=An(n.href),s=t.querySelector(yi(i));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Ds.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=s,Qe(s);return}s=t.ownerDocument||t,n=tf(n),(i=At.get(i))&&to(n,i),s=s.createElement("link"),Qe(s);var r=s;r._p=new Promise(function(o,c){r.onload=o,r.onerror=c}),We(s,"link",n),a.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Ds.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var no=0;function Sm(e,t){return e.stylesheets&&e.count===0&&zs(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&zs(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&no===0&&(no=62500*am());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&zs(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>no?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(i)}}:null}function Ds(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)zs(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Rs=null;function zs(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Rs=new Map,t.forEach(wm,e),Rs=null,Ds.call(e))}function wm(e,t){if(!(t.state.loading&4)){var a=Rs.get(e);if(a)var n=a.get(null);else{a=new Map,Rs.set(e,a);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<i.length;s++){var r=i[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(a.set(r.dataset.precedence,r),n=r)}n&&a.set(null,n)}i=t.instance,r=i.getAttribute("data-precedence"),s=a.get(r)||n,s===n&&a.set(null,i),a.set(r,i),this.count++,n=Ds.bind(this),i.addEventListener("load",n),i.addEventListener("error",n),s?s.parentNode.insertBefore(i,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var vi={$$typeof:J,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function Cm(e,t,a,n,i,s,r,o,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Js(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Js(0),this.hiddenUpdates=Js(null),this.identifierPrefix=n,this.onUncaughtError=i,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function rf(e,t,a,n,i,s,r,o,c,m,w,N){return e=new Cm(e,t,a,r,c,m,w,N,o),t=1,s===!0&&(t|=24),s=ft(3,null,null,t),e.current=s,s.stateNode=e,t=Ll(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:n,isDehydrated:a,cache:t},Hl(s),e}function of(e){return e?(e=sn,e):sn}function cf(e,t,a,n,i,s){i=of(i),n.context===null?n.context=i:n.pendingContext=i,n=ra(t),n.payload={element:a},s=s===void 0?null:s,s!==null&&(n.callback=s),a=oa(e,n,t),a!==null&&(rt(a,e,t),Wn(a,e,t))}function uf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function io(e,t){uf(e,t),(e=e.alternate)&&uf(e,t)}function df(e){if(e.tag===13||e.tag===31){var t=Ma(e,67108864);t!==null&&rt(t,e,67108864),io(e,67108864)}}function ff(e){if(e.tag===13||e.tag===31){var t=yt();t=Ps(t);var a=Ma(e,t);a!==null&&rt(a,e,t),io(e,t)}}var Ls=!0;function Nm(e,t,a,n){var i=x.T;x.T=null;var s=R.p;try{R.p=2,so(e,t,a,n)}finally{R.p=s,x.T=i}}function Tm(e,t,a,n){var i=x.T;x.T=null;var s=R.p;try{R.p=8,so(e,t,a,n)}finally{R.p=s,x.T=i}}function so(e,t,a,n){if(Ls){var i=lo(n);if(i===null)Qr(e,t,n,Us,a),pf(e,n);else if(Em(i,e,t,a,n))n.stopPropagation();else if(pf(e,n),t&4&&-1<Am.indexOf(e)){for(;i!==null;){var s=Xa(i);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Na(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var c=1<<31-ut(r);o.entanglements[1]|=c,r&=~c}Rt(s),(ye&6)===0&&(vs=ot()+500,hi(0))}}break;case 31:case 13:o=Ma(s,2),o!==null&&rt(o,s,2),_s(),io(s,2)}if(s=lo(n),s===null&&Qr(e,t,n,Us,a),s===i)break;i=s}i!==null&&n.stopPropagation()}else Qr(e,t,n,null,a)}}function lo(e){return e=ol(e),ro(e)}var Us=null;function ro(e){if(Us=null,e=Va(e),e!==null){var t=E(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=A(t),e!==null)return e;e=null}else if(a===31){if(e=k(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Us=e,null}function hf(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(fh()){case xo:return 2;case _o:return 8;case Ti:case hh:return 32;case So:return 268435456;default:return 32}default:return 32}}var oo=!1,va=null,xa=null,_a=null,xi=new Map,_i=new Map,Sa=[],Am="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function pf(e,t){switch(e){case"focusin":case"focusout":va=null;break;case"dragenter":case"dragleave":xa=null;break;case"mouseover":case"mouseout":_a=null;break;case"pointerover":case"pointerout":xi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":_i.delete(t.pointerId)}}function Si(e,t,a,n,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Xa(t),t!==null&&df(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Em(e,t,a,n,i){switch(t){case"focusin":return va=Si(va,e,t,a,n,i),!0;case"dragenter":return xa=Si(xa,e,t,a,n,i),!0;case"mouseover":return _a=Si(_a,e,t,a,n,i),!0;case"pointerover":var s=i.pointerId;return xi.set(s,Si(xi.get(s)||null,e,t,a,n,i)),!0;case"gotpointercapture":return s=i.pointerId,_i.set(s,Si(_i.get(s)||null,e,t,a,n,i)),!0}return!1}function mf(e){var t=Va(e.target);if(t!==null){var a=E(t);if(a!==null){if(t=a.tag,t===13){if(t=A(a),t!==null){e.blockedOn=t,Eo(e.priority,function(){ff(a)});return}}else if(t===31){if(t=k(a),t!==null){e.blockedOn=t,Eo(e.priority,function(){ff(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Bs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=lo(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);rl=n,a.target.dispatchEvent(n),rl=null}else return t=Xa(a),t!==null&&df(t),e.blockedOn=a,!1;t.shift()}return!0}function gf(e,t,a){Bs(e)&&a.delete(t)}function Om(){oo=!1,va!==null&&Bs(va)&&(va=null),xa!==null&&Bs(xa)&&(xa=null),_a!==null&&Bs(_a)&&(_a=null),xi.forEach(gf),_i.forEach(gf)}function Gs(e,t){e.blockedOn===t&&(e.blockedOn=null,oo||(oo=!0,y.unstable_scheduleCallback(y.unstable_NormalPriority,Om)))}var Hs=null;function yf(e){Hs!==e&&(Hs=e,y.unstable_scheduleCallback(y.unstable_NormalPriority,function(){Hs===e&&(Hs=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],i=e[t+2];if(typeof n!="function"){if(ro(n||a)===null)continue;break}var s=Xa(a);s!==null&&(e.splice(t,3),t-=3,lr(s,{pending:!0,data:i,method:a.method,action:n},n,i))}}))}function On(e){function t(c){return Gs(c,e)}va!==null&&Gs(va,e),xa!==null&&Gs(xa,e),_a!==null&&Gs(_a,e),xi.forEach(t),_i.forEach(t);for(var a=0;a<Sa.length;a++){var n=Sa[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Sa.length&&(a=Sa[0],a.blockedOn===null);)mf(a),a.blockedOn===null&&Sa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var i=a[n],s=a[n+1],r=i[tt]||null;if(typeof s=="function")r||yf(a);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(i=s,r=s[tt]||null)o=r.formAction;else if(ro(i)!==null)continue}else o=r.action;typeof o=="function"?a[n+1]=o:(a.splice(n,3),n-=3),yf(a)}}}function bf(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return i=r})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function co(e){this._internalRoot=e}qs.prototype.render=co.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(u(409));var a=t.current,n=yt();cf(a,n,e,t,null,null)},qs.prototype.unmount=co.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;cf(e.current,2,null,e,null,null),_s(),t[Qa]=null}};function qs(e){this._internalRoot=e}qs.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ao();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Sa.length&&t!==0&&t<Sa[a].priority;a++);Sa.splice(a,0,e),a===0&&mf(e)}};var vf=S.version;if(vf!=="19.2.1")throw Error(u(527,vf,"19.2.1"));R.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=b(t),e=e!==null?B(e):null,e=e===null?null:e.stateNode,e};var Mm={bundleType:0,version:"19.2.1",rendererPackageName:"react-dom",currentDispatcherRef:x,reconcilerVersion:"19.2.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ys=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ys.isDisabled&&Ys.supportsFiber)try{kn=Ys.inject(Mm),ct=Ys}catch{}}return Ci.createRoot=function(e,t){if(!O(e))throw Error(u(299));var a=!1,n="",i=Nu,s=Tu,r=Au;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=rf(e,1,!1,null,null,a,n,null,i,s,r,bf),e[Qa]=t.current,Ir(e),new co(t)},Ci.hydrateRoot=function(e,t,a){if(!O(e))throw Error(u(299));var n=!1,i="",s=Nu,r=Tu,o=Au,c=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(i=a.identifierPrefix),a.onUncaughtError!==void 0&&(s=a.onUncaughtError),a.onCaughtError!==void 0&&(r=a.onCaughtError),a.onRecoverableError!==void 0&&(o=a.onRecoverableError),a.formState!==void 0&&(c=a.formState)),t=rf(e,1,!0,t,a??null,n,i,c,s,r,o,bf),t.context=of(null),a=t.current,n=yt(),n=Ps(n),i=ra(n),i.callback=null,oa(a,i,n),a=n,t.current.lanes=a,Dn(t,a),Rt(t),e[Qa]=t.current,Ir(e),new qs(t)},Ci.version="19.2.1",Ci}var Of;function qm(){if(Of)return ho.exports;Of=1;function y(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y)}catch(S){console.error(S)}}return y(),ho.exports=Hm(),ho.exports}var Ym=qm();const Fm=zf(Ym),Mf=[{id:1,title:"Phase 1: Procedural Foundations",description:"Building the blocks of logic and data manipulation.",levels:[{id:1,title:"Variables & I/O",syllabus:"B2.1.1",description:"Initialize your communication systems.",tasks:[{id:"1-1",text:"Output: The print() function for console communication"},{id:"1-2",text:"Variables: Named containers for storing data"},{id:"1-3",text:"Data Types: int, float, str, bool fundamentals"},{id:"1-4",text:"Arithmetic: Operators for calculations (+, -, *, /, //, %, **)"},{id:"1-5",text:"Input: Getting user data with input()"},{id:"1-6",text:"Type Casting: Converting between types (int(), float(), str())"}]},{id:2,title:"Sequence & Selection",syllabus:"B2.3.1, B2.3.2",description:"Determine the flight path logic.",tasks:[{id:"2-1",text:"Sequential execution - understanding code flow"},{id:"2-2",text:"Comparison operators for value testing"},{id:"2-3",text:"Simple if statements"},{id:"2-4",text:"if-else branching"},{id:"2-5",text:"if-elif-else chains"},{id:"2-6",text:"Logical operators (and, or, not)"},{id:"2-7",text:"Nested conditionals"}]},{id:3,title:"Iteration (Loops)",syllabus:"B2.3.3",description:"Automate repetitive orbital maneuvers.",tasks:[{id:"3-1",text:"for loops with range() basics"},{id:"3-2",text:"range(start, stop, step) parameters"},{id:"3-3",text:"Iterating through strings"},{id:"3-4",text:"while loops for conditional iteration"},{id:"3-5",text:"while with multiple conditions (and/or)"},{id:"3-6",text:"break for early loop exit"},{id:"3-7",text:"continue to skip iterations"},{id:"3-8",text:"Accumulator pattern (running totals)"},{id:"3-9",text:"Counter pattern"},{id:"3-10",text:"Mission synthesis: combining loop concepts"}]},{id:4,title:"String Manipulation",syllabus:"B2.1.2",description:"Decode incoming text transmissions.",tasks:[{id:"4-1",text:"Indexing: accessing single characters"},{id:"4-2",text:"Slicing: extracting substrings"},{id:"4-3",text:"Concatenation: joining strings"},{id:"4-4",text:"Iteration: looping through strings"},{id:"4-5",text:"Methods: upper(), lower(), strip()"},{id:"4-6",text:"Counting and length"},{id:"4-7",text:"Parsing formatted data"},{id:"4-8",text:"Synthesis: complex string processing"}]}]},{id:2,title:"Phase 2: Data Structures & Modularity",description:"Moving from simple variables to complex data storage.",levels:[{id:5,title:"Lists (Arrays)",syllabus:"B2.2.1, B2.2.2",description:"Manage multiple payload items.",tasks:[{id:"5-1",text:"Dynamic lists vs fixed arrays"},{id:"5-2",text:"Create and initialize lists"},{id:"5-3",text:"Accessing elements with positive/negative indexes"},{id:"5-4",text:"Modifying list elements in place"},{id:"5-5",text:"Core list methods: append, insert, pop, remove"},{id:"5-6",text:"Traversal by element with counters/averages"},{id:"5-7",text:"Traversal by index for mutation"},{id:"5-8",text:"2D lists: building and indexing grids"},{id:"5-9",text:"Nested loops for 2D traversal"},{id:"5-10",text:"Grid analytics: totals and threshold counts"}]},{id:6,title:"Stacks & Queues (Concepts)",syllabus:"B2.2.3, B2.2.4",description:"Order operations for launch.",tasks:[{id:"6-1",text:"Stack concept: LIFO principle"},{id:"6-2",text:"Stack operations: push, pop with lists"},{id:"6-3",text:"Queue concept: FIFO principle"},{id:"6-4",text:"Queue operations: enqueue, dequeue with lists"},{id:"6-5",text:"Choosing: when to use stack vs queue"}]},{id:7,title:"Modular Programming",syllabus:"B2.3.4",description:"Create reusable rocket boosters.",tasks:[{id:"7-1",text:"Function definition with def"},{id:"7-2",text:"Parameters for data input"},{id:"7-3",text:"Multiple parameters"},{id:"7-4",text:"Return values"},{id:"7-5",text:"Returning multiple values"},{id:"7-6",text:"Local vs global scope"},{id:"7-7",text:"Function composition"},{id:"7-8",text:"Complete modular system"}]},{id:8,title:"File Processing",syllabus:"B2.5.1",description:"Log mission data to the black box.",tasks:[{id:"8-1",text:"File modes: read, write, append"},{id:"8-2",text:"Reading: read(), readline(), readlines()"},{id:"8-3",text:"Writing with write()"},{id:"8-4",text:"Appending to existing files"},{id:"8-5",text:"Context managers (with statement)"},{id:"8-6",text:"Parsing CSV data"},{id:"8-7",text:"Complete read-process-write system"}]},{id:9,title:"Robustness & Debugging",syllabus:"B2.1.3, B2.1.4",description:"Handle system failures gracefully.",tasks:[{id:"9-1",text:"Trace tables for debugging"},{id:"9-2",text:"Basic try-except blocks"},{id:"9-3",text:"Specific exception types"},{id:"9-4",text:"File error handling"},{id:"9-5",text:"Input validation loops"},{id:"9-6",text:"Complete robust system"}]}]},{id:3,title:"Phase 3: Algorithms",description:"Standard algorithms for navigation.",levels:[{id:10,title:"Complexity & Searching",syllabus:"B2.4.1, B2.4.2",description:"Measure efficiency, locate targets.",tasks:[{id:"10-1",text:"Big O notation fundamentals"},{id:"10-2",text:"Calculating O(1), O(N), O(N²), O(log N)"},{id:"10-3",text:"Space vs time trade-offs"},{id:"10-4",text:"Linear search implementation"},{id:"10-5",text:"Binary search implementation"}]},{id:11,title:"Sorting",syllabus:"B2.4.3",description:"Organize data for efficient processing.",tasks:[{id:"11-1",text:"Bubble sort with early-exit optimization"},{id:"11-2",text:"Selection sort implementation"},{id:"11-3",text:"Counting comparisons and swaps"},{id:"11-4",text:"Visual tracing of sorting passes"}]}]},{id:4,title:"Phase 4: OOP Fundamentals",description:"The paradigm shift from functions to objects.",levels:[{id:12,title:"Single Class OOP",syllabus:"B3.1.1, B3.1.2, B3.1.4",description:"Blueprint new spacecraft classes.",tasks:[{id:"12-1",text:"Class definition basics"},{id:"12-2",text:"Constructor with __init__"},{id:"12-3",text:"Methods with parameters"},{id:"12-4",text:"Return values from methods"},{id:"12-5",text:"Objects containing objects"},{id:"12-6",text:"Object interaction"},{id:"12-7",text:"Fleet management system"}]},{id:13,title:"Encapsulation & Scope",syllabus:"B3.1.3, B3.1.5",description:"Secure internal systems.",tasks:[{id:"13-1",text:"Static (class) variables"},{id:"13-2",text:"Private attribute convention"},{id:"13-3",text:"Getter methods"},{id:"13-4",text:"Setter methods with validation"},{id:"13-5",text:"Complete encapsulated system"}]}]},{id:5,title:"Phase 5: Recursion",description:"Alternative algorithmic thinking.",isHLOnly:!0,levels:[{id:14,title:"Recursive Algorithms",syllabus:"B2.4.4, B2.4.5",description:"Self-referential logic loops.",tasks:[{id:"14-1",text:"Recursion fundamentals and base cases"},{id:"14-2",text:"Recursive step and problem reduction"},{id:"14-3",text:"Tracing the call stack"},{id:"14-4",text:"Classic examples: factorial and fibonacci"},{id:"14-5",text:"Recursive binary search"},{id:"14-6",text:"String processing with recursion"}]}]},{id:6,title:"Phase 6: Advanced OOP",description:"Complex relationships between classes.",isHLOnly:!0,levels:[{id:15,title:"Inheritance & Polymorphism",syllabus:"B3.2.1 - B3.2.4",description:"Upgrade existing models.",tasks:[{id:"15-1",text:"Inheritance: sharing parent attributes/methods"},{id:"15-2",text:"super().__init__ for extended constructors"},{id:"15-3",text:"Polymorphism via method overriding"},{id:"15-4",text:"Child-specific attributes and methods"},{id:"15-5",text:"Composition: classes containing other classes"},{id:"15-6",text:"Building class hierarchies"}]}]},{id:7,title:"Phase 7: Abstract Data Types",description:"Complex dynamic structures.",isHLOnly:!0,levels:[{id:16,title:"Linked Lists",syllabus:"B4.1.2, B4.1.3",description:"Dynamic chains of command.",tasks:[{id:"16-1",text:"Node class with data and next pointer"},{id:"16-2",text:"LinkedList wrapper with head pointer"},{id:"16-3",text:"Insert operations: front, end, position"},{id:"16-4",text:"Delete operations: by value/position"},{id:"16-5",text:"Traversal, length, and search"},{id:"16-6",text:"Accessing elements at an index"},{id:"16-7",text:"Queue implementation with linked lists"}]},{id:17,title:"Trees",syllabus:"B4.1.4",description:"Hierarchical data mapping.",tasks:[{id:"17-1",text:"TreeNode structure and linking children"},{id:"17-2",text:"BST inserts and recursive search"},{id:"17-3",text:"Traversals: in-order, pre-order, post-order"},{id:"17-4",text:"BST properties: min/max and height"}]},{id:18,title:"Sets",syllabus:"B4.1.5",description:"Unique data collections.",tasks:[{id:"18-1",text:"Set basics: uniqueness and membership"},{id:"18-2",text:"Mutating sets: add, remove, discard"},{id:"18-3",text:"Set operations: union, intersection, difference"},{id:"18-4",text:"Using sets for relationships and deduplication"}]},{id:19,title:"Design Patterns",syllabus:"B3.2.5",description:"Proven solutions to common problems.",tasks:[{id:"19-1",text:"Understanding design patterns"},{id:"19-2",text:"Singleton: one instance only"},{id:"19-3",text:"Factory: dynamic object creation"},{id:"19-4",text:"Observer: event-driven notifications"}]},{id:20,title:"Hashing & Dictionaries",syllabus:"B4.1.6",description:"Fast key-value storage.",tasks:[{id:"20-1",text:"Hashing fundamentals and hash functions"},{id:"20-2",text:"Dictionary operations and O(1) lookups"},{id:"20-3",text:"Hash collisions and resolution"},{id:"20-4",text:"Load factors and practical applications"}]}]}],Im=({className:y,variant:S="orange"})=>{const u={orange:{suit:"#CC5500",suitLight:"#E86A1C",suitDark:"#993300",accent:"#F0EAD6",visor:"#1A2B4C"},white:{suit:"#E8E8E8",suitLight:"#FFFFFF",suitDark:"#CCCCCC",accent:"#4D8B8B",visor:"#1A2B4C"}}[S];return l.jsxs("svg",{viewBox:"0 0 100 100",className:y,fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:`miniSuitGrad-${S}`,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[l.jsx("stop",{offset:"0%",stopColor:u.suitLight}),l.jsx("stop",{offset:"50%",stopColor:u.suit}),l.jsx("stop",{offset:"100%",stopColor:u.suitDark})]}),l.jsxs("linearGradient",{id:`miniVisorGrad-${S}`,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[l.jsx("stop",{offset:"0%",stopColor:"#2a3f5f"}),l.jsx("stop",{offset:"100%",stopColor:u.visor})]}),l.jsxs("radialGradient",{id:`miniGlow-${S}`,cx:"50%",cy:"50%",r:"50%",children:[l.jsx("stop",{offset:"0%",stopColor:u.suit,stopOpacity:"0.3"}),l.jsx("stop",{offset:"100%",stopColor:u.suit,stopOpacity:"0"})]})]}),l.jsx("circle",{cx:"50",cy:"50",r:"45",fill:`url(#miniGlow-${S})`}),l.jsx("rect",{x:"22",y:"50",width:"12",height:"30",rx:"3",fill:"#D0D0D0",stroke:"#888",strokeWidth:"1.5"}),l.jsx("rect",{x:"24",y:"54",width:"8",height:"4",fill:"#999"}),l.jsx("rect",{x:"24",y:"60",width:"8",height:"2",fill:"#888"}),l.jsx("rect",{x:"24",y:"64",width:"8",height:"2",fill:"#888"}),l.jsx("path",{d:"M 35 52 Q 35 48 50 48 Q 65 48 65 52 L 68 78 Q 68 88 50 88 Q 32 88 32 78 Z",fill:`url(#miniSuitGrad-${S})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("rect",{x:"42",y:"56",width:"16",height:"14",rx:"2",fill:"#E8E8E8",stroke:"#666",strokeWidth:"1"}),l.jsx("circle",{cx:"46",cy:"63",r:"2",fill:"#CC0000"}),l.jsx("circle",{cx:"54",cy:"63",r:"2",fill:"#00AA00"}),l.jsx("ellipse",{cx:"50",cy:"48",rx:"10",ry:"3",fill:"#888",stroke:"#666",strokeWidth:"1"}),l.jsx("ellipse",{cx:"50",cy:"32",rx:"20",ry:"18",fill:u.accent,stroke:"#888",strokeWidth:"2"}),l.jsx("path",{d:"M 37 28 Q 37 18 50 15 Q 63 18 63 28 Q 63 40 50 43 Q 37 40 37 28 Z",fill:"#333",stroke:"#222",strokeWidth:"1.5"}),l.jsx("path",{d:"M 39 28 Q 39 20 50 17 Q 61 20 61 28 Q 61 38 50 41 Q 39 38 39 28 Z",fill:`url(#miniVisorGrad-${S})`}),l.jsx("path",{d:"M 42 24 Q 44 20 50 19",fill:"none",stroke:"white",strokeWidth:"2",strokeLinecap:"round",opacity:"0.5"}),l.jsx("ellipse",{cx:"28",cy:"65",rx:"6",ry:"10",fill:`url(#miniSuitGrad-${S})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("ellipse",{cx:"72",cy:"65",rx:"6",ry:"10",fill:`url(#miniSuitGrad-${S})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("circle",{cx:"28",cy:"76",r:"5",fill:"#FFF",stroke:"#333",strokeWidth:"1"}),l.jsx("circle",{cx:"72",cy:"76",r:"5",fill:"#FFF",stroke:"#333",strokeWidth:"1"}),l.jsx("rect",{x:"36",y:"76",width:"28",height:"4",rx:"1",fill:"#666",stroke:"#444",strokeWidth:"0.5"})]})};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qm=y=>y.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Vm=y=>y.replace(/^([A-Z])|[\s-_]+(\w)/g,(S,_,u)=>u?u.toUpperCase():_.toLowerCase()),kf=y=>{const S=Vm(y);return S.charAt(0).toUpperCase()+S.slice(1)},Lf=(...y)=>y.filter((S,_,u)=>!!S&&S.trim()!==""&&u.indexOf(S)===_).join(" ").trim(),Xm=y=>{for(const S in y)if(S.startsWith("aria-")||S==="role"||S==="title")return!0};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Zm={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Km=P.forwardRef(({color:y="currentColor",size:S=24,strokeWidth:_=2,absoluteStrokeWidth:u,className:O="",children:E,iconNode:A,...k},M)=>P.createElement("svg",{ref:M,...Zm,width:S,height:S,stroke:y,strokeWidth:u?Number(_)*24/Number(S):_,className:Lf("lucide",O),...!E&&!Xm(k)&&{"aria-hidden":"true"},...k},[...A.map(([b,B])=>P.createElement(b,B)),...Array.isArray(E)?E:[E]]));/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=(y,S)=>{const _=P.forwardRef(({className:u,...O},E)=>P.createElement(Km,{ref:E,iconNode:S,className:Lf(`lucide-${Qm(kf(y))}`,`lucide-${y}`,u),...O}));return _.displayName=kf(y),_};/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $m=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Uf=Ce("arrow-left",$m);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wm=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],jf=Ce("book-open",Wm);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jm=[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]],Pm=Ce("book",Jm);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]],t0=Ce("box",e0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],n0=Ce("brain-circuit",a0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],s0=Ce("chevron-down",i0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Fs=Ce("chevron-right",l0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Bf=Ce("chevron-left",r0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],Df=Ce("code",o0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],u0=Ce("cpu",c0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]],Rf=Ce("crosshair",d0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],h0=Ce("file-text",f0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",key:"1jaruq"}]],m0=Ce("flag",p0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]],y0=Ce("gauge",g0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b0=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],Is=Ce("house",b0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Gf=Ce("lock",v0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],_0=Ce("map-pin",x0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S0=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],w0=Ce("play",S0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C0=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Fa=Ce("radio",C0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N0=[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]],Ia=Ce("rocket",N0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T0=[["path",{d:"m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",key:"dzhfyz"}],["path",{d:"M16.5 7.5 19 5",key:"1ltcjm"}],["path",{d:"m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",key:"nfoymv"}],["path",{d:"M9 21a6 6 0 0 0-6-6",key:"1iajcf"}],["path",{d:"M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",key:"nv9zqy"}]],A0=Ce("satellite",T0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E0=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],Qs=Ce("star",E0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O0=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],M0=Ce("terminal",O0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k0=[["circle",{cx:"9",cy:"12",r:"3",key:"u3jwor"}],["rect",{width:"20",height:"14",x:"2",y:"5",rx:"7",key:"g7kal2"}]],j0=Ce("toggle-left",k0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D0=[["circle",{cx:"15",cy:"12",r:"3",key:"1afu0r"}],["rect",{width:"20",height:"14",x:"2",y:"5",rx:"7",key:"g7kal2"}]],R0=Ce("toggle-right",D0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z0=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],L0=Ce("trash-2",z0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U0=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],B0=Ce("triangle-alert",U0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G0=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Hf=Ce("x",G0);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H0=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],qf=Ce("zap",H0),q0=({level:y,isCurrent:S,isLocked:_,isCompleted:u,onClick:O,index:E,colorTheme:A})=>{const k=E%4;let M="justify-center",b="left";k===1?(M="justify-end md:pr-24",b="left"):k===3&&(M="justify-start md:pl-24",b="right"),k===0&&(b="right"),k===2&&(b="left");const B=A==="orange",D=B?"#CC5500":"#4D8B8B",G=B?"text-nasa-orange":"text-nasa-teal",L=B?"border-nasa-orange":"border-nasa-teal",Y=B?"bg-nasa-orange":"bg-nasa-teal",I=B?"orange":"white";return l.jsxs("div",{className:`relative flex items-center w-full mb-24 md:mb-32 ${M}`,children:[l.jsx("style",{children:`
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 20px ${D}40, 0 0 40px ${D}20, inset 0 0 20px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 30px ${D}60, 0 0 60px ${D}30, inset 0 0 20px rgba(0,0,0,0.3); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes astronaut-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}),l.jsx("div",{className:`absolute left-1/2 -translate-x-1/2 w-[2px] h-24 md:h-32 -top-24 md:-top-32 ${E===0?"hidden":""}`,style:{background:u||S?`linear-gradient(180deg, ${D}60 0%, ${D} 100%)`:"linear-gradient(180deg, #333 0%, #444 100%)"}}),l.jsxs("button",{onClick:O,disabled:_,className:`
          group relative flex items-center gap-4 md:gap-6 p-3 md:p-4 transition-all duration-300
          ${S?"scale-105 md:scale-110":_?"":"hover:scale-105"}
          focus:outline-none disabled:cursor-not-allowed
          ${b==="left"?"flex-row-reverse":"flex-row"}
        `,children:[!_&&l.jsx("div",{className:`
            hidden md:block absolute top-1/2 -translate-y-1/2 w-56 lg:w-64
            ${b==="left"?"right-full mr-6":"left-full ml-6"}
          `,children:l.jsxs("div",{className:`
              relative bg-[#0a0a0a]/95 backdrop-blur border rounded-lg p-4 
              transition-all duration-300
              ${S?`${L} border-2 shadow-lg`:"border-[#333] group-hover:border-[#555]"}
            `,children:[l.jsx("div",{className:`absolute top-0 ${b==="left"?"right-0 rounded-tr-lg":"left-0 rounded-tl-lg"} w-8 h-1 ${u?Y:"bg-[#333]"}`}),l.jsx("div",{className:`
                inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider mb-2
                ${S?`${Y} text-white`:u?`bg-[#222] ${G}`:"bg-[#1a1a1a] text-[#666]"}
              `,children:S?l.jsxs(l.Fragment,{children:[l.jsx(qf,{size:10}),"Active Mission"]}):u?l.jsxs(l.Fragment,{children:[l.jsx(Qs,{size:10,className:"fill-current"}),"Complete"]}):"Ready"}),l.jsx("h3",{className:`
                font-display font-bold text-lg uppercase tracking-wide leading-tight mb-1
                ${S?"text-white":u?G:"text-[#AAA]"}
                transition-colors group-hover:text-white
              `,children:y.title}),l.jsx("div",{className:"font-mono text-xs text-[#666] mb-2",children:y.syllabus}),l.jsx("p",{className:"font-mono text-xs text-[#888] leading-relaxed line-clamp-2",children:y.description}),S&&l.jsx("div",{className:`
                  absolute top-1/2 -translate-y-1/2 
                  ${b==="left"?"-right-6 rotate-180":"-left-6"}
                `,children:l.jsx(Fs,{size:20,className:G})})]})}),l.jsxs("div",{className:"relative",children:[S&&l.jsx("div",{className:"absolute -inset-3 rounded-full border border-dashed opacity-50",style:{borderColor:D,animation:"ring-rotate 20s linear infinite"}}),l.jsxs("div",{className:`
              relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden
              transition-all duration-500
              ${_?"opacity-40 grayscale":""}
            `,style:S?{animation:"badge-glow 3s ease-in-out infinite, badge-float 4s ease-in-out infinite"}:{},children:[l.jsx("div",{className:`
              absolute inset-0 rounded-full
              ${S?"":u?"bg-[#0a0a0a]":"bg-[#111]"}
            `,style:S?{background:`radial-gradient(circle at 30% 30%, ${D}40 0%, #0a0a0a 70%)`}:{}}),l.jsx("div",{className:`
              absolute inset-0 rounded-full border-4
              ${S?`${L}`:u?`${L} opacity-60`:"border-[#333]"}
            `}),l.jsx("div",{className:`
              absolute inset-2 rounded-full border-2
              ${S?"border-white/30":u?"border-white/10":"border-[#222]"}
            `}),l.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center",children:[l.jsx("span",{className:`
                font-display font-bold text-2xl md:text-3xl
                ${S?"text-white":u?G:"text-[#555]"}
              `,children:String(y.id).padStart(2,"0")}),l.jsx("div",{className:"mt-0.5",children:u?l.jsx(Qs,{size:12,className:`${G} fill-current`}):S?l.jsx(Ia,{size:12,className:"text-white"}):l.jsx(Gf,{size:10,className:"text-[#444]"})})]}),l.jsx("div",{className:"absolute top-1 left-1/4 w-1/2 h-1/4 rounded-full opacity-20",style:{background:"linear-gradient(180deg, white 0%, transparent 100%)"}})]}),S&&l.jsx("div",{className:"absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-14 z-30",style:{animation:"astronaut-bounce 2s ease-in-out infinite"},children:l.jsx(Im,{variant:I})}),l.jsx("div",{className:`
            absolute -bottom-1 left-1/2 -translate-x-1/2 
            px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider
            border
            ${S?`${Y} text-white border-white/20`:""}
            ${u&&!S?`bg-[#0a0a0a] ${G} ${L}`:""}
            ${_?"bg-[#111] text-[#444] border-[#333]":""}
            ${!u&&!S&&!_?"bg-[#0a0a0a] text-[#666] border-[#333]":""}
          `,children:S?"GO":u?"✓":_?"—":"RDY"})]}),!_&&l.jsx("div",{className:"md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-8 w-48",children:l.jsxs("div",{className:`
              text-center bg-[#0a0a0a]/95 backdrop-blur p-3 rounded-lg border
              ${S?`${L}`:"border-[#333]"}
            `,children:[l.jsx("div",{className:`font-display font-bold text-sm uppercase ${S?"text-white":G}`,children:y.title}),l.jsx("div",{className:"font-mono text-xs text-[#666] mt-1",children:y.syllabus})]})})]})]})},Y0=({onSelectPathway:y})=>{const[S,_]=P.useState(0),[u,O]=P.useState(new Date);P.useEffect(()=>{const k=[setTimeout(()=>_(1),300),setTimeout(()=>_(2),600),setTimeout(()=>_(3),900),setTimeout(()=>_(4),1200)];return()=>k.forEach(M=>clearTimeout(M))},[]),P.useEffect(()=>{const k=setInterval(()=>O(new Date),1e3);return()=>clearInterval(k)},[]);const E=k=>k.toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}),A=k=>k.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"2-digit"}).toUpperCase();return l.jsxs("div",{className:"min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden",children:[l.jsx("style",{children:`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          97% { opacity: 0.9; }
          98% { opacity: 1; }
        }
        @keyframes type-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(204, 85, 0, 0.3), inset 0 0 20px rgba(0,0,0,0.5); }
          50% { box-shadow: 0 0 40px rgba(204, 85, 0, 0.5), inset 0 0 20px rgba(0,0,0,0.5); }
        }
        @keyframes status-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes boot-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .crt-screen {
          animation: flicker 5s infinite;
        }
        .boot-line {
          animation: boot-in 0.3s ease-out forwards;
        }
      `}),l.jsx("div",{className:"fixed inset-0 pointer-events-none z-50 opacity-[0.03]",children:l.jsx("div",{className:"absolute left-0 right-0 h-[2px] bg-white",style:{animation:"scan-line 8s linear infinite"}})}),l.jsxs("div",{className:"w-full max-w-5xl mx-auto relative",children:[l.jsxs("div",{className:"bg-[#1a1a1a] border-2 border-b-0 border-[#333] rounded-t-lg px-4 py-2 flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsxs("div",{className:"flex gap-2",children:[l.jsx("div",{className:"w-3 h-3 rounded-full bg-red-500/80"}),l.jsx("div",{className:"w-3 h-3 rounded-full bg-yellow-500/80"}),l.jsx("div",{className:"w-3 h-3 rounded-full bg-green-500/80"})]}),l.jsx("span",{className:"font-mono text-xs text-[#666] hidden sm:block",children:"MISSION_CONTROL_v2.7.1"})]}),l.jsxs("div",{className:"flex items-center gap-4 font-mono text-xs",children:[l.jsx("span",{className:"text-[#666]",children:A(u)}),l.jsxs("span",{className:"text-nasa-orange tabular-nums",children:[E(u)," UTC"]})]})]}),l.jsxs("div",{className:"bg-[#0a0c10] border-2 border-[#333] rounded-b-lg crt-screen relative overflow-hidden",children:[l.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-[#CC5500]/5 to-transparent pointer-events-none"}),l.jsxs("div",{className:"relative z-10 p-6 md:p-10",children:[l.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#222]",children:[l.jsxs("div",{className:"flex items-center gap-6",children:[l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx(Fa,{size:14,className:"text-green-500",style:{animation:"status-blink 1s infinite"}}),l.jsx("span",{className:"font-mono text-xs text-green-500",children:"LINK ESTABLISHED"})]}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx(y0,{size:14,className:"text-nasa-orange"}),l.jsxs("span",{className:"font-mono text-xs text-[#666]",children:["SYS: ",l.jsx("span",{className:"text-white",children:"NOMINAL"})]})]})]}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx(u0,{size:14,className:"text-nasa-teal"}),l.jsxs("span",{className:"font-mono text-xs text-[#666]",children:["EDU-CORE: ",l.jsx("span",{className:"text-nasa-teal",children:"ACTIVE"})]})]})]}),l.jsx("div",{className:`mb-12 ${S>=1?"boot-line":"opacity-0"}`,children:l.jsxs("div",{className:"flex flex-col md:flex-row items-start gap-8",children:[l.jsx("div",{className:"relative shrink-0",children:l.jsxs("div",{className:"w-24 h-24 md:w-32 md:h-32 border-2 border-nasa-orange/50 bg-[#111] flex items-center justify-center relative",style:{animation:"glow-pulse 3s infinite"},children:[l.jsx(Ia,{size:48,className:"text-nasa-orange md:w-16 md:h-16"}),l.jsx("div",{className:"absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-nasa-orange"}),l.jsx("div",{className:"absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-nasa-orange"}),l.jsx("div",{className:"absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-nasa-orange"}),l.jsx("div",{className:"absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-nasa-orange"})]})}),l.jsxs("div",{className:"flex-1",children:[l.jsxs("div",{className:"font-mono text-xs text-[#555] mb-2 tracking-widest",children:[">"," INITIALIZING MISSION PARAMETERS..."]}),l.jsxs("h1",{className:"font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-3",children:["PYTHON",l.jsx("br",{}),l.jsx("span",{className:"text-nasa-orange",children:"MISSION"})]}),l.jsx("div",{className:"h-px w-full bg-gradient-to-r from-nasa-orange via-nasa-orange/50 to-transparent mb-4"}),l.jsxs("p",{className:"font-mono text-sm md:text-base text-[#888] tracking-wide",children:["IB COMPUTER SCIENCE ",l.jsx("span",{className:"text-nasa-orange mx-2",children:"//"})," CURRICULUM 2027"]})]})]})}),l.jsxs("div",{className:`mb-8 font-mono text-xs space-y-1 ${S>=2?"boot-line":"opacity-0"}`,style:{animationDelay:"0.1s"},children:[l.jsx("div",{className:"text-green-500",children:"✓ Syllabus mapping loaded (B2, B3, B4)"}),l.jsx("div",{className:"text-green-500",children:"✓ Challenge protocols initialized"}),l.jsxs("div",{className:"text-[#666]",children:[">"," Select mission profile to continue",l.jsx("span",{className:"inline-block w-2 h-4 bg-nasa-orange ml-1",style:{animation:"type-cursor 1s infinite"}})]})]}),l.jsxs("div",{className:`grid md:grid-cols-2 gap-6 ${S>=3?"boot-line":"opacity-0"}`,style:{animationDelay:"0.2s"},children:[l.jsxs("button",{onClick:()=>y("SL"),className:"group relative bg-[#0d0d0d] border border-[#333] hover:border-nasa-orange p-6 text-left transition-all duration-300 hover:bg-[#111] overflow-hidden",children:[l.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-nasa-orange/0 to-nasa-orange/0 group-hover:from-nasa-orange/10 group-hover:to-transparent transition-all duration-300"}),l.jsx("div",{className:"absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-nasa-orange border-l-[40px] border-l-transparent"}),l.jsxs("div",{className:"relative z-10",children:[l.jsxs("div",{className:"inline-flex items-center gap-2 bg-nasa-orange/20 border border-nasa-orange/50 px-3 py-1 mb-4",children:[l.jsx(t0,{size:14,className:"text-nasa-orange"}),l.jsx("span",{className:"font-mono text-xs text-nasa-orange tracking-wider",children:"STANDARD PAYLOAD"})]}),l.jsx("h2",{className:"font-display font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-nasa-orange transition-colors",children:"Standard Level"}),l.jsx("p",{className:"font-mono text-xs text-[#777] mb-6 leading-relaxed",children:"Core mastery of procedural programming, data structures, algorithms, and OOP fundamentals."}),l.jsxs("div",{className:"flex flex-wrap gap-4 text-xs font-mono",children:[l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:"w-2 h-2 bg-nasa-orange"}),l.jsxs("span",{className:"text-[#666]",children:["PHASES: ",l.jsx("span",{className:"text-white",children:"1-4"})]})]}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:"w-2 h-2 bg-nasa-orange"}),l.jsxs("span",{className:"text-[#666]",children:["LEVELS: ",l.jsx("span",{className:"text-white",children:"1-13"})]})]})]}),l.jsxs("div",{className:"mt-6 pt-4 border-t border-[#222] flex items-center justify-between",children:[l.jsx("span",{className:"font-mono text-xs text-[#555]",children:"READY FOR LAUNCH"}),l.jsxs("div",{className:"flex items-center gap-2 text-nasa-orange group-hover:translate-x-2 transition-transform",children:[l.jsx("span",{className:"font-mono text-xs",children:"INITIATE"}),l.jsx("span",{className:"text-lg",children:"→"})]})]})]})]}),l.jsxs("button",{onClick:()=>y("HL"),className:"group relative bg-[#0d0d0d] border border-[#333] hover:border-nasa-teal p-6 text-left transition-all duration-300 hover:bg-[#111] overflow-hidden",children:[l.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-nasa-teal/0 to-nasa-teal/0 group-hover:from-nasa-teal/10 group-hover:to-transparent transition-all duration-300"}),l.jsx("div",{className:"absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-nasa-teal border-l-[40px] border-l-transparent"}),l.jsxs("div",{className:"relative z-10",children:[l.jsxs("div",{className:"inline-flex items-center gap-2 bg-nasa-teal/20 border border-nasa-teal/50 px-3 py-1 mb-4",children:[l.jsx(n0,{size:14,className:"text-nasa-teal"}),l.jsx("span",{className:"font-mono text-xs text-nasa-teal tracking-wider",children:"HEAVY LIFT"})]}),l.jsx("h2",{className:"font-display font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-nasa-teal transition-colors",children:"Higher Level"}),l.jsx("p",{className:"font-mono text-xs text-[#777] mb-6 leading-relaxed",children:"Advanced mission: recursive algorithms, inheritance, abstract data types, and complex structures."}),l.jsxs("div",{className:"flex flex-wrap gap-4 text-xs font-mono",children:[l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:"w-2 h-2 bg-nasa-teal"}),l.jsxs("span",{className:"text-[#666]",children:["PHASES: ",l.jsx("span",{className:"text-white",children:"5-7"})]})]}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:"w-2 h-2 bg-nasa-teal"}),l.jsxs("span",{className:"text-[#666]",children:["LEVELS: ",l.jsx("span",{className:"text-white",children:"14-18"})]})]})]}),l.jsxs("div",{className:"mt-6 pt-4 border-t border-[#222] flex items-center justify-between",children:[l.jsx("span",{className:"font-mono text-xs text-[#555]",children:"READY FOR LAUNCH"}),l.jsxs("div",{className:"flex items-center gap-2 text-nasa-teal group-hover:translate-x-2 transition-transform",children:[l.jsx("span",{className:"font-mono text-xs",children:"INITIATE"}),l.jsx("span",{className:"text-lg",children:"→"})]})]})]})]})]}),l.jsxs("div",{className:`mt-10 pt-6 border-t border-[#222] flex flex-wrap items-center justify-between gap-4 ${S>=4?"boot-line":"opacity-0"}`,style:{animationDelay:"0.3s"},children:[l.jsxs("div",{className:"font-mono text-xs text-[#444]",children:[">"," SGS COMPUTER SCIENCE DEPARTMENT"]}),l.jsx("div",{className:"flex items-center gap-4",children:l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:"w-2 h-2 rounded-full bg-green-500 animate-pulse"}),l.jsx("span",{className:"font-mono text-xs text-[#666]",children:"ALL SYSTEMS GO"})]})})]})]}),l.jsx("div",{className:"absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"})]}),l.jsx("div",{className:"mx-auto w-32 h-4 bg-gradient-to-b from-[#222] to-[#111] rounded-b-lg"}),l.jsx("div",{className:"mx-auto w-48 h-2 bg-[#1a1a1a] rounded-b"})]})]})},F0=({level:y,onAccept:S,onCancel:_,colorTheme:u})=>{const O=u==="orange",E=O?"#CC5500":"#4D8B8B",A=O?"text-nasa-orange":"text-nasa-teal",k=O?"border-nasa-orange":"border-nasa-teal",M=O?"bg-nasa-orange":"bg-nasa-teal";return l.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[l.jsx("style",{children:`
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes corner-blink {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
      `}),l.jsx("div",{className:"absolute inset-0 bg-black/90 backdrop-blur-sm",onClick:_}),l.jsxs("div",{className:"relative w-full max-w-lg bg-[#0a0a0a] border-2 overflow-hidden",style:{borderColor:E,animation:"modal-in 0.3s ease-out",boxShadow:`0 0 60px ${E}30, inset 0 0 30px rgba(0,0,0,0.5)`},children:[l.jsx("div",{className:"absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]",children:l.jsx("div",{className:"absolute left-0 right-0 h-[2px] bg-white",style:{animation:"scanline-move 4s linear infinite"}})}),l.jsx("div",{className:`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${k}`,style:{animation:"corner-blink 2s infinite"}}),l.jsx("div",{className:`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${k}`,style:{animation:"corner-blink 2s infinite",animationDelay:"0.5s"}}),l.jsx("div",{className:`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${k}`,style:{animation:"corner-blink 2s infinite",animationDelay:"1s"}}),l.jsx("div",{className:`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${k}`,style:{animation:"corner-blink 2s infinite",animationDelay:"1.5s"}}),l.jsx("div",{className:`relative p-4 border-b ${k}/30 bg-gradient-to-r from-black via-transparent to-black`,children:l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:`p-2 ${M}/20 rounded`,children:l.jsx(h0,{size:18,className:A})}),l.jsxs("div",{children:[l.jsx("div",{className:"font-mono text-[10px] text-[#666] tracking-widest uppercase",children:"Classification: Training"}),l.jsx("div",{className:"font-mono text-sm tracking-wider text-white",children:"MISSION BRIEF"})]})]}),l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsxs("div",{className:"font-mono text-xs text-[#555]",children:["DOC-",String(y.id).padStart(3,"0")]}),l.jsx("button",{onClick:_,className:"p-1 hover:bg-white/10 rounded transition-colors",children:l.jsx(Hf,{size:18,className:"text-[#666] hover:text-white"})})]})]})}),l.jsxs("div",{className:"relative p-6",children:[l.jsxs("div",{className:"mb-6",children:[l.jsx("div",{className:"font-mono text-[10px] text-[#555] tracking-widest uppercase mb-2",children:"Mission Designation"}),l.jsx("h2",{className:"font-display font-bold text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight",children:y.title})]}),l.jsxs("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[l.jsxs("div",{className:"bg-[#111] border border-[#222] rounded p-3",children:[l.jsx("div",{className:"font-mono text-[10px] text-[#555] uppercase tracking-wider mb-1",children:"Syllabus Ref"}),l.jsx("div",{className:`font-mono text-sm ${A}`,children:y.syllabus})]}),l.jsxs("div",{className:"bg-[#111] border border-[#222] rounded p-3",children:[l.jsx("div",{className:"font-mono text-[10px] text-[#555] uppercase tracking-wider mb-1",children:"Mission ID"}),l.jsxs("div",{className:"font-mono text-sm text-white",children:["PY-",new Date().getFullYear(),"-",String(y.id).padStart(2,"0")]})]})]}),l.jsxs("div",{className:`bg-[#0d0d0d] border-l-4 ${k} p-4 mb-6`,children:[l.jsxs("div",{className:"font-mono text-[10px] text-[#555] uppercase tracking-wider mb-2 flex items-center gap-2",children:[l.jsx(M0,{size:12}),"Mission Objective"]}),l.jsxs("p",{className:"font-mono text-sm text-[#AAA] leading-relaxed",children:['"',y.description,'"']})]}),y.tasks&&y.tasks.length>0&&l.jsxs("div",{className:"mb-6",children:[l.jsxs("div",{className:"font-mono text-[10px] text-[#555] uppercase tracking-wider mb-3",children:["Primary Objectives (",y.tasks.length,")"]}),l.jsxs("div",{className:"space-y-2 max-h-32 overflow-y-auto custom-scrollbar",children:[y.tasks.slice(0,4).map((b,B)=>l.jsxs("div",{className:"flex items-start gap-3 text-xs font-mono",children:[l.jsx("div",{className:`w-5 h-5 rounded border ${k}/50 flex items-center justify-center shrink-0 mt-0.5`,children:l.jsx("span",{className:`${A} text-[10px]`,children:B+1})}),l.jsx("span",{className:"text-[#888]",children:b.text})]},b.id)),y.tasks.length>4&&l.jsxs("div",{className:"text-[#555] text-xs font-mono pl-8",children:["+ ",y.tasks.length-4," more objectives..."]})]})]}),l.jsx("div",{className:"bg-[#1a1500] border border-[#332200] rounded p-3 mb-6",children:l.jsxs("div",{className:"flex items-start gap-3",children:[l.jsx(B0,{size:16,className:"text-yellow-600 shrink-0 mt-0.5"}),l.jsx("div",{className:"font-mono text-xs text-yellow-600/80",children:"Ensure all prerequisites are complete before initiating this mission sequence."})]})}),l.jsxs("div",{className:"space-y-3",children:[l.jsxs("button",{onClick:S,className:`
                w-full py-4 ${M} text-white font-display font-bold text-lg 
                tracking-widest uppercase transition-all duration-300
                hover:brightness-110 hover:shadow-lg
                flex items-center justify-center gap-3
              `,style:{boxShadow:`0 0 20px ${E}40`},children:[l.jsx(Ia,{size:20}),"Initiate Launch Sequence"]}),l.jsx("button",{onClick:_,className:"w-full py-2 text-[#666] font-mono text-xs hover:text-white transition-colors uppercase tracking-wider",children:"Return to Mission Control"})]})]}),l.jsx("div",{className:`px-4 py-2 border-t ${k}/20 bg-black/50`,children:l.jsxs("div",{className:"flex items-center justify-between text-[10px] font-mono",children:[l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("div",{className:"w-2 h-2 rounded-full bg-green-500",style:{animation:"status-pulse 2s infinite"}}),l.jsx("span",{className:"text-green-500",children:"SYSTEM READY"})]}),l.jsx("div",{className:"text-[#444]",children:"v2.7.1 // SECURE CHANNEL"})]})}),l.jsx(Rf,{className:`absolute top-12 right-3 opacity-20 ${A}`,size:14}),l.jsx(Rf,{className:`absolute bottom-12 left-3 opacity-20 ${A}`,size:14})]})]})},I0=({onComplete:y,colorTheme:S})=>{const[_,u]=P.useState(3),[O,E]=P.useState("COUNTDOWN"),[A,k]=P.useState(!1),M=P.useRef(!1);P.useEffect(()=>{if(O==="COUNTDOWN"&&_>0){const G=setTimeout(()=>u(L=>L-1),1e3);return()=>clearTimeout(G)}},[_,O]),P.useEffect(()=>{if(_===0&&!M.current){M.current=!0,E("IGNITION"),k(!0);const G=setTimeout(()=>{E("LAUNCH")},1500),L=setTimeout(()=>{E("FADE")},3e3),Y=setTimeout(()=>{y()},4e3);return()=>{clearTimeout(G),clearTimeout(L),clearTimeout(Y)}}},[_,y]);const b=S==="orange",B=b?"#CC5500":"#4D8B8B",D=b?"text-nasa-orange":"text-nasa-teal";return l.jsxs("div",{className:`fixed inset-0 z-[60] overflow-hidden ${A?"animate-shake":""}`,children:[l.jsx("style",{children:`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -1px) rotate(-0.5deg); }
          20% { transform: translate(2px, -2px) rotate(0.5deg); }
          30% { transform: translate(-3px, 1px) rotate(0deg); }
          40% { transform: translate(3px, 2px) rotate(0.5deg); }
          50% { transform: translate(-2px, -1px) rotate(-0.5deg); }
          60% { transform: translate(2px, 1px) rotate(0deg); }
          70% { transform: translate(-3px, -2px) rotate(-0.5deg); }
          80% { transform: translate(2px, 2px) rotate(0.5deg); }
          90% { transform: translate(-2px, -1px) rotate(0deg); }
        }
        @keyframes flame-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          25% { transform: scaleY(1.1) scaleX(0.95); }
          50% { transform: scaleY(0.95) scaleX(1.05); }
          75% { transform: scaleY(1.05) scaleX(0.98); }
        }
        @keyframes flame-grow {
          0% { transform: scaleY(0.3) scaleX(0.8); opacity: 0.5; }
          50% { transform: scaleY(1.5) scaleX(1.2); opacity: 1; }
          100% { transform: scaleY(2.5) scaleX(1.5); opacity: 1; }
        }
        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-200px) scale(3); opacity: 0; }
        }
        @keyframes rocket-launch {
          0% { transform: translateY(0); }
          100% { transform: translateY(-150vh); }
        }
        @keyframes gantry-retract {
          0% { transform: translateX(0) rotate(0deg); }
          100% { transform: translateX(-100px) rotate(-30deg); }
        }
        @keyframes countdown-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes status-blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.4; }
        }
        @keyframes exhaust-spread {
          0% { transform: scaleX(1); }
          100% { transform: scaleX(4); }
        }
        .animate-shake { animation: shake 0.15s linear infinite; }
        .flame-idle { animation: flame-flicker 0.1s linear infinite; }
        .flame-ignition { animation: flame-grow 1.5s ease-out forwards; }
      `}),l.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(180deg, #0a0a12 0%, #141428 40%, #1a1a30 100%)"}}),l.jsx("div",{className:"absolute inset-0 opacity-40",children:Array.from({length:100}).map((G,L)=>l.jsx("div",{className:"absolute rounded-full bg-white",style:{left:`${Math.random()*100}%`,top:`${Math.random()*60}%`,width:`${Math.random()*2+1}px`,height:`${Math.random()*2+1}px`,opacity:Math.random()*.5+.3}},L))}),l.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10"}),l.jsxs("div",{className:"absolute bottom-0 left-0 right-0 h-16 bg-[#2a2a2a] z-10",children:[l.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 bottom-0 w-48 h-8 bg-[#333] rounded-t"}),l.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 bottom-8 w-32 h-4 bg-[#444]"})]}),O==="COUNTDOWN"&&l.jsxs("div",{className:"absolute top-8 left-0 right-0 flex flex-col items-center z-50",children:[l.jsxs("div",{className:"bg-[#0a0a0a] border-4 border-[#333] rounded-lg p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]",children:[l.jsxs("div",{className:"flex justify-center gap-3 mb-4",children:[l.jsx("div",{className:`w-3 h-3 rounded-full bg-green-500 ${_<=3?"animate-pulse":""}`}),l.jsx("div",{className:`w-3 h-3 rounded-full ${_<=2?"bg-yellow-500 animate-pulse":"bg-yellow-900"}`}),l.jsx("div",{className:`w-3 h-3 rounded-full ${_<=1?"bg-red-500 animate-pulse":"bg-red-900"}`})]}),l.jsx("div",{className:`font-display font-bold text-[8rem] md:text-[12rem] leading-none tabular-nums ${D}`,style:{textShadow:`0 0 30px ${B}40, 0 0 60px ${B}20`,animation:"countdown-pulse 1s ease-in-out infinite"},children:_}),l.jsx("div",{className:"text-center mt-4",children:l.jsx("span",{className:"font-mono text-sm md:text-base tracking-[0.5em] text-[#666] uppercase",children:"T-Minus"})})]}),l.jsx("div",{className:"mt-6 font-mono text-xs tracking-[0.3em] text-[#888] uppercase",style:{animation:"status-blink 2s infinite"},children:"● Ignition Sequence Active"})]}),O==="IGNITION"&&l.jsx("div",{className:"absolute top-8 left-0 right-0 flex flex-col items-center z-50",children:l.jsx("div",{className:"bg-[#0a0a0a] border-4 border-[#CC5500] rounded-lg px-12 py-6 shadow-[0_0_30px_rgba(204,85,0,0.3)]",children:l.jsx("div",{className:"font-display font-bold text-4xl md:text-6xl text-nasa-orange tracking-wider uppercase animate-pulse",children:"Ignition"})})}),O==="LAUNCH"&&l.jsx("div",{className:"absolute top-8 left-0 right-0 flex flex-col items-center z-50",children:l.jsx("div",{className:"bg-[#0a0a0a] border-4 border-white rounded-lg px-12 py-6",children:l.jsx("div",{className:"font-display font-bold text-4xl md:text-6xl text-white tracking-wider uppercase",children:"Liftoff!"})})}),l.jsxs("div",{className:"absolute left-1/2 bottom-16 z-20",style:{transform:"translateX(-50%) ",animation:O==="LAUNCH"?"rocket-launch 2s ease-in forwards":"none"},children:[l.jsxs("svg",{width:"120",height:"380",viewBox:"0 0 120 380",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"overflow-visible",children:[l.jsxs("g",{className:`origin-top ${O==="COUNTDOWN"?"":O==="IGNITION"?"flame-ignition":""}`,style:{transformOrigin:"60px 360px"},children:[l.jsx("ellipse",{cx:"60",cy:"420",rx:"40",ry:"80",fill:"url(#flameGradientOuter)",className:"blur-md",style:{opacity:O==="COUNTDOWN"?0:1}}),O!=="COUNTDOWN"&&l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M 35 360 Q 20 420 30 480 Q 60 520 90 480 Q 100 420 85 360",fill:"url(#flameGradient)",className:"flame-idle"}),l.jsx("path",{d:"M 45 360 Q 35 400 45 450 Q 60 480 75 450 Q 85 400 75 360",fill:"url(#flameGradientInner)",className:"flame-idle",style:{animationDelay:"0.05s"}}),l.jsx("path",{d:"M 52 360 Q 48 390 55 420 Q 60 440 65 420 Q 72 390 68 360",fill:"#fff",className:"flame-idle",style:{animationDelay:"0.02s",opacity:.9}})]}),(O==="IGNITION"||O==="LAUNCH")&&l.jsx(l.Fragment,{children:[...Array(8)].map((G,L)=>l.jsx("circle",{cx:40+Math.random()*40,cy:"380",r:15+Math.random()*20,fill:"#888",style:{animation:`smoke-rise ${1.5+Math.random()}s ease-out infinite`,animationDelay:`${L*.15}s`,opacity:.4}},L))})]}),l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"flameGradient",x1:"60",y1:"360",x2:"60",y2:"500",gradientUnits:"userSpaceOnUse",children:[l.jsx("stop",{offset:"0%",stopColor:"#FF6600"}),l.jsx("stop",{offset:"40%",stopColor:"#FF3300"}),l.jsx("stop",{offset:"100%",stopColor:"#FF0000",stopOpacity:"0"})]}),l.jsxs("linearGradient",{id:"flameGradientInner",x1:"60",y1:"360",x2:"60",y2:"480",gradientUnits:"userSpaceOnUse",children:[l.jsx("stop",{offset:"0%",stopColor:"#FFFF00"}),l.jsx("stop",{offset:"50%",stopColor:"#FF9900"}),l.jsx("stop",{offset:"100%",stopColor:"#FF3300",stopOpacity:"0"})]}),l.jsxs("linearGradient",{id:"flameGradientOuter",x1:"60",y1:"380",x2:"60",y2:"500",gradientUnits:"userSpaceOnUse",children:[l.jsx("stop",{offset:"0%",stopColor:"#FF6600",stopOpacity:"0.6"}),l.jsx("stop",{offset:"100%",stopColor:"#FF0000",stopOpacity:"0"})]}),l.jsxs("linearGradient",{id:"bodyGradient",x1:"30",y1:"0",x2:"90",y2:"0",gradientUnits:"userSpaceOnUse",children:[l.jsx("stop",{offset:"0%",stopColor:"#e8e8e8"}),l.jsx("stop",{offset:"30%",stopColor:"#ffffff"}),l.jsx("stop",{offset:"70%",stopColor:"#ffffff"}),l.jsx("stop",{offset:"100%",stopColor:"#d0d0d0"})]}),l.jsxs("linearGradient",{id:"stage2Gradient",x1:"30",y1:"0",x2:"90",y2:"0",gradientUnits:"userSpaceOnUse",children:[l.jsx("stop",{offset:"0%",stopColor:"#f0f0f0"}),l.jsx("stop",{offset:"50%",stopColor:"#ffffff"}),l.jsx("stop",{offset:"100%",stopColor:"#e0e0e0"})]})]}),l.jsx("rect",{x:"30",y:"280",width:"60",height:"80",fill:"url(#bodyGradient)",stroke:"#666",strokeWidth:"1"}),l.jsx("rect",{x:"30",y:"280",width:"60",height:"15",fill:"#1a1a1a"}),l.jsx("text",{x:"60",y:"340",textAnchor:"middle",fill:"#1a1a1a",fontSize:"8",fontFamily:"Arial",fontWeight:"bold",children:"USA"}),l.jsx("ellipse",{cx:"40",cy:"360",rx:"8",ry:"4",fill:"#333"}),l.jsx("ellipse",{cx:"60",cy:"360",rx:"8",ry:"4",fill:"#333"}),l.jsx("ellipse",{cx:"80",cy:"360",rx:"8",ry:"4",fill:"#333"}),l.jsx("rect",{x:"36",y:"355",width:"8",height:"5",fill:"#444"}),l.jsx("rect",{x:"56",y:"355",width:"8",height:"5",fill:"#444"}),l.jsx("rect",{x:"76",y:"355",width:"8",height:"5",fill:"#444"}),l.jsx("path",{d:"M 30 340 L 15 360 L 30 360 Z",fill:"#1a1a1a"}),l.jsx("path",{d:"M 90 340 L 105 360 L 90 360 Z",fill:"#1a1a1a"}),l.jsx("rect",{x:"28",y:"275",width:"64",height:"8",fill:"#333",rx:"1"}),l.jsx("rect",{x:"32",y:"180",width:"56",height:"95",fill:"url(#stage2Gradient)",stroke:"#666",strokeWidth:"1"}),l.jsx("rect",{x:"32",y:"180",width:"56",height:"10",fill:"#1a1a1a"}),l.jsx("rect",{x:"32",y:"230",width:"56",height:"5",fill:B}),l.jsx("rect",{x:"30",y:"175",width:"60",height:"8",fill:"#444",rx:"1"}),l.jsx("rect",{x:"35",y:"100",width:"50",height:"75",fill:"url(#bodyGradient)",stroke:"#666",strokeWidth:"1"}),l.jsx("rect",{x:"35",y:"100",width:"50",height:"8",fill:"#1a1a1a"}),l.jsx("rect",{x:"45",y:"120",width:"30",height:"20",fill:"none",stroke:"#ccc",strokeWidth:"0.5"}),l.jsx("rect",{x:"45",y:"120",width:"12",height:"10",fill:"#1a3c6e"}),[...Array(3)].map((G,L)=>l.jsx("rect",{x:"45",y:130+L*3.3,width:"30",height:"3.3",fill:L%2===0?"#b31942":"#fff"},L)),l.jsx("path",{d:"M 35 100 L 40 90 L 80 90 L 85 100 Z",fill:"#555"}),l.jsx("path",{d:"M 40 90 L 45 60 L 75 60 L 80 90 Z",fill:"#fff",stroke:"#666",strokeWidth:"1"}),l.jsx("rect",{x:"45",y:"70",width:"30",height:"5",fill:B,opacity:"0.8"}),l.jsx("path",{d:"M 55 60 L 60 10 L 65 60 Z",fill:"#cc0000",stroke:"#990000",strokeWidth:"0.5"}),l.jsx("rect",{x:"50",y:"55",width:"20",height:"8",fill:"#333"}),l.jsx("line",{x1:"52",y1:"55",x2:"58",y2:"30",stroke:"#333",strokeWidth:"1"}),l.jsx("line",{x1:"68",y1:"55",x2:"62",y2:"30",stroke:"#333",strokeWidth:"1"})]}),l.jsx("div",{className:"absolute right-[-60px] bottom-[100px] w-[80px] h-[8px] bg-gradient-to-r from-[#444] to-[#666] origin-left",style:{animation:O==="IGNITION"||O==="LAUNCH"?"gantry-retract 1s ease-in forwards":"none"},children:l.jsx("div",{className:"absolute right-0 top-[-10px] w-[20px] h-[28px] bg-[#555] rounded"})})]}),(O==="IGNITION"||O==="LAUNCH")&&l.jsx("div",{className:"absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] bg-gradient-to-t from-[#666] to-transparent rounded-full blur-xl z-10",style:{animation:"exhaust-spread 2s ease-out forwards",opacity:.5}}),l.jsx("div",{className:"absolute bottom-4 left-0 right-0 flex justify-center z-30",children:l.jsxs("div",{className:"bg-black/60 backdrop-blur border border-[#333] px-6 py-2 flex items-center gap-6 font-mono text-xs text-[#888]",children:[l.jsxs("span",{children:["MISSION: ",l.jsxs("span",{className:D,children:["PYTHON-",S==="orange"?"SL":"HL"]})]}),l.jsx("span",{className:"text-[#444]",children:"|"}),l.jsxs("span",{children:["VEHICLE: ",l.jsx("span",{className:"text-white",children:"SATURN-EDU"})]}),l.jsx("span",{className:"text-[#444]",children:"|"}),l.jsxs("span",{className:`${O!=="COUNTDOWN"?"text-green-500":"text-yellow-500"}`,children:["● ",O==="COUNTDOWN"?"STANDBY":O==="IGNITION"?"IGNITION":O==="LAUNCH"?"ASCENT":"TRANSIT"]})]})}),l.jsx("div",{className:`absolute inset-0 bg-black pointer-events-none z-[100] transition-opacity duration-1000 ${O==="FADE"?"opacity-100":"opacity-0"}`})]})},Q0=({className:y,isWalking:S=!1,direction:_="right",variant:u="orange"})=>{const E={orange:{suit:"#CC5500",suitLight:"#E86A1C",suitDark:"#993300",accent:"#F0EAD6",visor:"#1A2B4C",backpack:"#E8E8E8",boots:"#444444"},white:{suit:"#E8E8E8",suitLight:"#FFFFFF",suitDark:"#CCCCCC",accent:"#4D8B8B",visor:"#1A2B4C",backpack:"#D0D0D0",boots:"#333333"}}[u];return l.jsx("div",{className:`${y||""} ${_==="left"?"-scale-x-100":""}`,children:l.jsxs("svg",{viewBox:"0 0 100 140",className:"w-full h-full overflow-visible",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("style",{children:`
          /* Lunar walk - bouncy, low gravity feel */
          @keyframes lunar-bounce {
            0%, 100% { transform: translateY(0); }
            30% { transform: translateY(-8px); }
            60% { transform: translateY(-3px); }
          }
          @keyframes lunar-leg-left {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            25% { transform: rotate(25deg) translateY(-4px); }
            50% { transform: rotate(0deg) translateY(0); }
            75% { transform: rotate(-20deg) translateY(-2px); }
          }
          @keyframes lunar-leg-right {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            25% { transform: rotate(-20deg) translateY(-2px); }
            50% { transform: rotate(0deg) translateY(0); }
            75% { transform: rotate(25deg) translateY(-4px); }
          }
          @keyframes lunar-arm-left {
            0%, 100% { transform: rotate(10deg); }
            50% { transform: rotate(-15deg); }
          }
          @keyframes lunar-arm-right {
            0%, 100% { transform: rotate(-10deg); }
            50% { transform: rotate(15deg); }
          }
          @keyframes helmet-bob {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            30% { transform: translateY(-3px) rotate(-2deg); }
            60% { transform: translateY(-1px) rotate(1deg); }
          }
          @keyframes visor-glint {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
          }
          @keyframes backpack-sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(2deg); }
          }
          
          .walking .body-main { animation: lunar-bounce 0.8s ease-in-out infinite; }
          .walking .leg-left { animation: lunar-leg-left 0.8s ease-in-out infinite; transform-origin: 40px 85px; }
          .walking .leg-right { animation: lunar-leg-right 0.8s ease-in-out infinite; transform-origin: 60px 85px; }
          .walking .arm-left { animation: lunar-arm-left 0.8s ease-in-out infinite; transform-origin: 35px 55px; }
          .walking .arm-right { animation: lunar-arm-right 0.8s ease-in-out infinite; transform-origin: 65px 55px; }
          .walking .helmet { animation: helmet-bob 0.8s ease-in-out infinite; }
          .walking .backpack { animation: backpack-sway 0.8s ease-in-out infinite; transform-origin: 50px 60px; }
          .walking .visor-glint { animation: visor-glint 0.8s ease-in-out infinite; }
          
          /* Idle breathing animation */
          @keyframes idle-breathe {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.02); }
          }
          .idle .body-main { animation: idle-breathe 3s ease-in-out infinite; transform-origin: 50px 70px; }
        `}),l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:`suitGradient-${u}`,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[l.jsx("stop",{offset:"0%",stopColor:E.suitLight}),l.jsx("stop",{offset:"50%",stopColor:E.suit}),l.jsx("stop",{offset:"100%",stopColor:E.suitDark})]}),l.jsxs("linearGradient",{id:`helmetGradient-${u}`,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[l.jsx("stop",{offset:"0%",stopColor:"#FFFFFF"}),l.jsx("stop",{offset:"40%",stopColor:E.accent}),l.jsx("stop",{offset:"100%",stopColor:"#CCCCCC"})]}),l.jsxs("linearGradient",{id:`visorGradient-${u}`,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[l.jsx("stop",{offset:"0%",stopColor:"#2a3f5f"}),l.jsx("stop",{offset:"50%",stopColor:E.visor}),l.jsx("stop",{offset:"100%",stopColor:"#0d1520"})]}),l.jsxs("radialGradient",{id:`visorReflect-${u}`,cx:"30%",cy:"30%",r:"50%",children:[l.jsx("stop",{offset:"0%",stopColor:"white",stopOpacity:"0.6"}),l.jsx("stop",{offset:"100%",stopColor:"white",stopOpacity:"0"})]}),l.jsx("filter",{id:"shadow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:l.jsx("feDropShadow",{dx:"2",dy:"2",stdDeviation:"2",floodOpacity:"0.3"})})]}),l.jsxs("g",{className:S?"walking":"idle",children:[l.jsxs("g",{className:"arm-left",children:[l.jsx("rect",{x:"22",y:"52",width:"14",height:"22",rx:"7",fill:E.suit,stroke:"#333",strokeWidth:"1.5"}),l.jsx("circle",{cx:"29",cy:"72",r:"5",fill:E.suitDark,stroke:"#333",strokeWidth:"1"}),l.jsx("rect",{x:"24",y:"70",width:"10",height:"18",rx:"5",fill:E.suit,stroke:"#333",strokeWidth:"1.5"}),l.jsx("ellipse",{cx:"29",cy:"90",rx:"7",ry:"6",fill:"#FFF",stroke:"#333",strokeWidth:"1.5"}),l.jsx("path",{d:"M 25 88 Q 29 92 33 88",stroke:"#DDD",strokeWidth:"1",fill:"none"})]}),l.jsxs("g",{className:"leg-left",children:[l.jsx("rect",{x:"32",y:"82",width:"14",height:"24",rx:"5",fill:E.suit,stroke:"#333",strokeWidth:"1.5"}),l.jsx("ellipse",{cx:"39",cy:"104",rx:"6",ry:"5",fill:E.suitDark,stroke:"#333",strokeWidth:"1"}),l.jsx("rect",{x:"33",y:"102",width:"12",height:"22",rx:"4",fill:E.suit,stroke:"#333",strokeWidth:"1.5"}),l.jsx("path",{d:"M 30 122 L 30 132 Q 30 136 34 136 L 48 136 Q 52 136 52 132 L 52 126 L 45 124 L 45 122 Z",fill:E.boots,stroke:"#222",strokeWidth:"1.5"}),l.jsx("rect",{x:"32",y:"134",width:"18",height:"2",fill:"#222"})]}),l.jsxs("g",{className:"body-main",children:[l.jsxs("g",{className:"backpack",children:[l.jsx("rect",{x:"20",y:"48",width:"18",height:"38",rx:"3",fill:E.backpack,stroke:"#666",strokeWidth:"1.5"}),l.jsx("rect",{x:"22",y:"52",width:"14",height:"8",rx:"1",fill:"#CCC",stroke:"#999",strokeWidth:"0.5"}),l.jsx("rect",{x:"22",y:"62",width:"14",height:"3",fill:"#999"}),l.jsx("rect",{x:"22",y:"68",width:"14",height:"3",fill:"#999"}),l.jsx("rect",{x:"22",y:"74",width:"14",height:"3",fill:"#999"}),l.jsx("circle",{cx:"38",cy:"55",r:"3",fill:"#666",stroke:"#444",strokeWidth:"1"}),l.jsx("rect",{x:"24",y:"80",width:"10",height:"4",rx:"1",fill:"#444"})]}),l.jsx("path",{d:"M 35 50 Q 35 45 50 45 Q 65 45 65 50 L 68 85 Q 68 95 50 95 Q 32 95 32 85 Z",fill:`url(#suitGradient-${u})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("rect",{x:"40",y:"55",width:"20",height:"18",rx:"2",fill:"#E8E8E8",stroke:"#666",strokeWidth:"1"}),l.jsx("rect",{x:"42",y:"57",width:"16",height:"3",fill:"#222"}),l.jsx("circle",{cx:"45",cy:"64",r:"2",fill:"#CC0000"}),l.jsx("circle",{cx:"51",cy:"64",r:"2",fill:"#00AA00"}),l.jsx("circle",{cx:"57",cy:"64",r:"2",fill:"#0066CC"}),l.jsx("rect",{x:"42",y:"68",width:"16",height:"2",fill:"#333"}),l.jsx("ellipse",{cx:"50",cy:"45",rx:"12",ry:"4",fill:"#888",stroke:"#666",strokeWidth:"1"}),l.jsxs("g",{className:"helmet",children:[l.jsx("ellipse",{cx:"50",cy:"30",rx:"22",ry:"20",fill:`url(#helmetGradient-${u})`,stroke:"#888",strokeWidth:"2"}),l.jsx("ellipse",{cx:"50",cy:"42",rx:"18",ry:"5",fill:"none",stroke:"#999",strokeWidth:"1.5"}),l.jsx("path",{d:"M 35 25 Q 35 15 50 12 Q 65 15 65 25 Q 65 40 50 44 Q 35 40 35 25 Z",fill:"#333",stroke:"#222",strokeWidth:"1.5"}),l.jsx("path",{d:"M 37 26 Q 37 18 50 15 Q 63 18 63 26 Q 63 38 50 41 Q 37 38 37 26 Z",fill:`url(#visorGradient-${u})`}),l.jsx("path",{d:"M 40 22 Q 42 18 50 17 Q 52 18 52 22",fill:"none",stroke:"white",strokeWidth:"2",strokeLinecap:"round",opacity:"0.5",className:"visor-glint"}),l.jsx("path",{d:"M 35 20 Q 35 12 50 10 Q 56 11 58 14",fill:"none",stroke:"#DAA520",strokeWidth:"2",strokeLinecap:"round",opacity:"0.6"}),l.jsx("rect",{x:"65",y:"25",width:"5",height:"10",rx:"2",fill:"#444",stroke:"#333",strokeWidth:"0.5"}),l.jsx("circle",{cx:"68",cy:"22",r:"2",fill:"#666"})]}),l.jsx("rect",{x:"34",y:"82",width:"32",height:"6",rx:"1",fill:"#666",stroke:"#444",strokeWidth:"1"}),l.jsx("rect",{x:"46",y:"82",width:"8",height:"6",fill:"#888",stroke:"#666",strokeWidth:"0.5"})]}),l.jsxs("g",{className:"leg-right",children:[l.jsx("rect",{x:"54",y:"82",width:"14",height:"24",rx:"5",fill:`url(#suitGradient-${u})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("ellipse",{cx:"61",cy:"104",rx:"6",ry:"5",fill:E.suitDark,stroke:"#333",strokeWidth:"1"}),l.jsx("rect",{x:"55",y:"102",width:"12",height:"22",rx:"4",fill:`url(#suitGradient-${u})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("path",{d:"M 48 122 L 48 132 Q 48 136 52 136 L 66 136 Q 70 136 70 132 L 70 126 L 67 124 L 67 122 Z",fill:E.boots,stroke:"#222",strokeWidth:"1.5"}),l.jsx("rect",{x:"50",y:"134",width:"18",height:"2",fill:"#222"}),l.jsx("rect",{x:"50",y:"128",width:"16",height:"2",fill:"#555"})]}),l.jsxs("g",{className:"arm-right",children:[l.jsx("rect",{x:"64",y:"52",width:"14",height:"22",rx:"7",fill:`url(#suitGradient-${u})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("rect",{x:"66",y:"55",width:"2",height:"16",fill:E.accent}),l.jsx("circle",{cx:"71",cy:"72",r:"5",fill:E.suitDark,stroke:"#333",strokeWidth:"1"}),l.jsx("rect",{x:"66",y:"70",width:"10",height:"18",rx:"5",fill:`url(#suitGradient-${u})`,stroke:"#333",strokeWidth:"1.5"}),l.jsx("ellipse",{cx:"71",cy:"90",rx:"7",ry:"6",fill:"#FFF",stroke:"#333",strokeWidth:"1.5"}),l.jsx("rect",{x:"65",y:"85",width:"12",height:"3",rx:"1",fill:"#888",stroke:"#666",strokeWidth:"0.5"})]})]})]})})},V0=({onNodeClick:y,currentNode:S,completedNodes:_,colorTheme:u,totalNodes:O,challengeCount:E})=>{const A=P.useRef(null),k=u==="orange",M=Array.from({length:O}),[b,B]=P.useState(!1),[D,G]=P.useState(S*220+100),[L,Y]=P.useState(S*220+100),[I,Z]=P.useState(!0),ce=k?"orange":"white",V=k?"#CC5500":"#4D8B8B",J=k?"text-nasa-orange":"text-nasa-teal",$=k?"bg-nasa-orange":"bg-nasa-teal",j=k?"border-nasa-orange":"border-nasa-teal";P.useEffect(()=>{const ee=S*220+100;Y(ee),Z(ee>D),B(!0);const ue=D,Fe=ee-ue,De=Math.abs(Fe)*2,be=Date.now(),Oe=()=>{const ae=Date.now()-be,x=Math.min(ae/De,1),R=1-Math.pow(1-x,3),K=ue+Fe*R;G(K),x<1?requestAnimationFrame(Oe):B(!1)};if(Fe!==0?requestAnimationFrame(Oe):B(!1),A.current){const ae=S*220-window.innerWidth/2+100;A.current.scrollTo({left:ae,behavior:"smooth"})}},[S]);const z=ee=>ee===0?"MISSION BASE":ee===O-1?"EXTRACTION":`CHALLENGE ${ee}`,H=ee=>{if(ee===0)return"Review mission briefing";if(ee===O-1)return"Mission complete";const ue=ee/E;return ue<=.25?"Foundation concepts":ue<=.5?"Building skills":ue<=.75?"Advanced application":"Mission synthesis"},xe=ee=>_.includes(ee)||ee===Math.max(..._)+1||ee<=Math.max(..._);return l.jsxs("div",{ref:A,className:"relative w-full h-screen overflow-x-auto overflow-y-hidden",style:{scrollBehavior:"smooth",background:"linear-gradient(180deg, #0a0a12 0%, #0d0d18 50%, #111118 100%)"},children:[l.jsx("style",{children:`
        @keyframes beacon-pulse {
          0%, 100% { box-shadow: 0 0 10px ${V}40, 0 0 20px ${V}20; }
          50% { box-shadow: 0 0 20px ${V}60, 0 0 40px ${V}30; }
        }
        @keyframes flag-wave {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes dust-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-5px) translateX(3px); opacity: 0.5; }
        }
        @keyframes satellite-orbit {
          0% { transform: translateX(-50px) translateY(0); }
          50% { transform: translateX(50px) translateY(-20px); }
          100% { transform: translateX(-50px) translateY(0); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}),l.jsx("div",{className:"fixed inset-0 pointer-events-none",children:Array.from({length:150}).map((ee,ue)=>l.jsx("div",{className:"absolute rounded-full bg-white",style:{left:`${Math.random()*100}%`,top:`${Math.random()*60}%`,width:`${Math.random()*2+1}px`,height:`${Math.random()*2+1}px`,opacity:Math.random()*.5+.2,animation:`star-twinkle ${3+Math.random()*4}s ease-in-out infinite`,animationDelay:`${Math.random()*5}s`}},ue))}),l.jsx("div",{className:"fixed bottom-[25%] right-[5%] w-48 h-48 rounded-full pointer-events-none opacity-40",style:{background:"radial-gradient(circle at 30% 30%, #4a90d9 0%, #1e3a5f 50%, #0a1628 100%)",boxShadow:"0 0 60px rgba(74, 144, 217, 0.3), inset -20px -20px 60px rgba(0,0,0,0.5)"},children:l.jsx("div",{className:"absolute inset-0 rounded-full opacity-40",style:{background:"radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.3) 0%, transparent 50%)"}})}),l.jsx("div",{className:"fixed top-[15%] right-[20%] pointer-events-none",style:{animation:"satellite-orbit 20s ease-in-out infinite"},children:l.jsx(A0,{size:24,className:"text-[#444]"})}),l.jsxs("div",{className:"absolute bottom-0 left-0 h-[280px] w-[3200px] z-0",children:[l.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-[200px]",style:{background:"linear-gradient(180deg, #2a2a30 0%, #1a1a20 50%, #151518 100%)"}}),l.jsx("div",{className:"absolute bottom-[180px] left-0 right-0 h-[100px]",style:{background:"linear-gradient(180deg, transparent 0%, rgba(77, 139, 139, 0.05) 100%)"}}),l.jsx("div",{className:"absolute bottom-[180px] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#3a3a40] to-transparent"}),[{left:50,size:80,depth:.3},{left:300,size:120,depth:.4},{left:600,size:60,depth:.25},{left:950,size:200,depth:.35},{left:1300,size:90,depth:.3},{left:1600,size:150,depth:.4},{left:2e3,size:70,depth:.25},{left:2300,size:180,depth:.35},{left:2700,size:100,depth:.3}].map((ee,ue)=>l.jsx("div",{className:"absolute rounded-[50%]",style:{left:`${ee.left}px`,bottom:`${20+Math.random()*40}px`,width:`${ee.size}px`,height:`${ee.size*.3}px`,background:`radial-gradient(ellipse at center, rgba(0,0,0,${ee.depth}) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)`}},ue)),Array.from({length:30}).map((ee,ue)=>l.jsx("div",{className:"absolute rounded bg-[#333]",style:{left:`${Math.random()*3e3}px`,bottom:`${180+Math.random()*15}px`,width:`${4+Math.random()*8}px`,height:`${3+Math.random()*5}px`,transform:`rotate(${Math.random()*30-15}deg)`,opacity:.6}},ue)),Array.from({length:15}).map((ee,ue)=>l.jsx("div",{className:"absolute w-1 h-1 rounded-full bg-[#555]",style:{left:`${Math.random()*3e3}px`,bottom:`${200+Math.random()*80}px`,animation:`dust-float ${4+Math.random()*4}s ease-in-out infinite`,animationDelay:`${Math.random()*4}s`}},ue))]}),l.jsxs("div",{className:"absolute bottom-[200px] left-[100px] h-[2px] z-10",style:{width:`${(O-1)*220}px`},children:[l.jsx("div",{className:"w-full h-full bg-gradient-to-r from-transparent via-[#333] to-transparent"}),l.jsx("div",{className:"absolute inset-0",style:{backgroundImage:`repeating-linear-gradient(90deg, ${V}40 0px, ${V}40 20px, transparent 20px, transparent 40px)`}})]}),l.jsx("div",{className:"absolute bottom-[160px] left-0 z-20",style:{width:`${O*220+200}px`},children:M.map((ee,ue)=>{const Fe=ue===0,De=ue===O-1,be=ue===S,Oe=_.includes(ue),ae=xe(ue),x=!Oe&&!be&&!ae,R=ue*220+100;return l.jsxs("button",{onClick:()=>ae&&y(ue),disabled:!ae,className:"absolute transform -translate-x-1/2 group",style:{left:R},children:[l.jsx("div",{className:`absolute left-1/2 -translate-x-1/2 bottom-full h-[30px] w-[2px] ${Oe?$:"bg-[#333]"}`}),l.jsxs("div",{className:`
                relative flex flex-col items-center transition-all duration-300
                ${ae?"cursor-pointer":"cursor-not-allowed"}
                ${be?"scale-110":ae?"hover:scale-105":""}
              `,children:[l.jsxs("div",{className:`
                  absolute bottom-full px-3 py-2 rounded bg-[#111]/95 backdrop-blur
                  border transition-all duration-300 whitespace-nowrap z-40
                  ${be?`${j} border-2 mb-44`:"mb-16 border-[#333]"}
                  ${ae&&!be?"opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0":"opacity-100"}
                  ${x?"opacity-50":""}
                `,children:[l.jsx("div",{className:`font-mono text-xs tracking-wider ${be?J:"text-[#888]"}`,children:z(ue)}),l.jsx("div",{className:"font-mono text-[10px] text-[#555] mt-1",children:H(ue)}),l.jsx("div",{className:`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 
                    border-l-[6px] border-r-[6px] border-t-[6px] 
                    border-l-transparent border-r-transparent 
                    ${be?"border-t-nasa-orange":"border-t-[#333]"}
                  `})]}),l.jsxs("div",{className:`
                  relative w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-300 border-2
                  ${be?`${$} border-white shadow-lg`:""}
                  ${Oe&&!be?`bg-[#1a1a20] ${j}`:""}
                  ${x?"bg-[#151518] border-[#333] opacity-50":""}
                  ${ae&&!Oe&&!be?"bg-[#1a1a20] border-[#444]":""}
                `,style:be?{animation:"beacon-pulse 2s infinite"}:{},children:[l.jsx("div",{className:`
                    absolute inset-2 rounded-full border
                    ${be?"border-white/30":"border-[#333]"}
                  `}),Fe?l.jsx(Pm,{size:24,className:be?"text-white":Oe?J:"text-[#666]"}):De?l.jsx("div",{style:Oe?{animation:"flag-wave 2s ease-in-out infinite"}:{},children:l.jsx(m0,{size:24,className:be?"text-white":Oe?J:"text-[#666]"})}):Oe?l.jsx(Qs,{size:20,className:`${J} fill-current`}):ae?l.jsx("span",{className:`font-display font-bold text-lg ${be?"text-white":"text-[#888]"}`,children:ue}):l.jsx(Gf,{size:18,className:"text-[#444]"})]}),l.jsx("div",{className:`
                  mt-3 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider
                  ${be?`${$} text-white`:""}
                  ${Oe&&!be?`bg-[#222] ${J}`:""}
                  ${x?"bg-[#111] text-[#444]":""}
                  ${ae&&!Oe&&!be?"bg-[#1a1a1a] text-[#666]":""}
                `,children:be?l.jsxs("span",{className:"flex items-center gap-1",children:[l.jsx(Fs,{size:10,className:"animate-pulse"})," Active"]}):Oe?"Complete":ae?"Ready":"Locked"})]})]},ue)})}),l.jsxs("div",{className:"absolute z-30 pointer-events-none",style:{left:D-40,bottom:"220px",transition:"none"},children:[l.jsx("div",{className:`w-20 h-32 ${I?"":"-scale-x-100"}`,children:l.jsx(Q0,{isWalking:b,variant:ce})}),l.jsx("div",{className:"absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black/40 blur-sm"})]}),l.jsx("div",{className:"fixed top-4 left-4 z-50 bg-[#0a0a0a]/90 backdrop-blur border border-[#333] rounded px-4 py-3",children:l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx(Fa,{size:12,className:"text-green-500 animate-pulse"}),l.jsx("span",{className:"font-mono text-xs text-[#666]",children:"EVA ACTIVE"})]}),l.jsx("div",{className:"w-px h-4 bg-[#333]"}),l.jsxs("div",{className:"font-mono text-xs",children:[l.jsx("span",{className:"text-[#666]",children:"PROGRESS: "}),l.jsxs("span",{className:J,children:[Math.max(0,_.length-1),"/",E]})]})]})}),l.jsx("div",{className:"fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0a]/80 backdrop-blur border border-[#333] rounded-full px-4 py-2",children:l.jsx("span",{className:"font-mono text-xs text-[#555]",children:"← Scroll to explore →"})})]})},X0=({initialCode:y,onRun:S})=>{const[_,u]=P.useState(y),[O,E]=P.useState([]),[A,k]=P.useState(null),M=P.useRef(null);P.useEffect(()=>{u(y),E([]),k(null)},[y]);const b=L=>{if(L.key==="Tab"){L.preventDefault();const Y=L.currentTarget.selectionStart,I=L.currentTarget.selectionEnd,Z=_.substring(0,Y)+"    "+_.substring(I);u(Z),setTimeout(()=>{M.current&&(M.current.selectionStart=Y+4,M.current.selectionEnd=Y+4)},0)}else if(L.key==="Enter"){L.preventDefault();const Y=L.currentTarget.selectionStart,I=L.currentTarget.selectionEnd,Z=_.lastIndexOf(`
`,Y-1),ce=Z===-1?0:Z+1,V=_.substring(ce,Y),J=V.match(/^(\s*)/);let $=J?J[1]:"";V.trim().endsWith(":")&&($+="    ");const j=_.substring(0,Y)+`
`+$+_.substring(I);u(j),setTimeout(()=>{M.current&&(M.current.selectionStart=Y+1+$.length,M.current.selectionEnd=Y+1+$.length)},0)}},B=L=>{const Y=L.split(`
`);let I=[],Z=[];const ce=V=>{for(;Z.length>0&&Z[Z.length-1]>V;)Z.pop(),I.push("}")};return Y.forEach(V=>{const J=V.trim();if(!J||J.startsWith("#")){I.push(J.startsWith("#")?`// ${J.substring(1)}`:"");return}const $=V.match(/^(\s*)/),j=$?$[1].length:0;j<(Z.length>0?Z[Z.length-1]:-1)&&ce(j);let z=J;z==="pass"?z="/* pass */ null;":z.startsWith("def ")?(Z.push(j+4),z=z.replace(/def\s+(.+?):/,"function $1 {")):z.startsWith("for ")?(Z.push(j+4),z=z.replace(/for\s+(.+?)\s+in\s+(.+?):/,"for (let $1 of $2) {")):z.startsWith("while ")?(Z.push(j+4),z=z.replace(/while\s+(.+?):/,"while ($1) {")):z.startsWith("if ")?(Z.push(j+4),z=z.replace(/if\s+(.+?):/,"if ($1) {")):z.startsWith("elif ")?(Z.push(j+4),z=z.replace(/elif\s+(.+?):/,"else if ($1) {")):z.startsWith("else:")?(Z.push(j+4),z="else {"):z.startsWith("with ")&&(Z.push(j+4),z=z.replace(/with\s+(.+?)\s+as\s+(.+?):/,"let $2 = $1; {")),z=z.replace(/\bprint\s*\(/g,"mockPrint(").replace(/\binput\s*\(/g,"mockInput(").replace(/\bopen\s*\(/g,"mockOpen(").replace(/\bint\s*\(/g,"parseInt(").replace(/\bfloat\s*\(/g,"parseFloat(").replace(/\bstr\s*\(/g,"String(").replace(/\bTrue\b/g,"true").replace(/\bFalse\b/g,"false").replace(/\bNone\b/g,"null").replace(/\sand\s/g," && ").replace(/\sor\s/g," || ").replace(/\snot\s/g," ! "),I.push(z)}),ce(-1),I.join(`
`)},D=()=>{k(null),E([]);let L="";try{const Y=[],I=(...j)=>Y.push(j.join(" ")),Z=j=>prompt(j||"")||"",ce={"msg.txt":"SOS Signal Detected","data.txt":`Line 1
Line 2
Line 3`,"notes.txt":"Confidential Mission Brief","source.txt":"Backup data content","dirty.txt":"  Clean me please  ","batch.csv":`10
20
30`},V=(j,z="r")=>({read:()=>z==="w"?"":ce[j]||"",write:H=>{if(z==="r"){Y.push(`[Error] Cannot write to read-only file '${j}'`);return}z==="w"?ce[j]=H:z==="a"&&(ce[j]=(ce[j]||"")+H),Y.push(`[FILE ${z.toUpperCase()}] '${j}': ${JSON.stringify(H)}`)},readlines:()=>{const H=ce[j]||"";return H.split(`
`).filter(xe=>xe.length>0).map(xe=>xe+(xe.endsWith(`
`),""))},close:()=>{}}),J=(j,z,H=1)=>{z===void 0&&(z=j,j=0);const xe=[];if(H>0)for(let ee=j;ee<z;ee+=H)xe.push(ee);else for(let ee=j;ee>z;ee+=H)xe.push(ee);return xe};L=B(_),new Function("mockPrint","range","mockInput","mockOpen","parseInt","parseFloat","String",L)(I,J,Z,V,parseInt,parseFloat,String),E(Y),S&&S(Y.join(`
`))}catch(Y){let I=Y.message;Y instanceof SyntaxError&&(I=`Syntax Error: ${Y.message}`),k(I),console.error("Transpilation/Runtime Error:",Y),console.error("Generated JS:",L)}},G=L=>L.split(/((?:#[^\n]*)|(?:"(?:[^"\\]|\\.)*")|(?:'(?:[^'\\]|\\.)*')|(?:\b\d+\b)|(?:\w+)|(?:[^\w\s"']+)|\s+)/g).map((I,Z)=>I?I.startsWith("#")?l.jsx("span",{className:"text-green-600 italic",children:I},Z):I.startsWith('"')||I.startsWith("'")?l.jsx("span",{className:"text-orange-300",children:I},Z):/^\d+$/.test(I)?l.jsx("span",{className:"text-blue-300",children:I},Z):["def","return","pass","if","else","elif","while","for","in","import","from","class","try","except","with","as"].includes(I)?l.jsx("span",{className:"text-pink-500 font-bold",children:I},Z):["print","input","open","int","str","float","bool","len","range"].includes(I)?l.jsx("span",{className:"text-yellow-400",children:I},Z):["True","False","None"].includes(I)?l.jsx("span",{className:"text-purple-400",children:I},Z):/^[^\w\s]+$/.test(I)?l.jsx("span",{className:"text-nasa-grey",children:I},Z):l.jsx("span",{className:"text-gray-200",children:I},Z):null);return l.jsxs("div",{className:"flex flex-col h-full bg-[#1e1e1e] border-l-2 border-nasa-grey/30 font-mono text-sm",children:[l.jsxs("div",{className:"flex items-center justify-between p-2 bg-[#252526] border-b border-nasa-grey/20",children:[l.jsx("div",{className:"flex items-center gap-2",children:l.jsx("div",{className:"text-nasa-grey text-xs tracking-widest uppercase",children:"Mission.py"})}),l.jsxs("div",{className:"flex gap-2",children:[l.jsx("button",{onClick:()=>{E([]),k(null)},className:"p-1 hover:bg-white/10 rounded text-nasa-grey transition-colors",title:"Clear Output",children:l.jsx(L0,{size:16})}),l.jsxs("button",{onClick:D,className:"flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-green-900/50",children:[l.jsx(w0,{size:14,fill:"currentColor"})," Run Code"]})]})]}),l.jsxs("div",{className:"flex-1 relative overflow-hidden group bg-[#1e1e1e]",children:[l.jsx("textarea",{ref:M,value:_,onChange:L=>u(L.target.value),onKeyDown:b,className:"absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none focus:outline-none z-10 font-mono leading-relaxed font-medium",spellCheck:!1,autoCapitalize:"off",autoComplete:"off",autoCorrect:"off"}),l.jsx("pre",{className:"absolute inset-0 w-full h-full p-4 m-0 pointer-events-none font-mono leading-relaxed whitespace-pre-wrap break-words z-0",children:G(_)})]}),l.jsxs("div",{className:"h-1/3 bg-[#0B0D17] border-t border-nasa-grey/30 flex flex-col",children:[l.jsxs("div",{className:"p-2 bg-black/20 border-b border-white/5 flex items-center justify-between",children:[l.jsx("span",{className:"text-xs text-nasa-grey uppercase tracking-widest select-none",children:"/// CONSOLE OUTPUT ///"}),l.jsxs("div",{className:"flex gap-1",children:[l.jsx("div",{className:"w-2 h-2 rounded-full bg-red-500/50"}),l.jsx("div",{className:"w-2 h-2 rounded-full bg-yellow-500/50"}),l.jsx("div",{className:"w-2 h-2 rounded-full bg-green-500/50"})]})]}),l.jsxs("div",{className:"p-4 overflow-y-auto flex-1 font-mono text-sm",children:[A?l.jsx("div",{className:"text-red-400 font-bold bg-red-900/20 p-2 rounded border-l-2 border-red-500 break-all whitespace-pre-wrap",children:A}):O.map((L,Y)=>l.jsxs("div",{className:"text-green-400 mb-1 break-all",children:[l.jsx("span",{className:"text-green-700 mr-2 select-none",children:">"}),L]},Y)),O.length===0&&!A&&l.jsx("div",{className:"text-nasa-grey/30 italic",children:"Ready for input..."})]})]})]})},Z0=[{title:"1. Output: The print() Function",content:`Every space mission needs a way to send messages back to Earth. In Python, the print() function is your communication link to the console.

Whatever you place inside the parentheses will be displayed on screen. Text must be wrapped in quotation marks (single ' or double ").`,codeExample:`# Transmit a message to Mission Control
print("Houston, we have liftoff!")

# You can print numbers directly
print(42)

# Print multiple items separated by commas
print("Altitude:", 10000, "meters")`},{title:"2. Variables: Data Containers",content:`A variable is like a labeled storage container in your spacecraft. It holds a piece of data that you can use and update throughout your mission.

In Python, you create a variable by choosing a name and using the = operator to assign it a value. The value on the RIGHT gets stored in the name on the LEFT.

Variable Naming Rules:
• Use lowercase letters with underscores (snake_case)
• Must start with a letter or underscore
• Cannot use Python keywords (like print, if, for)
• Make names meaningful and descriptive`,codeExample:`# Good variable names (space-themed!)
crew_count = 6
mission_name = "Apollo 11"
fuel_level = 85.5
is_launched = True

# The value can change (that's why it's called "variable")
fuel_level = 80.0  # Fuel decreased after maneuver
print(fuel_level)  # Outputs: 80.0`},{title:"3. Data Types",content:"Every piece of data in Python has a type. The type determines what operations you can perform on it. There are four fundamental types you must know:",tableData:{headers:["Type","Description","Example"],rows:[["int","Whole numbers (positive or negative)","crew = 6"],["float","Decimal numbers","fuel = 85.5"],["str","Text (wrapped in quotes)",'name = "Apollo"'],["bool","True or False values","launched = True"]]},codeExample:`# Integer - for counting things
days_in_orbit = 14

# Float - for precise measurements  
orbital_velocity = 7.67  # km/s

# String - for text data
commander = "Neil Armstrong"

# Boolean - for yes/no states
systems_go = True
abort_initiated = False`},{title:"4. Arithmetic Operators",content:"Python can perform mathematical calculations using arithmetic operators. When you combine numbers with operators, Python evaluates the expression and returns a result.",tableData:{headers:["Operator","Operation","Example","Result"],rows:[["+","Addition","10 + 5","15"],["-","Subtraction","100 - 25","75"],["*","Multiplication","6 * 7","42"],["/","Division (always returns float)","10 / 4","2.5"],["//","Integer Division (floor)","10 // 4","2"],["%","Modulus (remainder)","10 % 3","1"],["**","Exponentiation (power)","2 ** 3","8"]]},codeExample:`# Calculate remaining fuel after burn
fuel_start = 1000  # kg
fuel_used = 150    # kg
fuel_remaining = fuel_start - fuel_used
print(fuel_remaining)  # 850

# Calculate orbital period (simplified)
radius = 6771  # km from Earth's center
velocity = 7.67  # km/s
circumference = 2 * 3.14159 * radius
period_seconds = circumference / velocity
print(period_seconds)  # ~5542 seconds`},{title:"5. Input: Getting Data from the User",content:`The input() function pauses your program and waits for the user to type something. When they press Enter, their text is returned as a string.

IMPORTANT: input() ALWAYS returns a string, even if the user types a number. If you need to do math with the input, you must convert it first.`,codeExample:`# Get the crew member's name
name = input("Enter crew member name: ")
print("Welcome aboard,", name)

# Get a number (must convert from string!)
age_text = input("Enter your age: ")
age = int(age_text)  # Convert string to integer
print("In 10 years you'll be", age + 10)

# Shorthand: convert in one line
altitude = int(input("Current altitude (km): "))
print("Altitude confirmed:", altitude, "km")`},{title:"6. Type Casting: Converting Between Types",content:"Sometimes you need to convert data from one type to another. This is called type casting. Python provides built-in functions for this:",tableData:{headers:["Function","Converts to","Example","Result"],rows:[["int()","Integer",'int("42")',"42"],["float()","Float",'float("3.14")',"3.14"],["str()","String","str(100)",'"100"'],["bool()","Boolean","bool(1)","True"]]},codeExample:`# String to Number (essential for input!)
distance_text = "384400"  # Moon distance in km
distance_km = int(distance_text)
print(distance_km * 2)  # Round trip: 768800

# Number to String (for message building)
speed = 11.2  # km/s escape velocity
message = "Escape velocity: " + str(speed) + " km/s"
print(message)

# Float to Int (removes decimal, doesn't round)
precise_fuel = 75.8
fuel_display = int(precise_fuel)  # 75 (truncated)`}],Yf=[{id:1,title:"First Contact",description:`Your spacecraft has just established communication with Earth. Send your first transmission by printing the message:

"Mission Control, this is Voyager. Communications established."

This is your first step in mastering Python - sending output to the console.`,starterCode:`# MISSION: First Contact
# Establish communication with Earth

def transmit():
    # Use print() to send your message
    pass

# === Mission Control Test ===
transmit()`,hint:'Use print() with the exact message in quotes. Remember: print("your message here")',conceptTags:["print","strings"]},{id:2,title:"Telemetry Log",description:`Mission Control needs you to log your spacecraft's status. Create three variables to store your telemetry data:

1. spacecraft_name → Set to "Voyager-1"
2. crew_count → Set to 4
3. orbit_stable → Set to True

Then print each variable on its own line.`,starterCode:`# MISSION: Telemetry Log
# Record spacecraft status in variables

def log_telemetry():
    # Create your three variables here
    
    # Print each variable
    pass

# === Mission Control Test ===
log_telemetry()`,hint:"Create variables with = assignment. String needs quotes, number doesn't, boolean is True or False (capitalized).",conceptTags:["variables","assignment","data-types"]},{id:3,title:"Mission Data Types",description:`The science team needs various measurements stored correctly. Create these variables with the appropriate data types:

1. mission_day → 47 (integer - we count whole days)
2. fuel_percentage → 68.5 (float - we need precision)
3. destination → "Mars" (string - it's text)
4. thrusters_active → False (boolean - they're currently off)

Print each variable with a label, like: "Mission Day: 47"`,starterCode:`# MISSION: Data Type Precision
# Store mission data with correct types

def record_mission_data():
    # Create four variables with correct types
    
    # Print each with a label
    pass

# === Mission Control Test ===
record_mission_data()`,hint:'Integers have no decimal, floats do. Strings use quotes. Booleans are True or False (capitalized!). Use print("Label:", variable)',conceptTags:["int","float","str","bool","data-types"]},{id:4,title:"Fuel Calculation",description:`Your spacecraft started with 2500 kg of fuel. After the launch sequence, you used 450 kg. After the orbital insertion burn, you used another 380 kg.

Calculate:
1. Create a variable for starting fuel (2500)
2. Create variables for each burn amount
3. Calculate the remaining fuel
4. Print the result: "Remaining fuel: X kg"`,starterCode:`# MISSION: Fuel Calculation
# Calculate remaining propellant

def calculate_fuel():
    # Starting fuel
    
    # Burns
    
    # Calculate remaining
    
    # Print result
    pass

# === Mission Control Test ===
calculate_fuel()`,hint:"Use subtraction: remaining = start - burn1 - burn2. Remember to print the result!",conceptTags:["variables","arithmetic","subtraction"]},{id:5,title:"Type Conversion",description:`Incoming telemetry arrives as text data that needs processing. You've received:

- distance_data = "384400" (Moon distance in km)
- speed_data = "1.02" (km/s)

Convert these strings to numbers (int and float), then:
1. Calculate the travel time in seconds (distance / speed)
2. Print: "Travel time: X seconds"

Remember: You cannot do math on strings!`,starterCode:`# MISSION: Telemetry Processing
# Convert and calculate incoming data

def process_telemetry():
    # Incoming data (as strings)
    distance_data = "384400"
    speed_data = "1.02"
    
    # Convert to numbers
    
    # Calculate travel time
    
    # Print result
    pass

# === Mission Control Test ===
process_telemetry()`,hint:"Use int() for whole numbers and float() for decimals. Then divide: time = distance / speed",conceptTags:["type-casting","int","float","division"]},{id:6,title:"Crew Input",description:`Mission Control needs to register a new crew member. Your program should:

1. Ask for the crew member's name using input()
2. Ask for their role (pilot, engineer, scientist, etc.)
3. Print a welcome message:
   "Welcome aboard, [NAME]! Your role: [ROLE]"

Test your program by running it and entering sample data.`,starterCode:`# MISSION: Crew Registration
# Register a new crew member

def register_crew():
    # Get crew member's name
    
    # Get their role
    
    # Print welcome message
    pass

# === Mission Control Test ===
register_crew()`,hint:'Use input("prompt: ") to get user input. Store each in a variable, then print them together.',conceptTags:["input","strings","print"]},{id:7,title:"Launch Calculation",description:`Calculate the launch window parameters. The user needs to input:

1. Payload mass (in kg) - get this as an integer
2. Fuel efficiency (km per kg) - get this as a float

Calculate and print:
- Maximum range = payload_mass × fuel_efficiency
- Display: "Maximum range: X km"

Remember: input() returns strings, so you must convert!`,starterCode:`# MISSION: Launch Parameters
# Calculate maximum range from user input

def calculate_launch():
    # Get payload mass (as integer)
    
    # Get fuel efficiency (as float)
    
    # Calculate maximum range
    
    # Print the result
    pass

# === Mission Control Test ===
calculate_launch()`,hint:"Use int(input(...)) for the integer and float(input(...)) for the decimal. Then multiply them together.",conceptTags:["input","type-casting","arithmetic","multiplication"]},{id:8,title:"Mission Report",description:`Generate a complete mission status report. Your program should:

1. Ask for the mission name (string)
2. Ask for days in flight (integer)
3. Ask for distance traveled in km (float)

Calculate:
- Average speed = distance / days / 24 (km per hour)

Print a formatted report:
"=== MISSION REPORT ==="
"Mission: [name]"
"Days in flight: [days]"
"Distance: [distance] km"
"Average speed: [speed] km/h"
"======================"

This challenge combines ALL concepts from this level!`,starterCode:`# MISSION: Complete Status Report
# Generate comprehensive mission report

def generate_report():
    # Gather mission data
    
    # Calculate average speed (km per hour)
    # Remember: hours = days × 24
    
    # Print formatted report
    pass

# === Mission Control Test ===
generate_report()`,hint:"Get inputs with proper type conversion. Calculate hours first (days * 24), then speed = distance / hours. Use multiple print() statements for the report.",conceptTags:["input","type-casting","arithmetic","print","synthesis"]}],K0=[{title:"1. Sequential Execution",content:`In Python, code runs from top to bottom, one line at a time. This is called sequential execution. Like a mission checklist, each step must complete before moving to the next.

The order of your statements matters! If you try to use a variable before creating it, Python will raise an error.`,codeExample:`# Mission checklist - runs top to bottom
fuel_level = 100
print("Fuel loaded:", fuel_level)

altitude = 0
print("Current altitude:", altitude)

mission_status = "Ready"
print("Status:", mission_status)

# Each line executes in order:
# 1. fuel_level created
# 2. fuel printed
# 3. altitude created
# 4. altitude printed
# 5. status created
# 6. status printed`},{title:"2. Comparison Operators",content:"Comparison operators compare two values and return a Boolean result (True or False). These are essential for making decisions in your code.",tableData:{headers:["Operator","Meaning","Example","Result"],rows:[["==","Equal to","5 == 5","True"],["!=","Not equal to","5 != 3","True"],[">","Greater than","10 > 5","True"],["<","Less than","3 < 8","True"],[">=","Greater than or equal","5 >= 5","True"],["<=","Less than or equal","4 <= 7","True"]]},codeExample:`# Checking spacecraft conditions
altitude = 400  # km above Earth
target = 400

print(altitude == target)   # True - at target altitude
print(altitude > 350)       # True - above minimum
print(altitude < 500)       # True - below maximum

fuel = 75.5
minimum_fuel = 80.0
print(fuel >= minimum_fuel)  # False - need more fuel!`},{title:"3. The if Statement",content:`The if statement lets your program make decisions. If the condition is True, the indented code runs. If False, it's skipped entirely.

CRITICAL: Python uses indentation (4 spaces) to show which code belongs to the if statement. Everything indented after the if runs only when the condition is True.`,codeExample:`# Basic if statement structure
fuel_level = 95

if fuel_level >= 90:
    print("GO for launch!")
    print("Fuel systems nominal")

# This always runs (not indented)
print("Checklist complete")

# With a False condition
altitude = 50
if altitude >= 100:
    print("This won't print - condition is False")

print("Mission continues regardless")`},{title:"4. if-else: Two-Way Decisions",content:`When you need to do one thing if True and another thing if False, use if-else. Exactly ONE branch will execute - never both, never neither.

Think of it as: "If this condition is true, do A. Otherwise, do B."`,codeExample:`# Go/No-Go decision
fuel_level = 75

if fuel_level >= 90:
    print("GO - Fuel nominal")
    status = "LAUNCH"
else:
    print("NO-GO - Insufficient fuel")
    status = "HOLD"

print("Final status:", status)

# Temperature check
temp = -40  # Celsius
if temp > -50:
    print("Temperature within limits")
else:
    print("WARNING: Too cold for launch")`},{title:"5. if-elif-else: Multiple Conditions",content:`When you have more than two possibilities, use elif (short for "else if"). Python checks each condition in order and runs the FIRST one that's True.

The else at the end catches anything that didn't match above - it's optional but often useful as a "default" case.`,codeExample:`# Mission phase based on altitude
altitude = 150

if altitude == 0:
    phase = "Pre-launch"
elif altitude < 100:
    phase = "Initial ascent"
elif altitude < 400:
    phase = "Climbing to orbit"
elif altitude < 500:
    phase = "Orbital insertion"
else:
    phase = "Deep space"

print("Current phase:", phase)
# Output: "Current phase: Climbing to orbit"

# Only ONE branch runs, even if multiple could be True`},{title:"6. Logical Operators: and, or, not",content:"Combine multiple conditions using logical operators. This lets you make complex decisions based on several factors at once.",tableData:{headers:["Operator","Result is True when...","Example"],rows:[["and","BOTH conditions are True","fuel > 90 and temp > -50"],["or","AT LEAST ONE is True","fuel < 10 or engine_fail"],["not","The condition is False","not is_aborted"]]},codeExample:`# Launch requires multiple conditions
fuel = 95
systems_ready = True
weather_clear = True

# All must be True
if fuel >= 90 and systems_ready and weather_clear:
    print("All systems GO!")

# Emergency: any ONE triggers abort
engine_alarm = False
fire_detected = False
hull_breach = True

if engine_alarm or fire_detected or hull_breach:
    print("ABORT! Emergency detected")

# Inverting a condition
is_aborted = False
if not is_aborted:
    print("Mission is still active")`},{title:"7. Nested Conditionals",content:`You can put if statements inside other if statements. This creates a hierarchy of decisions - the inner conditions only check if the outer condition was True.

Use nested conditionals when decisions depend on previous decisions. But don't nest too deep (2-3 levels max) or code becomes hard to read.`,codeExample:`# Launch decision tree
fuel_level = 95
crew_ready = True
weather = "clear"

if fuel_level >= 90:
    print("Fuel: GO")
    if crew_ready:
        print("Crew: GO")
        if weather == "clear":
            print("Weather: GO")
            print(">>> LAUNCH AUTHORIZED <<<")
        else:
            print("Weather: NO-GO - Holding for conditions")
    else:
        print("Crew: NO-GO - Awaiting crew status")
else:
    print("Fuel: NO-GO - Cannot proceed")

# Alternative: combine with 'and' for simpler code
if fuel_level >= 90 and crew_ready and weather == "clear":
    print("All conditions met - LAUNCH!")`}],Ff=[{id:1,title:"Go/No-Go",description:`Before launch, Mission Control performs a Go/No-Go check. Your task:

1. A variable fuel_level is set to 95
2. If fuel_level is greater than or equal to 90, print "GO for launch!"
3. If not, print nothing (the code simply doesn't execute)

This is your first branching decision - the code only runs IF the condition is met.`,starterCode:`# MISSION: Go/No-Go Decision
# Check if we're cleared for launch

def go_no_go():
    fuel_level = 95
    
    # Check if fuel is sufficient (>= 90)
    # If so, print "GO for launch!"
    pass

# === Mission Control Test ===
go_no_go()`,hint:"Use if fuel_level >= 90: followed by an indented print statement. Remember the colon after the condition!",conceptTags:["if","comparison",">="]},{id:2,title:"Altitude Check",description:`The navigation computer needs to compare the current altitude with the target.

Given:
- current_altitude = 380
- target_altitude = 400

Print the results of these comparisons:
1. "At target: " followed by whether current equals target (True/False)
2. "Above minimum (350): " followed by the comparison result
3. "Below maximum (450): " followed by the comparison result

Use the comparison operators ==, >, and < to get Boolean results.`,starterCode:`# MISSION: Altitude Check
# Verify orbital position

def check_altitude():
    current_altitude = 380
    target_altitude = 400
    
    # Print three comparison results
    # 1. At target (==)
    # 2. Above minimum 350 (>)
    # 3. Below maximum 450 (<)
    pass

# === Mission Control Test ===
check_altitude()`,hint:'Comparisons return True or False directly. print("At target:", current_altitude == target_altitude)',conceptTags:["comparison","==",">","<","bool"]},{id:3,title:"System Status",description:`The spacecraft's power system needs a status report based on battery level.

Given battery_level = 45 (percent):
- If battery_level >= 50, print "Power: NOMINAL"
- Otherwise, print "Power: LOW - Conserve energy"

The computer must choose ONE of these two messages - never both.`,starterCode:`# MISSION: System Status
# Report power system status

def check_power():
    battery_level = 45
    
    # Check battery and print appropriate status
    # >= 50: "Power: NOMINAL"
    # else: "Power: LOW - Conserve energy"
    pass

# === Mission Control Test ===
check_power()`,hint:"Use if-else structure. The else branch runs when the if condition is False.",conceptTags:["if","else",">=","branching"]},{id:4,title:"Launch Window",description:`The launch window calculator determines mission phase based on countdown time.

Given countdown = 45 (seconds), determine the phase:
- countdown > 60: print "Phase: HOLDING"
- countdown > 30: print "Phase: FINAL CHECKS"  
- countdown > 10: print "Phase: TERMINAL COUNT"
- countdown > 0: print "Phase: IGNITION SEQUENCE"
- countdown <= 0: print "Phase: LIFTOFF!"

Only ONE phase should print based on where countdown falls.`,starterCode:`# MISSION: Launch Window
# Determine current launch phase

def launch_phase():
    countdown = 45
    
    # Use if-elif-else to determine phase
    # Check conditions from highest to lowest
    pass

# === Mission Control Test ===
launch_phase()`,hint:"Use if-elif-elif-elif-else chain. Check countdown > 60 first, then > 30, etc. Order matters!",conceptTags:["if","elif","else","chain"]},{id:5,title:"Multi-Condition Check",description:`Launch authorization requires ALL systems to be ready:

Given:
- fuel_status = True
- navigation_status = True  
- life_support_status = False

1. If ALL THREE are True, print "LAUNCH AUTHORIZED"
2. Otherwise, print "LAUNCH HOLD - Systems not ready"

Use the 'and' operator to check multiple conditions at once.`,starterCode:`# MISSION: Multi-System Check
# Verify all systems before launch

def systems_check():
    fuel_status = True
    navigation_status = True
    life_support_status = False
    
    # Check if ALL systems are True using 'and'
    # Print appropriate message
    pass

# === Mission Control Test ===
systems_check()`,hint:"Use: if fuel_status and navigation_status and life_support_status: to check all three. All must be True for the condition to pass.",conceptTags:["and","logical","bool","multiple conditions"]},{id:6,title:"Safety Protocol",description:`Implement a nested safety check system:

Given:
- primary_power = True
- backup_power = True
- hull_integrity = 98 (percent)

The check works like this:
1. First check if primary_power is True
   - If True: print "Primary power: ONLINE"
   - Then check if backup_power is True
     - If True: print "Backup power: STANDBY"
     - Then check if hull_integrity >= 95
       - If True: print "Hull integrity: NOMINAL"
         print ">>> ALL SYSTEMS GO <<<"
       - Else: print "Hull integrity: COMPROMISED"
2. If primary_power is False: print "CRITICAL: No primary power"`,starterCode:`# MISSION: Safety Protocol
# Nested system verification

def safety_check():
    primary_power = True
    backup_power = True
    hull_integrity = 98
    
    # Implement nested conditionals
    # Check primary -> backup -> hull
    pass

# === Mission Control Test ===
safety_check()`,hint:"Indent each nested if inside the previous one. The inner checks only run if outer checks pass.",conceptTags:["nested","if","indentation","hierarchy"]},{id:7,title:"Flight Director",description:`You are the Flight Director making the final launch decision. Gather all inputs and make the call.

Your program should:
1. Get fuel_level from user input (as integer)
2. Get weather_status from user input (string: "clear" or "stormy")
3. Get crew_count from user input (as integer)

Make the decision:
- If fuel >= 90 AND weather is "clear" AND crew_count >= 3:
  Print "FLIGHT DIRECTOR: GO FOR LAUNCH!"
- Else if fuel < 90:
  Print "HOLD: Insufficient fuel"
- Else if weather != "clear":
  Print "HOLD: Weather conditions"
- Else:
  Print "HOLD: Insufficient crew"

This combines ALL concepts from this level!`,starterCode:`# MISSION: Flight Director Decision
# The final launch authority

def flight_director():
    # Get inputs (remember type casting!)
    fuel_level = int(input("Enter fuel level (%): "))
    weather_status = input("Enter weather status: ")
    crew_count = int(input("Enter crew count: "))
    
    # Make the launch decision
    # Check all conditions and report status
    pass

# === Mission Control Test ===
flight_director()`,hint:`Use combined conditions with 'and' for the GO case. Then use elif to check each individual failure reason. Remember: weather comparison is weather_status == "clear"`,conceptTags:["synthesis","and","if-elif-else","input","type-casting"]}],$0=[{title:"1. Counted Loops: for with range()",content:`When you know exactly how many times you want to repeat something, use a for loop with range(). The loop variable takes each value in turn.

range(n) produces numbers from 0 up to (but not including) n.
range(5) -> 0, 1, 2, 3, 4 (five numbers, but stops before 5)`,codeExample:`# Count down from 5 to 1
for i in range(5, 0, -1):
    print(i)
print("LIFTOFF!")

# Simple repeat (0 to 4)
for orbit in range(5):
    print("Completing orbit", orbit + 1)

# Output:
# Completing orbit 1
# Completing orbit 2
# ... etc`},{title:"2. range(start, stop, step)",content:"The range() function can take up to three arguments to control exactly which numbers are generated.",tableData:{headers:["Syntax","Produces","Example Output"],rows:[["range(5)","0, 1, 2, 3, 4","0 to 4"],["range(1, 6)","1, 2, 3, 4, 5","1 to 5"],["range(0, 10, 2)","0, 2, 4, 6, 8","Evens"],["range(10, 0, -1)","10, 9, 8...1","Countdown"],["range(5, 0, -1)","5, 4, 3, 2, 1","5 to 1"]]},codeExample:`# Mission day counter (days 1-7)
for day in range(1, 8):
    print(f"Mission Day {day}")

# Check systems every 10 minutes (0, 10, 20...60)
for minute in range(0, 61, 10):
    print(f"System check at T+{minute} minutes")

# Countdown sequence
for t in range(10, 0, -1):
    print(t)
print("IGNITION!")`},{title:"3. for char in string",content:`You can loop through each character in a string directly. This is useful for processing text data character by character - like decoding transmissions!

The loop variable takes each character in turn, from first to last.`,codeExample:`# Spell out a message
callsign = "APOLLO"
for letter in callsign:
    print(letter)
# Output: A P O L L O (each on new line)

# Process each character
transmission = "SOS"
for char in transmission:
    print(f"Received character: {char}")

# Count specific characters
code = "AABBBCCCC"
count_b = 0
for char in code:
    if char == "B":
        count_b += 1
print(f"Found {count_b} B's")`},{title:"4. Conditional Loops: while",content:`A while loop repeats AS LONG AS its condition is True. Use while when you don't know how many iterations you'll need.

DANGER: If the condition never becomes False, you create an infinite loop! Always ensure something changes inside the loop to eventually make the condition False.`,codeExample:`# Fuel burn simulation
fuel = 100
while fuel > 0:
    print(f"Fuel remaining: {fuel}%")
    fuel -= 10  # Burn 10% each cycle

print("Fuel depleted!")

# Countdown with while
countdown = 5
while countdown > 0:
    print(countdown)
    countdown -= 1  # CRITICAL: must decrease!
print("LAUNCH!")

# Waiting for signal
signal_strength = 0
while signal_strength < 80:
    signal_strength += 15  # Signal improving
    print(f"Signal: {signal_strength}%")
print("Signal acquired!")`},{title:"5. while with and/or",content:`You can combine conditions in while loops just like in if statements. This lets you continue looping until multiple requirements are met.

Common patterns:
- while A and B: Continue while BOTH are true
- while A or B: Continue while EITHER is true`,codeExample:`# Continue while fuel available AND not at destination
fuel = 100
distance = 50

while fuel > 0 and distance > 0:
    print(f"Fuel: {fuel}, Distance: {distance}")
    fuel -= 10
    distance -= 10
    
if fuel <= 0:
    print("Ran out of fuel!")
elif distance <= 0:
    print("Destination reached!")

# Stop when ANY emergency occurs (using or)
fuel = 100
hull_ok = True
cycles = 0

while fuel > 20 and hull_ok and cycles < 5:
    cycles += 1
    fuel -= 15
    print(f"Cycle {cycles}: Fuel={fuel}")

print("Loop ended - check which condition failed")`},{title:"6. break: Exit Loop Early",content:`The break statement immediately exits the current loop, skipping any remaining iterations. Use it when you find what you're looking for or detect an emergency.

break only exits the innermost loop if you have nested loops.`,codeExample:`# Search for a specific signal
signals = [45, 62, 78, 95, 83, 91]

for signal in signals:
    print(f"Checking signal: {signal}")
    if signal >= 90:
        print(f"Strong signal found: {signal}")
        break  # Stop searching

print("Search complete")

# Emergency abort in while loop
fuel = 100
while fuel > 0:
    fuel -= 10
    print(f"Fuel: {fuel}")
    
    if fuel == 50:
        print("ABORT: Mid-mission emergency!")
        break

print(f"Final fuel: {fuel}")`},{title:"7. continue: Skip to Next Iteration",content:"The continue statement skips the rest of the current iteration and jumps to the next one. Use it to skip invalid data or unwanted values.",codeExample:`# Skip offline sensors (marked as -1)
readings = [23, -1, 45, -1, 67, 89, -1]

for reading in readings:
    if reading == -1:
        print("Sensor offline, skipping...")
        continue  # Skip to next reading
    
    print(f"Processing reading: {reading}")

# Skip even-numbered systems (check odds only)
for system_id in range(1, 10):
    if system_id % 2 == 0:
        continue  # Skip evens
    print(f"Checking system {system_id}")`},{title:"8. Accumulator Pattern (Running Totals)",content:`An accumulator is a variable that collects values as a loop runs. You initialize it before the loop, add to it inside the loop, and use the final value after.

Pattern:
1. total = 0 (initialize)
2. Loop: total += value (accumulate)
3. After loop: use total`,codeExample:`# Total fuel consumption
burns = [45, 32, 28, 51, 39]
total_fuel = 0

for burn in burns:
    total_fuel += burn
    print(f"Burn: {burn}, Running total: {total_fuel}")

print(f"Total fuel used: {total_fuel} kg")

# Calculate average
readings = [23, 45, 67, 34, 56]
total = 0
for reading in readings:
    total += reading

average = total / len(readings)
print(f"Average reading: {average}")`},{title:"9. Counter Pattern",content:"A counter tracks how many times something happens. Similar to an accumulator, but you increment by 1 each time a condition is met.",codeExample:`# Count successful transmissions
signals = [85, 92, 45, 78, 95, 88, 72]
successful = 0

for signal in signals:
    if signal >= 80:
        successful += 1
        print(f"Signal {signal}: SUCCESS")
    else:
        print(f"Signal {signal}: FAILED")

print(f"Successful: {successful} out of {len(signals)}")

# Count occurrences of a character
message = "MAYDAY MAYDAY MAYDAY"
count_a = 0
for char in message:
    if char == "A":
        count_a += 1

print(f"Letter A appears {count_a} times")`}],If=[{id:1,title:"Countdown Sequence",description:`Create the classic launch countdown!

Use a for loop with range() to:
1. Print numbers from 10 down to 1 (each on its own line)
2. After the loop, print "LIFTOFF!"

Hint: range() can count backwards with a negative step.`,starterCode:`# MISSION: Countdown Sequence
# The classic T-minus countdown

def countdown():
    # Use range(10, 0, -1) to count from 10 to 1
    # Then print "LIFTOFF!"
    pass

# === Mission Control Test ===
countdown()`,hint:"range(10, 0, -1) gives you 10, 9, 8... down to 1. The -1 is the step.",conceptTags:["for","range","step"]},{id:2,title:"Orbit Counter",description:`The spacecraft needs to complete 5 orbits. For each orbit, report the status.

Use a for loop to print:
"Orbit 1 complete"
"Orbit 2 complete"
...
"Orbit 5 complete"

After all orbits, print: "Orbital phase complete"

Note: range() starts at 0, so you'll need to adjust!`,starterCode:`# MISSION: Orbit Counter
# Track orbital progress

def count_orbits():
    # Complete 5 orbits
    # Print "Orbit X complete" for each
    # End with "Orbital phase complete"
    pass

# === Mission Control Test ===
count_orbits()`,hint:"Use range(1, 6) to get 1,2,3,4,5, or use range(5) and add 1 when printing.",conceptTags:["for","range","counting"]},{id:3,title:"Signal Scanner",description:`Scan through a callsign letter by letter.

Given callsign = "HOUSTON", use a for loop to iterate through each character and print:
"Receiving: H"
"Receiving: O"
... etc

This demonstrates iterating through a string directly.`,starterCode:`# MISSION: Signal Scanner
# Process incoming transmission

def scan_signal():
    callsign = "HOUSTON"
    
    # Loop through each character
    # Print "Receiving: X" for each letter
    pass

# === Mission Control Test ===
scan_signal()`,hint:"Use: for char in callsign: - the variable char takes each letter in turn.",conceptTags:["for","string iteration","char"]},{id:4,title:"Fuel Monitor",description:`Monitor fuel levels during a burn sequence using a while loop.

Start with fuel = 100. Each cycle:
1. Print "Fuel level: X%"
2. Reduce fuel by 15

Continue WHILE fuel is greater than 20.
After the loop, print "Burn complete. Remaining: X%"`,starterCode:`# MISSION: Fuel Monitor
# Track fuel during burn

def fuel_monitor():
    fuel = 100
    
    # While fuel > 20:
    #   Print current level
    #   Reduce by 15
    # After loop: print remaining
    pass

# === Mission Control Test ===
fuel_monitor()`,hint:"Use while fuel > 20: and don't forget to decrease fuel inside the loop (fuel -= 15) or it runs forever!",conceptTags:["while","decrement","condition"]},{id:5,title:"Dual Condition Loop",description:`The spacecraft travels toward a target while managing fuel.

Given:
- fuel = 100
- distance = 80

Each cycle:
1. Print "Fuel: X, Distance: Y"
2. Decrease fuel by 20
3. Decrease distance by 20

Continue WHILE fuel > 0 AND distance > 0.

After, print which ran out first (or if target reached).`,starterCode:`# MISSION: Journey Monitor
# Track fuel AND distance

def journey_monitor():
    fuel = 100
    distance = 80
    
    # Loop while BOTH conditions true
    # Print status each cycle
    # Decrease both values
    # Report what ended the journey
    pass

# === Mission Control Test ===
journey_monitor()`,hint:"Use: while fuel > 0 and distance > 0: - both must be True to continue. After the loop, check which one caused the exit.",conceptTags:["while","and","multiple conditions"]},{id:6,title:"Abort Search",description:`Search through sensor data to find a critical reading.

Given readings = [45, 62, 38, 91, 55, 88]:
- Loop through each reading
- Print "Checking: X"
- If reading >= 90, print "CRITICAL READING FOUND: X" and STOP searching
- If no critical found, print "All readings normal"

Use break to exit early when found!`,starterCode:`# MISSION: Critical Reading Search
# Find and report critical values

def search_readings():
    readings = [45, 62, 38, 91, 55, 88]
    found = False
    
    # Loop through readings
    # Use break when critical found
    # Track if found with the boolean
    pass

# === Mission Control Test ===
search_readings()`,hint:"Use a boolean variable 'found' to track whether you found one. Set it True and break when reading >= 90.",conceptTags:["for","break","search","flag"]},{id:7,title:"Skip Offline Sensors",description:`Process sensor data, but skip offline sensors (marked as -1).

Given data = [23, -1, 45, -1, -1, 67, 89]:
- Loop through each value
- If value is -1, print "Sensor offline - skipping" and continue to next
- Otherwise, print "Processing: X"

Use continue to skip the bad readings.`,starterCode:`# MISSION: Data Processing
# Skip invalid sensor readings

def process_sensors():
    data = [23, -1, 45, -1, -1, 67, 89]
    
    # Loop through data
    # Use continue to skip -1 values
    # Process valid readings
    pass

# === Mission Control Test ===
process_sensors()`,hint:"Use: if value == -1: followed by print message and continue. The continue skips to the next iteration.",conceptTags:["for","continue","skip","validation"]},{id:8,title:"Fuel Total",description:`Calculate total fuel consumption from multiple burns.

Given burns = [45, 32, 28, 51, 39]:
1. Create a total variable starting at 0
2. Loop through each burn amount
3. Add each burn to the total
4. After each addition, print "Burn: X, Running total: Y"
5. After loop, print "Total fuel used: Z kg"`,starterCode:`# MISSION: Fuel Accounting
# Calculate total fuel consumption

def fuel_total():
    burns = [45, 32, 28, 51, 39]
    total = 0
    
    # Accumulate all burn values
    # Show running total after each
    # Print final total
    pass

# === Mission Control Test ===
fuel_total()`,hint:"Use the accumulator pattern: total = 0 before loop, total += burn inside loop.",conceptTags:["accumulator","total","for"]},{id:9,title:"Success Counter",description:`Count how many transmissions were successful.

Given signals = [85, 92, 45, 78, 95, 88, 72]:
- A signal >= 80 is successful
- Count the successful signals
- Print each signal with "SUCCESS" or "FAILED"
- At end, print "Successful: X out of Y"

Use the counter pattern!`,starterCode:`# MISSION: Transmission Report
# Count successful signals

def count_success():
    signals = [85, 92, 45, 78, 95, 88, 72]
    successful = 0
    
    # Check each signal
    # Increment counter for successes
    # Print summary at end
    pass

# === Mission Control Test ===
count_success()`,hint:"Counter pattern: successful = 0 before loop, if signal >= 80: successful += 1 inside loop.",conceptTags:["counter","if","for"]},{id:10,title:"Mission Simulation",description:`Run a complete mission simulation combining all loop concepts!

Get these inputs from the user:
- starting_fuel (integer)
- burn_rate (integer) 
- target_distance (integer)

Simulation rules:
- Each cycle: fuel decreases by burn_rate, distance decreases by 10
- Print status each cycle: "Cycle X: Fuel=Y, Distance=Z"
- Continue while fuel > 0 AND distance > 0
- Count total cycles completed

After simulation, print:
- "Mission complete!" if distance reached 0
- "Mission failed - out of fuel" if fuel ran out
- "Cycles completed: X"`,starterCode:`# MISSION: Full Simulation
# Complete mission with all loop concepts

def mission_sim():
    # Get inputs
    starting_fuel = int(input("Starting fuel: "))
    burn_rate = int(input("Burn rate per cycle: "))
    target_distance = int(input("Target distance: "))
    
    fuel = starting_fuel
    distance = target_distance
    cycles = 0
    
    # Run simulation loop
    # Use while with multiple conditions
    # Count cycles
    # Report outcome
    pass

# === Mission Control Test ===
mission_sim()`,hint:"Combine: while loop with and, counter for cycles, accumulator concepts. Check which condition caused exit.",conceptTags:["synthesis","while","counter","multiple conditions","input"]}],W0=[{title:"1. String Indexing",content:`Every character in a string has a position called an index. Python uses zero-based indexing, meaning the first character is at position 0.

You can also use negative indices to count from the end: -1 is the last character, -2 is second-to-last, etc.`,tableData:{headers:["String","Index 0","Index 1","Index 2","Index -1","Index -2"],rows:[["'APOLLO'","A","P","O","O","L"],["'NASA'","N","A","S","A","S"]]},codeExample:`callsign = "APOLLO"

# Positive indexing (from start)
print(callsign[0])   # A (first)
print(callsign[1])   # P (second)
print(callsign[5])   # O (sixth/last)

# Negative indexing (from end)
print(callsign[-1])  # O (last)
print(callsign[-2])  # L (second-to-last)

# Getting length
print(len(callsign))  # 6`},{title:"2. String Slicing",content:`Slicing extracts a portion of a string. The syntax is string[start:end] where:
- start: index where slice begins (inclusive)
- end: index where slice ends (exclusive - not included!)

If you omit start, it defaults to 0. If you omit end, it goes to the end of the string.`,codeExample:`mission = "APOLLO-11"

# Basic slicing [start:end]
print(mission[0:6])   # "APOLLO" (indices 0,1,2,3,4,5)
print(mission[7:9])   # "11" (indices 7,8)

# Omitting start or end
print(mission[:6])    # "APOLLO" (from beginning)
print(mission[7:])    # "11" (to end)
print(mission[:])     # "APOLLO-11" (full copy)

# With negative indices
print(mission[-2:])   # "11" (last 2 chars)
print(mission[:-3])   # "APOLLO" (all but last 3)`},{title:"3. String Concatenation",content:"Concatenation means joining strings together. Use the + operator to combine strings. Remember: you can only concatenate strings with strings - numbers must be converted first!",codeExample:`# Basic concatenation
prefix = "Mission: "
name = "Apollo"
number = "11"
full = prefix + name + "-" + number
print(full)  # "Mission: Apollo-11"

# Building messages
crew = "Armstrong"
role = "Commander"
message = crew + " is the " + role
print(message)

# With numbers (must convert!)
altitude = 400
status = "Altitude: " + str(altitude) + " km"
print(status)

# Accumulating in loops
result = ""
for char in "NASA":
    result += char + "-"
print(result)  # "N-A-S-A-"`},{title:"4. Iterating Through Strings",content:`Strings are sequences, so you can loop through them character by character. This is essential for processing text data.

Two approaches:
1. By character: for char in string
2. By index: for i in range(len(string))`,codeExample:`transmission = "SOS"

# Method 1: By character (simpler)
for char in transmission:
    print(f"Received: {char}")

# Method 2: By index (when you need position)
for i in range(len(transmission)):
    print(f"Position {i}: {transmission[i]}")

# Processing each character
code = "ABC123"
letters = ""
numbers = ""
for char in code:
    if char.isalpha():
        letters += char
    else:
        numbers += char
print(letters, numbers)  # "ABC" "123"`},{title:"5. Useful String Methods",content:"Python strings have built-in methods for common operations. Methods are called with dot notation: string.method()",tableData:{headers:["Method","Purpose","Example","Result"],rows:[[".upper()","Convert to uppercase","'apollo'.upper()","'APOLLO'"],[".lower()","Convert to lowercase","'NASA'.lower()","'nasa'"],[".strip()","Remove whitespace","'  hi  '.strip()","'hi'"],[".replace(a,b)","Replace a with b","'cat'.replace('c','b')","'bat'"],[".find(x)","Find position of x","'hello'.find('l')","2"],[".count(x)","Count occurrences","'hello'.count('l')","2"]]},codeExample:`signal = "  MAYDAY  "

# Clean and normalize
clean = signal.strip()      # "MAYDAY"
lower = clean.lower()       # "mayday"

# Search and replace
message = "Alert: Code Red"
position = message.find("Red")  # 12
count = message.count("e")      # 2
replaced = message.replace("Red", "Blue")

# Chaining methods
raw = "  hello world  "
processed = raw.strip().upper()  # "HELLO WORLD"`},{title:"6. Parsing Formatted Data",content:`Real mission data often comes in formatted strings. You'll need to extract specific pieces using slicing, splitting, or find operations.

Common patterns:
- Fixed positions: data = line[10:15]
- Delimiters: parts = line.split(",")
- Search and extract: pos = line.find(":")`,codeExample:`# Fixed format log entry
log = "2024-03-15|LAUNCH|SUCCESS"

# Extract by position
date = log[0:10]        # "2024-03-15"
event = log[11:17]      # "LAUNCH"
status = log[18:]       # "SUCCESS"

# Extract by splitting
parts = log.split("|")
print(parts[0])  # "2024-03-15"
print(parts[1])  # "LAUNCH"
print(parts[2])  # "SUCCESS"

# Find and extract
data = "Temperature: 273K"
colon_pos = data.find(":")
value = data[colon_pos + 2:]  # "273K"`}],Qf=[{id:1,title:"Signal Decode",description:`Decode a transmission by extracting specific characters.

Given transmission = "ALPHA-BRAVO-CHARLIE":
1. Print the first character (index 0)
2. Print the last character (negative index)
3. Print the 7th character (index 6)

Each should be on its own line with a label like "First: A"`,starterCode:`# MISSION: Signal Decode
# Extract key characters from transmission

def decode_signal():
    transmission = "ALPHA-BRAVO-CHARLIE"
    
    # Extract and print:
    # 1. First character
    # 2. Last character  
    # 3. 7th character (index 6)
    pass

# === Mission Control Test ===
decode_signal()`,hint:"Use transmission[0] for first, transmission[-1] for last. Remember indexing starts at 0!",conceptTags:["indexing","positive index","negative index"]},{id:2,title:"Callsign Extract",description:`Extract the callsign from a mission identifier.

Given mission_id = "APOLLO-11-NASA":
1. Extract "APOLLO" (first 6 characters) using slicing
2. Extract "11" (characters at positions 7-8)
3. Extract "NASA" (last 4 characters)

Print each extracted part with a label.`,starterCode:`# MISSION: Callsign Extract
# Parse mission identifier

def extract_callsign():
    mission_id = "APOLLO-11-NASA"
    
    # Extract using slicing:
    # 1. Program name (first 6)
    # 2. Mission number (positions 7-8)
    # 3. Agency (last 4)
    pass

# === Mission Control Test ===
extract_callsign()`,hint:"Use mission_id[0:6] for first 6, mission_id[7:9] for positions 7-8, mission_id[-4:] for last 4.",conceptTags:["slicing","substring","negative slicing"]},{id:3,title:"Message Assembly",description:`Build a status message by concatenating parts.

Create these variables:
- spacecraft = "Voyager"
- status = "operational"
- days = 45 (integer!)

Concatenate them to print:
"Voyager is operational after 45 days"

Remember: numbers need str() to concatenate!`,starterCode:`# MISSION: Message Assembly
# Build status transmission

def assemble_message():
    spacecraft = "Voyager"
    status = "operational"
    days = 45
    
    # Build and print the full message
    # "Voyager is operational after 45 days"
    pass

# === Mission Control Test ===
assemble_message()`,hint:"Use + to join strings. Convert days with str(days). Don't forget the spaces!",conceptTags:["concatenation","str()","building strings"]},{id:4,title:"Transmission Scan",description:`Scan a transmission and report each character with its position.

Given message = "MARS":
Loop through and print:
"Position 0: M"
"Position 1: A"
"Position 2: R"
"Position 3: S"

You'll need to use range(len()) to get both index and character.`,starterCode:`# MISSION: Transmission Scan
# Report each character position

def scan_transmission():
    message = "MARS"
    
    # Loop with index access
    # Print "Position X: Y" for each
    pass

# === Mission Control Test ===
scan_transmission()`,hint:"Use: for i in range(len(message)): then access message[i] inside the loop.",conceptTags:["iteration","range","len","indexing"]},{id:5,title:"Signal Cleanup",description:`Clean up a noisy transmission using string methods.

Given raw_signal = "  mayday MAYDAY  ":
1. Remove the whitespace from both ends
2. Convert to uppercase
3. Print the clean result

The final output should be: "MAYDAY MAYDAY"`,starterCode:`# MISSION: Signal Cleanup
# Clean corrupted transmission

def cleanup_signal():
    raw_signal = "  mayday MAYDAY  "
    
    # Clean the signal:
    # 1. Strip whitespace
    # 2. Convert to uppercase
    # Print result
    pass

# === Mission Control Test ===
cleanup_signal()`,hint:"Chain methods: raw_signal.strip().upper() does both operations!",conceptTags:["methods","strip","upper","chaining"]},{id:6,title:"Character Counter",description:`Analyze a message by counting specific characters.

Given code = "ALPHA BRAVO ALPHA":
1. Count how many times "A" appears
2. Count how many spaces there are
3. Print the total length

Use loops and a counter (or the .count() method).`,starterCode:`# MISSION: Message Analysis
# Count characters in transmission

def count_chars():
    code = "ALPHA BRAVO ALPHA"
    
    # Count:
    # 1. Letter A occurrences
    # 2. Space occurrences
    # 3. Total length
    pass

# === Mission Control Test ===
count_chars()`,hint:'You can use code.count("A") or loop and count manually. len(code) gives total length.',conceptTags:["count","len","methods","counter pattern"]},{id:7,title:"Log Parser",description:`Parse a mission log entry to extract data.

Given log = "2024-03-15|LAUNCH|SUCCESS|Kennedy":

Split by "|" and print:
"Date: 2024-03-15"
"Event: LAUNCH"
"Status: SUCCESS"
"Location: Kennedy"

Use the .split() method to break apart the string.`,starterCode:`# MISSION: Log Parser
# Extract data from formatted log

def parse_log():
    log = "2024-03-15|LAUNCH|SUCCESS|Kennedy"
    
    # Split the log by "|"
    # Print each field with label
    pass

# === Mission Control Test ===
parse_log()`,hint:'parts = log.split("|") creates a list. Access with parts[0], parts[1], etc.',conceptTags:["split","parsing","formatted data"]},{id:8,title:"Encrypted Message",description:`Decrypt a message using string manipulation techniques.

The encryption shifts each letter position: "B" becomes "A", "C" becomes "B", etc.

Given encrypted = "TFDSFU DPEF":
1. Loop through each character
2. If it's a letter, shift it back by 1 (hint: use chr() and ord())
3. If it's a space, keep it as a space
4. Build and print the decrypted message

The chr() function converts a number to a character.
The ord() function converts a character to its number.
ord('B') = 66, chr(65) = 'A'`,starterCode:`# MISSION: Decrypt Transmission
# Decode the secret message

def decrypt():
    encrypted = "TFDSFU DPEF"
    decrypted = ""
    
    # Loop through each character
    # If letter: shift back by 1 using chr(ord(char) - 1)
    # If space: keep as space
    # Build decrypted string
    pass

# === Mission Control Test ===
decrypt()`,hint:'Check if char is a space with if char == " ". Otherwise use chr(ord(char) - 1) to shift. Build result string with decrypted += new_char',conceptTags:["synthesis","chr","ord","accumulator","conditional"]}],J0=[{title:"1. Lists: Ordered Collections",content:`A list is an ordered collection of items. Unlike single variables, lists can hold multiple values of any type. In Python, lists are dynamic - they can grow and shrink as needed.

Lists are created with square brackets [] and items are separated by commas.`,codeExample:`# Creating lists
crew = ["Armstrong", "Collins", "Aldrin"]
fuel_readings = [85.5, 82.3, 79.1, 76.8]
system_status = [True, True, False, True]
empty_list = []

# Lists can mix types (but usually don't)
mixed = ["Apollo", 11, True, 3.14]

# Check length
print(len(crew))  # 3`},{title:"2. Accessing List Elements",content:"Access list elements using index numbers in square brackets. Like strings, indexing starts at 0. Negative indices count from the end.",tableData:{headers:["List","Index 0","Index 1","Index 2","Index -1"],rows:[["['A', 'B', 'C']","A","B","C","C"],["[10, 20, 30]","10","20","30","30"]]},codeExample:`crew = ["Armstrong", "Collins", "Aldrin"]

# Positive indexing
print(crew[0])   # "Armstrong" (first)
print(crew[1])   # "Collins" (second)
print(crew[2])   # "Aldrin" (third)

# Negative indexing
print(crew[-1])  # "Aldrin" (last)
print(crew[-2])  # "Collins" (second-to-last)

# Out of range = Error!
# print(crew[5])  # IndexError!`},{title:"3. Modifying List Elements",content:"Unlike strings, lists are mutable - you can change their contents! Use index assignment to update specific elements.",codeExample:`readings = [100, 95, 88, 92]

# Change an element
readings[2] = 90  # Was 88, now 90
print(readings)   # [100, 95, 90, 92]

# Multiple changes
readings[0] = 98
readings[-1] = 95
print(readings)   # [98, 95, 90, 95]

# Conditional update
status = ["GO", "GO", "NO-GO", "GO"]
if status[2] == "NO-GO":
    status[2] = "RESOLVED"
print(status)  # ["GO", "GO", "RESOLVED", "GO"]`},{title:"4. Core List Methods",content:"Python lists have built-in methods for adding and removing elements.",tableData:{headers:["Method","Action","Example","Result"],rows:[[".append(x)","Add x to end","[1,2].append(3)","[1,2,3]"],[".insert(i,x)","Insert x at index i","[1,3].insert(1,2)","[1,2,3]"],[".pop()","Remove & return last","[1,2,3].pop()","3, list=[1,2]"],[".pop(i)","Remove & return at i","[1,2,3].pop(0)","1, list=[2,3]"],[".remove(x)","Remove first x found","[1,2,2].remove(2)","[1,2]"]]},codeExample:`crew = ["Armstrong", "Collins"]

# Add to end
crew.append("Aldrin")
print(crew)  # ["Armstrong", "Collins", "Aldrin"]

# Insert at position
crew.insert(0, "Mission Commander")
# ["Mission Commander", "Armstrong", "Collins", "Aldrin"]

# Remove and get last
last = crew.pop()
print(last)  # "Aldrin"

# Remove by value
crew.remove("Collins")
print(crew)  # ["Mission Commander", "Armstrong"]`},{title:"5. Traversal by Element",content:"The simplest way to process every item in a list is to loop through by element. Use this when you only need the values, not their positions.",codeExample:`readings = [85, 92, 78, 95, 88]

# Simple traversal
for reading in readings:
    print(f"Sensor reading: {reading}")

# With accumulator
total = 0
for reading in readings:
    total += reading
average = total / len(readings)
print(f"Average: {average}")

# With counter
high_count = 0
for reading in readings:
    if reading > 90:
        high_count += 1
print(f"High readings: {high_count}")`},{title:"6. Traversal by Index",content:"When you need to know the position of each element (or modify elements), traverse by index using range(len(list)).",codeExample:`systems = ["Engines", "Life Support", "Navigation", "Comms"]

# Print with positions
for i in range(len(systems)):
    print(f"System {i}: {systems[i]}")

# Modify elements (can't do with element traversal!)
readings = [80, 75, 82, 78]
for i in range(len(readings)):
    readings[i] += 5  # Boost all by 5
print(readings)  # [85, 80, 87, 83]

# Find index of maximum
values = [23, 67, 45, 89, 34]
max_index = 0
for i in range(len(values)):
    if values[i] > values[max_index]:
        max_index = i
print(f"Max at index {max_index}: {values[max_index]}")`},{title:"7. 2D Lists: Grids and Matrices",content:`A 2D list is a list of lists - like a grid or table. Access elements with two indices: grid[row][col].

Think of it as: row first (which list), then column (which element in that list).`,codeExample:`# Cargo bay: 3 rows, 4 columns
cargo = [
    ["Food", "Water", "Oxygen", "Spare"],
    ["Tools", "Empty", "Medical", "Empty"],
    ["Fuel", "Fuel", "Fuel", "Empty"]
]

# Access single element
print(cargo[0][0])  # "Food" (row 0, col 0)
print(cargo[1][2])  # "Medical" (row 1, col 2)
print(cargo[2][0])  # "Fuel" (row 2, col 0)

# Modify element
cargo[1][1] = "Radio"  # Fill empty spot

# Dimensions
rows = len(cargo)       # 3
cols = len(cargo[0])    # 4`},{title:"8. Traversing 2D Lists",content:"To process every element in a 2D list, use nested loops. The outer loop iterates through rows, the inner loop through columns.",codeExample:`# Sensor grid (2D readings)
sensor_grid = [
    [85, 90, 88],
    [78, 82, 80],
    [92, 95, 91]
]

# Print entire grid
for row in range(len(sensor_grid)):
    for col in range(len(sensor_grid[row])):
        print(f"[{row}][{col}] = {sensor_grid[row][col]}")

# Count values above threshold
high_count = 0
for row in sensor_grid:
    for value in row:
        if value > 90:
            high_count += 1
print(f"High readings: {high_count}")

# Calculate total of all values
total = 0
for row in sensor_grid:
    for value in row:
        total += value
print(f"Total: {total}")`}],Vf=[{id:1,title:"Crew Roster",description:`Create and display a crew roster.

1. Create a list called crew with these names: "Armstrong", "Collins", "Aldrin"
2. Print the entire list
3. Print the number of crew members using len()
4. Print the first crew member's name
5. Print the last crew member's name (use negative indexing)`,starterCode:`# MISSION: Crew Roster
# Create and display crew list

def crew_roster():
    # Create the crew list
    
    # Print entire list
    
    # Print length
    
    # Print first member
    
    # Print last member
    pass

# === Mission Control Test ===
crew_roster()`,hint:'Create list with crew = ["Armstrong", "Collins", "Aldrin"]. Use len(crew) for count, crew[0] for first, crew[-1] for last.',conceptTags:["list creation","len","indexing"]},{id:2,title:"Mission Update",description:`Update mission status in a list.

Given status = ["GO", "GO", "NO-GO", "GO"]:
1. Print the original list
2. Change the "NO-GO" (index 2) to "GO"
3. Print the updated list
4. Change the last status to "COMPLETE"
5. Print the final list`,starterCode:`# MISSION: Status Update
# Modify mission status list

def update_status():
    status = ["GO", "GO", "NO-GO", "GO"]
    
    # Print original
    
    # Fix the NO-GO
    
    # Print updated
    
    # Mark last as COMPLETE
    
    # Print final
    pass

# === Mission Control Test ===
update_status()`,hint:'Use status[2] = "GO" to modify. Use status[-1] = "COMPLETE" for the last element.',conceptTags:["modification","index assignment"]},{id:3,title:"New Recruit",description:`Manage crew additions using .append().

Start with crew = ["Armstrong", "Collins"]:
1. Print the current crew
2. Add "Aldrin" to the end
3. Print the updated crew
4. Add "Duke" to the end
5. Print final crew and total count`,starterCode:`# MISSION: Recruit Management
# Add crew members using append

def add_recruits():
    crew = ["Armstrong", "Collins"]
    
    # Print current
    
    # Add Aldrin
    
    # Print updated
    
    # Add Duke
    
    # Print final with count
    pass

# === Mission Control Test ===
add_recruits()`,hint:'Use crew.append("Aldrin") to add to the end. Remember: append modifies the list in place.',conceptTags:["append","list methods"]},{id:4,title:"Crew Departure",description:`Manage crew removals using .pop() and .remove().

Start with crew = ["Armstrong", "Collins", "Aldrin", "Duke"]:
1. Print the current crew
2. Use .pop() to remove the last member (Duke) - print who left
3. Print the current crew
4. Use .remove() to remove "Collins" specifically
5. Print the final crew`,starterCode:`# MISSION: Crew Departure
# Remove crew members

def crew_departure():
    crew = ["Armstrong", "Collins", "Aldrin", "Duke"]
    
    # Print current
    
    # Pop last member (save who it was)
    
    # Print updated
    
    # Remove Collins by name
    
    # Print final
    pass

# === Mission Control Test ===
crew_departure()`,hint:'departed = crew.pop() removes and returns the last item. crew.remove("Collins") removes by value.',conceptTags:["pop","remove","list methods"]},{id:5,title:"Priority Insert",description:`Insert items at specific positions using .insert().

Start with tasks = ["Check fuel", "Plot course", "Launch"]:
1. Print the current task list
2. Insert "System check" at the beginning (index 0)
3. Insert "Crew briefing" at index 2 (after system check, before fuel)
4. Print the final task list with positions`,starterCode:`# MISSION: Task Priority
# Insert tasks at specific positions

def priority_insert():
    tasks = ["Check fuel", "Plot course", "Launch"]
    
    # Print current
    
    # Insert at beginning
    
    # Insert at position 2
    
    # Print final with positions
    pass

# === Mission Control Test ===
priority_insert()`,hint:'Use tasks.insert(0, "System check") to insert at beginning. insert(index, value) puts value BEFORE that index.',conceptTags:["insert","list methods","positioning"]},{id:6,title:"Roster Review",description:`Process all crew members using element traversal.

Given crew = ["Armstrong", "Collins", "Aldrin", "Duke", "Scott"]:
1. Loop through each name and print "Crew member: [name]"
2. Count how many names have more than 6 characters
3. Print the count`,starterCode:`# MISSION: Roster Review
# Process crew list by element

def review_roster():
    crew = ["Armstrong", "Collins", "Aldrin", "Duke", "Scott"]
    
    # Print each crew member
    
    # Count names longer than 6 characters
    
    # Print count
    pass

# === Mission Control Test ===
review_roster()`,hint:"Use: for name in crew: to iterate. Use len(name) > 6 to check character count.",conceptTags:["element traversal","counter","len"]},{id:7,title:"Indexed Search",description:`Search for a target using index traversal.

Given readings = [45, 72, 38, 91, 55, 88]:
1. Loop through using range(len())
2. Print each reading with its index: "Index X: Y"
3. Find and print the INDEX of the first value over 80
4. Print "Found at index: X"`,starterCode:`# MISSION: Data Search
# Find value by index

def indexed_search():
    readings = [45, 72, 38, 91, 55, 88]
    found_index = -1
    
    # Loop with index
    # Print each with position
    # Track first index over 80
    
    # Print where found
    pass

# === Mission Control Test ===
indexed_search()`,hint:"Use: for i in range(len(readings)): - then readings[i] gives the value at that index.",conceptTags:["index traversal","range","len","search"]},{id:8,title:"Cargo Grid",description:`Create and display a 2D cargo manifest.

Create a 3x3 cargo grid:
Row 0: "Food", "Water", "Oxygen"
Row 1: "Tools", "Medical", "Spare"
Row 2: "Fuel", "Fuel", "Empty"

1. Print the item at row 1, column 2 (should be "Spare")
2. Change the "Empty" to "Radio"
3. Print the full grid (each row on its own line)`,starterCode:`# MISSION: Cargo Grid
# Manage 2D cargo manifest

def cargo_grid():
    # Create the 3x3 cargo grid
    cargo = [
        # Row 0
        # Row 1
        # Row 2
    ]
    
    # Print item at [1][2]
    
    # Change Empty to Radio
    
    # Print full grid
    pass

# === Mission Control Test ===
cargo_grid()`,hint:'Access with cargo[row][col]. The "Empty" is at [2][2]. Print each row separately.',conceptTags:["2D list","creation","access","modification"]},{id:9,title:"Grid Access",description:`Navigate a sensor grid using 2D indexing.

Given sensor_grid (3x4):
[[85, 90, 88, 92],
 [78, 82, 95, 80],
 [91, 87, 83, 89]]

1. Print the value at [0][2] (row 0, column 2)
2. Print the value at [1][2] (row 1, column 2)
3. Print the value at [2][0] (row 2, column 0)
4. Find and print the number of rows
5. Find and print the number of columns`,starterCode:`# MISSION: Grid Navigation
# Access 2D sensor data

def grid_access():
    sensor_grid = [
        [85, 90, 88, 92],
        [78, 82, 95, 80],
        [91, 87, 83, 89]
    ]
    
    # Print values at specified positions
    
    # Print dimensions (rows and cols)
    pass

# === Mission Control Test ===
grid_access()`,hint:"Rows = len(sensor_grid), Columns = len(sensor_grid[0]). Access with grid[row][col].",conceptTags:["2D access","dimensions","len"]},{id:10,title:"Cargo Scan",description:`Complete inventory scan using nested loops.

Given cargo_grid:
[[10, 20, 30],
 [15, 25, 35],
 [12, 22, 32]]

1. Print every value with its position: "[row][col] = value"
2. Calculate and print the total of ALL values
3. Count how many values are greater than 20
4. Print the count`,starterCode:`# MISSION: Full Cargo Scan
# Traverse entire 2D grid

def cargo_scan():
    cargo_grid = [
        [10, 20, 30],
        [15, 25, 35],
        [12, 22, 32]
    ]
    
    total = 0
    high_count = 0
    
    # Nested loop to process all elements
    # Print each with position
    # Accumulate total
    # Count values > 20
    
    # Print totals
    pass

# === Mission Control Test ===
cargo_scan()`,hint:"Use nested for loops: for row in range(len(grid)): then for col in range(len(grid[row])): Access with grid[row][col].",conceptTags:["2D traversal","nested loops","accumulator","counter"]}],P0=[{title:"1. Abstract Data Types (ADTs)",content:`An Abstract Data Type (ADT) is a logical description of how data is viewed and the operations available. We don't focus on HOW it's implemented, but WHAT it does.

Stacks and Queues are ADTs that control the ORDER in which data is accessed. This order matters in many computing scenarios!

In this level, we'll implement both using Python lists, but remember: the CONCEPT is more important than the specific implementation.`,codeExample:`# Both stacks and queues store items
# The difference is ORDER of removal

# Real examples:
# Stack (LIFO): Undo button - last action undone first
# Queue (FIFO): Print jobs - first document prints first`},{title:"2. Stack: Last In, First Out (LIFO)",content:`A stack is like a stack of plates - you can only add or remove from the TOP.

Key operations:
- Push: Add item to top
- Pop: Remove item from top
- Peek: Look at top item without removing

The most RECENT item added is the FIRST one removed. This is called LIFO (Last In, First Out).`,tableData:{headers:["Operation","Stack Before","Action","Stack After","Returned"],rows:[["push(A)","[]","Add A to top","[A]","-"],["push(B)","[A]","Add B to top","[A, B]","-"],["push(C)","[A, B]","Add C to top","[A, B, C]","-"],["pop()","[A, B, C]","Remove top","[A, B]","C"],["pop()","[A, B]","Remove top","[A]","B"]]},codeExample:`# Stack using a list
stack = []

# Push (add to end = top)
stack.append("Navigate to Home")
stack.append("Navigate to Settings")
stack.append("Navigate to Profile")
print(stack)  # ["Navigate to Home", "Navigate to Settings", "Navigate to Profile"]

# Pop (remove from end = top)
last_page = stack.pop()  # "Navigate to Profile"
print(f"Back to: {last_page}")
print(stack)  # ["Navigate to Home", "Navigate to Settings"]`},{title:"3. When to Use a Stack",content:`Stacks are the right choice when you need LIFO behavior - when the most recent item should be processed first.

Common use cases in computing:
- Undo/Redo: Most recent action reversed first
- Browser Back: Returns to most recent page
- Function Calls: Most recent function returns first
- Expression Evaluation: Parsing mathematical expressions`,codeExample:`# Undo feature simulation
actions = []

# User performs actions
actions.append("Type 'Hello'")
actions.append("Type ' World'")
actions.append("Make Bold")

print("Actions performed:", actions)

# User clicks Undo
undone = actions.pop()
print(f"Undoing: {undone}")
print("Remaining actions:", actions)

# Another Undo
undone = actions.pop()
print(f"Undoing: {undone}")
print("Remaining actions:", actions)`},{title:"4. Queue: First In, First Out (FIFO)",content:`A queue is like a line at Mission Control - first person in line is served first.

Key operations:
- Enqueue: Add item to back (end of line)
- Dequeue: Remove item from front (served first)
- Peek: Look at front item without removing

The FIRST item added is the FIRST one removed. This is called FIFO (First In, First Out).`,tableData:{headers:["Operation","Queue Before","Action","Queue After","Returned"],rows:[["enqueue(A)","[]","Add A to back","[A]","-"],["enqueue(B)","[A]","Add B to back","[A, B]","-"],["enqueue(C)","[A, B]","Add C to back","[A, B, C]","-"],["dequeue()","[A, B, C]","Remove front","[B, C]","A"],["dequeue()","[B, C]","Remove front","[C]","B"]]},codeExample:`# Queue using a list
queue = []

# Enqueue (add to end)
queue.append("Message from Earth")
queue.append("Message from Mars Rover")
queue.append("Message from ISS")
print(queue)  # ["Message from Earth", "Message from Mars Rover", "Message from ISS"]

# Dequeue (remove from front)
first_msg = queue.pop(0)  # "Message from Earth"
print(f"Processing: {first_msg}")
print(queue)  # ["Message from Mars Rover", "Message from ISS"]`},{title:"5. When to Use a Queue",content:`Queues are the right choice when fairness matters - first come, first served.

Common use cases in computing:
- Print Queue: First document sent prints first
- Message Buffer: Messages processed in order received
- Task Scheduling: Tasks completed in order submitted
- Customer Service: First caller answered first`,codeExample:`# Mission message queue
incoming_messages = []

# Messages arrive
incoming_messages.append("Launch authorization - T-30 min")
incoming_messages.append("Weather update - Clear")
incoming_messages.append("Crew status - All GO")

print("Messages waiting:", len(incoming_messages))

# Process in order received (FIFO)
while len(incoming_messages) > 0:
    msg = incoming_messages.pop(0)  # Dequeue front
    print(f"Processing: {msg}")

print("All messages processed")`},{title:"6. Stack vs Queue: Making the Right Choice",content:`The key question: What ORDER should items be processed?

Ask yourself:
- Should the NEWEST item be handled first? -> Stack (LIFO)
- Should the OLDEST item be handled first? -> Queue (FIFO)`,tableData:{headers:["Scenario","Order Needed","Structure"],rows:[["Undo button","Most recent first","Stack"],["Print jobs","First submitted first","Queue"],["Browser back","Most recent page","Stack"],["Customer service calls","First caller first","Queue"],["Recursive function calls","Most recent returns","Stack"],["Message buffer","Oldest message first","Queue"]]},codeExample:`# Example: Navigation history (Stack)
# When you go back, you return to MOST RECENT page
nav_history = []
nav_history.append("Home")
nav_history.append("Products")
nav_history.append("Product Detail")
back_to = nav_history.pop()  # Goes to "Product Detail"

# Example: Task queue (Queue)
# Tasks completed in order assigned
task_queue = []
task_queue.append("System check")
task_queue.append("Fuel load")
task_queue.append("Launch prep")
next_task = task_queue.pop(0)  # Does "System check" first`},{title:"7. Trace Exercise: Stack Operations",content:"Trace the stack after each operation. Fill in the missing values to practice LIFO thinking.",tableData:{headers:["Step","Operation","Stack After","Returned"],rows:[["1","push(10)","[10]","-"],["2","push(20)","?","?"],["3","push(30)","?","?"],["4","pop()","?","?"],["5","push(40)","?","?"],["6","pop()","?","?"],["7","pop()","?","?"]]},codeExample:`# Starting stack: []
# Operations: push(10), push(20), push(30), pop(), push(40), pop(), pop()`},{title:"8. Trace Exercise: Queue Operations",content:"Trace the queue after each operation. Fill in the missing values to practice FIFO thinking.",tableData:{headers:["Step","Operation","Queue After","Returned"],rows:[["1","enqueue(A)","[A]","-"],["2","enqueue(B)","?","?"],["3","dequeue()","?","?"],["4","enqueue(C)","?","?"],["5","dequeue()","?","?"],["6","enqueue(D)","?","?"]]},codeExample:`# Starting queue: []
# Operations: enqueue(A), enqueue(B), dequeue(), enqueue(C), dequeue(), enqueue(D)`}],Xf=[{id:1,title:"Command Undo Stack",description:`Implement an undo system using a stack.

Create an empty list called command_stack, then:
1. Push "Initialize systems"
2. Push "Load fuel"
3. Push "Start countdown"
4. Print the stack
5. Pop and print the last command (with "Undoing:")
6. Pop and print the next command (with "Undoing:")
7. Print remaining stack

Remember: append() adds to top, pop() removes from top.`,starterCode:`# MISSION: Command Undo System
# Implement undo using a stack

def undo_system():
    command_stack = []
    
    # Push three commands
    
    # Print stack
    
    # Undo twice (pop and print each)
    
    # Print remaining
    pass

# === Mission Control Test ===
undo_system()`,hint:"Use .append() to push, .pop() to pop. Pop returns the removed item so you can print it.",conceptTags:["stack","push","pop","LIFO"]},{id:2,title:"Action Replay",description:`Process a stack of recorded actions in LIFO order.

Given action_stack = ["Takeoff", "Orbit entry", "Dock", "EVA"]:
1. Print "Actions recorded:" and list length
2. Process ALL actions in LIFO order (most recent first)
   - Pop each action and print "Replaying: [action]"
3. Continue until stack is empty
4. Print "Replay complete"

This demonstrates the LIFO nature of stacks!`,starterCode:`# MISSION: Action Replay
# Process stack in LIFO order

def action_replay():
    action_stack = ["Takeoff", "Orbit entry", "Dock", "EVA"]
    
    # Print initial count
    
    # Process ALL in LIFO order using while loop
    
    # Print completion
    pass

# === Mission Control Test ===
action_replay()`,hint:"Use while len(action_stack) > 0: to continue until empty. Pop returns and removes the top item.",conceptTags:["stack","LIFO","while loop","processing"]},{id:3,title:"Transmission Queue",description:`Implement a message queue using FIFO order.

Create an empty list called message_queue, then:
1. Enqueue "Priority Alert"
2. Enqueue "Status Update"
3. Enqueue "Routine Check"
4. Print the queue
5. Dequeue and print the first message (with "Sending:")
6. Dequeue and print the next message (with "Sending:")
7. Print remaining queue

Remember: append() adds to back, pop(0) removes from front.`,starterCode:`# MISSION: Transmission Queue
# Implement message queue

def transmission_queue():
    message_queue = []
    
    # Enqueue three messages
    
    # Print queue
    
    # Dequeue twice (pop(0) and print each)
    
    # Print remaining
    pass

# === Mission Control Test ===
transmission_queue()`,hint:"Use .append() to enqueue (add to back), .pop(0) to dequeue (remove from front).",conceptTags:["queue","enqueue","dequeue","FIFO"]},{id:4,title:"Message Processing",description:`Process all queued messages in FIFO order.

Given incoming = ["Earth: Launch approved", "Mars: Data ready", "ISS: Crew status"]:
1. Print "Messages pending:" and count
2. Process ALL messages in FIFO order (oldest first)
   - Dequeue each and print "Processing: [message]"
3. Continue until queue is empty
4. Print "All transmissions processed"

This demonstrates the FIFO nature of queues!`,starterCode:`# MISSION: Message Processing
# Process queue in FIFO order

def process_messages():
    incoming = ["Earth: Launch approved", "Mars: Data ready", "ISS: Crew status"]
    
    # Print initial count
    
    # Process ALL in FIFO order
    
    # Print completion
    pass

# === Mission Control Test ===
process_messages()`,hint:"Use while len(incoming) > 0: and pop(0) inside to process oldest first.",conceptTags:["queue","FIFO","while loop","processing"]},{id:5,title:"Command Center",description:`Build a command center that uses BOTH a stack and a queue appropriately.

You have two types of operations:
- UNDO requests should use a stack (most recent command undone first)
- INCOMING messages should use a queue (oldest message processed first)

1. Create command_history = [] (stack for undo)
2. Create message_buffer = [] (queue for messages)

3. Add commands to history: "System check", "Fuel load", "Launch"
4. Add messages to buffer: "Weather clear", "Crew ready", "GO signal"

5. Undo the last TWO commands (print what's undone)
6. Process the first TWO messages (print what's processed)

7. Print remaining commands and messages`,starterCode:`# MISSION: Command Center
# Use stack and queue appropriately

def command_center():
    # Stack for undo (LIFO)
    command_history = []
    
    # Queue for messages (FIFO)
    message_buffer = []
    
    # Add commands (push to stack)
    
    # Add messages (enqueue to queue)
    
    # Undo last 2 commands (pop from stack)
    print("=== UNDO OPERATIONS ===")
    
    # Process first 2 messages (dequeue from queue)
    print("=== MESSAGE PROCESSING ===")
    
    # Print remaining
    print("=== REMAINING ===")
    pass

# === Mission Control Test ===
command_center()`,hint:"Stack: append() then pop() for LIFO. Queue: append() then pop(0) for FIFO. Think about WHY each structure fits its purpose!",conceptTags:["synthesis","stack","queue","LIFO","FIFO","appropriate use"]}],eg=[{title:"1. Why Use Functions?",content:`Functions are reusable blocks of code with a specific purpose. Instead of repeating code, you write it once and call it whenever needed.

Benefits of functions:
- Reusability: Write once, use many times
- Organization: Break complex problems into smaller parts
- Testing: Test each function independently
- Readability: Give meaningful names to code blocks`,codeExample:`# Without functions - repetitive!
print("=" * 30)
print("SYSTEM CHECK")
print("=" * 30)
# ... other code ...
print("=" * 30)
print("LAUNCH STATUS")
print("=" * 30)

# With a function - reusable!
def print_header(title):
    print("=" * 30)
    print(title)
    print("=" * 30)

print_header("SYSTEM CHECK")
# ... other code ...
print_header("LAUNCH STATUS")`},{title:"2. Defining Functions with def",content:`Use the def keyword to create a function. The function body is indented (like if statements and loops).

Structure:
def function_name():
    # code to run when called
    # more code

After defining, you must CALL the function to run it!`,codeExample:`# Define a function
def greet_crew():
    print("Good morning, crew!")
    print("Today's mission briefing begins now.")

# Call the function (runs the code)
greet_crew()

# Can call multiple times
greet_crew()
greet_crew()

# Nothing happens until you call it!
def unused_function():
    print("This never prints")
# No call = no execution`},{title:"3. Parameters: Passing Data In",content:`Parameters allow you to pass data INTO a function. They act like variables that receive values when the function is called.

- Parameters: The variable names in the function definition
- Arguments: The actual values passed when calling`,codeExample:`# One parameter
def greet(name):
    print(f"Welcome aboard, {name}!")

greet("Armstrong")  # "Welcome aboard, Armstrong!"
greet("Collins")    # "Welcome aboard, Collins!"

# Multiple parameters
def mission_status(day, fuel, crew):
    print(f"Day {day}: Fuel={fuel}%, Crew={crew}")

mission_status(5, 82, 3)
mission_status(10, 65, 3)

# The ORDER of arguments matters!
# mission_status(82, 5, 3) would give wrong values`},{title:"4. Returning Values",content:`Functions can send data BACK to where they were called using return. This lets you use the result in calculations, assignments, or other operations.

Without return, a function returns None by default.`,codeExample:`# Function that returns a value
def calculate_fuel_needed(distance):
    fuel = distance * 0.5  # 0.5 kg per km
    return fuel

# Use the returned value
fuel_to_mars = calculate_fuel_needed(78000000)
print(f"Fuel needed: {fuel_to_mars} kg")

# Use directly in expressions
total = calculate_fuel_needed(1000) + calculate_fuel_needed(500)
print(f"Total fuel: {total} kg")

# Return with condition
def check_fuel(current, required):
    if current >= required:
        return "GO"
    else:
        return "NO-GO"

status = check_fuel(100, 90)
print(status)  # "GO"`},{title:"5. Returning Multiple Values",content:`Python can return multiple values from a function. They come back as a tuple (like a list, but immutable).

You can unpack them into separate variables!`,codeExample:`# Return multiple values
def analyze_readings(readings):
    total = sum(readings)
    count = len(readings)
    average = total / count
    return total, count, average

# Unpack into separate variables
tot, cnt, avg = analyze_readings([85, 90, 78, 92])
print(f"Total: {tot}")
print(f"Count: {cnt}")
print(f"Average: {avg}")

# Or keep as tuple
result = analyze_readings([100, 95, 88])
print(result)  # (283, 3, 94.33...)
print(result[0])  # Access by index: 283`},{title:"6. Variable Scope: Local vs Global",content:`Scope determines where a variable can be accessed.

- Local: Created inside a function, only exists there
- Global: Created outside functions, accessible everywhere

Important: Local variables "shadow" global ones with the same name!`,codeExample:`# Global variable
mission = "Apollo"  # Available everywhere

def launch():
    # Local variable - only exists in this function
    countdown = 10
    print(f"Launching {mission}")  # Can READ global
    print(f"T-{countdown}")
    
launch()
print(mission)    # Works - global
# print(countdown) # ERROR! countdown is local to launch()

# Shadowing (avoid this!)
fuel = 100  # Global

def burn():
    fuel = 50  # Different variable! Local fuel
    print(f"Local fuel: {fuel}")  # 50

burn()
print(f"Global fuel: {fuel}")  # Still 100!`},{title:"7. Breaking Down Problems",content:`Good modular programming means breaking complex tasks into smaller, focused functions. Each function should do ONE thing well.

Pattern:
1. Identify distinct tasks
2. Create a function for each
3. Have a main function that calls others`,codeExample:`# Break mission into modules
def check_fuel(level):
    return "GO" if level >= 90 else "NO-GO"

def check_systems(systems):
    for s in systems:
        if not s:
            return "NO-GO"
    return "GO"

def check_weather(condition):
    return "GO" if condition == "clear" else "NO-GO"

def launch_decision(fuel, systems, weather):
    """Main function that uses other functions"""
    fuel_status = check_fuel(fuel)
    system_status = check_systems(systems)
    weather_status = check_weather(weather)
    
    print(f"Fuel: {fuel_status}")
    print(f"Systems: {system_status}")
    print(f"Weather: {weather_status}")
    
    if fuel_status == "GO" and system_status == "GO" and weather_status == "GO":
        return "LAUNCH!"
    return "HOLD"

# Run the decision
result = launch_decision(95, [True, True, True], "clear")
print(result)`}],Zf=[{id:1,title:"Status Report",description:`Create a simple function that prints a status report.

Define a function called status_report() that:
1. Prints "=== MISSION STATUS ==="
2. Prints "All systems operational"
3. Prints "===================="

Call the function twice to demonstrate reusability.`,starterCode:`# MISSION: Status Report Function
# Create a reusable status report

def status_report():
    # Print the three lines
    pass

# === Mission Control Test ===
# Call the function twice
status_report()
print()  # Empty line between calls
status_report()`,hint:"Just use three print() statements inside the function. Remember to call it to see output!",conceptTags:["def","function definition","calling"]},{id:2,title:"Greeting Protocol",description:`Create a function that greets crew members by name.

Define a function called greet_crew(name) that:
1. Takes one parameter: name
2. Prints "Welcome aboard, [name]!"
3. Prints "Report to your station."

Call it three times with different names:
- "Armstrong"
- "Collins"  
- "Aldrin"`,starterCode:`# MISSION: Crew Greeting
# Personalized welcome using parameters

def greet_crew(name):
    # Use the name parameter in your print statements
    pass

# === Mission Control Test ===
greet_crew("Armstrong")
greet_crew("Collins")
greet_crew("Aldrin")`,hint:'Use f-strings or concatenation: print(f"Welcome aboard, {name}!")',conceptTags:["parameters","arguments","f-strings"]},{id:3,title:"Distance Calculator",description:`Create a function that calculates travel time.

Define calculate_time(distance, speed) that:
1. Takes two parameters: distance (km) and speed (km/h)
2. Calculates time = distance / speed
3. Returns the time value

Test it:
- Earth to Moon: 384,400 km at 1,000 km/h
- Print "Time to Moon: X hours"`,starterCode:`# MISSION: Travel Time Calculator
# Calculate journey duration

def calculate_time(distance, speed):
    # Calculate and return time
    pass

# === Mission Control Test ===
moon_time = calculate_time(384400, 1000)
print(f"Time to Moon: {moon_time} hours")`,hint:"Use return distance / speed. The returned value is stored in moon_time.",conceptTags:["parameters","return","calculation"]},{id:4,title:"Fuel Check",description:`Create a function that returns GO or NO-GO status.

Define check_fuel(current, minimum) that:
1. Takes current fuel level and minimum required
2. Returns "GO" if current >= minimum
3. Returns "NO-GO" otherwise

Test with:
- 95% current, 90% minimum (should be GO)
- 85% current, 90% minimum (should be NO-GO)`,starterCode:`# MISSION: Fuel Status Check
# Return GO/NO-GO based on fuel

def check_fuel(current, minimum):
    # Compare and return status
    pass

# === Mission Control Test ===
status1 = check_fuel(95, 90)
print(f"Test 1: {status1}")  # Should be GO

status2 = check_fuel(85, 90)
print(f"Test 2: {status2}")  # Should be NO-GO`,hint:'Use if current >= minimum: return "GO" else: return "NO-GO"',conceptTags:["return","conditionals","comparison"]},{id:5,title:"Telemetry Analysis",description:`Create a function that returns multiple statistics.

Define analyze_telemetry(readings) that:
1. Takes a list of sensor readings
2. Calculates the minimum, maximum, and average
3. Returns all three values

Test with readings = [85, 92, 78, 95, 88]
Unpack the returned values and print each.`,starterCode:`# MISSION: Telemetry Analysis
# Return multiple statistics

def analyze_telemetry(readings):
    # Calculate min, max, average
    # Return all three
    pass

# === Mission Control Test ===
readings = [85, 92, 78, 95, 88]
minimum, maximum, average = analyze_telemetry(readings)
print(f"Min: {minimum}")
print(f"Max: {maximum}")
print(f"Average: {average}")`,hint:"Use min(readings), max(readings), sum(readings)/len(readings). Return like: return min_val, max_val, avg_val",conceptTags:["multiple return","unpacking","list processing"]},{id:6,title:"Scope Investigation",description:`Demonstrate understanding of local vs global scope.

1. Create a global variable: mission_name = "Artemis"
2. Create a function scope_test() that:
   - Creates a LOCAL variable: crew_count = 4
   - Prints both mission_name and crew_count
3. Call the function
4. After the function, print mission_name
5. Try printing crew_count outside the function (it will error!)

Comment out the error line and explain why it fails.`,starterCode:`# MISSION: Scope Investigation
# Understand local vs global variables

# Global variable
mission_name = "Artemis"

def scope_test():
    # Local variable
    crew_count = 4
    # Print both inside function
    pass

# === Mission Control Test ===
scope_test()
print(f"Global mission: {mission_name}")
# print(f"Crew count: {crew_count}")  # This will ERROR!
# Explain: Why does this fail?`,hint:"Variables created inside a function (local) don't exist outside. Global variables CAN be read inside functions.",conceptTags:["scope","local","global"]},{id:7,title:"Utility Module",description:`Create a set of utility functions that work together.

Create these three functions:
1. celsius_to_kelvin(celsius) - Returns celsius + 273.15
2. is_safe_temp(kelvin) - Returns True if between 260-320K, else False
3. temp_status(celsius) - Uses both functions above, returns "SAFE" or "DANGER"

Test temp_status with:
- 25°C (should be SAFE - about 298K)
- -50°C (should be DANGER - about 223K)`,starterCode:`# MISSION: Temperature Utilities
# Create interconnected utility functions

def celsius_to_kelvin(celsius):
    # Convert and return
    pass

def is_safe_temp(kelvin):
    # Check if between 260-320K
    pass

def temp_status(celsius):
    # Use other functions to determine status
    pass

# === Mission Control Test ===
print(f"25°C status: {temp_status(25)}")   # SAFE
print(f"-50°C status: {temp_status(-50)}") # DANGER`,hint:"In temp_status: first call celsius_to_kelvin, then call is_safe_temp with that result, then return based on True/False.",conceptTags:["modular","function calls","composition"]},{id:8,title:"Mission Planner",description:`Create a comprehensive mission planning system using modular functions.

Create these functions:
1. get_mission_input() - Gets mission name, distance(int), fuel(int) from user, returns all three
2. calculate_fuel_needed(distance) - Returns distance * 0.01 (fuel per km)
3. check_feasibility(available, needed) - Returns "FEASIBLE" if available >= needed, else "NOT FEASIBLE"
4. generate_report(name, distance, available, needed, status) - Prints formatted report

Create main() that:
1. Calls get_mission_input() 
2. Calculates fuel needed
3. Checks feasibility
4. Generates report`,starterCode:`# MISSION: Complete Mission Planner
# Full modular system

def get_mission_input():
    # Get name, distance, fuel from user
    # Return all three
    pass

def calculate_fuel_needed(distance):
    # Return fuel calculation
    pass

def check_feasibility(available, needed):
    # Return status string
    pass

def generate_report(name, distance, available, needed, status):
    # Print formatted report
    print("=" * 40)
    print(f"MISSION: {name}")
    print("=" * 40)
    # ... more report details
    pass

def main():
    # Orchestrate all functions
    pass

# === Mission Control Test ===
main()`,hint:"This synthesizes everything! get_mission_input returns 3 values. main() calls each function in order, passing results between them.",conceptTags:["synthesis","modular design","input","return","full system"]}],tg=[{title:"1. Why File Processing?",content:`Programs need to store data permanently and retrieve it later. Files allow data to persist beyond program execution.

Common uses:
- Saving user data
- Loading configuration
- Processing logs
- Reading datasets

In this level, we'll simulate file operations since the web IDE can't access real files. The CONCEPTS are identical!`,codeExample:`# In a real environment:
# file = open("data.txt", "r")
# content = file.read()
# file.close()

# Our simulation approach:
file_content = """Line 1
Line 2
Line 3"""

# Process the "file" content
lines = file_content.split("\\n")
for line in lines:
    print(line)`},{title:"2. File Modes",content:"When opening a file, you specify a MODE that determines what operations are allowed.",tableData:{headers:["Mode","Name","Description","File Exists?"],rows:[["'r'","Read","Read only, cannot write","Must exist"],["'w'","Write","Write only, erases existing content","Created if not exists"],["'a'","Append","Write only, adds to end","Created if not exists"],["'r+'","Read+Write","Both read and write","Must exist"]]},codeExample:`# Reading mode (most common)
file = open("log.txt", "r")

# Writing mode (WARNING: erases existing!)
file = open("output.txt", "w")

# Append mode (adds to end)
file = open("log.txt", "a")

# Always remember to close!
file.close()`},{title:"3. Reading File Content",content:`Three ways to read file content, each useful in different situations:

- .read() - Entire file as one string
- .readline() - One line at a time
- .readlines() - All lines as a list`,codeExample:`# Simulated file content
log_content = """Line 1: Launch
Line 2: Orbit
Line 3: Dock"""

# Method 1: read() - entire content
# In real Python: content = file.read()
content = log_content
print(content)

# Method 2: readline() - simulated one at a time
lines = log_content.split("\\n")
first_line = lines[0]  # Like file.readline()
print(first_line)

# Method 3: readlines() - list of lines
all_lines = log_content.split("\\n")  # Like file.readlines()
for line in all_lines:
    print(line)`},{title:"4. Writing to Files",content:`The .write() method adds text to a file. Note that it doesn't automatically add newlines - you must include \\n yourself.

In write mode ('w'), existing content is ERASED.
In append mode ('a'), content is ADDED to the end.`,codeExample:`# Simulated writing (building a string)
output = ""

# Write mode simulation (start fresh)
output = ""  # Clear existing
output += "Mission Day 1\\n"
output += "All systems GO\\n"

# Append mode simulation (add to existing)
output += "Mission Day 2\\n"  # Adds to end

print("File content:")
print(output)

# In real Python:
# file = open("log.txt", "w")
# file.write("Mission Day 1\\n")
# file.close()`},{title:"5. Context Managers (with statement)",content:`The 'with' statement automatically closes the file when done, even if an error occurs. This is the RECOMMENDED way to handle files.

Structure:
with open(filename, mode) as variable:
    # do stuff with variable
# file automatically closed here`,codeExample:`# The safe way to handle files
# with open("log.txt", "r") as file:
#     content = file.read()
# File is automatically closed!

# Simulated version:
log_content = """Day 1: Launch
Day 2: Orbit
Day 3: Dock"""

# Process as if reading
lines = log_content.split("\\n")
for line in lines:
    print(f"Processing: {line}")

# In real code with 'with':
# with open("log.txt", "r") as f:
#     for line in f:
#         print(f"Processing: {line.strip()}")`},{title:"6. Parsing CSV Files",content:`CSV (Comma-Separated Values) files store tabular data. Each line is a row, and values are separated by commas (or other delimiters).

To parse:
1. Split by lines
2. Split each line by the delimiter
3. Process each field`,codeExample:`# CSV data
csv_content = """name,role,status
Armstrong,Commander,Active
Collins,Pilot,Active
Aldrin,Engineer,Active"""

# Parse the CSV
lines = csv_content.split("\\n")
header = lines[0].split(",")
print(f"Columns: {header}")

# Process data rows
for i in range(1, len(lines)):
    fields = lines[i].split(",")
    name = fields[0]
    role = fields[1]
    status = fields[2]
    print(f"{name} is {role} - {status}")`}],Kf=[{id:1,title:"Mission Log Viewer",description:`Read and display a mission log.

Given the simulated file content:
log_content = """Day 1: Launch successful
Day 2: Orbit established
Day 3: Experiments begin
Day 4: Data collection
Day 5: Mission complete"""

1. Split into lines (simulating file.readlines())
2. Print "=== MISSION LOG ==="
3. Print each line with a line number: "1: Day 1: Launch..."
4. Print total number of lines`,starterCode:`# MISSION: Log Viewer
# Read and display mission log

def view_log():
    log_content = """Day 1: Launch successful
Day 2: Orbit established
Day 3: Experiments begin
Day 4: Data collection
Day 5: Mission complete"""
    
    # Split into lines
    # Print header
    # Print each with line number
    # Print total count
    pass

# === Mission Control Test ===
view_log()`,hint:'Use lines = log_content.split("\\n") to get a list. Use enumerate() or range() for line numbers.',conceptTags:["read","split","line processing"]},{id:2,title:"Selective Line Scanner",description:`Read a log and find specific entries.

Given:
log_content = """INFO: Systems check passed
WARNING: Fuel level at 30%
INFO: Orbit stable
ERROR: Sensor malfunction
INFO: Communication active
WARNING: Temperature high"""

1. Split into lines
2. Loop through and only print lines containing "WARNING" or "ERROR"
3. Count how many warnings and errors total
4. Print the count`,starterCode:`# MISSION: Alert Scanner
# Find warnings and errors

def scan_alerts():
    log_content = """INFO: Systems check passed
WARNING: Fuel level at 30%
INFO: Orbit stable
ERROR: Sensor malfunction
INFO: Communication active
WARNING: Temperature high"""
    
    # Split into lines
    # Find and print WARNING/ERROR lines
    # Count total alerts
    pass

# === Mission Control Test ===
scan_alerts()`,hint:`Use 'in' to check: if "WARNING" in line or "ERROR" in line. Keep a counter for alerts found.`,conceptTags:["readline","filter","search","counter"]},{id:3,title:"Mission Logger",description:`Build a log file by writing entries.

Start with an empty string (simulating a new file).
Add these log entries (each on its own line):
1. "Mission: Artemis"
2. "Status: Active"
3. "Day: 1"
4. "Notes: All systems nominal"

Print the final "file" content.`,starterCode:`# MISSION: Log Writer
# Create a log file

def write_log():
    # Start with empty "file"
    log_file = ""
    
    # Write entries (remember \\n for new lines!)
    
    # Print the final content
    print("=== LOG FILE CONTENTS ===")
    pass

# === Mission Control Test ===
write_log()`,hint:'Use log_file += "text\\n" to add each line. The \\n creates a new line.',conceptTags:["write","string building","newlines"]},{id:4,title:"Log Append",description:`Add new entries to an existing log.

Start with existing content:
existing_log = """Day 1: Launch
Day 2: Orbit"""

Append these new entries:
- "Day 3: Docking"
- "Day 4: EVA"

Print the complete log showing all 4 days.`,starterCode:`# MISSION: Append to Log
# Add entries to existing log

def append_log():
    existing_log = """Day 1: Launch
Day 2: Orbit"""
    
    # Append new entries (simulate append mode)
    
    # Print complete log
    print("=== UPDATED LOG ===")
    pass

# === Mission Control Test ===
append_log()`,hint:'Append mode adds to the end. Use existing_log += "\\nDay 3: Docking" (note the \\n at start to continue from previous line).',conceptTags:["append","string concatenation"]},{id:5,title:"Safe File Operations",description:`Demonstrate the context manager pattern.

In real Python, you would use:
with open("file.txt", "r") as f:
    content = f.read()

Simulate this by:
1. Define a function process_file(content) that splits and counts lines
2. Use a "context" structure (use try/finally or just careful coding)
3. Process this data:
data = """Record 1
Record 2
Record 3"""
4. Print each record and the total count`,starterCode:`# MISSION: Safe File Handler
# Demonstrate proper file handling patterns

def process_file(content):
    """Process file content safely"""
    # Split into lines
    # Process each line
    # Return or print results
    pass

# === Mission Control Test ===
data = """Record 1
Record 2
Record 3"""

# In real code: with open("data.txt", "r") as f:
#     process_file(f.read())

process_file(data)`,hint:"The function should: split by \\n, loop through lines printing each, count and return the total.",conceptTags:["context manager","function","safe handling"]},{id:6,title:"Crew Data Parser",description:`Parse a CSV crew manifest.

Given:
crew_csv = """id,name,role,status
001,Armstrong,Commander,Active
002,Collins,Pilot,Active
003,Aldrin,Engineer,Reserve"""

1. Split into lines
2. Parse the header (first line)
3. For each data row, extract fields and print formatted:
   "ID: 001 | Name: Armstrong | Role: Commander | Status: Active"
4. Count total crew members (not including header)`,starterCode:`# MISSION: Crew CSV Parser
# Parse and display crew data

def parse_crew():
    crew_csv = """id,name,role,status
001,Armstrong,Commander,Active
002,Collins,Pilot,Active
003,Aldrin,Engineer,Reserve"""
    
    # Split into lines
    # Process header
    # Process each data row
    # Print count
    pass

# === Mission Control Test ===
parse_crew()`,hint:"Split lines, then split each line by comma. Skip index 0 (header) when processing data. fields[0] is id, fields[1] is name, etc.",conceptTags:["CSV","parsing","split","formatted output"]},{id:7,title:"Mission Archive",description:`Complete file processing system: read, process, and write.

Given sensor readings:
readings = """85.5
92.3
78.1
95.7
88.4"""

1. Parse the readings into a list of floats
2. Calculate: min, max, average
3. Create a report string:
   "=== SENSOR REPORT ===
   Readings: 5
   Minimum: 78.1
   Maximum: 95.7
   Average: 88.0
   ===================="
4. Print the report (simulating writing to file)`,starterCode:`# MISSION: Complete Archive System
# Read, process, write

def archive_data():
    readings = """85.5
92.3
78.1
95.7
88.4"""
    
    # Parse readings to float list
    
    # Calculate statistics
    
    # Build report string
    
    # "Write" (print) the report
    pass

# === Mission Control Test ===
archive_data()`,hint:"Convert strings to floats: float(line). Use min(), max(), sum()/len() for stats. Build report with += and \\n.",conceptTags:["synthesis","read","process","write","statistics"]}],ag=[{title:"1. Building Robust Programs",content:`A robust program handles unexpected situations gracefully instead of crashing. Space missions can't afford crashes!

Common issues to handle:
- Invalid user input (letters when expecting numbers)
- Division by zero
- Missing files
- Out-of-range values

Good programs anticipate problems and respond appropriately.`,codeExample:`# Fragile code (will crash)
# age = int(input("Age: "))  # Crashes if user types "abc"

# Robust code (handles errors)
try:
    age = int(input("Age: "))
    print(f"You are {age} years old")
except ValueError:
    print("Error: Please enter a number")

# Program continues instead of crashing!`},{title:"2. Trace Tables for Debugging",content:`A trace table tracks variable values as code executes line by line. This is a crucial exam skill and debugging technique.

How to create:
1. List all variables as column headers
2. Add a row for each line that changes a value
3. Fill in the new value (leave unchanged cells blank or repeat)`,tableData:{headers:["Line","x","y","total"],rows:[["1: x = 5","5","-","-"],["2: y = 3","5","3","-"],["3: total = x + y","5","3","8"],["4: x = x + 1","6","3","8"],["5: total = x * y","6","3","18"]]},codeExample:`# Code to trace:
x = 5
y = 3
total = x + y
x = x + 1
total = x * y

# After tracing, we know:
# x = 6, y = 3, total = 18`},{title:"3. Common Python Errors",content:"Python has specific error types for different problems. Knowing these helps you write targeted error handling.",tableData:{headers:["Error Type","Cause","Example"],rows:[["ValueError","Invalid value for operation","int('abc')"],["TypeError","Wrong type for operation","'5' + 5"],["ZeroDivisionError","Division by zero","10 / 0"],["IndexError","List index out of range","[1,2][5]"],["KeyError","Dict key doesn't exist","d['missing']"],["FileNotFoundError","File doesn't exist","open('no.txt')"]]},codeExample:`# These will crash without handling:
# int("hello")      # ValueError
# "text" + 5        # TypeError
# 100 / 0           # ZeroDivisionError
# [1,2,3][10]       # IndexError

# See the error type in the traceback:
# Traceback (most recent call last):
#   File "example.py", line 1
#     x = 10 / 0
# ZeroDivisionError: division by zero`},{title:"4. Basic Exception Handling",content:`The try-except block lets you "try" risky code and "catch" errors if they occur.

Structure:
try:
    # risky code
except:
    # runs if ANY error occurs`,codeExample:`# Basic try-except
try:
    fuel = int(input("Enter fuel level: "))
    print(f"Fuel: {fuel}%")
except:
    print("Error: Invalid input!")

# The program continues even after an error
print("Program still running!")

# Example flow with invalid input:
# User types "abc"
# ValueError occurs
# except block runs: "Error: Invalid input!"
# Program continues: "Program still running!"`},{title:"5. Catching Specific Exceptions",content:`Catch specific error types to handle different problems differently. This is more professional and informative.

You can have multiple except blocks for different error types.`,codeExample:`def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Both inputs must be numbers!")
        return None

# Test different errors
safe_divide(10, 0)     # ZeroDivisionError
safe_divide(10, "5")   # TypeError
safe_divide(10, 2)     # Returns 5.0

# Multiple specific handlers
try:
    value = int(input("Enter number: "))
    result = 100 / value
except ValueError:
    print("Not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")`},{title:"6. Input Validation",content:`Keep asking for input until the user provides valid data. This ensures your program has good data to work with.

Pattern: Loop until valid, using try-except inside.`,codeExample:`def get_valid_fuel():
    while True:
        try:
            fuel = int(input("Enter fuel (0-100): "))
            if 0 <= fuel <= 100:
                return fuel
            else:
                print("Must be between 0 and 100!")
        except ValueError:
            print("Please enter a number!")

# This loops until valid input
fuel_level = get_valid_fuel()
print(f"Fuel set to: {fuel_level}%")

# Sample interaction:
# Enter fuel: abc       -> "Please enter a number!"
# Enter fuel: 150       -> "Must be between 0 and 100!"
# Enter fuel: 85        -> "Fuel set to: 85%"`},{title:"Trace Exercise: Loop",content:`Trace this code by filling in the table values.

Code:
total = 0
for i in range(1, 4):
    total = total + i
print(total)`,tableData:{headers:["Line","i","total"],rows:[["1: total = 0","-","0"],["2: i = 1","1","0"],["3: total = total + i","1","?"],["2: i = 2","2","?"],["3: total = total + i","2","?"],["2: i = 3","3","?"],["3: total = total + i","3","?"]]}},{title:"Trace Exercise: Selection",content:`Trace this code and determine final values.

Code:
x = 10
y = 5
if x > y:
    result = x - y
else:
    result = y - x
x = result * 2`,tableData:{headers:["Line","x","y","result"],rows:[["1: x = 10","10","-","-"],["2: y = 5","10","5","-"],["3-6: if/else","10","5","?"],["7: x = result * 2","?","5","?"]]}}],$f=[{id:1,title:"Input Shield",description:`Protect your program from invalid input.

Create a function get_altitude() that:
1. Asks user for altitude (integer)
2. Uses try-except to catch invalid input
3. If valid: returns the altitude
4. If invalid: prints "Error: Invalid altitude!" and returns None

Test with both valid and invalid inputs.`,starterCode:`# MISSION: Input Shield
# Protect against invalid input

def get_altitude():
    try:
        # Get input and convert to int
        # Return the value
        pass
    except:
        # Handle the error
        # Return None
        pass

# === Mission Control Test ===
result = get_altitude()
if result is not None:
    print(f"Altitude: {result} km")
else:
    print("Failed to get altitude")`,hint:"Put altitude = int(input(...)) in the try block. If it fails, the except runs. Use except ValueError: for specific handling.",conceptTags:["try","except","ValueError","input"]},{id:2,title:"Specific Error Handler",description:`Handle different errors differently.

Create calculate_reading(value_str, divisor) that:
1. Converts value_str to float
2. Divides by divisor
3. Returns the result

Handle these specific errors:
- ValueError (bad conversion): print "Error: Invalid reading format"
- ZeroDivisionError (div by 0): print "Error: Divisor cannot be zero"

Return None for any error.`,starterCode:`# MISSION: Specific Error Handling
# Handle different errors appropriately

def calculate_reading(value_str, divisor):
    try:
        # Convert and calculate
        pass
    except ValueError:
        # Handle bad conversion
        pass
    except ZeroDivisionError:
        # Handle division by zero
        pass

# === Mission Control Test ===
print(calculate_reading("100", 4))   # Should print 25.0
print(calculate_reading("abc", 4))   # Should print error, None
print(calculate_reading("100", 0))   # Should print error, None`,hint:"Order matters! More specific exceptions should come before general ones. Each except block should print its message and return None.",conceptTags:["specific exceptions","ValueError","ZeroDivisionError"]},{id:3,title:"Safe Division System",description:`Create a robust division function for mission calculations.

Create safe_divide(a, b) that:
1. Attempts to divide a by b
2. If b is 0: print "Warning: Division by zero!", return 0
3. If either isn't a number: print "Error: Invalid number!", return None
4. If successful: return the result

Test thoroughly with various inputs.`,starterCode:`# MISSION: Safe Division
# Handle all division errors

def safe_divide(a, b):
    try:
        # Attempt division
        pass
    except ZeroDivisionError:
        # Handle divide by zero
        pass
    except TypeError:
        # Handle wrong types
        pass

# === Mission Control Test ===
print(safe_divide(100, 4))    # 25.0
print(safe_divide(100, 0))    # Warning, 0
print(safe_divide("100", 4))  # Error, None
print(safe_divide(100, "4"))  # Error, None`,hint:"ZeroDivisionError for b=0, TypeError for non-numeric types. Return appropriate values for each case.",conceptTags:["ZeroDivisionError","TypeError","robust design"]},{id:4,title:"File Safety Protocol",description:`Handle file-related errors gracefully.

Create read_mission_file(filename) that:
1. Simulates checking if a file exists (use a list of "existing" files)
2. If file exists: return "Contents of [filename]"
3. If not: raise and handle FileNotFoundError, return None

Existing files: ["log.txt", "data.csv", "config.ini"]`,starterCode:`# MISSION: File Safety
# Handle file access errors

def read_mission_file(filename):
    existing_files = ["log.txt", "data.csv", "config.ini"]
    
    try:
        # Check if file exists
        if filename not in existing_files:
            raise FileNotFoundError(f"File {filename} not found")
        # "Read" the file
        return f"Contents of {filename}"
    except FileNotFoundError as e:
        # Handle missing file
        pass

# === Mission Control Test ===
print(read_mission_file("log.txt"))      # Contents
print(read_mission_file("missing.txt"))  # Error, None`,hint:"Use 'raise' to trigger the error when file not in list. In except, print the error message and return None.",conceptTags:["FileNotFoundError","raise","custom errors"]},{id:5,title:"Input Validation Loop",description:`Create a robust input system that keeps asking until valid.

Create get_valid_temperature() that:
1. Loops until valid input received
2. Asks for temperature (float)
3. Must be between -273.15 and 1000 (valid range)
4. Handle non-numeric input with try-except
5. Check range with if statement
6. Return the valid temperature

User should see appropriate messages for each error type.`,starterCode:`# MISSION: Robust Input
# Validate until correct

def get_valid_temperature():
    while True:
        try:
            # Get input
            # Check range
            # Return if valid
            pass
        except ValueError:
            # Handle non-numeric
            pass

# === Mission Control Test ===
temp = get_valid_temperature()
print(f"Temperature set: {temp}°C")`,hint:"Use while True with return to exit when valid. Check ValueError first (conversion), then check range with if/else.",conceptTags:["validation loop","while","try-except","range check"]},{id:6,title:"Robust Mission System",description:`Build a complete robust system combining all error handling techniques.

Create a mission calculator that:
1. Gets mission distance (must be positive integer)
2. Gets fuel efficiency (must be positive float)
3. Gets available fuel (must be positive integer)

Calculates:
- Fuel needed = distance / efficiency
- Can complete = available >= needed

Handle ALL possible errors:
- Invalid types (ValueError)
- Division issues (ZeroDivisionError)
- Invalid ranges (custom validation)

Print a full mission report or appropriate error messages.`,starterCode:`# MISSION: Robust Calculator
# Complete error handling system

def get_positive_int(prompt):
    """Get a positive integer with validation"""
    while True:
        try:
            value = int(input(prompt))
            if value > 0:
                return value
            print("Must be positive!")
        except ValueError:
            print("Enter a whole number!")

def get_positive_float(prompt):
    """Get a positive float with validation"""
    # Implement similar to above
    pass

def calculate_mission():
    """Main mission calculator"""
    # Get all inputs with validation
    # Calculate fuel needed
    # Determine if mission is feasible
    # Print report
    pass

# === Mission Control Test ===
calculate_mission()`,hint:"Build helper functions for each input type. Use them in the main calculator. Handle division carefully (efficiency could be very small).",conceptTags:["synthesis","validation","modular design","complete system"]}],ng=[{title:"1. Big O Notation: Why It Matters",content:`Big O notation describes how an algorithm's performance scales as input size grows. It's the language we use to compare algorithms.

Key idea: We care about the GROWTH RATE, not exact time.
- Does it stay constant as data grows? O(1)
- Does it grow linearly with data? O(N)
- Does it grow quadratically? O(N²)
- Does it grow logarithmically? O(log N)

Why Big O matters for space missions:
- Processing 100 vs 1,000,000 sensor readings
- Searching databases with billions of records
- Real-time systems with strict time limits`,tableData:{headers:["Big O","Name","Example","1000 items"],rows:[["O(1)","Constant","Access arr[5]","~1 operation"],["O(log N)","Logarithmic","Binary search","~10 operations"],["O(N)","Linear","Linear search","~1000 operations"],["O(N log N)","Linearithmic","Efficient sorts","~10,000 operations"],["O(N²)","Quadratic","Nested loops","~1,000,000 operations"]]}},{title:"2. Calculating Big O",content:`Rules for calculating Big O:

1. DROP constants: O(3N) → O(N)
2. DROP smaller terms: O(N² + N) → O(N²)
3. COUNT the worst case: What happens with huge input?

Identify common patterns:
- Single loop over N items = O(N)
- Nested loops (loop inside loop) = O(N²)
- Halving the problem each step = O(log N)
- Direct access (no loops) = O(1)`,codeExample:`# O(1) - Constant time
def get_first(arr):
    return arr[0]  # Same time for any size array

# O(N) - Linear time
def find_max(arr):
    max_val = arr[0]
    for item in arr:  # One loop = O(N)
        if item > max_val:
            max_val = item
    return max_val

# O(N²) - Quadratic time
def find_pairs(arr):
    pairs = []
    for i in range(len(arr)):      # N times
        for j in range(len(arr)):  # N times each = N × N
            pairs.append((arr[i], arr[j]))
    return pairs  # N² pairs total

# O(log N) - Halving
def count_halves(n):
    count = 0
    while n > 1:
        n = n // 2  # Halves each time
        count += 1
    return count  # log₂(N) iterations`},{title:"3. Space vs Time Trade-offs",content:`Algorithms can trade memory for speed (or vice versa).

TIME COMPLEXITY: How long does it take?
SPACE COMPLEXITY: How much memory does it use?

Trade-off examples:
- Cache computed results: Uses MORE memory, runs FASTER
- Compute on-the-fly: Uses LESS memory, runs SLOWER
- Store sorted copy: Uses MORE memory, searches FASTER`,codeExample:`# Example: Counting character frequency

# Time-efficient (uses extra space)
def count_chars_fast(text):
    counts = {}  # O(N) extra space
    for char in text:  # O(N) time
        counts[char] = counts.get(char, 0) + 1
    return counts
# Time: O(N), Space: O(N)

# Space-efficient (slower)
def count_char_slow(text, target):
    count = 0
    for char in text:  # O(N) time
        if char == target:
            count += 1
    return count
# Time: O(N) per character × C characters = O(N×C)
# Space: O(1) - just one counter

# Which is better? Depends on your constraints!`},{title:"4. The Search Problem",content:`Searching is one of the most common operations in computing. Finding a specific item in a collection can be done in different ways, with different efficiency.

Real-world examples:
- Finding a contact in your phone
- Looking up a word in a dictionary
- Finding a star in a star catalog
- Locating a crew member in records

The METHOD you choose affects how FAST you find the answer.`,codeExample:`# The search problem:
star_catalog = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"]
target = "Gamma"

# Question: Where is "Gamma" in the list?
# Answer: Index 2

# But HOW do we find it efficiently?`},{title:"5. Linear Search: The Simple Approach",content:`Linear search checks EVERY element from the beginning until the target is found. Simple but can be slow for large datasets.

Process:
1. Start at index 0
2. Compare each element to target
3. If match found, return the index
4. If end reached without match, return -1

Time Complexity: O(N) - in the worst case, checks all N elements.`,codeExample:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i    # Found! Return index
    return -1           # Not found

# Example usage
planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter"]
index = linear_search(planets, "Earth")
print(f"Earth at index: {index}")  # 2

index = linear_search(planets, "Pluto")
print(f"Pluto at index: {index}")  # -1 (not found)`,tableData:{headers:["Advantages","Disadvantages"],rows:[["Works on ANY list","Slow for large lists"],["Simple to implement","Checks every element"],["No sorting required","O(N) time complexity"]]}},{title:"6. Tracing Linear Search",content:"Let's trace linear_search([45, 72, 38, 91, 55], 91):",tableData:{headers:["Step","i","arr[i]","arr[i] == target?","Action"],rows:[["1","0","45","45 == 91? No","Continue"],["2","1","72","72 == 91? No","Continue"],["3","2","38","38 == 91? No","Continue"],["4","3","91","91 == 91? Yes!","Return 3"]]},codeExample:`# Visualizing the search
arr = [45, 72, 38, 91, 55]
target = 91

# Step by step:
# i=0: 45 != 91, continue
# i=1: 72 != 91, continue
# i=2: 38 != 91, continue
# i=3: 91 == 91, FOUND! Return 3

# Total comparisons: 4`},{title:"7. Binary Search: Divide and Conquer",content:`Binary search is MUCH faster but ONLY works on SORTED data. It repeatedly divides the search space in half.

Process:
1. Start with low=0, high=len-1
2. Calculate mid = (low + high) // 2
3. If arr[mid] == target: FOUND!
4. If arr[mid] < target: search right half (low = mid + 1)
5. If arr[mid] > target: search left half (high = mid - 1)
6. Repeat until found or low > high

Time Complexity: O(log N) - halves the search space each step!`,codeExample:`def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid          # Found!
        elif arr[mid] < target:
            low = mid + 1       # Search right half
        else:
            high = mid - 1      # Search left half
    
    return -1                   # Not found

# IMPORTANT: Array must be sorted!
sorted_data = [10, 20, 30, 40, 50, 60, 70, 80]
print(binary_search(sorted_data, 50))  # 4`},{title:"8. Tracing Binary Search",content:"Let's trace binary_search([10, 20, 30, 40, 50, 60, 70], 50):",tableData:{headers:["Step","low","high","mid","arr[mid]","Comparison","Action"],rows:[["1","0","6","3","40","40 < 50","low = 4"],["2","4","6","5","60","60 > 50","high = 4"],["3","4","4","4","50","50 == 50","FOUND!"]]},codeExample:`# Visual representation
# [10, 20, 30, 40, 50, 60, 70]
#   0   1   2   3   4   5   6

# Step 1: mid=3, arr[3]=40 < 50, search right
# Step 2: mid=5, arr[5]=60 > 50, search left
# Step 3: mid=4, arr[4]=50 == 50, FOUND!
# Only 3 comparisons vs 5 for linear!`},{title:"9. O(N) vs O(log N) Comparison",content:"The difference becomes dramatic with large datasets!",tableData:{headers:["List Size","Linear Search (O(N))","Binary Search (O(log N))"],rows:[["10","Up to 10 checks","Up to 4 checks"],["100","Up to 100 checks","Up to 7 checks"],["1,000","Up to 1,000 checks","Up to 10 checks"],["1,000,000","Up to 1,000,000 checks","Up to 20 checks"],["1 billion","Up to 1 billion checks","Up to 30 checks"]]},codeExample:`# Key decision: When to use which?

# USE LINEAR SEARCH when:
# - Data is NOT sorted
# - List is small
# - You only search once (sorting cost not worth it)

# USE BINARY SEARCH when:
# - Data IS sorted (or worth sorting)
# - List is large
# - Multiple searches needed
# - Speed is critical`}],Wf=[{id:1,title:"Star Catalog Search",description:`Implement the standard linear search algorithm.

Write linear_search(arr, target) that:
1. Loops through arr using range(len(arr))
2. If arr[i] equals target, return i
3. If loop completes without finding, return -1

Test with:
- star_catalog = ["Sirius", "Canopus", "Arcturus", "Vega", "Rigel"]
- Search for "Vega" (should return 3)
- Search for "Sun" (should return -1)

MEMORIZE THIS PATTERN!`,starterCode:`# MISSION: Star Catalog Search
# Implement linear search exactly as shown

def linear_search(arr, target):
    # Your implementation - MEMORIZE THIS!
    pass

# === Mission Control Test ===
star_catalog = ["Sirius", "Canopus", "Arcturus", "Vega", "Rigel"]

result1 = linear_search(star_catalog, "Vega")
print(f"Vega found at index: {result1}")

result2 = linear_search(star_catalog, "Sun")
print(f"Sun found at index: {result2}")`,hint:"for i in range(len(arr)): if arr[i] == target: return i. Don't forget return -1 AFTER the loop.",conceptTags:["linear search","algorithm","memorize"]},{id:2,title:"Search Efficiency Counter",description:`Modify linear search to count how many comparisons it makes.

Write linear_search_count(arr, target) that:
1. Performs linear search
2. Counts every comparison made
3. Returns a tuple: (index_found, comparison_count)
4. If not found, return (-1, comparison_count)

Test with [45, 72, 38, 91, 55]:
- Search for 91: should return (3, 4) - found at 3, took 4 comparisons
- Search for 99: should return (-1, 5) - not found, checked all 5`,starterCode:`# MISSION: Search Counter
# Track algorithm efficiency

def linear_search_count(arr, target):
    comparisons = 0
    # Implement search, incrementing comparisons each check
    pass

# === Mission Control Test ===
data = [45, 72, 38, 91, 55]

idx, count = linear_search_count(data, 91)
print(f"Found at {idx}, took {count} comparisons")

idx, count = linear_search_count(data, 99)
print(f"Found at {idx}, took {count} comparisons")`,hint:"Add comparisons += 1 before each if arr[i] == target check. Return (i, comparisons) when found.",conceptTags:["linear search","complexity","counting"]},{id:3,title:"Sorted Database Search",description:`Implement the standard binary search algorithm.

Write binary_search(arr, target) that:
1. Uses low = 0, high = len(arr) - 1
2. While low <= high:
   - Calculate mid = (low + high) // 2
   - If arr[mid] == target: return mid
   - If arr[mid] < target: low = mid + 1
   - Else: high = mid - 1
3. Return -1 if not found

Test with sorted data: [10, 20, 30, 40, 50, 60, 70, 80]
- Search for 50 (should return 4)
- Search for 25 (should return -1)

MEMORIZE THIS PATTERN!`,starterCode:`# MISSION: Binary Search Implementation
# Implement binary search exactly as shown

def binary_search(arr, target):
    # Your implementation - MEMORIZE THIS!
    low = 0
    high = len(arr) - 1
    
    # while low <= high:
    #     ...
    pass

# === Mission Control Test ===
sorted_data = [10, 20, 30, 40, 50, 60, 70, 80]

result1 = binary_search(sorted_data, 50)
print(f"50 found at index: {result1}")

result2 = binary_search(sorted_data, 25)
print(f"25 found at index: {result2}")`,hint:"mid = (low + high) // 2. Compare arr[mid] with target. Adjust low or high based on comparison.",conceptTags:["binary search","algorithm","memorize"]},{id:4,title:"Search Algorithm Comparison",description:`Compare the efficiency of linear vs binary search.

Create both search functions with comparison counting:
- linear_search_count(arr, target) - returns (index, comparisons)
- binary_search_count(arr, target) - returns (index, comparisons)

Test both on sorted_data = [i for i in range(1, 101)] (1 to 100)
Search for: 50, 1, 100, 73

Print comparison counts for each search and algorithm.`,starterCode:`# MISSION: Algorithm Comparison
# Compare search efficiency

def linear_search_count(arr, target):
    comparisons = 0
    # Implement with counting
    pass

def binary_search_count(arr, target):
    comparisons = 0
    # Implement with counting
    pass

# === Mission Control Test ===
sorted_data = [i for i in range(1, 101)]  # 1 to 100
targets = [50, 1, 100, 73]

print("=== SEARCH COMPARISON ===")
for target in targets:
    lin_idx, lin_count = linear_search_count(sorted_data, target)
    bin_idx, bin_count = binary_search_count(sorted_data, target)
    print(f"Target {target}:")
    print(f"  Linear: {lin_count} comparisons")
    print(f"  Binary: {bin_count} comparisons")`,hint:"In binary search, count comparisons in the while loop. Binary should be MUCH fewer, especially for items in the middle.",conceptTags:["comparison","efficiency","O(N) vs O(log N)"]},{id:5,title:"Adaptive Search System",description:`Create a smart search system that chooses the best algorithm.

Create smart_search(arr, target) that:
1. First checks if the array is sorted
2. If sorted: use binary search (more efficient)
3. If not sorted: use linear search (only option)
4. Print which algorithm was used
5. Return the index found

Helper function is_sorted(arr):
- Return True if all arr[i] <= arr[i+1]
- Return False otherwise`,starterCode:`# MISSION: Adaptive Search
# Choose the best algorithm automatically

def is_sorted(arr):
    # Check if array is in ascending order
    pass

def linear_search(arr, target):
    # Standard implementation
    pass

def binary_search(arr, target):
    # Standard implementation
    pass

def smart_search(arr, target):
    # Check if sorted
    # Choose appropriate algorithm
    # Print which was used
    # Return result
    pass

# === Mission Control Test ===
sorted_missions = [10, 20, 30, 40, 50]
unsorted_readings = [45, 12, 78, 23, 56]

print("Searching sorted data:")
print(smart_search(sorted_missions, 30))

print("\\nSearching unsorted data:")
print(smart_search(unsorted_readings, 78))`,hint:"is_sorted: loop from 0 to len-2, check if arr[i] > arr[i+1] ever. smart_search: if is_sorted(arr): use binary else use linear.",conceptTags:["synthesis","algorithm selection","sorted check"]}],ig=[{title:"1. The Importance of Sorting",content:`Sorting is fundamental to computing. Organized data enables:
- Efficient searching (binary search requires sorted data!)
- Finding patterns and duplicates
- Displaying information meaningfully
- Efficient data processing

Many advanced algorithms depend on sorted data. Understanding sorting algorithms teaches core algorithmic thinking.`,codeExample:`# Unsorted data is hard to work with
readings = [45, 12, 78, 23, 56, 8, 91]

# Sorted data reveals patterns
sorted_readings = [8, 12, 23, 45, 56, 78, 91]
# Easy to find: min=8, max=91, median=45`},{title:"2. Bubble Sort: Adjacent Swapping",content:`Bubble sort compares adjacent elements and swaps them if out of order. Larger values "bubble up" to the end with each pass.

Process:
1. Compare arr[0] and arr[1], swap if needed
2. Compare arr[1] and arr[2], swap if needed
3. Continue to end - largest now at end
4. Repeat, but stop one earlier each time
5. Stop early if no swaps made (already sorted!)

Time Complexity: O(N^2) - nested loops`,codeExample:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):  # -i because end is sorted
            if arr[j] > arr[j + 1]:
                # Swap adjacent elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # Optimization: already sorted!
    return arr`},{title:"3. Tracing Bubble Sort",content:"Let's trace bubble_sort([64, 34, 25, 12]):",tableData:{headers:["Pass","Array State","Comparisons","Swaps"],rows:[["Start","[64, 34, 25, 12]","-","-"],["Pass 1","[34, 25, 12, 64]","3","3"],["Pass 2","[25, 12, 34, 64]","2","2"],["Pass 3","[12, 25, 34, 64]","1","1"],["Done!","[12, 25, 34, 64]","Total: 6","Total: 6"]]},codeExample:`# Pass 1 in detail:
# [64, 34, 25, 12]
#   ↓   ↓
# 64 > 34? Yes, swap → [34, 64, 25, 12]
#       ↓   ↓
# 64 > 25? Yes, swap → [34, 25, 64, 12]
#           ↓   ↓
# 64 > 12? Yes, swap → [34, 25, 12, 64]
# 64 is now in correct position!`},{title:"4. Selection Sort: Finding Minimum",content:`Selection sort finds the minimum element and puts it in the correct position, one at a time.

Process:
1. Find minimum in entire array
2. Swap it with first element
3. Find minimum in remaining array (index 1 onwards)
4. Swap it with second element
5. Continue until sorted

Time Complexity: O(N^2) - nested loops`,codeExample:`def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        # Find minimum in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum with current position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`},{title:"5. Tracing Selection Sort",content:"Let's trace selection_sort([64, 25, 12, 22]):",tableData:{headers:["Pass","Sorted | Unsorted","Min Found","Swap"],rows:[["Start","[ | 64, 25, 12, 22]","-","-"],["Pass 1","[12 | 25, 64, 22]","12 at idx 2","64↔12"],["Pass 2","[12, 22 | 64, 25]","22 at idx 3","25↔22"],["Pass 3","[12, 22, 25 | 64]","25 at idx 2","64↔25"],["Done!","[12, 22, 25, 64]","-","-"]]},codeExample:`# Pass 1 in detail:
# [64, 25, 12, 22]  
#  i=0
# Find min from index 0 to end: 12 at index 2
# Swap arr[0] with arr[2]
# [12, 25, 64, 22]
# Now 12 is in its final position!`},{title:"6. Comparing Bubble and Selection Sort",content:"Both are O(N^2) but have different characteristics:",tableData:{headers:["Aspect","Bubble Sort","Selection Sort"],rows:[["Comparisons","O(N^2)","O(N^2) - same"],["Swaps","Many (adjacent)","Few (N-1 max)"],["Early Exit","Yes (if sorted)","No"],["Stability","Stable","Not stable"],["Best For","Nearly sorted data","Minimizing writes"]]},codeExample:`# For nearly sorted data [1, 2, 4, 3, 5]:
# Bubble sort: Just 1 swap (4 and 3), can exit early
# Selection sort: Still does all passes

# For random data:
# Selection sort makes fewer swaps total
# Bubble sort may swap more frequently

# Both have O(N^2) worst case
# For small lists (<50 items), both are fine
# For large lists, use built-in sort (O(N log N))`}],Jf=[{id:1,title:"Priority Sort - Bubble",description:`Implement bubble sort to organize mission priorities.

Write bubble_sort(arr) that:
1. Uses nested loops (outer: n-1 passes, inner: adjacent comparisons)
2. Compares arr[j] and arr[j+1]
3. Swaps if arr[j] > arr[j+1]
4. Includes the optimization: early exit if no swaps in a pass
5. Returns the sorted array

Test with: priorities = [64, 34, 25, 12, 22, 11, 90]

MEMORIZE THIS PATTERN!`,starterCode:`# MISSION: Bubble Sort Implementation
# Sort mission priorities

def bubble_sort(arr):
    n = len(arr)
    # Outer loop: number of passes
    # Inner loop: compare adjacent elements
    # Track swaps for early exit
    pass

# === Mission Control Test ===
priorities = [64, 34, 25, 12, 22, 11, 90]
print(f"Before: {priorities}")
sorted_list = bubble_sort(priorities.copy())
print(f"After: {sorted_list}")`,hint:"for i in range(n-1): swapped=False, for j in range(n-1-i): compare and swap. Don't forget arr[j], arr[j+1] = arr[j+1], arr[j] for swap.",conceptTags:["bubble sort","algorithm","memorize"]},{id:2,title:"Crew Ranking - Selection",description:`Implement selection sort to rank crew by experience.

Write selection_sort(arr) that:
1. For each position i from 0 to n-2:
2. Find the index of minimum value from i to end
3. Swap arr[i] with arr[min_idx]
4. Returns the sorted array

Test with: experience = [15, 8, 23, 4, 16, 42]

MEMORIZE THIS PATTERN!`,starterCode:`# MISSION: Selection Sort Implementation
# Sort crew by experience

def selection_sort(arr):
    n = len(arr)
    # For each position in array
    # Find minimum in remaining unsorted portion
    # Swap minimum into current position
    pass

# === Mission Control Test ===
experience = [15, 8, 23, 4, 16, 42]
print(f"Before: {experience}")
sorted_list = selection_sort(experience.copy())
print(f"After: {sorted_list}")`,hint:"for i in range(n-1): min_idx = i, for j in range(i+1, n): if arr[j] < arr[min_idx]: min_idx = j. Then swap arr[i] with arr[min_idx].",conceptTags:["selection sort","algorithm","memorize"]},{id:3,title:"Sorting Efficiency Analysis",description:`Modify both algorithms to count operations.

Create:
- bubble_sort_count(arr) → returns (sorted_arr, comparisons, swaps)
- selection_sort_count(arr) → returns (sorted_arr, comparisons, swaps)

Count:
- Comparisons: Each if statement comparing elements
- Swaps: Each time elements are exchanged

Test both with: [45, 23, 78, 12, 56, 89, 34]

Compare the number of swaps!`,starterCode:`# MISSION: Sort Analysis
# Count operations for efficiency comparison

def bubble_sort_count(arr):
    arr = arr.copy()  # Don't modify original
    comparisons = 0
    swaps = 0
    # Implement with counting
    pass

def selection_sort_count(arr):
    arr = arr.copy()
    comparisons = 0
    swaps = 0
    # Implement with counting
    pass

# === Mission Control Test ===
data = [45, 23, 78, 12, 56, 89, 34]

sorted1, comp1, swap1 = bubble_sort_count(data)
sorted2, comp2, swap2 = selection_sort_count(data)

print(f"Bubble Sort: {comp1} comparisons, {swap1} swaps")
print(f"Selection Sort: {comp2} comparisons, {swap2} swaps")`,hint:"Add comparisons += 1 before each if comparison. Add swaps += 1 each time you do arr[x], arr[y] = arr[y], arr[x].",conceptTags:["analysis","counting","efficiency"]},{id:4,title:"Visual Sort Tracer",description:`Create sorting functions that show each step.

Create visual_bubble_sort(arr) that:
1. Prints the array before starting
2. After each pass, prints: "Pass X: [array state]"
3. At the end, prints: "Sorted in X passes"

Create visual_selection_sort(arr) that:
1. Prints the array before starting
2. After each swap, prints: "Step X: Swapped [val1] and [val2] → [array state]"
3. At the end, prints: "Sorted with X swaps"

This helps visualize how the algorithms work!`,starterCode:`# MISSION: Visual Sort Trace
# Show sorting process step by step

def visual_bubble_sort(arr):
    arr = arr.copy()
    print(f"Starting: {arr}")
    # Implement with print after each pass
    pass

def visual_selection_sort(arr):
    arr = arr.copy()
    print(f"Starting: {arr}")
    # Implement with print after each swap
    pass

# === Mission Control Test ===
test_data = [64, 34, 25, 12]

print("=== BUBBLE SORT ===")
visual_bubble_sort(test_data)

print("\\n=== SELECTION SORT ===")
visual_selection_sort(test_data)`,hint:'Add print(f"Pass {i+1}: {arr}") after the inner loop in bubble sort. For selection, print the values being swapped.',conceptTags:["visualization","tracing","understanding"]}],sg=[{title:"1. Introduction to Object-Oriented Programming",content:`Object-Oriented Programming (OOP) organizes code around "objects" that combine data (attributes) and functions (methods).

Think of a spacecraft:
- Attributes: name, fuel_level, crew_count, position
- Methods: launch(), dock(), refuel()

A class is the BLUEPRINT, an object is an INSTANCE created from that blueprint. You can create many objects from one class!`,codeExample:`# Without OOP (procedural):
spacecraft1_name = "Apollo"
spacecraft1_fuel = 100

def launch_spacecraft(name, fuel):
    print(f"{name} launching with {fuel}% fuel")

launch_spacecraft(spacecraft1_name, spacecraft1_fuel)

# With OOP:
# The spacecraft knows its own name and fuel
# And knows how to launch itself!`},{title:"2. Creating a Class",content:`A class is defined with the class keyword. By convention, class names use PascalCase (capitalize each word).

The simplest class just defines a name. But real classes have:
- A constructor (__init__)
- Attributes (data)
- Methods (behavior)`,codeExample:`# Simple class definition
class Spacecraft:
    pass  # Empty for now

# Create an instance (object)
ship = Spacecraft()
print(type(ship))  # <class '__main__.Spacecraft'>

# The class is the blueprint
# 'ship' is an object/instance of that class`},{title:"3. The Constructor: __init__",content:`The __init__ method is called automatically when creating an object. It initializes the object's attributes.

The first parameter is always 'self', which refers to the object being created. Other parameters receive values passed during creation.`,codeExample:`class Spacecraft:
    def __init__(self, name, fuel_capacity):
        # 'self' refers to the object being created
        self.name = name
        self.fuel = fuel_capacity
        self.crew = 0  # Default value

# Create objects with different data
apollo = Spacecraft("Apollo 11", 100)
discovery = Spacecraft("Discovery", 150)

print(apollo.name)      # "Apollo 11"
print(discovery.fuel)   # 150
print(apollo.crew)      # 0`},{title:"4. Instance Attributes",content:`Attributes are variables that belong to an object. Each object has its own copy of attributes.

Attributes are accessed and modified using dot notation: object.attribute`,codeExample:`class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100
        self.position = [0, 0, 0]

ship = Spacecraft("Enterprise")

# Access attributes
print(ship.name)      # "Enterprise"
print(ship.fuel)      # 100

# Modify attributes
ship.fuel = 80
ship.position = [100, 50, 25]
print(ship.fuel)      # 80

# Each object has separate attributes
ship2 = Spacecraft("Voyager")
print(ship2.fuel)     # Still 100 (different object)`},{title:"5. Methods: Class Functions",content:"Methods are functions defined inside a class. They always have 'self' as their first parameter, which lets them access the object's attributes.",codeExample:`class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    
    def status(self):
        """Method with no extra parameters"""
        print(f"{self.name}: {self.fuel}% fuel")
    
    def refuel(self, amount):
        """Method with parameter"""
        self.fuel += amount
        if self.fuel > 100:
            self.fuel = 100
        print(f"{self.name} refueled to {self.fuel}%")

# Using methods
ship = Spacecraft("Apollo", 60)
ship.status()        # "Apollo: 60% fuel"
ship.refuel(30)      # "Apollo refueled to 90%"
ship.status()        # "Apollo: 90% fuel"`},{title:"6. Using Dot Notation",content:`Dot notation connects an object to its attributes and methods:
- object.attribute - access or modify data
- object.method() - call a function

Think of the dot as saying "belonging to" or "of this object".`,codeExample:`class Astronaut:
    def __init__(self, name, role):
        self.name = name
        self.role = role
        self.missions = 0
    
    def complete_mission(self):
        self.missions += 1
        return f"{self.name} completed mission #{self.missions}"

# Create and use object
neil = Astronaut("Neil Armstrong", "Commander")

# Dot notation for attributes
print(neil.name)         # "Neil Armstrong"
print(neil.missions)     # 0

# Dot notation for methods
result = neil.complete_mission()
print(result)            # "Neil Armstrong completed mission #1"
print(neil.missions)     # 1`},{title:"7. Creating Multiple Objects",content:`One class can create many objects. Each object is independent with its own attribute values.

This is the power of OOP - define the blueprint once, create as many instances as needed!`,codeExample:`class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    
    def launch(self):
        if self.fuel >= 50:
            self.fuel -= 50
            return f"{self.name} launched! Fuel: {self.fuel}%"
        return f"{self.name} insufficient fuel!"

# Create fleet of spacecraft
apollo = Spacecraft("Apollo", 100)
voyager = Spacecraft("Voyager", 80)
discovery = Spacecraft("Discovery", 40)

# Each operates independently
print(apollo.launch())      # Launched, fuel: 50%
print(voyager.launch())     # Launched, fuel: 30%
print(discovery.launch())   # Insufficient fuel!

# Changes to one don't affect others
print(apollo.fuel)    # 50
print(voyager.fuel)   # 30`}],Pf=[{id:1,title:"Basic Spacecraft Class",description:`Create your first class: Spacecraft

The class should have:
1. An __init__ that takes 'name' and 'fuel' parameters
2. Store these as self.name and self.fuel
3. A method status() that prints: "[name] - Fuel: [fuel]%"

Create two spacecraft:
- apollo with name "Apollo 11" and fuel 95
- voyager with name "Voyager 1" and fuel 100

Call status() on both.`,starterCode:`# MISSION: First Spacecraft Class
# Define the Spacecraft class

class Spacecraft:
    # Define __init__ with name and fuel parameters
    
    # Define status() method
    pass

# === Mission Control Test ===
apollo = Spacecraft("Apollo 11", 95)
voyager = Spacecraft("Voyager 1", 100)

apollo.status()
voyager.status()`,hint:'def __init__(self, name, fuel): then self.name = name, self.fuel = fuel. For status: def status(self): print(f"...").',conceptTags:["class","__init__","attributes","methods"]},{id:2,title:"Astronaut Constructor",description:`Create an Astronaut class with a complete constructor.

The __init__ should take:
- name (required)
- role (required)
- years_experience (required)

And set default values for:
- missions_completed = 0
- is_active = True

Create three astronauts with different data and print their details.`,starterCode:`# MISSION: Astronaut Constructor
# Create a well-constructed class

class Astronaut:
    def __init__(self, name, role, years_experience):
        # Set all attributes
        pass
    
    def info(self):
        # Print all astronaut details
        pass

# === Mission Control Test ===
neil = Astronaut("Neil Armstrong", "Commander", 10)
buzz = Astronaut("Buzz Aldrin", "Pilot", 8)
michael = Astronaut("Michael Collins", "Module Pilot", 7)

neil.info()
buzz.info()
michael.info()`,hint:"In __init__: self.name = name, self.role = role, self.years_experience = years_experience, self.missions_completed = 0, self.is_active = True.",conceptTags:["__init__","multiple attributes","default values"]},{id:3,title:"Spacecraft Operations",description:`Add methods with parameters to the Spacecraft class.

Create Spacecraft with:
- Attributes: name, fuel (starts at 100), position (starts at 0)
- Methods:
  - launch() - if fuel >= 20, reduce fuel by 20, return "Launched!"
  - travel(distance) - if fuel >= distance/10, reduce fuel, add to position
  - refuel(amount) - add amount to fuel, cap at 100
  - status() - print name, fuel, position

Test all methods!`,starterCode:`# MISSION: Spacecraft Methods
# Add operational methods

class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100
        self.position = 0
    
    def launch(self):
        # Check fuel, reduce if launched
        pass
    
    def travel(self, distance):
        # Calculate fuel needed (distance / 10)
        # Travel if enough fuel
        pass
    
    def refuel(self, amount):
        # Add fuel, max 100
        pass
    
    def status(self):
        # Print all info
        pass

# === Mission Control Test ===
ship = Spacecraft("Enterprise")
ship.status()
print(ship.launch())
ship.travel(200)
ship.status()
ship.refuel(50)
ship.status()`,hint:"For travel: fuel_needed = distance / 10. Check if self.fuel >= fuel_needed before traveling. Update both fuel and position.",conceptTags:["methods","parameters","conditional logic"]},{id:4,title:"Fuel Calculator",description:`Create a FuelTank class that returns useful information.

Attributes:
- capacity (set in __init__)
- current_level (starts at 0)

Methods:
- fill(amount) - add fuel, return amount actually added (cap at capacity)
- use(amount) - remove fuel, return amount actually used (can't go negative)
- percentage() - return current level as % of capacity
- is_empty() - return True if current_level is 0
- is_full() - return True if current_level equals capacity

All methods should RETURN values, not just print.`,starterCode:`# MISSION: Fuel Tank with Returns
# Methods that return useful data

class FuelTank:
    def __init__(self, capacity):
        self.capacity = capacity
        self.current_level = 0
    
    def fill(self, amount):
        # Add fuel, return amount actually added
        pass
    
    def use(self, amount):
        # Use fuel, return amount actually used
        pass
    
    def percentage(self):
        # Return percentage full
        pass
    
    def is_empty(self):
        # Return True/False
        pass
    
    def is_full(self):
        # Return True/False
        pass

# === Mission Control Test ===
tank = FuelTank(100)
print(f"Empty? {tank.is_empty()}")      # True
print(f"Filled: {tank.fill(80)}")       # 80
print(f"Percentage: {tank.percentage()}%")  # 80.0
print(f"Used: {tank.use(30)}")          # 30
print(f"Full? {tank.is_full()}")        # False`,hint:"For fill: space = self.capacity - self.current_level, added = min(amount, space), then add and return added. Similar logic for use.",conceptTags:["return values","calculations","boolean returns"]},{id:5,title:"Mission with Crew",description:`Create two classes that work together.

Astronaut class:
- name, role attributes
- info() method returns formatted string

Mission class:
- name, destination attributes
- crew = [] (empty list)
- add_crew(astronaut) - add to crew list
- crew_count() - return number of crew
- launch_report() - print mission details including all crew

This demonstrates objects containing other objects!`,starterCode:`# MISSION: Related Classes
# Objects containing objects

class Astronaut:
    def __init__(self, name, role):
        pass
    
    def info(self):
        # Return "Name (Role)"
        pass

class Mission:
    def __init__(self, name, destination):
        self.name = name
        self.destination = destination
        self.crew = []
    
    def add_crew(self, astronaut):
        # Add astronaut to crew list
        pass
    
    def crew_count(self):
        pass
    
    def launch_report(self):
        # Print full mission report
        pass

# === Mission Control Test ===
neil = Astronaut("Neil Armstrong", "Commander")
buzz = Astronaut("Buzz Aldrin", "Pilot")
michael = Astronaut("Michael Collins", "Module Pilot")

apollo11 = Mission("Apollo 11", "Moon")
apollo11.add_crew(neil)
apollo11.add_crew(buzz)
apollo11.add_crew(michael)
apollo11.launch_report()`,hint:"add_crew: self.crew.append(astronaut). In launch_report, loop through self.crew and call each astronaut's info() method.",conceptTags:["composition","lists of objects","object interaction"]},{id:6,title:"Docking Procedure",description:`Create spacecraft that can interact with each other.

Spacecraft class:
- name, fuel, docked_with (None initially)
- dock_with(other_ship) - set both ships' docked_with to each other
- undock() - set both docked_with back to None
- transfer_fuel(amount, to_ship) - move fuel between ships
- status() - print name, fuel, and docked status

Demonstrate docking two ships and transferring fuel.`,starterCode:`# MISSION: Spacecraft Docking
# Objects interacting with each other

class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
        self.docked_with = None
    
    def dock_with(self, other_ship):
        # Connect both ships
        pass
    
    def undock(self):
        # Disconnect both ships
        pass
    
    def transfer_fuel(self, amount, to_ship):
        # Move fuel to another ship
        pass
    
    def status(self):
        docked = self.docked_with.name if self.docked_with else "None"
        print(f"{self.name}: Fuel={self.fuel}, Docked={docked}")

# === Mission Control Test ===
station = Spacecraft("ISS", 500)
shuttle = Spacecraft("Endeavour", 100)

station.status()
shuttle.status()

shuttle.dock_with(station)
station.status()
shuttle.status()

station.transfer_fuel(200, shuttle)
station.status()
shuttle.status()`,hint:"dock_with: self.docked_with = other_ship AND other_ship.docked_with = self. transfer_fuel: self.fuel -= amount, to_ship.fuel += amount (add checks!).",conceptTags:["object interaction","mutual references","fuel transfer"]},{id:7,title:"Complete Fleet System",description:`Create a full fleet management system.

Fleet class:
- name attribute
- ships = [] (list of Spacecraft objects)
- add_ship(ship) - add to fleet
- remove_ship(ship_name) - remove by name
- total_fuel() - sum of all ships' fuel
- fleet_status() - print all ships
- launch_all() - launch all ships with fuel > 50

Spacecraft class (provided):
- name, fuel attributes
- launch() method

Create a fleet with 4 ships and demonstrate all fleet operations.`,starterCode:`# MISSION: Fleet Management
# Managing multiple objects

class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
        self.launched = False
    
    def launch(self):
        if self.fuel >= 50:
            self.fuel -= 50
            self.launched = True
            return f"{self.name} launched!"
        return f"{self.name} insufficient fuel"
    
    def status(self):
        state = "Launched" if self.launched else "Docked"
        return f"{self.name}: {self.fuel}% fuel, {state}"

class Fleet:
    def __init__(self, name):
        self.name = name
        self.ships = []
    
    def add_ship(self, ship):
        pass
    
    def remove_ship(self, ship_name):
        pass
    
    def total_fuel(self):
        pass
    
    def fleet_status(self):
        pass
    
    def launch_all(self):
        pass

# === Mission Control Test ===
fleet = Fleet("NASA Fleet")
fleet.add_ship(Spacecraft("Apollo", 100))
fleet.add_ship(Spacecraft("Voyager", 80))
fleet.add_ship(Spacecraft("Discovery", 40))
fleet.add_ship(Spacecraft("Enterprise", 75))

fleet.fleet_status()
print(f"Total fuel: {fleet.total_fuel()}")
fleet.launch_all()
fleet.fleet_status()`,hint:"add_ship: self.ships.append(ship). total_fuel: sum with loop or sum(ship.fuel for ship in self.ships). launch_all: loop through ships, check fuel, call launch().",conceptTags:["synthesis","fleet management","list of objects","aggregate operations"]}],lg=[{title:"1. The Problem with Open Access",content:`In Level 12, any code could directly modify object attributes. This can cause problems:

- Invalid values (negative fuel, crew of -5)
- Breaking object invariants (speed faster than light?)
- Hard to debug (who changed this value?)

Encapsulation means HIDING internal data and providing controlled access through methods.`,codeExample:`# Problem: Direct access allows invalid state
class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100

ship = Spacecraft("Apollo")
ship.fuel = -500      # Invalid! But Python allows it
ship.fuel = "banana"  # Wrong type! But allowed

# Solution: Control access through methods
# (Coming up next!)`},{title:"2. Static (Class) Variables",content:`Static variables belong to the CLASS, not individual objects. All objects share the same value.

- Instance variable: self.name = value (each object has its own)
- Static variable: defined inside class but outside __init__`,codeExample:`class Spacecraft:
    # Static variable - shared by ALL spacecraft
    total_count = 0
    speed_of_light = 299792  # km/s - constant
    
    def __init__(self, name):
        # Instance variable - each object has its own
        self.name = name
        Spacecraft.total_count += 1  # Increment class variable

# Create objects
apollo = Spacecraft("Apollo")
voyager = Spacecraft("Voyager")
discovery = Spacecraft("Discovery")

# Static variable is shared
print(Spacecraft.total_count)  # 3
print(apollo.total_count)      # 3 (same value)
print(voyager.total_count)     # 3 (same value)

# Instance variables are separate
print(apollo.name)    # "Apollo"
print(voyager.name)   # "Voyager"`},{title:"3. Marking Attributes as Private",content:`In Python, we use an underscore prefix (_name) to indicate an attribute should be treated as private.

This is a CONVENTION - Python doesn't enforce it, but good programmers respect it. It means "don't access this directly from outside the class."`,codeExample:`class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name          # Public - OK to access
        self._fuel = fuel         # Private - use methods instead
        self._crew_count = 0      # Private
    
    def get_fuel(self):
        return self._fuel
    
    def set_fuel(self, value):
        if 0 <= value <= 100:
            self._fuel = value
        else:
            print("Invalid fuel level!")

ship = Spacecraft("Apollo", 80)

# Good practice: Use methods
print(ship.get_fuel())  # 80
ship.set_fuel(90)       # Works

# Bad practice (but Python allows it):
# print(ship._fuel)     # Works but violates convention`},{title:"4. Getters: Controlled Reading",content:`A getter method returns the value of a private attribute. It can also:
- Format the value before returning
- Calculate derived values
- Log access for debugging`,codeExample:`class Astronaut:
    def __init__(self, name, age):
        self._name = name
        self._age = age
        self._missions = []
    
    # Simple getter
    def get_name(self):
        return self._name
    
    # Getter with formatting
    def get_age(self):
        return f"{self._age} years old"
    
    # Getter with calculation
    def get_mission_count(self):
        return len(self._missions)
    
    # Getter that returns a copy (protects list)
    def get_missions(self):
        return self._missions.copy()

neil = Astronaut("Neil Armstrong", 38)
print(neil.get_name())          # "Neil Armstrong"
print(neil.get_age())           # "38 years old"
print(neil.get_mission_count()) # 0`},{title:"5. Setters: Controlled Writing",content:`A setter method changes a private attribute BUT can include validation to prevent invalid values.

This is where encapsulation really pays off - you can enforce rules!`,codeExample:`class Spacecraft:
    def __init__(self, name):
        self._name = name
        self._fuel = 100
        self._speed = 0
    
    # Setter with range validation
    def set_fuel(self, value):
        if value < 0:
            print("Error: Fuel cannot be negative")
        elif value > 100:
            print("Error: Fuel cannot exceed 100%")
        else:
            self._fuel = value
            print(f"Fuel set to {value}%")
    
    # Setter with maximum limit
    def set_speed(self, value):
        MAX_SPEED = 50000  # km/s
        if value < 0:
            self._speed = 0
        elif value > MAX_SPEED:
            self._speed = MAX_SPEED
            print(f"Speed capped at {MAX_SPEED}")
        else:
            self._speed = value

ship = Spacecraft("Apollo")
ship.set_fuel(80)      # "Fuel set to 80%"
ship.set_fuel(-10)     # "Error: Fuel cannot be negative"
ship.set_fuel(150)     # "Error: Fuel cannot exceed 100%"
ship.set_speed(100000) # "Speed capped at 50000"`},{title:"6. Complete Encapsulated Class",content:"Here's a fully encapsulated class with private attributes, getters, setters, and validation. The internal state is protected!",codeExample:`class FuelTank:
    # Static variable
    MAX_CAPACITY = 1000
    
    def __init__(self, capacity):
        self._capacity = min(capacity, FuelTank.MAX_CAPACITY)
        self._current = 0
        self._is_locked = False
    
    # Getters
    def get_level(self):
        return self._current
    
    def get_percentage(self):
        return (self._current / self._capacity) * 100
    
    def is_empty(self):
        return self._current == 0
    
    # Setters with validation
    def add_fuel(self, amount):
        if self._is_locked:
            return "Tank is locked!"
        if amount < 0:
            return "Cannot add negative fuel"
        
        space = self._capacity - self._current
        added = min(amount, space)
        self._current += added
        return f"Added {added} units"
    
    def lock(self):
        self._is_locked = True
    
    def unlock(self):
        self._is_locked = False

tank = FuelTank(500)
print(tank.add_fuel(200))  # "Added 200 units"
print(tank.get_percentage())  # 40.0
tank.lock()
print(tank.add_fuel(100))  # "Tank is locked!"`}],eh=[{id:1,title:"Spacecraft Counter",description:`Use a static variable to count all spacecraft created.

Create Spacecraft class with:
- Static variable: total_created = 0
- __init__ takes name, increments total_created
- Static method get_total() returns total_created

Create 5 spacecraft and verify the count is correct.`,starterCode:`# MISSION: Spacecraft Counter
# Track total spacecraft using static variable

class Spacecraft:
    # Static variable - shared by all
    total_created = 0
    
    def __init__(self, name):
        # Increment the class variable
        pass
    
    @staticmethod
    def get_total():
        # Return the total count
        pass

# === Mission Control Test ===
apollo = Spacecraft("Apollo")
voyager = Spacecraft("Voyager")
discovery = Spacecraft("Discovery")
enterprise = Spacecraft("Enterprise")
endeavour = Spacecraft("Endeavour")

print(f"Total spacecraft created: {Spacecraft.get_total()}")  # 5`,hint:"In __init__: Spacecraft.total_created += 1. In get_total: return Spacecraft.total_created.",conceptTags:["static variable","class variable","counter"]},{id:2,title:"Secure Crew Record",description:`Create a crew record with private attributes.

CrewMember class:
- Private attributes: _name, _clearance_level, _password
- __init__ takes name, clearance_level, password
- All attributes should be private (underscore prefix)

Add getter methods:
- get_name() - returns name
- get_clearance() - returns clearance level
- verify_password(attempt) - returns True if correct, False otherwise

NO direct access to _password should reveal the password!`,starterCode:`# MISSION: Secure Crew Records
# Protect sensitive data with private attributes

class CrewMember:
    def __init__(self, name, clearance_level, password):
        # Store as private attributes
        pass
    
    def get_name(self):
        pass
    
    def get_clearance(self):
        pass
    
    def verify_password(self, attempt):
        # Check password without exposing it
        pass

# === Mission Control Test ===
neil = CrewMember("Neil Armstrong", 5, "moonwalk1969")

print(neil.get_name())           # "Neil Armstrong"
print(neil.get_clearance())      # 5
print(neil.verify_password("wrong"))      # False
print(neil.verify_password("moonwalk1969"))  # True`,hint:"Store as self._name, self._clearance_level, self._password. verify_password: return self._password == attempt.",conceptTags:["private attributes","getters","password security"]},{id:3,title:"Safe Fuel System",description:`Create a fuel system with validated setters.

FuelSystem class:
- Private: _fuel_level (starts at 0)
- Private: _max_capacity (set in __init__)

Getter: get_fuel() - returns current level

Setters with validation:
- fill(amount) - add fuel, but cannot exceed max_capacity
- use(amount) - use fuel, but cannot go below 0
- Each should print a message and return True/False for success`,starterCode:`# MISSION: Safe Fuel System
# Setters with validation

class FuelSystem:
    def __init__(self, max_capacity):
        self._max_capacity = max_capacity
        self._fuel_level = 0
    
    def get_fuel(self):
        pass
    
    def fill(self, amount):
        # Validate: can't exceed capacity
        pass
    
    def use(self, amount):
        # Validate: can't go negative
        pass

# === Mission Control Test ===
fuel = FuelSystem(100)
print(fuel.fill(80))   # True, "Fuel added: 80"
print(fuel.get_fuel()) # 80
print(fuel.fill(50))   # True but capped, "Fuel added: 20 (max reached)"
print(fuel.use(30))    # True, "Fuel used: 30"
print(fuel.use(100))   # False, "Not enough fuel"`,hint:"fill: space_available = self._max_capacity - self._fuel_level, then add min(amount, space_available). use: check if self._fuel_level >= amount first.",conceptTags:["setters","validation","encapsulation"]},{id:4,title:"Secure Navigation System",description:`Build a fully encapsulated navigation system.

NavigationSystem class:
Private attributes:
- _position = [0, 0, 0] (x, y, z coordinates)
- _destination = None
- _is_locked = False

Getters:
- get_position() - return copy of position (not the actual list!)
- get_destination() - return destination or "Not set"

Setters with validation:
- set_destination(coords) - only if not locked, coords must be list of 3 numbers
- move(x, y, z) - update position, only if not locked
- lock() - prevent changes
- unlock() - allow changes`,starterCode:`# MISSION: Secure Navigation
# Full encapsulation with multiple controls

class NavigationSystem:
    def __init__(self):
        self._position = [0, 0, 0]
        self._destination = None
        self._is_locked = False
    
    def get_position(self):
        # Return COPY of position
        pass
    
    def get_destination(self):
        pass
    
    def set_destination(self, coords):
        # Validate: not locked, valid coords
        pass
    
    def move(self, x, y, z):
        # Update position if not locked
        pass
    
    def lock(self):
        pass
    
    def unlock(self):
        pass

# === Mission Control Test ===
nav = NavigationSystem()
nav.set_destination([100, 200, 50])
print(nav.get_destination())  # [100, 200, 50]
nav.move(10, 20, 5)
print(nav.get_position())     # [10, 20, 5]
nav.lock()
nav.move(100, 100, 100)       # Should fail - locked
print(nav.get_position())     # Still [10, 20, 5]`,hint:"get_position: return self._position.copy() to protect the list. In setters, check if self._is_locked first.",conceptTags:["full encapsulation","list copy","lock mechanism"]},{id:5,title:"Secure Spacecraft",description:`Create a complete secure spacecraft combining all encapsulation concepts.

SecureSpacecraft class:
Static: total_launched = 0

Private instance:
- _name, _fuel, _crew_count, _is_launched

Getters:
- get_name(), get_fuel(), get_crew(), is_launched()

Setters with validation:
- refuel(amount) - only if not launched, 0-100 range
- board_crew(count) - only if not launched, max 10

Actions:
- launch() - only if fuel >= 50 and crew >= 1, increment total_launched
- status() - print all info

Demonstrate full functionality!`,starterCode:`# MISSION: Complete Secure Spacecraft
# All encapsulation concepts combined

class SecureSpacecraft:
    total_launched = 0
    
    def __init__(self, name, initial_fuel):
        self._name = name
        self._fuel = min(100, max(0, initial_fuel))  # Clamp to 0-100
        self._crew_count = 0
        self._is_launched = False
    
    # Getters
    def get_name(self):
        pass
    
    def get_fuel(self):
        pass
    
    def get_crew(self):
        pass
    
    def is_launched(self):
        pass
    
    # Validated setters
    def refuel(self, amount):
        pass
    
    def board_crew(self, count):
        pass
    
    # Actions
    def launch(self):
        pass
    
    def status(self):
        state = "In Space" if self._is_launched else "Docked"
        print(f"{self._name}: {state}, Fuel: {self._fuel}%, Crew: {self._crew_count}")

# === Mission Control Test ===
ship = SecureSpacecraft("Enterprise", 80)
ship.status()
ship.board_crew(5)
ship.status()
ship.launch()
ship.status()
ship.refuel(50)  # Should fail - already launched
print(f"Total launched: {SecureSpacecraft.total_launched}")`,hint:"In launch: check fuel >= 50 AND crew >= 1 AND not already launched. Set _is_launched = True and increment SecureSpacecraft.total_launched.",conceptTags:["synthesis","full encapsulation","static + instance","validation"]}],rg=[{title:"1. Recursion: Functions Calling Themselves",content:`Recursion is when a function calls itself to solve a problem. It breaks a big problem into smaller versions of the same problem.

Every recursive function needs:
1. Base case - when to STOP (prevent infinite recursion)
2. Recursive case - how to reduce the problem and call itself`,codeExample:`# Simple countdown using recursion
def countdown(n):
    if n <= 0:           # Base case
        print("Liftoff!")
    else:
        print(n)
        countdown(n - 1) # Recursive call (n gets smaller)

countdown(5)
# 5, 4, 3, 2, 1, Liftoff!`},{title:"2. Factorial: The Classic Example",content:`Factorial: n! = n × (n-1) × (n-2) × ... × 1
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- Base case: 0! = 1 and 1! = 1`,codeExample:`def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120`},{title:"3. Fibonacci Sequence",content:`Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13...
Each number is the sum of the two before it.
- Base cases: fib(0) = 0, fib(1) = 1
- Recursive: fib(n) = fib(n-1) + fib(n-2)`,codeExample:`def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(fibonacci(i), end=" ")
# 0 1 1 2 3 5 8 13 21 34`},{title:"4. Binary Search Recursively",content:"Binary search can be written recursively - the search space shrinks with each call.",codeExample:`def binary_search_recursive(arr, target, low, high):
    # Base case: not found
    if low > high:
        return -1
    
    mid = (low + high) // 2
    
    # Base case: found!
    if arr[mid] == target:
        return mid
    # Recursive cases
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, high)
    else:
        return binary_search_recursive(arr, target, low, mid - 1)

data = [10, 20, 30, 40, 50, 60, 70]
print(binary_search_recursive(data, 40, 0, len(data)-1))  # 3`},{title:"5. Tracing the Call Stack",content:'Each recursive call adds a frame to the call stack. When base case is reached, frames "unwind" returning values back.',codeExample:`# Visual with print statements:
def factorial_trace(n, indent=0):
    print("  " * indent + f"factorial({n})")
    if n <= 1:
        print("  " * indent + f"returns 1")
        return 1
    result = n * factorial_trace(n - 1, indent + 1)
    print("  " * indent + f"returns {result}")
    return result

factorial_trace(4)`},{title:"6. Recursion Warnings",content:`Recursive solutions are elegant but have limits:
- Python has a recursion depth limit (~1000 calls)
- Inefficient recursion (like naive Fibonacci) can be slow
- Always ensure a base case to avoid infinite recursion`}],th=[{id:1,title:"Recursive Countdown",description:`Create a recursive countdown function.

countdown(n) should:
- Print n
- If n > 0, call countdown(n-1)
- If n <= 0, print "LIFTOFF!"

Test with countdown(5).`,starterCode:`# MISSION: Recursive Countdown
def countdown(n):
    # Base case: n <= 0
    # Recursive case: print and call with n-1
    pass

countdown(5)`,hint:'if n <= 0: print("LIFTOFF!") else: print(n) and call countdown(n-1)',conceptTags:["recursion","base case","simple"]},{id:2,title:"Orbital Factorial",description:`Implement factorial recursively.

factorial(n) returns n!
- Base: factorial(0) = 1, factorial(1) = 1
- Recursive: n * factorial(n-1)

Test with factorial(5) = 120 and factorial(7) = 5040.`,starterCode:`# MISSION: Factorial Calculator
def factorial(n):
    # Base case
    # Recursive case
    pass

print(factorial(5))   # 120
print(factorial(7))   # 5040`,hint:"if n <= 1: return 1 else: return n * factorial(n-1)",conceptTags:["factorial","recursion","memorize"]},{id:3,title:"Recursive Sum",description:`Calculate sum of 1 to n recursively.

sum_to(n) returns 1 + 2 + ... + n
- Base: sum_to(1) = 1
- Recursive: n + sum_to(n-1)

Test: sum_to(5) = 15, sum_to(10) = 55.`,starterCode:`# MISSION: Recursive Summation
def sum_to(n):
    pass

print(sum_to(5))   # 15
print(sum_to(10))  # 55`,hint:"if n == 1: return 1 else: return n + sum_to(n-1)",conceptTags:["recursion","accumulation"]},{id:4,title:"Fibonacci Sequence",description:`Implement Fibonacci recursively.

fib(n) returns nth Fibonacci number
- Base: fib(0) = 0, fib(1) = 1
- Recursive: fib(n-1) + fib(n-2)

Print first 10 Fibonacci numbers.`,starterCode:`# MISSION: Fibonacci Calculator
def fib(n):
    pass

for i in range(10):
    print(fib(i), end=" ")
# Should print: 0 1 1 2 3 5 8 13 21 34`,hint:"Two base cases! if n == 0: return 0, if n == 1: return 1, else return fib(n-1) + fib(n-2)",conceptTags:["fibonacci","recursion","memorize"]},{id:5,title:"Recursive Binary Search",description:`Implement binary search recursively.

binary_search(arr, target, low, high) returns index or -1

Base cases:
- low > high: return -1 (not found)
- arr[mid] == target: return mid

Recursive cases:
- target > arr[mid]: search right half
- target < arr[mid]: search left half`,starterCode:`# MISSION: Recursive Binary Search
def binary_search(arr, target, low, high):
    pass

data = [10, 20, 30, 40, 50, 60, 70, 80]
print(binary_search(data, 50, 0, len(data)-1))  # 4
print(binary_search(data, 25, 0, len(data)-1))  # -1`,hint:"mid = (low + high) // 2. Check if found, else recurse with new low/high values.",conceptTags:["binary search","recursion","divide and conquer"]},{id:6,title:"Recursive String Reverse",description:`Reverse a string using recursion.

reverse(s) returns s reversed
- Base: empty string or 1 char returns itself
- Recursive: last char + reverse(rest)

Test: reverse("APOLLO") = "OLLOPA"`,starterCode:`# MISSION: Recursive Reversal
def reverse(s):
    pass

print(reverse("APOLLO"))  # "OLLOPA"
print(reverse("NASA"))    # "ASAN"`,hint:"if len(s) <= 1: return s else: return s[-1] + reverse(s[:-1])",conceptTags:["recursion","strings","synthesis"]}],og=[{title:"1. The Problem of Code Duplication",content:"Without inheritance, similar classes duplicate code:",codeExample:`# Without inheritance - lots of repetition!
class Rocket:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    def launch(self): ...

class Satellite:
    def __init__(self, name, fuel):  # Same!
        self.name = name
        self.fuel = fuel
    def launch(self): ...  # Same!

# With inheritance - share common code!
class Spacecraft:  # Parent
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    def launch(self): ...

class Rocket(Spacecraft):  # Child - inherits!
    pass

class Satellite(Spacecraft):  # Child - inherits!
    pass`},{title:"2. Inheritance Syntax",content:"class Child(Parent): creates a child that inherits everything from Parent.",codeExample:`class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100
    
    def launch(self):
        print(f"{self.name} launching!")

# Rocket inherits from Spacecraft
class Rocket(Spacecraft):
    pass  # Inherits everything!

# Satellite inherits from Spacecraft
class Satellite(Spacecraft):
    pass

rocket = Rocket("Falcon 9")
rocket.launch()  # Works! Inherited from Spacecraft
print(rocket.fuel)  # 100 - inherited!`},{title:"3. Calling Parent Constructor",content:"Use super().__init__() to run the parent's constructor, then add child-specific initialization.",codeExample:`class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel

class Rocket(Spacecraft):
    def __init__(self, name, fuel, payload_capacity):
        super().__init__(name, fuel)  # Call parent constructor
        self.payload_capacity = payload_capacity  # Add new attribute

class Satellite(Spacecraft):
    def __init__(self, name, fuel, orbit_altitude):
        super().__init__(name, fuel)  # Call parent constructor
        self.orbit_altitude = orbit_altitude  # Add new attribute

rocket = Rocket("Falcon 9", 100, 22800)
print(rocket.name)              # Inherited
print(rocket.payload_capacity)  # New to Rocket`},{title:"4. Polymorphism: Overriding Methods",content:"Child classes can override parent methods to provide specialized behavior.",codeExample:`class Spacecraft:
    def __init__(self, name):
        self.name = name
    
    def describe(self):
        return f"Spacecraft: {self.name}"

class Rocket(Spacecraft):
    def __init__(self, name, stages):
        super().__init__(name)
        self.stages = stages
    
    def describe(self):  # Override!
        return f"Rocket: {self.name} ({self.stages} stages)"

class Satellite(Spacecraft):
    def describe(self):  # Override!
        return f"Satellite: {self.name} (in orbit)"

# Same method name, different behavior
ships = [Rocket("Falcon 9", 2), Satellite("Hubble"), Spacecraft("Generic")]
for ship in ships:
    print(ship.describe())  # Each calls its own version!`},{title:"5. Composition: Has-A Relationships",content:`Composition is when a class CONTAINS other objects. Not everything is "is-a" - sometimes it's "has-a".`,codeExample:`class Engine:
    def __init__(self, thrust):
        self.thrust = thrust
    def ignite(self):
        return f"Engine igniting: {self.thrust}kN thrust"

class Spacecraft:
    def __init__(self, name, engine):  # Has-a relationship
        self.name = name
        self.engine = engine  # Contains an Engine object
    
    def launch(self):
        return self.engine.ignite()  # Delegates to contained object

engine = Engine(500)
ship = Spacecraft("Apollo", engine)
print(ship.launch())  # "Engine igniting: 500kN thrust"`}],ah=[{id:1,title:"Vehicle Hierarchy",description:`Create a simple inheritance hierarchy.

Vehicle (parent):
- __init__(name, speed)
- move() returns "[name] moving at [speed] km/h"

Spacecraft(Vehicle):
- Inherits everything, no changes

Test: Create Spacecraft, verify inheritance works.`,starterCode:`class Vehicle:
    pass

class Spacecraft(Vehicle):
    pass

ship = Spacecraft("Enterprise", 1000)
print(ship.move())`,hint:"class Spacecraft(Vehicle): pass is enough for basic inheritance.",conceptTags:["inheritance","basic"]},{id:2,title:"Extended Constructor",description:`Create Rocket class that extends Spacecraft.

Spacecraft(name, fuel) - base class
Rocket(name, fuel, stages) - adds stages attribute

Use super().__init__() to call parent constructor.`,starterCode:`class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel

class Rocket(Spacecraft):
    def __init__(self, name, fuel, stages):
        # Call parent constructor
        # Add stages attribute
        pass

rocket = Rocket("Falcon 9", 100, 2)
print(rocket.name)    # Inherited
print(rocket.stages)  # New`,hint:"super().__init__(name, fuel) then self.stages = stages",conceptTags:["super","constructor","extending"]},{id:3,title:"Polymorphic Launch",description:`Override the launch() method in child classes.

Spacecraft.launch() - "Launching spacecraft"
Rocket.launch() - "Rocket ignition sequence..."
Satellite.launch() - "Deploying satellite to orbit..."

Create one of each, call launch() on all.`,starterCode:`class Spacecraft:
    def __init__(self, name):
        self.name = name
    def launch(self):
        return f"Launching {self.name}"

class Rocket(Spacecraft):
    def launch(self):
        pass

class Satellite(Spacecraft):
    def launch(self):
        pass

ships = [Spacecraft("Generic"), Rocket("Falcon"), Satellite("Hubble")]
for s in ships:
    print(s.launch())`,hint:"Override by defining a method with the same name in the child class.",conceptTags:["polymorphism","override"]},{id:4,title:"Adding New Methods",description:`Add child-specific methods.

Spacecraft: name, launch()
Rocket: + stages, separate_stage() - reduces stages by 1
Satellite: + orbit_altitude, adjust_orbit(delta) - changes altitude

Test each child's unique methods.`,starterCode:`class Spacecraft:
    def __init__(self, name):
        self.name = name
    def launch(self):
        return f"{self.name} launching"

class Rocket(Spacecraft):
    def __init__(self, name, stages):
        super().__init__(name)
        self.stages = stages
    
    def separate_stage(self):
        pass

class Satellite(Spacecraft):
    def __init__(self, name, orbit):
        super().__init__(name)
        self.orbit_altitude = orbit
    
    def adjust_orbit(self, delta):
        pass

r = Rocket("Saturn V", 3)
r.separate_stage()
print(r.stages)  # 2

s = Satellite("ISS", 400)
s.adjust_orbit(50)
print(s.orbit_altitude)  # 450`,hint:"New methods are defined just like any other method in the child class.",conceptTags:["extending","new methods"]},{id:5,title:"Engine Composition",description:`Use composition - spacecraft HAS-A engine.

Engine class:
- thrust, is_running
- start(), stop(), status()

Spacecraft class:
- name, engine (Engine object)
- ignite() calls engine.start()
- shutdown() calls engine.stop()

Test the composed objects working together.`,starterCode:`class Engine:
    def __init__(self, thrust):
        self.thrust = thrust
        self.is_running = False
    
    def start(self):
        pass
    
    def stop(self):
        pass
    
    def status(self):
        pass

class Spacecraft:
    def __init__(self, name, engine):
        self.name = name
        self.engine = engine
    
    def ignite(self):
        pass
    
    def shutdown(self):
        pass

e = Engine(500)
ship = Spacecraft("Apollo", e)
ship.ignite()
print(ship.engine.status())
ship.shutdown()`,hint:"Spacecraft.ignite() should call self.engine.start()",conceptTags:["composition","has-a"]},{id:6,title:"Complete Fleet System",description:`Create a complete vehicle hierarchy.

Vehicle (parent): name, status()
├── Spacecraft: + fuel, launch()
│   ├── Rocket: + payload, deliver_payload()
│   └── Probe: + destination, transmit_data()
└── GroundVehicle: + wheels, drive()
    └── Rover: + arm_extended, extend_arm()

Create one of each, demonstrate polymorphism with status().`,starterCode:`class Vehicle:
    def __init__(self, name):
        self.name = name
    def status(self):
        return f"Vehicle: {self.name}"

class Spacecraft(Vehicle):
    pass

class Rocket(Spacecraft):
    pass

class Probe(Spacecraft):
    pass

class GroundVehicle(Vehicle):
    pass

class Rover(GroundVehicle):
    pass

# Create fleet
fleet = [
    Rocket("Falcon", 100, 500),
    Probe("Voyager", 50, "Jupiter"),
    Rover("Curiosity", 6)
]

for v in fleet:
    print(v.status())`,hint:"Each class adds its own attributes via super().__init__ and can override status() for polymorphism.",conceptTags:["synthesis","hierarchy","polymorphism"]}],cg=[{title:"1. Linked List Concept",content:`A linked list is a chain of nodes. Each node contains:
- Data (the value)
- A pointer to the next node

Unlike arrays, nodes aren't stored contiguously in memory - they're connected by pointers.`,codeExample:`# Visualize:
# [Data|Next] -> [Data|Next] -> [Data|Next] -> None
#    Head          Node 2         Node 3       (End)

# Advantages over arrays:
# - Insert/delete O(1) at known position
# - Dynamic size (no resizing needed)
# - No wasted space

# Disadvantages:
# - No direct index access O(N) to find element
# - Extra memory for pointers`},{title:"2. Creating a Node",content:"The Node is the building block. Each node holds data and a reference to the next node.",codeExample:`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None  # Points to nothing initially

# Create individual nodes
node1 = Node("Apollo")
node2 = Node("Voyager")
node3 = Node("Discovery")

# Link them manually
node1.next = node2
node2.next = node3
# node3.next remains None (end of list)

# Traverse
current = node1
while current is not None:
    print(current.data)
    current = current.next`},{title:"3. LinkedList Wrapper",content:"The LinkedList class manages the nodes, keeping track of the head (first node).",codeExample:`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None  # Empty list
    
    def is_empty(self):
        return self.head is None
    
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# Usage
missions = LinkedList()
print(missions.is_empty())  # True`},{title:"4. Inserting Nodes",content:"Three ways to insert: front, end, or at specific position.",codeExample:`class LinkedList:
    # ... (Node class and __init__ as before)
    
    def insert_front(self, data):
        new_node = Node(data)
        new_node.next = self.head  # Point to old head
        self.head = new_node       # New head
    
    def insert_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next:  # Find last node
            current = current.next
        current.next = new_node
    
    def insert_at(self, position, data):
        if position == 0:
            self.insert_front(data)
            return
        new_node = Node(data)
        current = self.head
        for i in range(position - 1):
            if current is None:
                return
            current = current.next
        new_node.next = current.next
        current.next = new_node`},{title:"5. Deleting Nodes",content:"Delete by value or position - need to maintain links!",codeExample:`def delete_value(self, value):
    # Special case: delete head
    if self.head and self.head.data == value:
        self.head = self.head.next
        return True
    
    # Find node before the one to delete
    current = self.head
    while current and current.next:
        if current.next.data == value:
            current.next = current.next.next  # Skip over
            return True
        current = current.next
    return False  # Not found

def delete_at(self, position):
    if self.head is None:
        return False
    if position == 0:
        self.head = self.head.next
        return True
    current = self.head
    for i in range(position - 1):
        if current.next is None:
            return False
        current = current.next
    if current.next:
        current.next = current.next.next
        return True
    return False`},{title:"6. When to Use Linked Lists",content:`Use linked lists when:
- You need frequent insert/delete at the start or middle
- You don't know the size in advance
- Memory fragmentation isn't an issue

Use arrays/lists when:
- You need fast random access by index
- You perform many searches by position`}],nh=[{id:1,title:"Build Nodes",description:`Create a Node class and manually link three nodes.

Node: data, next (None initially)

Create: "Alpha" -> "Beta" -> "Gamma" -> None
Traverse and print each data.`,starterCode:`class Node:
    pass

# Create and link nodes
node1 = Node("Alpha")
# ... link them

# Traverse and print
current = node1
while current:
    print(current.data)
    current = current.next`,hint:"node1.next = node2, node2.next = node3",conceptTags:["node","basic linking"]},{id:2,title:"Basic LinkedList",description:`Create LinkedList class with:
- __init__: set head = None
- is_empty(): return True if head is None
- print_list(): traverse and print all data`,starterCode:`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    pass

# Test
missions = LinkedList()
print(missions.is_empty())  # True`,hint:"while current: lets you traverse until None",conceptTags:["linked list","traversal"]},{id:3,title:"Insert at Front",description:`Add insert_front(data) method.

Steps:
1. Create new node
2. Point new node to current head
3. Update head to new node

Insert A, B, C - list should be C -> B -> A.`,starterCode:`class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_front(self, data):
        pass
    
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

ll = LinkedList()
ll.insert_front("A")
ll.insert_front("B")
ll.insert_front("C")
ll.print_list()  # C -> B -> A -> None`,hint:"new_node.next = self.head then self.head = new_node",conceptTags:["insert","front"]},{id:4,title:"Insert at End",description:`Add insert_end(data) method.

Steps:
1. Create new node
2. If empty, set as head
3. Otherwise, traverse to last node
4. Set last.next = new node

Insert A, B, C - list should be A -> B -> C.`,starterCode:`class LinkedList:
    # Previous methods...
    
    def insert_end(self, data):
        pass

ll = LinkedList()
ll.insert_end("A")
ll.insert_end("B")
ll.insert_end("C")
ll.print_list()  # A -> B -> C -> None`,hint:"Find last node with while current.next: then set current.next = new_node",conceptTags:["insert","end","traversal"]},{id:5,title:"Delete by Value",description:`Add delete(value) method.

Handle special case: deleting head.
Otherwise: find node BEFORE target, update its next.

Create A -> B -> C -> D, delete "B", print result.`,starterCode:`def delete(self, value):
    pass

ll = LinkedList()
for x in ["A", "B", "C", "D"]:
    ll.insert_end(x)
ll.print_list()  # A -> B -> C -> D -> None
ll.delete("B")
ll.print_list()  # A -> C -> D -> None`,hint:"If head has value, self.head = self.head.next. Otherwise find node where current.next.data == value.",conceptTags:["delete","linking"]},{id:6,title:"Length and Search",description:`Add:
- length(): return count of nodes
- search(value): return True if found, False otherwise
- get_at(index): return data at index or None`,starterCode:`def length(self):
    pass

def search(self, value):
    pass

def get_at(self, index):
    pass

ll = LinkedList()
for x in ["A", "B", "C"]:
    ll.insert_end(x)
print(ll.length())      # 3
print(ll.search("B"))   # True
print(ll.get_at(1))     # "B"`,hint:"Counter for length, compare data for search, count index for get_at.",conceptTags:["traversal","search","count"]},{id:7,title:"Mission Queue System",description:`Build a mission queue using a linked list.

MissionQueue:
- add_mission(name): add to end
- next_mission(): remove and return front mission
- peek(): return front mission without removing
- display(): show all missions

Use for FIFO mission management.`,starterCode:`class MissionQueue:
    def __init__(self):
        self.head = None
    
    def add_mission(self, name):
        pass
    
    def next_mission(self):
        pass
    
    def peek(self):
        pass
    
    def display(self):
        pass

mq = MissionQueue()
mq.add_mission("Apollo 11")
mq.add_mission("Artemis I")
mq.add_mission("Mars 2024")
mq.display()
print(f"Next: {mq.next_mission()}")
mq.display()`,hint:"next_mission removes from front (update head). add_mission adds to end.",conceptTags:["synthesis","queue","application"]}],ug=[{title:"1. Trees & Nodes",content:"A tree is a hierarchical structure of nodes. Each node can have children. In a binary tree, each node has at most two children: left and right.",codeExample:`class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

# Example nodes
root = TreeNode("Root")
root.left = TreeNode("Left Child")
root.right = TreeNode("Right Child")`},{title:"2. Binary Search Tree (BST) Property",content:`A BST enforces ordering for fast search:
- Values smaller than a node go LEFT
- Values larger than a node go RIGHT

This property allows O(log N) search on balanced trees.`,codeExample:`# Insert respecting BST rule
def insert(root, key):
    if root is None:
        return TreeNode(key)
    if key < root.data:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root`},{title:"3. Traversal Orders",content:`Tree traversal visits every node in a specific order:
- In-order: Left, Root, Right (sorted output for BST)
- Pre-order: Root, Left, Right
- Post-order: Left, Right, Root`,codeExample:`def inorder(root):
    if root:
        inorder(root.left)
        print(root.data)
        inorder(root.right)

def preorder(root):
    if root:
        print(root.data)
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.data)`},{title:"4. Searching a BST",content:`Use the BST property to search quickly:
- If target < node.data -> go left
- If target > node.data -> go right
- If equal -> found
- If None -> not found`,codeExample:`def search(root, key):
    if root is None or root.data == key:
        return root
    if key < root.data:
        return search(root.left, key)
    return search(root.right, key)`},{title:"5. Min/Max & Height",content:`In a BST:
- Minimum value is the leftmost node
- Maximum value is the rightmost node

Height (max depth) is 1 + max(left_height, right_height); empty tree has height 0.`,codeExample:`def find_min(root):
    current = root
    while current and current.left:
        current = current.left
    return current.data if current else None

def max_height(root):
    if root is None:
        return 0
    return 1 + max(max_height(root.left), max_height(root.right))`}],ih=[{id:1,title:"TreeNode Blueprint",description:`Create the TreeNode class and manually link a tiny tree.

1. Define TreeNode with data, left, right (None by default)
2. Create root=50, left child=25, right child=75
3. Print root.left.data and root.right.data`,starterCode:`# MISSION: TreeNode Basics

class TreeNode:
    # Define __init__ to set data, left, right
    pass

# === Mission Control Test ===
root = TreeNode(50)
root.left = TreeNode(25)
root.right = TreeNode(75)

print(root.left.data)   # 25
print(root.right.data)  # 75`,hint:"In __init__, set self.left = None and self.right = None.",conceptTags:["node","bst","structure"]},{id:2,title:"BST Insert",description:`Write insert(root, key) that returns the BST root after inserting key recursively.

Rules:
- If root is None, return new TreeNode(key)
- If key < root.data, insert into left subtree
- Else insert into right subtree`,starterCode:`# MISSION: BST Insert
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def insert(root, key):
    # Implement recursive insert
    pass

# === Mission Control Test ===
root = None
for value in [50, 30, 70, 20, 40, 60, 80]:
    root = insert(root, value)

print(root.data)       # 50
print(root.left.data)  # 30
print(root.right.data) # 70`,hint:"Set root.left = insert(root.left, key) or root.right = insert(root.right, key) before returning root.",conceptTags:["insert","bst","recursion"]},{id:3,title:"In-Order Traversal",description:`Implement inorder(root) to print values in ascending order for a BST.

Base case: if root is None, return.
Recursive: inorder(left), print(root.data), inorder(right)`,starterCode:`# MISSION: In-Order Traversal
def inorder(root):
    # Traverse left, visit root, traverse right
    pass

# Assume 'root' from previous challenge
inorder(root)  # Should print sorted values`,hint:"if root: inorder(root.left); print(root.data); inorder(root.right)",conceptTags:["traversal","inorder","bst"]},{id:4,title:"Search the Tree",description:`Create search(root, key) that returns True if key is in the BST, otherwise False.

Use the BST property to decide whether to go left or right.`,starterCode:`# MISSION: BST Search
def search(root, key):
    # Return True if found
    pass

print(search(root, 60))  # True
print(search(root, 99))  # False`,hint:"Check root None, then compare key with root.data and recurse.",conceptTags:["search","bst","recursion"]},{id:5,title:"Find Min & Max",description:`Write two functions:
- find_min(root): return smallest value (leftmost node)
- find_max(root): return largest value (rightmost node)

Return None if tree is empty.`,starterCode:`# MISSION: BST Extremes
def find_min(root):
    pass

def find_max(root):
    pass

print(find_min(root))  # 20
print(find_max(root))  # 80`,hint:"Walk left until None for min, right until None for max.",conceptTags:["min","max","bst"]},{id:6,title:"Tree Height",description:`Compute height (max depth) of a binary tree.

Rules:
- Empty tree height is 0
- Height = 1 + max(height(left), height(right))`,starterCode:`# MISSION: Tree Height
def tree_height(root):
    # Return integer height
    pass

print(tree_height(root))  # Should reflect depth of inserted nodes`,hint:"Base case root is None -> 0; otherwise 1 + max(...)",conceptTags:["height","depth","recursion"]}],dg=[{title:"1. What is a Set?",content:"A set is an unordered collection of UNIQUE items. Duplicate values are automatically removed.",codeExample:`crew = {"Neil", "Buzz", "Michael", "Neil"}
print(crew)        # {'Neil', 'Buzz', 'Michael'} (no duplicates)
print(len(crew))   # 3`},{title:"2. Core Operations",content:"Sets support fast membership tests (in) and basic mutations.",tableData:{headers:["Operation","Example","Effect"],rows:[["in","'Neil' in crew","Membership test -> True/False"],[".add(x)","crew.add('Sally')","Add element"],[".remove(x)","crew.remove('Neil')","Remove (KeyError if missing)"],[".discard(x)","crew.discard('Neil')","Remove if present (safe)"],[".pop()","crew.pop()","Remove and return an arbitrary item"],[".clear()","crew.clear()","Remove all items"]]}},{title:"3. Set Operations",content:`Combine sets using math-like operations:
- Union (|): elements in either set
- Intersection (&): elements common to both
- Difference (-): elements in A but not B
- Symmetric Difference (^): elements in exactly one set`,codeExample:`a = {"Earth", "Mars", "Jupiter"}
b = {"Mars", "Saturn"}

print(a | b)  # Union
print(a & b)  # Intersection
print(a - b)  # Difference
print(a ^ b)  # Symmetric difference`},{title:"4. Relationships",content:`Check set relationships:
- issubset(): A.issubset(B) -> all elements of A in B
- issuperset(): A.issuperset(B) -> A contains B
- isdisjoint(): no shared elements`,codeExample:`mission_crew = {"Neil", "Buzz", "Michael"}
lunar_team = {"Neil", "Buzz"}

print(lunar_team.issubset(mission_crew))   # True
print(mission_crew.issuperset(lunar_team)) # True
print(mission_crew.isdisjoint({"Yuri"}))   # True`},{title:"5. Removing Duplicates",content:"Sets are great for deduplication because they only keep unique values.",codeExample:`readings = [10, 20, 10, 30, 20]
unique_readings = set(readings)
print(unique_readings)         # {10, 20, 30}

# Back to list (order not guaranteed)
clean_list = list(unique_readings)`}],sh=[{id:1,title:"Crew Manifest",description:`Create a set of crew names and practice membership and mutations.

1. Create crew = {"Neil", "Buzz"}
2. Add "Michael"
3. Remove "Buzz" safely (no error if missing)
4. Print crew size and whether "Neil" is in the set`,starterCode:`# MISSION: Crew Manifest
crew = {"Neil", "Buzz"}

# Add and remove here

print(len(crew))
print("Neil" in crew)`,hint:"Use crew.add(...) and crew.discard(...) to avoid KeyError.",conceptTags:["sets","add","discard","membership"]},{id:2,title:"Mission Payloads",description:`Use set operations to compare payload lists.

Given:
payload_a = {"Camera", "Sensor", "Drill"}
payload_b = {"Sensor", "Drill", "Comms"}

Print:
- Union of both payloads
- Intersection (shared items)
- Items only in payload_a`,starterCode:`# MISSION: Payload Comparison
payload_a = {"Camera", "Sensor", "Drill"}
payload_b = {"Sensor", "Drill", "Comms"}

# Compute and print union, intersection, difference`,hint:"Use | for union, & for intersection, - for difference.",conceptTags:["union","intersection","difference"]},{id:3,title:"Unique Readings",description:`Remove duplicates from sensor data using a set.

Given readings = [101, 103, 101, 99, 103, 105]:
1. Convert to a set to deduplicate
2. Convert back to a list (order not important)
3. Print the unique readings`,starterCode:`# MISSION: Deduplicate Readings
readings = [101, 103, 101, 99, 103, 105]

# Deduplicate using a set

print(unique)`,hint:"unique = list(set(readings))",conceptTags:["deduplication","set conversion"]},{id:4,title:"Access Control",description:`Check subset/superset relationships for clearance.

crew = {"Neil", "Buzz", "Michael"}
eva_team = {"Neil", "Buzz"}
guests = {"Yuri"}

Print:
- If eva_team is a subset of crew
- If crew is a superset of eva_team
- If crew and guests are disjoint`,starterCode:`# MISSION: Access Control
crew = {"Neil", "Buzz", "Michael"}
eva_team = {"Neil", "Buzz"}
guests = {"Yuri"}

# Print subset/superset/disjoint checks`,hint:"Use issubset, issuperset, isdisjoint.",conceptTags:["subset","superset","disjoint"]}],fg=[{title:"1. What are Design Patterns?",content:`Design patterns are proven, reusable solutions to common software design problems. They're like blueprints that can be adapted to solve recurring challenges in your code.

Think of them as "best practices" that experienced programmers have discovered over time. The IB focuses on three key patterns:
- Singleton: When you need exactly ONE instance
- Factory: When you need to create objects without specifying exact classes
- Observer: When objects need to react to changes in other objects

These patterns help write code that is more maintainable, flexible, and understandable.`,codeExample:`# Without patterns - tightly coupled, hard to maintain
class MissionControl:
    def __init__(self):
        self.rocket = Rocket()      # Hardcoded!
        self.satellite = Satellite() # Hardcoded!
        
# With patterns - flexible, loosely coupled
class MissionControl:
    def __init__(self, spacecraft_factory):
        self.craft = spacecraft_factory.create()  # Flexible!`},{title:"2. Singleton Pattern",content:`The Singleton pattern ensures a class has only ONE instance and provides global access to it.

Use cases in space missions:
- Mission Control Center (only one exists)
- Central Command Database (single source of truth)
- Configuration Manager (one set of settings)
- Logging System (single log file)

Key features:
1. Private/protected constructor
2. Static method to get the instance
3. Instance stored as class variable`,codeExample:`class MissionControl:
    _instance = None  # Class variable stores the single instance
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.mission_count = 0
        return cls._instance
    
    def launch_mission(self):
        self.mission_count += 1
        return f"Mission #{self.mission_count} launched!"

# Testing Singleton
control1 = MissionControl()
control2 = MissionControl()

print(control1 is control2)  # True - same instance!

control1.launch_mission()
print(control2.mission_count)  # 1 - shared state!`,tableData:{headers:["Aspect","Description"],rows:[["Purpose","Ensure only ONE instance of a class exists"],["Access","Global point of access via class method"],["State","All code shares the same instance state"],["Use When","You need exactly one object (config, logger, etc.)"]]}},{title:"3. Factory Pattern",content:`The Factory pattern provides a way to create objects without specifying the exact class. A factory method decides which class to instantiate based on input.

Use cases:
- Creating different spacecraft types based on mission requirements
- Building UI components based on platform
- Generating enemies in games based on level

Benefits:
- Decouples object creation from usage
- Easy to add new types without changing client code
- Centralizes creation logic`,codeExample:`class Spacecraft:
    def launch(self):
        pass

class Rocket(Spacecraft):
    def launch(self):
        return "Rocket blasting off!"

class Satellite(Spacecraft):
    def launch(self):
        return "Satellite deploying to orbit!"

class Probe(Spacecraft):
    def launch(self):
        return "Probe beginning deep space journey!"

# The Factory
class SpacecraftFactory:
    @staticmethod
    def create(craft_type):
        if craft_type == "rocket":
            return Rocket()
        elif craft_type == "satellite":
            return Satellite()
        elif craft_type == "probe":
            return Probe()
        else:
            raise ValueError(f"Unknown craft type: {craft_type}")

# Usage - client doesn't need to know about specific classes
factory = SpacecraftFactory()
mission1 = factory.create("rocket")
mission2 = factory.create("satellite")

print(mission1.launch())  # "Rocket blasting off!"
print(mission2.launch())  # "Satellite deploying to orbit!"`,tableData:{headers:["Aspect","Description"],rows:[["Purpose","Create objects without specifying exact class"],["Benefit","Easy to add new types without changing client"],["Structure","Factory class with create() method"],["Use When","Object type determined at runtime"]]}},{title:"4. Observer Pattern",content:`The Observer pattern defines a one-to-many dependency between objects. When one object (subject) changes state, all its dependents (observers) are notified automatically.

Use cases:
- Mission status updates to multiple displays
- Sensor readings triggering multiple systems
- Event-driven programming
- GUI updates when data changes

Key components:
1. Subject: The object being watched (has state)
2. Observer: Objects that react to changes
3. Subscribe/Unsubscribe: Methods to add/remove observers
4. Notify: Method to alert all observers`,codeExample:`class MissionSubject:
    def __init__(self):
        self._observers = []
        self._status = "Preparation"
    
    def attach(self, observer):
        self._observers.append(observer)
    
    def detach(self, observer):
        self._observers.remove(observer)
    
    def notify(self):
        for observer in self._observers:
            observer.update(self._status)
    
    def set_status(self, status):
        self._status = status
        self.notify()  # Alert all observers!

class DisplayObserver:
    def __init__(self, name):
        self.name = name
    
    def update(self, status):
        print(f"{self.name} received: Mission is now {status}")

# Usage
mission = MissionSubject()
display1 = DisplayObserver("Main Screen")
display2 = DisplayObserver("Control Room")
display3 = DisplayObserver("Press Center")

mission.attach(display1)
mission.attach(display2)
mission.attach(display3)

mission.set_status("Launching")
# Output:
# Main Screen received: Mission is now Launching
# Control Room received: Mission is now Launching
# Press Center received: Mission is now Launching`,tableData:{headers:["Aspect","Description"],rows:[["Purpose","Notify multiple objects when state changes"],["Subject","The object being observed (has attach/detach/notify)"],["Observer","Objects that respond to updates (has update method)"],["Use When","Many objects need to react to one object's changes"]]}},{title:"5. Choosing the Right Pattern",content:`Each pattern solves a specific problem:

SINGLETON - Use when:
- You need exactly one instance of a class
- Global access point is required
- Shared state must be controlled

FACTORY - Use when:
- The exact class to create isn't known until runtime
- You want to delegate creation to subclasses
- Adding new types should be easy

OBSERVER - Use when:
- One object's change should trigger updates in others
- You don't know how many objects need updates
- Loose coupling between objects is important`,tableData:{headers:["Pattern","Problem","Example"],rows:[["Singleton","Need ONE shared instance","Database connection, Logger"],["Factory","Create objects dynamically","Game enemy spawner, UI builder"],["Observer","React to state changes","Event handlers, Data binding"]]}}],lh=[{id:1,title:"Mission Logger Singleton",description:`Create a Singleton MissionLogger class that ensures only one logger instance exists throughout the entire mission.

Requirements:
1. Use class variable _instance to store the single instance
2. Override __new__ to implement Singleton behavior
3. Include a log_entries list to store messages
4. Add log(message) method that appends to the list
5. Add get_logs() method that returns all entries

Test that two variables point to the same instance.`,starterCode:`# MISSION: Singleton Logger
class MissionLogger:
    _instance = None
    
    def __new__(cls):
        # Implement Singleton behavior
        pass
    
    def log(self, message):
        # Add message to log_entries
        pass
    
    def get_logs(self):
        # Return all log entries
        pass

# === Mission Control Test ===
logger1 = MissionLogger()
logger2 = MissionLogger()

logger1.log("System initialized")
logger2.log("Launch sequence started")

print(f"Same instance: {logger1 is logger2}")
print(f"All logs: {logger1.get_logs()}")`,hint:"In __new__, check if _instance is None. If so, create it with super().__new__(cls) and initialize log_entries = []. Always return cls._instance.",conceptTags:["singleton","design-pattern","__new__"]},{id:2,title:"Spacecraft Factory",description:`Build a Factory that creates different spacecraft based on mission type.

Create these classes:
1. Spacecraft base class with launch() method
2. Rocket (returns "Rocket engines ignited!")
3. Shuttle (returns "Shuttle systems online!")
4. Probe (returns "Probe transmitters activated!")

Create SpacecraftFactory with:
- create(craft_type) static method
- Returns appropriate spacecraft based on type string`,starterCode:`# MISSION: Spacecraft Factory

class Spacecraft:
    def launch(self):
        return "Generic launch"

class Rocket(Spacecraft):
    # Override launch
    pass

class Shuttle(Spacecraft):
    # Override launch
    pass

class Probe(Spacecraft):
    # Override launch
    pass

class SpacecraftFactory:
    @staticmethod
    def create(craft_type):
        # Return appropriate spacecraft
        pass

# === Mission Control Test ===
factory = SpacecraftFactory()
r = factory.create("rocket")
s = factory.create("shuttle")
p = factory.create("probe")

print(r.launch())
print(s.launch())
print(p.launch())`,hint:"In the factory's create method, use if-elif to check craft_type and return the appropriate class instance (Rocket(), Shuttle(), or Probe()).",conceptTags:["factory","design-pattern","polymorphism"]},{id:3,title:"Mission Alert System",description:`Implement an Observer pattern for a mission alert system.

Create MissionControl (Subject) with:
- _observers list
- _alert_level (starts as "GREEN")
- attach(observer) - adds to list
- detach(observer) - removes from list
- notify() - calls update() on all observers
- set_alert(level) - sets level and notifies

Create AlertDisplay (Observer) with:
- name attribute
- update(level) - prints "{name}: Alert level is {level}"

Test with multiple displays reacting to alert changes.`,starterCode:`# MISSION: Observer Alert System

class MissionControl:
    def __init__(self):
        self._observers = []
        self._alert_level = "GREEN"
    
    def attach(self, observer):
        pass
    
    def detach(self, observer):
        pass
    
    def notify(self):
        pass
    
    def set_alert(self, level):
        pass

class AlertDisplay:
    def __init__(self, name):
        self.name = name
    
    def update(self, level):
        pass

# === Mission Control Test ===
control = MissionControl()
main_display = AlertDisplay("Main Screen")
backup_display = AlertDisplay("Backup Screen")

control.attach(main_display)
control.attach(backup_display)

control.set_alert("YELLOW")
control.set_alert("RED")`,hint:"In notify(), loop through _observers and call observer.update(self._alert_level). In set_alert(), update _alert_level then call notify().",conceptTags:["observer","design-pattern","event-driven"]},{id:4,title:"Pattern Recognition",description:`Given these three scenarios, identify which design pattern fits best and explain why in a comment:

Scenario A: A game needs to spawn different enemy types based on the current level difficulty.

Scenario B: A space station has one life support system that all modules must share and monitor.

Scenario C: When a spacecraft's fuel drops below 20%, multiple systems (navigation, communication, engine) need to switch to power-saving mode.

For each scenario, write a brief class structure (just the class and method signatures) that demonstrates the appropriate pattern.`,starterCode:`# MISSION: Pattern Recognition

# Scenario A: Enemy spawner based on difficulty
# Pattern: ???
# Why: ???

class EnemySpawner:
    # Your structure here
    pass

# Scenario B: Shared life support system
# Pattern: ???
# Why: ???

class LifeSupport:
    # Your structure here
    pass

# Scenario C: Fuel alert triggers multiple systems
# Pattern: ???
# Why: ???

class FuelMonitor:
    # Your structure here
    pass

# === Print your answers ===
print("Scenario A: Factory - creates objects based on runtime conditions")
print("Scenario B: Singleton - one shared instance for all modules")
print("Scenario C: Observer - fuel change notifies multiple systems")`,hint:"A=Factory (create objects dynamically), B=Singleton (one shared instance), C=Observer (one change triggers many responses).",conceptTags:["design-patterns","analysis","architecture"]}],hg=[{title:"1. What is Hashing?",content:`Hashing is a technique to convert data (keys) into fixed-size numbers (hash values) that act as indexes in an array-like structure called a hash table.

Why hashing matters:
- Enables O(1) average lookup time (vs O(N) for lists)
- Powers Python dictionaries and sets
- Used in databases, caches, and security

How it works:
1. Take a key (e.g., "Apollo")
2. Apply a hash function to get a number (e.g., 7)
3. Use that number as an index to store/retrieve the value

Python handles hashing automatically when you use dictionaries!`,codeExample:`# Python's built-in hash function
print(hash("Apollo"))    # Large number (varies)
print(hash("Gemini"))    # Different number
print(hash(42))          # Numbers hash to themselves

# Same input = same hash (within same Python session)
print(hash("Apollo") == hash("Apollo"))  # True

# Dictionaries use hashing internally
missions = {"Apollo": 11, "Gemini": 8, "Mercury": 6}
print(missions["Apollo"])  # O(1) lookup!`},{title:"2. Dictionary Fundamentals",content:"A dictionary stores key-value pairs. Keys must be immutable (strings, numbers, tuples) and unique. Values can be anything.",tableData:{headers:["Operation","Syntax","Complexity"],rows:[["Create","d = {} or dict()","O(1)"],["Add/Update","d[key] = value","O(1) average"],["Get","d[key] or d.get(key)","O(1) average"],["Delete","del d[key]","O(1) average"],["Check key","key in d","O(1) average"],["Get keys","d.keys()","O(1)"],["Get values","d.values()","O(1)"],["Get items","d.items()","O(1)"]]},codeExample:`# Creating dictionaries
crew = {"commander": "Neil", "pilot": "Buzz", "engineer": "Michael"}

# Accessing values
print(crew["commander"])       # "Neil"
print(crew.get("medic", "N/A")) # "N/A" (default if missing)

# Modifying
crew["commander"] = "Armstrong"  # Update
crew["scientist"] = "Sally"      # Add new

# Checking keys
if "pilot" in crew:
    print("Pilot assigned!")

# Iterating
for role, name in crew.items():
    print(f"{role}: {name}")`},{title:"3. Hash Collisions",content:`A collision occurs when two different keys produce the same hash value. Since hash tables have limited size, collisions are inevitable.

Example: If our hash table has 10 slots, and hash("Apollo") % 10 = 7 and hash("Voyager") % 10 = 7, both want slot 7!

Collision Resolution Strategies:
1. Chaining: Each slot holds a list of items
2. Open Addressing: Find the next empty slot

Python dictionaries handle collisions automatically using a sophisticated probing technique.`,codeExample:`# Demonstrating collision concept (simplified)
table_size = 10

def simple_hash(key):
    return hash(key) % table_size

# These might collide!
print(f"Apollo -> slot {simple_hash('Apollo')}")
print(f"Gemini -> slot {simple_hash('Gemini')}")

# Python handles this automatically in dicts
# No need to worry about it in practice!
missions = {}
missions["Apollo"] = 11   # Stored at some slot
missions["Gemini"] = 8    # Might collide, Python handles it
print(missions["Apollo"]) # Still works!`,tableData:{headers:["Strategy","How It Works","Trade-off"],rows:[["Chaining","List at each slot","Extra memory for lists"],["Linear Probing","Check next slot","Clustering can occur"],["Quadratic Probing","Check slot+1², slot+2²...","Less clustering"]]}},{title:"4. Load Factor & Rehashing",content:`The load factor measures how full a hash table is:

Load Factor = Number of items / Table size

When load factor gets too high (typically > 0.7):
- More collisions occur
- Performance degrades
- Solution: REHASH - create larger table, re-insert all items

This is why dictionary operations are O(1) "on average" - occasionally a resize operation takes longer.`,codeExample:`# Load factor concept
items = 70
table_size = 100
load_factor = items / table_size  # 0.7 = 70%

# When Python dict gets too full:
# 1. Creates new larger table (usually 2x size)
# 2. Rehashes all existing items
# 3. Inserts them into new table

# You don't have to manage this!
big_dict = {}
for i in range(10000):
    big_dict[f"key_{i}"] = i
# Python automatically resizes as needed

print(f"Items: {len(big_dict)}")  # 10000
print(big_dict["key_5000"])       # Still O(1)!`},{title:"5. When to Use Dictionaries",content:`Dictionaries excel when you need:
- Fast lookup by key (O(1) vs O(N) for lists)
- Key-value associations
- Counting occurrences
- Caching computed results
- Database-like records

Avoid dictionaries when:
- Order matters (use list instead, though dicts now preserve insertion order)
- Simple sequential access
- Memory is extremely limited`,codeExample:`# Use Case 1: Fast lookup
sensor_data = {"temp": 273, "pressure": 101, "humidity": 45}
print(sensor_data["temp"])  # O(1)!

# Use Case 2: Counting
readings = ["OK", "WARN", "OK", "ERROR", "OK", "WARN"]
counts = {}
for status in readings:
    counts[status] = counts.get(status, 0) + 1
print(counts)  # {'OK': 3, 'WARN': 2, 'ERROR': 1}

# Use Case 3: Caching (Memoization)
cache = {}
def expensive_calculation(n):
    if n in cache:
        return cache[n]  # O(1) lookup!
    result = n ** 2  # Simulate expensive operation
    cache[n] = result
    return result`},{title:"6. Dictionary vs Set vs List",content:"Choose the right data structure for your needs:",tableData:{headers:["Operation","List","Set","Dictionary"],rows:[["Lookup by index","O(1)","N/A","N/A"],["Lookup by value","O(N)","O(1)","O(1) by key"],["Add item","O(1) append","O(1)","O(1)"],["Remove item","O(N)","O(1)","O(1)"],["Check membership","O(N)","O(1)","O(1)"],["Duplicates","Allowed","No","Keys unique"],["Order","Maintained","No*","Maintained*"]]},codeExample:`# Choosing the right structure
# Need ordered sequence -> List
crew_order = ["Neil", "Buzz", "Michael"]

# Need unique items, fast membership -> Set
visited_planets = {"Earth", "Moon", "Mars"}

# Need key-value pairs, fast lookup -> Dictionary
mission_years = {"Apollo 11": 1969, "Voyager 1": 1977}

# Performance comparison
import time

# Finding in list vs dict
big_list = list(range(100000))
big_dict = {i: True for i in range(100000)}

# dict lookup is MUCH faster for large collections!`}],rh=[{id:1,title:"Mission Database",description:`Create a mission database using a dictionary to store and retrieve mission data efficiently.

Requirements:
1. Create missions dict with at least 3 missions
2. Each key is mission name (string)
3. Each value is another dict with: year, crew_size, destination
4. Implement get_mission(name) - returns mission data or "Mission not found"
5. Implement add_mission(name, year, crew_size, destination)

Test with lookups for existing and non-existing missions.`,starterCode:`# MISSION: Mission Database

missions = {
    "Apollo 11": {"year": 1969, "crew_size": 3, "destination": "Moon"},
    # Add more missions
}

def get_mission(name):
    # Return mission data or "Mission not found"
    pass

def add_mission(name, year, crew_size, destination):
    # Add new mission to database
    pass

# === Mission Control Test ===
print(get_mission("Apollo 11"))
print(get_mission("Voyager 1"))

add_mission("Mars 2030", 2030, 6, "Mars")
print(get_mission("Mars 2030"))`,hint:'Use missions.get(name, "Mission not found") for safe lookup. For add_mission, create a new dict and assign it: missions[name] = {"year": year, ...}',conceptTags:["dictionary","key-value","lookup"]},{id:2,title:"Signal Counter",description:`Count signal frequencies from a communication log using a dictionary.

Given a list of signal codes, count how many times each appears.

Requirements:
1. Take a list of signal codes (strings)
2. Return a dictionary with {code: count}
3. Handle codes you haven't seen before

Test with: ["ALPHA", "BETA", "ALPHA", "GAMMA", "BETA", "ALPHA"]
Expected: {"ALPHA": 3, "BETA": 2, "GAMMA": 1}`,starterCode:`# MISSION: Signal Counter

def count_signals(signals):
    counts = {}
    for signal in signals:
        # Count each signal
        pass
    return counts

# === Mission Control Test ===
log = ["ALPHA", "BETA", "ALPHA", "GAMMA", "BETA", "ALPHA", "DELTA", "ALPHA"]
result = count_signals(log)

print("Signal frequencies:")
for signal, count in result.items():
    print(f"  {signal}: {count}")

# Find most common signal
most_common = max(result, key=result.get)
print(f"\\nMost common: {most_common}")`,hint:"Use counts.get(signal, 0) to get current count (defaulting to 0), then add 1 and assign back: counts[signal] = counts.get(signal, 0) + 1",conceptTags:["dictionary","counting","iteration"]},{id:3,title:"Crew Lookup System",description:`Build a fast crew lookup system where you can find crew members by their ID.

Requirements:
1. Create crew_by_id dict from a list of crew dicts
2. Each crew dict has: id, name, role, mission
3. Build a lookup dict where key=id, value=crew dict
4. Implement find_crew(crew_id) - O(1) lookup!
5. Compare to searching a list (conceptually)`,starterCode:`# MISSION: Crew Lookup System

crew_list = [
    {"id": "A001", "name": "Neil Armstrong", "role": "Commander", "mission": "Apollo 11"},
    {"id": "A002", "name": "Buzz Aldrin", "role": "Pilot", "mission": "Apollo 11"},
    {"id": "A003", "name": "Michael Collins", "role": "Pilot", "mission": "Apollo 11"},
    {"id": "G001", "name": "John Glenn", "role": "Pilot", "mission": "Mercury 6"},
]

# Build the lookup dictionary
crew_by_id = {}
for crew in crew_list:
    # Add to lookup dict
    pass

def find_crew(crew_id):
    # O(1) lookup using the dictionary
    pass

# === Mission Control Test ===
print("Finding A002:", find_crew("A002"))
print("Finding G001:", find_crew("G001"))
print("Finding X999:", find_crew("X999"))

# Why is this better than searching the list?
# List search: O(N) - check each item
# Dict lookup: O(1) - direct access by key`,hint:'Build lookup: crew_by_id[crew["id"]] = crew. For find_crew, use crew_by_id.get(crew_id, "Not found") for safe access.',conceptTags:["dictionary","indexing","O(1)-lookup"]},{id:4,title:"Hash Table Simulation",description:`Simulate a simple hash table to understand how dictionaries work internally.

Create a SimpleHashTable class with:
1. Fixed size table (list of lists for chaining)
2. _hash(key) - returns key's hash % table_size
3. put(key, value) - stores at hashed position
4. get(key) - retrieves value by key
5. show() - displays table structure

This demonstrates chaining collision resolution.`,starterCode:`# MISSION: Hash Table Simulation

class SimpleHashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # List of lists
    
    def _hash(self, key):
        # Return hash(key) % self.size
        pass
    
    def put(self, key, value):
        # Find slot, append (key, value) tuple
        pass
    
    def get(self, key):
        # Find slot, search for key, return value
        pass
    
    def show(self):
        # Display table structure
        for i, bucket in enumerate(self.table):
            print(f"Slot {i}: {bucket}")

# === Mission Control Test ===
ht = SimpleHashTable(5)  # Small table to see collisions

ht.put("Apollo", 11)
ht.put("Gemini", 8)
ht.put("Mercury", 6)
ht.put("Voyager", 1)
ht.put("Pioneer", 10)

print("Hash Table Structure:")
ht.show()

print("\\nLookups:")
print(f"Apollo: {ht.get('Apollo')}")
print(f"Voyager: {ht.get('Voyager')}")`,hint:"For put: slot = self._hash(key), then self.table[slot].append((key, value)). For get: find slot, loop through bucket looking for matching key.",conceptTags:["hash-table","chaining","collision"]}],pg=({mode:y,challengeId:S,levelId:_,onBack:u,colorTheme:O,totalChallenges:E=10,onNextChallenge:A,onPrevChallenge:k,onBackToBase:M,onSpeakWithBase:b,onFinishExploration:B})=>{const D=O==="orange",G=D?"text-nasa-orange":"text-nasa-teal",L=D?"border-nasa-orange":"border-nasa-teal",Y=D?"bg-nasa-orange":"bg-nasa-teal",I=D?"hover:bg-nasa-orange/80":"hover:bg-nasa-teal/80",[Z,ce]=P.useState(0),[V,J]=P.useState(!1);let $=Z0,j=Yf;_===2?($=K0,j=Ff):_===3?($=$0,j=If):_===4?($=W0,j=Qf):_===5?($=J0,j=Vf):_===6?($=P0,j=Xf):_===7?($=eg,j=Zf):_===8?($=tg,j=Kf):_===9?($=ag,j=$f):_===10?($=ng,j=Wf):_===11?($=ig,j=Jf):_===12?($=sg,j=Pf):_===13?($=lg,j=eh):_===14?($=rg,j=th):_===15?($=og,j=ah):_===16?($=cg,j=nh):_===17?($=ug,j=ih):_===18?($=dg,j=sh):_===19?($=fg,j=lh):_===20&&($=hg,j=rh);const z=S?j.find(ae=>ae.id===S):null,H=y==="CHALLENGE"&&z?z.starterCode:`# Mission Control Playground
# Level ${_}: ${y==="BASE"?"Manual":"Challenge"}

print("System Ready")`,xe=ae=>{ce(Z===ae?null:ae)},ee=ae=>{switch(ae){case 1:return"Variables & I/O";case 2:return"Seq. & Selection";case 3:return"Loops & Iteration";case 4:return"String Ops";case 5:return"Lists (Arrays)";case 6:return"Stacks & Queues";case 7:return"Modular Programming";case 8:return"File Processing";case 9:return"Robustness & Debugging";case 10:return"Searching Algorithms";case 11:return"Sorting Algorithms";case 12:return"OOP Fundamentals";case 13:return"Encapsulation";case 14:return"Recursive Algorithms";case 15:return"Inheritance & Poly";case 16:return"Linked Lists";case 17:return"Trees (BST)";case 18:return"Sets";case 19:return"Design Patterns";case 20:return"Hashing & Dicts";default:return`Level ${ae}`}},ue=S!==void 0&&S>1,Fe=S!==void 0&&S<E,De=y==="BASE"||y==="CHALLENGE"&&V,be=()=>l.jsxs("div",{className:"space-y-4",children:[l.jsxs("div",{className:"mb-6",children:[l.jsx("h1",{className:"font-display font-bold text-3xl uppercase mb-2",children:ee(_)}),l.jsx("p",{className:"text-nasa-grey text-sm",children:"Base Knowledge Database"})]}),$.map((ae,x)=>{const R=Z===x;return l.jsxs("div",{className:`bg-white/5 rounded border transition-all duration-300 ${R?"border-white/20":"border-transparent hover:border-white/10"}`,children:[l.jsxs("button",{onClick:()=>xe(x),className:"w-full flex items-center justify-between p-4 text-left focus:outline-none",children:[l.jsx("h3",{className:`font-bold text-lg ${R?G:"text-gray-300"}`,children:ae.title}),R?l.jsx(s0,{size:20,className:G}):l.jsx(Fs,{size:20,className:"text-gray-500"})]}),R&&l.jsxs("div",{className:"px-4 pb-4 animate-in slide-in-from-top-2 duration-200",children:[l.jsx("div",{className:"h-px w-full bg-white/10 mb-4"}),l.jsx("p",{className:"text-sm leading-relaxed mb-4 text-gray-300 whitespace-pre-wrap",children:ae.content}),ae.tableData&&l.jsx("div",{className:"mb-4 overflow-hidden rounded border border-white/10",children:l.jsxs("table",{className:"w-full text-sm",children:[l.jsx("thead",{className:"bg-white/10 text-nasa-cream font-bold",children:l.jsx("tr",{children:ae.tableData.headers.map((K,pe)=>l.jsx("th",{className:"p-2 text-left border-b border-white/10 font-mono text-xs uppercase tracking-wider",children:K},pe))})}),l.jsx("tbody",{className:"font-mono text-xs",children:ae.tableData.rows.map((K,pe)=>l.jsx("tr",{className:"border-b border-white/5 last:border-none hover:bg-white/5 transition-colors",children:K.map((_e,f)=>l.jsx("td",{className:"p-2 text-gray-400 border-r border-white/5 last:border-none",children:l.jsx("code",{className:f===0?`font-bold ${G}`:"",children:_e})},f))},pe))})]})}),ae.codeExample&&l.jsx("div",{className:"bg-black/50 p-3 rounded border-l-2 border-nasa-grey/50 font-mono text-xs overflow-x-auto",children:l.jsx("pre",{className:"text-green-400",children:ae.codeExample})})]})]},x)})]}),Oe=()=>l.jsx("div",{className:"space-y-6",children:z&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{children:[l.jsx("h1",{className:"font-display font-bold text-2xl uppercase mb-4 text-white leading-tight",children:z.title}),l.jsx("div",{className:`inline-block px-2 py-1 border ${L} text-xs font-bold mb-4 ${G}`,children:"ACTIVE TASK"})]}),l.jsxs("div",{className:`bg-white/5 p-4 rounded border-l-4 ${L}`,children:[l.jsx("h3",{className:"text-xs uppercase text-nasa-grey mb-2 tracking-widest",children:"Description"}),l.jsx("p",{className:"text-sm leading-relaxed whitespace-pre-wrap",children:z.description})]}),l.jsxs("div",{className:"bg-nasa-blue/20 p-4 rounded border border-nasa-blue/30",children:[l.jsx("h3",{className:"text-xs uppercase text-nasa-blue mb-2 tracking-widest font-bold",children:"Hint"}),l.jsxs("p",{className:"text-xs text-nasa-blue/80 italic",children:['"',z.hint,'"']})]})]})});return l.jsxs("div",{className:"fixed inset-0 z-50 bg-[#0B0D17] flex flex-col font-mono text-nasa-cream animate-in fade-in duration-300",children:[l.jsxs("div",{className:"flex items-center justify-between px-4 py-2 bg-[#0a0c14] border-b border-nasa-grey/20",children:[l.jsxs("button",{onClick:u,className:"flex items-center gap-2 px-3 py-1.5 text-nasa-grey hover:text-white text-xs uppercase tracking-wider border border-nasa-grey/30 rounded hover:border-white/30 transition-colors",children:[l.jsx(_0,{size:14}),l.jsx("span",{className:"hidden sm:inline",children:"Back to Map"})]}),l.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[l.jsxs("span",{className:"text-nasa-grey",children:["L",_]}),l.jsx("span",{className:G,children:"•"}),l.jsx("span",{className:"text-nasa-cream",children:y==="BASE"?"Mission Manual":V?`Manual (Challenge ${S})`:`Challenge ${S}/${E}`})]}),l.jsxs("div",{className:"flex items-center gap-2",children:[b&&l.jsxs("button",{onClick:b,className:`flex items-center gap-1 px-3 py-1.5 text-xs uppercase tracking-wider border rounded transition-colors ${G} ${L} hover:bg-white/5`,children:[l.jsx(Fa,{size:12,className:"animate-pulse"}),l.jsx("span",{className:"hidden sm:inline",children:"Contact Base"})]}),B&&l.jsxs("button",{onClick:B,className:"flex items-center gap-1 px-3 py-1.5 text-nasa-cream/70 hover:text-white text-xs uppercase tracking-wider border border-nasa-cream/20 rounded hover:border-white/30 transition-colors",children:[l.jsx(Is,{size:12}),l.jsx("span",{className:"hidden sm:inline",children:"End"})]})]})]}),l.jsxs("div",{className:"flex-1 flex flex-col md:flex-row overflow-hidden",children:[l.jsxs("div",{className:"w-full md:w-1/3 flex flex-col border-r border-nasa-grey/30 bg-[#12141d] h-full overflow-hidden",children:[l.jsxs("div",{className:"p-4 border-b border-nasa-grey/30 flex items-center justify-between bg-nasa-black",children:[l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("button",{onClick:u,className:"hover:text-white text-nasa-grey transition-colors",children:l.jsx(Uf,{size:20})}),l.jsxs("div",{className:"flex items-center gap-2",children:[De?l.jsx(jf,{size:18,className:G}):l.jsx(Df,{size:18,className:G}),l.jsx("span",{className:"font-bold uppercase tracking-wider text-sm",children:De?`Level ${_} Manual`:`L${_}: Task #${S}`})]})]}),y==="CHALLENGE"&&l.jsxs("button",{onClick:()=>J(!V),className:`flex items-center gap-2 px-2 py-1 rounded text-xs transition-all ${V?`${Y} text-white`:`border ${L} ${G} hover:bg-white/5`}`,title:V?"Show Challenge":"Show Manual",children:[V?l.jsx(R0,{size:16}):l.jsx(j0,{size:16}),l.jsx("span",{className:"hidden sm:inline",children:V?"Task":"Ref"})]})]}),l.jsx("div",{className:"flex-1 overflow-y-auto p-6 custom-scrollbar",children:De?be():Oe()}),y==="CHALLENGE"&&l.jsxs("div",{className:"p-3 border-t border-nasa-grey/30 bg-[#0a0c14]",children:[l.jsxs("div",{className:"flex items-center justify-between gap-2",children:[l.jsxs("button",{onClick:k,disabled:!ue,className:`
                    flex items-center gap-1 px-3 py-2 rounded text-xs uppercase tracking-wider
                    border transition-all duration-200
                    ${ue?"border-nasa-grey/50 text-nasa-grey hover:text-white hover:border-white/50 hover:bg-white/5":"border-nasa-grey/20 text-nasa-grey/30 cursor-not-allowed"}
                  `,children:[l.jsx(Bf,{size:14}),l.jsx("span",{className:"hidden sm:inline",children:"Prev"})]}),l.jsxs("button",{onClick:()=>J(!V),className:`
                    flex items-center gap-1 px-4 py-2 rounded text-xs uppercase tracking-wider
                    border transition-all duration-200
                    ${V?`${Y} ${I} text-white border-transparent`:`${L} ${G} hover:bg-white/5`}
                  `,children:[V?l.jsx(Df,{size:14}):l.jsx(jf,{size:14}),l.jsx("span",{children:V?"Task":"Manual"})]}),l.jsxs("button",{onClick:A,disabled:!Fe,className:`
                    flex items-center gap-1 px-3 py-2 rounded text-xs uppercase tracking-wider
                    transition-all duration-200
                    ${Fe?`${Y} ${I} text-white`:"bg-nasa-grey/20 text-nasa-grey/30 cursor-not-allowed"}
                  `,children:[l.jsx("span",{className:"hidden sm:inline",children:"Next"}),l.jsx(Fs,{size:14})]})]}),l.jsx("div",{className:"mt-2 flex items-center gap-1",children:Array.from({length:E},(ae,x)=>l.jsx("div",{className:`
                      flex-1 h-1 rounded-full transition-colors
                      ${x+1<(S||0)?Y:x+1===S?`${Y} animate-pulse`:"bg-white/10"}
                    `},x))})]})]}),l.jsx("div",{className:"w-full md:w-2/3 h-full",children:l.jsx(X0,{initialCode:H})})]})]})},mg=y=>{var _;return((_={1:Yf,2:Ff,3:If,4:Qf,5:Vf,6:Xf,7:Zf,8:Kf,9:$f,10:Wf,11:Jf,12:Pf,13:eh,14:th,15:ah,16:nh,17:ih,18:sh,19:lh,20:rh}[y])==null?void 0:_.length)||10},gg=({level:y,onBack:S,colorTheme:_,onSpeakWithBase:u,onFinishExploration:O})=>{const[E,A]=P.useState("MAP"),[k,M]=P.useState(0),[b,B]=P.useState([0]),[D,G]=P.useState(!0),L=_==="orange",Y=L?"text-nasa-orange border-nasa-orange":"text-nasa-teal border-nasa-teal",I=L?"hover:shadow-[0_0_15px_rgba(204,85,0,0.3)]":"hover:shadow-[0_0_15px_rgba(77,139,139,0.3)]",Z=mg(y.id),ce=Z+2;P.useEffect(()=>{const H=setTimeout(()=>G(!1),500);return()=>clearTimeout(H)},[]);const V=H=>{H>Math.max(...b)+1||(M(H),H!==ce-1&&setTimeout(()=>{A("WORKSPACE")},1e3))},J=()=>{b.includes(k)||B([...b,k]),A("MAP")},$=()=>{const H=k+1;H<=Z&&(b.includes(k)||B([...b,k]),M(H))},j=()=>{const H=k-1;H>=1&&M(H)},z=()=>{b.includes(k)||B([...b,k]),M(0)};return l.jsxs("div",{className:"relative w-full h-screen bg-black overflow-hidden",children:[l.jsx("div",{className:`absolute inset-0 bg-black z-[100] pointer-events-none transition-opacity duration-1000 ${D?"opacity-100":"opacity-0"}`}),E==="MAP"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center",children:[l.jsxs("button",{onClick:S,className:"flex items-center gap-2 text-nasa-grey hover:text-white uppercase font-mono text-xs tracking-widest border border-nasa-grey/50 px-4 py-2 rounded bg-black/50 backdrop-blur transition-colors",children:[l.jsx(Ia,{size:14,className:"rotate-[-45deg]"}),"Return to Ship"]}),l.jsxs("div",{className:"flex items-center gap-2",children:[u&&l.jsxs("button",{onClick:u,className:`flex items-center gap-2 px-4 py-2 rounded bg-black/50 backdrop-blur border font-mono text-xs uppercase tracking-widest transition-all ${Y} ${I}`,children:[l.jsx(Fa,{size:14,className:"animate-pulse"}),"Contact Base"]}),O&&l.jsxs("button",{onClick:O,className:"flex items-center gap-2 text-nasa-cream hover:text-white uppercase font-mono text-xs tracking-widest border border-nasa-cream/30 px-4 py-2 rounded bg-black/50 backdrop-blur transition-colors hover:border-white/50",children:[l.jsx(Is,{size:14}),"End Mission"]})]})]}),l.jsx(V0,{onNodeClick:V,currentNode:k,completedNodes:b,colorTheme:_,totalNodes:ce,challengeCount:Z})]}):l.jsx(pg,{mode:k===0?"BASE":"CHALLENGE",challengeId:k===0?void 0:k,levelId:y.id,onBack:J,colorTheme:_,totalChallenges:Z,onNextChallenge:$,onPrevChallenge:j,onBackToBase:z,onSpeakWithBase:u,onFinishExploration:O})]})},yg=()=>{const[y,S]=P.useState(0);P.useEffect(()=>{const A=()=>S(window.scrollY);return window.addEventListener("scroll",A,{passive:!0}),()=>window.removeEventListener("scroll",A)},[]);const _=P.useMemo(()=>Array.from({length:200}).map((A,k)=>({id:k,left:`${Math.random()*100}%`,top:`${Math.random()*300}%`,size:Math.random()*1.5+.5,opacity:Math.random()*.4+.1,twinkleDelay:`${Math.random()*8}s`,twinkleDuration:`${Math.random()*3+4}s`})),[]),u=P.useMemo(()=>Array.from({length:150}).map((A,k)=>({id:k,left:`${Math.random()*100}%`,top:`${Math.random()*300}%`,size:Math.random()*2+1,opacity:Math.random()*.5+.3,twinkleDelay:`${Math.random()*5}s`,twinkleDuration:`${Math.random()*2+2}s`})),[]),O=P.useMemo(()=>Array.from({length:50}).map((A,k)=>({id:k,left:`${Math.random()*100}%`,top:`${Math.random()*300}%`,size:Math.random()*3+2,opacity:Math.random()*.3+.6,hue:Math.random()>.7?Math.random()>.5?30:180:0,twinkleDelay:`${Math.random()*3}s`})),[]),E=P.useMemo(()=>Array.from({length:5}).map((A,k)=>({id:k,startX:Math.random()*100,startY:Math.random()*50,delay:k*8+Math.random()*5,duration:Math.random()*.5+.5})),[]);return l.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:[l.jsx("style",{children:`
        @keyframes twinkle {
          0%, 100% { opacity: var(--base-opacity); transform: scale(1); }
          50% { opacity: calc(var(--base-opacity) * 0.3); transform: scale(0.8); }
        }
        @keyframes twinkle-bright {
          0%, 100% { opacity: var(--base-opacity); filter: blur(0px); }
          50% { opacity: calc(var(--base-opacity) * 1.3); filter: blur(1px); }
        }
        @keyframes nebula-drift {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(20px, -10px) rotate(2deg) scale(1.02); }
          66% { transform: translate(-10px, 15px) rotate(-1deg) scale(0.98); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(200px) translateY(200px); opacity: 0; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .star-distant { animation: twinkle var(--twinkle-duration) ease-in-out infinite; }
        .star-mid { animation: twinkle var(--twinkle-duration) ease-in-out infinite; }
        .star-near { animation: twinkle-bright 3s ease-in-out infinite; }
      `}),l.jsx("div",{className:"absolute inset-0",style:{background:`
            radial-gradient(ellipse 150% 100% at 20% 100%, #0d1b2a 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 80% 0%, #1b263b 0%, transparent 40%),
            linear-gradient(180deg, #0a0a0f 0%, #0d1117 50%, #0f1419 100%)
          `}}),l.jsx("div",{className:"fixed top-[-20%] left-[-10%] w-[80vw] h-[80vh] opacity-30 pointer-events-none",style:{background:"radial-gradient(ellipse at center, rgba(26, 43, 76, 0.8) 0%, rgba(26, 43, 76, 0.2) 40%, transparent 70%)",filter:"blur(60px)",animation:"nebula-drift 45s ease-in-out infinite",transform:`translateY(${y*.02}px)`}}),l.jsx("div",{className:"fixed top-[30%] right-[-15%] w-[70vw] h-[70vh] pointer-events-none",style:{background:"radial-gradient(ellipse at center, rgba(204, 85, 0, 0.15) 0%, rgba(180, 70, 0, 0.05) 30%, transparent 60%)",filter:"blur(80px)",animation:"nebula-pulse 20s ease-in-out infinite, nebula-drift 50s ease-in-out infinite reverse",transform:`translateY(${y*.03}px)`}}),l.jsx("div",{className:"fixed bottom-[-10%] left-[20%] w-[60vw] h-[60vh] pointer-events-none",style:{background:"radial-gradient(ellipse at center, rgba(77, 139, 139, 0.2) 0%, rgba(77, 139, 139, 0.05) 35%, transparent 60%)",filter:"blur(70px)",animation:"nebula-drift 40s ease-in-out infinite",animationDelay:"-20s",transform:`translateY(${y*.015}px)`}}),l.jsx("div",{className:"absolute inset-0 w-full",style:{height:"300%",transform:`translateY(${y*-.05}px)`},children:_.map(A=>l.jsx("div",{className:"absolute rounded-full star-distant",style:{left:A.left,top:A.top,width:`${A.size}px`,height:`${A.size}px`,backgroundColor:"rgba(255, 255, 255, 0.9)","--base-opacity":A.opacity,"--twinkle-duration":A.twinkleDuration,animationDelay:A.twinkleDelay,opacity:A.opacity}},`distant-${A.id}`))}),l.jsx("div",{className:"absolute inset-0 w-full",style:{height:"300%",transform:`translateY(${y*-.1}px)`},children:u.map(A=>l.jsx("div",{className:"absolute rounded-full star-mid",style:{left:A.left,top:A.top,width:`${A.size}px`,height:`${A.size}px`,backgroundColor:"#fff","--base-opacity":A.opacity,"--twinkle-duration":A.twinkleDuration,animationDelay:A.twinkleDelay,opacity:A.opacity}},`mid-${A.id}`))}),l.jsx("div",{className:"absolute inset-0 w-full",style:{height:"300%",transform:`translateY(${y*-.15}px)`},children:O.map(A=>l.jsx("div",{className:"absolute rounded-full star-near",style:{left:A.left,top:A.top,width:`${A.size}px`,height:`${A.size}px`,backgroundColor:A.hue===0?"#fff":`hsl(${A.hue}, 60%, 85%)`,boxShadow:`0 0 ${A.size*2}px ${A.size}px rgba(255, 255, 255, 0.3)`,"--base-opacity":A.opacity,animationDelay:A.twinkleDelay,opacity:A.opacity}},`near-${A.id}`))}),E.map(A=>l.jsx("div",{className:"fixed w-[2px] h-[80px] pointer-events-none",style:{left:`${A.startX}%`,top:`${A.startY}%`,background:"linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",transform:"rotate(45deg)",animation:`shooting-star ${A.duration}s ease-out infinite`,animationDelay:`${A.delay}s`,opacity:0}},`shooting-${A.id}`)),l.jsx("div",{className:"fixed inset-0 pointer-events-none",style:{background:"radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.4) 100%)"}}),l.jsx("div",{className:"fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay",style:{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,backgroundSize:"200px 200px",animation:"grain 0.5s steps(10) infinite"}}),l.jsx("div",{className:"fixed inset-0 pointer-events-none opacity-[0.02]",style:{background:"repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)"}})]})},bg=({isOpen:y,onClose:S,phases:_,onTeleport:u,colorTheme:O})=>{const[E,A]=P.useState(null),[k,M]=P.useState(!1),[b,B]=P.useState([]),D=O==="orange",G=D?"#CC5500":"#4D8B8B",L=D?"text-nasa-orange":"text-nasa-teal",Y=D?"border-nasa-orange":"border-nasa-teal",I=D?"shadow-[0_0_60px_rgba(204,85,0,0.3)]":"shadow-[0_0_60px_rgba(77,139,139,0.3)]";P.useEffect(()=>{if(y){const V=Array.from({length:30},(J,$)=>({id:$,x:Math.random()*100,y:Math.random()*100,delay:Math.random()*2}));B(V)}},[y]);const Z=V=>{A(V)},ce=()=>{E&&(M(!0),setTimeout(()=>{u(E.id),M(!1),A(null)},800))};return y?l.jsxs("div",{className:`fixed inset-0 z-[200] flex items-center justify-center ${k?"teleporting":""}`,children:[l.jsx("div",{className:"absolute inset-0 bg-black/90 backdrop-blur-sm",onClick:S,children:b.map(V=>l.jsx("div",{className:"absolute w-1 h-1 bg-white rounded-full animate-pulse",style:{left:`${V.x}%`,top:`${V.y}%`,animation:`particle-pull 3s ease-in infinite ${V.delay}s`,opacity:.6}},V.id))}),l.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden",children:l.jsx("div",{className:"w-[150vmax] h-[150vmax] rounded-full opacity-30",style:{background:`conic-gradient(from 0deg, ${G}, #1A2B4C, ${G}, #0B0D17, ${G})`,animation:"wormhole-spin 8s linear infinite"}})}),l.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:l.jsx("div",{className:"w-[800px] h-[800px] rounded-full border-4 opacity-20",style:{borderColor:G,animation:"wormhole-spin 6s linear infinite reverse"}})}),l.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:l.jsx("div",{className:`w-[600px] h-[600px] rounded-full ${I}`,style:{background:`radial-gradient(circle, transparent 40%, ${G}22 60%, transparent 70%)`,animation:"wormhole-pulse 2s ease-in-out infinite"}})}),l.jsxs("div",{className:`
        relative z-10 w-full max-w-2xl max-h-[80vh] mx-4
        bg-[#0B0D17]/95 backdrop-blur-md
        border-2 ${Y} rounded-lg overflow-hidden
        ${I}
      `,children:[l.jsx("div",{className:`p-4 border-b ${Y} bg-[#1A2B4C]/50`,children:l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsxs("div",{className:"flex items-center gap-3",children:[l.jsx("div",{className:`p-2 rounded-full bg-black/50 ${L}`,children:l.jsx(Fa,{size:20,className:"animate-pulse"})}),l.jsxs("div",{children:[l.jsx("h2",{className:"font-display font-bold text-lg uppercase tracking-widest text-nasa-cream",children:"Contact Base"}),l.jsx("p",{className:"text-xs text-nasa-grey font-mono",children:"/// WORMHOLE TRANSIT SYSTEM ///"})]})]}),l.jsx("button",{onClick:S,className:"p-2 text-nasa-grey hover:text-white transition-colors",children:l.jsx(Hf,{size:20})})]})}),l.jsxs("div",{className:"px-4 py-3 bg-black/30 border-b border-white/10 flex items-center gap-2",children:[l.jsx(qf,{size:14,className:`${L} animate-pulse`}),l.jsx("span",{className:"font-mono text-xs text-nasa-grey uppercase tracking-wider",children:"Transmission Received — Select Destination Coordinates"})]}),l.jsx("div",{className:"overflow-y-auto max-h-[50vh] p-4 space-y-4 custom-scrollbar",children:_.map(V=>l.jsxs("div",{className:"space-y-2",children:[l.jsxs("div",{className:"flex items-center gap-2 py-2 border-b border-white/10",children:[l.jsx(Qs,{size:12,className:L}),l.jsx("span",{className:`font-mono text-xs uppercase tracking-widest ${L}`,children:V.title}),V.isHLOnly&&l.jsx("span",{className:"ml-2 px-2 py-0.5 bg-nasa-teal/20 text-nasa-teal text-[10px] font-mono rounded",children:"HL"})]}),l.jsx("div",{className:"space-y-1 pl-4",children:V.levels.map(J=>l.jsxs("button",{onClick:()=>Z(J),className:`
                      w-full text-left p-3 rounded transition-all duration-200
                      ${(E==null?void 0:E.id)===J.id?`bg-white/10 border ${Y}`:"bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20"}
                    `,children:[l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsxs("div",{children:[l.jsxs("span",{className:`font-mono text-xs ${L} mr-2`,children:["[",J.syllabus,"]"]}),l.jsx("span",{className:"font-bold text-sm text-nasa-cream",children:J.title})]}),(E==null?void 0:E.id)===J.id&&l.jsx("div",{className:`w-2 h-2 rounded-full bg-current ${L} animate-pulse`})]}),l.jsx("p",{className:"text-xs text-nasa-grey mt-1 line-clamp-1",children:J.description})]},J.id))})]},V.id))}),l.jsx("div",{className:`p-4 border-t ${Y} bg-[#1A2B4C]/30`,children:l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsx("div",{className:"text-xs font-mono text-nasa-grey",children:E?l.jsxs("span",{children:["Target: ",l.jsx("span",{className:L,children:E.title})]}):l.jsx("span",{children:"Select a destination to initiate wormhole transit"})}),l.jsxs("button",{onClick:ce,disabled:!E||k,className:`
                flex items-center gap-2 px-6 py-2 rounded
                font-mono text-sm uppercase tracking-wider
                transition-all duration-300
                ${E?`${D?"bg-nasa-orange hover:bg-nasa-orange/80":"bg-nasa-teal hover:bg-nasa-teal/80"} text-white`:"bg-white/10 text-nasa-grey cursor-not-allowed"}
                ${k?"animate-pulse":""}
              `,children:[l.jsx(Ia,{size:16,className:k?"animate-spin":""}),k?"Teleporting...":"Initiate Transit"]})]})})]}),k&&l.jsx("div",{className:"fixed inset-0 z-[300] pointer-events-none",style:{background:`radial-gradient(circle at center, ${G} 0%, transparent 70%)`,animation:"teleport-flash 0.8s ease-out forwards"}})]}):null},vg=({onSpeakWithBase:y,onFinishExploration:S,onReturnToShip:_,showReturnToShip:u=!1,colorTheme:O,position:E="left"})=>{const A=O==="orange",k=A?"text-nasa-orange border-nasa-orange hover:bg-nasa-orange/20":"text-nasa-teal border-nasa-teal hover:bg-nasa-teal/20",M=A?"hover:shadow-[0_0_15px_rgba(204,85,0,0.3)]":"hover:shadow-[0_0_15px_rgba(77,139,139,0.3)]";return E==="top"?l.jsx("div",{className:"fixed top-0 left-0 right-0 z-[100] pointer-events-none",children:l.jsxs("div",{className:"max-w-7xl mx-auto px-4 py-3 flex justify-between items-center",children:[l.jsxs("button",{onClick:y,className:`
              pointer-events-auto flex items-center gap-2 px-4 py-2
              bg-[#0B0D17]/90 backdrop-blur-sm border rounded
              font-mono text-xs uppercase tracking-wider
              transition-all duration-300 ${k} ${M}
            `,children:[l.jsx(Fa,{size:14,className:"animate-pulse"}),l.jsx("span",{className:"hidden sm:inline",children:"Speak with Base"})]}),l.jsxs("div",{className:"flex items-center gap-2 pointer-events-auto",children:[u&&_&&l.jsxs("button",{onClick:_,className:`
                  flex items-center gap-2 px-4 py-2
                  bg-[#0B0D17]/90 backdrop-blur-sm border rounded
                  font-mono text-xs uppercase tracking-wider
                  transition-all duration-300 text-nasa-grey border-nasa-grey/50
                  hover:text-white hover:border-white/50
                `,children:[l.jsx(Uf,{size:14}),l.jsx("span",{className:"hidden sm:inline",children:"Return to Ship"})]}),l.jsxs("button",{onClick:S,className:`
                flex items-center gap-2 px-4 py-2
                bg-[#0B0D17]/90 backdrop-blur-sm border rounded
                font-mono text-xs uppercase tracking-wider
                transition-all duration-300 text-nasa-cream border-nasa-cream/30
                hover:text-white hover:border-white/50 hover:bg-white/10
              `,children:[l.jsx(Is,{size:14}),l.jsx("span",{className:"hidden sm:inline",children:"Finish Exploration"})]})]})]})}):l.jsx("div",{className:"fixed left-0 top-1/2 -translate-y-1/2 z-[100] pointer-events-none",children:l.jsxs("div",{className:"flex flex-col gap-3 p-3 pointer-events-auto",children:[l.jsxs("button",{onClick:y,className:`
            group relative flex flex-col items-center gap-1 p-3
            bg-[#0B0D17]/95 backdrop-blur-sm border-2 rounded-lg
            transition-all duration-300 ${k} ${M}
          `,children:[l.jsxs("div",{className:"relative",children:[l.jsx(Fa,{size:24,className:"animate-pulse"}),l.jsx("div",{className:`absolute inset-0 rounded-full animate-ping opacity-30 ${A?"bg-nasa-orange":"bg-nasa-teal"}`,style:{animationDuration:"2s"}})]}),l.jsxs("span",{className:"text-[10px] font-mono uppercase tracking-wider text-center leading-tight",children:["Contact",l.jsx("br",{}),"Base"]}),l.jsx("div",{className:`
            absolute left-full ml-2 px-3 py-2 
            bg-black/95 border ${A?"border-nasa-orange":"border-nasa-teal"} rounded
            opacity-0 group-hover:opacity-100 pointer-events-none
            transition-opacity duration-200 whitespace-nowrap
          `,children:l.jsx("span",{className:"text-xs font-mono",children:"Quick Jump to any Level"})})]}),u&&_&&l.jsxs("button",{onClick:_,className:`
              group relative flex flex-col items-center gap-1 p-3
              bg-[#0B0D17]/95 backdrop-blur-sm border-2 rounded-lg
              transition-all duration-300 text-nasa-grey border-nasa-grey/50
              hover:text-white hover:border-white/50 hover:bg-white/10
            `,children:[l.jsx(Ia,{size:24,className:"rotate-[-45deg]"}),l.jsxs("span",{className:"text-[10px] font-mono uppercase tracking-wider text-center leading-tight",children:["Return",l.jsx("br",{}),"to Ship"]})]}),l.jsxs("button",{onClick:S,className:`
            group relative flex flex-col items-center gap-1 p-3
            bg-[#0B0D17]/95 backdrop-blur-sm border-2 rounded-lg
            transition-all duration-300 text-nasa-cream border-nasa-cream/30
            hover:text-white hover:border-white/50 hover:bg-white/10
          `,children:[l.jsx(Is,{size:24}),l.jsxs("span",{className:"text-[10px] font-mono uppercase tracking-wider text-center leading-tight",children:["End",l.jsx("br",{}),"Mission"]}),l.jsx("div",{className:`
            absolute left-full ml-2 px-3 py-2 
            bg-black/95 border border-nasa-cream/30 rounded
            opacity-0 group-hover:opacity-100 pointer-events-none
            transition-opacity duration-200 whitespace-nowrap
          `,children:l.jsx("span",{className:"text-xs font-mono",children:"Return to IB Portal"})})]})]})})};function xg(){const[y,S]=P.useState("HOME"),[_,u]=P.useState(null),[O,E]=P.useState(1),[A,k]=P.useState(null),[M,b]=P.useState(!1),B=_==="SL"?"orange":"teal",D=Mf.filter(j=>_==="SL"?!j.isHLOnly:_==="HL"?j.isHLOnly:!0),G=D.flatMap(j=>j.levels),L=j=>{if(u(j),S("MAP"),j==="HL"){const z=Mf.find(H=>H.isHLOnly);z&&z.levels.length>0&&E(z.levels[0].id)}else E(1)},Y=j=>{j.id>O||(k(j),S("BRIEF"))},I=()=>{S("COUNTDOWN")},Z=()=>{S("LEVEL")},ce=()=>{if(S("MAP"),A&&A.id===O){const j=G.findIndex(z=>z.id===O);if(j>=0&&j<G.length-1){const z=G[j+1];E(z.id)}}},V=()=>{u(null),S("HOME"),E(1)},J=j=>{const z=G.find(H=>H.id===j);z&&(k(z),j>O&&E(j),b(!1),S("COUNTDOWN"))},$=()=>{window.location.href="../index.html"};return l.jsxs("div",{className:"relative w-full min-h-screen bg-[#0B0D17] font-sans text-nasa-cream selection:bg-nasa-orange selection:text-white overflow-x-hidden",children:[l.jsx(yg,{}),l.jsx("div",{className:"absolute inset-0 opacity-10 bg-blueprint bg-[length:40px_40px] pointer-events-none z-10"}),l.jsxs("div",{className:"relative z-20 w-full",children:[y==="HOME"&&l.jsx("div",{className:"h-screen",children:l.jsx(Y0,{onSelectPathway:L})}),y==="COUNTDOWN"&&l.jsx(I0,{onComplete:Z,colorTheme:B}),y==="LEVEL"&&A&&l.jsx(gg,{level:A,onBack:ce,colorTheme:B,onSpeakWithBase:()=>b(!0),onFinishExploration:$}),(y==="MAP"||y==="BRIEF")&&l.jsxs(l.Fragment,{children:[l.jsx(vg,{onSpeakWithBase:()=>b(!0),onFinishExploration:$,colorTheme:B,position:"left"}),l.jsxs("div",{className:"max-w-4xl mx-auto px-6 py-12 relative",children:[l.jsxs("header",{className:"mb-32 relative flex flex-col md:flex-row items-center justify-center z-50",children:[l.jsxs("button",{onClick:V,className:"md:absolute md:left-0 text-nasa-orange hover:text-white flex items-center gap-2 uppercase text-xs font-mono tracking-widest bg-nasa-black/50 p-2 rounded backdrop-blur-sm border border-nasa-orange/50 transition-colors mb-6 md:mb-0",children:[l.jsx(Bf,{size:16})," Abort Mission"]}),l.jsxs("div",{className:`inline-flex items-center gap-6 border-l-4 border-nasa-cream pl-6 py-2 backdrop-blur-md ${B==="orange"?"shadow-[-1px_0px_0px_0px_#CC5500]":"shadow-[-1px_0px_0px_0px_#4D8B8B]"}`,children:[l.jsx(Ia,{size:56,className:B==="orange"?"text-nasa-orange":"text-nasa-teal"}),l.jsxs("div",{className:"text-left",children:[l.jsxs("h1",{className:"font-display font-bold text-4xl md:text-5xl tracking-widest uppercase leading-none mb-1",children:["Python ",_]}),l.jsx("span",{className:"font-mono text-sm md:text-base text-nasa-grey tracking-[0.4em] block",children:"MISSION ROADMAP 2027"})]})]})]}),l.jsx("div",{className:"space-y-48 pb-64",children:D.map(j=>l.jsxs("div",{className:"relative",children:[l.jsx("div",{className:"sticky top-8 z-40 flex justify-center mb-32 pointer-events-none",children:l.jsx("div",{className:`
                          bg-nasa-blue/90 backdrop-blur-md border-2 
                          ${B==="orange"?"border-nasa-orange text-nasa-orange":"border-nasa-teal text-nasa-teal"} 
                          px-10 py-3 rounded-full font-display font-bold text-base md:text-lg shadow-2xl uppercase tracking-[0.2em]
                        `,children:j.title})}),l.jsx("div",{children:j.levels.map(z=>{const H=G.findIndex(xe=>xe.id===z.id);return l.jsx("div",{className:"relative",children:l.jsx(q0,{level:z,index:H,isCurrent:O===z.id,isCompleted:z.id<O,isLocked:z.id>O,onClick:()=>Y(z),colorTheme:B})},z.id)})})]},j.id))}),l.jsx("div",{className:"h-32 flex items-center justify-center text-nasa-grey/30 font-mono text-xs tracking-widest",children:"/// END OF TRANSMISSION ///"}),y==="BRIEF"&&A&&l.jsx(F0,{level:A,onAccept:I,onCancel:()=>S("MAP"),colorTheme:B})]})]})]}),l.jsx(bg,{isOpen:M,onClose:()=>b(!1),phases:D,onTeleport:J,colorTheme:B})]})}const oh=document.getElementById("root");if(!oh)throw new Error("Could not find root element to mount to");const _g=Fm.createRoot(oh);_g.render(l.jsx(zm.StrictMode,{children:l.jsx(xg,{})}));
