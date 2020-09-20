// Creating variables
var jivoti = 3, menu = false;
var startButtonX = 50, startButtonY = 50, buttonXSize = 710, buttonYSize = 40;
var count = 5, money = 1000;
var spaceBetweenButton = buttonYSize + 10;
var a = 0.5, bulletX, bulletY, bulletSize = 20, myBulletSpeed = 3;
var shoot = false;
var myBulletX, myBulletY, myBulletSize = 20;
var myShoot = false, risuvanKadur = 0;
var points = 0, multi = 1;
class Button{
    constructor(name, x, xs, ys, price, upgradeLevel){
        this.name = name;
        this.x = x;
        //Y
        this.xs = xs;
        this.ys = ys;
        this.price = price;
        this.upgradeLevel = upgradeLevel;
    }
    setY(a){
        this.y = a;
    }
}
var Menu = [new Button("Lower enemy speed",startButtonX, buttonXSize, buttonYSize, 100, 0),
            new Button("Faster bullets",startButtonX, buttonXSize, buttonYSize, 20, 0),
            new Button("More lives",startButtonX, buttonXSize, buttonYSize, 50, 0),
            new Button("Double result",startButtonX, buttonXSize, buttonYSize, 500, 0),
            new Button("PLAY",startButtonX, buttonXSize, buttonYSize, "", 0)];
for(let i = 0; i < Menu.length; i ++){
    Menu[i].setY(startButtonY + i*spaceBetweenButton);
}
class Player{
   constructor(x, y, size, speed){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }
    draw(img){
         drawImage(img, this.x, this.y, this.size, this.size);
    }
    move(){
        this.y = mouseY + this.speed;
         if(myShoot){
            myBulletX -= myBulletSpeed;
            if(myBulletX < 0){
                myShoot = false;
            } 
        }
    }
    shoot(){
            myBulletX = this.x+this.size - myBulletSize;
            myBulletY = this.y + this.size/2;
            myShoot = true;
    }
    setSpeed(s){
        this.speed = s;
    }
}
class Enemy {    
    constructor(x, y, size, speed, type){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.deltaSpeed = 5;
        this.type = type;
    }
    draw(){
        risuvanKadur ++;
        if(this.type == "princess"){
            if(risuvanKadur>19){
                risuvanKadur = 0;
            }
            drawImage(princess[risuvanKadur], this.x, this.y, this.size, this.size);          
        }
        if(this.type == "robot"){
            if(risuvanKadur>7){
                risuvanKadur = 0;
            }
            drawImage(robot[risuvanKadur], this.x, this.y, this.size, this.size);          
        }
        if(this.type == "spy"){
            if(risuvanKadur>9){
                risuvanKadur = 0;
            }
            drawImage(spy[risuvanKadur], this.x, this.y, this.size, this.size);          
        }
        if(this.type == "ninja"){
            if(risuvanKadur>9){
                risuvanKadur = 0;
            }
            drawImage(ninja[risuvanKadur], this.x, this.y, this.size, this.size);          
        }
        
    }
    shoot(){
        shoot = true;
        bulletX = this.x - bulletSize;
        bulletY = this.y + this.size/2;
    }
    respawn(){
        this.x = 0;
        this.y = randomInteger(500);
        this.shoot();
    }
    
    move(){
        this.x += this.speed;
        if(shoot){
            bulletX += bulletSpeed;
        }
        if(this.x + this.size > 800){
           this.respawn(); 
        }
    }
    setSpeed(x){
        this.speed = x;
    }
}
var enemyType = ["princess", "spy", "robot", "ninja"];
var p = new Player(700, 50, 50, 0);
var e = new Enemy(50, 0, 50, 9, "spy");
var bulletSpeed = e.speed+3;
e.shoot();

function update() {
    // Napisanoto tuk se izpulnqva otnovo i otnovo mnogo puti v sekunda
    if(!menu && jivoti > 0){
        p.move();
        e.move();
        if(areColliding(p.x,p.y, p.size, p.size, e.x, e.y, e.size, e.size)){
            e.respawn();
            jivoti --;
            e.type = enemyType[randomInteger(4)];
        } 
        if(areColliding(p.x,p.y,p.size,p.size, bulletX, bulletY, bulletSize, bulletSize)){
            bulletX = 800;
            bulletY = 200;
            shoot = false;
            jivoti --;
        }
        if(areColliding(e.x,e.y,e.size,e.size, myBulletX, myBulletY,myBulletSize, myBulletSize)){
            myShoot = false;
            myBulletX = 820;
            points += multi;
            money += 50*multi;
            e.respawn();
            e.type = enemyType[randomInteger(4)];
            console.log(points);
        }
    }else{
        menu = true;
        myShoot = false;
    }
}
function draw() {
    // tuk naprogramirai kakvo da se risuva
    if(!menu && jivoti > 0){
        drawImage(backSun,0, 0, 800, 600);
        p.draw(bee);
        e.draw();
        drawImage(explosion,bulletX, bulletY, bulletSize, bulletSize);
        if(myShoot){
            drawImage(bullet,myBulletX, myBulletY, bulletSize, bulletSize);
        }
        for(let i = 0; i < jivoti; i ++){
            drawImage(heart, 650 + i*30+10, 10, 20, 20);
        }
        context.font = "20px Arial";
        context.fillText("Points: " + points, 500, 30);
    }else{
        menu = true;
    }
    if(menu){
        drawImage(backForest,0, 0, 800, 600);
        context.font = "20px Arial";
        context.fillText("Money: " + money, 600, 30);
        for(let i = 0; i < count - 1; i ++){
            drawImage(powerupRed, Menu[i].x, Menu[i].y, Menu[i].xs, Menu[i].ys);
            context.fillText(Menu[i].name, Menu[i].x + 40, 30+Menu[i].y);
            context.fillText(Menu[i].price, Menu[i].x + 240, 30+Menu[i].y);
            
            for(let j = 0; j < Menu[i].upgradeLevel; j ++){
                drawImage(starSilver, 340 + j*30+10, 10+Menu[i].y, 20, 20);
            }
        }
        drawImage(powerupGreen, Menu[count-1].x, Menu[count-1].y, 
                  Menu[count-1].xs, Menu[count-1].ys);
        context.fillText(Menu[count - 1].name, Menu[count-1].x + 340, 30+Menu[count-1].y);
    }
};
function keydown(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
    if(key == 32 && !myShoot){
        p.shoot();
    }
};
var clickedButton;
function makeChanges(){
    if(clickedButton == 0){
       e.setSpeed(e.speed-a);
    }
    if(clickedButton == 1){
        myBulletSpeed+=1.5;
    }
    if(clickedButton == 2){
        jivoti ++;
    }
    if(clickedButton == 3){
        multi*=2;
    }
    if(clickedButton == 4){
        menu = false;
        e.respawn();
        e.type = enemyType[randomInteger(4)];
        jivoti += 1;
        points = 0;
    } 
}
function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
    if(menu){
        if(mouseX>startButtonX && mouseX<startButtonX+buttonXSize){
            clickedButton = Math.floor((mouseY-startButtonY)/spaceBetweenButton);
            if(money>=Menu[clickedButton].price){
                Menu[clickedButton].upgradeLevel++;
                money -= Menu[clickedButton].price;
                makeChanges();
                Menu[clickedButton].price*=2;
            }else{
                console.log("No money!");
            }
        }
    }
};
