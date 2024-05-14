import dbClient from '../utils/db.js';
import redisClient from'../utils/redis.js';

const AppController = {
  async getStatus(req, res) {
    try {
      const redisAlive = await redisClient.isAlive();
      const mongoisAlive = await dbClient.isAlive();

      res.status(200).json({ redis: redisAlive, db: mongoisAlive });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getStats(req, res) {
    try {
      const userCount = await dbClient.nbUsers();
      const fileCount = await dbClient.nbFiles();

      res.status(200).json({ users: userCount, files: fileCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default AppController;
