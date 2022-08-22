const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
            .setName('search')
            .setDescription('Procure o que quiser no youtube.')
            .addStringOption(option => 
                option.setName('pesquisa')
                    .setDescription('Digite aqui sua pesquisa.')
                    .setRequired(true)),
    async execute(client, interaction) {
        const { channel } = interaction.member.voice
        if (!channel) return interaction.reply({content: "Você precisa estar em um canal de voz.", ephemeral: true});

        const track = interaction.options.getString('pesquisa')
        const res = await client.vulkava.search(track)

        const end = 1 * 10;
        const start = end - 10;

        const tracks = res.tracks.slice(start, end)
        const embed = new Discord.MessageEmbed()
            .setAuthor({name: `Resultado da pesquisa: ${interaction.guild.name}`})
            .setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"))
        
        if(res.loadType === 'LOAD_FAILED') {
            return interaction.reply({content: ':x: O carregamento falhou.', ephemeral: true})
        } else if(res.loadType === 'NO_MATCHES') {
            return interaction.reply({content: ':x: Não encontrei nada.', ephemeral: true})
        }

        interaction.reply({embeds: [embed.setColor('WHITE').setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))]});
    }
}