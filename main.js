"use strict";

import "./style.css";
const incomeList = document.querySelector(".income__list");
const transactionsList = document.querySelector(".transaction__list");
const incomeForm = document.querySelector(".income__form");
const transactionsForm = document.querySelector(".transaction__form");
const inputIncomeName = document.querySelector(".input__income__name");
const inputIncomeAmount = document.querySelector(".input__income__amount");
const inputTransactionName = document.querySelector(
  ".input__transaction__name"
);
const inputTransactionAmount = document.querySelector(
  ".input__transaction__amount"
);
let incomeName;
let incomeAmount;
let transactionName;
let transactionAmount;

class BalanceManager {
  incomes;
  transactions;
  constructor() {
    this.incomes = [];
    this.transactions = [];
  }
  addIncome(income) {
    this.incomes.push(income);
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  renderIncome() {
    incomeList.innerHTML = "";
    this.incomes.forEach((income) => {
      const html = `<li class="list__item" id="${income.id}">
      <h1 class="income__name">${income.name}</h1>
      <h1 class="income__amount">${income.amount}$</h1>
      <button class="btn btn__delete">DELETE</button>
      </li>`;
      incomeList.insertAdjacentHTML("afterbegin", html);
    });
  }
  renderTransaction() {
    transactionsList.innerHTML = "";
    this.transactions.forEach((transaction) => {
      const html = `<li class="list__item" id="${transaction.id}">
      <h1 class="income__name">${transaction.name}</h1>
      <h1 class="income__amount">${transaction.amount}$</h1>
      <button class="btn btn__delete">DELETE</button>
      </li>`;
      transactionsList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

class Income {
  id;
  name;
  amount;
  constructor(name, amount) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.amount = amount;
  }
}

class Transaction {
  id;
  name;
  amount;
  constructor(name, amount) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.amount = amount;
  }
}

const balanceManager = new BalanceManager();

inputIncomeName.addEventListener("change", function () {
  incomeName = this.value;
});
inputIncomeAmount.addEventListener("change", function () {
  incomeAmount = this.value;
});
inputTransactionName.addEventListener("change", function () {
  transactionName = this.value;
});
inputTransactionAmount.addEventListener("change", function () {
  transactionAmount = this.value;
});

incomeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  balanceManager.addIncome(new Income(incomeName, incomeAmount));
  balanceManager.renderIncome();
  inputIncomeName.value = "";
  inputIncomeAmount.value = "";
});

transactionsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  balanceManager.addTransaction(
    new Transaction(transactionName, transactionAmount)
  );
  balanceManager.renderTransaction();
  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
});
