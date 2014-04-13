
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
  data: function data(key, value) {
    /*jshint eqnull:true */
    var hasDataset = 'dataset' in this,
        void0;
    if (arguments.length < 2) {
      return hasDataset ?
        (key in this.dataset ? this.dataset[key] : void0) :
        (value = this.getAttribute(
          'data-' + key.replace(
            data.gre || (data.gre = /-([a-z])/g),
            data.gplace || (data.gplace = function(m, c) {
              return c.toUpperCase();
            })
          )
        )) == null ? void0 : value
      ;
    }
    if (hasDataset) {
      if (value == null) {
        return delete this.dataset[key];
      }
      this.dataset[key] = value;
      return value;
    } else {
      if (!data.sre) {
        data.sre = /([a-z])([A-Z])/g;
        data.splace = function(m, l, U) {
          return l + '-' + U.toLowerCase();
        };
      }
      key = 'data-' + key.replace(data.sre, data.splace);
      if (value == null) {
        return (this.removeAttribute(key), true);
      }
      return this.setAttribute(key, value), value;
    }
  },
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