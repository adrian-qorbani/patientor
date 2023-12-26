# Patientor: Medical Record Application

A full-stack medical record application designed to handle diagnoses and health information of patients. The project is written in strictly typed TypeScript and utilizes a technology stack that includes but not limited to React, MaterialUI, Node.js (Express), and is tested with Jest, bundled with Vite. The codebase is formatted using ESLint and Prettier. The communication between the frontend and backend is achieved through a RESTful API. Project utilizes [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for versioning and documentation. It's an extended/enhanced version of my certification project for [FullStackOpen's Typescript Development Course](https://fullstackopen.com/en/part9/).

## Technologies Used

- Languages: TypeScript, JavaScript
- Vite
- React
- Node.js (Express.js)
- Normalize.css + Material-UI
- Jest

### Formating/Linting
- Prettier
- ESLint
- ESlint-config-prettier

### Utilities
bcrypt, cors, dotenv, jsonwebtoken, express-validator, mongodb-memory-server (for testing)

## Project Structure

- **`/client`**: Contains the React application for the frontend.
- **`/src`**: Houses the Express server for the backend.
- **`/src/__tests__`**: Holds the Jest tests for the server.
- **`/client/__tests__`**: Holds the Jest tests for the client. (not implanted yet)
- **`/e2e/`**: Holds the Cypress tests for the end-to-end testing. (not implanted yet)
- **`/.env`**: Put your mongodb uri and port


## Features (completed and pending)

- [x] Utilize conventional commits for versioning and documentation
- [x] Set up React and Express, establish connection using RESTful API
- [x] Set up ESLint and Prettier for code linting and formatting
- [x] Use TypeScript for strict typing
- [x] Implement user interface for displaying patient information, addition and entries entry
- [x] Implement RESTful API for handling patient information
- [x] Use MaterialUI for styling and components
- [x] Integrate Jest for unit testing backend endpoints
- [ ] Integrate Jest for unit testing frontend
- [ ] Conduct Cypress for end-to-end testing
- [ ] Enhance frontend for better user experience
- [x] Implement user administration and authentication
- [ ] Integrate user administration and authentication
- [x] Integrate MongoDB for data storage and users
- [ ] Refactor client code for better maintainability
- [x] Refactor server code for better maintainability
- [x] Enhance error handling in the backend
- [ ] Implement continuous integration for automated testing and deployment


## Getting Started

To get started with the project, follow these steps:
1. Install the required dependencies for the frontend and backend
2. Set up environment configurations as needed
3. Run the development server
4. Access the application in your web browser
