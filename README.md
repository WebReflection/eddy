Event Driven JS
===============

a not so obtrusive and *highly optimized* attempt to make JavaScript more awesome than ever!

[![build status](https://secure.travis-ci.org/WebReflection/eddy.png)](http://travis-ci.org/WebReflection/eddy)

[![NPM](https://nodei.co/npm/eddy.png?downloads=true)](https://nodei.co/npm/eddy/)

### The eddy.js Philosophy
It does not matter if you code client or server side, we all need the same thing and we keep using this or that library to obtain the same behavior.

I am talking about all *de-facto standards API* such `.on(type, handler)`, `.once(type, handler)`, `.off(type, handler)` together with `.emit(type, arg1, argN)` and `.listeners(type)` or `.trigger(type, detail)` to deal with DOM nodes.

`eddy.js` aim is to harmonize all these API at core level polluting in a **non enumerable** way the `Object.prototype` in a smart way that simply works!

This means no worries at all for any `for/in` loop you might have in there, even in IE.

As summary, [this is the philosophy behind this module](https://twitter.com/WebReflection/status/354958592601899008)

> eddy.js is a very pragmatic approach, back those days where developers enriched native prototypes to do more with less code ;-)


### Compatibility

`eddy.js` is tested and compatible with the following **mobile platforms**

  * iOS 5, 6, 7+
  * Android 2.2+, 3, 4.0, 4.1, 4.2, 4.3+
  * Windows Phone 7, 8+
  * FirefoxOS 0.X, 1+
  * Blackberry 10 (probably older too, haven't tested yet)
  * Opera Mini, Opera Mobile, and Opera Mobile Beta
  * webOS 2+
  * Nokia Asha and Nokia Xpress browser
  * UC Browser for Android 2.X or higher

eddy is also compatible with the following **desktop browsers**

  * Chrome, Canary, and Chromium channel
  * Safari 5+ and Webkit Nightly
  * Internet Explorer 8, 9, 10, 11+
  * Firefox, Aurora, and Nightly channel
  * Opera

In order to verify your browser too please [visit the test page](http://webreflection.github.io/eddy/test/).

Last, but not least, `eddy.js` has been used and tested in the following **server side** platforms

  * node.js
  * rhino

If you clone the repo, just `make test` for node or be sure you have a stable rhino jar and `java -jar /path/to/that/jar/js.jar testrhino.js`.


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


#### Object#trigger(type[, detail])
Triggers / fires all handlers associated to the event `type` enriching the event with arbitrary `detail` simulating what `CustomEvent` does in DOM Level 4 specifications.

This method is more suitable for DOM events or those events based on a single argument parameter/object.
```javascript
window.onresize = function (e) {
  alert(e.detail); // object {any:'detail'}
};
window.trigger('resize', {any:'detail'});
```
In the DOM world, it is possible to use directly `.trigger(new CustomEvent(type, {cancelable:true, bubbles: true, detail: anyData}))`.

This method will return `false` if any listener called `event.preventDefault()` since by default all triggered events will be cancelable.


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

In the DOM world this method will dispatch an event with specified type and an `arguments` property for interoperability purpose. Such property will contain optional extra arguments used to `.emit(type, a1, aN)` in first place.


#### Object#listeners(type)
This method [behaves like node.js](http://nodejs.org/api/events.html#events_emitter_listeners_event) one but on DOM object it will always return an empty array-like object.

```javascript
function handler() {}
var obj = {}.on('event', handler);
var listeners = obj.listeners('event');

console.log(listeners[0] === handler); // true
```
In the DOM world there's no way to retrieve back nodes and it has never been a real problem but for _node.js_ or generic _JS business logic_ the possibility to understand already added listeners might be handy (I needed this in [dblite](https://github.com/WebReflection/dblite#dblite) and I've realized it is a very handy method!)


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


#### Object#when(type, handler)
This method simply provides a way to retrieve some data the very first time it has been triggered.

Please note this is not an equivalent to [Promises/A+](http://promises-aplus.github.io/promises-spec/), the one implemented in next version of JavaScript, neither [when](https://github.com/cujojs/when#whenjs) library, this is just meant to simplify few common cases in an Event_ish_ way.
```javascript
// async, who knows if and when it will happen
// will be asked only once in any case (not a watchPosition)
navigator.geolocation.getCurrentPosition(
  function(info) {
    myApp.emit('geocurrentposition', null, info);
  },
  function(err) {
    myApp.emit('geocurrentposition', err || 'unknown', null);
  }
);


// wait to retrieve initial position
myApp.when('geocurrentposition', function(err, pos) {
  if (err) {
    console.error('' + err);
  } else {
    console.log(pos.coords);
  }
});

// any other object could listen even if resolved
// it wan't ask again for the position
```
Above example could be extended to database access request or any other classic user operation that should not be asked more than once, decoupling different requests independently.

```javascript
// the very first one that will listen to it
// should be before this event happens regardless
document.when('DOMContentLoaded', function(e){
  console.log('we are ready to go');
});

// later, even loaded asynchronously and without AMD
document.when('DOMContentLoaded', initLibrary);
```
Above code can be simplified just putting this script after `eddy.dom.js`
```javascript
document.when('DOMContentLoaded', Object);
```
This will ensure that the event will be available whenever a script will ask to listen for the `DOMContentLoaded` event.


### DOM Only
In order to make life easier on DOM world too, there are few extra methods on top of regular `eddy` stuff, including same behavior for `XMLHttpRequest`.

#### DOM#data(key[, value])
This method is a normalizer for the `dataset` magic attributes behavior with one exception: you can simply assign `null` or `undefined` to remove the attribute when and if not needed anymore.
```javascript
var div = document.createElement('div');
div.data('key', 'value');
div.hasAttribute('data-key'); // true
div.data('key'); // 'value'
div.data('key', null);
div.hasAttribute('data-key'); // false
```


### Array.prototype Enriched API
New in version `0.3`, all `Array.prototype` methods but `boundTo` and `listeners` have been made smart enough to perform the same call inside each item of the array.

This approach simplifies a very common pattern with collections, specially in the DOM world, so that we can add or remove events to many objects at once.

```javascript
function query(CSS, parentNode) {
  return Array.prototype.slice.call(
    (parentNode || document).querySelectorAll(CSS)
  );
}

// later on ...
query('ul > li').on('click', doStuff);
```
The assumption is that collections are commonly used like that.


### Which File ?
`eddy.js` comes in different flavors but it operates on global, native, constructors.
This means once you require or include or load `eddy.js` you need to manually `delete` polluted prototypes if needed.
Anyway, here the list of files you need:

 * [browser without DOM](build/eddy.js), for *browsers* meaning down to IE6 baby, fear not!
 * [browser with DOM](build/eddy.dom.js), for *browsers* meaning IE8, using [ie8 file](https://github.com/WebReflection/ie8#ie8) plus all modern mobile and desktop browsers. In order to have an almost fully standard and updated DOM environment, please add [dom4](https://github.com/WebReflection/dom4#dom4) after `ie8` as done as example in the [test page](http://webreflection.github.io/eddy/test/).
 * [AMD including DOM](build/eddy.amd.js), same as `eddy.dom.js` inside the require AMD logic. Both `ie8` and `dom4` are strongly suggested here too.
 * [node.js](build/eddy.node.js), meaning node.js and other server side engines since no export is used/needed

You can install `eddy.js` directly via `npm install eddy` too and simply use `require('eddy')`.
The version for node should work for Rhino too without problems ;-)


### Why Eddy As Name ?
Not only because of the " *Event Driven* sound check ", the definition I prefer is the following one:

> a current or trend, as of opinion or events, running counter to the main current.

but [all other definitions](http://dictionary.reference.com/browse/eddy) are somehow very metaphoric too ;-)


### Not Your Meal ?
If you are stuck in late 90s dogmas about JS and forbidden `Object.prototype` pollution, you can always go for [EventTarget](https://github.com/WebReflection/event-target#event-target) mixin and use that with all your classes.

What `eddy.js` gives you here, is the ability to forget all these problems and use emitters when you need them, if you need them, as easy as that.