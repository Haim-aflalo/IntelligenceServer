import express from 'express';
import { read, write } from '../utils/functions.js';
import { loggedUser } from '../utils/middleware.js';
import { userPath } from '../data/const.js';

export const userRoute = express();
userRoute.use(express.json());

userRoute.get('/', loggedUser, async (req, res) => {
  try {
    const data = await read(userPath);
    res.send(data);
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

userRoute.post('/', loggedUser, async (req, res) => {
  try {
    const data = await read(userPath);
    data.push(req.body);
    await write(userPath, data);
    return res.status(200).send('User logged');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

userRoute.put('/:username', loggedUser, async (req, res) => {
  try {
    const data = await read(userPath);
    for (let i in data) {
      if (data[i].username == req.params.username) {
        data[i] = { ...data[i], ...req.body };
        await write(userPath, data);
        return res.status(200).json({ message: 'Target updated successfully' });
      }
    }
    return res.status(404).send('User Not Found');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

userRoute.delete('/:username', loggedUser, async (req, res) => {
  try {
    const data = await read(userPath);

    const targetIndex = data.findIndex(
      (u) => u.username == req.params.username
    );
    if (targetIndex !== -1) {
      data.splice(targetIndex, 1);
      await write(userPath, data);
      return res.status(200).send('User deleted');
    } else {
      res.status(404).send('User Not Found');
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});
