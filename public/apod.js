const media = document.querySelector('.grid-image');
const title = document.querySelector('#title');
const description = document.querySelector('.grid-description');
const date = document.querySelector('#date');
const search = document.querySelector('#search-date')
const button = document.querySelector('.search-button')
const form = document.querySelector('.search')

var today = new Date(Date.now());
console.log(today.toLocaleDateString());

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
  const givenDate = Date.parse(theDate)
  const maxDate = Date.now()                  // APODs only exist after June 16th, 1995 
  const minDate = Date.parse('1995-06-16')

  if(givenDate < minDate || givenDate > maxDate) 
  {
    alert(`Date must be between 06/16/1995 and ${today.toLocaleDateString()}.`) 
    return;
  }

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