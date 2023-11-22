music=0

function preload(){
    music=loadSound("music.mp3");
}
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scorerightWrist=0;
scoreleftWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
camera=createCapture(VIDEO);
camera.hide();
poseNet=ml5.poseNet(camera,modelLoaded);
poseNet.on('pose',gotPoses)

}

function modelLoaded(){
    console.log ("O modelo poseNet foi incializado");

}
function draw(){
    image(camera,0,0,600,500);
    fill ("#FF0000");
    stroke ("#FF0000");
    if(scorerightWrist>0.2){
 circle(rightWristx, rightWristy, 20);
   if(rightWristy>0 && rightWristy<=100){
   document.getElementById ("speed").innerHTML="Velocidade = 0.5x";
music.rate(0.5);
   }
   else if(rightWristy>100 && rightWristy<=200){

    document.getElementById("speed").innerHTML="Velocidade = 1x";
    music.rate(1);
   }
   else if(rightWristy>200 &&  rightWristy<=300){
document.getElementById ("speed").innerHTML="Velocidade = 1.5x";
music.rate(1.5);
   }
   else if(rightWristy>300 &&  rightWristy<=400){
    document.getElementById ("speed").innerHTML="Velocidade = 2x";
    music.rate(2);
    }
    else if(rightWristy>400){
        document.getElementById ("speed").innerHTML="Velocidade = 2.5x";
        music.rate(2.5);
}
    }
    if(scoreleftWrist>0.2){
        circle(leftWristx,leftWristy,20);
        numberLeftWrist=Number(leftWristy);
        removeDecimal=floor(numberLeftWrist);
        volume=removeDecimal/500;
    document.getElementById ("volume").innerHTML="Volume="+volume;
    music.setVolume(volume)
    }
}

function gotPoses(results){
    if(results.length>0){
console.log(results);
leftWristx=results[0].pose.leftWrist.x;
leftWristy=results[0].pose.leftWrist.y;  
rightWristx=results[0].pose.rightWrist.x;
rightWristy=results[0].pose.rightWrist.y; 
scorerightWrist=results[0].pose.keyPoints[10].score; 
scoreleftWrist=results[0].pose.keyPoints[9].score;
console.log("Posição x punho direito:"+ rightWristx);
console.log("Posição y punho direito:"+ rightWristy);  
console.log("Posição x punho esquerdo:"+ leftWristy);  
console.log("Posição y punho esquerdo:"+ leftWristy);          
}
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}
