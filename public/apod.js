const media = document.querySelector('.grid-image');
const title = document.querySelector('#title');
const description = document.querySelector('.grid-description');
const date = document.querySelector('#date');
const search = document.querySelector('#search-date')
const button = document.querySelector('.search-button')
const form = document.querySelector('.search')

const today = new Date(Date.now());
console.log(today.getUTCFullYear());

callBackendAPI = async (api_url) => {
    // const api_url = `/apod`
    const response = await fetch(api_url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

callBackendAPI('/apod')
.then(response => {
  
    media.innerHTML = response.media_type === 'image' ? 
    `<img id="apod" src=${response.url}>` 
    : 
    `<iframe width="560" height="315" src=${response.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    title.innerText = response.title;
    date.innerText = response.date;
    description.innerText = response.explanation;
})


form.addEventListener('submit', (event) => {
  event.preventDefault()

  const theDate = search.value;
  callBackendAPI(`/search/${theDate}`)
  .then(response => {
    media.innerHTML = response.media_type === 'image' ? 
    `<img id="apod" src=${response.url}>` 
    : 
    `<iframe width="560" height="315" src=${response.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    title.innerText = response.title;
    date.innerText = response.date;
    description.innerText = response.explanation;
  })
})