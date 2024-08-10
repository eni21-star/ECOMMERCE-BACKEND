
---

# Express E-Commerce API

Welcome to the Express E-Commerce API! This project is a robust backend solution for an e-commerce platform built with Express.js and MongoDB. It provides a range of functionalities, including user authentication, product management, cart operations, and more.

## Features

- **User Authentication**: Register, login, and logout functionality.
- **Product Management**: CRUD operations for products.
- **Cart Management**: Add, view, remove, and clear items in the cart.
- **Product Reviews**: Add and view product reviews.
- **Checkout**: Process transactions (note: for development use only).
- **Invoice Management**: Generate and manage invoices.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/@eni21-star/ECOMMERCE-BACKEND.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd your-repository
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGO_DB=""
   PORT=
   SECRETKEY = ""
   REDIS_URL= ""

   
   ```

5. **Start the Server**

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **Register**: `POST /api/v1/register`
- **Login**: `POST /api/v1/login`
- **Logout**: `POST /api/v1/logout`

### Cart

- **Add to Cart**: `POST /api/v1/addtocart`
- **View Cart**: `GET /api/v1/cart`
- **Remove Item**: `DELETE /api/v1/removeitem`
- **Clear Cart**: `DELETE /api/v1/clearcart`

### Products

- **View All Products**: `GET /api/v1/products`
- **Get One Product**: `GET /api/v1/product/:id`
- **Upload Product**: `POST /api/v1/product`
- **Update Product**: `PUT /api/v1/update/:id`
- **Delete Product**: `DELETE /api/v1/delete/:id`

### User Management

- **Manage Users**: `GET /api/v1/users`

### Reviews

- **Add Review**: `POST /api/v1/review`
- **View Reviews**: `GET /api/v1/review/:productId`

### Checkout

- **Checkout**: `POST /api/v1/checkout`

### Invoice

- **Generate Invoice**: `GET /api/v1/invoice/:orderId`

## Development

For development purposes, you may want to run the server with `nodemon` to auto-reload on changes:

```bash
npm install -g nodemon
nodemon index.js
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute.

## Contact

For any inquiries, please reach out to [eniolaolagbegi@gmail.com](mailto:eniolaolagbegi@gmail.com).

---
