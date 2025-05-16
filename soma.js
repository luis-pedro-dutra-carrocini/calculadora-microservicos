module.exports = (req, res) => {
  // Configurando CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Extrair e validar os dados
  const { a, b } = req.body;
  
  // Validar se os parâmetros são números
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  // Calcular e retornar o resultado
  res.status(200).json({ result: a + b });
};
