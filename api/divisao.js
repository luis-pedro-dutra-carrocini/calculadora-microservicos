export default function handler(req, res) {
  const { a, b } = req.body;

  if (Number(b) === 0) {
    return res.status(400).json({ error: 'Divisão por zero não é permitida' });
  }

  const result = Number(a) / Number(b);
  res.status(200).json({ result });
}
