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

const PORT = process.env.PORT || 3000; // Porta para o orquestrador

app.listen(PORT, () => {
  console.log(`Orquestrador rodando na porta ${PORT}`);
  console.log(`Acesse POST http://localhost:${PORT}/calculate`);
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
