const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Code Format')
        .setType(ApplicationCommandType.Message),
    emoji: '🥴',
    message: `Please read the <#${process.env.GUIDELINES_CHANNEL_ID}> about how to format your code properly.`,
};
