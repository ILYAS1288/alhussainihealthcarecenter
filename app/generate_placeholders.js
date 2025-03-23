/**
 * Placeholder Image Generator for AlHussain Health Website
 * 
 * This script generates placeholder images for the website.
 * Note: You should replace these with real images for production.
 * 
 * To run: node generate_placeholders.js
 * Requires: node-fetch
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Image directories
const imagesDir = path.join(__dirname, 'public', 'images');

// Make sure the images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download an image from a URL
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        
        https.get(url, response => {
            response.pipe(file);
            
            file.on('finish', () => {
                file.close(resolve);
                console.log(`Downloaded: ${filepath}`);
            });
        }).on('error', err => {
            fs.unlink(filepath, () => {}); // Delete the file if there's an error
            reject(err);
        });
    });
}

// Generate placeholders using placehold.co or placekitten.com
async function generatePlaceholders() {
    // Hero images
    await downloadImage('https://placekitten.com/1920/800', path.join(imagesDir, 'hero1.jpg'));
    await downloadImage('https://placekitten.com/1920/801', path.join(imagesDir, 'hero2.jpg'));
    await downloadImage('https://placekitten.com/1920/802', path.join(imagesDir, 'hero3.jpg'));
    
    // About hospital image
    await downloadImage('https://placekitten.com/600/400', path.join(imagesDir, 'about-hospital.jpg'));
    
    // Doctor images
    await downloadImage('https://placekitten.com/300/400', path.join(imagesDir, 'doctor1.jpg'));
    await downloadImage('https://placekitten.com/301/400', path.join(imagesDir, 'doctor2.jpg'));
    await downloadImage('https://placekitten.com/302/400', path.join(imagesDir, 'doctor3.jpg'));
    
    // Consultant images
    await downloadImage('https://placekitten.com/303/400', path.join(imagesDir, 'consultant1.jpg'));
    await downloadImage('https://placekitten.com/304/400', path.join(imagesDir, 'consultant2.jpg'));
    await downloadImage('https://placekitten.com/305/400', path.join(imagesDir, 'consultant3.jpg'));
    
    // Gallery images
    await downloadImage('https://placekitten.com/400/300', path.join(imagesDir, 'gallery1.jpg'));
    await downloadImage('https://placekitten.com/401/300', path.join(imagesDir, 'gallery2.jpg'));
    await downloadImage('https://placekitten.com/402/300', path.join(imagesDir, 'gallery3.jpg'));
    await downloadImage('https://placekitten.com/403/300', path.join(imagesDir, 'gallery4.jpg'));
    await downloadImage('https://placekitten.com/404/300', path.join(imagesDir, 'gallery5.jpg'));
    await downloadImage('https://placekitten.com/405/300', path.join(imagesDir, 'gallery6.jpg'));
    
    // Patient images for testimonials
    await downloadImage('https://placekitten.com/100/100', path.join(imagesDir, 'patient1.jpg'));
    await downloadImage('https://placekitten.com/101/100', path.join(imagesDir, 'patient2.jpg'));
    await downloadImage('https://placekitten.com/102/100', path.join(imagesDir, 'patient3.jpg'));
    
    console.log('All placeholder images have been generated!');
    console.log('Note: Replace these with real images before deploying to production.');
}

// Run the function
generatePlaceholders().catch(console.error); 