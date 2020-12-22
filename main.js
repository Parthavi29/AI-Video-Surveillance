video = "";
myStatus = "";
object = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 400, 400)
    if (myStatus != "") {
        objectDetector.detect(video, getresults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number").innerHTML = "Number of Objects Detected = " + object.length;

            percent = floor(object[i].confidence * 100);

            fill(255, 0, 0);
            strokeWeight(2);
            text(object[i].label + " " + percent + " %", object[i].x + 20, object[i].y + 20);
            noFill();
            stroke(255, 0, 0);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Status : Detecting Objects'
}

function pause() {
    video.pause();
}

function modelLoaded() {
    console.log('Model has been initialized');
    myStatus = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function getresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}