import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import maps from './maps'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Maps delivery',
  });
});

router.use('/maps', maps);

export default router;
