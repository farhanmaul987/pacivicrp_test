const errorMsg = {
  "password-mismatch": "Passwords do not match, please type them again.",
  logged: "That account is already logged in.",
  "invalid-info": "The email you provided is not valid.",
  takeninfo: "The username or email you have provided is taken.",
  tooshort: "The username or password you have provided is too short",
  incorrectinfo: "The username or password you have entered is incorrect.",
};

// Hide all alert elements on page load
document.querySelectorAll(".login-alert").forEach((el) => {
  el.style.display = "none";
});

function handleLoginClick(btn) {
  btn.disabled = true;
  btn.classList.remove("bg-tersiary");
  btn.classList.add("bg-primary");

  setTimeout(() => {
    btn.disabled = false;
    btn.classList.remove("bg-primary");
    btn.classList.add("bg-tersiary");
  }, 100);
}

// Prevent default form submission
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
});

function sendAccountInfo(state) {
  // Hide alerts every time we call this function
  document.querySelectorAll(".login-alert").forEach((el) => {
    el.style.display = "none";
  });

  switch (state) {
    case 0:
      // Get login input values using getElementById, then call the mp event
      mp.events.call(
        "client:loginData",
        document.getElementById("loginName").value,
        document.getElementById("loginPass").value
      );
      break;
    case 1:
      // Compare register password fields
      if (
        document.getElementById("registerPass").value ===
        document.getElementById("registerPass2").value
      ) {
        mp.events.call(
          "client:registerData",
          document.getElementById("registerName").value,
          document.getElementById("registerEmail").value,
          document.getElementById("registerPass").value
        );
      } else {
        throwError("password-mismatch");
      }
      break;
    default:
      break;
  }
}

function throwError(err) {
  document.querySelectorAll(".login-alert").forEach((el) => {
    // Block mempengaruhi warna error, jadi putih, nanti diganti, dipikir dulu
    el.style.display = "block";
    el.innerHTML = errorMsg[err];
  });
}

// Listen for mp events and trigger error display when needed
mp.events.add("b.throwError", (err) => {
  throwError(err);
});
