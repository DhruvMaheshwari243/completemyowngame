class Crane{
    constructor(x,y){
       var option = {
           isStatic : true,
       }
        this.body = Bodies.circle(x,y,200,option);
        World.add(world,this.body);
        this.radius = 350;
        this.image = loadImage("images/crane.png");
    }
    display(){
        push();
        translate(this.body.position.x, this.body.position.y);
        imageMode(CENTER);
        image(this.image, 0,0,this.radius,this.radius);
        pop();
    }
}