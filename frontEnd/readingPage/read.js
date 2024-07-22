let url = window.location.href;
let index = url.indexOf("reading/") + "reading/".length;
let resultEncoded = url.substring(index);
let parts = resultEncoded.split("/");
let manga = decodeURIComponent(parts[0]);
let chapter = decodeURIComponent(parts[1]);

fetch(`/reading/${manga}/${chapter}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(res => res.json())
  .then(data =>{
    if (data && data.manga && typeof data.manga === 'number' && data.manga > 0) {
      let update = '';
      for (let i = 1; i <= data.manga; i++) {
        update += `
           <img src="/mangaFolder/${manga}/${chapter}/${i-1}.rawkuma.com.jpg" class="images" alt="">`;
      }
      document.querySelector('.page').innerHTML = update;
       
    } else {
      window.history.back()
      alert('item you are seraching dont exist')
    }
  })

  let i = 0;
        
  while (true) {
    if (`chapter${i}` === chapter) {
      const back = document.getElementById('back');
      const forward = document.getElementById('forward');
      
      back.href = `chapter${i - 1}`;
      forward.href = `chapter${i + 1}`;
      
      break;
    } 
    else {
      i++;
    }
  }