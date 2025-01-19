import express, { Request, Response, NextFunction } from 'express';
import { config } from './config';
import Controller from './interfaces/controller.interface';
import mongoose from 'mongoose';
import cors from 'cors';


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
        // Włączenie CORS
        const corsOptions = {
            origin: 'http://localhost:4200', // Zezwól tylko na frontend Angular
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Dozwolone metody
            allowedHeaders: ['Content-Type', 'Authorization'], // Dozwolone nagłówki
        };
        this.app.use(cors(corsOptions)); // Middleware CORS

        // Middleware do parsowania JSON
        this.app.use(express.json());

        // Middleware logujące zapytania
        this.app.use((request: Request, response: Response, next: NextFunction): void => {
            console.log(`[${request.method}] ${request.url} - ${new Date().toISOString()}`);
            next();
        });
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
