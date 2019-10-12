const snoo = require("snoowrap");
const credentials = require("../credentials");

console.log(credentials.token);

const r = new snoo({
  userAgent: credentials.userAgent,
  clientId: credentials.clientId,
  clientSecret: credentials.clientSecret,
  username: credentials.username,
  password: credentials.password
});

let memeLoop = 0;
let dadjokeLoop = 0;
let gifLoop = 0;
let funnyLoop = 0;
let tilLoop = 0;
let ihiLoop = 0;
let showerThoughtLoop = 0;

module.exports = {
  fetcher: async sub => {
    switch (sub) {
      case "dj":
        dadjokeLoop = dadjokeLoop + 1;
        if (dadjokeLoop > 25) {
          dadjokeLoop = 1;
        }

        payload = await r.getSubreddit("dadjokes").getHot()[dadjokeLoop];

        let joke = {
          setup: payload.title,
          punchline: payload.selftext
        };

        return `**${joke.setup}** _${joke.punchline}_`;

      case "st":
        showerThoughtLoop = showerThoughtLoop + 1;
        if (showerThoughtLoop > 25) {
          showerThoughtLoop = 1;
        }
        payload = await r.getSubreddit("showerthoughts").getHot()[
          showerThoughtLoop
        ];

        let thought = payload.title;

        return `**${thought}**`;

      case "ihi":
        response = "you typed ihi";
        return response;

      case "meme":
        response = "you typed meme";
        return response;

      case "gif":
        response = "you typed gif";
        return response;

      case "lol":
        response = "you typed lol";
        return response;

      case "til":
        response = "you typed til";
        return response;
    }
    r.getSubreddit(sub);
  }
};
