import { Request, Response } from "express";
import mongoose from "mongoose";
import Movie from "../models/Movie";
import { MovieItemResponse } from "../objects/response";

interface GetAllMoviesQueryParams {
  limit?: number;
  page?: number;
  search?: string;
  sort?: string;
}

const getAllMovies = (req: Request, res: Response<MovieItemResponse[]>) => {
  const queryParams: GetAllMoviesQueryParams = req.query;

  const page = queryParams.page ? queryParams.page - 1 ?? 0 : 0;
  const limit = queryParams.limit ?? 20;
  const search = queryParams.search ?? "";
  const sort = queryParams.sort ?? "title";

  return Movie.find({ title: { $regex: search, $options: "i" } })
    .skip(page * limit)
    .limit(limit)
    .sort(sort)
    .then((movies) => {
      const response: MovieItemResponse[] = movies.map((it) => {
        return {
          id: it.id,
          title: it.title,
          avatar: it.avatar
        };
      });

      res.status(200).json(response);
    })
    .catch((error) => res.status(500).json(error));
};

const getMovieById = (req: Request, res: Response) => {
  const movieId = req.params.id;
  if (!movieId) res.status(500).json({ message: "id not found url params" });

  return Movie.findById(movieId)
    .then((movie) =>
      movie
        ? res.status(200).json(movie)
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json(error));
};

const createMovie = (req: Request, res: Response) => {
  const request = req.body;
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    ...request
  });

  return movie
    .save()
    .then((movie) => res.status(200).json(movie))
    .catch((error) => res.status(500).json(error));
};

const updateMovie = (req: Request, res: Response) => {
  const movieId = req.params.id;
  if (!movieId) res.status(500).json({ message: "id not found url params" });

  return Movie.findById(movieId)
    .then((movie) => {
      if (movie) {
        movie.set(req.body);
        return movie
          .save()
          .then((movie) => res.status(200).json(movie))
          .catch((error) => res.status(500).json(error));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json(error));
};

const deleteMovie = (req: Request, res: Response) => {
  const movieId = req.params.id;
  if (!movieId) res.status(500).json({ message: "id not found url params" });

  return Movie.findByIdAndDelete(movieId)
    .then((movie) =>
      movie
        ? res.status(200).json({ message: "successfully deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json(error));
};

export default {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
