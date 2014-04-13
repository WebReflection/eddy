
var dom = {
  boundTo: function(boundTo){
    // UC Browser might not support Object.defineProperty on DOM nodes
    try {
      boundTo.call(document.createElement('div'), function(){});
    } catch(o_O) {
      setAndGet = function (self) {
        self[SECRET] = createSecret();
        return self[SECRET];
      };
    }
    return boundTo;
  }(eddy.boundTo),
  data: function (hasDataset) {
    var
      dash = hasDataset ?
        /-([a-z])/g :
        /([a-z])([A-Z])/g,
      camel = hasDataset ?
        function (m, c) {
          return c.toUpperCase();
        } :
        function (m, l, U) {
          return l + '-' + U.toLowerCase();
        }
    ;
    function transform(key) {
      return key.replace(dash, camel);
    }
    return hasDataset ?
      function data(key, value) {
        key = transform(key);
        if (arguments.length < 2) {
          return this.dataset[key];
        }
        if (value == null) {
          return delete this.dataset[key];
        }
        this.dataset[key] = value;
        return value;
      } :
      function data(key, value) {
        key = transform(key);
        if (arguments.length < 2) {
          value = this.getAttribute(key);
          return value == null ? void 0 : value;
        }
        if (value == null) {
          return (this.removeAttribute(key), true);
        }
        return this.setAttribute(key, value), value;
      }
    ;
  }('dataset' in document.documentElement),
  emit: function emit(type) {
    var e = new CustomEvent(type);
    e.arguments = ArrayPrototype.slice.call(arguments, 1);
    return this.dispatchEvent(e);
  },
  listeners: function listeners(type) {
    return [];
  },
  off: function (type, handler, capture) {
    this.removeEventListener(type, handler, capture);
    return this;
  },
  on: function (type, handler, capture) {
    this.addEventListener(type, handler, capture);
    return this;
  },
  once: eddy.once,
  trigger: function trigger(evt, detail) {
    var
      isString = typeof evt == 'string',
      type = isString ? evt : evt.type,
      e = isString ? new CustomEvent(
        type,
        (
          commonDescriptor.detail = detail,
          commonDescriptor
        )
      ) : evt
    ;
    commonDescriptor.detail = null;
    Event.call(e, this, type);
    return this.dispatchEvent(e);
  },
  when: eddy.when
};

commonDescriptor.cancelable = true;
commonDescriptor.bubbles = true;

// assign properties only if not there already
try {
  document.createEvent('Event').target = document;
} catch(Nokia_Xpress) {
  WTF = true;
  ifNotPresent = function(e, key, value) {
    if (!hasOwnProperty.call(e, key)) {
      try {
        e[key] = value;
      } catch(Nokia_Xpress) {}
    }
  };
}