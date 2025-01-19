import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {auth} from '../middlewares/auth.middleware';
import UserService from '../modules/services/user.service';
import PasswordService from '../modules/services/password.service';
import TokenService from '../modules/services/token.service';

class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, auth, this.removeHashSession);

        this.router.patch(`${this.path}/change-password`, auth, this.changePassword);
        this.router.post(`${this.path}/reset/:userId`, this.resetPassword);
    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const { login, password } = request.body;

        try {
            // Pobierz użytkownika na podstawie loginu (email lub nazwa użytkownika)
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                return response.status(401).json({ error: 'Unauthorized: User not found' });
            }

            // Pobierz hasło użytkownika z kolekcji Password
            const userPassword = await this.passwordService.getPasswordByUserId(user._id);
            if (!userPassword) {
                return response.status(401).json({ error: 'Unauthorized: Password not found' });
            }

            // Sprawdź, czy hasło jest poprawne
            const isPasswordValid = await this.passwordService.comparePassword(password, userPassword.password);
            if (!isPasswordValid) {
                return response.status(401).json({ error: 'Unauthorized: Invalid password' });
            }

            // Tworzenie tokena w przypadku poprawnej autoryzacji
            const token = await this.tokenService.create(user);
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    };




    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        }

    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params

        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private changePassword = async (request: Request, response: Response, next: NextFunction) => {
        const {userId, oldPassword, newPassword} = request.body;

        try {
            const result = await this.passwordService.changePassword(
                userId,
                oldPassword,
                await this.passwordService.hashPassword(newPassword)
            );
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private resetPassword = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params;

        try {
            const result = await this.passwordService.deletePassword(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };
}

export default UserController;
