require('dotenv').config();

module.exports = {
  mongoURI: `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PWD)}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
  redisPort         : process.env.REDIS_PORT,
  redisHost         : process.env.REDIS_HOST,
  redisPWD          : process.env.REDIS_PWD,
  secret            : process.env.SECRET_TOKEN,
  refreshTokenSecret: process.env.SECRET_REFRESHTOKEN,
  tokenLife         : process.env.TOKEN_LIFE || 50000,        // 15 phút
  refreshTokenLife  : process.env.REFRESHTOKEN_LIFE || 86400, //  một ngày
  portListen        : process.env.APP_PORT || 3001
};
