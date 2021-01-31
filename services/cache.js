const redisClient = require('./redis')
const mongoose = require("mongoose");
const keys = require("../config/keys");
const util = require("util");

const client = redisClient.create(keys.redisHost, keys.redisPort, keys.redisPWD)
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function(options = { time: 60 }) {
  this.useCache = true;
  this.time = options.time;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
  return this;
};
mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }
  const key = JSON.stringify({
    ...this.getQuery()
  });
  
  const cacheValue = await client.hget(this.hashKey, key);
  if (cacheValue) {
    doc = JSON.parse(cacheValue)
    
    
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model({doc});
  }
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, this.time);
  return result;
};
module.exports = {
  clearKey(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};