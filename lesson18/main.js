const searchForm = document.querySelector('form');

//фетч же возвращает промис, это считается? ахахах)
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = searchForm.querySelector('input').value;
    const commentsArray = [];

    //fetching comments
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                commentsArray.push(item);
            })
        })
        .catch(error => {
            console.error('Error fetching comments:', error)
            alert('Error fetching comments: ' + error.message)
        })
    
    //fetching post
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then(data => {
            const post = new Post(data, commentsArray);
            post.renderAt(document.querySelector('main'));
        })
        .catch(error => {
            console.error('Error fetching post:', error)
            alert('Error fetching post: ' + error.message)
        })
})


class Post {

    constructor(postObject, comentsArray) {
        this.userId = postObject.userId;
        this.id = postObject.id;
        this.title = postObject.title;
        this.body = postObject.body;
        this.coments = comentsArray;
    }

    renderAt(parentElement) {
        parentElement.innerHTML = ''
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        parentElement.append(messageDiv);


        messageDiv.innerHTML = `
        <div class="message-body">
        <p>Message ID: <span class="message-id">${this.id}</span></p>
        <p>Message title: <span class="message-title">${this.title}</span></p>
        <p>Message text: <span class="message-text">${this.body}</span></p>
        <button class="comments-btn">Show comments</button>
        </div>
        <div class="comments-reply"></div>
        `

        //button to show comments
        const commentsBtn = messageDiv.querySelector('.comments-btn');
        commentsBtn.addEventListener('click', () => {
            const commentsReply = messageDiv.querySelector('.comments-reply');
            commentsReply.innerHTML = '';

            this.coments.forEach(comment => {
                const commentObject = new Coment(comment);
                commentObject.renderAt(commentsReply);
            })
        })
    }

}

class Coment{
    constructor(commentObject) {
        this.postId = commentObject.postId;
        this.id = commentObject.id;
        this.name = commentObject.name;
        this.email = commentObject.email;
        this.body = commentObject.body;
    }

    renderAt(parentElement) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        parentElement.append(commentDiv);

        commentDiv.innerHTML = `
        <p>Reply to post #<span class="post-id">${this.postId}</span></p>
        <p>Comment ID: <span class="comment-id">${this.id}</span></p>
        <p>Comment title: <span class="comment-name">${this.name}</span></p>
        <p>Comment email: <span class="comment-email">${this.email}</span></p>
        <p>Comment text: <span class="comment-text">${this.body}</span></p>
        `
    }
}
