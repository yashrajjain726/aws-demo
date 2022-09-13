"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.Strings = exports.APIConstants = void 0;
class APIConstants {
}
exports.APIConstants = APIConstants;
APIConstants.PAGINATION_LIMIT = 20;
class Strings {
}
exports.Strings = Strings;
Strings.CONNECTION_ISSUE = "We are not able to make connection with database at the moment";
Strings.DB_SECRET_ISSUE = "There is some problem fetching database info";
Strings.SUCCESS_RESPONSE = "Request was successful";
Strings.UNAUTHORISED_USER = "User is not authorised to access this app";
Strings.SOMETHING_WENT_WRONG = "An error occured while processing the request";
Strings.BAD_REQUEST = "Bad Request";
class StatusCode {
}
exports.StatusCode = StatusCode;
StatusCode.SUCCESS = 200;
StatusCode.BAD_REQUEST = 400;
StatusCode.UNAUTHORISED = 401;
StatusCode.INTERNAL_ERROR = 500;
//# sourceMappingURL=constants.js.map