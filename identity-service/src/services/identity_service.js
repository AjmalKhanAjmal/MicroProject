const generateTokens = require("../utills/generateToken")
const { User } = require("../models/user")
//user registration
const resgiterUser = async (req, res) => {
  //   logger.info("Registration endpoint hit...");
  try {
    //validate the schema
    // const { error } = validateRegistration(req.body);
    // if (error) {
    //   logger.warn("Validation error", error.details[0].message);
    //   return res.status(400).json({
    //     success: false,
    //     message: error.details[0].message,
    //   });
    // }

    const { email, password, username } = req.body;

    // let user = await User.findOne({ $or: [{ email }, { username }] });
    // if (user) {
    //   logger.warn("User already exists");
    //   return res.status(400).json({
    //     success: false,
    //     message: "User already exists",
    //   });
    // }

    let user = new User({ username, email, password });
    // user = { username, email, password }

    await user.save();
    // logger.warn("User saved successfully", user._id);

    // const { accessToken, refreshToken } = await generateTokens(user);
    const { accessToken } = await generateTokens(user);

    // console.log(accessToken);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: user,
      accessToken,
      //   refreshToken,
    });
  } catch (e) {
    // logger.error("Registration error occured", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const fetchUser = async (req, res) => {
  try {
    let userDetails = await User.find()
    res.status(200).json({
      status: "success",
      user: userDetails
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new Error(" must email and passsword required ")
    }

    let user = User.findOne({
      email
    })

    if (!user) {
      throw new Error("invalid email ")
    }

    let isValidCredentails = await user.comparePassword(password)

    
    if (!isValidCredentails) {
      throw new Error("invalid password ")
    }

    res.status(500).json({
      status: "success",
      message:user
    })

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}
module.exports = { resgiterUser, fetchUser, loginUser }