# E-commerce Backend

This project is a Node.js backend for an e-commerce application. It includes user authentication, session management, and various routes for managing a shopping cart.

## Features

- User registration and login
- Session management with cookies
- Add, remove, and view items in a cart
- Clear the cart
- User logout

## Prerequisites

- Node.js
- npm (Node package manager)
- MongoDB database

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/eni21-star/Cart-System.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=your_port_number
    MONGO_DB=your_mongodb_connection_string
    SECRETKEY=your_secret_key
    ```

## Usage

1. Start the server:
    ```bash
    node server.js
    ```

2. The server will run on the port specified in your `.env` file.

## API Endpoints

### Authentication

- `POST /register`: Register a new user
- `POST /login`: Login a user
- `POST /logout`: Logout a user

### Cart

- `POST /addtocart`: Add and remove an item from the cart
- `GET /cart`: View the items in the cart
- `DELETE /removeitem`: Remove an item from the cart
- `DELETE /clearcart`: Clear the cart

## Project Structure

```plaintext
.
├── express-session
│   └── express-session.js
├── routes
│   ├── Authentication
│   │   ├── Register.js
│   │   ├── login.js
│   │   └── logout.js
│   └── Cart
│       ├── addtoCart.js
│       ├── clearCart.js
│       ├── removeitem.js
│       └── viewcart.js
├── .env
├── package.json
└── server.js


Contributions are welcome! Please open an issue or submit a pull request.
