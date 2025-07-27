// const fixLocations = {
//   airport: new mp.Vector3(),
//   mount: new mp.Vector3(),
//   dock: new mp.Vector3(),
//   beach: new mp.Vector3(),
// };

mp.events.addCommand("tp", (player, fullText) => {
  const args = fullText.trim().split(" ");

  if (args.length === 3) {
    const x = parseFloat(args[0]);
    const y = parseFloat(args[1]);
    const z = parseFloat(args[2]);

    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      player.position = new mp.Vector3(x, y, z);
      return player.outputChatBox(
        `✅ Teleport ke koordinat: (${x}, ${y}, ${z})`
      );
    }
  }

  player.outputChatBox("❌ Gunakan: /tp [x y z] atau /tp [nama_lokasi]");
});
