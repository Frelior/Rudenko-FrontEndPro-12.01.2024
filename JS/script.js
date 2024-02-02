
    // linear-gradient(90deg, rgba(0, 0, 0, 0) 0px
    // linear-gradient(180deg, rgba(0, 0, 0, 0) 0px, rgba(54, 226, 248, 0.5) 0%, rgba(39, 230, 255, 0.908) 3px, rgba(0, 0, 0, 0) 0px), linear-gradient(90deg, rgba(0, 0, 0, 0) 0px, rgba(54, 226, 248, 0.5) 0%, rgba(39, 230, 255, 0.908) 3px, rgba(0, 0, 0, 0) 0px);


    // const gridBackground = window.getComputedStyle(syntwaveGrid).background;  // узнай что это такое!
    // const gradientRegex = /linear-gradient\(\d+deg,.*?\)/g; //поиск строки linear-gradient(180deg, rgba(0, 0, 0, 0) 0px
    // const gragients = gridBackground.match(gradientRegex);

    // const syntwaveGrid = document.querySelector('.body_syntwave-grid');
    // let gridBackgroundArray = ['linear-gradient(180deg, rgba(0, 0, 0, 0) ', '0', 'px, rgba(54, 226, 248, 0.5) 0%, rgba(39, 230, 255, 0.908) ', '3', 'px, rgba(0, 0, 0, 0) 0px), linear-gradient(90deg, rgba(0, 0, 0, 0) 0px, rgba(54, 226, 248, 0.5) 0%, rgba(39, 230, 255, 0.908) 3px, rgba(0, 0, 0, 0) 0px)'];
    // let aRA;

  
    // var start = null;
    // var element = document.querySelector('.body_syntwave-grid');
    
//     function step(timestamp) {
//       if (!start) start = timestamp;
//       var progress = timestamp - start;
//       element.style.transform =
//         "translateX(" + Math.min(progress / 10, 200) + "px)";
//       if (progress < 2000) {
//         window.requestAnimationFrame(step);
//       }
//     }
    
//     window.requestAnimationFrame(step);

//   animationGrid();



window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new window.AudioContext();
//     visualizer

    const visualizerBtn = document.querySelector('.triangle');
    const audio = document.querySelector('.audio');
    const vizual = document.querySelector('.visual');

    visualizerBtn.addEventListener('click', e =>{
        ctx.resume();
        audio.paused ? audio.play() : audio.pause();
        visualizerBtn.classList.toggle('btn-play');
        visualizerBtn.classList.toggle('btn-pause');
    })





    const analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    source.connect(ctx.destination);
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;  

    let dataArray = new Uint8Array(bufferLength);
    let elements = [];
    for (let i = 0; i < bufferLength / 2; i++){
        const element = document.createElement('span');
        element.classList.add('element');
        elements.push(element);
        vizual.appendChild(element);
    }

    const clamp = (num, min, max) => {
        if (num >= max) return max;
        if (num <= min) return min;
        return num
    }

    const update = () => {
        requestAnimationFrame(update);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++){
            let item = dataArray[i];
            item = item < 200 ? item / 1.5 : item * 1.25;
            elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(-50%, ${clamp(item, 125, 150)}px)`;
        }
    }
    
    // update();