const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')
const quickReplies = require('./commands/context-menu/quick-replies')

require('dotenv').config()

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})

const commandCollection = new Collection()
const contextMenuCommandCollection = new Collection()
contextMenuCommandCollection.set(quickReplies.data.name, quickReplies);

const keyReplyCollection = quickReplies.keyReplyCollection;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('threadCreate', async (thread) => {
    if (! thread.joinable) {
        return
    }
    
    await thread.join()
})

client.on(Events.InteractionCreate, async interaction => {
    // Slash commands
    if (interaction.isChatInputCommand()) {
        const command = commandCollection.get(interaction.commandName)
    
        if (! command) return
    
        try {
            await command.execute(interaction)
        } catch (e) {
            console.error(e)
    
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
            }
        }
    }

    // Context menu commands
    if (interaction.isMessageContextMenuCommand()) {
        const command = contextMenuCommandCollection.get(interaction.commandName)

        if (! command) return

        try {
            await command.execute(interaction)
        } catch (e) {
            console.error(e)
    
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
            }
        }
    }

    if (interaction.isStringSelectMenu()) {
        if (interaction.customId !== 'quickReplySelect') {
            return
        }

        try {
            const [targetMessageId, key] = interaction.values[0].split(':')

            const message = keyReplyCollection.get(key) ?? null
    
            if (! message) {
                return
            }

            const targetMessage = await interaction.channel.messages.fetch(targetMessageId)

            await targetMessage.reply({ content: message })
    
            await interaction.reply({
                content: `You ran a quick reply command!`,
                ephemeral: true,
            })

            await interaction.deleteReply()
        } catch (e) {
            console.error(e)
    
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
            }
        }

    }

})

client.login(process.env.TOKEN).then(() => {
    client.user.setPresence({
        'activities': [{
            'name': 'Filament users',
            'type': 'WATCHING',
        }],
    })
})
