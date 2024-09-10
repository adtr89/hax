const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Spuštění bez GUI
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Důležité pro spuštění na serverech
  });

  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless', { waitUntil: 'networkidle2' });

  // Vytvoření místnosti v Haxballu
  await page.evaluate(() => {
    var room = HBInit({ roomName: "Haxball Room on Render", maxPlayers: 10, public: true });

    room.onPlayerJoin = function(player) {
      console.log(player.name + " joined the room");
    };

    room.onPlayerLeave = function(player) {
      console.log(player.name + " left the room");
    };
  });

  console.log('Haxball room is running in a headless browser.');
})();
