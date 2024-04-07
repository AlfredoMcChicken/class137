objects = [];
var status = "";


function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();
    video.hide()
}

function draw() {
    image(video, 0, 0, 800, 600)
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number").innerHTML = "Number of objects detected : " + objects.length
            x = objects[i].x
            y = objects[i].y
            width = objects[i].width
            height = objects[i].height
            label = objects[i].label
            confidence = Math.floor(objects[i].confidence * 100) + "%";
            rect(x, y, width, height);
            text(label + " " + confidence, x + 10, y + 10);
        }
    }
}

function preload() {
    video = createVideo("video.mp4")
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Starting to Identify Objects."
}

function modelLoaded() {
    console.log("Model Loaded")
    video.loop()
    video.speed(1)
    video.volume(0)
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}