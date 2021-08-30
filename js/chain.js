class Chain{
constructor(bodyA,bodyB,xoffset,yoffset){
   console.log(xoffset);
   console.log(yoffset);
    var options = {
        bodyA : bodyA,
        bodyB : bodyB,
        pointB : {x : xoffset,y : yoffset},
        length : 180,
        stiffness : 0.009

    }
   this.chain = Constraint.create(options)
   World.add(world,this.chain);
}
display(){
    console.log(this.chain.pointB.x);
    line(this.chain.bodyA.position.x, this.chain.bodyA.position.y, this.chain.bodyB.position.x + this.chain.pointB.x,this.chain.bodyB.position.y + this.chain.pointB.y);
}
}