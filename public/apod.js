const media = document.querySelector('.grid-image');
const title = document.querySelector('#title');
const description = document.querySelector('.grid-description');
const date = document.querySelector('#date');

const today = new Date(Date.now());
console.log(today.getUTCFullYear());
console.log(description)


callBackendAPI = async () => {
    const api_url = `/apod`
    const response = await fetch(api_url);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

callBackendAPI()
.then(response => {
  console.log(response);
    media.innerHTML = response.media_type === 'image' ? 
    `<img id="apod" src=${response.url}>` 
    : 
    `<iframe width="560" height="315" src=${response.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    title.innerText = response.title;
    date.innerText = response.date;
    description.innerText = response.explanation;
})
