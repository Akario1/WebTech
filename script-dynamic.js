let page = 1

/**
 * Fetches an entire page of posts from the jsonplacehodler api
 * dynamically creates div's for the posts 
 * 
 */
function fetchPosts(){
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}`;

    fetch(url)
    .then(response => {
        return response.json();
    })

    .then(data => {
        const container = document.getElementById('post-container');

        if (data.length > 0) {
            data.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
                container.appendChild(postDiv);
            })
        };
        page++;
    })
}

/**
 * adds an  event listener to the current windows
 * when the user scrolls further than the height of the page
 * fetchPosts() is called
 */
window.addEventListener('scroll', ()=> {
    if(window.scrollY + window.innerHeight ==
        document.documentElement.scrollHeight)
        {
            fetchPosts();
    }
});

// initial data
fetchPosts();
