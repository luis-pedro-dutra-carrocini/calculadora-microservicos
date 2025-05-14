// src/app.js
import express from 'express';
import axios from 'axios';
import SERVICE_URLS from '../config/serviceUrls.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); // Middleware para parsear JSON no corpo das requisições

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend.html'));
});

app.post('/calculate', async (req, res) => {
  const { operation, params } = req.body;

  if (!operation || !params) {
    return res.status(400).json({ error: 'Operação e parâmetros são obrigatórios.' });
  }

  const serviceUrl = SERVICE_URLS[operation.toLowerCase()];

  if (!serviceUrl) {
    return res.status(400).json({ error: `Operação "${operation}" desconhecida.` });
  }

  try {
    console.log(`Encaminhando para ${operation} service em ${serviceUrl} com params:`, params);
    // A chamada é um POST para o microserviço correspondente
    const serviceResponse = await axios.post(serviceUrl, params, {
        timeout: 5000 // Timeout de 5 segundos
    });

    
    res.status(serviceResponse.status).json(serviceResponse.data);

  } catch (error) {
    console.error(`Erro ao chamar o serviço ${operation}:`, error.message);

    if (error.response) {
      // O microserviço respondeu com um status de erro (4xx, 5xx)
      return res.status(error.response.status).json({
        error: `Erro do serviço ${operation}`,
        details: error.response.data,
      });
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta (ex: serviço offline, timeout)
      return res.status(503).json({ // Service Unavailable
        error: `Serviço ${operation} indisponível ou não respondeu.`,
        details: error.message
      });
    } else {
      // Algum outro erro ocorreu ao configurar a requisição
      return res.status(500).json({
        error: 'Erro interno no orquestrador ao processar a requisição.',
        details: error.message
      });
    }
  }
});

// Rota de health check simples
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

export default app;