# User API Documentation

## Register User
Register a new user in the system.

### Endpoint 
`/users/register`

### HTTP request
`POST`

### Success Response
**Status Code:** `201 (Created) `

### Request Body
| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| fullName.firstName | String | User's first name | Min 3 characters |
| fullName.lastName | String | User's last name | Min 3 characters |
| email | String | User's email address | Valid email format |
| password | String | User's password | Min 6 characters |



### Notes
- The password will be hashed before storing in the database
- A JWT token is generated and returned upon successful registration
- The response will not include the password field
- Socket ID is optional and can be updated later 


### Exaple Response
- `user`(object):
    - `fullname`(object):
        - `firstName`(string): first name of the user `min length:3`
        - `lastName`(string):last name of the user
    - `email`(string): email of the user
    - `password`(string): password of the user `min length:6`

- `token`(string): JWT token
