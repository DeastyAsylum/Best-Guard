const Discord = require('discord.js');
var ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {
const dil = db.fetch(`dil_${message.guild.id}`)
if (dil == "tr") {
  const deasty = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.avatarURL())
 .setTimestamp()
 .setColor(ayarlar.renk)
 .setFooter(`» ${client.user.username}`, client.user.avatarURL())
 .addField('Sunucu Sayısı', 
`${client.guilds.cache.size}`
 )
 .addField('Kullanıcı Sayısı', 
    `${client.users.cache.size}`
 )
  .addField('Kanal Sayısı', 
    `${client.channels.cache.size}`
 )
 .addField("Ping", client.ws.ping + " ms", false)
 .addField(
      "RAM Kullanımı",
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB",
      true
    )
	.addField(
      "Uptime",
      moment
        .duration(client.uptime)
        .format(" D [gün], H [saat], m [dakika], s [saniye]")
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
 .addField('Sunucu Sayısı', 
`${client.guilds.cache.size}`
 )
 .addField('Kullanıcı Sayısı', 
    `${client.users.cache.size}`
 )
  .addField('Kanal Sayısı', 
    `${client.channels.cache.size}`
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
        name: "i",
        description: 'Botun Linklerini atar.',
        enname: 'i',
        category: 'general',
        endescription: 'Links about bot.',
        kategori: 'genel'
}

//Asylum#3568