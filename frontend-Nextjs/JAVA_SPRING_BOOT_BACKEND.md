# Java 17 Spring Boot Backend Specification
## Pathak Homoeopathic Clinic Management System

---

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Project Setup](#project-setup)
3. [Database Schema](#database-schema)
4. [Security (JWT Authentication)](#security--jwt-authentication)
5. [API Endpoints](#api-endpoints)
6. [Entity Classes](#entity-classes)
7. [Service Layer](#service-layer)
8. [Exception Handling](#exception-handling)
9. [Deployment](#deployment)

---

## Technology Stack

```
- Java 17
- Spring Boot 3.2.x
- Spring Security 6.x (with JWT)
- JPA/Hibernate ORM
- PostgreSQL 14+
- Maven
- Lombok (for reducing boilerplate)
- MapStruct (for DTOs mapping)
- Stripe/Razorpay SDK
- AWS S3 (for image uploads)
```

### Maven Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.0</version>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>
    
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.3</version>
        <scope>runtime</scope>
    </dependency>
    
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.3</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.7.1</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- AWS S3 -->
    <dependency>
        <groupId>software.amazon.awssdk</groupId>
        <artifactId>s3</artifactId>
        <version>2.21.0</version>
    </dependency>
    
    <!-- Stripe -->
    <dependency>
        <groupId>com.stripe</groupId>
        <artifactId>stripe-java</artifactId>
        <version>24.0.0</version>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

---

## Project Setup

### application.yml Configuration

```yaml
spring:
  application:
    name: pathak-clinic-api
  
  datasource:
    url: jdbc:postgresql://localhost:5432/pathak_clinic
    username: postgres
    password: your_password
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        jdbc:
          batch_size: 10
          fetch_size: 50
  
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

jwt:
  secret: your_secret_key_minimum_256_bits_long_change_in_production
  expiration: 86400000  # 24 hours in milliseconds

app:
  cors:
    allowed-origins: http://localhost:3000,https://yourdomain.com
  
  aws:
    s3:
      bucket: pathak-clinic-uploads
      region: ap-south-1
      access-key: your_access_key
      secret-key: your_secret_key
  
  stripe:
    api-key: your_stripe_api_key

logging:
  level:
    org.springframework.security: DEBUG
    com.pathak: DEBUG
```

---

## Database Schema

### Doctor Table
```sql
CREATE TABLE doctors (
    id UUID PRIMARY KEY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Patient Table
```sql
CREATE TABLE patients (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age INT,
    gender VARCHAR(10),
    address TEXT,
    medical_history TEXT,
    total_appointments INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Appointment Table
```sql
CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES patients(id),
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    reason VARCHAR(500),
    status VARCHAR(20) DEFAULT 'SCHEDULED',
    amount DECIMAL(10, 2),
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(patient_id, appointment_date, time_slot)
);

CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
```

### Payment Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    appointment_id UUID NOT NULL REFERENCES appointments(id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'PENDING',
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Blog Table
```sql
CREATE TABLE blogs (
    id UUID PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(1000),
    category VARCHAR(100),
    author_id UUID NOT NULL REFERENCES doctors(id),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'DRAFT',
    views INT DEFAULT 0,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
```

### Disease Table
```sql
CREATE TABLE diseases (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    homoeopathic_approach TEXT,
    treatment_duration VARCHAR(100),
    detailed_info TEXT,
    success_rate VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Disease_Symptom Table
```sql
CREATE TABLE disease_symptoms (
    id UUID PRIMARY KEY,
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    symptom VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_symptoms ON disease_symptoms(disease_id);
```

### Disease_Cause Table
```sql
CREATE TABLE disease_causes (
    id UUID PRIMARY KEY,
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    cause VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Disease_Remedy Table
```sql
CREATE TABLE disease_remedies (
    id UUID PRIMARY KEY,
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    remedy VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Disease_Precaution Table
```sql
CREATE TABLE disease_precautions (
    id UUID PRIMARY KEY,
    disease_id UUID NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
    precaution VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Security - JWT Authentication

### JWT Token Provider

```java
@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private long jwtExpiration;
    
    public String generateToken(String email) {
        return Jwts.builder()
            .subject(email)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(key(), SignatureAlgorithm.HS512)
            .compact();
    }
    
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
}
```

### Security Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(
                new JwtAuthenticationFilter(jwtTokenProvider()),
                UsernamePasswordAuthenticationFilter.class
            );
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

---

## API Endpoints

### Authentication Endpoints

```
POST   /api/auth/login
       Request: { "email": "doctor@clinic.com", "password": "pass" }
       Response: { "token": "jwt_token", "doctor": { id, name, email, ... } }

POST   /api/auth/logout
       Headers: Authorization: Bearer {token}
```

### Appointment Endpoints

```
GET    /api/appointments?page=0&size=10
       Get all appointments with pagination
       
GET    /api/appointments/{id}
       Get single appointment details
       
PATCH  /api/appointments/{id}/status
       Update appointment status
       Request: { "status": "COMPLETED" }
       
PATCH  /api/appointments/{id}/notes
       Add/update appointment notes
       Request: { "notes": "Clinical notes..." }
       
POST   /api/appointments/{id}/payment
       Record payment for appointment
       Request: { "amount": 500, "method": "CASH" }
```

### Patient Endpoints

```
GET    /api/patients?page=0&size=10
       Get all patients with pagination
       
GET    /api/patients/{id}
       Get patient details and medical history
       
PUT    /api/patients/{id}
       Update patient medical history and details
       Request: { "medicalHistory": "...", "address": "..." }
```

### Blog Endpoints

```
GET    /api/blogs?page=0&size=10&category=General
       Get blogs with pagination and category filter
       
POST   /api/blogs
       Create new blog post (multipart/form-data)
       Fields: title, slug, content, excerpt, category, image
       
PUT    /api/blogs/{id}
       Update blog post
       
DELETE /api/blogs/{id}
       Delete blog post
       
PATCH  /api/blogs/{id}/publish
       Publish draft blog post
```

### Disease Endpoints

```
GET    /api/diseases?page=0&size=10&category=Joint
       Get diseases with filtering
       
POST   /api/diseases
       Create new disease (multipart/form-data)
       Fields: name, category, description, symptoms[], causes[], remedies[], precautions[], image
       
PUT    /api/diseases/{id}
       Update disease details
       
DELETE /api/diseases/{id}
       Delete disease
       
GET    /api/diseases/search?q=arthritis
       Search diseases by name and symptoms
```

### Analytics Endpoints

```
GET    /api/analytics/dashboard?month=5&year=2024
       Get dashboard statistics
       Response: { totalPatients, totalAppointments, monthlyRevenue, revenueGrowth }
       
GET    /api/analytics/monthly-revenue?year=2024
       Get monthly revenue data for charts
       
GET    /api/analytics/yearly-revenue
       Get yearly revenue data
```

### Reports Endpoints

```
GET    /api/reports/appointments?startDate=2024-01-01&endDate=2024-12-31&format=pdf
       Export appointments report (pdf or csv)
       
GET    /api/reports/payments?month=5&year=2024&format=csv
       Export payments report for month
```

---

## Entity Classes

### Doctor Entity

```java
@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(unique = true, nullable = false)
    private String registrationNumber;
    
    private String phone;
    private String qualification;
    private Integer experienceYears;
    private String about;
    private String profileImageUrl;
    
    @Column(columnDefinition = "boolean default true")
    private Boolean isActive = true;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### Appointment Entity

```java
@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    
    @Column(nullable = false)
    private LocalDate appointmentDate;
    
    private String timeSlot;
    private String reason;
    
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    
    private BigDecimal amount;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    
    @Lob
    private String notes;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

public enum AppointmentStatus {
    SCHEDULED, COMPLETED, CANCELLED, NO_SHOW
}

public enum PaymentStatus {
    PENDING, PAID, REFUNDED
}
```

### Blog Entity

```java
@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(unique = true, nullable = false)
    private String slug;
    
    @Lob
    @Column(nullable = false)
    private String content;
    
    private String excerpt;
    private String category;
    private String imageUrl;
    
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Doctor author;
    
    @Column(columnDefinition = "boolean default false")
    private Boolean featured = false;
    
    @Enumerated(EnumType.STRING)
    private BlogStatus status = BlogStatus.DRAFT;
    
    @Column(columnDefinition = "integer default 0")
    private Integer views = 0;
    
    private LocalDateTime publishedAt;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

public enum BlogStatus {
    DRAFT, PUBLISHED
}
```

### Disease Entity

```java
@Entity
@Table(name = "diseases")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(unique = true, nullable = false)
    private String name;
    
    private String category;
    
    @Lob
    @Column(nullable = false)
    private String description;
    
    private String imageUrl;
    
    @Lob
    private String homoeopathicApproach;
    
    private String treatmentDuration;
    
    @Lob
    private String detailedInfo;
    
    private String successRate;
    
    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiseaseSymptom> symptoms = new ArrayList<>();
    
    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiseaseCause> causes = new ArrayList<>();
    
    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiseaseRemedy> remedies = new ArrayList<>();
    
    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiseasePrecaution> precautions = new ArrayList<>();
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

---

## Service Layer

### AppointmentService

```java
@Service
@RequiredArgsConstructor
public class AppointmentService {
    
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final StripeService stripeService;
    private final NotificationService notificationService;
    
    public Page<Appointment> getAllAppointments(int page, int size) {
        return appointmentRepository.findAll(PageRequest.of(page, size, 
            Sort.by("appointmentDate").descending()));
    }
    
    public Appointment getAppointmentById(UUID id) {
        return appointmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
    }
    
    public Appointment updateStatus(UUID id, AppointmentStatus status) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(status);
        
        if (status == AppointmentStatus.COMPLETED) {
            appointment.setUpdatedAt(LocalDateTime.now());
        }
        
        Appointment saved = appointmentRepository.save(appointment);
        notificationService.sendStatusUpdateNotification(saved);
        
        return saved;
    }
    
    public Appointment addNotes(UUID id, String notes) {
        Appointment appointment = getAppointmentById(id);
        appointment.setNotes(notes);
        return appointmentRepository.save(appointment);
    }
    
    public Payment recordPayment(UUID appointmentId, BigDecimal amount, String method) {
        Appointment appointment = getAppointmentById(appointmentId);
        
        Payment payment = new Payment();
        payment.setAppointment(appointment);
        payment.setAmount(amount);
        payment.setPaymentMethod(method);
        payment.setStatus(PaymentStatus.PAID);
        payment.setPaymentDate(LocalDateTime.now());
        
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update appointment payment status
        appointment.setPaymentStatus(PaymentStatus.PAID);
        appointmentRepository.save(appointment);
        
        // Update patient total spent
        Patient patient = appointment.getPatient();
        patient.setTotalSpent(patient.getTotalSpent().add(amount));
        patientRepository.save(patient);
        
        return savedPayment;
    }
    
    public List<Appointment> getAppointmentsByDateRange(LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.findByAppointmentDateBetween(startDate, endDate);
    }
}
```

### BlogService

```java
@Service
@RequiredArgsConstructor
public class BlogService {
    
    private final BlogRepository blogRepository;
    private final S3Service s3Service;
    
    public Page<Blog> getAllBlogs(int page, int size, String category) {
        if (category != null && !category.isEmpty()) {
            return blogRepository.findByCategory(category, 
                PageRequest.of(page, size, Sort.by("publishedAt").descending()));
        }
        return blogRepository.findAll(PageRequest.of(page, size, 
            Sort.by("publishedAt").descending()));
    }
    
    public Blog createBlog(BlogRequest request, MultipartFile image, Doctor author) 
            throws IOException {
        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setSlug(request.getSlug());
        blog.setContent(request.getContent());
        blog.setExcerpt(request.getExcerpt());
        blog.setCategory(request.getCategory());
        blog.setFeatured(request.getFeatured());
        blog.setAuthor(author);
        blog.setStatus(BlogStatus.DRAFT);
        
        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Service.uploadFile(image, "blogs/");
            blog.setImageUrl(imageUrl);
        }
        
        return blogRepository.save(blog);
    }
    
    public Blog publishBlog(UUID id) {
        Blog blog = blogRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));
        blog.setStatus(BlogStatus.PUBLISHED);
        blog.setPublishedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }
    
    public void incrementViews(UUID id) {
        Blog blog = blogRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));
        blog.setViews(blog.getViews() + 1);
        blogRepository.save(blog);
    }
}
```

### DiseaseService

```java
@Service
@RequiredArgsConstructor
public class DiseaseService {
    
    private final DiseaseRepository diseaseRepository;
    private final S3Service s3Service;
    
    public Page<Disease> getAllDiseases(int page, int size, String category) {
        if (category != null && !category.isEmpty()) {
            return diseaseRepository.findByCategory(category, 
                PageRequest.of(page, size));
        }
        return diseaseRepository.findAll(PageRequest.of(page, size));
    }
    
    public Disease createDisease(DiseaseRequest request, MultipartFile image) 
            throws IOException {
        Disease disease = new Disease();
        disease.setName(request.getName());
        disease.setCategory(request.getCategory());
        disease.setDescription(request.getDescription());
        disease.setHomoeopathicApproach(request.getHomoeopathicApproach());
        disease.setTreatmentDuration(request.getDuration());
        disease.setDetailedInfo(request.getDetailedInfo());
        disease.setSuccessRate(request.getSuccessRate());
        
        // Map symptoms
        request.getSymptoms().forEach(symptom -> {
            DiseaseSymptom ds = new DiseaseSymptom();
            ds.setDisease(disease);
            ds.setSymptom(symptom);
            disease.getSymptoms().add(ds);
        });
        
        // Map causes, remedies, precautions similarly...
        
        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Service.uploadFile(image, "diseases/");
            disease.setImageUrl(imageUrl);
        }
        
        return diseaseRepository.save(disease);
    }
    
    public List<Disease> searchDiseases(String query) {
        return diseaseRepository.searchByNameOrSymptoms(query);
    }
}
```

### AnalyticsService

```java
@Service
@RequiredArgsConstructor
public class AnalyticsService {
    
    private final AppointmentRepository appointmentRepository;
    private final PaymentRepository paymentRepository;
    private final PatientRepository patientRepository;
    
    public DashboardStats getDashboardStats() {
        long totalPatients = patientRepository.count();
        long totalAppointments = appointmentRepository.count();
        BigDecimal monthlyRevenue = getMonthlyRevenue(LocalDate.now());
        
        BigDecimal lastMonthRevenue = getMonthlyRevenue(
            LocalDate.now().minusMonths(1)
        );
        
        double growthRate = calculateGrowth(monthlyRevenue, lastMonthRevenue);
        
        return new DashboardStats(
            totalPatients,
            totalAppointments,
            monthlyRevenue,
            growthRate
        );
    }
    
    public List<MonthlyRevenueData> getMonthlyRevenueData(int year) {
        List<MonthlyRevenueData> data = new ArrayList<>();
        
        for (int month = 1; month <= 12; month++) {
            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDate startDate = yearMonth.atDay(1);
            LocalDate endDate = yearMonth.atEndOfMonth();
            
            BigDecimal revenue = appointmentRepository
                .findByAppointmentDateBetweenAndPaymentStatus(
                    startDate, endDate, PaymentStatus.PAID
                )
                .stream()
                .map(Appointment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            long appointments = appointmentRepository
                .countByAppointmentDateBetween(startDate, endDate);
            
            data.add(new MonthlyRevenueData(
                yearMonth.format(DateTimeFormatter.ofPattern("MMM")),
                revenue,
                appointments
            ));
        }
        
        return data;
    }
    
    private BigDecimal getMonthlyRevenue(LocalDate date) {
        YearMonth yearMonth = YearMonth.from(date);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();
        
        return appointmentRepository
            .findByAppointmentDateBetweenAndPaymentStatus(
                startDate, endDate, PaymentStatus.PAID
            )
            .stream()
            .map(Appointment::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    private double calculateGrowth(BigDecimal current, BigDecimal previous) {
        if (previous.equals(BigDecimal.ZERO)) return 100;
        return current.subtract(previous)
            .divide(previous, 2, RoundingMode.HALF_UP)
            .doubleValue() * 100;
    }
}
```

---

## Exception Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            404,
            "Not Found",
            ex.getMessage(),
            request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            ValidationException ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            400,
            "Validation Error",
            ex.getMessage(),
            request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(
            JwtException ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            401,
            "Unauthorized",
            "Invalid or expired token",
            request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}

@Data
@AllArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}
```

---

## Deployment

### Docker Configuration

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/pathak-clinic-api.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: pathak_clinic
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: .
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/pathak_clinic
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: postgres
      JWT_SECRET: your_secret_key_here
      STRIPE_API_KEY: your_stripe_key
      AWS_S3_BUCKET: pathak-clinic
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

---

## Testing

### Unit Test Example

```java
@SpringBootTest
@AutoConfigureMockMvc
public class AppointmentServiceTest {
    
    @MockBean
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private AppointmentService appointmentService;
    
    @Test
    void testGetAppointmentById() {
        UUID id = UUID.randomUUID();
        Appointment appointment = new Appointment();
        appointment.setId(id);
        
        when(appointmentRepository.findById(id))
            .thenReturn(Optional.of(appointment));
        
        Appointment result = appointmentService.getAppointmentById(id);
        
        assertNotNull(result);
        assertEquals(id, result.getId());
        verify(appointmentRepository).findById(id);
    }
}
```

---

## Additional Notes

- All endpoints require JWT authentication except `/api/auth/login`
- Implement rate limiting for API endpoints
- Use Spring Cache for frequently accessed data
- Implement comprehensive logging
- Add request/response validation using `@Valid` annotations
- Set up scheduled tasks for monthly revenue reports
- Configure CORS properly for frontend domain
- Use database transactions for critical operations
- Implement soft deletes where appropriate
- Add audit logging for sensitive operations

---

End of Backend Specification
