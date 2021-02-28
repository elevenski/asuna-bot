const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment');

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
    let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
            
            var created = ''
            if(moment(user.createdAt).format('MM') === '01') {
                var created = `${moment(user.createdAt).format('DD')} 01 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '02') {
                var created = `${moment(user.createdAt).format('DD')} 02 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '03') {
                var created = `${moment(user.createdAt).format('DD')} 03 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '04') {
                var created = `${moment(user.createdAt).format('DD')} 04 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '05') {
                var created = `${moment(user.createdAt).format('DD')} 05 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '06') {
                var created = `${moment(user.createdAt).format('DD')} 06 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '07') {
                var created = `${moment(user.createdAt).format('DD')} 07 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '08') {
                var created = `${moment(user.createdAt).format('DD')} 08 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '09') {
                var created = `${moment(user.createdAt).format('DD')} 09 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '10') {
                var created = `${moment(user.createdAt).format('DD')} 10 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '11') {
                var created = `${moment(user.createdAt).format('DD')} 11 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(user.createdAt).format('MM') === '12') {
                var created = `${moment(user.createdAt).format('DD')} 12 ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
            }
  
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed()
   .setColor(client.config.embedColor)
   .setAuthor(client.user.username, client.user.avatarURL)
   .setFooter(message.author.tag, message.author.avatarURL)
        .setThumbnail(user.avatarURL + "?size=2048")
        .addField(lang.userinfo.name, user.bot ? `:robot: ${user.tag}` : ":bust_in_silhouette: " + user.tag + "\n" + user.id)
        .addField(lang.userinfo.sname, `${member.nickname !== null ? `${member.nickname}` : user.username}`)
        .addField(lang.userinfo.created, created)
        .addField(lang.userinfo.roles, `${member.roles.filter(r => r.name !== "@everyone").map(r => r).join(', ') ? member.roles.filter(r => r.name !== "@everyone").map(r => r).join(', ') : '-'}`)
     message.channel.send({embed});
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'user-info'
};
