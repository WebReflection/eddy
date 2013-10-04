//remove:
var main = require('../build/eddy.node.js');
//:remove

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
        wru.assert('DOM it\'s bound', node.boundTo(method)() === node);
      }
    }
  }, {
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
    name: 'trigger data',
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
    name: 'inherited and lazily assigned',
    test: function () {
      var st, ST = function () {
        return st = {boundTo:function(){}};
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
