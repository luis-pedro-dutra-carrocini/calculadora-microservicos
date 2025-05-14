// src/server.js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

import app from './app.js';

const PORT = process.env.PORT || 3000; // Porta para o orquestrador

app.listen(PORT, () => {
  console.log(`Orquestrador rodando na porta ${PORT}`);
  console.log(`Acesse POST http://localhost:${PORT}/calculate`);
});