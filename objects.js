class Question {
    constructor(qID, qTxt, cA, fA) {
        this.questionID = qID;
        this.questionText = qTxt;
        this.correctAnswer = cA;
        this.answers = [
                       cA,
                       fA[0],
                       fA[1],
                       fA[2]
                       ];
        this.markedForReview = false;
        this.answered = false;
    }
}

class Hero {
    constructor() {
        this.score = 0;
        this.hp = 3;
        this.x = 1;
        this.y = 1;
        this.pic = new Image();
        this.pic.src = "./img/hero.png"
    }

    render() {
        ctx.drawImage(this.pic,this.x*32,this.y*32,32,32);

        if(this.hp <= 0) {
            console.log("object dead, removing image");
            ctx.fillStyle="#2a5227";
            ctx.fillRect(this.x*32,this.y*32,32,32);
        }
    }
    
    update(map,event) {
        let tempX = this.x;
        let tempY = this.y;
        
        switch(String.fromCharCode(event.keyCode)) {
            case "W":
                tempY -= 1;
                console.log("w pressed");
                break;
            case "A":
                tempX -= 1;
                console.log("a pressed");
                break;
            case "S":
                tempY += 1;
                console.log("s pressed");
                break;
            case "D":
                tempX += 1;
                console.log("d pressed");
                break;
            default:
                console.log("non movement key pressed");
        }
        
        console.log("hero x y: " + tempX + ", " + tempY);
        
        if(map[tempY][tempX] != 1 && map[tempY][tempX] != 2) {
            ctx.fillStyle="#2a5227";
            ctx.fillRect(this.x*32,this.y*32,32,32);
            if(map[tempY][tempX] == 3) {
                this.hp = 3;
                map[tempY][tempX] = 0
            }
            this.x = tempX;
            this.y = tempY;
        }
    }
}

class Monster extends Hero {
    constructor(x,y,src) {
        super();
        this.hp = 1;
        this.question;
        this.pic = new Image();
        this.pic.src = src;
        this.x = x;
        this.y = y;
    }

    update(map) {
        let tempX = this.x;
        let tempY = this.y;
        switch(Math.floor(Math.random() * 4)) {
            case 0:
                tempY -= 1;
                console.log("monster up");
                break;
            case 1:
                tempX -= 1;
                console.log("monster left");
                break;
            case 2:
                tempY += 1;
                console.log("monster down");
                break;
            case 3:
                tempX += 1;
                console.log("monster right");
                break;
            default:
                console.log("for some reason, no movement direction")
        }

        console.log("monster x y: " + tempX + ", " + tempY);
        if(map[tempY][tempX] == 0) {
            ctx.fillStyle="#2a5227";
            ctx.fillRect(this.x*32,this.y*32,32,32);
            this.x = tempX;
            this.y = tempY;
        }
    }
}

class Game {
    constructor() {
        this.map = 
        [
            [2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1], //1
            [2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1], //2
            [2,0,0,2,0,0,0,0,0,0,2,2,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,3,1], //3
            [2,0,2,2,2,0,0,2,2,2,2,2,0,1,0,1,0,0,0,2,0,0,0,0,0,0,0,1,1,0,1,1], //4
            [2,0,0,2,0,0,0,0,0,2,2,0,0,1,0,1,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,2], //5
            [2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,2], //6
            [1,0,1,1,0,2,0,0,0,2,0,1,1,1,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2], //7
            [1,0,0,1,0,0,0,0,2,3,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2], //8
            [1,3,0,1,2,0,0,2,2,2,2,1,0,3,0,1,0,0,0,0,2,0,0,0,0,0,0,2,2,2,2,2], //9
            [1,1,1,1,2,2,0,2,2,2,2,1,1,1,1,1,0,0,2,2,2,2,0,0,0,0,0,0,0,2,2,2], //10
            [2,2,2,2,2,2,0,0,2,2,2,2,0,0,0,0,0,2,1,1,1,2,0,0,0,0,0,0,0,0,2,2], //11
            [2,2,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,1,1,3,1,1,0,0,0,0,2,2,0,0,0,2], //12
            [2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,1,0,0,0,0,0,0,0,0,2,2,2,2,0,2,2], //13
            [2,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1,1,1,0,0,2,2,0,0,0,0,0,2], //14
            [2,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,2], //15
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,2], //16
            [2,0,0,0,0,2,0,0,1,1,1,1,2,2,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,2], //17
            [2,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,3,0,0,2,2], //18
            [2,3,0,0,2,0,0,2,1,1,1,1,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,2,2,2], //19
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2] //20
        ];

        this.hero = new Hero();
        this.monster = [new Monster(12,8,"./img/superMonster.png"),
                        new Monster(6,5,"./img/tankMonster.png"),
                        new Monster(2,8,"./img/atkMonster.png"),
                        new Monster(10,17,"./img/superMonster.png"),
                        new Monster(9,12,"./img/tankMonster.png"),
                        new Monster(22,6,"./img/atkMonster.png"),
                        new Monster(2,14,"./img/superMonster.png"),
                        new Monster(26,17,"./img/tankMonster.png"),
                        new Monster(17,12,"./img/atkMonster.png"),
                        new Monster(30,1,"./img/superMonster.png"),
                        ];
    }

    updateAll(event) {
        if(this.hero.hp <= 0) {
            this.hero.render();
            document.getElementById("questionSect").style.display = "block";
            document.getElementById("testQuestion").style.display = "block";
            document.getElementById("scoreReveal").style.display = "block";
            document.getElementById("testQuestion").innerHTML = "You died...";
            document.getElementById("scoreReveal").innerHTML = "Your score is: " + this.hero.score + 
                                                                "<br>You can test again by clicking the testing button, or review what you got wrong!";
            console.log("game over");
            return;
        }

        //update hero
        let prevHeroX = this.hero.x;
        let prevHeroY = this.hero.y;
        this.hero.update(this.map,event);

        //update monsters
        for(let i=0; i<this.monster.length; i++) {
            console.log("current mid = " + m.monsterID);
            console.log(this.monster[m.monsterID])
            let prevMonX = this.monster[i].x;
            let prevMonY = this.monster[i].y;
            
            if(this.monster[i].hp > 0) {
                this.monster[i].update(this.map);
            }
            
            //if hero walks into a monster
            if(((prevMonX == this.hero.x && prevMonY == this.hero.y) && (this.monster[i].x == this.hero.x && this.monster[i].y == this.hero.y))
                && this.monster[i].hp > 0) {
                console.log("start combat; hero attacks");
                this.hero.x = prevHeroX;
                this.hero.y = prevHeroY;
                m.monsterID = i;
                m.displayQA();
            }

            //if monster walks into a hero
            if(((prevHeroX == this.monster[i].x && prevHeroY == this.monster[i].y) && (this.hero.x == this.monster[i].x && this.hero.y == this.monster[i].y))
                && this.monster[i].hp > 0) {
                console.log("start combat; monster attacks");
                this.monster[i].x = prevMonX;
                this.monster[i].y = prevMonY;
                m.monsterID = i;
                m.displayQA();
            }

            //if both walk into each other
            if(prevHeroX == this.monster[i].x && prevHeroY == this.monster[i].y 
                && prevMonX == this.hero.x && prevMonY == this.hero.y 
                && this.monster[i].hp > 0) {
                console.log("start combat; both attack");
                this.hero.x = prevHeroX;
                this.hero.y = prevHeroY;
                this.monster[i].x = prevMonX;
                this.monster[i].y = prevMonY;
                m.monsterID = i;
                m.displayQA();
            }

            //if both walk onto the same space at the same time, randomize to see who attacks
            if((this.monster[i].x == this.hero.x) && (this.monster[i].y == this.hero.y)
            && this.monster[i].hp > 0) {
            let attacker = Math.floor(Math.random() * 2)
            if(attacker == 0) {
                console.log("start combat; hero attacks");
                this.hero.x = prevHeroX;
                this.hero.y = prevHeroY;
                m.monsterID = i;
                m.displayQA();
            }
            else {
                console.log("start combat; monster attacks");
                this.monster[i].x = prevMonX;
                this.monster[i].y = prevMonY;
                m.monsterID = i;
                m.displayQA();
            }
        }

            this.hero.render();
            if(this.monster[i].hp > 0) {
                this.monster[i].render();
            }
        }
    }
    
    renderAll() {
        //render background
        ctx.fillStyle="#2a5227";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        //render map tiles
        for(let i=0; i<this.map.length; i++) {
            for(let j=0; j<this.map[0].length; j++) {
                if(this.map[i][j] == 0) {
                    continue;
                }
                //walls
                else if(this.map[i][j] == 1) {
                    ctx.fillStyle="#7d4b3b";
                    ctx.fillRect(j*32,i*32,32,32);
                    
                    ctx.strokeStyle = "#5c3535";
                    ctx.strokeRect(j*32,i*32,32,32);
                }
                //trees
                else if(this.map[i][j] == 2) {	
                    ctx.fillStyle="#A84832";
                    ctx.fillRect(j*32+13,i*32+26,6,6);
                    ctx.strokeStyle = "#542e25";
                    ctx.strokeRect(j*32+13,i*32+26,6,6);
                    
                    ctx.fillStyle="#32A83A";
                    ctx.strokeStyle="#223d28";
                    ctx.beginPath();
                    ctx.moveTo(j*32,i*32+26);
                    ctx.lineTo(j*32+32,i*32+26);
                    ctx.lineTo(j*32+16,i*32);
                    ctx.lineTo(j*32,i*32+26);
                    ctx.fill();
                    ctx.stroke();
                }
                //potion
                else if(this.map[i][j] == 3) {
                    ctx.fillStyle="#e61515";
                    ctx.strokeStyle="#630909";	
                    ctx.beginPath();
                    ctx.moveTo(j*32+8,i*32+28);
                    ctx.lineTo(j*32+25,i*32+28);
                    ctx.lineTo(j*32+16,i*32+12);
                    ctx.lineTo(j*32+8,i*32+28);
                    ctx.fill();
                    ctx.stroke();
                    
                    ctx.fillRect(j*32+14,i*32+11,4,4);
                }
            }
        }
    }
}