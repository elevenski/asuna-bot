const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    
    let language = db.fetch(`lang_${message.guild.id}`)
    if (language === null) language = client.config.mainLang
    const lang = require(`../lang/${language}.js`)
    
    var answers = [ 
        lang.eightball.answers_one,
        lang.eightball.answers_two,
        lang.eightball.answers_three,
        lang.eightball.answers_four,
        lang.eightball.answers_five,
        lang.eightball.answers_six,
        lang.eightball.answers_seven,
        lang.eightball.answers_eight,
        lang.eightball.answers_nine
]
    
     if (args[0] != null) {
        message.channel.send(answers[Math.floor(Math.random() * answers.length).toString(16)])
    }
    
     else message.channel.send(lang.eightball.questionreq)


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: '8ball'
};
