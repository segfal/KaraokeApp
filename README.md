<div style="text-align: center;">

# Welcome To Serenade 🎤
## An app where you can sing with you friends at home 🏠

![singer](./sing.gif)
</div>

### To run locally, follow these steps:
```bash 
cd backend && npm install && cd ../frontend && npm install && cd ..
  ```


### After that you should open two terminals one for the backend and one for the frontend
```bash
cd backend && npx nodemon index.js
 ```

```bash
cd frontend && npm run dev
 ```



# Contributors
<table>
  <tr>
    <td align="center"><a href="https://github.com/segfal"><img src="https://avatars.githubusercontent.com/u/92688849?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/huda-ayaz"><img src="https://avatars.githubusercontent.com/u/107296362?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/vnoel02"><img src="https://avatars.githubusercontent.com/u/125239380?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/Unknown-Pplayer"><img src="https://avatars.githubusercontent.com/u/88214188?v=4" width="100px;" alt=""/><br /></td>
    </tr>
</table>



## Outline of the project

```bash

├── README.md├── README.md
├── backend
│   ├── api
│   │   ├── index.js
│   │   ├── room.js
│   │   ├── user.js
│   │   └── video.js
│   ├── auth
│   │   └── index.js
│   ├── db
│   │   ├── db.js
│   │   ├── index.js
│   │   └── models
│   │       ├── index.js
│   │       ├── room.js
│   │       ├── user.js
│   │       └── video.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── seed.js
├── frontend
│   ├── _redirects
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Context.tsx
│   │   ├── PeerContext.tsx
│   │   ├── assets
│   │   │   ├── logo-footer.png
│   │   │   ├── logo-name.png
│   │   │   ├── logo.png
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── JoinRoom.jsx
│   │   │   ├── Karaoke
│   │   │   │   ├── ChatBox
│   │   │   │   │   ├── ChatBox.css
│   │   │   │   │   └── ChatBox.jsx
│   │   │   │   ├── Participants
│   │   │   │   │   └── Participants.jsx
│   │   │   │   ├── Queue
│   │   │   │   │   ├── MusicCard.jsx
│   │   │   │   │   ├── Queue.css
│   │   │   │   │   └── Queue.jsx
│   │   │   │   ├── Room
│   │   │   │   │   └── Room.jsx
│   │   │   │   ├── Search
│   │   │   │   │   ├── Search.css
│   │   │   │   │   └── Search.jsx
│   │   │   │   ├── UserVideo
│   │   │   │   │   ├── SingleUserVideo.jsx
│   │   │   │   │   ├── User.jsx
│   │   │   │   │   ├── UserVideo.css
│   │   │   │   │   └── UserVideo.jsx
│   │   │   │   └── Video
│   │   │   │       ├── Video.css
│   │   │   │       └── Video.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ShareButton
│   │   │   │   ├── ShareButton.css
│   │   │   │   └── ShareButton.jsx
│   │   │   └── Signup.jsx
│   │   ├── images
│   │   │   └── share.png
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── redux
│   │       ├── Room
│   │       │   ├── Room.actions.js
│   │       │   ├── Room.reducer.js
│   │       │   └── Room.types.js
│   │       ├── User
│   │       │   ├── User.action.js
│   │       │   ├── User.reducer.js
│   │       │   └── User.types.js
│   │       ├── Video
│   │       │   ├── Video.action.js
│   │       │   ├── Video.reducer.js
│   │       │   └── Video.types.js
│   │       ├── root-reducer.js
│   │       └── store.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package-lock.json
├── package.json
└── run.sh
├── backend
│   ├── api
│   │   ├── index.js
│   │   ├── room.js
│   │   ├── user.js
│   │   └── video.js
│   ├── auth
│   │   └── index.js
│   ├── db
│   │   ├── db.js
│   │   ├── index.js
│   │   └── models
│   │       ├── index.js
│   │       ├── room.js
│   │       ├── user.js
│   │       └── video.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── seed.js
├── frontend
│   ├── _redirects
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Context.tsx
│   │   ├── PeerContext.tsx
│   │   ├── assets
│   │   │   ├── logo-footer.png
│   │   │   ├── logo-name.png
│   │   │   ├── logo.png
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── JoinRoom.jsx
│   │   │   ├── Karaoke
│   │   │   │   ├── ChatBox
│   │   │   │   │   ├── ChatBox.css
│   │   │   │   │   └── ChatBox.jsx
│   │   │   │   ├── Participants
│   │   │   │   │   └── Participants.jsx
│   │   │   │   ├── Queue
│   │   │   │   │   ├── MusicCard.jsx
│   │   │   │   │   ├── Queue.css
│   │   │   │   │   └── Queue.jsx
│   │   │   │   ├── Room
│   │   │   │   │   └── Room.jsx
│   │   │   │   ├── Search
│   │   │   │   │   ├── Search.css
│   │   │   │   │   └── Search.jsx
│   │   │   │   ├── UserVideo
│   │   │   │   │   ├── SingleUserVideo.jsx
│   │   │   │   │   ├── User.jsx
│   │   │   │   │   ├── UserVideo.css
│   │   │   │   │   └── UserVideo.jsx
│   │   │   │   └── Video
│   │   │   │       ├── Video.css
│   │   │   │       └── Video.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ShareButton
│   │   │   │   ├── ShareButton.css
│   │   │   │   └── ShareButton.jsx
│   │   │   └── Signup.jsx
│   │   ├── images
│   │   │   └── share.png
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── redux
│   │       ├── Room
│   │       │   ├── Room.actions.js
│   │       │   ├── Room.reducer.js
│   │       │   └── Room.types.js
│   │       ├── User
│   │       │   ├── User.action.js
│   │       │   ├── User.reducer.js
│   │       │   └── User.types.js
│   │       ├── Video
│   │       │   ├── Video.action.js
│   │       │   ├── Video.reducer.js
│   │       │   └── Video.types.js
│   │       ├── root-reducer.js
│   │       └── store.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package-lock.json
├── package.json
└── run.sh

```
