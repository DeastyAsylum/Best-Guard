const Discord = require('discord.js');
const db = require('quick.db')
var ayarlar = require('../ayarlar.json');


exports.run = async (client, message, args) => {

 const embed3 = new Discord.MessageEmbed()
 .setDescription(`Bu komutu kullanabilmek **Sunucu Sahibi** olmalısın.`)
 .setColor(ayarlar.renk)

const embed32 = new Discord.MessageEmbed()
 .setDescription(`Acil durum koruma sistemi zaten **aktif** şu parametreler sana istediğini vermekte yardımcı olabilir.`)
 .setColor(ayarlar.renk)
    .addField(
     "Kullanım :",
     "**kapat** / **sıfırla** / **limit** / **güven**"
    )

const embed1 = new Discord.MessageEmbed()
 .setDescription(`Acil durum koruma sistemi **aktif** limit otomatik **5** olarak ayarlandı değiştirmek için **!acil-durum limit** komutunu kullanabilirsin.`)
 .setColor(ayarlar.renk)

const embed43 = new Discord.MessageEmbed()
 .setDescription(`Acil durum koruma sistemi kullanıcıların **ban** kayıtları sıfırlandı.`)
 .setColor(ayarlar.renk)

const embed87 = new Discord.MessageEmbed()
 .setDescription(`Acil durum koruma sistemi **ban limitini** ayarlamak için **!acil-durum limit <1 ve 20 arası sayı>** komutunu kullanmalısın\n\n**Peki ban limiti nedir ?**\n\n1 dahil 1 ve 20 arası vereceğiniz sayıya eşit sayıda atılan yasaklamada yasaklayan kullanıcı sunucudan yasaklanır **1** parametresi tek yasaklama işleminde müdaheleye denk gelir destek ve sorularınız için !davet komutundaki destek sunucumuza gelip destek alabilirsin.`)
 .setColor(ayarlar.renk)

const embed98 = new Discord.MessageEmbed()
 .setDescription(`Lütfen 1 ile 20 arasında bir **sayı** giriniz.`)
 .setColor(ayarlar.renk)

const embed2 = new Discord.MessageEmbed()
 .setDescription(`Acil durum koruma sistemi **deaktif**.`)
 .setColor(ayarlar.renk)

let asd123 = new Discord.MessageEmbed()
    .setTitle("Acil Durum Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Birini etiketlemelisin.`)
    .setFooter("Best Guard | Acil Durum")

let asd124 = new Discord.MessageEmbed()
    .setTitle("Acil Durum Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Sunucuda olan birini etiketlemelisin.`)
    .setFooter("Best Guard | Acil Durum")

let adım1 = new Discord.MessageEmbed()
    .setTitle("Acil Durum Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Acil durum koruma sistemimiz açık olduğu sürece her yetkiliye belirlenen limit kadar ban hakkı verir limiti aşan bir kullanıcı olursa olası bir tehdite karşı kullanıcıyı yasaklar (Sunucu sahibinin eylemlerine karışmaz).\n\n**Peki güvendiğim ve karışılmamasını istediğim bir yetkili var ona karışılmaması mümkün mü ?**\n\nEvet **!acil-durum güven <Kullanıcıyı Etiketleyin>** parametresiyle güvendiğiniz bir yetkiliye karışılmamasını sağlayabilirsiniz ayrıca **!acil-durum güven sıfırla** parametresi ile de güvenilen kişi ayarını sıfırlayabilirsiniz.\n\n**Peki nasıl sistemi aktif edebilirim ?**\n\nSistemi kullanmaya başlamak için **!acil-durum** ve alttaki **parametreleri** kullanmalısın.`)
    .setFooter("Best Guard | Acil Durum")
    .addField(
     "Kullanım :",
     "**aç** / **kapat** / **sıfırla** / **limit** / **güven**"
    )

const dil = db.fetch(`dil_${message.guild.id}`)
if (dil == "tr") {

if(message.author.id !== message.guild.owner.user.id && message.author.id != "594985400393531398") return message.channel.send(embed3);
var kullanıcı = message.mentions.users.first()
  const d = args[0]
  if (!d) return message.channel.send(adım1)

 if (d !== "aç" && d !== "kapat" && d !== "Aç" && d !== "Kapat" && d !== "KAPAT" && d !== "AÇ" && d !== "Sıfırla" && d !== "sıfırla" && d !== "SIFIRLA" && d !== "limit" && d !== "Limit" && d !== "LİMİT" && d !== "güven" && d !== "Güven" && d !== "GÜVEN") {
    let e = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor(ayarlar.renk)
    .setDescription("Lütfen geçerli bir parametre giriniz")
    .addField(
     "**Doğru Kullanım :**",
     "**aç** / **kapat** / **sıfırla** / **limit** / **güven**"
    )
    return message.channel.send(e)
  }

if (d === "aç" || d === "Aç" || d === "AÇ") {
const acl = db.fetch(`acil_${message.guild.id}`)
if (acl) {
return message.channel.send(embed32)
}
db.delete(`acil_${message.guild.id}`)
db.set(`acil_${message.guild.id}`, "1")
db.set(`banlimit_${message.guild.id}`, 5)
return message.channel.send(embed1)
}

if (d === "kapat" || d === "Kapat" || d === "KAPAT") {
db.delete(`acil_${message.guild.id}`)
db.delete(`banlimit_${message.guild.id}`)
message.guild.members.cache.forEach(a => require('quick.db').delete(`${message.guild.id}_${a.user.id}`));
 message.channel.send(embed2)
}

if (d === "sıfırla" || d === "Sıfırla" || d === "SIFIRLA") {
message.guild.members.cache.forEach(a => require('quick.db').delete(`${message.guild.id}_${a.user.id}`));
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
db.set(`banlimit_${message.guild.id}`, Number(args[1]))
const embed25 = new Discord.MessageEmbed()
 .setDescription(`Acil durum ban limiti **${args[1]}** olarak ayarlandı artık yetkililer en fazla **${args[1]}** kadar ban atabilecekler.`)
 .setColor(ayarlar.renk)
return message.channel.send(embed25)
}

if (d === "güven" || d === "Güven" || d === "GÜVEN") {
if (args[1]) {
if (args[1] === "sıfırla" || args[1] === "Sıfırla" || args[1] === "SIFIRLA") {
db.delete(`acilgvn_${message.guild.id}, kullanıcı.id`)
let embed3739 = new Discord.MessageEmbed()
    .setTitle("Acil Durum Koruma Sistemi")
    .setColor(ayarlar.renk)
    .setDescription(`Hey <@${message.author.id}> ! Acil durum güven başarıyla sıfırlandı.`)
    .setFooter("Best Guard | Acil Durum")
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
db.set(`acilgvn_${message.guild.id}`, kullanıcı.id)
const embed236 = new Discord.MessageEmbed()
 .setDescription(`Bot koruma sistemi için artık <@${kullanıcı.id}> kullanıcısı görmezden gelinecek.`)
 .setColor(ayarlar.renk)
return message.channel.send(embed236)
}

}
};

 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['acil-durum'],
    permLevel: 4,

}

exports.help = {
    name: 'acil-durum',
    description: 'Resim kanalını ayarlar.',
    kategori: 'sunucu',
    enname: 'imagechannel',
    category: 'server',
    endescription: 'Sets the image channel !',
    usage: 'sayaç-kanal-ayarla <#kanal>',

}
//Asylum#3568
