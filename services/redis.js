const redis = require("redis");

let _redisClient;

const redisClient = {
  create(host,port,pwd) {
    if (!_redisClient){
      console.log('Redis conexion created')
    _redisClient = redis.createClient({
        host: host,
        port: port,
        retry_strategy: () => 1000,
        password: pwd
      })
    return _redisClient;
    }
  },
  close() {
    _redisClient.close();
  }
};

module.exports = redisClient;