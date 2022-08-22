const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
            .setName('eval')
            .setDescription('Apenas o meu dono pode usar este comando.')
            .addStringOption(option =>
                    option.setName('codigo')
                        .setDescription('Digite o código do eval.')
                        .setRequired(true)),
    async execute(client, interaction) {
        if(interaction.user.id !== '852586719399510016') return interaction.reply({content: 'Você não tem permissão pra executar este comando.', ephemeral: true})
        
        const code = interaction.options.getString('codigo')
        try {
        const saida = eval(code)

        const row = new MessageActionRow()
            .addComponents(new MessageButton()
                    .setLabel('X')
                    .setCustomId('delete')
                    .setStyle('DANGER')
            )
        let msg = await interaction.reply({content: String(saida), components: [row], fetchReply: true})
        
        let filter = i => i.user.id == '852586719399510016'
        let collector = msg.createMessageComponentCollector({filter, max: 180000})

        collector.on('collect', b => {
        if(b.customId == 'delete' && b.user.id == '852586719399510016') return msg.delete();
        })
    } catch(err) {
        const row = new MessageActionRow()
            .addComponents(new MessageButton()
                    .setLabel('X')
                    .setCustomId('delete')
                    .setStyle('DANGER')
            )
        let msg = await interaction.reply({content: String(err), components: [row], fetchReply: true})
        let filter = i => i.user.id == '852586719399510016'
        let collector = msg.createMessageComponentCollector({filter, max: 180000})

        collector.on('collect', b => {
        if(b.customId == 'delete' && b.user.id == '852586719399510016') return msg.delete();
        })
    }
    }
}