# User API Documentation
 

# User

 

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
 

## Login user
 

#### end point
`/users/login`

#### method
`PORT`

#### request Body

- `email`(string)
- `password`(string)

#### response Body
- `user`(object):
    - `fullname`(object):
        - `firstName`(string): first name of the user `min length:3`
        - `lastName`(string):last name of the user
    - `email`(string): email of the user
    - `password`(string): password of the user `min length:6`

- `token`(string): JWT token
 

## access to profile
 

### end point
`/users/profile `

### method

`GET`

### request body
- `token`(string): which is in the cookies or in the header

### response body
- `user`(object):
    - `fullname`(object):
        - `firstName`(string): first name of the user `min length:3`
        - `lastName`(string):last name of the user
    - `email`(string): email of the user
    - `password`(string): password of the user `min length:6`

 

## Logout user
 

### end point
`/users/logout`

### method
`GET`

### request body
- `token`(string): which is in the cookies or in the header

### response body

-  `message`(string): succesfully loged out


 

# Captain
 

## Register captain
 

### end point
`/captains/register`

### method
`POST`

## request body

- `fullName`(object):
    - `firstName`(String):
    - `lastName`(String):
- `email`(String):
- `password`(String):
- `vehicle`(Object):
    - `color`(String):
    - `plate`(String):
    - `capacity`(Number):
    - `type`(Sting): `bike`,`car` or `auto`

### Exaple Response
- `user`(object):
    - `fullname`(object):
        - `firstName`(string): first name of the user `min length:3`
        - `lastName`(string):last name of the user
    - `email`(string): email of the user
    - `password`(string): password of the user `min length:6`
    - `vehicle`(Object):
        - `color`(String): color of the vehicle
        - `plate`(String): number plate
        - `capacity`(Number):
        - `type`(Sting): `bike` or `car` or `auto` 

- `token`(string): JWT token

## login Captain

### end point
`/captains/login`

### method

`POST`

### request body

-  `email`(String):email of captain
- `password`(String): password of captain

### response body

- `token`(String): jwt token
- `captain`(Object):
    - `fullName ` (Object): 
        - `firstName ` (String):
        - `lastName `(String):  
    - `vehicle ` (Object): 
        - `color `(String):
        - `plate `(String):  
        - `capacity `(Number): 
        - `type `(String): `bike` or `car` or `auto`
    - `_id `:  
    - `email `(String):  email of captain
    - `password `(String):  
    - `status `(String): `active` or `inactive`(default)
    - `__v `(Number): 