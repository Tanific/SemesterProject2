# SemesterProject2 - Auction House

![bilde](https://github.com/Tanific/SemesterProject2/assets/79892491/5b18e369-ff3d-475f-acc4-623eed08dd00)

Here is my submission for Noroff's front-end development course - Semester Project 2

## About the project
The brief of Semester Project 2 was to create the front-end for an auction house site. 
### Technology stack
This project is built with Bootstrap, SCSS and Javascript.

## Getting started
1. Clone the repo
2. Run `npm install` from inside the project folder to install the dependencies
3. Run `npm run build` to build the project with sass
4. Open with live server

## Functionality
#### Register
Register requires a username, a noroff email and a password of 8 characters or more.
User receives a descriptive error on failed request.
Successful requests will redirect to login page.

#### Login
Users who are registered may log in with their noroff email and password. 
Failed requests show an error alert.
Successful request redirect to home page and saves token and user info in local storage

#### Listings
Unregistered and registered users may search through listings, see the deadline and previous bids. 
Registered users may create a new listing. The form requirements are Title and Deadline. It is possible to add media gallery and descriptions.

#### Bids
Registered users can place bids. Successfully placing a bid will reload the page.
Bid validation checks for accesstoken and valid input (min/max amount + type).

#### Profile
Registered users may view their profile information and owned listings. They can update avatar media url.
