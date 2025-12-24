import express from 'express';
import { debug } from './auth/debug.js';
import { userRoute } from './Routes/users.js';
import { agentRoute } from './Routes/agents.js';

const port = 3000;
const app = express();

app.use(express.json());
app.use('/health', debug);
app.use('/users', userRoute);
app.use('/agents', agentRoute);

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log(`Server listening on PORT ${port}`);
});
