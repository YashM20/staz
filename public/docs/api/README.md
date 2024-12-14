# API Documentation

## Overview
Staz uses Next.js API routes with RESTful endpoints for all server-side operations.

## Authentication
- NextAuth.js for user authentication
- JWT-based session management
- Role-based access control

## Core Endpoints

### Users
- `POST /api/auth/signup`: Create new user account
- `GET /api/users/me`: Get current user profile
- `PATCH /api/users/me`: Update user profile

### Links
- `POST /api/links`: Create new link
- `GET /api/links`: List user's links
- `PATCH /api/links/:id`: Update link
- `DELETE /api/links/:id`: Delete link

### Collections
- `POST /api/collections`: Create collection
- `GET /api/collections`: List collections
- `PATCH /api/collections/:id`: Update collection
- `DELETE /api/collections/:id`: Delete collection

### Tags
- `POST /api/tags`: Create tag
- `GET /api/tags`: List tags
- `DELETE /api/tags/:id`: Delete tag

## Error Handling
Standard error responses follow this format: 