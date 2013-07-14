Event Driven JS
===============

a not so obtrusive and *highly optimized* attempt to make JavaScript more awesome than ever!

[![build status](https://secure.travis-ci.org/WebReflection/eddy.png)](http://travis-ci.org/WebReflection/eddy)

### The eddy.js Philosophy
It does not matter if you code client or server side, we all need the same thing and we keep using this or that library to obtain the same behavior.

I am talking about all *de-facto standards API* such `.on(type, handler)`, `.once(type, handler)`, `.off(type, handler)` together with `.emit(type, arg1, argN)` or `.trigger(type, data)` to deal with DOM nodes.

`eddy.js` aim is to harmonize all these API at core level polluting in a **non enumerable** way the `Object.prototype` in a smart way that simply works!

This means, *as soon as we use one of those methods, objects become lazily Event Targets* so we can use them as such.

As summary, [this is the philosophy behind this module](https://twitter.com/WebReflection/status/354958592601899008)

> eddy.js is a very pragmatic approach, back those days where developers enriched native prototypes to do more with less code ;-)


### Object.prototype Enriched API
Here a list of methods you can use by default in an `eddy.js` environment.


#### Object#on(type, handler[, capture])
Returns the object itself after adding an event handler.
This is basically the equivalent of `addListener` or `addEventListener`, where duplicated handlers for the same event are not allowed.
```javascript
var stopWatch = {
  startTime: Date.now()
}.on(
  'change',
  function () {
    // log elapsed time per each change
    console.log(Date.now() - this.startTime);
  }
);

setInterval(function () {
  stopWatch.emit('change');
}, 10);

// or using the boundTo method
// and the extra arguments accepted by setInterval
setInterval(stopWatch.boundTo('emit'), 10, 'change');
```
The `handler` can be either a function or an object as it is for `DOM` methods such `addEventListener` or `removeEventListener`.
In this case the method `handleEvent` is invoked with the object itself as context as it is for the [native DOM behavior](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener).

The third boolean `capture` argument is useless with JS objects but might be used in some `DOM` specific case.
By default, `capture` is false.


#### Object#once(type, handler[, capture])
Same as `Object#on(type, handler[, capture])` except the event is triggered once and never again unless specified later on.
```javascript
// on a generic HTML page inside a script tag...
this.once('load', function(e) {
  console.log('page fully loaded');
  // even if triggered manually
  // this event won't fire anymore
  this.fire('load');
  // nothing happened
});
```


#### Object#off(type, handler[, capture])
Returns the object itself after removing an event handler, if present.
This is basically the equivalent of `removeListener` or `removeEventListener`.
```javascript
function clearAllEntries() {
  database.clear();
}
window.on('unload', clearAllEntries);
keepEntriesButton.on('click', function () {
  // drop the clear procedure
  window.off('unload', clearAllEntries);
});
```


#### Object#trigger(type[, data])
Triggers / fires all handlers associated to the event `type` enriching the event with arbitrary `data`.
If specified, `data` must be an object with one or more properties.
`data` will be attached as event property too while properties will be copied over the event object.

This method is more suitable for DOM events or those events based on a single argument parameter/object.
```javascript
window.onresize = function (e) {
  alert(e.manual);
};
window.trigger('resize', {manual:true});
```


#### Object#emit(type[, arg1][, argN])
This method [behaves like node.js](http://nodejs.org/api/events.html#events_emitter_emit_event_arg1_arg2) one, accepting one or more optional arguments after the type.
```javascript
var object = {}
  .on('modify', function (key, value) {
    this[key] = value;
  })
  .on('delete', function (key) {
    delete this[key];
  })
;
object.emit('modify', 'key', Math.random());
console.log(object.key); // 0.3245979759376496
object.emit('delete', 'key');
console.log(object.key); // undefined
```


#### Object#boundTo(method)
This method creates a single bound version of the generic function or instance method.
```javascript
var obj = {
  test: function () {
    console.log(this === obj);
  }
};
console.log(
  obj.boundTo('test') === obj.boundTo('test')
); // true
obj.boundTo('test')(); // true
```
If the argument is *a function instead of a string* that function is used instead.
```javascript
function test() {
  console.log(this === obj);
}
var obj = {};
console.log(
  obj.boundTo(test) === obj.boundTo(test)
); // true
obj.boundTo(test)(); // true
```
Same thing if we pass the method itself as function instead of method name:
```javascript
var obj = {
  test: function () {
    console.log(this === obj);
  }
};
console.log(
  obj.boundTo(obj.test) === obj.boundTo('test')
); // true
```


### Which File ?
`eddy.js` comes in different flavors but it operates on global, native, constructors.
This means once you require or include or load `eddy.js` you need to manually `delete` polluted prototypes if needed.
Anyway, here the list of files you need:

 * [browser](build/eddy.js), meaning down to IE6 baby, fear not!
 * [AMD](build/eddy.amd.js), meaning down to IE6 baby, fear not!
 * [node.js](build/eddy.node.js), meaning ... node.js, and Rhino too, why not ;-)

You can install `eddy.js` directly via `npm install eddy` too and simply use `require('eddy')`.
The version for node should work for Rhino too without problems ;-)


### Why Eddy As Name ?
Not only because of the " *Event Driven* sound check ", the definition I prefer is the following one:

> a current or trend, as of opinion or events, running counter to the main current.

but [all other definitions](http://dictionary.reference.com/browse/eddy) are somehow very metaphoric too ;-)


### Not Your Meal ?
If you are stuck in late 90s dogmas about JS and forbidden `Object.prototype` pollution, you can always go for [EventTarget](https://github.com/WebReflection/event-target#event-target) mixin and use that with all your classes.

What `eddy.js` gives you here, is the ability to forget all these problems and use emitters when you need them, if you need them, as easy as that.