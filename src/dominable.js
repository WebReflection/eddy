
function dominable(key) {
  var toString = ObjectPrototype.toString,
      JS = eddy[key],
      DOM = dom[key];
  return function () {
    // runtime check per method call ... is it DOM or JS?
    return (
      toString.call(this) == '[object Object]' ? JS : DOM
    ).apply(this, arguments);
  };
}
