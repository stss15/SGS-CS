/**
 * Extracted from nuclear_simulation.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

    // --- SIMULATION VARIABLES ---
    let temp = 200;           // Current Temperature
    let tempThreshold = 300;  // Trigger point
    let rodPosition = 0;      // 0 = Up (Hot), 100 = Down (Cool)
    let rodTarget = 0;        // Where the MP wants the rods to be
    
    // Physics
    let inputHeat = 0;        // User controlled slider value
    let coolingPower = 5.0;   // Effectiveness of rods
    let maxInputHeat = 4.5;   // Max heat user can add
    
    // Visuals
    let bubbles = [];
    let dataPackets = [];     // Array for animation bits moving along wires
    
    // UI Elements
    let sliderY;
    let draggingSlider = false;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        sliderY = height - 80;
        
        // Initialize Bubbles
        for(let i=0; i<20; i++) {
            bubbles.push(new Bubble());
        }
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        sliderY = height - 80;
    }

    function draw() {
        background(20); 

        // --- 1. UPDATE PHYSICS ---
        
        // Spring-loaded Slider Logic (Slower decay)
        if (!draggingSlider) {
            // Slower decay for "slow cooling" feel
            if (inputHeat > 0) inputHeat -= 0.03; 
            if (inputHeat < 0) inputHeat = 0;
        }

        // Heat mechanics
        temp += inputHeat;
        let cooling = (rodPosition / 100) * coolingPower;
        temp -= cooling;
        temp -= 0.05; // Ambient cooling
        
        // Clamp temp
        if (temp < 20) temp = 20;
        if (temp > 600) temp = 600; 

        // Rod Mechanics (Motor delay)
        if (rodPosition < rodTarget) rodPosition += 2;
        if (rodPosition > rodTarget) rodPosition -= 2;

        // --- 2. CONTROL SYSTEM LOGIC ---
        let analogueData = temp;
        let digitalData = Math.floor(temp);
        // Create 9-bit binary string for display
        let binaryString = digitalData.toString(2).padStart(9, '0');
        
        let logicState = "SAFE";
        if (digitalData > tempThreshold) {
            logicState = "DANGER";
            rodTarget = 100; // Drop rods
        } else {
            logicState = "SAFE";
            rodTarget = 0;   // Raise rods
        }

        // --- 3. DRAW LAYOUT ---
        let reactorX = width * 0.20;
        let reactorY = height * 0.55;
        let diagramX = width * 0.60;
        let diagramY = height * 0.4;

        drawTitle();
        drawReactor(reactorX, reactorY, temp, rodPosition);

        // DATA FLOW LAYERING:
        // Draw packets BEFORE boxes so they go BEHIND the cards
        if (frameCount % 10 === 0) {
            // Packets start from the sensor
            dataPackets.push({x: reactorX + 120, y: reactorY - 100, step: 0, color: color(0, 255, 255)});
        }
        updateAndDrawDataPackets(diagramX, diagramY);

        // Draw the boxes on top
        drawControlDiagram(diagramX, diagramY, analogueData, binaryString, logicState, reactorX);
        
        drawUserControls();
    }

    // --- DRAWING FUNCTIONS ---

    function drawTitle() {
        textAlign(LEFT, TOP);
        noStroke();
        fill(255);
        textSize(24);
        textStyle(BOLD);
        text("NUCLEAR REACTOR CONTROL SYSTEM", 30, 30);
        
        textSize(14);
        textStyle(NORMAL);
        fill(150);
        text("IGCSE COMPUTER SCIENCE: AUTOMATED FEEDBACK LOOP", 30, 60);
    }

    function drawReactor(x, y, t, rods) {
        let tankW = 200;
        let tankH = 300;
        
        let r = map(t, 20, 500, 50, 255);
        let b = map(t, 20, 500, 255, 50);
        let waterColor = color(r, 50, b, 200);

        // Core Container
        stroke(100);
        strokeWeight(4);
        fill(30);
        rect(x - tankW/2, y - tankH/2, tankW, tankH, 10);
        
        // Water
        noStroke();
        fill(waterColor);
        rect(x - tankW/2 + 5, y - tankH/2 + 5, tankW - 10, tankH - 10, 5);

        // Bubbles
        for (let bub of bubbles) {
            bub.update(t);
            bub.display(x, y, tankW, tankH);
        }

        // Fuel Rods
        fill(50, 255, 50); 
        for(let i=-1; i<=1; i++) {
            rect(x + (i*50) - 10, y + 50, 20, 80);
        }

        // Control Rods
        fill(180); 
        stroke(50);
        strokeWeight(2);
        
        let rodH = 200;
        let maxDrop = 120; 
        let currentY = map(rods, 0, 100, y - tankH/2 - 50, y - tankH/2 - 50 + maxDrop);
        
        for(let i=-1; i<=1; i++) {
            rect(x + (i*50) - 10, currentY, 20, rodH);
        }
        
        // Label
        noStroke();
        fill(255);
        textAlign(CENTER);
        text("REACTOR CORE", x, y + tankH/2 + 30);
        textSize(18);
        text(Math.floor(t) + "°C", x, y);
    }

    function drawControlDiagram(cx, cy, analog, binary, state, reactorX) {
        let boxW = 140;
        let boxH = 90;
        let gap = 60;
        
        // --- 1. SENSOR ---
        let sensorX = cx - boxW - gap;
        let sensorY = cy;
        drawTechBox(sensorX, sensorY, boxW, boxH, "TEMP SENSOR", "Analogue Signal", analog.toFixed(2));

        // --- 2. ADC ---
        let adcX = cx + gap;
        let adcY = cy;
        drawTechBox(adcX, adcY, boxW, boxH, "ADC", "Convert -> Binary", binary);
        
        // --- 3. MICROPROCESSOR ---
        let mpX = cx + gap;
        let mpY = cy + boxH + gap;
        
        let logicColor = state === "DANGER" ? color(255, 50, 50) : color(50, 255, 50);
        
        stroke(logicColor);
        strokeWeight(2);
        fill(20);
        rect(mpX - 100, mpY, 260, 130, 5); 
        
        noStroke();
        fill(255);
        textAlign(LEFT);
        text("MICROPROCESSOR", mpX - 90, mpY + 20);
        
        textSize(12);
        fill(150); 
        text(`1. INPUT: ${binary}`, mpX - 90, mpY + 45);
        
        if (state === "DANGER") {
            fill(255, 50, 50); textStyle(BOLD);
        } else {
            fill(100); textStyle(NORMAL);
        }
        // Updated text logic
        text("2. IF temp > 100101100 (300)", mpX - 90, mpY + 65);
        text("    Signal Actuator (DROP)", mpX - 90, mpY + 80);
        
        if (state === "SAFE") {
            fill(50, 255, 50); textStyle(BOLD);
        } else {
            fill(100); textStyle(NORMAL);
        }
        text("3. ELSE: Keep Rods Up", mpX - 90, mpY + 100);
        textStyle(NORMAL);

        // --- 4. ACTUATOR (Motor) ---
        let actX = reactorX; 
        let actY = height * 0.3;
        
        fill(40); stroke(100);
        circle(actX, actY, 60);
        fill(200); noStroke();
        textAlign(CENTER);
        text("MOTOR", actX, actY + 5);
        
        if (rodTarget > 0) fill(255, 0, 0); else fill(0, 255, 0);
        circle(actX, actY - 20, 10);

        // --- STATIC WIRE TRACKS (Sensor/ADC) ---
        stroke(50); strokeWeight(2); noFill();
        // Sensor -> ADC
        line(sensorX + boxW/2, sensorY + boxH/2, adcX - boxW/2, adcY + boxH/2);
        // ADC -> MP
        line(adcX, adcY + boxH, adcX, mpY);
        
        // --- DYNAMIC WIRE TRACK (MP -> Motor) ---
        // This line changes color based on logicState
        stroke(logicColor); 
        strokeWeight(4); // Thicker line
        noFill();
        
        let wireStartX = mpX + 160 - 20;
        let wireStartY = mpY + 65;
        let topPathY = height * 0.15; // Very high up to go OVER everything
        
        beginShape();
        vertex(wireStartX, wireStartY);
        vertex(wireStartX + 60, wireStartY);      // Out Right
        vertex(wireStartX + 60, topPathY);        // Up High
        vertex(actX, topPathY);                   // Over Left
        vertex(actX, actY - 30);                  // Down to Motor
        endShape();
    }

    function drawTechBox(x, y, w, h, title, subtitle, value) {
        rectMode(CENTER);
        // Semi-transparent background
        fill(30, 30, 30, 240); 
        stroke(0, 200, 255); 
        strokeWeight(1);
        rect(x, y, w, h, 5);
        
        noStroke();
        fill(0, 200, 255);
        textAlign(CENTER);
        textSize(14);
        textStyle(BOLD);
        text(title, x, y - 15);
        
        fill(200);
        textStyle(NORMAL);
        textSize(11);
        text(subtitle, x, y + 5);
        
        fill(255);
        textSize(16);
        text(value, x, y + 25);
        rectMode(CORNER); 
    }

    function updateAndDrawDataPackets(cx, cy) {
        let boxW = 140;
        let gap = 60;
        let boxH = 90;
        
        // Key coordinates
        let adcBoxLeft = (cx + gap) - boxW/2;
        let adcX = cx + gap;
        let mpY = cy + boxH + gap;
        let mpInY = mpY; // Top of MP box area

        noStroke();
        
        for (let i = dataPackets.length - 1; i >= 0; i--) {
            let p = dataPackets[i];
            let speed = 4; // Faster data speed
            
            fill(p.color);
            circle(p.x, p.y, 6);
            
            // --- PATHING LOGIC ---
            
            // 1. Sensor to ADC
            if (p.x < adcBoxLeft) {
                p.x += speed;
            } 
            // 2. ADC Down to MP
            else if (p.y < mpInY) {
                p.x = adcX; // Snap X
                p.y += speed;
            }
            // End of line (Kill packet when it hits MP)
            else {
                dataPackets.splice(i, 1);
            }
        }
    }

    function drawUserControls() {
        let sliderW = 400;
        let sliderX = width/2 - sliderW/2;
        let sliderTrackY = height - 60;
        
        textAlign(CENTER);
        textSize(18);
        textStyle(BOLD);
        fill(255); // White text
        noStroke(); // Ensure no glow from previous stroke settings
        text("INCREASE TEMPERATURE  →", width/2, sliderTrackY - 40);
        
        stroke(50);
        strokeWeight(10);
        line(sliderX, sliderTrackY, sliderX + sliderW, sliderTrackY);
        
        let c1 = color(50, 50, 255);
        let c2 = color(255, 50, 50);
        for(let i=0; i<=sliderW; i+=5) {
            let inter = map(i, 0, sliderW, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            strokeWeight(4);
            line(sliderX + i, sliderTrackY, sliderX + i + 4, sliderTrackY);
        }

        let handleX = map(inputHeat, 0, maxInputHeat, sliderX, sliderX + sliderW);
        
        fill(255);
        stroke(0);
        strokeWeight(2);
        circle(handleX, sliderTrackY, 30);
        
        if (draggingSlider) {
            let newVal = map(mouseX, sliderX, sliderX + sliderW, 0, maxInputHeat, true); 
            inputHeat = newVal;
        }
    }

    function mousePressed() {
        let sliderW = 400;
        let sliderX = width/2 - sliderW/2;
        let sliderTrackY = height - 60;
        let handleX = map(inputHeat, 0, maxInputHeat, sliderX, sliderX + sliderW);
        
        let d = dist(mouseX, mouseY, handleX, sliderTrackY);
        if (d < 40) {
            draggingSlider = true;
        }
    }

    function mouseReleased() {
        draggingSlider = false;
    }

    class Bubble {
        constructor() {
            this.x = random(-90, 90);
            this.y = random(140, -140);
            this.size = random(2, 6);
            this.speed = random(1, 3);
        }

        update(temp) {
            let speedMult = map(temp, 20, 500, 1, 5);
            this.y -= this.speed * speedMult;
            if (this.y < -140) {
                this.y = 140;
                this.x = random(-90, 90);
            }
        }

        display(cx, cy, w, h) {
            noStroke();
            fill(255, 255, 255, 100);
            circle(cx + this.x, cy + this.y, this.size);
        }
    }
