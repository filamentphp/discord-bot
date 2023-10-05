const { REST, Routes } = require('discord.js');
const contextMenuReplyCommands = require('./commands/context-menu-replies/index');

require('dotenv').config()

const commands = Object.values(contextMenuReplyCommands).map(command => command.data.toJSON())

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})()