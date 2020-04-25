const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  guildId: String,
  prefix: String,
});

module.exports = mongoose.model("Guilds", guildSchema);
