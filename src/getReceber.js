import axios from 'axios';
import { url } from './auth.js';
import { getBoleto } from './getBoleto.js';
import { getPix } from './getPix.js'; // Função que você pode criar para o processamento do PIX

export function getReceber(id_cliente) {
  const data = JSON.stringify({
    "qtype": "fn_areceber.id_cliente",
    "query": id_cliente,
    "oper": "=",
    "grid_param": "[{\"TB\":\"fn_areceber.status\", \"OP\" : \"=\", \"P\" : \"A\"}]"
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}/fn_areceber`,
    headers: {
      'ixcsoft': 'listar', 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic MTA1OjM2ZjJlOGQ0YzkxMjNhNjc1ODVhNTEwMzQ4N2YyMmYyNDQxNmRhNGM3YzljNTlkNDZkMTEyMTVlNGQ0NWFiMDY='
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      const registros = response.data?.registros;
      if (Array.isArray(registros) && registros.length > 0) {
        // Para cada registro, verifique o tipo de recebimento
        registros.forEach((registro) => {
          const id_receber = registro.id;
          const tipo_recebimento = registro.tipo_recebimento; // Verifica se é 'boleto' ou 'pix'

          if (tipo_recebimento === 'boleto' || 'gateway') {
            //console.log(`Processando boleto com ID: ${id_receber}`);
            getBoleto(id_receber); // Chama a função getBoleto para boletos
          } else if (tipo_recebimento === 'pix') {
            //console.log(`Processando PIX com ID: ${id_receber}`);
            getPix(id_receber); // Chama a função getPix para PIX
          } else {
            //console.log(`Tipo de recebimento desconhecido para ID: ${id_receber}`);
          }
        });
      } else {
        console.log('Nenhum registro encontrado.');
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar receber:', error);
    });
}
