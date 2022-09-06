require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
//discord.js 라이브러리에서 필요한 요소 가져오는 방식
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
//class = template (모형 틀), intents: constructor function. 재료.
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
// console.log(functionFolders);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter(file => file.endsWith('.js'));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
//Discord bot 만드는법
// 1. 예상되는 commands를 discord에다 알려주기.
// 2. commands를 받았을 때 eventhandler 지정.

client.handleEvents();
client.handleCommands();
client.login(token);
