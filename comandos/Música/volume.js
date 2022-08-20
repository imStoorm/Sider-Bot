const { SlashCommandBuilder } = require("@discordjs/builders")
const progressBarEnhanced = require('../../functions/progressBar')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('volume')
            .setDescription('Defina o volume da sua música.')
            .addNumberOption(option =>
                option.setName('nivel')
                    .setDescription('Digite o número do nivel de volume')
                    .setMinValue(0)
                    .setMaxValue(100)
                    .setRequired(true)),
    async execute(client, interaction) {
    const player = client.vulkava.players.get(interaction.guild.id);
    if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

    const { channel } = interaction.member.voice;
    if (!channel) return interaction.reply({content: "Você precisa estar em um canal de voz.", ephemeral: true});
    if (channel.id !== player.voiceChannelId) return interaction.reply({content: "Você não está no mesmo canal de voz que eu.", ephemeral: true});

    const volume = interaction.options.getNumber('nivel')
    player.filters.setVolume(volume)

    const embed = new Discord.MessageEmbed()
    .setAuthor('Sider Music')
    .addField(`Volume atual:`,`\`${progressBarEnhanced(volume, 100, 50)}\``)
    .setColor('WHITE')
    .setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))
    interaction.reply({embeds: [embed]});
}
}