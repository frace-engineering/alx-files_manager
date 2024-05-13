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
    const client = await this.client.connect();
    return client;
  }

  async nbUsers() {
    const client = await this.client.connect();
    const db = client.db(this.dbname);
    const collection = db.collection('users');
    const count = collection.find().count();
    return count;
  }

  async nbFiles() {
    const client = await this.client.connect();
    const db = client.db(this.dbname);
    const collection = db.collection('files');
    const count = collection.find().count();
    return count;
  }
}
const dbClient = new DBClient();
export default dbClient;
