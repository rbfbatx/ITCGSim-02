require('./config');
const os = require('os');

const { App } = require('./output/backend/app');
const { BotManager } = require('./output/game/bots/bot-manager');
const { SimpleBot } = require('./output/simple-bot/simple-bot');
const { CardManager } = require('./output/game/cards/card-manager');
const { StateSerializer } = require('./output/game/serializer/state-serializer');
const { config } = require('./output/config');
const sets = require('./output/sets');
const process = require('process');

require('dotenv').config({ path: require('find-config')('.env') })

const cardManager = CardManager.getInstance();
cardManager.defineSet(sets.setImaginarium);

StateSerializer.setKnownCards(cardManager.getAllCards());

const botManager = BotManager.getInstance();
// botManager.registerBot(new SimpleBot('Gardevoir'));
// botManager.registerBot(new SimpleBot('Charizard'));
// botManager.registerBot(new SimpleBot('LostBox'));
// botManager.registerBot(new SimpleBot('Lugia'));
// botManager.registerBot(new SimpleBot('Dragapult'));
// botManager.registerBot(new SimpleBot('Standard'));
// botManager.registerBot(new SimpleBot('GLC'));
// botManager.registerBot(new SimpleBot('Retro'));

const app = new App();

// function logCPUUsage() {
//   const cpuUsage = os.loadavg()[0] * 1000;
//   console.log(`Current CPU Usage: ${cpuUsage.toFixed(2)}%`);
// }

// // Add CPU monitoring
// function monitorCPU() {
//   const cpuUsage = os.loadavg()[0] * 1000;
//   const threshold = 50;

//   if (cpuUsage > threshold) {
//     console.log('CPU usage exceeded 50%, restarting server...');
//     process.exit(1);
//   }
// }

// setInterval(logCPUUsage, 60000); // Log every 1 minute
// setInterval(monitorCPU, 300000); // Monitor every 5 minutes

app.connectToDatabase()
  .catch(error => {
    console.log('Unable to connect to database.');
    console.error(error.message);
    process.exit(1);
  })
  .then(() => app.configureBotManager(botManager))
  .then(() => app.start())
  .then(() => {
    const address = config.backend.address;
    const port = config.backend.port;
    console.log('Application started on ' + address + ':' + port + '.');
  })
  .catch(error => {
    console.error(error.message);
    console.log('Application not started.');
    process.exit(1);
  });
