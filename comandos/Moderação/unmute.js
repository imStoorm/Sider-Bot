const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const timetomilisseconds = require('../../functions/timetomilisseconds')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('unmute')
            .setDescription('Desmuta um membro do servidor.')
            .addUserOption(option =>
                    option.setName('membro')
                        .setDescription('Especifique o membro que você quer desmutar.')
                        .setRequired(true))
            .addStringOption(option =>
                    option.setName('motivo')
                        .setDescription('Motivo pelo qual você está desmutando o membro.')
                        .setRequired(false)),
    async execute(client, interaction) {
        const membro = interaction.options.getMember('membro')
        if(!membro) return interaction.reply({content: 'Este usuário não está no servidor.', ephemeral: true})
        if(!membro.permissions.has(Discord.Permissions.FLAGS.MUTE_MEMBERS)) return interaction.reply({content: 'Você não tem permissão para executar este comando.', ephemeral: true})
        if(membro.id == interaction.member.id) return interaction.reply({content: 'Você não pode se desmutar.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({content: 'Eu não tenho permissão para desmutar este usuário.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'Você não tem permissão para desmutar este usuário.', ephemeral: true})

        const motivo = interaction.options.getString('motivo') || 'Nenhum motivo informado.'

        client.api.guilds(interaction.guild.id).members(membro.id).patch({
            data: {
              communication_disabled_until: null
            }
          });

        const embed = new Discord.MessageEmbed()
            .setTitle('Membro Desmutado')
            .addFields([
                {
                    name: 'Moderador Responsável:',
                    value: interaction.user.toString()
                },
                {
                    name: 'Membro desmutado:',
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
    }
}