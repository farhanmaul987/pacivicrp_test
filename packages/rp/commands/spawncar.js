mp.events.addCommand("spawncar", (player, fullText) => {
  const vehicleName = fullText.trim().toLowerCase();
  if (!vehicleName) {
    return player.outputChatBox("🚗 Gunakan: /spawncar [nama_kendaraan]");
  }

  player.call("client:validateVehicleModel", [vehicleName]);
});

mp.events.add("server:spawnVehicleIfValid", (player, vehicleName, isValid) => {
  if (!isValid) {
    return player.outputChatBox("❌ Nama kendaraan tidak valid.");
  }

  const modelHash = mp.joaat(vehicleName);

  if (player.vehicle && player.spawnedVehicle) {
    player.spawnedVehicle.destroy();
  }

  const offset = 5;
  const heading = player.heading;
  const angle = (heading * Math.PI) / 180;

  const spawnX = player.position.x + Math.sin(angle) * offset;
  const spawnY = player.position.y + Math.cos(angle) * offset;
  const spawnZ = player.position.z;

  const vehicle = mp.vehicles.new(
    modelHash,
    new mp.Vector3(spawnX, spawnY, spawnZ),
    {
      heading,
      numberPlate: "VALIDSPAWN",
      color: [
        [0, 0, 0],
        [0, 0, 0],
      ],
      locked: false,
    }
  );

  vehicle.setVariable("owner", player.name);
  player.spawnedVehicle = vehicle;
  player.outputChatBox(`✅ Kendaraan ${vehicleName} telah dispawn.`);
});
