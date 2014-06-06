
if (!('$' in window)) defineProperty(window, '$', {
  enumerable: false,
  configurable: true,
  writable: true,
  // @link http://webreflection.blogspot.com/2014/05/134-bytes-for-optimized-and-very-basic.html
  value: function $(CSS, parentNode) {
    var el = parentNode || document,
        length = CSS.length - 6,
        first = CSS.lastIndexOf(':first') === length,
        query = first ?
          el.querySelector(CSS.slice(0, length)) :
          el.querySelectorAll(CSS);
    return first ?
      (query ? [query] : []) :
      ArrayPrototype.slice.call(query);
  }
});
