import {Express, Request, Response, NextFunction } from 'express';
import IAppRoute from '../configs/IAppRoute';
import AuthController from '../controllers/AuthContoller';
import UserController from '../controllers/UserController';
import App from '../app';

const UserRoute: IAppRoute = {

    createRoute(router) {
        const app = App.getInstance();

        const AuthCtrl = new AuthController(app);
        const UserCtrl = new UserController(app);

        return router()
            .use(AuthCtrl.checkLoginSession)
            .get('/', (req: Request, res: Response) => {
                UserCtrl.findAll((err: any, data: any) => {
                    res.send({users: data});
                });
            })
            .post('/add', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    UserCtrl.create(req.body, (newData: any) => {
                        res.send({userCreated: newData});
                    }, (msg, code) => {
                        res.send({message: msg, code: code});
                    });
                }
            })
            .post('/login', (req: Request, res: Response) => {
                if (!req.body) {
                    res.send({msg:"Empty body request", code: 400});
                } else {
                    AuthCtrl.login(req, res);
                }
            })
            .get(
                '/logout',
                AuthCtrl.logout
            );
    }
};

export default UserRoute;