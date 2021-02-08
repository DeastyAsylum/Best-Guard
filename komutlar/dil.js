const Discord = require('discord.js');
var ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  const Deasty = new Discord.MessageEmbed()
  .setColor(ayarlar.renk)
  .setDescription("Bu komutu kullanabilmek için **MANAGE_GUILD** yetkisine sahip olmalısın.")
  
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(Deasty);
  var d = args.slice(0).join(' ');
  //if (!d) {
    //let e = new Discord.MessageEmbed()
    //.setColor(ayarlar.renk)
    //.setDescription("Lütfen bir dil seçiniz./Please select a language.")
    //.addField(
    // "**Diller/Languages :**",
    // "**tr** / **en**"
  //  )
  //  message.channel.send(e)
  //}

  
  if (d !== "en" && d !== "tr" && d !== "sıfırla" && d !== "reset") {
    let e = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription("Lütfen bir dil seçiniz./Please select a language.")
    .addField(
     "**Diller/Languages :**",
     "**tr** / **en**"
    )
	.addField(
     "Maintenance",
     "English is under maintenance please select **tr** or wait for language update English will coming soon."
    )
    message.channel.send(e)
  }

  
  if (d === "en") {
    
    //db.set(`dil_${message.guild.id}`, "en")
    let e = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription("English is under maintenance please try again later.")
    message.channel.send(e)
    return;
    
  }
  
  if (d === "tr") {
    db.set(`dil_${message.guild.id}`, "tr")
    let e = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription("Dil başarıyla **Türkçe** olarak ayarlandı.")
    message.channel.send(e)
    return;
    
  }
  
  if (d === "sıfırla" || d === "reset") {
    
    db.delete(`dil_${message.guild.id}`)
    
    let e = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setDescription('Dil başarıyla sıfırlandı./Language successfully reset.')
    message.channel.send(e)
    return;
    
  }
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dil', 'language'],
    permLevel: 4,
  };
  
  exports.help = {
    name: 'dil',
    description: 'Botun dilini değiştirir.',
    usage: 'dil <en/tr/sıfırla>',
    enname: 'language',
    endescription: 'Bot changes the language.',
    enusage: 'language <en/tr/reset>',
    kategori: "sunucu",
    category: "server"
  };