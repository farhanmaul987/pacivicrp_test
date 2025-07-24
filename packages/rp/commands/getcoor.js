mp.events.addCommand("getcoor", (player) => {
  const pos = player.position;

  const x = pos.x.toFixed(3);
  const y = pos.y.toFixed(3);
  const z = pos.z.toFixed(3);

  player.outputChatBox(`📌 Koordinat Kamu:\nX: ${x} \nY: ${y} \nZ: ${z}`);
});
