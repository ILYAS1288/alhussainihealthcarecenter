/**
 * Script to generate a placeholder logo for AlHussain Health
 * This creates a simple SVG logo and saves it to public/images/placeholder-logo.png
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
const canvas = createCanvas(200, 60);
const ctx = canvas.getContext('2d');

// Fill the background
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 200, 60);

// Draw a rounded rectangle for the logo background
ctx.fillStyle = '#007bff';
ctx.beginPath();
ctx.roundRect(5, 5, 50, 50, 10);
ctx.fill();

// Draw the stylized "AH" text in the logo
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 30px Arial';
ctx.fillText('AH', 15, 40);

// Draw the text for the brand name
ctx.fillStyle = '#212529';
ctx.font = 'bold 20px Arial';
ctx.fillText('AlHussain', 65, 30);

ctx.fillStyle = '#007bff';
ctx.font = 'bold 20px Arial';
ctx.fillText('Health', 65, 50);

// Save the image to a file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(imagesDir, 'placeholder-logo.png'), buffer);

console.log('Placeholder logo generated at public/images/placeholder-logo.png'); 