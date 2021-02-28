const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
    const embed = new Discord.RichEmbed()
        .setColor(client.config.embedColor)
        .setAuthor(client.user.username, client.user.avatarURL)
        .addField(lang.stats.guilds, client.guilds.size.toLocaleString(), true)
        .addField(lang.stats.users, client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
        .addField(lang.stats.channels, client.channels.size.toLocaleString(), true)
        .addField(lang.stats.developers, `${client.users.get(client.config.admin).tag}`)
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
    name: 'stats'
};
