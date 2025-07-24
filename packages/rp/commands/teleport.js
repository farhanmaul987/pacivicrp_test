const presetLocations = {
  airport: new mp.Vector3(-1037.6, -2738.6, 13.8),
  mount: new mp.Vector3(449.3, 5566.5, 796.1),
  garage: new mp.Vector3(215.8, -810.1, 30.7),
  beach: new mp.Vector3(-1482.3, -1024.5, 6.0),
};

mp.events.addCommand("tp", (player, fullText) => {
  const args = fullText.trim().split(" ");

  if (args.length === 1 && presetLocations[args[0]]) {
    player.position = presetLocations[args[0]];
    return player.outputChatBox(`📍 Teleport ke lokasi preset: ${args[0]}`);
  }

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
