const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('File Preview')
        .setType(ApplicationCommandType.Message),
    emoji: '🖼️',
    message: `https://filamentphp.com/community/danharrin-file-previews-not-loading`,
};
