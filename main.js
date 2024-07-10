"use strict";
import "./style.css";
import { format, parseISO } from "date-fns";
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
      <h1 class="income__date">${income.date}<h1>
      <button class="btn btn__delete">DELETE</button>
      </li>`;
      incomeList.insertAdjacentHTML("afterbegin", html);
    });
  }
  renderTransaction() {
    transactionsList.innerHTML = "";
    this.transactions.forEach((transaction) => {
      const html = `<li class="list__item list__item__transaction" id="${transaction.id}">
      <h1 class="transaction__name">${transaction.name}</h1>
      <h1 class="transaction__amount">${transaction.amount}$</h1>
      <h1 class="transaction__date">${transaction.date}</h1>
      <button class="btn btn__delete">DELETE</button>
      </li>`;
      transactionsList.insertAdjacentHTML("afterbegin", html);
    });
  }
}

class Income {
  id;
  name;
  date;
  amount;
  constructor(name, amount, date) {
    this.date = date;
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.amount = amount;
  }
}

class Transaction {
  id;
  name;
  amount;
  constructor(name, amount, date) {
    this.date = date;
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
  balanceManager.addIncome(
    new Income(incomeName, incomeAmount, format(new Date(), "dd.MM.yyyy"))
  );
  balanceManager.renderIncome();
  Toastify({
    text: `YOU HAVE NEW INCOME ${incomeAmount}$`,
    duration: 3000,
    destination: "",
    className: "notification",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
  totalIncome.textContent = `Total income: ${balanceManager.getTotalIncome()}$`;
  balance.textContent = `Balance: ${balanceManager.getBalance()}$`;
  inputIncomeName.value = "";
  inputIncomeAmount.value = "";
});

transactionsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (transactionAmount <= balanceManager.getBalance()) {
    balanceManager.addTransaction(
      new Transaction(
        transactionName,
        transactionAmount,
        format(new Date(), "dd.MM.yyyy")
      )
    );
    balanceManager.renderTransaction();
    Toastify({
      text: `YOU HAVE NEW TRANSACTION -${transactionAmount}$`,
      duration: 3000,
      className: "notification transaction",
      destination: "",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {}, // Callback after click
    }).showToast();
    totalTransactions.textContent = `Total transactions: -${balanceManager.getTotalTransactions()}$`;
    balance.textContent = `Balance: ${balanceManager.getBalance()}$`;
    inputTransactionName.value = "";
    inputTransactionAmount.value = "";
  } else {
    Toastify({
      text: `YOU DON'T HAVE ENOUGH MONEY!`,
      duration: 3000,
      className: "notification no__money",
      destination: "",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function () {}, // Callback after click
    }).showToast();
  }
});

incomeList.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn__delete")) {
    const li = event.target.closest("li");
    const id = li.id;
    balanceManager.deleteIncome(id);
    totalIncome.textContent = `Total income: ${balanceManager.getTotalIncome()}$`;
    balance.textContent = `Balance: ${balanceManager.getBalance()}$`;
    li.remove();
  }
});

transactionsList.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn__delete")) {
    const li = event.target.closest("li");
    const id = li.id;
    balanceManager.deleteTransaction(id);
    totalTransactions.textContent = `Total transactions: -${balanceManager.getTotalTransactions()}$`;
    balance.textContent = `Balance: ${balanceManager.getBalance()}$`;
    li.remove();
  }
});
