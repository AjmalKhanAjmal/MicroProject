const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { RefreshToken } = require("../models/refreshToken");

const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "60m" }
  );


  let existing_token = await RefreshToken.findOne({
    user: user._id
  })

  let delete_existing_token = await RefreshToken.deleteOne({
    _id: existing_token._id
  })
  // console.log("delete_existing_token",delete_existing_token);


  const refreshToken = crypto.randomBytes(40).toString("hex");
  let expire_date = new Date();
  expire_date.setDate(expire_date.getDate() + 7) // refresh token expires in 7 days

  await RefreshToken.create({
    refresh_token: refreshToken,
    user: user._id,
    expires_at: expire_date
  })




  // /   const expiresAt = new Date();
  //   expiresAt.setDate(expiresAt.getDate() + 7); // refresh token expires in 7 days

  //   await RefreshToken.create({
  //     token: refreshToken,
  //     user: user._id,
  //     expiresAt,
  //   });


  // return { accessToken, refreshToken };

  return { accessToken, refreshToken };

};

module.exports = generateTokens;
