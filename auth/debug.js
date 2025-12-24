import express from 'express';

export const debug = express();


debug.get('/', (req, res) => {
  res.json({ ok: 'true' });
});
