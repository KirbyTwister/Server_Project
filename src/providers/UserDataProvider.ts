import DataProvider from "./DataProvider";
import User from "../entity/User";

export default class UserDataProvider extends DataProvider{

    constructor(){
        super("User")
    }
    select(where: any, onSelect: (err: any, user: User[]) => void){
        this.dbStore.find(where, onSelect)
    }

    create(data: User, onCreate: (err: any, newUser: User) => void){
        this.dbStore.insert(data, onCreate)
    }

    update(where: any, newData: User, onUpdate?: (err: any, numReplaced: number) => void){
        this.dbStore.update(where, {$set: newData})
    }

    delete(where: any, onDelete?: (err: any, numReplaced: number) => void){
        this.dbStore.remove(where, {multi: true}, onDelete);
    }

    findOne(where: any, onSelect: (err: any, user: User) => void){
        this.dbStore.findOne(where, onSelect)
    }

    protected onLoadStore(err: any): void{
        if (err){
            console.error(err)
        }
    }
}