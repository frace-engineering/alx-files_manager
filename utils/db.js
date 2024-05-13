import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.port = process.env.DB_PORT || 27017;
    this.host = process.env.DB_HOST || 'localhost';
    this.url = `mongodb://${this.host}:${this.port}`;
    this.dbname = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
  }


  async isAlive() {
    try {
      const client = await this.client.connect();
      return client;
    } catch (error) {
      throw error;
    }
  }

  async nbUsers() {
    try {
      const client = await this.client.connect();
      const db = client.db(this.dbname);
      const collection = db.collection('users');
      const count = collection.find().count();
      return count;
    } catch (error) {
      throw error;
    }
  }

  async nbFiles() {
    try {
      const client = await this.client.connect();
      const db = client.db(this.dbname);
      const collection = db.collection('files');
      const count = collection.find().count();
      return count;
    } catch (error) {
      throw error;
    }
  }

}
const dbClient = new DBClient();
export default dbClient; 
