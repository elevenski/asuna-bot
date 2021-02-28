const Discord = require('discord.js');
const db = require('quick.db')

module.exports = async message => {
  let client = message.client;
  let prefix = client.config.prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    client.channels.get(client.config.cmdLog).send(`${message.author.tag} => **${cmd.help.name}** (${message.guild.name})`)
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
