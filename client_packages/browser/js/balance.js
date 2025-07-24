const errorMsg = {
  "invalid-integer": "Please enter a valid number.",
  "invalid-value": "Please enter a valid value.",
  "not-enough-bank": "Insufficient bank balance.",
  "not-enough-cash": "Insufficient cash.",
};

let selectedAmount = 0;

function updateBalance(bankBalance, cashBalance) {
  document.getElementById("bank_balance").innerText =
    bankBalance.toLocaleString();
  document.getElementById("cash").innerText = cashBalance.toLocaleString();
}

document.querySelectorAll(".blc-btn-opt").forEach((btn) => {
  btn.addEventListener("click", () => {
    let value = btn.innerText.replace("$", "");
    selectedAmount = value.toLowerCase() === "all" ? "all" : parseInt(value);
    document.querySelector(".blc-input").value = selectedAmount;
  });
});

function sendAccountInfo(type) {
  let input = document.querySelector(".blc-input").value;
  let amount = parseInt(input);

  if (input.toLowerCase() === "all") {
    amount = "all";
  }

  if (isNaN(amount) && amount !== "all") {
    return showError(errorMsg["invalid-integer"]);
  }

  if (type === 0) {
    // Withdraw
    mp.trigger("server:withdraw", amount);
  } else if (type === 1) {
    // Deposit
    mp.trigger("server:deposit", amount);
  }
}

function showError(msg) {
  alert(msg); // Ganti sesuai kebutuhan UI lu (bisa pakai modal/toast)
}

function handleLoginClick(btn) {
  // Placeholder buat kompatibel sama onclick yg udah ditulis
}
