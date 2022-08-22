const { SlashCommandBuilder } = require('@discordjs/builders')
const { DiscordTogether } = require('discord-together');
const Discord = require('discord.js');
const didYouMean = require('../../functions/didYouMean');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('together')
            .setDescription('Comece uma atividade em sua call. Ex: Youtube')
            .addStringOption(option =>
                option.setName('atividade')
                    .setDescription('Especifique a atividade que você quer iniciar')
                    .setRequired(false)),
    async execute(client, interaction) {
        client.discordTogether = new DiscordTogether(client);

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content:"Você precisa estar em um canal de voz.", ephemeral: true});

        const string = interaction.options.getString('atividade')
        const modos = ['youtube', 'poker', 'chess', 'checkers', 'betrayal', 'betrayal', 'fishing', 'lettertile', 'wordsnack', 'doodlecrew', 'spellcast', 'awkword', 'puttparty', 'sketchheads', 'ocho']
        if(!string) return interaction.reply({content: 'Essas são as atividades disponíveis:\n' + `\`${modos.map(m => m)}\``.replaceAll(',', ', '), ephemeral: true})
        
        const res = didYouMean(string, modos)

        const invite = await client.discordTogether.createTogetherCode(channel.id, res)
 
        const embed = new Discord.MessageEmbed()
            .setTitle('Discord Together')
            .addField('Clique no link abaixo para iniciar a atividade\n', invite.code)
            .setThumbnail(client.user.avatarURL({dynamic: true, format: 'png', size: 4096}))
            .setColor('WHITE')

        interaction.reply({embeds: [embed]})
    }
}