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
 .setDescription(`Rol koruma sistemi **aktif** limit otomatik **5** olarak ayarlandı değiştirmek için **!rol-koruma limit** komutunu kullanabilirsin.`)
 .setColor(ayarlar.renk)
const embed2 = new Discord.MessageEmbed()
 .setDescription(`Rol koruma sistemi **deaktif**.`)
 .setColor(ayarlar.renk)
const embed12 = new Discord.MessageEmbed()
 .setThumbnail(message.author.avatarURL())
 .setDescription(`You must tag the channel.`)
 .setColor(ayarlar.renk)
let adım1 = new Discord.MessageEmbed()
    .setTitle("Rol Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Rol koruma sistemimiz sunucuda silinen rolleri izinleriyle beraber tekrar açar rol limite göre silen kullanıcıyı yasaklar veya sunucuda açılan rolleri siler ve açan kişiyi yasaklar (Sunucu sahibinin eylemlerine karışmaz).\n\n**Peki güvendiğim ve karışılmamasını istediğim bir yetkili var ona karışılmaması mümkün mü ?**\n\nEvet **!rol-koruma güven <Kullanıcıyı Etiketleyin>** parametresiyle güvendiğiniz bir yetkiliye karışılmamasını sağlayabilirsiniz ayrıca **!rol-koruma güven sıfırla** parametresi ile de güvenilen kişi ayarını sıfırlayabilirsiniz.`)
    .setFooter("Best Guard | Rol Koruma")
    .addField(
     "Kullanım :",
     "**aç** / **kapat** / **güven** / **limit** / **limit**"
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
    .setTitle("Rol Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Rol koruma sistemi zaten **deaktif** gözüküyor.`)
    .setFooter("Best Guard | Rol Koruma")
    .addField(
     "**Aktif** etmek için :",
     "**aç**"
    )

const embed43 = new Discord.MessageEmbed()
 .setDescription(`Rol koruma sistemi kullanıcıların **rol** kayıtları sıfırlandı.`)
 .setColor(ayarlar.renk)

const embed87 = new Discord.MessageEmbed()
 .setDescription(`Rol koruma sistemi **rol limitini** ayarlamak için **!rol-koruma limit <1 ve 20 arası sayı>** komutunu kullanmalısın\n\n**Peki rol limiti nedir ?**\n\n1 dahil 1 ve 20 arası vereceğiniz sayı kez sunucuda roller ile ilgili silen ya da değişiklik yapan kullanıcıları sunucudan yasaklanır **1** parametresi tek değişiklik işleminde müdaheleye denk gelir destek ve sorularınız için !davet komutundaki destek sunucumuza gelip destek alabilirsin.`)
 .setColor(ayarlar.renk)

let premail = new Discord.MessageEmbed()
    .setTitle("Hey Dostum !")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Bu bir **premium** özelliği maalesef kullanamazsın premium özelliklerini açmak için destek sunucumuza girip yetkililere başvurabilirsin destek sunucu linkimiz **!davet** komutunda mevcuttur.`)
    .setFooter("Best Guard")

const embed98 = new Discord.MessageEmbed()
 .setDescription(`Lütfen 1 ile 20 arasında bir **sayı** giriniz.`)
 .setColor(ayarlar.renk)

let mailembed = new Discord.MessageEmbed()
    .setTitle("Rol Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Rol koruma sistemi zaten **aktif** gözüküyor.`)
    .setFooter("Best Guard | Rol Koruma")
    .addField(
     "**Deaktif** etmek için :",
     "**kapat**"
    )

let asd123 = new Discord.MessageEmbed()
    .setTitle("Rol Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Birini etiketlemelisin.`)
    .setFooter("Best Guard | Rol Koruma")

let asd124 = new Discord.MessageEmbed()
    .setTitle("Rol Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Sunucuda olan birini etiketlemelisin.`)
    .setFooter("Best Guard | Rol Koruma")

const dil = db.fetch(`dil_${message.guild.id}`)
if (dil == "tr") {

if(message.author.id !== message.guild.owner.user.id && message.author.id != "594985400393531398") return message.reply(embed3);
  //var d = args.slice(0).join(' ');
var d = args[0]
var kullanıcı = message.mentions.users.first()
if (!d) {
return message.channel.send(adım1)
}
 if (d !== "aç" && d !== "kapat" && d !== "Aç" && d !== "Kapat" && d !== "KAPAT" && d !== "AÇ" && d !== "güven" && d !== "GÜVEN" && d !== "Güven" && d !== "limit" && d !== "Limit" && d !== "LİMİT" && d !== "sıfırla" && d !== "Sıfırla" && d !== "SIFIRLA") {
    let e = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor(ayarlar.renk)
    .setDescription("Lütfen geçerli bir parametre giriniz")
    .addField(
     "**Doğru Kullanım :**",
     "**aç** / **kapat** / **güven** / **limit** / **sıfırla**"
    )
    return message.channel.send(e)
  }

if (d === "aç" || d === "Aç" || d === "AÇ") {
if (db.fetch(`rolk_${message.guild.id}`)) {
return message.channel.send(mailembed)
}
db.set(`rolk_${message.guild.id}`, 1)
db.set(`rollimit_${message.guild.id}`, 5)
return message.channel.send(embed1)
}

if (d === "kapat" || d === "Kapat" || d === "KAPAT") {
if(!db.fetch(`rolk_${message.guild.id}`)) {
return message.channel.send(adım3)
}
db.delete(`rolk_${message.guild.id}`)
return message.channel.send(embed2)
}

if (d === "sıfırla" || d === "Sıfırla" || d === "SIFIRLA") {
message.guild.members.cache.forEach(a => require('quick.db').delete(`rolkoruma_${message.guild.id}_${a.user.id}`));
return message.channel.send(embed43)
}

if (d === "limit" || d === "Limit" || d === "LİMİT") {
if (!args[1]) {
return message.channel.send(embed87)
}
if (isNaN(Number(args[1]))) return message.channel.send(embed98)
if (Number(args[1]) > 20) {
  return message.channel.send(embed98)
}
if (Number(args[1]) < 1) {
  return message.channel.send(embed98)
}
db.set(`rollimit_${message.guild.id}`, Number(args[1]))
const embed25 = new Discord.MessageEmbed()
 .setDescription(`Rol koruma limit **${args[1]}** olarak ayarlandı artık yetkililer en fazla **${args[1]}** kere rol üzerinde oynama yapabilecektir.`)
 .setColor(ayarlar.renk)
return message.channel.send(embed25)
}


if (d === "güven" || d === "Güven" || d === "GÜVEN") {
if (args[1]) {
if (args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "SIFIRLA") {
db.delete(`rolgvn_${message.guild.id}, kullanıcı.id`)
let embed3739 = new Discord.MessageEmbed()
    .setTitle("Rol Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Rol koruma güven başarıyla sıfırlandı.`)
    .setFooter("Best Guard | Rol Koruma")
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
db.set(`rolgvn_${message.guild.id}`, kullanıcı.id)
const embed236 = new Discord.MessageEmbed()
 .setDescription(`Rol koruma sistemi için artık <@${kullanıcı.id}> kullanıcısı görmezden gelinecek.`)
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
    name: 'rol-koruma',
    description: 'Resim kanalını ayarlar.',
    kategori: 'sunucu',
    enname: 'imagechannel',
    category: 'server',
    endescription: 'Sets the image channel !',
    usage: 'sayaç-kanal-ayarla <#kanal>',

}

//Asylum#3568