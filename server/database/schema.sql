-- EduHub Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS eduhub;
USE eduhub;

-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
    avatar VARCHAR(255),
    bio TEXT,
    phone VARCHAR(20),
    date_of_birth DATE,
    country VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires DATETIME,
    last_login DATETIME,
    login_attempts INT DEFAULT 0,
    locked_until DATETIME,
    preferences JSON,
    social_profiles JSON,
    points INT DEFAULT 0,
    level INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(255),
    color VARCHAR(7) DEFAULT '#3B82F6',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    slug VARCHAR(255) NOT NULL UNIQUE,
    thumbnail VARCHAR(255),
    trailer_video VARCHAR(255),
    price DECIMAL(10,2) DEFAULT 0.00,
    original_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    duration_hours INT DEFAULT 0,
    language VARCHAR(10) DEFAULT 'en',
    requirements TEXT,
    what_you_learn TEXT,
    target_audience TEXT,
    instructorId VARCHAR(36) NOT NULL,
    categoryId INT NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    enrollment_count INT DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    tags JSON,
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructorId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_instructor (instructorId),
    INDEX idx_category (categoryId),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_published (published_at)
);

-- Enrollments table
CREATE TABLE enrollments (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    courseId VARCHAR(36) NOT NULL,
    status ENUM('active', 'completed', 'cancelled', 'expired') DEFAULT 'active',
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    expires_at DATETIME,
    payment_id VARCHAR(36),
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_url VARCHAR(255),
    last_accessed DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (userId, courseId),
    INDEX idx_user (userId),
    INDEX idx_course (courseId),
    INDEX idx_status (status)
);

-- Insert sample data
INSERT INTO categories (name, description, slug, icon, color) VALUES
('Web Development', 'Learn modern web development technologies', 'web-development', 'code', '#3B82F6'),
('Data Science', 'Master data analysis and machine learning', 'data-science', 'chart-bar', '#10B981'),
('Mobile Development', 'Build mobile apps for iOS and Android', 'mobile-development', 'device-mobile', '#8B5CF6'),
('Design', 'UI/UX design and graphic design courses', 'design', 'color-swatch', '#F59E0B'),
('Business', 'Business skills and entrepreneurship', 'business', 'briefcase', '#EF4444'),
('Marketing', 'Digital marketing and growth strategies', 'marketing', 'speakerphone', '#EC4899');

-- Insert sample admin user (password: admin123)
INSERT INTO users (id, email, password, first_name, last_name, role, is_verified, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@eduhub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Admin', 'User', 'admin', TRUE, TRUE);

-- Insert sample instructor (password: instructor123)
INSERT INTO users (id, email, password, first_name, last_name, role, is_verified, is_active, bio) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'instructor@eduhub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'John', 'Instructor', 'instructor', TRUE, TRUE, 'Experienced web developer with 10+ years in the industry');

-- Insert sample student (password: student123)
INSERT INTO users (id, email, password, first_name, last_name, role, is_verified, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'student@eduhub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'Jane', 'Student', 'student', TRUE, TRUE);
