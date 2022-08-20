const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-br')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('serverinfo')
            .setDescription('Veja informações sobre o servidor'),
    async execute(client, interaction) {
        const {memberCount, ownerId, name, id, createdAt, channels} = interaction.guild
        const criado = moment(createdAt).format('LLL')
        const membros = memberCount.toString()
        const texto = String(channels.cache.filter(t => t.type === 'GUILD_TEXT').size)
        const voz = String(channels.cache.filter(v => v.type === 'GUILD_VOICE').size)

        const embed = new Discord.MessageEmbed()
            .setTitle('📌 Informações do Servidor: ' + name)
            .addFields([
                {
                    name: '🛠️ Dono do Servidor:',
                    value: `<@${String(ownerId)}>(${String(ownerId)})`
                },
                {
                    name: '⚙️ ID do Servidor:',
                    value: id
                },
                {
                    name: '👥 Quantidade de Membros:',
                    value: membros
                },
                {
                    name: '🧾 Quantidade de Canais:',
                    value: `💬 Canais de texto: ${texto}\n🔊 Canais de voz: ${voz}`
                },
                {
                    name: '🕦 Data de Criação:',
                    value: criado
                }
            ])
            .setThumbnail(interaction.guild.iconURL({dynamic: true, format: 'png', size: 4096}))
            .setColor('WHITE')
        
        interaction.reply({embeds: [embed]})
    }   
}