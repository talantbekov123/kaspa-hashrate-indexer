import 'dotenv/config';
import axios from 'axios';
import { AppDataSource } from '../data-source';
import { Hashrate } from '../entity/Hashrate';

async function seedDatabase(): Promise<void> {
    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log("Database connection initialized for seeding");

        const endpoints = [
            'https://hr.2miners.com/api/v1/hashrate/10m/kas',
            'https://hr.2miners.com/api/v1/hashrate/1h/kas',
            'https://hr.2miners.com/api/v1/hashrate/1d/kas'
        ];

        const repository = AppDataSource.getRepository(Hashrate);

        // Process each endpoint
        for (const endpoint of endpoints) {
            console.log(`Fetching data from ${endpoint}`);
            const response = await axios.get(endpoint);
            const hashrateData = response.data;

            // Save new data only if timestamp doesn't exist
            for (const data of hashrateData) {
                const timestamp = new Date(data.timestamp);
                const existingRecord = await repository.findOne({ 
                    where: { 
                        timestamp: timestamp.getTime() 
                    } 
                });
                
                if (!existingRecord) {
                    const hashrateEntity = new Hashrate();
                    hashrateEntity.hashrate = data.hashrate;
                    hashrateEntity.difficulty = data.difficulty;
                    hashrateEntity.timestamp = timestamp.getTime();
                    await repository.save(hashrateEntity);
                    console.log(`Added new hashrate data for timestamp: ${timestamp}`);
                }
            }
        }

        console.log("Database seeding completed successfully");
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        // Close database connection
        await AppDataSource.destroy();
        console.log("Database connection closed");
    }
}

// Run the seeder
seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Error running seeder:', error);
        process.exit(1);
    }); 