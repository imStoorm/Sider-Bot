<<<<<<< HEAD
const { SlashCommandBuilder } = require('@discordjs/builders')

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
        const saida = eval(code)

        interaction.reply({content: String(saida)}).catch((err) => interaction.reply(String(err)))
    }
=======
const { SlashCommandBuilder } = require('@discordjs/builders')

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
        const saida = eval(code)

        interaction.reply({content: String(saida)}).catch((err) => interaction.reply(String(err)))
    }
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
}