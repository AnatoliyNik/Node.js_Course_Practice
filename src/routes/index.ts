import { Router } from "express";
import booksRoutes from './books.route';
import healthCheckRoutes from "./health-check.route";
import moviesRoute from "./movies.route";
import genresRoute from "./genres.route";
import notFound from "../middleware/not-found-error-handler";
import swagger from "../middleware/swagger";
import { url } from "../data/constants";

const router: Router = Router();

router.use(url.apiDocs, ...swagger);
router.use(url.healthCheck, healthCheckRoutes);
router.use(url.books, booksRoutes);
router.use(url.genres, genresRoute);
router.use(url.movies, moviesRoute);
router.use(notFound);

export default router;