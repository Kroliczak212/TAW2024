import express, { Request, Response, NextFunction } from 'express';
import { config } from './config';
import Controller from './interfaces/controller.interface';
import mongoose from 'mongoose';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initializeMiddlewares(); // Najpierw inicjalizacja middleware
        this.initializeControllers(controllers); // Potem kontrolery
        this.connectToDatabase();
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
        });
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json()); // Parser JSON

        // Middleware logujący zapytania
        this.app.use((request: Request, response: Response, next: NextFunction): void => {
            console.log(`[${request.method}] ${request.url} - ${new Date().toISOString()}`);
            next();
        });

        // Zakomentowanie morgan, ponieważ używamy własnego logowania
        // this.app.use(morgan('dev'));
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(config.databaseUrl);
            console.log('Connection with database established');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
    }
}

export default App;
