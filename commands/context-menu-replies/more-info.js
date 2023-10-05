const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('More Info')
        .setType(ApplicationCommandType.Message),
    emoji: '🧐',
    message: `We need more information to help you debug your problem. Please click on the top left 'SHARE' button of the error page you're seeing and share the link with us.`,
};
