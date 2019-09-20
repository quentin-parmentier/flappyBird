class Player{

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.velY = 0;
        this.velX = panSpeed;
        this.maxY = y*2;
        this.size = 30;
    }

    show(){
        fill(255,255,255);
        ellipse(this.x,this.y,this.size);
    }

    update(){

        this.velY += gravity;
        //Can't go less than height max
        this.y += this.velY;

        if(this.y > canvas.height){
            this.y = canvas.height;
        }else if(this.y < 0){
            this.y = 0;
        }
        
        if(pipes[0].colided(this)){
            this.y = 0;
        }
        
    }

    flap(){
        this.velY = -10;
    }

}