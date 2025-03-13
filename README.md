# DocChat

DocChat is a WebSocket-based real-time chat application designed for seamless communication between doctors and patients. It enables instant messaging with a secure and scalable architecture.

## Features
- Real-time chat using WebSockets
- Secure and encrypted communication
- User authentication and authorization
- Doctor and patient user roles
- Responsive UI for web and mobile devices

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **WebSockets:** Socket.io

## Installation

### Prerequisites
- Node.js installed
- MongoDB instance running

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/ganesh-codes404/DocChat.com.git
   cd DocChat.com
   ```

2. Install dependencies for the backend:
   ```sh
   cd server
   yarn install
   ```

3. Install dependencies for the frontend:
   ```sh
   cd client
   yarn install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory and add the necessary environment variables (e.g., MongoDB URI, WebSocket configurations, JWT secret, etc.).

5. Start the backend server:
   ```sh
   yarn start
   ```

6. Start the frontend application:
   ```sh
   yarn start
   ```

## Usage
- Register as a doctor or patient.
- Login and start a real-time chat session.
- Send and receive messages instantly.

## Contributing
Feel free to fork the repository and submit pull requests. Follow best practices and add proper documentation for any changes.

## License
This project is licensed under the MIT License.

## Contact
For any queries, reach out at [your email or social handle].
