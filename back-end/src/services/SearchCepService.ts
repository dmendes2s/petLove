import AppError from '../errors/AppErros';

import axios from 'axios';

interface CEP {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}


class SearchCepService {

    private cep!: string;

    public async execute(cep: string): Promise<CEP> {

        const formatedCep = cep.replace('-','');

        if ( formatedCep.length !== 8) {
            throw new AppError('Digite um CEP válido!',400);
        }

        this.cep = formatedCep;

        try {
            return await this.sendCep();
        } catch (err) {
            throw new AppError('Cep inválido!', 406);
        }
    }

    private sendCep() {

        return new Promise<CEP>( async (resolve, reject) => {
            const { data } = await axios.get<CEP>(`https://viacep.com.br/ws/${this.cep}/json/`);

            if ( data.cep === undefined ) {
                reject();
            }
            resolve(data);
        });
    }
}

export default SearchCepService;
