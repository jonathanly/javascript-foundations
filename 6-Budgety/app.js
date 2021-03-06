var budgetController = (function(){

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }

    return this.percentage;
  }

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(item => { sum += item.value });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: function({ type, description, value }) {
      var newItem, id;

      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length -1].id + 1;
      } else {
        id = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(id, description, value);
      } else if (type === 'inc') {
        newItem = new Income(id, description, value);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function({ type,  id }) {
      data.allItems[type] = data.allItems[type].filter(item => {
        return item.id !== id;
      });
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate budget
      data.budget = data.totals.inc - data.totals.exp;
      // calculate percentage of expenses
      if (data.totals.inc > 0) {
        data.percentage = Math.floor((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(item => {
        return item.calcPercentage(data.totals.inc);
      })
    },

    getPercentages: function() {
      return data.allItems.exp.map(item => {
        return item.getPercentage();
      });
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    test: function() {
      console.log(data);
    }
  }
})();


var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentLabel: '.budget__expenses--percentage',
    container: '.container',
    expensePercentLabel: '.item__percentage',
    yearLabel: '.budget__title--month'
  }

  function formatNumber(num, type) {
    var numSplit, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2)  // Number prototype method

    numSplit = num.split('.');

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1];
    type = (type === 'exp') ? '-' : '+';

    return  `${type} ${int}.${dec}`

  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function(obj, type) {
      var html, element;
      const { id, description, value } = obj;
      const formattedValue = formatNumber(value, type);
      // Create HTMl
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-${id}">
          <div class="item__description">${description}</div>
          <div class="right clearfix">
            <div class="item__value">${formattedValue}</div><div class="item__delete">
              <button class="item__delete--btn">
                <i class="ion-ios-close-outline"></i>
              </button>
            </div>
          </div>
        </div>`
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="exp-${id}">
          <div class="item__description">${description}</div>
          <div class="right clearfix">
            <div class="item__value">${formattedValue}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
              <button class="item__delete--btn">
                <i class="ion-ios-close-outline"></i>
              </button>
            </div>
          </div>
        </div>`
      }

      document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },

    clearFields: function() {
      var fields;
      const { inputDescription, inputValue } = DOMstrings;

      fields = [...document.querySelectorAll(`${inputDescription}, ${inputValue}`)];

      fields.forEach(field => { field.value = "" });
      fields[0].focus();
    },

    displayBudget: function(obj) {
      const { budgetLabel, incomeLabel, expensesLabel, percentLabel } = DOMstrings;
      const { budget, totalInc, totalExp, percentage} = obj;

      const type = (budget >= 0) ? 'inc ' : 'exp';

      document.querySelector(budgetLabel).innerText = formatNumber(`${budget}`, type);
      document.querySelector(incomeLabel).innerText = formatNumber(`${totalInc}`, 'inc');
      document.querySelector(expensesLabel).innerText = formatNumber(`${totalExp}`, 'exp');

      if (percentage > 0) {
        document.querySelector(percentLabel).innerText = `${percentage}%`;
      } else {
        document.querySelector(percentLabel).innerText = `---`;
      }
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(DOMstrings.expensePercentLabel);

      var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
          callback(list[i], i)
        }
      }

      nodeListForEach(fields, function(field, index) {
        if (percentages[index] > 0) {
          field.textContent = percentages[index] + '%';
        } else {
          field.textContent = '---';
        }
      });
    },

    deleteListItem: function(id) {
      // Removing from DOM
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    displayDate: function() {
      var now, year, months, month;

      now = new Date();
      year = now.getFullYear();

      months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      month = months[now.getMonth()];

      document.querySelector(DOMstrings.yearLabel).innerText = year;
      document.querySelector(DOMstrings.yearLabel).insertAdjacentHTML('afterbegin', `${month}, `);
    },

    getDOMstrings: function() {
      return DOMstrings
    }
  };
})();


var Controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    // event delegation
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  }

  var updateBudget = function() {
    // calculate budget
    budgetCtrl.calculateBudget();
    let budget = budgetCtrl.getBudget();
    // display budget on UI
    UICtrl.displayBudget(budget);
  }

  var updatePercentages = function() {
    // calculate %
    budgetCtrl.calculatePercentages();
    // read from budget Controller
    var percents = budgetCtrl.getPercentages();
    // update ui
    UICtrl.displayPercentages(percents);
  }

  var ctrlAddItem = function() {
    var input, newItem;

    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      newItem = budgetCtrl.addItem(input);

      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();

      updateBudget();
      updatePercentages();
    }
  }

  var ctrlDeleteItem = function(event) {
    let itemID, splitID, type, id;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      id = parseInt(splitID[1]);

      budgetCtrl.deleteItem({ type, id });
      UICtrl.deleteListItem(itemID);
      updateBudget();
    }
  }

  return {
    init: function() {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      });
      UICtrl.displayDate();
      setupEventListeners();
    }
  };

})(budgetController, UIController);

Controller.init();
