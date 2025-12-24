import { read } from '../utils/functions.js';
import { userPath, agentPath } from '../data/const.js';

export async function loggedUser(req, res, next) {
  try {
    const data = await read(userPath);
    for (let user of data) {
      if (
        user.username == req.headers.username &&
        user.password == req.headers.password
      ) {
        return next();
      }
    }
    return res.status(401).send('Unauthorized');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
}

export async function loggedAgent(req, res, next) {
  try {
    const data = await read(agentPath);
    for (let agent of data) {
      if (agent.name == req.headers.name && agent.id == req.headers.id) {
        return next();
      }
    }
    return res.status(401).send('Unauthorized');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
}
