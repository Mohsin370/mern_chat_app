<h1 align="center">Ping</h1>

<p >Ping is a modern and sleek chat application that utilizes real-time messaging powered by Socket.IO. It provides users with a seamless chatting experience in a visually appealing interface.</p>

<h1>Technologies Used</h1>

<ul>
  <li><strong>Frontend:</strong> React</li>
  <li><strong>Backend:</strong> Node.js, Express</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>Styling:</strong> Tailwind CSS</li>
  <li><strong>Real-time Communication:</strong> Socket.IO</li>
  <li><strong>Language:</strong> TypeScript</li>
</ul>

<h1>Screenshots</h1>
<p>HomePage</p>
<img src ="https://github.com/Mohsin370/mern_chat_app/assets/62910365/152059c2-42c6-4da5-8322-b941971fcb93">

<p>Signup</p>
<img src ="https://github.com/Mohsin370/mern_chat_app/assets/62910365/f7eabb9c-4c25-4b47-a4b1-f78944381be6">

<p>Login</p>
<img src ="https://github.com/Mohsin370/mern_chat_app/assets/62910365/2634de21-c462-4525-a6b3-a9a7d57958d3">

<p>Chat screen</p>
<img src ="https://github.com/Mohsin370/mern_chat_app/assets/62910365/ca18c24f-6fed-42b9-a7db-3a8a5de6c1c8">


<h1>Installation</h1>

<p>Make sure you have already installed necessary tools such as Node, TypeScript, Nodemon</p>

<p><strong>Frontend</strong></p>

<p>Run the following commands to run the frontend project</p>

```bash
$ cd frontend
$ npm install
$ cd frontend
$ npm run dev
```
<p>Make sure to add .env file at the root of the frontend directory with environment variables</p>

<p>The application should now be running on http://localhost:5173</p>
<p><strong>Backend</strong></p>
<p>Run the following commands to run the backend project</p>

```bash
$ cd backend
$ npm install
$ npx tsc && nodemon dist/index.js
```
<p>Make sure to add .env file at the root of the project with environment variables</p>
<p>The variables include: MONGO_URI (for your MongoDB connection) and JWT_SECRET (for JWT authentication)</p>

<h2>Demo</h2>
The demo application can be accessed on this URL: <a href="https://ping-rho-virid.vercel.app/" _blank>Ping Demo</a>
<p> <span bold>Note: The backend is deployed on render free tier, the server might be inactive at the time you access it. Give application a minute to receive first response from the server.</span> </p>
