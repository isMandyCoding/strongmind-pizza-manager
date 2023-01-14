type ErrorData = {[key: string]: any};
export const PG_DUPLICATE_KEY_CODE = '23505';

export interface ClientSafeParams {
  message?: string;
  code?: string | number;
  status?: number;
  data?: ErrorData;
}

export class ClientSafeError extends Error {
  public message: string;
  public code: string | number;
  public status: number;
  public data?: ErrorData;
  constructor(params?: ClientSafeParams) {
    super();
    this.message = params?.message ?? 'There was an internal error';
    this.code = params?.code ?? 'INTERNAL_ERROR';
    this.status = params?.status ?? 500;
    this.data = params?.data ?? {};
  }
}

export class RouteNotFoundError extends ClientSafeError {
  constructor(originalUrl: string) {
    super({
      message: `Route ${originalUrl} does not exist.`,
      code: "ROUTE_NOT_FOUND",
      status: 404,
    });
  }
}

export class BadUserInputError extends ClientSafeError {
  constructor(errorData: ErrorData) {
    super({
      message: `There was invalid user input`,
      code: "BAD_USER_INPUT",
      status: 400,
      data: errorData,
    });
  }
}

export class EntityNotFoundError extends ClientSafeError {
  constructor(entityName: string) {
    super({
      message: `${entityName} not found`,
      code: "ENTITY_NOT_FOUND",
      status: 404,
    });
  }
}

