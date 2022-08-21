<<<<<<< HEAD
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('clear')
            .setDescription('Limpe as mensagens do chat de texto atual.')
            .addNumberOption(option => 
                option.setName('quantidade')
                    .setDescription('Quantidade de mensagens que deseja apagar.')
                    .setMinValue(2)
                    .setMaxValue(100)
                    .setRequired(true)),
    async execute(client, interaction) {

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({content: 'Você não tem permissão para usar este comando.', ephemeral: true})

        const quantidade = interaction.options.getNumber('quantidade')

        const mensagens = await interaction.channel.bulkDelete(quantidade, true)

        const embed = new Discord.MessageEmbed()
            .setDescription(`Foram apagadas **${mensagens.size} mensagens.** Solicitado por: ${interaction.user.toString()}`)
            .setColor('WHITE')
        interaction.reply({embeds: [embed]})

    }
=======
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('clear')
            .setDescription('Limpe as mensagens do chat de texto atual.')
            .addNumberOption(option => 
                option.setName('quantidade')
                    .setDescription('Quantidade de mensagens que deseja apagar.')
                    .setMinValue(2)
                    .setMaxValue(100)
                    .setRequired(true)),
    async execute(client, interaction) {

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({content: 'Você não tem permissão para usar este comando.', ephemeral: true})

        const quantidade = interaction.options.getNumber('quantidade')

        const mensagens = await interaction.channel.bulkDelete(quantidade, true)

        const embed = new Discord.MessageEmbed()
            .setDescription(`Foram apagadas **${mensagens.size} mensagens.** Solicitado por: ${interaction.user.toString()}`)
            .setColor('WHITE')
        interaction.reply({embeds: [embed]})

    }
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
}