export default function handler(req, res) {
  const { a, b } = req.body;
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }
  const result = Number(a) + Number(b);
  res.status(200).json({ result });
}
