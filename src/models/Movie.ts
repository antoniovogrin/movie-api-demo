import mongoose, { Schema } from "mongoose";

export interface IMovie {
  id: string;
  rank: number;
  title: string;
  plot: string;
  genres: string[];
  year: number;
  avatar: string;
  director: string;
  writer: string;
  imdbRating: number;
  actors: string[];
}

const MovieSchema: Schema = new Schema(
  {
    rank: { type: Number, require: true },
    title: { type: String, required: true },
    plot: { type: String, required: true },
    genres: { type: [String], required: true },
    year: { type: Number, required: true },
    avatar: { type: String, required: true },
    director: { type: String, required: true },
    writer: { type: String, required: true },
    imdbRating: { type: Number, required: true },
    actors: { type: [String], required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<IMovie>("Movie", MovieSchema);
