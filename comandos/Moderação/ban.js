const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ban')
            .setDescription('Bane um membro chato do servidor.')
            .addUserOption(option =>
                    option.setName('membro')
                        .setDescription('Especifique o membro que você quer banir.')
                        .setRequired(true))
            .addStringOption(option =>
                    option.setName('motivo')
                        .setDescription('Conte o motivo do banimento.')
                        .setRequired(false)),
    async execute(client, interaction) {
        const membro = interaction.options.getMember('membro') 
        if(!membro) return interaction.reply({content: 'Este usuário não está no servidor.', ephemeral: true})

        if(!membro.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({content: 'Você não tem permissão para executar este comando.', ephemeral: true})
        if(membro.id == interaction.member.id) return interaction.reply({content: 'Você não pode se banir.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({content: 'Eu não tenho permissão para banir este usuário.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'Você não tem permissão para banir este usuário.', ephemeral: true})

        const motivo = interaction.options.getString('motivo') || 'Nenhuma razão mencionada.'

        const embed = new Discord.MessageEmbed()
            .setTitle('Membro Banido')
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

        membro.ban({days: 0, reason: motivo})
    }
}