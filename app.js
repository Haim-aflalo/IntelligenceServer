import express from 'express';
import { debug } from './auth/debug.js';
import { userRoute } from './Routes/users.js';
import { agentRoute } from './Routes/agents.js';
import { reportRoute } from './Routes/reports.js';
import { userPath } from './data/const.js';
import { read } from './utils/functions.js';

const port = 3000;
const app = express();

app.use(express.json());
app.use(async (req, res, next) => {
  const userName = req.header('X-User-Name');
  const password = req.header('X-Password');
  try {
    const users = await read(userPath);
    const user = users.find(u => u.userName === userName && u.password === password);
    user ? next() : res.status(401).send('Unauthorized');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});
app.use('/health', debug);
app.use('/users', userRoute);
app.use('/agents', agentRoute);
app.use('/reports', reportRoute);

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server listening on PORT ${port}`);
});
