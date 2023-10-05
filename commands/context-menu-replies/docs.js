const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Docs')
        .setType(ApplicationCommandType.Message),
    emoji: '👀',
    message: `We're confident that you can find the answer to this question in the docs. Please visit <https://filamentphp.com/docs> and use the search input to find what you are looking for. If you are still having trouble, please reply to this message to provide more information about your use case.`,
};
