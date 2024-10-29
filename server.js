const express = require('express');
const next = require('next');
const fs = require('fs').promises;
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/portfolio', async (req, res) => {
    try {
      const dataPath = path.join(__dirname, 'data', 'portfolio.json');
      const jsonData = await fs.readFile(dataPath, 'utf8');
      const portfolioData = JSON.parse(jsonData);
      res.json(portfolioData);
    } catch (error) {
      console.error('Error reading portfolio data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});