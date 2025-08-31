Bakery API & Frontend Application
This is a full-stack application for a fictional bakery, featuring a secure backend API and a responsive frontend built with React and Tailwind CSS. The following report summarizes the successful functionality and security of the API endpoints, as confirmed by comprehensive testing.

Technologies Used
Backend: Python (Django), Django REST Framework, and a database (e.g., SQLite, PostgreSQL).

Frontend: React for the user interface and Tailwind CSS for a responsive and modern design.

Installation & Setup
Backend Setup
Clone the repository and navigate to the backend directory.

git clone <repository-url>
cd <backend-directory>

Create and activate a virtual environment.

python3 -m venv venv
source venv/bin/activate

Install the required dependencies.

pip install -r requirements.txt

Apply database migrations.

python manage.py makemigrations
python manage.py migrate

Start the development server.

python manage.py runserver

The backend API will be available at http://127.0.0.1:8000/.

Frontend Setup
Navigate to the frontend directory.

cd <frontend-directory>

Install the Node.js packages.

npm install

Start the React application.

npm start

The frontend will open in your browser, connecting to the local backend API.

API Endpoints
All endpoints are hosted at http://127.0.0.1:8000/api/.

Endpoint

Method

Description

/user/register/

POST

Creates a new user account.

/user/login/

POST

Authenticates a user and returns an access token.

/user/me/

GET

Retrieves the profile of the authenticated user.

/user/logout/

POST

Invalidates the user's token.

/bakery/products/

GET / POST

Lists all products or creates a new one.

/bakery/products/<id>/

GET / PUT / DELETE

Manages a specific product by ID.

/cart/

GET

Retrieves the user's cart details.

/cart/add/

POST

Adds a product to the cart.

/cart/update/<pk>/

PUT

Updates the quantity of a cart item.

/cart/remove/<pk>/

DELETE

Removes an item from the cart.

/checkout/

POST

Processes the cart and creates an order.

API Test Report Summary
Executive Summary
The REST API endpoints for the Bakery API have been thoroughly tested using Postman. All core functionalities, including CRUD operations, as well as security, data validation, and error handling, have passed all tests successfully. The API is confirmed to be stable and ready for integration with the frontend application.

1. User Authentication Endpoints
Functional Endpoints (Happy Path): All core user management endpoints are fully functional. The tests for registration, login, profile access, and logout all passed as expected, confirming the correct status codes and response bodies.

Robustness & Security (Unhappy Path): The API correctly handles various error conditions. Tests for invalid login credentials, unauthorized access to protected endpoints, and duplicate user registration were all successfully rejected with the appropriate 400 or 401 status codes.

2. Bakery Product Endpoints
Core CRUD Operations: The API's ability to handle Create, Read, Update, and Delete for all bakery products was successfully verified.

Security & Permissions: An attempt to create a new product without an authentication token was successfully rejected with a 401 Unauthorized status, confirming that data-modifying operations are protected.

Data Validation: The API correctly validates incoming data. Requests with empty or missing fields were successfully rejected with a 400 Bad Request status, providing specific error details.

Error Handling & Edge Cases: The API handles requests for non-existent resources gracefully. A request for a product ID that does not exist was successfully handled with a 404 Not Found status.

Scalability & Efficiency: The API correctly supports both pagination and filtering, demonstrating its ability to handle large datasets efficiently.

3. Cart API Endpoints
Core Functionality: All core cart functionalities were successfully verified. This includes retrieving a cart (which correctly creates one if it doesn't exist), adding new products or updating existing ones, modifying the quantity of a cart item, and removing items from the cart.

Error and Security Handling:

An attempt to add an invalid product ID was correctly rejected with a 400 Bad Request.

Attempts to update or delete another user's cart item were correctly denied, returning a 403 Forbidden status code, which is a vital security confirmation.

4. Checkout API Endpoints
Successful Checkout: A test with a valid, populated cart was successful. The API created a new order and returned a 201 Created status with the complete order details.

Post-Checkout State: After a successful checkout, the user's cart was confirmed to be empty, preventing duplicate orders.

Negative Test Cases:

Attempting to check out with an empty cart was correctly rejected with a 400 Bad Request and a helpful error message.

Attempting to check out without authentication was correctly denied with a 401 Unauthorized status.

All tests confirm that the API is fully functional, secure, and ready for use.
