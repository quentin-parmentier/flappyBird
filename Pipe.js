class Pipe{

    constructor() {
        this.x = canvas.width;
        this.w = 80;
        this.gap = 150;
        this.height = floor(random(0.60 * canvas.height) + 0.15 * canvas.height);
        //this.height = 0.60 * canvas.height;
        this.topY = canvas.height - this.height;
    }

    show(){
        fill(100,255,100);
        rect(this.x, canvas.height - this.height, this.w, this.height);
        rect(this.x, 0, this.w, this.topY - this.gap);
    }

    update(){
        this.x -= panSpeed;
    }

    colided(p){

        if(p.x + p.size / 2 >= this.x && p.x - p.size / 2 <= this.x + this.w ){
            if((p.y + p.size / 2 >= this.topY) || (p.y - p.size / 2 <= this.topY - this.gap) ){
                return true;
            }
        }

        return false;
    }

}