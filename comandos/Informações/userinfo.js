const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const formatTime = require('../../functions/formatTime');
const convertMilliseconds = require('../../functions/convertMilisseconds');
const moment = require('moment');
moment.locale('pt-br')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Veja as informações de um usuário.')
            .addUserOption(option =>
                option.setName('usuario')
                    .setDescription('Usuário que deseja saber sobre.')
                    .setRequired(false)),
    async execute(client, interaction) {
        let usuario = interaction.options.getUser('usuario')
        if(!usuario) usuario = interaction.user

        let criacao = moment(usuario.createdTimestamp).format('LLL')
        let datas = `Criado em: ${criacao}`

        let member = interaction.guild.members.cache.get(usuario.id)
        let entrou = moment(member?.joinedTimestamp).format('LLL')
        if(member) datas = datas + `\n Entrou em: ${entrou}`

        const embed = new Discord.MessageEmbed()
            .setTitle('Informações do Usuário')
            .addFields([
                {
                    name: 'Dados:',
                    value: `Tag: \`${usuario.tag}\`\nId: \`${usuario.id}\``
                },
                {
                    name: 'Datas:',
                    value: datas
                }
            ])
            .setColor('WHITE')
            .setThumbnail(usuario.avatarURL({dynamic: true, format: 'png', size: 4096}))
        if(member) embed.addField('Cargos:', String(member.roles.cache.map(r => r)).replaceAll(',', ' ').replace('@everyone', ''))
        interaction.reply({embeds: [embed]})
    }
}