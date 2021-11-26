import { Client, ClientConfig, Pool } from "pg";
import console from "console";

let DBUser = process.env.DB_USER;
let DBPassword = process.env.DB_PASSWORD;
let DBHost = process.env.DB_HOST;
let DBPort = process.env.DB_PORT;

let config: ClientConfig = {
  user: "table_admin",
  host: "localhost",
  database: "book_shop",
  password: "HeLLo!1",
  port: 5432,
};

export class BaseDao {
  private static client: Pool;

  constructor() {
    if (DBPort == undefined) {
      console.log("Can't read DBPort in Env file! I'll use default port!");
      // config.port = 5432;
    }

    if (DBPassword == undefined) {
      console.log(
        "Can't read DBPassword in Env file! I'll use default DBPassword!"
      );
    }

    if (DBHost == undefined) {
      console.log("Can't read DBHost in Env file! I'll use default DBHost!");
    }

    if (DBUser == undefined) {
      console.log("Can't read DBUser in Env file! I'll use default DBUser!");
    }

    // BaseDao.client = new Pool(config);
    // BaseDao.client.connect();
    // this.client.connect();
    // this.client.end();
  }

  private async connectDB() {
    BaseDao.client = new Pool(config);
    await BaseDao.client.connect();
  }

  public getClient() {
    if (!BaseDao.client) {
      console.log("Creating baseDAO...");
      BaseDao.client = new Pool(config);
    }

    this.connectDB();

    return BaseDao.client;
  }
}
