const media = document.querySelector('.grid-image');
const title = document.querySelector('#title');
const date = document.querySelector('#date');
const description = document.querySelector('.grid-description');
const search = document.querySelector('#search-date');
const button = document.querySelector('.search-button');
const forwardButton = document.querySelector('#button-forward-one-day');
const backButton = document.querySelector('#button-back-one-day');
const form = document.querySelector('.search');


const maxDate = Date.now();                      
const minDate = Date.parse('1995-06-16');
const today = new Date(maxDate);


callBackendAPI = async (api_url) => {

    console.log(api_url)
    const response = await fetch(api_url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

callBackendAPI('/apod')
.then(response => createMedia(response))

const searchDate = (event) => {
  event.preventDefault();

  if(event.target === form)                                                  // if the function was called from the search form
  {                                                                          // find the specific date
    const theDate = search.value;
    const givenDate = Date.parse(theDate)
  
    if(givenDate < minDate || givenDate > maxDate)                                             // The date passed MUST be between June 16th, 1995 and todays date
    {
      alert(`Date must be between 06/16/1995 and ${today.toLocaleDateString()}.`) 
      return;
    }

    callBackendAPI(`/search/${theDate}`)
    .then(response => createMedia(response))

  }
  else changeByOne(event.target)
}


const createMedia = (response) => {
    media.innerHTML = response.media_type === 'image' ? 
    `<img id="apod" src=${response.url}>`                                        
    : 
    `<iframe width="560" height="315" src=${response.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    title.innerText = response.title;
    date.innerText = response.date;
    description.innerText = response.explanation;
}

const changeByOne = (target) => {

    let x = new Date(Date.parse(date.innerText))
    
    if(target === forwardButton) x.setDate(x.getUTCDate() + 1)
    else if(target === backButton) x.setDate(x.getUTCDate() - 1)

    let day = x.getDate() < 10 ? `0${x.getDate()}` : `${x.getDate()}`                           // we need to reformat the date so the API_url is correct, also need to add 0 to days/months less than october
    let month = x.getUTCMonth() + 1 < 10 ? `0${x.getUTCMonth() + 1}` : `${x.getUTCMonth() + 1}` // we need to subtract 1 from the month because it starts at 0 (read from stackoverflow...)
    let dateString = `${x.getUTCFullYear()}-${month}-${day}`
  
    if(Date.parse(dateString) < minDate || Date.parse(dateString) > maxDate)                    // The date passed MUST be between June 16th, 1995 and todays date
    {
      alert(`Date must be between 06/16/1995 and ${today.toLocaleDateString()}.`) 
      return;
    }

    callBackendAPI(`/search/${dateString}`)
    .then(response => createMedia(response))
  }

form.addEventListener('submit', searchDate);
forwardButton.addEventListener('click', searchDate);
backButton.addEventListener('click', searchDate);