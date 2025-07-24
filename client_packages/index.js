require("./modules/login.js");
require("./modules/balance.js");

mp.events.add("playerReady", () => {
  mp.events.call("client:showLoginScreen");
});

mp.events.add("client:balance", () => {
  mp.events.call("client:showBalance");
});
