import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// src/server.js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend.html'));
});

app.get('/calculate/soma/:a/:b', async (req, res) => {
  const a = req.params.a;
  const b = req.params.b;
  // Calcular e retornar o resultado
  res.status(200).json({ result: Number(a) + Number(b) });
});

app.get('/calculate/divisao/:a/:b', async (req, res) => {
  const a = req.params.a;
  const b = req.params.b;
  // Calcular e retornar o resultado
  res.status(200).json({ result: Number(a) / Number(b) });
});


export default app;
