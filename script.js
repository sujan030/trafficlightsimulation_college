document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext("2d");

  // road ra boarder
  var roadWidth = canvas.width;
  var roadHeight = 100;
  context.fillStyle = "white";
  context.fillRect(0, (canvas.height - roadHeight) / 2, roadWidth, roadHeight);
  context.strokeStyle = "black";
  context.lineWidth = 5;
  context.strokeRect(
    0,
    (canvas.height - roadHeight) / 2,
    roadWidth,
    roadHeight
  );

  // gadi rokne thau
  var stripeWidth = 20;
  context.fillStyle = "black";
  context.fillRect(
    (canvas.width - stripeWidth) / 2,
    (canvas.height - roadHeight) / 2,
    stripeWidth,
    roadHeight
  );

  // traffic light
  var lightBoxWidth = 60;
  var lightBoxHeight = 160;
  var lightBoxX = (canvas.width - stripeWidth) / 2 - lightBoxWidth + 70;
  var lightBoxY = (canvas.height - lightBoxHeight) / 2 - 200;
  context.fillStyle = "gray";
  context.fillRect(lightBoxX, lightBoxY, lightBoxWidth, lightBoxHeight);

  // Traffic light dimensions and initial position
  var lightWidth = 40;
  var lightHeight = 120;
  var lightX = lightBoxX + (lightBoxWidth - lightWidth) / 2;
  var lightY = lightBoxY + (lightBoxHeight - lightHeight) / 2;

  // Traffic light colors and initial index
  var lightColors = ["red", "yellow", "green"];
  var currentLightIndex = 0;

  // car define gareko
  var carImg = new Image();
  carImg.src = "car1.png";
  var carWidth = 70;
  var carHeight = 60;
  var carX = -(carWidth / 2);
  var carY = (canvas.height - carHeight) / 2;
  var carSpeed = 2;

  // halka aagadi rokne
  var stopDistance = 70;
  // delayko lagi variable
  var carStopped = false;
  var stopTime = 0;

  function drawCar() {
    context.drawImage(carImg, carX, carY, carWidth, carHeight);
  }
  // delay ko lagi
  function updateCar() {
    if (
      (currentLightIndex === 0 || currentLightIndex === 1) &&
      carX >= (canvas.width - stripeWidth) / 2 - carSpeed - stopDistance &&
      carX <= (canvas.width - stripeWidth) / 2 - stopDistance
    ) {
      if (carStopped) {
        carStopped = true;
        stopTime = Date.now();
      }

      if (Date.now() - stopTime >= 4000) {
        carStopped = false;
      }
    } else {
      carX += carSpeed;
      if (carX > canvas.width) {
        carX = -(carWidth / 2);
      }
    }
  }

  // function updateCar() {
  //   // traffic light check
  //   if ((currentLightIndex === 0 || currentLightIndex === 1) && carX >= (canvas.width - stripeWidth) / 2 - carSpeed - stopDistance && carX <= (canvas.width - stripeWidth) / 2 - stopDistance) {

  //   } else {
  //     carX += carSpeed;

  //     //car ko loop
  //     if (carX > canvas.width) {
  //       carX = -(carWidth / 2);
  //     }
  //   }
  // }

  function drawRoad() {
    context.fillStyle = "white";
    context.fillRect(
      0,
      (canvas.height - roadHeight) / 2,
      roadWidth,
      roadHeight
    );
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.strokeRect(
      0,
      (canvas.height - roadHeight) / 2,
      roadWidth,
      roadHeight
    );
  }

  function drawStripe() {
    context.fillStyle = "black";
    context.fillRect(
      (canvas.width - stripeWidth) / 2,
      (canvas.height - roadHeight) / 2,
      stripeWidth,
      roadHeight
    );
  }

  function drawLightBox() {
    context.fillStyle = "gray";
    context.fillRect(lightBoxX, lightBoxY, lightBoxWidth, lightBoxHeight);
  }

  function drawTrafficLight() {
    var lightXPosition = lightX + lightWidth / 2;
    var lightYPosition = lightY + lightHeight / 4;

    // red
    context.beginPath();
    context.arc(lightXPosition, lightYPosition, 15, 0, 2 * Math.PI);
    context.fillStyle = currentLightIndex === 0 ? "red" : "gray";
    context.fill();

    // yello
    context.beginPath();
    context.arc(
      lightXPosition,
      lightYPosition + lightHeight / 3,
      15,
      0,
      2 * Math.PI
    );
    context.fillStyle = currentLightIndex === 1 ? "yellow" : "gray";
    context.fill();

    // green
    context.beginPath();
    context.arc(
      lightXPosition,
      lightYPosition + (2 * lightHeight) / 3,
      15,
      0,
      2 * Math.PI
    );
    context.fillStyle = currentLightIndex === 2 ? "green" : "gray";
    context.fill();
  }

  // light update ko lagi
  function updateTrafficLight() {
    currentLightIndex = (currentLightIndex + 1) % lightColors.length;
  }

  // animation ko lagi function run garirako
  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    drawStripe();
    drawLightBox();
    drawTrafficLight();
    updateCar();

    drawCar();
    requestAnimationFrame(animate);
  }

  animate();

  // light ko timing
  setInterval(function () {
    updateTrafficLight();
  }, 1500);
});
