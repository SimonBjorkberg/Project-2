# Project Name

## [See the App!](https://monkee-hub.cyclic.app/)

## Description

The website we have developed is designed as a versatile forum that can be customized to cater to diverse communities.
 
## User Stories

- **404** - An error page is displayed when a user tries to access a page that is not available. It serves as a redirection mechanism to inform the user that the requested page cannot be found.
- **unauthorized** - The unauthorized route handles access restrictions and displays an error page when a user attempts to access a page without proper authentication or authorization. It serves as a mechanism to inform the user that they do not have the required permissions to access the requested content.
- **homepage** - The homepage is the central landing page of the website, serving as the initial entry point for users.
- **sign up** - The sign-up route enables new users to create an account on the web app. It provides a registration form where users can enter their information, such as username, email, and password, to create a account.
- **login** - The login route allows registered users to authenticate themselves and gain access to their account. It presents a login form where users can enter their credentials, username and password, to verify their identity and log in to the web app.
- **logout** - The logout route handles the process of ending a user's authenticated session. It invalidates the user's session token or cookies, effectively logging them out of the web app. It ensures that the user's session is terminated.
- **topics** - The topics route displays a list of threads available within the web app. It serves as a hub for users to explore and navigate different areas of interest or discussions within the the topics. 
- **threads** - The threads route presents a collection of posts within a particular thread. It provides a platform for users to engage in discussions by posting messages. Users can browse through threads to read and contribute to the ongoing conversations relevant to a specific thread.

## Backlog Functionalities

- ### Email Confirmation on Account Creation
Description: Implement an email confirmation feature that sends a verification email to newly registered users, allowing them to confirm their email address and activate their account.
- ### Friends List on Profile Page
Description: Enhance the profile page to include a section where users can view and manage their list of friends or connections within the web app.
- ### Improved Admin Page
Description: Revamp the admin page with a more intuitive and user-friendly interface, providing administrators with enhanced functionality and control over the web app's settings, user management, and content moderation.
- ### Improved Chat Page
Description: Upgrade the chat page to offer improved real-time messaging capabilities, including features such as message notifications, typing indicators, message search, and the ability to share multimedia content.

## Technologies used

- TailwindCSS
- Node.js
- Cookies
- Handlebars
- Express
- CSS
- JavaScript
- Cloudinary
- LoginLimiter
- MongoDB
- BcryptJS

## (Optional) Routes

**NOTE -** List here all the routes of your server. Example:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description


## Models

**NOTE -** List here all the models & Schemas of your Database Structure. Example: 

User model
 
```
username: String
password: String
```

Event model

```
owner: ObjectId<User>
name: String
description: String
date: Date
``` 

## Links

## Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)
