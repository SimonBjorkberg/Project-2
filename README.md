# [Monkee Hub](https://monkee-hub.cyclic.app/)

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

## Models

User model
```
username: String
email: String
password: String
role: String, types: admin, moderator, user
profilePicture: String
timestamps: true
```

Topic model
```
title: String
desc: String
threads: ObjectId
timestamps: true
```

Thread model
```
title: String
content: String
author: ObjectId<User>
posts: [ ObjectId<Post> ]
likes: [ ObjectId<User> ]
topicParent: ObjectId<Topic>
createdAt: Date
updatedAt: Date
```

Post model
```
author: ObjectId<User>
content: String
likes: [ ObjectId<User> ]
createdAt: Date
updatedAt: Date
threadParent: ObjectId<Thread>
```

Message model
```
sender: ObjectId<User>
recipient: ObjectId<User>
content: String
timestamp: Date
``` 

## Links

## Collaborators

[Simon]((https://github.com/SimonBjorkberg))

[Achref]((https://github.com/achref95))

### Project

[Repository Link]((https://github.com/SimonBjorkberg/Project-2))

[Deploy Link](https://monkee-hub.cyclic.app/)
