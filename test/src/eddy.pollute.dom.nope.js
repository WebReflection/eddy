
/* not needed, might become handy one day though
function addMagicIfNecessary(node) {
  if (!(DOM_SECRET in node)) {
    node.attachEvent('onpropertychange', onpropertychange);
  }
  return node;
}

function onpropertychange(e) {
  e || (e = event);
  if (e.propertyName == DOM_SECRET && accept) {
    data = e.srcElement[DOM_SECRET];
    accept = false;
    e.srcElement[DOM_SECRET] = void 0;
    accept = true;
  }
}
*/
