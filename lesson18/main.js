// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// Ід має бути введений в інпут (валідація: ід від 1 до 100)
// Якщо знайдено пост, то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.

class Post {

    constructor(postObject, comentsArray = null) {
        this.userId = postObject.userId;
        this.id = postObject.id;
        this.title = postObject.title;
        this.body = postObject.body;
        if (comentsArray) {
            this.coments = comentsArray;
        }
    }

    // renderAt(parentElement) {
    //     const div = document.createElement('div');
    //     div.classList.add('message');
    //     parentElement.append(div);
    //     div.innerHTML = `
    //         <p>Message ID: <span class="message-id">${this.id}</span></p>
    //         <p>Message title: <span class="message-title">${this.title}</span></p>
    //         <p>Message text: <span class="message-text">${this.body}</span></p>
    //         <button>Show comments</button>
    //     `
    // }

    // рендер поста просто меняет существующиеэлементы. кнопка берет айдишник из элемента и обрбатывает масив коментов, вызывая функцию рендера для каждого нужног комента
}

class Coment {

    constructor(comentObject) {
        this.id = comentObject.id;
        this.body = comentObject.body;
    }
}