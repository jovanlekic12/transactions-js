"use strict";

import "./style.css";
const totalIncome = document.querySelector(".total__income");
const totalTransactions = document.querySelector(".total__transactions");
const balance = document.querySelector(".balance");
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
  deleteIncome(id) {
    this.incomes = this.incomes.filter((income) => income.id !== id);
  }
  deleteTransaction(id) {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
  }
  getTotalIncome() {
    let totalIncome = 0;
    for (let i = 0; i <= this.incomes.length - 1; i++) {
      totalIncome = totalIncome + Number(this.incomes[i].amount);
    }
    return totalIncome;
  }
  getTotalTransactions() {
    let totalTransactions = 0;
    for (let i = 0; i <= this.transactions.length - 1; i++) {
      totalTransactions =
        totalTransactions + Number(this.transactions[i].amount);
    }
    return totalTransactions;
  }
  getBalance() {
    return this.getTotalIncome() - this.getTotalTransactions();
  }
  renderIncome() {
    incomeList.innerHTML = "";
    this.incomes.forEach((income) => {
      const html = `<li class="list__item list__item__income" id="${income.id}">
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
      const html = `<li class="list__item list__item__transaction" id="${transaction.id}">
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
  totalIncome.textContent = `Total income: ${balanceManager.getTotalIncome()}$`;
  balance.textContent = `Balance: ${balanceManager.getBalance()}$`;
  inputIncomeName.value = "";
  inputIncomeAmount.value = "";
});

transactionsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  balanceManager.addTransaction(
    new Transaction(transactionName, transactionAmount)
  );
  balanceManager.renderTransaction();
  totalTransactions.textContent = `Total transactions: -${balanceManager.getTotalTransactions()}$`;
  balance.textContent = `Balance: ${balanceManager.getBalance()}$`;
  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
});

incomeList.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn__delete")) {
    const li = event.target.closest("li");
    const id = li.id;
    balanceManager.deleteIncome(id);
    li.remove();
  }
});

transactionsList.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn__delete")) {
    const li = event.target.closest("li");
    const id = li.id;
    balanceManager.deleteTransaction(id);
    li.remove();
  }
});
