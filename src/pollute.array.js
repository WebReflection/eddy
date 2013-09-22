(function(forEach){
  function fn(key) {
    function callback(value) {
      /*jshint validthis:true */
      value[key].apply(value, this);
    }
    return function () {
      forEach.call(this, callback, arguments);
      return this;
    };
  }
  for(var key in eddy) {
    if (
      eddy.hasOwnProperty(key) &&
      !/^listeners|boundTo$/.test(key)
    ) {
      defineProperty(
        ArrayPrototype,
        key,
        {
          enumerable: false,
          configurable: true,
          writable: true,
          value: fn(key)
        }
      );
    }
  }
}(ArrayPrototype.forEach));