import mongoose from "mongoose";

//defining the db schema
const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String,
});

//collection inside the db
export default mongoose.model("tiktokVideos", tiktokSchema);
