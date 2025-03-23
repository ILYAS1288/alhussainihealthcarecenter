/**
 * Script to generate a pattern background for the page headers
 * This creates a simple grid pattern image and saves it to public/images/pattern.png
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Create a canvas instance
const size = 100;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Fill the background
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, size, size);

// Draw a grid pattern
ctx.strokeStyle = '#000000';
ctx.lineWidth = 0.5;
ctx.globalAlpha = 0.1;

// Vertical lines
for (let x = 0; x <= size; x += 10) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
}

// Horizontal lines
for (let y = 0; y <= size; y += 10) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
}

// Draw some dots at intersections
ctx.fillStyle = '#000000';
ctx.globalAlpha = 0.2;
for (let x = 0; x <= size; x += 20) {
    for (let y = 0; y <= size; y += 20) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Save the image to a file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(imagesDir, 'pattern.png'), buffer);

console.log('Pattern image generated at public/images/pattern.png'); 