const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');
const db = require('quick.db');


const embed343a = new Discord.MessageEmbed()
 .setDescription(`You must have **Administrator** authority to use this command.`)
 .setColor(ayarlar.renk)

const embed3 = new Discord.MessageEmbed()
 .setDescription(`Bu komutu kullanabilmek **Sunucu Sahibi** olmalısın.`)
 .setColor(ayarlar.renk)

exports.run = async (client, message, args) => {
const embed1 = new Discord.MessageEmbed()
 .setDescription(`Bot koruma sistemi **aktif**`)
 .setColor(ayarlar.renk)
const embed2 = new Discord.MessageEmbed()
 .setDescription(`Bot koruma sistemi **deaktif**.`)
 .setColor(ayarlar.renk)
const embed12 = new Discord.MessageEmbed()
 .setThumbnail(message.author.avatarURL())
 .setDescription(`You must tag the channel.`)
 .setColor(ayarlar.renk)
let adım1 = new Discord.MessageEmbed()
    .setTitle("Anti Raid Bot Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Bot koruma sistemimiz sunucuya eklenen botları ve ekleyen kullanıcıları eğer ekleyen sunucu sahibi değilse olası bir tehlikeye engel olmak için yasaklar (Sunucu sahibinin eylemlerine karışmaz).\n\n**Peki güvendiğim ve karışılmamasını istediğim bir yetkili var ona karışılmaması mümkün mü ?**\n\nEvet **!bot-koruma güven <Kullanıcıyı Etiketleyin>** parametresiyle güvendiğiniz bir yetkiliye karışılmamasını sağlayabilirsiniz ayrıca **!bot-koruma güven sıfırla** parametresi ile de güvenilen kişi ayarını sıfırlayabilirsiniz.`)
    .setFooter("Best Guard | Anti Raid")
    .addField(
     "Kullanım :",
     "**aç** / **kapat** / **güven**"
    )
let adım2 = new Discord.MessageEmbed()
    .setTitle("Anti Raid Bot Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Bot koruma sistemi aktif gözüküyor.`)
    .setFooter("Best Guard | Anti Raid")
    .addField(
     "**Deaktif** etmek için :",
     "**kapat**"
    )
let adım3 = new Discord.MessageEmbed()
    .setTitle("Anti Raid Bot Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Bot koruma sistemi deaktif gözüküyor.`)
    .setFooter("Best Guard | Anti Raid")
    .addField(
     "**Aktif** etmek için :",
     "**aç**"
    )
let premail = new Discord.MessageEmbed()
    .setTitle("Hey Dostum !")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Bu bir **premium** özelliği maalesef kullanamazsın premium özelliklerini açmak için destek sunucumuza girip yetkililere başvurabilirsin destek sunucu linkimiz **!davet** komutunda mevcuttur.`)
    .setFooter("Best Guard")

let mailembed = new Discord.MessageEmbed()
    .setTitle("Anti Raid Bot Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Bot koruma sistemi aktif gözüküyor.`)
    .setFooter("Best Guard | Anti Raid")
    .addField(
     "**Deaktif** etmek için :",
     "**kapat**"
    )

let asd123 = new Discord.MessageEmbed()
    .setTitle("Anti Raid Bot Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Birini etiketlemelisin.`)
    .setFooter("Best Guard | Anti Raid")

let asd124 = new Discord.MessageEmbed()
    .setTitle("Anti Raid Bot Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Sunucuda olan birini etiketlemelisin.`)
    .setFooter("Best Guard | Anti Raid")

let embed3739 = new Discord.MessageEmbed()
    .setTitle("Anti Raid Bot Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Anti raid güven başarıyla sıfırlandı.`)
    .setFooter("Best Guard | Anti Raid")

const dil = db.fetch(`dil_${message.guild.id}`)
if (dil == "tr") {

if(message.author.id !== message.guild.owner.user.id && message.author.id != "594985400393531398") return message.reply(embed3);
var kullanıcı = message.mentions.users.first()
  var d = args[0]
  const sad = db.fetch(`botguard_${message.guild.id}`)
if (!d) {
if (!sad) {
return message.channel.send(adım1)
}
if (sad === '1') {
return message.channel.send(adım2)
}
if (sad === '0') {
return message.channel.send(adım3)
}
}
 if (d !== "aç" && d !== "kapat" && d !== "Aç" && d !== "Kapat" && d !== "KAPAT" && d !== "AÇ" && d !== "güven" && d !== "Güven" && d !== "GÜVEN") {
    let e = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor(ayarlar.renk)
    .setDescription("Lütfen geçerli bir parametre giriniz")
    .addField(
     "**Doğru Kullanım :**",
     "**aç** / **kapat** / **güven**"
    )
    return message.channel.send(e)
  }

if (d === "aç" || d === "Aç" || d === "AÇ") {
db.delete(`botguard_${message.guild.id}`)
db.set(`botguard_${message.guild.id}`, "1")
return message.channel.send(embed1)
}

if (d === "kapat" || d === "Kapat" || d === "KAPAT") {
db.delete(`botguard_${message.guild.id}`)
db.set(`botguard_${message.guild.id}`, "0")
return message.channel.send(embed2)
}

if (d === "güven" || d === "Güven" || d === "GÜVEN") {
if (args[1]) {
if (args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "SIFIRLA") {
db.delete(`botgvn_${message.guild.id}, kullanıcı.id`)
return message.channel.send(embed3739)
}
}

if (!kullanıcı) {
  return message.channel.send(asd123)
}
  var Member = message.guild.members.cache.get(kullanıcı.id);
if (!Member) {
return message.channel.send(asd124)
}
db.set(`botgvn_${message.guild.id}`, kullanıcı.id)
const embed236 = new Discord.MessageEmbed()
 .setDescription(`Bot koruma sistemi için artık <@${kullanıcı.id}> kullanıcısı görmezden gelinecek.`)
 .setColor(ayarlar.renk)
return message.channel.send(embed236)
}
  
}
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['imagechannel'],
    permLevel: 4,

}

exports.help = {
    name: 'bot-koruma',
    description: 'Resim kanalını ayarlar.',
    kategori: 'sunucu',
    enname: 'imagechannel',
    category: 'server',
    endescription: 'Sets the image channel !',
    usage: 'sayaç-kanal-ayarla <#kanal>',

}

//Asylum#3568