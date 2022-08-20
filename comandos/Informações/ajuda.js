const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ajuda')
		.setDescription('Veja minha lista de comandos'),
	async execute(client, interaction) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Lista de comandos abaixo:')
        .setColor('WHITE')

        const fs = require('fs');
        const categories = fs.readdirSync(process.cwd() +  `/comandos/`).map(category => category.split('.')[0])
        for (let i=0; i < categories.length; i++) {
        const category = categories[i]
        embed.addFields({name: `**${category}**`, value: fs.readdirSync(process.cwd() +  `/comandos/${category}`).map(file => `\`${file.split('.')[0]}\``).join(', ')},)
    
        }
        interaction.reply({embeds: [embed]})
	}
};