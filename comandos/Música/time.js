const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const convertMilliseconds = require('../../functions/convertMilisseconds');
const formatTime = require('../../functions/formatTime');
const progressBarEnhanced = require('../../functions/progressBar')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('time')
            .setDescription('Veja quanto tempo falta para a música acabar.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content:"Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content:"Você não está no mesmo canal de voz que eu.", ephemeral: true});

        const musica = player.current;
        const current = formatTime(convertMilliseconds(player.position))
        const total = formatTime(convertMilliseconds(musica.duration))

        const embed = new Discord.MessageEmbed()
            .setAuthor({name: 'Sider Music'})
            .setDescription(`**${musica.title}**\n${progressBarEnhanced(player.position, musica.duration, 30)}\n         ${String(current)}/${String(total)}`)
            .setColor('WHITE')
            .setThumbnail(musica.thumbnail)
        const row = new Discord.MessageActionRow()
            .addComponents([
            new Discord.MessageButton()
                .setCustomId('stop')
                .setEmoji('⏹️')
                .setStyle('DANGER'),
            new Discord.MessageButton()
                .setCustomId('status')
                .setEmoji(musica ? '▶️' : '⏸️')
                .setStyle('SUCCESS'),
            new Discord.MessageButton()
                .setCustomId('skip')
                .setEmoji('⏭️')
                .setStyle('PRIMARY')
            ])
        
        interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
            const filter = i => i.isButton() && i.user.id == interaction.user.id
            const collector = msg.createMessageComponentCollector({filter, max: 3})

            collector.on('collect', c => {
                const id = c.customId
                switch(id) {
                    case 'stop':
                        player.destroy()
                        msg.edit('Música parada com sucesso.')
                    break;
                    case 'status':
                        if (player.paused) {
                            player.pause(false)
                            if(msg) {msg.edit('Música retomada com sucesso.')}
                        } else {
                            player.pause(true)
                            if(msg) {msg.edit('Música pausada com sucesso.')}
                        }
                    break;
                    case 'skip':
                        player.skip()
                        if(msg) {msg.edit('Música pulada com sucesso.')}
                }
            c.deferUpdate()
            })
            collector.on('end', (e) => {
                msg.delete()
            })
        })
    }
}