module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandsName } = interaction;
      const command = commands.get(commandsName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.replay({
          content: `Something went wrong while executing this command...`,
          emphemeral: true,
        });
      }
    }
  },
};
