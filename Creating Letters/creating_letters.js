//Create global variables
var gl;
var rotate = 0.0;
var rotateLoc;
var scale = 1.0;
var scaleLoc;
var translate_x = 0.0;
var translate_xLoc;
var translate_y = 0.0;
var translate_yLoc;
var red = 0.0;
var green = 0.0;
var blue = 0.0;
var allColor;

//Create scale function
function bigScale(){
    scale += .1;
	render();
}

function smallScale(){
    scale -= .1;
	render();
}

//Create translate function
function positiveX_axisTranslate(){
    translate_x += .1;
	render();
}

function positiveY_axisTranslate(){
    translate_y += .1;
	render();
}

function negativeX_axisTranslate(){
    translate_x -= .1;
	render();
}

function negativeY_axisTranslate(){
    translate_y -= .1;
	render();
}


window.onload = function init() {

  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  gl = canvas.getContext("webgl");
  // Only continue if WebGL is available and working
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram( program );
  
  //Implement function to buttons
  var ChangeSizeToBig = document.getElementById("GetBiggerButton");
  GetBiggerButton.addEventListener("click", bigScale);
  
  var ChangeSizeToSmall = document.getElementById("GetSmallerButton");
  GetSmallerButton.addEventListener("click", smallScale);
  
  var ChangeLocationToRight = document.getElementById("RightTranslateButton");
  RightTranslateButton.addEventListener("click", positiveX_axisTranslate);
  
  var ChangeLocationToUp = document.getElementById("UpTranslateButton");
  UpTranslateButton.addEventListener("click", positiveY_axisTranslate);
  
  var ChangeLocationToLeft = document.getElementById("LeftTranslateButton");
  LeftTranslateButton.addEventListener("click", negativeX_axisTranslate);
  
  var ChangeLocationToDown = document.getElementById("DownTranslateButton");
  DownTranslateButton.addEventListener("click", negativeY_axisTranslate);
  
  //Create sliders
  document.getElementById("red").onchange = function() {
	  red = (event.target.value);
	  render();
  };

  document.getElementById("green").onchange = function() {
	  green = (event.target.value);
	  render();
  };
	  
  document.getElementById("blue").onchange = function() {
	  blue = (event.target.value);
	  render();
  };
   
   //Create keyboard interaction
   window.addEventListener("keydown", function() {
      switch (event.keyCode) {
         case 37: 
            rotate += .1;
			render();
            break;
         case 39: 
            rotate -= .1;
			render();
            break;
         
      }
   });


  // Initial letters vertex coordinates
  var vertices =[vec2(-.9,  .6), 
                 vec2(-.8,  .6),
				 vec2(-.9, -.6),
                 
				 vec2(-.8,  .6), 
                 vec2(-.9, -.6),
				 vec2(-.8, -.6),
				 
				 vec2(-.8,  .6), 
                 vec2(-.3,  .6),
				 vec2(-.3,  .5),
				 
				 vec2(-.8,  .6), 
                 vec2(-.8,  .5),
				 vec2(-.3,  .5),
				
				 vec2(-.4,  .5), 
                 vec2(-.3,  .5),
				 vec2(-.4,  .1),
                 
				 vec2(-.3,  .5), 
                 vec2(-.3,  .1),
				 vec2(-.4,  .1),
				 
				 vec2(-.8,  .1), 
                 vec2(-.1,  .1),
				 vec2(-.1,  .0),
				 
				 vec2(-.8,  .1), 
                 vec2(-.8,  .0),
				 vec2(-.1,  .0),
				 
				 vec2(-.2,  .0), 
                 vec2(-.1,  .0),
				 vec2(-.2, -.5),
				 
				 vec2(-.1,  .0), 
                 vec2(-.2, -.5),
				 vec2(-.1, -.5),
				 
				 vec2(-.1, -.5), 
                 vec2(-.8, -.5),
				 vec2(-.8, -.6),
				 
				 vec2(-.1, -.5), 
                 vec2(-.8, -.6),
				 vec2(-.1, -.6),
				 
//-----------------------------------------

				 vec2(.1,   .6), 
                 vec2(.1,  -.6),
				 vec2(.2,  -.6),
				 
				 vec2(.2,  -.6), 
                 vec2(.1,   .6),
				 vec2(.2,   .6),
				 
				 vec2(.2,  -.5), 
                 vec2(.2,  -.6),
				 vec2(.8,  -.5),
				 
				 vec2(.8,  -.5), 
                 vec2(.2,  -.6),
				 vec2(.8,  -.6),
				 
				 vec2(.8,   .6), 
                 vec2(.9,   .6),
				 vec2(.8,  -.6),
				 
				 vec2(.8,  -.6), 
                 vec2(.9,  -.6),
				 vec2(.9,   .6),
				 
				];

  var bufferId = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
  gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

  // Associate out shader variables with our data buffer
  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );
  
  
  scaleLoc = gl.getUniformLocation(program, "vScale");
  gl.uniform1f(scaleLoc, scale);
    
  rotateLoc = gl.getUniformLocation(program, "vRotation");
  gl.uniform1f(rotateLoc, rotate);
  
  translate_xLoc = gl.getUniformLocation(program, "vTranslation_x");
  gl.uniform1f(translate_xLoc, translate_x);
  
  translate_yLoc = gl.getUniformLocation(program, "vTranslation_y");
  gl.uniform1f(translate_yLoc, translate_y);
  
  allColor = gl.getUniformLocation(program, "allColor");
  gl.uniform4f(allColor, red, green, blue, 1.0);
  
  // Set clear color to black, fully opaque
  gl.clearColor(0.9, 0.8, 0.8, 1.0);
  
  render();
  
};


function render () {

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  gl.uniform4f(allColor, red, green, blue, 1.0);
  
  gl.uniform1f(rotateLoc, rotate);
  
  gl.uniform1f(scaleLoc, scale);
  
  gl.uniform1f(translate_xLoc, translate_x);
  
  gl.uniform1f(translate_yLoc, translate_y);
  
  gl.drawArrays(gl.TRIANGLES, 0, 54);

}