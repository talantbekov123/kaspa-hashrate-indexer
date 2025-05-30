import axios from 'axios';
import { AppDataSource } from '../data-source';
import { Hashrate } from '../entity/Hashrate';
import cron from 'node-cron';

export class HashrateService {
    private static instance: HashrateService;
    private repository = AppDataSource.getRepository(Hashrate);

    private constructor() {
        // Initialize database connection
        AppDataSource.initialize()
            .then(() => {
                console.log("Database connection initialized");
                this.startCronJob();
            })
            .catch((error) => console.log("Error initializing database:", error));
    }

    // Singleton design pattern to ensure only one instance of the service is created
    public static getInstance(): HashrateService {
        if (!HashrateService.instance) {
            HashrateService.instance = new HashrateService();
        }
        return HashrateService.instance;
    }

    private async fetchHashrate(): Promise<number> {
        try {
            const response = await axios.get('https://api.kaspa.org/info/hashrate');
            return response.data.hashrate;
        } catch (error) {
            console.error('Error fetching hashrate:', error);
            throw error;
        }
    }

    private async saveHashrate(hashrate: number): Promise<void> {
        try {
            const hashrateEntity = new Hashrate();
            hashrateEntity.hashrate = hashrate;
            hashrateEntity.timestamp = Math.floor(Date.now() / 1000);
            await this.repository.save(hashrateEntity);
            console.log(`Hashrate saved: ${hashrate}`);
        } catch (error) {
            console.error('Error saving hashrate:', error);
            throw error;
        }
    }

    private startCronJob(): void {
        // Run every hour
        cron.schedule('0 * * * *', async () => {
            try {
                const hashrate = await this.fetchHashrate();
                await this.saveHashrate(hashrate);
            } catch (error) {
                console.error('Error in cron job:', error);
            }
        });
    }
} 