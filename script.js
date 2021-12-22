song1 = "";
song2 = "";
song1Status = "";
song2Status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
RightWristX = 0;
RightWristY = 0;
LeftWristX = 0;
rightWristX = 0;
function preload(){
    song1 = loadSound("Harry.mp3");
    song2 = loadSound("Peter.mp3");
}
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}
function draw(){
    image(video, 0, 0, 600, 500);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("red");
    stroke("red");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1Status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "song name = Harry Potter";
        }       
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2Status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "song name = Peter Pan";
        }       
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}