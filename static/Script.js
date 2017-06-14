//-----------------BASE CODE---------------
function World(){
	this.size = 50;
	this.tileSize = 50;
	this.Ruby = new Character(this.size,0,8,this.tileSize);
	this.Ruby.setColor("#f55");
	this.Weiss = new Character(this.size,1,8,this.tileSize);
	this.Weiss.setColor("#eee");
	this.Blake = new Character(this.size,2,8,this.tileSize);
	this.Blake.setColor("#111");
	this.Yang = new Character(this.size,3,8,this.tileSize);
	this.Yang.setColor("#fffe54");
	this.RubyActive = false;
	this.WeissActive = false;
	this.BlakeActive = false;
	this.YangActive = false;
	this.Platform = [];

	for(i = 0; i < 4; i++){
		this.temparr = [];
		for(j = 0; j < 8; j++){
			this.temparr.push(new Tile(this.size, i, j, this.tileSize))
		}
		this.Platform.push(this.temparr);
	}

	this.Platform[0][6].isHighlighted = true;
	this.Platform[1][6].isHighlighted = true;
	this.Platform[2][6].isHighlighted = true;
	this.Platform[3][6].isHighlighted = true;


	this.draw = function(){
		for(i = 0; i<4; i++){
			for(j = 0; j<8; j++){
				this.Platform[i][j].draw();
			}
		}
	}
	this.resetActive = function(){
		this.RubyActive = false;
		this.WeissActive = false;
		this.BlakeActive = false;
		this.YangActive = false;
	}
	this.update = function(){
		if(this.RubyActive)
			this.Ruby.setPosition(0,6);
		else
			this.Ruby.setPosition(0,7);
		if(this.WeissActive)
			this.Weiss.setPosition(1,6);
		else
			this.Weiss.setPosition(1,7);
		if(this.BlakeActive)
			this.Blake.setPosition(2,6);
		else
			this.Blake.setPosition(2,7);
		if(this.YangActive)
			this.Yang.setPosition(3,6);
		else
			this.Yang.setPosition(3,7);
	}
	this.enemyProgress = function(x,y){
		if(this.Platform[x][y].isEnemy && y < 7){
			this.Platform[x][y].isEnemy = false;
			this.Platform[x][y+1].isEnemy = true;
		}
	}
	this.moveEnemy  = function(){
		for(i = 3; i>=0; i--){
			for(j = 6; j>=0; j--){
				this.enemyProgress(i,j);
			}
		}
	}
	this.addEnemy = function(a){
		if(a[0] == 1)
			this.Platform[0][0].isEnemy = true;
		else
			this.Platform[0][0].isEnemy = false;
		if(a[1] == 1)
			this.Platform[1][0].isEnemy = true;
		else
			this.Platform[1][0].isEnemy = false;
		if(a[2] == 1)
			this.Platform[2][0].isEnemy = true;
		else
			this.Platform[2][0].isEnemy = false;
		if(a[3] == 1)
			this.Platform[3][0].isEnemy = true;
		else
			this.Platform[3][0].isEnemy = false;
	}
}
function Tile(value,x,y,scale){
	this.globalScale = value;
	this.positionx = x;
	this.positiony = y;
	this.scale = scale;
	this.isHighlighted = false
	this.isEnemy = false;
	this.draw = function(){
		if(this.isHighlighted){
			if(this.isEnemy){
				ctx.fillStyle = "#eee";
			}else{
				ctx.fillStyle = "#888";
			}
		}
		else if(this.isEnemy){
			ctx.fillStyle = "#000";
		}
		else{
			ctx.fillStyle = "#444";
		}
		ctx.fillRect((this.positionx*(this.globalScale + 5)), (this.positiony*(this.globalScale + 5)) , this.scale, this.scale);
		// if(this.isEnemy){
		// 	ctx.fillRect((this.positionx*(this.globalScale + 5)), (this.positiony*(this.globalScale + 5)) , this.scale, this.scale);
		// }
	}
}
function Character(value,x,y,scale){
	this.globalScale = value;
	this.positionx = x;
	this.positiony = y;
	this.scale = scale;
	this.color;
	this.setMoveNum = function(value){
		this.moveNum = value;
	}
	this.setPosition = function(x,y){
		this.positionx = x;
		this.positiony = y;
	}
	this.setColor = function(value){
		this.color = value;
	};
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect((this.positionx*(this.globalScale + 5))+5,(this.positiony*(this.globalScale + 5))+5,this.scale-10, this.scale-10);
	};
}
function Song(value){
	this.audio = new Audio("./static/media/" + value);
	this.speed = 5;
	this.isPlaying = false;
	this.progress = 0;
	this.maxprogress = 0;
	this.waveNo = 0;
	this.grimmWave = []
	this.addWave = function(time,a,b,c,d){
		this.grimmWave.push(new Wave(time,a,b,c,d));
		this.waveNo++;
	}
	this.setSong = function(value){
		this.audio = new Audio("./static/media/" + value);
	}
	this.extractWave = function(){
		this.waveNo--;
		return this.grimmWave.shift().status;	
	}
	this.setSpeed = function(value){
		this.speed = value;
	}
	this.setMaxProgress = function(value){
		this.maxprogress = value;
	}
	this.clearWave = function(){
		this.grimmWave = [];
	}
}
function Wave(value,a,b,c,d){
	this.time = value;
	this.status = [a,b,c,d];
}
function Interface(){
	this.health;
	this.name;
	this.score;
	this.Title = new Image();
	this.Title.src = "./static/img/GameTitle.png";
	this.Beacon = new Image();
	this.Beacon.src = "./static/img/Beacon-100.png";
	this.draw = function(){
		ctx.fillStyle = "#aaa";
		ctx.fillRect(225,250,250,150);
		ctx.drawImage(this.Title,0,0, this.Title.width, this.Title.height,225,0,80*3,31*3);
		ctx.fillStyle = "#555";
		// ctx.fillRect(250,120,200,100);
		ctx.drawImage(this.Beacon,0,0,this.Beacon.width,this.Beacon.height,275,120,150,150);
		ctx.fillRect(250,220,200,20);
		ctx.fillStyle = "#88f"
		ctx.fillRect(255,225,(CurrentScore/MaxScore)*190,10);
		ctx.font = "15px courier";
		ctx.fillStyle = "#222"
		ctx.fillText(CurrentScore + "/" + MaxScore,317,234);
		ctx.font = "17px courier";
		ctx.fillText("Instruction:",230,265);
		ctx.font = "15px courier";
		ctx.fillText("Match the falling black",250,280);
		ctx.fillText("tiles with the",250,290);
		ctx.fillText("corresponding colored ",250,300);
		ctx.fillText("tiles on the",250,310);
		ctx.fillText("highlighted tile.",250,320);
		ctx.font = "17px courier";
		ctx.fillText("Controls:",230,340);
		ctx.font = "15px courier";
		ctx.fillText("Q,W,E,R for clicking",250,355);
		ctx.fillText("Space for Play/Pause",250,365);
		ctx.fillText("P to Restart",250,375);
		ctx.fillStyle = "#000";
		ctx.fillRect(220,400,250,40);
		ctx.fillStyle = "#fff"
		ctx.font = "30px courier";
		ctx.fillText("SCORE:" + Score ,220,427);
	}
	this.updateBeacon = function(value){
		if(value < 100){
			this.Beacon.src = "./static/img/Beacon-100.png";
		}
		if(value < 75){
			this.Beacon.src = "./static/img/Beacon-75.png";
		}
		if(value < 50){
			this.Beacon.src = "./static/img/Beacon-50.png";
		}
		if(value < 25){
			this.Beacon.src = "./static/img/Beacon-25.png";
		}
		if(value <= 0){
			this.Beacon.src = "./static/img/Beacon-0.png";
		}
	}
}
function Chat(){
	this.Selector = 0;
	this.comment  = function(hit,position){
		this.Selector = Math.floor((Math.random() * 5) + 1);
		console.log(this.Selector);
		if(hit){
			switch(position){
				case 0:
				case 1:
				case 2:
				case 3:
			}
		}
	}
}
//-----------------INPUTS-------------------
var R = 81;
var W = 87;
var B = 69;
var Y = 82;
var CurrentScore = 100;
var MaxScore = 100;
var Score = 0;
var Blooper = new Chat();
document.onkeydown = function(event){
	switch(event.keyCode){
		case R:
			Game.RubyActive = true;
			Blooper.comment();
			break;
		case W:
			Game.WeissActive = true;
			break;
		case B:
			Game.BlakeActive = true;
			break;
		case Y:
			Game.YangActive = true;
			break;
		case 32:
			PlaySong(Level);
			GameInterface.updateBeacon(99);
			break;
		case 80:
			StoreScore();
			GameInterface.updateBeacon(99);
			Restart();
		default:
	}
}
document.onkeyup = function(event){
	switch(event.keyCode){
		case R:
			Game.RubyActive = false;
			break;
		case W:
			Game.WeissActive = false;
			break;
		case B:
			Game.BlakeActive = false;
			break;
		case Y:
			Game.YangActive = false;
			break;
		default:
	}
}
function CheckInput(){
	if(Game.RubyActive){
		if(Game.Platform[0][6].isEnemy || Game.Platform[0][7].isEnemy){
			Game.Platform[0][6].isEnemy = false;
			if(CurrentScore < 100){
				CurrentScore++;
				Score+=5;
			}
		}
	}
	if(Game.WeissActive){
		if(Game.Platform[1][6].isEnemy || Game.Platform[1][7].isEnemy){
			Game.Platform[1][6].isEnemy = false;
			if(CurrentScore < 100){
				CurrentScore++;
				Score+=5;
			}
		}
	}
	if(Game.BlakeActive){
		if(Game.Platform[2][6].isEnemy || Game.Platform[2][7].isEnemy){
			Game.Platform[2][6].isEnemy = false;
			if(CurrentScore < 100){
				CurrentScore++;
				Score+=5;
			}
		}
	}
	if(Game.YangActive){
		if(Game.Platform[3][6].isEnemy || Game.Platform[3][7].isEnemy){
			Game.Platform[3][6].isEnemy = false;
			if(CurrentScore < 100){
				CurrentScore++;
				Score+=5;
			}
		}
	}
	if(Game.Platform[0][7].isEnemy){
		Game.Platform[0][7].isEnemy = false;
		CurrentScore -= 10;
		Score-=10;
	}if(Game.Platform[1][7].isEnemy){
		Game.Platform[1][7].isEnemy = false;
		CurrentScore -= 10;
		Score-=10;
	}if(Game.Platform[2][7].isEnemy){
		Game.Platform[2][7].isEnemy = false;
		CurrentScore -= 10;
		Score-=10;
	}if(Game.Platform[3][7].isEnemy){
		Game.Platform[3][7].isEnemy = false;
		CurrentScore -= 10;
		Score-=10;
	}
}
function StoreScore(){
	var query = 'INSERT INTO highscore (body) VALUES (' + Score + ')';
	performQuery(query);
}
function getScore(){
	var query = 'SELECT body FROM highscore ORDER BY body DESC LIMIT 1';
	performQuery(query);
}
