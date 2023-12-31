﻿# Levitation-Backend
## Getting Started

Follow the instructions below to set up and run the project.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shivamuttpal/Levitation-Backend.git
   cd assignment-Levitation

### Install Dependencies

   npm install

### Configuration

1. Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE=mongodb://localhost/my-blog
   JWT_SECRET=your-secret-key
   PORT= 8000

Replace your-secret-key with a strong, unique secret key for JWT token signing



## Running the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shivamuttpal/Levitation-Backend.git
   cd assignment-Levitation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   nodemon server.js
   ```

   The server will run on `http://localhost:8000`.

## API Endpoints

- **List all blogs:**
  - Endpoint: `GET /all-blog`
  - Requires authentication token in the `Authorization` header.

- **Retrieve a single blog by ID:**
  - Endpoint: `GET /get-blog/:id`
  - Requires authentication token in the `Authorization` header.

- **Create a new blog:**
  - Endpoint: `POST /create-blog`
  - Requires authentication token in the `Authorization` header.

- **Update an existing blog:**
  - Endpoint: `PUT /update-blog/:id`
  - Requires authentication token in the `Authorization` header.

- **Delete a blog:**
  - Endpoint: `DELETE /delete-blog/:id`
  - Requires authentication token in the `Authorization` header.

- **User Registration:**
  - Endpoint: `POST /register`
  - Register a new user.

- **User Login:**
  - Endpoint: `POST /login`
  - Obtain an authentication token.

## Running Tests

Make sure the server is not running when you run tests. Use the following command:

```bash
npm test
```

## Additional Notes

- Ensure that MongoDB is running and accessible.
- Handle errors appropriately in a production environment.
- This is a basic example; consider enhancing security and features based on your requirements.

