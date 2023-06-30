import express, { Request, Response, NextFunction } from "express";
import http from "http";
import movieRoutes from "./v1/routes/Movie";
import { config } from "./config/config";
import mongoose from "mongoose";
import Movie, { IMovie } from "./models/Movie";
import moviesJson from "./movies.json";

const app = express();

const connectToDb = () => {
  mongoose
    .connect(config.db.url!)
    .then(() => {
      console.info("mongodb connected successfully.");
      initDb();
      initServer();
    })
    .catch((error) => console.error("Unable to connect to mongodb", error));
};

const initDb = () => {
  Movie.find().then((movies) => {
    if (movies.length === 0) {
      console.info("db empty - initializing with some data");
      moviesJson.forEach((it: IMovie) => {
        const movie = new Movie({
          _id: new mongoose.Types.ObjectId(),
          ...it
        });
        return movie.save();
      });
    }
  });
};

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth && auth.includes("Basic")) {
    const authData = Buffer.from(auth.split(" ")[1], "base64")
      .toString()
      .split(":");

    if (authData.length === 2) {
      const username = authData[0];
      const password = authData[1];
      if (
        config.api.username === username &&
        config.api.password === password
      ) {
        next();
        return;
      }
    }
  }
  res.status(403).json("message: Unauthorized");
};

const initServer = () => {
  app.use(express.json());

  app.use("/api/v1/movies", authorization, movieRoutes);

  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  http.createServer(app).listen(config.server.port, () => {
    console.log(`Server is running at http://localhost:${config.server.port}`);
  });
};

const start = () => {
  connectToDb();
};

start();
