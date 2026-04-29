const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/distancia', async (req, res) => {
  const { origem, destino } = req.body;

  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/distancematrix/json',
    {
      params: {
        origins: origem,
        destinations: destino,
        key: process.env.GOOGLE_API_KEY
      }
    }
  );

  const dados = response.data.rows[0].elements[0];

  res.json({
    distancia: dados.distance.text,
    duracao: dados.duration.text
  });
});

app.listen(3000);
