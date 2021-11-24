noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function preload()
{

}

function setup()
{
    video = createCapture(VIDEO);
    video.size(650, 600);

    canvas = createCanvas(550, 550);
    canvas.position(700, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw()
{
    background(255, 204, 100);

    document.getElementById("square_side").innerHTML = "Width and height of square - " + difference / 10 + "px";
    fill("rgb(0, 255, 0)");
    square(noseX, noseY, difference / 10);
}

function modelLoaded()
{
    console.log("PoseNet is initialized!")
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + " noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWrist = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + " rightWristX = " + rightWristX + " difference = " + difference);
    }
}