"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("../utils/constants");
const pg = require("pg");
class Connection {
    constructor() { }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
    dbConnect(tableModels) {
        return __awaiter(this, void 0, void 0, function* () {
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
                this.sequelize = yield this.dbConfiguration(parser, tableModels);
                yield this.sequelize.authenticate();
                console.log("Connection has been established successfully.");
                return this.sequelize;
            }
            catch (err) {
                console.error("Unable to connect to the database:", err);
                throw Error(constants_1.Strings.CONNECTION_ISSUE);
            }
        });
    }
    dbConfiguration(secret, tableModels) {
        return __awaiter(this, void 0, void 0, function* () {
            let sequelize = new sequelize_typescript_1.Sequelize(secret.dbInstanceIdentifier, secret.username, secret.password, {
                host: secret.host,
                dialect: "postgres",
                models: tableModels,
                dialectModule: pg,
                dialectOptions: {
                    useUTC: false,
                },
                timezone: "+05:30",
            });
            return sequelize;
        });
    }
}
exports.default = Connection;
//# sourceMappingURL=connection.js.map