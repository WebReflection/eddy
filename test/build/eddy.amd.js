/*! (C) Andrea Giammarchi Mit Style License */
define(function(){(function(e){"use strict";function S(){return{w:{},l:{},m:[],b:[]}}function x(e,t,n){typeof t=="function"?t.apply(e,n):t.handleEvent.apply(t,n)}function T(e,t,n){n!==void 0&&b(this,"detail",n),b(this,"type",t),b(this,"target",e),b(this,"timeStamp",m())}if(e.eddy)return;e.eddy=!0;var t=Array.prototype,n=e.prototype,r=T.prototype,i=n.hasOwnProperty,s=t.push,o=t.slice,u=t.unshift,a="toLocaleString",f={toLocaleString:1}.propertyIsEnumerable(a)?"_@eddy"+Math.random():a,l=f===a,c=(e.create||e)(null),h=[],p=l?function(e,t,n){e[t]=n.value}:e.defineProperty,d=function(e){var t=this;return function(){return t.apply(e,arguments)}},v=t.indexOf||function(e){var t=this.length;while(t--&&this[t]!==e);return t},m=Date.now||function(){return(new Date).getTime()},g=function(e){var t=S();return c.value=t,p(e,f,c),c.value=null,t},y={boundTo:function(t,n){var r=i.call(this,f)?this[f]:g(this),o=r.m,u=r.b,a=typeof t=="string"?n==null||i.call(this,t)?this[t]:this[t]=n:t,l=v.call(o,a);return l<0?u[s.call(o,a)-1]=d.call(a,this):u[l]},emit:function(t){var n=i.call(this,f),r=n&&this[f].l,s=n&&i.call(r,t),u=s&&r[t].slice(0),a=s&&o.call(arguments,1),l=0,c=s?u.length:l;while(l<c)x(this,u[l++],a);return s},listeners:function(t){return i.call(this,f)&&i.call(this[f].l,t)&&this[f].l[t].slice()||[]},off:function(t,n){var r=i.call(this,f),s=r&&this[f].l,o=r&&i.call(s,t)&&s[t],u;return o&&(u=v.call(o,n),-1<u&&(o.splice(u,1),o.length||delete s[t])),this},on:function(t,n,r){var o=i.call(this,f),a=(o?this[f]:g(this)).l,l=o&&i.call(a,t)?a[t]:a[t]=[];return v.call(l,n)<0&&(r?u:s).call(l,n),this},once:function(t,n,r){var i=function(e){s.off(t,i,r),x(s,n,arguments)},s=this;return s.on(t,i,r)},trigger:function(t,n){var s=i.call(this,f),o=s&&this[f].l,u=typeof t=="string",a=u?t:t.type,l=s&&i.call(o,a),c=l&&o[a].slice(0),p=u?new T(this,a,n):t,d=0,v=l?c.length:d,m=!(p instanceof T);m&&(p._active=!0,p.stopImmediatePropagation=r.stopImmediatePropagation),p.currentTarget=this,h[0]=p;while(p._active&&d<v)x(this,c[d++],h);return m&&(delete p._active,delete p.stopImmediatePropagation),!p.defaultPrevented},when:function(e,t){var n=i.call(this,f),r=(n?this[f]:g(this)).w,s=n&&i.call(r,e);return s?(x(this,t,r[e]),this):this.once(e,function(){i.call(r,e)||(r[e]=arguments)},!0).once(e,t)}},b=function(e,t,n){i.call(e,t)||(e[t]=n)},w=!1,E;r.defaultPrevented=!1,r._active=r.cancelable=!0,r.preventDefault=function(){this.defaultPrevented=!0},r.stopImmediatePropagation=function(){this._active=!1};for(E in y)i.call(y,E)&&p(n,E,{enumerable:!1,configurable:!0,writable:!0,value:y[E]});(function(e){function n(t){function n(e){e[t].apply(e,this)}return function(){return e.call(this,n,arguments),this}}for(var r in y)y.hasOwnProperty(r)&&!/^listeners|boundTo$/.test(r)&&p(t,r,{enumerable:!1,configurable:!0,writable:!0,value:n(r)})})(t.forEach||function(e,t){var n=this,r=0;while(r<n.length)r in n&&e.call(t,n[r],r,n),r++});var N={boundTo:function(e){try{e.call(document.createElement("div"),function(){})}catch(t){g=function(e){return e[f]=S(),e[f]}}return e}(y.boundTo),data:function(e){function r(e){return e.replace(t,n)}var t=e?/-([a-z])/g:/([a-z])([A-Z])/g,n=e?function(e,t){return t.toUpperCase()}:function(e,t,n){return t+"-"+n.toLowerCase()};return e?function(t,n){return t=r(t),arguments.length<2?i.call(this.dataset,t)?this.dataset[t]:void 0:n==null?delete this.dataset[t]:(this.dataset[t]=n,n)}:function(t,n){return t="data-"+r(t),arguments.length<2?(n=this.getAttribute(t),n==null?void 0:n):n==null?(this.removeAttribute(t),!0):(this.setAttribute(t,n),n)}}("dataset"in document.documentElement),emit:function(n){var r=new CustomEvent(n);return r.arguments=t.slice.call(arguments,1),this.dispatchEvent(r)},listeners:function(t){return[]},off:function(e,t,n){return this.removeEventListener(e,t,n),this},on:function(e,t,n){return this.addEventListener(e,t,n),this},once:y.once,trigger:function(t,n){var r=typeof t=="string",i=r?t:t.type,s=r?new CustomEvent(i,(c.detail=n,c)):t;return c.detail=null,T.call(s,this,i),this.dispatchEvent(s)},when:y.when};c.cancelable=!0,c.bubbles=!0;try{document.createEvent("Event").target=document}catch(C){w=!0,b=function(e,t,n){if(!i.call(e,t))try{e[t]=n}catch(r){}}}(function(t){var n=t.Window,r=n?n.prototype:t,s=(t.Node||t.Element||t.HTMLElement).prototype,o=(t.Document||t.HTMLDocument).prototype,u=(t.XMLHttpRequest||function(){}).prototype,a=function(){f.trigger("ready")},f=t.document,l,c;for(l in N)i.call(N,l)&&(c={enumerable:!1,configurable:!0,writable:!0,value:N[l]},p(s,l,c),l!=="data"&&(p(r,l,c),p(o,l,c),p(u,l,c)));u.addEventListener||(u.addEventListener=function(t,n){var r=this,i=r["_"+t]||(r["_"+t]=[]);v.call(i,n)<0&&(i.push(n),r["on"+t]||(r["on"+t]=function(e){for(var n=e||{currentTarget:r,type:t},s=0,o;s<i.length;s++)o=i[s],typeof o=="function"?o.call(r,n):o.handleEvent(n)}))},u.removeEventListener=function(t,n){var r=self["_"+t]||[],i=v.call(r,n);-1<i&&(r.splice(i,1),r.length||(self["on"+t]=null))}),f.when("ready",e),/loaded|complete/.test(f.readyState)?(t.setImmediate||setTimeout)(a):f.once("DOMContentLoaded",a,!0)})(window),"$"in window||p(window,"$",{enumerable:!1,configurable:!0,writable:!0,value:function(n,r){var i=r||document,s=n.length-6,o=n.lastIndexOf(":first")===s,u=o?i.querySelector(n.slice(0,s)):i.querySelectorAll(n);return o?u?[u]:[]:t.slice.call(u)}})})(Object)});