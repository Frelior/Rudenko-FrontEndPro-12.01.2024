const img = document.getElementById('img');
img.setAttribute('src','images/' + Math.floor(Math.random() * 9 + 1) +'.jpg' );

// I didnt create image element in js, cause its html element. But it could be like:
// const img = document.createElement('img');
// img.setAttribute('src','images/' + Math.floor(Math.random() * 9 + 1) +'.jpg' );
// document.body.append(img)