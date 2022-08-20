const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('shuffle')
            .setDescription('Coloco a playlist em modo aleatório.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content:"Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content: "Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content:"Você não está no mesmo canal de voz que eu.", ephemeral: true});

        const embed = new Discord.MessageEmbed()
        .setTitle('Sider Music')
        .setDescription('Clique no botão verde para confirmar a aleatorização da queue.\nClique no botão vermelho para cancelar.')
        .setColor('WHITE')
        .setThumbnail(client.user.avatarURL({format: 'png', size: 4096}))
        const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
          .setStyle('SUCCESS')
          .setLabel('Confirmar')
          .setCustomId('confirm'),
          new Discord.MessageButton()
            .setStyle('DANGER')
            .setLabel('Cancelar')
            .setCustomId('cancel')
          )
        
        interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {
            const filter = i => i.isButton() && i.user.id == interaction.user.id
            const collector = msg.createMessageComponentCollector({filter, max: 1})

            collector.on('collect', b => {
                switch(b.customId) {
                  case 'confirm':
                    player.shuffleQueue()
                    if(msg) { msg.edit({embeds:[embed.setDescription('A ordem das músicas foi misturada com sucesso.')], components: []}) }
                  break;
                  case 'cancel':
                    if(msg) { msg.delete() }
                }
        })
    })
    }
}