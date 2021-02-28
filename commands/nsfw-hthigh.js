const Discord = require('discord.js');
const db = require('quick.db')
const superagent = require('superagent');
const client = new Discord.Client();

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
    const DBL = require("dblapi.js");
    const dbl = new DBL(client.config.dblToken, client);

    const nsfwChannel = new Discord.Attachment("https://support.discord.com/hc/article_attachments/360007795191/2_.jpg")
    
     dbl.hasVoted(message.author.id).then(voted => {
  if (!voted) { message.channel.send(lang.nsfw.votereq + `\nhttps://top.gg/bot/${client.user.id}/vote`)
   } else {
       
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'hthigh'})
    .end((err, response) => {
      message.channel.send({ file: response.body.message });
    });
  } else {
    message.channel.send(lang.nsfw.onreq, nsfwChannel)
  }


}})};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'hthigh'
};
