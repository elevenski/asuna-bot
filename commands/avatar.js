const Discord = require('discord.js');
const db = require('quick.db')

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
    
    const embed = new Discord.RichEmbed()
        .setColor(client.config.embedColor)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(`**${user.username}#${user.discriminator}**`)
        .setImage(user.avatarURL)
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
    name: 'avatar'
};
