class BallPitSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.balls = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.gravity = 0.2;
        this.friction = 0.99;
        this.bounce = 0.6;
        this.initializeCanvas();
        this.createInitialBalls();
        this.setupEventListeners();
        this.hoveredBall = null;
        this.blinkCounter = 0;
        
        // Image URLs
        this.originalImageUrl = 'https://github.com/melodyz03/melodyz03.github.io/blob/main/pit!.png?raw=true';
        this.bombImageUrl = 'https://github.com/melodyz03/melodyz03.github.io/blob/main/bomb.png?raw=true';
        
        // Initialize images
        this.originalImage = null;
        this.bombImage = null;
        
        this.setupBackgroundImage();
        
        // Start the animation loop
        this.animate = this.animate.bind(this);
        this.animate();
    }
  
setupBackgroundImage() {
        // Load original image
        this.originalImage = new Image();
        this.originalImage.onload = () => {
            this.updateBackgroundImage('original');
        };
        this.originalImage.onerror = () => {
            console.error('Failed to load original background image');
            this.updateBackgroundImage('original');
        };
        this.originalImage.src = this.originalImageUrl;

        // Load bomb image
        this.bombImage = new Image();
        this.bombImage.onload = () => {
            // Optional: do something when bomb image is loaded
        };
        this.bombImage.onerror = () => {
            console.error('Failed to load bomb background image');
        };
        this.bombImage.src = this.bombImageUrl;
    }

updateBackgroundImage(type) {
    const bgImageDiv = document.getElementById('bg-image');
    if (!bgImageDiv) return;

    if (type === 'bomb') {
        bgImageDiv.innerHTML = `<img src="${this.bombImageUrl}" alt="Bomb Background">`;
        bgImageDiv.setAttribute('data-image', 'bomb');
    } else {
        bgImageDiv.innerHTML = `<img src="${this.originalImageUrl}" alt="Original Background">`;
        bgImageDiv.setAttribute('data-image', 'original');
    }
}
  
checkBackgroundChange() {
    // Count black balls
    const blackBallCount = this.balls.filter(ball => ball.isBlackBomb).length;
    
    // Get the background image div
    const bgImageDiv = document.getElementById('bg-image');
    if (!bgImageDiv) return;
    
    if (blackBallCount >= 10) {
        // Change background image to Bomb Pit
        if (bgImageDiv.getAttribute('data-image') !== 'bomb') {
            bgImageDiv.innerHTML = `<img src="${this.bombImageUrl}" alt="Bomb Background">`;
            bgImageDiv.setAttribute('data-image', 'bomb');
        }
    } else {
        // Revert to original background if it's not already the original
        if (bgImageDiv.getAttribute('data-image') !== 'original') {
            bgImageDiv.innerHTML = `<img src="${this.originalImageUrl}" alt="Original Background">`;
            bgImageDiv.setAttribute('data-image', 'original');
        }
    }
}
  
    setupEventListeners() {
        this.canvas.addEventListener('click', this.handleClick.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseout', this.handleMouseOut.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initializeCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '1';
        this.canvas.style.backgroundColor = 'transparent';
        this.canvas.style.pointerEvents = 'auto';
    }

    createInitialBalls(count = 50) {
        const ballRadius = 25;
        const startY = this.height / 4;

        for (let i = 0; i < count; i++) {
            const x = Math.random() * (this.width - ballRadius * 2) + ballRadius;
            const y = startY - (Math.random() * ballRadius * 2);

            this.balls.push({
                x: x,
                y: y,
                radius: ballRadius,
                color: this.generateColor(),
                velocityX: 0,
                velocityY: 0
            });
        }
    }

    generateColor() {
    // Pre-generate a color palette to reduce random color generation overhead
    const colorPalette = [
        'hsla(346, 85%, 50%, 1)'  ,
        'hsla(53, 100%, 48%, 1)',
        'hsla(116, 100%, 40%, 1)',
        'hsla(243, 100%, 48%, 1)',
        'hsla(27, 100%, 48%, 1)',
        'hsla(316, 100%, 50%, 1)',
        'hsla(283, 100%, 48%, 1)'
    ];
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

  convertToPastel(color) {
    console.log("Full color string:", color);
    
    const hslMatch = color.match(/hsla\((\d+(?:\.\d+)?),\s*(\d+)%,\s*(\d+)%,\s*(\d+(?:\.\d+)?)\)/);
    
    console.log("Regex match result:", hslMatch);

    if (hslMatch) {
        const hue = Math.round(parseFloat(hslMatch[1]));
        const saturation = parseInt(hslMatch[2]);
        const lightness = parseInt(hslMatch[3]);
        
        console.log("Extracted values:", {
            hue: hue,
            saturation: saturation,
            lightness: lightness
        });

        // Create a pastel version by increasing lightness and reducing saturation
        const pastelColor = `hsl(${hue}, 50%, 85%)`;
        
        console.log("Pastel color:", pastelColor);
        document.body.style.backgroundColor = pastelColor;
        return pastelColor;
    }
    
    console.log("Fallback color used");
    document.body.style.backgroundColor = '#f0f0f0';
    return '#f0f0f0'; // fallback
}

handleClick(event) {
    const clickX = event.clientX;
    const clickY = event.clientY;

    const nearbyBalls = this.balls.filter(ball => 
        Math.abs(ball.x - clickX) < ball.radius * 3 &&
        Math.abs(ball.y - clickY) < ball.radius * 3
    );

    for (const ball of nearbyBalls) {
        const dx = ball.x - clickX;
        const dy = ball.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // First, check if the click is actually on the ball
        if (distance < ball.radius) {
            // If it's a black bomb ball, trigger the sequence
            if (ball.isBlackBomb) {
                this.triggerBombSequence();
                return; // Exit the method entirely
            }

            // Normal ball handling
            ball.velocityY = -Math.random() * 25 - 15;
            ball.velocityX += (Math.random() - 0.5) * 10;
            this.convertToPastel(ball.color);
            break; // Stop after first ball
        }
    }
}
  
triggerBombSequence() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.fontSize = '4rem';
    overlay.style.fontWeight = 'bold';
    overlay.style.color = 'white';

    const sequences = [
        { color: 'red', duration: 200, text: "KABOOM!!!!!!!" },
        { color: 'white', duration: 200, text: "KABOOM!!!!!!!" },
        { color: 'red', duration: 200, text: "KABOOM!!!!!!!" },
        { color: 'white', duration: 200, text: "KABOOM!!!!!!!" },
        { color: 'red', duration: 200, text: "KABOOM!!!!!!!" },
        { color: 'black', duration: Infinity, text: "YOU BOMBED YOURSELF." }
    ];
  function renderSequence(sequence) {
    const displayElement = document.getElementById('display');

    // Clear previous content
    displayElement.innerHTML = '';

    if (sequence.text) {
        const textElement = document.createElement('div');
        textElement.textContent = sequence.text;

        // Apply main text style
        if (sequence.style) {
            Object.assign(textElement.style, sequence.style);
        }

        // Ensure text is always centered
        textElement.style.display = 'flex';
        textElement.style.justifyContent = 'center';
        textElement.style.alignItems = 'center';
        textElement.style.position = 'absolute';
        textElement.style.top = '50%';
        textElement.style.left = '50%';
        textElement.style.transform = 'translate(-50%, -50%)';

        displayElement.appendChild(textElement);
    }
}


    let currentSequence = 0;

    function nextSequence() {
        if (currentSequence < sequences.length) {
            const seq = sequences[currentSequence];
            overlay.style.backgroundColor = seq.color;
            overlay.textContent = seq.text || '';
            
            document.body.appendChild(overlay);

            if (seq.duration !== Infinity) {
                setTimeout(() => {
                    currentSequence++;
                    nextSequence();
                }, seq.duration);
            }
        }
    }

    // Add click event to restart the whole application
    overlay.addEventListener('click', () => {
        // Clear the entire body contents
        document.body.innerHTML = '';

        // Recreate the background image div
        const bgImageDiv = document.createElement('div');
        bgImageDiv.id = 'bg-image';
        bgImageDiv.innerHTML = `<img src="https://github.com/melodyz03/melodyz03.github.io/blob/main/pit!.png?raw=true" alt="Original Background">`;
        document.body.appendChild(bgImageDiv);

        // Recreate the canvas
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        
        // Reset background color
        document.body.style.backgroundColor = 'white';
        
        // Create a new simulation
        new BallPitSimulation(canvas);
    });

    nextSequence();
}

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    updateBalls() {
    this.balls.forEach(ball => {
        ball.velocityY += this.gravity;

        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        ball.velocityX *= this.friction;
        ball.velocityY *= this.friction;

        // Bounce off left and right walls
        if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.velocityX *= -this.bounce;
        }
        if (ball.x + ball.radius > this.width) {
            ball.x = this.width - ball.radius;
            ball.velocityX *= -this.bounce;
        }

        // Bounce off bottom
        if (ball.y + ball.radius > this.height) {
            ball.y = this.height - ball.radius;
            ball.velocityY *= -this.bounce;
        }

        // Check if ball goes out of top bounds
        if (ball.y + ball.radius < 0) {
            // 30% chance to turn ball black
            if (Math.random() < 0.3) {
                ball.isBlackBomb = true;
                ball.color = 'black';
            }
        }
    });

        // Collision detection between balls
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                this.resolveBallCollision(this.balls[i], this.balls[j]);
            }
        }
    }

    resolveBallCollision(ball1, ball2) {
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If balls are overlapping
        if (distance < ball1.radius + ball2.radius) {
            // Calculate collision normal
            const nx = dx / distance;
            const ny = dy / distance;

            // Calculate relative velocity
            const tx = ball2.velocityX - ball1.velocityX;
            const ty = ball2.velocityY - ball1.velocityY;

            // Calculate impulse scalar
            const impulse = 2 * (nx * tx + ny * ty) / 2;

            // Apply impulse to velocities
            ball1.velocityX += impulse * nx;
            ball1.velocityY += impulse * ny;
            ball2.velocityX -= impulse * nx;
            ball2.velocityY -= impulse * ny;

            // Separate overlapping balls
            const overlap = (ball1.radius + ball2.radius - distance) / 2;
            ball1.x -= overlap * nx;
            ball1.y -= overlap * ny;
            ball2.x += overlap * nx;
            ball2.y += overlap * ny;
        }
    }
  
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Find if mouse is over any ball
        const hoveredBall = this.balls.find(ball => 
            Math.sqrt(
                Math.pow(mouseX - ball.x, 2) + 
                Math.pow(mouseY - ball.y, 2)
            ) < ball.radius
        );

        this.hoveredBall = hoveredBall;
    }

      handleMouseOut() {
        this.hoveredBall = null;
    }

drawBalls() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.blinkCounter++; // Increment blink counter with each draw

    this.balls.forEach(ball => {
        this.ctx.beginPath();
        
        // Blink effect for hovered ball
        if (ball === this.hoveredBall) {
            // Check if it's a black ball
            if (ball.isBlackBomb) {
                // Alternate between black and red for black balls
                const isAltColor = this.blinkCounter % 10 < 5;
                this.ctx.fillStyle = isAltColor ? 'hsla(0, 100%, 50%, 1)' : ball.color;
            } else {
                // Keep the original pale pink for other balls
                const isAltColor = this.blinkCounter % 10 < 5;
                this.ctx.fillStyle = isAltColor ? 'hsl(0,0%,100%)' : ball.color;
            }
        } else {
            this.ctx.fillStyle = ball.color;
        }

        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    });
}

    animate() {
        this.updateBalls();
        this.drawBalls();
        this.checkBackgroundChange();
        requestAnimationFrame(this.animate);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.style.backgroundColor = 'white'; // Set default background to white
    document.body.appendChild(canvas);
    new BallPitSimulation(canvas);
});
