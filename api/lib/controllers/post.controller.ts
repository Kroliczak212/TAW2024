import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { IData } from '../modules/models/data.model';

class PostController implements Controller {
    public path = '/api/post'; // Bazowa ścieżka dla endpointów
    public router = Router();
    private dataService = new DataService(); // Usługa do komunikacji z bazą danych

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.addPost); // Dodanie nowego wpisu
        this.router.get(`${this.path}/:id`, this.getById); // Pobranie wpisu po ID
        this.router.delete(`${this.path}/:id`, this.deleteById); // Usunięcie wpisu po ID
        this.router.get(`${this.path}s`, this.getAllPosts); // Pobranie wszystkich wpisów
        this.router.delete(`${this.path}s`, this.deleteAllPosts); // Usunięcie wszystkich wpisów
    }

    // Dodanie nowego wpisu
    private addPost = async (request: Request, response: Response, next: NextFunction) => {
        const { title, text, image } = request.body;
        const newPost: IData = { title, text, image }; // Walidacja danych zgodnie z interfejsem IData

        try {
            await this.dataService.createPost(newPost);
            response.status(201).json({ message: 'Wpis został pomyślnie utworzony', newPost });
        } catch (error) {
            console.error('Błąd podczas tworzenia wpisu:', error.message);
            response.status(500).json({ error: 'Wystąpił błąd podczas tworzenia wpisu' });
        }
    };

    // Pobranie wpisu po ID
    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        try {
            const post = await this.dataService.getById(id);
            response.status(200).json(post);
        } catch (error) {
            console.error(`Błąd podczas pobierania wpisu o ID ${id}:`, error.message);
            response.status(404).json({ error: `Nie znaleziono wpisu o ID: ${id}` });
        }
    };

    // Usunięcie wpisu po ID
    private deleteById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        try {
            await this.dataService.deleteById(id);
            response.status(200).json({ message: `Wpis o ID ${id} został pomyślnie usunięty` });
        } catch (error) {
            console.error(`Błąd podczas usuwania wpisu o ID ${id}:`, error.message);
            response.status(404).json({ error: `Nie znaleziono wpisu o ID: ${id}` });
        }
    };

    // Pobranie wszystkich wpisów
    private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const posts = await this.dataService.getAll();
            response.status(200).json(posts); // Zwracamy listę postów
        } catch (error) {
            console.error("Error fetching all posts:", error.message);
            response.status(500).json({ error: "Error fetching all posts" });
        }
    };

    // Usunięcie wszystkich wpisów
    private deleteAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await this.dataService.deleteAllPosts();
            response.status(204).send(); // Brak zawartości
        } catch (error) {
            console.error('Błąd podczas usuwania wszystkich wpisów:', error.message);
            response.status(500).json({ error: 'Wystąpił błąd podczas usuwania wpisów' });
        }
    };
}

export default PostController;
