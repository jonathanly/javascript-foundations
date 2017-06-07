### The module pattern

```js
var budgetController = (function() {
  var x = 47;
  var add = function(a) {
    return a + x;
  }

  return {
    publicAdd: function(b) { // Has access to x because closures
      console.log(add(b));
    }
  }
})();
```

#### Spread Operator
```js
// ES5 way to convert NodeList to Array
fields = document.querySelectorAll(`${inputDescription}, ${inputValue}`);
fieldsArray = Array.prototype.slice.call(fields);

// ES6 way using spread operator
fields = [...document.querySelectorAll(`${inputDescription}, ${inputValue}`)];
```

### Event delagation
Attaching an event handler/listener to a parent element.
Use cases:
- When we have an element with lots of child elements that we are interested in.
- When we want an event handler attached to an element that is not yet in the DOM when our page is loaded.

```js
document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

var ctrlDeleteItem = function(event) {
  let itemID, splitID, type, id;

  itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

  if (itemID) {
    splitID = itemID.split('-');
    type = splitID[0];
    id = parseInt(splitID[1]);

    budgetCtrl.deleteItem({ type, id });
    updateBudget();
  }
}
```

### DOM Manipulation - Removing elements
- Cannot remove element directly, must remove element via parent element.

### Sorting arrays
Arrays can be sorted lexically using `Array.prototype.sort()`. The default sort order is according to string unicode code points.

`sort(comparefunction)` takes a function argument that defines the sort order.
```js
var fruit = ['cherries', 'apples', 'bananas'];

fruit.sort(function(a, b){
    if(a < b) return -1;
    if(a > b) return 1;
    return 0;
}); // ["apples", "bananas", "cherries"]

fruit.sort(function(a, b){
    if(a < b) return 1;
    if(a > b) return -1;
    return 0;
}); // ["cherries", "bananas", "apples"]
```


### Revise
- Lecture 86 & 87 => Updating DOM using NodeLists (Whaaaaaat?)
