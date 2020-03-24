import UserDataProvider from "../providers/UserDataProvider";
import app from "../app"
import {Request, Response, NextFunction} from 'express'
import SecurityService from "../services/SecurityService";

export default class AuthController{
    private userDataProvider: UserDataProvider

    constructor(private app: app){
        this.userDataProvider = this.app.providers.user;
    }

    login(req: Request, res: Response){
        const email = req.body.email;
        const password = req.body.password;

        this.userDataProvider.findOne({email: email}, (err, user) => {
            if(err){
                res.sendStatus(500)
            } else {
                if(!user || !SecurityService.validatePass(password, user.password)){
                res.send({msg: 'Incorrect password', code: 400})
            } else {
                user.lastVisit = Date.now().toString()
                this.userDataProvider.update({id: user._id}, user, ()=>{
                    console.log('User updated')
                })
            }
                req.session.userId = user._id
                res.send({msg: "Welcome back!"})
            }
        })
    }

    logout(req: Request, res: Response){
        const session = req.session;
        if(!session){
            res.sendStatus(400)
        } else{
            session.destroy(()=>{
                res.send({msg: "Logout completed"})
            })
        }
    }

    checkLoginSession(req: Request, res: Response, next: NextFunction){
        const session = req.session;
        if(~['/logout', '/add'].indexOf(req.path)){
            if(!session.userId){
                next();
            } else {
                res.sendStatus(406)
            }
        } else {
            if(session.userId){
                next()
            }else {
                res.sendStatus(401)
                }
            }
        }
}
