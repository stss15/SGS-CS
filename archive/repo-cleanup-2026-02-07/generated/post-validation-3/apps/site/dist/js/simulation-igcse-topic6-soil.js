/**
 * Extracted from soil_simulation.html on 2025-12-14
 * DO NOT modify function logic - only moved from inline
 */

    // --- SIMULATION VARIABLES ---
    let moisture = 50;
    let temperature = 25; // Celsius
    let moistureLowThreshold = 30;
    let moistureHighThreshold = 60;
    let isRaining = false;
    let pumpActive = false;
    
    // Random Rain System
    let rainTimer = 0;
    let rainDuration = 0;
    let nextRainIn = 0;
    let autoWeather = true;
    
    // Physics
    let baseEvaporationRate = 0.02;
    let pumpPower = 0.5;
    let rainPower = 0.4;
    
    // Visuals
    let sprinklerDroplets = [];
    let rainDroplets = [];
    let clouds = [];
    let splashes = [];
    let plantGrowth = 50;
    let skyTransition = 0; // 0 = sunny, 1 = rainy
    
    // Layout
    let splitX;
    let groundLevel;
    let fieldX, fieldY;
    let weatherStationX, weatherStationY;
    
    // Data logging for dashboard
    let dataLog = [];
    let logInterval = 30; // frames
    
    // UI
    let tempSlider;
    let sliderY;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        textFont('Consolas');
        
        for (let i = 0; i < 80; i++) {
            sprinklerDroplets.push(new SprinklerDroplet());
        }
        
        for (let i = 0; i < 300; i++) {
            rainDroplets.push(new RainDroplet());
        }
        
        for (let i = 0; i < 8; i++) {
            clouds.push(new Cloud(random(-100, width * 0.6), random(40, 140), random(0.8, 1.4)));
        }
        
        // Schedule first rain
        nextRainIn = random(300, 600);
        
        calcLayout();
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        calcLayout();
    }

    function calcLayout() {
        splitX = width * 0.62;
        groundLevel = height * 0.6;
        fieldX = splitX * 0.55;
        fieldY = groundLevel;
        weatherStationX = splitX * 0.15;
        weatherStationY = groundLevel - 60;
        sliderY = height - 180;
    }

    function draw() {
        background(15);

        // --- 1. WEATHER SYSTEM ---
        updateWeather();
        
        // --- 2. PHYSICS ---
        let evapRate = baseEvaporationRate * map(temperature, 10, 45, 0.5, 3);
        if (moisture > 0) moisture -= evapRate;
        
        if (isRaining && moisture < 100) {
            moisture += rainPower;
        }
        
        // Hysteresis pump logic
        if (isRaining) {
            pumpActive = false;
        } else {
            if (moisture < moistureLowThreshold) {
                pumpActive = true;
            } else if (moisture >= moistureHighThreshold) {
                pumpActive = false;
            }
        }
        
        if (pumpActive && moisture < 100) {
            moisture += pumpPower;
        }

        moisture = constrain(moisture, 0, 100);
        
        let targetGrowth = map(moisture, 0, 100, 15, 100);
        plantGrowth = lerp(plantGrowth, targetGrowth, 0.03);
        
        // Sky transition
        let targetSky = isRaining ? 1 : 0;
        skyTransition = lerp(skyTransition, targetSky, 0.02);

        // Data logging
        if (frameCount % logInterval === 0) {
            dataLog.push({
                moisture: moisture,
                temp: temperature,
                pump: pumpActive,
                rain: isRaining
            });
            if (dataLog.length > 50) dataLog.shift();
        }

        // --- 3. DRAW SIMULATION (Left) ---
        push();
        drawSky();
        updateAndDrawClouds();
        drawSun();
        drawGround();
        drawWeatherStation(weatherStationX, weatherStationY);
        drawField(fieldX, fieldY);
        if (isRaining) updateAndDrawRain();
        updateAndDrawSplashes();
        pop();

        // Divider
        stroke(40);
        strokeWeight(2);
        line(splitX, 0, splitX, height);

        // --- 4. DRAW DASHBOARD (Right) ---
        drawDashboard();
    }

    // --- WEATHER SYSTEM ---
    function updateWeather() {
        if (!autoWeather) return;
        
        if (isRaining) {
            rainTimer++;
            if (rainTimer >= rainDuration) {
                isRaining = false;
                rainTimer = 0;
                nextRainIn = random(400, 900);
            }
        } else {
            nextRainIn--;
            if (nextRainIn <= 0) {
                isRaining = true;
                rainDuration = random(200, 500);
                rainTimer = 0;
            }
        }
    }

    // --- SKY ---
    function drawSky() {
        let sunnyTop = color(100, 180, 255);
        let sunnyBot = color(180, 220, 255);
        let rainyTop = color(50, 55, 65);
        let rainyBot = color(80, 85, 95);
        
        let topColor = lerpColor(sunnyTop, rainyTop, skyTransition);
        let botColor = lerpColor(sunnyBot, rainyBot, skyTransition);
        
        noStroke();
        for (let y = 0; y < groundLevel; y++) {
            let inter = map(y, 0, groundLevel, 0, 1);
            let c = lerpColor(topColor, botColor, inter);
            stroke(c);
            line(0, y, splitX, y);
        }
    }

    function drawSun() {
        if (skyTransition > 0.7) return;
        
        let sunAlpha = map(skyTransition, 0, 0.7, 255, 0);
        let sunX = splitX * 0.8;
        let sunY = 90;
        let pulse = sin(frameCount * 0.03) * 8;
        
        // Glow
        noStroke();
        for (let i = 5; i > 0; i--) {
            fill(255, 220, 100, sunAlpha * 0.1 * i);
            circle(sunX, sunY, 60 + pulse + i * 20);
        }
        
        // Sun body
        fill(255, 240, 150, sunAlpha);
        circle(sunX, sunY, 50 + pulse * 0.5);
    }

    function drawGround() {
        // Main ground
        let sunnyGround = color(90, 140, 70);
        let rainyGround = color(50, 80, 50);
        let groundColor = lerpColor(sunnyGround, rainyGround, skyTransition);
        
        noStroke();
        fill(groundColor);
        rect(0, groundLevel, splitX, height - groundLevel);
        
        // Grass blades
        let grassColor = lerpColor(color(70, 130, 50), color(40, 70, 40), skyTransition);
        stroke(grassColor);
        strokeWeight(2);
        
        for (let x = 5; x < splitX; x += 12) {
            if (x > fieldX - 110 && x < fieldX + 110) continue;
            let h = noise(x * 0.1, frameCount * 0.01) * 20 + 10;
            let sway = sin(frameCount * 0.05 + x * 0.1) * 4;
            line(x, groundLevel, x + sway, groundLevel - h);
        }
    }

    // --- CLOUDS ---
    class Cloud {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = random(0.3, 0.8);
            this.segments = [];
            for (let i = 0; i < 5; i++) {
                this.segments.push({
                    ox: random(-30, 30) * this.size,
                    oy: random(-10, 15) * this.size,
                    w: random(40, 70) * this.size,
                    h: random(25, 40) * this.size
                });
            }
        }
        
        update() {
            this.x += this.speed * (isRaining ? 1.5 : 1);
            if (this.x > splitX + 100) {
                this.x = -120;
                this.y = random(40, 140);
            }
        }
        
        display() {
            noStroke();
            let baseColor = lerpColor(color(255), color(70, 75, 85), skyTransition);
            let shadowColor = lerpColor(color(220), color(50, 55, 65), skyTransition);
            
            // Shadow
            fill(shadowColor);
            for (let s of this.segments) {
                ellipse(this.x + s.ox + 5, this.y + s.oy + 8, s.w, s.h);
            }
            
            // Main
            fill(baseColor);
            for (let s of this.segments) {
                ellipse(this.x + s.ox, this.y + s.oy, s.w, s.h);
            }
        }
    }

    function updateAndDrawClouds() {
        for (let c of clouds) {
            c.update();
            c.display();
        }
    }

    // --- RAIN ---
    class RainDroplet {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = random(-50, splitX + 50);
            this.y = random(-200, -20);
            this.speed = random(12, 20);
            this.length = random(15, 30);
            this.alpha = random(80, 180);
        }
        
        update() {
            this.y += this.speed;
            this.x -= 2;
            
            if (this.y > groundLevel) {
                if (random() < 0.3) {
                    splashes.push(new Splash(this.x, groundLevel));
                }
                this.reset();
            }
        }
        
        display() {
            stroke(180, 200, 255, this.alpha);
            strokeWeight(1.5);
            line(this.x, this.y, this.x - 3, this.y + this.length);
        }
    }

    function updateAndDrawRain() {
        for (let r of rainDroplets) {
            r.update();
            r.display();
        }
    }

    // --- SPLASHES ---
    class Splash {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.life = 15;
            this.maxLife = 15;
        }
        
        update() {
            this.life--;
        }
        
        display() {
            let alpha = map(this.life, 0, this.maxLife, 0, 150);
            let size = map(this.life, this.maxLife, 0, 2, 15);
            noFill();
            stroke(180, 200, 255, alpha);
            strokeWeight(1);
            ellipse(this.x, this.y, size, size * 0.4);
        }
    }

    function updateAndDrawSplashes() {
        for (let i = splashes.length - 1; i >= 0; i--) {
            splashes[i].update();
            splashes[i].display();
            if (splashes[i].life <= 0) splashes.splice(i, 1);
        }
    }

    // --- WEATHER STATION ---
    function drawWeatherStation(x, y) {
        // Pole
        stroke(100);
        strokeWeight(5);
        line(x, y + 50, x, y - 80);
        
        // Base
        fill(80);
        noStroke();
        rect(x - 20, y + 50, 40, 15, 3);
        
        // Main housing
        fill(200);
        stroke(150);
        strokeWeight(1);
        rect(x - 18, y - 35, 36, 25, 3);
        
        // Solar panel
        fill(30, 40, 60);
        rect(x - 25, y - 65, 20, 15, 2);
        stroke(50, 60, 90);
        strokeWeight(0.5);
        for (let i = 1; i < 3; i++) {
            line(x - 25 + i * 7, y - 65, x - 25 + i * 7, y - 50);
        }
        
        // Antenna with blink
        stroke(120);
        strokeWeight(2);
        line(x + 12, y - 35, x + 12, y - 75);
        let blink = sin(frameCount * 0.15) > 0;
        fill(blink ? color(255, 50, 50) : color(100, 20, 20));
        noStroke();
        circle(x + 12, y - 78, 6);
        
        // Rain gauge
        fill(220, 220, 240);
        stroke(180);
        strokeWeight(1);
        rect(x + 20, y - 25, 12, 25, 2);
        if (isRaining) {
            fill(100, 150, 255);
            noStroke();
            let level = (sin(frameCount * 0.08) + 1) * 8 + 3;
            rect(x + 22, y - 2 - level, 8, level, 1);
        }
        
        // Anemometer
        push();
        translate(x - 12, y - 50);
        stroke(120);
        strokeWeight(2);
        line(0, 0, 0, -12);
        let rotSpeed = isRaining ? 0.2 : 0.08;
        rotate(frameCount * rotSpeed);
        stroke(100);
        line(-12, 0, 12, 0);
        line(0, -12, 0, 12);
        fill(180);
        noStroke();
        circle(12, 0, 7);
        circle(-12, 0, 7);
        circle(0, 12, 7);
        circle(0, -12, 7);
        pop();
        
        // Wireless signal
        if (frameCount % 60 < 40) {
            noFill();
            stroke(100, 255, 150, 150);
            strokeWeight(1.5);
            for (let i = 1; i <= 3; i++) {
                arc(x + 12, y - 78, i * 15, i * 15, -PI * 0.7, -PI * 0.3);
            }
        }
        
        // Label
        fill(255);
        noStroke();
        textAlign(CENTER);
        textSize(10);
        text("WEATHER STN", x, y + 80);
        fill(150);
        textSize(9);
        text(`${temperature.toFixed(0)}°C`, x, y + 92);
    }

    // --- CROP FIELD ---
    function drawField(x, y) {
        let soilW = 200;
        let soilH = 100;
        
        // Soil cross-section
        let dryColor = color(170, 150, 110);
        let wetColor = color(50, 35, 20);
        let soilColor = lerpColor(dryColor, wetColor, moisture / 100);
        
        // Soil body
        fill(soilColor);
        stroke(40, 30, 20);
        strokeWeight(3);
        rect(x - soilW / 2, y, soilW, soilH, 0, 0, 8, 8);
        
        // Soil texture
        noStroke();
        fill(0, 0, 0, 30);
        for (let i = 0; i < 20; i++) {
            let sx = x - soilW / 2 + random(soilW);
            let sy = y + random(soilH);
            ellipse(sx, sy, random(5, 15), random(3, 8));
        }
        
        // Moisture level indicator
        if (moisture > 20) {
            fill(40, 60, 80, map(moisture, 20, 100, 0, 100));
            for (let i = 0; i < 8; i++) {
                let mx = x - soilW / 2 + 20 + i * 22;
                let my = y + 50 + sin(i * 0.5) * 15;
                ellipse(mx, my, 25, 10);
            }
        }
        
        // Grass edge
        stroke(70, 120, 50);
        strokeWeight(4);
        line(x - soilW / 2, y, x + soilW / 2, y);

        // Moisture Sensor
        push();
        translate(x + 60, y);
        
        // Probe
        fill(50);
        stroke(30);
        strokeWeight(2);
        rect(-8, -25, 16, 70, 2);
        
        // Sensor head
        fill(40);
        rect(-12, -35, 24, 18, 4);
        
        // Status LED
        let ledColor = moisture < moistureLowThreshold ? color(255, 50, 50) : 
                       moisture < moistureHighThreshold && pumpActive ? color(255, 200, 50) :
                       color(50, 255, 50);
        fill(ledColor);
        noStroke();
        circle(0, -26, 8);
        
        // Glow
        fill(red(ledColor), green(ledColor), blue(ledColor), 50);
        circle(0, -26, 16);
        
        pop();
        
        // Sensor label
        fill(200);
        textAlign(CENTER);
        textSize(9);
        text("SENSOR", x + 60, y + 55);

        // Plant
        drawPlant(x - 25, y, plantGrowth);

        // Sprinkler
        drawSprinkler(x - soilW / 2 - 25, y);
        
        // Moisture readout on soil
        fill(255, 255, 255, 200);
        textSize(14);
        textStyle(BOLD);
        text(`${moisture.toFixed(0)}%`, x, y + soilH - 20);
        textStyle(NORMAL);
        textSize(9);
        fill(200);
        text("SOIL MOISTURE", x, y + soilH - 8);
    }

    function drawPlant(x, y, growth) {
        let plantH = map(growth, 0, 100, 25, 120);
        let healthColor = lerpColor(color(180, 170, 50), color(50, 180, 50), growth / 100);
        
        push();
        translate(x, y);
        
        let sway = sin(frameCount * 0.04) * (isRaining ? 8 : 4);
        
        // Stem
        stroke(60, 100, 40);
        strokeWeight(7);
        noFill();
        beginShape();
        vertex(0, 0);
        quadraticVertex(sway * 0.3, -plantH * 0.5, sway, -plantH);
        endShape();
        
        // Leaves
        noStroke();
        fill(healthColor);
        
        // Bottom leaves
        push();
        translate(sway * 0.2, -plantH * 0.3);
        rotate(-0.5 + sin(frameCount * 0.05) * 0.1);
        ellipse(-18, 0, 35, 14);
        pop();
        
        push();
        translate(sway * 0.4, -plantH * 0.5);
        rotate(0.5 - sin(frameCount * 0.05 + 1) * 0.1);
        ellipse(18, 0, 35, 14);
        pop();
        
        // Top leaves
        push();
        translate(sway * 0.6, -plantH * 0.75);
        rotate(-0.3);
        ellipse(-15, 0, 30, 12);
        pop();
        
        push();
        translate(sway * 0.8, -plantH * 0.9);
        rotate(0.3);
        ellipse(12, 0, 28, 11);
        pop();
        
        // Top bud
        fill(lerpColor(healthColor, color(100, 200, 100), 0.3));
        ellipse(sway, -plantH - 5, 18, 25);
        
        pop();
    }

    function drawSprinkler(x, y) {
        // Underground pipe
        stroke(70);
        strokeWeight(10);
        line(x, y + 40, x, y + 80);
        
        // Vertical pipe
        stroke(90);
        strokeWeight(8);
        line(x, y + 40, x, y - 50);
        
        // Horizontal arm
        line(x, y - 50, x + 25, y - 50);
        
        // Nozzle
        fill(pumpActive ? color(100, 200, 255) : color(150));
        stroke(100);
        strokeWeight(2);
        ellipse(x + 30, y - 50, 14, 10);
        
        // Nozzle opening
        fill(pumpActive ? color(50, 150, 255) : color(80));
        noStroke();
        ellipse(x + 35, y - 50, 6, 6);
        
        if (pumpActive) {
            // Water stream
            for (let drop of sprinklerDroplets) {
                if (!drop.active && random() < 0.25) {
                    drop.launch(x + 35, y - 50);
                }
                drop.update(y + 50);
                drop.display();
            }
            
            // Mist effect
            noStroke();
            for (let i = 0; i < 15; i++) {
                let angle = random(-PI * 0.6, -PI * 0.15);
                let dist = random(10, 50);
                let mx = x + 35 + cos(angle) * dist;
                let my = y - 50 + sin(angle) * dist;
                fill(150, 220, 255, random(30, 100));
                circle(mx, my, random(2, 6));
            }
            
            // Status
            fill(0, 255, 200);
            textAlign(CENTER);
            textSize(10);
            textStyle(BOLD);
            text("▶ PUMPING", x + 15, y - 70);
            textStyle(NORMAL);
        }
    }

    class SprinklerDroplet {
        constructor() {
            this.active = false;
        }
        
        launch(ox, oy) {
            this.x = ox;
            this.y = oy;
            let angle = random(-PI * 0.55, -PI * 0.2);
            let speed = random(5, 10);
            this.vx = cos(angle) * speed;
            this.vy = sin(angle) * speed;
            this.active = true;
            this.alpha = 255;
            this.size = random(3, 6);
        }
        
        update(floorY) {
            if (!this.active) return;
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.25;
            this.alpha -= 4;
            if (this.y > floorY || this.alpha <= 0) {
                this.active = false;
            }
        }
        
        display() {
            if (!this.active) return;
            noStroke();
            fill(100, 200, 255, this.alpha);
            ellipse(this.x, this.y, this.size, this.size * 1.5);
        }
    }

    // --- DASHBOARD ---
    function drawDashboard() {
        let dx = splitX + 20;
        let dw = width - splitX - 40;
        let dy = 20;
        
        // Title
        fill(255);
        textAlign(LEFT);
        textSize(16);
        textStyle(BOLD);
        text("CONTROL CENTER", dx, dy + 15);
        textStyle(NORMAL);
        textSize(10);
        fill(100);
        text("IGCSE Computer Science • Sensor → Process → Actuator", dx, dy + 32);
        
        // Separator
        stroke(50);
        strokeWeight(1);
        line(dx, dy + 45, dx + dw, dy + 45);
        
        let sectionY = dy + 65;
        
        // --- INPUTS SECTION ---
        fill(80);
        textSize(11);
        textStyle(BOLD);
        text("━━ SENSOR INPUTS ━━", dx, sectionY);
        textStyle(NORMAL);
        
        sectionY += 25;
        
        // Weather Data
        drawDataRow(dx, sectionY, "WEATHER STATION", "", color(100));
        sectionY += 18;
        drawDataRow(dx + 15, sectionY, "Temperature", `${temperature.toFixed(1)}°C`, color(255, 200, 100));
        sectionY += 16;
        drawDataRow(dx + 15, sectionY, "Precipitation", isRaining ? "RAIN" : "CLEAR", isRaining ? color(100, 150, 255) : color(100, 255, 100));
        sectionY += 16;
        drawDataRow(dx + 15, sectionY, "Wind Speed", isRaining ? "HIGH" : "LOW", color(200));
        
        sectionY += 25;
        
        // Moisture Sensor
        drawDataRow(dx, sectionY, "MOISTURE SENSOR", "", color(100));
        sectionY += 18;
        let moistColor = moisture < moistureLowThreshold ? color(255, 100, 100) : 
                         moisture < moistureHighThreshold ? color(255, 200, 100) : color(100, 255, 100);
        drawDataRow(dx + 15, sectionY, "Analogue Value", `${moisture.toFixed(1)}%`, moistColor);
        
        sectionY += 30;
        
        // --- ADC SECTION ---
        stroke(50);
        line(dx, sectionY, dx + dw, sectionY);
        sectionY += 15;
        
        fill(80);
        textSize(11);
        textStyle(BOLD);
        text("━━ ADC CONVERSION ━━", dx, sectionY);
        textStyle(NORMAL);
        
        sectionY += 22;
        
        let digitalValue = Math.floor(moisture);
        let binaryString = digitalValue.toString(2).padStart(8, '0');
        
        drawDataRow(dx, sectionY, "Digital Value", digitalValue.toString(), color(0, 200, 255));
        sectionY += 18;
        
        // Binary display with individual bits
        fill(120);
        textSize(10);
        text("Binary:", dx, sectionY);
        
        textSize(14);
        textStyle(BOLD);
        for (let i = 0; i < 8; i++) {
            let bit = binaryString[i];
            fill(bit === '1' ? color(0, 255, 200) : color(60));
            text(bit, dx + 60 + i * 16, sectionY);
        }
        textStyle(NORMAL);
        
        sectionY += 30;
        
        // --- PROCESSOR SECTION ---
        stroke(50);
        line(dx, sectionY, dx + dw, sectionY);
        sectionY += 15;
        
        fill(80);
        textSize(11);
        textStyle(BOLD);
        text("━━ MICROPROCESSOR ━━", dx, sectionY);
        textStyle(NORMAL);
        
        sectionY += 22;
        
        // Logic conditions
        let cond1 = moisture < moistureLowThreshold;
        let cond2 = pumpActive && moisture < moistureHighThreshold;
        let cond3 = !isRaining;
        
        fill(150);
        textSize(10);
        text("LOGIC EVALUATION:", dx, sectionY);
        sectionY += 18;
        
        // Condition 1: Low moisture trigger
        let c1Status = cond1 ? "TRUE" : "FALSE";
        drawLogicRow(dx + 10, sectionY, `Moisture < 30%`, c1Status, cond1);
        sectionY += 15;
        
        // Condition 2: Hysteresis hold
        let c2Status = cond2 ? "TRUE" : "FALSE";
        drawLogicRow(dx + 10, sectionY, `Pump ON & < 60%`, c2Status, cond2);
        sectionY += 15;
        
        // OR gate result
        fill(100);
        text("└─ (C1 OR C2)", dx + 10, sectionY);
        fill((cond1 || cond2) ? color(0, 255, 150) : color(100));
        text((cond1 || cond2) ? "= TRUE" : "= FALSE", dx + 120, sectionY);
        sectionY += 18;
        
        // Condition 3: No rain
        let c3Status = cond3 ? "TRUE" : "FALSE";
        drawLogicRow(dx + 10, sectionY, `NOT Raining`, c3Status, cond3);
        sectionY += 18;
        
        // Final AND
        fill(100);
        text("RESULT:", dx, sectionY);
        let finalResult = (cond1 || cond2) && cond3;
        fill(finalResult ? color(0, 255, 255) : color(100));
        textStyle(BOLD);
        text(finalResult ? "ACTIVATE PUMP" : "STANDBY", dx + 70, sectionY);
        textStyle(NORMAL);
        
        sectionY += 30;
        
        // --- OUTPUT SECTION ---
        stroke(50);
        line(dx, sectionY, dx + dw, sectionY);
        sectionY += 15;
        
        fill(80);
        textSize(11);
        textStyle(BOLD);
        text("━━ ACTUATOR OUTPUT ━━", dx, sectionY);
        textStyle(NORMAL);
        
        sectionY += 22;
        
        // Pump status indicator
        let pumpColor = pumpActive ? color(0, 255, 200) : color(80);
        fill(pumpColor);
        noStroke();
        circle(dx + 15, sectionY - 4, 12);
        
        fill(0);
        textAlign(CENTER);
        textSize(8);
        text(pumpActive ? "ON" : "OFF", dx + 15, sectionY - 2);
        
        textAlign(LEFT);
        fill(pumpActive ? color(0, 255, 200) : color(120));
        textSize(12);
        textStyle(BOLD);
        text(pumpActive ? "PUMP ACTIVE" : "PUMP STANDBY", dx + 30, sectionY);
        textStyle(NORMAL);
        
        sectionY += 18;
        fill(120);
        textSize(10);
        text(`Signal: ${pumpActive ? "1 (HIGH)" : "0 (LOW)"}`, dx + 30, sectionY);
        
        // --- CONTROLS ---
        sectionY = height - 200;
        stroke(50);
        line(dx, sectionY, dx + dw, sectionY);
        sectionY += 15;
        
        fill(80);
        textSize(11);
        textStyle(BOLD);
        text("━━ CONTROLS ━━", dx, sectionY);
        textStyle(NORMAL);
        
        sectionY += 25;
        
        // Temperature slider
        fill(150);
        textSize(10);
        text("TEMPERATURE", dx, sectionY);
        
        let sliderX = dx;
        let sliderW = dw - 50;
        let sliderH = 8;
        sectionY += 15;
        
        // Slider track
        fill(40);
        noStroke();
        rect(sliderX, sectionY, sliderW, sliderH, 4);
        
        // Slider fill
        let tempNorm = map(temperature, 10, 45, 0, 1);
        let gradStart = color(100, 150, 255);
        let gradEnd = color(255, 100, 50);
        fill(lerpColor(gradStart, gradEnd, tempNorm));
        rect(sliderX, sectionY, sliderW * tempNorm, sliderH, 4);
        
        // Slider handle
        let handleX = sliderX + sliderW * tempNorm;
        fill(255);
        stroke(100);
        strokeWeight(2);
        circle(handleX, sectionY + sliderH / 2, 16);
        
        // Temp value
        fill(255);
        noStroke();
        textAlign(RIGHT);
        textSize(12);
        text(`${temperature.toFixed(0)}°C`, dx + dw, sectionY + 5);
        textAlign(LEFT);
        
        // Store slider position for interaction
        sliderY = sectionY;
        
        sectionY += 35;
        
        // Rain toggle button
        let btnW = dw;
        let btnH = 35;
        let btnHover = mouseX > dx && mouseX < dx + btnW && mouseY > sectionY && mouseY < sectionY + btnH;
        
        fill(btnHover ? 50 : 35);
        stroke(isRaining ? color(100, 150, 255) : color(100, 200, 100));
        strokeWeight(2);
        rect(dx, sectionY, btnW, btnH, 6);
        
        fill(255);
        noStroke();
        textAlign(CENTER);
        textSize(12);
        text(isRaining ? "☔ STOP RAIN" : "☀️ START RAIN", dx + btnW / 2, sectionY + 22);
        textAlign(LEFT);
        
        sectionY += 45;
        
        // Auto weather toggle
        fill(120);
        textSize(9);
        text("Auto Weather: " + (autoWeather ? "ON" : "OFF"), dx, sectionY);
        if (!isRaining && autoWeather) {
            fill(80);
            text(`Next rain in: ${Math.floor(nextRainIn / 60)}s`, dx + 120, sectionY);
        }
        
        sectionY += 20;
        fill(80);
        textSize(9);
        text("💡 Click simulation area to dry soil", dx, sectionY);
    }

    function drawDataRow(x, y, label, value, valueColor) {
        fill(150);
        textSize(10);
        text(label + ":", x, y);
        
        if (value !== "") {
            fill(valueColor);
            textStyle(BOLD);
            textAlign(RIGHT);
            text(value, width - 40, y);
            textAlign(LEFT);
            textStyle(NORMAL);
        }
    }

    function drawLogicRow(x, y, condition, status, isTrue) {
        fill(120);
        textSize(10);
        text(condition, x, y);
        
        fill(isTrue ? color(0, 255, 150) : color(255, 100, 100));
        textAlign(RIGHT);
        text(status, width - 40, y);
        textAlign(LEFT);
    }

    // --- INTERACTION ---
    function mousePressed() {
        let dx = splitX + 20;
        let dw = width - splitX - 40;
        
        // Rain button
        let btnY = height - 200 + 15 + 25 + 35 + 35;
        if (mouseX > dx && mouseX < dx + dw && mouseY > btnY - 35 && mouseY < btnY) {
            isRaining = !isRaining;
            if (isRaining) {
                rainDuration = 99999; // Manual control
                autoWeather = false;
            } else {
                nextRainIn = random(300, 600);
                autoWeather = true;
            }
        }
        
        // Click to dry soil
        if (mouseX < splitX && mouseY > 100) {
            moisture = max(0, moisture - 12);
        }
    }

    function mouseDragged() {
        // Temperature slider
        let dx = splitX + 20;
        let dw = width - splitX - 40;
        let sliderW = dw - 50;
        
        if (mouseX > dx - 10 && mouseX < dx + sliderW + 10 && mouseY > sliderY - 15 && mouseY < sliderY + 25) {
            let newTemp = map(mouseX, dx, dx + sliderW, 10, 45);
            temperature = constrain(newTemp, 10, 45);
        }
        
        // Also dry soil when dragging in sim area
        if (mouseX < splitX && mouseY > 100) {
            moisture = max(0, moisture - 0.5);
        }
    }
