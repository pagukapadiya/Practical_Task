📌 Getting Started

1. Install Dependencies

npm install

---

2. Create `.env` file in root:

APP_NAME="Practical Application"

APP_PORT=5000

HOST_URL_PREFIX=/api

APP_URL="http://localhost:3000/email-verify"

NODE_ENV="development"

JWT_ACCESS_TOKEN_SECRET="your_jwt_secret"

JWT_ACCESS_TOKEN_EXPIRY=360d

APP_DOMAIN=practice

DB_MYSQL_HOST=localhost

DB_PORT=3306

DB_MYSQL_USERNAME=root

DB_MYSQL_PASSWORD=root

DB_MYSQL_DATABASE=practical_app

TIME_ZONE="+05:30"

EMAIL_FROM="your-email@gmail.com"

EMAILUSER="your-email@gmail.com"

EMAILPASSWORD="your-app-password"

EMAILSERVICE="gmail"

EMAIL_FROM_NAME="Practice Application"

> ⚠️ Replace credentials before sharing

---

3. Start Server

npm run dev

Runs on: http://localhost:5000/api
