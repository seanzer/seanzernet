(function () {
    "use strict";

    class BallCollection {
        constructor(all) {
            this.all = all || [];
            this.redCount = 0;
            this.greenCount = 0;
            this.blueCount = 0;
            for (let ball of all) {
                if (ball.color === "red") {
                    this.redCount++;
                    continue;
                }

                if (ball.color === "blue") {
                    this.redCount++;
                    continue;
                }

                if (ball.color === "green") {
                    this.greenCount++;
                    continue;
                }
            }
        }
    }

    function initBalls() {
        const balls = [];
        balls.push({
            x: 20 + 20 * Math.random(),
            y: 23,
            radius: 20,
            color: "red",
            vx: 0.08,
            vy: 0.1
        });
        balls.push({
            x: 100 * Math.random() + 100,
            y: 23,
            radius: 20,
            color: "green",
            vx: 0,
            vy: 0.5
        });
        return balls;
    }

    class Balls {
        constructor(balls) {
            this.maxBalls = Number.MAX_VALUE;
            this.balls = balls;

            // Resize the canvas
            this.canvas = document.querySelector('.color-balls-canvas');
            this.canvas.height = this.canvas.clientHeight;
            this.canvas.width = this.canvas.clientWidth;
            window.addEventListener("resize", () => {
                this.canvas.height = this.canvas.clientHeight;
                this.canvas.width = this.canvas.clientWidth;
            });

            // get canvas context and init line width
            this.context = this.canvas.getContext('2d');
            this.context.lineWidth = 2;

            // handle pointers
            this.lastPointers = [];
            if (window.onpointermove) {
                window.addEventListener("pointermove", ev => this.handleMove(ev));
            } else {
                window.addEventListener("mousemove", ev => this.handleMove(ev));
                window.addEventListener("touchmove", ev => {
                    for (let i = 0; i < ev.changedTouches.length; i++) {
                        const ev2 = ev.changedTouches[i];
                        this.handleMove(ev2);
                    }
                });
            }

            // start render loop
            this.render();
        }

        get canvasHeight() {
            return this.canvas.clientHeight;
        }

        get canvasWidth() {
            return this.canvas.clientWidth;
        }

        drawText(font, text, x, y) {
            this.context.font = font;
            this.context.fillText(text, x, y);
        }

        drawMyName() {
            const font = "20px Georgia",
                  text = "Welcome to Seanzer.Net... by SeanLee",
                  x = 10,
                  y = 100;
            this.drawText(font, text, x, y);
        }

        drawBallCount() {
            const balls = this.balls.all;
            const font = "12px Georgia",
                  text = "Total balls: " + balls.length,
                  x = 16,
                  y = 120;
            this.drawText(font, text, x, y);
        }

        drawLine(from, to, strokeStyle) {
            this.context.beginPath();
            this.context.moveTo(from.x, from.y);
            this.context.lineTo(to.x, to.y);
            this.context.strokeStyle = strokeStyle || "rgb(0,0,0)";
            this.context.stroke();
        }

        drawBall(x, y, radius, color) {
            this.context.beginPath();
            this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = color || "rgb(0,0,0)";
            this.context.fill();
        }

        drawColorCounts() {
            const font = "20px Georgia",
                  x = 10,
                  y = 140;
            this.context.strokeStyle = "rgb(255,0,0)";
            this.drawText(font, "Red: " + this.balls.redCount, x, y);

            this.context.strokeStyle = "rgb(0,255,0)";
            this.drawText(font, "Green: " + this.balls.greenCount, x, y + 20);

            this.context.strokeStyle = "rgb(0,0,255)";
            this.drawText(font, "Blue: " + this.balls.blueCount, x, y + 40);
        }

        draw() {
            const balls = this.balls.all;
            for (const ball of balls) {
                this.drawBall(ball.x, ball.y, ball.radius, ball.color);
            }

            this.drawMyName();
            this.drawBallCount();
            this.drawColorCounts();
        }

        update() {
            const balls = this.balls.all;
            const elasticityFloor = 0.6;
            const elasticityWall = 0.2;

            //update
            const now = performance.now();
            let dist = !isNaN(this.last) ? now - this.last : 0;
            if (dist > 50) {
                this.maxBalls = Math.max(balls.length - 2, 2);
                dist = 50;
            } else {
                this.maxBalls++;
            }
            this.last = now;
            while (balls.length > 0 && balls.length > this.maxBalls) {
                balls.shift();
            }
            for (var i = 0; i < balls.length; i++) {
                var ball = balls[i];
                ball.vy += 1 / 1000 * dist; //gravity wins
                ball.vx = ball.vx - (1 / 1000 * ball.vx * dist); //friction wins

                if (ball.y >= this.canvasHeight - ball.radius) {
                    ball.vy = -ball.vy * (1 - elasticityFloor);
                    ball.vy = (ball.vy * 10 | 0) / 10;
                }
                if ((ball.x >= this.canvasWidth - ball.radius && ball.vx > 0) ||
                    (ball.x <= ball.radius && ball.vx < 0)) {
                    ball.vx = -ball.vx * (1 - elasticityWall);
                    ball.vx = (ball.vx * 10 | 0) / 10;
                }
                ball.y = Math.min(ball.y + dist * ball.vy, this.canvasHeight - ball.radius);
                ball.x = ball.x + dist * ball.vx;
            }
        }

        render() {
            this.update();

            //clear
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //draw
            this.draw();

            requestAnimationFrame(() => this.render());
        }

        normalizeRGB(RGB) {
            const balls = this.balls.all;
            var max = Math.max.apply(this, RGB);
            if (max === RGB[0]) {
                this.balls.redCount++;
            } else if (max === RGB[1]) {
                this.balls.greenCount++;
            } else {
                this.balls.blueCount++;
            }

            return RGB.map(function (value, index, array) {
                return (Math.pow(2, value / max * 8) | 0) - 1;
            });
        }

        handleMove(ev) {
            const balls = this.balls.all;
            const x = ev.clientX,
                  y = ev.clientY;
            if (!this.lastPointers[ev.pointerId]) {
                this.lastPointers[ev.pointerId] = {
                    x: 0,
                    y: 0
                };
            }

            const lastPointer = this.lastPointers[ev.pointerId];
            if (Math.sqrt(Math.pow(lastPointer.x - x, 2) + Math.pow(lastPointer.y - y, 2)) > 10) {
                lastPointer.x = x;
                lastPointer.y = y;

                const RGB = this.normalizeRGB([Math.random(), Math.random(), Math.random()]),
                      colorString = "rgb(" + RGB.join(",") + ")",
                      radius = 20;

                balls.push({
                    x: Math.min(Math.max(lastPointer.x, radius), this.canvasWidth - radius),
                    y: Math.min(Math.max(lastPointer.y, radius), this.canvasHeight - radius),
                    radius: radius,
                    color: colorString,
                    vx: Math.random() - 0.5,
                    vy: -2 * Math.random() + 1
                });
            }
        }
    }

    new Balls(new BallCollection(initBalls()));
})();