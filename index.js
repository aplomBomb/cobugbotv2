const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const credentials = require("./credentials");
const insults = require("./insults.json");
const redditEngine = require("./lib/redditEngine");
const stats = require("./lib/stats");

const searchFeedback = [
  "🔎*looking around...*",
  "🧲*attracting results...*",
  "📡*contacting nasa...*",
  "📻*analyzing airwaves...*",
  "📞*making a call...*",
  "🔮*looking into the future*",
  "🔦*checking in all the scary spots...*",
  "⏱*taking as long as I heckin' want...*",
  "🔬*researching...*",
  "📠*faxing your mom...*",
  "🧭*getting bearings*",
  "🔭*gazing into the vacuum of space...*",
  "🛒*shopping for data...*",
  "🔑*where did I put my keys...*",
  "📫*snail-mail might be faster...*"
];

let randomInsult = Math.floor(Math.random() * Math.floor(insults.length));

client.on("ready", () => {
  console.log(`${client.user.tag} is online and ready to hurt your feelings`);

  client.user.setPresence({
    status: "Fapping",
    game: {
      name: "getting developed",
      type: "WATCHING"
    }
  });

  serverCount = client.guilds.map(name => name.name);
  console.log(`Loaded ${insults.length} insults`);
  console.log(`Bot is in ${serverCount.length} servers`);
});

client.on("message", message => {
  (async () => {
    const prefix = "//";
    // If the author's a bot, return
    // If the message was not sent in a server, return
    // If the message doesn't start with the prefix, return
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // Arguments and command variable
    // cmd is the first word in the message, aka the command
    // args is an array of words after the command
    // !say hello I am a bot
    // cmd == say (because the prefix is sliced off)
    // args == ["hello", "I", "am", "a", "bot"]
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "servers") {
      if (message.deletable) message.delete();
      message.channel.send(`I am in ${serverCount.length} servers`);
    }

    if (cmd === "ping") {
      // Send a message
      if (message.deletable) message.delete();
      let msg = await message.channel.send(`🏓 Pinging....`);

      // Edit the message
      msg.edit(`🏓 Pong!\nLatency is ${Math.round(client.ping)}ms`);
    }

    if (cmd === "insult") {
      if (message.deletable) message.delete();

      randomInsult === randomInsult + 1;

      if (randomInsult > insults.length) {
        randomInsult === 0;
      }

      if (message.content.includes("@")) {
        const mention = message.mentions.users.find(user => user.username);

        message.channel.send(`${mention} ${insults[randomInsult].phrase}`);
      } else {
        message.reply(`${insults[randomInsult].phrase}`);
      }
    }

    //REDDIT LISTENERS////////////////////////////////////////////////////////////////////////

    if (
      cmd === "dj" ||
      cmd === "st" ||
      cmd === "ihi" ||
      cmd === "meme" ||
      cmd === "gif" ||
      cmd === "til"
    ) {
      let randomSearch = Math.floor(
        Math.random() * Math.floor(searchFeedback.length)
      );
      try {
        if (message.deletable) message.delete();
        let msg = await message.channel.send(searchFeedback[randomSearch]);
        payload = await redditEngine.fetcher(cmd);
        msg.edit(payload);
      } catch (e) {
        console.log(e);
      }
    }
  })().catch(console.log);
});

client.login(credentials.token);
