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
const aws = require("aws-sdk");
const constants_1 = require("../utils/constants");
class Manager {
    constructor() { }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
    getDBSecretName() {
        return "db-instance-secret";
    }
    getDBSecretValues(SecretId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let secret;
            try {
                let client = new aws.SecretsManager({ region: "ap-south-1" });
                let res = yield client.getSecretValue({ SecretId: SecretId }).promise();
                if ("SecretConfig" in res) {
                    secret = res;
                }
                else {
                    if (res.SecretBinary != null) {
                        let buff = new Buffer((_a = res.SecretBinary) === null || _a === void 0 ? void 0 : _a.toString(), "base64");
                        secret = buff.toString("ascii");
                    }
                    else {
                        console.log("cannot parse secret");
                        throw Error(constants_1.Strings.DB_SECRET_ISSUE);
                    }
                }
            }
            catch (err) {
                console.log(err.toString());
                if (err.code === "DecryptionFailureException")
                    // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === "InternalServiceErrorException")
                    // An error occurred on the server side.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === "InvalidParameterException")
                    // You provided an invalid value for a parameter.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === "InvalidRequestException")
                    // You provided a parameter value that is not valid for the current state of the resource.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else if (err.code === "ResourceNotFoundException")
                    // We can't find the resource that you asked for.
                    // Deal with the exception here, and/or rethrow at your discretion.
                    throw err;
                else
                    throw Error(constants_1.Strings.DB_SECRET_ISSUE);
            }
            return secret;
        });
    }
}
exports.default = Manager;
//# sourceMappingURL=manager.js.map