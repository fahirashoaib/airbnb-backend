# Airbnb Backend

This project implements the backend for a simplified Airbnb application. It features a single-level admin panel for managing listings and bookings, and supports RESTful APIs for managing listings, bookings, and user interactions.

## **Project Overview**

This project provides:

- **Admin Panel**: A single-level admin panel for creating and managing property listings and bookings.
- **Listings API**: Endpoints for adding, viewing, updating, and deleting property listings.
- **Bookings API**: Endpoints for managing property bookings.
- **Bonus Features**:
  - Support for storing multiple image URLs for listings.
  - Enhanced validation and error handling.

## **Features**

- **Admin Panel**:
  - Only accessible by the admin user. (For now)
  - Allows creating, updating, and deleting listings.
  - Manage bookings from a single interface.
- **Listings**:
  - Create new property listings with details like title, location, price, availability, and image URLs.
  - View all listings or fetch details for a specific listing.
  - Update or delete listings.
- **Bookings**:
  - Book properties by providing relevant details (user ID, property ID, dates, etc.).
  - Fetch all bookings for administrative purposes.

---

## **Setup Instructions**

### **Prerequisites**

- **Node.js**
- **MongoDB**
- **Express**
- **Mongoose**
- **jsonwebtoken**
- **Bycript**
- **Postman** (optional, for API testing)

### **Installation Steps**

1. **Go to the Repository**:
   ```bash
   cd airbnb-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up MongoDB**:
   - Install and start MongoDB.
   - Create a database named `Airbnb_Listings`.

4. **Create a `.env` File**:
   Add the following environment variables to a `.env` file in the project root:
   ```env
   PORT=5000 (optional or write on server.js)
   MONGO_URI=mongodb://localhost:27017/Airbnb_Listings
    ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

5. **Start the Backend**:
   ```bash
   node server.js
   ```

   The server will be running at `http://localhost:5000`.

---

## **API Documentation**

### **Base URL**

```
http://localhost:5000/api
```

### **Listings Endpoints**

#### **1. Create a Listing**
- **Method**: POST
- **Endpoint**: `/listings`
- **Headers**: 
  - Authorization: `Basic <base64-encoded-admin-credentials>`
- **Body (JSON)**:
  ```json
  {
      "title": "Cozy Apartment",
      "location": "Downtown",
      "pricePerNight": 120,
      "availability": "1-12 Dec",
      "imageUrls": [
          "https://example.com",
          "https://example.com"
      ]
  }
  ```
- **Response**:
  ```json
  {
      "message": "Listing created successfully",
      "listing": { ... }
  }
  ```

#### **2. Get All Listings**
- **Method**: GET
- **Endpoint**: `/listings`
- **Response**:
  ```json
  [
      {
          "_id": "...","
          "title": "Cozy Apartment",
          "location": "Downtown",
          ...
      }
  ]
  ```

#### **3. Update a Listing**
- **Method**: PUT
- **Endpoint**: `/listings/:id`
- **Headers**: 
  - Authorization: `Basic <base64-encoded-admin-credentials>`
- **Body (JSON)**:
  ```json
  {
      "title": "Updated Title",
      "pricePerNight": 150
  }
  ```
- **Response**:
  ```json
  {
      "message": "Listing updated successfully",
      "listing": { ... }
  }
  ```

#### **4. Delete a Listing**
- **Method**: DELETE
- **Endpoint**: `/listings/:id`
- **Headers**: 
  - Authorization: `Basic <base64-encoded-admin-credentials>`
- **Response**:
  ```json
  {
      "message": "Listing deleted successfully"
  }
  ```

### **Bookings Endpoints**

#### **1. Create a Booking**
- **Method**: POST
- **Endpoint**: `/bookings`
- **Body (JSON)**:
  ```json
  {
      "userId": "user123",
      "propertyId": "property456",
      "checkIn": "2024-12-20",
      "checkOut": "2024-12-25"
  }
  ```
- **Response**:
  ```json
  {
      "message": "Booking created successfully",
      "booking": { ... }
  }
  ```

---

## **Admin Panel Access**

1. The admin panel is authenticated using basic authentication.
2. Use the username and password defined in the `.env` file (`ADMIN_USERNAME` and `ADMIN_PASSWORD`).
3. For testing in Postman, add the `Authorization` header:
   - Select **Basic Auth** in Postman.
   - Enter the admin credentials.

---

## **Testing the API with Postman**

1. **Install Postman**: Download and install from [here](https://www.postman.com/downloads/).
2. **Create Requests**:
   - Use the API documentation above to create requests.
   - Add authorization, headers, and body as required.
3. **Run Tests**:
   - Send requests to the running server (`http://localhost:5000/api`).
   - Verify responses and status codes.

---

## **Bonus Features**

- **Image URL Array**:
  - Each listing can store multiple image URLs, allowing better property representation.
- **Error Handling**:
  - Detailed error messages for invalid requests or missing fields.

---

