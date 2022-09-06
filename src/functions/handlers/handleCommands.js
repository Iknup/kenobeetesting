const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');

module.exports = client => {
  //module.exports = 다른 파일로 수출할 수 있는 함수
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter(file => file.endsWith('.js'));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        //commandsFolder 내에 있는 command파일을 가져옴
        commands.set(command.data.name, command);
        //commands data structure hash map 생성
        commandArray.push(command.data.toJSON());
        //commandArray 푸쉬
        console.log(
          `Command: ${command.data.name}  has been passed through the handler`
        );
      }
    }

    const clientId = '1016753388446302298';
    const guildId = '903323578550861934';
    const rest = new REST({ version: '9' }).setToken(process.env.token);
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  };
};
