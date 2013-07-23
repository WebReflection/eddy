
// assign in the least obtrusive way eddy properties
for (key in eddy) {
  if (hasOwnProperty.call(eddy, key)) {
    defineProperty(ObjectPrototype, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: eddy[key]
    });
  }
}
