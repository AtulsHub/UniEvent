# StayFinder Backend

## Overview
StayFinder is a full-stack web application that allows users to list and book properties for short-term or long-term stays, similar to Airbnb. This backend documentation provides setup instructions and usage guidelines for the backend services.

## Tech Stack
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB/PostgreSQL**: Database for storing user, listing, and booking information.
- **JWT**: For user authentication and authorization.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB or PostgreSQL installed and running
- A code editor (e.g., VS Code)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd stayfinder/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following environment variables:
   ```
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Seed the database with initial data (if applicable).

### Running the Application
To start the backend server, run:
```
npm start
```
The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in an existing user.

### Listings
- **GET** `/api/listings`: Retrieve all property listings.
- **GET** `/api/listings/:id`: Retrieve details of a specific listing.
- **POST** `/api/listings`: Create a new listing (host only).
- **PUT** `/api/listings/:id`: Update an existing listing (host only).
- **DELETE** `/api/listings/:id`: Delete a listing (host only).

### Bookings
- **POST** `/api/bookings`: Create a new booking.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.