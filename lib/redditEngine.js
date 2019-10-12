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

let memeLoop = 1;
let dadjokeLoop = 1;
let gifLoop = 1;
let funnyLoop = 1;
let tilLoop = 1;
let ihiLoop = 1;
let showerThoughtLoop = 2;

module.exports = {
  fetcher: async sub => {
    switch (sub) {
      case "dj":
        dadjokeLoop = dadjokeLoop + 1;

        payload = await r.getSubreddit("dadjokes").getHot();

        return payload;

        break;
      case "st":
        response = "you typed st";
        return response;
        break;
      case "ihi":
        response = "you typed ihi";
        return response;
        break;
      case "meme":
        response = "you typed meme";
        return response;
        break;
      case "gif":
        response = "you typed gif";
        return response;
        break;
      case "lol":
        response = "you typed lol";
        return response;
        break;
      case "til":
        response = "you typed til";
        return response;
        break;
    }
    r.getSubreddit(sub);
  }
};
