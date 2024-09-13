# Country Info App

This project is a Full-Stack JavaScript application that provides information about countries. The application consists of both a backend (Node.js) and a frontend (React.js).

## Project Structure

```
Full-Stack JS/
│
├── backend/                  # Backend folder (Node.js, Express)
├── frontend/
│   └── country-info/          # Frontend folder (React.js)
├── package.json               # Root package file
├── .gitignore                 # Git ignore file
└── README.md                  # This file
```

## Prerequisites

To run this project locally, you need the following:

- **Node.js** (v16+ recommended)
- **npm** (Node Package Manager, comes with Node.js)

## Installation and Running the App

### 1. Install dependencies for the project root

First, navigate to the root directory of the project (`Full-Stack JS/`). Inside this directory, run the following command to install the necessary dependencies:

```bash
npm install
```

### 2. Start the backend server

After installing the dependencies, you can start the backend server by running:

```bash
npm start
```

This will start the backend server on the default port (`http://localhost:5001` or whichever port is defined in your backend configuration).

### 3. Navigate to the frontend

Next, navigate to the frontend directory located at `frontend/country-info/`:

```bash
cd frontend/country-info
```

### 4. Install frontend dependencies

Inside the `country-info` folder, install the dependencies for the React frontend by running:

```bash
npm install
```

### 5. Start the frontend

After the dependencies are installed, start the frontend React application with:

```bash
npm start
```

This will start the frontend development server, usually at `http://localhost:3000`.

### 6. Application Flow

- The backend server must be running first (`npm start` in the root directory).
- Once the backend is running, the frontend server can be started (`npm start` in the `frontend/country-info` folder).
- Visit `http://localhost:3000` in your browser to interact with the application.

## Notes

- Ensure both the backend and frontend servers are running simultaneously for the app to work properly.
- The frontend communicates with the backend via API calls to retrieve country information.

## License

This project is open-source and available under the [MIT License](LICENSE).
