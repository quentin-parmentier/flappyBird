class Player{

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.velY = 0;
        this.velX = panSpeed;
        this.maxY = y*2;
        this.size = 30;
        this.alive = true;
        this.score = 0;
    }

    show(){
        fill(255,255,255);
        ellipse(this.x,this.y,this.size);
    }

    update(){

        this.velY += gravity;
        //Can't go less than height max
        this.y += this.velY;
        if(this.velY > 10){
            this.velY = 10;
        }

        if(this.y > canvas.height){
            this.y = canvas.height;
        }else if(this.y < 0){
            this.y = 0;
        }
        
        if(pipes[0].colided(this)){
            if(!LEARNING){
                this.alive = false;
            }
        }else{
            this.score = this.score + 1;
        }
        
    }

    flap(){
        this.velY = -12;
    }

    distance(pipes){
        let Dx = pipes[0].x - this.x + pipes[0].w/2;
        let Dy = pipes[0].topY - this.y + pipes[0].gap/2;
        let Dx2 = 0;
        let Dy2 = 0;

        if(pipes[1]){
            let Dx2 = pipes[1].x - this.x + pipes[1].w/2;
            let Dy2 = pipes[1].topY - this.y + pipes[1].gap/2;
        }

        Dx = Dx / canvas.width;
        Dy = Dy / canvas.height;
        Dx2 = Dx2 / canvas.width;
        Dy2 = Dy2 / canvas.height;

        let velY = -1;

        if(this.velY > 0){
            velY = 1;
        }

        return [Dx,Dy,velY];
    }
}