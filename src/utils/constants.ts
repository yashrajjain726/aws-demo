class APIConstants {
  public static readonly PAGINATION_LIMIT = 20;
}

class Strings {
  public static readonly CONNECTION_ISSUE =
    "We are not able to make connection with database at the moment";
  public static readonly DB_SECRET_ISSUE =
    "There is some problem fetching database info";
  public static readonly SUCCESS_RESPONSE = "Request was successful";
  public static readonly UNAUTHORISED_USER =
    "User is not authorised to access this app";
  public static readonly SOMETHING_WENT_WRONG =
    "An error occured while processing the request";
  public static readonly BAD_REQUEST = "Bad Request";
}

class StatusCode {
  public static readonly SUCCESS = 200;
  public static readonly BAD_REQUEST = 400;
  public static readonly UNAUTHORISED = 401;
  public static readonly INTERNAL_ERROR = 500;
}

export { APIConstants, Strings, StatusCode };
