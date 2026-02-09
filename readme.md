# Chat App

A basic real-time chat application built with Node.js, Express, and Socket.io.

## Introduction

This application allows users to join specific chat rooms and exchange messages in real-time. It demonstrates the power of **Socket.io** for bidirectional communication.

Key features include:
-   **Socket.io Rooms**: Users are isolated into specific rooms based on the URL, ensuring messages are only received by participants in that room.
-   **Typing Events**: **[Emphasized]** The app features a real-time typing indicator. When a user starts typing, a "Typing..." message appears for other users in the room, enhancing the interactive experience.
-   **Message Persistence**: All chat history is stored in a MongoDB database, allowing users to see previous messages when they join a room.

## Setup

Follow these steps to get the application running locally:

1.  **Prerequisites**:
    -   [Node.js](https://nodejs.org/) installed on your machine.
    -   [MongoDB](https://www.mongodb.com/) installed and running locally on the default port (27017).

2.  **Installation**:
    Open your terminal, navigate to the project directory, and install the dependencies:
    ```bash
    cd chat_app
    npm install
    ```

3.  **Configuration**:
    Ensure your MongoDB instance is running. The app connects to the database using the configuration in `config/database-config.js`.

4.  **Running the App**:
    Start the server using:
    ```bash
    npm start
    ```
    This will run the app with `nodemon` for auto-reloading during development.
    The server will start on **port 3000**.

5.  **Accessing the App**:
    Open your web browser and navigate to dynamic room URLs:
    `http://localhost:3000/chat/[roomid]`
    
    Replace `[roomid]` with any unique identifier for your room (e.g., `http://localhost:3000/chat/general`). open the same URL in another tab or browser to simulate multiple users.

## Functions

The application is built around several key functions and events:

### Server-Side (`index.js`)
-   **`connection`**: Triggered when a client connects. Sets up event listeners for that socket.
-   **`join_room`**: Joins the socket to a specific room ID provided by the client.
-   **`send_msg`**:
    -   Receives message data (content, username, roomid).
    -   Creates a new `Chat` document in MongoDB.
    -   Emits `message_received` to all sockets in that `roomid`.
-   **`typing`**:
    -   Receives a typing notification from a client.
    -   Broadcasts `someoneTyping` to all *other* sockets in the same room.
-   **Routes**:
    -   `GET /chat/:roomid`: Fetches existing chat history for the room and renders the chat interface (`views/index.ejs`).

### Client-Side (`views/index.ejs`)
-   **Initialization**: Connects to the server and emits `join_room` using the room ID from the URL/template.
-   **Sending Messages**: On button click, emits `send_msg` with the input value, username, and room ID.
-   **Receiving Messages**: Listens for `message_received` and appends the new message to the list.
-   **Typing Indicator**:
    -   On keypress in the message input, emits `typing`.
    -   Listens for `someoneTyping` to show a "Typing..." span, which hides automatically after 2 seconds.
