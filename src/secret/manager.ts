import * as aws from "aws-sdk";
import { Strings } from "../utils/constants";
class Manager {
  private static instance: Manager;
  private constructor() {}
  static getInstance(): Manager {
    if (this.instance == null) {
      this.instance = new this();
    }
    return this.instance;
  }
  getDBSecretName() {
    return "db-instance-secret";
  }
  async getDBSecretValues(SecretId) {
    let secret;
    try {
      let client = new aws.SecretsManager({ region: "ap-south-1" });
      let res = await client.getSecretValue({ SecretId: SecretId }).promise();
      if ("SecretConfig" in res) {
        secret = res;
      } else {
        if (res.SecretBinary != null) {
          let buff = new Buffer(res.SecretBinary?.toString(), "base64");
          secret = buff.toString("ascii");
        } else {
          console.log("cannot parse secret");
          throw Error(Strings.DB_SECRET_ISSUE);
        }
      }
    } catch (err) {
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
      else throw Error(Strings.DB_SECRET_ISSUE);
    }
    return secret;
  }
}

export default Manager;
