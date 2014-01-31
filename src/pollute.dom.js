
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
  document.when('ready', Object);
  if (/loaded|complete/.test(document.readyState)) {
    (window.setImmediate || setTimeout)(ready);
  } else {
    document.once('DOMContentLoaded', ready, true);
  }
}(window));
