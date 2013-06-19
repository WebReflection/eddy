//remove:
var main = require('../build/eddy.node.js');
//:remove

var hasDOM = typeof document !== 'undefined';

wru.test([
  {
    name: "eddy",
    test: function () {
      wru.assert(eddy); // global eddy
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
        called = 0,
        o = {}.on('test', function cb(e){
          called++;
          wru.assert('context', this === o);
          wru.assert('chainability', o.off('test', cb) === o);
          o.trigger('test');
          wru.assert('called once', called === 1);
          if (hasDOM) {
            var node = document.createElement('div').on(
              'test', function ncb(e) {
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
        called = 0,
        o = wru.assert('chainability', {}.on('test', function cb(e){
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
                'test', function ncb(e) {
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
          var node = wru.assert('DOM chainability', document.createElement('div').once('test', function () {
            wru.assert('DOM context', this === node);
            node.trigger('test');
          }));
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
        wru.assert('properties copied', e.someProperty === data.someProperty);
        wru.assert('data copied too', e.data === data);
      }).trigger('data', data));
      if (hasDOM) {
        (document.createElement('div').on('data', function (e) {
          wru.assert('DOM properties copied', e.someProperty === data.someProperty);
          wru.assert('DOM data copied too', e.data === data);
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
        })).trigger(data, data));
      }
    }
  },{
    name: 'emit data',
    test: function () {
      var err = new Error,
          data = {},
          cb;
      ({}.on('emit', cb = wru.async(function($err, $data){
        wru.assert('invoked with right arguments', err === $err && data === $data);
        this.off('emit', cb);
        this.once('emit',wru.async(function($err, $data){
          wru.assert('invoked once', err === $err && data === $data);
        })).emit('emit', $err, $data);
      })).emit('emit', err, data));
    }
  },{
    name: 'lazy assignment',
    test: function () {
      function ST() {
        return st = {boundTo:function(){}};
      }
      var st;
      wru.assert('emit', ST().emit('whatever') === st);
      wru.assert('trigger', ST().trigger('whatever') === st);
      wru.assert('handleEvent', ST().handleEvent('whatever') === st);
      wru.assert('on', ST().on('whatever') === st);
      wru.assert('off', ST().off('whatever') === st);
      wru.assert('once', ST().once('whatever') === st);
      wru.assert('boundTo', ST().boundTo('boundTo') === st.boundTo('boundTo'));
    }
  }
]);
