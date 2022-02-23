const config = require('../../configs/config.json');
const { embedcolor } = require('../../configs/config.json')

module.exports = {
    config: {
        name: 'avatar',
        description: '',
        aliases: ["av"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        try {
            let target = message.mentions.members.first() || message.member
            if(!target) return message.reply(`No User Mentioned !`)
            const avembed = new MessageEmbed()
            .setTitle(`AVATAR OF ${target.user.tag}`)
            .setColor(embedcolor)
            .setImage(target.user.displayAvatarURL({dynamic : true , size: 4096 ,format:"png"}))
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
            message.channel.send({ embeds: [avembed] })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.reply({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
            ]});
        }
    }  
}