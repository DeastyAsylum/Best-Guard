const Discord = require('discord.js');
var ayarlar = require('../ayarlar.json');
const db = require('quick.db');
exports.run = async (client, message, args) => {
const dil = db.fetch(`dil_${message.guild.id}`)
if (dil == "tr") {
 const deasty = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.avatarURL())
 .setTimestamp()
 .setColor(ayarlar.renk)
 .setFooter(`» ${client.user.username}`, client.user.avatarURL())
 .setDescription(`Daha fazlası için buradan **Best Guard Bot**'u ekleyebilir , destek sunucumuza ulaşabilirsin`)
 .addField('» Davet Linki :', 
    `[Link !](https://discord.com/oauth2/authorize?client_id=712391077356634193&scope=bot&permissions=8)`
 )
 .addField('» Destek sunucumuz :', 
    `[Link !](https://discord.gg/5WqbZJhP5p)`
 )
message.channel.send(deasty)
}
if (dil == "en") {
	return
 const deasty = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.avatarURL())
 .setTimestamp()
 .setColor(ayarlar.renk)
 .setFooter(`» ${client.user.username}`, client.user.avatarURL())
 .setDescription(`For more you can add **Best Guard Bot** anf contact our support server`)
 .addField('» İnvite Link :', 
    `[Link !](https://discord.com/oauth2/authorize?client_id=730502991744073884&scope=bot&permissions=8)`
 )
 .addField('» Support Server :', 
    `[Link !](https://discord.gg/5WqbZJhP5p)`
 )
message.channel.send(deasty)
}
}
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['invite'],
   permlevel: 3
}
 
exports.help = {
        name: "davet",
        description: 'Botun Linklerini atar.',
        enname: 'invite',
        category: 'general',
        endescription: 'Links about bot.',
        kategori: 'genel'
}

//Asylum#3568