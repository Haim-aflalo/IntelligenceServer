import express from 'express';
import { read, write } from '../utils/functions.js';
import { agentPath } from '../data/const.js';
export const agentRoute = express();

agentRoute.get('/', async (req, res) => {
  try {
    const data = await read(agentPath);
    res.status(200).send(data);
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

agentRoute.get('/:id', async (req, res) => {
  try {
    const data = await read(agentPath);
    for (let agent of data) {
      if (agent.id == req.params.id) {
        return res.status(200).send(agent);
      }
    }
    return res.status(404).send('Agent Not Found');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

agentRoute.post('/', async (req, res) => {
  try {
    const data = await read(agentPath);
    for (let agent of data) {
      if (agent.id === req.body.id) {
        return res.status(400).send('Agent Already Logged');
      }
    }
    data.push(req.body);
    await write(agentPath, data);
    return res.status(200).send('Agent added successly');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

agentRoute.put('/:id', async (req, res) => {
  try {
    const data = await read(agentPath);
    for (let i in data) {
      if (data[i].id == req.params.id) {
        data[i] = { ...data[i], ...req.body };
        await write(agentPath, data);
        return res.status(200).json({ message: 'Target updated successfully' });
      }
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

agentRoute.delete('/:id', async (req, res) => {
  try {
    const data = await read(agentPath);
    for (let i in data) {
      if (data[i].id == req.params.id) {
        data.splice(data[i], 1);
        await write(agentPath, data);
        return res.status(200).send('Agent deleted');
      } else {
        res.status(404).send('Agent Not Found');
      }
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});
