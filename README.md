# Railway Management System API

A Node.js based railway management system similar to IRCTC that allows users to check train availability, book seats, and manage bookings.

## Tech Stack

- **Web Server**: Node.js with Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Zod

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- PostgreSQL

## Setup and Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd IRCTC_API
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a .env file in the root directory;

```bash
DB_HOST=localhost
DB_USER=database_username_name
DB_PASS=database_password
DB_NAME=database_name
JWT_SECRET=secret
ADMIN_API_KEY=api-key-to-authenticate-admin
PORT=3000
```

4. **Start PostgreSQL using Docker**
```bash
docker-compose up -d
```

5. **Run the application**
```bash
node index.js
```

## API Documentation

### Authentication Endpoints
**Register User**
```bash
POST /api/v1/auth/signup


{
    "username": "user123",
    "email": "user@example.com",
    "password": "password123",
    "role": "user"
}
```

**Login User**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```
### Admin Endpoints
All admin endpoints require:
*Authorization: Bearer <jwt_token>*
*x-api-key: <admin_api_key>*

**Create Train**
```bash
POST /api/v1/train/create
Content-Type: application/json

{
    "train_name": "Express123",
    "source": "Amethi",
    "destination": "Bhopal",
    "totalSeats": 500
}
```
**Update Train Seats**
```bash
PUT /api/v1/train/update/:trainId
Content-Type: application/json

{
    "addSeats": 50
}
```

### User Endpoints
All user endpoints require:
*Authorization: Bearer <jwt_token>*
**Get Available Trains**
```bash
GET /api/v1/train/trains?source=Amethi&destination=Bhopal
```

**Check Seat Availability**
```bash 
GET /api/v1/train/check?trainId=<train_id>
```
**Book a Seat**
```bash
POST /api/v1/train/book
Content-Type: application/json

{
    "trainId": "<train_id>"
}
```
Get All Bookings
```bash
GET /api/v1/train/bookings
```
Get Specific Booking Details
```bash
GET /api/v1/train/booking?bookingId=<booking_id>
```
Database Models

+ User Model
   - id (UUID)
   - username (String)
   - email (String)
   - password (String)
   - role (Enum: 'admin', 'user')
+ Train Model
   - id (UUID)
   - train_name (String)
   - source (String)
   - destination (String)
   - totalSeats (Integer)
   - availableSeats (Integer)
   - version (Integer)
+ Booking Model
   - id (UUID)
   - seatNo (Integer)
   - status (Enum: 'booked', 'cancelled')
   - userId (UUID)
   - trainId (UUID)
### Features
+ Role-based authentication (Admin/User)
+ JWT-based authorization
+ API key protection for admin routes
+ Input validation using Zod
+ Concurrent booking handling using transactions
+ Case-insensitive train search
+ Seat availability tracking


