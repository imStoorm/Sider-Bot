const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('servericon')
            .setDescription('Mostra a imagem do servidor.'),
    async execute(client, interaction) {
        const icon = interaction.guild.iconURL({dynamic: true, format: 'png', size: 4096})
        if(!icon) return interaction.reply({content: 'Este servidor não tem ícone.', ephemeral: true})

        const embed = new Discord.MessageEmbed()
            .setTitle('Ícone do Servidor')
            .setDescription(`[Clique aqui](${icon}) para baixar a imagem.`)
            .setImage(icon)
            .setColor('WHITE')
        interaction.reply({embeds: [embed]})
    }
}