import AppDataProvider from "./providers/AppDataProvider";
import AppRoutes from "./routes/AppRoutes"
import bodyParser = require("body-parser")
import session = require("express-session")
import IAppConfig from "./configs/IAppConfig"
import * as express from 'express'
import {Express, Request, Response, NextFunction} from 'express'

export default class App {
    private static app: App

    private expApp: Express

    private dataProviders: AppDataProvider;

    public static getInstance(): App {
        return App.app
    }

    constructor(private config: IAppConfig){
        this.config = config
        this.expApp = express()
        App.app = this
    }

    run(): void {
        this.expApp.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'kirbytwister',
            cookie: {maxAge: 3600000}
        }))

        this.expApp.use(bodyParser.urlencoded({extended: false}))

        this.expApp.use((req: Request, res: Response, next: NextFunction) => {
            res.contentType('application/json')
            next()
        })
        
        this
    }

    get providers(): AppDataProvider{
        return this.dataProviders
    }
}