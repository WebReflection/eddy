
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
}(window));
