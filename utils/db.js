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
    const isConnected =  this.client.connect();
    return !!isConnected;
  }

  async nbUsers() {
    //const client = this.client.connect();
    const db = this.client.db(this.dbname);
    const collection = db.collection('users');
    const usersCount = await collection.find().count();
    return usersCount;
  }

  async nbFiles() {
    //const client = await this.client.connect();
    const db = this.client.db(this.dbname);
    const collection = db.collection('files');
    const filesCount = await collection.find().count();
    return filesCount;
  }

}
const dbClient = new DBClient();
export default dbClient;
