export enum StatusEnum {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}

export type StatusEntry = {
  code: number;
  status: StatusEnum;
};

export const StatusCode = {
  // 2xx Success
  OK: {
    code: 200,
    status: "success",
  }, // Standard response for successful HTTP requests
  CREATED: {
    code: 201,
    status: StatusEnum.SUCCESS,
  }, // Request has succeeded and a new resource has been created
  ACCEPTED: {
    code: 202,
    status: StatusEnum.SUCCESS,
  }, // Request has been received but not yet acted upon
  // 4xx Client Errors
  BAD_REQUEST: {
    code: 400,
    status: StatusEnum.FAIL,
  }, // Server cannot process the request due to client error
  UNAUTHORIZED: { code: 401, status: StatusEnum.FAIL }, // Authentication is required and has failed or not been provided
  FORBIDDEN: {
    code: 403,
    status: "fail",
  }, // Server understood request but refuses to authorize it
  NOT_FOUND: {
    code: 404,
    status: "fail",
  }, // Requested resource could not be found,

  CONFLICT: {
    code: 409,
    status: StatusEnum.FAIL,
  },

  // 5xx Server Errors
  //Generic error message, given when an unexpected condition was encountered on the server.
  INTERNAL_SERVER_ERROR: {
    code: 500,
    status: StatusEnum.ERROR,
  },
};
