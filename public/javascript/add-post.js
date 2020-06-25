async function newFormHandler(event) {
    event.preventDefault();

    // const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('input[name="post-text"]').value;
    // const post_url = document.querySelector('input[name="post-link"]').value;
    const img = document.querySelector('file[name="img"]')
    console.log(img,post_text)
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
        // title,
        post_text,
        // post_url
        img
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);