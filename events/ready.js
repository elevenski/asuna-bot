const Discord = require('discord.js');

module.exports = client => {

  client.user.setActivity(`${client.config.prefix}help | ${client.config.prefix}open-source`)
  console.log(`Bot ONLINE! (${client.user.tag} - ${client.user.id}) [Serving @ ${client.guilds.size} server]`);

};
