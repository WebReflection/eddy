/*!
(C) Andrea Giammarchi, @WebReflection - Mit Style License
*/
if(typeof global!="undefined"){var setTimeout=global.setTimeout,setInterval=global.setInterval,clearInterval=global.clearInterval,clearTimeout=global.clearTimeout;setTimeout||(function(h,c,g,a){setInterval=global.setInterval=function b(j,i){return e(j,i,g.call(arguments,2),1)};setTimeout=global.setTimeout=function d(j,i){return e(j,i,g.call(arguments,2))};clearInterval=global.clearInterval=clearTimeout=global.clearTimeout=function f(i){c[i].cancel();h.purge();delete c[i]};function e(l,k,j,i){var m=++a;c[m]=new JavaAdapter(java.util.TimerTask,{run:function(){l.apply(null,j)}});i?h.schedule(c[m],k,k):h.schedule(c[m],k);return m}})(new java.util.Timer(),{},[].slice,0)}else{!function(c,b,a,e){function d(f,g){var h=new Date;while(new Date-h<g){}f.apply(null,e.call(arguments,2))}e=a.slice;c.setTimeout=c.setInterval=d;c.clearInterval=c.clearTimeout=function(){}}(this,0,[])}var wru=function(U){function h(){w=F.call(j);if(w){if(typeof w=="function"){w={name:w[O]||"anonymous",test:w}}l(Z);l((ad(w,O)&&w[O])||(ad(w,e)&&w[e])||L);a=[];q=[];P=[];X={};b("setup");P[ae]||b("test");I||n()}else{p()}}function l(ah,ag){ah=ah+(ag?"":"\n");try{process.stdout.write(ah)}catch(af){try{require("util").print(ah)}catch(af){try{require("sys").print(ah)}catch(af){try{java.lang.System.out.print(ah)}catch(af){try{console.log(ah)}catch(af){print(ah)}}}}}}function p(){var ah=0,ag;l(g);l(Z);switch(true){case !!aa:ah++;ag="error";l(N+"   "+aa+" Errors");break;case !!z:ah++;ag="fail";l(J+g+z+" Failures");break;default:ag="pass";l(y+"      "+o+" Passes")}V.status=ag;l(Z);l(g);V.after();try{process.exit(ah)}catch(af){quit()}}function c(af){for(var ag=0,ah=af[ae];ag<ah;l("    "+(++ag)+". "+af[ag-1])){}}function n(){f();o+=a[ae];z+=q[ae];aa+=P[ae];if(P[ae]){S=N;c(P)}else{if(q[ae]){S=J;c(q)}else{S=y}}l(S+" passes: "+a[ae]+", fails: "+q[ae]+", errors: "+P[ae]);H=0;S=g;h()}function b(af){if(ad(w,af)){try{w[af](X)}catch(ag){W.call(P,g+ag)}}}function ad(ag,af){return m.call(ag,af)}function s(){return B()<0.5?-1:1}function f(){if(M){C(M);M=0}b("teardown")}var V={timeout:u,assert:function Q(ag,af){if(arguments[ae]==1){af=ag;ag=L}v=D;W.call(af?a:q,S+ag);return af},async:function R(ah,ak,ai,aj){var af=ai||V.timeout||(V.timeout=u);aj=++I;if(typeof ah=="function"){af=ak||V.timeout;ak=ah;ah="asynchronous test #"+aj}ai=T(function(){aj=0;W.call(q,ah);--I||(M=T(n,0))},G(af)||V.timeout);return function ag(){if(!aj){return}v=ab;S=ah+": ";try{ak.apply(this,arguments)}catch(al){v=D;W.call(P,S+al)}S=g;if(v){C(ai);--I||(M=T(n,0))}}},test:function k(af,ag){V.after=ag||function(){};j=E.apply(j,[af]);V.random&&ac.call(j,s);I||h()}},D=true,ab=!D,u=100,g=" ",L="unknown",ae="length",O="name",e="description",A="<li>",d="</li>",i="\\|/-",m=V.hasOwnProperty,S=g,Y=S.charAt,t=S.slice,j=[],E=j.concat,r=j.join,W=j.push,F=j.shift,ac=j.sort,I=0,H=0,o=0,z=0,aa=0,M=0,N="\x1B[1;31mERROR\x1B[0m",J="\x1B[0;31mFAILURE\x1B[0m",y="\x1B[0;32mOK\x1B[0m",Z="------------------------------",x,G,B,T,C,w,K,a,q,P,X,v;V.log=function(ah,ag){try{if(ag){throw new Error}console.log(ah)}catch(af){l(ah,0)}};if(typeof __dirname!="undefined"){U.wru=V;U.assert=V.assert;U.async=V.async;U.test=V.test;U.log=V.log;U.random=false;Object.defineProperty(U,"status",{get:function(){return V.status}});Object.defineProperty(U,"timeout",{get:function(){return V.timeout},set:function(af){V.timeout=parseInt(af,10)||V.timeout}});U=global}x=U.Math;G=x.abs;B=x.random;T=U.setTimeout;C=U.clearTimeout;U.setInterval(function(){I&&l(g+Y.call(i,H++%4)+"\b\b",true)},u);undefined;u*=u;V.random=ab;return V}(this);
/*! (C) Andrea Giammarchi Mit Style License */
(function(e){"use strict";function S(){return{w:{},l:{},m:[],b:[]}}function x(e,t,n){typeof t=="function"?t.apply(e,n):t.handleEvent.apply(t,n)}function T(e,t,n){n!==void 0&&b(this,"detail",n),b(this,"type",t),b(this,"target",e),b(this,"timeStamp",m())}if(e.eddy)return;e.eddy=!0;var t=Array.prototype,n=e.prototype,r=T.prototype,i=n.hasOwnProperty,s=t.push,o=t.slice,u=t.unshift,a="toLocaleString",f={toLocaleString:1}.propertyIsEnumerable(a)?"_@eddy"+Math.random():a,l=f===a,c=(e.create||e)(null),h=[],p=l?function(e,t,n){e[t]=n.value}:e.defineProperty,d=function(e){var t=this;return function(){return t.apply(e,arguments)}},v=t.indexOf||function(e){var t=this.length;while(t--&&this[t]!==e);return t},m=Date.now||function(){return(new Date).getTime()},g=function(e){var t=S();return c.value=t,p(e,f,c),c.value=null,t},y={boundTo:function(t,n){var r=i.call(this,f)?this[f]:g(this),o=r.m,u=r.b,a=typeof t=="string"?n==null||i.call(this,t)?this[t]:this[t]=n:t,l=v.call(o,a);return l<0?u[s.call(o,a)-1]=d.call(a,this):u[l]},emit:function(t){var n=i.call(this,f),r=n&&this[f].l,s=n&&i.call(r,t),u=s&&r[t].slice(0),a=s&&o.call(arguments,1),l=0,c=s?u.length:l;while(l<c)x(this,u[l++],a);return s},listeners:function(t){return i.call(this,f)&&i.call(this[f].l,t)&&this[f].l[t].slice()||[]},off:function(t,n){var r=i.call(this,f),s=r&&this[f].l,o=r&&i.call(s,t)&&s[t],u;return o&&(u=v.call(o,n),-1<u&&(o.splice(u,1),o.length||delete s[t])),this},on:function(t,n,r){var o=i.call(this,f),a=(o?this[f]:g(this)).l,l=o&&i.call(a,t)?a[t]:a[t]=[];return v.call(l,n)<0&&(r?u:s).call(l,n),this},once:function(t,n,r){var i=function(e){s.off(t,i,r),x(s,n,arguments)},s=this;return s.on(t,i,r)},trigger:function(t,n){var s=i.call(this,f),o=s&&this[f].l,u=typeof t=="string",a=u?t:t.type,l=s&&i.call(o,a),c=l&&o[a].slice(0),p=u?new T(this,a,n):t,d=0,v=l?c.length:d,m=!(p instanceof T);m&&(p._active=!0,p.stopImmediatePropagation=r.stopImmediatePropagation),p.currentTarget=this,h[0]=p;while(p._active&&d<v)x(this,c[d++],h);return m&&(delete p._active,delete p.stopImmediatePropagation),!p.defaultPrevented},when:function(e,t){var n=i.call(this,f),r=(n?this[f]:g(this)).w,s=n&&i.call(r,e);return s?(x(this,t,r[e]),this):this.once(e,function(){i.call(r,e)||(r[e]=arguments)},!0).once(e,t)}},b=function(e,t,n){i.call(e,t)||(e[t]=n)},w=!1,E;r.defaultPrevented=!1,r._active=r.cancelable=!0,r.preventDefault=function(){this.defaultPrevented=!0},r.stopImmediatePropagation=function(){this._active=!1};for(E in y)i.call(y,E)&&p(n,E,{enumerable:!1,configurable:!0,writable:!0,value:y[E]});(function(e){function n(t){function n(e){e[t].apply(e,this)}return function(){return e.call(this,n,arguments),this}}for(var r in y)y.hasOwnProperty(r)&&!/^listeners|boundTo$/.test(r)&&p(t,r,{enumerable:!1,configurable:!0,writable:!0,value:n(r)})})(t.forEach||function(e,t){var n=this,r=0;while(r<n.length)r in n&&e.call(t,n[r],r,n),r++})})(Object);
var hasDOM = typeof document !== 'undefined';

wru.test([
  {
    name: "eddy",
    test: function () {
      wru.assert(Object.eddy || typeof eddy !== 'undefined' && eddy); // global eddy
    }
  }, {
    name: 'boundTo',
    test: function () {
      function method() {
        return this;
      }
      var o = {
        method: method
      };
      wru.assert('bound once', o.boundTo(o.method) === o.boundTo(method));
      wru.assert('it\'s bound', o.boundTo(method)() === o);
      wru.assert('as string too', o.boundTo('toString') === o.boundTo('toString'));
      if (hasDOM) {
        var node = document.createElement('div');
        wru.assert('inherits methods', node.on);
        wru.assert('DOM bound once', node.boundTo(o.method) === node.boundTo(method));
        wru.assert('DOM bound is defined', typeof node.boundTo(method) != 'undefined');
        wru.assert('DOM it\'s bound', node.boundTo(method)() === node);
      }
    }
  }, {
    name: 'boundTo V2',
    test: function () {
      var o = {},
          f = o.boundTo('method', function hiIamMethod() {
            return this;
          });
      wru.assert('method is now own property', o.hasOwnProperty('method'));
      wru.assert('if reassigned, it is the same',
        f === o.boundTo('method', function hiIamMethod() {
          return this;
        })
      );
      wru.assert('if invoked, returns obj as context', f() === o);
      wru.assert('if invoked through obj, returns obj', o.method() === o);
      wru.assert('but if invoked indirectly, it does not',
        (o.method).call(Object) === Object
      );
    }
  },{
    name: 'off',
    test: function () {
      var
        ncb, cb, // good old IE < 9 dumb trick to avoid problems
        called = 0,
        // NOTE: IE8 does not consider cb as Function Expression
        // removing cb via name will not be the same as removing it via assignment
        o = {}.on('test', cb = function cb(e){
          called++;
          wru.assert('context', this === o);
          wru.assert('chainability', o.off('test', cb) === o);
          o.trigger('test');
          wru.assert('called once', called === 1);
          if (hasDOM) {
            var node = document.createElement('div').on(
              'test', ncb = function ncb(e) {
                called++;
                wru.assert('DOM chainability', node.off('test', ncb) === node);
                wru.assert('DOM context', this === node);
                node.trigger('test');
                wru.assert('called once', called === 2);
              }
            );
            node.trigger('test');
          }
        });
      o.trigger('test');
    }
  }, {
    name: 'on',
    test: function () {
      var
        ncb, cb, // good old IE < 9 dumb trick to avoid problems
        called = 0,
        o = wru.assert('chainability', {}.on('test', cb = function cb(e){
          called++;
          o.off(e.type, cb);
          if (e.type === 'test') {
            wru.assert('context', this === o);
            wru.assert('chainability', o.on('test2', cb) === o);
            o.trigger('test2');
          } else {
            wru.assert('called twice', called === 2);
            if (hasDOM) {
              var node = wru.assert('DOM chainability', document.createElement('div').on(
                'test', ncb = function ncb(e) {
                  called++;
                  node.off('test', ncb);
                  wru.assert('DOM context', this === node);
                  node.trigger('test');
                  wru.assert('called once', called === 3);
                }
              ));
              node.trigger('test');
            }
          }
        }));
      o.trigger('test');
    }
  }, {
    name: 'once',
    test: function () {
      var o = wru.assert('chainability', {}.once('test', function () {
        wru.assert('context', this === o);
        o.trigger('test');
        if (hasDOM) {
          var node = document.createElement('div');
          wru.assert(
            'DOM chainability',
            node.once('test', function () {
              wru.assert('DOM context', this === node);
              node.trigger('test');
            }) === node
          );
          node.trigger('test');
        }
      }));
      o.trigger('test');
    }
  }, {
    name: 'trigger',
    test: function () {
      var type = '_' + Math.random();
      ({}.once(type, wru.async(function(){
        wru.assert('everything is fine', true);
        if (hasDOM) {
          document.createElement('div').once(type, wru.async(function(){
            wru.assert('DOM everything is fine', true);
          })).trigger(type);
        }
      })).trigger(type));
    }
  }, {
    name: 'trigger detail',
    test: function () {
      var data = {
        someProperty: Math.random()
      };
      ({}.on('data', function (e) {
        wru.assert('properties copied', e.detail === data);
      }).trigger('data', data));
      if (hasDOM) {
        (document.createElement('div').on('data', function (e) {
          wru.assert('DOM properties copied', e.detail === data);
          // wru.assert('DOM data copied too', e.data === data);
          // IE8 does not support data property in an event
        }).trigger('data', data));
      }
      data.type = 'whatSoEver' + Math.random();
      ({}.on(data.type, wru.async(function (e) {
        wru.assert('event is data', e === data);
        wru.assert('no data property', !e.data);
      })).trigger(data, data));
      if (hasDOM) {
        (document.createElement('div').on(data.type, wru.async(function (e) {
          wru.assert('DOM event has data type', e.type === data.type);
          wru.assert('DOM has no data property', !e.data);
        })).trigger(new CustomEvent(data.type)), data);
      }
    }
  },{
    name: 'trigger falsy details',
    test: function () {
      ({}
        .on('event', wru.async(function (e) {
          wru.assert(e.detail === false);
        }))
        .trigger('event', false)
      );
    }
  },{
    name: 'emit data',
    test: function () {
      var err = new Error,
          data = {},
          cb;
      data.on('true', Object);
      wru.assert('emit returns true', data.emit('true') === true);
      wru.assert('emit returns false', data.emit('whatever') === false);
      wru.assert('did emit the event!', ({}.on('emit', cb = wru.async(function($err, $data){
        wru.assert('invoked with right arguments', err === $err && data === $data);
        this.off('emit', cb);
        this.once('emit',wru.async(function($err, $data){
          wru.assert('invoked once', err === $err && data === $data);
        })).emit('emit', $err, $data);
      })).emit('emit', err, data)));
    }
  },{
    name: 'listeners',
    test: function () {
      function handler1() {}
      function handler2() {}
      var o = {}.on('event', handler1).on('event', handler2),
          listeners = o.listeners('event');
      wru.assert('two listeners', listeners.length === 2);    
      wru.assert('right listeners', listeners[0] === handler1 && listeners[1] === handler2);
      wru.assert('no listeners', !o.listeners('somethingelse').length);
      wru.assert('no all listeners', !o.listeners().length);
      if (hasDOM) {
        var div = document.createElement('div');
        div.on('event', handler1).on('event', handler2);
        wru.assert('DOM has never reachable listeners', !div.listeners('event').length);
      }
    }
  },{
    name: 'when',
    test: function() {
      var
        i = 0,
        o = {}.when('any:event', function () {
          ++i;
        }),
        anyValue = Math.random(),
        tmp
      ;
      wru.assert('not fired yet', i === 0);
      setTimeout(wru.async(function() {
        o.emit('any:event', anyValue);
        wru.assert('fired once', i === 1);
        o.when('any:event', function(value) {
          tmp = value;
        });
        wru.assert('previous event not fired', i === 1);
        wru.assert('previous value passed', tmp === anyValue);
        setTimeout(wru.async(function(){
          o.when('any:event', function(value) {
            i++;
            anyValue = value;
          });
          wru.assert('once again, instantly fired', i === 2);
          wru.assert('initial value still passed', tmp === anyValue);
        }), 100);
      }), 100);
    }
  },{
    name: 'when("DOMContentLoaded")',
    test: function () {
      var i = 0, evt;
      if (hasDOM) {
        document.when('DOMContentLoaded', function(e) {
          ++i;
          evt = e;
        });
        wru.assert('function called', i === 1);
        wru.assert('event was the right one', evt.type === 'DOMContentLoaded');
      } else {
        wru.assert('nothing to do here');
      }
    }
  },{
    name: 'inherited and lazily assigned',
    test: function () {
      var st, ST = function () {
        return st = {};
      };
      wru.assert('trigger', ST().trigger('whatever') === true);
      //wru.assert('handleEvent', ST().handleEvent('whatever') === st);
      wru.assert('on', ST().on('whatever') === st);
      wru.assert('off', ST().off('whatever') === st);
      wru.assert('once', ST().once('whatever') === st);
      wru.assert('boundTo', ST().boundTo('boundTo') === st.boundTo('boundTo'));
      if (hasDOM) {
        ST = function () {
          return st = document.createElement('div');
        };
        wru.assert('trigger', ST().trigger('whatever') === true);
        //wru.assert('handleEvent', ST().handleEvent('whatever') === st);
        wru.assert('on', ST().on('whatever') === st);
        wru.assert('off', ST().off('whatever') === st);
        wru.assert('once', ST().once('whatever') === st);
        wru.assert('boundTo', ST().boundTo('boundTo') === st.boundTo('boundTo'));
      }
    }
  },{
    name: 'deeper emit',
    test: function () {
      wru.assert('emitted', {}.on('type', Object).emit('type') === true);
      wru.assert('not emitted', {}.on('type', Object).emit('nope') === false);
      wru.assert('not emitted', {}.emit('nope') === false);
    }
  },{
    name: 'deeper trigger tests',
    test: function () {
      var o = {};
      o.on('event', function(e){
        e.preventDefault();
      });
      o.on('event', Object);
      o.on('pass', Object);
      wru.assert('was not stopped', o.trigger('pass') === true);
      wru.assert('was stopped', o.trigger('event') === false);
      wru.assert('was irrelevant', o.trigger('whatsoever') === true);
      if (hasDOM) {
        o = document.createElement('div');
        o.on('event', function(e){
          e.preventDefault();
        });
        o.on('pass', Object);
        wru.assert('DOM was not stopped', o.trigger('pass') === true);
        wru.assert('DOM was stopped', o.trigger('event') === false);
        wru.assert('was irrelevant', o.trigger('whatsoever') === true);
      }
    }
  }
  /* abandoned right now
  ,{
    name: 'String#toLocaleString',
    test: function () {
      String.setLocale({
        greetings: 'Hello, my name is ${name}'
      });
      wru.assert(
        'it works with direct property',
        'greetings'.toLocaleString({
          name: 'WebReflection'
        }) ===
        'Hello, my name is WebReflection'
      );
    }
  }
  //*/
  ,{
    name: 'handleEvent',
    test: function () {
      ({}.on('handle-event', {
        handleEvent: wru.async(function () {
          wru.assert('here we go');
        })
      }).emit('handle-event'));
    }
  },
  {
    name: 'collections',
    test: function () {
      var i = 0,
          list = [{}, {}].on('check', function () {
            if (i === 0 && this === list[0]) i++;
            else if(i === 1 && this === list[1]) i++;
          });
      list.emit('check');
      wru.assert('per each obejct, one invocation', i === 2);
    }
  },{
    name: 'document#when(ready)',
    test: function () {
      if (hasDOM) {
        document.when('ready', wru.async(function () {
          wru.assert('it worked!');
        }));
      }
    }
  },{
    name: 'DOM#dataset',
    test: function () {
      if (hasDOM) {
        var o = document.createElement('div');
        wru.assert('return the value', o.data('key', 123) === 123);
        wru.assert('the attribute data-key exists', o.hasAttribute('data-key'));
        wru.assert('the attribute data-key has value', o.getAttribute('data-key') === '123');
        wru.assert('the attribute is accessible via API', o.data('key') === '123');
        wru.assert('true on remove', true === o.data('key', null));
        wru.assert('returns undefined', o.data('key') === undefined);
        wru.assert('return the value', o.data('another-key', 123) === 123);
        wru.assert('the attribute data-key exists', o.hasAttribute('data-another-key'));
        wru.assert('the attribute data-key has value', o.getAttribute('data-another-key') === '123');
        wru.assert('the attribute is accessible via API', o.data('another-key') === '123');
        wru.assert('true on remove', true === o.data('another-key', null));
        wru.assert('returns undefined', o.data('another-key') === undefined);
      }
    }
  },{
    name: 'XMLHttpRequest#on',
    test: function () {
      if (hasDOM && window.XMLHttpRequest) {
        var
          xhr = new XMLHttpRequest,
          OK = wru.async(function(ok){
            wru.assert('everything OK', ok);
          })
        ;
        xhr.open('get', '?', true);
        xhr.on('readystatechange', function () {
          if (this.readyState === 4) {
            OK(this === xhr);
          }
        }).send(null);
      }
    }
  }
  /*
  ,{
    name: 'handleEvent',
    test: function () {
      var target = {},
          source = {};
      target.on('source', source);
      source.once('source', wru.async(function(e){
        wru.assert('right type', e.type === 'source');
        wru.assert('target', e.target === target);
        wru.assert('context', this === source);
        if (hasDOM) {
          target.on('source', (source = document.createElement('div')).once(
            'source', wru.async(function(){
              wru.assert('right type', e.type === 'source');
              wru.assert('target', e.target === target);
              wru.assert('context', this === source);
            })
          )).trigger('source');
        }
      }));
      target.trigger('source');
    }
  }
  ,{
    name: 'mixed behavior',
    test: function () {
      var o = {};
      o.handleEvent = wru.async(function(){
        wru.assert('called');
        o.on('self', {
          handleEvent: wru.async(function(){
            wru.assert('called');
          })
        }).emit('self');
      });
      ({}.on('generic', o).trigger('generic'));
    }
  }
  */
]);
