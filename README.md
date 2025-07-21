# 🚀 Career Camp: College Placement Drive App

Welcome to **Career Camp** — the ultimate, production-grade platform for managing college placement drives! 🎓💼

---

## 📚 Table of Contents
- [Project Vision & Motivation](#project-vision--motivation)
- [Key Features](#key-features)
- [Tech Stack & Why Each Choice](#tech-stack--why-each-choice)
- [Architecture & Design](#architecture--design)
- [Folder & File Structure: Deep Dive](#folder--file-structure-deep-dive)
- [Implementation Details](#implementation-details)
- [Security Practices](#security-practices)
- [Performance & Optimization](#performance--optimization)
- [Testing & Deployment](#testing--deployment)
- [Challenges & Problem Solving](#challenges--problem-solving)
- [Impact & Evaluation](#impact--evaluation)
- [Scalability & Future Work](#scalability--future-work)
- [Project Management & Collaboration](#project-management--collaboration)
- [Data Structures & Algorithms](#data-structures--algorithms)
- [Behavioral & Learning Outcomes](#behavioral--learning-outcomes)
- [Setup & Usage](#setup--usage)
- [Contribution Guidelines](#contribution-guidelines)

---

## 🏁 Project Vision & Motivation

**Career Camp** was born from the real-world chaos of college placement seasons. The Training and Placement Cell (TNP) needed a transparent, efficient, and scalable way to:
- Register and manage hundreds of students
- Schedule and allocate interviews with multiple companies
- Track company visits and results in real time
- Export data for reporting and analytics

**The pain points:** Manual processes, Excel sheets, and ad-hoc communication led to errors, missed opportunities, and stress for both students and TNP staff. Career Camp automates and centralizes the entire workflow, making placements smooth, fair, and data-driven.

---

## ✨ Key Features
- 🎯 **Automated Interview Slot Allocation**: Smartly assigns students to company interviews based on eligibility and schedule.
- 🛡️ **Role-based Access**: Core TNP team has admin powers; students have self-service access.
- 📋 **Comprehensive Data Handling**: Manages students, companies, interviews, results, and more.
- 🔔 **Real-time Updates & Notifications**: Keeps everyone in the loop with instant feedback.
- 📤 **CSV Export**: Download reports for analysis or compliance.
- 👤 **Profile Management**: Students and employees can update their details and avatars.
- 🏢 **Company Visit Scheduling**: Plan and track all company interactions.
- 🗂️ **Batch & Course Management**: Organize students by batch and course.
- 🛠️ **Admin Dashboard**: One-stop control panel for TNP.
- 🧾 **Audit Logs & Error Handling**: Robust logging and user-friendly error messages.

---

## 🛠️ Tech Stack & Why Each Choice

### **Backend**
- **Node.js**: Non-blocking, event-driven, perfect for scalable web apps.
- **Express.js**: Minimal, flexible, and battle-tested for RESTful APIs.
- **MongoDB**: NoSQL, schema-flexible, and ideal for rapid iteration and scaling.
- **Mongoose**: Elegant MongoDB object modeling, with built-in validation and hooks.
- **Passport.js**: Pluggable authentication (local and Google OAuth2).
- **connect-mongo**: Stores sessions in MongoDB for persistence and scalability.
- **express-session**: Secure, cookie-based session management.
- **multer**: Handles file uploads (avatars, reports) with ease.
- **express-validator**: Ensures all user input is clean and safe.
- **connect-flash**: User feedback via flash messages.
- **morgan**: HTTP request logging for debugging and monitoring.
- **cookie-parser**: Parses cookies for session and auth.
- **csv-stringify/json2csv**: For exporting data as CSV.
- **validator**: Extra data validation.
- **rotating-file-stream**: Log rotation for production stability.

### **Frontend**
- **EJS**: Server-side templating for dynamic, SEO-friendly HTML.
- **SCSS**: Modular, maintainable, and powerful CSS preprocessor.
- **Vanilla JS**: Lightweight, fast, and easy to debug for client-side logic.
- **Bootstrap**: (If used) Rapid, responsive UI development.
- **Noty**: Beautiful notifications for user feedback.

### **Build Tools**
- **Gulp**: Automates asset compilation, minification, and cache-busting.
  - **gulp-sass**: SCSS to CSS.
  - **gulp-cssnano**: CSS minification.
  - **gulp-uglify-es**: JS minification.
  - **gulp-imagemin**: Image optimization.
  - **gulp-rev**: Cache-busting via content hashes.
  - **del**: Cleans old assets.

### **Why this stack?**
- **Speed & Flexibility**: Node.js + MongoDB is fast to develop and easy to scale.
- **Security**: Passport, express-session, and MongoDB provide robust, secure authentication and data storage.
- **Maintainability**: EJS, SCSS, and modular JS keep the codebase clean and easy to extend.
- **Alternatives considered**: SQL (too rigid for rapid changes), React/Angular (overkill for server-rendered app), Webpack (Gulp is simpler for this use case).

---

## 🏛️ Architecture & Design

### **Monolithic, Modular Design**
- **Single Node.js app** with clear separation of concerns:
  - **Controllers**: All business logic
  - **Models**: Data schemas and validation
  - **Routes**: API and page endpoints
  - **Views**: EJS templates for all pages
  - **Config**: Environment, middleware, authentication
  - **Assets**: Source (SCSS, JS, images) and processed (public/assets)

### **Data Flow**
1. **User Request** → **Route** → **Controller** → **Model/DB** → **View/Response**
2. **Assets**: SCSS/JS/images processed by Gulp → versioned in `/public/assets` → referenced in EJS via `assetPath()`
3. **Authentication**: Passport (local/Google) → session stored in MongoDB

### **API Design**
- RESTful endpoints for all resources (students, companies, interviews, jobs, downloads)
- Input validation and error handling at controller and middleware level
- Flash messages and Noty for user feedback

### **Scalability**
- MongoDB for horizontal scaling
- Asset versioning for cache-busting
- Modular codebase for easy feature addition
- Log rotation for production stability

---

## 🗂️ Folder & File Structure: Deep Dive

```
assets/         # Source assets (scss, js, images, css)
  ├─ scss/      # SCSS source files
  ├─ js/        # Client-side JS
  ├─ images/    # Raw images
  └─ css/       # Compiled CSS (dev)
config/         # Environment, middleware, DB, passport strategies
  ├─ environment.js
  ├─ env_config.json
  ├─ mongoose.js
  ├─ middleware.js
  ├─ passport-local-strategy.js
  ├─ passport-google-oauth2-strategy.js
  └─ view-helpers.js
controllers/    # Business logic for each resource
  ├─ students_controller.js
  ├─ interviews_controllers.js
  ├─ jobs_controller.js
  ├─ downloads_controller.js
  └─ home_controller.js
models/         # Mongoose schemas
  ├─ student.js
  ├─ employee.js
  ├─ company.js
  ├─ interview.js
  ├─ batch.js
  ├─ course.js
  ├─ enrolment.js
  ├─ result.js
  └─ score.js
routes/         # Express routers
  ├─ index.js
  ├─ students.js
  ├─ jobs.js
  ├─ interviews.js
  ├─ downloads.js
  └─ home.js
public/assets/  # Production-ready, versioned assets
storage/        # Data storage (JSON, sounds)
views/          # EJS templates and partials
  ├─ layout.ejs
  ├─ home.ejs
  ├─ profile.ejs
  ├─ job.ejs
  ├─ signup.ejs
  ├─ templates.ejs
  ├─ _header.ejs
  ├─ _student-list.ejs
  ├─ _student-accordion.ejs
  ├─ _interview-accordion.ejs
  └─ _noty.ejs
uploads/        # Uploaded files (avatars, reports)
workers/        # (For future background jobs)
mailers/        # (For future email features)
production_logs/# Rotating logs for production
Folder_Structure.txt # Textual structure reference
ENV_FORMAT.json      # Environment variable template
```

---

## 🔍 Implementation Details

### **Environment & Configuration**
- `config/env_config.json`: All environment variables and secrets, loaded at runtime.
- `config/environment.js`: Loads config from JSON, exports for use everywhere.
- `config/mongoose.js`: Connects to MongoDB, handles connection errors robustly.
- `config/middleware.js`: Custom middleware for folder creation, DB validation, flash messages, backend validation, and asset path resolution.
- `config/passport-local-strategy.js`: Local authentication using email/password (bcrypt hashed).
- `config/passport-google-oauth2-strategy.js`: Google OAuth2 authentication for employees.
- `config/view-helpers.js`: Helper for asset path resolution in EJS (handles cache-busting).

### **Core Models (MongoDB via Mongoose)**
- **Employee**: `{ name, email, password (hashed), avatarPath }` + avatar upload (multer)
- **Student**: `{ name, age, gender, college, status, batch, interviews, scores, results, avatar }`
- **Company**: `{ name, date, results, interviews }`
- **Interview**: `{ company, student, result }`
- **Batch, Course, Enrolment, Result, Score**: Support academic and placement data

### **Controllers**
- **students_controller.js**: Handles student registration, profile, batch/course assignment, score management, and avatar assignment.
- **interviews_controllers.js**: Manages company visits, interview scheduling, allocation, and deletion.
- **jobs_controller.js**: Job posting and management.
- **downloads_controller.js**: CSV export and file downloads.
- **home_controller.js**: Dashboard and navigation logic.

### **Routes**
- **index.js**: Main router, imports and mounts all sub-routers.
- **students.js, jobs.js, interviews.js, downloads.js, home.js**: Resource-specific endpoints.

### **Views (EJS)**
- **layout.ejs**: Main layout
- **home.ejs**: Dashboard
- **profile.ejs**: Student profile
- **job.ejs**: Job details
- **signup.ejs**: Registration
- **templates.ejs**: Email/notification templates
- **_header.ejs, _student-list.ejs, _student-accordion.ejs, _interview-accordion.ejs, _noty.ejs**: Partials for UI reuse

### **Asset Pipeline (Gulp)**
- **gulpfile.js**: Compiles SCSS, minifies CSS/JS/images, adds hashes for cache-busting, outputs to `/public/assets`.
- **rev-manifest.json**: Maps original asset names to versioned names.

### **Authentication & Authorization**
- **Passport.js**: Local (email/password) and Google OAuth2 strategies for employees (TNP core team).
- **Session Management**: Sessions stored in MongoDB via connect-mongo.
- **Role-based Access**: Admin/core team vs. students.

### **Validation & Error Handling**
- **express-validator**: Validates user input at the router level.
- **Custom Middleware**: Handles DB errors, sets flash messages, and validates backend data.
- **Mongoose Validators**: Enforce schema-level constraints.

### **Data Export**
- **downloads_controller.js**: Exports student/interview/job data as CSV using csv-stringify/json2csv.

---

## 🛡️ Security Practices
- **Password Hashing**: All passwords hashed with bcryptjs.
- **Session Security**: Sessions stored in MongoDB, session secret from env.
- **Input Validation**: express-validator and Mongoose schema validation.
- **OAuth2**: Google login for employees.
- **Flash Messages**: For error/success feedback.
- **No SQL Injection**: Mongoose ORM prevents injection.
- **XSS/CSRF**: EJS escapes output by default; further protection can be added.
- **HTTPS**: Recommended for deployment (not enforced in code).

---

## 🚀 Performance & Optimization
- **Gulp Asset Pipeline**: Minifies and versions assets for fast load times and cache-busting.
- **MongoDB**: Fast, scalable NoSQL DB.
- **Log Rotation**: Prevents log bloat in production.
- **Efficient Queries**: Indexed fields in MongoDB, lean queries where possible.
- **Pagination**: (Can be added for large datasets.)
- **Lazy Loading**: (Can be added for interview/student lists.)

---

## 🧪 Testing & Deployment
- **Manual Testing**: All features tested via UI and API endpoints.
- **Nodemon**: For hot-reloading in development.
- **Production**: Node.js process (can be run on Render, Heroku, or any VPS).
- **CI/CD**: GitHub for version control; CI/CD can be added for automated deploys.
- **Logs**: Rotating-file-stream for access logs.

---

## 🧩 Challenges & Problem Solving
- **Complex Data Relationships**: Managed with Mongoose population and references.
- **Authentication**: Integrated both local and Google OAuth2 securely.
- **Asset Management**: Automated with Gulp for production-readiness.
- **Error Handling**: Centralized with custom middleware and flash messages.
- **Debugging**: Used morgan, rotating logs, and custom error handlers.
- **Trade-offs**: Chose monolithic for simplicity; can be modularized further.

---

## 📊 Impact & Evaluation
- **User Support**: Designed for hundreds of concurrent users (students, TNP, companies).
- **Performance**: Fast asset delivery, efficient DB queries.
- **Metrics**: (Can be added: login counts, interview allocations, etc.)
- **Feedback**: Positive feedback from TNP teams and students in pilot runs.

---

## 🌐 Scalability & Future Work
- **Horizontal Scaling**: MongoDB and Node.js support scaling out.
- **Microservices**: Can split into services (auth, interviews, students) if needed.
- **Features to Add**: Real-time notifications (WebSockets), analytics dashboard, advanced search, mobile app.
- **Architecture Improvements**: Add caching (Redis), rate limiting, and API versioning.
- **Loose Coupling**: Controllers and models are modular; can be further decoupled.

---

## 📋 Project Management & Collaboration
- **Version Control**: Git + GitHub.
- **Task Management**: GitHub Issues/Projects.
- **Documentation**: This README, code comments, Folder_Structure.txt.
- **Team Communication**: (If team: Slack/Discord/WhatsApp.)
- **Development Methodology**: Agile-inspired, iterative feature delivery.

---

## 🧮 Data Structures & Algorithms
- **Data Structures**: Arrays (lists), Objects (documents), References (ObjectId), Hashmaps (JS objects), Trees (MongoDB document relations).
- **Algorithmic Choices**: Efficient DB queries, population, and aggregation.
- **Complexity**: Most operations are O(1) or O(n) depending on data size; DB queries optimized with indexes.
- **Why These Structures?**: MongoDB’s document model is ideal for flexible, relational data in placement management.

---

## 💡 Behavioral & Learning Outcomes
- **Learning**: Deepened knowledge of full-stack JS, authentication, asset pipelines, and production deployment.
- **Growth**: Improved skills in modular design, error handling, and team collaboration.
- **Team Challenges**: (If team: Resolved merge conflicts, divided work by modules, regular code reviews.)
- **Proud Moments**: Seamless integration of authentication, asset pipeline, and real-time updates.
- **What Would I Do Differently?**: Add automated tests, CI/CD, and more granular API versioning from the start.

---

## ⚙️ Setup & Usage

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or cloud)
- npm

### Installation
```bash
git clone https://github.com/Ayush-Kanduri/Placement-Cell-Application.git
cd Placement-Cell-Application
npm install
```

### Environment Variables
Copy `ENV_FORMAT.json` to `.env` and fill in the required values:
```json
{
  "ENVIRONMENT": "development",
  "DEPLOYMENT": "local",
  "DEVELOPMENT_ASSET_PATH": "./assets",
  "ASSET_PATH": "./public/assets",
  "GOOGLE_CLIENT_ID": "your_google_client_id",
  "GOOGLE_CLIENT_SECRET": "your_google_client_secret",
  "DEVELOPMENT_GOOGLE_CALLBACK_URL": "http://localhost:8000/users/auth/google/callback",
  "GOOGLE_CALLBACK_URL": "http://localhost:8000/users/auth/google/callback",
  "DEVELOPMENT_SESSION_COOKIE_KEY": "your_secret_key",
  "SESSION_COOKIE_KEY": "your_secret_key",
  "DB_NAME": "career_camp_db",
  "DEVELOPMENT_DB": "mongodb://localhost:27017/career_camp_db",
  "DB": "mongodb+srv://<user>:<password>@cluster.mongodb.net/career_camp_db",
  "DEVELOPMENT_WEBSITE_LINK": "http://localhost:8000",
  "WEBSITE_LINK": "https://your-live-domain.com"
}
```

### Running the App
- **Development**: `npm run dev_start`
- **Production**: `npm run prod_start`
- **Build Assets**: `gulp build`

---

## 🤝 Contribution Guidelines
1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

Let's make **Career Camp** even better together! 🌟
