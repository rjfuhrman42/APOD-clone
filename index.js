const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const app = express();

app.listen(3000, () => {
    console.log('Listening on 3000');
});
app.use(express.static('public')); 

app.get('/apod', async (request, response) => {
    const api_key = process.env.API_KEY;
    const api_url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
    const data = await fetch(api_url);
    const json = await data.json();
    console.log(json);
    response.json(json);
})

