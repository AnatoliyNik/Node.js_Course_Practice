import express, { Express, json } from 'express';
import router from './routes';
import errorHandler from './middleware/error-handler';
import start from "./helpers/app-loader";

const app: Express = express();

app.use(json());
app.use(router);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    start(app);
}

export default app;