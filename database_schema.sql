-- Drop the database if it exists (use with caution)
-- DROP DATABASE IF EXISTS alhussainhealth;

-- Create the database
CREATE DATABASE IF NOT EXISTS alhussainhealth;

-- Use the database
USE alhussainhealth;

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    qualification VARCHAR(255),
    department_id INT,
    is_resident BOOLEAN DEFAULT TRUE,
    consultation_hours VARCHAR(255),
    profile_image VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(20),
    social_media JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(100) NOT NULL,
    patient_image VARCHAR(255),
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    category ENUM('facilities', 'equipment', 'staff', 'events') NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Branches table
CREATE TABLE IF NOT EXISTS branches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    working_hours TEXT,
    map_coordinates VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(100) NOT NULL,
    patient_email VARCHAR(100) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    doctor_id INT,
    department_id INT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users table (for admin panel access)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'doctor', 'staff') NOT NULL DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample departments
INSERT INTO departments (name, description, icon) VALUES
('Cardiology', 'Providing expert cardiac care with advanced technology.', 'fa-heartbeat'),
('Neurology', 'Comprehensive care for neurological conditions.', 'fa-brain'),
('Orthopedics', 'Specialized care for bone and joint issues.', 'fa-bone'),
('Pediatrics', 'Child-focused healthcare from birth through adolescence.', 'fa-child'),
('ENT', 'Comprehensive care for ear, nose, and throat conditions.', 'fa-ear'),
('Dermatology', 'Expert care for skin, hair, and nail conditions.', 'fa-allergies');

-- Insert sample doctors (you would add your own data here)
INSERT INTO doctors (name, specialization, qualification, department_id, is_resident, consultation_hours, profile_image) VALUES
('Dr. John Doe', 'Cardiologist', 'MD, FRCP', 1, TRUE, 'Mon-Fri: 9am - 5pm', 'doctor1.jpg'),
('Dr. Jane Smith', 'Neurologist', 'MD, PhD', 2, TRUE, 'Mon-Fri: 10am - 6pm', 'doctor2.jpg'),
('Dr. Emily White', 'Pediatrician', 'MD, DCH', 4, TRUE, 'Mon-Fri: 8am - 4pm', 'doctor3.jpg'),
('Dr. Michael Brown', 'Orthopedic Surgeon', 'MS, MCh', 3, FALSE, 'Wed: 2pm - 6pm', 'consultant1.jpg'),
('Dr. Sarah Green', 'Dermatologist', 'MD, DVD', 6, FALSE, 'Fri: 10am - 2pm', 'consultant2.jpg'),
('Dr. David Lee', 'Gastroenterologist', 'MD, DM', NULL, FALSE, 'Mon: 1pm - 5pm', 'consultant3.jpg');

-- Insert sample testimonials
INSERT INTO testimonials (patient_name, patient_image, content, rating, is_featured) VALUES
('Mary Johnson', 'patient1.jpg', 'The care I received at AlHussain Health was exceptional. The staff was attentive and the facilities were top-notch.', 4.5, TRUE),
('James Smith', 'patient2.jpg', 'I am grateful for the excellent care provided by the doctors and nurses at AlHussain Health. Highly recommend!', 5, TRUE),
('Linda Williams', 'patient3.jpg', 'The facilities at AlHussain Health are state-of-the-art and the staff is incredibly professional and caring.', 4.5, TRUE);

-- Insert sample admin user (username: admin, password: admin123)
-- Note: In a production environment, use a secure hashing algorithm for passwords
INSERT INTO users (username, password, name, email, role) VALUES
('admin', '$2a$10$XgXLGQBMG5U1XJ1q8QU.qOudaLWF5J2jZQzSvK.CJRjY5vQ9OqKOS', 'Administrator', 'admin@alhussainhealth.com', 'admin'); 