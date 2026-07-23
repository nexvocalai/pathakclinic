# Doctor Admin Panel - Complete Documentation

## Overview

The Doctor Admin Panel is a comprehensive Next.js-based management system that allows doctors to manage their clinic operations, including appointments, patients, finances, content management, and more.

---

## Features

### 1. **Authentication & Security**
- JWT-based token authentication
- Secure login page with email/password
- Automatic token refresh on expiration
- Protected routes with automatic redirection to login
- Secure token storage in browser

### 2. **Dashboard**
- Real-time clinic statistics
- Total patients count
- Appointment tracking
- Monthly revenue analytics
- Year-over-year revenue comparison
- Interactive charts using Recharts
- Quick action links to all modules

### 3. **Appointment Management**
- View all appointments with pagination
- Search appointments by patient name or phone
- Filter by appointment status (Scheduled, Completed, Cancelled, No Show)
- Update appointment status
- Add clinical notes for each appointment
- Record payments with amount tracking
- Payment status management (Pending, Paid, Refunded)

### 4. **Patient Management**
- View all patients with comprehensive profiles
- Search and sort patients
- Edit patient medical history
- Track total appointments per patient
- Monitor total spending per patient
- Full contact information management
- Medical history documentation

### 5. **Blog Content Management**
- Create new blog posts with rich editor
- Upload featured images
- Set article categories
- Mark articles as featured
- Publish/draft workflow
- View article statistics (views)
- Edit and delete articles
- Multi-format content support

### 6. **Disease Database Management**
- Add new diseases to the system
- Comprehensive disease information entry:
  - Symptoms list
  - Causes list
  - Homoeopathic remedies
  - Precautions list
  - Treatment duration
  - Success rates
- Upload disease-specific images
- Categorize diseases
- Full CRUD operations
- Disease search functionality

### 7. **Financial Analytics & Reports**
- Monthly revenue tracking
- Yearly revenue analysis
- Payment method statistics
- Export appointments to PDF/CSV
- Export payment reports to PDF/CSV
- Date range filtering
- Monthly/yearly report generation

### 8. **Responsive Design**
- Mobile-optimized interface
- Tablet and desktop support
- Collapsible sidebar for mobile
- Touch-friendly buttons and inputs
- Adaptive layout for all screen sizes

---

## Frontend Structure

### Directory Layout

```
app/admin/
├── layout.tsx                 # Admin layout with sidebar
├── login/
│   └── page.tsx              # Login page
├── dashboard/
│   └── page.tsx              # Main dashboard
├── appointments/
│   └── page.tsx              # Appointments management
├── patients/
│   └── page.tsx              # Patients management
├── blog/
│   └── page.tsx              # Blog CMS
├── diseases/
│   └── page.tsx              # Diseases CMS
└── reports/
    └── page.tsx              # Reports & export

components/admin/
├── sidebar.tsx               # Navigation sidebar
├── dashboard-stats.tsx       # Statistics cards
├── revenue-chart.tsx         # Analytics charts
├── appointment-item.tsx      # Appointment list item
├── patient-card.tsx          # Patient details card
├── blog-editor.tsx           # Blog post editor modal
└── disease-editor.tsx        # Disease form modal

lib/
├── auth-store.ts             # Zustand auth state management
└── api-client.ts             # Axios API client with JWT
```

---

## API Integration

### Authentication Endpoints

```
POST /api/auth/login
- Request: { email: "doctor@pathak.com", password: "password" }
- Response: { token: "jwt_token", doctor: { id, name, email, registrationNumber } }
```

### Key API Features

1. **Automatic JWT Handling**
   - Token automatically added to all requests
   - Token refresh on 401 responses
   - Automatic logout and redirect on token expiration

2. **Request/Response Management**
   - Centralized API client with error handling
   - Standardized request/response formats
   - Proper error messages to user

3. **Data Pagination**
   - Page-based pagination (0-indexed)
   - Configurable page size (10 items per page)
   - Previous/Next navigation

---

## Components Overview

### AdminSidebar Component
- Navigation links to all admin modules
- Doctor information display
- Logout functionality
- Mobile-responsive toggle menu
- Active page highlighting

### DashboardStats Component
- 4 stat cards displaying key metrics
- Icons and trend indicators
- Color-coded stat badges
- Responsive grid layout

### RevenueChart Component
- Monthly revenue bar chart
- Yearly revenue line chart
- Switchable views
- Interactive tooltips with currency formatting
- Data visualization with Recharts

### AppointmentItem Component
- Collapsible appointment details
- Status update dropdown
- Patient notes editor
- Payment recording interface
- Quick action buttons

### PatientCard Component
- Patient information display
- Medical history editor
- Contact and demographic data
- Edit/view mode toggle
- Patient statistics

### BlogEditor Component
- Modal form for new blog posts
- Image upload with preview
- Rich content editor
- Category selection
- Featured article toggle
- Publish workflow

### DiseaseEditor Component
- Comprehensive disease form
- Multi-field input support
- Comma-separated list parsing
- Image upload capability
- Medical data organization

---

## State Management

### Authentication Store (Zustand)

```typescript
useAuthStore
├── doctor: DoctorAuth | null
├── isAuthenticated: boolean
├── setAuth: (doctor: DoctorAuth) => void
├── logout: () => void
└── setToken: (token: string) => void
```

### Data Flow
1. User logs in → token generated on backend
2. Token stored in auth store
3. API client reads token from store
4. Token added to Authorization header
5. Protected routes check `isAuthenticated` flag

---

## Usage Guide

### For Doctors

#### Logging In
1. Navigate to `/admin/login`
2. Enter your clinic email and password
3. Click "Sign In"
4. Redirected to dashboard on success

#### Managing Appointments
1. Go to Appointments page
2. Search or filter appointments
3. Click an appointment to expand details
4. Update status, add notes, or record payment
5. Changes saved automatically

#### Adding Patient Notes
1. Navigate to Patients page
2. Find patient and click to expand
3. Click "Edit Patient Details"
4. Add medical history and address
5. Click "Save Changes"

#### Creating Blog Articles
1. Go to Blog CMS
2. Click "+ New Article"
3. Fill in title, content, excerpt
4. Select category
5. Upload featured image
6. Click "Publish Article"
7. Article initially in DRAFT status
8. Click "Publish" to make live

#### Adding Diseases
1. Go to Diseases
2. Click "+ Add Disease"
3. Enter disease name and basic info
4. Add symptoms, causes, remedies, precautions (comma-separated)
5. Upload disease image
6. Click "Add Disease"

#### Generating Reports
1. Navigate to Reports
2. For Appointments: Select date range, choose PDF or CSV
3. For Payments: Select month/year, choose format
4. Click export button
5. File automatically downloads

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## Authentication Flow

### Login Process
```
User Input (email/password)
        ↓
API Call to /auth/login
        ↓
Backend validates credentials
        ↓
Returns JWT token + doctor info
        ↓
Store in Zustand auth store
        ↓
Add to localStorage (persisted)
        ↓
Redirect to dashboard
```

### Protected Routes
```
Route Access
        ↓
Check isAuthenticated flag
        ↓
If false → Redirect to login
        ↓
If true → Load page with data
```

### Token Expiration
```
API Request
        ↓
401 Response (unauthorized)
        ↓
Clear auth store
        ↓
Redirect to login
        ↓
User must log in again
```

---

## Security Best Practices

1. **Token Storage**: Stored in Zustand with localStorage persistence
2. **HTTPS Only**: Use HTTPS in production
3. **CORS**: Backend configured for specific origins
4. **Input Validation**: All forms validated before submission
5. **File Uploads**: Image validation before upload
6. **Rate Limiting**: Implement on backend
7. **CSRF Protection**: Handled by modern frameworks

---

## Performance Optimizations

1. **Code Splitting**: Each admin page lazy-loaded
2. **Image Optimization**: Next.js Image component for lazy loading
3. **API Caching**: Axios integration ready for cache headers
4. **Pagination**: Server-side pagination reduces data transfer
5. **Memoization**: React components optimized with memo where needed

---

## Troubleshooting

### Login Issues
- Verify credentials are correct
- Check backend API is running
- Verify CORS configuration
- Check network tab for API errors

### Payment Recording Fails
- Ensure amount is valid number
- Verify appointment exists
- Check payment status not already paid

### File Upload Issues
- Check file size (max 10MB)
- Verify image format (PNG, JPG, GIF)
- Check AWS S3 configuration on backend
- Review console for upload errors

### Data Not Loading
- Check API endpoint is correct
- Verify JWT token is valid
- Check pagination parameters
- Review browser console for errors

---

## Future Enhancements

1. **Real-time Notifications**
   - WebSocket integration for live updates
   - Appointment reminders

2. **Advanced Analytics**
   - Patient retention metrics
   - Treatment success rates
   - Revenue forecasting

3. **Appointment Scheduling**
   - Calendar view
   - Automated reminders via SMS/Email
   - Time slot management

4. **Prescription Management**
   - Digital prescription generation
   - Medicine tracking
   - Dosage recommendations

5. **Integration with Payment Gateways**
   - Stripe payment processing
   - Razorpay integration
   - Invoice generation

6. **Mobile App**
   - React Native admin app
   - Push notifications
   - Offline support

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs for errors
3. Verify environment variables
4. Check network requests in browser DevTools
5. Contact development team for assistance

---

## License

Proprietary - Pathak Homoeopathic Clinic
