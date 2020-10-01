import { Router } from 'express';

import SearchCepService from '../services/SearchCepService';

const routes = Router();

routes.get('/:cep', async (request, response) => {

    const { cep: cepParam } = request.params;

    const service = new SearchCepService();

    try {
        const { cep, logradouro, localidade, uf } = await service.execute(cepParam);

        return response.json({
            cep,
            logradouro,
            localidade,
            uf,
        });
    } catch (err) {
        return response.status(err.statusCode).json({ error: err.message });
    }
});

export default routes;
