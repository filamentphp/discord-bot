const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

require('dotenv').config()

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Confusing Question')
        .setType(ApplicationCommandType.Message),
    emoji: '🤔',
    message: `We're confused about what you mean by this question. Please read the <#${process.env.GUIDELINES_CHANNEL_ID}> and reply to this message to provide more information about your use case.`,
};
