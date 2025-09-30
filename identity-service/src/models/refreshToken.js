const mongoose = require("mongoose")

const refreshTokenSchema = new mongoose.Schema({
    refresh_token: {
        type: String,
        require: false  //true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: false //true
    },
    expires_at: {
        type: Date,
        require: false  //true
    }
}, {
    timestamps: true
})


const RefreshToken  = mongoose.model('refresh_token',refreshTokenSchema)


module.exports = {RefreshToken}






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