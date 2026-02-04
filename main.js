import Console from "./src/core/Console.js";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d", { alpha: false });
const imageData = ctx.createImageData(256, 240);

// ✅ pass fps so frameThrottling is NOT null
const nes = new Console(60);

nes.addObserver({
  notify(type, payload) {
    if (type !== "frame-ready") return;

    // tick() sends [frameBuffer, bg, sprites, colors]
    // tickDebug() sends frameBuffer directly
    const frameBuffer = Array.isArray(payload) ? payload[0] : payload;

    imageData.data.set(frameBuffer);
    ctx.putImageData(imageData, 0, 0);
  }
});

document.getElementById("rom").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  nes.loadROM(buffer);
  nes.start();
});
