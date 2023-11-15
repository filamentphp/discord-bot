const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Collection } = require('discord.js');

require('dotenv').config()

const quickReplies = [
    {
        key: 'docs',
        label: 'Docs',
        description: 'Answered on the docs',
        reply: `We're confident that you can find the answer to this question in the docs. Please visit <https://filamentphp.com/docs> and use the search input to find what you are looking for. If you are still having trouble, please reply to this message to provide more information about your use case.`,
    },
    {
        key: 'troubleshoot',
        label: 'Troubleshoot',
        description: 'Run \`php artisan filament:upgrade\`, delete published views, clear cache etc',
        reply: `Please run \`php artisan filament:upgrade\`, recompile any frontend assets you may have, clear your browser cache, and delete the \`/resources/views/vendor\` directory if it exists. If the problem still persists, please reply to this message and let us know.`,
    },
    {
        key: 'confusingQuestion',
        label: 'Confusing Question',
        description: 'We need more information',
        reply: `We're confused about what you mean by this question. Please read the <#${process.env.GUIDELINES_CHANNEL_ID}> and reply to this message to provide more information about your use case.`,
    },
    {
        key: 'offTopic',
        label: 'Off Topic',
        description: 'Not related to Filament',
        reply: `It seems that your question is not related to Filament. To help as many Filament users as possible, we need to be selective over which questions get posted here.`,
    },
    {
        key: 'moreInfo',
        label: 'More Info',
        description: 'Share Error/Code',
        reply: `We need more information to help you debug your problem. Please click on the top left 'SHARE' button of the error page you're seeing and share the link with us.`,
    },
    {
        key: 'xyProblem',
        label: 'XY Problem',
        description: 'Ask about the problem, not your attempted solution',
        reply: `Please ask about the actual _problem_ you're trying to solve, instead of your attempted _solution_. <https://xyproblem.info>`,
    },
    {
        key: 'codeFormatting',
        label: 'Code Formatting',
        description: 'Read the guidelines on Code Formatting',
        reply: `Please read the <#${process.env.GUIDELINES_CHANNEL_ID}> about how to format your code properly.`,
    },
    {
        key: 'wrongChannel',
        label: 'Wrong Channel',
        description: 'Post in the correct channel',
        reply: `Your question is posted in the wrong channel. For questions please use <#${process.env.HELP_CHANNEL_ID}> or the appropriate plugin channel.`,
    },
    {
        key: 'upgrade',
        label: 'Upgrade',
        description: 'Upgrade to latest version',
        reply: `Please upgrade to the latest Filament version using \`composer update\`.`,
    },
    {
        key: 'crossPost',
        label: 'Cross Post',
        description: 'Do not post same message across multiple channels',
        reply: `Please don't post the same message across different channels.`,
    },
    {
        key: 'fileUploadPreview',
        label: 'File Upload Preview',
        description: 'File upload previews not loading',
        reply: `https://filamentphp.com/community/danharrin-file-previews-not-loading`,
    },
];

const keyReplyCollection = new Collection()

for (const quickReply of quickReplies) {
    keyReplyCollection.set(quickReply.key, quickReply.reply)
}

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('Quick Replies')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const targetMessage = interaction.targetMessage;

        const memberManager = targetMessage.guild.members;
        const member = await memberManager.fetch(interaction.user);

        if (! member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
            await interaction.reply({ content: 'You do not have permission to run this command!', ephemeral: true });
            return;
        }

        let quickReplySelectOptions = [];

        for (const quickReply of quickReplies) {
            quickReplySelectOptions.push(
                new StringSelectMenuOptionBuilder()
                    .setLabel(quickReply.label)
                    .setValue(targetMessage.id + ':' + quickReply.key)
                    .setDescription(quickReply.description)
            );
        }

        const quickReplySelect = new StringSelectMenuBuilder()
            .setCustomId('quickReplySelect')
            .setPlaceholder('Select a quick reply')
            .addOptions(quickReplySelectOptions);

        const actionRow = new ActionRowBuilder().addComponents(quickReplySelect);

        await interaction.reply({
			content: 'Choose a quick reply!',
			components: [actionRow],
            ephemeral: true,
		});
    },
    keyReplyCollection: keyReplyCollection,
};
