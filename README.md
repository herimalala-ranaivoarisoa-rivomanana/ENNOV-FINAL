# Product Management Application

This project is a full-stack web application for managing products and users, built with a NestJS backend and a React frontend. It features a RESTful API with authentication and authorization mechanisms, utilizing JWT tokens. The frontend is styled with Material-UI and employs React Router for navigation.

## Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

## Installation

### Backend Setup

Clone the repository

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a single Docker Compose file located at the root of the project to manage the backend services.

3. Start the backend services:

   ```bash
   docker-compose up -d
   ```

4. Install backend dependencies:

   ```bash
   npm install
   ```

5. Run database migrations and seed the database:

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

6. Start the backend in development mode:

   ```bash
   npm run start:dev
   ```

7. Access the API documentation via Swagger at: [http://localhost:4000/api](http://localhost:4000/api)

### Frontend Setup

1. From Project root navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the React application:

   ```bash
   npm start
   ```

## Credentials

To test the application, use the following credentials:

- **Username:** <reviewer@ennov.io>
- **Password:** reviewerpassword@ennov.io-test

These credentials can be used to log in to the application and access features.

## Features

- **Backend:**
  - RESTful API development using NestJS.
  - Authentication and authorization with JWT tokens.
  - Error handling and validation following RESTful principles.

- **Frontend:**
  - React application styled with Material-UI.
  - Navigation using React Router.
  - State management with Redux Toolkit, including selectors for efficient data retrieval.
  - Form validation and error handling.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
