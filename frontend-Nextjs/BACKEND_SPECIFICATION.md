# Pathak Homoeopathic - Backend & Database Specification

## Project Overview

**Project Name:** Pathak Homoeopathic Clinic Website  
**Type:** Medical/Healthcare Practice Website with Content Management  
**Primary Purpose:** Professional website for a homoeopathic clinic offering appointment booking, disease information, testimonials, and blog content

---

## Database Design & Schema

### Technology Stack
- **Database:** PostgreSQL
- **ORM:** (To be determined - Prisma, TypeORM, or raw SQL queries)
- **Authentication:** (To be determined - JWT, sessions, or third-party auth)

---

## Database Tables & Schema

### 1. **Diseases Table**
```sql
CREATE TABLE diseases (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  detailed_info TEXT,
  homoeopathic_approach TEXT,
  success_rate VARCHAR(50),
  duration VARCHAR(100),
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_active (is_active)
);
```

**Fields:**
- `id` - Primary key (auto-increment)
- `slug` - URL-friendly identifier (e.g., "arthritis", "diabetes")
- `name` - Display name of disease
- `category` - Classification (e.g., "Joint & Bone Disorders", "Metabolic Disorders")
- `description` - Short description (150-200 words)
- `detailed_info` - Comprehensive information about the disease
- `homoeopathic_approach` - Explanation of treatment philosophy
- `success_rate` - Percentage range (e.g., "75-85%")
- `duration` - Expected treatment duration (e.g., "3-6 months")
- `image_url` - Featured image for the disease
- `is_active` - For soft deletes/visibility control
- `created_at`, `updated_at` - Timestamps

---

### 2. **Disease Symptoms Table**
```sql
CREATE TABLE disease_symptoms (
  id SERIAL PRIMARY KEY,
  disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  symptom TEXT NOT NULL,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_disease_id (disease_id)
);
```

**Relationship:** One disease has many symptoms (1:N)

---

### 3. **Disease Causes Table**
```sql
CREATE TABLE disease_causes (
  id SERIAL PRIMARY KEY,
  disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  cause TEXT NOT NULL,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_disease_id (disease_id)
);
```

**Relationship:** One disease has many causes (1:N)

---

### 4. **Disease Remedies Table**
```sql
CREATE TABLE disease_remedies (
  id SERIAL PRIMARY KEY,
  disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  remedy_name VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_disease_id (disease_id)
);
```

**Relationship:** One disease has many remedies (1:N)

---

### 5. **Disease Precautions Table**
```sql
CREATE TABLE disease_precautions (
  id SERIAL PRIMARY KEY,
  disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  precaution TEXT NOT NULL,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_disease_id (disease_id)
);
```

**Relationship:** One disease has many precautions (1:N)

---

### 6. **Blog Posts Table**
```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255) DEFAULT 'Dr. Pathak',
  category VARCHAR(100),
  image_url VARCHAR(500),
  read_time_minutes INTEGER,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_published (is_published),
  INDEX idx_category (category),
  INDEX idx_published_at (published_at)
);
```

**Fields:**
- `id` - Primary key
- `slug` - URL-friendly identifier for blog post
- `title` - Article title
- `excerpt` - Summary/preview text
- `content` - Full article content (markdown or HTML)
- `author` - Author name
- `category` - Blog category (e.g., "General", "Skin Health", "Respiratory Health", "Women's Health", "Child Care", "Mental Health")
- `image_url` - Featured image
- `read_time_minutes` - Estimated reading time
- `is_published` - Publication status
- `published_at` - Publication timestamp
- `created_at`, `updated_at` - Timestamps

---

### 7. **Testimonials Table**
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  condition_treated VARCHAR(255) NOT NULL,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url VARCHAR(500),
  is_approved BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_approved (is_approved),
  INDEX idx_published (is_published)
);
```

**Fields:**
- `id` - Primary key
- `name` - Patient name
- `condition_treated` - Disease/condition treated
- `testimonial_text` - Review text
- `rating` - Star rating (1-5)
- `image_url` - Optional patient photo
- `is_approved` - Admin approval status
- `is_published` - Visibility status
- `created_at`, `updated_at` - Timestamps

---

### 8. **Appointments Table**
```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  preferred_date DATE,
  preferred_time TIME,
  condition VARCHAR(255),
  message TEXT,
  booking_method VARCHAR(50), -- 'phone', 'whatsapp', 'form'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

**Fields:**
- `id` - Primary key
- `name` - Patient name
- `email` - Patient email
- `phone` - Phone number
- `preferred_date` - Requested appointment date
- `preferred_time` - Requested appointment time
- `condition` - Condition for which appointment is being booked
- `message` - Additional notes/message
- `booking_method` - How appointment was booked (phone, WhatsApp, or form)
- `status` - Appointment status
- `created_at`, `updated_at` - Timestamps

---

### 9. **Doctor Profile Table**
```sql
CREATE TABLE doctor_profile (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  bio TEXT,
  profile_image_url VARCHAR(500),
  registration_number VARCHAR(255) UNIQUE,
  years_of_experience INTEGER,
  qualifications TEXT, -- JSON array of qualifications
  license_number VARCHAR(255),
  clinic_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(registration_number)
);
```

**Fields:**
- `id` - Primary key
- `first_name`, `last_name` - Doctor's name
- `bio` - Professional biography
- `profile_image_url` - Doctor photo
- `registration_number` - Medical registration/license number
- `years_of_experience` - Years practicing
- `qualifications` - JSON array of degrees and certifications
- `license_number` - License number
- `clinic_name` - Associated clinic name

---

### 10. **Doctor Achievements Table**
```sql
CREATE TABLE doctor_achievements (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL REFERENCES doctor_profile(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  achievement_type VARCHAR(100), -- 'award', 'certification', 'recognition', 'publication'
  image_url VARCHAR(500),
  year INTEGER,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_doctor_id (doctor_id)
);
```

**Relationship:** One doctor has many achievements (1:N)

---

### 11. **Clinic Information Table**
```sql
CREATE TABLE clinic_info (
  id SERIAL PRIMARY KEY,
  clinic_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100),
  phone_number VARCHAR(20) NOT NULL,
  whatsapp_number VARCHAR(20),
  email VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  opening_time TIME,
  closing_time TIME,
  clinic_image_url VARCHAR(500),
  description TEXT,
  established_year INTEGER,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- Contact information
- Location coordinates (for map integration)
- Operating hours
- Business details

---

### 12. **Clinic Hours Table**
```sql
CREATE TABLE clinic_hours (
  id SERIAL PRIMARY KEY,
  clinic_id INTEGER REFERENCES clinic_info(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20), -- 'monday', 'tuesday', etc.
  opening_time TIME,
  closing_time TIME,
  is_closed BOOLEAN DEFAULT false,
  special_hours_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(clinic_id, day_of_week)
);
```

**Example Data:**
- Monday to Saturday: 10:00 AM - 6:00 PM
- Sunday: 10:00 AM - 2:00 PM

---

### 13. **Statistics Table** (Optional)
```sql
CREATE TABLE clinic_statistics (
  id SERIAL PRIMARY KEY,
  patients_treated INTEGER,
  treatment_success_rate DECIMAL(5,2),
  years_of_practice INTEGER,
  conditions_treated INTEGER,
  total_appointments INTEGER,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ER Diagram

```
diseases (1) ──────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
                           │                      │                      │                      │
                        (N) (N)                (N) (N)                (N) (N)                (N)
                           │                      │                      │                      │
            disease_symptoms disease_causes  disease_remedies   disease_precautions

doctor_profile (1) ───────────── (N) doctor_achievements

clinic_info (1) ───────────────── (N) clinic_hours

(Independent tables)
- blog_posts
- testimonials
- appointments
- clinic_statistics
```

---

## API Endpoints Required

### Diseases API
```
GET    /api/diseases                    - List all diseases with pagination
GET    /api/diseases/search?q=term     - Search diseases by name/symptoms
GET    /api/diseases/:slug             - Get single disease details
GET    /api/diseases/category/:cat     - Get diseases by category
POST   /api/diseases                   - Create disease (admin)
PUT    /api/diseases/:id               - Update disease (admin)
DELETE /api/diseases/:id               - Delete disease (admin)
```

### Blog API
```
GET    /api/blog                       - List all blog posts (published)
GET    /api/blog/search?q=term        - Search blog posts
GET    /api/blog/:slug                - Get single blog post
GET    /api/blog/category/:cat        - Get posts by category
POST   /api/blog                       - Create blog post (admin)
PUT    /api/blog/:id                  - Update blog post (admin)
DELETE /api/blog/:id                  - Delete blog post (admin)
```

### Testimonials API
```
GET    /api/testimonials               - List all published testimonials
GET    /api/testimonials/:id           - Get single testimonial
POST   /api/testimonials               - Submit new testimonial
PUT    /api/testimonials/:id           - Update testimonial (admin)
DELETE /api/testimonials/:id           - Delete testimonial (admin)
GET    /api/testimonials/unapproved    - Get unapproved (admin)
PATCH  /api/testimonials/:id/approve   - Approve testimonial (admin)
```

### Appointments API
```
POST   /api/appointments               - Create appointment booking
GET    /api/appointments               - List appointments (admin)
GET    /api/appointments/:id           - Get appointment details
PUT    /api/appointments/:id           - Update appointment status (admin)
DELETE /api/appointments/:id           - Cancel appointment
```

### Doctor Profile API
```
GET    /api/doctor                     - Get doctor profile
GET    /api/doctor/achievements        - Get doctor achievements
POST   /api/doctor                     - Update doctor profile (admin)
POST   /api/doctor/achievements        - Add achievement (admin)
PUT    /api/doctor/achievements/:id    - Update achievement (admin)
DELETE /api/doctor/achievements/:id    - Delete achievement (admin)
```

### Clinic Information API
```
GET    /api/clinic                     - Get clinic information
GET    /api/clinic/hours               - Get clinic operating hours
GET    /api/clinic/statistics          - Get clinic statistics
PUT    /api/clinic                     - Update clinic info (admin)
```

---

## Data Requirements & Sample Data

### Disease Categories
- Joint & Bone Disorders
- Metabolic Disorders
- Skin & Hair Disorders
- Respiratory Disorders
- Women's Health
- Mental Health
- Digestive Disorders
- Circulatory Disorders
- Child Care
- Other Conditions

### Blog Categories
- General
- Skin Health
- Respiratory Health
- Women's Health
- Child Care
- Mental Health

### Doctor Achievements Types
- Awards
- Certifications
- Recognition
- Publications

---

## Business Logic Requirements

### Appointment System
- Capture appointment requests with validation
- Store booking method (phone, WhatsApp, form)
- Support date/time preferences
- Email notification on new appointment
- WhatsApp notification capability
- Appointment status tracking

### Blog Management
- Support weekly publishing schedule
- Full-text search across title and content
- Category filtering
- Reading time calculation
- Draft and published status

### Disease Information
- Search functionality (full-text search on name, symptoms, description)
- Category-based filtering
- Symptom-based search/filtering
- All related data (symptoms, causes, remedies, precautions) must be returned with disease details

### Testimonials
- Moderation workflow (approval required before publishing)
- Rating system (1-5 stars)
- Visibility control

### Clinic Statistics
- Track total patients treated (from doctor profile)
- Store success rates
- Years of practice

---

## Authentication & Authorization

### User Roles
1. **Public User** - Can view all public content, submit appointments/testimonials
2. **Admin User** - Can manage diseases, blog posts, testimonials, appointments, doctor profile
3. **Doctor** - Can view appointments and patient information

### Authorization Levels
- Public endpoints: No authentication required
- Submission endpoints (appointments, testimonials): No authentication required (with CAPTCHA/rate limiting)
- Admin endpoints: JWT authentication + admin role verification
- Doctor endpoints: JWT authentication + doctor role verification

---

## Input Validation Requirements

### Appointment Form
- Name: Required, 2-100 characters
- Email: Optional, valid email format
- Phone: Required, valid phone number
- Date: Optional, must be future date
- Time: Optional
- Condition: Optional, 5-500 characters
- Message: Optional, 0-1000 characters

### Testimonial Form
- Name: Required, 2-100 characters
- Condition: Required, 5-100 characters
- Rating: Required, 1-5
- Text: Required, 50-1000 characters
- Image: Optional, max 5MB

### Blog Post
- Title: Required, 10-500 characters
- Slug: Required, unique, URL-safe
- Category: Required, must match predefined categories
- Content: Required, min 100 characters
- Excerpt: Required, 50-300 characters
- Author: Optional, defaults to 'Dr. Pathak'

### Disease
- Name: Required, unique, 3-100 characters
- Slug: Required, unique, URL-safe
- Category: Required, must match category list
- Description: Required, 100-500 characters

---

## Performance & Indexing Requirements

### Critical Indexes
```sql
- diseases (slug, category, is_active)
- blog_posts (slug, is_published, published_at)
- appointments (status, created_at)
- testimonials (is_published, is_approved)
- disease_* tables (disease_id)
- doctor_achievements (doctor_id)
```

### Pagination Requirements
- Default limit: 10-20 items per page
- Support offset and limit parameters
- Total count should be included in response

### Full-Text Search
- Search diseases by: name, symptoms, description
- Search blog posts by: title, content, category
- Search testimonials by: name, condition

---

## Response Format Requirements

### Standard API Response Format
```json
{
  "success": true,
  "status": 200,
  "message": "Operation successful",
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "status": 400,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## Image Management

### Image Paths
All images should be stored in a designated folder and referenced by URL:
- `/public/images/diseases/` - Disease images
- `/public/images/blog/` - Blog post images
- `/public/images/doctor/` - Doctor profile and achievements images
- `/public/images/testimonials/` - Testimonial images

### Image Specifications
- Format: JPG, PNG
- Max file size: 5MB
- Recommended dimensions for diseases: 800x600px
- Recommended dimensions for profiles: 400x500px

---

## Clinic Operating Hours

**Default Hours:**
- Monday to Saturday: 10:00 AM - 6:00 PM (18:00)
- Sunday: 10:00 AM - 2:00 PM (14:00)

---

## Phone Numbers Configuration

**Primary Phone:** +91-XXXXXXXXXX (to be configured)
**WhatsApp Number:** +91-XXXXXXXXXX (to be configured)

---

## SEO & Metadata

### Each Entity Should Include
- **Diseases:** Meta title, meta description, slug
- **Blog Posts:** Meta title, meta description, slug, author, publish date
- **Pages:** Open Graph meta tags, canonical URLs

---

## Testing Considerations

### Unit Tests Required For
- Appointment validation
- Testimonial filtering (approved/published)
- Disease search functionality
- Blog post pagination

### Integration Tests Required For
- End-to-end appointment booking flow
- Blog post publication workflow
- Disease detail retrieval with all related data

---

## Additional Notes

1. **Soft Deletes:** Consider implementing soft deletes for blog posts, diseases, and testimonials
2. **Audit Trail:** Log all admin actions (creating/updating/deleting content)
3. **Email Service:** Integration needed for appointment confirmations and admin notifications
4. **Rate Limiting:** Apply rate limiting to appointment and testimonial submission endpoints
5. **CORS:** Configure CORS to allow requests from the frontend domain
6. **File Upload:** Set up secure file upload handling for images
7. **Timestamps:** All entities should track created_at and updated_at
8. **Time Zone:** Store all times in UTC, convert to IST (Indian Standard Time) for display

---

## Migration Strategy

Start with creating tables in this order:
1. doctor_profile
2. clinic_info, clinic_hours
3. diseases, disease_symptoms, disease_causes, disease_remedies, disease_precautions
4. blog_posts
5. testimonials
6. appointments
7. doctor_achievements
8. clinic_statistics
