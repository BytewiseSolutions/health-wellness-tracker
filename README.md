# Health and Wellness Tracking System

A comprehensive health and wellness tracking platform with web and mobile applications.

## Project Structure

```
health-wellness-tracker/
├── api/          # Spring Boot REST API (Backend)
├── web/          # Angular Web Application
├── app/          # Ionic + Angular Mobile Application
└── README.md     # This file
```

## Technology Stack

- **Backend**: Java Spring Boot, MySQL
- **Web Frontend**: Angular
- **Mobile App**: Ionic + Angular
- **Database**: MySQL

## Features

- User Authentication & Profile Management
- Dashboard with Health Overview
- Fitness Activity Tracking
- Mental Health & Mood Tracking
- Health Journal
- Medication Reminders
- Admin Panel

## Setup Instructions

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Angular CLI
- Ionic CLI

### Backend (API)

1. Navigate to the api directory:
   ```bash
   cd api
   ```

2. Update database configuration in `src/main/resources/application.properties`

3. Run the Spring Boot application:
   ```bash
   ./gradlew bootRun
   ```

The API will be available at `http://localhost:8080`

### Web Application

1. Navigate to the web directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

The web app will be available at `http://localhost:4200`

### Mobile Application

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ionic serve
   ```

The mobile app will be available at `http://localhost:8100`

## Database Setup

1. Create a MySQL database named `health_tracker`
2. Update the database credentials in `api/src/main/resources/application.properties`
3. The application will automatically create the required tables on first run

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Future Endpoints (To be implemented)
- `/api/fitness` - Fitness activities
- `/api/mood` - Mood entries
- `/api/journal` - Health journal
- `/api/medication` - Medication management
- `/api/dashboard` - Dashboard data

## Development Status

✅ Project structure created
✅ Spring Boot API with entities and repositories
✅ Basic authentication endpoints
✅ Angular web application scaffolded
✅ Ionic mobile application scaffolded
🔄 Frontend components (In Progress)
🔄 Complete API endpoints (In Progress)
🔄 Authentication integration (Pending)
🔄 Dashboard implementation (Pending)

## Next Steps

1. Implement remaining API endpoints
2. Create Angular components and services
3. Implement authentication flow
4. Build dashboard with charts
5. Add form validation
6. Implement medication reminders
7. Add responsive design
8. Testing and deployment