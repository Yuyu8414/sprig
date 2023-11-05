<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
    <style>
        canvas {
            background-color: black;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <canvas id="pong" width="800" height="600"></canvas>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const canvas = document.getElementById("pong");
            const context = canvas.getContext("2d");

            const paddleWidth = 10;
            const paddleHeight = 100;
            const ballSize = 10;
            const paddleSpeed = 8;

            const player1 = {
                x: 0,
                y: canvas.height / 2 - paddleHeight / 2,
                width: paddleWidth,
                height: paddleHeight,
                color: "#FFFFFF",
                dy: 0
            };

            const player2 = {
                x: canvas.width - paddleWidth,
                y: canvas.height / 2 - paddleHeight / 2,
                width: paddleWidth,
                height: paddleHeight,
                color: "#FFFFFF",
                dy: 0
            };

            const ball = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                radius: ballSize,
                speed: 4,
                dx: 4,
                dy: 4,
                color: "#FFFFFF"
            };

            function drawPaddle(x, y, width, height, color) {
                context.fillStyle = color;
                context.fillRect(x, y, width, height);
            }

            function drawBall(x, y, radius, color) {
                context.fillStyle = color;
                context.beginPath();
                context.arc(x, y, radius, 0, Math.PI * 2, false);
                context.closePath();
                context.fill();
            }

            function update() {
                player1.y += player1.dy;
                player2.y += player2.dy;

                // Ball movement
                ball.x += ball.dx;
                ball.y += ball.dy;

                // Ball collision with top and bottom walls
                if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
                    ball.dy *= -1;
                }

                // Ball collision with paddles
                if (
                    ball.x - ball.radius <= player1.x + player1.width &&
                    ball.y >= player1.y &&
                    ball.y <= player1.y + player1.height
                ) {
                    ball.dx *= -1;
                }

                if (
                    ball.x + ball.radius >= player2.x &&
                    ball.y >= player2.y &&
                    ball.y <= player2.y + player2.height
                ) {
                    ball.dx *= -1;
                }

                // Player1 paddle boundary
                if (player1.y <= 0) {
                    player1.y = 0;
                } else if (player1.y >= canvas.height - player1.height) {
                    player1.y = canvas.height - player1.height;
                }

                // Player2 paddle boundary
                if (player2.y <= 0) {
                    player2.y = 0;
                } else if (player2.y >= canvas.height - player2.height) {
                    player2.y = canvas.height - player2.height;
                }

                // Ball reset if it goes out of bounds
                if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height / 2;
                    ball.dx *= -1;
                }

                // Clear canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Draw paddles and ball
                drawPaddle(player1.x, player1.y, player1.width, player1.height, player1.color);
                drawPaddle(player2.x, player2.y, player2.width, player2.height, player2.color);
                drawBall(ball.x, ball.y, ball.radius, ball.color);
            }

            // Keyboard event listeners
            document.addEventListener("keydown", function (event) {
                if (event.key === "ArrowUp") {
                    player2.dy = -paddleSpeed;
                } else if (event.key === "ArrowDown") {
                    player2.dy = paddleSpeed;
                } else if (event.key === "w") {
                    player1.dy = -paddleSpeed;
                } else if (event.key === "s") {
                    player1.dy = paddleSpeed;
                }
            });

            document.addEventListener("keyup", function (event) {
                if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                    player2.dy = 0;
                }
                if (event.key === "w" || event.key === "s") {
                    player1.dy = 0;
                }
            });

            // Game loop
            function gameLoop() {
                update();
                requestAnimationFrame(gameLoop);
            }

            // Start the game loop
            gameLoop();
        });
    </script>
</body>

</html>
