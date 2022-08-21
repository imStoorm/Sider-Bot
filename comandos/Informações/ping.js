<<<<<<< HEAD
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Saiba a latência do bot.'),
	async execute(client, interaction) {

		let embed = new Discord.MessageEmbed()
     	.setTitle('Minha Latência é de:')
     	.setDescription(`**${parseInt(client.ws.ping)}ms**`)
     	.setThumbnail(client.user.avatarURL())
     	.setColor('WHITE')

		interaction.reply({embeds: [embed], ephemeral: true});
	},
=======
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Saiba a latência do bot.'),
	async execute(client, interaction) {

		let embed = new Discord.MessageEmbed()
     	.setTitle('Minha Latência é de:')
     	.setDescription(`**${parseInt(client.ws.ping)}ms**`)
     	.setThumbnail(client.user.avatarURL())
     	.setColor('WHITE')

		interaction.reply({embeds: [embed], ephemeral: true});
	},
>>>>>>> c6660c5ebb6b0ac3b22ae8b407984c834523ab13
};