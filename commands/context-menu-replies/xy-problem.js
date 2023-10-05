const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('XY Problem')
        .setType(ApplicationCommandType.Message),
    emoji: '🙅‍♂️',
    message: `Please ask about the actual _problem_ you're trying to solve, instead of your attempted _solution_. <https://xyproblem.info>`,
};
