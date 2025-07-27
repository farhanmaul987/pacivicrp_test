mp.events.add("client:validateVehicleModel", (vehicleName) => {
  const modelHash = mp.game.joaat(vehicleName);

  const isInCdimage = mp.game.streaming.isModelInCdimage(modelHash);
  const isVehicle = mp.game.streaming.isModelAVehicle(modelHash);

  const isValid = isInCdimage && isVehicle;

  mp.events.callRemote("server:spawnVehicleIfValid", vehicleName, isValid);
});
