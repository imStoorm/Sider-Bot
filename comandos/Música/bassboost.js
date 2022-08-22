const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('bassboost')
            .setDescription('Aumente o grave da música.'),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content: "Não há nenhuma música tocando.", ephemeral: true});
  
        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content: "Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content: "Você não está no mesmo canal de voz que eu.", ephemeral: true});
        
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('bassboost')
                    .setPlaceholder('Clique aqui para selecionar o nível de grave.')
                    .addOptions([
                        {
                            label: 'Nulo',
                            description: 'Sem nenhum acréscimo de grave.',
                            value: 'nulo'
                        },
                        {
                            label: 'Baixo',
                            description: 'Pouco acréscimo de grave.',
                            value: 'baixo'
                        },
                        {
                            label: 'Médio',
                            description: 'Médio acréscimo de grave (Recomendado).',
                            value: 'médio'
                        },
                        {
                            label: 'Alto',
                            description: 'Alto acréscimo de grave. Essa configuração pode deixar a música estourada.',
                            value: 'alto'
                        },
                        {
                            label: 'Estourado',
                            description: 'Você quer mesmo explodir seus ouvidos?',
                            value: 'estourado'
                        }
                    ])

            )
        const msg = await interaction.reply({content: 'Selecione o nível de grave que você deseja.', components: [row], fetchReply: true})
        const filter = i => i.user.id == interaction.user.id && i.isSelectMenu()
        const collector = msg.createMessageComponentCollector({filter, max: 1, time: 60000})
        collector.on('collect', i => {
        const levels = {
            'nulo': 0.0,
            'baixo': 0.20,
            'médio': 0.30,
            'alto': 0.50,
            'estourado': 2.0
            };
    
            const nivel = i.values[0]

            player.filters.setEqualizer([levels[nivel]])
    
            i.deferUpdate();
            
            interaction.editReply({content: 'O grave foi alterado com sucesso.', components: []})
        })
    }
    
}