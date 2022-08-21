<<<<<<< HEAD
const { SlashCommandBuilder } = require ('@discordjs/builders')
const Discord = require('discord.js')
const convertMilliseconds = require('../../functions/convertMilisseconds')
const formatTime = require('../../functions/formatTime')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('queue')
            .setDescription('Mostra a lista de músicas que irei tocar.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({contet: "Não há nenhuma música tocando.", ephemeral: true});

        const queue = player.queue.tracks;

        // change for the amount of tracks per page
        const multiple = 10;
        const page = 1;
        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        const embed = new Discord.MessageEmbed()
            .setAuthor({name: `Queue do servidor: ${interaction.guild.name}`});

        if (player.current) embed.addField("Tocando agora:", `[${player.current.title}](${player.current.uri})`);

        if (!tracks.length) embed.setDescription(`Nenhuma música na ${page > 1 ? `page ${page}` : "lista"}.`);
        else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));

        const maxPages = Math.ceil(queue.length / multiple);
        embed.addField("Duração da Playlist:", formatTime(convertMilliseconds(player.queueDuration + player.current.duration - player.position)))
        embed.setFooter({text:`Página ${page > maxPages ? maxPages : page} de ${maxPages}`});

        return interaction.reply({embeds: [embed.setColor('WHITE').setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))]});
    }
=======
const { SlashCommandBuilder } = require ('@discordjs/builders')
const Discord = require('discord.js')
const convertMilliseconds = require('../../functions/convertMilisseconds')
const formatTime = require('../../functions/formatTime')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('queue')
            .setDescription('Mostra a lista de músicas que irei tocar.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({contet: "Não há nenhuma música tocando.", ephemeral: true});

        const queue = player.queue.tracks;

        // change for the amount of tracks per page
        const multiple = 10;
        const page = 1;
        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        const embed = new Discord.MessageEmbed()
            .setAuthor({name: `Queue do servidor: ${interaction.guild.name}`});

        if (player.current) embed.addField("Tocando agora:", `[${player.current.title}](${player.current.uri})`);

        if (!tracks.length) embed.setDescription(`Nenhuma música na ${page > 1 ? `page ${page}` : "lista"}.`);
        else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));

        const maxPages = Math.ceil(queue.length / multiple);
        embed.addField("Duração da Playlist:", formatTime(convertMilliseconds(player.queueDuration + player.current.duration - player.position)))
        embed.setFooter({text:`Página ${page > maxPages ? maxPages : page} de ${maxPages}`});

        return interaction.reply({embeds: [embed.setColor('WHITE').setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))]});
    }
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
}