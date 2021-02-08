const Discord = require('discord.js');
 var ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {
 
  let pages = [
              `Best Guard hakkında genel bir bilgilendirme için **sayfa 2'ye** göz atabilirsin ! \n\n  Sunucunu korumaya nereden başlayacağını bilmiyorsan **sayfa 3'te** komutları bulabilirsin ! \n\n  **Sayfa 4'te** destek ve sorularınız bölümüne göz atabilirsin ! \n\n  **Sayfa 5'te** bota gelecek ve gelen güncellemeleri takip edebilirsin !`,
              `**Biz kimiz ?**\n\n Best Bilişim bünyesinde sahiplerinin Deasty#1330 ve Astek#1330 olan bir aileyiz\n\n**Niye Buradayız ?**\n\nDiscord sunucularınızda bazı art niyetli yetkililer tarafından ya da kazara istenmeyen şeyler olabiliyor biz de bu durumu yaşamış kişiler olarak bu duruma son vermek ve insanların iç rahatlığıyla artık birbirine güvenebileceği discord sunucuları istiyoruz kuruluş serüvenimiz ise bize edilen bir ihanet sonucu başladı`,
              `**Komut Listesi :**\n\n**yardım** : Best Guard yardım panelini açar\n\n**log** : Tüm sistemler için log kanalı ayarlanır\n\n**premium** : Premium bilgisi alırsınız\n\n**davet** : Bot davet ve destek sunucu linklerini atar\n\n**dil** : Dili ayarlar\n\n**bot-koruma** : Anti raid (Bot koruma) sistemi kurulum işlemini başlatır\n\n**acil-durum** : Acil durum sunucu koruma sistemini belirlediğiniz limite göre sunucuda limitten fazla kişi yasaklayan kullanıcılar yasaklanır\n\n**rol-koruma** : Rol koruma sistemi kurulum işlemini başlatır\n\n**i** : Botun istatistiklerini atar`,
              `**Destek Ve Sıkça Sorulan Sorular: **\n\n**Best Guard botun rolünün en yüksekte olması lazım mıdır ?**\n\nEvet , Best Guard botunun sunucudaki en yüksek role ve yetkiye sahip olması gerekir en yüksek role sahip olmazsa tam olarak düzgün çalışmayabilir.\n\n**Dil komutunda en seçeneğinde bazı komutlar çalışmıyor ya da Türkçe bunun nedeni nedir ?**\n\nİngilizce seçeneğimiz henüz tamamen hazır değildir Türkçe seçeneğiyle devam etmeniz daha sağlıklı olacaktır.`,
              `**Son güncellemeler :**\n\n- Rol Koruma eklendi.\n\n**Gelecek olan güncellemeler :**\n\n- Kanal koruma yakında aktif.`,
              ];
  let page = 1;
 
  const embed = new Discord.MessageEmbed()
    .setAuthor(`Best Guard Yardım Menüsü ${page}/5`, client.user.avatarURL())
    .setColor(ayarlar.renk)
    .setFooter(`Sayfa ${page} / ${pages.length}`)
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => {
 
  msg.react('⬅')
  .then(r => {
    msg.react('➡')
 
   
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
 
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });
 
      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setAuthor(`Best Guard Yardım Menüsü ${page}/5`, client.user.avatarURL())
        embed.setDescription(pages[page-1]);
        embed.setColor(ayarlar.renk)
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setAuthor(`Best Guard Yardım Menüsü ${page}/5`, client.user.avatarURL())
        embed.setColor(ayarlar.renk)
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
 
    })
  })
};
 
 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["help", "y", "h"],
permLevel: 0
};
 
exports.help = {
name: 'yardım',
description: 'Yardım Listesini Gösterir',
usage: 'yardım'
};


//Asylum#3568