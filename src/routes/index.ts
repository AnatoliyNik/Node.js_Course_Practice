import { Router } from "express";
import booksRoutes from './books';
import healthCheckRoutes from "./health-check";
import notFound from "../middleware/not-found-error-handler";
import swagger from "../middleware/swagger";
import { url } from "../data/constants";

const router: Router = Router();

router.use(url.apiDocs, ...swagger);
router.use(url.healthCheck, healthCheckRoutes);
router.use(url.books, booksRoutes);
router.use(notFound);

export default router;