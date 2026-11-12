# Splitpal - Expense Management System

A full-stack web application for managing shared expenses among groups. Users can create groups, track expenses, split costs, settle debts, and generate reports.

## Tech Stack

**Backend**
- Java 17, Spring Boot 3.4
- Spring Security with JWT Authentication
- Spring Data JPA (MySQL)
- Spring Mail with Thymeleaf email templates
- Apache POI (Excel export), iTextPDF / OpenPDF (PDF export)
- Lombok

**Frontend**
- React 18 with Vite
- React Router v7
- Bootstrap 5
- Chart.js / Recharts for data visualization
- Formik + Yup for form handling and validation
- Axios for API calls

## Features

- User registration and login with JWT-based authentication
- Password reset via email
- Create and manage expense groups
- Invite members to groups via email
- Add and split expenses (equal, custom splits)
- Track balances and settle debts between members
- Dashboard with expense summaries and charts
- Export reports as PDF or Excel
- Email notifications for expenses and settlements

## Project Structure

```
├── backend/
│   └── src/main/java/com/expensemanager/expense_backend/
│       ├── config/          # CORS and mail configuration
│       ├── controller/      # REST API endpoints
│       ├── dto/             # Request/response objects
│       ├── model/           # JPA entities
│       ├── repository/      # Data access layer
│       ├── security/        # JWT filter and security config
│       ├── service/         # Business logic
│       └── util/            # PDF and Excel generators
├── frontend/
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # Reusable components
│       ├── contexts/        # Auth context provider
│       ├── layouts/         # Dashboard layout
│       └── pages/           # Login, Register, Dashboard pages
```

## Prerequisites

- Java 17+
- Maven
- Node.js 18+
- MySQL

## Getting Started

### Database Setup

Create a MySQL database:

```sql
CREATE DATABASE expensetracker;
```

### Backend

```bash
cd backend
```

Update `src/main/resources/application.properties` with your MySQL credentials and mail settings.

```bash
./mvnw spring-boot:run
```

The backend server starts on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| POST | `/api/auth/forgot-password` | Send password reset email |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET | `/api/groups` | Get user's groups |
| POST | `/api/groups` | Create a new group |
| POST | `/api/groups/invite` | Invite member to group |
| GET | `/api/expenses/group/{id}` | Get expenses for a group |
| POST | `/api/expenses` | Add a new expense |
| GET | `/api/settlements/group/{id}` | Get settlements for a group |
| POST | `/api/settlements` | Record a settlement |
| GET | `/api/reports/group/{id}` | Get group report data |
| GET | `/api/reports/export/pdf/{id}` | Export report as PDF |
| GET | `/api/reports/export/excel/{id}` | Export report as Excel |
