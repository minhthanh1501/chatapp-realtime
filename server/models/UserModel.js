const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide Name"],
    },
    email: {
      type: String,
      required: [true, "provide Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "provide Password"],
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods = {
  isCorrectPassword: async function (password) {
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
  },
};

//Export the model
module.exports = mongoose.model("User", userSchema);
