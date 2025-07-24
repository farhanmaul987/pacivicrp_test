mp.events.addCommand("balance", async (player) => {
  if (!player.sqlID) {
    player.outputChatBox("❌ Kamu belum login.");
    return;
  }

  try {
    const [rows] = await mp.db.execute(
      "SELECT bank_balance, cash_balance FROM players_stuff WHERE id_player = ? LIMIT 1",
      [player.sqlID] // Pakai ID dari akun yang udah login
    );

    if (rows.length === 0) {
      player.outputChatBox("❌ Data balance tidak ditemukan.");
      return;
    }

    const { bank_balance, cash_balance } = rows[0];

    // Kirim ke client
    player.call("client:showBalance", [bank_balance, cash_balance]);
  } catch (err) {
    console.error("Gagal ambil balance:", err);
    player.outputChatBox("❌ Terjadi error saat ambil data.");
  }
});
