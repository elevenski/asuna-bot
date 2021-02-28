const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(lang.perm.ban_members);

  let user = args[0]
  if(isNaN(args[0])) return message.channel.send(lang.unban.idreq)
  if(!user) return message.channel.send(lang.unban.idreqq)
  if(!(await message.guild.fetchBans()).has(args[0])) return message.channel.send(lang.unban.usernf)

  message.channel.send(lang.unban.succ+ `: ${user} - ${client.users.get(user).tag || "[object Object]"}`)
      
message.guild.unban(user);


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'unban'
};
