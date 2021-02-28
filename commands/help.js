const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
    const embed = new Discord.RichEmbed()
        .setColor(client.config.embedColor)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTitle(lang.help.title)
        .setDescription("> " + lang.help.supportedlanguages + " :flag_az: :flag_us: :flag_es: :flag_tr: `+lang`")
        .addField(lang.help.cstaff + " — 2", "`ban` `unban`")
        .addField(lang.help.cnsfw + " — 17", "`4k` `anal` `ass` `hentai` `pgif` `pussy` `boobs` `hboobs` `hass` `hanal` `hkitsune` `thigh` `hthigh` `paizuri` `gonewild` `tentacle` `hmidriff`")
        .addField(lang.help.cother + " — 11", " `help` `server-info` `user-info` `stats` `avatar` `8ball` `support` `vote` `invite` `ping` `open-source` \n\n[" + lang.help.addtodiscord + "](https://discord.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) | [" + lang.help.supportserver + "](" + client.config.support + ") | [" + lang.help.voteontopgg + "](https://top.gg/bot/" + client.user.id + "/vote)")
      /*  .addField("Commands — " + client.commands.size, "`avatar`, `8ball`,  \n\n[" + lang.help.addtodiscord + "](https://discord.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) | [" + lang.help.supportserver + "](" + client.config.support + ") | [" + lang.help.voteontopgg + "](https://top.gg/bot/" + client.user.id + "/vote)")*/
        .setFooter(message.author.tag, message.author.avatarURL)
        .setThumbnail(client.user.avatarURL)
    message.channel.send(embed)


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'help'
};
