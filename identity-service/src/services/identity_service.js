const generateTokens = require("../utills/generateToken")
const { User } = require("../models/user")
const { Buffer } = require('buffer');
const {RefreshToken} = require("../models/refreshToken")
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

    console.log(user);
    
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
      status:"error",
      message:e.message,
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

   
    let user = await User.findOne({
      email
    })


    if (!user) {
      throw new Error("invalid email ")
    }

    let isValidCredentails = await user.comparePassword(password)

    
    if (!isValidCredentails) {
      throw new Error("invalid password ")
    }


    
    let  { accessToken , refreshToken} =await generateTokens(user)

    res.status(200).json({
      status: "success",
      accessToken:accessToken,
      refreshToken : refreshToken,
      user : user._id
    })




  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}





const refreshToken = async (req,res)=>{
  try{
    if(req && req.body && req.body.refresh_token){
      let refresh_token = req.body.refresh_token

      
      let refresh_token_details = await RefreshToken.findOne(
        {refresh_token}
      )
      if(!refresh_token_details){
        let error = new Error("invalid refresh_token")
        error.status = 401
        throw error
      }

      
      let userDetails = await User.findById({
      _id :  refresh_token_details.user
     })

if(!userDetails){
        let error = new Error("invalid user token")
        error.status = 401
        throw error
}

function isTokenExpired(refresh_token_details){
        if(refresh_token_details.expires_at && refresh_token_details.createdAt  ){
        let check_date = new Date(refresh_token_details.createdAt)
        check_date.setDate(check_date.getDate() + 7 )
      if(check_date > refresh_token_details.expires_at && refresh_token_details.expires_at > new Date() ){
        return true
      }else{
        return  false
      }
      }
    }
   
      if(!isTokenExpired(refresh_token_details)){
        let error = new Error("refresh_token expired need to login again")
        error.status = 401
        throw error
      }


const { accessToken, refreshToken } = await generateTokens(userDetails)

      res.status(200).json({ accessToken : refresh_token_details, refreshToken })
      
    }else{
      let error = new Error("missing refresh_token")
      error.status = 401
      throw error
    }
  }
  catch(error){
    res.status(error.status || 500).json({
      status : "error",
      message : error.message
    })
  }
}



const logoutUser = async (req, res) => {
  logger.info("Logout endpoint hit...");
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn("Refresh token missing");
      return res.status(400).json({
        success: false,
        message: "Refresh token missing",
      });
    }

   const storedToken = await RefreshToken.findOneAndDelete({
      token: refreshToken,
    });
    if (!storedToken) {
      logger.warn("Invalid refresh token provided");
      return res.status(400).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    logger.info("Refresh token deleted for logout");

    res.json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (e) {
    logger.error("Error while logging out", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



























module.exports = { resgiterUser, fetchUser, loginUser,refreshToken,logoutUser}





































// //user registration
// const resgiterUser = async (req, res) => {
//   logger.info("Registration endpoint hit...");
//   try {
//     //validate the schema
//     const { error } = validateRegistration(req.body);
//     if (error) {
//       logger.warn("Validation error", error.details[0].message);
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }
//     const { email, password, username } = req.body;

//     let user = await User.findOne({ $or: [{ email }, { username }] });
//     if (user) {
//       logger.warn("User already exists");
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     user = new User({ username, email, password });
//     await user.save();
//     logger.warn("User saved successfully", user._id);

//     const { accessToken, refreshToken } = await generateTokens(user);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully!",
//       accessToken,
//       refreshToken,
//     });
//   } catch (e) {
//     logger.error("Registration error occured", e);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// //user login
// const loginUser = async (req, res) => {
//   logger.info("Login endpoint hit...");
//   try {
//     const { error } = validatelogin(req.body);
//     if (error) {
//       logger.warn("Validation error", error.details[0].message);
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       logger.warn("Invalid user");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // user valid password or not
//     const isValidPassword = await user.comparePassword(password);
//     if (!isValidPassword) {
//       logger.warn("Invalid password");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     const { accessToken, refreshToken } = await generateTokens(user);

//     res.json({
//       accessToken,
//       refreshToken,
//       userId: user._id,
//     });
//   } catch (e) {
//     logger.error("Login error occured", e);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// //refresh token
// const refreshTokenUser = async (req, res) => {
//   logger.info("Refresh token endpoint hit...");
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//       logger.warn("Refresh token missing");
//       return res.status(400).json({
//         success: false,
//         message: "Refresh token missing",
//       });
//     }

//     const storedToken = await RefreshToken.findOne({ token: refreshToken });

//     const storedToken = await RefreshToken.deleteOne({ token: refreshToken });
    
//     if (!storedToken) {
//       logger.warn("Invalid refresh token provided");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid refresh token",
//       });
//     }

//     if (!storedToken || storedToken.expiresAt < new Date()) {
//       logger.warn("Invalid or expired refresh token");

//       return res.status(401).json({
//         success: false,
//         message: `Invalid or expired refresh token`,
//       });
//     }

//     const user = await User.findById(storedToken.user);

//     if (!user) {
//       logger.warn("User not found");

//       return res.status(401).json({
//         success: false,
//         message: `User not found`,
//       });
//     }

//     const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//       await generateTokens(user);

//     //delete the old refresh token
//     await RefreshToken.deleteOne({ _id: storedToken._id });

//     res.json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   } catch (e) {
//     logger.error("Refresh token error occured", e);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// //logout

// const logoutUser = async (req, res) => {
//   logger.info("Logout endpoint hit...");
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//       logger.warn("Refresh token missing");
//       return res.status(400).json({
//         success: false,
//         message: "Refresh token missing",
//       });
//     }

//    const storedToken = await RefreshToken.findOneAndDelete({
//       token: refreshToken,
//     });
//     if (!storedToken) {
//       logger.warn("Invalid refresh token provided");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid refresh token",
//       });
//     }
//     logger.info("Refresh token deleted for logout");

//     res.json({
//       success: true,
//       message: "Logged out successfully!",
//     });
//   } catch (e) {
//     logger.error("Error while logging out", e);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };




// const mongoose = require("mongoose");

// const refreshTokenSchema = new mongoose.Schema(
//   {
//     token: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     expiresAt: {
//       type: Date,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
// module.exports = RefreshToken;