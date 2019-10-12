const Discord = require("discord.js");
const client = new Discord.Client();
const credentials = require("./credentials");
const prefix = "//";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  serverCount = client.guilds.map(name => name.name);
  console.log(serverCount.length);
});

client.on("message", msg => {
  if (msg.content === prefix + "servers") {
    msg.reply(serverCount.length);
  }
});

client.login(credentials.token);
