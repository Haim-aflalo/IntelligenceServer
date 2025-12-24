import express from 'express';
import { read, write } from '../utils/functions.js';
import { agentPath, reportPath } from '../data/const.js';

export const reportRoute = express();

reportRoute.get('/', async (req, res) => {
  try {
    const data = await read(reportPath);
    res.send(data);
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

reportRoute.get('/:id', async (req, res) => {
  try {
    const data = await read(reportPath);
    const report = data.find((r) => r.id == req.params.id);
    report
      ? res.status(200).send(agent)
      : res.status(404).send('Report Not Found');
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

reportRoute.post('/', async (req, res) => {
  try {
    const reports = await read(reportPath);
    const agents = await read(agentPath);
    const agentIndex = agents.findIndex((a) => a.id == req.headers.id);
    if (agentIndex !== -1) {
      reports.push({ ...req.body, ...{ date: new Date().toISOString() } });
      agents[agentIndex].reportsCount += 1;
      await write(reportPath, reports);
      await write(agentPath, agents);
      res.status(200).send('Repport Added');
    } else {
      res.status(404).send('Agent Not Found , cant add repports');
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

reportRoute.put('/:id', async (req, res) => {
  try {
    const data = await read(reportPath);
    const reportIndex = data.findIndex((r) => r.id == req.params.id);
    if (reportIndex !== -1) {
      if (!req.body.agentId) {
        data[reportIndex] = { ...data[reportIndex], ...req.body };
        await write(reportPath, data);
        res.send('Report updated Successly');
      } else {
        res.status(401).send('Impossible to change agentId');
      }
    } else {
      res.status(404).send('Report Not Found');
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});

reportRoute.delete('/:id', async (req, res) => {
  try {
    const data = await read(reportPath);
    const agents = await read(agentPath);
    const reportIndex = data.findIndex((r) => r.id == req.params.id);
    const agentIndex = agents.findIndex(
      (a) => a.id == data[reportIndex].agentId
    );
    if (reportIndex !== -1) {
      data.splice(reportIndex, 1);
      agents[agentIndex].reportsCount -= 1;
      await write(reportPath, data);
      await write(agentPath, agents);
      res.status(200).send('Report deleted');
    } else {
      res.status(404).send('Report Not Found');
    }
  } catch (error) {
    console.error('An error occurred: ' + error.message);
  }
});
