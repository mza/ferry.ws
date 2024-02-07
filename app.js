const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use('/stylesheets',express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/javascripts',express.static(path.join(__dirname, 'public/javascripts')));

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});