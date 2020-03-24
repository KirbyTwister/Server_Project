import UserDataProvider from "../providers/UserDataProvider";
import app from "../app";
import User from "../entity/User"
import SecurityService from "../services/SecurityService";

export default class UserController{
    private userProvider: UserDataProvider
    
    constructor(private app: app){
        this.userProvider = this.app.providers.user
    }

    findAll(onLoad: (err: string, data: User[])=> void){
        this.userProvider.select( {}, onLoad)
    }

    findByEmail(email: string, onLoad: (data: User |null) => void, onError: (msg: string, code: number) => void){
        this.userProvider.findOne({email: email}, (err, data) => {
            if (err){
                onError(err.message, 500)
            } else {
                const result = data !== undefined ? data : null
                onLoad(result)
            }
        })
    }

    create(data: any, onCreate: any, onError: (msg: string, code: number) => void){
        //проверка email
        const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

        if(!emailPattern.test(data.email) || !data.password.length){
            onError("Incorrect password or email", 400)
        } else {
            this.findByEmail(data.email, (result) => {
                if (!result){
                    const user = new User()
                    user.name = data.name || data.email
                    user.email = data.email
                    user.password = SecurityService.generateHashPass(data.password)

                    this.userProvider.create(user, (err, newData) => {
                        if (err !== null){
                            onError(err.message, 500)
                        } else {
                            onCreate (newData)
                        }
                    })
                } else {
                    onError("User already exists", 400)
                }
            }, onError)
        }
    }
    removeById(id: string, onRemove: any){
        this.userProvider.delete( {_id: id}, onRemove)
    }
    updateById(id: string, newData: User, onUpdate: any){
        this.userProvider.update( {_id: id}, newData, onUpdate)
    }
}