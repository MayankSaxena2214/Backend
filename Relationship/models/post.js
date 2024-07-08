const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/rDemo');
}

const userSchema = new Schema({
  username: String,
  email: String
});

const orderSchema = new Schema({
  username: String,
  email: String
});

const postSchema = new Schema({
  content: String,
  likes: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);



const addData = async () => {
  let user1 = new User({
    username: "sher",
    email: "p1@p1.com"
  });
  let post1 = new Post({
    content: "hello",
    likes: "10",
  });
  post1.user = user1;

  await user1.save();
  await post1.save();
};


addData();