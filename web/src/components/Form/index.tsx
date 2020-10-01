import React, { useState } from 'react';
import InputMask from "react-input-mask";
import api from '../../config/api';

import './style.scss'

interface Response {
  cep: string;
  logradouro: string;
  localidade: string;
  uf: string;
}

const Form: React.FC = () => {

  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState('');
  const [response, setResponse] = useState<Response>({
    cep: '',
    logradouro: '',
    localidade: '',
    uf: '',
  });
  const [error, setError] = useState({
    error: false,
    message: ''
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  async function handleSearchCep () {

    const cep = value.replace('-','').replace('_','');

    if (cep.length <= 7) {
      setError({
        error: true,
        message: 'Digite um CEP válido!'
      });

      return;
    }

    try {
      const { data } = await api.get(`/search_cep/${value}`);
      setResponse(data);
      setSuccess(true);
      setError({
        error: false,
        message: ''
      });
    } catch (error) {
      setSuccess(false);
      setError({
        error: true,
        message: error.response.data.error
      });
    }
     
  }  

  return (
    <>
      <div id="content-form">
        <form>
            <InputMask mask="99999-999" value={value} onChange={handleChange} />
            <button type="button" onClick={handleSearchCep}>Buscar CEP</button>
        </form>

        {error.error && 
            <div className="error">
              <span>{ error.message }</span>
            </div>      
        }

        {success && 
            <div className="success">
              <span>CEP: { response.cep }</span>
              <span>Estado: { response.uf }</span>
              <span>Cidade: { response.localidade }</span>
              <span>Logradouro: { response.logradouro }</span>
            </div>      
        }
      </div>
    </>
  );
}

export default Form;
