
import express from 'express';
import { allCountries, countryDetail, getPopulationData, getFlag } from './countries.js';
import cors from 'cors'
const app = express();
const port = process.env.PORT || 5001;
app.use(cors());

app.use(express.json());

app.get('/api/countries', (req, res) => {
    allCountries()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err));
});

app.get('/api/countries/:code', (req, res) => {
    const { code } = req.params;
    countryDetail(code)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err));
});

app.post('/api/countries/population', (req, res) => {
    const { country } = req.body;
    getPopulationData(country)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err));
});

app.post('/api/countries/flag', (req, res) => {
    const { iso2 } = req.body;
    console.log('ISO2 received:', iso2); // Para verificar si el valor es correcto
    getFlag(iso2)
      .then(data => {
        console.log('Data received from getFlag:', data); // Verifica lo que devuelve la función
        res.json(data);
      })
      .catch(err => {
        console.error('Error fetching flag:', err);
        res.status(500).send(err);
      });
  });
  

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
