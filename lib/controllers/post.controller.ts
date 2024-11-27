import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6]; // Tablica testowa

class PostController implements Controller {
    public path = '/api/post'; // Ścieżka bazowa dla endpointów
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getById); // Pobranie wpisu po ID
        this.router.post(this.path, this.addPost); // Dodanie nowego wpisu
        this.router.delete(`${this.path}/:id`, this.deleteById); // Usunięcie wpisu po ID
        this.router.get(`${this.path}/:num`, this.getNPosts); // Pobranie N elementów
        this.router.get(`${this.path}s`, this.getAllPosts); // Pobranie wszystkich elementów
        this.router.delete(`${this.path}s`, this.deleteAllPosts); // Usunięcie wszystkich elementów
    }

    // Pobranie wpisu po ID
    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const post = testArr[parseInt(id, 10)];
        if (post !== undefined) {
            response.status(200).json(post);
        } else {
            response.status(404).json({ message: 'Post not found' });
        }
    };
    // Dodanie nowego wpisu
    private addPost = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;
        if (elem === undefined) {
            response.status(400).json({ message: 'Missing element in the request body' });
            return;
        }

        testArr.push(elem);
        response.status(201).json(testArr);
    };
    // Usunięcie wpisu po ID
    private deleteById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const index = parseInt(id, 10);
        if (index >= 0 && index < testArr.length) {
            const deletedPost = testArr.splice(index, 1);
            response.status(200).json({ deletedPost, testArr });
        } else {
            response.status(404).json({ message: 'Post not found' });
        }
    };
    // Pobranie N elementów
    private getNPosts = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;
        const count = parseInt(num, 10);
        if (!isNaN(count) && count > 0) {
            response.status(200).json(testArr.slice(0, count));
        } else {
            response.status(400).json({ message: 'Invalid number' });
        }
    };
    // Pobranie wszystkich elementów
    private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    };
    // Usunięcie wszystkich elementów
    private deleteAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        testArr.length = 0; 
        response.status(204).send(); 
    };
}

export default PostController;
