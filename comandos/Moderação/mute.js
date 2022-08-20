const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const timetomilisseconds = require('../../functions/timetomilisseconds')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('mute')
            .setDescription('Muta um membro barulhento do servidor.')
            .addUserOption(option =>
                    option.setName('membro')
                        .setDescription('Especifique o membro que você quer mutar.')
                        .setRequired(true))
            .addStringOption(option =>
                    option.setName('duracao')
                        .setDescription('Especifique a duração do mute.')
                        .setRequired(true))
            .addStringOption(option =>
                    option.setName('motivo')
                        .setDescription('Motivo pelo qual você está mutando o membro.')
                        .setRequired(false)),
    async execute(client, interaction) {
        const membro = interaction.options.getMember('membro')
        if(!membro) return interaction.reply({content: 'Este usuário não está no servidor.', ephemeral: true})
        if(!membro.permissions.has(Discord.Permissions.FLAGS.MUTE_MEMBERS)) return interaction.reply({content: 'Você não tem permissão para executar este comando.', ephemeral: true})
        if(membro.id == interaction.member.id) return interaction.reply({content: 'Você não pode se mutar.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({content: 'Eu não tenho permissão para mutar este usuário.', ephemeral: true})
        if(membro.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: 'Você não tem permissão para mutar este usuário.', ephemeral: true})

        const duracao = interaction.options.getString('duracao')
        if(!duracao) return message.reply({content: 'Especifique a duração. \`Ex: 30m 1h 3d\`', ephemeral: true})
        if(timetomilisseconds(duracao) > 28*24*60*60*1000) return message.reply({content: 'O tempo máximo de timeout é de 28 dias. Tente novamente.', ephemeral: true})
        
        const motivo = interaction.options.getString('motivo') || 'Nenhum motivo informado.'
        membro.timeout(timetomilisseconds(duracao), motivo)

        const embed = new Discord.MessageEmbed()
            .setTitle('Membro Silenciado')
            .addFields([
                {
                    name: 'Moderador Responsável:',
                    value: interaction.user.toString()
                },
                {
                    name: 'Membro mutado:',
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
