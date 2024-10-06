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
        //Error handling
        if(!response.ok){
            throw new Error(`Error! status: ${response.status}`)
        }
        return response.json();
    })

    .then(data => {
        const container = document.getElementById('post-container');

        if (data.length > 0) {
            // loops through all data on page x 
            data.forEach(post => {
                const postDiv = document.createElement('div'); // creates a div
                postDiv.classList.add('post'); // adds a class to the new div
                postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`; // sets the content inside psotDiv to display post title and post body
                container.appendChild(postDiv); // adds the new div to an existing div in the HTML
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

// initial fetch
fetchPosts();
