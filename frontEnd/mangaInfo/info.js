fetch('/info.json')
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then(mangaInfo => {
    let url = window.location.href;
    let index = url.indexOf("mangaInfo/") + "mangaInfo/".length;
    let resultEncoded = url.substring(index);
    let manga = decodeURIComponent(resultEncoded);

    let update = '';

    if (mangaInfo[manga]) {
      let insert = mangaInfo[manga];
      update = `
        <div class="leftUpper">
          <img src="/mangaFolder/${manga}/${manga}-cover.jpg" alt="404" class="mangaCover">
        </div>
        <div class="rightUpper">
          <h1 class="title">${insert.title}</h1>
          <p class="maker">AUTHOR: ${insert.author}</p>
          <p class="maker">ARTIST: ${insert.artist}</p>
        </div>
       
          <div class="summary">
						<div class="label">Description</div>
						<p>${insert.description}</p>
          </div>
        <div class="bottom">
          <ul class="bot">
            
          </ul>
        </div>
      `;
    } else {
      alert('MANGA DOES NOT EXIST');
    }

    document.getElementById('Manga').innerHTML = update;

    
    fetch(`/mangaInfo/${manga}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json()) // Parse response as JSON
    .then(data => {

      let url = window.location.href;
      let index = url.indexOf("mangaInfo/") + "mangaInfo/".length;
      let resultEncoded = url.substring(index);
      let manga = decodeURIComponent(resultEncoded);
      let chapter = manga.toLowerCase()
      if (data && data.manga && typeof data.manga === 'number' && data.manga > 0) {
        let update = '';
        for (let i = 2; i <= data.manga; i++) {
          update += `
          <a href="../reading/${manga}/${chapter}-chapter-${i-1}">
          <li>Chapter ${i - 1}</li>
          </a>`;
        }
        document.querySelector('.bot').innerHTML = update; // Use querySelector for class
      } else {
        console.error('Unexpected response format:', data);
      }
    })
    .catch(error => {
      console.error('Error sending data to server:', error);
    });
    
        
  })
  .catch(error => {
    console.error("Error fetching manga info:", error);
  });