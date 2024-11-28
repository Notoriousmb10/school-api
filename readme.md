
1. Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/Notoriousmb10/school-api.git
cd school-management-api
2. Install Dependencies
Install the required Node.js dependencies:

bash
Copy code
npm install
3. Set Up the Database
Create a MySQL database named school_management. Run the following SQL query to create the necessary table:

sql
Copy code
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
4. Configure Environment Variables
Create a .env file at the root of the project and configure the database credentials.

5. Start the Application
To start the server:

bash
Copy code
npm start
The API should now be accessible at http://localhost:3000.

6. Deploying to Render (or other services)
Create a Render account and log in.
Create a new Node.js Web Service on Render.
Link your GitHub repository to Render and configure it to deploy automatically.
Set up environment variables in the Render dashboard under "Environment" > "Add Environment Variable" to configure the database connection.
Once deployed, your API will be available at the provided Render URL.
Postman Collection
The Postman collection includes the two main API endpoints (/addSchool and /listSchools) for testing and interacting with the API. You can import the Postman collection using the following link:

Download Postman Collection
Database Schema
Table: schools
Field	Type	Description
id	INT	Primary Key, auto-increment
name	VARCHAR(255)	Name of the school
address	VARCHAR(255)	Address of the school
latitude	FLOAT	Latitude coordinate of the school
longitude	FLOAT	Longitude coordinate of the school
Usage Examples
Example 1: Adding a School
Request:
http
Copy code
POST /addSchool
Content-Type: application/json

{
  "name": "ABC School",
  "address": "123 School St, City",
  "latitude": 12.3456,
  "longitude": 78.9012
}
Response:
json
Copy code
{
  "message": "School added successfully",
  "schoolId": 1
}
Example 2: Listing Schools by Proximity
Request:
http
Copy code
GET /listSchools?lat=12.3456&lon=78.9012
Response:
json
Copy code
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 School St, City",
    "distance": 1.2
  },
  {
    "id": 2,
    "name": "XYZ School",
    "address": "456 School Ave, City",
    "distance": 3.5
  }
]







Endpoints


1. Add School
Endpoint: /addSchool
Method: POST
Description: Adds a new school to the database.
Request Body:
json
Copy code
{
  "name": "ABC School",
  "address": "123 School St, City",
  "latitude": 12.3456,
  "longitude": 78.9012
}
Response:
Success:
json
Copy code
{
  "message": "School added successfully",
  "schoolId": 1
}
Error (Validation Failure):
json
Copy code
{
  "message": "Validation error",
  "details": "Missing required field 'name'"
}
Validation:
name: Non-empty string (required)
address: Non-empty string (required)
latitude: Valid float number (required)
longitude: Valid float number (required)
2. List Schools
Endpoint: /listSchools
Method: GET
Description: Retrieves a list of all schools sorted by proximity to the user’s location.
Query Parameters:
lat: User’s latitude (required)
lon: User’s longitude (required)
Request Example:
http
Copy code
GET /listSchools?lat=12.3456&lon=78.9012
Response:
Success:
json
Copy code
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 School St, City",
    "distance": 1.2
  },
  {
    "id": 2,
    "name": "XYZ School",
    "address": "456 School Ave, City",
    "distance": 3.5
  }
]
Error (Missing Parameters):
json
Copy code
{
  "message": "Missing required parameters",
  "details": "Both 'lat' and 'lon' must be provided"
}
Error Handling
All errors are returned with an HTTP status code that represents the error type. The response will include a message and, when applicable, additional details.

400 Bad Request: Missing or invalid request parameters (e.g., missing required fields).
500 Internal Server Error: Unexpected server error.
404 Not Found: The resource you are looking for doesn't exist.
Example Error Response:
json
Copy code
{
  "error": "400 Bad Request",
  "message": "Invalid latitude or longitude value"
}



3. Environment Variables
The following environment variables are required for the application:

DB_HOST: The database host (e.g., localhost for local development).
DB_USER: The MySQL username.
DB_PASSWORD: The MySQL password.
DB_NAME: The name of the database used for the application.
Example .env file:

bash
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysecretpassword
DB_NAME=school_management
Setup and Deployment

