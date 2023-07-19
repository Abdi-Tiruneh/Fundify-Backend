const cors = require("cors");

module.exports = function (app) {
  const corsOptions = {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  };

  // Enable CORS for all routes
  app.use(cors(corsOptions));
};
