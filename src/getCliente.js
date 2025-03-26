import axios from 'axios';
import { url, cpf } from './auth.js';
import { getReceber } from './getReceber.js';

getCliente();

export function getCliente() {
  const data = JSON.stringify({
    "qtype": "cliente.cnpj_cpf",
    "oper": "=",
    "query": cpf
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}/cliente`,
    headers: { 
      'ixcsoft': 'listar', 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic MTA1OjM2ZjJlOGQ0YzkxMjNhNjc1ODVhNTEwMzQ4N2YyMmYyNDQxNmRhNGM3YzljNTlkNDZkMTEyMTVlNGQ0NWFiMDY='
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      const id_cliente = response.data?.registros?.[0]?.id;
      if (id_cliente) {
        getReceber(id_cliente); // Chama a função getReceber com o id_cliente
      } else {
        console.log('ID do cliente não encontrado!');
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar cliente:', error);
    });
}
