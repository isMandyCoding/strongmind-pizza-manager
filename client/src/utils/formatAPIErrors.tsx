import { AxiosError } from "axios";

type ErrorDataDetail = {
  data: {
    detail: string | Array<any>;
  };
};

export class ErrorDetail {
  detail: string | Array<any>;
  constructor(error: ErrorDataDetail) {
    this.detail = error?.data?.detail;
  }
}

const reduceErrorDetailArray = (prevValue: string, currentValue: any) => {
  let currentConstraints = "";
  for (const key in currentValue.constraints) {
    if (Object.prototype.hasOwnProperty.call(currentValue.constraints, key)) {
      const constraint = currentValue.constraints[key];
      currentConstraints += constraint + ". ";
    }
  }
  prevValue += currentConstraints;
  return prevValue;
};

export const formatAPIErrors = (error: unknown, action: string): string => {
  let errorMessage = `There was an error ${action}`;

  if (!(error instanceof AxiosError)) {
    return errorMessage;
  }

  if (error.response?.status === 404) {
    errorMessage = error.response.data.error.message;
    return errorMessage;
  }

  if (error.response?.status !== 400) {
    return errorMessage;
  }

  const errorDetail = new ErrorDetail(error.response?.data.error);

  if (!errorDetail.detail) {
    return errorMessage;
  }

  if (typeof errorDetail.detail === "string") {
    errorMessage = errorDetail.detail;
    return errorMessage;
  }

  if (errorDetail.detail instanceof Array) {
    errorMessage = errorDetail.detail.reduce(reduceErrorDetailArray, "");
    return errorMessage;
  }

  return `There was an error ${action}`;
};
