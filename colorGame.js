var numSquares = 6;
var pickedColor;
var colors = [];
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var modeButtons = document.querySelectorAll(".mode");
var resetButton = document.querySelector("#reset");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");

init();


function init(){
	//mode button event listeners
	setUpModeButtons();

	//click listeners to the squares
	setUpSquares();

	reset();
}

function setUpModeButtons(){
	for(var i = 0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			for(var j = 0; j<modeButtons.length; j++)
				modeButtons[j].classList.remove("selected");
			this.classList.add("selected");

			numSquares = this.textContent==="Easy" ? 3 : 6;
			reset();
		});
	}	
}

function setUpSquares(){
	for(var i = 0; i<squares.length; i++){
		//add event listener to each square
		squares[i].addEventListener("click", function(){
			//grab color of the clicked square
			var clickedColor = this.style.backgroundColor;
			//compare with the picked color
			if(clickedColor===pickedColor){
				messageDisplay.textContent = "Success";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}	
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";	
	//change the color of the squares
	for(var i = 0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";

		}
		else{
			squares[i].style.display = "none";
		}		
	}
	h1.style.backgroundColor = "steelblue";	
}


resetButton.addEventListener("click", function(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	//change the color of the squares
	for(var i = 0; i<colors.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	this.textContent = "New Colors";
});

function changeColors(color){
	//loop through all squares
	for(var i = 0; i<squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//repeat num times
	for(var i = 0; i<num; i++){
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that arr
	return arr;
}

function randomColor(){
	//pick a 'red' from 0-255
	var r = Math.floor(Math.random()*256);
	//pick a 'green' from 0-255
	var g = Math.floor(Math.random()*256);
	//pick a 'blue' from 0-255
	var b = Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}