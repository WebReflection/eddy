
// assign in the least obtrusive way eddy properties
for (key in eddy) {
  if (hasOwnProperty.call(eddy, key)) {
    if (IE) {
      ObjectPrototype[key] = eddy[key];
    } else {
      defineProperty(ObjectPrototype, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: eddy[key]
      });
    }
  }
}
