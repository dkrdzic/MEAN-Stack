import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  id: {
    type: Number,
  },
  username: {
    type: String,
  },
  idBook: {
    type: Number,
  },
  comment: {
    type: String,
  },
  type: {
    type: String,
  },
});

export default mongoose.model("Comment", Comment);
