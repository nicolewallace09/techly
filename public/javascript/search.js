async function searchFormHandler(event) {
  event.preventDefault();

// -- declare search
// -- reference from main.handlebar:  id="search-input" name="search-text"
const search = document.querySelector('input[name="search-text"]').value;
  // console.log(search);

if (search) {
const response = await fetch('/search', {
        method: 'get',
        // body: JSON.stringify({
        //     search
        // }),
        headers: { 'Content-Type': 'application/json' }
  }); 

    if (response.ok) {
        document.location.replace('/search');
    } else {
        alert(response.statusText);
    }
  }
}


// document.querySelector('.search-form').addEventListener('submit', searchFormHandler);
document.querySelector('#search-form').addEventListener('submit', searchFormHandler);