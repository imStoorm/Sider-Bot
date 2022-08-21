<<<<<<< HEAD
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tpde')
        .setDescription('Veja uma foto de alguém que não existe!'),
    async execute(client, interaction) {
        const embed = new Discord.MessageEmbed()
          .setTitle("Essa pessoa não existe")
          .setDescription("Fonte: https://thispersondoesnotexist.com/")
          .setImage(`https://thispersondoesnotexist.com/image?${String(Math.floor(Math.random() * 100))}`)
          .setColor('WHITE')
        interaction.reply({embeds: [embed]})
    }
=======
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tpde')
        .setDescription('Veja uma foto de alguém que não existe!'),
    async execute(client, interaction) {
        const embed = new Discord.MessageEmbed()
          .setTitle("Essa pessoa não existe")
          .setDescription("Fonte: https://thispersondoesnotexist.com/")
          .setImage(`https://thispersondoesnotexist.com/image?${String(Math.floor(Math.random() * 100))}`)
          .setColor('WHITE')
        interaction.reply({embeds: [embed]})
    }
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
}