const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/random-article', async (req, res) => {
  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json');
    const article = response.data.query.random[0];
    const extractResponse = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${article.title}&format=json`);
    const pageId = Object.keys(extractResponse.data.query.pages)[0];
    const extract = extractResponse.data.query.pages[pageId].extract;

    // Remplacer toutes les occurrences du titre de l'article par un placeholder
    const sanitizedExtract = extract.replace(new RegExp(article.title, 'gi'), '[mot caché]');

    res.json({ title: article.title, extract: sanitizedExtract });
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération de l\'article');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
