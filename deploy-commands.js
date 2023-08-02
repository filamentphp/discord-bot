const { REST, Routes } = require('discord.js');

require('dotenv').config()

const commands = [];

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