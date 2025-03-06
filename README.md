# User Authentication Assignment

This backend assignment focuses on implementing a User Authentication System using Node.js, Express, and MongoDB. It provides three primary functionalities:

1) User Signup: Allows users to register by securely storing their credentials.
2) User Login: Authenticates users and issues a JWT token upon successful login.
3) Password Reset: Enables users to reset their password securely.



# Key Implementation:

1) MongoDB Schema & Model: Used Mongoose to define structured schemas and interact with the database efficiently.
2) Data Validation: Implemented input validation to prevent invalid or harmful data entries.
3) Password Security: Ensured strong password validation and bcrypt hashing before storing passwords.
4) Email Validation: Used Validator.js to enforce correct email formats.
5) JWT Authentication: Employed JWT tokens for authentication, stored in HTTP-only cookies to mitigate XSS and CSRF attacks.
6) MVC Architecture: Followed a modular structure (Model-View-Controller) for better maintainability and reusability.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


```
PORT = 8000

MONGO_URL = "mongodb://localhost:27017/userAuthDB"

SECRET_KEY = 'Your_JWT_Secret_Key'
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Iliyas-shah/UserAuthAssign.git
```

Go to the project directory

```bash
  cd .\UserAuthAssign
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```



## API Reference

#### Register User

```http
  POST /api/user/signup?name=<user_name>&email=<user_email>&password=<user_password>
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `email` | `string` | **Required**.|
| `password` | `string` | **Required**.|

#### User Login

```http
  GET /api/user/login?email=<user_email>&password=<user_password>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|

#### Reset Password for Authenticated User

```http
  PATCH /api/user/resetpass?password=<new_password>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `password`      | `string` | **Required**.|

### Note:
Replace <user_name>, <user_email>, <user_password>, <new_password> with the actual values.