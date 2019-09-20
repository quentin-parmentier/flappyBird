var panSpeed = 5;
var gravity = 1;
var player;
var pipes = new Array();
var nextStep = 100;

function setup(){
    window.canvas = createCanvas(800,1200);
    player = new Player(100,canvas.height/2);
    pipes.push(new Pipe());
}

function draw(){

    background(135,206,235);
    player.update();
    player.show();

    if(frameCount % nextStep == 0){
        pipes.push(new Pipe());
    }

    pipes.forEach((pipe,index) => {
        
        pipe.update();
        pipe.show();

        if((pipe.x + pipe.w + 20) < 0){
            pipes.splice(index, 1);
        }
    })
    
}

function keyPressed(){

    switch (key) {
        case ' ':
            player.flap();
            break;
    
        default:
            break;
    }
}