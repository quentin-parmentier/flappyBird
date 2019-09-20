class Pipe{

    constructor() {
        this.x = canvas.width;
        this.w = 80;
        this.height = floor(random(canvas.height - 100));
        this.topY = canvas.height - this.height;
    }

    show(){
        fill(100,255,100);
        rect(this.x, canvas.height - this.height, this.w, this.height);
    }

    update(){
        this.x -= panSpeed;
    }

    colided(p){
        if(p.x + p.size / 2 >= this.x && p.x - p.size / 2 <= this.x + this.w ){
            if(p.y + p.size / 2 >= this.topY){
                return true;
            }
        }
        return false;
    }

}