const snoo = require("snoowrap");
const credentials = require("../credentials");
const insults = require("../insults");
const stats = require("./stats");

let randomInsult = Math.floor(Math.random() * Math.floor(insults.length));

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
let tilLoop = 0;
let ihiLoop = 0;
let showerThoughtLoop = 0;
// let ciLoop = 1;             not using atm

const badUrl1 = "https://v.redd.it";
const badUrl2 = "https://www.reddit.com";

module.exports = {
  fetcher: async sub => {
    randomInsult = randomInsult++;
    if (randomInsult === insults.length) {
      randomInsult === 1;
    }
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

        return `**${joke.setup}** \n_${joke.punchline}_`;

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
        ihiLoop = ihiLoop + 1;
        if (ihiLoop > 25) {
          ihiLoop = 1;
        }
        payload = await r.getSubreddit("tihi").getHot()[ihiLoop];
        if (payload.url.includes(badUrl1) || payload.url.includes(badUrl2)) {
          payload = `**${insults[randomInsult].phrase}**`;
          console.log("Post failed integrity check, insulting user instead");
        } else {
          payload = `${payload.url}`;
        }

        return payload;

      case "meme":
        memeLoop = memeLoop + 1;
        if (memeLoop > 25) {
          memeLoop = 1;
        }

        payload = await r.getSubreddit("memes").getHot()[memeLoop];

        if (payload.url.includes(badUrl1) || payload.url.includes(badUrl2)) {
          payload = `**${insults[randomInsult].phrase}**`;
        } else {
          payload = `${payload.url}`;
        }

        return payload;

      case "gif":
        gifLoop = gifLoop + 1;
        if (gifLoop > 25) {
          gifLoop = 1;
        }

        payload = await r.getSubreddit("gifs").getHot()[gifLoop];

        if (payload.url.includes(badUrl1) || payload.url.includes(badUrl2)) {
          payload = `**${insults[randomInsult].phrase}**`;
        } else {
          payload = `${payload.url}`;
        }

        return payload;

      // case "ci":
      //   ciLoop = ciLoop + 1;
      //   if (ciLoop > 25) {
      //     ciLoop = 2;
      //   }

      //   Not using atm ////////

      //   return payload;

      case "til":
        tilLoop = tilLoop + 1;
        if (tilLoop > 25) {
          tilLoop = 1;
        }

        payload = await r.getSubreddit("todayilearned").getHot()[tilLoop];

        if (payload.url.includes(badUrl1) || payload.url.includes(badUrl2)) {
          payload = `**${insults[randomInsult].phrase}**`;
        } else {
          payload = `${payload.title}`;
        }

        return payload;
    }
  }
};
