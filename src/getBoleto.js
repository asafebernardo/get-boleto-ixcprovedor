import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { URL } from 'url'; // Importa a classe URL do módulo 'url' para manipular a URL

import { url } from './auth.js';

let boletosRetornados = []; // Armazena o retorno de cada boleto

export function getBoleto(id_receber) {
  const data = JSON.stringify({
    "boletos": id_receber,
    "juro": "S",
    "multa": "S",
    "atualiza_boleto": "S",
    "tipo_boleto": "arquivo",
    "base64": "S"
  });

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${url}/get_boleto`,
    headers: { 
      'ixcsoft': 'listar', 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic MTA1OjM2ZjJlOGQ0YzkxMjNhNjc1ODVhNTEwMzQ4N2YyMmYyNDQxNmRhNGM3YzljNTlkNDZkMTEyMTVlNGQ0NWFiMDY=', 
      'Cookie': 'Path=/; IXC_Session=6g55ueq48o4nfrp1sm3ue5gb4l'
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      const boletoBase64 = response.data; // Aqui está o retorno do boleto em base64
      const id_receber = response.data.id_receber;  // ou outro campo que você usa para identificá-lo

      // Defina o caminho específico onde os boletos serão salvos
      const boletosDir = 'C:/Users/Asafe/Documents/Projetos GitHub/src/boletos'; // Caminho desejado, pode ser qualquer diretório

      // Decodificando o base64 para binário
      const buffer = Buffer.from(boletoBase64, 'base64');

      // Caminho onde o arquivo PDF será salvo
      const filePath = path.join(boletosDir, `${id_receber}.pdf`);

      // Criando diretório se não existir
      if (!fs.existsSync(boletosDir)) {
        fs.mkdirSync(boletosDir, { recursive: true });
      }

      // Salvando o arquivo no diretório especificado
      fs.writeFileSync(filePath, buffer);

      // Armazenando no array boletosRetornados
      boletosRetornados.push({ id_receber, filePath });

      console.log('Boleto salvo com sucesso!', filePath);
    })
    .catch((error) => {
      console.error(`Erro ao buscar boleto para o ID ${id_receber}:`, error);
    });
}

export { boletosRetornados };