const  Template = document.querySelector("[manga-Template]")
const  Container = document.querySelector("[manga-Container]")
const  Search = document.querySelector("[manga-Search]")

let mangaInfo=[];

Search.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  mangaInfo.forEach(manga => {
    const isVisible =
      manga.title.toLowerCase().includes(value) 
    manga.element.classList.toggle("hide", !isVisible)

  })
})

fetch('dataSheet.json')
  .then(res =>{
    return res.json()
  })
  .then(data=>{
    mangaInfo = data.map(Manga =>{
      const Content = Template.content.cloneNode(true).children[0]
      const link = Content.querySelector("[manga-Link]")
      const image = Content.querySelector(["[manga-Image]"])
      const title = Content.querySelector("[manga-Title]")
      link.href = `../mangaInfo/${Manga.link}`
      image.src = `../mangaFolder/${Manga.coverPage}`
      title.textContent = `${Manga.title}`
      Container.append(Content)
      return {title: Manga.title, element: Content}
    })
  })

