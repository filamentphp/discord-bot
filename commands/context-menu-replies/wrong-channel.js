const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Wrong Channel')
        .setType(ApplicationCommandType.Message),
    emoji: '✋',
    message: `Your question is posted in the wrong channel. Each plugin has its own channel.`,
};
