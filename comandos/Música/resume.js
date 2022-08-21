<<<<<<< HEAD
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
            .setName('resume')
            .setDescription('Retoma a música que está pausada.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content:"Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content:"Você não está no mesmo canal de voz que eu.", ephemeral: true});

        if (!player.paused) return interaction.reply({content: 'A música atual não está pausada.', ephemeral: true});

        const { title } = player.current;

        player.pause(false);

        const embed = new Discord.MessageEmbed()
        .setTitle('Sider Music')
        .addField('Retomando música:', `\`${title}\``)
        .addField('Por:', `\`${interaction.user.tag}\``)
        .setThumbnail(player.current.thumbnail)
        .setColor('WHITE')
        return interaction.reply({embeds: [embed]});
    }
=======
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
            .setName('resume')
            .setDescription('Retoma a música que está pausada.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content:"Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content:"Você não está no mesmo canal de voz que eu.", ephemeral: true});

        if (!player.paused) return interaction.reply({content: 'A música atual não está pausada.', ephemeral: true});

        const { title } = player.current;

        player.pause(false);

        const embed = new Discord.MessageEmbed()
        .setTitle('Sider Music')
        .addField('Retomando música:', `\`${title}\``)
        .addField('Por:', `\`${interaction.user.tag}\``)
        .setThumbnail(player.current.thumbnail)
        .setColor('WHITE')
        return interaction.reply({embeds: [embed]});
    }
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
}