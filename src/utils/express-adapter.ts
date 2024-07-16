import { Request, Response } from "express";

type Handler = (body: any) => Promise<any>;

export const expressAdapter =
  (handler: Handler) => async (request: Request, response: Response) => {
    try {
      const { body } = request;

      const payload = {
        body,
        params: request.params,
        userId: request.user && request.user.id ? request.user.id : null,
      };

      const output = await handler(payload);
      const { data, statusCode } = output;

      response.status(statusCode).json(data);
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  };
