const mongoose = require('mongoose')
require("dotenv").config()

async function connectDB() {
    try {
        // let MONGO_URI = "mongodb://localhost:27017/shop"
        let MONGO_URI =`${process.env.MONGO_HOST_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
        const db_connection = await mongoose.connect(MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })
        console.log(" connected to db ");
        
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
            process.exit(1); 
    }
}









// const mongoose = require("mongoose");
// const argon2 = require("argon2");

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     try {
//       this.password = await argon2.hash(this.password);
//     } catch (error) {
//       return next(error);
//     }
//   }
// });


// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await argon2.verify(this.password, candidatePassword);
//   } catch (error) {
//     throw error;
//   }
// };

// userSchema.index({ username: "text" });

// const User = mongoose.model("User", userSchema);
// module.exports = User;














// const RefreshToken = require("../models/RefreshToken");
// const User = require("../models/User");
// const generateTokens = require("../utils/generateToken");
// const logger = require("../utils/logger");
// const { validateRegistration, validatelogin } = require("../utils/validation");

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

//user login
const loginUser = async (req, res) => {
  logger.info("Login endpoint hit...");
  try {
    const { error } = validatelogin(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn("Invalid user");
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // user valid password or not
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      logger.warn("Invalid password");
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    res.json({
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (e) {
    logger.error("Login error occured", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

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

// module.exports = { resgiterUser, loginUser, refreshTokenUser, logoutUser };









module.exports = { connectDB }






















// // server.js or app.js

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const logger = require('winston');  // for logging, optional but recommended

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware to parse JSON requests
// app.use(express.json());

// // Set up logging (optional)
// logger.add(new logger.transports.Console({
//   format: logger.format.combine(
//     logger.format.colorize(),
//     logger.format.simple()
//   )
// }));

// // MongoDB connection function
// const connectDB = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     });

//     logger.info(`MongoDB connected: ${connection.connection.host}`);
//   } catch (error) {
//     logger.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1); // Exit the process in case of a fatal error
//   }
// };

// // Call the connect function
// connectDB();

// // Optional: Graceful shutdown handling
// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     logger.info('MongoDB connection closed due to app termination');
//     process.exit(0);
//   });
// });

// // Simple route for testing
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// // Start the server
// app.listen(process.env.PORT, () => {
//   logger.info(`Server started on port ${process.env.PORT}`);
// });
