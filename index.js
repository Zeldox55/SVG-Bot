const { Discord, Client, Intents, Collection } = require('discord.js');
const config = require('./configs/config.json');
const fs = require('fs');
const db = require('quick.db');
const path = require("path");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


client.commands = new Collection();
client.aliases = new Collection();


client.emotes = require('./configs/emotes.json')
client.filters = require('./configs/filters.json');

["aliases", "commands"].forEach(cmd => client[cmd] = new Collection());
["console", "commands", "events"].forEach(events => require(`./handlers/${events}`)(client));

client.categories = fs.readdirSync('./commands');


// EVENTS

client.on('ready', async() => {
    console.log(`${client.user.tag} has Logged !`);
});

//CHATBOT FEATURE 

client.on("messageCreate", async message => {
    let sChannel = db.fetch(`chatbot_${message.guild.id}`);
    if (sChannel === null) {
        return;
    }
    if (message.author.bot && message.author.discriminator !== '0000') return;
    if(message.channel.id === sChannel){
        let content = message.content;
        if(!content) return;
        chatbot.getReply(content).then(r => client.channels.cache.get(sChannel).send(r));
    }
});
client.login(config.token);