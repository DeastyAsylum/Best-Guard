const Discord = require("discord.js");
const ayarlar = require('./ayarlar.json');
const db = require("quick.db")
const client = new Discord.Client();
const express = require("express");
const app = express();
const fs = require("fs");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


//KOMUT Algılayıcı______________________________________________________________
client.conf = {"pref": '!', "own": '594985400393531398'} 
    client.on("message", message => {
  let client = message.client;
  if (message.channel.type == "dm") return
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return; 
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
const dila = db.fetch(`dil_${message.guild.id}`)
   if (dila !== "en" && dila !== "tr") {
  if (client.commands.has(command)) {
if (command !== "dil" && command !== "language" && command !== "davet" && command !== "yardım") {
 let deastydil = new Discord.MessageEmbed()
 .setTitle('Oops')
 .setDescription('Önce dili ayarlamalısın ! **!dil** komutunu kullanabilirsin. (TR dışı diller bakımdadır)')
 .setColor(ayarlar.renk)
message.channel.send(deastydil).catch(err => console.log("Mesaj Gönderilemedi"))
 return
 }
  }
   }
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }	
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})


client.on("ready", () => {  console.log(`[Deasty] ${client.user.username} ismi ile çalışıyorum!`);
  client.user.setStatus("ONLINE")
  client.user.setActivity("Sunucunu", {type: 3});
  console.log(` Oynuyor ayarlandı!`);
 });

var prefix = client.conf.prefix;

const log = message => {
  console.log(`[Deasty] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklenmeye hazır. Başlatılıyor...`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut yükleniyor: ${props.help.name}'.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komular/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if(message.member.permissions.has("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.permissions.has("MANAGE_ROLES")) permlvl = 2;
  if(message.member.permissions.has("MANAGE_CHANNELS")) permlvl = 3;
  if(message.member.permissions.has("KICK_MEMBERS")) permlvl = 4;
  if(message.member.permissions.has("BAN_MEMBERS")) permlvl = 5;
  if(message.member.permissions.has("ADMINISTRATOR")) permlvl = 6;
  if(message.author.id === message.guild.owner.id) permlvl = 7;
  if(message.author.id === ayarlar.sahip) permlvl = 8;
  return permlvl;
};



client.on("ready", () => {
  console.log(`[Deasty] ${client.user.tag}! Aktif!`);
});

client.login(ayarlar.token);

client.on('guildMemberAdd', async member => {
const bk = db.fetch(`botguard_${member.guild.id}`)
const mail = db.fetch(`mail_${member.guild.id}`)
const pre = db.fetch(`premium_${member.guild.id}`)
const logdurum = db.fetch(`logdurum_${member.guild.id}`)
const log = db.fetch(`log_${member.guild.id}`)
if (bk === "1") {
	var botsa = member.guild.members.cache.get(client.user.id);
	if(!botsa.permissions.has('VIEW_AUDIT_LOG')) return
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'BOT_ADD',
	});
	const botLog = fetchedLogs.entries.first();
	if (!botLog) return console.log(`${member.user.tag} adlı bot sunucuya katıldı ama log kaydını bulamadım`);
	const { executor, target } = botLog;
	if (executor.id === member.id) return
	if (!member.user.bot) return
	if (target.id === member.id) {
  let grmzdngel = db.fetch(`botgvn_${member.guild.id}`)
if(!botsa.permissions.has('BAN_MEMBERS')) return
  if (executor.id == grmzdngel) return;
if (executor.id === member.guild.owner.id || executor.id == "594985400393531398") return
//if (pre) {
var executorsa = member.guild.members.cache.get(member.id);
let botroll = botsa.roles.highest.position
let userroll = executorsa.roles.highest.position
if (botroll < userroll || botroll == userroll) return
var bots = member.guild.members.cache.get(client.user.id);
	if (!bots.permissions.has("BAN_MEMBERS")) return
  member.guild.members.cache.get(member.id).ban({
          reason: `Best Bot Koruma`
  }).catch(err => console.log("Ban atılamadı"))
var executors = member.guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
     if (logdurum === 'acik') {
if (log) {
  var kanal = member.guild.channels.cache.get(log)
  if (!kanal) return;
  const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`Sunucuya ${executor.tag} tarafından ${member.user.tag} botu eklendi bot sunucudan uzaklaştırıldı fakat yetkim yetmediği için kullanıcı hala sunucuda ! Dikkatli olmalısınız`)
    .addField("Eklenen Bot", "```" + member.user.tag + "```", true)
    .addField("Ekleyen", "```" + executor.tag + "```", true)
kanal.send(embed).catch(err => console.log("Mesaj Gönderilemedi"))
}
}
  let ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`Sunucuya ${executor.tag} tarafından ${member.user.tag} botu eklendi bot sunucudan uzaklaştırıldı fakat yetkim yetmediği için kullanıcı hala sunucuda ! Dikkatli olmalısın`)
    .addField("Eklenen Bot", "```" + member.user.tag + "```", true)
    .addField("Ekleyen", "```" + executor.tag + "```", true)
member.guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
member.guild.owner.send(`<@${member.guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
} else {
	if (!bots.permissions.has("BAN_MEMBERS")) return
  member.guild.members.cache.get(executor.id).ban({
          reason: `Best Bot Koruma`
  }).catch(err => console.log("Ban atılamadı"))

  if (logdurum === 'acik') {
if (log) {
  var kanal = member.guild.channels.cache.get(log)
  if (!kanal) return;
  const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Olası bir tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .addField("Eklenen Bot", "```" + member.user.tag + "```", true)
    .addField("Ekleyen", "```" + executor.tag + "```", true)
kanal.send(embed).catch(err => console.log("Mesaj Gönderilemedi"))
}
}
  const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`Sunucuya ${executor.tag} tarafından ${member.user.tag} botu eklendi bot sunucudan uzaklaştırıldı fakat yetkim yetmediği için kullanıcı hala sunucuda ! Dikkatli olmalısın`)
    .addField("Eklenen Bot", "```" + member.user.tag + "```", true)
    .addField("Ekleyen", "```" + executor.tag + "```", true)
member.guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
member.guild.owner.send(`<@${member.guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
  }
	}
  //}
}
});




client.on('guildMemberRemove', async member => {
const guild = member.guild
    var botx = guild.members.cache.get(client.user.id);
	if(!botx.permissions.has('VIEW_AUDIT_LOG')) return
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const banLog = fetchedLogs.entries.first();

	if (!banLog) return 

	const { executor, target } = banLog;

	if (target.id === member.id) {
const logdurum = db.fetch(`logdurum_${guild.id}`)
const log = db.fetch(`log_${guild.id}`)
  let grmzdngel = db.fetch(`kickgvn_${guild.id}`)
  if (executor.id == grmzdngel) return;
  if (executor.id === client.user.id) return
  if (executor.id === guild.owner.id || executor.id == "594985400393531398") return
		const acil = db.fetch(`kick_${guild.id}`)
    if (!acil) return
 const banlimit = db.fetch(`kicklimit_${guild.id}`)
  if (isNaN(banlimit)) return;

if (db.has(`${guild.id}_${executor.id}`)) {
db.add(`${guild.id}_${executor.id}`, 1)
const bansayi = await db.fetch(`kick_${guild.id}_${executor.id}`)
    if (bansayi >= banlimit) {
db.set(`kickhakduru_${guild.id}_${executor.id}`, "sa")
guild.members.unban(target.id).catch(err => console.log("Hata Perm")) 
      db.delete(`kick_${guild.id}_${executor.id}`)
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position 
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucudan **${banlimit}** kişi attı fakat yetkim ondan düşük olduğundan yasaklayamıyorum ! Dikkatli olmalısınız`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed)
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Kick Koruma Kural İhlali`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucudan **${banlimit}** kişi attı kick koruma açık olduğundan sunucudan yasakladım ! Dikkatli olmalısınız`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed)
  }
}
}
     

    }

  }

if (!db.has(`kick_${guild.id}_${executor.id}`)) {
var duru = db.fetch(`kickhakduru_${guild.id}_${executor.id}`)
if (duru) return
    if (banlimit == 1) {

////////////////////////////////////////////////////////////////////////////////////////////////////////
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucudan **${banlimit}** kişi attı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed)
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Kick Koruma Kural İhlali`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucudan **${banlimit}** kişi attı kick koruma açık olduğundan sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed)
  }
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
if (banlimit != 1) {

      db.set(`kick_${guild.id}_${executor.id}`, 1)

    }
}
db.delete(`kickhakduru_${guild.id}_${executor.id}`)
  }
});








client.on('guildBanAdd', async (guild, user) => {
	var botx = guild.members.cache.get(client.user.id);
	if(!botx.permissions.has('VIEW_AUDIT_LOG')) return
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	const banLog = fetchedLogs.entries.first();

	if (!banLog) return 

	const { executor, target } = banLog;

	//if (target.id === user.id) {
const logdurum = db.fetch(`logdurum_${guild.id}`)
const log = db.fetch(`log_${guild.id}`)
  let grmzdngel = db.fetch(`acilgvn_${guild.id}`)
  if (executor.id == grmzdngel) return;
  if (executor.id === client.user.id) return
  if (executor.id === guild.owner.id || executor.id == "594985400393531398") return
		const acil = db.fetch(`acil_${guild.id}`)
    if (!acil) return
 const banlimit = db.fetch(`banlimit_${guild.id}`)
  if (isNaN(banlimit)) return;



if (db.has(`${guild.id}_${executor.id}`)) {
db.add(`${guild.id}_${executor.id}`, 1)
const bansayi = await db.fetch(`${guild.id}_${executor.id}`)
    if (bansayi >= banlimit) {
db.set(`acilhakduru_${guild.id}_${executor.id}`, "sa")
      db.delete(`${guild.id}_${executor.id}`)
var bots = guild.members.cache.get(client.user.id);
var executorsa = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executorsa.roles.highest.position
if (botrol < userrol || botrol == userrol) {
	const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${banlimit}** kişi yasakladı fakat yetkim ondan düşük olduğundan yasaklayamıyorum ! Dikkatli olmalısınız`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Acil Durum Kural İhlali`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${banlimit}** kişi yasakladı acil durum modu açık olduğundan sunucudan yasakladım ! Dikkatli olmalısınız`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}
     

    }

  }

if (!db.has(`${guild.id}_${executor.id}`)) {
var duru = db.fetch(`acilhakduru_${guild.id}_${executor.id}`)
if (duru) return
    if (banlimit == 1) {

////////////////////////////////////////////////////////////////////////////////////////////////////////
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${banlimit}** kişi yasakladı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Acil Durum Kural İhlali`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${banlimit}** kişi yasakladı acil durum modu açık olduğundan sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
if (banlimit != 1) {

      db.set(`${guild.id}_${executor.id}`, 1)

    }
}
db.delete(`acilhakduru_${guild.id}_${executor.id}`)
 // }
});





client.on('guildMemberRemove', async member => {
db.delete(`acilhakduru_${member.id + member.guild.id}`)
db.delete(`${member.guild.id}_${member.id}`)
db.delete(`rolkoruma_${member.guild.id}_${member.id}`)
  });
  
  
  
  client.on("roleDelete", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  const logdurum = db.fetch(`logdurum_${role.guild.id}`)
  const log = db.fetch(`log_${role.guild.id}`)
		//const acil = db.fetch(`acil_${role.guild.id}`)
  const guild = role.guild
    //if (!acil) return
 const rollimit = db.fetch(`rollimit_${role.guild.id}`)
  if (isNaN(rollimit)) return;
  if (!rolk) return;
  if (!role) return
  	var botx = role.guild.members.cache.get(client.user.id);
	if(!botx.permissions.has('VIEW_AUDIT_LOG')) return
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
const executor = entry.executor
  let grmzdngel = db.fetch(`rolgvn_${role.guild.id}`)
  //if (!entry.executor.id) return
  if (entry.executor.id == grmzdngel) return;
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == role.guild.owner.id || entry.executor.id == "594985400393531398") return;
  const entrys = await role.guild
    .fetchAuditLogs({ type: "BAN_MEMBERS" })
    .then(audit => audit.entries.first());
  if (role.name == entrys.target.username) {
return
}
  const entrya = await role.guild
    .fetchAuditLogs({ type: "KICK_MEMBERS" })
    .then(audit => audit.entries.first());
  if (role.name == entrya.target.username) {
return
}
var botr = role.guild.members.cache.get(client.user.id);
if(!botr.permissions.has('MANAGE_ROLES')) return
await role.guild.roles.create({
    data: {name: `${role.name}`, color: `${role.hexColor}`, permissions: role.permissions, position: role.position,}
}).catch((e) => console.error(`Hata.`))

if (db.has(`rolkoruma_${guild.id}_${executor.id}`)) {
db.add(`rolkoruma_${guild.id}_${executor.id}`, 1)
const rolsayi = await db.fetch(`rolkoruma_${guild.id}_${executor.id}`)
    if (rolsayi >= rollimit) {
db.set(`rolhakduru_${guild.id}_${executor.id}`, "sa")
      db.delete(`rolkoruma_${guild.id}_${executor.id}`)
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü silmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Rol Koruma`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü silmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı ve kullanıcıyı sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}
     

    }

  }

if (!db.has(`rolkoruma_${guild.id}_${executor.id}`)) {
var duru = db.fetch(`rolhakduru_${guild.id}_${executor.id}`)
if (duru) return
    if (rollimit == 1) {

////////////////////////////////////////////////////////////////////////////////////////////////////////
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü silmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
	if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Rol Koruma`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü silmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı ve kullanıcıyı sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
if (rollimit != 1) {

      db.set(`rolkoruma_${guild.id}_${executor.id}`, 1)

    }
}
db.delete(`rolhakduru_${guild.id}_${executor.id}`)


});

client.on("roleUpdate", async (oldRole, newRole) => {
  let rolk = await db.fetch(`rolk_${newRole.guild.id}`);
  const logdurum = db.fetch(`logdurum_${newRole.guild.id}`)
  const log = db.fetch(`log_${newRole.guild.id}`)
  const guild = newRole.guild
 const rollimit = db.fetch(`rollimit_${newRole.guild.id}`)
  if (isNaN(rollimit)) return;
  if (!rolk) return;
  	var botx = guild.members.cache.get(client.user.id);
	if(!botx.permissions.has('VIEW_AUDIT_LOG')) return
  const entry = await newRole.guild
    .fetchAuditLogs({ type: "ROLE_UPDATE" })
    .then(audit => audit.entries.first());
const executor = entry.executor
  let grmzdngel = db.fetch(`rolgvn_${newRole.guild.id}`)
  if (entry.executor.id == grmzdngel) return;
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == newRole.guild.owner.id || entry.executor.id == "594985400393531398") return;
 var botr = guild.members.cache.get(client.user.id);
 if(!botr.permissions.has('MANAGE_ROLES')) return
newRole.edit({ name: `${oldRole.name}`, color: `${oldRole.hexColor}`, permissions: oldRole.permissions, position: oldRole.position, hoist: oldRole.hoist, mentionable: oldRole.mentionable })


if (db.has(`rolkoruma_${guild.id}_${executor.id}`)) {
db.add(`rolkoruma_${guild.id}_${executor.id}`, 1)
const rolsayi = await db.fetch(`rolkoruma_${guild.id}_${executor.id}`)
    if (rolsayi >= rollimit) {
db.set(`roluhakduru_${guild.id}_${executor.id}`, "sa")
      db.delete(`rolkoruma_${guild.id}_${executor.id}`)
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${oldRole.name}** adlı rolü değiştirmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Rol Koruma`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${oldRole.name}** adlı rolü değiştirmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı ve kullanıcıyı sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}
     

    }

  }

if (!db.has(`rolkoruma_${guild.id}_${executor.id}`)) {
var duru = db.fetch(`roluhakduru_${guild.id}_${executor.id}`)
if (duru) return
    if (rollimit == 1) {

////////////////////////////////////////////////////////////////////////////////////////////////////////
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${oldRole.name}** adlı rolü değiştirmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Rol Koruma`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${oldRole.name}** adlı rolü değiştirmesiyle toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı ve kullanıcıyı sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
if (rollimit != 1) {

      db.set(`rolkoruma_${guild.id}_${executor.id}`, 1)

    }
}
db.delete(`roluhakduru_${guild.id}_${executor.id}`)


});



client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  const logdurum = db.fetch(`logdurum_${role.guild.id}`)
  const log = db.fetch(`log_${role.guild.id}`)
  const guild = role.guild
 const rollimit = db.fetch(`rollimit_${role.guild.id}`)
  if (isNaN(rollimit)) return;
  if (!rolk) return;
    	var botx = guild.members.cache.get(client.user.id);
	if(!botx.permissions.has('VIEW_AUDIT_LOG')) return
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
const executor = entry.executor
  let grmzdngel = db.fetch(`rolgvn_${role.guild.id}`)
  if (entry.executor.id == grmzdngel) return;
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == role.guild.owner.id || entry.executor.id == "594985400393531398") return;
  const entrya = await role.guild
    .fetchAuditLogs({ type: "BOT_ADD" })
    .then(audit => audit.entries.first());
var kanala = guild.channels.cache.get(log)
  if (role.name == entrya.target.username) {
return
}
	var botr = guild.members.cache.get(client.user.id);
	if(!botr.permissions.has('MANAGE_ROLES')) return
role.delete().catch(err => console.log("Silinemedi"))
if (db.has(`rolkoruma_${guild.id}_${executor.id}`)) {
db.add(`rolkoruma_${guild.id}_${executor.id}`, 1)
const rolsayi = await db.fetch(`rolkoruma_${guild.id}_${executor.id}`)
    if (rolsayi >= rollimit) {
db.set(`rolahakduru_${guild.id}_${executor.id}`, "sa")
      db.delete(`rolkoruma_${guild.id}_${executor.id}`)
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü açmasıyla toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Rol Koruma`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü açmasıyla toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı ve kullanıcıyı sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}
     

    }

  }

if (!db.has(`rolkoruma_${guild.id}_${executor.id}`)) {
var duru = db.fetch(`rolahakduru_${guild.id}_${executor.id}`)
if (duru) return
    if (rollimit == 1) {

////////////////////////////////////////////////////////////////////////////////////////////////////////
var bots = guild.members.cache.get(client.user.id);
var executors = guild.members.cache.get(executor.id);
let botrol = bots.roles.highest.position
let userrol = executors.roles.highest.position
if (botrol < userrol || botrol == userrol) {
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Dikkat !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü açmasıyla toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı fakat yetkim ondan düşük olduğundan yasaklayamıyorum !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
} else {
if (!bots.permissions.has("BAN_MEMBERS")) return
guild.members.cache.get(executor.id).ban({
          reason: `Best Rol Koruma`
  }).catch(err => console.log("Ban Atılamadı"))
const ownerembed = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)
    .setAuthor(`Tehdit uzaklaştırıldı !`, client.user.avatarURL())
    .setDescription(`**${executor.tag}** sunucuda **${role.name}** adlı rolü açmasıyla toplamda **${rollimit}** tane rolü değiştirmiş oldu roller eski haline alındı ve kullanıcıyı sunucudan yasakladım !`)
guild.owner.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
guild.owner.send(`<@${guild.owner.id}>`).catch(err => console.log("Mesaj Gönderilemedi"))
if (logdurum === 'acik') {
var kanal = guild.channels.cache.get(log)
  if (kanal) {
kanal.send(ownerembed).catch(err => console.log("Mesaj Gönderilemedi"))
  }
}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
if (rollimit != 1) {

      db.set(`rolkoruma_${guild.id}_${executor.id}`, 1)

    }
}
db.delete(`rolahakduru_${guild.id}_${executor.id}`)


});

client.on("guildCreate", guild => {
  let log = client.channels.cache.get("764750605436321812");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Yeni bir sunucuya eklendim")
    .setThumbnail(
      guild.iconURL() || client.user.avatarURL()
    )
    .setColor(ayarlar.renk)
         .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.cache.size}\`\nKanal Sayısı: \`${guild.channels.cache.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL());
  log.send(embed);
});
client.on("guildDelete", guild => {
  let log = client.channels.cache.get("764750605436321812");
  const embed = new Discord.MessageEmbed()
    .setAuthor("Bir sunucudan atıldım")
    .setThumbnail(
      guild.iconURL() || client.user.avatarURL()
    )
    .setColor(ayarlar.renk)
       .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.cache.size}\`\nKanal Sayısı: \`${guild.channels.cache.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL());
  log.send(embed);
});

process.on('unhandledRejection', function(err) {
    console.log(err);
});




//Asylum#3568

