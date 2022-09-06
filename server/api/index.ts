import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import upload from './upload';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/upload', upload);

export default router;
