-- Pathak Homoeopathic Clinic Management System
-- PostgreSQL Database Schema

-- Create Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- DOCTORS TABLE
-- ============================================================================
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    qualification VARCHAR(255),
    experience_years INT,
    about TEXT,
    profile_image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_doctors_email ON doctors(email);
CREATE INDEX idx_doctors_reg_number ON doctors(registration_number);

-- ============================================================================
-- PATIENTS TABLE
-- ============================================================================
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age INT,
    gender VARCHAR(10),
    address TEXT,
    medical_history TEXT,
    total_appointments INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_patients_name ON patients USING GIN(name gin_trgm_ops);

-- ============================================================================
-- APPOINTMENTS TABLE
-- ============================================================================
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    reason VARCHAR(500),
    status VARCHAR(20) DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW')),
    amount DECIMAL(10, 2),
    payment_status VARCHAR(20) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'REFUNDED')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(patient_id, appointment_date, time_slot)
);

CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_payment_status ON appointments(payment_status);

-- ============================================================================
-- PAYMENTS TABLE
-- ============================================================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'REFUNDED', 'FAILED')),
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_appointment ON payments(appointment_id);
CREATE INDEX idx_payments_status ON payments(status);

-- ============================================================================
-- BLOGS TABLE
-- ============================================================================
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(1000),
    category VARCHAR(100),
    author_id UUID NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED')),
    views INT DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_author ON blogs(author_id);
CREATE INDEX idx_blogs_published_at ON blogs(published_at DESC NULLS LAST);

-- ============================================================================
-- DISEASES TABLE
-- ============================================================================
CREATE TABLE diseases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    homoeopathic_approach TEXT,
    treatment_duration VARCHAR(100),
    detailed_info TEXT,
    success_rate VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_diseases_name ON diseases USING GIN(name gin_trgm_ops);
CREATE INDEX idx_diseases_category ON diseases(category);

-- ============================================================================
-- DISEASE SYMPTOMS TABLE
-- ============================================================================
CREATE TABLE disease_symptoms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    symptom VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_symptoms ON disease_symptoms(disease_id);
CREATE INDEX idx_disease_symptoms_text ON disease_symptoms USING GIN(symptom gin_trgm_ops);

-- ============================================================================
-- DISEASE CAUSES TABLE
-- ============================================================================
CREATE TABLE disease_causes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    cause VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_causes ON disease_causes(disease_id);

-- ============================================================================
-- DISEASE REMEDIES TABLE
-- ============================================================================
CREATE TABLE disease_remedies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    remedy VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_remedies ON disease_remedies(disease_id);

-- ============================================================================
-- DISEASE PRECAUTIONS TABLE
-- ============================================================================
CREATE TABLE disease_precautions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    precaution VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_precautions ON disease_precautions(disease_id);

-- ============================================================================
-- TRIGGERS FOR AUTO UPDATE TIMESTAMPS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER doctors_updated_at_trigger
    BEFORE UPDATE ON doctors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER patients_updated_at_trigger
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER appointments_updated_at_trigger
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER blogs_updated_at_trigger
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER diseases_updated_at_trigger
    BEFORE UPDATE ON diseases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================
CREATE VIEW monthly_revenue_summary AS
SELECT 
    DATE_TRUNC('month', a.appointment_date)::DATE as month,
    COUNT(*) as appointment_count,
    SUM(COALESCE(a.amount, 0)) as total_revenue,
    COUNT(DISTINCT a.patient_id) as unique_patients
FROM appointments a
WHERE a.payment_status = 'PAID'
GROUP BY DATE_TRUNC('month', a.appointment_date)
ORDER BY month DESC;

CREATE VIEW doctor_performance AS
SELECT 
    d.id,
    d.name,
    COUNT(a.id) as total_appointments,
    COUNT(CASE WHEN a.status = 'COMPLETED' THEN 1 END) as completed_appointments,
    SUM(COALESCE(p.amount, 0)) as total_revenue,
    ROUND(100.0 * COUNT(CASE WHEN a.status = 'COMPLETED' THEN 1 END) / COUNT(a.id), 2) as completion_rate
FROM doctors d
LEFT JOIN appointments a ON d.id = a.doctor_id
LEFT JOIN payments p ON a.id = p.appointment_id
GROUP BY d.id, d.name;

CREATE VIEW patient_statistics AS
SELECT 
    p.id,
    p.name,
    COUNT(a.id) as appointment_count,
    MIN(a.appointment_date) as first_appointment,
    MAX(a.appointment_date) as last_appointment,
    COALESCE(p.total_spent, 0) as total_spent
FROM patients p
LEFT JOIN appointments a ON p.id = a.patient_id
GROUP BY p.id, p.name, p.total_spent;

-- ============================================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- ============================================================================
CREATE OR REPLACE FUNCTION get_monthly_dashboard_stats(month INT, year INT)
RETURNS TABLE(
    total_patients BIGINT,
    total_appointments BIGINT,
    monthly_revenue NUMERIC,
    revenue_growth NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(DISTINCT p.id)::BIGINT,
        COUNT(DISTINCT a.id)::BIGINT,
        COALESCE(SUM(a.amount), 0)::NUMERIC,
        0::NUMERIC
    FROM patients p
    FULL OUTER JOIN appointments a ON p.id = a.patient_id
    WHERE EXTRACT(MONTH FROM a.appointment_date) = month
    AND EXTRACT(YEAR FROM a.appointment_date) = year
    AND a.payment_status = 'PAID';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- GRANTS (Adjust as needed based on your user setup)
-- ============================================================================
-- GRANT CONNECT ON DATABASE pathak_clinic TO app_user;
-- GRANT USAGE ON SCHEMA public TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- ============================================================================
-- SAMPLE DATA (Optional - for development)
-- ============================================================================
-- Uncomment to insert sample data

-- INSERT INTO doctors (name, email, password, registration_number, phone, qualification, experience_years)
-- VALUES (
--     'Dr. Rajesh Pathak',
--     'doctor@pathak.com',
--     '$2a$10$...',  -- Bcrypt hashed password
--     'REG12345',
--     '+91-9876543210',
--     'BHMS, MD (Homeopathy)',
--     20
-- );

-- INSERT INTO patients (name, email, phone, age, gender, address)
-- VALUES (
--     'John Doe',
--     'john@example.com',
--     '+91-9123456789',
--     35,
--     'MALE',
--     '123 Main Street, City'
-- );

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
