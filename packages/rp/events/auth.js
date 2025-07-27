const bcrypt = require("bcryptjs");
const saltRounds = 10;

mp.events.add(
  "server:registerAccount",
  async (player, username, first_name, last_name, email, password) => {
    if (username.length >= 3 && password.length >= 5) {
      if (!validEmail(email)) return failedLoginHandle(player, "invalid-info");
      if (!validName(first_name) || !validName(last_name))
        return failedLoginHandle(player, "invalid-name");

      try {
        const res = await attemptRegister(
          player,
          username,
          first_name,
          last_name,
          email,
          password
        );
        if (res) {
          console.log(`${username} has registered a new account.`);
          successLoginHandle(player, "registered", username);
        } else {
          failedLoginHandle(player, "takeninfo");
        }
      } catch (e) {
        errorHandler(e);
      }
    } else {
      failedLoginHandle(player, "tooshort");
    }
  }
);

mp.events.add("server:loginAccount", async (player, username, password) => {
  let loggedAccount = mp.players
    .toArray()
    .find((p) => p.getVariable("username") === username);
  if (loggedAccount) return player.call("client:loginHandler", ["logged"]);

  try {
    //  Returns true/false if the login was successful or not
    const res = await attemptLogin(username, password);
    res
      ? successLoginHandle(player, "success", username)
      : failedLoginHandle(player, "incorrectinfo");
  } catch (e) {
    errorHandler(e);
  }
});

mp.events.add("server:loadAccount", async (player, username) => {
  try {
    const [rows] = await mp.db.query(
      "SELECT * FROM `accounts` WHERE `username` = ?; UPDATE `accounts` SET `lastActive` = now() WHERE username = ?",
      [username, username]
    );
    if (rows.length != 0) {
      player.sqlID = rows[0][0].ID;
      player.name = username;
      player.setVariable("username", username);
      player.position = new mp.Vector3(mp.settings.defaultSpawnPosition);
      player.setVariable("loggedIn", true);
    }
  } catch (e) {
    errorHandler(e);
  }
});

mp.events.add("playerJoin", (player) => {
  player.setVariable("loggedIn", false);
  timeoutKick(player);
});

mp.events.add("playerQuit", async (player) => {
  if (player.getVariable("loggedIn") === false) return;
  let name = player.name;
  // try {
  //   const [status] = await mp.db.query(
  //     "UPDATE `accounts` SET `position` = ? WHERE username = ?",
  //     [JSON.stringify(player.position), player.name]
  //   );
  //   if (status.affectedRows === 1)
  //     console.log(`${name}'s data successfully saved.`);
  //   console.log(`${name} has quit the server.`);
  // } catch (e) {
  //   errorHandler(e);
  // }
});

async function attemptRegister(
  player,
  username,
  first_name,
  last_name,
  email,
  pass
) {
  try {
    const [rows] = await mp.db.query(
      "SELECT * FROM `accounts` WHERE `username` = ? OR `email` = ?",
      [username, email]
    );

    if (rows.length !== 0) return false;

    const hash = await bcrypt.hash(pass, saltRounds);

    const result = await mp.db.query(
      "INSERT INTO `accounts` SET `username` = ?, `email` = ?, `password` = ?, `first_name` = ?, `last_name` = ?",
      [username, email, hash, first_name, last_name]
    );

    return result[0].affectedRows === 1;
  } catch (e) {
    errorHandler(e);
  }
}

async function attemptLogin(username, password) {
  try {
    const [rows] = await mp.db.query(
      "SELECT `username`, `password` FROM `accounts` WHERE `username` = ?",
      [username]
    );

    if (rows.length === 0) return false;

    const res = await bcrypt.compare(password, rows[0].password);

    return res;
  } catch (e) {
    errorHandler(e);
  }
}

function errorHandler(e) {
  if (e.sql) {
    console.log(`[MySQL] ERROR: ${e.sqlMessage}\n[MySQL] QUERY: ${e.sql}`);
  } else {
    console.log(`Error: ${e}`);
  }
}

function failedLoginHandle(player, handle) {
  player.call("client:loginHandler", [handle]);
  resetTimeout(player);
}

function resetTimeout(user) {
  if (user.idleKick) {
    clearTimeout(user.idleKick);
    user.idleKick = null;
  }
  timeoutKick(user);
}

function successLoginHandle(player, handle, username) {
  if (player.idleKick) {
    clearTimeout(player.idleKick);
    player.idleKick = null;
  }
  mp.events.call("server:loadAccount", player, username);
  player.call("client:loginHandler", [handle]);
  console.log(`${username} has successfully logged in.`);
}

function timeoutKick(user) {
  user.idleKick = setTimeout(() => {
    user.call("client:hideLoginScreen");
    user.outputChatBox(`You were kicked for idling too long.`);
    user.kick();
  }, 1200000);
}

function validName(name) {
  let re = /^[A-Za-z\s'-]+$/y;
  return re.test(name);
}

function validEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
