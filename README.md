<h1 align="center">Ping</h1>

<p align="center">Ping is a modern and sleek chat application that utilizes real-time messaging powered by Socket.IO. It provides users with a seamless chatting experience in a visually appealing interface.</p>

<h2 align="center">Technologies Used</h2>

<ul>
  <li><strong>Frontend:</strong> React</li>
  <li><strong>Backend:</strong> Node.js, Express</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>Styling:</strong> Tailwind CSS</li>
  <li><strong>Real-time Communication:</strong> Socket.IO</li>
  <li><strong>Language:</strong> TypeScript</li>
</ul>

<h1 align="center">Installation</h1>

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
