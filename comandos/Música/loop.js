<<<<<<< HEAD
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('loop')
            .setDescription('Coloca a música ou a playlist atual em loop.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content: "Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content: "Você não está no mesmo canal de voz que eu.", ephemeral: true});


        const embed = new Discord.MessageEmbed()
        .setTitle('Sider Music')
        .setDescription('Clique em um dos botões abaixo para escolher o tipo de loop.')
        .setFooter({text: 'Lembrando: Se o botão estiver verde, o loop está ligado e irá desligar caso você aperte o botão.', iconURL: client.user.avatarURL({format: 'png', size: 4096})})
        .setColor('WHITE')
        .setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))

        const row = new Discord.MessageActionRow()
            .addComponents(
            new Discord.MessageButton()
            .setStyle(player.trackRepeat ? 'SUCCESS' : 'DANGER')
            .setLabel('Faixa')
            .setCustomId('faixa'),
            new Discord.MessageButton()
                .setStyle(player.queueRepeat ? 'SUCCESS' : 'DANGER')
                .setLabel('Queue')
                .setCustomId('queue')
            )
        
        interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
            const filter = i => i.isButton() && i.user.id == interaction.user.id
            const collector = msg.createMessageComponentCollector({filter, max: 1})

            collector.on('collect', b => {
                switch(b.customId) {
                    case 'faixa':
                        player.setTrackLoop(!player.trackRepeat);
                        const trackLoop = player.trackRepeat ? "ativado." : "desativado.";

                        msg.edit({embeds:[embed.setDescription('O loop de faixa foi ' + trackLoop)], components: []})
                    break;
                    case 'queue':
                        player.setQueueLoop(!player.queueRepeat)
                        const queueLoop = player.queueRepeat ? "ativado." : "desativado.";
                        
                        msg.edit({embeds:[embed.setDescription('O loop de queue foi ' + queueLoop)], components: []})
            }
    })
        })
    }
=======
const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('loop')
            .setDescription('Coloca a música ou a playlist atual em loop.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content: "Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content: "Você não está no mesmo canal de voz que eu.", ephemeral: true});


        const embed = new Discord.MessageEmbed()
        .setTitle('Sider Music')
        .setDescription('Clique em um dos botões abaixo para escolher o tipo de loop.')
        .setFooter({text: 'Lembrando: Se o botão estiver verde, o loop está ligado e irá desligar caso você aperte o botão.', iconURL: client.user.avatarURL({format: 'png', size: 4096})})
        .setColor('WHITE')
        .setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))

        const row = new Discord.MessageActionRow()
            .addComponents(
            new Discord.MessageButton()
            .setStyle(player.trackRepeat ? 'SUCCESS' : 'DANGER')
            .setLabel('Faixa')
            .setCustomId('faixa'),
            new Discord.MessageButton()
                .setStyle(player.queueRepeat ? 'SUCCESS' : 'DANGER')
                .setLabel('Queue')
                .setCustomId('queue')
            )
        
        interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
            const filter = i => i.isButton() && i.user.id == interaction.user.id
            const collector = msg.createMessageComponentCollector({filter, max: 1})

            collector.on('collect', b => {
                switch(b.customId) {
                    case 'faixa':
                        player.setTrackLoop(!player.trackRepeat);
                        const trackLoop = player.trackRepeat ? "ativado." : "desativado.";

                        msg.edit({embeds:[embed.setDescription('O loop de faixa foi ' + trackLoop)], components: []})
                    break;
                    case 'queue':
                        player.setQueueLoop(!player.queueRepeat)
                        const queueLoop = player.queueRepeat ? "ativado." : "desativado.";
                        
                        msg.edit({embeds:[embed.setDescription('O loop de queue foi ' + queueLoop)], components: []})
            }
    })
        })
    }
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
}