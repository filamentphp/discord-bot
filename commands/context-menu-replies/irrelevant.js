const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Irrelevant')
        .setType(ApplicationCommandType.Message),
    emoji: '❌',
    message: `It seems that your question is not related to Filament. To help as many Filament users as possible, we need to be selective over which questions get posted here.`,
};
