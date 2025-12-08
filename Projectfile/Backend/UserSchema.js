// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     usertype: { type: String, required: true },
//     password: { type: String, required: true },
//     approval: {type: String, default: 'approved'}
// });
// export const User =  mongoose.model('users', userSchema);
// export default User;
// server/models/UserSchema.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email:    { type: String, required: true, unique: true },
//   usertype: { type: String, required: true },
//   password: { type: String, required: true },
//   approval: { type: String, default: "approved" }
// }, { timestamps: true });

// // model name "User" (singular) is conventional; collection will be pluralized by mongoose
// const User = mongoose.model("User", userSchema);

// server/models/UserSchema.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  usertype: { type: String, required: true },
  password: { type: String, required: true },
  approval: { type: String, default: "approved" }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;