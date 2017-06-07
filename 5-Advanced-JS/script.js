// Every Javascript object has a prototype property, which makes inheritance possible in Javascript.
// The prototype property of an object is where we put methods and properties that we want other objects to inherit.
// The Constructor's prototype property is NOT the prototype of the Constructor itself, it's the prototype of ALL instances that are created through it.
// when a certain method or property is called, the search starts in the object itself, and if it cannot be found, the search moves on to the obects prototype. This continues until the method is found: prototype chain.

// Function Constructor

// var john = {
//   name: 'John',
//   yearOfBirth: 1990,
//   job: 'teacher'
// };
//
// var Person = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// }
//
// Person.prototype.calculateAge = function () {
//   console.log(2017 - this.yearOfBirth)
// }
//
// var john = new Person('John', 1990, 'teacher');
//
// var jane = new Person('Jane', 1969, 'designer');
//
// var mark = new Person('Mark', 1948, 'retired');


// Object.create

// var personProto = {
//   calculateAge: calculateAge = function () {
//     console.log(2017 - this.yearOfBirth);
//   }
// };
//
// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';
//
// var jane = Object.create(personProto, {
//   name: { value: 'Jane' },
//   yearOfBirth: { value: 1969 },
//   job: { value: 'designer' }
// });

//////////////////////////////////
// Passing functions as arguments
//
// var years = [1990, 1965, 1937, 2006, 1998];
//
// function arrayCalc(arr, fn) {
//   var arrRes = [];
//
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//
//   return arrRes;
// }
//
// function calculateAge(el) {
//   return 2016 - el;
// }
//
// function isFullAge(el) {
//   return el >= 18;
// }
//
// function maxHeartRate(age) {
//   if (age >= 18 && age <= 81) {
//     return Math.round(206.9 - (0.67 * age));
//   }
//   return -1;
// }
//
// let ages = arrayCalc(years, calculateAge);
// let heartRates = arrayCalc(ages, maxHeartRate);


//////////////////////////////////
// Functions returning Functions

// function interviewQuestions(job) {
//   if (job === 'designer') {
//     return function(name) {
//       console.log(name + ', can you please explain what UX design is?');
//     }
//   } else if (job === 'teacher') {
//     return function(name) {
//       console.log('What subect do you teach, ' + name + '?');
//     }
//   } else {
//     return function(name) {
//       console.log('Hello ' + name + ', what do you do?');
//     }
//   }
// }
//
// let teacherQuestion = interviewQuestions('teacher');
// let designerQuestion = interviewQuestions('designer');
//
// teacherQuestion('John');
// designerQuestion('John');


//////////////////////////////////
// Immediately Invoked Function Expressions - IIFE

// function game() {
//   var score = Math.random() * 10;
//   console.log(score >= 5);
// }
//
// (function game() {
//   var score = Math.random() * 10;
//   console.log(score >= 5);
// })();
//
// (function game(goodluck) {
//   var score = Math.random() * 10;
//   console.log(score >= 5 - goodluck);
// })(5);



//////////////////////////////////
// Immediately Invoked Function Expressions - IIFE

// function retirement(retirementAge) {
//   var a = ' years left until retirement.';
//   return function(yearOfBirth) {
//     var age = 2016 - yearOfBirth;
//     console.log((retirementAge - age) + a);
//   }
// }
//
// var retirementUS = retirement(66);
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);
//
// retirementUS(1992);
// retirementGermany(1992);
// retirementIceland(1992);
//
// function interviewQuestions(job) {
//   return function(name) {
//     if (job === 'designer') {
//       console.log(name + ', can you please explain what UX design is?');
//     } else if (job === 'teacher') {
//           console.log('What subect do you teach, ' + name + '?');
//     } else {
//       console.log('Hello ' + name + ', what do you do?');
//     }
//   }
// }


//////////////////////////////////
// Bind, call and apply

// var john = {
//   name: 'John',
//   age: 26,
//   job: 'teacher',
//   presentation: function(style, timeOfDay){
//     if (style === 'formal') {
//       console.log(`Good ${timeOfDay}, ladies and gentleman! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old`)
//     } else if (style === 'friendly') {
//       console.log(`Hey! Whats up? I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old. Have a nice ${timeOfDay}`)
//     }
//   }
// };
//
// var emily = {
//   name: 'Emily',
//   age: 35,
//   job: 'designer'
// }
//
// john.presentation('formal', 'afternoon');
//
// john.presentation.call(emily, 'friendly', 'afternoon');
// // john.presentation.call(emily, ['friendly', 'afternoon']);
//
// var johnFriendly = john.presentation.bind(john, 'friendly');
// johnFriendly('night');
