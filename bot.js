const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
      }
});


let logs = JSON.parse(fs.readFileSync(`./logs.json`, `utf8`)); // BY ! - NourEldien.#8007
client.on('message', message => {
  if(!logs[message.guild.id]) logs[message.guild.id] = {
  onoff: 'Off',
  channel: 'logs' // BY ! - NourEldien.#8007
  };
  if(logs[message.guild.id].onoff === 'Off') return;
  let logchannel = message.guild.channels.find("name", logs[message.guild.id].channel)
 
});
client.on('message', message => {
  client.on("roleCreate", rc => {
    const channel = rc.guild.channels.find("name", logs[message.guild.id].channel)
    if(channel) {
    var embed = new Discord.RichEmbed()
    .setTitle(rc.guild.name) // BY ! - NourEldien.#8007
    .setDescription(`***Created Role Name : *** **${rc.name}** `)
    .setColor(`RANDOM`)
    .setTimestamp(); // BY ! - NourEldien.#8007
    channel.sendEmbed(embed)
    }
    });
    //By S Codes
    client.on("roleDelete",  rd => {
    const channel = rd.guild.channels.find("name", logs[message.guild.id].channel)
    if(channel) {
    var embed = new Discord.RichEmbed()
    .setTitle(rd.guild.name)
    .setDescription(`***Deleted Role Name : *** **${rd.name}** `)
    .setColor(`RANDOM`)
    .setTimestamp(); // BY ! - NourEldien.#8007
    channel.sendEmbed(embed)
    }
    });
    // BY ! - NourEldien.#8007
  client.on("channelCreate",  cc => {
    const channel = cc.guild.channels.find("name", logs[message.guild.id].channel)
    if(channel) {
    var embed = new Discord.RichEmbed()
    .setTitle(cc.guild.name)
    .setDescription(`***Channel Created Name : *** **${cc.name}** ⬅️`)
    .setColor(`RANDOM`)
    .setTimestamp();
    channel.sendEmbed(embed)
    } // BY ! - NourEldien.#8007
    });
   
     client.on("deleteChannel",  dc => {
    const channel = dc.guild.channels.find("name", logs[message.guild.id].channel)
    if(channel) {
    var embed = new Discord.RichEmbed()
    .setTitle(dc.guild.name)
    .setDescription(`***Channel Deleted Name : *** **${dc.name}** ⬅️`)
    .setColor(`RANDOM`)
    .setTimestamp();
    channel.sendEmbed(embed)
    } // BY ! - NourEldien.#8007
    });
   
   
   
    client.on('messageUpdate', (message, newMessage) => {
      if (message.content === newMessage.content) return;
      if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
      const channel = message.guild.channels.find('name', logs[message.guild.id].channel);
      if (!channel) return;
   
      let embed = new Discord.RichEmbed()
         .setAuthor(`${message.author.tag}`, message.author.avatarURL)
         .setColor('SILVER')
         .setDescription(`✏ **تعديل رساله
  ارسلها <@${message.author.id}>                                                                                                                         تم تعديلها في شات** <#${message.channel.id}>\n\nقبل التعديل:\n \`${message.cleanContent}\`\n\nبعد التعديل:\n \`${newMessage.cleanContent}\``)
         .setTimestamp();
       channel.send({embed:embed});
   
    // BY ! - NourEldien.#8007 // BY ! - NourEldien.#8007
  });
   
  client.on('guildMemberAdd', member => {
      if (!member || !member.id || !member.guild) return;
      const guild = member.guild;
     
      const channel = member.guild.channels.find('name', logs[message.guild.id].channel);
      if (!channel) return;
      let memberavatar = member.user.avatarURL
      const fromNow = moment(member.user.createdTimestamp).fromNow();
      const isNew = (new Date() - member.user.createdTimestamp) < 900000 ? '🆕' : '';
     
      let embed = new Discord.RichEmbed()
         .setAuthor(`${member.user.tag}`, member.user.avatarURL)
         .setThumbnail(memberavatar)
         .setColor('GREEN')
         .setDescription(`📥 <@${member.user.id}> **Joined To The Server**\n\n`)
         .setTimestamp();
       channel.send({embed:embed});
  });
   
  client.on('guildMemberRemove', member => {
      if (!member || !member.id || !member.guild) return;
      const guild = member.guild;
     
      const channel = member.guild.channels.find('name', logs[message.guild.id].channel);
      if (!channel) return;
      let memberavatar = member.user.avatarURL
      const fromNow = moment(member.joinedTimestamp).fromNow();
     
      let embed = new Discord.RichEmbed()
         .setAuthor(`${member.user.tag}`, member.user.avatarURL)
         .setThumbnail(memberavatar)
         .setColor('RED')
         .setDescription(`📤 <@${member.user.id}> **Leave From Server**\n\n`)
         .setTimestamp();
       channel.send({embed:embed});
  });
   
  client.on('messageDelete', message => {
      if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
      const channel = message.guild.channels.find('name', logs[message.guild.id].channel);
      if (!channel) return;
     
      let embed = new Discord.RichEmbed()
         .setAuthor(`${message.author.tag}`, message.author.avatarURL)
         .setColor('BLACK')
         .setDescription(`🗑️ **حذف رساله**
  **ارسلها <@${message.author.id}>                                                                                                                        تم حذفها في شات** <#${message.channel.id}>\n\n \`${message.cleanContent}\``)
         .setTimestamp();
       channel.send({embed:embed});
   
  });
})
client.on('message', message => {
 
 
if(!message.guild) return; // BY ! - NourEldien.#8007 // BY ! - NourEldien.#8007
  if(!logs[message.guild.id]) logs[message.guild.id] = {
  onoff: 'Off',
  channel: 'logs'
  };
 
if(message.content.startsWith(prefix + 'setlogs')) {
         
  let perm = message.member.hasPermission(`ADMINISTRATOR`) || message.member.hasPermission(`MANAGE_SERVER`)
 
  if(!perm) return message.reply(`You don't have \`Manage_roles / Administrator\` Permission`);
  let args = message.content.split(" ").slice(1);
  if(!args.join(" ")) return message.reply(`:gear: **| Correct usage**:
\`=setlogs toggle / set <channel name>\``);
  let state = args[0];
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
 // BY ! - NourEldien.#8007 // BY ! - NourEldien.#8007 // BY ! - NourEldien.#8007
  if(!state.trim().toLowerCase() == 'toggle') return message.reply(`Please type a right state ON / OFF`) ;
    if(state.trim().toLowerCase() == 'toggle') {
     if(logs[message.guild.id].onoff === 'Off') return [message.channel.send(`:white_check_mark: **| Logs for this server has been turned on.**`), logs[message.guild.id].onoff = 'On'];
     if(logs[message.guild.id].onoff === 'On') return [message.channel.send(`:white_check_mark: **| Logs for this server has been turned off.**`), logs[message.guild.id].onoff = 'Off'];
    }
 
   if(state.trim().toLowerCase() == 'set') {
   let newChannel = message.content.split(" ").slice(2).join(" ");
   if(!newChannel) return message.reply(`:gear: **| To set the logging channel use**:
\`=setlogs set <channel name>\``);
     if(!message.guild.channels.find(`name`,newChannel)) return message.reply(`:mag_right: **| I can't find this channel.**`);
    logs[message.guild.id].role = newChannel;
     message.channel.send(`:shield: **| Logging channel has been changed to**:
\`${newChannel}\``);
   }
         }
    fs.writeFile("./logs.json", JSON.stringify(logs), (err) => {
    if (err) console.error(err);
  });
}); // BY ! - NourEldien.#8007 // BY ! - NourEldien.#8007


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);

