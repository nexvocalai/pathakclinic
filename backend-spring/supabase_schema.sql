-- Pathak Homoeopathic Clinic Backend Schema for Supabase/PostgreSQL
-- Run this in Supabase SQL Editor before starting the Spring Boot app with the supabase profile.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_number VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    qualification VARCHAR(255),
    experience_years INTEGER,
    about TEXT,
    profile_image_url VARCHAR(500),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    age INTEGER,
    gender VARCHAR(20) DEFAULT 'OTHER',
    address TEXT,
    medical_history TEXT,
    total_appointments INTEGER DEFAULT 0,
    total_spent NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id),
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(50),
    reason VARCHAR(500),
    status VARCHAR(30) DEFAULT 'SCHEDULED',
    amount NUMERIC(10, 2) DEFAULT 0,
    payment_status VARCHAR(30) DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES appointments(id),
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(30) DEFAULT 'PAID',
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_appointment ON payments(appointment_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);

CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(100),
    author VARCHAR(255) DEFAULT 'Dr. Pathak',
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'DRAFT',
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at);

CREATE TABLE IF NOT EXISTS diseases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE,
    category VARCHAR(100),
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    homoeopathic_approach TEXT,
    duration VARCHAR(100),
    detailed_info TEXT,
    success_rate VARCHAR(50),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_diseases_slug ON diseases(slug);
CREATE INDEX IF NOT EXISTS idx_diseases_category ON diseases(category);
CREATE INDEX IF NOT EXISTS idx_diseases_active ON diseases(active);

CREATE TABLE IF NOT EXISTS disease_symptoms (
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    symptom VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_disease_symptoms_disease ON disease_symptoms(disease_id);

CREATE TABLE IF NOT EXISTS disease_causes (
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    cause VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_disease_causes_disease ON disease_causes(disease_id);

CREATE TABLE IF NOT EXISTS disease_remedies (
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    remedy VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_disease_remedies_disease ON disease_remedies(disease_id);

CREATE TABLE IF NOT EXISTS disease_precautions (
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    precaution VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_disease_precautions_disease ON disease_precautions(disease_id);

CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    condition_treated VARCHAR(255),
    testimonial_text TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url VARCHAR(500),
    approved BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published);

CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'CLINIC',
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);

-- Optional seed admin. Password hash is BCrypt for: password123
INSERT INTO doctors (name, email, password, registration_number, qualification, experience_years, about)
VALUES (
    'Dr. Pathak',
    'doctor@pathak.com',
    crypt('password123', gen_salt('bf')),
    'HOM-PATHAK-001',
    'BHMS',
    15,
    'Experienced homoeopathic practitioner focused on constitutional treatment.'
)
ON CONFLICT (email) DO NOTHING;
