
// Creating a function constructor

(function() {
  function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.displayQuestion = function() {
    console.log(this.question);

    this.answers.forEach(function(answer, i) {
      console.log(i + " : " + answer);
    })
  }

  Question.prototype.checkAnswer = function(answer) {
    console.log('-------------------------')
    if (parseInt(answer) === this.correctAnswer) {
      console.log('You are correct!');
      scoreTracker(true);
      nextQuestion();
    } else {
      console.log('Better luck next time :(');
      scoreTracker(false);
      nextQuestion();
    }
  }

  var q1 = new Question(
    "Who will be pirate king?",
    ["Luffy", "Ichigo", "Naruto"],
    0
  );

  var q2 = new Question(
    "How many bases are there in baseball?",
    ["One", "Two", "Three", "Four"],
    3
  );

  var q3 = new Question(
    "What's the best way to start your day with?",
    ["Coffee", "Tea", "Covfefe"],
    2
  );

  var allQuestions = [q1, q2, q3];

  function nextQuestion() {
    var questionSelect = Math.floor(Math.random() * allQuestions.length);

    allQuestions[questionSelect].displayQuestion();
    var userInput = prompt('Write your response');

    if (userInput !== 'exit') {
      allQuestions[questionSelect].checkAnswer(userInput);
    }
  }

  function score() {
    var currentScore = 0;
    return function(correct) {
      if (correct) {
        currentScore++;
        console.log(`Your current score is ${currentScore}`);
      } else {
        console.log(`Your current score is ${currentScore}`);
      }
      console.log('-------------------------')
      return currentScore;
    }
  }

  var scoreTracker = score();

  nextQuestion();

})();
