const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')
const quickReplies = require('./commands/context-menu/quick-replies')

require('dotenv').config()

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions]
})

const commandCollection = new Collection()
const contextMenuCommandCollection = new Collection()
contextMenuCommandCollection.set(quickReplies.data.name, quickReplies);

const reactionReplyCollection = quickReplies.reactionReplyCollection;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('threadCreate', async (thread) => {
    if (! thread.joinable) {
        return
    }
    
    await thread.join()
})

client.on('messageReactionAdd', async (reaction) => {
    if (! reactionReplyCollection.has(reaction.emoji.name)) {
        return;
    }

    const reactors = await reaction.users.fetch()
    const memberManager = reaction.message.guild.members

    let shouldReply = false

    for (const [reactorId, reactor] of reactors) {
        const member = await memberManager.fetch(reactor)

        if (! member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
            continue
        }
        
        shouldReply = true
        
        break
    }

    if (! shouldReply) {
        return
    }

    const message = reactionReplyCollection.get(reaction.emoji.name) ?? null

    if (! message) {
        return
    }

    await reaction.remove()
    await reaction.message.reply({ content: message })
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

})

client.login(process.env.TOKEN).then(() => {
    client.user.setPresence({
        'activities': [{
            'name': 'Filament users',
            'type': 'WATCHING',
        }],
    })
})
