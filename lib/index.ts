import App from './app';
import IndexController from './controllers/index.controller';
import PostController from './controllers/post.controller';
import UserController from './controllers/user.controller';


const app = new App([
    new UserController(),
    new PostController(),
    new IndexController()
]);

app.listen();
