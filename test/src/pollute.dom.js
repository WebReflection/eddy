
(function(window){
  var
    Window = window.Window,
    WindowPrototype = Window ? Window.prototype : window,
    ElementPrototype = (
      window.Node || window.Element || window.HTMLElement
    ).prototype,
    DocumentPrototype = (
      window.Document || window.HTMLDocument
    ).prototype,
    XMLHttpRequestPrototype = (
      window.XMLHttpRequest || function(){}
    ).prototype,
    ready = function() {
      document.trigger('ready');
    },
    document = window.document,
    key,
    current
  ;
  for (key in dom) {
    if (hasOwnProperty.call(dom, key)) {
      current = {
        enumerable: false,
        configurable: true,
        writable: true,
        value: dom[key]
      };
      defineProperty(
        ElementPrototype, key, current
      );
      if (key !== 'data') {
        defineProperty(
          WindowPrototype, key, current
        );
        defineProperty(
          DocumentPrototype, key, current
        );
        defineProperty(
          XMLHttpRequestPrototype, key, current
        );
      }
    }
  }
  // Opera Mini
  if (!XMLHttpRequestPrototype.addEventListener) {
    XMLHttpRequestPrototype.addEventListener =
      function addEventListener(type, handler) {
      var
        self = this,
        handlers = self['_' + type] || (self['_' + type] = [])
      ;
      if (indexOf.call(handlers, handler) < 0) {
        handlers.push(handler);
        if (!self['on' + type]) {
          self['on' + type] = function (e) {
            for (var
              evt = e || {
                currentTarget: self,
                type: type
              },
              i = 0,
              current;
              i < handlers.length;
              i++
            ) {
              current = handlers[i];
              if (typeof current === 'function') {
                current.call(self, evt);
              } else {
                current.handleEvent(evt);
              }
            }
          };
        }
      }
    };
    XMLHttpRequestPrototype.removeEventListener =
      function removeEventListener(type, handler) {
      var handlers = self['_' + type] || [],
          i = indexOf.call(handlers, handler);
      if (-1 < i) {
        handlers.splice(i, 1);
        if (!handlers.length) {
          self['on' + type] = null;
        }
      }
    };
  }
  document.when('ready', Object);
  if (/loaded|complete/.test(document.readyState)) {
    (window.setImmediate || setTimeout)(ready);
  } else {
    document.once('DOMContentLoaded', ready, true);
  }
}(window));
