import express from 'express';
import injectRoutes from './routes';
// import injectMiddlewares from './libs/middlewares';

const app = express();

const port = process.env.PORT || 5000;
const env = process.env.npm_lifecycle_event || 'dev';

// injectMiddlewares(server);
injectRoutes(app);

app.listen(port, () => {
  console.log(`[${env}] app has started listening at port:${port}`);
});

export default app;
