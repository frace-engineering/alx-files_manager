import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.port = process.env.DB_PORT || 27017;
    this.host = process.env.DB_HOST || 'localhost';
    this.url = `mongodb://${this.host}:${this.port}`;
    this.dbname = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
  }

  isAlive() {
    return this.client.connect();
  }

  async nbUsers() {
    const db = this.client.db(this.dbname);
    const collection = db.collection('users');
    const usersCount = await collection.find().count();
    return usersCount;
  }

  async nbFiles() {
    const db = this.client.db(this.dbname);
    const collection = db.collection('files');
    const filesCount = await collection.find().count();
    return filesCount;
  }
}
const dbClient = new DBClient();
export default dbClient;
