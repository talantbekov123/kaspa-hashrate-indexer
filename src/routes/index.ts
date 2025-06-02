import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Hashrate } from '../entity/Hashrate';
import { HASHRATE_MULTIPLIER } from '../constants';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Kaspa Hashrate Indexer API' });
});

/* GET hashrate data */
router.get('/hashrate', async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(Hashrate).query(`
      WITH ranked AS (
        SELECT 
          timestamp,
          to_timestamp(timestamp)::date AS day,
          hashrate,
          ROW_NUMBER() OVER (PARTITION BY to_timestamp(timestamp)::date ORDER BY hashrate) AS rn,
          COUNT(*) OVER (PARTITION BY to_timestamp(timestamp)::date) AS cnt
        FROM hashrate
      ),
      daily_stats AS (
        SELECT 
          day,
          MIN(timestamp) as first_timestamp,
          PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY hashrate) AS median_hashrate
        FROM ranked
        GROUP BY day
      )
      SELECT 
        first_timestamp as timestamp,
        median_hashrate
      FROM daily_stats
      ORDER BY first_timestamp;
    `);

    for (const element of result) {
      if (element.median_hashrate < 100000000) {
        element.median_hashrate = element.median_hashrate * HASHRATE_MULTIPLIER;
      }
    }

    res.json({
      data: result,
    });
  } catch (error) {
    console.error('Error fetching hashrate data:', error);
    res.status(500).json({ error: 'Failed to process hashrate request' });
  }
});

export default router;
