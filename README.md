
# Spendwise 💸

A full stack personal expense tracker built with the MERN stack. Track your daily expenses, categorize spending, and monitor your total spend — all behind a secure JWT-authenticated account.

**Live Demo → [https://spendwise-three-sigma.vercel.app/signup](https://spendwise-three-sigma.vercel.app/signup)**

---

## Features

- Secure signup and login with JWT authentication
- Add expenses with title, amount, category, and date
- View all your expenses in a clean dashboard
- See total amount spent at a glance
- Delete expenses instantly
- User-specific data — each user only sees their own expenses
- Responsive design with dark mode support

---

## Tech Stack

**Frontend**
- React.js
- React Router DOM
- Axios
- CSS (custom minimal design)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcrypt

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Installation

**Clone the repo:**
```bash
git clone https://github.com/NikhilT97/spendwise.git
cd spendwise
```

**Backend setup:**
```bash
cd backend-expenseTracker
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_atlas_connection_string
SECRET_KEY=your_jwt_secret
EXPIRES_IN=1d
PORT=5000
```

Start the backend:
```bash
node server.js
```

**Frontend setup:**
```bash
cd frontend
npm install
npm run dev
```

Update `src/config.js` with your backend URL:
```javascript
const BASE_URL = "http://localhost:5000";
export default BASE_URL;
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/signup | Register new user |
| POST | /auth/login | Login and get JWT token |
| GET | /auth/profile | Get logged in user profile |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /expenses | Add new expense |
| GET | /expenses | Get all user expenses |
| DELETE | /expenses/:id | Delete an expense |

---

## Screenshots

> <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3d87581b-571a-4a86-ab19-3c1b94a9c9da" />

<img width="1537" height="950" alt="image" src="https://github.com/user-attachments/assets/80224a90-3dd5-40a1-b7fa-05d7da84998b" />

---

## Author

**Nikhil Tayde**
- GitHub: [@NikhilT97](https://github.com/NikhilT97)
- LinkedIn:  https://www.linkedin.com/in/nikhiltayde97/

---

 
