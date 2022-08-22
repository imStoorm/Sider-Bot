const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('remove')
            .setDescription('Remove a música escolhida da queue.')
            .addNumberOption(option =>
                option.setName('número')
                    .setDescription('Digite o número da música que você quer remover na queue.')
                    .setRequired(true)
            ),
    async execute(client, interaction) {
        const player = client.vulkava.players.get(interaction.guild.id);
        if (!player) return interaction.reply({content:"Não há nenhuma música tocando.", ephemeral: true});

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({content: "Você precisa estar em um canal de voz.", ephemeral: true});
        if (channel.id !== player.voiceChannelId) return interaction.reply({content:"Você não está no mesmo canal de voz que eu.", ephemeral: true});

        const queue = player.queue.tracks
 
        const n = interaction.options.getNumber('número') - 1
        if(!queue[n]) return interaction.reply({content: 'Não existe nenhuma música com essa numeração na minha queue.', ephemeral: true});
        interaction.reply(`A música \`${queue[n].title}\` foi removida com sucesso.`)
        queue.splice(n, 1)

        
    }
}