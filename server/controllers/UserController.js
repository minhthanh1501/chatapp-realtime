const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, profile_pic } = req.body;

  if (!name || !email || !password) throw new Error("Missing Input");
  const alreadyEmail = await UserModel.findOne({ email });

  if (alreadyEmail) throw new Error("Email Existed!");

  const user = await UserModel.create(req.body);

  return res.status(200).json({
    status: user ? true : false,
    message: user ? "Register Success!" : "Something went wrong",
    userData: user,
  });
});

const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const checkEmail = await UserModel.findOne({ email }).select("-password");

  if (!checkEmail) {
    return res.status(400).json({
      status: true,
      message: "User not exist",
      userData: null,
    });
  }

  return res.status(200).json({
    status: true,
    message: "Email verify",
    userData: checkEmail,
  });
});

const checkPassword = asyncHandler(async (req, res) => {
  const { password, userId } = req.body;

  const user = await UserModel.findById(userId);

  if (user && (await user.isCorrectPassword(password))) {
    const { email, password, ...userData } = user.toObject();

    const accessToken = generateAccessToken(user._id, email);

    const newRefreshToken = generateRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(
      user._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: true,
      message: "Login success!",
      accessToken,
      userData,
    });
  } else {
    throw new Error("Please check password");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Missing Input");
  const user = await UserModel.findOne({ email });
  if (user && (await user.isCorrectPassword(password))) {
    const { email, password, ...userData } = user.toObject();

    const accessToken = generateAccessToken(user._id, email);

    const newRefreshToken = generateRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(
      user._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      mes: "Login success!",
      accessToken,
      userData,
    });
  } else {
    throw new Error(`Invalid credentials!`);
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await UserModel.findById(_id).select("-password");

  return res.status(200).json({
    status: user ? true : false,
    message: user ? "Get User Current success!" : "Something Went Wrong",
    userData: user,
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

const updateUserCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await UserModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password");

  return res.status(200).json({
    status: response ? true : false,
    message: response ? "Update User Current success!" : "Something Went Wrong",
    userData: response,
  });
});

const searchUser = asyncHandler(async (req, res) => {
  const { search } = req.body;
  const response = await UserModel.find({
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
  updateUserCurrent,
  searchUser,
  checkEmail,
  checkPassword,
};
