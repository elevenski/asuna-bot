const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require('ms');
const fs = require('fs');
const db = require('quick.db');
const { promisify } = require('util')
const chalk = require('chalk');
const moment = require('moment');
require('./util/eventLoader')(client);
require("moment-duration-format");
const m = require('ms');
const mo = require('moment');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const log = message => {
  console.log(`${message}`);
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.config = {
  "token": "TOKEN",
  "dblToken": "DBL API TOKEN", // top.gg
  "prefix": "PREFIX", // !
  "dmLog": "DMLOG CHANNEL ID", // 12345678912345
  "guildLog": "GUILDLOG CHANNEL ID", // 12345678912345
  "cmdLog": "CMDLOG CHANNEL ID", // 12345678912345
  "admin": "ADMIN ID", // 12345678912345
  "support": "SUPPORT SERVER INVITE", // https://discord.gg/123
  "mainLang": "en", // az/en/es/tr
  "embedColor": "EMBED COLOR", // #7289DA
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', async message => {
    if (message.content === '++fbb') {
    if (message.author.id !== client.config.admin) return;

  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});
client.on('message', async message => {
    if (message.content === '++fhg') {
    if (message.author.id !== client.config.admin) return;
        client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", msg => {
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const dm = new Discord.RichEmbed()
      .setThumbnail(msg.author.avatarURL)
      .setColor(client.config.embedColor)
      .addField(`User`, msg.author.tag) 
     .addField(`Message`, msg.content)
   client.channels.get(client.config.dmLog).send(dm)
  }
  if (msg.channel.bot) return;
});

client.on("guildCreate", guild => {
const gAdd = new Discord.RichEmbed()
.setColor("GREEN")
.setThumbnail(guild.iconURL)
.addField(`Bot`, `
Server : ${client.guilds.size.toLocaleString()}
User : ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
Channel : ${client.channels.size.toLocaleString()}
Ping : ${Math.round(client.ping)}ms
`)
.addField(`Server`, `
Name : ${guild.name}
ID : ${guild.id}
Owner : 
Total Member : ${guild.memberCount}
`)
client.channels.get(client.config.guildLog).send(gAdd)
});

client.on("guildDelete", guild => {
const gDelete = new Discord.RichEmbed()
.setColor("RED")
.setThumbnail(guild.iconURL)
.addField(`Bot`, `
Server : ${client.guilds.size.toLocaleString()}
User : ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
Channel : ${client.channels.size.toLocaleString()}
Ping : ${Math.round(client.ping)}ms
`)
.addField(`Server`, `
Name : ${guild.name}
ID : ${guild.id}
Owner : 
Total Member : ${guild.memberCount}
`)
client.channels.get(client.config.guildLog).send(gDelete)
}); 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("messageUpdate", async (oldMsg, newMsg) => {
  let prefix = await db.fetch(`prefix_${newMsg.guild.id}`) || client.config.prefix
  if (newMsg.author.bot) return;
  if (!newMsg.content.startsWith(prefix)) return;
  let command = newMsg.content.split(' ')[0].slice(prefix.length)
  let params = newMsg.content.split(' ').slice(1)
  let perms = client.elevation(newMsg);
  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, newMsg, params, perms);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Commands Loading: ${files.length}`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(` ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.author.id === client.config.admin) permlvl = 4;
  return permlvl;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.login(client.config.token);
