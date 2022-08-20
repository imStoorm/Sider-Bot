const { Client, Collection, MessageEmbed} = require("discord.js");
const { token } = require('./config.json');
const { Vulkava } = require('vulkava');
const fs = require('fs');

const client = new Client({intents: 32767});
client.commands = new Collection()

const modules = fs.readdirSync(process.cwd() +  `/comandos/`).map(category => category)
let commands = [];

modules.forEach((x) => {
  fs.readdir(`./comandos/${x}/`, (err, files) => {
	  if(err) return console.log(err);
	  console.log(`${files.length} comandos na pasta ${x}`);

  files.forEach(f => {
	  const props = require(`./comandos/${x}/${f}`);
	  client.commands.set(props.data.name, props)
	  commands.push(props)
	})
  });
});
;

const clientID = "clientID";
const clientSecret = "clientSecret"
client.vulkava = new Vulkava({
  unresolvedSearchSource: 'youtube',
  nodes: [
    {
      "hostname": "hostname",
      "port": port,
      "secure": true,
      "password": "password"
    }
  ],
  spotify: {
    clientId: clientID,
    clientSecret: clientSecret
  },
  sendWS: (guildId, payload) => {
    client.guilds.cache.get(guildId)?.shard.send(payload);
  }
})
  .on("nodeDisconnect", (node, code, reason) => {
    console.log(`[Vulkava] Disconnected node ${node.identifier}, code: ${code}, reason: ${reason}`);
  })
  .on("error", (node, error) => {
    if(error) {client.users.cache.get('852586719399510016').send(String(error.message))
    console.error(`[Vulkava] Error on node ${node.identifier}`, error.message);
  }
  })
  .on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannelId);
    const embed = new MessageEmbed()
    .setTitle('Sider Music')
    .addField(`Tocando agora:`, `\`${track.title}\``)
    .addField(`Por:`, `\`${track.requester.tag}\``)
    .setColor('WHITE')
    .setThumbnail(track.thumbnail)
    channel.send({embeds: [embed]});
  })
  .on("queueEnd", player => {
    const channel = client.channels.cache.get(player.textChannelId);
    channel.send("A Queue acabou.");
    player.destroy();
  })
  .on("wsDisconnect", async (player, code, reason) => {
    console.log(code)
    if(code == 4014) return player.destroy()
  });


client.on('raw', (packet) => client.vulkava.handleVoiceUpdate(packet));

client.on("ready", async bot => {
	client.vulkava.start(client.user.id);
	for(const comandos of commands) { client.application.commands.create(comandos.data.toJSON()) }
	bot.user.setActivity(`Atualização! Agora estou disponível apenas para comandos em barra! Me readicione em seu servidor para saber mais.`, {type: 'LISTENING'})
	console.log('Bot iniciado para ' + bot.users.cache.map(u => u).length + ' membros.')
})
client.on("interactionCreate", async (interaction) => {
	if(interaction.isCommand()) {client.commands.get(interaction.commandName).execute(client, interaction)}
})

client.login(token)
