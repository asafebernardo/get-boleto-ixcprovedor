import axios from 'axios';
import { url } from './auth.js';

export function getPix(id_areceber) {
  let data = JSON.stringify({
    "id_areceber": id_areceber  // Enviando o ID do pagamento via PIX
  });

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${url}/get_pix`,  // URL da API para consultar PIX
    headers: { 
      'ixcsoft': 'listar', 
      'Content-Type': 'application/json', 
      'Authorization': 'Basic MTA1OjM2ZjJlOGQ0YzkxMjNhNjc1ODVhNTEwMzQ4N2YyMmYyNDQxNmRhNGM3YzljNTlkNDZkMTEyMTVlNGQ0NWFiMDY=', 
      'Cookie': 'Path=/; IXC_Session=6g55ueq48o4nfrp1sm3ue5gb4l'
    },
    data: data  // Passando o corpo com o ID do pagamento via PIX
  };

  axios.request(config)
    .then((response) => {
      console.log("Resposta do PIX:", JSON.stringify(response.data));
      // Processar a resposta do PIX conforme necessário
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do PIX:", error);
    });
}
