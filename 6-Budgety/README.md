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
