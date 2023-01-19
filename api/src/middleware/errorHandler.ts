import { ErrorRequestHandler } from "express";
import { ClientSafeError } from "../errors/ClientSafeError";

export const errorHandler: ErrorRequestHandler = (error, req, resp) => {
  console.error(error);

  const isClientSafeError = error instanceof ClientSafeError;

  const clientError: ClientSafeError = isClientSafeError
    ? error
    : new ClientSafeError()

  resp.status(clientError.status).send({error: clientError});
}