(function(){

  var
    DOM_SECRET = SECRET + 'DOM',
    oldIE = !('addEventListener' in window),
    nativeEvent = oldIE && new RegExp('^(?:' + [
      'click',
      'dblclick',
      'mousedown',
      'mouseup',
      'mouseover',
      'mousemove',
      'mouseout',
      'keydown',
      'keypress',
      'keyup',
      'load',
      'unload',
      'abort',
      'error',
      'resize',
      'scroll',
      'select',
      'change',
      'submit',
      'reset',
      'focus',
      'blur',
      'focusin',
      'focusout',
      // custom IE events
      'cut',
      'copy',
      'paste',
      'beforecut',
      'beforepaste',
      'afterupdate',
      'beforeupdate',
      'cellchange',
      'dataavailable',
      'datasetchanged',
      'datasetcomplete',
      'errorupdate',
      'rowenter',
      'rowexit',
      'rowsdelete',
      'rowinserted',
      'contextmenu',
      'drag',
      'dragstart',
      'dragenter',
      'dragover',
      'dragleave',
      'dragend',
      'drop',
      'selectstart',
      'help',
      'beforeunload',
      'stop',
      'beforeeditfocus',
      'start',
      'finish',
      'bounce',
      'beforeprint',
      'afterprint',
      'propertychange',
      'filterchange',
      'readystatechange',
      'losecapture'
    ].join('|') + ')$'),
    createEvent = oldIE ?
      function (type) {
        var e = document.createEventObject();
        e.eventType = e.eventName = type;
        return e;
      } :
      function (type) {
        var e = document.createEvent('Event');
        e.initEvent(type, true, true);
        return e;
      },
    dispatchEvent = oldIE ?
      function (self, e) {
        var type = e.eventName;
        return nativeEvent.test(type) ?
          self.fireEvent('on' + type, e) :
          eddy.emit.call(self, type, e);
      } :
      function (self, e) {
        return self.dispatchEvent(e);
      },
    dom = {
      boundTo: eddy.boundTo,
      emit: function emit(type) {
        return dispatchEvent(this, createEvent(type));
      },
      off: oldIE ?
        function (type, handler, capture) {
          var fn = ieWrap(this, handler);
          if (nativeEvent.test(type)) {
            this.detachEvent('on' + type, fn);
          } else {
            eddy.off.call(this, type, fn);
          }
          return this;
        } :
        function (type, handler, capture) {
          this.removeEventListener(type, handler, capture);
          return this;
        },
      on: oldIE ?
        function (type, handler, capture) {
          var fn = ieWrap(this, handler);
          if (nativeEvent.test(type)) {
            this.attachEvent('on' + type, fn);
          } else {
            eddy.on.call(this, type, fn, capture);
          }
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
        Event.call(e, this, type, isString && data);
        return dispatchEvent(this, e);
      }
    },
    accept = true,
    key
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

}());