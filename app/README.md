# AlHussain Health Hospital Website

A comprehensive hospital website featuring a modern design, responsive layout, and multiple sections to showcase hospital services, doctors, and facilities.

## Features

- Modern and professional UI/UX design
- Fully responsive layout for all devices
- Hero section with image slider
- About section with hospital information
- Statistics counter section
- Departments showcase
- Doctor profiles (resident and visiting consultants)
- Photo gallery with filtering capability
- Branch network information
- FAQ section
- Testimonials from patients
- Contact form and information

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Template Engine**: EJS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MySQL

## Installation and Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd alhussainhealth
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory if not already present
   - Add the following variables:
     ```
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=alhussainhealth
     NODE_ENV=development
     ```

4. Set up the database:
   - Create a MySQL database named `alhussainhealth`
   - Import the database schema (optional - for full functionality)

5. Start the server:
   - For development: `npm run dev`
   - For production: `npm start`

6. Access the website:
   - Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
alhussainhealth/
├── config/           # Configuration files
├── public/           # Static assets
│   ├── css/          # CSS files
│   ├── js/           # JavaScript files
│   └── images/       # Image files
├── src/              # Source code
│   ├── controllers/  # Application controllers
│   ├── models/       # Database models
│   └── routes/       # Application routes
├── views/            # EJS templates
│   └── partials/     # Reusable template parts
├── .env              # Environment variables
├── package.json      # Project dependencies
├── server.js         # Main application file
└── README.md         # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Bootstrap 5 for the responsive design
- Font Awesome for icons
- jQuery for JavaScript functionality
- Lightbox for the gallery functionality 