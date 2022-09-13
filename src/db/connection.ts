import { ModelCtor, Sequelize } from "sequelize-typescript";
import Manager from "../secret/manager";
import { Strings } from "../utils/constants";
import * as pg from "pg";

class Connection {
  sequelize: Sequelize;
  private static instance: Connection;
  private constructor() {}

  static getInstance(): Connection {
    if (this.instance == null) {
      this.instance = new this();
    }
    return this.instance;
  }

  async dbConnect(tableModels: ModelCtor[]): Promise<any> {
    try {
      // let secretId = Manager.getInstance().getDBSecretName();
      // let secret = await Manager.getInstance().getDBSecretValues(secretId);
      // let parser = JSON.parse(secret);
      // console.log(parser);
      let parser = {
        dbInstanceIdentifier: "main-db",
        username: "postgres",
        password: "adminbijak",
        host: "db-instance.cxlc2tgoe6py.ap-south-1.rds.amazonaws.com",
      };
      this.sequelize = await this.dbConfiguration(parser, tableModels);
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return this.sequelize;
    } catch (err) {
      console.error("Unable to connect to the database:", err);
      throw Error(Strings.CONNECTION_ISSUE);
    }
  }
  async dbConfiguration(
    secret: any,
    tableModels: ModelCtor[]
  ): Promise<Sequelize> {
    let sequelize = new Sequelize(
      secret.dbInstanceIdentifier,
      secret.username,
      secret.password,
      {
        host: secret.host,
        dialect: "postgres",
        models: tableModels,
        dialectModule: pg,
        dialectOptions: {
          useUTC: false,
        },
        timezone: "+05:30",
      }
    );
    return sequelize;
  }
}
export default Connection;
