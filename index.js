const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const credentials = require("./credentials");
const insults = require("./insults.json");
const redditEngine = require("./lib/redditEngine");

let randomNumber = Math.floor(Math.random() * Math.floor(insults.length));
console.log(randomNumber);

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

client.on("message", async message => {
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
    const msg = await message.channel.send(`🏓 Pinging....`);

    // Edit the message
    msg.edit(`🏓 Pong!\nLatency is ${Math.round(client.ping)}ms`);
  }

  if (cmd === "insult") {
    randomNumber = randomNumber + 1;
    if (randomNumber > insults.length) {
      randomNumber === 0;
    }
    if (message.deletable) message.delete();
    if (message.content.includes("@")) {
      const mention = await message.mentions.users.find(user => user.username);

      message.channel.send(`${mention} ${insults[randomNumber].phrase}`);
    } else {
      message.reply(`${insults[randomNumber].phrase}`);
    }
  }

  //REDDIT LISTENERS////////////////////////////////////////////////////////////////////////

  if (cmd === "dj" || "st" || "ihi" || "meme" || "gif" || "lol" || "til") {
    if (message.deletable) message.delete();
    payload = await redditEngine.fetcher(cmd);
    // console.log(payload);
    message.channel.send(payload);
  }
});

client.login(credentials.token);
