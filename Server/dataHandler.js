const fs = require('fs');
const path = require('path');

function chapterCounter(folder, callback) {
  folder = folder.replace(/^"(.*)"$/, '$1');
  const directoryPath = path.resolve(__dirname, '../frontEnd/mainPage/mangaFolder/', folder);
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      callback(err, null); 
      return;
    }
    callback(null, files.length);
  });
}

module.exports = chapterCounter;
