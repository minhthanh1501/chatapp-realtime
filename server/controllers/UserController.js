const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { responseWithStatusMessageData } = require("../utils/responseTrait");
const { generateAccessToken } = require("../middlewares/jwt");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, profile_pic } = req.body;

  if (!name || !email || !password) throw new Error("Missing Input");
  const alreadyEmail = await User.findOne({ email });
  console.log(alreadyEmail);
  if (alreadyEmail) throw new Error("Email Existed!");

  const user = await User.create(req.body);

  responseWithStatusMessageData(
    req,
    res,
    200,
    user,
    "Register Success!",
    "Register Failed",
    user
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Missing Input");
  const user = await User.findOne({ email });
  if (user && (await user.isCorrectPassword(password))) {
    const { email, password, ...userData } = user.toObject();

    const accessToken = generateAccessToken(user._id, email);

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    // const cookieOptions = {
    //   http: true,
    //   secure: true,
    // };

    // return res.cookie("token", accessToken, cookieOptions).status(200).json({
    //   message: "Login successfully",
    //   token: accessToken,
    //   success: true,
    //   userData,
    // });
    responseWithStatusMessageData(
      req,
      res,
      200,
      user,
      "Login Success!",
      "Login Failed",
      accessToken,
      userData
    );
  } else {
    throw new Error(`Invalid credentials!`);
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).select("-password");

  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const logout = asyncHandler(async (req, res) => {
  // xoa refreshToken o cookie trinh duyet
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    mes: "Logout Success!",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password");

  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "User Not Found",
  });
});

const searchUser = asyncHandler(async (req, res) => {
  const { search } = req.body;
  const response = await User.find({
    $or: [
      { name: new RegExp(search, "i", "g") },
      { email: new RegExp(search, "i", "g") },
    ],
  })
    .select("-password")
    .exec();
  console.log(search);
  // console.log(response);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? response : "User Not Found",
  });
});

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
  searchUser,
};
