# 🍰 Wonder Cakes API & Frontend Application

[![Django](https://img.shields.io/badge/Backend-Django-green?logo=django)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/API-Django%20REST%20Framework-red?logo=django)](https://www.django-rest-framework.org/)
[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Postman Tested](https://img.shields.io/badge/Tests-Passed-orange?logo=postman)](https://www.postman.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

A **full-stack application** for a fictional bakery featuring a secure backend API and a responsive frontend built with **React** and **Tailwind CSS**.
This README summarizes the functionality, setup, and testing results of the application.

---

## 🛠️ Technologies Used

**Backend:**

* 🐍 Python (Django)
* 🔌 Django REST Framework
* 🗄️ SQLite / PostgreSQL

**Frontend:**

* ⚛️ React
* 🎨 Tailwind CSS

---

## ⚙️ Installation & Setup

### 🔙 Backend Setup

```bash
# Clone repository & navigate
git clone <repo-url>
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start server
python manage.py runserver
```

👉 Backend runs at: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

👉 Frontend opens in browser and connects to backend API.

---

## 🔗 API Endpoints

All endpoints are hosted at: **[http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)**

### 👤 User Authentication

| Endpoint          | Method | Description                      |
| ----------------- | ------ | -------------------------------- |
| `/user/register/` | POST   | Create a new user account.       |
| `/user/login/`    | POST   | Authenticate and return a token. |
| `/user/me/`       | GET    | Retrieve authenticated profile.  |
| `/user/logout/`   | POST   | Invalidate the token.            |

---

### 🥐 Bakery Products

| Endpoint                 | Method(s)          | Description                          |
| ------------------------ | ------------------ | ------------------------------------ |
| `/bakery/products/`      | GET / POST         | List all products / create a new one |
| `/bakery/products/<id>/` | GET / PUT / DELETE | Manage a product by ID               |

---

### 🛒 Cart

| Endpoint             | Method | Description                  |
| -------------------- | ------ | ---------------------------- |
| `/cart/`             | GET    | Retrieve the user’s cart     |
| `/cart/add/`         | POST   | Add product to cart          |
| `/cart/update/<id>/` | PUT    | Update quantity of cart item |
| `/cart/remove/<id>/` | DELETE | Remove item from cart        |

---

### 💳 Checkout

| Endpoint     | Method | Description                 |
| ------------ | ------ | --------------------------- |
| `/checkout/` | POST   | Process cart & create order |

---

## 🧪 API Test Report Summary

### ✅ Executive Summary

* **All functionalities passed tests** (Postman).
* CRUD, security, validation, and error handling are **working**.
* API is **stable, secure, and scalable**.

---

### 👤 User Authentication Tests

* **Happy Path:** Register, login, profile, logout → ✅
* **Unhappy Path:** Invalid login, duplicate register → correctly rejected with `400` / `401`.

---

### 🥐 Product Endpoints

* **CRUD:** ✅ working as expected.
* **Security:** Unauthorized product creation → `401 Unauthorized`.
* **Validation:** Missing fields → `400 Bad Request`.
* **Edge Cases:** Invalid product ID → `404 Not Found`.
* **Efficiency:** Supports pagination & filtering.

---

### 🛒 Cart Endpoints

* **Core Functions:** Add, update, delete, retrieve cart items → ✅
* **Security:** Prevented cross-user cart modifications (`403 Forbidden`).
* **Errors:** Invalid product ID → `400 Bad Request`.

---

### 💳 Checkout Endpoints

* **Success:** Valid checkout → `201 Created`, cart cleared.
* **Errors:**

  * Empty cart → `400 Bad Request`.
  * Unauthorized → `401 Unauthorized`.

---
