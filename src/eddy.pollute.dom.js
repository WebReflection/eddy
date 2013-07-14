(function(key){

  var
    oldIE = !('addEventListener' in window),
    createEvent = oldIE ?
      function (type) {
        var e = document.createEventObject();
        e.eventType = type;
        return e;
      } :
      function (type) {
        var e = document.createEvent('Event');
        e.initEvent(type, true, true);
        return e;
      },
    dispatchEvent = oldIE ?
      function (self, e) {
        var fired = self.fireEvent(e.eventType, e);
        return fired || self.fireEvent('on' + e.eventType, e);
      } :
      function (self, e) {
        return self.dispatchEvent(e);
      },
    dom = {
      boundTo: eddy.boundTo,
      emit: function emit(type) {
        return dispatchEvent(createEvent(type));
      },
      off: oldIE ?
        function (type, handler, capture) {
          var fn = ieWrap(this, handler);
          this.detachEvent(type, fn);
          this.detachEvent('on' + type, fn);
          return this;
        } :
        function (type, handler, capture) {
          this.removeEventListener(type, handler, capture);
          return this;
        },
      on: oldIE ?
        function (type, handler, capture) {
          var fn = ieWrap(this, handler);
          this.attachEvent(type, fn);
          this.attachEvent('on' + type, fn);
          return this;
        } :
        function (type, handler, capture) {
          this.addEventListener(type, handler, capture);
          return this;
        },
      once: function once(type, handler, capture) {
        var self = this;
        return self.on(type, function once(e) {
          self.off(type, once, capture);
          (oldIE ?
            ieWrap(self, handler) :
            handler
          ).call(self, e);
        }, capture);
      },
      trigger: function trigger(evt, data) {
        var
          isString = typeof evt == 'string',
          type = isString ? evt : evt.type,
          e = createEvent(type)
        ;
        Event.call(e, data);
        return dispatchEvent(e);
      }
    }
  ;

  function dominable(key) {
    var toString = ObjectPrototype.toString,
        JS = eddy[key],
        DOM = dom[key];
    return function () {
      return (
        toString.call(this) == '[object Object]' ? JS : DOM
      ).apply(this, arguments);
    };
  }

  function ieWrap(self, handler) {
    return typeof handler == 'function' ?
      self.boundTo(handler) :
      handler.boundTo(handler.handleEvent);
  }

  for (key in eddy) {
    if (hasOwnProperty.call(eddy, key)) {
      if (IE) {
        ObjectPrototype[key] = dominable(key);
      } else {
        defineProperty(ObjectPrototype, key, {
          enumerable: false,
          configurable: true,
          writable: true,
          value: dominable(key)
        });
      }
    }
  }

}(key));