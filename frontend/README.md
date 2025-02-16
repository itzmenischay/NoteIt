# NoteIt

## Overview
NoteIt is a feature-rich note-taking application built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). This app provides a secure and efficient way for users to store their notes on the cloud, ensuring that their data is accessible anytime, anywhere.

## Features
- **User Authentication**: Secure login and logout functionality.
- **Cloud Storage**: Notes are stored safely on the cloud.
- **Create, Edit, and Delete Notes**: Users can manage their notes efficiently.
- **User-Friendly Interface**: Simple and intuitive UI for seamless interaction.
- **Responsive Design**: Optimized for all screen sizes and devices.
- **Protected Routes**: Access control to ensure only authenticated users can manage their notes.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Bootstrap / CSS

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- npm (Node Package Manager)

### Steps to Run Locally
1. **Clone the Repository**
   ```bash
   git clone https://github.com/itzmenischay/NoteIt.git
   cd NoteIt
   ```
2. **Install Dependencies**
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
3. **Setup Environment Variables**
   - Create a `.env` file in the backend directory and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. **Start the Application**
   - Backend:
     ```bash
     cd backend
     npm nodemon index.js
     ```
   - Frontend:
     ```bash
     npm start
     ```
5. Open `http://localhost:3000` in your browser.

## Usage
1. Register/Login to access the app.
2. Add, edit, or delete your notes.
3. Logout when finished.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## Contact
For any queries, feel free to reach out at gladiatoruk1234@gmail.com.

