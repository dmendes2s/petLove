import request from 'supertest';

import app from '../app';

describe('SearchCep', () => {

    it('fails if zip is longer than 8 characters', async () => {

        const response = await request(app).get('/search_cep/8575578578');

        expect(response.status).toBe(400);
    });

    it('fails if zip is less than 8 characters', async () => {

        const response = await request(app).get('/search_cep/44287');

        expect(response.status).toBe(400);
    });

    it('fail if invalid zip', async () => {

        const response = await request(app).get('/search_cep/12345678');

        expect(response.status).toBe(406);
    });

    it('return validated zip code', async () => {

        const response = await request(app).get('/search_cep/08111-220');

        expect(response.body).toMatchObject(
            expect.objectContaining({
                "cep": "08111-220",
                "logradouro": "Avenida Doutor Décio de Toledo Leite",
                "localidade": "São Paulo",
                "uf": "SP",
              }),
          );
    });


});
