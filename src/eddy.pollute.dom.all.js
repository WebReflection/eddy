
var dom = {
  boundTo: eddy.boundTo,
  emit: function emit(type) {
    return dispatchEvent(this, createEvent(type));
  },
  off: function (type, handler, capture) {
    this.removeEventListener(type, handler, capture);
    return this;
  },
  on: function (type, handler, capture) {
    this.addEventListener(type, handler, capture);
    return this;
  },
  once: function once(type, handler, capture) {
    var self = this;
    return self.on(type, function once(e) {
      self.off(type, once, capture);
      triggerEvent(self, handler, [e]);
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
};

function createEvent(type) {
  var e = document.createEvent('Event');
  e.initEvent(type, true, true);
  return e;
}

function dispatchEvent(self, e) {
  return self.dispatchEvent(e);
}

for (key in eddy) {
  if (hasOwnProperty.call(eddy, key)) {
    defineProperty(ObjectPrototype, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: dominable(key)
    });
  }
}
