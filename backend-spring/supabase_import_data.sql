-- H2 -> Supabase/PostgreSQL data import for Pathak Homoeopathic Clinic.
-- Run supabase_schema.sql first, then run this file in the Supabase SQL Editor.
--
-- This replaces data in the application tables so the H2 IDs can be preserved
-- without conflicts from seed rows.

BEGIN;

TRUNCATE TABLE
    payments,
    appointments,
    disease_symptoms,
    disease_causes,
    disease_remedies,
    disease_precautions,
    testimonials,
    blogs,
    diseases,
    patients,
    doctors
RESTART IDENTITY CASCADE;

INSERT INTO public.doctors (
    id,
    about,
    active,
    created_at,
    email,
    experience_years,
    name,
    password,
    phone,
    profile_image_url,
    qualification,
    registration_number,
    updated_at
) VALUES (
    UUID '563c6d89-6993-4fad-b518-cbf9dda6f988',
    'Experienced homoeopathic practitioner focused on constitutional treatment.',
    TRUE,
    TIMESTAMP '2026-05-23 12:31:14.567698',
    'doctor@pathak.com',
    15,
    'Dr. Pathak',
    '$2a$10$Ab45OkWVwCzzfnrLjDbRTOp9ehfINh4gyPziYMEdbakuKLGYpKvYu',
    NULL,
    NULL,
    'BHMS',
    'HOM-PATHAK-001',
    TIMESTAMP '2026-05-23 12:31:14.567698'
);

INSERT INTO public.patients (
    id,
    address,
    age,
    created_at,
    email,
    gender,
    medical_history,
    name,
    phone,
    total_appointments,
    total_spent,
    updated_at
) VALUES
    (
        UUID '49f78674-769a-4b60-8056-9e0b89af20e2',
        'Indore, Madhya Pradesh',
        34,
        TIMESTAMP '2026-05-23 12:31:14.621909',
        'anita@example.com',
        'FEMALE',
        '',
        'Anita Sharma',
        '+919876543210',
        1,
        1001.00,
        TIMESTAMP '2026-05-23 16:06:14.189127'
    ),
    (
        UUID '227f39b3-4b87-4893-97e6-b3b41e97931c',
        'Bhopal, Madhya Pradesh',
        42,
        TIMESTAMP '2026-05-23 12:31:14.621909',
        'rahul@example.com',
        'MALE',
        '',
        'Rahul Verma',
        '+919812345670',
        1,
        700.00,
        TIMESTAMP '2026-05-23 12:31:14.646943'
    );

INSERT INTO public.diseases (
    id,
    active,
    category,
    created_at,
    description,
    detailed_info,
    duration,
    homoeopathic_approach,
    image_url,
    name,
    slug,
    success_rate,
    updated_at
) VALUES (
    UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a',
    TRUE,
    'Joint & Bone Disorders',
    TIMESTAMP '2026-05-23 12:31:14.657907',
    'Arthritis includes joint pain, stiffness, inflammation, and reduced mobility that may affect daily activities.',
    'Long-standing joint complaints need individualized assessment and periodic follow-up.',
    '3-6 months',
    'Treatment is selected after understanding modalities, constitution, and symptom pattern.',
    NULL,
    'Arthritis',
    'arthritis',
    '75-85%',
    TIMESTAMP '2026-05-23 12:31:14.657907'
);

INSERT INTO public.disease_causes (disease_id, cause) VALUES
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Age-related wear'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Inflammation'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Autoimmune tendency');

INSERT INTO public.disease_precautions (disease_id, precaution) VALUES
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Maintain gentle movement'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Avoid sudden strain'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Support healthy weight');

INSERT INTO public.disease_remedies (disease_id, remedy) VALUES
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Rhus Tox'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Bryonia'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Calcarea Carb');

INSERT INTO public.disease_symptoms (disease_id, symptom) VALUES
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Joint pain'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Swelling'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Morning stiffness'),
    (UUID 'ef09b8da-ec05-4681-b929-298ec8f8971a', 'Reduced mobility');

INSERT INTO public.blogs (
    id,
    author,
    category,
    content,
    created_at,
    excerpt,
    featured,
    image_url,
    published_at,
    slug,
    status,
    title,
    updated_at,
    views
) VALUES (
    UUID '6fb2319c-0f5a-41a5-9a82-55cd46b823f4',
    'Dr. Pathak',
    'General',
    'Homoeopathy focuses on the patient as a whole, considering physical symptoms, tendencies, and emotional context before prescribing.',
    TIMESTAMP '2026-05-23 12:31:14.655904',
    'A practical look at constitutional care and gentle long-term support.',
    TRUE,
    NULL,
    TIMESTAMP '2026-05-20 12:31:14.655904',
    'homoeopathy-long-term-wellness',
    'PUBLISHED',
    'How Homoeopathy Supports Long-Term Wellness',
    TIMESTAMP '2026-05-23 12:31:14.655904',
    0
);

INSERT INTO public.testimonials (
    id,
    approved,
    condition_treated,
    created_at,
    image_url,
    name,
    published,
    rating,
    testimonial_text,
    updated_at
) VALUES (
    UUID '96c733b8-de63-4da5-b357-0e9394ec97a8',
    TRUE,
    'Chronic allergy',
    TIMESTAMP '2026-05-23 12:31:14.674904',
    NULL,
    'S. Mehta',
    TRUE,
    5,
    'The clinic helped me understand and manage my recurring allergy symptoms with patient follow-up.',
    TIMESTAMP '2026-05-23 12:31:14.674904'
);

INSERT INTO public.appointments (
    id,
    amount,
    appointment_date,
    created_at,
    notes,
    payment_status,
    reason,
    status,
    time_slot,
    updated_at,
    doctor_id,
    patient_id
) VALUES
    (
        UUID 'e8da3991-e1a8-4e91-8562-e4897eac1540',
        1001.00,
        DATE '2026-05-24',
        TIMESTAMP '2026-05-23 12:31:14.624942',
        'asdd',
        'PAID',
        'Migraine and sleep disturbance',
        'COMPLETED',
        '10:30 AM',
        TIMESTAMP '2026-05-23 16:06:33.490133',
        UUID '563c6d89-6993-4fad-b518-cbf9dda6f988',
        UUID '49f78674-769a-4b60-8056-9e0b89af20e2'
    ),
    (
        UUID '1553cd66-0c76-4a6c-acb7-909f0ea8f74a',
        700.00,
        DATE '2026-05-18',
        TIMESTAMP '2026-05-23 12:31:14.624942',
        NULL,
        'PAID',
        'Joint stiffness and pain',
        'COMPLETED',
        '04:00 PM',
        TIMESTAMP '2026-05-23 12:31:14.624942',
        UUID '563c6d89-6993-4fad-b518-cbf9dda6f988',
        UUID '227f39b3-4b87-4893-97e6-b3b41e97931c'
    );

INSERT INTO public.payments (
    id,
    amount,
    created_at,
    payment_date,
    payment_method,
    status,
    appointment_id
) VALUES
    (
        UUID 'e7d0aca1-0266-4110-b89f-3d56d682a1c7',
        700.00,
        TIMESTAMP '2026-05-23 12:31:14.654911',
        TIMESTAMP '2026-05-18 12:31:14.653904',
        'CASH',
        'PAID',
        UUID '1553cd66-0c76-4a6c-acb7-909f0ea8f74a'
    ),
    (
        UUID '18320f56-aec7-4f5c-8edf-1ebc9c0122e9',
        1001.00,
        TIMESTAMP '2026-05-23 16:06:14.174464',
        TIMESTAMP '2026-05-23 16:06:14.158166',
        'CASH',
        'PAID',
        UUID 'e8da3991-e1a8-4e91-8562-e4897eac1540'
    );

COMMIT;
