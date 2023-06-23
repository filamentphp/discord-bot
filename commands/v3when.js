const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("v3when")
        .setDescription("When is v3 coming out?"),
    async execute(interaction) {
        await interaction.reply(`**Beta**: ${beta()}\n**Release**: ${release()}`)
    }
}

function formatCounter(number) {
    return number.toString().padStart(2, '0')
}

function beta() {
    let countDownDate = new Date(2023, 6, 20, 19).getTime()
    let timeDistance = countDownDate - new Date().getTime()

    if (timeDistance < 0) {
        clearInterval(this.runningCounter)

        return
    }

    const values = {
        days: formatCounter(
            Math.floor(timeDistance / (1000 * 60 * 60 * 24)),
        ),
        hours: formatCounter(
            Math.floor(
                (timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ),
        ),
        minutes: formatCounter(
            Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60)),
        ),
        seconds: formatCounter(
            Math.floor((timeDistance % (1000 * 60)) / 1000),
        )
    }

    return `${values.days}d ${values.hours}h ${values.minutes}m ${values.seconds}s`
}

function release() {
    let countDownDate = new Date(2023, 7, 1, 13).getTime()
    let timeDistance = countDownDate - new Date().getTime()

    if (timeDistance < 0) {
        clearInterval(this.runningCounter)

        return
    }

    const values = {
        days: formatCounter(
            Math.floor(timeDistance / (1000 * 60 * 60 * 24)),
        ),
        hours: formatCounter(
            Math.floor(
                (timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ),
        ),
        minutes: formatCounter(
            Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60)),
        ),
        seconds: formatCounter(
            Math.floor((timeDistance % (1000 * 60)) / 1000),
        )
    }

    return `${values.days}d ${values.hours}h ${values.minutes}m ${values.seconds}s`
}