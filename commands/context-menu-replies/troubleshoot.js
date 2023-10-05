const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Troubleshoot')
        .setType(ApplicationCommandType.Message),
    emoji: '✨',
    message: `Please run \`php artisan filament:upgrade\`, recompile any frontend assets you may have, clear your browser cache, and delete the \`/resources/views/vendor\` directory if it exists. If the problem still persists, please reply to this message and let us know.`,
};
