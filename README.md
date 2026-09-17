# Auth API

A RESTful authentication API built with Node.js, Express, and SQLite.
Project 7 in a sequential backend engineering learning journey — the first
project to introduce password hashing, JWT-based authentication, and
route-protecting middleware.

## Features

- User registration with bcrypt password hashing
- Login issuing a JWT
- Protected route example (`/api/auth/profile`) gated by auth middleware
- Duplicate email prevention (application check + DB `UNIQUE` constraint)
- Generic error messages on login failure (prevents user enumeration)
- Environment variables via `.env` for secrets

## Tech Stack

- Node.js, Express, SQLite
- bcrypt (password hashing)
- jsonwebtoken (JWT issuing/verification)
- dotenv (environment config)

## Getting Started

```bash
cp .env.example .env
# then edit .env and set a real JWT_SECRET
npm install
npm run dev
```

Server runs on `http://localhost:3006`.

## API Endpoints

| Method | Endpoint             | Auth required  | Description                |
|--------|----------------------|----------------|----------------------------|
| POST   | /api/auth/register   | No             | Create a new user          |
| POST   | /api/auth/login      | No             | Log in, receive a JWT      |
| GET    | /api/auth/profile    | Yes (Bearer)   | Get the logged-in user     |

### Register / Login request body

```json
{
  "username": "janedoe",
  "email": "jane@example.com",
  "password": "supersecret123"
}
```

### Accessing protected routes

`Authorization: Bearer <token-from-register-or-login>`

## Project Structure

src/
├── config/ - Database connection setup
├── models/ - SQL queries (async)
├── controllers/ - Registration/login logic, password hashing, JWT issuing
├── routes/ - URL-to-controller mapping, protected route example
└── middleware/ - Error handling + JWT verification (requireAuth)

## Security Notes

- Passwords are never stored in plain text — only bcrypt hashes, each
  with its own random salt.
- JWTs are signed but not encrypted — never put sensitive data in a
  token payload.
- `.env` (containing the real `JWT_SECRET`) is gitignored; see
  `.env.example` for required variables.
  