// async function searchFormHandler(event) {
//   event.preventDefault();

//   // const search = document.querySelector('#search-input').value.trim();
//   const post_text = document.querySelector('input[name="search-input"]').value;
  
//   // console.log(search);

//   // const response = await fetch(`/api/search`, {
// const response = await fetch(`/search`, {
//         method: 'GET',
//         body: JSON.stringify({
//           // title,
//           post_text
//         }),
//           headers: { 'Content-Type': 'application/json'  }
//     });

//     if (response.ok) {
//         document.location.replace('/');
//     } else {
//         alert(response.statusText);
//     }
// }


// document.querySelector('#search-form').addEventListener('submit', newFormHandler);