import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import WSF from './wsf.mjs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.use('/stylesheets',express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/javascripts',express.static(path.join(__dirname, 'public/javascripts')));

const apiaccesscode = "333bb279-f90c-491b-88e3-f82cddb6599e";

const wsf = new WSF(apiaccesscode);

app.get('/', (req, res) => {
  wsf.fetchCacheDate().then(data => {
    console.log(data);
    res.render('index');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});