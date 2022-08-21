<<<<<<< HEAD
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const convertMilliseconds = require('../../functions/convertMilisseconds')
const formatTime = require('../../functions/formatTime')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('play')
            .setDescription('Tocarei a música que você quiser na call em que você está presente!')
            .addStringOption(option =>
                option.setName('música')
                    .setDescription('Digite o nome da música que você quer ouvir.')
                    .setRequired(true)),
    async execute(client, interaction) {
        const { channel } = interaction.member.voice
        if(!channel) return interaction.reply({content: 'Você precisa estar em um canal de voz.', ephemeral: true})

        const track = interaction.options.getString('música')
        const res = await client.vulkava.search(track);

        if (res.loadType === "LOAD_FAILED") {
            returninteraction.reply({content: `:x: O carregamento falhou. Erro: ${res.exception.message}`, ephemeral: true});
        } else if (res.loadType === "NO_MATCHES") {
            return interaction.reply({content: ':x: Não encontrei nenhuma música.', ephemeral: true});
        }
        const player = client.vulkava.createPlayer({guildId: interaction.guild.id, voiceChannelId: interaction.member.voice.channelId, textChannelId: interaction.channel.id, selfDeaf: true});
        player.connect();

        if (res.loadType === 'PLAYLIST_LOADED') {
            for (const track of res.tracks) {
              track.setRequester(interaction.user);
              player.queue.push(track);
            }
            if (!player.playing) player.play();
            const embed2 = new Discord.MessageEmbed()
                .setTitle('Sider Music')
                .addField('Colocando na playlist:', `\`${res.tracks.length}\` músicas da playlist: \`${res.playlistInfo.name}.\``)
                .addField('Duração:', formatTime(convertMilliseconds(res.playlistInfo.duration)))
                .addField('Por:', `\`${interaction.user.tag}\``)
                .setColor('WHITE')
                .setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))
                return interaction.reply({embeds: [embed2]})
        } else {
            const track = res.tracks[0];
            track.setRequester(interaction.user);
        
            player.queue.push(track);
            if (!player.playing) player.play();
            const embed = new Discord.MessageEmbed()
                .setTitle('Sider Music')
                .addField('Colocando na playlist:', `\`${res.tracks[0].title}\``)
                .addField('Duração:', formatTime(convertMilliseconds(track.duration)))
                .addField('Por:', `\`${interaction.user.tag}\``)
                .setColor('WHITE')
                .setThumbnail(res.tracks[0].thumbnail)
              return interaction.reply({embeds: [embed]})
        }
    }
=======
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const convertMilliseconds = require('../../functions/convertMilisseconds')
const formatTime = require('../../functions/formatTime')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('play')
            .setDescription('Tocarei a música que você quiser na call em que você está presente!')
            .addStringOption(option =>
                option.setName('música')
                    .setDescription('Digite o nome da música que você quer ouvir.')
                    .setRequired(true)),
    async execute(client, interaction) {
        const { channel } = interaction.member.voice
        if(!channel) return interaction.reply({content: 'Você precisa estar em um canal de voz.', ephemeral: true})

        const track = interaction.options.getString('música')
        const res = await client.vulkava.search(track);

        if (res.loadType === "LOAD_FAILED") {
            returninteraction.reply({content: `:x: O carregamento falhou. Erro: ${res.exception.message}`, ephemeral: true});
        } else if (res.loadType === "NO_MATCHES") {
            return interaction.reply({content: ':x: Não encontrei nenhuma música.', ephemeral: true});
        }
        const player = client.vulkava.createPlayer({guildId: interaction.guild.id, voiceChannelId: interaction.member.voice.channelId, textChannelId: interaction.channel.id, selfDeaf: true});
        player.connect();

        if (res.loadType === 'PLAYLIST_LOADED') {
            for (const track of res.tracks) {
              track.setRequester(interaction.user);
              player.queue.push(track);
            }
            if (!player.playing) player.play();
            const embed2 = new Discord.MessageEmbed()
                .setTitle('Sider Music')
                .addField('Colocando na playlist:', `\`${res.tracks.length}\` músicas da playlist: \`${res.playlistInfo.name}.\``)
                .addField('Duração:', formatTime(convertMilliseconds(res.playlistInfo.duration)))
                .addField('Por:', `\`${interaction.user.tag}\``)
                .setColor('WHITE')
                .setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))
                return interaction.reply({embeds: [embed2]})
        } else {
            const track = res.tracks[0];
            track.setRequester(interaction.user);
        
            player.queue.push(track);
            if (!player.playing) player.play();
            const embed = new Discord.MessageEmbed()
                .setTitle('Sider Music')
                .addField('Colocando na playlist:', `\`${res.tracks[0].title}\``)
                .addField('Duração:', formatTime(convertMilliseconds(track.duration)))
                .addField('Por:', `\`${interaction.user.tag}\``)
                .setColor('WHITE')
                .setThumbnail(res.tracks[0].thumbnail)
              return interaction.reply({embeds: [embed]})
        }
    }
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
}