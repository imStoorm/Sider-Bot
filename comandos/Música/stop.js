const { SlashCommandBuilder } = require ('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('stop')
            .setDescription('Para o player de música. (Isso irá remover todas as músicas da queue.)'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content:"Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content:"Você não está no mesmo canal de voz que eu.", ephemeral: true});

        if (!player.current) return interaction.reply({content:"Não há nenhuma música tocando.", ephemeral: true});

        const { title } = player.current

        const embed = new Discord.MessageEmbed()
        .setTitle('Sider Music')
        .addField('Última música antes de parar o player:', `\`${title}\``)
        .addField('Por:', `\`${interaction.user.tag}\``)
        .setThumbnail(player.current ? player.current.thumbnail : client.user.avatarURL({format: 'png', size: 4096}))
        .setColor('WHITE')
        interaction.reply({embeds: [embed]})
        player.destroy();
    }
}