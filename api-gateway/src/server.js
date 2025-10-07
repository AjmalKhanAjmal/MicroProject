require("dotenv").config();
const express = require("express");
// const cors = require("cors");
// const Redis = require("ioredis");
// const helmet = require("helmet");
// const { rateLimit } = require("express-rate-limit");
// const { RedisStore } = require("rate-limit-redis");
// const logger = require("./utils/logger");
const proxy = require("express-http-proxy");
// const errorHandler = require("./middleware/errorhandler");
const { validateToken } = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

require("dotenv").config()
// const redisClient = new Redis(process.env.REDIS_URL);

console.log("step - 0  ")
// app.use(helmet());
// app.use(cors());
app.use(express.json());

//rate limiting
// const ratelimitOptions = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   handler: (req, res) => {
//     logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip}`);
//     res.status(429).json({ success: false, message: "Too many requests" });
//   },
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.call(...args),
//   }),
// });

// app.use(ratelimitOptions);

// app.use((req, res, next) => {
//   logger.info(`Received ${req.method} request to ${req.url}`);
//   logger.info(`Request body, ${req.body}`);
//   next();
// });

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err, res, next) => {
    // logger.error(`Proxy error: ${err.message}`);


    if (err.code === 'ECONNREFUSED') {
      res.status(503).json({
        success: false,
        message: "Service unavailable - Connection refused",
        error: err.message,
        detail: "The target service is not accepting connections. Please check if the service is running."
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error in proxy",
        error: err.message,
      });
    }
  },
};

console.log("step -2 ")
//setting up proxy for our identity service
app.use(
  "/v1/auth/register",
  proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      proxyReqOpts.headers["x-user-id"] = srcReq.userId;

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(
        `Response received from Identity service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
);

//setting up proxy for our post service
app.use(
  "/v1/saveProduct",
  validateToken,
  proxy(process.env.PRODUCT_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      //   proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      proxyReqOpts.headers["x-user-id"] = srcReq.user.username;


      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(
        `Response received from Post service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
);

app.use("/v1/menu_category",
  validateToken,
  proxy(process.env.MENU_ORGANIZER_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      //   proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      // console.log("srcReq.user.userId", srcReq.user.userId);
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      proxyReqOpts.headers["subscribed_application_id"] = srcReq.headers.application_id

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(
        `Response received from Post service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
)











//setting up proxy for our media service
// app.use(
//   "/v1/media",
//   validateToken,
//   proxy(process.env.MEDIA_SERVICE_URL, {
//     ...proxyOptions,
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
//       if (!srcReq.headers["content-type"].startsWith("multipart/form-data")) {
//         proxyReqOpts.headers["Content-Type"] = "application/json";
//       }

//       return proxyReqOpts;
//     },
//     userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
//       logger.info(
//         `Response received from media service: ${proxyRes.statusCode}`
//       );

//       return proxyResData;
//     },
//     parseReqBody: false,
//   })
// );

// //setting up proxy for our search service
// app.use(
//   "/v1/search",
//   validateToken,
//   proxy(process.env.SEARCH_SERVICE_URL, {
//     ...proxyOptions,
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       proxyReqOpts.headers["Content-Type"] = "application/json";
//       proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;

//       return proxyReqOpts;
//     },
//     userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
//       logger.info(
//         `Response received from Search service: ${proxyRes.statusCode}`
//       );

//       return proxyResData;
//     },
//   })
// );

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
  console.log(
    `Identity service is running on port ${process.env.IDENTITY_SERVICE_URL}`
  );
  console.log(
    `Post service is running on port ${process.env.PRODUCT_SERVICE_URL}`
  );
  // 


});
