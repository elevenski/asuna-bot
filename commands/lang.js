const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
   if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(lang.perm.manage_guild)

 if (!args[0]) return message.channel.send(lang.lang.msg)

    if (args[0] === "az") {
        if (language === "az") return message.channel.send(lang.lang.err)
        db.set(`lang_${message.guild.id}`, "az")
        message.channel.send(":flag_az: Dil `Azərbaycan` dilinə dəyişdirildi.")
    }
    
        if (args[0] === "en") {
        if (language === "en") return message.channel.send(lang.lang.err)
        db.set(`lang_${message.guild.id}`, "en")
        message.channel.send(":flag_us: The language has been changed to `English`.")
    }

    if (args[0] === "es") {
        if (language === "es") return message.channel.send(lang.lang.err)
        db.set(`lang_${message.guild.id}`, "es")
        message.channel.send(":flag_es: El idioma se ha cambiado al `Español`.")
    }

    if (args[0] === "tr") {
        if (language === "tr") return message.channel.send(lang.lang.err)
        db.set(`lang_${message.guild.id}`, "tr")
        message.channel.send(":flag_tr: Dil `Türkçe` olarak değiştirildi.")
    }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'lang'
};
