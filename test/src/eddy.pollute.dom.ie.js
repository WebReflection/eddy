
var
  nativeEvent = new RegExp('^(?:' + [
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
  dom = {
    boundTo: eddy.boundTo,
    emit: function emit(type) {
      return dispatchEvent(this, createEvent(type));
    },
    off: function (type, handler, capture) {
      var fn = ieWrap(this, handler);
      if (nativeEvent.test(type)) {
        this.detachEvent('on' + type, fn);
      } else {
        eddy.off.call(this, type, fn);
      }
      return this;
    },
    on: function (type, handler, capture) {
      var fn = ieWrap(this, handler);
      if (nativeEvent.test(type)) {
        this.attachEvent('on' + type, fn);
      } else {
        eddy.on.call(this, type, fn, capture);
      }
      return this;
    },
    once: function once(type, handler, capture) {
      var self = this;
      return self.on(type, function once(e) {
        self.off(type, once, capture);
        ieWrap(self, handler).call(self, e);
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
  var e = document.createEventObject();
  e.eventType = e.eventName = type;
  return e;
}

function dispatchEvent(self, e) {
  var type = e.eventName;
  return nativeEvent.test(type) ?
    self.fireEvent('on' + type, e) :
    eddy.emit.call(self, type, e);
}

function ieWrap(self, handler) {
  return typeof handler == 'function' ?
    self.boundTo(handler) :
    handler.boundTo(handler.handleEvent);
}

for (key in eddy) {
  if (hasOwnProperty.call(eddy, key)) {
    ObjectPrototype[key] = dominable(key);
  }
}
