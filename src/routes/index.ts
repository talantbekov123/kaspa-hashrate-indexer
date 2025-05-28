import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Hashrate } from '../entity/Hashrate';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Kaspa Hashrate Indexer API' });
});

/* GET hashrate data */
router.get('/hashrate', async (req: Request, res: Response) => {
  try {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    const start = parseInt(req.query.startTimestamp as string) || oneDayAgo;
    const end = parseInt(req.query.endTimestamp as string) || now;

    if (isNaN(start) || isNaN(end) || start > end) {
      return res.status(400).json({
        error: 'Invalid timestamp range',
        message: 'Please provide valid timestamps where start is before end'
      });
    }

    const repository = AppDataSource.getRepository(Hashrate);
    const hashrateData = await repository
      .createQueryBuilder('hashrate')
      .where('hashrate.timestamp >= :start', { start: new Date(start) })
      .andWhere('hashrate.timestamp <= :end', { end: new Date(end) })
      .orderBy('hashrate.timestamp', 'ASC')
      .getMany();

    const formattedData = hashrateData.map(entry => ({
      timestamp: entry.timestamp.getTime(),
      hashrate: Number(entry.hashrate)
    }));

    res.json({
      startTimestamp: start,
      endTimestamp: end,
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching hashrate data:', error);
    res.status(500).json({ error: 'Failed to process hashrate request' });
  }
});

export default router; 