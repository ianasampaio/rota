import { Request, Response } from "express";
import { validationResult } from "express-validator";

type Handler = (body: any, id?: any, user?: any) => Promise<any>;

export const expressAdapter =
  (handler: Handler) => async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return response.status(422).json({ errors: errorMessages });
    }

    try {
      const { body } = request;

      const { id } = request.params;

      const { user } = request;

      const output = id ? await handler(id, body) : await handler(user, body);
      const { data, statusCode } = output;

      response.status(statusCode).json(data);
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  };
