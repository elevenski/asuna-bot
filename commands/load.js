exports.run = (client, message, args) => {
    
  if (message.author.id !== client.config.admin) return;

  var command = args[0];
  message.channel.sendMessage("`" + command + "` restarting...")
    .then(m => {
      client.reload(command)
        .then(() => {
          m.edit("`" + command + "` restarted.");
        })
        .catch(e => {
          m.edit(`ERROR: \`${command || "---"}\`\n\`\`\`${e.stack}\`\`\``);
        });
    });
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'load'
};