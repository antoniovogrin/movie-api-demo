import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IMovie } from "../models/Movie";

export const RequestValidator = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema
      .validateAsync(req.body)
      .then(() => next())
      .catch((error) => {
        console.error(error);
        return res.status(400).json({ message: "Bad request data" });
      });
  };
};

export const Schemas = {
  movie: Joi.object<IMovie>({
    title: Joi.string().required(),
    rank: Joi.number().required(),
    plot: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).required(),
    year: Joi.number().required(),
    avatar: Joi.string().required(),
    director: Joi.string().required(),
    writer: Joi.string().required(),
    imdbRating: Joi.number().required(),
    actors: Joi.array().items(Joi.string()).required()
  })
};
