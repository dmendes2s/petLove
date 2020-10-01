import { Router } from 'express';

import SearchCepRouter from './search_cep.routes';

const routes = Router();

routes.use('/search_cep', SearchCepRouter);

export default routes;
