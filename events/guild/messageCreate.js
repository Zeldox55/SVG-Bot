const config = require('../../configs/config.json');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = async (client, message) => {
    let prefix = config.prefix
    try{
        if (message.author.bot || message.channel.type === "DM") return;
        
        if((message.content === `<@${client.user.id}>`) || (message.content === `<!@${client.user.id}>`)){
      message.channel.send(`My Prefix is ${config.prefix}`)
        }
        
        if(!message.content.startsWith(prefix)) return;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        var commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if (commandfile) commandfile.run(client, message, args);

        
    } catch (error) {
        console.log(error);
        ;
    }
};