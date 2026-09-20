# Authentication Backend API

Backend authentication system built with Node.js, Express.js, MongoDB, JWT, bcrypt, cookies, Multer and Cloudinary.

## Features

* User Signup
* User Login
* User Logout
* Password Hashing with bcrypt
* JWT Authentication
* HTTP-only Cookies
* MongoDB with Mongoose
* Profile Image Upload
* Image Upload using Multer
* Image Storage using Cloudinary
* Cloudinary Image URL stored in MongoDB

## Image Upload Flow

```text
Client / Postman
       ↓
   Multer
       ↓
 Temporary Local File
       ↓
   Cloudinary
       ↓
 Cloudinary URL
       ↓
    MongoDB
```

Multer receives the uploaded profile image, Cloudinary stores the actual image, and the generated Cloudinary URL is saved in the user's MongoDB document.

## API Endpoints

### Signup

POST `/api/signup`

Supports profile image upload using:

```text
profileimage
```

The request should be sent using `multipart/form-data`.

### Login

POST `/api/login`

### Logout

POST `/api/logout`

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* cookie-parser
* Multer
* Cloudinary
* dotenv

## Environment Variables

Create a `.env` file in the project root:

```env
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Do not push the `.env` file to GitHub.

Add it to `.gitignore`:

```text
.env
node_modules/
```
