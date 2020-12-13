# Whispers Chat

Whispers is an instant messaging application that uses React to facilitate authenticated user chat. This application connects with a server to manipulate user and chat resources.

---

## Links

[Deployed Client](https://mandeloreann.github.io/chat-room/)
[Back-End Repo](https://github.com/Mandeloreann/chat-room-express-2)
[Deployed Back-End](https://chatroommm.herokuapp.com/)

---

## Technologies Used

 - Socket.IO-Client
 - React
 - GitHub
 - JavaScript & SCSS

---

## The Future of Whispers:

During the next few sprints, the Development Team aims to:

 1. Fully enable Sockets to emit events to all users. At the moment, a socket is established when the Chat Index Module renders but otherwise not utilized.

 2. We would like to establish a third Chat Room resource to group chats by theme e.g. language or topic.

 3. Formatting:
   - Add username to individual chats
   - Justify Chats by User e.g. your messages justify-right, others justify-left
   - We would prefer if the Chat Update CRUD action did not require a page redirection
   - We would like to create editable user profiles and customizable colors

---

## Development Process

Our team constructed Wireframes and an Entity Relationship Diagram on the first day. We divided project task by Chat CRUD Action and checked in three or more times per workday. For 3/4ths of the work period, we mob programmed to push our Chat Resource CRUD actions to completion.

We were able to lay the groundwork for Sockets by establishing a connection, and incorporated most Chat Resource pathways through the Chat Index Component because we felt the Chat Index served as the central field Socket Emission events updated.

---

## User Stories

 - As a user, I want to create an account so I can have ownership over my messages.

 - As a user, I want to send messages so I can communicate with others on the application.

 - As a user, I want to be able to edit my messages so I can improve sent messages.

 - As a user, I want to delete messages so I can clear the feeds old messages.

 - As a user, I want to be able to type in a message box so I can then send messages.

 - As a user, I want to see an index of the messages upon log in so I can read messages of others easily.
 - As a user I want there to be clear contrast in the pages elements so I can see them clearly.

---

## Wireframes

[Whispers Chat Client Browser Wireframes](https://imgur.com/a/ZzOdBnO)
