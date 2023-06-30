import express from "express";
import controller from "../../controllers/Movie";
import { Schemas, RequestValidator } from "../../helpers/RequestValidator";

const router = express.Router();

router.get("/", controller.getAllMovies);
router.get("/:id", controller.getMovieById);
router.post("/create", RequestValidator(Schemas.movie), controller.createMovie);
router.patch("/update/:id", RequestValidator(Schemas.movie), controller.updateMovie);
router.delete("/delete/:id", controller.deleteMovie);

export = router;
