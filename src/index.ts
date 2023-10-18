import express, { Express, json } from 'express';
import router from './routes';
import errorHandler from './middleware/error-handler';
import { server } from './data/constants';

const app: Express = express();

app.use(json());
app.use(router);
app.use(errorHandler);

app.listen(server.port, () => {
    console.log(`Server is running at ${server.url}`);
});

