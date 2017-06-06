# Section 2 - How it works

###  Javascript Parsers and Engines
Javascript code we write is parsed to make sure it is syntactically correct. It is then converted into machine code which is interpreted and outputs onto the screen.

### Execution Context
A "wrapper" around our code which stores variables, evaluates and executes our code.

#### Global Execution Context
- Default execution context
- Code that is not inside any function
- Associated with the global object (window object)

A new execution context is generated when a function is called. The function will have access to variables that are declared it its execution context.

Execution Context has two phases: Creation phase and execution phase.

#### Creation Phase
- `argument` object is created and contains all arguments that were passed to the function.
- Function declarations are allocated a spot in memory.
- Variable declarations are create in memory and set to `undefined`.
- The last two points describe "Hoisting" in Javascript.

#### Hoisting
The function is 'hoisted' during the creation phase and saved to memory, allowing quick access during the execution phase. This only works with function declarations.
```js
calculateAge(1996); // 21

function calculateAge(year) {
  console.log(2017 - year);
}
```

Hoisting does not work with function expressions. This happens because variables are set to undefined during the creation phase and are not assigned until the execution phase.
```js
retirement(1990); // retirement is undefined

var retirement = function(year) {
  console.log(65 - (2017 - year));
}
```

```js
// Space for more complex example
```

### Scoping and the Scope Chain
Each function creates a new scope, the space/environment in which defined variables are accessible.

**Lexical Scoping** A function that sits within another function gains access to the scope of the outer function.

Functions that do not have variables in their local scope can traverse up the scope chain to find/access variables declared in their parent functions.
```js
var a = "Hello";
first();

function first() {
  var b = "Hi";
  second();

  function second() {
    var c = "Hey";
    console.log(a + b + b); // "HelloHiHey"
  }
}
```

### The 'this' keyword
