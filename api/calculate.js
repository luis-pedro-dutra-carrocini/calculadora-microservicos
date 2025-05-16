import express from 'express';
import { createServer } from 'http';
import { parse } from 'url';
import { fileURLToPath } from 'url';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.get('/api/calculate/soma/:a/:b', (req, res) => {
  const { a, b } = req.params;
  res.status(200).json({ result: Number(a) + Number(b) });
});

app.get('/api/calculate/divisao/:a/:b', (req, res) => {
  const { a, b } = req.params;
  res.status(200).json({ result: Number(a) / Number(b) });
});

export default function handler(req, res) {
  const server = app;
  server(req, res);
}
