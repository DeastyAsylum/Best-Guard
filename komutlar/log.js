const Discord = require('discord.js')
const db = require('quick.db')
var ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {
const Deasty = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.")
const Deasty2 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("**Mod log** kanalı zaten ayarlı değil.")
const Deasty3 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("**Mod log** kanalı başarıyla sıfırlandı.")
const Deasty4 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("**Mod log** kanalı için kullanmak istediğin kanalı etiketlemelisin.")
const Deasty00 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("You must have **Administrator** authority to use this command.")
const Deasty02 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("**Mod log** channel is already not set.")
const Deasty03 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("**Mod log** channel successfully reset.")
const Deasty04 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("For setup **Mod log** you need tag the log channel.")
let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`log_${message.guild.id}`)
const dil = db.fetch(`dil_${message.guild.id}`)
if (dil == "tr"){
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Deasty);
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(Deasty2);
    db.delete(`log_${message.guild.id}`)
    db.delete(`logdurum_${message.guild.id}`)
   message.channel.send(Deasty3);
  
    return
  }
  
if (!logk) return message.channel.send(Deasty4);

db.set(`log_${message.guild.id}`, logk.id)
db.set(`logdurum_${message.guild.id}`, "acik")

const Deasty5 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription(`**Mod log** kanalı başarıyla ${logk} olarak ayarlandı.`)

message.channel.send(Deasty5);
}
if (dil == "en") {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Deasty00);
  if (args[0] === "reset" || args[0] === "off") {
    if(!logkanal) return message.channel.send(Deasty02);
    db.delete(`log_${message.guild.id}`)
    db.delete(`logdurum_${message.guild.id}`)
   message.channel.send(Deasty3);
  
    return
  }
  
if (!logk) return message.channel.send(Deasty04);

db.set(`log_${message.guild.id}`, logk.id)
db.set(`logdurum_${message.guild.id}`, "acik")

const Deasty05 = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription(`**Mod log** channel successfully set to ${logk} channel.`)

message.channel.send(Deasty05);
}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog','log-ayarlama','logayarla','klog','vkanal','kayıtkanalı','logs'],
    permLevel: 2 ,//Kendi permlerinize göre ayarlayın,
};

exports.help = {
    name: 'log',
    description: 'Mod-Log kanalını belirler.',
    enname: 'log',
    category: 'server',
    kategori: 'sunucu',
    endescription: 'Sets the Mod-Log channel !',
    usage: 'mod-log <#kanal>'
};

//Asylum#3568