var balanceBrowser;

mp.events.add("client:showBalance", (bankBalance, cashBalance) => {
  if (balanceBrowser) balanceBrowser.destroy();

  balanceBrowser = mp.browsers.new("package://browser/html/balance/index.html");
  mp.players.local.freezePosition(true);
  mp.game.ui.setMinimapVisible(true);
  mp.gui.chat.activate(false);
  mp.gui.chat.show(false);
  mp.game.ui.displayRadar(false);

  setTimeout(() => {
    mp.gui.cursor.show(true, true);

    balanceBrowser.execute(`updateBalance(${bankBalance}, ${cashBalance});`);
  }, 500);
});

mp.events.add("client:hideBalance", () => {
  if (balanceBrowser) {
    balanceBrowser.destroy();
    balanceBrowser = null;
  }

  mp.players.local.freezePosition(false);
  mp.game.ui.setMinimapVisible(false);
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.gui.cursor.show(false, false);
  mp.game.ui.displayRadar(true);
});
