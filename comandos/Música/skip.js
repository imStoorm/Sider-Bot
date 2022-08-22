const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Pular a música que está tocando.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content:"Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content:"Você não está no mesmo canal de voz que eu.", ephemeral: true});
        
        if (!player.current) return interaction.reply({content:"Não há nenhuma música tocando.", ephemeral: true});
        
        let proxima = player.queue.tracks[0]
        if (!proxima) {player.destroy(); proxima = {title: 'Não há outras músicas na queue.'}}
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Sider Music')
        .addField('Música pulada:', `\`${player.current.title}\``)
        .addField('Próxima música:',  `\`${proxima.title}\``)
        .addField('Por:', `\`${interaction.user.tag}\``)
        .setThumbnail(player.current.thumbnail)
        .setColor('WHITE')
        interaction.reply({embeds: [embed]})

        player.skip();
    }
}