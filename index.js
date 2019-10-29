const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const credentials = require("./credentials");
const insults = require("./insults.json");
const redditEngine = require("./lib/redditEngine");
const searchStatus = require("./lib/searchStatus");
const DBL = require("dblapi.js");

const dbl = new DBL(credentials.dblToken, client);

dbl.on("posted", () => {
  console.log("Server count posted to Discord Bot List API");
});

const botPerms = [
  "MANAGE_MESSAGES",
  "SEND_MESSAGES",
  "ADD_REACTIONS"
];

let randomInsult = Math.floor(Math.random() * Math.floor(insults.length));

client.on("ready", () => {
  console.log(`${client.user.tag} is online and ready to hurt your feelings`);

  client.user.setPresence({
    status: "Fapping",
    game: {
      name: "your mom",
      type: "WATCHING"
    }
  });

  serverCount = client.guilds.map(name => name.name);
  console.log(`Loaded ${insults.length} insults`);
  console.log(`Bot is in ${serverCount.length} servers`);
});

client.on("message", message => {
  (async () => {
    const prefix = "&";
    // If the author's a bot, return
    // If the message was not sent in a server, return
    // If the message doesn't start with the prefix, return
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.includes("525382819808280597")) {
      console.log("Someone is mentioning me");
      message
        .react("🇸")
        .then(() => message.react("🇹"))
        .then(() => message.react("🇫"))
        .then(() => message.react("🇺"))
        // .then(() => {
        //   message.react('493160851352846355')
        // })
        .catch(() => {
          console.log("Failed to react with emoji");
        });
    }
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
      console.log("Someone is requesting server count");
      try {
        if (!message.guild.me.permissions.has(botPerms)) {
          randomInsult++;
          console.log(randomInsult);

          if (randomInsult === insults.length) {
            randomInsult = 1;
          }
          return message.author.send(
            `**I need permissions, dumbass** \nI need to be able to **Read/Send/Manage** messages and Add Reactions \n_${insults[randomInsult].phrase}_ `
          );
        }
      } catch {
        console.log("Something goofed|catch @ index-line 84");
      }

      if (message.deletable) message.delete();

      message.channel.send(`I am in ${serverCount.length} servers`);
    }

    if (cmd === "ping") {
      // Send a message
      console.log("Someone is requesting latency");
      try {
        if (!message.guild.me.permissions.has(botPerms)) {
          randomInsult++;
          console.log(randomInsult);

          if (randomInsult === insults.length) {
            randomInsult = 1;
          }
          return message.author.send(
            `**I need permissions, dumbass** \nI need to be able to **Read/Send/Manage** messages and Add Reactions \n_${insults[randomInsult].phrase}_ `
          );
        }
      } catch {
        console.log("Something goofed|catch @ index-line 108");
      }

      if (message.deletable) message.delete();
      let msg = await message.channel.send(`🏓 Pinging....`);

      // Edit the message
      msg.edit(
        `🏓 Pong!\n My latency with Discord API is ${Math.round(client.ping)}ms`
      );
    }

    if (cmd === "insult") {
      console.log("Insulting someone");
      try {
        if (!message.guild.me.permissions.has(botPerms)) {
          randomInsult++;
          console.log(randomInsult);

          if (randomInsult > insults.length) {
            randomInsult = 1;
          }
          return message.author.send(
            `**I need permissions, dumbass** \nI need to be able to **Read/Send/Manage** messages and Add Reactions \n_${insults[randomInsult].phrase}_ `
          );
        }
      } catch {
        console.log("Something goofed|catch @ index-line 134");
      }

      randomInsult++;
      console.log(randomInsult);

      if (randomInsult === insults.length) {
        randomInsult = 1;
      }

      if (message.deletable) message.delete();

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
      console.log(`Fetching ${cmd}`);
      try {
        if (!message.guild.me.permissions.has(botPerms)) {
          randomInsult++;

          if (randomInsult === insults.length) {
            randomInsult = 1;
          }
          return message.author.send(
            `**I need permissions, dumbass** \nI need to be able to **Read/Send/Manage** messages and Add Reactions \n_${insults[randomInsult].phrase}_ `
          );
        }
      } catch {
        console.log("Something goofed|catch @ index-line 177");
      }

      let randomSearch = Math.floor(
        Math.random() * Math.floor(searchStatus.collection.length)
      );

      try {
        if (message.deletable) message.delete();
        let msg = await message.channel.send(
          searchStatus.collection[randomSearch]
        );
        payload = await redditEngine.fetcher(cmd);
        msg.edit(payload);
      } catch {
        message.channel.send(
          `**Something went wrong!** \nIf this continues to happen contact \n**Bomb | Halcyon** \n https://discord.gg/PtXnfJm`
        );
      }
    }
  })().catch(console.log);
});

client.login(credentials.token);
