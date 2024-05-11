import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient({ port: 6379, host: '127.0.0.1' });
    this.client.on('error', (error) => {
      console.error('Redis Error:', error);
    });
  }

  isAlive() {
    console.log('Connection status:', this.client.connected);
    try {
      return this.client.connected;
    } catch (error) {
      console.log('Redis Error:', error);
      throw error;
    }
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);

    try {
      const value = await getAsync(key);
      return value;
    } catch (error) {
      console.error('Redis Error:', error);
      throw error;
    }
  }

  async set(key, value, expiration) {
    const setAsync = promisify(this.client.set).bind(this.client);

    try {
      await setAsync(key, value, 'EX', expiration);
    } catch (error) {
      console.error('Redis Error:', error);
      throw error;
    }
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);

    try {
      await delAsync(key);
    } catch (error) {
      console.error('Redis Error:', error);
      throw error;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
