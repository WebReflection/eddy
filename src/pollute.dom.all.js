
var dom = {
  boundTo: eddy.boundTo,
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
  }
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