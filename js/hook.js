class Hook{
    constructor(x,y){
       var option = {
           density : 1.2,
           friction : 1
       }
        this.body = Bodies.circle(x,y,20,option);
        World.add(world,this.body);
        this.radius = 40;
        this.image = loadImage("images/hook.png");
    }
    display(){
        push();
        translate(this.body.position.x, this.body.position.y);
        imageMode(CENTER);
        image(this.image, 0,0,this.radius,this.radius);
        pop();
    }
}