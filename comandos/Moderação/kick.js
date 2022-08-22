const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('kick')
            .setDescription('Expulsa um membro chato do servidor.')
            .addUserOption(option =>
                    option.setName('membro')
                        .setDescription('Especifique o membro que você quer expulsar.')
                        .setRequired(true))
            .addStringOption(option =>
                    option.setName('motivo')
                        .setDescription('Conte o motivo da punição.')
                        .setRequired(false)),
    async execute(client, interaction) {
        const membro = interaction.options.getMember('membro')
        if(!membro) return interaction.reply({content: 'Este usuário não está no servidor.', ephemeral: true})
        if(!membro.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({content: 'Você não tem permissão para executar este comando.', ephemeral: true})
        if(membro.id == interaction.member.id) return interaction.reply({content: 'Você não pode se expulsar.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({content: 'Eu não tenho permissão para expulsar este usuário.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'Você não tem permissão para expulsar este usuário.', ephemeral: true})

        const motivo = interaction.options.getString('motivo') || 'Nenhuma razão mencionada.'
        const embed = new Discord.MessageEmbed()
            .setTitle('Membro Expulso')
            .addFields([
                {
                    name: 'Moderador Responsável:',
                    value: interaction.user.toString()
                },
                {
                    name: 'Membro banido:',
                    value: membro.id
                },
                {
                    name: 'Motivo:',
                    value: motivo
                }
            ])
            .setThumbnail(interaction.guild.iconURL({dynamic: true, format: 'png', size: 4096}))
            .setColor('WHITE')
        interaction.reply({embeds: [embed]})
        membro.ban({reason: motivo})
    }
}