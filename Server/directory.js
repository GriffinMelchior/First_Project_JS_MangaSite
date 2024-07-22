const chapterCounter = require('./dataHandler.js')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const web = express();

const thread = path;

web.use(bodyParser.json())

web.get('/mangaInfo/:title',(req,res)=>{
  res.sendFile(thread.resolve(__dirname, '../frontEnd/mangaInfo/info.html'))
  web.use(express.static(thread.join(__dirname, '../frontEnd/mangaInfo/')));
})
web.get('/',(req,res)=>{
  res.sendFile(thread.resolve(__dirname, '../frontEnd/mainPage/mainPage.html'))
  web.use(express.static(thread.join(__dirname, '../frontEnd/mainPage/')));
})
web.get('/reading/:title/:chapter', (req, res)=>{
  res.sendFile(thread.resolve(__dirname, '../frontEnd/readingPage/read.html'));
  web.use(express.static(thread.join(__dirname, '../frontEnd/readingPage')));
})

web.post('/reading/:title/:chapter', (req, res)=>{
  const title = req.params.title
  const chapter = req.params.chapter
  const direction = `${title}/${chapter}`
  chapterCounter(direction, (err, chapters) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading directory' });
    }
    res.json({ manga: chapters });
  });
})

web.post('/mangaInfo/:title', (req, res) => {
  const mangaName = req.params.title;
  chapterCounter(mangaName, (err, chapters) => {
    if (err) {
      console.error('Error in chapterCounter:', err);
      return res.status(500).json({ error: 'Error reading directory' });
    }
    res.json({ manga: chapters });
  });
});

web.listen(5000);