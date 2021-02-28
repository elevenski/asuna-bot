const Discord = require('discord.js');
const db = require('quick.db')
const moment = require('moment');

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
  var region = ''
        if(message.guild.region === "russia") {
            var region = ':flag_ru:'
        }
        if(message.guild.region === "us-west") {
            var region = ':flag_us: '
        }
        if(message.guild.region === "us-south") {
            var region = ':flag_us: '
        }
        if(message.guild.region === "us-east") {
            var region = ':flag_us: '
        }
        if(message.guild.region === "us-central") {
            var region = ':flag_us: '
        }
        if(message.guild.region === "brazil") {
            var region = ':flag_br:'
        }
        if(message.guild.region === "singapore") {
            var region = ':flag_sg:'
        }
        if(message.guild.region === "sydney") {
            var region = ':flag_sh:'
        }
        if(message.guild.region === "eu-west") {
            var region = ':flag_eu:'
        }
        if(message.guild.region === "eu-south") {
            var region = ':flag_eu:'
        }
        if(message.guild.region === "eu-east") {
            var region = ':flag_eu:'
        }
        if(message.guild.region === "eu-central") {
            var region = ':flag_eu:'
        }
        if(message.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
   if(message.guild.region === "europe") {
            var konum = 'Avrupa :flag_eu: '
        }      if(message.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
        var created = ''
        if(moment(message.guild.createdAt).format('MM') === '01') {
            var created = `${moment(message.guild.createdAt).format('DD')} 01 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '02') {
            var created = `${moment(message.guild.createdAt).format('DD')} 02 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '03') {
            var created = `${moment(message.guild.createdAt).format('DD')} 03 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '04') {
            var created = `${moment(message.guild.createdAt).format('DD')} 04 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '05') {
            var created = `${moment(message.guild.createdAt).format('DD')} 05 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '06') {
            var created = `${moment(message.guild.createdAt).format('DD')} 06 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '07') {
            var created = `${moment(message.guild.createdAt).format('DD')} 07 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '08') {
            var created = `${moment(message.guild.createdAt).format('DD')} 08 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '09') {
            var created = `${moment(message.guild.createdAt).format('DD')} 09 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '10') {
            var created = `${moment(message.guild.createdAt).format('DD')} 10 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '11') {
            var created = `${moment(message.guild.createdAt).format('DD')} 11 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '12') {
            var created = `${moment(message.guild.createdAt).format('DD')} 12 ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
  
   const embed = new Discord.RichEmbed()
   .setColor(client.config.embedColor)
   .setAuthor(client.user.username, client.user.avatarURL)
   .setFooter(message.author.tag, message.author.avatarURL)
   .setThumbnail(message.guild.iconURL + "?size=2048")
  .addField(lang.serverinfo.founder, `${client.user.tag} ||(${message.guild.owner || "@"})|| \n${message.guild.ownerID}`)
   .addField(lang.serverinfo.server_name, region + message.guild.name + "\n" + message.guild.id)
   .addField(lang.serverinfo.members + ' ['+message.guild.memberCount+']', `:green_circle: ${message.guild.members.filter(m => m.user.presence.status === "online").size}, \n:red_circle: ${message.guild.members.filter(m => m.user.presence.status === "dnd").size}, \n:yellow_circle: ${message.guild.members.filter(m => m.user.presence.status === "idle").size}, \n:white_circle: ${message.guild.members.filter(m => m.user.presence.status === "offline").size}, \n:robot: ${message.guild.members.filter(m => m.user.bot).size}`)
   .addField(lang.serverinfo.channels + ' ['+message.guild.channels.size+']', `:keyboard: ${message.guild.channels.filter(c => c.type === "text").size}, \n:speaker: ${message.guild.channels.filter(c => c.type === "voice").size}, \n:file_folder: ${message.guild.channels.filter(c => c.type === "category").size}`)
   .addField(lang.serverinfo.server_boost, `${message.guild.premiumSubscriptionCount ? message.guild.premiumSubscriptionCount :  '0'}/${message.guild.premiumTier ? message.guild.premiumTier : '0'}`)
   .addField(lang.serverinfo.created, created)
   message.channel.send({embed});
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'server-info'
};
