# User Management Application

This project is a web application for user registration, authentication, and user management.
It was implemented as part of Task #5.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Bootstrap

### Backend
- Node.js
- Express

### Database
- PostgreSQL

---

## Features

- User registration and authentication
- User management table (admin panel)
- Multiple user selection using checkboxes
- Toolbar actions:
  - Block users
  - Unblock users
  - Delete users
  - Delete unverified users
- Sorting users by last login time
- Blocking and deleting current user is allowed
- Automatic redirection to login page if a blocked user tries to access the system

---

## User Statuses

Each user has one of the following statuses:
- `unverified`
- `active`
- `blocked`

The status is enforced on the database level using a PostgreSQL ENUM type.

---

## Database Consistency and Email Uniqueness

Email uniqueness is **guaranteed at the database level**, not in application code.

A **UNIQUE INDEX** is created on the `email` column:

```sql
CREATE UNIQUE INDEX uniq_users_email ON users (email);
