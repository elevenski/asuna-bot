const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(lang.perm.ban_members);
  
  let guild = message.guild
  let user = message.mentions.users.first() || client.users.get(args.slice(0).join(' ')) || client.guilds.get(args[0])
    
  if (!user) return message.channel.send(lang.ban.userreq).catch(console.error);
  if (!message.guild.member(user)) return message.channel.send(lang.ban.usernf)
  if (!message.guild.member(user).bannable) return message.channel.send(lang.ban.usernb);
  
  let reason = args.splice(1, args.length).join(' ') || lang.ban.nreason;
  message.guild.ban(user, reason);
    
    const embed = new Discord.RichEmbed()
        .setColor(client.config.embedColor)
        .setAuthor(client.user.username, client.user.avatarURL)
        .addField(lang.ban.user, user.tag, true)
        .addField(lang.ban.reason, reason, true)
        .addField(lang.ban.unban, `+unban ${user.id}`)
        .setFooter(message.author.tag, message.author.avatarURL)
    message.channel.send(embed)


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ban'
};
