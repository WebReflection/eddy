
var dom = {
  boundTo: eddy.boundTo,
  emit: function emit(type) {
    var e = createEvent(type, false, false);
    e.arguments = ArrayPrototype.slice.call(arguments, 1);
    return this.dispatchEvent(e);
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
      triggerEvent(self, handler, arguments);
    }, capture);
  },
  trigger: function trigger(evt, data) {
    var
      isString = typeof evt == 'string',
      type = isString ? evt : evt.type,
      opt = isString ? (data || isString) : evt,
      e = createEvent(
        type,
        hasOwnProperty.call(opt, 'bubbles') ?
          opt.bubbles : true,
        hasOwnProperty.call(opt, 'cancelable') ?
          opt.cancelable : true
      )
    ;
    Event.call(e, this, type, isString && data);
    return this.dispatchEvent(e);
  }
};

function createEvent(type, bubbles, cancelable) {
  var e = document.createEvent('Event');
  e.initEvent(type, bubbles, cancelable);
  return e;
}