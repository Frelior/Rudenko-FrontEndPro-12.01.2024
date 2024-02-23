let song;
let fft;
let particles = [];
const audioButton = document.querySelector('.audio-button');


function preload() {
    song = loadSound('mainpage/Memory Reboot.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    angleMode(DEGREES)
    rectMode(CENTER)
    fft = new p5.FFT()
}

function draw() {
    clear();
    translate(width / 2, height / 2.05)
    fft.analyze()
    amp = fft.getEnergy(15000, 15900)
    let alpha = map(1200+amp, 0, 255, 180, 150);
    fill(0, alpha);
    noStroke();
    rect(0,0, width, height)
    stroke(248, 101, 155)
    strokeWeight(5)
    let wave = fft.waveform()

    for (let t = -1; t <= 1; t += 2){
        beginShape()
        for (let i = 0; i <= 180; i += 1) {
            let index = floor(map(i, 0, 180, 0, wave.length -1))

            let r = map(wave[index], -1, 1, 150, 230)

            let x = r * sin(i) * t;
            let y = r * cos(i);
            vertex(x, y)
        }
        endShape()
    }

    let p = new Particle();
    particles.push(p)
    for (let i = particles.length - 1; i >= 0; i--){
        if (!particles[i].edges()){
            particles[i].update( amp > 35)
            particles[i].show();
        } else {
            particles.splice(i, 1)
        }
    }

}

audioButton.addEventListener('click', () =>{
    audioButton.classList.toggle('pause')
    if (song.isPlaying()){
        song.pause();
        noLoop();
    } else {
        song.loop();
        loop();
    }
})

class Particle {
    constructor(){
        this.pos = p5.Vector.random2D().mult(180);
        this.vel = createVector(0, 0);
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
        this.w = random(1,4)
        this.color = [248, 101, 155]
    }
    update(cond){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if(cond){
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }

    edges(){
        if (this.pos.x < -width /2 || this.pos.x > width / 2 ||
        this.pos.y < -height / 2 || this.pos.y > height / 2){
            return true
        } else {
            return false
        }
    }

    show(){
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.w)
    }
}

