//-----------------BASE CODE---------------
function World(){
	this.size = 50;
	this.tileSize = 50;
	this.Player = new Cursor(this.size, 0, 0, this.tileSize);
	this.Ruby = new Character(this.size,0,1,this.tileSize);
	this.Ruby.setColor("#f55");
	this.Ruby.setMoveNum(3);
	this.Weiss = new Character(this.size,0,2,this.tileSize);
	this.Weiss.setColor("#eee");
	this.Weiss.setMoveNum(3);
	this.Blake = new Character(this.size,0,3,this.tileSize);
	this.Blake.setColor("#111");
	this.Blake.setMoveNum(3);
	this.Yang = new Character(this.size,0,4,this.tileSize);
	this.Yang.setColor("#fffe54");
	this.Yang.setMoveNum(3);
	this.RubyMoving = false;
	this.WeissMoving = false;
	this.BlakeMoving = false;
	this.YangMoving = false;
	this.Platform = [];

	for(i = 0; i < 9; i++){
		this.temparr = [];
		for(j = 0; j < 6; j++){
			this.temparr.push(new Tile(this.size, i, j, this.tileSize))
		}
		this.Platform.push(this.temparr);
	}

	this.draw = function(){
		for(i = 0; i<9; i++){
			for(j = 0; j<6; j++){
				this.Platform[i][j].draw();
			}
		}
	}
	this.resetMoving = function(){
		this.RubyMoving = false;
		this.WeissMoving = false;
		this.BlakeMoving = false;
		this.YangMoving = false;
	}
	this.checkPlayer = function(x,y){
		if(this.Ruby.checkPlayer(x,y)){
			this.RubyMoving = true;
			return this.Ruby.moveNum;
		}
		else if(this.Weiss.checkPlayer(x,y)){
			this.WeissMoving = true;
			return this.Weiss.moveNum;
		}
		else if(this.Blake.checkPlayer(x,y)){
			this.BlakeMoving = true;
			return this.Blake.moveNum;
		}
		else if(this.Yang.checkPlayer(x,y)){
			this.YangMoving = true
			return this.Yang.moveNum;
		}
		else{
			this.resetMoving();
		}
	}
	this.interact = function(x,y){
		if(this.RubyMoving){
			if(this.Platform[x][y].isHighlight){
				this.Ruby.positionx = x;
				this.Ruby.positiony = y;
			}else{
				this.resetMoving();
			if(this.checkPlayer(x,y) > 0){
				this.tileHighlightReset();
				this.tileHighlight(x,y,this.checkPlayer(x,y));
			}
			else
				this.tileHighlightReset();
			}
		}
		else if(this.WeissMoving){
			if(this.Platform[x][y].isHighlight){
				this.Weiss.positionx = x;
				this.Weiss.positiony = y;
			}else{
				this.resetMoving();
			if(this.checkPlayer(x,y) > 0){
				this.tileHighlightReset();
				this.tileHighlight(x,y,this.checkPlayer(x,y));
			}
			else
				this.tileHighlightReset();
			}
		}
		else if(this.BlakeMoving){
			if(this.Platform[x][y].isHighlight){
				this.Blake.positionx = x;
				this.Blake.positiony = y;
			}else{
				this.resetMoving();
			if(this.checkPlayer(x,y) > 0){
				this.tileHighlightReset();
				this.tileHighlight(x,y,this.checkPlayer(x,y));
			}
			else
				this.tileHighlightReset();
			}
		}
		else if(this.YangMoving){
			if(this.Platform[x][y].isHighlight){
				this.Yang.positionx = x;
				this.Yang.positiony = y;
			}else{
				this.resetMoving();
			if(this.checkPlayer(x,y) > 0){
				this.tileHighlightReset();
				this.tileHighlight(x,y,this.checkPlayer(x,y));
			}
			else
				this.tileHighlightReset();
			}
		}
		else{
			if(this.checkPlayer(x,y) > 0){
				this.tileHighlightReset();
				this.tileHighlight(x,y,this.checkPlayer(x,y));
			}
			else
				this.tileHighlightReset();
		}
	}
	this.tileHighlightReset = function(){
		for(i = 0; i<9; i++){
			for(j = 0; j<6; j++){
				this.Platform[i][j].noHighlight();
			}
		}
	}
	this.tileHighlight = function(x,y,value){
		this.Platform[x][y].yesHighlight();
		for(i = 0; i<9; i++){
			for(j = 0; j<6; j++){
				if(Math.abs(Math.abs(i-x) + Math.abs(j-y)) <= value){
					if(this.Ruby.checkPlayer(i,j)){
					}
					else if(this.Weiss.checkPlayer(i,j)){
					}
					else if(this.Blake.checkPlayer(i,j)){
					}
					else if(this.Yang.checkPlayer(i,j)){
					}
					else
						this.Platform[i][j].yesHighlight();
				}
			}
		}
	}
}
function Tile(value,x,y,scale){
	this.globalScale = value;
	this.positionx = x;
	this.positiony = y;
	this.scale = scale;
	this.isHighlight = false;
	this.yesHighlight = function(){
		this.isHighlight = true;
	}
	this.noHighlight = function(){
		this.isHighlight = false;
	}
	this.draw = function(){
		if(this.isHighlight)
			ctx.fillStyle = "#c8c8fe";
		else{
			ctx.fillStyle = "#444";
		}
		ctx.fillRect((this.positionx*(this.globalScale + 5)), (this.positiony*(this.globalScale + 5)) , this.scale, this.scale);
	}
}
function Character(value,x,y,scale){
	this.health = 10;
	this.moveNum = 0;
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
	this.checkPlayer = function(x,y){
		if(this.positionx == x && this.positiony == y){
			return true;
		}
		else
			return false;
	}
}
function Cursor(value,x,y,scale){
	this.globalScale = value;
	this.positionx = x;
	this.positiony = y;
	this.scale = scale;
	this.color = "#7d7dfe";
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect((this.positionx*(this.globalScale + 5)), (this.positiony*(this.globalScale + 5)) , this.scale, this.scale);
	}
}
//-----------------INPUTS-------------------
var Game = new World();
document.onkeydown = function(event){
	switch(event.keyCode){
		//left
		case 65:
		case 37:
			if(Game.Player.positionx > 0)
				Game.Player.positionx--;
			console.log("Left");
			break;	
		//up
		case 87:
		case 38:
			if(Game.Player.positiony > 0)
				Game.Player.positiony--;
			console.log("Up");
			break;
		//right
		case 68:
		case 39:
			if(Game.Player.positionx < 8)
				Game.Player.positionx++;
			moveRight = true;
			console.log("Right");
			break;
		//down
		case 83:
		case 40: 
			if(Game.Player.positiony < 5)
				Game.Player.positiony++;
			console.log("Down");
			break;
		//interaction
		case 32:
			Game.interact(Game.Player.positionx, Game.Player.positiony);
			console.log("Interaction");
			console.log(Game.Player.positionx, Game.Player.positiony);
			console.log(Game.checkPlayer(Game.Player.positionx, Game.Player.positiony));
			break;
	}
}
//-----------------LEVEL DESIGN-----------------
var ctx = document.getElementById("canvas").getContext("2d");
//==================MAIN LOOP-------------------
function Update(){
	Game.draw();
	Game.Player.draw();
	Game.Ruby.draw();
	Game.Weiss.draw();
	Game.Blake.draw();
	Game.Yang.draw();
	ctx.font = '20px Arial';
	ctx.fillStyle = '#fff';
	ctx.fillText("MoveNumber  ", 0, 350);
}
setInterval(Update, 100);
