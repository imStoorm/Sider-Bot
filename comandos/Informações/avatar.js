const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('avatar')
            .setDescription('Mostra o avatar do usuário mencionado.')
            .addUserOption(option =>
                option.setName('usuario')
                    .setDescription('Insira o usuário que você quer ver o avatar.')
                    .setRequired(false)),
    async execute(client, interaction) {
        let usuario = interaction.options.getUser('usuario')
        if(!usuario) usuario = interaction.user
        
        const avatar = usuario.avatarURL({dynamic: true, format: 'png', size: 4096})
        if(!avatar) return interaction.reply({content: 'Esse usuário não tem avatar.', ephemeral: true})

        const embed = new Discord.MessageEmbed()
            .setAuthor({name: 'Avatar de ' + usuario.tag})
            .setDescription(`[Clique aqui](${avatar}) para baixar a imagem.`)
            .setImage(avatar)
            .setColor('WHITE')
        interaction.reply({embeds: [embed]})
    }
}