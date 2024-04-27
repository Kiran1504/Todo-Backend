# To-Do app Task (Backend Repo)

**_Free instance will spin down with inactivity, which can delay requests by 50 seconds or more._**
Backend is deployed on render.com which has a warning of inactivity.\
Backend url: https://fire-ai-todo-backend.onrender.com/

## Key Features Implemented
1. JWT user Authentication.
2. CORS setup.
3. Impleted Register, Login, & Logout features.
4. 
## Instructions to Run the Project Locally:

1. Clone the repository.
2. Clone the frontend repo (https://github.com/Kiran1504/Todo-Frontend)
3. Remove `sameSite: 'none'` option in backend/src/controllers/userController.js (2 instances of it).
4. Change the https://fire-ai-todo-backend.onrender.com/ to http://localhost:5000/
5. Install all dependencies for both backend and frontend by running `npm install` or `npm i` in terminal.
6. Run the backend with script `npm run start`.
7. Run the frontend with the same script `npm run start`.

## Sample ENV file for backend

- `DB` = mongodb+srv://\<username>:\<password>@cluster0.iinq753.mongodb.net/\<dbname>

- `PORT` = 5000
- `CORS_ORIGIN` = http://localhost:3000
- `SECRET_KEY` = \<secret Key>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

### `npm run dev`

Runs the app using nodemon dependency.
The server will restart when you make changes.\
