const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Cross Post')
        .setType(ApplicationCommandType.Message),
    emoji: '🔀',
    message: `Please don't post the same message across different channels.`,
};
