const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Upgrade')
        .setType(ApplicationCommandType.Message),
    emoji: '⬆️',
    message: `Please upgrade to the latest Filament version using \`composer update\`.`,
};
